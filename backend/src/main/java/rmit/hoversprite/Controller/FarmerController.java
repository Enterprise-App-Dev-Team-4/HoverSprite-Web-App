package rmit.hoversprite.Controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.swing.text.StyledEditorKit;

import jakarta.mail.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import rmit.hoversprite.DTO.FarmDTO.FarmDTO;
import rmit.hoversprite.DTO.FeedbackDTO.FeedbackDTO;
import rmit.hoversprite.DTO.FeedbackDTO.ReturnedFeedbacks;
import rmit.hoversprite.DTO.OrderDTO.OrderDTO;
import rmit.hoversprite.DTO.OrderQueueDTO.OrderQueueDTO;
import rmit.hoversprite.DTO.UserDTO.SprayerDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Middleware.FarmerHandleOrderMiddleware;
import rmit.hoversprite.Middleware.FarmerOrderRequestHandler;
import rmit.hoversprite.Middleware.FarmerProfileUpdateRequestHandler;
import rmit.hoversprite.Middleware.FeedbackRequestHandler;
import rmit.hoversprite.Middleware.ReceptionistBooking;
import rmit.hoversprite.Middleware.ReceptionistOrderCheckStatus;
import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.Feedback.Feedback;
import rmit.hoversprite.Model.Feedback.FeedbackSprayer;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.OrderQueue.OrderQueue;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Proxies.ChatController;
import rmit.hoversprite.Proxies.OrderEmailProxy;
import rmit.hoversprite.Request.*;
import rmit.hoversprite.Response.AuthenticationResponse;
import rmit.hoversprite.Response.CheckTimeSlotService;
import rmit.hoversprite.Services.FarmService;
import rmit.hoversprite.Services.FarmerService;
import rmit.hoversprite.Services.SprayerFeatureServices;
import rmit.hoversprite.Utils.DTOConverter;
import rmit.hoversprite.Utils.Utils;
import rmit.hoversprite.Utils.Enum.OrderStatus;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Allow requests from this origin
public class FarmerController {

    @Autowired
    private SprayerFeatureServices sprayServices;

    @Autowired
    private FarmerService farmerService;

    @Autowired
    FarmerProfileUpdateRequestHandler farmerUpdateProfileRequest;

    @Autowired
	private OrderEmailProxy orderEmailProxy;

    @Autowired
    private FeedbackRequestHandler feedbackRequestHandler;

    @Autowired
    private FarmerHandleOrderMiddleware farmerHandleOrderMiddleware;

    @Autowired
    CheckTimeSlotService checkTimeSlotService;

    @Autowired
    ChatController chatController;

    @Autowired
    private Utils utilsClass;

    @PostMapping("farm/add-farm")
    public ResponseEntity<?> addFarm(@RequestBody FarmerAddFarmRequest request)
    {
        FarmDTO farm = new DTOConverter().convertFarmDataToObject(farmerService.userSaveFarm(request.getFarmerEmail(), request.getFarm()));
        return ResponseEntity.ok(farm);
    }

    @GetMapping("userName")
    // @PreAuthorize("hasAuthority('Receptionist') or hasAuthority('Farmer')")
    public ResponseEntity<?> userName() 
    {
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(farmerService.getFarmerData());
        return ResponseEntity.ok(userDTO);
    }
    
    @PutMapping("updateProfile")
    // @PreAuthorize("hasAuthority('Receptionist') or hasAuthority('Farmer')")

    public ResponseEntity<?> farmerUpdateProfile(@RequestBody FarmerUpdateProfileRequest request )
    {
        Farmer farmer = new Farmer();
        Farmer updateFarmer = farmerUpdateProfileRequest.returnRequestPartToFarmer(request, farmer);
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(farmerService.updateFarmerProfile(updateFarmer));
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("requestOrder")
    
    public ResponseEntity<?> farmerRequestOrder(@RequestBody FarmerOrderRequest farmerOrderRequest, @RequestParam String role)
    {
        
        Order order = new FarmerOrderRequestHandler().transferRequestToOrder(farmerOrderRequest);
        order.setDate(utilsClass.dateAndTimeValueExtracted(order.getDate()).getDate());
        if(role.equals("receptionist"))
        {
            order.setOrderStatus(OrderStatus.CONFIRMED);
        }
        
        Order savedOrder = farmerService.farmerCreateOrder(order);
        
        // send email proxy
        orderEmailProxy.sendEmailOrderCreated(savedOrder);
        // System.out.println("Success");
        OrderDTO orderDTO = new DTOConverter().convertOrderDataToObject(savedOrder);
        //put the order in the farmerservice to get order
        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping("order/all")
    public ResponseEntity<?> farmerGetAllOrder(
        @RequestParam(defaultValue = "0") int page, 
        @RequestParam(defaultValue = "12") int size,
        @RequestParam(defaultValue = "status") String sort) {
        System.out.println("get data:");
        try {

            Page<Order> listOrder = farmerService.farmerGetAllOrder(PageRequest.of(page, size), sort);

            if (listOrder.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            // Convert the list of Order entities to a list of OrderDTOs
            List<OrderDTO> orderDTOList = listOrder.stream()
                                                   .map(new DTOConverter()::convertOrderDataToObject)
                                                   .collect(Collectors.toList());

            Page<OrderDTO> orderDTOPage = new PageImpl<>(orderDTOList, PageRequest.of(page, size), listOrder.getTotalElements());
            // Return the list of OrderDTOs wrapped in a ResponseEntity with HTTP 200 OK status
            return ResponseEntity.ok(orderDTOPage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("An error occurred while fetching orders");
        }
    }

    @GetMapping("order")
    public ResponseEntity<?> farmerGetOrderDetail(@RequestParam String orderId)
    {
        OrderDTO orderDTO = new DTOConverter().convertOrderDataToObject(farmerService.farmerGetOrderById(orderId));
        
        return ResponseEntity.ok(orderDTO);
    }

    @PostMapping("feedback")
    public ResponseEntity<?> farmerFeedbackOrder(@RequestBody FarmerFeedbackRequest request)
    {
        // add feedback dto
        // FeedbackDTO feedbackDTO = new DTOConverter().convertOrderFeedbackDataToObject(feedbackRequestHandler.farmerFeedback(request));
        ReturnedFeedbacks result = feedbackRequestHandler.farmerFeedback(request, new DTOConverter());
        return ResponseEntity.ok(result);
    }

    @GetMapping("checkOrderQueue")
    public ResponseEntity<?> checkOrderQueueFarmer(@RequestParam String orderID) throws Exception
    {
        
        // check order queue
        OrderQueue queue = farmerHandleOrderMiddleware.checkOrderQueueFarmer(orderID);
        if((queue == null)) return null;
        OrderDTO orderDTO = new DTOConverter().convertOrderDataToObject(queue.getOrder());
        OrderQueueDTO queueDTO = new DTOConverter().convertQueueDataToObject(queue);
        return ResponseEntity.ok(queueDTO);
    }

    @PostMapping("farmerComplete")
    public ResponseEntity<?> farmerCompleteOrder(@RequestParam String orderID) throws Exception
    {
        
        // check order queue
        Order order = farmerHandleOrderMiddleware.farmerCompleteOrder(orderID);
        OrderDTO orderDTO = new DTOConverter().convertOrderDataToObject(order);

        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping("booking/checkTimeSlot")
    public List<Integer> farmerCheckTimeSlot(@RequestParam String date, @RequestParam String serviceID)
    {
        // Get the spray service by service ID
        SprayServices services = sprayServices.getServiceByID(serviceID);
        return checkTimeSlotService.checkTimeSlot(date, services);
    }

    @PostMapping("queue/message")
    public ResponseEntity<?> farmerChatSprayer(@RequestBody MessageBody message)
    {
        chatController.farmerSendChatMessage(message);
        return ResponseEntity.ok(message);
    }
}

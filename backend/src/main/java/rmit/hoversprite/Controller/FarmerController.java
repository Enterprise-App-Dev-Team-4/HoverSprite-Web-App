package rmit.hoversprite.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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
import rmit.hoversprite.DTO.OrderDTO.OrderDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Middleware.FarmerOrderRequestHandler;
import rmit.hoversprite.Middleware.FarmerProfileUpdateRequestHandler;
import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Request.FarmerAddFarmRequest;
import rmit.hoversprite.Request.FarmerOrderRequest;
import rmit.hoversprite.Request.FarmerUpdateProfileRequest;
import rmit.hoversprite.Response.AuthenticationResponse;
import rmit.hoversprite.Services.FarmService;
import rmit.hoversprite.Services.FarmerService;
import rmit.hoversprite.Services.SprayerFeatureServices;
import rmit.hoversprite.Utils.DTOConverter;

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
    
    public ResponseEntity<?> farmerUpdateProfile(@RequestBody FarmerOrderRequest farmerOrderRequest)
    {
        
        Order order = new FarmerOrderRequestHandler().transferRequestToOrder(farmerOrderRequest);
        Order savedOrder = farmerService.farmerCreateOrder(order);


        // System.out.println("Success");
        OrderDTO orderDTO = new DTOConverter().convertOrderDataToObject(savedOrder);
        //put the order in the farmerservice to get order
        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping("order/all")
    public ResponseEntity<?> farmerGetAllOrder() {
        System.out.println("get data:");
        try {
            List<Order> listOrder = farmerService.farmerGetAllOrder();

            if (listOrder.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            // Convert the list of Order entities to a list of OrderDTOs
            List<OrderDTO> orderDTOList = listOrder.stream()
                                                   .map(new DTOConverter()::convertOrderDataToObject)
                                                   .collect(Collectors.toList());

            // Return the list of OrderDTOs wrapped in a ResponseEntity with HTTP 200 OK status
            return ResponseEntity.ok(orderDTOList);
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
}

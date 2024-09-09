package rmit.hoversprite.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.DTO.OrderDTO.OrderDTO;
import rmit.hoversprite.DTO.OrderQueueDTO.OrderQueueDTO;
import rmit.hoversprite.DTO.UserDTO.SprayerDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Middleware.SprayerHandleOrderMiddleware;
import rmit.hoversprite.Middleware.SprayerProfileUpdateRequest;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.OrderQueue.OrderQueue;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Request.ReceptionistUpdateProfileRequest;
import rmit.hoversprite.Request.SprayerUpdateProfileRequest;
import rmit.hoversprite.Services.SprayerService;
import rmit.hoversprite.Utils.DTOConverter;
import rmit.hoversprite.Utils.Enum.Role;
import rmit.hoversprite.Utils.Enum.SprayerExpertise;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class SprayerController {
    @Autowired
    SprayerService sprayerService;

    @Autowired
    SprayerProfileUpdateRequest sprayerProfileUpdateRequest;

    @Autowired
    SprayerHandleOrderMiddleware sprayerHandleOrderMiddleware;

    @GetMapping("sprayer")
    public ResponseEntity<?> getSprayerResponseEntity() 
    {
        System.out.println("Oke");
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(sprayerService.getSprayerData());
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("sprayerProfile")

    public ResponseEntity<?> sprayerUpdateProfile(@RequestBody SprayerUpdateProfileRequest request )
    {
        Sprayer sprayer = new Sprayer();
        
        Sprayer updateSprayer = sprayerProfileUpdateRequest.returnRequestPartToSprayer(request, sprayer);
        System.out.println("Email: " + updateSprayer.getEmail());
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(sprayerService.updateSprayerProfile(updateSprayer));
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("sprayerOrder")
    public ResponseEntity<?> sprayerGetOrder(
        @RequestParam(defaultValue = "0") int page, 
        @RequestParam(defaultValue = "12") int size,
        @RequestParam(defaultValue = "status") String sort
    )
    {
        Page<Order> returnedOrders = sprayerService.getAllOrder(PageRequest.of(page, size), sort);

        if (returnedOrders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<OrderDTO> returnedList = returnedOrders.stream()
                                                    .map(new DTOConverter()::convertOrderDataToObject)
                                                    .collect(Collectors.toList());
        Page<OrderDTO> orderDTOPage = new PageImpl<>(returnedList, PageRequest.of(page, size), returnedOrders.getTotalElements());
       return ResponseEntity.ok(orderDTOPage);
    }


    @PutMapping("sprayerConfirm")

    public ResponseEntity<?> sprayerConfirmAssignedOrder(@RequestParam String orderID)
    {
        OrderDTO orderDTO = new DTOConverter().convertOrderDataToObject(sprayerHandleOrderMiddleware.sprayerConfirmAssignedOrder(orderID));
        return ResponseEntity.ok(orderDTO);
    }

    @PostMapping("sprayerComplete")
    public ResponseEntity<?> sprayerCompleteOrder(@RequestParam String orderID) throws Exception
    {
        OrderQueue queue = sprayerHandleOrderMiddleware.sprayerCompleteOrder(orderID);
        OrderQueueDTO queueDTO = new DTOConverter().convertQueueDataToObject(queue);
        return
        
        ResponseEntity.ok(queueDTO);
    }

    @GetMapping("sprayercheckQueue")
    public ResponseEntity<?> checkOrderQueueSprayer(@RequestParam String orderID) throws Exception
    {
        
        // check order queue
        OrderQueue queue = sprayerHandleOrderMiddleware.checkOrderQueueSprayer(orderID);
        if((queue == null)) return null;
        OrderQueueDTO queueDTO = new DTOConverter().convertQueueDataToObject(queue);
        return ResponseEntity.ok(queueDTO);
    }


}

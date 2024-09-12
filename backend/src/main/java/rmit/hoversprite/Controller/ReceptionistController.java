package rmit.hoversprite.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
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
import rmit.hoversprite.DTO.UserDTO.FarmerDTO;
import rmit.hoversprite.DTO.UserDTO.SprayerDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Middleware.ReceptionistBooking;
import rmit.hoversprite.Middleware.ReceptionistHandleSprayer;
import rmit.hoversprite.Middleware.ReceptionistOrderCheckStatus;
import rmit.hoversprite.Middleware.ReceptionistProfileUpdateRequest;
import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Request.AssignSprayerRequest;
import rmit.hoversprite.Request.FarmerUpdateProfileRequest;
import rmit.hoversprite.Request.ReceptionistHandleOrderRequest;
import rmit.hoversprite.Request.ReceptionistUpdateProfileRequest;
import rmit.hoversprite.Services.ReceptionistService;
import rmit.hoversprite.Services.UserService;
import rmit.hoversprite.Utils.DTOConverter;
import rmit.hoversprite.Utils.Enum.Role;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class ReceptionistController {
    @Autowired
    ReceptionistService receptionistService;

    @Autowired
    ReceptionistProfileUpdateRequest receptionistProfileUpdateRequest;

    
    @Autowired
    ReceptionistOrderCheckStatus receptionistOrderCheckStatus;

    @Autowired
    ReceptionistHandleSprayer receptionistHandleSprayerMiddleware;

    @Autowired
    ReceptionistBooking receptionistBooking;

    @Autowired
    private UserService userService;


    @GetMapping("receptionist")
    @PreAuthorize("hasAuthority('Receptionist')")
    public ResponseEntity<?> getReceptioResponseEntity() 
    {
        System.out.println("Oke");
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(receptionistService.getReceptionistData());
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("receptionistProfile")
    @PreAuthorize("hasAuthority('Receptionist')")

    public ResponseEntity<?> receptionistUpdateProfile(@RequestBody ReceptionistUpdateProfileRequest request )
    {
        Receptionist receptionist = new Receptionist();
        Receptionist updateReceptionist = receptionistProfileUpdateRequest.returnRequestPartToReceptionist(request, receptionist);
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(receptionistService.updateReceptionistProfile(updateReceptionist));
        return ResponseEntity.ok(userDTO);
    }

   @GetMapping("receptionistOrder")
public ResponseEntity<?> receptionistGetAllOrder(
        @RequestParam(defaultValue = "0") int page, 
        @RequestParam(defaultValue = "12") int size,
        @RequestParam(defaultValue = "status") String sort) { // Default page size is now 12
    
    try {
        Page<Order> orderPage = receptionistService.receptionistHandleAllOrder(PageRequest.of(page, size), sort);

        if (orderPage.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        // Convert the list of Order entities to a list of OrderDTOs
        List<OrderDTO> orderDTOList = orderPage.getContent().stream()
                                               .map(new DTOConverter()::convertOrderDataToObject)
                                               .collect(Collectors.toList());

        // Create a paginated response using PageImpl
        Page<OrderDTO> orderDTOPage = new PageImpl<>(orderDTOList, PageRequest.of(page, size), orderPage.getTotalElements());

        // Return the paginated OrderDTOs wrapped in a ResponseEntity with HTTP 200 OK status
        return ResponseEntity.ok(orderDTOPage);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("An error occurred while fetching orders");
    }
}



     @PutMapping("orderStatus")
    public ResponseEntity<?> farmerGetOrderDetail(@RequestBody ReceptionistHandleOrderRequest request) throws MailException
    {
       OrderDTO orderReturn = new DTOConverter().convertOrderDataToObject(receptionistOrderCheckStatus.checkOrderStatus(request));
        return ResponseEntity.ok(orderReturn);
    }

    @GetMapping("allSprayer")
    public ResponseEntity<?> receptionistGetAllSprayer()
    {
        List<Sprayer> returnedSprayer = receptionistHandleSprayerMiddleware.getAllSprayer();

        if (returnedSprayer.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<SprayerDTO> returnedList = returnedSprayer.stream()
                                                    .map(new DTOConverter()::convertSprayerDataToObject)
                                                    .collect(Collectors.toList());
       return ResponseEntity.ok(returnedList);
    }

    @PostMapping("assign")
    public ResponseEntity<?> receptionistAssignSprayer(@RequestBody AssignSprayerRequest request)
    {
        Order order = receptionistHandleSprayerMiddleware.assignSprayers(request);
        OrderDTO orderDTO = new DTOConverter().convertOrderDataToObject(order);
        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping("booking/checkPhone")
    public ResponseEntity<?> receptionistCheckFarmerByPhone(@RequestParam String phone)
    {
        try {
            
            Farmer farmer = receptionistBooking.receptionistCheckFarmerPhoneNumber(phone);
            if(farmer == null) return null;
            UserDTO returnedFarmer = new DTOConverter().convertUserDataToObject(farmer);
            System.out.println(returnedFarmer.getEmail());
            return ResponseEntity.ok(returnedFarmer);
        } catch (Exception e)
        {
            System.out.println("Error: " + e.getLocalizedMessage());
        }
        
        return  null;
    }

    @PostMapping("booking/createFarmer")
    public ResponseEntity<?> receptionistCreateFarmer(@RequestBody User user)
    {
        Farmer farmer = new Farmer();
        farmer.setUser(user);
        farmer.setRole(Role.Farmer);
        UserDTO farmerDTO = new DTOConverter().convertUserDataToObject(userService.register(farmer));
        return ResponseEntity.ok(farmerDTO);
    }
}

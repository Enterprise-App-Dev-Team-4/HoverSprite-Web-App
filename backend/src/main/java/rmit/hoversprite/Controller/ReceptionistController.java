package rmit.hoversprite.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.DTO.OrderDTO.OrderDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Middleware.ReceptionistProfileUpdateRequest;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Request.FarmerUpdateProfileRequest;
import rmit.hoversprite.Request.ReceptionistUpdateProfileRequest;
import rmit.hoversprite.Services.ReceptionistService;
import rmit.hoversprite.Utils.DTOConverter;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class ReceptionistController {
    @Autowired
    ReceptionistService receptionistService;

    @Autowired
    ReceptionistProfileUpdateRequest receptionistProfileUpdateRequest;


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
    public ResponseEntity<?> receptionistGetAllOrder() {
        System.out.println("get data:");
        try {
            List<Order> listOrder = receptionistService.receptionistHandleAllOrder();

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

    @PutMapping("handleOrder")
    public ResponseEntity<?> receptionistHandleOrder()
    {
        return null;
    }

}

package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import rmit.hoversprite.Middleware.ReceptionistProfileUpdateRequest;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Repositories.DBReceptionistRepository;
import rmit.hoversprite.Response.AuthenticationResponse;
import rmit.hoversprite.Utils.Utils;

@Component
public class ReceptionistService {
    @Autowired
    DBReceptionistRepository receptionistRepository;

    @Autowired
    Utils utilsClass;

    @Autowired
    AuthenticationResponse authenticationResponse;

    @Autowired
    ReceptionistProfileUpdateRequest receptionistProfileUpdateRequest;

    @Autowired
    ReceptionistOrderService receptionistOrderService;

    public Receptionist getReceptionistData()
    {
        return authenticationResponse.getReceptionistByToken();
    }

    @Transactional
    public Receptionist updateReceptionistProfile(Receptionist receptionist)
    {
        Receptionist oldReceptionist = getReceptionistData();
        Receptionist updateReceptionist = receptionistProfileUpdateRequest.receptionistToReceptionist(receptionist, oldReceptionist);
        return receptionistRepository.save(updateReceptionist);
    }

    public Page<Order> receptionistHandleAllOrder(Pageable pageable, String sort)
    {
        if(getReceptionistData() == null)
        {
            return null;
        }
        return receptionistOrderService.getAllOrders(pageable, sort);
    }

    public Order receptionistHandleSpecificOrder(Order order)
    {
        System.out.print("Farmer: ");
        Receptionist receptionistRequest = getReceptionistData();
        order.setReceptionist(receptionistRequest);
        System.out.println("Receptionist: " + receptionistRequest.getFullName());
        // System.out.println(order);
        return receptionistOrderService.updateOrder(order);
    }
}

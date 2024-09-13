package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import rmit.hoversprite.Middleware.SprayerProfileUpdateRequest;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Repositories.DBOrderRepository;
import rmit.hoversprite.Repositories.DBSprayerRepository;
import rmit.hoversprite.Response.AuthenticationResponse;
import rmit.hoversprite.Utils.Utils;

@Component
public class SprayerService {
    
    @Autowired
    Utils utilsClass;

    @Autowired
    AuthenticationResponse authenticationResponse;

    @Autowired
    SprayerProfileUpdateRequest sprayerProfileUpdateRequest;

    @Autowired
    DBSprayerRepository sprayerRepository;

    @Autowired
    OrderService orderService;

    public Sprayer getSprayerData()
    {
        return authenticationResponse.getSprayerByToken();
    }

    @Transactional
    public Sprayer updateSprayerProfile(Sprayer sprayer)
    {
        Sprayer oldSprayer = getSprayerData();
        Sprayer updateSprayer = sprayerProfileUpdateRequest.sprayerToSprayer(sprayer, oldSprayer);
        return sprayerRepository.save(updateSprayer);
    }

    public List<Sprayer> allSprayer()
    {
        return sprayerRepository.findAll();
    }

    public Sprayer updateSprayer(Sprayer sprayer)
    {
        Sprayer oldSprayer = sprayerRepository.findByEmail(sprayer.getEmail());
        Sprayer updateSprayer = sprayerProfileUpdateRequest.sprayerToSprayer(sprayer, oldSprayer);
        updateSprayer.setFeedback(sprayer.getFeedback());
        return sprayerRepository.save(updateSprayer);
    }

    public Page<Order> getAllOrder(Pageable pageable, String sort)
    {
        Sprayer sprayer = getSprayerData();
        return orderService.findOrderBySprayer(sprayer, pageable, sort);
    }

    public Sprayer getSprayerByEmail(String email)
    {
        return sprayerRepository.findByEmail(email);
    }
}

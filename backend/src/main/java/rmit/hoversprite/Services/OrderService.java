package rmit.hoversprite.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Repositories.DBOrderRepository;
import rmit.hoversprite.Utils.Utils;

@Component
public class OrderService {
    @Autowired
    private DBOrderRepository orderRepository;

    @Autowired
    private SprayerFeatureServices sprayServices;

    @Autowired
    private Utils utilsClass;

    public Order createOrder(Farmer farmer, SprayServices services)
    {
        // Generate order id and assign it
        Order order = new Order();
        String generateOrderId = utilsClass.generateOrderId(orderRepository.findAll());
        order.setOrderID(generateOrderId);
        return orderRepository.save(order);
    }
}

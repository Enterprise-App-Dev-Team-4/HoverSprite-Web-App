package rmit.hoversprite.Services.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Repositories.DBOrderRepository.DBOrderRepository;
import rmit.hoversprite.Services.UseCaseServices.UseCaseServices;
import rmit.hoversprite.Utils.Utils;

@Component
public class OrderService {
    @Autowired
    private DBOrderRepository orderRepository;

    @Autowired
    private UseCaseServices sprayServices;

    @Autowired
    private Utils utilsClass;

    public Order createOrder(Order order)
    {
        // Generate order id and assign it
        String generateOrderId = utilsClass.generateOrderId(orderRepository.findAll());
        order.setOrderID(generateOrderId);
        return orderRepository.save(order);
    }
}

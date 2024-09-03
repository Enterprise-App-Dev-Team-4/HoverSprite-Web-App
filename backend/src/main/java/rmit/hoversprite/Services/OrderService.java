package rmit.hoversprite.Services;

import java.util.List;

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

    public Order createOrder(Order order)
    {
        // Generate order id and assign it
        String generateOrderId = utilsClass.generateOrderId(orderRepository.findAll());
        order.setOrderID(generateOrderId);
        return orderRepository.save(order);
    }

    public Order getOrderById(String orderId)
    {
        return orderRepository.findByorderID(orderId);
    }

    public Order updateOrder(Order order)
    {
        Order oldOrder = getOrderById(order.getOrderID());
        order.setDate(oldOrder.getDate());
        order.setFarmer(oldOrder.getFarmer());
        order.setLocation(oldOrder.getLocation());
        order.setServiceTimeSlot(oldOrder.getServiceTimeSlot());
        order.setSprayerServices(oldOrder.getSprayerServices());
        order.setSprayers(oldOrder.getSprayers());
        order.setTotalCost(oldOrder.getTotalCost());
        return order;
    }
}

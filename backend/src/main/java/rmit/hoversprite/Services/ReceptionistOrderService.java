package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Repositories.DBOrderRepository;

@Component
public class ReceptionistOrderService {
    @Autowired
    DBOrderRepository orderRepository;

    public List<Order> getAllOrders()
    {
        return orderRepository.findAll();
    }

    public Order updateOrder(Order order)
    {
        Order dbOrder = orderRepository.findByorderID(order.getOrderID());
        dbOrder.setSprayers(order.getSprayers());
        dbOrder.setOrderStatus(order.getOrderStatus());
        dbOrder.setReceptionist(order.getReceptionist());
        return orderRepository.save(dbOrder);
    }
}

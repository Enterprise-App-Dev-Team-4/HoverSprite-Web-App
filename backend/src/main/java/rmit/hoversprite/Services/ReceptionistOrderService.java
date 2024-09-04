package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Repositories.DBOrderRepository;

@Component
public class ReceptionistOrderService {
    @Autowired
    DBOrderRepository orderRepository;

    public Page<Order> getAllOrders(Pageable pageable)
    {
        return orderRepository.findAll(pageable);
    }

    @Transactional
    public Order updateOrder(Order order) {
    Order dbOrder = orderRepository.findByorderID(order.getOrderID());
    if (dbOrder == null) {
        throw new EntityNotFoundException("Order not found with ID: " + order.getOrderID());
    }

    System.out.println("Order Status before saving: " + dbOrder.getOrderStatus());
    dbOrder.setSprayers(order.getSprayers());
    dbOrder.setOrderStatus(order.getOrderStatus());
    dbOrder.setReceptionist(order.getReceptionist());

    

    Order savedOrder = orderRepository.save(dbOrder);
    
    System.out.println("Order Status after saving: " + savedOrder.getOrderStatus());

    return savedOrder;
}

}

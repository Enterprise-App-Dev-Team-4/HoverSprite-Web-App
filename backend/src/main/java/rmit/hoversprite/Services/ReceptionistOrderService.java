package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Repositories.DBOrderRepository;

@Component
public class ReceptionistOrderService {
    @Autowired
    DBOrderRepository orderRepository;

    public Page<Order> getAllOrders(Pageable pageable, String sort)
    {
        Sort sortBy;
            System.out.println(sort);
            switch (sort) {
                case "date,desc":
                    sortBy = Sort.by(Sort.Order.desc("date"));
                    break;
                case "date,asc":
                    sortBy = Sort.by(Sort.Order.asc("date"));
                    break;
                case "totalCost,asc":
                    sortBy = Sort.by(Sort.Order.asc("totalCost"));
                    break;
                case "totalCost,desc":
                    sortBy = Sort.by(Sort.Order.desc("totalCost"));
                    break;
                default:  // Default sorting by status
                    sortBy = Sort.by(
                        Sort.Order.desc("orderStatus")
                        .with(Sort.NullHandling.NULLS_LAST) // Ensure nulls (if any) are last
                    );
                    break;
            }
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sortBy);
        return orderRepository.findAll(sortedPageable);
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

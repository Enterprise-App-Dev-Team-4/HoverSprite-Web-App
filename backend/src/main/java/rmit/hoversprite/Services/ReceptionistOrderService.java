package rmit.hoversprite.Services;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Repositories.DBOrderRepository;
import rmit.hoversprite.Utils.Enum.OrderStatus;

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
                        .with(Sort.NullHandling.NULLS_LAST)
                    );
                    break;
            }
        // Fetch paginated data from repository using sort defined above
    Page<Order> ordersPage = orderRepository.findAll(PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sortBy));
    
    // Apply custom sorting logic to ensure COMPLETED is always last
    List<Order> sortedOrders = ordersPage.getContent().stream()
        .sorted(Comparator.comparing(Order::getOrderStatus, (status1, status2) -> {
            if (status1 == OrderStatus.COMPLETED && status2 != OrderStatus.COMPLETED) {
                return 1;  // COMPLETED should come after any other status
            } else if (status1 != OrderStatus.COMPLETED && status2 == OrderStatus.COMPLETED) {
                return -1; // Any other status should come before COMPLETED
            } else {
                return status1.compareTo(status2); // Otherwise, use natural order of enums
            }
        }))
        .collect(Collectors.toList());
        
        return new PageImpl<>(sortedOrders, pageable, ordersPage.getTotalElements());
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

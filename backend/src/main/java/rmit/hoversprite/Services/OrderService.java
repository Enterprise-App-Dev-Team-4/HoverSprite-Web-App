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

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Repositories.DBOrderRepository;
import rmit.hoversprite.Utils.Enum.OrderStatus;
import rmit.hoversprite.Utils.Utils;

@Component
public class OrderService {
    @Autowired
    private DBOrderRepository orderRepository;

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
        return orderRepository.save(order);
    }

    public Page<Order> findOrderByFarmer(Farmer farmer, Pageable pageable, String sort)
    {
        Sort sortBy;
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
                    System.out.println("Status");

                    sortBy = Sort.by(
                        Sort.Order.desc("orderStatus")
                    );
                    break;
            }
    
            Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sortBy);
            Page<Order> ordersPage = orderRepository.findByFarmer(farmer, sortedPageable);
        
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
    // public Order saveFeedbackToOrder()

    public Page<Order> findOrderBySprayer(Sprayer sprayer, Pageable pageable, String sort)
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
                    );
                    break;
            }
             // Fetch paginated data from repository using sort defined above
             Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sortBy);
             Page<Order> ordersPage = orderRepository.findBySprayers(sprayer, sortedPageable);
        
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

    public List<Order> getOrderByDate(String date) {
        return orderRepository.findByDate(date);
    }
}

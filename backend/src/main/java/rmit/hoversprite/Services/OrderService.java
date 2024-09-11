package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Repositories.DBOrderRepository;
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
                        .with(Sort.NullHandling.NULLS_LAST) // Ensure nulls (if any) are last
                    );
                    break;
            }
    
        // Combine pageable and sort order
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sortBy);
        return orderRepository.findByFarmer(farmer, sortedPageable);
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
                        .with(Sort.NullHandling.NULLS_LAST) // Ensure nulls (if any) are last
                    );
                    break;
            }
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sortBy);
        return orderRepository.findBySprayers(sprayer, sortedPageable);
    }

    public List<Order> getOrderByDate(String date) {
        return orderRepository.findByDate(date);
    }
}

package rmit.hoversprite.Repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Sprayer;

public interface DBOrderRepository extends JpaRepository<Order, String>{
    Order findByorderID(String orderId);

    Page<Order> findByFarmer(Farmer farmer, Pageable pageable);

    Page<Order> findBySprayers(Sprayer sprayer, Pageable pageable);
    
    List<Order> findByDate(String date);
}

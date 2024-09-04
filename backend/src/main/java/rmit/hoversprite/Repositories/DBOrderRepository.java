package rmit.hoversprite.Repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;

public interface DBOrderRepository extends JpaRepository<Order, String>{
    Order findByorderID(String orderId);

    Page<Order> findByFarmer(Farmer farmer, Pageable pageable);
}

package rmit.hoversprite.Repositories.DBOrderRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;

public interface DBOrderRepository extends JpaRepository<Order, String>{
    
}

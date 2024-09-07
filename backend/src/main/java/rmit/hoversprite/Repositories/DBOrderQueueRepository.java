package rmit.hoversprite.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.OrderQueue.OrderQueue;

public interface DBOrderQueueRepository extends JpaRepository<OrderQueue, String>{
    OrderQueue findByOrder(Order order);

    OrderQueue deleteByOrder(Order order);
}

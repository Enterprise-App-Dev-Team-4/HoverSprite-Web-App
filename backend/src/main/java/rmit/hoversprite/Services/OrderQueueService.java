package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rmit.hoversprite.Model.Feedback.Feedback;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.OrderQueue.OrderQueue;
import rmit.hoversprite.Repositories.DBOrderQueueRepository;
import rmit.hoversprite.Utils.Utils;

@Service
public class OrderQueueService {
    @Autowired
    DBOrderQueueRepository orderQueueRepository;

    @Autowired
    Utils utilsClass;
    public OrderQueue createOrderQueue(OrderQueue queue)
    {
        List<OrderQueue> listOfOrderQueues = orderQueueRepository.findAll();
        String generateOrderQueueID = utilsClass.generateOrderQueueId(listOfOrderQueues);
        queue.setQueueID(generateOrderQueueID);
        return orderQueueRepository.save(queue);
    }

    public OrderQueue findQueueByOrder(Order order)
    {
        return orderQueueRepository.findByOrder(order);
    }

    public OrderQueue deleteQueueByOrder(Order order)
    {
        return orderQueueRepository.deleteByOrder(order);
    }
}

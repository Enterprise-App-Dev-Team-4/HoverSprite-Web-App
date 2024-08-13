package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Services.OrderService.OrderService;

@RestController
@RequestMapping("/order/")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("add-order")
    public Order addOrder(@RequestBody Order order, @RequestParam String serviceID)
    {
        return null;
    }
}

package rmit.hoversprite.Middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rmit.hoversprite.Model.Feedback.Feedback;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Request.FarmerFeedbackRequest;
import rmit.hoversprite.Services.FarmerService;
import rmit.hoversprite.Services.FeedbackService;
import rmit.hoversprite.Services.OrderService;

@Service
public class FeedbackRequestHandler {
    @Autowired
    FarmerService farmerService;

    @Autowired
    OrderService orderService;

    @Autowired
    FeedbackService feedbackService;
    public Feedback farmerFeedback(FarmerFeedbackRequest request)
    {
        Feedback feedback = new Feedback();
        Order order = orderService.getOrderById(request.getOrderID());

        feedback.setContent(request.getFeedback().getContent());
        feedback.setRatingScore(request.getFeedback().getRatingScore());
        feedback.setFarmer(farmerService.getFarmerData().getFullName());
        feedback.setOrder(order);

        //save to service
        feedback = feedbackService.createFeedback(feedback);

        order.setFeedback(feedback);
        orderService.updateOrder(order);
        return feedback;
    }
}

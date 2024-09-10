package rmit.hoversprite.Middleware;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rmit.hoversprite.Model.Feedback.Feedback;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Request.FarmerFeedbackRequest;
import rmit.hoversprite.Request.FeedbackSprayerRequest;
import rmit.hoversprite.Services.FarmerService;
import rmit.hoversprite.Services.FeedbackService;
import rmit.hoversprite.Services.OrderService;
import rmit.hoversprite.Services.SprayerService;

@Service
public class FeedbackRequestHandler {
    @Autowired
    FarmerService farmerService;

    @Autowired
    OrderService orderService;

    @Autowired
    SprayerService sprayerService;

    @Autowired
    FeedbackService feedbackService;
    public Feedback farmerFeedback(FarmerFeedbackRequest request)
    {
        Feedback feedback = new Feedback();
        Order order = orderService.getOrderById(request.getOrderID());
        List<Sprayer> sprayer = order.getSprayers();

        feedback.setContent(request.getFeedback().getContent());
        feedback.setRatingScore(request.getFeedback().getRatingScore());
        feedback.setSprayerContent(request.getFeedback().getSprayerContent());
        feedback.setSprayerRatingScore(request.getFeedback().getSprayerRatingScore());
        feedback.setFarmer(farmerService.getFarmerData().getFullName());
        feedback.setOrder(order);
        feedback.setSprayer(sprayer);

        //save to service
        feedback = feedbackService.createFeedback(feedback);

        order.setFeedback(feedback);
        orderService.updateOrder(order);

        for(int i = 0; i < sprayer.size(); i++)
        {
            List<Feedback> listOfFeedbacks = sprayer.get(i).getFeedback();
            listOfFeedbacks.add(feedback);
            sprayer.get(i).setFeedback(listOfFeedbacks);
            sprayerService.updateSprayer(sprayer.get(i));
        }
        
        return feedback;
    }

}

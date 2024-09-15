package rmit.hoversprite.Middleware;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rmit.hoversprite.DTO.FeedbackDTO.ReturnedFeedbacks;
import rmit.hoversprite.Model.Feedback.FeedbackSprayer;
import rmit.hoversprite.Model.Feedback.OrderFeedback;
import rmit.hoversprite.Model.Feedback.OrderFeedback;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Request.FarmerFeedbackRequest;
import rmit.hoversprite.Request.FeedbackSprayerRequest;
import rmit.hoversprite.Services.FarmerService;
import rmit.hoversprite.Services.FeedbackService;
import rmit.hoversprite.Services.OrderService;
import rmit.hoversprite.Services.SprayerService;
import rmit.hoversprite.Utils.DTOConverter;

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
    public ReturnedFeedbacks farmerFeedback(FarmerFeedbackRequest request, DTOConverter converter)
    {
        OrderFeedback feedback = new OrderFeedback();
        FeedbackSprayer feedbackSprayer = new FeedbackSprayer();
        Order order = orderService.getOrderById(request.getOrderID());
        List<Sprayer> sprayer = order.getSprayers();

        // set feedback for order overall:
        if(request != null)
        {
            System.out.println("Feedback:");
            System.out.println(request.getOrderFeedback());
        }
        
        feedback.setContent(request.getOrderFeedback().getContent());
        feedback.setFeedbackImage(request.getOrderFeedback().getFeedbackImage());
        feedback.setRatingScore(request.getOrderFeedback().getRatingScore());
        feedback.setFarmer(farmerService.getFarmerData().getFullName());
        feedback.setOrder(order);

        // set feedback for sprayer overall
        feedbackSprayer.setContent(request.getSprayerFeedback().getContent());
        feedbackSprayer.setRatingScore(request.getSprayerFeedback().getRatingScore());
        feedbackSprayer.setFarmer(farmerService.getFarmerData().getFullName());
        feedbackSprayer.setAttentivenessRating(request.getSprayerFeedback().getAttentivenessRating());
        feedbackSprayer.setFriendlinessRating(request.getSprayerFeedback().getFriendlinessRating());
        feedbackSprayer.setProfessionalismRating(request.getSprayerFeedback().getProfessionalismRating());
        feedbackSprayer.setSprayer(sprayer);
        feedbackSprayer.setOrderID(order.getOrderID());
        
        

        //save to service
        feedback = feedbackService.createOrderFeedback(feedback);
        feedbackSprayer = feedbackService.createFeedbackSprayer(feedbackSprayer);
        order.setFeedback(feedback);
        
        List<Sprayer> listSprayers = new ArrayList<Sprayer>();
        for(int i = 0; i < sprayer.size(); i++)
        {
            List<FeedbackSprayer> listOfFeedbacks = sprayer.get(i).getFeedback();
            listOfFeedbacks.add(feedbackSprayer);
            sprayer.get(i).setFeedback(listOfFeedbacks);
            Sprayer s = sprayerService.updateSprayer(sprayer.get(i));
            listSprayers.add(s);
        }
        
        order.setSprayers(listSprayers);
        orderService.updateOrder(order);

        ReturnedFeedbacks returnedFeedbacks = new ReturnedFeedbacks();
        returnedFeedbacks.setFeedbackSprayerDTO(converter.convertFeedbackSprayerDataToObject(feedbackSprayer));
        returnedFeedbacks.setOrderFeedbackDTO(converter.convertOrderFeedbackDataToObject(feedback));
        return returnedFeedbacks;
    }

}

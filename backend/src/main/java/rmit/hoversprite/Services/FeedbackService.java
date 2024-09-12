package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Feedback.FeedbackSprayer;
import rmit.hoversprite.Model.Feedback.OrderFeedback;
import rmit.hoversprite.Repositories.DBFeedbackSprayerRepository;
import rmit.hoversprite.Repositories.DBOrderFeedbackRepository;
import rmit.hoversprite.Utils.Utils;

@Component
public class FeedbackService {
    @Autowired
    DBOrderFeedbackRepository orderFeedbackRepository;

    @Autowired
    DBFeedbackSprayerRepository feedbackSprayerRepository;

    @Autowired
    Utils utilsClass;

    public OrderFeedback createOrderFeedback(OrderFeedback feedback)
    {
        List<OrderFeedback> listOfFeedbacks = orderFeedbackRepository.findAll();
        String generatedFeedbackId = utilsClass.generateOrderFeedbackId(listOfFeedbacks);
        feedback.setFeedbackID(generatedFeedbackId);
        return orderFeedbackRepository.save(feedback);
    }

    public FeedbackSprayer createFeedbackSprayer(FeedbackSprayer feedback)
    {
        List<FeedbackSprayer> listOfFeedbacks = feedbackSprayerRepository.findAll();
        String generatedFeedbackId = utilsClass.generateFeedbackSprayerId(listOfFeedbacks);
        feedback.setFeedbackID(generatedFeedbackId);
        return feedbackSprayerRepository.save(feedback);
    }
}

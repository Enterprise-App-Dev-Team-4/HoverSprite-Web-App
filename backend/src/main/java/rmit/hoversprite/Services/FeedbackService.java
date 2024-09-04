package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Feedback.Feedback;
import rmit.hoversprite.Repositories.DBFeedbackRepository;
import rmit.hoversprite.Utils.Utils;

@Component
public class FeedbackService {
    @Autowired
    DBFeedbackRepository feedbackRepository;

    @Autowired
    Utils utilsClass;

    public Feedback createFeedback(Feedback feedback)
    {
        List<Feedback> listOfFeedbacks = feedbackRepository.findAll();
        String generatedFeedbackId = utilsClass.generateFeedbackId(listOfFeedbacks);
        feedback.setFeedbackID(generatedFeedbackId);
        return feedbackRepository.save(feedback);
    }
}

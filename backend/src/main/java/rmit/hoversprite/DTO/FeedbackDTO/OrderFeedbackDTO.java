package rmit.hoversprite.DTO.FeedbackDTO;

import java.util.List;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Sprayer;

public class OrderFeedbackDTO extends FeedbackDTO{

    public OrderFeedbackDTO() {}

    public OrderFeedbackDTO(String feedbackID, String content, double ratingScore, String farmer) {
        super(feedbackID, content, ratingScore, farmer);
        
    }

    // Getter and Setter for feedbackID
   

    
}

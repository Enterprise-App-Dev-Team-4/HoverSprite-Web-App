package rmit.hoversprite.DTO.FeedbackDTO;

import java.util.List;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Sprayer;

public class OrderFeedbackDTO extends FeedbackDTO{

    private String feedbackImage;

    public OrderFeedbackDTO() {}

    public OrderFeedbackDTO(String feedbackID, String content, double ratingScore, String farmer, String feedbackImage) {
        super(feedbackID, content, ratingScore, farmer);
        this.feedbackImage = feedbackImage;
    }

    // Getter and Setter for feedbackID
   
    public String getFeedbackImage()
    {
        return this.feedbackImage;
    }

    public void setFeedbackImage(String feedbackImage)
    {
        this.feedbackImage = feedbackImage;
    }
    
}

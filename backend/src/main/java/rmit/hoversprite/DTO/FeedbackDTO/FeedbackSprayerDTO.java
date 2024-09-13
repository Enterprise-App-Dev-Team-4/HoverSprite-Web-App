package rmit.hoversprite.DTO.FeedbackDTO;

import java.util.List;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Sprayer;

public class FeedbackSprayerDTO extends FeedbackDTO{
    private double attentivenessRating;
    private double friendlinessRating;
    private double professionalismRating;
    private String orderID;

    public FeedbackSprayerDTO() {}

    public FeedbackSprayerDTO(String feedbackID, String content, double ratingScore, String farmer, double attentivenessRating,  
                           double friendlinessRating, double professionalismRating, String orderID) {
        super(feedbackID, content, ratingScore, farmer);
        this.attentivenessRating = attentivenessRating;
        this.friendlinessRating = friendlinessRating;
        this.professionalismRating = professionalismRating;
        this.orderID = orderID;
    }

    // Getters and Setters
    public String getOrderID()
    {
        return this.orderID;
    }

    public void setOrderID(String orderID)
    {
        this.orderID = orderID;
    }
    
    public double getAttentivenessRating() {
        return attentivenessRating;
    }

    public void setAttentivenessRating(double attentivenessRating) {
        this.attentivenessRating = attentivenessRating;
    }

    public double getFriendlinessRating() {
        return friendlinessRating;
    }

    public void setFriendlinessRating(double friendlinessRating) {
        this.friendlinessRating = friendlinessRating;
    }

    public double getProfessionalismRating() {
        return professionalismRating;
    }

    public void setProfessionalismRating(double professionalismRating) {
        this.professionalismRating = professionalismRating;
    }

}

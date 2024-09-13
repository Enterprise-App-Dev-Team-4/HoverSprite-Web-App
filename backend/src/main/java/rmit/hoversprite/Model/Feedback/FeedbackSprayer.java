package rmit.hoversprite.Model.Feedback;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Sprayer;

@Entity
@Table(name = "feedback_sprayer", schema = "farmer_detail")
public class FeedbackSprayer extends Feedback {

    private double attentivenessRating;
    private double friendlinessRating;
    private double professionalismRating;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
        name = "feedback_sprayer_table",
        joinColumns = @JoinColumn(name = "feedbackid"),
        inverseJoinColumns = @JoinColumn(name = "sprayer_id")
    )
    private List<Sprayer> sprayer;

    private String orderID;

    public FeedbackSprayer() {}

    public FeedbackSprayer(String feedbackID, String content, double ratingScore, String farmer, double attentivenessRating,  
                           double friendlinessRating, double professionalismRating, Order order, List<Sprayer> sprayer, String orderID) {
        super(feedbackID, content, ratingScore, farmer);
        this.attentivenessRating = attentivenessRating;
        this.friendlinessRating = friendlinessRating;
        this.professionalismRating = professionalismRating;
        this.sprayer = sprayer;
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

    public List<Sprayer> getSprayer() {
        return sprayer;
    }

    public void setSprayer(List<Sprayer> sprayer) {
        this.sprayer = sprayer;
    }
}

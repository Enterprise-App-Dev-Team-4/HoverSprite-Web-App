package rmit.hoversprite.Model.Feedback;

import java.util.List;

import jakarta.persistence.Entity;
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

    @ManyToMany
    @JoinTable(
        name = "feedback_sprayer",
        joinColumns = @JoinColumn(name = "feedback_sprayer_id"),
        inverseJoinColumns = @JoinColumn(name = "sprayer_id")
    )
    private List<Sprayer> sprayer;

    public FeedbackSprayer() {}

    public FeedbackSprayer(String feedbackID, String content, double ratingScore, String farmer, double attentivenessRating,  
                           double friendlinessRating, double professionalismRating, Order order, List<Sprayer> sprayer) {
        super(feedbackID, content, ratingScore, farmer);
        this.attentivenessRating = attentivenessRating;
        this.friendlinessRating = friendlinessRating;
        this.professionalismRating = professionalismRating;
        this.sprayer = sprayer;
    }

    // Getters and Setters

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

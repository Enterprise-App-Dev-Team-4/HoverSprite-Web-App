package rmit.hoversprite.Model.Feedback;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Sprayer;

@Entity(name = "feedbacks")
@Table(schema = "farmer_detail")
public class Feedback {
    @Id
    private String feedbackID;

    private String content;

    private double ratingScore;

    private String farmer;

    private String sprayerContent;

    private double sprayerRatingScore;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToMany
    @JoinTable(
        name = "feedback_sprayer",
        joinColumns = @JoinColumn(name = "feedback_id"),
        inverseJoinColumns = @JoinColumn(name = "sprayer_id")
    )
    private List<Sprayer> sprayer;

    public Feedback() {}

    public Feedback(String feedbackID, String content, double ratingScore, String farmer, String sprayerContent, double sprayerRatingScore, Order order, List<Sprayer> sprayer) {
        this.feedbackID = feedbackID;
        this.content = content;
        this.ratingScore = ratingScore;
        this.farmer = farmer;
        this.sprayerContent = sprayerContent;
        this.sprayerRatingScore = sprayerRatingScore;
        this.order = order;
        this.sprayer = sprayer;
    }

    // Getter and Setter for feedbackID
    public String getFeedbackID() {
        return feedbackID;
    }

    public void setFeedbackID(String feedbackID) {
        this.feedbackID = feedbackID;
    }

    // Getter and Setter for content
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Getter and Setter for ratingScore
    public double getRatingScore() {
        return ratingScore;
    }

    public void setRatingScore(double ratingScore) {
        this.ratingScore = ratingScore;
    }

    // Getter and Setter for farmer
    public String getFarmer() {
        return farmer;
    }

    public void setFarmer(String farmer) {
        this.farmer = farmer;
    }

    // Getter and Setter for order
    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    // Getter and Setter for sprayer
    public List<Sprayer> getSprayer() {
        return sprayer;
    }

    public void setSprayer(List<Sprayer> sprayer) {
        this.sprayer = sprayer;
    }

    // Getter and Setter for sprayerContent
    public String getSprayerContent() {
        return sprayerContent;
    }

    public void setSprayerContent(String sprayerContent) {
        this.sprayerContent = sprayerContent;
    }

    // Getter and Setter for sprayerRatingScore
    public double getSprayerRatingScore() {
        return sprayerRatingScore;
    }

    public void setSprayerRatingScore(double sprayerRatingScore) {
        this.sprayerRatingScore = sprayerRatingScore;
    }
}

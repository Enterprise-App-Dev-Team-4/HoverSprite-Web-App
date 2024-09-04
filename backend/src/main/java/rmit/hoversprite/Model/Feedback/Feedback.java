package rmit.hoversprite.Model.Feedback;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Farmer;

@Entity(name = "feedbacks")
@Table(schema = "farmer_detail")
public class Feedback {
    @Id
    private String feedbackID;

    private String content;

    private double ratingScore;

    private String farmer;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    public Feedback() {}

    public Feedback(String feedbackID, String content, double ratingScore, String farmer, Order order)
    {
        this.feedbackID = feedbackID;
        this.content = content;
        this.ratingScore = ratingScore;
        this.farmer = farmer;
        this.order = order;
    }

    public void setContent(String content)
    {
        this.content = content;
    }

    public void setFeedbackID(String feedbackID)
    {
        this.feedbackID = feedbackID;
    }
    
    public String getFeedbackID()
    {
        return this.feedbackID;
    }

    public String getContent()
    {
        return this.content;
    }

    public void setRatingScore(double ratingScore)
    {
        this.ratingScore = ratingScore;
    }

    public double getRatingScore()
    {
        return this.ratingScore;
    }

    public void setFarmer(String farmer)
    {
        this.farmer = farmer;
    }

    public String getFarmer()
    {
        return this.farmer;
    }

    public void setOrder(Order order)
    {
        this.order = order;
    }

    public Order getOrder()
    {
        return this.order;
    }
}

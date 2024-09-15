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

@Entity(name = "order_feedback")
@Table(schema = "farmer_detail")
public class OrderFeedback extends Feedback{

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private String feedbackImage;

    public OrderFeedback() {}

    public OrderFeedback(String feedbackID, String content, double ratingScore, String farmer,Order order, String feedbackImage) {
        super(feedbackID, content, ratingScore, farmer);

        this.order = order;
        this.feedbackImage = feedbackImage;
    }

    // Getter and Setter for feedbackID
   

    // Getter and Setter for order
    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getFeedbackImage()
    {
        return this.feedbackImage;
    }

    public void setFeedbackImage(String feedbackImage)
    {
        this.feedbackImage = feedbackImage;
    }
    
}

package rmit.hoversprite.Request;

import rmit.hoversprite.Model.Feedback.OrderFeedback;

public class FeedbackSprayerRequest {
    private String sprayerEmail;
    private OrderFeedback feedback;

    // Default constructor
    public FeedbackSprayerRequest() {}

    // Parameterized constructor
    public FeedbackSprayerRequest(String sprayerEmail, OrderFeedback feedback) {
        this.sprayerEmail = sprayerEmail;
        this.feedback = feedback;
    }

    // Getter for sprayerEmail
    public String getSprayerEmail() {
        return sprayerEmail;
    }

    // Setter for sprayerEmail
    public void setSprayerEmail(String sprayerEmail) {
        this.sprayerEmail = sprayerEmail;
    }

    // Getter for feedback
    public OrderFeedback getFeedback() {
        return feedback;
    }

    // Setter for feedback
    public void setFeedback(OrderFeedback feedback) {
        this.feedback = feedback;
    }
}

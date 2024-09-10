package rmit.hoversprite.Request;

import rmit.hoversprite.Model.Feedback.Feedback;

public class FeedbackSprayerRequest {
    private String sprayerEmail;
    private Feedback feedback;

    // Default constructor
    public FeedbackSprayerRequest() {}

    // Parameterized constructor
    public FeedbackSprayerRequest(String sprayerEmail, Feedback feedback) {
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
    public Feedback getFeedback() {
        return feedback;
    }

    // Setter for feedback
    public void setFeedback(Feedback feedback) {
        this.feedback = feedback;
    }
}

package rmit.hoversprite.Request;

import rmit.hoversprite.Model.Feedback.Feedback;

public class FarmerFeedbackRequest {
    private Feedback feedback;
    private String orderID;

    public FarmerFeedbackRequest() {}

    public FarmerFeedbackRequest(Feedback feedback, String orderID)
    {
        this.feedback = feedback;
        this.orderID = orderID;
    }

    public String getOrderID()
    {
        return this.orderID;
    }

    public Feedback getFeedback()
    {
        return this.feedback;
    }

}

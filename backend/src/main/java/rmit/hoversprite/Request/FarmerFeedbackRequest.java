package rmit.hoversprite.Request;


import rmit.hoversprite.Model.Feedback.FeedbackSprayer;
import rmit.hoversprite.Model.Feedback.OrderFeedback;

public class FarmerFeedbackRequest {
    private OrderFeedback orderFeedback;
    private FeedbackSprayer sprayerFeedback;
    private String orderID;

    public FarmerFeedbackRequest() {}

    public FarmerFeedbackRequest(OrderFeedback orderFeedback, FeedbackSprayer sprayerFeedback, String orderID)
    {
        this.orderFeedback = orderFeedback;
        this.orderID = orderID;
        this.sprayerFeedback = sprayerFeedback;
    }

    public String getOrderID()
    {
        return this.orderID;
    }

    public OrderFeedback getOrderFeedback()
    {
        return this.orderFeedback;
    }

    public FeedbackSprayer getSprayerFeedback()
    {
        return this.sprayerFeedback;
    }

}

package rmit.hoversprite.DTO.FeedbackDTO;

public class ReturnedFeedbacks {
    private FeedbackSprayerDTO feedbackSprayerDTO;
    private OrderFeedbackDTO orderFeedbackDTO;

    public ReturnedFeedbacks() {}

    public ReturnedFeedbacks(FeedbackSprayerDTO feedbackSprayerDTO, OrderFeedbackDTO orderFeedbackDTO) {
        this.feedbackSprayerDTO = feedbackSprayerDTO;
        this.orderFeedbackDTO = orderFeedbackDTO;
    }

    // Getters and Setters
    public FeedbackSprayerDTO getFeedbackSprayerDTO() {
        return feedbackSprayerDTO;
    }

    public void setFeedbackSprayerDTO(FeedbackSprayerDTO feedbackSprayerDTO) {
        this.feedbackSprayerDTO = feedbackSprayerDTO;
    }

    public OrderFeedbackDTO getOrderFeedbackDTO() {
        return orderFeedbackDTO;
    }

    public void setOrderFeedbackDTO(OrderFeedbackDTO orderFeedbackDTO) {
        this.orderFeedbackDTO = orderFeedbackDTO;
    }
}

package rmit.hoversprite.DTO.FeedbackDTO;

public class FeedbackDTO {
    private String feedbackID;

    private String content;

    private double ratingScore;

    private String farmer;

    public FeedbackDTO() {}

    public FeedbackDTO(String feedbackID, String content, double ratingScore, String farmer) {
        this.feedbackID = feedbackID;
        this.content = content;
        this.ratingScore = ratingScore;
        this.farmer = farmer;
    }

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
}

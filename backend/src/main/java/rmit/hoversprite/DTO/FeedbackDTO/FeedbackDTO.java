package rmit.hoversprite.DTO.FeedbackDTO;

public class FeedbackDTO {
    private String feedbackID;

    private String content;

    private double ratingScore;

    private String farmerFullName;

    public FeedbackDTO() {}

    public FeedbackDTO(String feedbackID, String content, double ratingScore, String farmerFullName)
    {
        this.feedbackID = feedbackID;
        this.content = content;
        this.ratingScore = ratingScore;
        this.farmerFullName = farmerFullName;
    }

    public void setFeedbackID(String feedbackID)
    {
        this.feedbackID = feedbackID;
    }
    
    public String getFeedbackID()
    {
        return this.feedbackID;
    }

    public void setContent(String content)
    {
        this.content = content;
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
}

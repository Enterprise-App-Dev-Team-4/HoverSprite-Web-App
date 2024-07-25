package rmit.hoversprite.Model.Feedback;

public class Feedback {
    private String feedbackID;
    private String content;

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
}

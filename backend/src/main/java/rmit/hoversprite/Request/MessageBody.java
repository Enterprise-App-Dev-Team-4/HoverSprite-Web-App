package rmit.hoversprite.Request;

import java.util.List;

public class MessageBody {
    private String content;
    private List<String> sprayerEmail;
    private String farmerEmail;

    public MessageBody() {}

    public MessageBody(String content, List<String> sprayerEmail, String farmerEmail)
    {
        this.content = content;
        this.sprayerEmail = sprayerEmail;
        this.farmerEmail = farmerEmail;
    }

    // Getter for content
    public String getContent() {
        return content;
    }

    // Setter for content
    public void setContent(String content) {
        this.content = content;
    }

    // Getter for sprayerEmail
    public List<String> getSprayerEmail() {
        return sprayerEmail;
    }

    // Setter for sprayerEmail
    public void setSprayerEmail(List<String> sprayerEmail) {
        this.sprayerEmail = sprayerEmail;
    }

    // Getter for farmerEmail
    public String getFarmerEmail() {
        return farmerEmail;
    }

    // Setter for farmerEmail
    public void setFarmerEmail(String farmerEmail) {
        this.farmerEmail = farmerEmail;
    }
}

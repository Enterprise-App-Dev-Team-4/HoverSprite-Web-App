package rmit.hoversprite.Request;

import java.util.List;

import rmit.hoversprite.Model.User.Sprayer;

public class AssignSprayerRequest {
    private List<Sprayer> sprayers;
    private String orderID;

    // Default constructor
    public AssignSprayerRequest() {}

    // Parameterized constructor
    public AssignSprayerRequest(List<Sprayer> sprayers, String orderID) {
        this.sprayers = sprayers;
        this.orderID = orderID;
    }

    // Getter and setter for sprayers
    public List<Sprayer> getSprayers() {
        return sprayers;
    }

    public void setSprayers(List<Sprayer> sprayers) {
        this.sprayers = sprayers;
    }

    // Getter and setter for orderID
    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }
}

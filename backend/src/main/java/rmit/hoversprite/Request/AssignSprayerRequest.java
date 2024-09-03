package rmit.hoversprite.Request;

import java.util.List;

import rmit.hoversprite.Model.User.Sprayer;

public class AssignSprayerRequest {
    private List<Sprayer> sprayers;
    private String orderID;

    public AssignSprayerRequest() {}

    public AssignSprayerRequest(List<Sprayer> sprayers, String orderID)
    {
        this.sprayers = sprayers;
        this.orderID = orderID;
    }

    public void setSprayer(List<Sprayer> sprayers)
    {
        this.sprayers = sprayers;
    }

    public List<Sprayer> getSprayer()
    {
        return this.sprayers;
    }

    public String getOrderID()
    {
        return this.orderID;
    }

    public void setOrderID(String orderID)
    {
        this.orderID = orderID;
    }
}

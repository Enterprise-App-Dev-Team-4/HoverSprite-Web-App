package rmit.hoversprite.Request;

import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;

public class FarmerOrderRequest {
    private SprayServices sprayServices;
    private Farmer farmer;
    private double totalCost;
    private String serviceTimeSlot;
    private String date;

    // Default constructor
    public FarmerOrderRequest() {}

    // Parameterized constructor
    public FarmerOrderRequest(SprayServices sprayServices, Farmer farmer, double totalCost, String serviceTimeSlot, String date) {
        this.sprayServices = sprayServices;
        this.farmer = farmer;
        this.totalCost = totalCost;
        this.serviceTimeSlot = serviceTimeSlot;
        this.date = date;
    }

    // Getter for sprayServices
    public SprayServices getSprayServices() {
        return sprayServices;
    }

    // Setter for sprayServices
    public void setSprayServices(SprayServices sprayServices) {
        this.sprayServices = sprayServices;
    }

    public void setDate(String date)
    {
        this.date = date;
    }

    public String getDate()
    {
        return this.date;
    }

    // Getter for farmer
    public Farmer getFarmer() {
        return farmer;
    }

    // Setter for farmer
    public void setFarmer(Farmer farmer) {
        this.farmer = farmer;
    }

    // Getter for totalCost
    public double getTotalCost() {
        return totalCost;
    }

    // Setter for totalCost
    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    // Getter for serviceTimeSlot
    public String getServiceTimeSlot() {
        return serviceTimeSlot;
    }

    // Setter for serviceTimeSlot
    public void setServiceTimeSlot(String serviceTimeSlot) {
        this.serviceTimeSlot = serviceTimeSlot;
    }
}

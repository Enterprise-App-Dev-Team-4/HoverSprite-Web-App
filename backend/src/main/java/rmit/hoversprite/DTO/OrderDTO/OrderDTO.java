package rmit.hoversprite.DTO.OrderDTO;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Utils.Enum.OrderStatus;

public class OrderDTO {
    private String orderID;
    private String date;
    private String serviceTimeSlot;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private double totalCost;
    private Farmer farmer;

        // Default constructor
    public OrderDTO() {}

    // Parameterized constructor
    public OrderDTO(String orderID, String date, String serviceTimeSlot, OrderStatus orderStatus, double totalCost, Farmer farmer) {
        this.orderID = orderID;
        this.date = date;
        this.serviceTimeSlot = serviceTimeSlot;
        this.orderStatus = orderStatus;
        this.totalCost = totalCost;
        this.farmer = farmer;
    }

    // Getter for orderID
    public String getOrderID() {
        return orderID;
    }

    // Setter for orderID
    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    // Getter for date
    public String getDate() {
        return date;
    }

    // Setter for date
    public void setDate(String date) {
        this.date = date;
    }

    // Getter for serviceTimeSlot
    public String getServiceTimeSlot() {
        return serviceTimeSlot;
    }

    // Setter for serviceTimeSlot
    public void setServiceTimeSlot(String serviceTimeSlot) {
        this.serviceTimeSlot = serviceTimeSlot;
    }

    // Getter for orderStatus
    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    // Setter for orderStatus
    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    // Getter for totalCost
    public double getTotalCost() {
        return totalCost;
    }

    // Setter for totalCost
    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    // Getter for farmer
    public Farmer getFarmer() {
        return farmer;
    }

    // Setter for farmer
    public void setFarmer(Farmer farmer) {
        this.farmer = farmer;
    }
}

package rmit.hoversprite.DTO.OrderDTO;

import java.util.List;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import rmit.hoversprite.DTO.FeedbackDTO.FeedbackDTO;
import rmit.hoversprite.DTO.UserDTO.SprayerDTO;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Utils.Enum.CropType;
import rmit.hoversprite.Utils.Enum.OrderStatus;
import rmit.hoversprite.Utils.Enum.ServiceName;
import rmit.hoversprite.Utils.Enum.ServiceType;

public class OrderDTO {
    private String orderID;
    private String date;
    private String serviceTimeSlot;
    private String location;
    
    private String sprayServicesId;   // Modified to return sprayServicesId as String

    @Enumerated(EnumType.STRING)
    private CropType cropType;          // Added cropType as String

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private double totalCost;

    private String farmerEmail;       // Modified to return farmerEmail as String
    private String farmerFullName;    // Modified to return farmerFullName as String
        @Enumerated(EnumType.STRING)
    private ServiceName serviceName;

    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    private FeedbackDTO feedBacks;
    
    private List<SprayerDTO> sprayer;

    // Default constructor
    public OrderDTO() {}

    // Parameterized constructor
    public OrderDTO(String orderID, String date, String serviceTimeSlot, OrderStatus orderStatus, 
                    double totalCost, String farmerEmail, String farmerFullName, 
                    String location, String sprayServicesId, CropType cropType,
                    ServiceName serviceName, ServiceType serviceType, List<SprayerDTO> sprayer, FeedbackDTO feedBacks) {
        this.orderID = orderID;
        this.date = date;
        this.serviceTimeSlot = serviceTimeSlot;
        this.orderStatus = orderStatus;
        this.totalCost = totalCost;
        this.farmerEmail = farmerEmail;
        this.farmerFullName = farmerFullName;
        this.location = location;
        this.sprayServicesId = sprayServicesId;
        this.cropType = cropType;
        this.serviceName = serviceName;
        this.serviceType = serviceType;
        this.sprayer = sprayer;
        this.feedBacks = feedBacks;
    }

    // Getter and Setter for orderID
    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public void setFeedBacks(FeedbackDTO feedBacks)
    {
        this.feedBacks = feedBacks;
    }

    public FeedbackDTO getFeedBacks()
    {
        return this.feedBacks;
    }

    public List<SprayerDTO> getSprayer()
    {
        return this.sprayer;
    }

    public void setSprayer(List<SprayerDTO> sprayer)
    {
        this.sprayer = sprayer;
    }

    public ServiceName getServiceName() {
        return serviceName;
    }

    public void setServiceName(ServiceName serviceName) {
        this.serviceName = serviceName;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    // Getter and Setter for date
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    // Getter and Setter for serviceTimeSlot
    public String getServiceTimeSlot() {
        return serviceTimeSlot;
    }

    public void setServiceTimeSlot(String serviceTimeSlot) {
        this.serviceTimeSlot = serviceTimeSlot;
    }

    // Getter and Setter for orderStatus
    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    // Getter and Setter for totalCost
    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    // Getter and Setter for farmerEmail
    public String getFarmerEmail() {
        return farmerEmail;
    }

    public void setFarmerEmail(String farmerEmail) {
        this.farmerEmail = farmerEmail;
    }

    // Getter and Setter for farmerFullName
    public String getFarmerFullName() {
        return farmerFullName;
    }

    public void setFarmerFullName(String farmerFullName) {
        this.farmerFullName = farmerFullName;
    }

    // Getter and Setter for location
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    // Getter and Setter for sprayServicesId
    public String getSprayServicesId() {
        return sprayServicesId;
    }

    public void setSprayServicesId(String sprayServicesId) {
        this.sprayServicesId = sprayServicesId;
    }

    // Getter and Setter for cropType
    public CropType getCropType() {
        return cropType;
    }

    public void setCropType(CropType cropType) {
        this.cropType = cropType;
    }
}

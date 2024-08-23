package rmit.hoversprite.Model.Order;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Sprayer.Sprayer;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Utils.Enum.OrderStatus;

@Entity(name = "orders")
@Table(schema = "farmer_detail")
public class Order {
    @Id
    private String orderID;

    private String date;
    
    private String serviceTimeSlot;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private double totalCost;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    @JsonBackReference (value = "ordered-farmer")
    private Farmer farmer;

    @ManyToOne
    @JoinColumn(name = "receptionist_id")
    private Receptionist receptionist; // receptionist assigns that order

    @ManyToOne
    @JoinColumn(name = "service_id")
    @JsonBackReference (value = "service")
    private SprayServices sprayerServices;

    @ManyToMany
    @JoinTable(
        name = "order_sprayer",
        joinColumns = @JoinColumn(name = "order_id"),
        inverseJoinColumns = @JoinColumn(name = "sprayer_id")
    )
    private List<Sprayer> sprayers;

    // Default constructor
    public Order() {}

    // Parameterized constructor
    public Order(String orderID, String date, OrderStatus orderStatus, double totalCost, Farmer farmer,
                 Receptionist receptionist, SprayServices sprayerServices, List<Sprayer> sprayers, String serviceTimeSlot) {
        this.orderID = orderID;
        this.date = date;
        this.orderStatus = orderStatus;
        this.totalCost = totalCost;
        this.farmer = farmer;
        this.receptionist = receptionist;
        this.sprayerServices = sprayerServices;
        this.sprayers = sprayers;
        this.serviceTimeSlot = serviceTimeSlot;
    }

    // Getters and setters
    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getServiceTimeSlot()
    {
        return this.serviceTimeSlot;
    }

    public void setServiceTimeSlot(String serviceTimeSlot)
    {
        this.serviceTimeSlot = serviceTimeSlot;
    }
    
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public Farmer getFarmer() {
        return farmer;
    }

    public void setFarmer(Farmer farmer) {
        this.farmer = farmer;
    }

    public Receptionist getReceptionist() {
        return receptionist;
    }

    public void setReceptionist(Receptionist receptionist) {
        this.receptionist = receptionist;
    }

    public SprayServices getSprayerServices() {
        return sprayerServices;
    }

    public void setSprayerServices(SprayServices sprayerServices) {
        this.sprayerServices = sprayerServices;
    }

    public List<Sprayer> getSprayers() {
        return sprayers;
    }

    public void setSprayers(List<Sprayer> sprayers) {
        this.sprayers = sprayers;
    }
}

package rmit.hoversprite.Model.SprayerServices;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Utils.Enum.CropType;
import rmit.hoversprite.Utils.Enum.ServiceName;
import rmit.hoversprite.Utils.Enum.ServiceType;

@Entity(name = "spray_services")
@Table(schema = "farmer_detail")
public class SprayServices {
    @Id
    private String id;

    private double price;

    @Enumerated(EnumType.STRING)
    private ServiceName serviceName;

    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    @Enumerated(EnumType.STRING)
    private CropType cropType;

    private String description;

    @OneToMany(mappedBy = "sprayerServices", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;

    private int timeSlot1;
    private int timeSlot2;
    private int timeSlot3;
    private int timeSlot4;
    private int timeSlot5;
    private int timeSlot6;

    public SprayServices() {}

    public SprayServices(String id, double price, ServiceName serviceName, ServiceType serviceType, String description,
                        List<Order> orders, CropType cropType)
    {
        this.id = id;
        this.price = price;
        this.serviceName = serviceName;
        this.serviceType = serviceType;
        this.description = description;
        this.orders = orders;
        this.cropType = cropType;
    }

    // getter/ setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ServiceType getServiceType()
    {
        return this.serviceType;
    }

    public void setServiceType(ServiceType serviceType)
    {
        this.serviceType = serviceType;
    }

    public ServiceName getServiceName() {
        return serviceName;
    }

    public void setServiceName(ServiceName serviceName) {
        this.serviceName = serviceName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription()
    {
        return this.description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public void setCropType(CropType cropType)
    {
        this.cropType = cropType;
    }

    public CropType getCropType()
    {
        return this.cropType;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    // Time slot getters and setters
    public int getTimeSlot1() {
        return timeSlot1;
    }

    public void setTimeSlot1(int timeSlot1) {
        this.timeSlot1 = timeSlot1;
    }

    public int getTimeSlot2() {
        return timeSlot2;
    }

    public void setTimeSlot2(int timeSlot2) {
        this.timeSlot2 = timeSlot2;
    }

    public int getTimeSlot3() {
        return timeSlot3;
    }

    public void setTimeSlot3(int timeSlot3) {
        this.timeSlot3 = timeSlot3;
    }

    public int getTimeSlot4() {
        return timeSlot4;
    }

    public void setTimeSlot4(int timeSlot4) {
        this.timeSlot4 = timeSlot4;
    }

    public int getTimeSlot5() {
        return timeSlot5;
    }

    public void setTimeSlot5(int timeSlot5) {
        this.timeSlot5 = timeSlot5;
    }

    public int getTimeSlot6() {
        return timeSlot6;
    }

    public void setTimeSlot6(int timeSlot6) {
        this.timeSlot6 = timeSlot6;
    }
}

package rmit.hoversprite.Model.SprayerServices;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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

    @OneToMany(mappedBy = "sprayerServices", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "service")
    private List<Order> orders;

    @ElementCollection
    private List<Integer> timeSlots = new ArrayList<>();

    public SprayServices() {}

    public SprayServices(String id, double price, ServiceName serviceName, ServiceType serviceType, String description,
                         List<Order> orders, CropType cropType, List<Integer> timeSlots) {
        this.id = id;
        this.price = price;
        this.serviceName = serviceName;
        this.serviceType = serviceType;
        this.description = description;
        this.orders = orders;
        this.cropType = cropType;
        this.timeSlots = timeSlots;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public CropType getCropType() {
        return cropType;
    }

    public void setCropType(CropType cropType) {
        this.cropType = cropType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<Integer> getTimeSlots() {
        return timeSlots;
    }

    public void setTimeSlots(List<Integer> timeSlots) {
        this.timeSlots = timeSlots;
    }

    public void setService(SprayServices sprayServices)
    {
        this.cropType = sprayServices.cropType;
        this.description = sprayServices.description;
        this.id = sprayServices.id;
        this.orders = sprayServices.orders;
        this.price = sprayServices.price;
        this.serviceName = sprayServices.serviceName;
        this.serviceType = sprayServices.serviceType;
        this.timeSlots = sprayServices.timeSlots;
    }
}

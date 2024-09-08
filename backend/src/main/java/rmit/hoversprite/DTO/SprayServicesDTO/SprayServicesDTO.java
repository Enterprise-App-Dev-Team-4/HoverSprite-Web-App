package rmit.hoversprite.DTO.SprayServicesDTO;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import rmit.hoversprite.DTO.OrderDTO.OrderDTO;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Utils.Enum.CropType;
import rmit.hoversprite.Utils.Enum.ServiceName;
import rmit.hoversprite.Utils.Enum.ServiceType;

public class SprayServicesDTO {
    private String id;
    private double price;

    @Enumerated(EnumType.STRING)
    private ServiceName serviceName;

    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    @Enumerated(EnumType.STRING)
    private CropType cropType;

    private String description;

    @ElementCollection
    private List<Integer> timeSlots = new ArrayList<>();

    private List<OrderDTO> orders;

    // Default constructor
    public SprayServicesDTO() {
    }

    // Parameterized constructor
    public SprayServicesDTO(String id, double price, ServiceName serviceName, ServiceType serviceType, CropType cropType, String description, List<Integer> timeSlots,
                            List<OrderDTO> orders) {
        this.id = id;
        this.price = price;
        this.serviceName = serviceName;
        this.serviceType = serviceType;
        this.cropType = cropType;
        this.description = description;
        this.timeSlots = timeSlots;
        this.orders = orders;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setOrder(List<OrderDTO> orders)
    {
        this.orders = orders;
    }

    public List<OrderDTO> getOrder()
    {
        return this.orders;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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

    public List<Integer> getTimeSlots() {
        return timeSlots;
    }

    public void setTimeSlots(List<Integer> timeSlots) {
        this.timeSlots = timeSlots;
    }
}

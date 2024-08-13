package rmit.hoversprite.Model.SprayerServices;

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
import rmit.hoversprite.Utils.Enum.ServiceType;;;

@Entity(name = "spray_services")
@Table(schema = "farmer_detail")
public class SprayServices {
    @Id
    private String id;

    private double price;

    private String date;

    @Enumerated(EnumType.STRING)
    private ServiceName serviceName;

    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    @Enumerated(EnumType.STRING)
    private CropType cropType;

    private String description;

    @OneToMany(mappedBy = "sprayerServices", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;

    public SprayServices() {}

    public SprayServices(String id, double price, String date, ServiceName serviceName, ServiceType serviceType, String description,
                        List<Order> orders, CropType cropType)
    {
        this.id = id;
        this.price = price;
        this.date = date;
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

    public ServiceName getServiceTName() {
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
}

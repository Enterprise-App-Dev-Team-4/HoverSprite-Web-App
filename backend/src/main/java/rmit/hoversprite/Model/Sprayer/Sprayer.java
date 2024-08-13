package rmit.hoversprite.Model.Sprayer;

import java.util.List;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.MappedSuperclass;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Utils.Enum.SprayerExpertise;

@MappedSuperclass
public class Sprayer {
    @Id
    private String sprayerId;

    @Enumerated(EnumType.STRING)
    private SprayerExpertise sprayerExpertise;

    @ManyToMany(mappedBy = "sprayers")
    private List<Order> orders;

    // Default constructor
    public Sprayer() {}

    // Parameterized constructor
    public Sprayer(String sprayerId, SprayerExpertise sprayerExpertise, List<Order> orders) {
        this.sprayerId = sprayerId;
        this.sprayerExpertise = sprayerExpertise;
        this.orders = orders;
    }

    // Getters and setters
    public String getSprayerId() {
        return sprayerId;
    }

    public void setSprayerId(String sprayerId) {
        this.sprayerId = sprayerId;
    }

    public SprayerExpertise getSprayerExpertise() {
        return sprayerExpertise;
    }

    public void setSprayerExpertise(SprayerExpertise sprayerExpertise) {
        this.sprayerExpertise = sprayerExpertise;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}

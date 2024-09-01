package rmit.hoversprite.Model.User;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Utils.Enum.Role;
import rmit.hoversprite.Utils.Enum.SprayerExpertise;

@Entity
@Table(name = "sprayers", schema = "farmer_detail")
public class Sprayer extends User{

    @Enumerated(EnumType.STRING)
    private SprayerExpertise sprayerExpertise;

    @ManyToMany(mappedBy = "sprayers")
    private List<Order> orders;

    // Default constructor
    public Sprayer() {
        super();
    }

    // Parameterized constructor
    public Sprayer(String id, String password, String email, String fullName, String phoneNumber, String homeAddress,
     String firstName, String lastName, List<Order> receivedOrders, Role role, String token, String profileImage, SprayerExpertise sprayerExpertise, List<Order> orders) {
        super(id, password, email, fullName, phoneNumber, homeAddress, firstName, lastName, role, token, profileImage);
        this.sprayerExpertise = sprayerExpertise;
        this.orders = orders;
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

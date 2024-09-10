package rmit.hoversprite.Model.User;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Feedback.Feedback;
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

    @ManyToMany(mappedBy = "sprayer")
    private List<Feedback> feedback;

    // Default constructor
    public Sprayer() {
        super();
    }

    // Parameterized constructor
    public Sprayer(String id, String password, String email, String fullName, String phoneNumber, String homeAddress,
     String firstName, String lastName, List<Order> receivedOrders, Role role, String token, String profileImage, SprayerExpertise sprayerExpertise, List<Order> orders, List<Feedback> feedback) {
        super(id, password, email, fullName, phoneNumber, homeAddress, firstName, lastName, role, token, profileImage);
        this.sprayerExpertise = sprayerExpertise;
        this.orders = orders;
        this.feedback = feedback;
    }

    public SprayerExpertise getSprayerExpertise() {
        return sprayerExpertise;
    }

    public void setSprayerExpertise(SprayerExpertise sprayerExpertise) {
        this.sprayerExpertise = sprayerExpertise;
    }

    public void setFeedback(List<Feedback> feedback)
    {
        this.feedback = feedback;
    }

    public List<Feedback> getFeedback()
    {
        return this.feedback;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}

package rmit.hoversprite.Model.User;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Utils.Enum.Role;

@Entity
@Table(name = "receptionist", schema = "farmer_detail")
public class Receptionist extends User {

    @OneToMany(mappedBy = "receptionist", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> receivedOrders;

    public Receptionist() {
        super();
    }

    public Receptionist(String id, String password, String email, String fullName, String phoneNumber, String homeAddress,
     String firstName, String lastName, List<Order> receivedOrders, Role role, String token, byte[] profileImage) {
        super(id, password, email, fullName, phoneNumber, homeAddress, firstName, lastName, role,token, profileImage);
        this.receivedOrders = receivedOrders;
    }

    public void setReceivedOrderes(List<Order> receivedOrders)
    {
        this.receivedOrders = receivedOrders;
    }

    public List<Order> getReceivedOrders()
    {
        return this.receivedOrders;
    }

}

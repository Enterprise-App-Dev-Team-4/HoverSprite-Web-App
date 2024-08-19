package rmit.hoversprite.Model.User;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Utils.Enum.Role;

@Entity
@Table(name = "farmer", schema = "farmer_detail")
public class Farmer extends User {

    @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Farm> farms;

    @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> serviceOrders;

    public Farmer() {
        super();
    }

    public Farmer(String id, String password, String email, String fullName, String phoneNumber, String homeAddress, String firstName, String lastName,
                    List<Farm> farms, List<Order> serviceOrders, Role role, String token, byte[] profileImage) {
        super(id, password, email, fullName, phoneNumber, homeAddress, firstName, lastName, role, token, profileImage);
        this.farms = farms;
        this.serviceOrders = serviceOrders;
    }

    public List<Farm> getFarms() {
        return farms;
    }

    public void setFarms(List<Farm> farms) {
        this.farms = farms;
    }

    public void setServiceOrders(List<Order> serviceOrders)
    {
        this.serviceOrders = serviceOrders;
    }

    public List<Order> getServicOrders()
    {
        return this.serviceOrders;
    }
}

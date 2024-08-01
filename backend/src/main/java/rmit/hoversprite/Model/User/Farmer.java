package rmit.hoversprite.Model.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "farmer", schema = "farmer_detail")
public class Farmer extends User {

    public Farmer() {
        super();
    }

    public Farmer(String id, String username, String password, String email, String fullName, String phoneNumber, String homeAddress) {
        super(id, username, password, email, fullName, phoneNumber, homeAddress);
    }

    // Inherit all methods and properties from User
}

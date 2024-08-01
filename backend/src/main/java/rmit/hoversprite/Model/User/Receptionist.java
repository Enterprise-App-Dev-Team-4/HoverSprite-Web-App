package rmit.hoversprite.Model.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "receptionist", schema = "farmer_detail")
public class Receptionist extends User {
    public Receptionist() {
        super();
    }

    public Receptionist(String id, String username, String password, String email, String fullName, String phoneNumber, String homeAddress) {
        super(id, username, password, email, fullName, phoneNumber, homeAddress);
    }
}

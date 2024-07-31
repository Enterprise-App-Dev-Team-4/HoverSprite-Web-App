package rmit.hoversprite.Model.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity(name = "farmer")
@Table(schema = "farmer_detail")
public class Farmer implements User {
    @Id
    // @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private String id;

    private String username;
    private String password;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String homeAddress;

    public Farmer() {}

    public Farmer(String id, String username, String password, String email, String fullName, String phoneNumber, String homeAddress) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.homeAddress = homeAddress;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(String homeAddress) {
        this.homeAddress = homeAddress;
    }

    @Override
    public void login() {
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

    @Override
    public void giveFeedback() {
        throw new UnsupportedOperationException("Unimplemented method 'giveFeedback'");
    }

    @Override
    public void deleteOrder() {
        throw new UnsupportedOperationException("Unimplemented method 'deleteOrder'");
    }

    @Override
    public void updateOrder() {
        throw new UnsupportedOperationException("Unimplemented method 'updateOrder'");
    }
}

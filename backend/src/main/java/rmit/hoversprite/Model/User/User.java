package rmit.hoversprite.Model.User;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Id;

@MappedSuperclass

public class User {
    @Id
    private String id;
    
    private String password;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String homeAddress;

    // No-argument constructor
    public User() {}

    // Parameterized constructor
    public User(String id, String password, String email, String fullName, String phoneNumber, String homeAddress) {
        this.id = id;
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

    public void setUser(User user)
    {
        this.email = user.email;
        this.password = user.password;
        this.fullName = user.fullName;
        this.homeAddress = user.homeAddress;
    }
}

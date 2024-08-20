package rmit.hoversprite.Model.User;

import jakarta.persistence.MappedSuperclass;
import rmit.hoversprite.Utils.Enum.Role;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@MappedSuperclass

public class User {
    @Id
    private String id;
    
    private String password;
    private String email;
    private String fullName;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String homeAddress;

    // Add a field for storing the JWT token
    private String token;

    
    @Enumerated(EnumType.STRING)
    private Role role;

    @Lob
    @Column(length = 100000)
    private byte[] profileImage;

    // No-argument constructor
    public User() {}

    // Parameterized constructor
    public User(String id, String password, String email, String fullName, String phoneNumber, String homeAddress, 
        String firstName, String lastName, Role role, String token, byte[] profileImage) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.homeAddress = homeAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.token = token;
        this.profileImage = profileImage;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setRole(Role role)
    {
        this.role = role;
    }

    public Role getRole()
    {
        return this.role;
    }

    public byte[] getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(byte[] profileImage) {
        this.profileImage = profileImage;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.phoneNumber = user.phoneNumber;
        this.homeAddress = user.homeAddress;
        this.token = user.token;
        this.profileImage = user.profileImage;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public String getFirstName()
    {
        return this.firstName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public String getLastName()
    {
        return this.lastName;
    }
}

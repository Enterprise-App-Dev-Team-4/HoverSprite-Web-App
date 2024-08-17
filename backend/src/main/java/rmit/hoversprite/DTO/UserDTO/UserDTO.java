package rmit.hoversprite.DTO.UserDTO;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import rmit.hoversprite.Utils.Enum.Role;

public class UserDTO {
    private String id;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String homeAddress;
    private String lastName;
    private String firstName;
    
    @Enumerated(EnumType.STRING)
    private Role role;

    public UserDTO() {}

    public UserDTO(String id, String email, String fullName, String firstName, String lastName, String phoneNumber, String homeAddress, Role role) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.homeAddress = homeAddress;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
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
}

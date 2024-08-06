package rmit.hoversprite.Model.User;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Farm.Farm;

@Entity
@Table(name = "farmer", schema = "farmer_detail")
public class Farmer extends User {

     @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Farm> farms;

    public Farmer() {
        super();
    }

    public Farmer(String id, String password, String email, String fullName, String phoneNumber, String homeAddress) {
        super(id, password, email, fullName, phoneNumber, homeAddress);
    }

    public List<Farm> getFarms() {
        return farms;
    }

    public void setFarms(List<Farm> farms) {
        this.farms = farms;
    }
}

package rmit.hoversprite.Model.Farm;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

@Entity(name = "farms")
@Table(schema = "farmer_detail")
public class Farm {
    @Id
    private String farmID;
    private double farmArea;
    private String farmType;
    private String farmLocation;
    
}

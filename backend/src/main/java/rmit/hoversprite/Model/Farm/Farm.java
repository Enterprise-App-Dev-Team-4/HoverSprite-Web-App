package rmit.hoversprite.Model.Farm;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Utils.Enum.CropType;

@Entity(name = "farms")
@Table(schema = "farmer_detail")
public class Farm {
    @Id
    private String farmID;

    private double farmArea;
    
    @Enumerated(EnumType.STRING)
    private CropType cropType;

    private String farmLocation;

    // Many-to-One relationship with Farmer
    @ManyToOne
    @JoinColumn(name = "farmer_id")
    private Farmer farmer;


    // No-argument constructor
    public Farm() {}

    public Farm(String farmID, double farmArea, CropType cropType, String farmLocation, Farmer farmer)
    {
        this.farmID =farmID;
        this.farmArea = farmArea;
        this.cropType = cropType;
        this.farmLocation = farmLocation;
        this.farmer = farmer;
    }
    // Methods
    public String getFarmID() {
        return farmID;
    }

    public void setFarmID(String farmID) {
        this.farmID = farmID;
    }

    public double getFarmArea() {
        return farmArea;
    }

    public void setFarmArea(double farmArea) {
        this.farmArea = farmArea;
    }

    public CropType getCropType() {
        return cropType;
    }

    public void setCropType(CropType cropType) {
        this.cropType = cropType;
    }

    public String getFarmLocation() {
        return farmLocation;
    }

    public void setFarmLocation(String farmLocation) {
        this.farmLocation = farmLocation;
    }

    public Farmer getFarmer() {
        return farmer;
    }

    public void setFarmer(Farmer farmer) {
        this.farmer = farmer;
    }
}

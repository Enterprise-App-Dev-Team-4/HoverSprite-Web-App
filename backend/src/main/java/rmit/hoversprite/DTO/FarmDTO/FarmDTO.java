package rmit.hoversprite.DTO.FarmDTO;

import rmit.hoversprite.DTO.UserDTO.FarmerDTO;
import rmit.hoversprite.Utils.Enum.CropType;

public class FarmDTO {

    private String farmID;

    private double farmArea;
    
    private CropType cropType;

    private String farmLocation;


    // No-argument constructor
    public FarmDTO() {}

    public FarmDTO(String farmID, double farmArea, CropType cropType, String farmLocation)
    {
        this.farmID =farmID;
        this.farmArea = farmArea;
        this.cropType = cropType;
        this.farmLocation = farmLocation;
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

    // farmer dto getter and setter if needed
}

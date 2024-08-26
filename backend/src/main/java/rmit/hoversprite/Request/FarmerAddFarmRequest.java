package rmit.hoversprite.Request;

import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.User.Farmer;

public class FarmerAddFarmRequest {
    private Farm farm;
    private String farmerEmail;

    public FarmerAddFarmRequest() {}

    public FarmerAddFarmRequest(Farm farm, String farmerEmail) {
        this.farm = farm;
        this.farmerEmail = farmerEmail;
    }

    // Getter for farm
    public Farm getFarm() {
        return farm;
    }

    // Setter for farm
    public void setFarm(Farm farm) {
        this.farm = farm;
    }

    // Getter for farmerEmail
    public String getFarmerEmail() {
        return farmerEmail;
    }

    // Setter for farmerEmail
    public void setFarmerEmail(String farmerEmail) {
        this.farmerEmail = farmerEmail;
    }
}

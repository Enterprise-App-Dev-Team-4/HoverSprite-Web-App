package rmit.hoversprite.Model.OrderQueue;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Sprayer;

@Entity(name = "orderQueue")
@Table(schema = "farmer_detail")
public class OrderQueue {

    @Id
    private String queueID;

    @OneToOne
    @JoinColumn(name = "sprayer_id")
    private Sprayer sprayer;

    @OneToOne
    @JoinColumn(name = "farmer_id")
    private Farmer farmer;

    // Default Constructor
    public OrderQueue() {}

    // Parameterized Constructor
    public OrderQueue(String queueID, Sprayer sprayer, Farmer farmer) {
        this.queueID = queueID;
        this.sprayer = sprayer;
        this.farmer = farmer;
    }

    // Getter and Setter for queueID
    public String getQueueID() {
        return queueID;
    }

    public void setQueueID(String queueID) {
        this.queueID = queueID;
    }

    // Getter and Setter for sprayer
    public Sprayer getSprayer() {
        return sprayer;
    }

    public void setSprayer(Sprayer sprayer) {
        this.sprayer = sprayer;
    }

    // Getter and Setter for farmer
    public Farmer getFarmer() {
        return farmer;
    }

    public void setFarmer(Farmer farmer) {
        this.farmer = farmer;
    }
}

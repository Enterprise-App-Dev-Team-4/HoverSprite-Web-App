package rmit.hoversprite.Model.OrderQueue;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Sprayer;

@Entity(name = "order_queue")
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

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    // Default Constructor
    public OrderQueue() {}

    // Parameterized Constructor
    public OrderQueue(String queueID, Sprayer sprayer, Farmer farmer, Order order) {
        this.queueID = queueID;
        this.sprayer = sprayer;
        this.farmer = farmer;
        this.order = order;
    }

    // Getter and Setter for queueID
    public String getQueueID() {
        return queueID;
    }

    public void setQueueID(String queueID) {
        this.queueID = queueID;
    }

    public void setOrder(Order order)
    {
        this.order = order;
    }

    public Order getOrder()
    {
        return this.order;
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

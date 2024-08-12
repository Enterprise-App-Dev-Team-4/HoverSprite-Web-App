package rmit.hoversprite.Model.Order;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Utils.Enum.OrderStatus;

@Entity(name = "orders")
@Table(schema = "farmer_detail")
public class Order {
    @Id
    private String orderID;

    private String date;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private double totalCost;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    private Farmer farmer;

}

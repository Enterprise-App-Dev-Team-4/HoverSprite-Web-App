package rmit.hoversprite.Request;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Receptionist;

public class ReceptionistHandleOrderRequest {
    private Order order;

    public ReceptionistHandleOrderRequest() {}

    public ReceptionistHandleOrderRequest(Order order)
    {
        this.order = order;
    }

    public void setOrder(Order order)
    {
        this.order = order;
    }

    public Order getOrder()
    {
        return this.order;
    }
}

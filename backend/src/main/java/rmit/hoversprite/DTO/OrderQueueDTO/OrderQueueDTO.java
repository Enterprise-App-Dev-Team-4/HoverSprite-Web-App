package rmit.hoversprite.DTO.OrderQueueDTO;

public class OrderQueueDTO {
    private String queueID;
    private String orderID;
    private String farmerEmail;
    private String sprayerEmail;

    // Default Constructor
    public OrderQueueDTO() {}

    // Parameterized Constructor
    public OrderQueueDTO(String queueID, String orderID, String farmerEmail, String sprayerEmail) {
        this.queueID = queueID;
        this.orderID = orderID;
        this.farmerEmail = farmerEmail;
        this.sprayerEmail = sprayerEmail;
    }

    // Getter and Setter for queueID
    public String getQueueID() {
        return queueID;
    }

    public void setQueueID(String queueID) {
        this.queueID = queueID;
    }

    // Getter and Setter for orderID
    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    // Getter and Setter for farmerEmail
    public String getFarmerEmail() {
        return farmerEmail;
    }

    public void setFarmerEmail(String farmerEmail) {
        this.farmerEmail = farmerEmail;
    }

    // Getter and Setter for sprayerEmail
    public String getSprayerEmail() {
        return sprayerEmail;
    }

    public void setSprayerEmail(String sprayerEmail) {
        this.sprayerEmail = sprayerEmail;
    }
}

package rmit.hoversprite.DTO.ChargeDTO;

public class ChargeDTO {
    private String id;
    private Long amount;
    private String currency;
    private String description;
    
    // Getters and setters

    public ChargeDTO(String id, Long amount, String currency, String description) {
        this.id = id;
        this.amount = amount;
        this.currency = currency;
        this.description = description;
    }
}

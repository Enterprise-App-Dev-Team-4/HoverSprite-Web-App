package rmit.hoversprite.Utils;

public class Enum {

    public enum CropType 
    {
        CEREALS,
        FRUITS,
        VEGETABLES,
    }

    public enum OrderStatus
    {
        CANCELLED,
        PENDING,
        CONFIRMED,
        ASSIGNED,
        IN_PROGRESS, 
        COMPLETED
    }

    public enum ServiceName
    {
        UrbanSpraying,
        IndustrialSpraying,
        EnvironmentalSpraying,
        SafetySpraying
    }

    public enum ServiceType
    {
        CONSULT,
        SPRAYING
    }

    public enum SprayerExpertise
    {
        ExpertSprayer,
        AppretienceSprayer,
        AdeptSprayer
    }

    public enum Role
    {
        Farmer,
        Receptionist,
        Sprayer
    }
}

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
        PENDING,        // 0
        CONFIRMED,      // 1
        ASSIGNED,       // 2
        IN_PROGRESS,    // 3
        COMPLETED,      // 4
        CANCELLED       // 5
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

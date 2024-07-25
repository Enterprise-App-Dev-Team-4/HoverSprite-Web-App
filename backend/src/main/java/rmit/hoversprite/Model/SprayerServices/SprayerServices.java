package rmit.hoversprite.Model.SprayerServices;

public class SprayerServices {
    private String serviceID;
    private String serviceName;

    public SprayerServices()
    {
        this.serviceID = "";
        this.serviceName = "";
    }

    public void setServiceID(String serviceID)
    {
        this.serviceID = serviceID;
    }

    public void setServiceName(String serviceName)
    {
        this.serviceName = serviceName;
    }

    public String getServiceID()
    {
        return this.serviceID;
    }

    public String getServiceName()
    {
        return this.serviceName;
    }
}

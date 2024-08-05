package rmit.hoversprite.Model.SprayerServices;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name = "spray_services")
@Table(schema = "farmer_detail")
public class SprayServices {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private String nameOfService;
    private String serviceType; // 
    private double price;

    // getter/ setter
}

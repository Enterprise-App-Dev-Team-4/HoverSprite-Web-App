package rmit.hoversprite.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.User;

public interface DBFarmerRepository extends JpaRepository<Farmer, String> {
    public Farmer findByEmail(String email);
    
    public Farmer findFarmerById(String id);
}   


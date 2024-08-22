package rmit.hoversprite.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;

public interface DBServiceRepository extends JpaRepository<SprayServices, String>{
    
    public SprayServices findServiceById(String id);
}

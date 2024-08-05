package rmit.hoversprite.Repositories.DBServiceRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.SprayerServices.SprayServices;

public interface DBServiceRepository extends JpaRepository<SprayServices, Integer>{
    
}

package rmit.hoversprite.Repositories.DBFarmRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.Farm.Farm;

public interface DBFarmRepository extends JpaRepository<Farm, String>{
    
}

package rmit.hoversprite.Repositories.DBRegisterRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.User.Farmer;

public interface DBRegisterRepository extends JpaRepository<Farmer, String> {
    
}

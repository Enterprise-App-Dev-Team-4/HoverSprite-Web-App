package rmit.hoversprite.Repositories.DBUserRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.User;

public interface DBFarmerRepository extends JpaRepository<Farmer, String> {
    Farmer findByEmail(String email);
}


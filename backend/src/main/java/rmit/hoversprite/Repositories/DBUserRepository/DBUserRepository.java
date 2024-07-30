package rmit.hoversprite.Repositories.DBUserRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.User.Farmer;

public interface DBUserRepository extends JpaRepository<Farmer, Long> {
    Farmer findByUsername(String username);
}


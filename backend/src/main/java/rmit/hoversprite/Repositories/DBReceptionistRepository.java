package rmit.hoversprite.Repositories;

import rmit.hoversprite.Model.User.Receptionist;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DBReceptionistRepository extends JpaRepository<Receptionist, String>{
    Receptionist findByEmail(String email);
}

package rmit.hoversprite.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.DTO.SprayServicesDTO.SprayServicesDTO;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Sprayer;

public interface DBSprayerRepository extends JpaRepository<Sprayer, String>{
    Sprayer findByEmail(String sprayerEmail);

    Sprayer findByPhoneNumber(String phonNumber);
}

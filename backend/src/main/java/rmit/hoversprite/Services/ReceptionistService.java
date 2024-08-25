package rmit.hoversprite.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import rmit.hoversprite.Middleware.ReceptionistProfileUpdateRequest;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Repositories.DBReceptionistRepository;
import rmit.hoversprite.Response.AuthenticationResponse;
import rmit.hoversprite.Utils.Utils;

@Component
public class ReceptionistService {
    @Autowired
    DBReceptionistRepository receptionistRepository;

    @Autowired
    Utils utilsClass;

    @Autowired
    AuthenticationResponse authenticationResponse;

    @Autowired
    ReceptionistProfileUpdateRequest receptionistProfileUpdateRequest;

    public Receptionist getReceptionistData()
    {
        return authenticationResponse.getReceptionistByToken();
    }

    @Transactional
    public Receptionist updateReceptionistProfile(Receptionist receptionist)
    {
        Receptionist oldReceptionist = getReceptionistData();
        Receptionist updateReceptionist = receptionistProfileUpdateRequest.receptionistToReceptionist(receptionist, oldReceptionist);
        return receptionistRepository.save(updateReceptionist);
    }
}

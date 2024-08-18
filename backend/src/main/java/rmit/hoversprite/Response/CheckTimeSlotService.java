package rmit.hoversprite.Response;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Services.SprayerFeatureServices;

@Component
public class CheckTimeSlotService {

    public SprayServices fullFillTimeSlot(SprayServices sprayServices)
    {
        List<Integer> time_slot = sprayServices.getTimeSlots();
        if (time_slot == null) {
            time_slot = new ArrayList<>(); // Initialize the list if it's null
        }
        for(int i = 0; i < 6; i++)
        {
            time_slot.add(2);
            System.out.print("Time slot are: ");
            System.out.println(time_slot.get(i));
        }
        
        sprayServices.setTimeSlots(time_slot);
        return sprayServices;
    }
}

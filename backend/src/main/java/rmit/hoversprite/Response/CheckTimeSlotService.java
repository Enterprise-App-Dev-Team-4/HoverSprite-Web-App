package rmit.hoversprite.Response;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Services.OrderService;
import rmit.hoversprite.Services.SprayerFeatureServices;
import rmit.hoversprite.Utils.Utils;

@Component
public class CheckTimeSlotService {
    @Autowired
    Utils utilsClass;

    @Autowired
    OrderService orderService;

    // Predefined timeslot strings for comparison
    private static final List<String> availableTimeSlots = Arrays.asList(
        "04:00 - 05:00", "05:00 - 06:00", "06:00 - 07:00", "07:00 - 08:00",
        "16:00 - 17:00", "17:00 - 18:00"
    );
    
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

        /**
     * Filters out services from the list where all elements in timeSlots are 0.
     *
     * @param services List of SprayServices to filter.
     * @return A filtered list of SprayServices.
     */
    public List<SprayServices> filterServicesWithAllZeroTimeSlots(List<SprayServices> services) {
        return services.stream()
                .filter(service -> service.getTimeSlots().stream().anyMatch(slot -> slot != 0))
                .collect(Collectors.toList());
    }

    public List<Integer> checkTimeSlot(String date, SprayServices services) {
        // Extract date and time from the input using utilsClass
        
        ExtractedDateAndTime requestedDate = utilsClass.dateAndTimeValueExtracted(date);
        // Fetch all orders for the specified date
        List<Order> ordersOnRequestedDate = orderService.getOrderByDate(requestedDate.getDate());

        // Get the list of time slots for the service
        List<Integer> listTimeSlot = services.getTimeSlots();
        System.out.println("service timeslot: ");
        System.out.println(services.getTimeSlots());
        System.out.println(services.getServiceName());
        // Validate ordersOnRequestedDate and listTimeSlot
        if (ordersOnRequestedDate == null || listTimeSlot == null) {
            throw new IllegalArgumentException("Orders or service time slots are null.");
        }

        // Iterate over the orders to compare their service time slots with available time slots
        for (Order order : ordersOnRequestedDate) {
            String orderTimeSlot = order.getServiceTimeSlot();
            System.out.println(orderTimeSlot);
            // Find the index of the order's time slot in the available time slots
            int sessionIndex = availableTimeSlots.indexOf(orderTimeSlot);

            if (sessionIndex != -1 && sessionIndex < listTimeSlot.size()) {
                // Decrease the number of available slots by one
                int time_slot = listTimeSlot.get(sessionIndex);
                if (time_slot > 0) {
                    time_slot--;  // Only decrease if there's availability
                    listTimeSlot.set(sessionIndex, time_slot);  // Update the list
                }
                System.out.println("listTimeSlot: ");
                System.out.println(listTimeSlot);
            }
        }

        // Update the service with the modified time slots
        services.setTimeSlots(listTimeSlot);
        // Return the updated time slots
        return services.getTimeSlots();
    }
    
}

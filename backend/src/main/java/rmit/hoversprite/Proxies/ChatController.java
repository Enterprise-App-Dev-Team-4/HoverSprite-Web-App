package rmit.hoversprite.Proxies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.stereotype.Service;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Request.MessageBody;

@Service
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void farmerSendChatMessage(MessageBody message)
    {

        // Send the message to the user (farmer) using their email as the identifier
        for(String tmp : message.getSprayerEmail())
        {
            messagingTemplate.convertAndSendToUser(tmp, "/chat/messages", message.getContent());
        }
    }

    public void sprayerSendChatMessage(MessageBody message)
    {
        messagingTemplate.convertAndSendToUser(message.getFarmerEmail(), "/chat/messages", message.getContent());
    }


}

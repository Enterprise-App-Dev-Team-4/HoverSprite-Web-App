package rmit.hoversprite.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.Feedback.FeedbackSprayer;
import rmit.hoversprite.Model.Feedback.OrderFeedback;

public interface DBFeedbackSprayerRepository extends JpaRepository<FeedbackSprayer, String>{
    
}

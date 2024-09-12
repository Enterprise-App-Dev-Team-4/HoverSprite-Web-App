package rmit.hoversprite.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.Feedback.OrderFeedback;
import rmit.hoversprite.Model.Feedback.OrderFeedback;

public interface DBOrderFeedbackRepository extends JpaRepository<OrderFeedback, String>{
    
}

package rmit.hoversprite.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.Feedback.Feedback;

public interface DBFeedbackRepository extends JpaRepository<Feedback, String>{
    
}

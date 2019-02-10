package ca.mcgill.ecse428.potatopeeps.diningsession;

import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface DiningSessionRepository extends CrudRepository<DiningSession, Long> {

    List<DiningSession> findAllByDateAfter(LocalDateTime dateTime);

    List<DiningSession> findAllByDateBefore(LocalDateTime dateTime);

}

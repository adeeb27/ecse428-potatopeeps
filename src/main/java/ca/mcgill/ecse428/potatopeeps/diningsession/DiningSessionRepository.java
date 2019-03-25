package ca.mcgill.ecse428.potatopeeps.diningsession;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface DiningSessionRepository extends PagingAndSortingRepository<DiningSession, Long> {
}

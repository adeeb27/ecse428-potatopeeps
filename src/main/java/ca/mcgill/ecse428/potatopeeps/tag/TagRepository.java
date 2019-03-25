package ca.mcgill.ecse428.potatopeeps.tag;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface TagRepository  extends PagingAndSortingRepository<Tag, Long> {

    Optional<Tag> findByName(String name);

    Boolean existsByName(String name);

}

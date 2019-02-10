package ca.mcgill.ecse428.potatopeeps.tag;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TagRepository  extends CrudRepository<Tag, Long> {

    Optional<Tag> findByName(String name);

}

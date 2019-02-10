package ca.mcgill.ecse428.potatopeeps.menuitem;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface MenuItemRepository extends CrudRepository<MenuItem, Long> {

    Optional<MenuItem> findByName(String name);

}

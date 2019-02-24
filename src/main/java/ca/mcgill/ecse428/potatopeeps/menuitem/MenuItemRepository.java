package ca.mcgill.ecse428.potatopeeps.menuitem;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface MenuItemRepository extends PagingAndSortingRepository<MenuItem, Long> {

    Optional<MenuItem> findByName(String name);

    Boolean existsByName(String name);


}

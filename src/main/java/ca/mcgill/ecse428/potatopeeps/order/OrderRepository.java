package ca.mcgill.ecse428.potatopeeps.order;

import ca.mcgill.ecse428.potatopeeps.diningsession.DiningSession;
import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItem;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long> {

    List<Order> findAllByMenuItem(MenuItem menuItem);

    List<Order> findAllByDiningSession(DiningSession diningSession);

}

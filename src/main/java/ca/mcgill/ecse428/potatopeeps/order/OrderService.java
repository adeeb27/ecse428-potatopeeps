package ca.mcgill.ecse428.potatopeeps.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ca.mcgill.ecse428.potatopeeps.diningsession.DiningSession;
import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItem;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order addOrder(Order o) {
    	orderRepository.save(o);
    	return o;
    }

    /*
     * TODO: Review the necessity of code such as this in the application, seeing as creation of an object is done through React JS REST requests
     */

    public Order createOrder(Double price, Integer quantity, MenuItem item, DiningSession session) {
    	Order newOrder = new Order(price, quantity, item, session);
    	orderRepository.save(newOrder);
    	return newOrder;
    }
}

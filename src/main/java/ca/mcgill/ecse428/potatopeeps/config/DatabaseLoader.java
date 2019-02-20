package ca.mcgill.ecse428.potatopeeps.config;

import ca.mcgill.ecse428.potatopeeps.diningsession.DiningSessionRepository;
import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItem;
import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItemRepository;
import ca.mcgill.ecse428.potatopeeps.order.OrderRepository;
import ca.mcgill.ecse428.potatopeeps.tag.Tag;
import ca.mcgill.ecse428.potatopeeps.tag.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final MenuItemRepository menuItemRepository;
    private final TagRepository tagRepository;
    private final OrderRepository orderRepository;
    private final DiningSessionRepository diningSessionRepository;

    @Autowired
    public DatabaseLoader(MenuItemRepository menuItemRepository, TagRepository tagRepository, OrderRepository orderRepository, DiningSessionRepository diningSessionRepository){
        this.menuItemRepository = menuItemRepository;
        this.diningSessionRepository = diningSessionRepository;
        this.orderRepository = orderRepository;
        this.tagRepository = tagRepository;
    }


    // Objects generated and saved within this run method will be added and
    // stored directly to the connected database.
    @Override
    public void run(String... strings) throws Exception {
        try{
            this.menuItemRepository.save(new MenuItem("Calamari", 9.99, 20, "A generous portion of fresh, tender squid served in a blend of Italian tomatoes, virgin olive oil and spices."));
            this.tagRepository.save(new Tag("Seafood"));
            this.tagRepository.save(new Tag("Vegetarian"));
            this.tagRepository.save(new Tag("Meat"));
        } catch(Exception e){
            // Already exists in your database.
        }

    }

}

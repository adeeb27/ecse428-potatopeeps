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
            // CLEAR EXISTING TABLES
            Iterable<MenuItem> oldItems = menuItemRepository.findAll();
            for(MenuItem oldItem: oldItems){
                menuItemRepository.delete(oldItem);
            }
            Iterable<Tag> oldTags = tagRepository.findAll();
            for(Tag oldTag : oldTags){
                tagRepository.delete(oldTag);
            }

            // FILL MENU_ITEM TABLE
            MenuItem[] menuItems = new MenuItem[26];
            menuItems[0] = new MenuItem("snap peas", 3.5, 100, "roasted snap peas with sea salt");
            menuItems[1] = new MenuItem("spring roll", 4.0, 100, "--");
            menuItems[2] = new MenuItem("imperial roll", 4.0, 100, "--");
            menuItems[3] = new MenuItem("popcorn shrimp", 5.0, 100, "deep fried small shrimp");
            menuItems[4] = new MenuItem("tempura vegetables", 3.0, 100, "vegetables deep fried in tempura");
            menuItems[5] = new MenuItem("chicken curry", 11.0, 100, "mild chicken curry on rice");
            menuItems[6] = new MenuItem("vegetable curry", 10.0, 100, "moderately spicy vegetable curry on rice");
            menuItems[7] = new MenuItem("lamb curry", 12.0, 100, "spicy lamb curry on rice");
            menuItems[8] = new MenuItem("pork ramen", 12.0, 100, "ramen in pork broth");
            menuItems[9] = new MenuItem("chicken ramen", 11.0, 100, "ramen in chicken broth");
            menuItems[10] = new MenuItem("vegetarian ramen", 10.0, 100, "miso ramen, vegetable broth");
            menuItems[11] = new MenuItem("spicy salmon roll", 6.0, 100, "spicy salmon rolls, 6 pcs");
            menuItems[12] = new MenuItem("california roll", 5.0, 100, "cucumber, imitation crab and avocado roll, 6 pcs");
            menuItems[13] = new MenuItem("dynamite roll", 6.0, 100, "shrimp tempura, avocado, cucumber, masago roll, 4 pcs");
            menuItems[14] = new MenuItem("salmon sashimi", 6.0, 100, "fresh, raw salmon piece");
            menuItems[15] = new MenuItem("tuna sashimi", 10.0, 100, "fresh, raw tuna piece");
            menuItems[16] = new MenuItem("white tuna sashimi", 12.0, 100, "fresh, raw white tuna piece");
            menuItems[17] = new MenuItem("deep fried banana piece", 2.0, 100, "deep fried banana piece covered with syrup");
            menuItems[18] = new MenuItem("green tea ice cream", 2.0, 100, "green tea ice cream");
            menuItems[19] = new MenuItem("mango ice cream", 2.0, 100, "mango ice cream");
            menuItems[20] = new MenuItem("coke", 2.0, 100, "standard coke brand soft drink, served in a cup with ice");
            menuItems[21] = new MenuItem("sprite", 2.0, 100, "standard sprite brand soft drink, served in a cup with ice");
            menuItems[22] = new MenuItem("crush", 2.0, 100, "standard crush brand soft drink, served in a cup with ice");
            menuItems[23] = new MenuItem("beer", 4.0, 100, "microbrewed local beer");
            menuItems[24] = new MenuItem("red wine", 6.0, 100, "red wine, 15 years");
            menuItems[25] = new MenuItem("white wine", 6.0, 100, "white wine, 15 years");
            for (MenuItem menuItem : menuItems) {
                this.menuItemRepository.save(menuItem);
            }

            // FILL TAGS TABLE
            Tag[] tags = new Tag[7];
            tags[0] = new Tag("appetizer");
            tags[1] = new Tag("main meal");
            tags[2] = new Tag("soup");
            tags[3] = new Tag("dessert");
            tags[4] = new Tag("drink");
            tags[5] = new Tag("vegetarian");
            tags[6] = new Tag("spicy");
            for (Tag tag : tags) {
                this.tagRepository.save(tag);
            }

            // TO-DO: ASSIGN TAGS TO MENU ITEMS

        } catch(Exception e){
            // Already exists in your database.
        }

    }

}

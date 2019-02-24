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

import java.util.ArrayList;
import java.util.Arrays;

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
    public void run(String... strings) {

            Tag[] tags = new Tag[7];
            tags[0] = new Tag("appetizer");
            tags[1] = new Tag("main meal");
            tags[2] = new Tag("soup");
            tags[3] = new Tag("dessert");
            tags[4] = new Tag("drink");
            tags[5] = new Tag("vegetarian");
            tags[6] = new Tag("spicy");
            for (Tag tag : tags) {
                if(!tagRepository.existsByName(tag.getName())){
                    this.tagRepository.save(tag);
                }
            }

            Tag[] repositoryTags = new Tag[7];
            for(int i = 0; i < repositoryTags.length; i++){
                repositoryTags[i] = tagRepository.findByName(tags[i].getName()).orElse(null);
            }


            // FILL MENU_ITEM TABLE
            MenuItem[] menuItems = new MenuItem[26];
            menuItems[0] = new MenuItem("snap peas", 3.5, 100, "roasted snap peas with sea salt", new ArrayList<Tag>(Arrays.asList(repositoryTags[0])));
            menuItems[1] = new MenuItem("spring roll", 4.0, 100, "--", new ArrayList<Tag>(Arrays.asList(repositoryTags[0], repositoryTags[5], repositoryTags[6])));
            menuItems[2] = new MenuItem("imperial roll", 4.0, 100, "--", new ArrayList<Tag>(Arrays.asList(repositoryTags[0])));
            menuItems[3] = new MenuItem("popcorn shrimp", 5.0, 100, "deep fried small shrimp", new ArrayList<Tag>(Arrays.asList(repositoryTags[0])));
            menuItems[4] = new MenuItem("tempura vegetables", 3.0, 100, "vegetables deep fried in tempura", new ArrayList<Tag>(Arrays.asList(repositoryTags[0])));
            menuItems[5] = new MenuItem("chicken curry", 11.0, 100, "mild chicken curry on rice", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[6] = new MenuItem("vegetable curry", 10.0, 100, "moderately spicy vegetable curry on rice", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[7] = new MenuItem("lamb curry", 12.0, 100, "spicy lamb curry on rice", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[8] = new MenuItem("pork ramen", 12.0, 100, "ramen in pork broth", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[9] = new MenuItem("chicken ramen", 11.0, 100, "ramen in chicken broth", new ArrayList<Tag>(Arrays.asList(repositoryTags[2])));
            menuItems[10] = new MenuItem("vegetarian ramen", 10.0, 100, "miso ramen, vegetable broth", new ArrayList<Tag>(Arrays.asList(repositoryTags[2], repositoryTags[5])));
            menuItems[11] = new MenuItem("spicy salmon roll", 6.0, 100, "spicy salmon rolls, 6 pcs", new ArrayList<Tag>(Arrays.asList(repositoryTags[6])));
            menuItems[12] = new MenuItem("california roll", 5.0, 100, "cucumber, imitation crab and avocado roll, 6 pcs", new ArrayList<Tag>(Arrays.asList(repositoryTags[0])));
            menuItems[13] = new MenuItem("dynamite roll", 6.0, 100, "shrimp tempura, avocado, cucumber, masago roll, 4 pcs", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[14] = new MenuItem("salmon sashimi", 6.0, 100, "fresh, raw salmon piece", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[15] = new MenuItem("tuna sashimi", 10.0, 100, "fresh, raw tuna piece", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[16] = new MenuItem("white tuna sashimi", 12.0, 100, "fresh, raw white tuna piece", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[17] = new MenuItem("deep fried banana piece", 2.0, 100, "deep fried banana piece covered with syrup", new ArrayList<Tag>(Arrays.asList(repositoryTags[3])));
            menuItems[18] = new MenuItem("green tea ice cream", 2.0, 100, "green tea ice cream", new ArrayList<Tag>(Arrays.asList(repositoryTags[3])));
            menuItems[19] = new MenuItem("mango ice cream", 2.0, 100, "mango ice cream", new ArrayList<Tag>(Arrays.asList(repositoryTags[3])));
            menuItems[20] = new MenuItem("coke", 2.0, 100, "standard coke brand soft drink, served in a cup with ice", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            menuItems[21] = new MenuItem("sprite", 2.0, 100, "standard sprite brand soft drink, served in a cup with ice", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            menuItems[22] = new MenuItem("crush", 2.0, 100, "standard crush brand soft drink, served in a cup with ice", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            menuItems[23] = new MenuItem("beer", 4.0, 100, "microbrewed local beer", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            menuItems[24] = new MenuItem("red wine", 6.0, 100, "red wine, 15 years", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            menuItems[25] = new MenuItem("white wine", 6.0, 100, "white wine, 15 years", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            for (MenuItem menuItem : menuItems) {
                if(!menuItemRepository.existsByName(menuItem.getName())){
                    menuItemRepository.save(menuItem);
                }
            }
    }

}

package ca.mcgill.ecse428.potatopeeps.config;

import ca.mcgill.ecse428.potatopeeps.diningsession.DiningSession;
import ca.mcgill.ecse428.potatopeeps.diningsession.DiningSessionRepository;
import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItem;
import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItemRepository;
import ca.mcgill.ecse428.potatopeeps.order.Order;
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

            DiningSession[] diningSessions = new DiningSession[10];
            for(int i = 0; i < diningSessions.length; i++){
                diningSessions[i] = new DiningSession(i + 1);
                this.diningSessionRepository.save(diningSessions[i]);
            }

            Tag[] tags = new Tag[7];
            tags[0] = new Tag("Appetizer");
            tags[1] = new Tag("Main Course");
            tags[2] = new Tag("Soup");
            tags[3] = new Tag("Dessert");
            tags[4] = new Tag("Drink");
            tags[5] = new Tag("Vegetarian");
            tags[6] = new Tag("Spicy");
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
            menuItems[0] = new MenuItem("Snap Peas", 3.5, 100, "Roasted snap peas with sea salt", new ArrayList<Tag>(Arrays.asList(repositoryTags[0], repositoryTags[5])));
            menuItems[1] = new MenuItem("Spring Roll", 4.0, 100, "Small roll of thin pastry filled with vegetables", new ArrayList<Tag>(Arrays.asList(repositoryTags[0], repositoryTags[5], repositoryTags[6])));
            menuItems[2] = new MenuItem("Imperial Roll", 4.0, 100, "Crispy roll filled with vegetables", new ArrayList<Tag>(Arrays.asList(repositoryTags[0])));
            menuItems[3] = new MenuItem("Popcorn Shrimp", 5.0, 100, "Deep fried small shrimp", new ArrayList<Tag>(Arrays.asList(repositoryTags[0])));
            menuItems[4] = new MenuItem("Tempura Vegetables", 3.0, 100, "Vegetables deep fried in tempura", new ArrayList<Tag>(Arrays.asList(repositoryTags[0])));
            menuItems[5] = new MenuItem("Chicken Curry", 11.0, 100, "Mild chicken curry on rice", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[6] = new MenuItem("Vegetable Curry", 10.0, 100, "Moderately spicy vegetable curry on rice", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[7] = new MenuItem("Lamb Curry", 12.0, 100, "Spicy lamb curry on rice", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[8] = new MenuItem("Pork Ramen", 12.0, 100, "Ramen in pork broth", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[9] = new MenuItem("Chicken Ramen", 11.0, 100, "Ramen in chicken broth", new ArrayList<Tag>(Arrays.asList(repositoryTags[2])));
            menuItems[10] = new MenuItem("Vegetarian Ramen", 10.0, 100, "Miso ramen, vegetable broth", new ArrayList<Tag>(Arrays.asList(repositoryTags[2], repositoryTags[5])));
            menuItems[11] = new MenuItem("Spicy Salmon Roll", 6.0, 100, "Spicy salmon rolls, 6 pcs", new ArrayList<Tag>(Arrays.asList(repositoryTags[6])));
            menuItems[12] = new MenuItem("California Roll", 5.0, 100, "Cucumber, imitation crab and avocado roll, 6 pcs", new ArrayList<Tag>(Arrays.asList(repositoryTags[5])));
            menuItems[13] = new MenuItem("Dynamite Roll", 6.0, 100, "Shrimp tempura, avocado, cucumber, masago roll, 4 pcs", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[14] = new MenuItem("Salmon Sashimi", 6.0, 100, "Fresh, raw salmon piece", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[15] = new MenuItem("Tuna Sashimi", 10.0, 100, "Fresh, raw tuna piece", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[16] = new MenuItem("White Tuna Sashimi", 12.0, 100, "Fresh, raw white tuna piece", new ArrayList<Tag>(Arrays.asList(repositoryTags[1])));
            menuItems[17] = new MenuItem("Deep Fried Banana Piece", 2.0, 100, "Deep fried banana piece covered with syrup", new ArrayList<Tag>(Arrays.asList(repositoryTags[3])));
            menuItems[18] = new MenuItem("Green Tea Ice Cream", 2.0, 100, "Green tea flavoured ice cream", new ArrayList<Tag>(Arrays.asList(repositoryTags[3])));
            menuItems[19] = new MenuItem("Mango Ice Cream", 2.0, 100, "Mango flavoured ice cream", new ArrayList<Tag>(Arrays.asList(repositoryTags[3])));
            menuItems[20] = new MenuItem("Coke", 2.0, 100, "Standard coke brand soft drink, served in a cup with ice", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            menuItems[21] = new MenuItem("Sprite", 2.0, 100, "Standard sprite brand soft drink, served in a cup with ice", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            menuItems[22] = new MenuItem("Crush", 2.0, 100, "Standard crush brand soft drink, served in a cup with ice", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            menuItems[23] = new MenuItem("Beer", 4.0, 100, "Microbrewed local beer", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            menuItems[24] = new MenuItem("Red Wine", 6.0, 100, "Red wine, 15 years", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            menuItems[25] = new MenuItem("White Wine", 6.0, 100, "White wine, 15 years", new ArrayList<Tag>(Arrays.asList(repositoryTags[4])));
            for (MenuItem menuItem : menuItems) {
                if(!menuItemRepository.existsByName(menuItem.getName())){
                    menuItemRepository.save(menuItem);
                }
            }
            
            // FILL ORDER TABLE
            Order[] orders = new Order[10];
            orders[0] = new Order(menuItems[0].getPrice(), 1, menuItems[0], diningSessions[0]);
            orders[1] = new Order(menuItems[3].getPrice(), 2, menuItems[3], diningSessions[0]);
            orders[2] = new Order(menuItems[7].getPrice(), 1, menuItems[7], diningSessions[0]);
            orders[3] = new Order(menuItems[13].getPrice(), 4, menuItems[13], diningSessions[0]);
            orders[4] = new Order(menuItems[25].getPrice(), 1, menuItems[25], diningSessions[1]);
            orders[5] = new Order(menuItems[19].getPrice(), 1, menuItems[19], diningSessions[1]);
            orders[6] = new Order(menuItems[2].getPrice(), 1, menuItems[2], diningSessions[2]);
            orders[7] = new Order(menuItems[15].getPrice(), 1, menuItems[15], diningSessions[3]);
            orders[8] = new Order(menuItems[11].getPrice(), 1, menuItems[11], diningSessions[4]);
            orders[9] = new Order(menuItems[9].getPrice(), 1, menuItems[9], diningSessions[4]);
            for (Order order : orders) {
            	orderRepository.save(order);
//                if(!orderRepository.existsById(order.getId())){
//                	orderRepository.save(order);
//                }
            }
    }

}

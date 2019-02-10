package ca.mcgill.ecse428.potatopeeps.config;

import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItem;
import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final MenuItemRepository menuItemRepository;

    @Autowired
    public DatabaseLoader(MenuItemRepository menuItemRepository){
        this.menuItemRepository = menuItemRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.menuItemRepository.save(new MenuItem("Calamari", 9.99, 20, "A generous portion of fresh, tender squid served in a blend of Italian tomatoes, virgin olive oil and spices."));
    }

}

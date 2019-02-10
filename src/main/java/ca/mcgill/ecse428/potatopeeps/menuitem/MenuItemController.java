package ca.mcgill.ecse428.potatopeeps.menuitem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("menuitem")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

}

package ca.mcgill.ecse428.potatopeeps.diningsession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("diningsession")
public class DiningSessionController {

    @Autowired
    private DiningSessionService diningSessionService;

}

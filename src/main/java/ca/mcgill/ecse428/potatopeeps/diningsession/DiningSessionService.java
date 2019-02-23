package ca.mcgill.ecse428.potatopeeps.diningsession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ca.mcgill.ecse428.potatopeeps.order.Order;

@Service
public class DiningSessionService {

    @Autowired
    private DiningSessionRepository diningSessionRepository;

}
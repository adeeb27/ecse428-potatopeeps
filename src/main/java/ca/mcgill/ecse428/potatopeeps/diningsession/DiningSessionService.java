package ca.mcgill.ecse428.potatopeeps.diningsession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiningSessionService {

    @Autowired
    private DiningSessionRepository diningSessionRepository;

}

package ca.mcgill.ecse428.potatopeeps.order;

import ca.mcgill.ecse428.potatopeeps.diningsession.DiningSession;
import ca.mcgill.ecse428.potatopeeps.diningsession.DiningSessionRepository;
import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItem;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;

@Data
@Entity
public class Order {

    public Order() {
    }

    enum OrderStatus {
        ONGOING, COMPLETED;
    }

    /***
     * Creates a dining session and adds the order to it
     * Note: this constructor should be used in the case of no existing ONGOING dining session.
     *       React logic should be able to parse and determine which constructor to use.
     * @param tableNumber required for creating DiningSession
     * @see DiningSession
     */
    public Order(Double price, Integer quantity, MenuItem menuItem, Integer tableNumber) {
        this.price = price;
        this.quantity = quantity;
        this.menuItem = menuItem;
        this.status = OrderStatus.ONGOING;
        /* TODO: creation of dining session
         *  Can either implement here, however running into issues saving to the other table
         *  or have react create a diningsession and pass it in to the other constructor
         */
//        DiningSession dsession = new DiningSession(tableNumber);
//        this.diningSessionRepository.save(dsession);
//        this.diningSession = dsession;
    }


    /***
     * Adds an order to an existing dining session.
     * @param session
     */
    public Order(Double price, Integer quantity, MenuItem item, DiningSession session) {
        this.price = price;
        this.quantity = quantity;
        this.menuItem = item;
        this.diningSession = session;
        this.status = OrderStatus.ONGOING;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "menu_item_id", nullable = false)
    private MenuItem menuItem;

    @ManyToOne
    @JoinColumn(name = "dining_session_id", nullable = false)
    private DiningSession diningSession;

}

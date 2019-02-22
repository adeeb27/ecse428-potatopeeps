package ca.mcgill.ecse428.potatopeeps.order;

import ca.mcgill.ecse428.potatopeeps.diningsession.DiningSession;
import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItem;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Order {

    public Order() {
    }

    public Order(Double price, Integer quantity) {
        this.price = price;
        this.quantity = quantity;
    }

    public Order(Double price, Integer quantity, MenuItem item, DiningSession session) {
        this.price = price;
        this.quantity = quantity;
        menuItem = item;
        diningSession = session;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private Double price;

    @Column(name = "status")
    private String status;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "menu_item_id", nullable = false)
    private MenuItem menuItem;

    @ManyToOne
    @JoinColumn(name = "dining_session_id", nullable = false)
    private DiningSession diningSession;

}

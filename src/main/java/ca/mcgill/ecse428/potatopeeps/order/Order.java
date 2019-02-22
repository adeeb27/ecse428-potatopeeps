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

    public Order(Double price, Integer quantity, MenuItem menuItem) {
        this.price = price;
        this.quantity = quantity;
        this.menuItem = menuItem;
    }

    enum OrderStatus {
        ONGOING, COMPLETED;
    }

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

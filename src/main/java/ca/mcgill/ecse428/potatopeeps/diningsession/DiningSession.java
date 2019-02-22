package ca.mcgill.ecse428.potatopeeps.diningsession;

import ca.mcgill.ecse428.potatopeeps.order.Order;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Entity
public class DiningSession implements Serializable {

    private static final long serialVersionUID = 1132661429342356175L;

    public DiningSession() {
    }

    enum DiningSessionStatus {
        ONGOING, COMPLETED;
    }
    public DiningSession(Integer tableNumber) {
        this.tableNumber = tableNumber;
        this.status = DiningSessionStatus.ONGOING;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="date")
    private LocalDateTime date;

    @Column(name="price")
    private Double price;

    @Column(name="table_number")
    private Integer tableNumber;

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private DiningSessionStatus status;

    @OneToMany(mappedBy="diningSession")
    private Set<Order> orders;
    
//    public void addOrder(Order o) {
//    	orders.add(o);
//    }
    
}

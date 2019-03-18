package ca.mcgill.ecse428.potatopeeps.diningsession;

import ca.mcgill.ecse428.potatopeeps.order.Order;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class DiningSession implements Serializable {

    private static final long serialVersionUID = 1132661429342356175L;

    public DiningSession() {
    }

    enum DiningSessionStatus {
        ACTIVE, INACTIVE
    }

    enum ServiceRequestStatus {
        ACTIVE, INACTIVE
    }

    enum BillRequestStatus {
        ACTIVE, INACTIVE
    }

    /**
     * @param tableNumber will be parsed via React. Method TBD but should be able to track tableNumber
     *
     * I believe
     */
    public DiningSession(Integer tableNumber) {
        this.tableNumber = tableNumber;
        this.diningSessionStatus = DiningSessionStatus.INACTIVE;
        this.serviceRequestStatus = ServiceRequestStatus.INACTIVE;
        this.billRequestStatus = BillRequestStatus.INACTIVE; //TODO: Check if these two settings are necessary
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="price")
    private Double price;

    @Column(name="table_number")
    private Integer tableNumber;

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private DiningSessionStatus diningSessionStatus;

    @Enumerated(EnumType.STRING)
    @Column(name="sr_status")
    private ServiceRequestStatus serviceRequestStatus;

    @Enumerated(EnumType.STRING)
    @Column(name="br_status")
    private BillRequestStatus billRequestStatus;

    @OneToMany(mappedBy="diningSession")
    private List<Order> orders;
    
}

package ca.mcgill.ecse428.potatopeeps.menuitem;

import ca.mcgill.ecse428.potatopeeps.order.Order;
import ca.mcgill.ecse428.potatopeeps.tag.Tag;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Entity
public class MenuItem implements Serializable {

    private static final long serialVersionUID = 1132661429342356177L;

    public MenuItem() {
    }

    public MenuItem(String name, Double price, Integer inventory, String description, List tags) {
        this.name = name;
        this.price = price;
        this.inventory = inventory;
        this.description = description;
        this.tags = tags;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "inventory", nullable = false)
    private Integer inventory;

    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "menuItem")
    private Set<Order> orders;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name="menu_item_tags",
            joinColumns = @JoinColumn(name = "menu_item_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<Tag> tags = new ArrayList<>();

}

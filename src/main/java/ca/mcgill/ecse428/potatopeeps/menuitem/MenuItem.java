package ca.mcgill.ecse428.potatopeeps.menuitem;

import ca.mcgill.ecse428.potatopeeps.order.Order;
import ca.mcgill.ecse428.potatopeeps.tag.Tag;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Data
@Entity
public class MenuItem implements Serializable {

    public MenuItem() {
    }

    public MenuItem(String name, Double price, Integer inventory, String description) {
        this.name = name;
        this.price = price;
        this.inventory = inventory;
        this.description = description;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "inventory")
    private Integer inventory;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "menuItem")
    private Set<Order> orders;

    @ManyToMany
    @JoinTable(
            name="menu_item_tags",
            joinColumns = @JoinColumn(name = "menu_item_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    Set<Tag> tags;
}

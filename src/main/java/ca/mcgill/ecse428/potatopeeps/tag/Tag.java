package ca.mcgill.ecse428.potatopeeps.tag;

import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItem;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class Tag {

    public Tag() {
    }

    public Tag(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "tags")
    Set<MenuItem> menuItems;
}

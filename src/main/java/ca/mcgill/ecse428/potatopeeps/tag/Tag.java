package ca.mcgill.ecse428.potatopeeps.tag;

import ca.mcgill.ecse428.potatopeeps.menuitem.MenuItem;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Data
@Entity
public class Tag implements Serializable {

    private static final long serialVersionUID = 1132661429342356176L;

    public Tag() {
    }

    public Tag(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique = true)
    private String name;

    @ManyToMany(mappedBy = "tags")
    Set<MenuItem> menuItems;
}

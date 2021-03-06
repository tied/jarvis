package org.safehaus.dao.entities.stash;


import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import com.impetus.kundera.index.Index;
import com.impetus.kundera.index.IndexCollection;

import static org.safehaus.Constants.DATABASE_SCHEMA;

/**
 * Created by neslihan on 03.07.2015.
 */
@Entity
@Table( name = "hibernate_link_map", schema = DATABASE_SCHEMA )
@IndexCollection( columns = {
        @Index( name = "id" )
} )
public class HibernateLinkMap
{

    @Id
    @TableGenerator( name = "id_gen", allocationSize = 30, initialValue = 100 )
    @GeneratedValue( generator = "id_gen", strategy = GenerationType.TABLE )
    @Column( name = "link_id" )
    private long id;

    @ElementCollection
    @Column( name = "links_map_value" )
    private Map<String, String> linksMap = new HashMap<>();


    public HibernateLinkMap( Map<String, String> linksMap )
    {
        this.linksMap = linksMap;
    }


    public HibernateLinkMap()
    {
    }


    public void setLinksMap( Map<String, String> linksMap )
    {
        this.linksMap = linksMap;
    }


    public Map<String, String> getLinksMap()
    {
        return linksMap;
    }
}

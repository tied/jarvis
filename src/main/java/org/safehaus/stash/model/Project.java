package org.safehaus.stash.model;


import java.util.Map;
import java.util.Set;

import org.safehaus.dao.entities.stash.Link;

import com.google.common.base.Objects;
import com.google.gson.annotations.SerializedName;


/**
 * Represents a stash project
 */
public class Project
{
    private String key;
    private long id;
    private String name;
    private String description;
    @SerializedName( "public" )
    private boolean isPublic;
    private ProjectType type;
    private Link link;
    private Map<String, Set<Map<String, String>>> links;


    public String getKey()
    {
        return key;
    }


    public long getId()
    {
        return id;
    }


    public String getName()
    {
        return name;
    }


    public String getDescription()
    {
        return description;
    }


    public boolean isPublic()
    {
        return isPublic;
    }


    public ProjectType getType()
    {
        return type;
    }


    public Link getLink()
    {
        return link;
    }


    public Map<String, Set<Map<String, String>>> getLinks()
    {
        return links;
    }


    @Override
    public String toString()
    {
        return Objects.toStringHelper( this ).add( "key", key ).add( "id", id ).add( "name", name )
                      .add( "description", description ).add( "isPublic", isPublic ).add( "type", type )
                      .add( "link", link ).add( "links", links ).toString();
    }
}

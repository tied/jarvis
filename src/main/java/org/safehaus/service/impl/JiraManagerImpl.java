package org.safehaus.service.impl;


import java.util.ArrayList;
import java.util.List;

import org.safehaus.exceptions.JiraClientException;
import org.safehaus.model.JarvisIssue;
import org.safehaus.model.JarvisIssueType;
import org.safehaus.model.JarvisLink;
import org.safehaus.model.JarvisMember;
import org.safehaus.model.JarvisProject;
import org.safehaus.service.JiraClient;
import org.safehaus.service.JiraManager;
import org.safehaus.util.JarvisContextHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.atlassian.jira.rest.client.api.domain.Issue;
import com.atlassian.jira.rest.client.api.domain.IssueLink;
import com.atlassian.jira.rest.client.api.domain.IssueType;
import com.atlassian.jira.rest.client.api.domain.Project;
import com.atlassian.jira.rest.client.api.domain.Transition;


@Service( "jiraManager" )
public class JiraManagerImpl implements JiraManager
{
    private static Logger logger = LoggerFactory.getLogger( JiraManagerImpl.class );


    @Override
    public List<JarvisMember> getProjectMemebers( final String projectId ) throws JiraClientException
    {
        return getJiraClient() == null ? null : getJiraClient().getProjectMemebers( projectId );
    }


    @Override
    public List<JarvisIssue> getIssues( final String projectId ) throws JiraClientException
    {
        return getJiraClient().getIssues( projectId );
    }


    @Override
    public JarvisProject getProject( final String projectId ) throws JiraClientException


    {
        Project project = getJiraClient().getProject( projectId );
        List<String> types = new ArrayList<>();

        for ( final IssueType issueType : project.getIssueTypes() )
        {
            types.add( issueType.getName() );
        }
        return new JarvisProject( project.getId(), project.getKey(), project.getName(), project.getDescription(),
                types );
    }


    @Override
    public List<JarvisProject> getProjects() throws JiraClientException
    {
        List<Project> projects = getJiraClient().getAllProjects();
        List<JarvisProject> result = new ArrayList<>();

        for ( Project project : projects )
        {

            List<String> types = new ArrayList<>();

            for ( final IssueType issueType : project.getIssueTypes() )
            {
                types.add( issueType.getName() );
            }
            result.add(
                    new JarvisProject( project.getId(), project.getKey(), project.getName(), project.getDescription(),
                            types ) );
        }
        return result;
    }


    @Override
    public JarvisIssue getIssue( final String issueId ) throws JiraClientException
    {
        Issue issue = getJiraClient().getIssue( issueId );
        return buildJarvisIssue( issue );
    }


    @Override
    public JarvisIssue createIssue( final JarvisIssue issue ) throws JiraClientException
    {
        Issue jiraIssue = getJiraClient().createIssue( issue );
        return buildJarvisIssue( jiraIssue );
    }


    @Override
    public void buildBlocksChain( final String issueId, List<JarvisIssue> chain ) throws JiraClientException
    {

        JarvisIssue issue = getIssue( issueId );

        JarvisLink blockedIssueLink = issue.getLink( JiraClient.BLOCKS_LINK_NAME, JiraClient.OUTBOUND );
        if ( blockedIssueLink != null )
        {
            buildBlocksChain( blockedIssueLink.getKey(), chain );
        }

        chain.add( issue );
    }


    @Override
    public void startIssue( String issueKeyOrId ) throws JiraClientException
    {
        getJiraClient().startIssue( issueKeyOrId );
    }


    @Override
    public void resolveIssue( String issueKeyOrId ) throws JiraClientException
    {
        getJiraClient().resolveIssue( issueKeyOrId );
    }


    private JarvisIssue buildJarvisIssue( Issue issue ) throws JiraClientException
    {
        if ( issue == null )
        {
            return new JarvisIssue();
        }
        List<JarvisLink> links = new ArrayList<>();
        for ( IssueLink link : issue.getIssueLinks() )
        {
            Issue i = getJiraClient().getIssue( link.getTargetIssueKey() );
            links.add( new JarvisLink( i.getId(), link.getTargetIssueKey(), link.getIssueLinkType().getName(),
                    link.getIssueLinkType().getDirection().name(),
                    new JarvisIssueType( i.getIssueType().getId(), i.getIssueType().getName() ) ) );
        }
        return new JarvisIssue( issue.getId(), issue.getKey(), issue.getSummary(),
                new JarvisIssueType( issue.getIssueType().getId(), issue.getIssueType().getName() ),
                issue.getDescription(), issue.getTimeTracking() != null ?
                                        ( issue.getTimeTracking().getRemainingEstimateMinutes() != null ?
                                          issue.getTimeTracking().getRemainingEstimateMinutes().toString() : null ) :
                                        null, issue.getAssignee() != null ? issue.getAssignee().getName() : null,
                issue.getReporter() != null ? issue.getReporter().getName() : null, issue.getComponents().toString(),
                issue.getLabels().toString(), issue.getStatus().getName(),
                issue.getResolution() != null ? issue.getResolution().getName() : null,
                issue.getFixVersions() != null ? issue.getFixVersions().toString() : null,
                issue.getCreationDate().toString(), links, issue.getProject().getKey() );
    }

    @Override
    public Iterable<Transition> getTransitions(String issueIdOrKey) throws JiraClientException
    {
        return getJiraClient().getTransitions( issueIdOrKey );
    }

    private JiraClient getJiraClient() throws JiraClientException
    {
        return JarvisContextHolder.getContext().getJiraClient();
    }
}
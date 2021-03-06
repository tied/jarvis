package org.safehaus.service.api;


import java.util.List;

import org.safehaus.dao.entities.UserMetricInfo;

/**
 * Created by kisik on 17.09.2015.
 */
public interface UserMetricService {

    public List<UserMetricInfo> getUserMetricInfoListByDevId(String developerId);

    public UserMetricInfo getUserMetricInfo(String developerId, long timestamp);

    public List<UserMetricInfo> getUserMetricInfoListByMonth(long timestamp);
}

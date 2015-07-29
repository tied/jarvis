package org.safehaus.analysis;

import kafka.serializer.Decoder;
import kafka.serializer.Encoder;
import kafka.utils.VerifiableProperties;
import org.safehaus.stash.model.StashMetricIssue;

import java.io.*;

/**
 * Created by neslihan on 27.07.2015.
 */
public class StashMetricIssueKafkaSerializer implements Encoder<StashMetricIssue>, Decoder<StashMetricIssue> {

    public StashMetricIssueKafkaSerializer(VerifiableProperties props) {}

    public StashMetricIssue fromBytes(byte[] bytes) {
        StashMetricIssue obj = null;
        ByteArrayInputStream bais = null;
        ObjectInputStream ois = null;

        try
        {
            bais = new ByteArrayInputStream(bytes);
            ois = new ObjectInputStream(bais);
            obj = (StashMetricIssue) ois.readObject();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            try
            {
                ois.close();
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }
        return obj;
    }

    public byte[] toBytes(StashMetricIssue stashMetricObj) {
        byte[] bytes = null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = null;

        try {
            oos = new ObjectOutputStream(baos);
            oos.writeObject(stashMetricObj);
            bytes = baos.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
        }finally
        {
            try
            {
                oos.close();
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }

        return bytes;
    }
}
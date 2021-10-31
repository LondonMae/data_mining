import weka.core.*;
import weka.core.Instances;
import weka.core.converters.JSONLoader;
import weka.core.converters.JSONSaver;
import weka.core.converters.ConverterUtils.DataSource;
import java.io.File;

public class Test {
  public static void main(String args[]) throws Exception {
    JSONLoader jsonLoader = new JSONLoader();
    JSONSaver jsonSaver = new JSONSaver();
    DataSource source = new DataSource("diabetes.arff");
    Instances data = source.getDataSet();
    File f = new File("diabetes.json");
    jsonSaver.setFile(f);

    jsonSaver.setInstances(data);
    jsonSaver.writeBatch();

    // System.out.println(data.numInstances()+" instances loaded.");
    // System.out.println(data.toString());
  }
}

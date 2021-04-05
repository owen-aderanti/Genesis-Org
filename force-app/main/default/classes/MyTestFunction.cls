public class MyTestFunction {
    public static void myTest(Id id){
        // Used to get all fields of a that records object.
        id i = id;
        // Gets results for placing in list
        DescribeSObjectResult a = i.getSobjectType().getDescribe();
        // Transfers field names into a list
        List<String> fields = new List<String>(a.fields.getMap().keySet());
        // Gets all fields from list into one string for SOQL query
        String query = 'SELECT ' + String.join(fields, ',') + ' FROM ' + a.getName() + ' WHERE ' + 'Id =: i '+ ' LIMIT 1 ';
        //Return all of the data into a list for verifying result
        SObject res = Database.query(query);
        
    }
}
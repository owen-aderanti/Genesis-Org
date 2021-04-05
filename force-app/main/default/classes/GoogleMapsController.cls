/*
 * Created by Owen Aderanti.
 * 
 * Description: Controller class for Google Maps lightning component.
 * 
 * Last modified by Owen on 11-01-2020.
*/
public class GoogleMapsController {
    @AuraEnabled public static SObject getFields(id recordId){
        string recId = recordId;
        DescribeSObjectResult res = recordId.getSObjectType().getDescribe();
        
        list<string> fields = new list<string>(res.fields.getMap().keySet());
        
        string query = 'SELECT ' + string.join(fields,',') + ' FROM ' + res.getName() + ' WHERE Id =: recId';
        
        Account account = database.query(query);
        
        return account;
    }
}
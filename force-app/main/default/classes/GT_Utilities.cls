/*
 * Created on 05-04-2021.
 * 
 * Description: Utility class for Inserts, Updates, Deletes & Reads to/from Database.
 * 
 * Last modified on 05-04-2021.
*/
public with sharing class GT_Utilities {
    /*
    * Description: Retrieves records from Database.
    *
    * Last modified on 05-04-2021.
    */
    public static list<sObject> GetRecords(string objectApiName, list<string> recordIds, string searchField, string extraFields){
        string query = 'SELECT ' + string.join( GetObjectFields(objectApiName), ',' );
        
        if( (extraFields != '') && (extraFields != null) ){ query += ',' + extraFields; }
        
        query += ' FROM ' + objectApiName;
        
        if( (searchField != '') && (searchField != null) ){ query += ' WHERE ' + searchField + ' =: recordIds'; }
        
        return database.query(query);
    }
    
    /*
    * Description: Retrieved list of all fields from sepcified object.
    *
    * Last modified on 05-04-2021.
    */
    public static list<string> GetObjectFields(string objectApiName){
        return new list<string>( Schema.getGlobalDescribe().get(objectApiName).getDescribe().fields.getMap().keySet() );
    }
    
    /*
    * Description: Deletes records from Database.
    *
    * Last modified on 05-04-2021.
    */
    public static boolean DeleteRecords(list<sObject> records){
        string recordIds = ''; for( sObject o : records ){ recordIds += o.Id + ','; }  recordIds.removeEnd(',');
        try{ delete records; return true; } catch(exception e){ insert new owenAde__Error_Log__c(owenAde__Error_Message__c =e.getMessage(), owenAde__Error_Trace__c = e.getStackTraceString(), owenAde__Related_Records__c = recordIds); return false; }
    }
    
    /*
    * Description: Updates records in Database.
    *
    * Last modified on 05-04-2021.
    */
    public static boolean UpdateRecords(list<sObject> records){
        string recordIds = ''; for( sObject o : records ){ recordIds += o.Id + ','; }  recordIds.removeEnd(',');
        try{ update records; return true; } catch(exception e){ insert new owenAde__Error_Log__c(owenAde__Error_Message__c =e.getMessage(), owenAde__Error_Trace__c = e.getStackTraceString(), owenAde__Related_Records__c = recordIds); return false; }
    }
    
    /*
    * Description: Inserts records into Database.
    *
    * Last modified on 05-04-2021.
    */
    public static boolean InsertRecords(list<sObject> records){
        try{ insert records; return true; } catch(exception e){ insert new owenAde__Error_Log__c(owenAde__Error_Message__c =e.getMessage(), owenAde__Error_Trace__c = e.getStackTraceString()); return false; }
    }
}

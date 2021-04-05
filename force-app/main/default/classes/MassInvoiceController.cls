/*
 * Created by Owen Aderanti.
 * 
 * Description: Controller for the Invoice Upsert code.
 * 
 * Last modified on 07-04-2020.
*/
public with sharing class MassInvoiceController {
    
    // ------- AuraEnabled Public Class(es) ------- \\ 
    
    @AuraEnabled(cacheable=true)
    public static List<RecordsData> getRecords(string searchString, string objectName){
        return getRecordsWorker(searchString, objectName);
    }
    
    @AuraEnabled
    public static String insertRecords(string value){
        return CreateTestRecord(value);
    }

    // ------- Private Class(es) ------- \\
    
    @testvisible static List<RecordsData> getRecordsWorker(string searchString, string objectName){
        List<RecordsData> newList = new List<RecordsData>();
        
        try{
            string query = 'SELECT Id, Name FROM '+ objectName +' WHERE Name LIKE ' + '\'' + String.escapeSingleQuotes(searchString.trim()) + '%\' LIMIT 20';
            
            for(sObject s : Database.query(query)){
                RecordsData a = new RecordsData();
                a.value = String.valueOf(s.get('Id'));
                a.label = String.valueOf(s.get('Name'));
                newList.add(a);
            }
        }
        catch(Exception e) { system.debug('Error getting Accounts - '+ e +' - MassInvoiceController.getRecordsWorker Method.'); }
        
        return newList;
    }
    
    @testvisible static String CreateTestRecord(string value){
        string result;
        boolean phaseOne = true, phaseTwo = true, phaseThree = false;
        List<RetrievalData> records = new List<RetrievalData>();
        List<Opportunity> opps = new List<Opportunity>();
        List<OpportunityLineItem> olis = new List<OpportunityLineItem>();
        
        try { records = (List<RetrievalData>)JSON.deserialize(value, List<RetrievalData>.class); }
        catch(Exception e) { system.debug('Error converting JSON to Wrapper Class Object - '+ e); result = 'ERROR'; phaseOne = false; }
        
        if ( phaseOne ){
            for(RetrievalData a : records){
                opps.add(new Opportunity(AccountId = a.account, Name = a.reference, CloseDate = a.myDate, StageName = 'Qualification', Pricebook2Id = '01s1r000003Sm7HAAS'));
            }
            
            
            try { insert opps; } catch(Exception e) { system.debug('Error inserting Opp - ' + e); result = 'ERROR'; phaseTwo = false; }
            
            if ( phaseTwo ){
                for(Opportunity o : opps){
                    for(RetrievalData b : records){
                        if( (o.AccountId == b.account) && (o.Name == b.reference) && (o.CloseDate == b.myDate) ){
                            olis.add(new OpportunityLineItem(OpportunityId = o.Id, Quantity = b.quantity, UnitPrice = b.unitPrice, Product2Id = b.product)); 
                        }
                    }
                }
                
                try { insert olis; result = 'SUCCESS'; } catch(Exception e) { system.debug('Error inserting Opp Product - ' + e); result = 'ERROR'; phaseThree = true; }
                
                if ( phaseThree ) {
                    try { delete opps; } catch(Exception e) { system.debug('Error deleting Opportunities - '+ e); result = 'ERROR'; } 
                }
            }
        }
        return result;
    }
     
    // ------- Wrapper Class(es) ------- \\
    
    public class RecordsData {
        @AuraEnabled public String label {get; set;}
        @AuraEnabled public String value {get; set;}
    }
    
    public class RetrievalData{
        @AuraEnabled public String account {get; set;}
        @AuraEnabled public String product {get; set;}
        @AuraEnabled public Integer quantity {get; set;}
        @AuraEnabled public Decimal unitPrice {get; set;}
        @AuraEnabled public Date myDate {get; set;}
        @AuraEnabled public String reference {get; set;}
        
    }
}
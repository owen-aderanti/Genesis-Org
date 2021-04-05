/*
 * Created on 05-04-2021.
 *
 * Description: Webservice class for inbound API calls.
 *
 * Last modified on 05-04-2021.
*/
global with sharing class OutboundWebService_web {
    /*
    * Description: Webservice to create accounts in the org and return a list of Account Ids.
    *
    * Last modified on 05-04-2021.
    */
    webservice static String CreateAccount(string accountName, string accountNumber, string type, string billingStreet, string billingCity, string billingState, string billingPostalCode, string billingCountry){
        Account a = new Account(
            Name = accountName,
            accountNumber = accountNumber,
            owenAde__Active__c = 'Yes',
            Type = type,
            BillingStreet = billingStreet,
            BillingCity = billingCity,
            BillingState = billingState,
            BillingPostalCode = billingPostalCode,
            BillingCountry = billingCountry
        );
        
        string result = 'No Record Created';

        try{ insert a; result = a.Id; } catch(exception e){ insert new owenAde__Error_Log__c(owenAde__Error_Message__c =e.getMessage(), owenAde__Error_Trace__c = e.getStackTraceString()); }

        return result;
    }

    /*
    * Description: Retrieves Records from the Database.
    *
    * Last modified on 05-04-2021.
    */
    webservice static Account GetAccount(string accountId){
        List<Account> accs = (List<Account>)GT_Utilities.GetRecords('Account', new List<String>{ accountId }, 'Id', '');

        if( accs.isEmpty() ){
            return null ; 
        } else {
            return accs[0];
        }
    }

    /*
    * Description: Retrieves sObject from the Database.
    *
    * Last modified on 05-04-2021.
    */
    webservice static sObject GetRecord(string recordId){
        Id newId;

        try{ Id.valueOf(recordId); } catch(exception e){ insert new owenAde__Error_Log__c(owenAde__Error_Message__c =e.getMessage(), owenAde__Error_Trace__c = e.getStackTraceString()); return null; }

        String objectApiName = newId.getSobjectType().getDescribe().getName();

        List<sObject> recs = GT_Utilities.GetRecords(objectApiName, new List<String>{ newId }, 'Id', '');

        if( recs.isEmpty() ){ 
            return null; 
        } else {
            return recs[0];
        }
    }
}

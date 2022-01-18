/*
 * Created on 18-01-2022.
 *
 * Description: Controller class for Home Page Custom Components.
 *
 * Last modified on 18-01-2022.
*/
public with sharing class CustomHomePage_con {
    /*
    * Description: Retrieves all open projects based on Project Manager.
    *
    * Last modified on 18-01-2022.
    */
    @AuraEnabled
    public static String GetOpenProjects(){
        String result = '';
        
        String resourceId = GetCurrentResourceId();

        // insert code here
        
        return result;
    }

    /*
    * Description: Retrieves current resource.
    *
    * Last modified on 18-01-2022.
    */
    @testvisible
    static String GetCurrentResourceId() {
        String result = '';
        
        List<owenAde__Resource__c> resources = (List<owenAde__Resource__c>)GT_Utilities.GetRecords('owenAde__Resource__c', null, null, null);

        if(! resources.isEmpty() ){ for( owenAde__Resource__c r : resources ){ if( r.owenAde__User__c == UserInfo.getUserId() ){ result = r.Id; } } }
        
        return result;
    }
}

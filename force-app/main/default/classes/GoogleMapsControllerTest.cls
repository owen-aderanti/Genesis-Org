/*
 * Created by Owen Aderanti.
 * 
 * Description: Test class for Google Maps lightning component controller.
 * 
 * Last modified by Owen on 12-01-2020.
*/
@isTest
public class GoogleMapsControllerTest {
    @testSetup static void testData(){
        insert new Account(Name = 'Test 1', BillingStreet = 'Cavan Digital Hub', BillingCity = 'Cavan', BillingState = 'Cavan', BillingPostalCode = 'H12 YE04', BillingCountry = 'Ireland');
    }
    
    @isTest static void test1(){
        Account a = [ select id from Account limit 1 ];
        
        test.startTest();
        GoogleMapsController.getFields(a.Id);
        test.stopTest();
    }
}
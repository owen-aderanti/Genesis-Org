/*
Created By Glic-Tech Ltd.

v1.0 Mass Insertion of Invoices.

Last modified by Owen in Glic-Tech on 10/09/2019.
*/
@isTest
public class MassInvoiceControllerTest {
    @testSetup static void insertTestData(){
        Test.startTest();
        Account a = new Account(Name = 'Test Account');
        insert a;
        
        Id pricebook = Test.getStandardPricebookId();
        
        Product2 p = new Product2(Name = 'Test Product', IsActive = true);
        insert p;
        
        PricebookEntry pe = new PricebookEntry(Pricebook2Id = pricebook, Product2Id = p.Id, UnitPrice = 100, IsActive = true);
        insert pe; 
        
        Test.stopTest();
    }
    
    @isTest static void TestInsertRecordsMethod(){
        Account a = [ SELECT Id FROM Account LIMIT 1 ];
        Product2 p = [ SELECT Id FROM Product2 LIMIT 1 ];
        
        string json = '[{"account":"'+ a.Id + '", "product": "'+ p.Id+'", "myDate": "2019-09-25", "reference": "Test Opp Insert 1", "quantity": "10", "unitPrice": "1000" }]';
        string jsn = '[{"account":"'+ a.Id + '", "product": "", "myDate": "2019-09-25", "reference": "Test Opp Insert 1", "quantity": "", "unitPrice": "" }]';
        
        Test.startTest();
        
        String ans = MassInvoiceController.insertRecords(json);
        String answ = MassInvoiceController.insertRecords(jsn);
        
        system.assertEquals('SUCCESS', ans);
        system.assertEquals('ERROR', answ);
            
        Test.stopTest();
    }
    
    @isTest static void TestGetRecordsMethod(){
        string objectName = 'Account', searchString = 'abc';
        
        List<MassInvoiceController.RecordsData> lst = MassInvoiceController.getRecords(searchString, objectName);
    }
}
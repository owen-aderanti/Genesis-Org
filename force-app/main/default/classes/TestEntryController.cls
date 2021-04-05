/*
 * Created by Owen Aderanti
 * 
 * Description: Test for link on PDF document.
 * 
 * Last modified on 16/11/2019.
*/
public class TestEntryController {
    public string recId {get; set;}
    public string linkURL {get; set;}
    static boolean PDFOnce {get; set;}
    public owenAde__Netting_Test__c record {get; set;}
    
    public TestEntryController(){
        recId = 'a0Q1r00000sSB6yEAG';
        
        string pageName = apexpages.currentPage().getURL().substringAfter('apex/');
        string namee = pageName.left(16);
        
        system.debug(namee);
        
        if ( namee == 'owenAde__TestPDF' ){
            record = [ select id, owenAde__PDF_Created__c from owenAde__Netting_Test__c where Id =: recId and owenAde__PDF_Created__c = false limit 1 ];
            
            if ( record != null ) { PDFOnce = record.owenAde__PDF_Created__c; } else { PDFOnce = true; }
        }
        
        linkURL = owenAde__Site_URL__c.getInstance().owenAde__URL__c + '?Ids='+ recId;
        
        apexpages.currentPage().getparameters().put('Ids','a0Q1r00000sSB6yEAG');
    }
    
    public void setRecord(){
        owenAde__Netting_Test__c rec = [ select id, owenAde__PDF_Created__c from owenAde__Netting_Test__c where Id =: recId and owenAde__PDF_Created__c = false limit 1 ];
        
        if ( rec != null ) {
            rec.owenAde__PDF_Created__c = true;
            
            //try { update rec; } catch (Exception e) { system.debug('Error updating Record - '+e); }
        }
        if (! PDFOnce ) { PDFCreation(); } 
    }
    
    public void getId(){
        string myId = apexpages.currentPage().getparameters().get('Ids');
        
        if ( myId != '' ){
            owenAde__Netting_Test__c nettingRecord = [ select Name, owenAde__Changed_DateTime__c, owenAde__Status__c, owenAde__approved__c from owenAde__Netting_Test__c where Id =: myId ];
            
            if ( nettingRecord != null ) { 
                if (! nettingRecord.owenAde__approved__c ){
                    nettingRecord.owenAde__Changed_DateTime__c = datetime.now();
                    nettingRecord.owenAde__Status__c = 'Active';
                    nettingRecord.owenAde__approved__c = true;
                    try { update nettingRecord; } catch (Exception e) { system.debug('Error updating the Netting Test record - '+e); }
                }
            }
        }
    }
    
    public void PDFCreation(){
        /*if (! PDFOnce ){
                        
            string proposal = 'Proposal_' + date.today();
            
            proposal = proposal.remove('-').left(17);
            
            Attachment a = new Attachment(ParentId = recId, body = Page.TestPDF.getContent(), Name = proposal, ContentType='application/pdf');
            
            try { insert a; } catch (Exception e) { system.debug('Error Inserting Proposal - '+e); }
        }*/
        
    }
}
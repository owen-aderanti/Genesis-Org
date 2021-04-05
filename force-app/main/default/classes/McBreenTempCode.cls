public class McBreenTempCode {
    static void editJobAmount(Id id, Decimal amount){
        List<Job__c> jobs = [ SELECT Id, Name, Opportunity__c, Schedule_Date__c, Frequency__c FROM Job__c WHERE Opportunity__c =: id ORDER BY Schedule_Date__c DESC NULLS FIRST  ];
        Opportunity o = [SELECT Id, Name FROM Opportunity WHERE Id =: id];
        List<Job__c> selectedJobs = new List<Job__c>();
        
        if(jobs.size() > amount){
            Decimal a = jobs.size() - amount;
            Decimal b = jobs.size();
            
            for(Job__c j : jobs){
                selectedJobs.add(j);
                b--;
                if(b == amount){
                    break;
                }
            }
            
            delete selectedJobs;
        }
        
        else if(jobs.size() < amount){
            Decimal a = amount - jobs.size();
            Decimal b = amount;
            
            for(Job__c j : jobs){
                Decimal c = jobs.size() + 1;
                for(Decimal i = 0; i < a; i++){
                    Job__c job = j.clone();
                    job.Name = o.Name + ' - ' + c;
                    //job.Schedule_Date__c = OpportunityToJob.getSpread(j.Frequency__c, j.Schedule_Date__c);
                    selectedJobs.add(job);
                    c++;
                }
            }
            
            insert selectedJobs;
        }
    }
    
    static void updateJobOwner(Opportunity o){
        List<Job__c> jobs = [ SELECT Id, Name, OwnerId FROM Job__c WHERE Opportunity__c =: o.Id ];
        
        for(Job__c j : jobs){
            j.OwnerId = o.Job_Owner__c;
        }
        
        update jobs;
    }
    
    static void updateJobs(List<Job__c> newRecords, Map<Id, Job__c> oldMap){
        List<Job__c> jobs = new List<Job__c>();
        
        for(Job__c j : newRecords){
            // oldMap.get(j.Id).Frequency_Amount__c != j.Frequency_Amount__c ? TRUE : FALSE
            if( TRUE ){
                //editJobAmount(j.Opportunity__c, j.Frequency_Amount__c);
            }
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}
/***
 Last Modified on 28/05/2019.
***/
public without sharing class TempVehicle {
    public static void Test1(List<owenAde__Job_Vehicle__c> newRecords){
        integer days = 0;
        owenAde__BH__c bh = owenAde__BH__c.getInstance();
        
        for(owenAde__Job_Vehicle__c jv : newRecords){
            days = jv.owenAde__Job_End__c.dayOfYear() - jv.owenAde__Job_Start__c.dayOfYear();
            double n = 0;
            
            if( days == 0 ){
                long m = ((jv.owenAde__Job_End__c.getTime() - jv.owenAde__Job_Start__c.getTime()) / 1000) / 60;
                system.debug(m);
                
                jv.owenAde__Vehicle_Rate2__c = (jv.owenAde__Rate_per_hour__c * ( m / 60.00 ));
            }
            else if ( days > 0 ){
                for(integer i = 0; i < days; i++){
                    
                    if( i == 0 ){
                        double a = bh.owenAde__Closing__c - (((jv.owenAde__Job_Start__c.getTime() /1000) /60) / 60 );
                        double b = (((jv.owenAde__Job_End__c.getTime() / 1000) / 60 ) / 60) - bh.owenAde__Open__c;
                        double c = ( jv.owenAde__Rate_per_hour__c * (a + b) );

                        n = c;
                    }
                    
                    if( i > 0 ){
                       datetime d = jv.owenAde__Job_Start__c.addDays(1); 
                        
                        if( d.dayOfYear() < jv.owenAde__Job_End__c.dayOfYear() ){
                            n += (jv.owenAde__Rate_per_hour__c * 12);
                        }
                        
                        if( d.dayOfYear() == jv.owenAde__Job_End__c.dayOfYear() ){
                            double a = bh.owenAde__Closing__c - (((jv.owenAde__Job_Start__c.getTime() /1000.00) /60.00) / 60.00 );
                            double b = (((jv.owenAde__Job_End__c.getTime() / 1000.00) / 60.00 ) / 60.00) - bh.owenAde__Open__c;
                            double c = ( jv.owenAde__Rate_per_hour__c * (a + b) );
                            
                            n += c;
                        }
                    }
                }
                jv.owenAde__Vehicle_Rate2__c = n;
            }
        }
    }
}
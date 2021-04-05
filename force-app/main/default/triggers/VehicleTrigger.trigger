/***
 Last Modified on 28/05/2019.
***/
trigger VehicleTrigger on owenAde__Job_Vehicle__c (before insert, before update) {
    
    owenAde__TS__c cs = owenAde__TS__c.getInstance();
    
    if(cs.owenAde__VehicleTrigger__c){
        TempVehicle.Test1(Trigger.New);
    }
}
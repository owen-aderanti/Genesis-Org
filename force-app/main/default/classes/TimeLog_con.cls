/*
 * Created on 27-11-2021.
 *
 * Description: Controller class for Time Log lwc.
 *
 * Last modified on 04-12-2021.
*/
public without sharing class TimeLog_con {
    //
    // --- SECTION START: timeLog Methods
    //

    /*
    * Description: Populates the timeLog lwc with SeedData upon instantiation.
    *
    * Last modified on 27-11-2021.
    */
    @AuraEnabled
    public static String SeedData(){
        String result = '';

        TimeLog_con.SeedDataWrap sdw = new TimeLog_con.SeedDataWrap();

        sdw.ResourceId = GetResource();
        sdw.WeekStartDate = GetCurrentWeekStart();
        sdw.WeekEndDate = sdw.WeekStartDate.addDays(6);
        sdw.TimeLogRecords = GetTimeLogs( sdw.WeekStartDate, sdw.ResourceId );

        result = JSON.serialize( sdw );

        return result;
    }

    /*
    * Description: Retrieves Resource based on current User.
    *
    * Last modified on 27-11-2021.
    */
    @testvisible
    static String GetResource() {
        String result = '';
        
        List<owenAde__Resource__c> resources = (List<owenAde__Resource__c>) GT_Utilities.GetRecords('owenAde__Resource__c', new List<String>{ UserInfo.getUserId() }, 'owenAde__User__c', null);

        if(! resources.isEmpty() ){ result = resources[0].Id; }
        
        return result;
    }

    /*
    * Description: Retrieves date of the first day of the current working week.
    *
    * Last modified on 27-11-2021.
    */
    @testvisible
    static Date GetCurrentWeekStart() {
        Date result = Date.today();
        
        Datetime dt1 = Datetime.now();

        Map<String, Integer> dayMap = new Map<String, Integer>{
            'Mon' => 0,
            'Tue' => 1,
            'Wed' => 2,
            'Thu' => 3,
            'Fri' => 4,
            'Sat' => 5,
            'Sun' => 6
        };

        Integer diff = dayMap.get( dt1.format('EEE') );

        result = Date.today().addDays( (diff * -1) );
        
        return result;
    }

    /*
    * Description: Retrieves a list of Time Log record based on the specified date and resource.
    *
    * Last modified on 27-11-2021.
    */
    @testvisible
    static List<owenAde__Time_Log__c> GetTimeLogs(Date weekStartDate, String resourceId) {
        List<owenAde__Time_Log__c> result = new List<owenAde__Time_Log__c>();
        
        List<String> fields = GT_Utilities.GetObjectFields('owenAde__Time_Log__c');

        String query = 'SELECT ' + String.join(fields, ',') + ' FROM owenAde__Time_Log__c '
            + 'WHERE owenAde__Resource__c =: resourceId AND owenAde__Week_Date__c =: weekStartDate ORDER BY CreatedDate ASC';

        result = (List<owenAde__Time_Log__c>) Database.query(query);
        
        return result;
    }

    /*
    * Description: Creates a new Time LOg record based on the Resource and Week Date and returns a new List of Time Log records.
    *
    * Last modified on 30-11-2021.
    */
    @AuraEnabled
    public static String CreateNewTimeLogRecord(String weekDate, String resourceId){
        String result = '';

        Date weekStartDate = Date.valueOf(weekDate);

        insert new owenAde__Time_Log__c(
            owenAde__Resource__c = resourceId,
            owenAde__Week_Date__c = weekStartDate
        );

        List<owenAde__Time_Log__c> records = GetTimeLogs(weekStartDate, resourceId);

        result = JSON.serialize( records );

        return result;
    }

    /*
    * Description: Retrieves a list of Time Log records from the Database based on the Resource Id and Week Start Date.
    *
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    @AuraEnabled
    public static String RetrieveTimeLogRecords(String weekDate, String resourceId){
        String result = '';

        Date weekStartDate = Date.valueOf( weekDate );

        result = JSON.serialize( GetTimeLogs(weekStartDate, resourceId) );

        return result;
    }

    //
    // --- SECTION END: timeLog Methods
    //

    //
    // --- SECTION START: timeLogItem Methods
    //

    /*
    * Description: Updates the Billable value on the Time Log record.
    *
    * Last modified on 04-12-2021.
    */
    @AuraEnabled
    public static Boolean UpdateTimeLogRecordBillable(String recordId, Boolean value){
        Boolean result = false;

        if( String.isNotBlank(recordId) ){
            String query = 'SELECT Id, owenAde__Billable__c FROM owenAde__Time_Log__c WHERE Id =: recordId';

            owenAde__Time_Log__c tl = (owenAde__Time_Log__c)Database.query(query)[0];
            tl.owenAde__Billable__c = value;

            try{ update tl; result = true; } catch(Exception e){  }
        }

        return result;
    }

    /*
    * Description: Deletes Time Log record from the Database.
    *
    * Last modified on 04-12-2021.
    */
    @AuraEnabled
    public static Boolean DeleteTimeLogRecord(String recordId){
        Boolean result = false;

        if( String.isNotBlank(recordId) ){
            String query = 'SELECT Id FROM owenAde__Time_Log__c WHERE Id =: recordId';

            try { delete Database.query(query); result = true; } catch(Exception e){  }
        }

        return result;
    }

    //
    // --- SECTION END: timeLogItem Methods
    //

    //
    // --- SECTION START: timeLogDetail Methods
    //

    /*
    * Description: Updates the Time Log Record with the Hours and Comment.
    *
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    @AuraEnabled
    public static Boolean UpdateTimeLogRecord(String recordId, String commentField, String hourField, String comment, Decimal hours){
        Boolean result = false;

        if( String.isNotBlank(recordId) ){
            String query = 'SELECT Id, ' + commentField + ', ' + hourField + ' FROM owenAde__Time_Log__c WHERE Id =: recordId';

            owenAde__Time_Log__c tl = (owenAde__Time_Log__c)Database.query(query)[0];
            tl.put( hourField, hours );
            tl.put( commentField, comment );

            try{ update tl; result = true; } catch(Exception e){  }
        }

        return result;
    }

    //
    // --- SECTION END: timeLogDetail Methods
    //

    /*
    * Description: Wrapper class for Populatign SeedData in timeLog lwc.
    *
    * Last modified on 27-11-2021.
    */
    @testvisible
    class SeedDataWrap {
        public Date WeekEndDate { get; set; }
        public String ResourceId { get; set; }
        public Date WeekStartDate { get; set; }
        public List<owenAde__Time_Log__c> TimeLogRecords { get; set; }
    }
}

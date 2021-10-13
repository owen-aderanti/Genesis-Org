/*
 * Created on 13-10-2021.
 *
 * Description: Interface for Trigger Hanlder classes.
 *
 * Last modified on 13-10-2021.
*/
public interface TriggerHandler {
    /*
    * Description: On Create Method, firing actions to take place when a record is created on Before or After triggers.
    *
    * Last modified on 13-10-2021.
    */
    void OnCreate(List<SObject> records, Boolean isBefore);

    /*
    * Description: On Create Method, firing actions to take place when a record is updated on Before or After triggers.
    *
    * Last modified on 13-10-2021.
    */
    void OnUpdate(List<SObject> records, Boolean isBefore, Map<Id, SObject> oldMap);

    /*
    * Description: On Create Method, firing actions to take place when a record is deleted on Before or After triggers.
    *
    * Last modified on 13-10-2021.
    */
    void OnDelete(List<SObject> records, Boolean isBefore, Map<Id, SObject> oldMap);
}

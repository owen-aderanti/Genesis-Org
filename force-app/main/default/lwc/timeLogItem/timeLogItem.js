import { LightningElement, wire, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

import UpdateTimeLogRecordBillable from '@salesforce/apex/TimeLog_con.UpdateTimeLogRecordBillable';
import DeleteTimeLogRecord from '@salesforce/apex/TimeLog_con.DeleteTimeLogRecord';

export default class TimeLogItem extends LightningElement {
    firstConnectedCallback = true;
    firstRenderedCallback = true;

    displayWarningMessage = false;
    displayTaskSelector = false;

    isTaskSelected = false;

    selectedTaskId = "";
    selectedTaskName = "";

    @api record;
    @api resourceId;
    
    /*
    * Description: Fires after every render of the component.
    *
    * Last modified on 30-11-2021.
    */
    @wire(CurrentPageReference)
    params( pageRef ) {
        if( pageRef ) {
            // insert code here
        }
    }
    
    /*
    * Description: Fires when a component is inserted into the DOM.
    *
    * Last modified on 30-11-2021.
    */
    connectedCallback() {
        if(! this.firstConnectedCallback ){ return; }
        
        this.firstConnectedCallback = false;
    }
    
    /*
    * Description: Fires after every render of the component.
    *
    * Last modified on 04-12-2021.
    */
    renderedCallback() {
        if(! this.firstRenderedCallback ){ return; }
        
        this.firstRenderedCallback = false;

        this.template.querySelector("lightning-input").checked = this.record.owenAde__Billable__c;
    }
    
    /*
    * Description: Fires Toaster notification on the screen.
    *
    * Last modified on 30-11-2021.
    */
    FireToaster(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant,
                mode: "sticky"
            })
        );
    }

    /*
    * Description: Fires an Update Method in the Time Log component.
    *
    * Last modified on 01-12-2021.
    */
    FireUpdateEvent() {
        this.dispatchEvent( new CustomEvent('itemupdate', { detail: { } }) );
    }

    /*
    * Description: Updates the Billable value on the Time Log record.
    *
    * Last modified on 04-12-2021.
    */
    UpdateBillableValue() {
        var recId = this.record.Id;
        var billableValue = this.template.querySelector("lightning-input").checked;


        var that = this;

        UpdateTimeLogRecordBillable({ recordId: recId, value: billableValue }).then(res =>{
            if( res == true ){
                that.FireUpdateEvent();
            }

            if( res == false ){
                that.FireToaster("Something went wrong", "Please contact your System Administrator for more information", "error");
            }
        });
    }

    /*
    * Description: Displays the Delete Warning Message.
    *
    * Last modified on 04-12-2021.
    */
    DisplayDeleteWarningMessage() {
        this.displayWarningMessage = true;
    }

    /*
    * Description: Hides the Delete Warning Message.
    *
    * Last modified on 04-12-2021.
    */
    CancelDelete() {
        this.displayWarningMessage = false;
    }

    /*
    * Description: Deletes the Time Log record from the Database.
    *
    * Last modified on 04-12-2021.
    */
    DeleteTimeLogItem() {
        var recId = this.record.Id;

        var that = this;

        this.displayWarningMessage = false;

        DeleteTimeLogRecord({ recordId: recId }).then(res =>{
            if( res == true ){
                that.FireUpdateEvent();
            }

            if( res == false ){
                that.FireToaster("Something went wrong", "Please contact your System Administrator for more information", "error");
            }
        });
    }

    /*
    * Description: Opens the Task Selector screen.
    *
    * Last modified on 04-12-2021.
    */
    OpenTaskSelector() {
        this.displayTaskSelector = true;
    }

    /*
    * Description: Closes the Task Selector screen.
    *
    * Last modified on 04-12-2021.
    */
    CloseTaskSelector() {
        this.displayTaskSelector = false;
    }

    /*
    * Description: Saves the task selected and updates the Time Log record with selected Task.
    *
    * Last modified on 05-12-2021.
    */
    SaveTaskSelection(evt) {
        this.displayTaskSelector = false;
        this.isTaskSelected = true;

        var taskId = evt.detail.taskId;
        var taskName = evt.detail.taskName;

        this.selectedTaskId = taskId;
        this.selectedTaskName = taskName;
    }

    /*
    * Description: Fires when the task has been removed from the Database.
    *
    * Last modified on 05-12-2021.
    */
    FireTaskRemoval() {
        this.isTaskSelected = false;

        this.selectedTaskId = "";
        this.selectedTaskName = "";
    }
}
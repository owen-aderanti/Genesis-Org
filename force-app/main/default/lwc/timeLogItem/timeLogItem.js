import { LightningElement, wire, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

import UpdateTimeLogRecordBillable from '@salesforce/apex/TimeLog_con.UpdateTimeLogRecordBillable';
import DeleteTaskFromTimeLogRecord from '@salesforce/apex/TimeLog_con.DeleteTaskFromTimeLogRecord';
import DeleteTimeLogRecord from '@salesforce/apex/TimeLog_con.DeleteTimeLogRecord';
import UpdateTimeLogTask from '@salesforce/apex/TimeLog_con.UpdateTimeLogTask';

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
    * Last modified on 07-12-2021.
    */
    renderedCallback() {
        if(! this.firstRenderedCallback ){ return; }
        
        this.firstRenderedCallback = false;

        this.template.querySelector("lightning-input").checked = this.record.owenAde__Billable__c;

        var taskValue = this.record.owenAde__Task__c;

        if( (taskValue != null) && (taskValue != undefined) ){
            this.isTaskSelected = true;
            this.selectedTaskId = taskValue;
            this.selectedTaskName = this.record.owenAde__Task__r.owenAde__Milestone__r.owenAde__Project__r.owenAde__Project_Number__c + ' / ' + this.record.owenAde__Task__r.Name;
        }
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
    * Last modified on 07-12-2021.
    */
    SaveTaskSelection(evt) {
        this.displayTaskSelector = false;
        this.isTaskSelected = true;

        var taskId = evt.detail.taskId;
        var taskName = evt.detail.taskName;

        this.selectedTaskId = taskId;
        this.selectedTaskName = taskName;

        UpdateTimeLogTask({ taskId: taskId, recordId: this.record.Id }).then( res => {
            if( res == true ){
                this.FireUpdateEvent();
            }

            if( res == false ){
                this.FireToaster("Something went wrong","Please contact your System Administrator for more information","error");
            }
        });
    }

    /*
    * Description: Fires when the task has been removed from the Database.
    *
    * Last modified on 07-12-2021.
    */
    FireTaskRemoval() {
        this.isTaskSelected = false;

        this.selectedTaskId = "";
        this.selectedTaskName = "";

        DeleteTaskFromTimeLogRecord({ recordId: this.record.Id }).then( res => {
            if( res == true ){
                this.FireUpdateEvent();
            }

            if( res == false ){
                this.FireToaster("Something went wrong","Please contact your System Administrator for more information","error");
            } 
        });
    }
}
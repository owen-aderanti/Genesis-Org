import { LightningElement, wire, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

import UpdateTimeLogRecord from '@salesforce/apex/TimeLog_con.UpdateTimeLogRecord';

export default class TimeLogDetail extends LightningElement {
    firstConnectedCallback = true;
    firstRenderedCallback = true;

    OpenCommentBox = false;

    @api recordId;
    @api timeHours;
    @api notesField;
    @api hoursField;
    @api timeComment;

    IsCommentPopulated = false;
    
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
    * Last modified on 01-12-2021.
    */
    connectedCallback() {
        if(! this.firstConnectedCallback ){ return; }
        
        this.firstConnectedCallback = false;
    }
    
    /*
    * Description: Fires after every render of the component.
    *
    * Last modified on 01-12-2021.
    */
    renderedCallback() {

        if( (this.timeComment != "") && (this.timeComment != null) && (this.timeComment != undefined) ){
            this.IsCommentPopulated = true;
        } else {
            
            this.IsCommentPopulated = false;
        }
    }
    
    /*
    * Description: Fires Toaster notification on the screen.
    *
    * Last modified on 01-12-2021.
    */
    FireToaster(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant,
            })
        );
    }

    /*
    * Description: Opens the Comment Box for time log comment view / update.
    *
    * Last modified on 30-11-2021.
    */
    DisplayCommentBox() {
        this.OpenCommentBox = true;
    }

    /*
    * Description: Fires on comment update / close.
    *
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    FireCommentBox(evt) {
        this.OpenCommentBox = false;

        var isUpdateable = evt.detail.fireUpdate;

        if( isUpdateable == true ){
            var comt = evt.detail.updatedComment;

            this.timeComment = comt;

            this.AutoSaveValues();
        }
    }

    /*
    * Description: Updates the Time Hours property wen the hours are changed.
    *
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    UpdateHours(evt) {
        this.timeHours = evt.currentTarget.value;
    }

    /*
    * Description: Fires Auto Save whenever the hours have been updated.
    *
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    FireHoursSave(evt) {
        this.AutoSaveValues();
    }

    /*
    * Description: Auto Saves Comment and Hours to the Database.
    *
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    AutoSaveValues() {
        var recId = this.recordId;
        var hours = this.timeHours;
        var comment = this.timeComment;
        var hourField = this.hoursField;
        var commentField = this.notesField;

        var that = this;

        UpdateTimeLogRecord({ recordId: recId, commentField: commentField, hourField: hourField, comment: comment, hours: hours }).then(res => {
            if( res == true ){
                that.dispatchEvent( new CustomEvent('itemupdate', { detail: { } }) );
            }

            if(res == false ){
                that.FireToaster("Something Went Wrong", "Please contact your System Administrator for more information", "error");
            }
        });
    }
}
import { LightningElement, wire, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

import SeedData from '@salesforce/apex/TimeLog_con.SeedData';
import ChangeWeekDate from '@salesforce/apex/TimeLog_con.ChangeWeekDate';
import RetrieveTimeLogRecords from '@salesforce/apex/TimeLog_con.RetrieveTimeLogRecords';
import CreateNewTimeLogRecord from '@salesforce/apex/TimeLog_con.CreateNewTimeLogRecord';

/*
* Description: Creates colouring for each Time Log record.
*
* Last modified on 04-12-2021.
*/
function OrderLines(items) {
    var newItems = [];
    var value = false;

    for( var i in items ){
        var obj = items[i];
        obj["isEven"] = value;

        newItems.push( obj );

        value = !value;
    }

    return newItems;
}

export default class TimeLog extends LightningElement {
    firstConnectedCallback = true;
    firstRenderedCallback = true;

    ResourceId;
    WeekEndDate;
    WeekStartDate;
    TimeLogs = [];

    OpenViewDetails = false;
    OpenChangeResource = false;

    /*
    * Description: Fires after every render of the component.
    *
    * Last modified on 07-12-2021.
    */
    @wire(CurrentPageReference)
    params( pageRef ) {
        if( pageRef ) {

            this.TimeLogs = [];
            this.WeekStartDate = null;
            this.WeekEndDate = null;
            this.ResourceId = "";

            if( this.firstConnectedCallback == false ){
                this.PopulateSeedData();
            }
        }
    }
    
    /*
    * Description: Fires when a component is inserted into the DOM.
    *
    * Last modified on 07-12-2021.
    */
    connectedCallback() {
        if(! this.firstConnectedCallback ){ return; }
        
        this.firstConnectedCallback = false;

        this.PopulateSeedData();
    }
    
    /*
    * Description: Fires after every render of the component.
    *
    * Last modified on 30-11-2021.
    */
    renderedCallback() {
        if(! this.firstRenderedCallback ){ return; }
        
        this.firstRenderedCallback = false;

        this.SetHeight();
    }
    
    /*
    * Description: Fires Toaster notification on the screen.
    *
    * Last modified on 27-11-2021.
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
    * Description: Sets the Heights of elements on the page.
    *
    * Last modified on 02-12-2021.
    */
    SetHeight() {
        var art1 = this.template.querySelector('.mySpecialArticle');
        var hed1 = this.template.querySelector('.mySpecialHeader');
        var fot1 = this.template.querySelector('.mySpecialFooter');
        var bod1 = this.template.querySelector('.mySpecialBody');

        var ovr1 = this.template.querySelector('.overflowWrap');

        var bodyHeight = (art1.offsetHeight - ( hed1.offsetHeight + fot1.offsetHeight )) - 40; 

        if( (bodyHeight != -40) && (bodyHeight + "px" != bod1.style.height) ){
            bod1.style.height = bodyHeight + "px";
            ovr1.style.height = (bodyHeight - 20) + "px";
        }
        
        setTimeout( () => {
            this.SetHeight();
        }, 1000);
    }

    /*
    * Description: Creates a new Time Log record in the system.
    *
    * Last modified on 04-12-2021.
    */
    CreateNewLine() {
        var resourceId = this.ResourceId;
        var weekDate = this.WeekStartDate;

        var that = this;

        CreateNewTimeLogRecord({ weekDate: weekDate, resourceId: resourceId }).then(res => {
            if( res ){
                var data = JSON.parse( res );

                that.TimeLogs = OrderLines(data);
            }
        })
    }

    /*
    * Description: Opens View Details component.
    *
    * Last modified on 30-11-2021.
    */
    ViewDetails() {
        this.OpenViewDetails = !this.OpenViewDetails;
    }

    /*
    * Description: Retrieve fresh list of Time Log records from Database.
    *
    * Last modified on 13-12-2021.
    */
    RetrieveTimeLogs() {
        var resourceId = this.ResourceId;
        var weekDate = this.WeekStartDate;

        var that = this;

        RetrieveTimeLogRecords({ weekDate: weekDate, resourceId: resourceId }).then(res => {
            if( res ){
                var data = JSON.parse( res );

                that.TimeLogs = OrderLines(data);
            }
        });
    }

    /*
    * Description: Populates SeedData into the LWC.
    *
    * Last modified on 07-12-2021.
    */
    PopulateSeedData() {
        var that = this;

        SeedData({ }).then(res => {
            if( res != '' ){
                var data = JSON.parse( res );

                that.ResourceId = data.ResourceId;
                that.TimeLogs = OrderLines(data.TimeLogRecords);
                that.WeekEndDate  = data.WeekEndDate;
                that.WeekStartDate = data.WeekStartDate;
            }
        });
    }

    /*
    * Description: Displays the Resource selector screen.
    *
    * Last modified on 08-12-2021.
    */
    DisplayResourceSelector() {
        this.OpenChangeResource = true;
    }

    /*
    * Description: Hides the Resource Selector screen.
    *
    * Last modified on 08-12-2021.
    */
    HideResourceSelector() {
        this.OpenChangeResource = false;
    }

    /*
    * Description: Changes the Resource and Time Log records based on new Resource selected.
    *
    * Last modified on 13-12-2021.
    */
    ChangeResourceAndTimeLogs(evt) {
        this.ResourceId = evt.detail.selectedResourceId;

        this.OpenChangeResource = false;

        this.RetrieveTimeLogs();
    }

    /*
    * Description: Change current week.
    *
    * Last modified on 15-12-2021.
    */
    ChangeWeek(evt) {
        var selectedDate = evt.currentTarget.value;

        ChangeWeekDate({ value: selectedDate }).then(res => {
            if( res ){
                this.WeekStartDate = res;

                this.RetrieveTimeLogs();
            }
        });
    }

    /*
    * Description: Submits the Time Log records for approval.
    *
    * Last modified by Owen in Glic-Tech on 22-01-2022.
    */
    SubmitTimeLogs(evt) {
        
    }
}
import { LightningElement, wire } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

import SeedData from '@salesforce/apex/TimeLog_con.SeedData';
import RetrieveTimeLogRecords from '@salesforce/apex/TimeLog_con.RetrieveTimeLogRecords';
import CreateNewTimeLogRecord from '@salesforce/apex/TimeLog_con.CreateNewTimeLogRecord';

export default class TimeLog extends LightningElement {
    firstConnectedCallback = true;
    firstRenderedCallback = true;

    ResourceId;
    WeekEndDate;
    WeekStartDate;
    TimeLogs = [];

    OpenViewDetails = false;

    /*
    * Description: Fires after every render of the component.
    *
    * Last modified on 27-11-2021.
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

        var that = this;

        SeedData({}).then(res => {
            if( res != '' ){
                var data = JSON.parse( res );

                that.ResourceId = data.ResourceId;
                that.TimeLogs = data.TimeLogRecords;
                that.WeekEndDate  = data.WeekEndDate;
                that.WeekStartDate = data.WeekStartDate;
            }
        });
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
    * Last modified on 30-11-2021.
    */
    SetHeight() {
        var art1 = this.template.querySelector('.mySpecialArticle');
        var hed1 = this.template.querySelector('.mySpecialHeader');
        var fot1 = this.template.querySelector('.mySpecialFooter');
        var bod1 = this.template.querySelector('.mySpecialBody');

        var bodyHeight = (art1.offsetHeight - ( hed1.offsetHeight + fot1.offsetHeight )) - 40; 

        if( (bodyHeight != -40) && (bodyHeight + "px" != bod1.style.height) ){
            bod1.style.height = bodyHeight + "px";
        }
        
        setTimeout( () => {
            this.SetHeight();
        }, 1000);
    }

    /*
    * Description: Creates a new Time Log record in the system.
    *
    * Last modified on 30-11-2021.
    */
    CreateNewLine() {
        var resourceId = this.ResourceId;
        var weekDate = this.WeekStartDate;

        console.log( 'Resource: '+ resourceId +' , Week Start Date: '+ weekDate ); 

        var that = this;

        CreateNewTimeLogRecord({ weekDate: weekDate, resourceId: resourceId }).then(res => {
            if( res ){
                var data = JSON.parse( res );

                that.TimeLogs = data;

                console.log(that);
                console.log(this);
            }
        })
    }

    /*
    * Description: Saves new Time Log entries in the Database.
    *
    * Last modified on 30-11-2021.
    */
    SaveLines() {
        // insert code here
    }

    /*
    * Description: Submits Time Log record for Approval.
    *
    * Last modified on 30-11-2021.
    */
    SubmitLines() {
        // insert code here
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
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    RetrieveTimeLogs() {
        var resourceId = this.ResourceId;
        var weekDate = this.WeekStartDate;

        var that = this;

        RetrieveTimeLogRecords({ weekDate: weekDate, resourceId: resourceId }).then(res => {
            if( res ){
                var data = JSON.parse( res );

                that.TimeLogs = data;
            }
        });
    }
}
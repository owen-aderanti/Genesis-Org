import { LightningElement, wire, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

import GetResources from '@salesforce/apex/TimeLog_con.GetResources';

/*
* Description: highlights the current resource in the Time Log.
*
* Last modified on 08-12-2021.
*/
function HighlightResources(resources, currentResourceId) {
    var value = false;

    for( var i in resources ){
        resources[i]["isCurrent"] = resources[i].Id === currentResourceId;

        resources[i]["isEven"] = value;

        value = !value;
    }

    return resources;
}

export default class TimeLogChangeResource extends LightningElement {
    firstConnectedCallback = true;
    firstRenderedCallback = true;

    @api resourceId;

    ListOfResources = [];

    selectedResource = "";
    
    /*
    * Description: Fires after every render of the component.
    *
    * Last modified on 08-12-2021.
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
    * Last modified on 08-12-2021.
    */
    connectedCallback() {
        if(! this.firstConnectedCallback ){ return; }
        
        this.firstConnectedCallback = false;

        this.RetrieveResources();
    }
    
    /*
    * Description: Fires after every render of the component.
    *
    * Last modified on 08-12-2021.
    */
    renderedCallback() {
        if(! this.firstRenderedCallback ){ return; }
        
        this.firstRenderedCallback = false;
    }
    
    /*
    * Description: Fires Toaster notification on the screen.
    *
    * Last modified on 08-12-2021.
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
    * Description: Retrieves a list of Resources from the Database.
    *
    * Last modified on 08-12-2021.
    */
    RetrieveResources() {
        var resId = this.resourceId;

        GetResources({}).then(res => {
            if( res ){
                this.ListOfResources = HighlightResources(JSON.parse( res ), resId);

            } else {

                this.FireToaster("No Resources Found", "Please ensure Resources are created and try again", "warning");
            }
        });
    }

    /*
    * Description: Stores and highlights the selected Resource.
    *
    * Last modified on 08-12-2021.
    */
    HandleResourceClick(evt) {
        var resId = evt.currentTarget.dataset.value;
        var currRes = this.resourceId;

        this.selectedResource = "";

        if( resId === currRes ){
            this.FireToaster("Current Resource cannot be selected as New Resource", "Please change resource selected", "warning");
        } else {

            var list = this.ListOfResources;

            for( var i in list ){
                list[i]["isSelected"] = list[i].Id === resId;
            }

            this.ListOfResources = [];
            this.ListOfResources = list;
            this.selectedResource = resId;
        }
    }

    /*
    * Description: Fires an event to the parent object to change resource and refresh Time Log.
    *
    * Last modified on 08-12-2021.
    */
    UpdateToResourceSelected() {
        var resId = this.selectedResource;

        if( resId === "" ){
            this.FireToaster("No Resource Selected", "Please select a Resource or close Resource Selector", "warning");
        } else {

            this.ListOfResources = [];

            this.dispatchEvent( new CustomEvent('resourcechange', { detail: { selectedResourceId : resId } }) );
        }
    }

    /*
    * Description: Closes the Change Resource screen.
    *
    * Last modified on 08-12-2021.
    */
    Close() {
        this.ListOfResources = [];

        this.dispatchEvent( new CustomEvent('resourceclose', { detail: {  } }) );
    }
}
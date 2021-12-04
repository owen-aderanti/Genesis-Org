import { LightningElement, wire, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

export default class TimeLogTaskSelector extends LightningElement {
    firstConnectedCallback = true;
    firstRenderedCallback = true;

    displayProjects = true;
    diplayMilestones = false;
    displayProjects = false;

    screenHeading = "Project";

    projects = [];

    selectedTaskId = "";
    
    /*
    * Description: Fires after every render of the component.
    *
    * Last modified on 04-12-2021.
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
    * Last modified on 04-12-2021.
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
    }
    
    /*
    * Description: Fires Toaster notification on the screen.
    *
    * Last modified on 04-12-2021.
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
    * Description: fires on close event to parent component.
    *
    * Last modified on 04-12-2021.
    */
    FireOnClose() {
        this.dispatchEvent( new CustomEvent('itemtaskclose', { detail : { } }) );
    }

    /*
    * Description: fires on save event to parent component.
    *
    * Last modified on 04-12-2021.
    */
    FireOnSave() {
        this.dispatchEvent( new CustomEvent('itemtasksave', { detail : { } }) );
    }
}
import { LightningElement, wire, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

export default class TimeLogItem extends LightningElement {
    firstConnectedCallback = true;
    firstRenderedCallback = true;

    @api record;
    
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
    * Last modified on 30-11-2021.
    */
    renderedCallback() {
        if(! this.firstRenderedCallback ){ return; }
        
        this.firstRenderedCallback = false;
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
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    FireUpdateEvent() {
        this.dispatchEvent( new CustomEvent('itemupdate', { detail: { } }) );
    }
}
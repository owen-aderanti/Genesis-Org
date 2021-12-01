import { LightningElement, wire, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

export default class TimeLogComment extends LightningElement {
    firstConnectedCallback = true;
    firstRenderedCallback = true;

    @api timeComment = "";
    
    /*
    * Description: Fires after every render of the component.
    *
    * Last modified by Owen in Glic-Tech on 01-12-2021.
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
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    connectedCallback() {
        if(! this.firstConnectedCallback ){ return; }
        
        this.firstConnectedCallback = false;
    }
    
    /*
    * Description: Fires after every render of the component.
    *
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    renderedCallback() {
        if(! this.firstRenderedCallback ){ return; }
        
        this.firstRenderedCallback = false;
    }
    
    /*
    * Description: Fires Toaster notification on the screen.
    *
    * Last modified by Owen in Glic-Tech on 01-12-2021.
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
    * Description: Closes the Comment Box.
    *
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    Close() {
        this.dispatchEvent(
            new CustomEvent('itemclose', {
                detail: {
                    closeBox: true,
                    fireUpdate: false,
                    updatedComment: ''
                }
            })
        );
    }

    /*
    * Description: Saves the comment.
    *
    * Last modified by Owen in Glic-Tech on 01-12-2021.
    */
    Save() {
        var comt = this.template.querySelector('lightning-textarea').value;

        this.dispatchEvent(
            new CustomEvent('itemclose', {
                detail: {
                    closeBox: true,
                    fireUpdate: true,
                    updatedComment: comt
                }
            })
        );
    }
}
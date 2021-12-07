import { LightningElement, wire, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

import GetAssignedProjects from '@salesforce/apex/TimeLog_con.GetAssignedProjects';

/*
* Description: Applies colouring for every second row.
*
* Last modified on 07-12-2021.
*/
function OrderLines(items) {
    var newItems = [];
    var value = false;

    for( var i in items ){
        var obj = items[i];
        obj["isEven"] = value;
        obj["isSelected"] = false;

        newItems.push( obj );

        value = !value;
    }

    return newItems;
}

export default class TimeLogTaskSelector extends LightningElement {
    firstConnectedCallback = true;
    firstRenderedCallback = true;

    displayProjects = true;
    displayMilestones = false;
    displayTasks = false;

    screenHeading = "Project";

    tasks = [];
    projects = [];
    milestones = [];

    filteredMilestones = [];
    filteredTasks = [];

    selectedTaskId = "";
    selectedTaskName = "";

    @api resourceId = "";
    
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
    * Last modified on 07-12-2021.
    */
    connectedCallback() {
        if(! this.firstConnectedCallback ){ return; }
        
        this.firstConnectedCallback = false;

        var resId = this.resourceId;

        GetAssignedProjects({ resourceId: resId }).then(res => {
            if( res ){
                var data = JSON.parse( res );

                this.tasks = OrderLines(data.tasks);
                this.projects = OrderLines(data.projects);
                this.milestones = OrderLines(data.milestones);
            } else {

                this.FireToaster("No Eligible Projects Found","Please ensure you are assigned to a task before tracking time","warning");
            }
        });
    }
    
    /*
    * Description: Fires after every render of the component.
    *
    * Last modified on 07-12-2021.
    */
    renderedCallback() {
        if(! this.firstRenderedCallback ){ return; }
        
        this.firstRenderedCallback = false;
    }
    
    /*
    * Description: Fires Toaster notification on the screen.
    *
    * Last modified on 05-12-2021.
    */
    FireToaster(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
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
    * Last modified on 05-12-2021.
    */
    FireOnSave() {
        var selectedTask = this.selectedTaskId;
        var selectedTaskName = this.selectedTaskName;

        if( selectedTask != "" ){
            this.dispatchEvent( new CustomEvent('itemtasksave', { detail : { taskId: selectedTask, taskName: selectedTaskName } }) );
        } else {

            this.FireToaster("No Task Selected", "You must selected a Task to track time against", "warning");
        }
    }

    /*
    * Description: Fires when project has been selected, and displays a list of children milestones eligible for time tracking.
    *
    * Last modified on 05-12-2021.
    */
    ProjectSelected(evt) {
        var projectId = evt.currentTarget.dataset.value;

        var milestones = this.milestones;

        var tempList = milestones.filter( x => x.owenAde__Project__c === projectId );
        this.filteredMilestones = OrderLines(tempList);
        this.screenHeading = 'Milestone';
        
        this.displayTasks = false;
        this.displayProjects = false;
        this.displayMilestones = true;

        this.selectedTaskId = "";
        this.selectedTaskName = "";

        this.filteredTasks = [];
    }

    /*
    * Description: Fires when milestone has been selected, and displays a list of children tasks eligible for time tracking.
    *
    * Last modified on 05-12-2021.
    */
    MilestoneSelected(evt) {
        var milestoneId = evt.currentTarget.dataset.value;

        var tasks = this.tasks;

        var tempList = tasks.filter( x => x.owenAde__Milestone__c === milestoneId );
        this.filteredTasks = OrderLines(tempList);
        this.screenHeading = 'Task';

        this.displayTasks = true;
        this.displayProjects = false;
        this.displayMilestones = false;

        this.selectedTaskId = "";
        this.selectedTaskName = "";
    }

    /*
    * Description: Fires when task has been selected.
    *
    * Last modified on 07-12-2021.
    */
    TaskSelected(evt) {
        var taskId = evt.currentTarget.dataset.value;

        var list = this.filteredTasks;

        var idx = list.findIndex( x => x.Id === taskId );

        var task = list[idx];

        var tempList = [];
        
        for( var item in list ){
            var it = list[item];

            if( list[item].Id === taskId ){
                it.isSelected = true;

                tempList.push( it );
            } else {
                it.isSelected = false;

                tempList.push( it );
            }
        }

        this.filteredTasks = tempList;

        this.selectedTaskId = taskId;
        this.selectedTaskName = task.owenAde__Milestone__r.owenAde__Project__r.owenAde__Project_Number__c + ' / ' + task.Name;
    }

    /*
    * Description: Returns Users to the previous page.
    *
    * Last modified on 07-12-2021.
    */
    PreviousButton() {
        var isTask = this.displayTasks;
        var isProject = this.displayProjects;
        var isMilestone = this.displayMilestones;

        if( isTask == true ){
            this.screenHeading = 'Milestone';
        
            this.displayTasks = false;
            this.displayProjects = false;
            this.displayMilestones = true;

            this.selectedTaskId = "";
            this.selectedTaskName = "";

            this.filteredTasks = [];

            //var list = this.tasks;
            //var idx = list.findIndex(x => x.isSelected === true);

            //if( idx != -1 ){ this.tasks[idx].isSelected = false; }
        }

        if( isProject == true ){
            this.FireToaster("This is the First Page", "There is no previous page", "warning");
        }

        if( isMilestone == true ){
            this.screenHeading = 'Project';
        
            this.displayTasks = false;
            this.displayProjects = true;
            this.displayMilestones = false;

            this.selectedTaskId = "";
            this.selectedTaskName = "";

            this.filteredTasks = [];
            this.filteredMilestones = [];
        }
    }
}
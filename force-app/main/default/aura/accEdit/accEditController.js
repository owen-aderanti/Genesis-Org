({
    myAction : function(component, event, helper) {
        
    },
    
    handleSaveRecord : function(component, event, helper) {
        component.find("AccountRecordCreator").saveRecord($A.getCallback(function(saveResult) {
            var errMsg = ""; 
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                // handle component related logic in event handler
                component.set("v.recordSaveError", errMsg); 
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
                //cmp.set("v.recordSaveError", errMsg);
                component.set("v.recordSaveError", errMsg);
            } else if (saveResult.state === "ERROR") {
                
                
                for (var i = 0; i < saveResult.error.length; i++) {
                    errMsg += saveResult.error[i].message + "\n";
                }
                console.log('ERROR---'+errMsg)
                component.set("v.recordSaveError", errMsg);
            } else {
                
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                component.set("v.recordSaveError", errMsg);
            }
        }));
    }
    
})
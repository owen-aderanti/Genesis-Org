({
    init : function(component, event, helper) {
        
        var action = component.get('c.getFields');
        action.setParams({
            recordId : component.get('v.recordId')
        });
        action.setCallback(this, function(data){
            var values = data.getReturnValue();
            
            component.set('v.mapMarkers',[
                {
                    location:{
                        Street: values.BillingStreet,
                        City: values.BillingCity,
                        State: values.BilingState,
                        PostalCode: values.BillingPostalCode
                    },
                    title: 'Site Address',
                    description: values.Name
                }
            ]);
            component.set('v.zoomLevel',16);
            component.set('v.isHidden',true);
        });
        
        $A.enqueueAction(action);        
    }
})
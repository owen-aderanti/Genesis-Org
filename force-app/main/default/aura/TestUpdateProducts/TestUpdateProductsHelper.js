/***
 Created by Glic-Tech.

 v1.0 - JavaScript Controller for the Mass Invoice Upsert.
 
 Last modified by Owen in Glic-Tech on 10/09/2019.
***/
({  
    searchAccounts : function(component, event, helper, value, rec){
        $A.util.removeClass(component.find('Spinner'), "slds-hide");
        component.set("v.accMessage"+rec, '');
        component.set("v.accounts"+rec, null);
        var action = component.get('c.getRecords');
        action.setParams({
            'searchString' : component.get('v.searchAccString'+rec),
            'objectName' : 'Account'
        });
        action.setCallback(this, function(data){
            var result = data.getReturnValue();
            if ( data.getState()  === 'SUCCESS' ){
                if ( result.length > 0 ){
                    
                    if ( $A.util.isEmpty(value) ){
                        component.set('v.accounts'+rec, result);
                    }
                    else{
                        var index = result.findIndex(x => x.value === value)
                        if ( index != -1 ){
                            var selectedRecord = result[index];
                        }
                        component.set('v.selectedAccRecord'+rec, selectedRecord);
                    }
                }
                else {
                    component.set('v.accMessage'+rec, 'No Records Found');
                }
            }
            else if ( data.getState() === 'INCOMPLETE' ){
                component.set('v.accMessage'+rec, 'No Server Response or Client is Offline');
            }
                else if ( data.getState() === 'ERROR' ){
                    var errors = data.getError();
                    if ( errors && errors[0] && errors[0].message ){
                        component.set('v.accMessage'+rec, errors[0].message);
                    }
                }
            
            if ( $A.util.isEmpty(value) ){
                $A.util.addClass(component.find('resultsDivAcc'+rec), 'slds-is-open');
            }
            $A.util.addClass(component.find('Spinner'), 'slds-hide');
        });
        $A.enqueueAction(action);
    },
    
    searchProducts : function(component, event, helper, value, rec){
        $A.util.removeClass(component.find('Spinner'), "slds-hide");
        component.set("v.proMessage"+rec, '');
        component.set("v.products"+rec, null);
        var action = component.get('c.getRecords');
        action.setParams({
            'searchString' : component.get('v.searchProString'+rec),
            'objectName' : 'Product2'
        });
        action.setCallback(this, function(data){
            var result = data.getReturnValue();
            
            if ( data.getState()  === 'SUCCESS' ){
                if ( result.length > 0 ){
                    
                    if ( $A.util.isEmpty(value) ){
                        component.set('v.products'+rec, result);
                    }
                    else{
                        var index = result.findIndex(x => x.value === value)
                        if ( index != -1 ){
                            var selectedRecord = result[index];
                        }
                        component.set('v.selectedProRecord'+rec, selectedRecord);
                    }
                }
                else {
                    component.set('v.proMessage'+rec, 'No Records Found');
                }
            }
            else if ( data.getState() === 'INCOMPLETE' ){
                component.set('v.proMessage'+rec, 'No Server Response or Client is Offline');
            }
                else if ( data.getState() === 'ERROR' ){
                    var errors = data.getError();
                    if ( errors && errors[0] && errors[0].message ){
                        component.set('v.proMessage'+rec, errors[0].message);
                    }
                }
            
            if ( $A.util.isEmpty(value) ){
                $A.util.addClass(component.find('resultsDivPro'+rec), 'slds-is-open');
            }
            $A.util.addClass(component.find('Spinner'), 'slds-hide');
        });
        $A.enqueueAction(action);
    },
    
    testInsertRecords : function(component, event){
        
        var lst;
        
        for ( var i = 1; i < 21; i++ ){
            if( i === 1 ){
                if(! $A.util.isEmpty(component.get('v.accValue')) ){
                    
                    var recs = {
                        'account':component.get('v.accValue'),
                        'product':component.get('v.proValue'),
                        'quantity':component.get('v.quantity'),
                        'unitPrice':component.get('v.unitprice'),
                        'myDate':component.get('v.myDate'),
                        'reference':component.get('v.reference')
                    };
                    
                   lst = '['  + JSON.stringify(recs);
                }
            }
            else{
                if(! $A.util.isEmpty(component.get('v.accValue'+i)) ){
                    
                    var recs = {
                        'account':component.get('v.accValue'+i),
                        'product':component.get('v.proValue'+i),
                        'quantity':component.get('v.quantity'+i),
                        'unitPrice':component.get('v.unitprice'+i),
                        'myDate':component.get('v.myDate'+i),
                        'reference':component.get('v.reference'+i)
                    };
                    
                    lst = lst + ',' + JSON.stringify(recs);                    
                    
                }
            }
            
            if( (i === 20) && (! $A.util.isEmpty(lst)) ){
                lst += ']'; 
            }
        }
        
        if (! $A.util.isEmpty(lst) ){
            var action1 = component.get('c.insertRecords');
            action1.setParams({
                'value': lst
            });
            action1.setCallback(this, function(data){
                var res = data.getReturnValue();
                
                if( res === 'SUCCESS'){
                    component.set("v.isHidden", false);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        mode: 'sticky',
                        message: 'Successfully created invoices',
                        type: 'success'
                    });
                    toastEvent.fire();
                    
                    setTimeout( function() {
                        document.location = 'home';
                    }, 800);
                    
                }
                else if (res === 'ERROR'){
                    
                    setTimeout( function() {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            mode: 'sticky',
                            message: 'Error creating invoices on server side',
                            type: 'error'
                        });
                        toastEvent.fire();
                    }, 250);
                }
            });
            $A.enqueueAction(action1);
        }
        else{
            setTimeout( function() {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            mode: 'sticky',
                            message: 'No Valid Data Inserted',
                            type: 'error'
                        });
                        toastEvent.fire();
                    }, 250);
        }
        
    }
})
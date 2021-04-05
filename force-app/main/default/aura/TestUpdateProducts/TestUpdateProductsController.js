/***
 Created by Glic-Tech.

 v1.0 - JavaScript Controller for the Mass Invoice Upsert.
 
 Last modified by Owen in Glic-Tech on 10/09/2019.
***/
({
	doInit : function(component, event, helper) {
        
        component.set('v.isHidden', true);
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        
        today = yyyy + '-' + mm + '-' + dd ;
        
        component.set('v.todaysDate', today);
        
        for(var i = 1; i < 21; i++){
            
            if(i === 1){
                component.set('v.myDate', today);
                component.set('v.quantity', 1);
                component.set('v.selectedProRecord', '');
                component.set('v.selectedAccRecord', '');
            }
            else{
                component.set('v.myDate'+i, today);
                component.set('v.quantity'+i, 1);
                component.set('v.selectedProRecord'+i, '');
                component.set('v.selectedAccRecord'+i, '');
            }
            
        }
        
	},
    
    closeModel : function(component, event, helper){
        component.set("v.isHidden", false);
        document.location = 'home';
    },
    
    createInvoices : function(component, event, helper){
        helper.testInsertRecords(component, event);
    },
    
    addLinesToPage : function(component, event, helper){
        var five = component.get('v.isFive');
        var ten = component.get('v.isTen');
        var fifteen = component.get('v.isFifteen');
        
        if (! five ){
            component.set('v.isFive', true);
        }
        else if ( (five) ){
            component.set('v.isTen', true);
        }
        
        if ( (five) && (ten) && (! fifteen) ){
            component.set('v.isFifteen', true);
        }
        
    },
    
    /* Methods for line 1 */
    
    searchRecords : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord',selectedRecord);
            component.set('v.accValue',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc'),'slds-is-open');
            
            component.set('v.showLabAcc', true);
        }
    },
    
    selectProItem : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord',selectedRecord);
            component.set('v.proValue',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro'),'slds-is-open');
            
            component.set('v.showLabPro', true);
        }
    },
    
    // To remove the selected item.
    removeItem : function( component, event, helper ){
        component.set('v.selectedAccRecord','');
        component.set('v.accValue','');
        component.set('v.searchAccString','');
        component.set('v.showLabAcc', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc' ).focus();
        }, 250);
    },
    
    removeProItem : function( component, event, helper ){
        component.set('v.selectedProRecord','');
        component.set('v.proValue','');
        component.set('v.searchProString','');
        component.set('v.showLabPro', false);
        setTimeout( function() {
            component.find( 'inputLookupPro' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc'),'slds-is-open');
    },
    
    blurProEvent : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro'),'slds-is-open');
    },
    
    /* Methods for line 2 */
    
    searchRecords2 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString2'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '2');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc2'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords2 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString2"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '2');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro2'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem2 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts2');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord2',selectedRecord);
            component.set('v.accValue2',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc2'),'slds-is-open');
            
            component.set('v.showLabAcc2', true);
        }
    },
    
    selectProItem2 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products2');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord2',selectedRecord);
            component.set('v.proValue2',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro2'),'slds-is-open');
            
            component.set('v.showLabPro2', true);
        }
    },
    
    // To remove the selected item.
    removeItem2 : function( component, event, helper ){
        component.set('v.selectedAccRecord2','');
        component.set('v.accValue2','');
        component.set('v.searchAccString2','');
        component.set('v.showLabAcc2', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc2' ).focus();
        }, 250);
    },
    
    removeProItem2 : function( component, event, helper ){
        component.set('v.selectedProRecord2','');
        component.set('v.proValue2','');
        component.set('v.searchProString2','');
        component.set('v.showLabPro2', false);
        setTimeout( function() {
            component.find( 'inputLookupPro2' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent2 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc2'),'slds-is-open');
    },
    
    blurProEvent2 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro2'),'slds-is-open');
    },
    
    /* Methods for line 3 */
    
    searchRecords3 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString3'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '3');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc3'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords3 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString3"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '3');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro3'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem3 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts3');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord3',selectedRecord);
            component.set('v.accValue3',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc3'),'slds-is-open');
            
            component.set('v.showLabAcc3', true);
        }
    },
    
    selectProItem3 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products3');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord3',selectedRecord);
            component.set('v.proValue3',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro3'),'slds-is-open');
            
            component.set('v.showLabPro3', true);
        }
    },
    
    // To remove the selected item.
    removeItem3 : function( component, event, helper ){
        component.set('v.selectedAccRecord3','');
        component.set('v.accValue3','');
        component.set('v.searchAccString3','');
        component.set('v.showLabAcc3', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc3' ).focus();
        }, 250);
    },
    
    removeProItem3 : function( component, event, helper ){
        component.set('v.selectedProRecord3','');
        component.set('v.proValue3','');
        component.set('v.searchProString3','');
        component.set('v.showLabPro3', false);
        setTimeout( function() {
            component.find( 'inputLookupPro3' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent3 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc3'),'slds-is-open');
    },
    
    blurProEvent3 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro3'),'slds-is-open');
    },
    
    /* Methods for line 4 */
    
    searchRecords4 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString4'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '4');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc4'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords4 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString4"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '4');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro4'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem4 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts4');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord4',selectedRecord);
            component.set('v.accValue4',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc4'),'slds-is-open');
            
            component.set('v.showLabAcc4', true);
        }
    },
    
    selectProItem4 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products4');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord4',selectedRecord);
            component.set('v.proValue4',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro4'),'slds-is-open');
            
            component.set('v.showLabPro4', true);
        }
    },
    
    // To remove the selected item.
    removeItem4 : function( component, event, helper ){
        component.set('v.selectedAccRecord4','');
        component.set('v.accValue4','');
        component.set('v.searchAccString4','');
        component.set('v.showLabAcc4', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc4' ).focus();
        }, 250);
    },
    
    removeProItem4 : function( component, event, helper ){
        component.set('v.selectedProRecord4','');
        component.set('v.proValue4','');
        component.set('v.searchProString4','');
        component.set('v.showLabPro4', false);
        setTimeout( function() {
            component.find( 'inputLookupPro4' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent4 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc4'),'slds-is-open');
    },
    
    blurProEvent4 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro4'),'slds-is-open');
    },
    
    
    /* Methods for line 5 */
    
    searchRecords5 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString5'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '5');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc5'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords5 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString5"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '5');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro5'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem5 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts5');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord5',selectedRecord);
            component.set('v.accValue5',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc5'),'slds-is-open');
            
            component.set('v.showLabAcc5', true);
        }
    },
    
    selectProItem5 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products5');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord5',selectedRecord);
            component.set('v.proValue5',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro5'),'slds-is-open');
            
            component.set('v.showLabPro5', true);
        }
    },
    
    // To remove the selected item.
    removeItem5 : function( component, event, helper ){
        component.set('v.selectedAccRecord5','');
        component.set('v.accValue5','');
        component.set('v.searchAccString5','');
        component.set('v.showLabAcc5', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc5' ).focus();
        }, 250);
    },
    
    removeProItem5 : function( component, event, helper ){
        component.set('v.selectedProRecord5','');
        component.set('v.proValue5','');
        component.set('v.searchProString5','');
        component.set('v.showLabPro5', false);
        setTimeout( function() {
            component.find( 'inputLookupPro5' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent5 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc5'),'slds-is-open');
    },
    
    blurProEvent5 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro5'),'slds-is-open');
    },
    
    /* Methods for line 6 */
    
    searchRecords6 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString6'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '6');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc6'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords6 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString6"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '6');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro6'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem6 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts6');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord6',selectedRecord);
            component.set('v.accValue6',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc6'),'slds-is-open');
            
            component.set('v.showLabAcc6', true);
        }
    },
    
    selectProItem6 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products6');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord6',selectedRecord);
            component.set('v.proValue6',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro6'),'slds-is-open');
            
            component.set('v.showLabPro6', true);
        }
    },
    
    // To remove the selected item.
    removeItem6 : function( component, event, helper ){
        component.set('v.selectedAccRecord6','');
        component.set('v.accValue6','');
        component.set('v.searchAccString6','');
        component.set('v.showLabAcc6', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc6' ).focus();
        }, 250);
    },
    
    removeProItem6 : function( component, event, helper ){
        component.set('v.selectedProRecord6','');
        component.set('v.proValue6','');
        component.set('v.searchProString6','');
        component.set('v.showLabPro6', false);
        setTimeout( function() {
            component.find( 'inputLookupPro6' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent6 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc6'),'slds-is-open');
    },
    
    blurProEvent6 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro6'),'slds-is-open');
    },
    
    /* Methods for line 7 */
    
    searchRecords7 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString7'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '7');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc7'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords7 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString7"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '7');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro7'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem7 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts7');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord7',selectedRecord);
            component.set('v.accValue7',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc7'),'slds-is-open');
            
            component.set('v.showLabAcc7', true);
        }
    },
    
    selectProItem7 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products7');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord7',selectedRecord);
            component.set('v.proValue7',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro7'),'slds-is-open');
            
            component.set('v.showLabPro7', true);
        }
    },
    
    // To remove the selected item.
    removeItem7 : function( component, event, helper ){
        component.set('v.selectedAccRecord7','');
        component.set('v.accValue7','');
        component.set('v.searchAccString7','');
        component.set('v.showLabAcc7', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc7' ).focus();
        }, 250);
    },
    
    removeProItem7 : function( component, event, helper ){
        component.set('v.selectedProRecord7','');
        component.set('v.proValue7','');
        component.set('v.searchProString7','');
        component.set('v.showLabPro7', false);
        setTimeout( function() {
            component.find( 'inputLookupPro7' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent7 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc7'),'slds-is-open');
    },
    
    blurProEvent7 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro7'),'slds-is-open');
    },
    
    /* Methods for line 8 */
    
    searchRecords8 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString8'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '8');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc8'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords8 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString8"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '8');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro8'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem8 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts8');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord8',selectedRecord);
            component.set('v.accValue8',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc8'),'slds-is-open');
            
            component.set('v.showLabAcc8', true);
        }
    },
    
    selectProItem8 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products8');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord8',selectedRecord);
            component.set('v.proValue8',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro8'),'slds-is-open');
            
            component.set('v.showLabPro8', true);
        }
    },
    
    // To remove the selected item.
    removeItem8 : function( component, event, helper ){
        component.set('v.selectedAccRecord8','');
        component.set('v.accValue8','');
        component.set('v.searchAccString8','');
        component.set('v.showLabAcc8', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc8' ).focus();
        }, 250);
    },
    
    removeProItem8 : function( component, event, helper ){
        component.set('v.selectedProRecord8','');
        component.set('v.proValue8','');
        component.set('v.searchProString8','');
        component.set('v.showLabPro8', false);
        setTimeout( function() {
            component.find( 'inputLookupPro8' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent8 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc8'),'slds-is-open');
    },
    
    blurProEvent8 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro8'),'slds-is-open');
    },
    
    /* Methods for line 9 */
    
    searchRecords9 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString9'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '9');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc9'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords9 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '9');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro9'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem9 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts9');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord9',selectedRecord);
            component.set('v.accValue9',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc9'),'slds-is-open');
            
            component.set('v.showLabAcc9', true);
        }
    },
    
    selectProItem9 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products9');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord9',selectedRecord);
            component.set('v.proValue9',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro9'),'slds-is-open');
            
            component.set('v.showLabPro9', true);
        }
    },
    
    // To remove the selected item.
    removeItem9: function( component, event, helper ){
        component.set('v.selectedAccRecord9','');
        component.set('v.accValue9','');
        component.set('v.searchAccString9','');
        component.set('v.showLabAcc9', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc9' ).focus();
        }, 250);
    },
    
    removeProItem9 : function( component, event, helper ){
        component.set('v.selectedProRecord9','');
        component.set('v.proValue9','');
        component.set('v.searchProString9','');
        component.set('v.showLabPro9', false);
        setTimeout( function() {
            component.find( 'inputLookupPro9' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent9 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc9'),'slds-is-open');
    },
    
    blurProEvent9 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro9'),'slds-is-open');
    },
    
    /* Methods for line 10 */
    
    searchRecords10 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString10'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '10');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc10'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords10 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString10"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '10');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro10'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem10 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts10');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord10',selectedRecord);
            component.set('v.accValue10',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc10'),'slds-is-open');
            
            component.set('v.showLabAcc10', true);
        }
    },
    
    selectProItem10 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products10');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord10',selectedRecord);
            component.set('v.proValue10',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro10'),'slds-is-open');
            
            component.set('v.showLabPro10', true);
        }
    },
    
    // To remove the selected item.
    removeItem10 : function( component, event, helper ){
        component.set('v.selectedAccRecord10','');
        component.set('v.accValue10','');
        component.set('v.searchAccString10','');
        component.set('v.showLabAcc10', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc10' ).focus();
        }, 250);
    },
    
    removeProItem10 : function( component, event, helper ){
        component.set('v.selectedProRecord10','');
        component.set('v.proValue10','');
        component.set('v.searchProString10','');
        component.set('v.showLabPro10', false);
        setTimeout( function() {
            component.find( 'inputLookupPro10' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent10 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc10'),'slds-is-open');
    },
    
    blurProEvent10 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro10'),'slds-is-open');
    },
    
    /* Methods for line 11 */
    
    searchRecords11 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString11'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '11');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc11'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords11 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString11"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '11');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro11'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem11 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts11');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord11',selectedRecord);
            component.set('v.accValue11',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc11'),'slds-is-open');
            
            component.set('v.showLabAcc11', true);
        }
    },
    
    selectProItem11 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products11');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord11',selectedRecord);
            component.set('v.proValue11',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro11'),'slds-is-open');
            
            component.set('v.showLabPro11', true);
        }
    },
    
    // To remove the selected item.
    removeItem11 : function( component, event, helper ){
        component.set('v.selectedAccRecord11','');
        component.set('v.accValue11','');
        component.set('v.searchAccString11','');
        component.set('v.showLabAcc11', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc11' ).focus();
        }, 250);
    },
    
    removeProItem11 : function( component, event, helper ){
        component.set('v.selectedProRecord11','');
        component.set('v.proValue11','');
        component.set('v.searchProString11','');
        component.set('v.showLabPro11', false);
        setTimeout( function() {
            component.find( 'inputLookupPro11' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent11 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc11'),'slds-is-open');
    },
    
    blurProEvent11 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro11'),'slds-is-open');
    },
    
    /* Methods for line 12 */
    
    searchRecords12 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString12'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '12');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc12'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords12 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString12"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '12');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro12'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem12 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts12');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord12',selectedRecord);
            component.set('v.accValue12',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc12'),'slds-is-open');
            
            component.set('v.showLabAcc12', true);
        }
    },
    
    selectProItem12 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products12');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord12',selectedRecord);
            component.set('v.proValue12',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro12'),'slds-is-open');
            
            component.set('v.showLabPro12', true);
        }
    },
    
    // To remove the selected item.
    removeItem12 : function( component, event, helper ){
        component.set('v.selectedAccRecord12','');
        component.set('v.accValue12','');
        component.set('v.searchAccString12','');
        component.set('v.showLabAcc12', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc12' ).focus();
        }, 250);
    },
    
    removeProItem12 : function( component, event, helper ){
        component.set('v.selectedProRecord12','');
        component.set('v.proValue12','');
        component.set('v.searchProString12','');
        component.set('v.showLabPro12', false);
        setTimeout( function() {
            component.find( 'inputLookupPro12' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent12 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc12'),'slds-is-open');
    },
    
    blurProEvent12 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro12'),'slds-is-open');
    },
    
    /* Methods for line 13 */
    
    searchRecords13 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString13'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '13');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc13'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords13 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString13"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '13');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro13'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem13 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts13');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord13',selectedRecord);
            component.set('v.accValue13',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc13'),'slds-is-open');
            
            component.set('v.showLabAcc13', true);
        }
    },
    
    selectProItem13 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products13');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord13',selectedRecord);
            component.set('v.proValue13',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro13'),'slds-is-open');
            
            component.set('v.showLabPro13', true);
        }
    },
    
    // To remove the selected item.
    removeItem13 : function( component, event, helper ){
        component.set('v.selectedAccRecord13','');
        component.set('v.accValue13','');
        component.set('v.searchAccString13','');
        component.set('v.showLabAcc13', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc13' ).focus();
        }, 250);
    },
    
    removeProItem13 : function( component, event, helper ){
        component.set('v.selectedProRecord13','');
        component.set('v.proValue13','');
        component.set('v.searchProString13','');
        component.set('v.showLabPro13', false);
        setTimeout( function() {
            component.find( 'inputLookupPro13' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent13 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc13'),'slds-is-open');
    },
    
    blurProEvent13 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro13'),'slds-is-open');
    },
    
    /* Methods for line 14 */
    
    searchRecords14 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString14'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '14');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc14'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords14 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString14"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '14');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro14'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem14 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts14');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord14',selectedRecord);
            component.set('v.accValue14',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc14'),'slds-is-open');
            
            component.set('v.showLabAcc14', true);
        }
    },
    
    selectProItem14 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products14');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord14',selectedRecord);
            component.set('v.proValue14',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro14'),'slds-is-open');
            
            component.set('v.showLabPro14', true);
        }
    },
    
    // To remove the selected item.
    removeItem14 : function( component, event, helper ){
        component.set('v.selectedAccRecord14','');
        component.set('v.accValue14','');
        component.set('v.searchAccString14','');
        component.set('v.showLabAcc14', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc14' ).focus();
        }, 250);
    },
    
    removeProItem14 : function( component, event, helper ){
        component.set('v.selectedProRecord14','');
        component.set('v.proValue14','');
        component.set('v.searchProString14','');
        component.set('v.showLabPro14', false);
        setTimeout( function() {
            component.find( 'inputLookupPro14' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent14 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc14'),'slds-is-open');
    },
    
    blurProEvent14 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro14'),'slds-is-open');
    },
    
    /* Methods for line 15 */
    
    searchRecords15 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString15'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '15');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc15'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords15 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString15"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '15');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro15'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem15 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts15');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord15',selectedRecord);
            component.set('v.accValue15',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc15'),'slds-is-open');
            
            component.set('v.showLabAcc15', true);
        }
    },
    
    selectProItem15 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products15');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord15',selectedRecord);
            component.set('v.proValue15',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro15'),'slds-is-open');
            
            component.set('v.showLabPro15', true);
        }
    },
    
    // To remove the selected item.
    removeItem15 : function( component, event, helper ){
        component.set('v.selectedAccRecord15','');
        component.set('v.accValue15','');
        component.set('v.searchAccString15','');
        component.set('v.showLabAcc15', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc15' ).focus();
        }, 250);
    },
    
    removeProItem15 : function( component, event, helper ){
        component.set('v.selectedProRecord15','');
        component.set('v.proValue15','');
        component.set('v.searchProString15','');
        component.set('v.showLabPro15', false);
        setTimeout( function() {
            component.find( 'inputLookupPro15' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent15 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc15'),'slds-is-open');
    },
    
    blurProEvent15 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro15'),'slds-is-open');
    },
    
    /* Methods for line 16 */
    
    searchRecords16 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString16'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '16');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc16'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords16 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString16"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '16');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro16'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem16 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts16');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord16',selectedRecord);
            component.set('v.accValue16',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc16'),'slds-is-open');
            
            component.set('v.showLabAcc16', true);
        }
    },
    
    selectProItem16 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products16');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord16',selectedRecord);
            component.set('v.proValue16',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro16'),'slds-is-open');
            
            component.set('v.showLabPro16', true);
        }
    },
    
    // To remove the selected item.
    removeItem16 : function( component, event, helper ){
        component.set('v.selectedAccRecord16','');
        component.set('v.accValue16','');
        component.set('v.searchAccString16','');
        component.set('v.showLabAcc16', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc16' ).focus();
        }, 250);
    },
    
    removeProItem16 : function( component, event, helper ){
        component.set('v.selectedProRecord16','');
        component.set('v.proValue16','');
        component.set('v.searchProString16','');
        component.set('v.showLabPro16', false);
        setTimeout( function() {
            component.find( 'inputLookupPro16' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent16 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc16'),'slds-is-open');
    },
    
    blurProEvent16 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro16'),'slds-is-open');
    },
    
    /* Methods for line 17 */
    
    searchRecords17 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString17'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '17');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc17'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords17 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString17"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '17');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro17'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem17 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts17');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord17',selectedRecord);
            component.set('v.accValue17',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc17'),'slds-is-open');
            
            component.set('v.showLabAcc17', true);
        }
    },
    
    selectProItem17 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products17');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord17',selectedRecord);
            component.set('v.proValue17',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro17'),'slds-is-open');
            
            component.set('v.showLabPro17', true);
        }
    },
    
    // To remove the selected item.
    removeItem17 : function( component, event, helper ){
        component.set('v.selectedAccRecord17','');
        component.set('v.accValue17','');
        component.set('v.searchAccString17','');
        component.set('v.showLabAcc17', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc17' ).focus();
        }, 250);
    },
    
    removeProItem17 : function( component, event, helper ){
        component.set('v.selectedProRecord17','');
        component.set('v.proValue17','');
        component.set('v.searchProString17','');
        component.set('v.showLabPro17', false);
        setTimeout( function() {
            component.find( 'inputLookupPro17' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent17 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc17'),'slds-is-open');
    },
    
    blurProEvent17 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro17'),'slds-is-open');
    },
    
    /* Methods for line 18 */
    
    searchRecords18 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString18'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '18');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc18'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords18 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString18"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '18');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro18'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem18 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts18');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord18',selectedRecord);
            component.set('v.accValue18',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc18'),'slds-is-open');
            
            component.set('v.showLabAcc18', true);
        }
    },
    
    selectProItem18 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products18');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord18',selectedRecord);
            component.set('v.proValue18',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro18'),'slds-is-open');
            
            component.set('v.showLabPro18', true);
        }
    },
    
    // To remove the selected item.
    removeItem18 : function( component, event, helper ){
        component.set('v.selectedAccRecord18','');
        component.set('v.accValue18','');
        component.set('v.searchAccString18','');
        component.set('v.showLabAcc18', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc18' ).focus();
        }, 250);
    },
    
    removeProItem18 : function( component, event, helper ){
        component.set('v.selectedProRecord18','');
        component.set('v.proValue18','');
        component.set('v.searchProString18','');
        component.set('v.showLabPro18', false);
        setTimeout( function() {
            component.find( 'inputLookupPro18' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent18 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc18'),'slds-is-open');
    },
    
    blurProEvent18 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro18'),'slds-is-open');
    },
    
    /* Methods for line 12 */
    
    searchRecords19 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString19'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '19');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc19'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords19 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString19"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '19');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro19'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem19 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts19');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord19',selectedRecord);
            component.set('v.accValue19',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc19'),'slds-is-open');
            
            component.set('v.showLabAcc19', true);
        }
    },
    
    selectProItem19 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products19');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord19',selectedRecord);
            component.set('v.proValue19',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro19'),'slds-is-open');
            
            component.set('v.showLabPro19', true);
        }
    },
    
    // To remove the selected item.
    removeItem19 : function( component, event, helper ){
        component.set('v.selectedAccRecord19','');
        component.set('v.accValue19','');
        component.set('v.searchAccString19','');
        component.set('v.showLabAcc19', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc19' ).focus();
        }, 250);
    },
    
    removeProItem19 : function( component, event, helper ){
        component.set('v.selectedProRecord19','');
        component.set('v.proValue19','');
        component.set('v.searchProString19','');
        component.set('v.showLabPro19', false);
        setTimeout( function() {
            component.find( 'inputLookupPro19' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent19 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc19'),'slds-is-open');
    },
    
    blurProEvent19 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro19'),'slds-is-open');
    },
    
    /* Methods for line 20 */
    
    searchRecords20 : function( component, event, helper ) {
        
        var val = $A.util.isEmpty(component.get('v.searchAccString20'));
        
        if( !val ) {
            helper.searchAccounts( component, event, helper, '', '20');
        } else {
            $A.util.removeClass(component.find('resultsDivAcc20'),'slds-is-open'); //$A.util.isEmpty(component.get('v.searchAccString'))
        }
    },
    
    searchProRecords20 : function(component, event, helper){
        var vall = $A.util.isEmpty(component.get("v.searchProString20"));
        
        if( !vall ){
            helper.searchProducts(component, event, helper, '', '20');
        }
        else{
            $A.util.removeClass(component.find('resultsDivPro20'),'slds-is-open');
        }
    },
    
    // When an item is selected
    selectItem20 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.accounts20');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedAccRecord20',selectedRecord);
            component.set('v.accValue20',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivAcc20'),'slds-is-open');
            
            component.set('v.showLabAcc20', true);
        }
    },
    
    selectProItem20 : function( component, event, helper ) {
        if(!$A.util.isEmpty(event.currentTarget.id)) {
            var recordsList = component.get('v.products20');
            var index = recordsList.findIndex(x => x.value === event.currentTarget.id)
            if(index != -1) {
                var selectedRecord = recordsList[index];
            }
            component.set('v.selectedProRecord20',selectedRecord);
            component.set('v.proValue20',selectedRecord.value);
            $A.util.removeClass(component.find('resultsDivPro20'),'slds-is-open');
            
            component.set('v.showLabPro20', true);
        }
    },
    
    // To remove the selected item.
    removeItem20 : function( component, event, helper ){
        component.set('v.selectedAccRecord20','');
        component.set('v.accValue20','');
        component.set('v.searchAccString20','');
        component.set('v.showLabAcc20', false);
        setTimeout( function() {
            component.find( 'inputLookupAcc20' ).focus();
        }, 250);
    },
    
    removeProItem20 : function( component, event, helper ){
        component.set('v.selectedProRecord20','');
        component.set('v.proValue20','');
        component.set('v.searchProString20','');
        component.set('v.showLabPro20', false);
        setTimeout( function() {
            component.find( 'inputLookupPro20' ).focus();
        }, 250);
    },
    
    // To close the dropdown if clicked outside the dropdown.
    blurEvent20 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivAcc20'),'slds-is-open');
    },
    
    blurProEvent20 : function( component, event, helper ){
        $A.util.removeClass(component.find('resultsDivPro20'),'slds-is-open');
    }
})
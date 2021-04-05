public class UpdateContactPageLayout {
    public Metadata.Layout addLayoutItem(){
        List<Metadata.Metadata> layoutsList = Metadata.Operations.retrieve(Metadata.MetadataType.Layout, new List<String> {'Contact-Contact Layout'});
        
        Metadata.Layout layoutMetadata = (Metadata.Layout)layoutsList.get(0);
        
        Metadata.LayoutSection contactLayoutSection = null;
        
        for(metadata.LayoutSection i : layoutmetadata.layoutsections){
            if ( i.label == 'Additional Information' ) { contactlayoutsection = i; break; }
        }
        
        list<metadata.LayoutColumn> contactColumns = contactlayoutsection.layoutcolumns;
        
        list<metadata.LayoutItem> contactLayoutItems = contactColumns.get(0).layoutitems;
        
        metadata.LayoutItem newField = new metadata.LayoutItem();
        newField.behavior = Metadata.UiBehavior.Edit;
        newField.field = 'AMAPI__Apex_MD_API_Twitter_name__c';
        
        contactLayoutItems.add(newField);
        
        return layoutMetadata;
    }
}
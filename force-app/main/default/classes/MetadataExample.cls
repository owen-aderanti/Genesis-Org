public class MetadataExample {
    public void updateMetadata(){
        metadata.CustomMetadata customMetadata = new metadata.CustomMetadata();
        custommetadata.fullname = 'MyNamespace__MyMetadataTypeName.MyMetadataRecordName';
        
        metadata.CustomMetadataValue customField = new metadata.CustomMetadataValue();
        customfield.field = 'customField__c';
        customfield.value = 'New value';
        
        custommetadata.values.add(customfield);
        
        metadata.DeployContainer deployContainer = new metadata.DeployContainer();
        deploycontainer.addmetadata(custommetadata);
        
        id asyncResultId  = Metadata.Operations.enqueueDeployment(deploycontainer, null);
    }
}
/*
import { LightningElement,wire,track,api } from 'lwc';
import getOpps from '@salesforce/apex/test.getOpps';
const actions = [
    { label: 'Edit', name: 'Edit', iconName: 'utility:edit' },
    { label: 'Delete', name: 'Delete' },
];
const columns = [{
    label: 'Id',
    fieldName: 'Id',
},{  
    label: "Name",  
    fieldName: "recordLink",  
    type: "url",
    sortable: true,
    editable: true,
    typeAttributes: { label: { fieldName: "Name" }, tooltip:"Name", target: "_blank" ,linkify: true},
    fixedWidth: 200, sortable: false, hideDefaultActions: true, wrapText: true,
   
},
{
    label: 'Active',
    fieldName: 'Active__c',
    editable: true
},{
    label: 'AccountNumber',
    fieldName: 'AccountNumber',
  
},{
    label: 'Industry',
    fieldName: 'Industry',
    sortable: true,
    editable: true
},{
    label: 'Type',
    fieldName: 'Type',
    editable: true
}, {
    label: 'Actions',
    type: 'action',
    typeAttributes: { rowActions: actions, menuAlignment: 'right' },
}
];
export default class TableFilterAndDelete extends LightningElement {
error;
data;
wiredActivities ;
columns = columns;
    @wire(getOpps, {
            })
    wiredclass(value){
        this.wiredActivities = value;
        const { data, error } = value;
        if (data) { 
            var ObjData = JSON.parse(JSON.stringify(data));
           
         ObjData.forEach(Record => {
            Record.recordLink = "/" + Record.Id;  
            Record.Name = Record.Name;
            
            });
            
            this.data = ObjData;
            this.showLoadingSpinner = false;
            this.error = undefined;
            
            
           } else if (error) {  
            this.error = error;  
            this.data = undefined;
           }  
    }

getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        this.selectedAccountlist = [];
        for (var i = 0; i < selectedRows.length; i++){
            this.selectedAccountlist.push(selectedRows[i].Id);
        }
        }

    @api
    handleRowAction(event) {
        var action = event.detail.action;
        var row = event.detail.row.Id;
        switch (action.name) {
            case 'Edit':
                         Write Your Code IF Edit
                break;
            case 'Delete':
                    Write Your Code IF Delete

             break;
        }
    }
}



import { LightningElement, track } from 'lwc'; 
import fetchAccounts from '@salesforce/apex/test.fetchAccounts';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' }, 
    { label: 'Delete', name: 'delete'}
];
 
const columns = [   
    { label: 'Name', fieldName: 'Name', editable:true }, 
    { label: 'Industry', fieldName: 'Industry', editable:true},
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }, 
];

export default class field extends NavigationMixin( LightningElement ) {
     
    @track accounts; 
    @track error; 
    @track columns = columns; 
 
    handleKeyChange( event ) { 
         
        const searchKey = event.target.value; 
 
        if ( searchKey ) { 
 
            fetchAccounts( { searchKey } )   
            .then(result => { 
 
                this.accounts = result; 
 
            }) 
            .catch(error => { 
                this.error = error; 
 
            }); 
 
        } else 
        this.accounts = undefined; 
 
    }

    handleRowAction( event ) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch ( actionName ) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Account',
                        actionName: 'edit'
                    }
                });
                break;
                case 'delete':
                    break;
            default:
        }

    }

}


import { LightningElement, wire, api } from 'lwc';
 import lwcAddEditButtonToTable from '@salesforce/apex/test.getIssueLogList';
 import { NavigationMixin } from 'lightning/navigation';
     const columns = [
         {
             type:"button",
             fixedWidth: 150,
             typeAttributes: {
                 label: 'Edit',
                 name: 'edit',
                 variant: 'brand'
             }
         },       
         {label: 'KanbanCard Name', fieldName: 'Lean__KanbanCard__c', type: 'text'},
         {label: 'IssueLog Name', fieldName: 'Name', type: 'text'},
         {label: 'Score', fieldName: 'Lean__Score__c', type: 'Number'},
         {label: 'Weight', fieldName: 'Lean__Weight__c', type: 'text'},
         {label: 'Probability', fieldName: 'Lean__Probability__c', type: 'text'},
         {label: 'Detail', fieldName: 'Lean__Detail__c', type: 'text'},
         {label: 'Resolved', fieldName: 'Lean__Resolved__c', type: 'text'}
     ];
 export default class field extends NavigationMixin(LightningElement){
     @api recordId;
     @api issueLogData;
     @api coulumList = columns;
     @api error;

     @wire(lwcAddEditButtonToTable)
         wiredData({error, data }){
             if (data){
                 console.log('Data \n', data);
                 this.issueLogData = data;
                 this.error = undefined;
             }
             else if (error){
                 console.error('Error:', error);
             }
         }
 
         navigateToEditAccountPage(LightningElement){
             console.log('Record Id ==> '+ this.recordId);
             this[NavigationMixin.Navigate]({
                 type:'standard__recordPage',
                 attributes:{
                     recordId:'this.recordId',
                     objectApiName:'Lean__IssueLog__c',
                     actionName: 'edit'
                 }
             });
         }
}


import { LightningElement, wire,api, track } from 'lwc';
import fetchContactRecord from '@salesforce/apex/test.fetchContactRecord';
import deleteMultipleContactRecord from '@salesforce/apex/test.deleteMultipleContactRecord';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class field extends LightningElement {
    @api  columns =[
        { label: 'First Name', fieldName: 'FirstName', type:'text'},
        { label: 'Last Name', fieldName: 'LastName',type:'text' },
        { label: 'Email', fieldName: 'Email', type:'Email'}       
    ];

        
    @wire (fetchContactRecord) wireContact;

    @api selectedContactIdList=[];
    @track errorMsg;


    getSelectedIdAction(event){
        const selectedContactRows = event.detail.selectedRows;
        window.console.log('selectedContactRows# ' + JSON.stringify(selectedContactRows));
        this.selectedContactRows=[];
        
        for (let i = 0; i<selectedContactRows.length; i++){
            this.selectedContactIdList.push(selectedContactRows[i].Id);
        }

       // window.console.log('selectedContactRows1 ' + this.selectedContactRows + selectedContactRows.length );
    }
  
   
    deleteContactRowAction(){
        deleteMultipleContactRecord({conObj:this.selectedContactIdList})
        .then(()=>{
            this.template.querySelector('lightning-datatable').selectedContactRows=[];

            const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Record deleted successfully',
                variant:'success'
              });
              this.dispatchEvent(toastEvent);

            return refreshApex(this.wireContact);
        })
        .catch(error =>{
            this.errorMsg =error;
            window.console.log('unable to delete the record due to ' + JSON.stringify(this.errorMsg));
        });
    }

}

import { LightningElement, api, track } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


export default class field extends NavigationMixin(LightningElement) {
    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;
    
    @track error;
    deletecall(event) {
        deleteRecord(this.recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                // Navigate to a record home page after
                // the record is deleted, such as to the
                // contact home page
                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: 'Contact',
                        actionName: 'home',
                    },
                });
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}

import { LightningElement, track, wire } from 'lwc';
import displayContactRecord from '@salesforce/apex/lwcAppExampleApex.displayContactRecord';
import {deleteRecord} from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class data extends LightningElement {
  @wire (displayContactRecord) getContact;
  @track recordId;

  handleContactDelete(event){
     this.recordId = event.target.value;
     //window.console.log('recordId# ' + this.recordId);
     deleteRecord(this.recordId) 
     .then(() =>{

        const toastEvent = new ShowToastEvent({
            title:'Record Deleted',
            message:'Record deleted successfully',
            variant:'success',
        })
        this.dispatchEvent(toastEvent);

        return refreshApex(this.getContact);
        
     })
     .catch(error =>{
         window.console.log('Unable to delete record due to ' + error.body.message);
     });
  }
  
}
*/

import { LightningElement, wire, api, track } from "lwc";

import getfields from "@salesforce/apex/dynamicObjectList.getfields";
import getRecordsData from "@salesforce/apex/dynamicObjectList.configRecordsData";

import { createRecord } from 'lightning/uiRecordApi';  //calling create record method
import OBJECT_NAME from '@salesforce/schema/configuration__c';
import SELECTED_OBJECT from '@salesforce/schema/configuration__c.name';
import SELECTED_FIELD from '@salesforce/schema/configuration__c.selected_fields__c';
import {getRecord,getFieldValue} from 'lightning/uiRecordApi';
//import Fieldname from '@salesforce/schema/Contact.AccountId';
//const fields =[Fieldname];

const columns =[{label : 'Object', fieldName : "Name"},
                {label : 'Fields', fieldName : "selected_fields__c"},];

export default class TestComponent extends LightningElement {
  @track showCard = false;
  openCardHandle(){
    this.showCard = true;
  }

// lookupId;
// @wire(getRecord,{
//   recordId:'$lookupId',
//   fields
// })
// contacts;
// get accountName(){
//   return getFieldValue(this.contacts.data,Fieldname);
// }
// handleLookupFieldChange(event){
//   this.lookupId =event.target.value;
// }

    @track columns = columns;
    @track recordData = [];
   @track data1 = [];
  @track selected = [];
  @api value = "";
  @api fieldsValue = [];
  @track configurationId;
 // @track fieldsInString;
//  @track fieldsValueStr = '';
//   selectedValue = '';






    get options() {
        return [
            {label: 'Account', value: 'Account'},
            {label: 'Contact', value: 'Contact'},
            {label: 'Lead', value: 'Lead'},
            {label: 'Opportunity', value: 'Opportunity'},
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        console.log('selectedValue'+this.value);
    }

 get selectFields() {
    return this.data1;
    console.log('data1:'+this.data1);
  }
//   get selectedObject() {
//     return this.selected.length ? this.selected : "none";
//   }		
		 @wire(getfields,{
		 objectname: '$value'})
  wiredClass({ data, error }) {
    if (data) {
     let Testdata = JSON.parse(JSON.stringify(data));
        let lstOption = [];
      for (var i = 0;i < Testdata.length;i++) {
          lstOption.push({value: Testdata[i].QualifiedApiName,label: Testdata[i].DeveloperName
          });
        }
        this.data1 = lstOption;
        this.showLoadingSpinner = false;
    } else if (error) {
      this.error = error;
    }
  }
  
   handleSelectFields(event) {
    
    // this.selected = event.detail.value;
    // console.log('selected'+this.selected);
    this.fieldsValue = event.detail.value;
    
      // for(i=0; i<=(this.fieldsValue).length; i++){
      //   fieldsValueStr += JSON.stringify(this.fieldsValue[i]) +', ';
      // }
      //console.log('fieldsValueStr=='+fieldsValueStr);
    //consolo.log(this.fieldsValue.length);
    console.log('fieldsValue='+this.fieldsValue);
    // if(this.fieldsValue.length < 5 ){
    //   this.disableGetRecords = false;
    // }else{
    //   this.disableGetRecords = true;
    // }
    
  }

  clickedButtonLabel;
  //slected = this.fieldsValue.length;
  //console.log('slected==='+slected);
  
  handleSave(event) {
    this.clickedButtonLabel = event.target.label;
    if(this.fieldsValue.length <= 5){
      console.log('clickedButtonLabel'+this.clickedButtonLabel);

      // for(i=0; i<=(this.fieldsValue).length; i++){
      //     fieldsValueStr += JSON.stringify(this.fieldsValue)[i] +', ';
      //     console.log('fieldsValueStr=='+fieldsValueStr);
      //   }

      // Creating mapping of fields of configuration__c with values
      var fields = {[SELECTED_OBJECT.fieldApiName] : this.value, 
                   [SELECTED_FIELD.fieldApiName ]:JSON.stringify(this.fieldsValue)};
 
      // Record details to pass to create method with api name of Object.
      var objectRecordInput = { apiName : OBJECT_NAME.objectApiName, fields};

      // LDS method to create record.
      createRecord(objectRecordInput).then(response => {
          alert('Account Record created with Id: ' +response.id);
         // this.configurationId = response.id;
      }).catch(error => {
          alert('Error: ' +JSON.stringify(error));
      });
    }else{
      
      alert('you cant select more than 5 fields');
    }
  }
   //fetching records in dataTable
   
    @wire(getRecordsData)
    wiredRecord({data, error}){
        if(data){
            this.recordData = data;
        }
        else if(error){
            console.log('error occured');
        }
    }
}




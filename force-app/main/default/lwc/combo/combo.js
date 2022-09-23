import { LightningElement, wire } from 'lwc';
import getContactFields from '@salesforce/apex/Field.getContactFields';

export default class ExploreReimplementDataTable extends LightningElement {
    @wire(getContactFields) wiredContactFields;
}
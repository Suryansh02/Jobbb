import { LightningElement,track, wire } from 'lwc';
import {registerListener, unregisterAllListeners} from 'c/pubSub';
import {CurrentPageReference} from 'lightning/navigation';

export default class SelectedMeetingRoom extends LightningElement {
    @track selectMeetingRoom = {};

    @wire(CurrentPageReference) pageRef;

    connectedCallback(){
        registerListener('pubsubtitleclick', this.onMeetingRoomSelectHandler, this);
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    onMeetingRoomSelectHandler(paload){
        this.selectMeetingRoom = paload;
        console.log("Payload",JSON.stringify(this.selectMeetingRoom));
    }
}
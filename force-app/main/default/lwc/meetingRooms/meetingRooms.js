import { LightningElement, track } from 'lwc';

export default class MeetingRooms extends LightningElement {

    @track selectedMeetingRoom;
    meetingRoomsInfo = [
        {roomName:'A-01', roomCapacity:'12'},
        {roomName:'A-02', roomCapacity:'16'},
        {roomName:'A-03', roomCapacity:'12'},
        {roomName:'B-01', roomCapacity:'12'},
        {roomName:'B-02', roomCapacity:'12'},
        {roomName:'B-03', roomCapacity:'12'},
        {roomName:'C-01', roomCapacity:'12'}    
        
    ];

    onTileSelectHandler(event){
        const meetingRoomInfos = event.detail;
        this.selectedMeetingRoom = meetingRoomInfos.roomName;
    }

    constructor(){
        super();
        this.template.addEventListener('tileClick',this.onTileSelectHandler.bind(this));
    }
}
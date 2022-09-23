import { LightningElement, track } from 'lwc';

export default class FirstProject extends LightningElement {
    @track dyanmicGreeting = 'World';

    greetingChangeHandler(event){
        this.dyanmicGreeting = event.target.value
    }
}
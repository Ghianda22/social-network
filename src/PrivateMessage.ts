import Message from "./Message";

export default class PrivateMessage extends Message{
    #_sender: string = "";
    #_receiver: string = "";


    constructor(text: string, sender: string, receiver: string) {
        super(text);
        this.#_sender = sender;
        this.#_receiver = receiver;
    }
}
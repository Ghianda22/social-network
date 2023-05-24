import Message from "./Message";
import PrivateMessage from "./PrivateMessage";

export default class User {
    #_timeline: Message[] = [];
    #_subscriptions: User[] = [];
    #_username: string;
    #_privateMessage: Map<string, PrivateMessage[]> = new Map();

    static existingUsernames: string[] = []; //should be a set


    constructor(username: string) {
        this.#_username = username;
        User.existingUsernames.push(username);
    }


    get timeline(): Message[] {
        return this.#_timeline;
    }

    set timeline(value: Message[]) {
        this.#_timeline = value;
    }

    get subscriptions(): User[] {
        return this.#_subscriptions;
    }

    set subscriptions(value: User[]) {
        this.#_subscriptions = value;
    }

    get username(): string {
        return this.#_username;
    }

    set username(value: string) {
        this.#_username = value;
    }

    get privateMessage(): Map<string, PrivateMessage[]> {
        return this.#_privateMessage;
    }

    set privateMessage(value: Map<string, PrivateMessage[]>) {
        this.#_privateMessage = value;
    }

    publishMessage(message: Message): void {
        this.timeline.push(message);
    }

    getUserTimeline(user: User): Message[] {
        return user.timeline;
    }

    getSubscriptionsList() {
        return this.subscriptions;
    }

    subscribeToUserTimeline(user: User) {
        this.subscriptions.push(user);
    }

    getSubscriptionsMessages() {
        let allSubscriptionMessages: Message[] = [];

        this.subscriptions.forEach(user => {
            allSubscriptionMessages.push(...this.getUserTimeline(user));
        })
        return allSubscriptionMessages;
    }

    sendPrivateMessage(receiver: User, messageText: string) {
        const messageToSend: PrivateMessage = new PrivateMessage(messageText, this.username, receiver.username);
        receiver.receivePrivateMessage(this, messageToSend);
    }

    receivePrivateMessage(sender: User, message: PrivateMessage) {
        if (this.privateMessage.has(sender.username)) {
            this.privateMessage
                .get(sender.username)
                .push(message);
        } else {
            this.privateMessage.set(sender.username, [message]);
        }
    }

    readPrivateMessagesWith(username: string): PrivateMessage[] {
        return this.privateMessage.get(username);
    }

}
import Message from "./Message";

export default class User{
    #_timeline: Message[] = [];
    #_subscriptions: User[] = [];
    #_username: string;
    static existingUsernames: string[] = [];


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

    publishMessage(message: Message):void  {
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
}
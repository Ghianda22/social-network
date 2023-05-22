export default class User{
    #_timeline: string[] = [];
    #_subscriptions: User[] = [];

    get timeline(): string[] {
        return this.#_timeline;
    }

    set timeline(value: string[]) {
        this.#_timeline = value;
    }
    get subscriptions(): User[] {
        return this.#_subscriptions;
    }

    set subscriptions(value: User[]) {
        this.#_subscriptions = value;
    }

    publishMessage(message: string):void  {
        this.timeline.push(message);
    }

    getUserTimeline(user: User): string[] {
        return user.timeline;
    }

    getSubscriptionsList() {
        return this.subscriptions;
    }

    subscribeToUserTimeline(user: User) {
        this.subscriptions.push(user);
    }

    getSubscriptionsMessages() {
        let allSubscriptionMessages: string[] = [];

        this.subscriptions.forEach(user => {
            allSubscriptionMessages.push(...this.getUserTimeline(user));
        })
        return allSubscriptionMessages;
    }
}
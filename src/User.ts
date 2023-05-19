export default class User{
    #_timeline: string[] = [];

    get timeline(): string[] {
        return this.#_timeline;
    }

    set timeline(value: string[]) {
        this.#_timeline = value;
    }

    publishMessage(message: string):void  {
        this.timeline.push(message);
    }

    getUserTimeline(user: User): string[] {
        return user.timeline;
    }
}
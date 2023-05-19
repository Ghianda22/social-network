export default class User{
    #timeline: string[] = [];

    get timeline(): string[] {
        return this.#timeline;
    }

    set timeline(value: string[]) {
        this.#timeline = value;
    }

    publishMessage(message: string):void  {
        this.timeline.push(message);
    }
}
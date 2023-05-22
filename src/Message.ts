import User from "./User";

export default class Message {
    #_mention: string[] = [];
    #_text: string = '';


    constructor(text: string) {
        this.#_text = text;
        this.#_mention = this.searchForMentions(text);
    }

    get mention(): string[] {
        return this.#_mention;
    }

    get text(): string {
        return this.#_text;
    }

    set mention(value: string[]) {
        this.#_mention = value;
    }

    set text(value: string) {
        this.#_text = value;
    }


    private searchForMentions(text: string): string[] {
        const regExAtPresence = new RegExp('@[A-z]*', 'gm');
        const regExMatches: string[] = text.match(regExAtPresence);
        const mentionedUsernames: string[] = [];
        if (regExMatches == null) {
            return mentionedUsernames;
        }
        regExMatches.forEach(match => {
            match = match.substring(1);
            if((User.existingUsernames).includes(match)){
                mentionedUsernames.push(match);
            }
        })
        return mentionedUsernames;

    }

}
import User from "./User";

export default class Message {
    #_mention: string[] = [];
    #_text: string = '';
    #_link: string[];


    constructor(text: string) {
        this.#_text = text;
        this.#_mention = this.searchForMentions(text);
        this.#_link = this.searchForLinks(text);
    }


    get mention(): string[] {
        return this.#_mention;
    }

    get text(): string {
        return this.#_text;
    }

    get link(): string[] {
        return this.#_link;
    }


    private searchForMentions(text: string): string[] {
        const regExAtPresence:RegExp = new RegExp('@[A-z]*', 'gm');
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

    private searchForLinks(text: string): string[] {
        const regExValidUrl:RegExp = new RegExp('(http|ftp|https):\\/\\/([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:\\/~+#-]*[\\w@?^=%&\\/~+#-])', 'gm');
        const regExMatches: string[] = text.match(regExValidUrl);
        if (regExMatches == null) {
            return [];
        }
        return regExMatches;
    }

}
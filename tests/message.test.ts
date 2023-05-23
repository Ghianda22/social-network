import User from "../src/User";
import Message from "../src/Message";

//Bob can link to Charlie in a message using “@”
test('When a message contains @, if the next word is a valid username it should be considered a mention', () => {
    //given
    const user0: User = new User("Bob")
    const user1: User = new User("Charlie")
    const message: Message = new Message('Hi @Charlie');
    const expectedMentions: string[] = ['Charlie'];


    //when
    const actualMentions: string[] = message.mention;


    //then
    expect(actualMentions).toStrictEqual(expectedMentions);
})

test('When a message contains multiple mentions, should be detected all', () => {
    //given
    const user0: User = new User("Alice")
    const user1: User = new User("Bob")
    const user2: User = new User("Charlie")
    const message: Message = new Message('Hi @Charlie, is @Bob home?');
    const expectedMentions: string[] = ['Charlie', 'Bob'];


    //when
    const actualMentions: string[] = message.mention;


    //then
    expect(actualMentions).toStrictEqual(expectedMentions);
})

test('Given a message, if the word after the @ is not a valid username, it should not be included into mentions', () => {
    //given
    const user0: User = new User("Alice")
    const user2: User = new User("Charlie")
    const message: Message = new Message('Hi @Charlie, is @Frank home?');
    const expectedMentions: string[] = ['Charlie'];


    //when
    const actualMentions: string[] = message.mention;


    //then
    expect(actualMentions).toStrictEqual(expectedMentions);
})

describe('When a message contains @, if the next word is a valid username it should be considered a mention', () => {
    it.each([
        ["Hi @Charlie, is @Frank home?",["Charlie"]],
        ["@Alice and @Bob told me about the party. Is @Reginald coming?", ["Alice", "Bob"]],
        ["@oihf_OBEGQ", []],
        [" @ ", []]
    ])('in message \'%s\' mentions are %s', (text: string, mentions: string[]) => {
        const message: Message = new Message(text);
        const expectedMentions: string[] = mentions


        //when
        const actualMentions: string[] = message.mention;


        //then
        expect(actualMentions).toStrictEqual(expectedMentions);
    })
})

//Alice can link to a clickable web resource in a message
test('When a message contains a valid web address, it should be recognized as a link', () => {
    //given
    const message: Message = new Message('Hi @Charlie, look at this cat! https://http.cat/418');
    const expectedLinks: string[] = ['https://http.cat/418'];


    //when
    const actualLinks: string[] = message.link;

    //then
    expect(actualLinks).toStrictEqual(expectedLinks)
})

describe('When a message contains a valid web address, it should be recognized as a link', () => {
    it.each([
        ["hi please check wx.abc.res",[]],
        ["the complete url for google.com is https://www.google.com",["https://www.google.com"]],
        ["hi please check www.soprasteria.com and https://it.smartbooking.soprasteria.com/",["https://it.smartbooking.soprasteria.com/"]]
    ])('in message \'%s\' valid links are %s', (text: string, expectedLinks: string[]) => {
        const message: Message = new Message(text);

        //when
        const actualLinks: string[] = message.link;

        //then
        expect(actualLinks).toStrictEqual(expectedLinks)
    })
})
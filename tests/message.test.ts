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
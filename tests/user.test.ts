import User from "../src/User";
import Message from "../src/Message";
import PrivateMessage from "../src/PrivateMessage";

// Alice can publish messages to a personal timeline
test('When a message is published, should be added to timeline', () => {
    //given
    const user: User = new User("Alice");
    const message: Message = new Message("This is a test message");

    //when
    user.publishMessage(message)

    //then
    expect(user.timeline).toContain(message)
})

test('When messages are published, should mantain the pubblication order in timeline', () => {
    //given
    const user: User = new User("Alice");
    const message0: Message = new Message("This is the first message");
    const message1: Message = new Message("This is the second message");
    const message2: Message = new Message("This is the third message");
    const expectedTimeline: Message[] = [message0, message1, message2]

    //when
    user.publishMessage(message0);
    user.publishMessage(message1);
    user.publishMessage(message2);

    //then
    expect(user.timeline).toStrictEqual(expectedTimeline);
})

// Bob can view Alice’s timeline
test("When getUserTimeline(user) is called, should return user's timeline", () => {
    //given
    const user0: User = new User("Alice");
    const user1: User = new User("Bob");

    const message0: Message = new Message("This is the first message");
    const message1: Message = new Message("This is the second message");
    const message2: Message = new Message("This is the third message");
    user0.publishMessage(message0);
    user0.publishMessage(message1);
    user0.publishMessage(message2);
    const expectedTimeline = user1.getUserTimeline(user0);

    //when
    const actualTimeline = user0.timeline;


    //then
    expect(expectedTimeline).toStrictEqual(actualTimeline);
})

//Charlie can subscribe to Alice’s and Bob’s timelines, and view an aggregated list of all subscriptions
test('When getSubscriptionsList is called, should return the list of subscriptions', ()=>{
    //given
    const user0 = new User("Alice");
    const user1 = new User("Bob");
    const user2 = new User("Charlie");
    user2.subscribeToUserTimeline(user0);
    user2.subscribeToUserTimeline(user1);
    const expectedListOfSubscriptions: User[] = [user0, user1];

    //when
    const actualListOfSubscriptions: User[] = user2.getSubscriptionsList();

    //then
    expect(actualListOfSubscriptions).toStrictEqual(expectedListOfSubscriptions);
})

test('Given user with subscriptions, should return list of messages of all subscriptions', () => {
    //given
    const user0 = new User("Alice");
    const user1 = new User("Bob");
    const user2 = new User("Charlie");
    const message0: Message = new Message('Hi, this is user 0');
    const message1: Message = new Message('Hi, this is user 1');
    const message2: Message = new Message('Nice to meet you user 0');

    user0.publishMessage(message0);
    user1.publishMessage(message1);
    user1.publishMessage(message2);

    user2.subscribeToUserTimeline(user0);
    user2.subscribeToUserTimeline(user1);
    const expectedListOfMessages: Message[] = [message0, message1, message2];

    //when
    const actualListOfMessages: Message[] = user2.getSubscriptionsMessages();

    //then
    expect(actualListOfMessages).toStrictEqual(expectedListOfMessages);
})

//Mallory can send a private message to Alice
test('When a user send a private message, the receiver should read it', () => {
    //given
    const user0: User = new User('Mallory');
    const user1: User = new User('Alice');
    const messageText: string = "Hi Alice!";
    const expectedMessage: PrivateMessage = new PrivateMessage(messageText, user0.username, user1.username);
    const expectedPrivateMessage: PrivateMessage[] = [expectedMessage];

    //when
    user0.sendPrivateMessage(user1, messageText);
    const actualPrivateMessage: PrivateMessage[] = user1.readPrivateMessagesWith(user0.username);

    //then
    expect(actualPrivateMessage).toStrictEqual(expectedPrivateMessage);
})

/**
 * private messages should not appear in timeline
 * private messages should be accessed only by receiver
 * */
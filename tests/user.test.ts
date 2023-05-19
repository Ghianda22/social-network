import User from "../src/User";

// Alice can publish messages to a personal timeline
test('When a message is published, should be added to timeline', () => {
    //given
    const user: User = new User();
    const message: string = "This is a test message";

    //when
    user.publishMessage(message)

    //then
    expect(user.timeline).toContain(message)
})

test('When messages are published, should mantain the pubblication order in timeline', () => {
    //given
    const user: User = new User();
    const message0: string = "This is the first message";
    const message1: string = "This is the second message";
    const message2: string = "This is the third message";
    const expectedTimeline: string[] = [message0, message1, message2]

    //when
    user.publishMessage(message0);
    user.publishMessage(message1);
    user.publishMessage(message2);

    //then
    expect(user.timeline).toStrictEqual(expectedTimeline);
})

// Bob can view Alice’s timeline
test("User should be able to get another user's timeline", () => {
    //given
    const user0: User = new User();
    const user1: User = new User();

    const message0: string = "This is the first message";
    const message1: string = "This is the second message";
    const message2: string = "This is the third message";
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
test('whenUserSubscribeToMultipleUsers_thenAListOfSubscriptionShouldBeShown', ()=>{
    //given
    const user0 = new User();
    const user1 = new User();
    const user2 = new User();

    //when
    user2.subscribeToUserTimeline(user0);
    user2.subscribeToUserTimeline(user1);
    const expectedListOfSubscriptions: User[] = [user0, user1];
    const actualListOfSubscriptions: User[] = user2.getSubscriptionsList();

    //then
    expect(actualListOfSubscriptions).toStrictEqual(expectedListOfSubscriptions);
})
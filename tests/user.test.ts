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
    const user1: User = new User();
    const user2: User = new User();

    const message0: string = "This is the first message";
    const message1: string = "This is the second message";
    const message2: string = "This is the third message";
    user1.publishMessage(message0);
    user1.publishMessage(message1);
    user1.publishMessage(message2);
    const expectedTimeline = user2.getUserTimeline(user1);

    //when
    const actualTimeline = user1.timeline;


    //then
    expect(expectedTimeline).toStrictEqual(actualTimeline);
})

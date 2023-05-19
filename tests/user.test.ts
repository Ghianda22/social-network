import User from "../src/User";

// Alice can publish messages to a personal timeline
test('whenUserPublishesMessage_thenItShouldFigureInUserTimeline', ()=> {
    //given
    const user: User = new User();
    const message: string = "This is a test message";

    //when
    user.publishMessage(message)

    //then
    expect(user.timeline).toContain(message)
})

test('whenUserPublishesMultipleMessages_thenTimelineShouldContainThemInOrder', ()=> {
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


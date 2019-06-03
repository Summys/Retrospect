export default {
    _id: 1,
    participantUserIdList: 1,
    viewDateList: 1,
    viewStartDateList: 1,
    createdAt: 1,
    participants: {
        profile: 1,
        emails: 1,
    },
    messages: {
        userId: 1,
        chatRoomId: 1,
        text: 1,
        createdAt: 1,
        user: {
            profile: 1
        }
    }
}
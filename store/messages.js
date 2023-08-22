export default function messagesStore() {
  const messages = [
    {
      fromUserId: 2,
      toUserId: 1,
      listingId: 1,
      content: "How is it going?",
      id: 1,
      dateTime: 1586044521956,
    },
    {
      fromUserId: 2,
      toUserId: 1,
      listingId: 1,
      content: "I'm interested in hearing your opinion on the app",
      id: 2,
      dateTime: 1586044521956,
    },
    {
      fromUserId: 2,
      toUserId: 1,
      listingId: 1,
      content: "Please give us your feedback",
      id: 3,
      dateTime: 1586044521956,
    },
  ];

  const getMessagesForUser = (toUserId) =>
    messages.filter((message) => message.toUserId === toUserId);

  const add = (message) => {
    message.id = messages.length + 1;
    message.dateTime = Date.now();
    messages.push(message);
  };

  module.exports = { add, getMessagesForUser };
}

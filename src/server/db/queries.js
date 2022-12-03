// this file contains the busniss process queries

getUserConversation = async (userId) => {
  try {
    const data = await User.findById(userId).select("conversations");
    console.log(data);
  } catch (err) {
    throw err;
  }
};

getUserUnseenMessages = (userId) => {};

getUserProgrammedEvents = (userId) => {};

getUserContacts = async (userId) => {
  try {
    const data = await User.findById(userId).select("contacts");
    console.log(data);
  } catch (err) {
    throw err;
  }
};
getUserNotifications = (userId) => {};

getUserOrganizations = async (userId) => {
  try {
    const data = await User.findById(userId).select("Organizations");
    console.log(data);
  } catch (err) {
    throw err;
  }
};

getUserMissedEvents = (userId) => {};

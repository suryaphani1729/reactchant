import messaging from "./firebase";

export const askforPermissionToReceiveNotifications = async () => {
  try {
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("message request token: ", token);
    localStorage.setItem("notification-token", token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

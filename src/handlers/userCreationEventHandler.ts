import { SNSEvent } from "aws-lambda";
import userService from "../services/users";

export const handler = async (event: SNSEvent) => {
  const message = event.Records[0].Sns.Message;
  const user = JSON.parse(message);
  await userService.createUser(user);
  console.log(`User saved successfully: ${user.userId}`);
};

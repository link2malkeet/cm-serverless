import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";
import { v4 } from "uuid";
const sns = new AWS.SNS();
const headers = {
  "content-type": "application/json",
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const user = {
      ...JSON.parse(event.body as string),
      userId: v4(),
    };
    await sns
      .publish({
        Message: JSON.stringify(user),
        Subject: `User creation initiated from Lambda`,
        TopicArn: process.env.USER_TOPIC_ARN,
      })
      .promise();
    console.log(`SNS request has been sent successfully: ${user.userId}`);
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ userId: user.userId }),
    };
  } catch (e) {
    throw e;
  }
};

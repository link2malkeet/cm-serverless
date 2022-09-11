import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { HttpError } from "../errors";
import userService from "../services/users";
const headers = {
  "content-type": "application/json",
};
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const user = await userService.fetchUserByEmail(event.pathParameters?.email as string);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(user),
    };
  } catch (e) {
    if (e instanceof HttpError) {
      return {
        statusCode: e.statusCode,
        headers,
        body: e.message,
      };
    }
    throw e;
  }
};

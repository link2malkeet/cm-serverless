import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { HttpError } from "../errors";
import { User } from "../types";
export class UserService {
  private tableName = "UsersTable";
  constructor(private docClient: DocumentClient) {}
  async createUser(user: User): Promise<User> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: user,
      })
      .promise();
    return user;
  }
  async fetchUserByEmail(email: string) {
    console.log("email:", email);
    const output = await this.docClient
      .query({
        TableName: process.env.USERS_TABLE!,
        IndexName: "UserByEmail",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: { ":email": email },
      })
      .promise();

    console.log("response:", JSON.stringify(output.Items, undefined, 2));
    if (output.Items?.length === 0) {
      throw new HttpError(404, "Resource not found");
    }
    return output.Items![0];
  }
}

const userService = new UserService(new AWS.DynamoDB.DocumentClient());
export default userService;

import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import AWS from 'aws-sdk';
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
export const lambdaHandler: Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2> = async (event) => {
    console.log('event', event);
    try {
        if (!event.pathParameters?.id) {
            console.log('API Gateway event is missing the /{id} parameter path required.');
            return { statusCode: 404 };
        }
        if (!process.env.BOOKS_TABLE) {
            console.log('BOOKS_TABLE variable is empty.');
            throw Error();
        }
        // const ret = await axios(url);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
            TableName: process.env.BOOKS_TABLE,
            Item: {'id': event.pathParameters.id, 'title': 'new title', 'details': '{\"info\":\"info\"}'}
        };

        console.log(params);
        await docClient.put(params).promise();
        /*const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
            TableName: process.env.BOOKS_TABLE,
            Key: {
                id: event.pathParameters.id
            }
        };
        const result: AWS.DynamoDB.DocumentClient.GetItemOutput = await docClient.get(params).promise();
        console.log(result);
        */
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*", // Allow from anywhere 
                "Access-Control-Allow-Methods": "GET" // Allow only GET request 
            },
            body: JSON.stringify({
                message: 'hello world'//JSON.stringify(result.Item)
            })
        };
    } catch (err) {
        console.log(err);
        return {
            'statusCode': 500,
            'body': JSON.stringify({
                message: 'Error 500'
            })
        };
    }
};

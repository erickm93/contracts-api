'use strict'

const { dynamoClient } = require('./dynamo-client');

module.exports = (tableName = 'tk_contracts_api') => {
  dynamoClient.describeTable({
    TableName: tableName
  }).promise()
    .catch(() => {
      dynamoClient.createTable(
        {
          AttributeDefinitions: [
            {
              AttributeName: "pk", 
              AttributeType: "S"
            }, 
            {
              AttributeName: "sk", 
              AttributeType: "S"
            },
            {
              AttributeName: "data", 
              AttributeType: "S"
            },
            {
              AttributeName: "filter", 
              AttributeType: "S"
            },
          ],
          KeySchema: [
            {
              AttributeName: "pk", 
              KeyType: "HASH"
            }, 
            {
              AttributeName: "sk", 
              KeyType: "RANGE"
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1, 
            WriteCapacityUnits: 1
          },
          TableName: tableName,
          GlobalSecondaryIndexes: [
            {
              IndexName: 'gsi_1',
              KeySchema: [
                {
                  AttributeName: 'sk',
                  KeyType: 'HASH'
                },
                {
                  AttributeName: 'data',
                  KeyType: 'RANGE'
                }
              ],
              Projection: {
                ProjectionType: 'ALL'
              },
              ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
              }
            },
            {
              IndexName: 'gsi_2',
              KeySchema: [
                {
                  AttributeName: 'data',
                  KeyType: 'HASH'
                },
                {
                  AttributeName: 'filter',
                  KeyType: 'RANGE'
                }
              ],
              Projection: {
                ProjectionType: 'ALL'
              },
              ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
              }
            },
            {
              IndexName: 'gsi_3',
              KeySchema: [
                {
                  AttributeName: 'sk',
                  KeyType: 'HASH'
                },
                {
                  AttributeName: 'filter',
                  KeyType: 'RANGE'
                }
              ],
              Projection: {
                ProjectionType: 'ALL'
              },
              ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
              }
            }
          ]
        },
        (error) => {
          if (error) {
            throw error;
          }
        }
      );
    });
};

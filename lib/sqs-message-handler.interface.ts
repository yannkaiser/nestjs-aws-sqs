import { SQS } from 'aws-sdk';

export interface SQSMessageHandler {
    handleMessage(message: SQS.Message): Promise<void>;
}

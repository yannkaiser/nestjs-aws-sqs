import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { AWSError, SQS } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { SQSMessageHandler } from './sqs-message-handler.interface';

export class SQSQueue implements OnApplicationBootstrap, OnApplicationShutdown {

    private handlers: SQSMessageHandler[];

    private queueUrl: string;
    private polling = false;
    private timeoutRef: NodeJS.Timeout = null;

    constructor(
        private readonly name: string,
        private readonly service: SQS,
        private readonly timeout = 100,
    ) {
        this.name = name;
        this.service = service;
        this.handlers = []
        this.timeout = timeout;
    }

    async onApplicationBootstrap(): Promise<void> {
        this.polling = true;
        this.queueUrl = (await this.service.getQueueUrl({
            QueueName: this.name,
        }).promise()).QueueUrl;

        this.timeoutRef = setTimeout(this.poll.bind(this), this.timeout);
    }

    onApplicationShutdown(): void {
        this.polling = false;

        clearTimeout(this.timeoutRef);
    }

    async handleSQSResponse(result: SQS.ReceiveMessageResult): Promise<void> {
        if (!result.Messages || result.Messages.length === 0) return;

        await Promise.all(result.Messages.map(this.handleMessage.bind(this)));
    }

    poll(): void {
        if (!this.polling) return;

        this.receiveMessage()
            .then(this.handleSQSResponse.bind(this))
            .catch(err => console.log(err))
            .then(() => this.timeoutRef = setTimeout(this.poll.bind(this), this.timeout));
    }

    async receiveMessage(): Promise<PromiseResult<SQS.ReceiveMessageResult, AWSError>> {
        return this.service.receiveMessage({
            QueueUrl: this.queueUrl,
        }).promise()
    }

    async handleMessage(message: SQS.Message): Promise<void> {
        for (const handler of this.handlers) {
            await handler.handleMessage(message);
        }

        await this.service.deleteMessage({
            QueueUrl: this.queueUrl,
            ReceiptHandle: message.ReceiptHandle,
        }).promise();
    }

    registerHandler(handler: SQSMessageHandler): void {
        this.handlers.push(handler);
    }
}

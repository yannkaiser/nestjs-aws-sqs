import { Provider } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import { SQSQueueOptions } from './interfaces/sqs-queue-options.interface';
import { SQSQueue } from './sqs-queue';
import { getConsumerToken } from './utils/get-consumer-token.util';

export function createProvider(options: SQSQueueOptions): Provider {
    return {
        provide: getConsumerToken(options.name),
        useFactory: (): SQSQueue => {
            return new SQSQueue(options.name, new SQS(options.options))
        }
    }
}

export function createProviders(options: SQSQueueOptions[]): Provider[] {
    return options.map(createProvider);
}

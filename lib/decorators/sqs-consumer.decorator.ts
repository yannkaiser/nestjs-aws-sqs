import { SQS_CONSUMER_QUEUE_NAME, SQS_QUEUE_CONSUMER } from '../sqs.constants';

export function SQSConsumer(name: string): ClassDecorator {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (target: object): void {
        Reflect.defineMetadata(SQS_QUEUE_CONSUMER, true, target);
        Reflect.defineMetadata(SQS_CONSUMER_QUEUE_NAME, name, target);
    }
}

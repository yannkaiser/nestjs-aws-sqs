export function getConsumerToken(queueName: string): string {
    return `sqs_consumer:queue:${queueName}`;
}

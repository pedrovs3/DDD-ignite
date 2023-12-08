import { CreatedAnswerEvent } from '@domain/forum/enterprise/events';
import { EventHandler } from '@/core/events/event-handler';
import { DomainEvents } from '@/core/events/domain-events';

export class OnAnswerCreatedSubscriber implements EventHandler {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendNewAnswerNotification.bind(this), CreatedAnswerEvent.name);
  }

  private async sendNewAnswerNotification({ answer }: CreatedAnswerEvent): Promise<void> {
    console.log('sendNewAnswerNotification', answer);
    // send notification to question author
  }
}

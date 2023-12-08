import { CreatedAnswerEvent } from '@domain/forum/enterprise/events';
import { QuestionsRepository } from '@domain/forum/application/repositories';
import { SendNotificationUseCase } from '@domain/notification/application/use-cases/send-notification';
import { EventHandler } from '@/core/events/event-handler';
import { DomainEvents } from '@/core/events/domain-events';

export class OnAnswerCreatedSubscriber implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendNewAnswerNotification.bind(this), CreatedAnswerEvent.name);
  }

  private async sendNewAnswerNotification({ answer }: CreatedAnswerEvent): Promise<void> {
    const question = await this.questionsRepository.findById(answer.questionId.toString());

    if (!question) return;

    await this.sendNotification.execute({
      receiverId: question.authorId.toString(),
      message: answer.excerpt,
      link: `/forum/questions/${question.id}`,
      title: `New answer in "${question.title.substring(0, 40).concat('...')}"`,
    });
  }
}

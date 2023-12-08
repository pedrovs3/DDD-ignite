import { Answer } from '@domain/forum/enterprise/entities';
import { DomainEvent } from '@/core/events/domain-event';
import { UniqueEntityId } from '@/core/entities';

export class CreatedAnswerEvent implements DomainEvent {
  public ocurredAt: Date;

  public answer: Answer;

  constructor(answer: Answer) {
    this.ocurredAt = new Date();
    this.answer = answer;
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id;
  }
}

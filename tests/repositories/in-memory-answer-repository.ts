import { Answer } from '@domain/forum/enterprise/entities/answer';
import { AnswerRepository } from '@domain/forum/application/repositories/answer.repository';

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  create(answer: Answer) {
    this.items.push(answer);
  }
}

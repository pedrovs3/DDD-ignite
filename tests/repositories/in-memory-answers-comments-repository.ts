import { AnswerComment } from '@domain/forum/enterprise/entities';
import { AnswerCommentsRepository } from '@domain/forum/application/repositories';

export class InMemoryAnswersCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }
}

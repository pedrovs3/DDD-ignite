import { QuestionsCommentsRepository } from '@domain/forum/application/repositories';
import { QuestionComment } from '@domain/forum/enterprise/entities';

export class InMemoryQuestionsCommentsRepository implements QuestionsCommentsRepository {
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }
}

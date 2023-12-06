import { QuestionsCommentsRepository } from '@domain/forum/application/repositories';
import { QuestionComment } from '@domain/forum/enterprise/entities';

export class InMemoryQuestionsCommentsRepository implements QuestionsCommentsRepository {
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === questionComment.id);
    this.items.splice(index, 1);
  }

  async findAllByQuestionId(questionId: string): Promise<QuestionComment[]> {
    return this.items.filter((item) => item.questionId.toString() === questionId);
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const item = this.items.find((item) => item.id.toString() === id);
    if (item) return item;
    return null;
  }

  async update(questionComment: QuestionComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === questionComment.id);
    this.items[index] = questionComment;
  }
}

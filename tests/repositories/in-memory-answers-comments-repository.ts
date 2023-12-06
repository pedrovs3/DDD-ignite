import { AnswerComment } from '@domain/forum/enterprise/entities';
import { AnswerCommentsRepository } from '@domain/forum/application/repositories';

export class InMemoryAnswersCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answerComment.id);
    this.items.splice(index, 1);
  }

  async findAllByAnswerId(answerId: string): Promise<AnswerComment[]> {
    return this.items.filter((item) => item.answerId.toString() === answerId);
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const item = this.items.find((item) => item.id.toString() === id);
    if (item) return item;
    return null;
  }

  async update(answerComment: AnswerComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answerComment.id);
    this.items[index] = answerComment;
  }
}

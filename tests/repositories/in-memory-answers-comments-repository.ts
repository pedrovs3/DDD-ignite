import { AnswerComment } from '@domain/forum/enterprise/entities';
import { AnswerCommentsRepository } from '@domain/forum/application/repositories';
import { PaginationParams } from '@/core/repositories';

export class InMemoryAnswersCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answerComment.id);
    this.items.splice(index, 1);
  }

  async findAllByAnswerId(
    answerId: string,
    { page, limit = 20 }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const offset = (page - 1) * limit;
    return this.items
      .filter((item) => item.answerId.toString() === answerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(offset, offset + limit);
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

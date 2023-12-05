import { Answer } from '@domain/forum/enterprise/entities/answer';
import { AnswerRepository } from '@domain/forum/application/repositories/answer.repository';
import { PaginationParams } from '@/core/repositories';

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) return null;

    return answer;
  }

  async update(answer: Answer): Promise<Answer | null> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    if (itemIndex === -1) return null;

    this.items[itemIndex] = answer;

    return answer;
  }

  async findManyRecent({ page, limit = 20 }: PaginationParams): Promise<Answer[]> {
    const offset = (page - 1) * limit;
    const answers = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(offset, offset + limit);

    return answers;
  }
}

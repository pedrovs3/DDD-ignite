import { Answer } from '@domain/forum/enterprise/entities/answer';
import { AnswerRepository } from '@domain/forum/application/repositories/answer.repository';
import { AnswerAttachmentsRepository } from '@domain/forum/application/repositories/answer-attachments.repository';
import { PaginationParams } from '@/core/repositories';

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  constructor(private answerAttachmentsRepository: AnswerAttachmentsRepository) {
  }

  async create(answer: Answer) {
    this.items.push(answer);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(answer: Answer): Promise<void> {
    this.items = this.items.filter((item) => item.id !== answer.id);

    return this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
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

  async findManyByQuestionId({ page, questionId, limit = 20 }: PaginationParams & {
    questionId: string
  }): Promise<Answer[]> {
    const offset = (page - 1) * limit;
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(offset, offset + limit);

    return answers;
  }
}

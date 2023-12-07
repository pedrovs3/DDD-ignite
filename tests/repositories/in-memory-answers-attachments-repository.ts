import { AnswerAttachment } from '@domain/forum/enterprise/entities/answer-attachment';
import { AnswerAttachmentsRepository } from '@domain/forum/application/repositories/answer-attachments.repository';

export class InMemoryAnswersAttachmentsRepository implements AnswerAttachmentsRepository {
  public items: AnswerAttachment[] = [];

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    return this.items.filter((item) => item.answerId.toString() === answerId);
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    this.items = this.items.filter((item) => item.answerId.toString() !== answerId);
  }
}

import { QuestionAttachment } from '@domain/forum/enterprise/entities/question-attachment';
import { PaginationParams } from '@/core/repositories';

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionAttachment[]>,
}

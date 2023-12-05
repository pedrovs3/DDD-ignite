import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { PaginationParams } from '@/core/repositories';

export interface AnswerRepository {
  findById: (id: string) => Promise<Answer | null>;
  findManyByQuestionId: (params: PaginationParams & { questionId: string }) => Promise<Answer[]>;
  update: (answer: Answer) => Promise<Answer | null>;
  create: (answer: Answer) => Promise<void>;
  delete: (answer: Answer) => Promise<void>;
}

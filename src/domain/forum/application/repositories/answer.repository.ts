import { Answer } from '@/domain/forum/enterprise/entities/answer';

export interface AnswerRepository {
  findById: (id: string) => Promise<Answer | null>;
  update: (answer: Answer) => Promise<Answer | null>;
  create: (answer: Answer) => Promise<void>;
  delete: (answer: Answer) => Promise<void>;
}

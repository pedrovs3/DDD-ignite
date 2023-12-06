import { QuestionComment } from '@domain/forum/enterprise/entities';
import { PaginationParams } from '@/core/repositories';

export interface QuestionsCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>,

  delete(questionComment: QuestionComment): Promise<void>,

  update(questionComment: QuestionComment): Promise<void>,

  findById(id: string): Promise<QuestionComment | null>,

  findAllByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]>,
}

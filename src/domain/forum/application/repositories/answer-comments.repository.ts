import { AnswerComment } from '@domain/forum/enterprise/entities';
import { PaginationParams } from '@/core/repositories';

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>

  delete(answerComment: AnswerComment): Promise<void>

  findById(id: string): Promise<AnswerComment | null>

  findAllByAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>

  update(answerComment: AnswerComment): Promise<void>
}

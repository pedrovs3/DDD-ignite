import { AnswerComment } from '@domain/forum/enterprise/entities';

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>

  delete(answerComment: AnswerComment): Promise<void>

  findById(id: string): Promise<AnswerComment | null>

  findAllByAnswerId(answerId: string): Promise<AnswerComment[]>

  update(answerComment: AnswerComment): Promise<void>
}

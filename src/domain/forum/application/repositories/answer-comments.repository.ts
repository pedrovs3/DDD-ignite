import { AnswerComment } from '@domain/forum/enterprise/entities';

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
}

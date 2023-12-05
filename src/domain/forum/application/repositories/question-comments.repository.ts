import { QuestionComment } from '@domain/forum/enterprise/entities';

export interface QuestionsCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}

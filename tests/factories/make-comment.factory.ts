import { faker } from '@faker-js/faker';
import { AnswerProps } from '@domain/forum/enterprise/entities/answer';
import { AnswerComment, QuestionComment } from '@domain/forum/enterprise/entities';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export const makeComment = (
  override: Partial<AnswerProps> = {},
  type: 'question' | 'answer' = 'question',
  id?: UniqueEntityId,
) => {
  if (type === 'question') {
    return QuestionComment.create({
      authorId: new UniqueEntityId('author-1'),
      questionId: new UniqueEntityId('question-1'),
      content: faker.lorem.text(),
      ...override,
    }, id);
  }
  if (type === 'answer') {
    return AnswerComment.create({
      authorId: new UniqueEntityId('author-1'),
      answerId: new UniqueEntityId('answer-1'),
      content: faker.lorem.text(),
      ...override,
    }, id);
  }
  throw new Error('Invalid type');
};

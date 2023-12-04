import { faker } from '@faker-js/faker';
import { Answer, AnswerProps } from '@domain/forum/enterprise/entities/answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export const makeAnswer = (
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) => Answer.create({
  authorId: new UniqueEntityId('author-1'),
  questionId: new UniqueEntityId('question-1'),
  content: faker.lorem.text(),
  ...override,
}, id);

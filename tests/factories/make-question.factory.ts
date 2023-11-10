import { Question, QuestionProps } from '@domain/forum/enterprise/entities/question';
import { faker } from '@faker-js/faker';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

export const makeQuestion = (
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) => Question.create({
  authorId: '123',
  title: faker.lorem.sentence(),
  content: faker.lorem.text(),
  ...override,
}, id);

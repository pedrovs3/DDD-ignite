import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { makeQuestion } from 'tests/factories/make-question.factory';
import { expect } from 'vitest';
import { ChooseBestAnswerUseCase } from '@domain/forum/application/use-cases/choose-best-answer-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerRepository } from '../../../../../tests/repositories/in-memory-answer-repository';
import { makeAnswer } from '../../../../../tests/factories/make-answer.factory';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: ChooseBestAnswerUseCase;

describe('Choose best answer for a question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new ChooseBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswerRepository);
  });

  it('should be able to choose the best answer for a question', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'));
    const answer = makeAnswer({ questionId: question.id }, new UniqueEntityId('answer-1'));

    expect(inMemoryQuestionsRepository.items.find((value) => value.id === new UniqueEntityId('123')))
      .toBe(undefined);
    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a register from another user', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'));
    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(() => sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
    })).rejects.toBeInstanceOf(Error);

    expect(inMemoryQuestionsRepository.items).toHaveLength(1);
  });
});

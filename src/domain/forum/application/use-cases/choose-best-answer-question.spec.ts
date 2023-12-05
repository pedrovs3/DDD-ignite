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
    const question = makeQuestion({ authorId: new UniqueEntityId('author-1') });
    const answer = makeAnswer({ questionId: question.id }, new UniqueEntityId('answer-1'));

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id);
  });

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id }, new UniqueEntityId('answer-1'));

    await expect(() => sut.execute({
      answerId: answer.id.toString(),
      authorId: 'another-user-id',
    })).rejects.toBeInstanceOf(Error);
  });
});

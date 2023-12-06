import {InMemoryQuestionsRepository} from 'tests/repositories/in-memory-questions-repository';
import {makeQuestion} from 'tests/factories/make-question.factory';
import {DeleteQuestionUseCase} from '@domain/forum/application/use-cases/delete-question';
import {expect} from 'vitest';
import {UniqueEntityId} from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete question based on ID', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to delete a register based on his ID', async () => {
    const newQuestion = makeQuestion({authorId: new UniqueEntityId('author-1')}, new UniqueEntityId('question-1'));
    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionsRepository.items.find((value) => value.id === new UniqueEntityId('123')))
      .toBe(undefined);
    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a register from another user', async () => {
    const newQuestion = makeQuestion({authorId: new UniqueEntityId('author-1')}, new UniqueEntityId('question-1'));
    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryQuestionsRepository.items).toHaveLength(1);
  });
});

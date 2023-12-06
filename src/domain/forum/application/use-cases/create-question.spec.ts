import {CreateQuestionUseCase} from '@domain/forum/application/use-cases/create-question';
import {beforeEach, describe, expect} from 'vitest';
import {InMemoryQuestionsRepository} from 'tests/repositories/in-memory-questions-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '123',
      title: 'Nova pergunta',
      content: 'Uma pergunta qualquer',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toHaveProperty('question');
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(result.value.question.id);
  });
});

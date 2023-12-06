import {InMemoryAnswerRepository} from 'tests/repositories/in-memory-answer-repository';
import {AnswerQuestionUseCase} from '@domain/forum/application/use-cases/answer-question';
import {expect} from 'vitest';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionUseCase;

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      content: 'Nova resposta',
      instructorId: '123',
      questionId: '123',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toHaveProperty('id');
    expect(inMemoryAnswerRepository.items[0].id).toEqual(result.value.id);
  });
});

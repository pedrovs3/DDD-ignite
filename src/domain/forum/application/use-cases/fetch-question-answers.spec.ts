import {InMemoryAnswerRepository} from "@tests/repositories/in-memory-answer-repository";
import {makeAnswer} from "@tests/factories/make-answer.factory";
import {UniqueEntityId} from "@/core/entities";
import {FetchQuestionAnswersUseCase} from "@domain/forum/application/use-cases/fetch-question-answers";
import {expect} from "vitest";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch question answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository);
  });

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswerRepository.create(makeAnswer({
      createdAt: new Date('2021-01-01'),
      questionId: new UniqueEntityId('1')
    }));
    await inMemoryAnswerRepository.create(makeAnswer({
      createdAt: new Date('2021-01-02'),
      questionId: new UniqueEntityId('1')
    }));
    await inMemoryAnswerRepository.create(makeAnswer({
      createdAt: new Date('2021-01-03'),
      questionId: new UniqueEntityId('2')
    }));

    const result = await sut.execute({page: 1, limit: 10, questionId: '1'});

    expect(result.isRight).toBeTruthy();
    expect(result.value).toHaveProperty('answers');
    if (result.isRight()) {
      expect(result.value.answers.length).toBe(2);
      expect(result.value.answers[0].createdAt.getUTCDate()).toBeGreaterThanOrEqual(result.value.answers[1].createdAt.getUTCDate());
      expect(result.value.answers).toEqual([
        expect.objectContaining({questionId: new UniqueEntityId('1'), createdAt: new Date('2021-01-02')}),
        expect.objectContaining({questionId: new UniqueEntityId('1'), createdAt: new Date('2021-01-01')}),
      ]);
    }
  });

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 0; i < 15; i++) {
      await inMemoryAnswerRepository.create(makeAnswer({questionId: new UniqueEntityId('1')}));
    }

    const result = await sut.execute({page: 2, limit: 10, questionId: '1'});

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value.answers.length).toBe(5);
      expect(result.value.answers[0].createdAt.getUTCDate()).toBeGreaterThanOrEqual(result.value.answers[1].createdAt.getUTCDate());
    }
  });
});

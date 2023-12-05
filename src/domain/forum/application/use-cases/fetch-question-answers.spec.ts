import {InMemoryQuestionsRepository} from 'tests/repositories/in-memory-questions-repository';
import {makeQuestion} from "../../../../../tests/factories/make-question.factory";
import {InMemoryAnswerRepository} from "../../../../../tests/repositories/in-memory-answer-repository";
import {makeAnswer} from "../../../../../tests/factories/make-answer.factory";
import {UniqueEntityId} from "@/core/entities";
import {FetchQuestionAnswersUseCase} from "@domain/forum/application/use-cases/fetch-question-answers";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch question answers', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository);
  });

  it('should be able to fetch question answers', async () => {
    await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date('2021-01-01')}, new UniqueEntityId('1')));
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

    const {answers} = await sut.execute({page: 1, limit: 10, questionId: '1'});

    expect(answers.length).toBe(2);
    expect(answers[0].createdAt.getUTCDate()).toBeGreaterThanOrEqual(answers[1].createdAt.getUTCDate());
    expect(answers).toEqual([
      expect.objectContaining({questionId: new UniqueEntityId('1'), createdAt: new Date('2021-01-02')}),
      expect.objectContaining({questionId: new UniqueEntityId('1'), createdAt: new Date('2021-01-01')}),
    ]);
  });
});

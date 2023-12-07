import {InMemoryQuestionsRepository} from 'tests/repositories/in-memory-questions-repository';
import {makeQuestion} from 'tests/factories/make-question.factory';
import {FetchRecentQuestionsUseCase} from '@domain/forum/application/use-cases/fetch-recent-questions';
import {expect} from 'vitest';
import {InMemoryQuestionsAttachmentsRepository} from "@tests/repositories/in-memory-questions-attachments-repository";

let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionsAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe('Fetch recent questions', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository = new InMemoryQuestionsAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionsAttachmentsRepository);
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date('2021-01-01')}));
    await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date('2021-01-25')}));
    await inMemoryQuestionsRepository.create(makeQuestion({createdAt: new Date('2021-01-03')}));

    const result = await sut.execute({page: 1});

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value.questions.length).toBe(3);
      expect(result.value.questions[0].createdAt.getUTCDate()).toBeGreaterThanOrEqual(result.value.questions[1].createdAt.getUTCDate());
      expect(result.value.questions).toEqual([
        expect.objectContaining({createdAt: new Date('2021-01-25')}),
        expect.objectContaining({createdAt: new Date('2021-01-03')}),
        expect.objectContaining({createdAt: new Date('2021-01-01')}),
      ]);
    }
  });

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion());
    }

    const result = await sut.execute({page: 2, limit: 20});

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value.questions).toHaveLength(2);
      expect(result.value.questions[0].createdAt.getUTCDate()).toBeGreaterThanOrEqual(result.value.questions[1].createdAt.getUTCDate());
    }
  });
});

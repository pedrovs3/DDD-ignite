import {InMemoryQuestionsRepository} from 'tests/repositories/in-memory-questions-repository';
import {GetQuestionBySlugUseCase} from '@domain/forum/application/use-cases/get-question-by-slug';
import {Slug} from '@domain/forum/enterprise/entities/value-objects/slug';
import {makeQuestion} from 'tests/factories/make-question.factory';
import {expect} from "vitest";
import {InMemoryQuestionsAttachmentsRepository} from "@tests/repositories/in-memory-questions-attachments-repository";

let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionsAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository = new InMemoryQuestionsAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionsAttachmentsRepository);
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to find a question based on his slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('nova-pergunta'),
    });
    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: 'nova-pergunta',
    });

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value.question.id).toBeTruthy();
      expect(result.value.question.slug.value).toContain('nova-pergunta');
    }
  });
});

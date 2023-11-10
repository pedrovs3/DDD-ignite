import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from '@domain/forum/application/use-cases/get-question-by-slug';
import { Slug } from '@domain/forum/enterprise/entities/value-objects/slug';
import { makeQuestion } from 'tests/factories/make-question.factory';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to find a question based on his slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('nova-pergunta'),
    });
    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: 'nova-pergunta',
    });

    expect(question.id).toBeTruthy();
    expect(question.slug.value).toContain('nova-pergunta');
  });
});

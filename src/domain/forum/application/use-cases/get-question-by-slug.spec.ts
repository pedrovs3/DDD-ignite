import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from '@domain/forum/application/use-cases/get-question-by-slug';
import { Question } from '@domain/forum/enterprise/entities/question';
import { expect } from 'vitest';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to find a question based on his slug', async () => {
    const newQuestion = Question.create({
      authorId: '123',
      title: 'Nova pergunta',
      content: 'Uma pergunta qualquer',
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: 'nova-pergunta',
    });

    expect(question.id).toBeTruthy();
    expect(question.slug.value).toContain('nova-pergunta');
  });
});

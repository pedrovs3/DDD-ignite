import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { Slug } from '@domain/forum/enterprise/entities/value-objects/slug';
import { makeQuestion } from 'tests/factories/make-question.factory';
import { DeleteQuestionUseCase } from '@domain/forum/application/use-cases/delete-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete question based on ID', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to delete a register based on his ID', async () => {
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

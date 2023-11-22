import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { makeQuestion } from 'tests/factories/make-question.factory';
import { EditQuestionUseCase } from '@domain/forum/application/use-cases/edit-question-use-case';
import { expect } from 'vitest';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
      title: 'Pergunta',
      content: 'Conteúdo da pergunta original',
    }, new UniqueEntityId('question-1'));

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    });

    expect(question.id).toBeTruthy();
    expect(question.slug.value).toContain('nova-pergunta');
    expect(question).toMatchObject({
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    });
  });

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
      title: 'Pergunta',
      content: 'Conteúdo da pergunta original',
    }, new UniqueEntityId('question-1'));

    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(() => sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-2',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    })).rejects.toBeInstanceOf(Error);
  });
});

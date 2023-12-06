import {InMemoryAnswerRepository} from 'tests/repositories/in-memory-answer-repository';
import {expect} from 'vitest';
import {EditAnswerUseCase} from '@domain/forum/application/use-cases/edit-answer-use-case';
import {UniqueEntityId} from '@/core/entities/unique-entity-id';
import {makeAnswer} from '@tests/factories/make-answer.factory';
import {Unauthorized} from "@domain/forum/application/use-cases/errors/unauthorized";
import {ResourceNotFoundError} from "@domain/forum/application/use-cases/errors/resource-not-found.error";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: EditAnswerUseCase;

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new EditAnswerUseCase(inMemoryAnswerRepository);
  });

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1'),
      content: 'Conteúdo da resposta original',
    }, new UniqueEntityId('question-1'));

    await inMemoryAnswerRepository.create(newAnswer);

    const result = await sut.execute({
      questionId: newAnswer.questionId.toValue(),
      authorId: newAnswer.authorId.toString(),
      content: 'Conteúdo da resposta editado',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toHaveProperty('answer.id');
    if (result.isRight()) {
      expect(result.value?.answer.content).toContain('Conteúdo da resposta editado');
    }
  });

  it('should not be able to edit a question from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1'),
      content: 'Conteúdo da resposta original',
    }, new UniqueEntityId('question-1'));

    await inMemoryAnswerRepository.create(newAnswer);

    const result = await sut.execute({
      questionId: newAnswer.questionId.toValue(),
      authorId: '123',
      content: 'Conteúdo da resposta editado',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(Unauthorized || ResourceNotFoundError);
  });
});

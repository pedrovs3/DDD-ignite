import {InMemoryAnswerRepository} from 'tests/repositories/in-memory-answer-repository';
import {expect} from 'vitest';
import {EditAnswerUseCase} from '@domain/forum/application/use-cases/edit-answer-use-case';
import {UniqueEntityId} from '@/core/entities/unique-entity-id';
import {makeAnswer} from '@tests/factories/make-answer.factory';
import {InMemoryAnswersAttachmentsRepository} from "@tests/repositories/in-memory-answers-attachments-repository";
import {makeAnswerAttachment} from "@tests/factories/make-answer-attachment";
import {Unauthorized} from "@/core/errors/errors/unauthorized";
import {ResourceNotFoundError} from "@/core/errors/errors/resource-not-found.error";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswersAttachmentsRepository: InMemoryAnswersAttachmentsRepository;
let sut: EditAnswerUseCase;

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository = new InMemoryAnswersAttachmentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswersAttachmentsRepository);
    sut = new EditAnswerUseCase(inMemoryAnswerRepository, inMemoryAnswersAttachmentsRepository);
  });

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1'),
      content: 'Conteúdo da resposta original',
    }, new UniqueEntityId('question-1'));

    await inMemoryAnswerRepository.create(newAnswer);

    inMemoryAnswersAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('attachment-1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityId('attachment-2'),
      }),
    )


    const result = await sut.execute({
      questionId: newAnswer.questionId.toValue(),
      authorId: newAnswer.authorId.toString(),
      content: 'Conteúdo da resposta editado',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toHaveProperty('answer.id');
    if (result.isRight()) {
      expect(result.value?.answer.content).toContain('Conteúdo da resposta editado');
      if (result.value.answer.attachments) {
        expect(result.value.answer.attachments.currentItems).toHaveLength(2);
        expect(result.value.answer.attachments.currentItems).toEqual([
          expect.objectContaining({attachmentId: new UniqueEntityId('attachment-1')}),
          expect.objectContaining({attachmentId: new UniqueEntityId('attachment-3')})
        ])
      }
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

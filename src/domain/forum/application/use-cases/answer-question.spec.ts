import {InMemoryAnswerRepository} from 'tests/repositories/in-memory-answer-repository';
import {AnswerQuestionUseCase} from '@domain/forum/application/use-cases/answer-question';
import {expect} from 'vitest';
import {UniqueEntityId} from "@/core/entities";
import {InMemoryAnswersAttachmentsRepository} from "@tests/repositories/in-memory-answers-attachments-repository";

let inMemoryAnswersAttachmentRepository: InMemoryAnswersAttachmentsRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionUseCase;

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentRepository = new InMemoryAnswersAttachmentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswersAttachmentRepository);
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      content: 'Nova resposta',
      instructorId: '123',
      questionId: '123',
      attachmentIds: ['1', '2']
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toHaveProperty('id');
    expect(inMemoryAnswerRepository.items[0].id).toEqual(result.value.id);
    if (result.isRight()) {
      if (result.value.attachments) {
        expect(result.value.attachments.currentItems).toHaveLength(2);
        expect(result.value.attachments.currentItems).toEqual([
          expect.objectContaining({attachmentId: new UniqueEntityId('1')}),
          expect.objectContaining({attachmentId: new UniqueEntityId('2')})
        ])
      }
    }
  });
});

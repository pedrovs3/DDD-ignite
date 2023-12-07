import { AnswerRepository } from '@domain/forum/application/repositories/answer.repository';
import { Answer } from '@domain/forum/enterprise/entities/answer';
import { ResourceNotFoundError } from '@domain/forum/application/use-cases/errors/resource-not-found.error';
import { Unauthorized } from '@domain/forum/application/use-cases/errors/unauthorized';
import { AnswerAttachmentsRepository } from '@domain/forum/application/repositories/answer-attachments.repository';
import { AnswerAttachment } from '@domain/forum/enterprise/entities/answer-attachment';
import { AnswerAttachmentList } from '@domain/forum/enterprise/entities/answer-attachment-list';
import { Either, left, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities';

interface EditAnswerUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
  attachmentIds?: string[];
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | Unauthorized, {
  answer: Answer;
}>;

export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {
  }

  async execute({
    authorId,
    questionId,
    content,
    attachmentIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(questionId);

    if (!answer) return left(new ResourceNotFoundError({ fieldName: 'answer' }));
    if (answer.authorId.toString() !== authorId) return left(new Unauthorized());

    if (attachmentIds) {
      const currentAttachments = await this.answerAttachmentsRepository
        .findManyByAnswerId(questionId);

      const currentAttachmentsList = new AnswerAttachmentList(currentAttachments);

      currentAttachmentsList.update(attachmentIds
        ?.map((attachmentId) => AnswerAttachment.create({
          attachmentId: new UniqueEntityId(attachmentId),
          answerId: answer.id,
        })));

      answer.attachments = currentAttachmentsList;
    }

    answer.content = content;

    await this.answerRepository.update(answer);

    return right({ answer });
  }
}

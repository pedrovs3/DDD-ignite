import { QuestionsRepository } from '@domain/forum/application/repositories/question.repository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { ResourceNotFoundError } from '@domain/forum/application/use-cases/errors/resource-not-found.error';
import { Unauthorized } from '@domain/forum/application/use-cases/errors/unauthorized';
import { QuestionAttachmentList } from '@domain/forum/enterprise/entities/question-attachment-list';
import { QuestionAttachmentsRepository } from '@domain/forum/application/repositories/question-attachments.repository';
import { QuestionAttachment } from '@domain/forum/enterprise/entities/question-attachment';
import { Either, left, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities';

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentsIds?: string[];
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | Unauthorized, {
  question: Question;
}>;

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {
  }

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) return left(new ResourceNotFoundError({ fieldName: 'question' }));
    if (question.authorId.toString() !== authorId) return left(new Unauthorized());

    question.title = title;
    question.content = content;

    if (attachmentsIds) {
      const currentAttachments = await this.questionAttachmentsRepository
        .findManyByQuestionId(questionId);

      const currentAttachmentsList = new QuestionAttachmentList(currentAttachments);

      currentAttachmentsList.update(attachmentsIds
        ?.map((attachmentId) => QuestionAttachment.create({
          attachmentId: new UniqueEntityId(attachmentId),
          questionId: question.id,
        })));

      question.attachments = currentAttachmentsList;
    }

    await this.questionsRepository.update(question);

    return right({ question });
  }
}

import { QuestionsRepository } from '@domain/forum/application/repositories/question.repository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionAttachment } from '@domain/forum/enterprise/entities/question-attachment';
import { QuestionAttachmentList } from '@domain/forum/enterprise/entities/question-attachment-list';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Either, right } from '@/core/either';

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds?: string[]
}

type CreateQuestionUseCaseResponse = Either<any, {
  question: Question;
}>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {
  }

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    if (attachmentsIds) {
      question.attachments = new QuestionAttachmentList(
        attachmentsIds
          ?.map((attachmentId) => QuestionAttachment.create({
            attachmentId: new UniqueEntityId(attachmentId),
            questionId: question.id,
          })),
      );
    }

    await this.questionsRepository.create(question);

    return right({
      question,
    });
  }
}

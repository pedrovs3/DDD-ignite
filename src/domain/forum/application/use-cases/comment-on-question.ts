import { QuestionsCommentsRepository, QuestionsRepository } from '@domain/forum/application/repositories';
import { QuestionComment } from '@domain/forum/enterprise/entities';
import { ResourceNotFoundError } from '@domain/forum/application/use-cases/errors/resource-not-found.error';
import { UniqueEntityId } from '@/core/entities';
import { Either, left, right } from '@/core/either';

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse =
  Either<ResourceNotFoundError, { questionComment: QuestionComment; }>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentRepository: QuestionsCommentsRepository,
  ) {
  }

  async execute({
    questionId,
    content,
    authorId,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) return left(new ResourceNotFoundError({ fieldName: 'question' }));

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentRepository.create(questionComment);
    return right({
      questionComment,
    });
  }
}

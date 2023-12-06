import { QuestionsCommentsRepository } from '@domain/forum/application/repositories';
import { ResourceNotFoundError } from '@domain/forum/application/use-cases/errors/resource-not-found.error';
import { Unauthorized } from '@domain/forum/application/use-cases/errors/unauthorized';
import { Either, left, right } from '@/core/either';

interface DeleteCommentForQuestionUseCaseRequest {
  questionId: string,
  commentId: string,
  authorId: string,
}

type DeleteCommentForQuestionUseCaseResponse = Either<ResourceNotFoundError | Unauthorized, {}>;

export class DeleteCommentForQuestionUseCase {
  constructor(
    private questionCommentsRepository: QuestionsCommentsRepository,
  ) {
  }

  async execute({
    questionId,
    commentId,
    authorId,
  }: DeleteCommentForQuestionUseCaseRequest): Promise<DeleteCommentForQuestionUseCaseResponse> {
    const comment = await this.questionCommentsRepository.findById(commentId);
    if (!comment) return left(new ResourceNotFoundError({ fieldName: 'comment' }));
    if (comment.authorId.toString() !== authorId) return left(new Unauthorized());

    if (comment.questionId.toString() !== questionId) return left(new ResourceNotFoundError({ fieldName: 'question' }));
    await this.questionCommentsRepository.delete(comment);

    return right({});
  }
}

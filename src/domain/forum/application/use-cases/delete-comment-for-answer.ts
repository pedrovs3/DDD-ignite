import { AnswerCommentsRepository } from '@domain/forum/application/repositories';

interface DeleteCommentForAnswerUseCaseRequest {
  answerId: string,
  commentId: string,
  authorId: string,
}

interface DeleteCommentForAnswerUseCaseResponse {
}

export class DeleteCommentForAnswerUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {
  }

  async execute({
    answerId,
    commentId,
    authorId,
  }: DeleteCommentForAnswerUseCaseRequest): Promise<DeleteCommentForAnswerUseCaseResponse> {
    const comment = await this.answerCommentsRepository.findById(commentId);
    if (!comment) throw new Error('Comment not found');
    if (comment.authorId.toString() !== authorId) throw new Error('Unauthorized');

    if (comment.answerId.toString() !== answerId) throw new Error('Comment not found for this Answer');
    await this.answerCommentsRepository.delete(comment);

    return {};
  }
}

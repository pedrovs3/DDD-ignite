import { QuestionsCommentsRepository } from '@domain/forum/application/repositories';

interface DeleteCommentForQuestionUseCaseRequest {
  questionId: string,
  commentId: string,
  authorId: string,
}

interface DeleteCommentForQuestionUseCaseResponse {
}

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
    if (!comment) throw new Error('Comment not found');
    if (comment.authorId.toString() !== authorId) throw new Error('Unauthorized');

    if (comment.questionId.toString() !== questionId) throw new Error('Comment not found for this question');
    await this.questionCommentsRepository.delete(comment);

    return {};
  }
}

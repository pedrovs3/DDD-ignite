import { AnswerCommentsRepository, AnswerRepository } from '@domain/forum/application/repositories';
import { AnswerComment } from '@domain/forum/enterprise/entities';
import { UniqueEntityId } from '@/core/entities';

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentsRepository,
  ) {
  }

  async execute({
    answerId,
    content,
    authorId,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) throw new Error('Answer not found.');

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answerCommentRepository.create(answerComment);
    return {
      answerComment,
    };
  }
}

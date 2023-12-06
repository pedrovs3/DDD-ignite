import { QuestionsCommentsRepository, QuestionsRepository } from '@domain/forum/application/repositories';
import { QuestionComment } from '@domain/forum/enterprise/entities';
import { UniqueEntityId } from '@/core/entities';

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

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

    if (!question) throw new Error('Question not found');

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentRepository.create(questionComment);
    return {
      questionComment,
    };
  }
}

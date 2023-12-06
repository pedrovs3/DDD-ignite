import { QuestionsCommentsRepository } from '@domain/forum/application/repositories';
import { QuestionComment } from '@domain/forum/enterprise/entities';

interface ListQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
  limit?: number;
}

interface ListQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionsCommentsRepository) {
  }

  async execute({
    questionId,
    page,
    limit,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findAllByQuestionId(questionId, {
      page,
      limit,
    });

    return {
      questionComments,
    };
  }
}

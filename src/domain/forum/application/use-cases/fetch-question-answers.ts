import { Answer } from '@domain/forum/enterprise/entities';
import { AnswerRepository } from '@domain/forum/application/repositories';

interface FetchQuestionAnswersUseCaseRequest {
  page: number
  limit?: number
  questionId: string
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {
  }

  async execute({ page, limit }: FetchQuestionAnswersUseCaseRequest)
    : Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyRecent({ page, limit });

    if (!answers) {
      throw new Error('Questions not found');
    }
    return {
      answers,
    };
  }
}

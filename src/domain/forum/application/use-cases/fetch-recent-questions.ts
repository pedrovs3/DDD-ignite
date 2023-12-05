import { Question } from '@domain/forum/enterprise/entities';
import { QuestionsRepository } from '@domain/forum/application/repositories';

interface FetchRecentQuestionsUseCaseRequest {
  page: number
  limit?: number
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {
  }

  async execute({ page, limit }: FetchRecentQuestionsUseCaseRequest)
    : Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page, limit });

    if (!questions) {
      throw new Error('Questions not found');
    }
    return {
      questions,
    };
  }
}

import { Question } from '@domain/forum/enterprise/entities';
import { QuestionsRepository } from '@domain/forum/application/repositories';
import { ResourceNotFoundError } from '@domain/forum/application/use-cases/errors/resource-not-found.error';
import { Either, left, right } from '@/core/either';

interface FetchRecentQuestionsUseCaseRequest {
  page: number
  limit?: number
}

type FetchRecentQuestionsUseCaseResponse = Either<ResourceNotFoundError, {
  questions: Question[]
}>;

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {
  }

  async execute({ page, limit }: FetchRecentQuestionsUseCaseRequest)
    : Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page, limit });

    if (!questions) return left(new ResourceNotFoundError({ fieldName: 'questions' }));

    return right({
      questions,
    });
  }
}

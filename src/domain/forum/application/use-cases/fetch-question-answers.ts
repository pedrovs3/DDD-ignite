import { Answer } from '@domain/forum/enterprise/entities';
import { AnswerRepository } from '@domain/forum/application/repositories';
import { ResourceNotFoundError } from '@domain/forum/application/use-cases/errors/resource-not-found.error';
import { Either, left, right } from '@/core/either';

interface FetchQuestionAnswersUseCaseRequest {
  page: number
  limit?: number
  questionId: string
}

type FetchQuestionAnswersUseCaseResponse = Either<ResourceNotFoundError, {
  answers: Answer[]
}>;

export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {
  }

  async execute({ page, questionId, limit }: FetchQuestionAnswersUseCaseRequest)
    : Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId({ page, questionId, limit });

    if (!answers) return left(new ResourceNotFoundError({ fieldName: 'answers' }));

    return right({ answers });
  }
}

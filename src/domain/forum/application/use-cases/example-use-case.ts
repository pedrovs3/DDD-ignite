import { ExampleRepository } from '@domain/forum/application/repositories/example.repository';
import { ResourceNotFoundError } from '@domain/forum/application/use-cases/errors/resource-not-found.error';
import { Unauthorized } from '@domain/forum/application/use-cases/errors/unauthorized';
import { Either, right } from '@/core/either';

interface ExampleUseCaseRequest {
}

type ExampleUseCaseResponse = Either<ResourceNotFoundError | Unauthorized, {}>;

export class ExampleUseCase {
  constructor(private answerRepository: ExampleRepository) {
  }

  async execute({}: ExampleUseCaseRequest): Promise<ExampleUseCaseResponse> {
    return right({});
  }
}

import { ExampleRepository } from '@domain/forum/application/repositories/example.repository';

interface ExampleUseCaseRequest {
}

interface ExampleUseCaseResponse {
}

export class ExampleUseCase {
  constructor(private answerRepository: ExampleRepository) {
  }

  async execute({}: ExampleUseCaseRequest): Promise<ExampleUseCaseResponse> {
    return {};
  }
}

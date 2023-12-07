import { ResourceNotFoundError } from '@domain/forum/application/use-cases/errors/resource-not-found.error';
import { Unauthorized } from '@domain/forum/application/use-cases/errors/unauthorized';
import { AnswerRepository } from '@domain/forum/application/repositories';
import { Answer } from '@domain/forum/enterprise/entities';
import { Either, left, right } from '@/core/either';

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | Unauthorized, {}>;

export class DeleteAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
  ) {
  }

  async execute({ authorId, answerId }: DeleteAnswerUseCaseRequest):
  Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError({ fieldName: 'Answer' }));

    if (answer.authorId.toString() !== authorId) return left(new Unauthorized());

    await this.answerRepository.delete(answer);

    return right({});
  }
}

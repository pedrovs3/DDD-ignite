import { AnswerRepository } from '@domain/forum/application/repositories/answer.repository';
import { Answer } from '@domain/forum/enterprise/entities/answer';
import { ResourceNotFoundError } from '@domain/forum/application/use-cases/errors/resource-not-found.error';
import { Unauthorized } from '@domain/forum/application/use-cases/errors/unauthorized';
import { Either, left, right } from '@/core/either';

interface EditAnswerUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | Unauthorized, {
  answer: Answer;
}>;

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {
  }

  async execute({
    authorId,
    questionId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(questionId);

    if (!answer) return left(new ResourceNotFoundError({ fieldName: 'answer' }));
    if (answer.authorId.toString() !== authorId) return left(new Unauthorized());

    answer.content = content;

    await this.answerRepository.update(answer);

    return right({ answer });
  }
}

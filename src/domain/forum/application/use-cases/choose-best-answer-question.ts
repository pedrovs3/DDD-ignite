import { Answer, Question } from '@domain/forum/enterprise/entities';
import { AnswerRepository, QuestionsRepository } from '@domain/forum/application/repositories';
import { ResourceNotFoundError } from '@domain/forum/application/use-cases/errors/resource-not-found.error';
import { Unauthorized } from '@domain/forum/application/use-cases/errors/unauthorized';
import { Either, left, right } from '@/core/either';

interface ChooseBestAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

type ChooseBestAnswerUseCaseResponse = Either<ResourceNotFoundError | Unauthorized, {
  answer: Answer;
  question: Question;
}>;

export class ChooseBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answerRepository: AnswerRepository,
  ) {
  }

  async execute({
    answerId,
    authorId,
  }: ChooseBestAnswerUseCaseRequest): Promise<ChooseBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError({ fieldName: 'answer' }));

    const question = await this.questionsRepository.findById(answer.questionId.toValue());

    if (!question) return left(new ResourceNotFoundError({ fieldName: 'question' }));

    if (authorId !== question.authorId.toString()) return left(new Unauthorized());

    question.bestAnswerId = answer.id;

    await this.questionsRepository.update(question);

    return right({
      question,
      answer,
    });
  }
}

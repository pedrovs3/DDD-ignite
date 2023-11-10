import { Answer } from '@entities/answer';
import { UniqueEntityId } from '@entities/value-objects/unique-entity-id';
import { AnswerRepository } from '@domain/repositories/answer.repository';

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {
  }

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<Answer> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answerRepository.create(answer);

    return answer;
  }
}

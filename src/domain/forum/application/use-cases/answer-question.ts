import { Answer } from '@domain/forum/enterprise/entities/answer';
import { AnswerRepository } from '@domain/forum/application/repositories/answer.repository';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

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

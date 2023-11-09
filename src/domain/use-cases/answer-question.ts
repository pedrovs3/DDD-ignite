import { Answer } from '../entities/answer';
import { AnswerRepository } from '../repositories/answer.repository';

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
    const answer = new Answer({
      questionId,
      content,
      authorId: instructorId,
    });

    await this.answerRepository.create(answer);

    return answer;
  }
}

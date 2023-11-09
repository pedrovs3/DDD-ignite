import { Answer } from '../entities/answer';

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Answer {
    return new Answer({
      questionId,
      content,
      authorId: instructorId,
    });
  }
}

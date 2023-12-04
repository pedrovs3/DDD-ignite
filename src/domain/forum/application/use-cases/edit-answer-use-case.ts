import { AnswerRepository } from '@domain/forum/application/repositories/answer.repository';
import { Answer } from '@domain/forum/enterprise/entities/answer';

interface EditAnswerUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {
  }

  async execute({
    authorId,
    questionId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(questionId);

    if (!answer) throw new Error('Answer not found');
    if (answer.authorId.toString() !== authorId) throw new Error('Unauthorized');

    answer.content = content;

    await this.answerRepository.update(answer);

    return { answer };
  }
}

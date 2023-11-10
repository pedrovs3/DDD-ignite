import { Slug } from '@domain/forum/enterprise/entities/value-objects/slug';
import { QuestionsRepository } from '@domain/forum/application/repositories/question.repository';

interface DeleteQuestionUseCaseRequest {
  id: Slug | string;
}

interface DeleteQuestionUseCaseResponse {
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {
  }

  async execute({ id }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const { question } = await this.questionsRepository.findById(id);

    if (!question) throw new Error('Question not found');

    await this.answerRepository.delete(question);
  }
}

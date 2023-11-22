import { QuestionsRepository } from '@domain/forum/application/repositories/question.repository';

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

interface DeleteQuestionUseCaseResponse {
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {
  }

  async execute({ authorId, questionId }: DeleteQuestionUseCaseRequest):
  Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) throw new Error('Question not found');

    if (question.authorId.toString() !== authorId) throw new Error('Unauthorized');

    await this.questionsRepository.delete(question);

    return {};
  }
}

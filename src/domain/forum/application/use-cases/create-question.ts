import { QuestionsRepository } from '@domain/forum/application/repositories/question.repository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {
  }

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    await this.questionsRepository.create(question);

    return {
      question,
    };
  }
}

import { QuestionsRepository } from '@domain/forum/application/repositories/question.repository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { Slug } from '@domain/forum/enterprise/entities/value-objects/slug';

interface GetQuestionBySlugUseCaseRequest {
  slug: Slug | string;
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question;
}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {
  }

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      throw new Error('Question not found');
    }

    return {
      question,
    };
  }
}

import { QuestionsRepository } from '@domain/forum/application/repositories/question.repository';
import { Question } from '@domain/forum/enterprise/entities/question';
import { ResourceNotFoundError } from '@domain/forum/application/use-cases/errors/resource-not-found.error';
import { Unauthorized } from '@domain/forum/application/use-cases/errors/unauthorized';
import { Either, left, right } from '@/core/either';

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | Unauthorized, {
  question: Question;
}>;

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {
  }

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) return left(new ResourceNotFoundError({ fieldName: 'question' }));
    if (question.authorId.toString() !== authorId) return left(new Unauthorized());

    question.title = title;
    question.content = content;

    await this.questionsRepository.update(question);

    return right({ question });
  }
}

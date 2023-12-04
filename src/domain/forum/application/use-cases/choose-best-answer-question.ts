import { Answer, Question } from '@domain/forum/enterprise/entities';
import { AnswerRepository, QuestionsRepository } from '@domain/forum/application/repositories';

interface ChooseBestAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface ChooseBestAnswerUseCaseResponse {
  answer: Answer;
  question: Question;
}

export class ChooseBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answerRepository: AnswerRepository,
  ) {
  }

  async execute({
    answerId,
    authorId,
  }: ChooseBestAnswerUseCaseRequest): Promise<ChooseBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) throw new Error('Answer not found.');

    const question = await this.questionsRepository.findById(answer.questionId.toValue());

    if (!question) throw new Error('Question not found.');

    if (authorId !== question.authorId.toString()) throw new Error('Unauthorized.');

    question.bestAnswerId = answer.id;

    await this.questionsRepository.update(question);

    return {
      question,
      answer,
    };
  }
}

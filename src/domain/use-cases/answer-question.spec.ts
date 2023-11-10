import { Answer } from '@entities/answer';
import { AnswerQuestionUseCase } from './answer-question';
import { AnswerRepository } from '../repositories/answer.repository';

const fakeAnswerRepository: AnswerRepository = {
  // TODO: remove line after implementing the method
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(_answer: Answer) {
    // not-implemented
  },
};

test('create an answer for a question', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    content: 'Nova resposta',
    questionId: '123',
    instructorId: '456',
  });

  expect(answer.content).toEqual('Nova resposta');
});

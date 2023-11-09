import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question';

test('create an answer for a question', () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    content: 'Nova resposta',
    questionId: '123',
    instructorId: '456',
  });

  expect(answer.content).toEqual('Nova resposta');
});

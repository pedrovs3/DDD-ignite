import { Question } from '@domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '@domain/forum/application/repositories/question.repository';
import { CreateQuestionUseCase } from '@domain/forum/application/use-cases/create-question';

const fakeQuestionRepository: QuestionsRepository = {
  // TODO: remove line after implementing the method
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(question: Question) {
    // not-implemented
  },
};

test('create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository);

  const { question } = await createQuestion.execute({
    authorId: '123',
    title: 'Nova pergunta',
    content: 'Nova resposta',
  });

  expect(question.id).toBeTruthy();
});

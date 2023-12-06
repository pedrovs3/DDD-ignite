import {beforeEach, describe, expect} from 'vitest';
import {InMemoryQuestionsCommentsRepository} from "@tests/repositories/in-memory-questions-comments-repository";
import {CommentOnQuestionUseCase} from "@domain/forum/application/use-cases/comment-on-question";
import {InMemoryQuestionsRepository} from "@tests/repositories/in-memory-questions-repository";
import {makeQuestion} from "@tests/factories/make-question.factory";

let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CommentOnQuestionUseCase;

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionsCommentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionsCommentsRepository);
  });

  it('should be able to comment on question', async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);


    const result = await sut.execute({
      authorId: 'authorId',
      questionId: question.id.toString(),
      content: 'Comentário sobre a pergunta',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toHaveProperty('questionComment');
    expect(result.value).toHaveProperty('questionComment.id');
    expect(inMemoryQuestionsCommentsRepository.items[0].content).toEqual('Comentário sobre a pergunta');
  });
});

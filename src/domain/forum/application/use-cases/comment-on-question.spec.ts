import {beforeEach, describe, expect} from 'vitest';
import {
  InMemoryQuestionsCommentsRepository
} from "../../../../../tests/repositories/in-memory-questions-comments-repository";
import {CommentOnQuestionUseCase} from "@domain/forum/application/use-cases/comment-on-question";

let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionsCommentsRepository();
    sut = new CommentOnQuestionUseCase(inMemoryQuestionsCommentsRepository,);
  });

  it('should be able to create a question', async () => {
    const {question} = await sut.execute({
      authorId: '123',
      title: 'Nova pergunta',
      content: 'Uma pergunta qualquer',
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
  });
});

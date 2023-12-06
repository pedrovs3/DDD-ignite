import {beforeEach, describe, expect} from 'vitest';
import {
  InMemoryAnswersCommentsRepository
} from "../../../../../tests/repositories/in-memory-answers-comments-repository";
import {CommentOnAnswerUseCase} from "@domain/forum/application/use-cases/comment-on-answer";
import {makeAnswer} from "../../../../../tests/factories/make-answer.factory";
import {InMemoryAnswerRepository} from "../../../../../tests/repositories/in-memory-answer-repository";

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;
let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: CommentOnAnswerUseCase;

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswersCommentsRepository);
  });

  it('should be able to comment on Answer', async () => {
    const Answer = makeAnswer();

    await inMemoryAnswersRepository.create(Answer);


    await sut.execute({
      authorId: 'authorId',
      answerId: Answer.id.toString(),
      content: 'Comentário sobre a resposta.',
    });

    expect(inMemoryAnswersCommentsRepository.items[0].content).toEqual('Comentário sobre a resposta.');
  });
});

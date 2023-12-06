import {InMemoryQuestionsRepository} from 'tests/repositories/in-memory-questions-repository';
import {expect} from 'vitest';
import {UniqueEntityId} from '@/core/entities/unique-entity-id';
import {
  InMemoryQuestionsCommentsRepository
} from "../../../../../tests/repositories/in-memory-questions-comments-repository";
import {makeComment} from "../../../../../tests/factories/make-comment.factory";
import {QuestionComment} from "@domain/forum/enterprise/entities";
import {DeleteCommentForQuestionUseCase} from "@domain/forum/application/use-cases/delete-comment-for-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let sut: DeleteCommentForQuestionUseCase;

describe('Delete comment for question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionsCommentsRepository();
    sut = new DeleteCommentForQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionsCommentsRepository);
  });

  it('should be able to delete a register based on his ID', async () => {
    const newComment = makeComment({
      authorId: new UniqueEntityId('author-2'),
      questionId: new UniqueEntityId('question-1')
    }, 'question', new UniqueEntityId('comment-1'));
    await inMemoryQuestionsCommentsRepository.create(newComment as QuestionComment);

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
      commentId: 'comment-1',
    });

    expect(inMemoryQuestionsRepository.items.find((value) => value.id === new UniqueEntityId('author-2')))
      .toBe(undefined);
    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a register from another user', async () => {
    const newComment = makeComment({authorId: new UniqueEntityId('author-2')}, 'question', new UniqueEntityId('comment-1'));
    await inMemoryQuestionsCommentsRepository.create(newComment as QuestionComment);

    await expect(() => sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      commentId: 'comment-1',
    })).rejects.toBeInstanceOf(Error);

    expect(inMemoryQuestionsCommentsRepository.items).toHaveLength(1);
  });
});

import {UniqueEntityId} from "@/core/entities";
import {
  InMemoryQuestionsCommentsRepository
} from "../../../../../tests/repositories/in-memory-questions-comments-repository";
import {ListQuestionCommentsUseCase} from "@domain/forum/application/use-cases/list-question-comments";
import {makeComment} from "../../../../../tests/factories/make-comment.factory";
import {QuestionComment} from "@domain/forum/enterprise/entities";

let inMemoryQuestionCommentsRepository: InMemoryQuestionsCommentsRepository;
let sut: ListQuestionCommentsUseCase;

describe('List question comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionsCommentsRepository();
    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able to list question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(makeComment({
      questionId: new UniqueEntityId('1'),
      createdAt: new Date('2023-01-01')
    }, 'question', new UniqueEntityId('comment-1')) as QuestionComment);
    await inMemoryQuestionCommentsRepository.create(makeComment({
      questionId: new UniqueEntityId('1'),
      createdAt: new Date('2023-01-02')
    }, 'question', new UniqueEntityId('comment-2')) as QuestionComment);
    await inMemoryQuestionCommentsRepository.create(makeComment({
      questionId: new UniqueEntityId('2'),
      createdAt: new Date('2023-01-03')
    }, 'question', new UniqueEntityId('comment-3')) as QuestionComment);

    const {questionComments} = await sut.execute({page: 1, limit: 10, questionId: '1'});

    expect(questionComments.length).toBe(2);
    expect(questionComments[0].createdAt.getUTCDate()).toBeGreaterThanOrEqual(questionComments[1].createdAt.getUTCDate());
    expect(questionComments).toEqual([
      expect.objectContaining({questionId: new UniqueEntityId('1'), createdAt: new Date('2023-01-02')}),
      expect.objectContaining({questionId: new UniqueEntityId('1'), createdAt: new Date('2023-01-01')}),
    ]);
  });

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 0; i < 15; i++) {
      await inMemoryQuestionCommentsRepository.create(makeComment({
        questionId: new UniqueEntityId('1'),
        createdAt: new Date('2023-01-03')
      }, 'question', new UniqueEntityId(`comment-${i}`)) as QuestionComment);
    }

    const {questionComments} = await sut.execute({page: 2, limit: 10, questionId: '1'});

    expect(questionComments.length).toBe(5);
    expect(questionComments[0].createdAt.getUTCDate()).toBeGreaterThanOrEqual(questionComments[1].createdAt.getUTCDate());
  });
});

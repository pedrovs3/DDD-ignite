import { UniqueEntityId } from "@/core/entities";
import { ListAnswerCommentsUseCase } from "@domain/forum/application/use-cases/list-answer-comments";
import { AnswerComment } from "@domain/forum/enterprise/entities";
import { makeComment } from "@tests/factories/make-comment.factory";
import { InMemoryAnswersCommentsRepository } from "@tests/repositories/in-memory-answers-comments-repository";
import { expect } from "vitest";

let inMemoryAnswerCommentsRepository: InMemoryAnswersCommentsRepository;
let sut: ListAnswerCommentsUseCase;

describe("List Answer comments", () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswersCommentsRepository();
		sut = new ListAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
	});

	it("should be able to list Answer comments", async () => {
		await inMemoryAnswerCommentsRepository.create(
			makeComment(
				{
					answerId: new UniqueEntityId("1"),
					createdAt: new Date("2023-01-01"),
				},
				"answer",
				new UniqueEntityId("comment-1"),
			) as AnswerComment,
		);
		await inMemoryAnswerCommentsRepository.create(
			makeComment(
				{
					answerId: new UniqueEntityId("1"),
					createdAt: new Date("2023-01-02"),
				},
				"answer",
				new UniqueEntityId("comment-2"),
			) as AnswerComment,
		);
		await inMemoryAnswerCommentsRepository.create(
			makeComment(
				{
					answerId: new UniqueEntityId("2"),
					createdAt: new Date("2023-01-03"),
				},
				"answer",
				new UniqueEntityId("comment-3"),
			) as AnswerComment,
		);

		const result = await sut.execute({ page: 1, limit: 10, answerId: "1" });

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.answerComments.length).toBe(2);
			expect(
				result.value.answerComments[0].createdAt.getUTCDate(),
			).toBeGreaterThanOrEqual(
				result.value.answerComments[1].createdAt.getUTCDate(),
			);
			expect(result.value.answerComments).toEqual([
				expect.objectContaining({
					answerId: new UniqueEntityId("1"),
					createdAt: new Date("2023-01-02"),
				}),
				expect.objectContaining({
					answerId: new UniqueEntityId("1"),
					createdAt: new Date("2023-01-01"),
				}),
			]);
		}
	});

	it("should be able to fetch paginated Answer comments", async () => {
		for (let i = 0; i < 15; i++) {
			await inMemoryAnswerCommentsRepository.create(
				makeComment(
					{
						answerId: new UniqueEntityId("1"),
						createdAt: new Date("2023-01-03"),
					},
					"answer",
					new UniqueEntityId(`comment-${i}`),
				) as AnswerComment,
			);
		}

		const result = await sut.execute({ page: 2, limit: 10, answerId: "1" });

		expect(result.isRight()).toBeTruthy();
		if (result.isRight()) {
			expect(result.value.answerComments.length).toBe(5);
			expect(
				result.value.answerComments[0].createdAt.getUTCDate(),
			).toBeGreaterThanOrEqual(
				result.value.answerComments[1].createdAt.getUTCDate(),
			);
		}
	});
});

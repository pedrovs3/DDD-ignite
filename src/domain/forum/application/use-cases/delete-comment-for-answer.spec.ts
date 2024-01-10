import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { DeleteCommentForAnswerUseCase } from "@domain/forum/application/use-cases/delete-comment-for-answer";
import { Unauthorized } from "@domain/forum/application/use-cases/errors/unauthorized";
import { AnswerComment } from "@domain/forum/enterprise/entities";
import { makeComment } from "@tests/factories/make-comment.factory";
import { InMemoryAnswersCommentsRepository } from "@tests/repositories/in-memory-answers-comments-repository";
import { expect } from "vitest";

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;
let sut: DeleteCommentForAnswerUseCase;

describe("Delete comment for Answer", () => {
	beforeEach(() => {
		inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository();
		sut = new DeleteCommentForAnswerUseCase(inMemoryAnswersCommentsRepository);
	});

	it("should be able to delete a register based on his ID", async () => {
		const newComment = makeComment(
			{
				authorId: new UniqueEntityId("author-2"),
				answerId: new UniqueEntityId("answer-1"),
			},
			"answer",
			new UniqueEntityId("comment-1"),
		);
		await inMemoryAnswersCommentsRepository.create(newComment as AnswerComment);

		await sut.execute({
			answerId: "answer-1",
			authorId: "author-2",
			commentId: "comment-1",
		});

		expect(
			inMemoryAnswersCommentsRepository.items.find(
				(value) => value.id === new UniqueEntityId("comment-1"),
			),
		).toBe(undefined);
		expect(inMemoryAnswersCommentsRepository.items).toHaveLength(0);
	});

	it("should not be able to delete a register from another user", async () => {
		const newComment = makeComment(
			{ authorId: new UniqueEntityId("author-2") },
			"answer",
			new UniqueEntityId("comment-1"),
		);
		await inMemoryAnswersCommentsRepository.create(newComment as AnswerComment);

		const result = await sut.execute({
			answerId: "answer-1",
			authorId: "author-1",
			commentId: "comment-1",
		});
		expect(result.isRight()).toBe(false);
		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(Unauthorized);
		expect(inMemoryAnswersCommentsRepository.items).toHaveLength(1);
	});
});

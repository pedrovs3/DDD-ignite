import { CommentOnAnswerUseCase } from "@domain/forum/application/use-cases/comment-on-answer";
import { makeAnswer } from "@tests/factories/make-answer.factory";
import { InMemoryAnswerRepository } from "@tests/repositories/in-memory-answer-repository";
import { InMemoryAnswersAttachmentsRepository } from "@tests/repositories/in-memory-answers-attachments-repository";
import { InMemoryAnswersCommentsRepository } from "@tests/repositories/in-memory-answers-comments-repository";
import { beforeEach, describe, expect } from "vitest";

let inMemoryAnswersCommentsRepository: InMemoryAnswersCommentsRepository;
let inMemoryAnswersAttachmentsRepository: InMemoryAnswersAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on Answer", () => {
	beforeEach(() => {
		inMemoryAnswersCommentsRepository = new InMemoryAnswersCommentsRepository();
		inMemoryAnswersAttachmentsRepository =
			new InMemoryAnswersAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswerRepository(
			inMemoryAnswersAttachmentsRepository,
		);
		sut = new CommentOnAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswersCommentsRepository,
		);
	});

	it("should be able to comment on Answer", async () => {
		const Answer = makeAnswer();

		await inMemoryAnswersRepository.create(Answer);

		const result = await sut.execute({
			authorId: "authorId",
			answerId: Answer.id.toString(),
			content: "Comentário sobre a resposta.",
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toHaveProperty("answerComment");
		expect(inMemoryAnswersCommentsRepository.items[0].content).toEqual(
			"Comentário sobre a resposta.",
		);
	});
});

import { CommentOnQuestionUseCase } from "@domain/forum/application/use-cases/comment-on-question";
import { makeQuestion } from "@tests/factories/make-question.factory";
import { InMemoryQuestionsAttachmentsRepository } from "@tests/repositories/in-memory-questions-attachments-repository";
import { InMemoryQuestionsCommentsRepository } from "@tests/repositories/in-memory-questions-comments-repository";
import { InMemoryQuestionsRepository } from "@tests/repositories/in-memory-questions-repository";
import { beforeEach, describe, expect } from "vitest";

let inMemoryQuestionsCommentsRepository: InMemoryQuestionsCommentsRepository;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionsAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment on question", () => {
	beforeEach(() => {
		inMemoryQuestionsCommentsRepository =
			new InMemoryQuestionsCommentsRepository();
		inMemoryQuestionsAttachmentsRepository =
			new InMemoryQuestionsAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionsAttachmentsRepository,
		);
		sut = new CommentOnQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionsCommentsRepository,
		);
	});

	it("should be able to comment on question", async () => {
		const question = makeQuestion();

		await inMemoryQuestionsRepository.create(question);

		const result = await sut.execute({
			authorId: "authorId",
			questionId: question.id.toString(),
			content: "Comentário sobre a pergunta",
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toHaveProperty("questionComment");
		expect(result.value).toHaveProperty("questionComment.id");
		expect(inMemoryQuestionsCommentsRepository.items[0].content).toEqual(
			"Comentário sobre a pergunta",
		);
	});
});

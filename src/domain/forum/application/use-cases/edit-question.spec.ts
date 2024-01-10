import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { EditQuestionUseCase } from "@domain/forum/application/use-cases/edit-question-use-case";
import { Unauthorized } from "@domain/forum/application/use-cases/errors/unauthorized";
import { makeQuestionAttachment } from "@tests/factories/make-question-attachment";
import { InMemoryQuestionsAttachmentsRepository } from "@tests/repositories/in-memory-questions-attachments-repository";
import { InMemoryQuestionsRepository } from "@tests/repositories/in-memory-questions-repository";
import { makeQuestion } from "tests/factories/make-question.factory";
import { expect } from "vitest";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionsAttachmentsRepository;
let sut: EditQuestionUseCase;

describe("Edit question", () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionsAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		sut = new EditQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionAttachmentsRepository,
		);
	});

	it("should be able to edit a question", async () => {
		const newQuestion = makeQuestion(
			{
				authorId: new UniqueEntityId("author-1"),
				title: "Pergunta",
				content: "Conteúdo da pergunta original",
			},
			new UniqueEntityId("question-1"),
		);

		await inMemoryQuestionsRepository.create(newQuestion);

		inMemoryQuestionAttachmentsRepository.items.push(
			makeQuestionAttachment({
				questionId: newQuestion.id,
				attachmentId: new UniqueEntityId("attachment-1"),
			}),
			makeQuestionAttachment({
				questionId: newQuestion.id,
				attachmentId: new UniqueEntityId("attachment-2"),
			}),
		);

		const result = await sut.execute({
			questionId: newQuestion.id.toValue(),
			authorId: "author-1",
			title: "Nova pergunta",
			content: "Conteúdo da pergunta",
			attachmentsIds: ["attachment-1", "attachment-3"],
		});

		expect(result.isRight).toBeTruthy();
		if (result.isRight()) {
			expect(result.value?.question.slug.value).toContain("nova-pergunta");
			expect(result.value?.question).toMatchObject({
				title: "Nova pergunta",
				content: "Conteúdo da pergunta",
			});
			if (result.value.question.attachments) {
				expect(result.value.question.attachments.currentItems).toHaveLength(2);
				expect(result.value.question.attachments.currentItems).toEqual([
					expect.objectContaining({
						attachmentId: new UniqueEntityId("attachment-1"),
					}),
					expect.objectContaining({
						attachmentId: new UniqueEntityId("attachment-3"),
					}),
				]);
			}
		}
	});

	it("should not be able to edit a question from another user", async () => {
		const newQuestion = makeQuestion(
			{
				authorId: new UniqueEntityId("author-1"),
				title: "Pergunta",
				content: "Conteúdo da pergunta original",
			},
			new UniqueEntityId("question-1"),
		);

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			questionId: newQuestion.id.toValue(),
			authorId: "author-2",
			title: "Nova pergunta",
			content: "Conteúdo da pergunta",
		});

		expect(result.isLeft).toBeTruthy();
		expect(result.value).toBeInstanceOf(Unauthorized);
	});
});

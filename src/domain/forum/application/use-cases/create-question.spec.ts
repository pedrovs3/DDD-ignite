import { UniqueEntityId } from "@/core/entities";
import { CreateQuestionUseCase } from "@domain/forum/application/use-cases/create-question";
import { InMemoryQuestionsAttachmentsRepository } from "@tests/repositories/in-memory-questions-attachments-repository";
import { InMemoryQuestionsRepository } from "tests/repositories/in-memory-questions-repository";
import { beforeEach, describe, expect } from "vitest";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionsAttachmentsRepository;
let sut: CreateQuestionUseCase;

describe("Create question", () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionsAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});

	it("should be able to create a question", async () => {
		const result = await sut.execute({
			authorId: "123",
			title: "Nova pergunta",
			content: "Uma pergunta qualquer",
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toHaveProperty("question");
		expect(inMemoryQuestionsRepository.items[0].id).toEqual(
			result.value.question.id,
		);
	});

	it("should be able to create a question with attachments", async () => {
		const result = await sut.execute({
			authorId: "123",
			title: "Nova pergunta",
			content: "Uma pergunta qualquer",
			attachmentsIds: ["1", "2"],
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toHaveProperty("question");
		if (result.isRight()) {
			expect(inMemoryQuestionsRepository.items[0].id).toEqual(
				result.value.question.id,
			);
			if (result.value.question.attachments) {
				expect(result.value.question.attachments.currentItems).toHaveLength(2);
				expect(result.value.question.attachments.currentItems).toEqual([
					expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
					expect.objectContaining({ attachmentId: new UniqueEntityId("2") }),
				]);
			}
		}
	});
});

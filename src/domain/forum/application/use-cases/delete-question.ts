import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError, Unauthorized } from "@/core/errors";
import { QuestionsRepository } from "@domain/forum/application/repositories/question.repository";

interface DeleteQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<
	ResourceNotFoundError | Unauthorized,
	object
>;

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({
		authorId,
		questionId,
	}: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question)
			return left(new ResourceNotFoundError({ fieldName: "question" }));

		if (question.authorId.toString() !== authorId)
			return left(new Unauthorized());

		await this.questionsRepository.delete(question);

		return right({});
	}
}

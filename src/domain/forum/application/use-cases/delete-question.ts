import {Either, left, right} from "@/core/either";
import {QuestionsRepository} from "@domain/forum/application/repositories/question.repository";
import {ResourceNotFoundError, Unauthorized} from "@/core/errors";

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

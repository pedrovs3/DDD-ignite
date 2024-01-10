import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found.error";
import { Unauthorized } from "@/core/errors/errors/unauthorized";
import { AnswerRepository } from "@domain/forum/application/repositories";

interface DeleteAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
	ResourceNotFoundError | Unauthorized,
	object
>;

export class DeleteAnswerUseCase {
	constructor(private answerRepository: AnswerRepository) {}

	async execute({
		authorId,
		answerId,
	}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answerRepository.findById(answerId);

		if (!answer)
			return left(new ResourceNotFoundError({ fieldName: "Answer" }));

		if (answer.authorId.toString() !== authorId)
			return left(new Unauthorized());

		await this.answerRepository.delete(answer);

		return right({});
	}
}

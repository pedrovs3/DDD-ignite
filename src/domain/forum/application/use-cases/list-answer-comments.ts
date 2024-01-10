import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "@domain/forum/application/repositories";
import { ResourceNotFoundError } from "@domain/forum/application/use-cases/errors/resource-not-found.error";
import { AnswerComment } from "@domain/forum/enterprise/entities";

interface ListAnswerCommentsUseCaseRequest {
	answerId: string;
	page: number;
	limit?: number;
}

type ListAnswerCommentsUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		answerComments: AnswerComment[];
	}
>;

export class ListAnswerCommentsUseCase {
	constructor(private AnswerCommentsRepository: AnswerCommentsRepository) {}

	async execute({
		answerId,
		page,
		limit,
	}: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
		const answerComments =
			await this.AnswerCommentsRepository.findAllByAnswerId(answerId, {
				page,
				limit,
			});

		if (!answerComments)
			return left(new ResourceNotFoundError({ fieldName: "answerComments" }));

		return right({
			answerComments,
		});
	}
}

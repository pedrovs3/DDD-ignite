import { Either, left, right } from "@/core/either";
import { QuestionsCommentsRepository } from "@domain/forum/application/repositories";
import { ResourceNotFoundError } from "@domain/forum/application/use-cases/errors/resource-not-found.error";
import { QuestionComment } from "@domain/forum/enterprise/entities";

interface ListQuestionCommentsUseCaseRequest {
	questionId: string;
	page: number;
	limit?: number;
}

type ListQuestionCommentsUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		questionComments: QuestionComment[];
	}
>;

export class ListQuestionCommentsUseCase {
	constructor(
		private questionCommentsRepository: QuestionsCommentsRepository,
	) {}

	async execute({
		questionId,
		page,
		limit,
	}: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
		const questionComments =
			await this.questionCommentsRepository.findAllByQuestionId(questionId, {
				page,
				limit,
			});

		if (!questionComments)
			return left(new ResourceNotFoundError({ fieldName: "questionComments" }));

		return right({
			questionComments,
		});
	}
}

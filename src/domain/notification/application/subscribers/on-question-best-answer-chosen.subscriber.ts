import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { AnswerRepository } from "@domain/forum/application/repositories";
import { QuestionBestAnswerChosenEvent } from "@domain/forum/enterprise/events/question-best-answer-chosen-event";
import { SendNotificationUseCase } from "@domain/notification/application/use-cases/send-notification";

export class OnQuestionBestAnswerChosenSubscriber implements EventHandler {
	constructor(
		private answerRepository: AnswerRepository,
		private sendNotification: SendNotificationUseCase,
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendQuestionBestAnswerNotification.bind(this),
			QuestionBestAnswerChosenEvent.name,
		);
	}

	private async sendQuestionBestAnswerNotification({
		question,
		bestAnswerId,
	}: QuestionBestAnswerChosenEvent): Promise<void> {
		const answer = await this.answerRepository.findById(
			bestAnswerId.toString(),
		);

		if (!answer) return;

		await this.sendNotification.execute({
			receiverId: question.authorId.toString(),
			link: `/forum/questions/${question.id}`,
			title: "Your answer has been chosen as the best answer!",
			message: `Your answer to the question "${question.title
				.substring(0, 20)
				.concat("...")}" has been chosen as the best answer by the autor!`,
		});
	}
}

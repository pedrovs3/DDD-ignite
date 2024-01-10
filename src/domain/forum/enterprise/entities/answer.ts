import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { AnswerAttachmentList } from "@domain/forum/enterprise/entities/answer-attachment-list";
import { CreatedAnswerEvent } from "@domain/forum/enterprise/events";

export interface AnswerProps {
	attachments?: AnswerAttachmentList;
	questionId: UniqueEntityId;
	authorId: UniqueEntityId;
	content: string;
	createdAt: Date;
	updatedAt?: Date;
}

export class Answer extends AggregateRoot<AnswerProps> {
	get content(): string {
		return this.props.content;
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	set attachments(attachments: AnswerAttachmentList) {
		this.props.attachments = attachments;
		this.touch();
	}

	get excerpt(): string {
		return this.props.content.substring(0, 120).trim().concat("...");
	}

	get questionId(): UniqueEntityId {
		return this.props.questionId;
	}

	get authorId(): UniqueEntityId {
		return this.props.authorId;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date | undefined {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<AnswerProps, "createdAt">,
		id?: UniqueEntityId,
	): Answer {
		const isNewAnswer = !id;
		const answer = new Answer(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		if (isNewAnswer) {
			answer.addDomainEvent(new CreatedAnswerEvent(answer));
		}

		return answer;
	}

	private touch(): void {
		this.props.updatedAt = new Date();
	}
}

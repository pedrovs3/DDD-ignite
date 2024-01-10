import { Entity, UniqueEntityId } from "@/core/entities";

export interface QuestionAttachmentProps {
	questionId: UniqueEntityId;
	attachmentId: UniqueEntityId;
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
	get questionId(): UniqueEntityId {
		return this.props.questionId;
	}

	get attachmentId(): UniqueEntityId {
		return this.props.attachmentId;
	}

	static create(
		props: QuestionAttachmentProps,
		id?: UniqueEntityId,
	): QuestionAttachment {
		return new QuestionAttachment(props, id);
	}
}

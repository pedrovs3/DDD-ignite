import { Entity, UniqueEntityId } from "@/core/entities";

export interface AnswerAttachmentProps {
	answerId: UniqueEntityId;
	attachmentId: UniqueEntityId;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
	get answerId(): UniqueEntityId {
		return this.props.answerId;
	}

	get attachmentId(): UniqueEntityId {
		return this.props.attachmentId;
	}

	static create(
		props: AnswerAttachmentProps,
		id?: UniqueEntityId,
	): AnswerAttachment {
		return new AnswerAttachment(props, id);
	}
}

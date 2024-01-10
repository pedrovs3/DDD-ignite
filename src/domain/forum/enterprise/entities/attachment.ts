import { Entity, UniqueEntityId } from "@/core/entities";

interface AttachmentProps {
	title: string;
	link: string;
	parentId: UniqueEntityId;
	parentType: "answer" | "question";
}

export class Attachment extends Entity<AttachmentProps> {
	get title(): string {
		return this.props.title;
	}

	get link(): string {
		return this.props.link;
	}

	static create(props: AttachmentProps, id?: UniqueEntityId): Attachment {
		return new Attachment(props, id);
	}
}

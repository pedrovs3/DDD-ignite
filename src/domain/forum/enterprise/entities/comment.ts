import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface CommentProps {
	authorId: UniqueEntityId;
	content: string;
	createdAt: Date;
	updatedAt?: Date | undefined;
}

export abstract class Comment<
	Props extends CommentProps,
> extends Entity<Props> {
	get content(): string {
		return this.props.content;
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
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

	private touch(): void {
		this.props.updatedAt = new Date();
	}
}

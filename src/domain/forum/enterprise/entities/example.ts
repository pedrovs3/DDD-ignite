import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface ExampleProps {
	name: string;
}

export class Example extends Entity<ExampleProps> {
	static create(props: ExampleProps, id?: UniqueEntityId): Example {
		return new Example(props, id);
	}
}

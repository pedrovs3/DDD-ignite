import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export class Entity<Props> {
	protected props: Props;

	private readonly _id: UniqueEntityId;

	protected constructor(props: any, id?: UniqueEntityId) {
		this.props = props;
		this._id = id ?? new UniqueEntityId();
	}

	get id(): UniqueEntityId {
		return this._id;
	}

	public equals(object: Entity<Props>): boolean {
		if (object == null) {
			return false;
		}

		if (this === object) {
			return true;
		}

		if (!this.isEntity(object)) {
			return false;
		}

		return this.id.equals(object.id);
	}

	private isEntity(v: any): v is Entity<Props> {
		return v instanceof Entity;
	}
}

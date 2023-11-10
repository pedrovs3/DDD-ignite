import { UniqueEntityId } from '@/core/entities/unique-entity-id';

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
}

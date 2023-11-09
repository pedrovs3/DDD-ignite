import { UniqueEntityId } from '../../entities/value-objects/unique-entity-id';

export class Entity<Props> {
  protected props: Props;

  private readonly _id: UniqueEntityId;

  constructor(props: any, id?: string) {
    this.props = props;
    this._id = new UniqueEntityId(id);
  }

  get id(): UniqueEntityId {
    return this._id;
  }
}

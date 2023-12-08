import { randomUUID } from 'node:crypto';

export class UniqueEntityId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  toString(): string {
    return this.value;
  }

  toValue(): string {
    return this.value;
  }

  equals(id?: UniqueEntityId): boolean {
    if (id == null) {
      return false;
    }

    if (this === id) {
      return true;
    }

    return this.value === id.value;
  }
}

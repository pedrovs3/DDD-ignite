import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from './value-objects/unique-entity-id';

interface StudentProps {
  name: string;
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityId): Student {
    const student = new Student(props, id);

    return student;
  }
}

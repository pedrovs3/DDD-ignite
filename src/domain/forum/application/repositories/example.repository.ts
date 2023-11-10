import { Example } from '@/domain/forum/enterprise/entities/example';

export interface ExampleRepository {
  create: (example: Example) => Promise<void>;
}

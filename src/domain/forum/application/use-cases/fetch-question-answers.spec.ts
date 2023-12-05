import {InMemoryQuestionsRepository} from 'tests/repositories/in-memory-questions-repository';
import {FetchRecentQuestionsUseCase} from '@domain/forum/application/use-cases/fetch-recent-questions';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe('Fetch question answers', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  // TODO: Add test cases
});

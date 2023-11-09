import { randomUUID } from 'node:crypto';

interface AnswerProps {
  content: string;
  questionId: string;
  authorId: string;
}

export class Answer {
  public id: string;

  public content: string;

  public questionId: string;

  public authorId: string;

  constructor({ authorId, content, questionId }: AnswerProps, id?: string) {
    this.id = id ?? randomUUID();
    this.content = content;
    this.questionId = questionId;
    this.authorId = authorId;
  }
}

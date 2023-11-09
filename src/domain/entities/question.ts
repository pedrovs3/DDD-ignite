import { randomUUID } from 'node:crypto';

interface QuestionProps {
  title: string;
  content: string;
  authorId: string;
}

export class Question {
  public id: string;

  public title: string;

  public content: string;

  public authorId: string;

  constructor({ authorId, content, title }: QuestionProps, id?: string) {
    this.authorId = authorId;
    this.title = title;
    this.content = content;
    this.id = id ?? randomUUID();
  }
}

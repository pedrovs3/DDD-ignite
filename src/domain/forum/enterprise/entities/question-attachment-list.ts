import { QuestionAttachment } from '@domain/forum/enterprise/entities/question-attachment';
import { WatchedList } from '@/core/entities/watched-list';

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId === b.attachmentId;
  }
}

export class Slug {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  /**
   * Receives a text and converts it to a slug normalized string.
   *
   * Example:
   * "An example title" -> "an-example-title"
   *
   * @param text { string }The text to be converted to a slug.
   *
   */
  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/\[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '');

    return new Slug(slugText);
  }

  static create(slug: string) {
    return new Slug(slug);
  }
}

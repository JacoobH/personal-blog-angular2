export class Article {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public views: number,
    public releaseTime: string,
  ) { }
}

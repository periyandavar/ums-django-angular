export class Stream {
  constructor(
    public id: number,
    public value: string,
    public status: boolean,
    public courses?: any[]
  ) {}
}

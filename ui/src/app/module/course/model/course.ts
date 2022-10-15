import { Stream } from '../../stream/model/stream';
export class Course {
  constructor(
    public id: number,
    public value: string,
    public status: boolean,
    public streams: Stream[]
  ) {}
}

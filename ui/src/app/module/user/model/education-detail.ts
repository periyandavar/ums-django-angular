import { Stream } from '../../stream/model/stream';
import { Course } from '../../course/model/course';
export class EducationDetail {
  constructor(
    public id: number,
    public institution: string,
    public institutionAddress: string,
    public percentage: number,
    public course: Course,
    public stream: Stream,
    public passout: number
  ) {}
}

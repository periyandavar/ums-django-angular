export class ResponseData<T> {
  public constructor(public error: boolean, public result: T, public id?:number) {}
}

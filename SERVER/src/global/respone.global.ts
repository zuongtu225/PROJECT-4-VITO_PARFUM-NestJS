export class Response<D> {
  data: D | D[];
  status: boolean;
  message: string;

  constructor(data: D | D[], status: boolean, message: string) {
    this.data = data;
    this.status = status;
    this.message = message;
  }
}

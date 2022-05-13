export class LocalError implements Error {
  constructor(
    public status: number,
    public name: string,
    public message: string
  ) {}
}

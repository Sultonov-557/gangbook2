import { Pagination } from '../util/Pagination';

export class ApiResponse {
  public success: boolean;
  public status: number;
  public data: any;
  public error: string;
  public date: Date = new Date();
  public pagination: Pagination | any;
  constructor(
    success: boolean,
    status: number,
    data?: any,
    pagination?: Pagination,
    error?: string,
    date: Date = new Date(),
  ) {
    this.success = success;
    this.status = status;
    this.data = data;
    this.error = error;
    this.date = date;
    this.pagination = pagination.simplify;
  }
}

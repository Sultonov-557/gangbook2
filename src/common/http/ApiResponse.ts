import { Ipagination } from '../interface/pagination.interface';
import { Pagination } from '../util/Pagination';

export class ApiResponse {
  public data: any;
  public error: string;
  public date: Date = new Date();
  public pagination: Ipagination;
  constructor(
    data?: any,
    pagination?: Pagination,
    error?: string,
    date: Date = new Date(),
  ) {
    this.data = data || null;
    this.error = error || null;
    this.date = date;
    this.pagination = pagination?.simplify();
  }
}


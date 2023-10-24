import { Ipagination } from '../interface/pagination.interface';

export class Pagination {
  public totalItems: number;
  public limit: number;
  public currentPage: number;
  public pageCount: number;
  public offset: number;

  constructor(totalItems: number, limit: number = 10, currentPage: number = 1) {
    this.totalItems = totalItems;
    this.limit = limit;
    this.currentPage = +currentPage;
    this.pageCount = Math.ceil(this.totalItems / this.limit);
    this.offset = (this.currentPage - 1) * this.limit;
  }

  simplify(): Ipagination {
    const { currentPage, pageCount, limit } = this;
    return { currentPage, pageCount, limit };
  }
}

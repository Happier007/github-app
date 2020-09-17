// CORE
import { PAGE_PAGINATION_LAST, PER_PAGE_PAGINATION_LAST, SINCE_PAGINATION } from '@core/utils';
import { PaginationModel } from '@core/models';

export function getPaginationParams(responseHeaders: any, pagination: PaginationModel, sinceId: number): void {
  const nextPageLink = responseHeaders.get('link').match(SINCE_PAGINATION);

  pagination.prevPaginationId = !!pagination.nextPaginationId ? pagination.nextPaginationId : sinceId;
  pagination.nextPaginationId = nextPageLink.length ? nextPageLink[1] : pagination.nextPaginationId;
}

export function getLengthPagination(responseHeaders: any): number {
  const links = responseHeaders.get('link').split(', ');
  const paginationPage = links[links.length - 1].match(PAGE_PAGINATION_LAST);
  const paginationPageSize = links[links.length - 1].match(PER_PAGE_PAGINATION_LAST);

  return (paginationPage.length && paginationPageSize.length) ? paginationPage[1] * paginationPageSize[1] : 0;
}

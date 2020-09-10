// CORE
import { SINCE_PAGINATION } from '@core/utils';
import { PaginationModel } from '@core/models';

export function getPaginationParams(responseHeaders: any, pagination: PaginationModel, sinceId: number): void {
  const nextPageLink = responseHeaders.get('link').match(SINCE_PAGINATION);

  pagination.prevPaginationId = !!pagination.nextPaginationId ? pagination.nextPaginationId : sinceId;
  pagination.nextPaginationId = nextPageLink.length ? nextPageLink[1] : pagination.nextPaginationId;
}


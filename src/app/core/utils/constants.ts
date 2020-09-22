export const CAMEL_CASE = /_([a-z])/g;

export const SNAKE_CASE = /([A-Z])/g;

export const SINCE_PAGINATION = /since=(\d+)/;

export const PAGE_PAGINATION_LAST = /page=(\d+).+rel="last"/;
export const PER_PAGE_PAGINATION_LAST = /per_page=(\d+).+rel="last"/;

export const MESSAGE_TYPE = {
  error: 'error-snackbar',
  warning: 'warning-snackbar',
  success: 'success-snackbar',
  info: 'info-snackbar',
};

export const COUNT_GISTS = 3000;

export const COUNT_REPOS = 3000;

export const PAGE_SIZE_OPTIONS = [5, 10, 20];


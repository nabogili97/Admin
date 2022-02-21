/*
 * Copyright 2020 DevFast Limited. All rights reserved.
 * Email: tech@devfast.us .
 */

/**
 * List of number record in one page
 */
export const PAGE_SIZES = [20, 50, 100]

/**
 * Number record in one page
 */
export const PAGE_SIZE = 20

/**
 * Max number record return by api
 */
export const MAX_LIMIT_RECORD = 1000

/**
 * Minisecond
 */
export const MINISECOND = 1000

export const TIMEZONE = 'Asia/Tokyo'

/**
 * Sort type
 */
export const SORT_TYPE = {
  DESC: 0,
  ASC: 1
}

/**
 * Shortcut date picker
 */
export const SHORTCUTS_DATE_PICKER = [
  {
    text: 'short_date_picker.today',
    onClick () {
      const date = new Date()
      // return a Date
      return date
    }
  },
  {
    text: 'short_date_picker.yesterday',
    onClick () {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: 'short_date_picker.tomorrow',
    onClick () {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24)
      return date
    }
  }
]

/**
 * Option place holder for select box
 */
export const OPTION_PLACEHOLDER = [
  {
    label: 'common.option_please_select',
    value: ' '
  }
]

/**
 * Breadcrumb list
 */
export const BREAD_CRUMB_LIST = [
  {
    id: 1,
    name: 'breadcrumb.users',
    value: 'users'
  },
  {
    id: 2,
    name: 'breadcrumb.users-new',
    value: 'users-new'
  },
  {
    id: 1,
    name: 'breadcrumb.broadcasts',
    value: 'broadcasts'
  },
  {
    id: 2,
    name: 'breadcrumb.broadcasts-new',
    value: 'broadcasts-new'
  },
  {
    id: 3,
    name: 'breadcrumb.roles',
    value: 'roles'
  },
  {
    id: 4,
    name: 'breadcrumb.roles-new',
    value: 'roles-new'
  },
  {
    id: 5,
    name: 'breadcrumb.article',
    value: 'article'
  },
  {
    id: 6,
    name: 'breadcrumb.article-new',
    value: 'article-new'
  },
  {
    id: 7,
    name: 'breadcrumb.article_category',
    value: 'article-category'
  },
  {
    id: 8,
    name: 'breadcrumb.categories',
    value: 'categories'
  },
  {
    id: 9,
    name: 'breadcrumb.site',
    value: 'sites'
  }
]

/**
 * AI Article Type
 */
export const ARTICLE_TYPE = [
  {
    id: 0,
    name: 'article.type_.1'
  },
  {
    id: 1,
    name: 'article.type_.2'
  }
]

/**
* Article Status
*/
export const ARTICLE_STATUS = [
  {
    id: 1,
    name: 'article.status_.hidden'
  },
  {
    id: 2,
    name: 'article.status_.watting_classification'
  },
  {
    id: 3,
    name: 'article.status_.public'
  }
]
export const ARTICLE_STATUS_HIDDEN = 1
export const ARTICLE_STATUS_WAITTING = 2
export const ARTICLE_STATUS_PUBLIC = 3

/**
 * Status sites list
 */
export const SITE_LIST_STATUS = [
  {
    id: 0,
    name: 'site.noneActive'
  },
  {
    id: 1,
    name: 'site.active'
  }

]

/**
 * Time remember user login is 3 month
 *
 * d * h * p * s
 */
export const TIME_REMEMBER_USER_LOGIN = 90 * 24 * 60 * 60

/**
 * Time remember user login default is 15 minutine
 *
 * m * s
 */
export const TIME_REMEMBER_USER_LOGIN_DEFAULT = 15 * 60

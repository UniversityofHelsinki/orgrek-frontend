// Same as sv
import formatDistance from 'date-fns/locale/sv/_lib/formatDistance/index';
import formatRelative from 'date-fns/locale/sv/_lib/formatRelative/index';
import localize from 'date-fns/locale/sv/_lib/localize/index';
import match from 'date-fns/locale/sv/_lib/match/index';

// Unique for sv-FI
import formatLong from './_lib/formatLong/index';

/**
 * @type {Locale}
 * @category Locales
 * @summary Swedish locale (Finland).
 * @language Swedish
 * @iso-639-2 swe
 * @author Emmi Sulander [@emmicatharina]{@link https://github.com/emmicatharina}
 */
var locale = {
  code: 'sv-FI',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 1,
    /* Monday */
    firstWeekContainsDate: 4,
  },
};

export default locale;

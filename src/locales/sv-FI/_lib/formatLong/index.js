import buildFormatLongFn from 'date-fns/locale/_lib/buildFormatLongFn/index';

var dateFormats = {
  full: 'EEEE d MMMM y',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'd.M.y',
};
var timeFormats = {
  full: "'kl'. HH.mm.ss zzzz",
  long: 'HH.mm.ss z',
  medium: 'HH.mm.ss',
  short: 'HH.mm',
};
var dateTimeFormats = {
  full: "{{date}} 'kl.' {{time}}",
  long: "{{date}} 'kl.' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}',
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: 'full',
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: 'full',
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: 'full',
  }),
};
export default formatLong;

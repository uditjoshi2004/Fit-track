import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-I6BEJ4LF.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-ISK7HHCE.js";
import "./chunk-ZT5Z7H4T.js";
import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  KeyValueDiffers,
  NgModule,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  forwardRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction7,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6VQKWLJ7.js";
import "./chunk-776VBJZW.js";
import {
  D,
  FORMAT_DEFAULT,
  MILLISECONDS_A_MINUTE,
  MIN,
  MS,
  W,
  Y,
  esm_default
} from "./chunk-U7WWKNHV.js";
import {
  __name,
  __spreadValues
} from "./chunk-TK2CMIGJ.js";

// node_modules/dayjs/esm/plugin/localizedFormat/utils.js
var t = /* @__PURE__ */ __name(function t2(format) {
  return format.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(_, a, b) {
    return a || b.slice(1);
  });
}, "t");
var englishFormats = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
var u = /* @__PURE__ */ __name(function u2(formatStr, formats) {
  return formatStr.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(_, a, b) {
    var B = b && b.toUpperCase();
    return a || formats[b] || englishFormats[b] || t(formats[B]);
  });
}, "u");

// node_modules/dayjs/esm/plugin/localeData/index.js
var localeData_default = /* @__PURE__ */ __name((function(o, c, dayjs) {
  var proto = c.prototype;
  var getLocalePart3 = /* @__PURE__ */ __name(function getLocalePart4(part) {
    return part && (part.indexOf ? part : part.s);
  }, "getLocalePart");
  var getShort = /* @__PURE__ */ __name(function getShort2(ins, target, full, num, localeOrder) {
    var locale2 = ins.name ? ins : ins.$locale();
    var targetLocale = getLocalePart3(locale2[target]);
    var fullLocale = getLocalePart3(locale2[full]);
    var result = targetLocale || fullLocale.map(function(f) {
      return f.slice(0, num);
    });
    if (!localeOrder) return result;
    var weekStart = locale2.weekStart;
    return result.map(function(_, index) {
      return result[(index + (weekStart || 0)) % 7];
    });
  }, "getShort");
  var getDayjsLocaleObject = /* @__PURE__ */ __name(function getDayjsLocaleObject2() {
    return dayjs.Ls[dayjs.locale()];
  }, "getDayjsLocaleObject");
  var getLongDateFormat = /* @__PURE__ */ __name(function getLongDateFormat2(l, format) {
    return l.formats[format] || t(l.formats[format.toUpperCase()]);
  }, "getLongDateFormat");
  var localeData = /* @__PURE__ */ __name(function localeData2() {
    var _this = this;
    return {
      months: /* @__PURE__ */ __name(function months(instance) {
        return instance ? instance.format("MMMM") : getShort(_this, "months");
      }, "months"),
      monthsShort: /* @__PURE__ */ __name(function monthsShort(instance) {
        return instance ? instance.format("MMM") : getShort(_this, "monthsShort", "months", 3);
      }, "monthsShort"),
      firstDayOfWeek: /* @__PURE__ */ __name(function firstDayOfWeek() {
        return _this.$locale().weekStart || 0;
      }, "firstDayOfWeek"),
      weekdays: /* @__PURE__ */ __name(function weekdays(instance) {
        return instance ? instance.format("dddd") : getShort(_this, "weekdays");
      }, "weekdays"),
      weekdaysMin: /* @__PURE__ */ __name(function weekdaysMin(instance) {
        return instance ? instance.format("dd") : getShort(_this, "weekdaysMin", "weekdays", 2);
      }, "weekdaysMin"),
      weekdaysShort: /* @__PURE__ */ __name(function weekdaysShort(instance) {
        return instance ? instance.format("ddd") : getShort(_this, "weekdaysShort", "weekdays", 3);
      }, "weekdaysShort"),
      longDateFormat: /* @__PURE__ */ __name(function longDateFormat(format) {
        return getLongDateFormat(_this.$locale(), format);
      }, "longDateFormat"),
      meridiem: this.$locale().meridiem,
      ordinal: this.$locale().ordinal
    };
  }, "localeData");
  proto.localeData = function() {
    return localeData.bind(this)();
  };
  dayjs.localeData = function() {
    var localeObject = getDayjsLocaleObject();
    return {
      firstDayOfWeek: /* @__PURE__ */ __name(function firstDayOfWeek() {
        return localeObject.weekStart || 0;
      }, "firstDayOfWeek"),
      weekdays: /* @__PURE__ */ __name(function weekdays() {
        return dayjs.weekdays();
      }, "weekdays"),
      weekdaysShort: /* @__PURE__ */ __name(function weekdaysShort() {
        return dayjs.weekdaysShort();
      }, "weekdaysShort"),
      weekdaysMin: /* @__PURE__ */ __name(function weekdaysMin() {
        return dayjs.weekdaysMin();
      }, "weekdaysMin"),
      months: /* @__PURE__ */ __name(function months() {
        return dayjs.months();
      }, "months"),
      monthsShort: /* @__PURE__ */ __name(function monthsShort() {
        return dayjs.monthsShort();
      }, "monthsShort"),
      longDateFormat: /* @__PURE__ */ __name(function longDateFormat(format) {
        return getLongDateFormat(localeObject, format);
      }, "longDateFormat"),
      meridiem: localeObject.meridiem,
      ordinal: localeObject.ordinal
    };
  };
  dayjs.months = function() {
    return getShort(getDayjsLocaleObject(), "months");
  };
  dayjs.monthsShort = function() {
    return getShort(getDayjsLocaleObject(), "monthsShort", "months", 3);
  };
  dayjs.weekdays = function(localeOrder) {
    return getShort(getDayjsLocaleObject(), "weekdays", null, null, localeOrder);
  };
  dayjs.weekdaysShort = function(localeOrder) {
    return getShort(getDayjsLocaleObject(), "weekdaysShort", "weekdays", 3, localeOrder);
  };
  dayjs.weekdaysMin = function(localeOrder) {
    return getShort(getDayjsLocaleObject(), "weekdaysMin", "weekdays", 2, localeOrder);
  };
}), "default");

// node_modules/dayjs/esm/plugin/localizedFormat/index.js
var localizedFormat_default = /* @__PURE__ */ __name((function(o, c, d) {
  var proto = c.prototype;
  var oldFormat = proto.format;
  d.en.formats = englishFormats;
  proto.format = function(formatStr) {
    if (formatStr === void 0) {
      formatStr = FORMAT_DEFAULT;
    }
    var _this$$locale = this.$locale(), _this$$locale$formats = _this$$locale.formats, formats = _this$$locale$formats === void 0 ? {} : _this$$locale$formats;
    var result = u(formatStr, formats);
    return oldFormat.call(this, result);
  };
}), "default");

// node_modules/dayjs/esm/plugin/isoWeek/index.js
var isoWeekPrettyUnit = "isoweek";
var isoWeek_default = /* @__PURE__ */ __name((function(o, c, d) {
  var getYearFirstThursday = /* @__PURE__ */ __name(function getYearFirstThursday2(year, isUtc) {
    var yearFirstDay = (isUtc ? d.utc : d)().year(year).startOf(Y);
    var addDiffDays = 4 - yearFirstDay.isoWeekday();
    if (yearFirstDay.isoWeekday() > 4) {
      addDiffDays += 7;
    }
    return yearFirstDay.add(addDiffDays, D);
  }, "getYearFirstThursday");
  var getCurrentWeekThursday = /* @__PURE__ */ __name(function getCurrentWeekThursday2(ins) {
    return ins.add(4 - ins.isoWeekday(), D);
  }, "getCurrentWeekThursday");
  var proto = c.prototype;
  proto.isoWeekYear = function() {
    var nowWeekThursday = getCurrentWeekThursday(this);
    return nowWeekThursday.year();
  };
  proto.isoWeek = function(week) {
    if (!this.$utils().u(week)) {
      return this.add((week - this.isoWeek()) * 7, D);
    }
    var nowWeekThursday = getCurrentWeekThursday(this);
    var diffWeekThursday = getYearFirstThursday(this.isoWeekYear(), this.$u);
    return nowWeekThursday.diff(diffWeekThursday, W) + 1;
  };
  proto.isoWeekday = function(week) {
    if (!this.$utils().u(week)) {
      return this.day(this.day() % 7 ? week : week - 7);
    }
    return this.day() || 7;
  };
  var oldStartOf = proto.startOf;
  proto.startOf = function(units, startOf) {
    var utils = this.$utils();
    var isStartOf = !utils.u(startOf) ? startOf : true;
    var unit = utils.p(units);
    if (unit === isoWeekPrettyUnit) {
      return isStartOf ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day");
    }
    return oldStartOf.bind(this)(units, startOf);
  };
}), "default");

// node_modules/dayjs/esm/plugin/weekOfYear/index.js
var weekOfYear_default = /* @__PURE__ */ __name((function(o, c, d) {
  var proto = c.prototype;
  proto.week = function(week) {
    if (week === void 0) {
      week = null;
    }
    if (week !== null) {
      return this.add((week - this.week()) * 7, D);
    }
    var yearStart = this.$locale().yearStart || 1;
    if (this.month() === 11 && this.date() > 25) {
      var nextYearStartDay = d(this).startOf(Y).add(1, Y).date(yearStart);
      var thisEndOfWeek = d(this).endOf(W);
      if (nextYearStartDay.isBefore(thisEndOfWeek)) {
        return 1;
      }
    }
    var yearStartDay = d(this).startOf(Y).date(yearStart);
    var yearStartWeek = yearStartDay.startOf(W).subtract(1, MS);
    var diffInWeek = this.diff(yearStartWeek, W, true);
    if (diffInWeek < 0) {
      return d(this).startOf("week").week();
    }
    return Math.ceil(diffInWeek);
  };
  proto.weeks = function(week) {
    if (week === void 0) {
      week = null;
    }
    return this.week(week);
  };
}), "default");

// node_modules/dayjs/esm/plugin/customParseFormat/index.js
var formattingTokens = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g;
var match1 = /\d/;
var match2 = /\d\d/;
var match3 = /\d{3}/;
var match4 = /\d{4}/;
var match1to2 = /\d\d?/;
var matchSigned = /[+-]?\d+/;
var matchOffset = /[+-]\d\d:?(\d\d)?|Z/;
var matchWord = /\d*[^-_:/,()\s\d]+/;
var locale = {};
var parseTwoDigitYear = /* @__PURE__ */ __name(function parseTwoDigitYear2(input) {
  input = +input;
  return input + (input > 68 ? 1900 : 2e3);
}, "parseTwoDigitYear");
function offsetFromString(string) {
  if (!string) return 0;
  if (string === "Z") return 0;
  var parts = string.match(/([+-]|\d\d)/g);
  var minutes = +(parts[1] * 60) + (+parts[2] || 0);
  return minutes === 0 ? 0 : parts[0] === "+" ? -minutes : minutes;
}
__name(offsetFromString, "offsetFromString");
var addInput = /* @__PURE__ */ __name(function addInput2(property) {
  return function(input) {
    this[property] = +input;
  };
}, "addInput");
var zoneExpressions = [matchOffset, function(input) {
  var zone = this.zone || (this.zone = {});
  zone.offset = offsetFromString(input);
}];
var getLocalePart = /* @__PURE__ */ __name(function getLocalePart2(name) {
  var part = locale[name];
  return part && (part.indexOf ? part : part.s.concat(part.f));
}, "getLocalePart");
var meridiemMatch = /* @__PURE__ */ __name(function meridiemMatch2(input, isLowerCase) {
  var isAfternoon;
  var _locale = locale, meridiem = _locale.meridiem;
  if (!meridiem) {
    isAfternoon = input === (isLowerCase ? "pm" : "PM");
  } else {
    for (var i = 1; i <= 24; i += 1) {
      if (input.indexOf(meridiem(i, 0, isLowerCase)) > -1) {
        isAfternoon = i > 12;
        break;
      }
    }
  }
  return isAfternoon;
}, "meridiemMatch");
var expressions = {
  A: [matchWord, function(input) {
    this.afternoon = meridiemMatch(input, false);
  }],
  a: [matchWord, function(input) {
    this.afternoon = meridiemMatch(input, true);
  }],
  Q: [match1, function(input) {
    this.month = (input - 1) * 3 + 1;
  }],
  S: [match1, function(input) {
    this.milliseconds = +input * 100;
  }],
  SS: [match2, function(input) {
    this.milliseconds = +input * 10;
  }],
  SSS: [match3, function(input) {
    this.milliseconds = +input;
  }],
  s: [match1to2, addInput("seconds")],
  ss: [match1to2, addInput("seconds")],
  m: [match1to2, addInput("minutes")],
  mm: [match1to2, addInput("minutes")],
  H: [match1to2, addInput("hours")],
  h: [match1to2, addInput("hours")],
  HH: [match1to2, addInput("hours")],
  hh: [match1to2, addInput("hours")],
  D: [match1to2, addInput("day")],
  DD: [match2, addInput("day")],
  Do: [matchWord, function(input) {
    var _locale2 = locale, ordinal = _locale2.ordinal;
    var _input$match = input.match(/\d+/);
    this.day = _input$match[0];
    if (!ordinal) return;
    for (var i = 1; i <= 31; i += 1) {
      if (ordinal(i).replace(/\[|\]/g, "") === input) {
        this.day = i;
      }
    }
  }],
  w: [match1to2, addInput("week")],
  ww: [match2, addInput("week")],
  M: [match1to2, addInput("month")],
  MM: [match2, addInput("month")],
  MMM: [matchWord, function(input) {
    var months = getLocalePart("months");
    var monthsShort = getLocalePart("monthsShort");
    var matchIndex = (monthsShort || months.map(function(_) {
      return _.slice(0, 3);
    })).indexOf(input) + 1;
    if (matchIndex < 1) {
      throw new Error();
    }
    this.month = matchIndex % 12 || matchIndex;
  }],
  MMMM: [matchWord, function(input) {
    var months = getLocalePart("months");
    var matchIndex = months.indexOf(input) + 1;
    if (matchIndex < 1) {
      throw new Error();
    }
    this.month = matchIndex % 12 || matchIndex;
  }],
  Y: [matchSigned, addInput("year")],
  YY: [match2, function(input) {
    this.year = parseTwoDigitYear(input);
  }],
  YYYY: [match4, addInput("year")],
  Z: zoneExpressions,
  ZZ: zoneExpressions
};
function correctHours(time) {
  var afternoon = time.afternoon;
  if (afternoon !== void 0) {
    var hours = time.hours;
    if (afternoon) {
      if (hours < 12) {
        time.hours += 12;
      }
    } else if (hours === 12) {
      time.hours = 0;
    }
    delete time.afternoon;
  }
}
__name(correctHours, "correctHours");
function makeParser(format) {
  format = u(format, locale && locale.formats);
  var array = format.match(formattingTokens);
  var length = array.length;
  for (var i = 0; i < length; i += 1) {
    var token = array[i];
    var parseTo = expressions[token];
    var regex = parseTo && parseTo[0];
    var parser = parseTo && parseTo[1];
    if (parser) {
      array[i] = {
        regex,
        parser
      };
    } else {
      array[i] = token.replace(/^\[|\]$/g, "");
    }
  }
  return function(input) {
    var time = {};
    for (var _i = 0, start = 0; _i < length; _i += 1) {
      var _token = array[_i];
      if (typeof _token === "string") {
        start += _token.length;
      } else {
        var _regex = _token.regex, _parser = _token.parser;
        var part = input.slice(start);
        var match = _regex.exec(part);
        var value = match[0];
        _parser.call(time, value);
        input = input.replace(value, "");
      }
    }
    correctHours(time);
    return time;
  };
}
__name(makeParser, "makeParser");
var parseFormattedInput = /* @__PURE__ */ __name(function parseFormattedInput2(input, format, utc, dayjs) {
  try {
    if (["x", "X"].indexOf(format) > -1) return new Date((format === "X" ? 1e3 : 1) * input);
    var parser = makeParser(format);
    var _parser2 = parser(input), year = _parser2.year, month = _parser2.month, day = _parser2.day, hours = _parser2.hours, minutes = _parser2.minutes, seconds = _parser2.seconds, milliseconds = _parser2.milliseconds, zone = _parser2.zone, week = _parser2.week;
    var now = /* @__PURE__ */ new Date();
    var d = day || (!year && !month ? now.getDate() : 1);
    var y = year || now.getFullYear();
    var M = 0;
    if (!(year && !month)) {
      M = month > 0 ? month - 1 : now.getMonth();
    }
    var h = hours || 0;
    var m = minutes || 0;
    var s = seconds || 0;
    var ms = milliseconds || 0;
    if (zone) {
      return new Date(Date.UTC(y, M, d, h, m, s, ms + zone.offset * 60 * 1e3));
    }
    if (utc) {
      return new Date(Date.UTC(y, M, d, h, m, s, ms));
    }
    var newDate;
    newDate = new Date(y, M, d, h, m, s, ms);
    if (week) {
      newDate = dayjs(newDate).week(week).toDate();
    }
    return newDate;
  } catch (e) {
    return /* @__PURE__ */ new Date("");
  }
}, "parseFormattedInput");
var customParseFormat_default = /* @__PURE__ */ __name((function(o, C, d) {
  d.p.customParseFormat = true;
  if (o && o.parseTwoDigitYear) {
    parseTwoDigitYear = o.parseTwoDigitYear;
  }
  var proto = C.prototype;
  var oldParse = proto.parse;
  proto.parse = function(cfg) {
    var date = cfg.date, utc = cfg.utc, args = cfg.args;
    this.$u = utc;
    var format = args[1];
    if (typeof format === "string") {
      var isStrictWithoutLocale = args[2] === true;
      var isStrictWithLocale = args[3] === true;
      var isStrict = isStrictWithoutLocale || isStrictWithLocale;
      var pl = args[2];
      if (isStrictWithLocale) {
        pl = args[2];
      }
      locale = this.$locale();
      if (!isStrictWithoutLocale && pl) {
        locale = d.Ls[pl];
      }
      this.$d = parseFormattedInput(date, format, utc, d);
      this.init();
      if (pl && pl !== true) this.$L = this.locale(pl).$L;
      if (isStrict && date != this.format(format)) {
        this.$d = /* @__PURE__ */ new Date("");
      }
      locale = {};
    } else if (format instanceof Array) {
      var len = format.length;
      for (var i = 1; i <= len; i += 1) {
        args[1] = format[i - 1];
        var result = d.apply(this, args);
        if (result.isValid()) {
          this.$d = result.$d;
          this.$L = result.$L;
          this.init();
          break;
        }
        if (i === len) this.$d = /* @__PURE__ */ new Date("");
      }
    } else {
      oldParse.call(this, cfg);
    }
  };
}), "default");

// node_modules/dayjs/esm/plugin/utc/index.js
var REGEX_VALID_OFFSET_FORMAT = /[+-]\d\d(?::?\d\d)?/g;
var REGEX_OFFSET_HOURS_MINUTES_FORMAT = /([+-]|\d\d)/g;
function offsetFromString2(value) {
  if (value === void 0) {
    value = "";
  }
  var offset = value.match(REGEX_VALID_OFFSET_FORMAT);
  if (!offset) {
    return null;
  }
  var _ref = ("" + offset[0]).match(REGEX_OFFSET_HOURS_MINUTES_FORMAT) || ["-", 0, 0], indicator = _ref[0], hoursOffset = _ref[1], minutesOffset = _ref[2];
  var totalOffsetInMinutes = +hoursOffset * 60 + +minutesOffset;
  if (totalOffsetInMinutes === 0) {
    return 0;
  }
  return indicator === "+" ? totalOffsetInMinutes : -totalOffsetInMinutes;
}
__name(offsetFromString2, "offsetFromString");
var utc_default = /* @__PURE__ */ __name((function(option, Dayjs, dayjs) {
  var proto = Dayjs.prototype;
  dayjs.utc = function(date) {
    var cfg = {
      date,
      utc: true,
      args: arguments
    };
    return new Dayjs(cfg);
  };
  proto.utc = function(keepLocalTime) {
    var ins = dayjs(this.toDate(), {
      locale: this.$L,
      utc: true
    });
    if (keepLocalTime) {
      return ins.add(this.utcOffset(), MIN);
    }
    return ins;
  };
  proto.local = function() {
    return dayjs(this.toDate(), {
      locale: this.$L,
      utc: false
    });
  };
  var oldParse = proto.parse;
  proto.parse = function(cfg) {
    if (cfg.utc) {
      this.$u = true;
    }
    if (!this.$utils().u(cfg.$offset)) {
      this.$offset = cfg.$offset;
    }
    oldParse.call(this, cfg);
  };
  var oldInit = proto.init;
  proto.init = function() {
    if (this.$u) {
      var $d = this.$d;
      this.$y = $d.getUTCFullYear();
      this.$M = $d.getUTCMonth();
      this.$D = $d.getUTCDate();
      this.$W = $d.getUTCDay();
      this.$H = $d.getUTCHours();
      this.$m = $d.getUTCMinutes();
      this.$s = $d.getUTCSeconds();
      this.$ms = $d.getUTCMilliseconds();
    } else {
      oldInit.call(this);
    }
  };
  var oldUtcOffset = proto.utcOffset;
  proto.utcOffset = function(input, keepLocalTime) {
    var _this$$utils = this.$utils(), u3 = _this$$utils.u;
    if (u3(input)) {
      if (this.$u) {
        return 0;
      }
      if (!u3(this.$offset)) {
        return this.$offset;
      }
      return oldUtcOffset.call(this);
    }
    if (typeof input === "string") {
      input = offsetFromString2(input);
      if (input === null) {
        return this;
      }
    }
    var offset = Math.abs(input) <= 16 ? input * 60 : input;
    if (offset === 0) {
      return this.utc(keepLocalTime);
    }
    var ins = this.clone();
    if (keepLocalTime) {
      ins.$offset = offset;
      ins.$u = false;
      return ins;
    }
    var localTimezoneOffset = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
    ins = this.local().add(offset + localTimezoneOffset, MIN);
    ins.$offset = offset;
    ins.$x.$localOffset = localTimezoneOffset;
    return ins;
  };
  var oldFormat = proto.format;
  var UTC_FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ss[Z]";
  proto.format = function(formatStr) {
    var str = formatStr || (this.$u ? UTC_FORMAT_DEFAULT : "");
    return oldFormat.call(this, str);
  };
  proto.valueOf = function() {
    var addedOffset = !this.$utils().u(this.$offset) ? this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset()) : 0;
    return this.$d.valueOf() - addedOffset * MILLISECONDS_A_MINUTE;
  };
  proto.isUTC = function() {
    return !!this.$u;
  };
  proto.toISOString = function() {
    return this.toDate().toISOString();
  };
  proto.toString = function() {
    return this.toDate().toUTCString();
  };
  var oldToDate = proto.toDate;
  proto.toDate = function(type) {
    if (type === "s" && this.$offset) {
      return dayjs(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate();
    }
    return oldToDate.call(this);
  };
  var oldDiff = proto.diff;
  proto.diff = function(input, units, _float) {
    if (input && this.$u === input.$u) {
      return oldDiff.call(this, input, units, _float);
    }
    var localThis = this.local();
    var localInput = dayjs(input).local();
    return oldDiff.call(localThis, localInput, units, _float);
  };
}), "default");

// node_modules/ngx-daterangepicker-material/fesm2020/ngx-daterangepicker-material.mjs
var _c0 = ["pickerContainer"];
var _c1 = /* @__PURE__ */ __name((a0, a1, a2, a3, a4, a5, a6) => ({
  ltr: a0,
  rtl: a1,
  shown: a2,
  hidden: a3,
  inline: a4,
  double: a5,
  "show-ranges": a6
}), "_c1");
var _c2 = /* @__PURE__ */ __name((a0) => ({
  active: a0
}), "_c2");
var _c3 = /* @__PURE__ */ __name((a0, a1) => ({
  right: a0,
  left: a1
}), "_c3");
function DaterangepickerComponent_ng_container_2_li_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li")(1, "button", 8);
    ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerComponent_ng_container_2_li_3_Template_button_click_1_listener($event) {
      const range_r2 = ɵɵrestoreView(_r1).$implicit;
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.clickRange($event, range_r2));
    }, "DaterangepickerComponent_ng_container_2_li_3_Template_button_click_1_listener"));
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const range_r2 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r2.disableRange(range_r2))("ngClass", ɵɵpureFunction1(3, _c2, range_r2 === ctx_r2.chosenRange));
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", range_r2, " ");
  }
}
__name(DaterangepickerComponent_ng_container_2_li_3_Template, "DaterangepickerComponent_ng_container_2_li_3_Template");
function DaterangepickerComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 6)(2, "ul");
    ɵɵtemplate(3, DaterangepickerComponent_ng_container_2_li_3_Template, 3, 5, "li", 7);
    ɵɵelementEnd()();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵproperty("ngForOf", ctx_r2.rangesArray);
  }
}
__name(DaterangepickerComponent_ng_container_2_Template, "DaterangepickerComponent_ng_container_2_Template");
function DaterangepickerComponent_div_3_table_2_th_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "th");
  }
}
__name(DaterangepickerComponent_div_3_table_2_th_3_Template, "DaterangepickerComponent_div_3_table_2_th_3_Template");
function DaterangepickerComponent_div_3_table_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "th", 19);
    ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_table_2_ng_container_4_Template_th_click_1_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.clickPrev(ctx_r2.sideEnum.left));
    }, "DaterangepickerComponent_div_3_table_2_ng_container_4_Template_th_click_1_listener"));
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
}
__name(DaterangepickerComponent_div_3_table_2_ng_container_4_Template, "DaterangepickerComponent_div_3_table_2_ng_container_4_Template");
function DaterangepickerComponent_div_3_table_2_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "th");
    ɵɵelementContainerEnd();
  }
}
__name(DaterangepickerComponent_div_3_table_2_ng_container_5_Template, "DaterangepickerComponent_div_3_table_2_ng_container_5_Template");
function DaterangepickerComponent_div_3_table_2_ng_container_7_option_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "option", 25);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const m_r6 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵproperty("disabled", ctx_r2.calendarVariables.left.dropdowns.inMinYear && m_r6 < ctx_r2.calendarVariables.left.minDate.month() || ctx_r2.calendarVariables.left.dropdowns.inMaxYear && m_r6 > ctx_r2.calendarVariables.left.maxDate.month())("value", m_r6)("selected", ctx_r2.calendarVariables.left.dropdowns.currentMonth === m_r6);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r2.locale.monthNames[m_r6], " ");
  }
}
__name(DaterangepickerComponent_div_3_table_2_ng_container_7_option_4_Template, "DaterangepickerComponent_div_3_table_2_ng_container_7_option_4_Template");
function DaterangepickerComponent_div_3_table_2_ng_container_7_option_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "option", 26);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const y_r7 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵproperty("selected", y_r7 === ctx_r2.calendarVariables.left.dropdowns.currentYear);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", y_r7, " ");
  }
}
__name(DaterangepickerComponent_div_3_table_2_ng_container_7_option_8_Template, "DaterangepickerComponent_div_3_table_2_ng_container_7_option_8_Template");
function DaterangepickerComponent_div_3_table_2_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 20);
    ɵɵtext(2);
    ɵɵelementStart(3, "select", 21);
    ɵɵlistener("change", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_table_2_ng_container_7_Template_select_change_3_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.monthChanged($event, ctx_r2.sideEnum.left));
    }, "DaterangepickerComponent_div_3_table_2_ng_container_7_Template_select_change_3_listener"));
    ɵɵtemplate(4, DaterangepickerComponent_div_3_table_2_ng_container_7_option_4_Template, 2, 4, "option", 22);
    ɵɵelementEnd()();
    ɵɵelementStart(5, "div", 20);
    ɵɵtext(6);
    ɵɵelementStart(7, "select", 23);
    ɵɵlistener("change", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_table_2_ng_container_7_Template_select_change_7_listener($event) {
      ɵɵrestoreView(_r5);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.yearChanged($event, ctx_r2.sideEnum.left));
    }, "DaterangepickerComponent_div_3_table_2_ng_container_7_Template_select_change_7_listener"));
    ɵɵtemplate(8, DaterangepickerComponent_div_3_table_2_ng_container_7_option_8_Template, 2, 2, "option", 24);
    ɵɵelementEnd()();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ctx_r2.locale.monthNames[ctx_r2.calendarVariables == null ? null : ctx_r2.calendarVariables.left == null ? null : ctx_r2.calendarVariables.left.calendar[1][1].month()], " ");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.calendarVariables.left.dropdowns.monthArrays);
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ctx_r2.calendarVariables == null ? null : ctx_r2.calendarVariables.left == null ? null : ctx_r2.calendarVariables.left.calendar[1][1].format(" YYYY"), " ");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.calendarVariables.left.dropdowns.yearArrays);
  }
}
__name(DaterangepickerComponent_div_3_table_2_ng_container_7_Template, "DaterangepickerComponent_div_3_table_2_ng_container_7_Template");
function DaterangepickerComponent_div_3_table_2_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate2(" ", ctx_r2.locale.monthNames[ctx_r2.calendarVariables == null ? null : ctx_r2.calendarVariables.left == null ? null : ctx_r2.calendarVariables.left.calendar[1][1].month()], " ", ctx_r2.calendarVariables == null ? null : ctx_r2.calendarVariables.left == null ? null : ctx_r2.calendarVariables.left.calendar[1][1].format(" YYYY"), " ");
  }
}
__name(DaterangepickerComponent_div_3_table_2_ng_container_8_Template, "DaterangepickerComponent_div_3_table_2_ng_container_8_Template");
function DaterangepickerComponent_div_3_table_2_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "th", 27);
    ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_table_2_ng_container_9_Template_th_click_1_listener() {
      ɵɵrestoreView(_r8);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.clickNext(ctx_r2.sideEnum.left));
    }, "DaterangepickerComponent_div_3_table_2_ng_container_9_Template_th_click_1_listener"));
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
}
__name(DaterangepickerComponent_div_3_table_2_ng_container_9_Template, "DaterangepickerComponent_div_3_table_2_ng_container_9_Template");
function DaterangepickerComponent_div_3_table_2_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "th");
    ɵɵelementContainerEnd();
  }
}
__name(DaterangepickerComponent_div_3_table_2_ng_container_10_Template, "DaterangepickerComponent_div_3_table_2_ng_container_10_Template");
function DaterangepickerComponent_div_3_table_2_th_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "th", 28)(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.locale.weekLabel);
  }
}
__name(DaterangepickerComponent_div_3_table_2_th_12_Template, "DaterangepickerComponent_div_3_table_2_th_12_Template");
function DaterangepickerComponent_div_3_table_2_th_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "th")(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const dayofweek_r9 = ctx.$implicit;
    ɵɵadvance(2);
    ɵɵtextInterpolate(dayofweek_r9);
  }
}
__name(DaterangepickerComponent_div_3_table_2_th_13_Template, "DaterangepickerComponent_div_3_table_2_th_13_Template");
function DaterangepickerComponent_div_3_table_2_tr_15_td_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td", 28)(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const row_r10 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.calendarVariables.left.calendar[row_r10][0].week());
  }
}
__name(DaterangepickerComponent_div_3_table_2_tr_15_td_1_Template, "DaterangepickerComponent_div_3_table_2_tr_15_td_1_Template");
function DaterangepickerComponent_div_3_table_2_tr_15_td_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td", 28)(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const row_r10 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.calendarVariables.left.calendar[row_r10][0].isoWeek());
  }
}
__name(DaterangepickerComponent_div_3_table_2_tr_15_td_2_Template, "DaterangepickerComponent_div_3_table_2_tr_15_td_2_Template");
function DaterangepickerComponent_div_3_table_2_tr_15_td_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td", 30);
    ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_table_2_tr_15_td_3_Template_td_click_0_listener($event) {
      const col_r12 = ɵɵrestoreView(_r11).$implicit;
      const row_r10 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.clickDate($event, ctx_r2.sideEnum.left, row_r10, col_r12));
    }, "DaterangepickerComponent_div_3_table_2_tr_15_td_3_Template_td_click_0_listener"))("mouseenter", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_table_2_tr_15_td_3_Template_td_mouseenter_0_listener($event) {
      const col_r12 = ɵɵrestoreView(_r11).$implicit;
      const row_r10 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.hoverDate($event, ctx_r2.sideEnum.left, row_r10, col_r12));
    }, "DaterangepickerComponent_div_3_table_2_tr_15_td_3_Template_td_mouseenter_0_listener"));
    ɵɵelementStart(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const col_r12 = ctx.$implicit;
    const row_r10 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.calendarVariables.left.classes[row_r10][col_r12]);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.calendarVariables.left.calendar[row_r10][col_r12].date());
  }
}
__name(DaterangepickerComponent_div_3_table_2_tr_15_td_3_Template, "DaterangepickerComponent_div_3_table_2_tr_15_td_3_Template");
function DaterangepickerComponent_div_3_table_2_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tr");
    ɵɵtemplate(1, DaterangepickerComponent_div_3_table_2_tr_15_td_1_Template, 3, 1, "td", 16)(2, DaterangepickerComponent_div_3_table_2_tr_15_td_2_Template, 3, 1, "td", 16)(3, DaterangepickerComponent_div_3_table_2_tr_15_td_3_Template, 3, 3, "td", 29);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.calendarVariables.left.classes[row_r10].classList);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.showWeekNumbers);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.showISOWeekNumbers);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.calendarVariables.left.calCols);
  }
}
__name(DaterangepickerComponent_div_3_table_2_tr_15_Template, "DaterangepickerComponent_div_3_table_2_tr_15_Template");
function DaterangepickerComponent_div_3_table_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "table", 13)(1, "thead")(2, "tr");
    ɵɵtemplate(3, DaterangepickerComponent_div_3_table_2_th_3_Template, 1, 0, "th", 2)(4, DaterangepickerComponent_div_3_table_2_ng_container_4_Template, 2, 0, "ng-container", 2)(5, DaterangepickerComponent_div_3_table_2_ng_container_5_Template, 2, 0, "ng-container", 2);
    ɵɵelementStart(6, "th", 14);
    ɵɵtemplate(7, DaterangepickerComponent_div_3_table_2_ng_container_7_Template, 9, 4, "ng-container", 2)(8, DaterangepickerComponent_div_3_table_2_ng_container_8_Template, 2, 2, "ng-container", 2);
    ɵɵelementEnd();
    ɵɵtemplate(9, DaterangepickerComponent_div_3_table_2_ng_container_9_Template, 2, 0, "ng-container", 2)(10, DaterangepickerComponent_div_3_table_2_ng_container_10_Template, 2, 0, "ng-container", 2);
    ɵɵelementEnd();
    ɵɵelementStart(11, "tr", 15);
    ɵɵtemplate(12, DaterangepickerComponent_div_3_table_2_th_12_Template, 3, 1, "th", 16)(13, DaterangepickerComponent_div_3_table_2_th_13_Template, 3, 1, "th", 7);
    ɵɵelementEnd()();
    ɵɵelementStart(14, "tbody", 17);
    ɵɵtemplate(15, DaterangepickerComponent_div_3_table_2_tr_15_Template, 4, 5, "tr", 18);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r2.showWeekNumbers || ctx_r2.showISOWeekNumbers);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.calendarVariables.left.minDate || ctx_r2.calendarVariables.left.minDate.isBefore(ctx_r2.calendarVariables.left.calendar.firstDay) && (!ctx_r2.linkedCalendars || true));
    ɵɵadvance();
    ɵɵproperty("ngIf", !(!ctx_r2.calendarVariables.left.minDate || ctx_r2.calendarVariables.left.minDate.isBefore(ctx_r2.calendarVariables.left.calendar.firstDay) && (!ctx_r2.linkedCalendars || true)));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r2.showDropdowns && ctx_r2.calendarVariables.left.dropdowns);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.showDropdowns || !ctx_r2.calendarVariables.left.dropdowns);
    ɵɵadvance();
    ɵɵproperty("ngIf", (!ctx_r2.calendarVariables.left.maxDate || ctx_r2.calendarVariables.left.maxDate.isAfter(ctx_r2.calendarVariables.left.calendar.lastDay)) && (!ctx_r2.linkedCalendars || ctx_r2.singleDatePicker));
    ɵɵadvance();
    ɵɵproperty("ngIf", !((!ctx_r2.calendarVariables.left.maxDate || ctx_r2.calendarVariables.left.maxDate.isAfter(ctx_r2.calendarVariables.left.calendar.lastDay)) && (!ctx_r2.linkedCalendars || ctx_r2.singleDatePicker)));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r2.showWeekNumbers || ctx_r2.showISOWeekNumbers);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.locale.daysOfWeek);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.calendarVariables.left.calRows);
  }
}
__name(DaterangepickerComponent_div_3_table_2_Template, "DaterangepickerComponent_div_3_table_2_Template");
function DaterangepickerComponent_div_3_div_3_option_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "option", 40);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r14 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("value", i_r14)("disabled", ctx_r2.timepickerVariables.left.disabledHours.indexOf(i_r14) > -1);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", i_r14, " ");
  }
}
__name(DaterangepickerComponent_div_3_div_3_option_3_Template, "DaterangepickerComponent_div_3_div_3_option_3_Template");
function DaterangepickerComponent_div_3_div_3_option_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "option", 40);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r15 = ctx.$implicit;
    const index_r16 = ctx.index;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("value", i_r15)("disabled", ctx_r2.timepickerVariables.left.disabledMinutes.indexOf(i_r15) > -1);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r2.timepickerVariables.left.minutesLabel[index_r16], " ");
  }
}
__name(DaterangepickerComponent_div_3_div_3_option_6_Template, "DaterangepickerComponent_div_3_div_3_option_6_Template");
function DaterangepickerComponent_div_3_div_3_select_10_option_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "option", 40);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r18 = ctx.$implicit;
    const index_r19 = ctx.index;
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵproperty("value", i_r18)("disabled", ctx_r2.timepickerVariables.left.disabledSeconds.indexOf(i_r18) > -1);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r2.timepickerVariables.left.secondsLabel[index_r19], " ");
  }
}
__name(DaterangepickerComponent_div_3_div_3_select_10_option_1_Template, "DaterangepickerComponent_div_3_div_3_select_10_option_1_Template");
function DaterangepickerComponent_div_3_div_3_select_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "select", 41);
    ɵɵtwoWayListener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_div_3_select_10_Template_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r17);
      const ctx_r2 = ɵɵnextContext(3);
      ɵɵtwoWayBindingSet(ctx_r2.timepickerVariables.left.selectedSecond, $event) || (ctx_r2.timepickerVariables.left.selectedSecond = $event);
      return ɵɵresetView($event);
    }, "DaterangepickerComponent_div_3_div_3_select_10_Template_select_ngModelChange_0_listener"));
    ɵɵlistener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_div_3_select_10_Template_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r17);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.timeChanged($event, ctx_r2.sideEnum.left));
    }, "DaterangepickerComponent_div_3_div_3_select_10_Template_select_ngModelChange_0_listener"));
    ɵɵtemplate(1, DaterangepickerComponent_div_3_div_3_select_10_option_1_Template, 2, 3, "option", 34);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("disabled", !ctx_r2.startDate);
    ɵɵtwoWayProperty("ngModel", ctx_r2.timepickerVariables.left.selectedSecond);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.timepickerVariables.left.seconds);
  }
}
__name(DaterangepickerComponent_div_3_div_3_select_10_Template, "DaterangepickerComponent_div_3_div_3_select_10_Template");
function DaterangepickerComponent_div_3_div_3_select_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "select", 42);
    ɵɵtwoWayListener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_div_3_select_14_Template_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r20);
      const ctx_r2 = ɵɵnextContext(3);
      ɵɵtwoWayBindingSet(ctx_r2.timepickerVariables.left.ampmModel, $event) || (ctx_r2.timepickerVariables.left.ampmModel = $event);
      return ɵɵresetView($event);
    }, "DaterangepickerComponent_div_3_div_3_select_14_Template_select_ngModelChange_0_listener"));
    ɵɵlistener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_div_3_select_14_Template_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r20);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.timeChanged($event, ctx_r2.sideEnum.left));
    }, "DaterangepickerComponent_div_3_div_3_select_14_Template_select_ngModelChange_0_listener"));
    ɵɵelementStart(1, "option", 43);
    ɵɵtext(2, "AM");
    ɵɵelementEnd();
    ɵɵelementStart(3, "option", 44);
    ɵɵtext(4, "PM");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵtwoWayProperty("ngModel", ctx_r2.timepickerVariables.left.ampmModel);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r2.timepickerVariables.left.amDisabled);
    ɵɵadvance(2);
    ɵɵproperty("disabled", ctx_r2.timepickerVariables.left.pmDisabled);
  }
}
__name(DaterangepickerComponent_div_3_div_3_select_14_Template, "DaterangepickerComponent_div_3_div_3_select_14_Template");
function DaterangepickerComponent_div_3_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 31)(1, "div", 32)(2, "select", 33);
    ɵɵtwoWayListener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_div_3_Template_select_ngModelChange_2_listener($event) {
      ɵɵrestoreView(_r13);
      const ctx_r2 = ɵɵnextContext(2);
      ɵɵtwoWayBindingSet(ctx_r2.timepickerVariables.left.selectedHour, $event) || (ctx_r2.timepickerVariables.left.selectedHour = $event);
      return ɵɵresetView($event);
    }, "DaterangepickerComponent_div_3_div_3_Template_select_ngModelChange_2_listener"));
    ɵɵlistener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_div_3_Template_select_ngModelChange_2_listener($event) {
      ɵɵrestoreView(_r13);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.timeChanged($event, ctx_r2.sideEnum.left));
    }, "DaterangepickerComponent_div_3_div_3_Template_select_ngModelChange_2_listener"));
    ɵɵtemplate(3, DaterangepickerComponent_div_3_div_3_option_3_Template, 2, 3, "option", 34);
    ɵɵelementEnd()();
    ɵɵelementStart(4, "div", 32)(5, "select", 35);
    ɵɵtwoWayListener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_div_3_Template_select_ngModelChange_5_listener($event) {
      ɵɵrestoreView(_r13);
      const ctx_r2 = ɵɵnextContext(2);
      ɵɵtwoWayBindingSet(ctx_r2.timepickerVariables.left.selectedMinute, $event) || (ctx_r2.timepickerVariables.left.selectedMinute = $event);
      return ɵɵresetView($event);
    }, "DaterangepickerComponent_div_3_div_3_Template_select_ngModelChange_5_listener"));
    ɵɵlistener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_3_div_3_Template_select_ngModelChange_5_listener($event) {
      ɵɵrestoreView(_r13);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.timeChanged($event, ctx_r2.sideEnum.left));
    }, "DaterangepickerComponent_div_3_div_3_Template_select_ngModelChange_5_listener"));
    ɵɵtemplate(6, DaterangepickerComponent_div_3_div_3_option_6_Template, 2, 3, "option", 34);
    ɵɵelementEnd();
    ɵɵelement(7, "span", 36)(8, "span", 37);
    ɵɵelementEnd();
    ɵɵelementStart(9, "div", 32);
    ɵɵtemplate(10, DaterangepickerComponent_div_3_div_3_select_10_Template, 2, 3, "select", 38);
    ɵɵelement(11, "span", 36)(12, "span", 37);
    ɵɵelementEnd();
    ɵɵelementStart(13, "div", 32);
    ɵɵtemplate(14, DaterangepickerComponent_div_3_div_3_select_14_Template, 5, 3, "select", 39);
    ɵɵelement(15, "span", 36)(16, "span", 37);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("disabled", !ctx_r2.startDate);
    ɵɵtwoWayProperty("ngModel", ctx_r2.timepickerVariables.left.selectedHour);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.timepickerVariables.left.hours);
    ɵɵadvance(2);
    ɵɵproperty("disabled", !ctx_r2.startDate);
    ɵɵtwoWayProperty("ngModel", ctx_r2.timepickerVariables.left.selectedMinute);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.timepickerVariables.left.minutes);
    ɵɵadvance(4);
    ɵɵproperty("ngIf", ctx_r2.timePickerSeconds);
    ɵɵadvance(4);
    ɵɵproperty("ngIf", !ctx_r2.timePicker24Hour);
  }
}
__name(DaterangepickerComponent_div_3_div_3_Template, "DaterangepickerComponent_div_3_div_3_Template");
function DaterangepickerComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9)(1, "div", 10);
    ɵɵtemplate(2, DaterangepickerComponent_div_3_table_2_Template, 16, 10, "table", 11);
    ɵɵelementEnd();
    ɵɵtemplate(3, DaterangepickerComponent_div_3_div_3_Template, 17, 8, "div", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction2(3, _c3, ctx_r2.singleDatePicker, !ctx_r2.singleDatePicker));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r2.calendarVariables);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.timePicker);
  }
}
__name(DaterangepickerComponent_div_3_Template, "DaterangepickerComponent_div_3_Template");
function DaterangepickerComponent_div_4_table_2_th_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "th");
  }
}
__name(DaterangepickerComponent_div_4_table_2_th_3_Template, "DaterangepickerComponent_div_4_table_2_th_3_Template");
function DaterangepickerComponent_div_4_table_2_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "th", 19);
    ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_table_2_ng_container_4_Template_th_click_1_listener() {
      ɵɵrestoreView(_r21);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.clickPrev(ctx_r2.sideEnum.right));
    }, "DaterangepickerComponent_div_4_table_2_ng_container_4_Template_th_click_1_listener"));
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
}
__name(DaterangepickerComponent_div_4_table_2_ng_container_4_Template, "DaterangepickerComponent_div_4_table_2_ng_container_4_Template");
function DaterangepickerComponent_div_4_table_2_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "th");
    ɵɵelementContainerEnd();
  }
}
__name(DaterangepickerComponent_div_4_table_2_ng_container_5_Template, "DaterangepickerComponent_div_4_table_2_ng_container_5_Template");
function DaterangepickerComponent_div_4_table_2_ng_container_7_option_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "option", 25);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const m_r23 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵproperty("disabled", ctx_r2.calendarVariables.right.dropdowns.inMinYear && ctx_r2.calendarVariables.right.minDate && m_r23 < ctx_r2.calendarVariables.right.minDate.month() || ctx_r2.calendarVariables.right.dropdowns.inMaxYear && ctx_r2.calendarVariables.right.maxDate && m_r23 > ctx_r2.calendarVariables.right.maxDate.month())("value", m_r23)("selected", ctx_r2.calendarVariables.right.dropdowns.currentMonth === m_r23);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r2.locale.monthNames[m_r23], " ");
  }
}
__name(DaterangepickerComponent_div_4_table_2_ng_container_7_option_4_Template, "DaterangepickerComponent_div_4_table_2_ng_container_7_option_4_Template");
function DaterangepickerComponent_div_4_table_2_ng_container_7_option_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "option", 26);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const y_r24 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵproperty("selected", y_r24 === ctx_r2.calendarVariables.right.dropdowns.currentYear);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", y_r24, " ");
  }
}
__name(DaterangepickerComponent_div_4_table_2_ng_container_7_option_8_Template, "DaterangepickerComponent_div_4_table_2_ng_container_7_option_8_Template");
function DaterangepickerComponent_div_4_table_2_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 20);
    ɵɵtext(2);
    ɵɵelementStart(3, "select", 21);
    ɵɵlistener("change", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_table_2_ng_container_7_Template_select_change_3_listener($event) {
      ɵɵrestoreView(_r22);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.monthChanged($event, ctx_r2.sideEnum.right));
    }, "DaterangepickerComponent_div_4_table_2_ng_container_7_Template_select_change_3_listener"));
    ɵɵtemplate(4, DaterangepickerComponent_div_4_table_2_ng_container_7_option_4_Template, 2, 4, "option", 22);
    ɵɵelementEnd()();
    ɵɵelementStart(5, "div", 20);
    ɵɵtext(6);
    ɵɵelementStart(7, "select", 23);
    ɵɵlistener("change", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_table_2_ng_container_7_Template_select_change_7_listener($event) {
      ɵɵrestoreView(_r22);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.yearChanged($event, ctx_r2.sideEnum.right));
    }, "DaterangepickerComponent_div_4_table_2_ng_container_7_Template_select_change_7_listener"));
    ɵɵtemplate(8, DaterangepickerComponent_div_4_table_2_ng_container_7_option_8_Template, 2, 2, "option", 24);
    ɵɵelementEnd()();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ctx_r2.locale.monthNames[ctx_r2.calendarVariables == null ? null : ctx_r2.calendarVariables.right == null ? null : ctx_r2.calendarVariables.right.calendar[1][1].month()], " ");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.calendarVariables.right.dropdowns.monthArrays);
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ctx_r2.calendarVariables == null ? null : ctx_r2.calendarVariables.right == null ? null : ctx_r2.calendarVariables.right.calendar[1][1].format(" YYYY"), " ");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.calendarVariables.right.dropdowns.yearArrays);
  }
}
__name(DaterangepickerComponent_div_4_table_2_ng_container_7_Template, "DaterangepickerComponent_div_4_table_2_ng_container_7_Template");
function DaterangepickerComponent_div_4_table_2_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵtextInterpolate2(" ", ctx_r2.locale.monthNames[ctx_r2.calendarVariables == null ? null : ctx_r2.calendarVariables.right == null ? null : ctx_r2.calendarVariables.right.calendar[1][1].month()], " ", ctx_r2.calendarVariables == null ? null : ctx_r2.calendarVariables.right == null ? null : ctx_r2.calendarVariables.right.calendar[1][1].format(" YYYY"), " ");
  }
}
__name(DaterangepickerComponent_div_4_table_2_ng_container_8_Template, "DaterangepickerComponent_div_4_table_2_ng_container_8_Template");
function DaterangepickerComponent_div_4_table_2_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "th", 27);
    ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_table_2_ng_container_9_Template_th_click_1_listener() {
      ɵɵrestoreView(_r25);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.clickNext(ctx_r2.sideEnum.right));
    }, "DaterangepickerComponent_div_4_table_2_ng_container_9_Template_th_click_1_listener"));
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
}
__name(DaterangepickerComponent_div_4_table_2_ng_container_9_Template, "DaterangepickerComponent_div_4_table_2_ng_container_9_Template");
function DaterangepickerComponent_div_4_table_2_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "th");
    ɵɵelementContainerEnd();
  }
}
__name(DaterangepickerComponent_div_4_table_2_ng_container_10_Template, "DaterangepickerComponent_div_4_table_2_ng_container_10_Template");
function DaterangepickerComponent_div_4_table_2_th_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "th", 28)(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.locale.weekLabel);
  }
}
__name(DaterangepickerComponent_div_4_table_2_th_12_Template, "DaterangepickerComponent_div_4_table_2_th_12_Template");
function DaterangepickerComponent_div_4_table_2_th_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "th")(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const dayofweek_r26 = ctx.$implicit;
    ɵɵadvance(2);
    ɵɵtextInterpolate(dayofweek_r26);
  }
}
__name(DaterangepickerComponent_div_4_table_2_th_13_Template, "DaterangepickerComponent_div_4_table_2_th_13_Template");
function DaterangepickerComponent_div_4_table_2_tr_15_td_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td", 28)(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const row_r27 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.calendarVariables.right.calendar[row_r27][0].week());
  }
}
__name(DaterangepickerComponent_div_4_table_2_tr_15_td_1_Template, "DaterangepickerComponent_div_4_table_2_tr_15_td_1_Template");
function DaterangepickerComponent_div_4_table_2_tr_15_td_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "td", 28)(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const row_r27 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.calendarVariables.right.calendar[row_r27][0].isoWeek());
  }
}
__name(DaterangepickerComponent_div_4_table_2_tr_15_td_2_Template, "DaterangepickerComponent_div_4_table_2_tr_15_td_2_Template");
function DaterangepickerComponent_div_4_table_2_tr_15_td_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "td", 30);
    ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_table_2_tr_15_td_3_Template_td_click_0_listener($event) {
      const col_r29 = ɵɵrestoreView(_r28).$implicit;
      const row_r27 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.clickDate($event, ctx_r2.sideEnum.right, row_r27, col_r29));
    }, "DaterangepickerComponent_div_4_table_2_tr_15_td_3_Template_td_click_0_listener"))("mouseenter", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_table_2_tr_15_td_3_Template_td_mouseenter_0_listener($event) {
      const col_r29 = ɵɵrestoreView(_r28).$implicit;
      const row_r27 = ɵɵnextContext().$implicit;
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.hoverDate($event, ctx_r2.sideEnum.right, row_r27, col_r29));
    }, "DaterangepickerComponent_div_4_table_2_tr_15_td_3_Template_td_mouseenter_0_listener"));
    ɵɵelementStart(1, "span");
    ɵɵtext(2);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const col_r29 = ctx.$implicit;
    const row_r27 = ɵɵnextContext().$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.calendarVariables.right.classes[row_r27][col_r29]);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r2.calendarVariables.right.calendar[row_r27][col_r29].date());
  }
}
__name(DaterangepickerComponent_div_4_table_2_tr_15_td_3_Template, "DaterangepickerComponent_div_4_table_2_tr_15_td_3_Template");
function DaterangepickerComponent_div_4_table_2_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "tr");
    ɵɵtemplate(1, DaterangepickerComponent_div_4_table_2_tr_15_td_1_Template, 3, 1, "td", 16)(2, DaterangepickerComponent_div_4_table_2_tr_15_td_2_Template, 3, 1, "td", 16)(3, DaterangepickerComponent_div_4_table_2_tr_15_td_3_Template, 3, 3, "td", 29);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const row_r27 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵclassMap(ctx_r2.calendarVariables.right.classes[row_r27].classList);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.showWeekNumbers);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.showISOWeekNumbers);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.calendarVariables.right.calCols);
  }
}
__name(DaterangepickerComponent_div_4_table_2_tr_15_Template, "DaterangepickerComponent_div_4_table_2_tr_15_Template");
function DaterangepickerComponent_div_4_table_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "table", 13)(1, "thead")(2, "tr");
    ɵɵtemplate(3, DaterangepickerComponent_div_4_table_2_th_3_Template, 1, 0, "th", 2)(4, DaterangepickerComponent_div_4_table_2_ng_container_4_Template, 2, 0, "ng-container", 2)(5, DaterangepickerComponent_div_4_table_2_ng_container_5_Template, 2, 0, "ng-container", 2);
    ɵɵelementStart(6, "th", 46);
    ɵɵtemplate(7, DaterangepickerComponent_div_4_table_2_ng_container_7_Template, 9, 4, "ng-container", 2)(8, DaterangepickerComponent_div_4_table_2_ng_container_8_Template, 2, 2, "ng-container", 2);
    ɵɵelementEnd();
    ɵɵtemplate(9, DaterangepickerComponent_div_4_table_2_ng_container_9_Template, 2, 0, "ng-container", 2)(10, DaterangepickerComponent_div_4_table_2_ng_container_10_Template, 2, 0, "ng-container", 2);
    ɵɵelementEnd();
    ɵɵelementStart(11, "tr", 15);
    ɵɵtemplate(12, DaterangepickerComponent_div_4_table_2_th_12_Template, 3, 1, "th", 16)(13, DaterangepickerComponent_div_4_table_2_th_13_Template, 3, 1, "th", 7);
    ɵɵelementEnd()();
    ɵɵelementStart(14, "tbody");
    ɵɵtemplate(15, DaterangepickerComponent_div_4_table_2_tr_15_Template, 4, 5, "tr", 18);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r2.showWeekNumbers || ctx_r2.showISOWeekNumbers);
    ɵɵadvance();
    ɵɵproperty("ngIf", (!ctx_r2.calendarVariables.right.minDate || ctx_r2.calendarVariables.right.minDate.isBefore(ctx_r2.calendarVariables.right.calendar.firstDay)) && !ctx_r2.linkedCalendars);
    ɵɵadvance();
    ɵɵproperty("ngIf", !((!ctx_r2.calendarVariables.right.minDate || ctx_r2.calendarVariables.right.minDate.isBefore(ctx_r2.calendarVariables.right.calendar.firstDay)) && !ctx_r2.linkedCalendars));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r2.showDropdowns && ctx_r2.calendarVariables.right.dropdowns);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.showDropdowns || !ctx_r2.calendarVariables.right.dropdowns);
    ɵɵadvance();
    ɵɵproperty("ngIf", !ctx_r2.calendarVariables.right.maxDate || ctx_r2.calendarVariables.right.maxDate.isAfter(ctx_r2.calendarVariables.right.calendar.lastDay) && (!ctx_r2.linkedCalendars || ctx_r2.singleDatePicker || true));
    ɵɵadvance();
    ɵɵproperty("ngIf", !(!ctx_r2.calendarVariables.right.maxDate || ctx_r2.calendarVariables.right.maxDate.isAfter(ctx_r2.calendarVariables.right.calendar.lastDay) && (!ctx_r2.linkedCalendars || ctx_r2.singleDatePicker || true)));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r2.showWeekNumbers || ctx_r2.showISOWeekNumbers);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.locale.daysOfWeek);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r2.calendarVariables.right.calRows);
  }
}
__name(DaterangepickerComponent_div_4_table_2_Template, "DaterangepickerComponent_div_4_table_2_Template");
function DaterangepickerComponent_div_4_div_3_option_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "option", 40);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r31 = ctx.$implicit;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("value", i_r31)("disabled", ctx_r2.timepickerVariables.right.disabledHours.indexOf(i_r31) > -1);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", i_r31, " ");
  }
}
__name(DaterangepickerComponent_div_4_div_3_option_3_Template, "DaterangepickerComponent_div_4_div_3_option_3_Template");
function DaterangepickerComponent_div_4_div_3_option_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "option", 40);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r32 = ctx.$implicit;
    const index_r33 = ctx.index;
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("value", i_r32)("disabled", ctx_r2.timepickerVariables.right.disabledMinutes.indexOf(i_r32) > -1);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r2.timepickerVariables.right.minutesLabel[index_r33], " ");
  }
}
__name(DaterangepickerComponent_div_4_div_3_option_8_Template, "DaterangepickerComponent_div_4_div_3_option_8_Template");
function DaterangepickerComponent_div_4_div_3_select_12_option_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "option", 40);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const i_r35 = ctx.$implicit;
    const index_r36 = ctx.index;
    const ctx_r2 = ɵɵnextContext(4);
    ɵɵproperty("value", i_r35)("disabled", ctx_r2.timepickerVariables.right.disabledSeconds.indexOf(i_r35) > -1);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r2.timepickerVariables.right.secondsLabel[index_r36], " ");
  }
}
__name(DaterangepickerComponent_div_4_div_3_select_12_option_1_Template, "DaterangepickerComponent_div_4_div_3_select_12_option_1_Template");
function DaterangepickerComponent_div_4_div_3_select_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "select", 41);
    ɵɵtwoWayListener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_div_3_select_12_Template_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r34);
      const ctx_r2 = ɵɵnextContext(3);
      ɵɵtwoWayBindingSet(ctx_r2.timepickerVariables.right.selectedSecond, $event) || (ctx_r2.timepickerVariables.right.selectedSecond = $event);
      return ɵɵresetView($event);
    }, "DaterangepickerComponent_div_4_div_3_select_12_Template_select_ngModelChange_0_listener"));
    ɵɵlistener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_div_3_select_12_Template_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r34);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.timeChanged($event, ctx_r2.sideEnum.right));
    }, "DaterangepickerComponent_div_4_div_3_select_12_Template_select_ngModelChange_0_listener"));
    ɵɵtemplate(1, DaterangepickerComponent_div_4_div_3_select_12_option_1_Template, 2, 3, "option", 34);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵproperty("disabled", !ctx_r2.startDate);
    ɵɵtwoWayProperty("ngModel", ctx_r2.timepickerVariables.right.selectedSecond);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.timepickerVariables.right.seconds);
  }
}
__name(DaterangepickerComponent_div_4_div_3_select_12_Template, "DaterangepickerComponent_div_4_div_3_select_12_Template");
function DaterangepickerComponent_div_4_div_3_select_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "select", 42);
    ɵɵtwoWayListener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_div_3_select_16_Template_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r37);
      const ctx_r2 = ɵɵnextContext(3);
      ɵɵtwoWayBindingSet(ctx_r2.timepickerVariables.right.ampmModel, $event) || (ctx_r2.timepickerVariables.right.ampmModel = $event);
      return ɵɵresetView($event);
    }, "DaterangepickerComponent_div_4_div_3_select_16_Template_select_ngModelChange_0_listener"));
    ɵɵlistener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_div_3_select_16_Template_select_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r37);
      const ctx_r2 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r2.timeChanged($event, ctx_r2.sideEnum.right));
    }, "DaterangepickerComponent_div_4_div_3_select_16_Template_select_ngModelChange_0_listener"));
    ɵɵelementStart(1, "option", 43);
    ɵɵtext(2, "AM");
    ɵɵelementEnd();
    ɵɵelementStart(3, "option", 44);
    ɵɵtext(4, "PM");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(3);
    ɵɵtwoWayProperty("ngModel", ctx_r2.timepickerVariables.right.ampmModel);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r2.timepickerVariables.right.amDisabled);
    ɵɵadvance(2);
    ɵɵproperty("disabled", ctx_r2.timepickerVariables.right.pmDisabled);
  }
}
__name(DaterangepickerComponent_div_4_div_3_select_16_Template, "DaterangepickerComponent_div_4_div_3_select_16_Template");
function DaterangepickerComponent_div_4_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 31)(1, "div", 32)(2, "select", 47);
    ɵɵtwoWayListener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_div_3_Template_select_ngModelChange_2_listener($event) {
      ɵɵrestoreView(_r30);
      const ctx_r2 = ɵɵnextContext(2);
      ɵɵtwoWayBindingSet(ctx_r2.timepickerVariables.right.selectedHour, $event) || (ctx_r2.timepickerVariables.right.selectedHour = $event);
      return ɵɵresetView($event);
    }, "DaterangepickerComponent_div_4_div_3_Template_select_ngModelChange_2_listener"));
    ɵɵlistener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_div_3_Template_select_ngModelChange_2_listener($event) {
      ɵɵrestoreView(_r30);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.timeChanged($event, ctx_r2.sideEnum.right));
    }, "DaterangepickerComponent_div_4_div_3_Template_select_ngModelChange_2_listener"));
    ɵɵtemplate(3, DaterangepickerComponent_div_4_div_3_option_3_Template, 2, 3, "option", 34);
    ɵɵelementEnd();
    ɵɵelement(4, "span", 36)(5, "span", 37);
    ɵɵelementEnd();
    ɵɵelementStart(6, "div", 32)(7, "select", 35);
    ɵɵtwoWayListener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_div_3_Template_select_ngModelChange_7_listener($event) {
      ɵɵrestoreView(_r30);
      const ctx_r2 = ɵɵnextContext(2);
      ɵɵtwoWayBindingSet(ctx_r2.timepickerVariables.right.selectedMinute, $event) || (ctx_r2.timepickerVariables.right.selectedMinute = $event);
      return ɵɵresetView($event);
    }, "DaterangepickerComponent_div_4_div_3_Template_select_ngModelChange_7_listener"));
    ɵɵlistener("ngModelChange", /* @__PURE__ */ __name(function DaterangepickerComponent_div_4_div_3_Template_select_ngModelChange_7_listener($event) {
      ɵɵrestoreView(_r30);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.timeChanged($event, ctx_r2.sideEnum.right));
    }, "DaterangepickerComponent_div_4_div_3_Template_select_ngModelChange_7_listener"));
    ɵɵtemplate(8, DaterangepickerComponent_div_4_div_3_option_8_Template, 2, 3, "option", 34);
    ɵɵelementEnd();
    ɵɵelement(9, "span", 36)(10, "span", 37);
    ɵɵelementEnd();
    ɵɵelementStart(11, "div", 32);
    ɵɵtemplate(12, DaterangepickerComponent_div_4_div_3_select_12_Template, 2, 3, "select", 38);
    ɵɵelement(13, "span", 36)(14, "span", 37);
    ɵɵelementEnd();
    ɵɵelementStart(15, "div", 32);
    ɵɵtemplate(16, DaterangepickerComponent_div_4_div_3_select_16_Template, 5, 3, "select", 39);
    ɵɵelement(17, "span", 36)(18, "span", 37);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("disabled", !ctx_r2.startDate);
    ɵɵtwoWayProperty("ngModel", ctx_r2.timepickerVariables.right.selectedHour);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.timepickerVariables.right.hours);
    ɵɵadvance(4);
    ɵɵproperty("disabled", !ctx_r2.startDate);
    ɵɵtwoWayProperty("ngModel", ctx_r2.timepickerVariables.right.selectedMinute);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r2.timepickerVariables.right.minutes);
    ɵɵadvance(4);
    ɵɵproperty("ngIf", ctx_r2.timePickerSeconds);
    ɵɵadvance(4);
    ɵɵproperty("ngIf", !ctx_r2.timePicker24Hour);
  }
}
__name(DaterangepickerComponent_div_4_div_3_Template, "DaterangepickerComponent_div_4_div_3_Template");
function DaterangepickerComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 45)(1, "div", 10);
    ɵɵtemplate(2, DaterangepickerComponent_div_4_table_2_Template, 16, 10, "table", 11);
    ɵɵelementEnd();
    ɵɵtemplate(3, DaterangepickerComponent_div_4_div_3_Template, 19, 8, "div", 12);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r2.calendarVariables);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.timePicker);
  }
}
__name(DaterangepickerComponent_div_4_Template, "DaterangepickerComponent_div_4_Template");
function DaterangepickerComponent_div_5_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 53);
    ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerComponent_div_5_button_2_Template_button_click_0_listener() {
      ɵɵrestoreView(_r39);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.clear());
    }, "DaterangepickerComponent_div_5_button_2_Template_button_click_0_listener"));
    ɵɵtext(1);
    ɵɵnamespaceSVG();
    ɵɵelementStart(2, "svg", 54);
    ɵɵelement(3, "path", 55);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("title", ctx_r2.locale.clearLabel);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r2.locale.clearLabel, " ");
  }
}
__name(DaterangepickerComponent_div_5_button_2_Template, "DaterangepickerComponent_div_5_button_2_Template");
function DaterangepickerComponent_div_5_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 56);
    ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerComponent_div_5_button_3_Template_button_click_0_listener($event) {
      ɵɵrestoreView(_r40);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.clickCancel($event));
    }, "DaterangepickerComponent_div_5_button_3_Template_button_click_0_listener"));
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.locale.cancelLabel);
  }
}
__name(DaterangepickerComponent_div_5_button_3_Template, "DaterangepickerComponent_div_5_button_3_Template");
function DaterangepickerComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 48)(1, "div", 49);
    ɵɵtemplate(2, DaterangepickerComponent_div_5_button_2_Template, 4, 2, "button", 50)(3, DaterangepickerComponent_div_5_button_3_Template, 2, 1, "button", 51);
    ɵɵelementStart(4, "button", 52);
    ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerComponent_div_5_Template_button_click_4_listener($event) {
      ɵɵrestoreView(_r38);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.clickApply($event));
    }, "DaterangepickerComponent_div_5_Template_button_click_4_listener"));
    ɵɵtext(5);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r2.showClearButton);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.showCancel);
    ɵɵadvance();
    ɵɵproperty("disabled", ctx_r2.applyBtn.disabled);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r2.locale.applyLabel);
  }
}
__name(DaterangepickerComponent_div_5_Template, "DaterangepickerComponent_div_5_Template");
esm_default.extend(localeData_default);
var LOCALE_CONFIG = new InjectionToken("daterangepicker.config");
var DefaultLocaleConfig = {
  direction: "ltr",
  separator: " - ",
  weekLabel: "W",
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  clearLabel: "Clear",
  customRangeLabel: "Custom range",
  daysOfWeek: esm_default.weekdaysMin(),
  monthNames: esm_default.monthsShort(),
  firstDay: esm_default.localeData().firstDayOfWeek()
};
var _LocaleService = class _LocaleService {
  constructor(configHolder) {
    this.configHolder = configHolder;
  }
  get config() {
    if (!this.configHolder) {
      return DefaultLocaleConfig;
    }
    return __spreadValues(__spreadValues({}, DefaultLocaleConfig), this.configHolder);
  }
  configWithLocale(locale2) {
    if (!this.configHolder && !locale2) {
      return DefaultLocaleConfig;
    }
    return __spreadValues(__spreadValues(__spreadValues({}, DefaultLocaleConfig), {
      daysOfWeek: locale2.weekdaysMin,
      monthNames: locale2.monthsShort,
      firstDay: locale2.weekStart
    }), this.configHolder);
  }
};
__name(_LocaleService, "LocaleService");
var LocaleService = _LocaleService;
LocaleService.ɵfac = /* @__PURE__ */ __name(function LocaleService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LocaleService)(ɵɵinject(LOCALE_CONFIG));
}, "LocaleService_Factory");
LocaleService.ɵprov = ɵɵdefineInjectable({
  token: LocaleService,
  factory: LocaleService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocaleService, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [LOCALE_CONFIG]
      }]
    }];
  }, null);
})();
esm_default.extend(localeData_default);
esm_default.extend(localizedFormat_default);
esm_default.extend(isoWeek_default);
esm_default.extend(weekOfYear_default);
esm_default.extend(customParseFormat_default);
esm_default.extend(utc_default);
var SideEnum;
(function(SideEnum2) {
  SideEnum2["left"] = "left";
  SideEnum2["right"] = "right";
})(SideEnum || (SideEnum = {}));
var _DaterangepickerComponent = class _DaterangepickerComponent {
  constructor(el, ref, localeHolderService) {
    this.el = el;
    this.ref = ref;
    this.localeHolderService = localeHolderService;
    this.startDate = esm_default().utc(true).startOf("day");
    this.endDate = esm_default().utc(true).endOf("day");
    this.dateLimit = null;
    this.autoApply = false;
    this.singleDatePicker = false;
    this.showDropdowns = false;
    this.showWeekNumbers = false;
    this.showISOWeekNumbers = false;
    this.linkedCalendars = false;
    this.autoUpdateInput = true;
    this.alwaysShowCalendars = false;
    this.maxSpan = false;
    this.lockStartDate = false;
    this.timePicker = false;
    this.timePicker24Hour = false;
    this.timePickerIncrement = 1;
    this.timePickerSeconds = false;
    this.showClearButton = false;
    this.firstMonthDayClass = null;
    this.lastMonthDayClass = null;
    this.emptyWeekRowClass = null;
    this.emptyWeekColumnClass = null;
    this.firstDayOfNextMonthClass = null;
    this.lastDayOfPreviousMonthClass = null;
    this.showCancel = false;
    this.keepCalendarOpeningWithRange = false;
    this.showRangeLabelOnInput = false;
    this.customRangeDirection = false;
    this.closeOnAutoApply = true;
    this.calendarVariables = {};
    this.timepickerVariables = {};
    this.daterangepicker = {
      start: new FormControl(),
      end: new FormControl()
    };
    this.applyBtn = {
      disabled: false
    };
    this.sideEnum = SideEnum;
    this.rangesArray = [];
    this.isShown = false;
    this.inline = true;
    this.leftCalendar = {
      month: null,
      calendar: []
    };
    this.rightCalendar = {
      month: null,
      calendar: []
    };
    this.showCalInRanges = false;
    this.nowHoveredDate = null;
    this.pickingDate = false;
    this.localeHolder = {};
    this.rangesHolder = {};
    this.cachedVersion = {
      start: null,
      end: null
    };
    this.clickNext = (side) => {
      if (side === SideEnum.left) {
        this.leftCalendar.month = this.leftCalendar.month.add(1, "month");
      } else {
        this.rightCalendar.month = this.rightCalendar.month.add(1, "month");
        if (this.linkedCalendars) {
          this.leftCalendar.month = this.leftCalendar.month.add(1, "month");
        }
      }
      this.updateCalendars();
    };
    this.choosedDate = new EventEmitter();
    this.rangeClicked = new EventEmitter();
    this.datesUpdated = new EventEmitter();
    this.startDateChanged = new EventEmitter();
    this.endDateChanged = new EventEmitter();
    this.cancelClicked = new EventEmitter();
    this.clearClicked = new EventEmitter();
  }
  get minDate() {
    return this.minDateHolder;
  }
  set minDate(value) {
    if (esm_default.isDayjs(value)) {
      this.minDateHolder = value;
    } else if (typeof value === "string") {
      this.minDateHolder = esm_default(value).utc(true);
    } else {
      this.minDateHolder = null;
    }
  }
  get locale() {
    return this.localeHolder;
  }
  set locale(value) {
    this.localeHolder = __spreadValues(__spreadValues({}, this.localeHolderService.config), value);
    if (value.locale) {
      this.localeHolder = this.localeHolderService.configWithLocale(value.locale);
    }
  }
  get ranges() {
    return this.rangesHolder;
  }
  set ranges(value) {
    this.rangesHolder = value;
    this.renderRanges();
  }
  get maxDate() {
    return this.maxDateHolder;
  }
  set maxDate(value) {
    if (esm_default.isDayjs(value)) {
      this.maxDateHolder = value;
    } else if (typeof value === "string") {
      this.maxDateHolder = esm_default(value).utc(true);
    } else {
      this.maxDateHolder = null;
    }
  }
  isInvalidDate(date) {
    return false;
  }
  isCustomDate(date) {
    return false;
  }
  isTooltipDate(date) {
    return null;
  }
  handleInternalClick(e) {
    return e.stopPropagation();
  }
  ngOnChanges(changes) {
    if ((changes.startDate || changes.endDate) && this.inline) {
      this.updateView();
    }
  }
  ngOnInit() {
    this.buildLocale();
    const daysOfWeek = [...this.locale.daysOfWeek];
    this.locale.firstDay = this.locale.firstDay % 7;
    if (this.locale.firstDay !== 0) {
      let iterator = this.locale.firstDay;
      while (iterator > 0) {
        daysOfWeek.push(daysOfWeek.shift());
        iterator--;
      }
    }
    this.locale.daysOfWeek = daysOfWeek;
    if (this.inline) {
      this.cachedVersion.start = this.startDate.clone();
      this.cachedVersion.end = this.endDate.clone();
    }
    if (this.startDate && this.timePicker) {
      this.setStartDate(this.startDate);
      this.renderTimePicker(SideEnum.left);
    }
    if (this.endDate && this.timePicker) {
      this.setEndDate(this.endDate);
      this.renderTimePicker(SideEnum.right);
    }
    this.updateMonthsInView();
    this.renderCalendar(SideEnum.left);
    this.renderCalendar(SideEnum.right);
    this.renderRanges();
  }
  renderRanges() {
    this.rangesArray = [];
    let start;
    let end;
    if (typeof this.ranges === "object") {
      for (const range in this.ranges) {
        if (this.ranges[range]) {
          if (typeof this.ranges[range][0] === "string") {
            start = esm_default(this.ranges[range][0], this.locale.format).utc(true);
          } else {
            start = esm_default(this.ranges[range][0]).utc(true);
          }
          if (typeof this.ranges[range][1] === "string") {
            end = esm_default(this.ranges[range][1], this.locale.format).utc(true);
          } else {
            end = esm_default(this.ranges[range][1]).utc(true);
          }
          if (this.minDate && start.isBefore(this.minDate)) {
            start = this.minDate.clone();
          }
          let maxDate = this.maxDate;
          if (this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate)) {
            maxDate = start.clone().add(this.maxSpan);
          }
          if (maxDate && end.isAfter(maxDate)) {
            end = maxDate.clone();
          }
          if (this.minDate && end.isBefore(this.minDate, this.timePicker ? "minute" : "day") || maxDate && start.isAfter(maxDate, this.timePicker ? "minute" : "day")) {
            continue;
          }
          const elem = document.createElement("textarea");
          elem.innerHTML = range;
          const rangeHtml = elem.value;
          this.ranges[rangeHtml] = [start, end];
        }
      }
      for (const range in this.ranges) {
        if (this.ranges[range]) {
          this.rangesArray.push(range);
        }
      }
      if (this.showCustomRangeLabel) {
        this.rangesArray.push(this.locale.customRangeLabel);
      }
      this.showCalInRanges = !this.rangesArray.length || this.alwaysShowCalendars;
      if (!this.timePicker) {
        this.startDate = this.startDate.startOf("day");
        this.endDate = this.endDate.endOf("day");
      }
    }
  }
  renderTimePicker(side) {
    let selected;
    let minDate;
    const maxDate = this.maxDate;
    if (side === SideEnum.left) {
      selected = this.startDate.clone();
      minDate = this.minDate;
    } else if (side === SideEnum.right && this.endDate) {
      selected = this.endDate.clone();
      minDate = this.startDate;
    } else if (side === SideEnum.right && !this.endDate) {
      selected = this.getDateWithTime(this.startDate, SideEnum.right);
      if (selected.isBefore(this.startDate)) {
        selected = this.startDate.clone();
      }
      minDate = this.startDate;
    }
    const start = this.timePicker24Hour ? 0 : 1;
    const end = this.timePicker24Hour ? 23 : 12;
    this.timepickerVariables[side] = {
      hours: [],
      minutes: [],
      minutesLabel: [],
      seconds: [],
      secondsLabel: [],
      disabledHours: [],
      disabledMinutes: [],
      disabledSeconds: [],
      selectedHour: 0,
      selectedMinute: 0,
      selectedSecond: 0,
      selected
    };
    for (let i = start; i <= end; i++) {
      let iIn24 = i;
      if (!this.timePicker24Hour) {
        iIn24 = selected.hour() >= 12 ? i === 12 ? 12 : i + 12 : i === 12 ? 0 : i;
      }
      const time = selected.clone().hour(iIn24);
      let disabled = false;
      if (minDate && time.minute(59).isBefore(minDate)) {
        disabled = true;
      }
      if (maxDate && time.minute(0).isAfter(maxDate)) {
        disabled = true;
      }
      this.timepickerVariables[side].hours.push(i);
      if (iIn24 === selected.hour() && !disabled) {
        this.timepickerVariables[side].selectedHour = i;
      } else if (disabled) {
        this.timepickerVariables[side].disabledHours.push(i);
      }
    }
    for (let i = 0; i < 60; i += this.timePickerIncrement) {
      const padded = i < 10 ? `0${i}` : `${i}`;
      const time = selected.clone().minute(i);
      let disabled = false;
      if (minDate && time.second(59).isBefore(minDate)) {
        disabled = true;
      }
      if (maxDate && time.second(0).isAfter(maxDate)) {
        disabled = true;
      }
      this.timepickerVariables[side].minutes.push(i);
      this.timepickerVariables[side].minutesLabel.push(padded);
      if (selected.minute() === i && !disabled) {
        this.timepickerVariables[side].selectedMinute = i;
      } else if (disabled) {
        this.timepickerVariables[side].disabledMinutes.push(i);
      }
    }
    if (this.timePickerSeconds) {
      for (let i = 0; i < 60; i++) {
        const padded = i < 10 ? `0${i}` : `${i}`;
        const time = selected.clone().second(i);
        let disabled = false;
        if (minDate && time.isBefore(minDate)) {
          disabled = true;
        }
        if (maxDate && time.isAfter(maxDate)) {
          disabled = true;
        }
        this.timepickerVariables[side].seconds.push(i);
        this.timepickerVariables[side].secondsLabel.push(padded);
        if (selected.second() === i && !disabled) {
          this.timepickerVariables[side].selectedSecond = i;
        } else if (disabled) {
          this.timepickerVariables[side].disabledSeconds.push(i);
        }
      }
    }
    if (!this.timePicker24Hour) {
      if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate)) {
        this.timepickerVariables[side].amDisabled = true;
      }
      if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate)) {
        this.timepickerVariables[side].pmDisabled = true;
      }
      if (selected.hour() >= 12) {
        this.timepickerVariables[side].ampmModel = "PM";
      } else {
        this.timepickerVariables[side].ampmModel = "AM";
      }
    }
    this.timepickerVariables[side].selected = selected;
  }
  renderCalendar(side) {
    const mainCalendar = side === SideEnum.left ? this.leftCalendar : this.rightCalendar;
    const month = mainCalendar.month.month();
    const year = mainCalendar.month.year();
    const hour = mainCalendar.month.hour();
    const minute = mainCalendar.month.minute();
    const second = mainCalendar.month.second();
    const daysInMonth = esm_default(new Date(year, month)).utc(true).daysInMonth();
    const firstDay = esm_default(new Date(year, month, 1)).utc(true);
    const lastDay = esm_default(new Date(year, month, daysInMonth)).utc(true);
    const lastMonth = esm_default(firstDay).utc(true).subtract(1, "month").month();
    const lastYear = esm_default(firstDay).utc(true).subtract(1, "month").year();
    const daysInLastMonth = esm_default(new Date(lastYear, lastMonth)).utc(true).daysInMonth();
    const dayOfWeek = firstDay.day();
    const calendar = [];
    calendar.firstDay = firstDay;
    calendar.lastDay = lastDay;
    for (let i = 0; i < 6; i++) {
      calendar[i] = [];
    }
    let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
    if (startDay > daysInLastMonth) {
      startDay -= 7;
    }
    if (dayOfWeek === this.locale.firstDay) {
      startDay = daysInLastMonth - 6;
    }
    let curDate = esm_default(new Date(lastYear, lastMonth, startDay, 12, minute, second)).utc(true);
    for (let i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = esm_default(curDate).utc(true).add(24, "hours")) {
      if (i > 0 && col % 7 === 0) {
        col = 0;
        row++;
      }
      calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
      curDate = curDate.hour(12);
      if (this.minDate && calendar[row][col].format("YYYY-MM-DD") === this.minDate.format("YYYY-MM-DD") && calendar[row][col].isBefore(this.minDate) && side === "left") {
        calendar[row][col] = this.minDate.clone();
      }
      if (this.maxDate && calendar[row][col].format("YYYY-MM-DD") === this.maxDate.format("YYYY-MM-DD") && calendar[row][col].isAfter(this.maxDate) && side === "right") {
        calendar[row][col] = this.maxDate.clone();
      }
    }
    if (side === SideEnum.left) {
      this.leftCalendar.calendar = calendar;
    } else {
      this.rightCalendar.calendar = calendar;
    }
    let minDate = side === "left" ? this.minDate : this.startDate;
    let maxDate = this.maxDate;
    if (this.endDate === null && this.dateLimit) {
      const maxLimit = this.startDate.clone().add(this.dateLimit, "day").endOf("day");
      if (!maxDate || maxLimit.isBefore(maxDate)) {
        maxDate = maxLimit;
      }
      if (this.customRangeDirection) {
        minDate = this.minDate;
        const minLimit = this.startDate.clone().subtract(this.dateLimit, "day").endOf("day");
        if (!minDate || minLimit.isAfter(minDate)) {
          minDate = minLimit;
        }
      }
    }
    this.calendarVariables[side] = {
      month,
      year,
      hour,
      minute,
      second,
      daysInMonth,
      firstDay,
      lastDay,
      lastMonth,
      lastYear,
      daysInLastMonth,
      dayOfWeek,
      calRows: Array.from(Array(6).keys()),
      calCols: Array.from(Array(7).keys()),
      classes: {},
      minDate,
      maxDate,
      calendar
    };
    if (this.showDropdowns) {
      const currentMonth = calendar[1][1].month();
      const currentYear = calendar[1][1].year();
      const realCurrentYear = esm_default().utc(true).year();
      const maxYear = maxDate && maxDate.year() || realCurrentYear + 5;
      const minYear = minDate && minDate.year() || realCurrentYear - 50;
      const inMinYear = currentYear === minYear;
      const inMaxYear = currentYear === maxYear;
      const years = [];
      for (let y = minYear; y <= maxYear; y++) {
        years.push(y);
      }
      this.calendarVariables[side].dropdowns = {
        currentMonth,
        currentYear,
        maxYear,
        minYear,
        inMinYear,
        inMaxYear,
        monthArrays: Array.from(Array(12).keys()),
        yearArrays: years
      };
    }
    this.buildCells(calendar, side);
  }
  setStartDate(startDate) {
    if (typeof startDate === "string") {
      this.startDate = esm_default(startDate, this.locale.format).utc(true);
    }
    if (typeof startDate === "object") {
      this.pickingDate = true;
      this.startDate = esm_default(startDate).utc(true);
    }
    if (!this.timePicker) {
      this.pickingDate = true;
      this.startDate = this.startDate.startOf("day");
    }
    if (this.timePicker && this.timePickerIncrement) {
      this.startDate = this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
    }
    if (this.minDate && this.startDate.isBefore(this.minDate)) {
      this.startDate = this.minDate.clone();
      if (this.timePicker && this.timePickerIncrement) {
        this.startDate = this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
      }
    }
    if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
      this.startDate = this.maxDate.clone();
      if (this.timePicker && this.timePickerIncrement) {
        this.startDate = this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
      }
    }
    if (!this.isShown) {
      this.updateElement();
    }
    this.startDateChanged.emit({
      startDate: this.startDate
    });
    this.updateMonthsInView();
  }
  setEndDate(endDate) {
    if (typeof endDate === "string") {
      this.endDate = esm_default(endDate, this.locale.format).utc(true);
    }
    if (typeof endDate === "object") {
      this.pickingDate = false;
      this.endDate = esm_default(endDate).utc(true);
    }
    if (!this.timePicker) {
      this.pickingDate = false;
      this.endDate = this.endDate.add(1, "d").startOf("day").subtract(1, "second");
    }
    if (this.timePicker && this.timePickerIncrement) {
      this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
    }
    if (this.endDate.isBefore(this.startDate)) {
      this.endDate = this.startDate.clone();
    }
    if (this.maxDate && this.endDate.isAfter(this.maxDate)) {
      this.endDate = this.maxDate.clone();
    }
    if (this.dateLimit && this.startDate.clone().add(this.dateLimit, "day").isBefore(this.endDate)) {
      this.endDate = this.startDate.clone().add(this.dateLimit, "day");
    }
    if (!this.isShown) {
    }
    this.endDateChanged.emit({
      endDate: this.endDate
    });
    this.updateMonthsInView();
  }
  updateView() {
    if (this.timePicker) {
      this.renderTimePicker(SideEnum.left);
      this.renderTimePicker(SideEnum.right);
    }
    this.updateMonthsInView();
    this.updateCalendars();
  }
  updateMonthsInView() {
    if (this.endDate) {
      if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month && (this.startDate && this.leftCalendar && this.startDate.format("YYYY-MM") === this.leftCalendar.month.format("YYYY-MM") || this.startDate && this.rightCalendar && this.startDate.format("YYYY-MM") === this.rightCalendar.month.format("YYYY-MM")) && (this.endDate.format("YYYY-MM") === this.leftCalendar.month.format("YYYY-MM") || this.endDate.format("YYYY-MM") === this.rightCalendar.month.format("YYYY-MM"))) {
        return;
      }
      if (this.startDate) {
        this.leftCalendar.month = this.startDate.clone().date(2);
        if (!this.linkedCalendars && (this.endDate.month() !== this.startDate.month() || this.endDate.year() !== this.startDate.year())) {
          this.rightCalendar.month = this.endDate.clone().date(2);
        } else {
          this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month");
        }
      }
    } else {
      if (this.leftCalendar.month.format("YYYY-MM") !== this.startDate.format("YYYY-MM") && this.rightCalendar.month.format("YYYY-MM") !== this.startDate.format("YYYY-MM")) {
        this.leftCalendar.month = this.startDate.clone().date(2);
        this.rightCalendar.month = this.startDate.clone().date(2).add(1, "month");
      }
    }
    if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
      this.rightCalendar.month = this.maxDate.clone().date(2);
      this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, "month");
    }
  }
  updateCalendars() {
    this.renderCalendar(SideEnum.left);
    this.renderCalendar(SideEnum.right);
    if (this.endDate === null) {
      return;
    }
    this.calculateChosenLabel();
  }
  updateElement() {
    const format = this.locale.displayFormat ? this.locale.displayFormat : this.locale.format;
    if (!this.singleDatePicker && this.autoUpdateInput) {
      if (this.startDate && this.endDate) {
        if (this.rangesArray.length && this.showRangeLabelOnInput === true && this.chosenRange && this.locale.customRangeLabel !== this.chosenRange) {
          this.chosenLabel = this.chosenRange;
        } else {
          this.chosenLabel = this.startDate.format(format) + this.locale.separator + this.endDate.format(format);
        }
      }
    } else if (this.autoUpdateInput) {
      this.chosenLabel = this.startDate.format(format);
    }
  }
  remove() {
    this.isShown = false;
  }
  calculateChosenLabel() {
    if (!this.locale || !this.locale.separator) {
      this.buildLocale();
    }
    let customRange = true;
    let i = 0;
    if (this.rangesArray.length > 0) {
      for (const range in this.ranges) {
        if (this.ranges[range]) {
          if (this.timePicker) {
            const format = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
            if (this.startDate.format(format) === this.ranges[range][0].format(format) && this.endDate.format(format) === this.ranges[range][1].format(format)) {
              customRange = false;
              this.chosenRange = this.rangesArray[i];
              break;
            }
          } else {
            if (this.startDate.format("YYYY-MM-DD") === this.ranges[range][0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") === this.ranges[range][1].format("YYYY-MM-DD")) {
              customRange = false;
              this.chosenRange = this.rangesArray[i];
              break;
            }
          }
          i++;
        }
      }
      if (customRange) {
        if (this.showCustomRangeLabel) {
          this.chosenRange = this.locale.customRangeLabel;
        } else {
          this.chosenRange = null;
        }
        this.showCalInRanges = true;
      }
    }
    this.updateElement();
  }
  clickApply(e) {
    if (!this.singleDatePicker && this.startDate && !this.endDate) {
      this.endDate = this.getDateWithTime(this.startDate, SideEnum.right);
      this.calculateChosenLabel();
    }
    if (this.isInvalidDate && this.startDate && this.endDate) {
      let d = this.startDate.clone();
      while (d.isBefore(this.endDate)) {
        if (this.isInvalidDate(d)) {
          this.endDate = d.subtract(1, "days");
          this.calculateChosenLabel();
          break;
        }
        d = d.add(1, "days");
      }
    }
    if (this.chosenLabel) {
      this.choosedDate.emit({
        chosenLabel: this.chosenLabel,
        startDate: this.startDate,
        endDate: this.endDate
      });
    }
    this.datesUpdated.emit({
      startDate: this.startDate,
      endDate: this.endDate
    });
    if (e || this.closeOnAutoApply && !e) {
      this.hide();
    }
  }
  clickCancel(e) {
    this.startDate = this.cachedVersion.start;
    this.endDate = this.cachedVersion.end;
    if (this.inline) {
      this.updateView();
    }
    this.cancelClicked.emit();
    this.hide();
  }
  monthChanged(monthEvent, side) {
    const year = this.calendarVariables[side].dropdowns.currentYear;
    const month = parseInt(monthEvent.target.value, 10);
    this.monthOrYearChanged(month, year, side);
  }
  yearChanged(yearEvent, side) {
    const month = this.calendarVariables[side].dropdowns.currentMonth;
    const year = parseInt(yearEvent.target.value, 10);
    this.monthOrYearChanged(month, year, side);
  }
  timeChanged(timeEvent, side) {
    let hour = parseInt(String(this.timepickerVariables[side].selectedHour), 10);
    const minute = parseInt(String(this.timepickerVariables[side].selectedMinute), 10);
    const second = this.timePickerSeconds ? parseInt(String(this.timepickerVariables[side].selectedSecond), 10) : 0;
    if (!this.timePicker24Hour) {
      const ampm = this.timepickerVariables[side].ampmModel;
      if (ampm === "PM" && hour < 12) {
        hour += 12;
      }
      if (ampm === "AM" && hour === 12) {
        hour = 0;
      }
    }
    if (side === SideEnum.left) {
      let start = this.startDate.clone();
      start = start.hour(hour);
      start = start.minute(minute);
      start = start.second(second);
      this.setStartDate(start);
      if (this.singleDatePicker) {
        this.endDate = this.startDate.clone();
      } else if (this.endDate && this.endDate.format("YYYY-MM-DD") === start.format("YYYY-MM-DD") && this.endDate.isBefore(start)) {
        this.setEndDate(start.clone());
      } else if (!this.endDate && this.timePicker) {
        const startClone = this.getDateWithTime(start, SideEnum.right);
        if (startClone.isBefore(start)) {
          this.timepickerVariables[SideEnum.right].selectedHour = hour;
          this.timepickerVariables[SideEnum.right].selectedMinute = minute;
          this.timepickerVariables[SideEnum.right].selectedSecond = second;
        }
      }
    } else if (this.endDate) {
      let end = this.endDate.clone();
      end = end.hour(hour);
      end = end.minute(minute);
      end = end.second(second);
      this.setEndDate(end);
    }
    this.updateCalendars();
    this.renderTimePicker(SideEnum.left);
    this.renderTimePicker(SideEnum.right);
    if (this.autoApply) {
      this.clickApply();
    }
  }
  monthOrYearChanged(month, year, side) {
    const isLeft = side === SideEnum.left;
    let newMonth = month;
    let newYear = year;
    if (!isLeft) {
      if (newYear < this.startDate.year() || newYear === this.startDate.year() && newMonth < this.startDate.month()) {
        newMonth = this.startDate.month();
        newYear = this.startDate.year();
      }
    }
    if (this.minDate) {
      if (newYear < this.minDate.year() || newYear === this.minDate.year() && newMonth < this.minDate.month()) {
        newMonth = this.minDate.month();
        newYear = this.minDate.year();
      }
    }
    if (this.maxDate) {
      if (newYear > this.maxDate.year() || newYear === this.maxDate.year() && newMonth > this.maxDate.month()) {
        newMonth = this.maxDate.month();
        newYear = this.maxDate.year();
      }
    }
    this.calendarVariables[side].dropdowns.currentYear = newYear;
    this.calendarVariables[side].dropdowns.currentMonth = newMonth;
    if (isLeft) {
      this.leftCalendar.month = this.leftCalendar.month.month(newMonth).year(newYear);
      if (this.linkedCalendars) {
        this.rightCalendar.month = this.leftCalendar.month.clone().add(1, "month");
      }
    } else {
      this.rightCalendar.month = this.rightCalendar.month.month(newMonth).year(newYear);
      if (this.linkedCalendars) {
        this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, "month");
      }
    }
    this.updateCalendars();
  }
  clickPrev(side) {
    if (side === SideEnum.left) {
      this.leftCalendar.month = this.leftCalendar.month.subtract(1, "month");
      if (this.linkedCalendars) {
        this.rightCalendar.month = this.rightCalendar.month.subtract(1, "month");
      }
    } else {
      this.rightCalendar.month = this.rightCalendar.month.subtract(1, "month");
    }
    this.updateCalendars();
  }
  hoverDate(e, side, row, col) {
    const leftCalDate = this.calendarVariables.left.calendar[row][col];
    const rightCalDate = this.calendarVariables.right.calendar[row][col];
    if (this.pickingDate) {
      this.nowHoveredDate = side === SideEnum.left ? leftCalDate : rightCalDate;
      this.renderCalendar(SideEnum.left);
      this.renderCalendar(SideEnum.right);
    }
  }
  clickDate(e, side, row, col) {
    if (e.target.tagName === "TD") {
      if (!e.target.classList.contains("available")) {
        return;
      }
    } else if (e.target.tagName === "SPAN") {
      if (!e.target.parentElement.classList.contains("available")) {
        return;
      }
    }
    if (this.rangesArray.length) {
      this.chosenRange = this.locale.customRangeLabel;
    }
    let date = side === SideEnum.left ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
    if ((this.endDate || date.isBefore(this.startDate, "day") && this.customRangeDirection === false) && this.lockStartDate === false) {
      if (this.timePicker) {
        date = this.getDateWithTime(date, SideEnum.left);
      }
      this.endDate = null;
      this.setStartDate(date.clone());
    } else if (!this.endDate && date.isBefore(this.startDate) && this.customRangeDirection === false) {
      this.setEndDate(this.startDate.clone());
    } else {
      if (this.timePicker) {
        date = this.getDateWithTime(date, SideEnum.right);
      }
      if (date.isBefore(this.startDate, "day") === true && this.customRangeDirection === true) {
        this.setEndDate(this.startDate);
        this.setStartDate(date.clone());
      } else {
        this.setEndDate(date.clone());
      }
      if (this.autoApply) {
        this.calculateChosenLabel();
      }
    }
    if (this.singleDatePicker) {
      this.setEndDate(this.startDate);
      this.updateElement();
      if (this.autoApply) {
        this.clickApply();
      }
    }
    this.updateView();
    if (this.autoApply && this.startDate && this.endDate) {
      this.clickApply();
    }
    e.stopPropagation();
  }
  clickRange(e, label) {
    this.chosenRange = label;
    if (label === this.locale.customRangeLabel) {
      this.isShown = true;
      this.showCalInRanges = true;
    } else {
      const dates = this.ranges[label];
      console.log("1 ", dates);
      this.startDate = dates[0].clone();
      this.endDate = dates[1].clone();
      if (this.showRangeLabelOnInput && label !== this.locale.customRangeLabel) {
        this.chosenLabel = label;
      } else {
        this.calculateChosenLabel();
      }
      this.showCalInRanges = !this.rangesArray.length || this.alwaysShowCalendars;
      if (!this.timePicker) {
        this.startDate = this.startDate.startOf("day");
        this.endDate = this.endDate.endOf("day");
      }
      if (!this.alwaysShowCalendars) {
        this.isShown = false;
      }
      this.rangeClicked.emit({
        label,
        dates
      });
      if (!this.keepCalendarOpeningWithRange || this.autoApply) {
        this.clickApply();
      } else {
        if (!this.alwaysShowCalendars) {
          return this.clickApply();
        }
        if (this.maxDate && this.maxDate.isSame(dates[0], "month")) {
          this.rightCalendar.month = this.rightCalendar.month.month(dates[0].month());
          this.rightCalendar.month = this.rightCalendar.month.year(dates[0].year());
          this.leftCalendar.month = this.leftCalendar.month.month(dates[0].month() - 1);
          this.leftCalendar.month = this.leftCalendar.month.year(dates[1].year());
        } else {
          this.leftCalendar.month = this.leftCalendar.month.month(dates[0].month());
          this.leftCalendar.month = this.leftCalendar.month.year(dates[0].year());
          const nextMonth = !this.linkedCalendars ? dates[1].clone() : dates[0].clone().add(1, "month");
          this.rightCalendar.month = this.rightCalendar.month.month(nextMonth.month());
          this.rightCalendar.month = this.rightCalendar.month.year(nextMonth.year());
        }
        this.updateCalendars();
        if (this.timePicker) {
          this.renderTimePicker(SideEnum.left);
          this.renderTimePicker(SideEnum.right);
        }
      }
    }
  }
  show(e) {
    if (this.isShown) {
      return;
    }
    this.cachedVersion.start = this.startDate.clone();
    this.cachedVersion.end = this.endDate.clone();
    this.isShown = true;
    this.updateView();
  }
  hide(e) {
    if (!this.isShown) {
      return;
    }
    if (!this.endDate) {
      if (this.cachedVersion.start) {
        this.startDate = this.cachedVersion.start.clone();
      }
      if (this.cachedVersion.end) {
        this.endDate = this.cachedVersion.end.clone();
      }
    }
    if (!this.startDate.isSame(this.cachedVersion.start) || !this.endDate.isSame(this.cachedVersion.end)) {
    }
    this.updateElement();
    this.isShown = false;
    this.ref.detectChanges();
  }
  updateLocale(locale2) {
    for (const key in locale2) {
      if (Object.prototype.hasOwnProperty.call(locale2, key)) {
        this.locale[key] = locale2[key];
        if (key === "customRangeLabel") {
          this.renderRanges();
        }
      }
    }
  }
  clear() {
    this.startDate = esm_default().utc(true).startOf("day");
    this.endDate = esm_default().utc(true).endOf("day");
    this.choosedDate.emit({
      chosenLabel: "",
      startDate: null,
      endDate: null
    });
    this.datesUpdated.emit({
      startDate: null,
      endDate: null
    });
    this.clearClicked.emit();
    this.hide();
  }
  disableRange(range) {
    if (range === this.locale.customRangeLabel) {
      return false;
    }
    const rangeMarkers = this.ranges[range];
    const areBothBefore = rangeMarkers.every((date) => {
      if (!this.minDate) {
        return false;
      }
      return date.isBefore(this.minDate);
    });
    const areBothAfter = rangeMarkers.every((date) => {
      if (!this.maxDate) {
        return false;
      }
      return date.isAfter(this.maxDate);
    });
    return areBothBefore || areBothAfter;
  }
  getDateWithTime(date, side) {
    let hour = parseInt(String(this.timepickerVariables[side].selectedHour), 10);
    if (!this.timePicker24Hour) {
      const ampm = this.timepickerVariables[side].ampmModel;
      if (ampm === "PM" && hour < 12) {
        hour += 12;
      }
      if (ampm === "AM" && hour === 12) {
        hour = 0;
      }
    }
    const minute = parseInt(String(this.timepickerVariables[side].selectedMinute), 10);
    const second = this.timePickerSeconds ? parseInt(String(this.timepickerVariables[side].selectedSecond), 10) : 0;
    return date.clone().hour(hour).minute(minute).second(second);
  }
  buildLocale() {
    this.locale = __spreadValues(__spreadValues({}, this.localeHolderService.config), this.locale);
    if (!this.locale.format) {
      if (this.timePicker) {
        this.locale.format = esm_default.localeData().longDateFormat("lll");
      } else {
        this.locale.format = esm_default.localeData().longDateFormat("L");
      }
    }
  }
  buildCells(calendar, side) {
    for (let row = 0; row < 6; row++) {
      this.calendarVariables[side].classes[row] = {
        classList: ""
      };
      const rowClasses = [];
      if (this.emptyWeekRowClass && Array.from(Array(7).keys()).some((i) => calendar[row][i].month() !== this.calendarVariables[side].month)) {
        rowClasses.push(this.emptyWeekRowClass);
      }
      for (let col = 0; col < 7; col++) {
        const classes = [];
        if (this.emptyWeekColumnClass) {
          if (calendar[row][col].month() !== this.calendarVariables[side].month) {
            classes.push(this.emptyWeekColumnClass);
          }
        }
        if (calendar[row][col].isSame(esm_default().utc(true), "day")) {
          classes.push("today");
        }
        if (calendar[row][col].isoWeekday() > 5) {
          classes.push("weekend");
        }
        if (calendar[row][col].month() !== calendar[1][1].month()) {
          classes.push("off");
          if (this.lastDayOfPreviousMonthClass && (calendar[row][col].month() < calendar[1][1].month() || calendar[1][1].month() === 0) && calendar[row][col].date() === this.calendarVariables[side].daysInLastMonth) {
            classes.push(this.lastDayOfPreviousMonthClass);
          }
          if (this.firstDayOfNextMonthClass && (calendar[row][col].month() > calendar[1][1].month() || calendar[row][col].month() === 0) && calendar[row][col].date() === 1) {
            classes.push(this.firstDayOfNextMonthClass);
          }
        }
        if (this.firstMonthDayClass && calendar[row][col].month() === calendar[1][1].month() && calendar[row][col].date() === calendar.firstDay.date()) {
          classes.push(this.firstMonthDayClass);
        }
        if (this.lastMonthDayClass && calendar[row][col].month() === calendar[1][1].month() && calendar[row][col].date() === calendar.lastDay.date()) {
          classes.push(this.lastMonthDayClass);
        }
        if (this.minDate && calendar[row][col].isBefore(this.minDate, "day")) {
          classes.push("off", "disabled");
        }
        if (this.calendarVariables[side].maxDate && calendar[row][col].isAfter(this.calendarVariables[side].maxDate, "day")) {
          classes.push("off", "disabled");
        }
        if (this.isInvalidDate(calendar[row][col])) {
          classes.push("off", "disabled", "invalid");
        }
        if (this.startDate && calendar[row][col].format("YYYY-MM-DD") === this.startDate.format("YYYY-MM-DD")) {
          classes.push("active", "start-date");
        }
        if (this.endDate != null && calendar[row][col].format("YYYY-MM-DD") === this.endDate.format("YYYY-MM-DD")) {
          classes.push("active", "end-date");
        }
        if ((this.nowHoveredDate != null && this.pickingDate || this.endDate != null) && calendar[row][col] > this.startDate && (calendar[row][col] < this.endDate || calendar[row][col] < this.nowHoveredDate && this.pickingDate) && !classes.find((el) => el === "off")) {
          classes.push("in-range");
        }
        const isCustom = this.isCustomDate(calendar[row][col]);
        if (isCustom !== false) {
          if (typeof isCustom === "string") {
            classes.push(isCustom);
          } else {
            Array.prototype.push.apply(classes, isCustom);
          }
        }
        let cname = "";
        let disabled = false;
        for (const className of classes) {
          cname += className + " ";
          if (className === "disabled") {
            disabled = true;
          }
        }
        if (!disabled) {
          cname += "available";
        }
        this.calendarVariables[side].classes[row][col] = cname.replace(/^\s+|\s+$/g, "");
      }
      this.calendarVariables[side].classes[row].classList = rowClasses.join(" ");
    }
  }
};
__name(_DaterangepickerComponent, "DaterangepickerComponent");
var DaterangepickerComponent = _DaterangepickerComponent;
DaterangepickerComponent.ɵfac = /* @__PURE__ */ __name(function DaterangepickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DaterangepickerComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(LocaleService));
}, "DaterangepickerComponent_Factory");
DaterangepickerComponent.ɵcmp = ɵɵdefineComponent({
  type: DaterangepickerComponent,
  selectors: [["ngx-daterangepicker-material"]],
  viewQuery: /* @__PURE__ */ __name(function DaterangepickerComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.pickerContainer = _t.first);
    }
  }, "DaterangepickerComponent_Query"),
  hostBindings: /* @__PURE__ */ __name(function DaterangepickerComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerComponent_click_HostBindingHandler($event) {
        return ctx.handleInternalClick($event);
      }, "DaterangepickerComponent_click_HostBindingHandler"));
    }
  }, "DaterangepickerComponent_HostBindings"),
  inputs: {
    startDate: "startDate",
    endDate: "endDate",
    dateLimit: "dateLimit",
    autoApply: "autoApply",
    singleDatePicker: "singleDatePicker",
    showDropdowns: "showDropdowns",
    showWeekNumbers: "showWeekNumbers",
    showISOWeekNumbers: "showISOWeekNumbers",
    linkedCalendars: "linkedCalendars",
    autoUpdateInput: "autoUpdateInput",
    alwaysShowCalendars: "alwaysShowCalendars",
    maxSpan: "maxSpan",
    lockStartDate: "lockStartDate",
    timePicker: "timePicker",
    timePicker24Hour: "timePicker24Hour",
    timePickerIncrement: "timePickerIncrement",
    timePickerSeconds: "timePickerSeconds",
    showClearButton: "showClearButton",
    firstMonthDayClass: "firstMonthDayClass",
    lastMonthDayClass: "lastMonthDayClass",
    emptyWeekRowClass: "emptyWeekRowClass",
    emptyWeekColumnClass: "emptyWeekColumnClass",
    firstDayOfNextMonthClass: "firstDayOfNextMonthClass",
    lastDayOfPreviousMonthClass: "lastDayOfPreviousMonthClass",
    showCustomRangeLabel: "showCustomRangeLabel",
    showCancel: "showCancel",
    keepCalendarOpeningWithRange: "keepCalendarOpeningWithRange",
    showRangeLabelOnInput: "showRangeLabelOnInput",
    customRangeDirection: "customRangeDirection",
    drops: "drops",
    opens: "opens",
    closeOnAutoApply: "closeOnAutoApply",
    minDate: "minDate",
    locale: "locale",
    ranges: "ranges",
    maxDate: "maxDate",
    isInvalidDate: "isInvalidDate",
    isCustomDate: "isCustomDate",
    isTooltipDate: "isTooltipDate"
  },
  outputs: {
    choosedDate: "choosedDate",
    rangeClicked: "rangeClicked",
    datesUpdated: "datesUpdated",
    startDateChanged: "startDateChanged",
    endDateChanged: "endDateChanged",
    cancelClicked: "cancelClicked",
    clearClicked: "clearClicked"
  },
  standalone: false,
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DaterangepickerComponent),
    multi: true
  }]), ɵɵNgOnChangesFeature],
  decls: 6,
  vars: 15,
  consts: [["pickerContainer", ""], [1, "md-drppicker", 3, "ngClass"], [4, "ngIf"], ["class", "calendar", 3, "ngClass", 4, "ngIf"], ["class", "calendar right", 4, "ngIf"], ["class", "buttons", 4, "ngIf"], [1, "ranges"], [4, "ngFor", "ngForOf"], ["type", "button", 3, "click", "disabled", "ngClass"], [1, "calendar", 3, "ngClass"], [1, "calendar-table"], ["class", "table-condensed", 4, "ngIf"], ["class", "calendar-time", 4, "ngIf"], [1, "table-condensed"], ["colspan", "5", 1, "month", "drp-animate"], [1, "week-days"], ["class", "week", 4, "ngIf"], [1, "drp-animate"], [3, "class", 4, "ngFor", "ngForOf"], [1, "prev", "available", 3, "click"], [1, "dropdowns"], [1, "monthselect", 3, "change"], [3, "disabled", "value", "selected", 4, "ngFor", "ngForOf"], [1, "yearselect", 3, "change"], [3, "selected", 4, "ngFor", "ngForOf"], [3, "disabled", "value", "selected"], [3, "selected"], [1, "next", "available", 3, "click"], [1, "week"], [3, "class", "click", "mouseenter", 4, "ngFor", "ngForOf"], [3, "click", "mouseenter"], [1, "calendar-time"], [1, "select"], [1, "hourselect", "select-item", 3, "ngModelChange", "disabled", "ngModel"], [3, "value", "disabled", 4, "ngFor", "ngForOf"], [1, "select-item", "minuteselect", 3, "ngModelChange", "disabled", "ngModel"], [1, "select-highlight"], [1, "select-bar"], ["class", "select-item secondselect", 3, "disabled", "ngModel", "ngModelChange", 4, "ngIf"], ["class", "select-item ampmselect", 3, "ngModel", "ngModelChange", 4, "ngIf"], [3, "value", "disabled"], [1, "select-item", "secondselect", 3, "ngModelChange", "disabled", "ngModel"], [1, "select-item", "ampmselect", 3, "ngModelChange", "ngModel"], ["value", "AM", 3, "disabled"], ["value", "PM", 3, "disabled"], [1, "calendar", "right"], ["colspan", "5", 1, "month"], [1, "select-item", "hourselect", 3, "ngModelChange", "disabled", "ngModel"], [1, "buttons"], [1, "buttons_input"], ["class", "btn btn-default clear", "type", "button", 3, "title", "click", 4, "ngIf"], ["class", "btn btn-default", "type", "button", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-default", "clear", 3, "click", "title"], ["xmlns", "http://www.w3.org/2000/svg", "width", "30", "height", "30", "viewBox", "0 -5 24 24"], ["d", "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"], ["type", "button", 1, "btn", "btn-default", 3, "click"]],
  template: /* @__PURE__ */ __name(function DaterangepickerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 1, 0);
      ɵɵtemplate(2, DaterangepickerComponent_ng_container_2_Template, 4, 1, "ng-container", 2)(3, DaterangepickerComponent_div_3_Template, 4, 6, "div", 3)(4, DaterangepickerComponent_div_4_Template, 4, 2, "div", 4)(5, DaterangepickerComponent_div_5_Template, 6, 4, "div", 5);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵclassMap("drops-" + ctx.drops + "-" + ctx.opens);
      ɵɵproperty("ngClass", ɵɵpureFunction7(7, _c1, ctx.locale.direction === "ltr", ctx.locale.direction === "rtl", ctx.isShown || ctx.inline, !ctx.isShown && !ctx.inline, ctx.inline, !ctx.singleDatePicker && ctx.showCalInRanges, ctx.rangesArray.length));
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.rangesArray.length);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.showCalInRanges);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.showCalInRanges && !ctx.singleDatePicker);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.autoApply && (!ctx.rangesArray.length || ctx.showCalInRanges && !ctx.singleDatePicker));
    }
  }, "DaterangepickerComponent_Template"),
  dependencies: [NgClass, NgIf, NgForOf, NgSelectOption, ɵNgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel],
  styles: ['.md-drppicker{position:absolute;font-family:Roboto,sans-serif;color:inherit;border-radius:4px;width:278px;padding:4px;margin-top:-10px;overflow:hidden;z-index:1000;font-size:14px;background-color:#fff;box-shadow:0 2px 4px #00000029,0 2px 8px #0000001f}.md-drppicker.double{width:auto}.md-drppicker.inline{position:relative;display:inline-block}.md-drppicker:before,.md-drppicker:after{position:absolute;display:inline-block;border-bottom-color:#0003;content:""}.md-drppicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.md-drppicker.openscenter:after{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.md-drppicker.single .ranges,.md-drppicker.single .calendar{float:none}.md-drppicker.shown{transform:scale(1);transition:all .1s ease-in-out;transform-origin:0 0;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.md-drppicker.shown.drops-up-left{transform-origin:100% 100%}.md-drppicker.shown.drops-up-right{transform-origin:0 100%}.md-drppicker.shown.drops-down-left{transform-origin:100% 0}.md-drppicker.shown.drops-down-right{transform-origin:0 0}.md-drppicker.shown.drops-down-center{transform-origin:NaN%}.md-drppicker.shown.drops-up-center{transform-origin:50%}.md-drppicker.shown .calendar{display:block}.md-drppicker.hidden{transition:all .1s ease;transform:scale(0);transform-origin:0 0;cursor:default;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.md-drppicker.hidden.drops-up-left{transform-origin:100% 100%}.md-drppicker.hidden.drops-up-right{transform-origin:0 100%}.md-drppicker.hidden.drops-down-left{transform-origin:100% 0}.md-drppicker.hidden.drops-down-right{transform-origin:0 0}.md-drppicker.hidden.drops-down-center{transform-origin:50% 0}.md-drppicker.hidden.drops-up-center{transform-origin:50% 100%}.md-drppicker.hidden .calendar{display:none}.md-drppicker .calendar{max-width:270px;margin:4px}.md-drppicker .calendar.single .calendar-table{border:none}.md-drppicker .calendar th,.md-drppicker .calendar td{padding:0;white-space:nowrap;text-align:center;min-width:32px}.md-drppicker .calendar th span,.md-drppicker .calendar td span{pointer-events:none}.md-drppicker .calendar-table{border:1px solid #fff;padding:4px;border-radius:4px;background-color:#fff}.md-drppicker table{width:100%;margin:0}.md-drppicker th{color:#988c8c}.md-drppicker td,.md-drppicker th{text-align:center;width:20px;height:20px;border-radius:4px;border:1px solid transparent;white-space:nowrap;cursor:pointer;height:2em;width:2em}.md-drppicker td.available.prev,.md-drppicker th.available.prev{display:block;background-image:url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMy43IDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMuNyA2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0zLjcsMC43TDEuNCwzbDIuMywyLjNMMyw2TDAsM2wzLTNMMy43LDAuN3oiLz4NCjwvZz4NCjwvc3ZnPg0K);background-repeat:no-repeat;background-size:.5em;background-position:center;opacity:.8;transition:background-color .2s ease;border-radius:2em}.md-drppicker td.available.prev:hover,.md-drppicker th.available.prev:hover{margin:0}.md-drppicker td.available.next,.md-drppicker th.available.next{transform:rotate(180deg);display:block;background-image:url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMy43IDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMuNyA2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0zLjcsMC43TDEuNCwzbDIuMywyLjNMMyw2TDAsM2wzLTNMMy43LDAuN3oiLz4NCjwvZz4NCjwvc3ZnPg0K);background-repeat:no-repeat;background-size:.5em;background-position:center;opacity:.8;transition:background-color .2s ease;border-radius:2em}.md-drppicker td.available.next:hover,.md-drppicker th.available.next:hover{margin:0;transform:rotate(180deg)}.md-drppicker td.available:hover,.md-drppicker th.available:hover{background-color:#eee;border-color:transparent;color:inherit;background-repeat:no-repeat;background-size:.5em;background-position:center;margin:.25em 0;opacity:.8;border-radius:2em;transform:scale(1);transition:all .45s cubic-bezier(.23,1,.32,1) 0ms}.md-drppicker td.week,.md-drppicker th.week{font-size:80%;color:#ccc}.md-drppicker td{margin:.25em 0;opacity:.8;transition:background-color .2s ease;border-radius:2em;transform:scale(1);transition:all .45s cubic-bezier(.23,1,.32,1) 0ms}.md-drppicker td.off,.md-drppicker td.off.in-range,.md-drppicker td.off.start-date,.md-drppicker td.off.end-date{background-color:#fff;border-color:transparent;color:#999}.md-drppicker td.in-range{background-color:#dde2e4;border-color:transparent;color:#000;border-radius:0}.md-drppicker td.start-date{border-radius:2em 0 0 2em}.md-drppicker td.end-date{border-radius:0 2em 2em 0}.md-drppicker td.start-date.end-date{border-radius:4px}.md-drppicker td.active{transition:background .3s ease-out;background:rgba(0,0,0,.1)}.md-drppicker td.active,.md-drppicker td.active:hover{background-color:#3f51b5;border-color:transparent;color:#fff}.md-drppicker th.month{width:auto}.md-drppicker td.disabled,.md-drppicker option.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}.md-drppicker .dropdowns{background-repeat:no-repeat;background-size:10px;background-position-y:center;background-position-x:right;width:50px;background-image:url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI1NSAyNTUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI1NSAyNTU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iYXJyb3ctZHJvcC1kb3duIj4KCQk8cG9seWdvbiBwb2ludHM9IjAsNjMuNzUgMTI3LjUsMTkxLjI1IDI1NSw2My43NSAgICIgZmlsbD0iIzk4OGM4YyIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)}.md-drppicker .dropdowns select{display:inline-block;background-color:#ffffffe6;width:100%;padding:5px;border:1px solid #f2f2f2;border-radius:2px;height:3rem}.md-drppicker .dropdowns select.monthselect,.md-drppicker .dropdowns select.yearselect{font-size:12px;padding:1px;height:auto;margin:0;cursor:default}.md-drppicker .dropdowns select.hourselect,.md-drppicker .dropdowns select.minuteselect,.md-drppicker .dropdowns select.secondselect,.md-drppicker .dropdowns select.ampmselect{width:50px;margin:0 auto;background:#eee;border:1px solid #eee;padding:2px;outline:0;font-size:12px}.md-drppicker .dropdowns select.monthselect,.md-drppicker .dropdowns select.yearselect{cursor:pointer;opacity:0;position:absolute;top:0;left:0;margin:0;padding:0}.md-drppicker th.month>div{position:relative;display:inline-block}.md-drppicker .calendar-time{text-align:center;margin:4px auto 0;line-height:30px;position:relative}.md-drppicker .calendar-time .select{display:inline}.md-drppicker .calendar-time .select .select-item{display:inline-block;width:auto;position:relative;font-family:inherit;background-color:transparent;padding:10px 10px 10px 0;font-size:18px;border-radius:0;border:none;border-bottom:1px solid rgba(0,0,0,.12)}.md-drppicker .calendar-time .select .select-item:after{position:absolute;top:18px;right:10px;width:0;height:0;padding:0;content:"";border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid rgba(0,0,0,.12);pointer-events:none}.md-drppicker .calendar-time .select .select-item:focus{outline:none}.md-drppicker .calendar-time .select .select-item .select-label{color:#00000042;font-size:16px;font-weight:400;position:absolute;pointer-events:none;left:0;top:10px;transition:.2s ease all}.md-drppicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}.md-drppicker .label-input{border:1px solid #ccc;border-radius:4px;color:#555;height:30px;line-height:30px;display:block;vertical-align:middle;margin:0 auto 5px;padding:0 0 0 28px;width:100%}.md-drppicker .label-input.active{border:1px solid #08c;border-radius:4px}.md-drppicker .md-drppicker_input{position:relative;padding:0 30px 0 0}.md-drppicker .md-drppicker_input i,.md-drppicker .md-drppicker_input svg{position:absolute;left:8px;top:8px}.md-drppicker.rtl .label-input{padding-right:28px;padding-left:6px}.md-drppicker.rtl .md-drppicker_input i,.md-drppicker.rtl .md-drppicker_input svg{left:auto;right:8px}.md-drppicker .show-ranges .drp-calendar.left{border-left:1px solid #ddd}.md-drppicker .ranges{float:none;text-align:left;margin:0}.md-drppicker .ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}.md-drppicker .ranges ul li{font-size:12px}.md-drppicker .ranges ul li button{padding:8px 12px;width:100%;background:none;border:none;text-align:left;cursor:pointer}.md-drppicker .ranges ul li button.active{background-color:#3f51b5;color:#fff}.md-drppicker .ranges ul li button[disabled]{opacity:.3}.md-drppicker .ranges ul li button:active{background:transparent}.md-drppicker .ranges ul li:hover{background-color:#eee}.md-drppicker .show-calendar .ranges{margin-top:8px}.md-drppicker [hidden]{display:none}.md-drppicker .buttons{text-align:right;margin:0 5px 5px 0}.md-drppicker .btn{position:relative;overflow:hidden;border-width:0;outline:none;padding:0 6px;cursor:pointer;border-radius:2px;box-shadow:0 1px 4px #0009;background-color:#3f51b5;color:#ecf0f1;transition:background-color .4s;height:auto;text-transform:uppercase;line-height:36px;border:none}.md-drppicker .btn:hover,.md-drppicker .btn:focus{background-color:#3f51b5}.md-drppicker .btn>*{position:relative}.md-drppicker .btn span{display:block;padding:12px 24px}.md-drppicker .btn:before{content:"";position:absolute;top:50%;left:50%;display:block;width:0;padding-top:0;border-radius:100%;background-color:#ecf0f14d;transform:translate(-50%,-50%)}.md-drppicker .btn:active:before{width:120%;padding-top:120%;transition:width .2s ease-out,padding-top .2s ease-out}.md-drppicker .btn:disabled{opacity:.5}.md-drppicker .btn.btn-default{color:#000;background-color:#dcdcdc}.md-drppicker .clear{box-shadow:none;background-color:#fff!important}.md-drppicker .clear svg{color:#eb3232;fill:currentColor}@media (min-width: 564px){.md-drppicker{width:auto}.md-drppicker.single .calendar.left{clear:none}.md-drppicker.ltr{direction:ltr;text-align:left}.md-drppicker.ltr .calendar.left{clear:left}.md-drppicker.ltr .calendar.left .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.md-drppicker.ltr .calendar.right{margin-left:0}.md-drppicker.ltr .calendar.right .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.ltr .left .md-drppicker_input,.md-drppicker.ltr .right .md-drppicker_input{padding-right:35px}.md-drppicker.ltr .calendar.left .calendar-table{padding-right:12px}.md-drppicker.ltr .ranges,.md-drppicker.ltr .calendar{float:left}.md-drppicker.rtl{direction:rtl;text-align:right}.md-drppicker.rtl .calendar.left{clear:right;margin-left:0}.md-drppicker.rtl .calendar.left .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.rtl .calendar.right{margin-right:0}.md-drppicker.rtl .calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.md-drppicker.rtl .left .md-drppicker_input,.md-drppicker.rtl .calendar.left .calendar-table{padding-left:12px}.md-drppicker.rtl .ranges,.md-drppicker.rtl .calendar{text-align:right;float:right}.drp-animate{transform:translate(0);transition:transform .2s ease,opacity .2s ease}.drp-animate.drp-picker-site-this{transition-timing-function:linear}.drp-animate.drp-animate-right{transform:translate(10%);opacity:0}.drp-animate.drp-animate-left{transform:translate(-10%);opacity:0}}@media (min-width: 730px){.md-drppicker .ranges{width:auto}.md-drppicker.ltr .ranges{float:left}.md-drppicker.rtl .ranges{float:right}.md-drppicker .calendar.left{clear:none!important}}\n'],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DaterangepickerComponent, [{
    type: Component,
    args: [{
      selector: "ngx-daterangepicker-material",
      encapsulation: ViewEncapsulation.None,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DaterangepickerComponent),
        multi: true
      }],
      template: `<div
    class="md-drppicker"
    #pickerContainer
    [ngClass]="{
        ltr: locale.direction === 'ltr',
        rtl: this.locale.direction === 'rtl',
        shown: isShown || inline,
        hidden: !isShown && !inline,
        inline: inline,
        double: !singleDatePicker && showCalInRanges,
        'show-ranges': rangesArray.length
    }"
    [class]="'drops-' + drops + '-' + opens">
    <ng-container *ngIf="rangesArray.length">
        <div class="ranges">
            <ul>
                <li *ngFor="let range of rangesArray">
                    <button
                        type="button"
                        (click)="clickRange($event, range)"
                        [disabled]="disableRange(range)"
                        [ngClass]="{ active: range === chosenRange }">
                        {{ range }}
                    </button>
                </li>
            </ul>
        </div>
    </ng-container>
    <div class="calendar" [ngClass]="{ right: singleDatePicker, left: !singleDatePicker }" *ngIf="showCalInRanges">
        <div class="calendar-table">
            <table class="table-condensed" *ngIf="calendarVariables">
                <thead>
                    <tr>
                        <th *ngIf="showWeekNumbers || showISOWeekNumbers"></th>
                        <ng-container
                            *ngIf="
                                !calendarVariables.left.minDate ||
                                (calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) &&
                                    (!this.linkedCalendars || true))
                            ">
                            <th (click)="clickPrev(sideEnum.left)" class="prev available"></th>
                        </ng-container>
                        <ng-container
                            *ngIf="
                                !(
                                    !calendarVariables.left.minDate ||
                                    (calendarVariables.left.minDate.isBefore(calendarVariables.left.calendar.firstDay) &&
                                        (!this.linkedCalendars || true))
                                )
                            ">
                            <th></th>
                        </ng-container>
                        <th colspan="5" class="month drp-animate">
                            <ng-container *ngIf="showDropdowns && calendarVariables.left.dropdowns">
                                <div class="dropdowns">
                                    {{ this.locale.monthNames[calendarVariables?.left?.calendar[1][1].month()] }}
                                    <select class="monthselect" (change)="monthChanged($event, sideEnum.left)">
                                        <option
                                            [disabled]="
                                                (calendarVariables.left.dropdowns.inMinYear &&
                                                    m < calendarVariables.left.minDate.month()) ||
                                                (calendarVariables.left.dropdowns.inMaxYear && m > calendarVariables.left.maxDate.month())
                                            "
                                            *ngFor="let m of calendarVariables.left.dropdowns.monthArrays"
                                            [value]="m"
                                            [selected]="calendarVariables.left.dropdowns.currentMonth === m">
                                            {{ locale.monthNames[m] }}
                                        </option>
                                    </select>
                                </div>
                                <div class="dropdowns">
                                    {{ calendarVariables?.left?.calendar[1][1].format(' YYYY') }}
                                    <select class="yearselect" (change)="yearChanged($event, sideEnum.left)">
                                        <option
                                            *ngFor="let y of calendarVariables.left.dropdowns.yearArrays"
                                            [selected]="y === calendarVariables.left.dropdowns.currentYear">
                                            {{ y }}
                                        </option>
                                    </select>
                                </div>
                            </ng-container>
                            <ng-container *ngIf="!showDropdowns || !calendarVariables.left.dropdowns">
                                {{ this.locale.monthNames[calendarVariables?.left?.calendar[1][1].month()] }}
                                {{ calendarVariables?.left?.calendar[1][1].format(' YYYY') }}
                            </ng-container>
                        </th>
                        <ng-container
                            *ngIf="
                                (!calendarVariables.left.maxDate ||
                                    calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) &&
                                (!linkedCalendars || singleDatePicker)
                            ">
                            <th class="next available" (click)="clickNext(sideEnum.left)"></th>
                        </ng-container>
                        <ng-container
                            *ngIf="
                                !(
                                    (!calendarVariables.left.maxDate ||
                                        calendarVariables.left.maxDate.isAfter(calendarVariables.left.calendar.lastDay)) &&
                                    (!linkedCalendars || singleDatePicker)
                                )
                            ">
                            <th></th>
                        </ng-container>
                    </tr>
                    <tr class="week-days">
                        <th *ngIf="showWeekNumbers || showISOWeekNumbers" class="week">
                            <span>{{ this.locale.weekLabel }}</span>
                        </th>
                        <th *ngFor="let dayofweek of locale.daysOfWeek">
                            <span>{{ dayofweek }}</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="drp-animate">
                    <tr *ngFor="let row of calendarVariables.left.calRows" [class]="calendarVariables.left.classes[row].classList">
                        <!-- add week number -->
                        <td class="week" *ngIf="showWeekNumbers">
                            <span>{{ calendarVariables.left.calendar[row][0].week() }}</span>
                        </td>
                        <td class="week" *ngIf="showISOWeekNumbers">
                            <span>{{ calendarVariables.left.calendar[row][0].isoWeek() }}</span>
                        </td>
                        <!-- cal -->
                        <td
                            *ngFor="let col of calendarVariables.left.calCols"
                            [class]="calendarVariables.left.classes[row][col]"
                            (click)="clickDate($event, sideEnum.left, row, col)"
                            (mouseenter)="hoverDate($event, sideEnum.left, row, col)">
                            <span>{{ calendarVariables.left.calendar[row][col].date() }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="calendar-time" *ngIf="timePicker">
            <div class="select">
                <select
                    class="hourselect select-item"
                    [disabled]="!startDate"
                    [(ngModel)]="timepickerVariables.left.selectedHour"
                    (ngModelChange)="timeChanged($event, sideEnum.left)">
                    <option
                        *ngFor="let i of timepickerVariables.left.hours"
                        [value]="i"
                        [disabled]="timepickerVariables.left.disabledHours.indexOf(i) > -1">
                        {{ i }}
                    </option>
                </select>
            </div>
            <div class="select">
                <select
                    class="select-item minuteselect"
                    [disabled]="!startDate"
                    [(ngModel)]="timepickerVariables.left.selectedMinute"
                    (ngModelChange)="timeChanged($event, sideEnum.left)">
                    <option
                        *ngFor="let i of timepickerVariables.left.minutes; let index = index"
                        [value]="i"
                        [disabled]="timepickerVariables.left.disabledMinutes.indexOf(i) > -1">
                        {{ timepickerVariables.left.minutesLabel[index] }}
                    </option>
                </select>
                <span class="select-highlight"></span>
                <span class="select-bar"></span>
            </div>
            <div class="select">
                <select
                    class="select-item secondselect"
                    *ngIf="timePickerSeconds"
                    [disabled]="!startDate"
                    [(ngModel)]="timepickerVariables.left.selectedSecond"
                    (ngModelChange)="timeChanged($event, sideEnum.left)">
                    <option
                        *ngFor="let i of timepickerVariables.left.seconds; let index = index"
                        [value]="i"
                        [disabled]="timepickerVariables.left.disabledSeconds.indexOf(i) > -1">
                        {{ timepickerVariables.left.secondsLabel[index] }}
                    </option>
                </select>
                <span class="select-highlight"></span>
                <span class="select-bar"></span>
            </div>
            <div class="select">
                <select
                    class="select-item ampmselect"
                    *ngIf="!timePicker24Hour"
                    [(ngModel)]="timepickerVariables.left.ampmModel"
                    (ngModelChange)="timeChanged($event, sideEnum.left)">
                    <option value="AM" [disabled]="timepickerVariables.left.amDisabled">AM</option>
                    <option value="PM" [disabled]="timepickerVariables.left.pmDisabled">PM</option>
                </select>
                <span class="select-highlight"></span>
                <span class="select-bar"></span>
            </div>
        </div>
    </div>
    <div class="calendar right" *ngIf="showCalInRanges && !singleDatePicker">
        <div class="calendar-table">
            <table class="table-condensed" *ngIf="calendarVariables">
                <thead>
                    <tr>
                        <th *ngIf="showWeekNumbers || showISOWeekNumbers"></th>
                        <ng-container
                            *ngIf="
                                (!calendarVariables.right.minDate ||
                                    calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) &&
                                !this.linkedCalendars
                            ">
                            <th (click)="clickPrev(sideEnum.right)" class="prev available"></th>
                        </ng-container>
                        <ng-container
                            *ngIf="
                                !(
                                    (!calendarVariables.right.minDate ||
                                        calendarVariables.right.minDate.isBefore(calendarVariables.right.calendar.firstDay)) &&
                                    !this.linkedCalendars
                                )
                            ">
                            <th></th>
                        </ng-container>
                        <th colspan="5" class="month">
                            <ng-container *ngIf="showDropdowns && calendarVariables.right.dropdowns">
                                <div class="dropdowns">
                                    {{ this.locale.monthNames[calendarVariables?.right?.calendar[1][1].month()] }}
                                    <select class="monthselect" (change)="monthChanged($event, sideEnum.right)">
                                        <option
                                            [disabled]="
                                                (calendarVariables.right.dropdowns.inMinYear &&
                                                    calendarVariables.right.minDate &&
                                                    m < calendarVariables.right.minDate.month()) ||
                                                (calendarVariables.right.dropdowns.inMaxYear &&
                                                    calendarVariables.right.maxDate &&
                                                    m > calendarVariables.right.maxDate.month())
                                            "
                                            *ngFor="let m of calendarVariables.right.dropdowns.monthArrays"
                                            [value]="m"
                                            [selected]="calendarVariables.right.dropdowns.currentMonth === m">
                                            {{ locale.monthNames[m] }}
                                        </option>
                                    </select>
                                </div>
                                <div class="dropdowns">
                                    {{ calendarVariables?.right?.calendar[1][1].format(' YYYY') }}
                                    <select class="yearselect" (change)="yearChanged($event, sideEnum.right)">
                                        <option
                                            *ngFor="let y of calendarVariables.right.dropdowns.yearArrays"
                                            [selected]="y === calendarVariables.right.dropdowns.currentYear">
                                            {{ y }}
                                        </option>
                                    </select>
                                </div>
                            </ng-container>
                            <ng-container *ngIf="!showDropdowns || !calendarVariables.right.dropdowns">
                                {{ this.locale.monthNames[calendarVariables?.right?.calendar[1][1].month()] }}
                                {{ calendarVariables?.right?.calendar[1][1].format(' YYYY') }}
                            </ng-container>
                        </th>
                        <ng-container
                            *ngIf="
                                !calendarVariables.right.maxDate ||
                                (calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) &&
                                    (!linkedCalendars || singleDatePicker || true))
                            ">
                            <th class="next available" (click)="clickNext(sideEnum.right)"></th>
                        </ng-container>
                        <ng-container
                            *ngIf="
                                !(
                                    !calendarVariables.right.maxDate ||
                                    (calendarVariables.right.maxDate.isAfter(calendarVariables.right.calendar.lastDay) &&
                                        (!linkedCalendars || singleDatePicker || true))
                                )
                            ">
                            <th></th>
                        </ng-container>
                    </tr>

                    <tr class="week-days">
                        <th *ngIf="showWeekNumbers || showISOWeekNumbers" class="week">
                            <span>{{ this.locale.weekLabel }}</span>
                        </th>
                        <th *ngFor="let dayofweek of locale.daysOfWeek">
                            <span>{{ dayofweek }}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let row of calendarVariables.right.calRows" [class]="calendarVariables.right.classes[row].classList">
                        <td class="week" *ngIf="showWeekNumbers">
                            <span>{{ calendarVariables.right.calendar[row][0].week() }}</span>
                        </td>
                        <td class="week" *ngIf="showISOWeekNumbers">
                            <span>{{ calendarVariables.right.calendar[row][0].isoWeek() }}</span>
                        </td>
                        <td
                            *ngFor="let col of calendarVariables.right.calCols"
                            [class]="calendarVariables.right.classes[row][col]"
                            (click)="clickDate($event, sideEnum.right, row, col)"
                            (mouseenter)="hoverDate($event, sideEnum.right, row, col)">
                            <span>{{ calendarVariables.right.calendar[row][col].date() }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="calendar-time" *ngIf="timePicker">
            <div class="select">
                <select
                    class="select-item hourselect"
                    [disabled]="!startDate"
                    [(ngModel)]="timepickerVariables.right.selectedHour"
                    (ngModelChange)="timeChanged($event, sideEnum.right)">
                    <option
                        *ngFor="let i of timepickerVariables.right.hours"
                        [value]="i"
                        [disabled]="timepickerVariables.right.disabledHours.indexOf(i) > -1">
                        {{ i }}
                    </option>
                </select>
                <span class="select-highlight"></span>
                <span class="select-bar"></span>
            </div>
            <div class="select">
                <select
                    class="select-item minuteselect"
                    [disabled]="!startDate"
                    [(ngModel)]="timepickerVariables.right.selectedMinute"
                    (ngModelChange)="timeChanged($event, sideEnum.right)">
                    <option
                        *ngFor="let i of timepickerVariables.right.minutes; let index = index"
                        [value]="i"
                        [disabled]="timepickerVariables.right.disabledMinutes.indexOf(i) > -1">
                        {{ timepickerVariables.right.minutesLabel[index] }}
                    </option>
                </select>
                <span class="select-highlight"></span>
                <span class="select-bar"></span>
            </div>
            <div class="select">
                <select
                    *ngIf="timePickerSeconds"
                    class="select-item secondselect"
                    [disabled]="!startDate"
                    [(ngModel)]="timepickerVariables.right.selectedSecond"
                    (ngModelChange)="timeChanged($event, sideEnum.right)">
                    <option
                        *ngFor="let i of timepickerVariables.right.seconds; let index = index"
                        [value]="i"
                        [disabled]="timepickerVariables.right.disabledSeconds.indexOf(i) > -1">
                        {{ timepickerVariables.right.secondsLabel[index] }}
                    </option>
                </select>
                <span class="select-highlight"></span>
                <span class="select-bar"></span>
            </div>
            <div class="select">
                <select
                    *ngIf="!timePicker24Hour"
                    class="select-item ampmselect"
                    [(ngModel)]="timepickerVariables.right.ampmModel"
                    (ngModelChange)="timeChanged($event, sideEnum.right)">
                    <option value="AM" [disabled]="timepickerVariables.right.amDisabled">AM</option>
                    <option value="PM" [disabled]="timepickerVariables.right.pmDisabled">PM</option>
                </select>
                <span class="select-highlight"></span>
                <span class="select-bar"></span>
            </div>
        </div>
    </div>
    <div class="buttons" *ngIf="!autoApply && (!rangesArray.length || (showCalInRanges && !singleDatePicker))">
        <div class="buttons_input">
            <button *ngIf="showClearButton" class="btn btn-default clear" type="button" (click)="clear()" [title]="locale.clearLabel">
                {{ locale.clearLabel }}
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 -5 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
            </button>
            <button class="btn btn-default" *ngIf="showCancel" type="button" (click)="clickCancel($event)">{{ locale.cancelLabel }}</button>
            <button class="btn" [disabled]="applyBtn.disabled" type="button" (click)="clickApply($event)">{{ locale.applyLabel }}</button>
        </div>
    </div>
</div>
`,
      styles: ['.md-drppicker{position:absolute;font-family:Roboto,sans-serif;color:inherit;border-radius:4px;width:278px;padding:4px;margin-top:-10px;overflow:hidden;z-index:1000;font-size:14px;background-color:#fff;box-shadow:0 2px 4px #00000029,0 2px 8px #0000001f}.md-drppicker.double{width:auto}.md-drppicker.inline{position:relative;display:inline-block}.md-drppicker:before,.md-drppicker:after{position:absolute;display:inline-block;border-bottom-color:#0003;content:""}.md-drppicker.openscenter:before{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.md-drppicker.openscenter:after{left:0;right:0;width:0;margin-left:auto;margin-right:auto}.md-drppicker.single .ranges,.md-drppicker.single .calendar{float:none}.md-drppicker.shown{transform:scale(1);transition:all .1s ease-in-out;transform-origin:0 0;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.md-drppicker.shown.drops-up-left{transform-origin:100% 100%}.md-drppicker.shown.drops-up-right{transform-origin:0 100%}.md-drppicker.shown.drops-down-left{transform-origin:100% 0}.md-drppicker.shown.drops-down-right{transform-origin:0 0}.md-drppicker.shown.drops-down-center{transform-origin:NaN%}.md-drppicker.shown.drops-up-center{transform-origin:50%}.md-drppicker.shown .calendar{display:block}.md-drppicker.hidden{transition:all .1s ease;transform:scale(0);transform-origin:0 0;cursor:default;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.md-drppicker.hidden.drops-up-left{transform-origin:100% 100%}.md-drppicker.hidden.drops-up-right{transform-origin:0 100%}.md-drppicker.hidden.drops-down-left{transform-origin:100% 0}.md-drppicker.hidden.drops-down-right{transform-origin:0 0}.md-drppicker.hidden.drops-down-center{transform-origin:50% 0}.md-drppicker.hidden.drops-up-center{transform-origin:50% 100%}.md-drppicker.hidden .calendar{display:none}.md-drppicker .calendar{max-width:270px;margin:4px}.md-drppicker .calendar.single .calendar-table{border:none}.md-drppicker .calendar th,.md-drppicker .calendar td{padding:0;white-space:nowrap;text-align:center;min-width:32px}.md-drppicker .calendar th span,.md-drppicker .calendar td span{pointer-events:none}.md-drppicker .calendar-table{border:1px solid #fff;padding:4px;border-radius:4px;background-color:#fff}.md-drppicker table{width:100%;margin:0}.md-drppicker th{color:#988c8c}.md-drppicker td,.md-drppicker th{text-align:center;width:20px;height:20px;border-radius:4px;border:1px solid transparent;white-space:nowrap;cursor:pointer;height:2em;width:2em}.md-drppicker td.available.prev,.md-drppicker th.available.prev{display:block;background-image:url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMy43IDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMuNyA2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0zLjcsMC43TDEuNCwzbDIuMywyLjNMMyw2TDAsM2wzLTNMMy43LDAuN3oiLz4NCjwvZz4NCjwvc3ZnPg0K);background-repeat:no-repeat;background-size:.5em;background-position:center;opacity:.8;transition:background-color .2s ease;border-radius:2em}.md-drppicker td.available.prev:hover,.md-drppicker th.available.prev:hover{margin:0}.md-drppicker td.available.next,.md-drppicker th.available.next{transform:rotate(180deg);display:block;background-image:url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMy43IDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMuNyA2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxwYXRoIGQ9Ik0zLjcsMC43TDEuNCwzbDIuMywyLjNMMyw2TDAsM2wzLTNMMy43LDAuN3oiLz4NCjwvZz4NCjwvc3ZnPg0K);background-repeat:no-repeat;background-size:.5em;background-position:center;opacity:.8;transition:background-color .2s ease;border-radius:2em}.md-drppicker td.available.next:hover,.md-drppicker th.available.next:hover{margin:0;transform:rotate(180deg)}.md-drppicker td.available:hover,.md-drppicker th.available:hover{background-color:#eee;border-color:transparent;color:inherit;background-repeat:no-repeat;background-size:.5em;background-position:center;margin:.25em 0;opacity:.8;border-radius:2em;transform:scale(1);transition:all .45s cubic-bezier(.23,1,.32,1) 0ms}.md-drppicker td.week,.md-drppicker th.week{font-size:80%;color:#ccc}.md-drppicker td{margin:.25em 0;opacity:.8;transition:background-color .2s ease;border-radius:2em;transform:scale(1);transition:all .45s cubic-bezier(.23,1,.32,1) 0ms}.md-drppicker td.off,.md-drppicker td.off.in-range,.md-drppicker td.off.start-date,.md-drppicker td.off.end-date{background-color:#fff;border-color:transparent;color:#999}.md-drppicker td.in-range{background-color:#dde2e4;border-color:transparent;color:#000;border-radius:0}.md-drppicker td.start-date{border-radius:2em 0 0 2em}.md-drppicker td.end-date{border-radius:0 2em 2em 0}.md-drppicker td.start-date.end-date{border-radius:4px}.md-drppicker td.active{transition:background .3s ease-out;background:rgba(0,0,0,.1)}.md-drppicker td.active,.md-drppicker td.active:hover{background-color:#3f51b5;border-color:transparent;color:#fff}.md-drppicker th.month{width:auto}.md-drppicker td.disabled,.md-drppicker option.disabled{color:#999;cursor:not-allowed;text-decoration:line-through}.md-drppicker .dropdowns{background-repeat:no-repeat;background-size:10px;background-position-y:center;background-position-x:right;width:50px;background-image:url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI1NSAyNTUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI1NSAyNTU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iYXJyb3ctZHJvcC1kb3duIj4KCQk8cG9seWdvbiBwb2ludHM9IjAsNjMuNzUgMTI3LjUsMTkxLjI1IDI1NSw2My43NSAgICIgZmlsbD0iIzk4OGM4YyIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)}.md-drppicker .dropdowns select{display:inline-block;background-color:#ffffffe6;width:100%;padding:5px;border:1px solid #f2f2f2;border-radius:2px;height:3rem}.md-drppicker .dropdowns select.monthselect,.md-drppicker .dropdowns select.yearselect{font-size:12px;padding:1px;height:auto;margin:0;cursor:default}.md-drppicker .dropdowns select.hourselect,.md-drppicker .dropdowns select.minuteselect,.md-drppicker .dropdowns select.secondselect,.md-drppicker .dropdowns select.ampmselect{width:50px;margin:0 auto;background:#eee;border:1px solid #eee;padding:2px;outline:0;font-size:12px}.md-drppicker .dropdowns select.monthselect,.md-drppicker .dropdowns select.yearselect{cursor:pointer;opacity:0;position:absolute;top:0;left:0;margin:0;padding:0}.md-drppicker th.month>div{position:relative;display:inline-block}.md-drppicker .calendar-time{text-align:center;margin:4px auto 0;line-height:30px;position:relative}.md-drppicker .calendar-time .select{display:inline}.md-drppicker .calendar-time .select .select-item{display:inline-block;width:auto;position:relative;font-family:inherit;background-color:transparent;padding:10px 10px 10px 0;font-size:18px;border-radius:0;border:none;border-bottom:1px solid rgba(0,0,0,.12)}.md-drppicker .calendar-time .select .select-item:after{position:absolute;top:18px;right:10px;width:0;height:0;padding:0;content:"";border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid rgba(0,0,0,.12);pointer-events:none}.md-drppicker .calendar-time .select .select-item:focus{outline:none}.md-drppicker .calendar-time .select .select-item .select-label{color:#00000042;font-size:16px;font-weight:400;position:absolute;pointer-events:none;left:0;top:10px;transition:.2s ease all}.md-drppicker .calendar-time select.disabled{color:#ccc;cursor:not-allowed}.md-drppicker .label-input{border:1px solid #ccc;border-radius:4px;color:#555;height:30px;line-height:30px;display:block;vertical-align:middle;margin:0 auto 5px;padding:0 0 0 28px;width:100%}.md-drppicker .label-input.active{border:1px solid #08c;border-radius:4px}.md-drppicker .md-drppicker_input{position:relative;padding:0 30px 0 0}.md-drppicker .md-drppicker_input i,.md-drppicker .md-drppicker_input svg{position:absolute;left:8px;top:8px}.md-drppicker.rtl .label-input{padding-right:28px;padding-left:6px}.md-drppicker.rtl .md-drppicker_input i,.md-drppicker.rtl .md-drppicker_input svg{left:auto;right:8px}.md-drppicker .show-ranges .drp-calendar.left{border-left:1px solid #ddd}.md-drppicker .ranges{float:none;text-align:left;margin:0}.md-drppicker .ranges ul{list-style:none;margin:0 auto;padding:0;width:100%}.md-drppicker .ranges ul li{font-size:12px}.md-drppicker .ranges ul li button{padding:8px 12px;width:100%;background:none;border:none;text-align:left;cursor:pointer}.md-drppicker .ranges ul li button.active{background-color:#3f51b5;color:#fff}.md-drppicker .ranges ul li button[disabled]{opacity:.3}.md-drppicker .ranges ul li button:active{background:transparent}.md-drppicker .ranges ul li:hover{background-color:#eee}.md-drppicker .show-calendar .ranges{margin-top:8px}.md-drppicker [hidden]{display:none}.md-drppicker .buttons{text-align:right;margin:0 5px 5px 0}.md-drppicker .btn{position:relative;overflow:hidden;border-width:0;outline:none;padding:0 6px;cursor:pointer;border-radius:2px;box-shadow:0 1px 4px #0009;background-color:#3f51b5;color:#ecf0f1;transition:background-color .4s;height:auto;text-transform:uppercase;line-height:36px;border:none}.md-drppicker .btn:hover,.md-drppicker .btn:focus{background-color:#3f51b5}.md-drppicker .btn>*{position:relative}.md-drppicker .btn span{display:block;padding:12px 24px}.md-drppicker .btn:before{content:"";position:absolute;top:50%;left:50%;display:block;width:0;padding-top:0;border-radius:100%;background-color:#ecf0f14d;transform:translate(-50%,-50%)}.md-drppicker .btn:active:before{width:120%;padding-top:120%;transition:width .2s ease-out,padding-top .2s ease-out}.md-drppicker .btn:disabled{opacity:.5}.md-drppicker .btn.btn-default{color:#000;background-color:#dcdcdc}.md-drppicker .clear{box-shadow:none;background-color:#fff!important}.md-drppicker .clear svg{color:#eb3232;fill:currentColor}@media (min-width: 564px){.md-drppicker{width:auto}.md-drppicker.single .calendar.left{clear:none}.md-drppicker.ltr{direction:ltr;text-align:left}.md-drppicker.ltr .calendar.left{clear:left}.md-drppicker.ltr .calendar.left .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.md-drppicker.ltr .calendar.right{margin-left:0}.md-drppicker.ltr .calendar.right .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.ltr .left .md-drppicker_input,.md-drppicker.ltr .right .md-drppicker_input{padding-right:35px}.md-drppicker.ltr .calendar.left .calendar-table{padding-right:12px}.md-drppicker.ltr .ranges,.md-drppicker.ltr .calendar{float:left}.md-drppicker.rtl{direction:rtl;text-align:right}.md-drppicker.rtl .calendar.left{clear:right;margin-left:0}.md-drppicker.rtl .calendar.left .calendar-table{border-left:none;border-top-left-radius:0;border-bottom-left-radius:0}.md-drppicker.rtl .calendar.right{margin-right:0}.md-drppicker.rtl .calendar.right .calendar-table{border-right:none;border-top-right-radius:0;border-bottom-right-radius:0}.md-drppicker.rtl .left .md-drppicker_input,.md-drppicker.rtl .calendar.left .calendar-table{padding-left:12px}.md-drppicker.rtl .ranges,.md-drppicker.rtl .calendar{text-align:right;float:right}.drp-animate{transform:translate(0);transition:transform .2s ease,opacity .2s ease}.drp-animate.drp-picker-site-this{transition-timing-function:linear}.drp-animate.drp-animate-right{transform:translate(10%);opacity:0}.drp-animate.drp-animate-left{transform:translate(-10%);opacity:0}}@media (min-width: 730px){.md-drppicker .ranges{width:auto}.md-drppicker.ltr .ranges{float:left}.md-drppicker.rtl .ranges{float:right}.md-drppicker .calendar.left{clear:none!important}}\n']
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: ChangeDetectorRef
    }, {
      type: LocaleService
    }];
  }, {
    startDate: [{
      type: Input
    }],
    endDate: [{
      type: Input
    }],
    dateLimit: [{
      type: Input
    }],
    autoApply: [{
      type: Input
    }],
    singleDatePicker: [{
      type: Input
    }],
    showDropdowns: [{
      type: Input
    }],
    showWeekNumbers: [{
      type: Input
    }],
    showISOWeekNumbers: [{
      type: Input
    }],
    linkedCalendars: [{
      type: Input
    }],
    autoUpdateInput: [{
      type: Input
    }],
    alwaysShowCalendars: [{
      type: Input
    }],
    maxSpan: [{
      type: Input
    }],
    lockStartDate: [{
      type: Input
    }],
    timePicker: [{
      type: Input
    }],
    timePicker24Hour: [{
      type: Input
    }],
    timePickerIncrement: [{
      type: Input
    }],
    timePickerSeconds: [{
      type: Input
    }],
    showClearButton: [{
      type: Input
    }],
    firstMonthDayClass: [{
      type: Input
    }],
    lastMonthDayClass: [{
      type: Input
    }],
    emptyWeekRowClass: [{
      type: Input
    }],
    emptyWeekColumnClass: [{
      type: Input
    }],
    firstDayOfNextMonthClass: [{
      type: Input
    }],
    lastDayOfPreviousMonthClass: [{
      type: Input
    }],
    showCustomRangeLabel: [{
      type: Input
    }],
    showCancel: [{
      type: Input
    }],
    keepCalendarOpeningWithRange: [{
      type: Input
    }],
    showRangeLabelOnInput: [{
      type: Input
    }],
    customRangeDirection: [{
      type: Input
    }],
    drops: [{
      type: Input
    }],
    opens: [{
      type: Input
    }],
    closeOnAutoApply: [{
      type: Input
    }],
    choosedDate: [{
      type: Output
    }],
    rangeClicked: [{
      type: Output
    }],
    datesUpdated: [{
      type: Output
    }],
    startDateChanged: [{
      type: Output
    }],
    endDateChanged: [{
      type: Output
    }],
    cancelClicked: [{
      type: Output
    }],
    clearClicked: [{
      type: Output
    }],
    pickerContainer: [{
      type: ViewChild,
      args: ["pickerContainer", {
        static: true
      }]
    }],
    minDate: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    ranges: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    isInvalidDate: [{
      type: Input
    }],
    isCustomDate: [{
      type: Input
    }],
    isTooltipDate: [{
      type: Input
    }],
    handleInternalClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var _DaterangepickerDirective = class _DaterangepickerDirective {
  constructor(viewContainerRef, ref, el, renderer, differs, localeHolderService, elementRef) {
    this.viewContainerRef = viewContainerRef;
    this.ref = ref;
    this.el = el;
    this.renderer = renderer;
    this.differs = differs;
    this.localeHolderService = localeHolderService;
    this.elementRef = elementRef;
    this.onChange = new EventEmitter();
    this.rangeClicked = new EventEmitter();
    this.datesUpdated = new EventEmitter();
    this.startDateChanged = new EventEmitter();
    this.endDateChanged = new EventEmitter();
    this.clearClicked = new EventEmitter();
    this.dateLimit = null;
    this.showCancel = false;
    this.lockStartDate = false;
    this.timePicker = false;
    this.timePicker24Hour = false;
    this.timePickerIncrement = 1;
    this.timePickerSeconds = false;
    this.closeOnAutoApply = true;
    this.notForChangesProperty = ["locale", "endKey", "startKey"];
    this.onChangeFn = Function.prototype;
    this.onTouched = Function.prototype;
    this.validatorChange = Function.prototype;
    this.localeHolder = {};
    this.endKey = "endDate";
    this.startKey = "startDate";
    this.drops = "down";
    this.opens = "auto";
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(DaterangepickerComponent);
    this.picker = componentRef.instance;
    this.picker.inline = false;
  }
  get disabled() {
    return this.disabledHolder;
  }
  set startKey(value) {
    if (value !== null) {
      this.startKeyHolder = value;
    } else {
      this.startKeyHolder = "startDate";
    }
  }
  get locale() {
    return this.localeHolder;
  }
  set locale(value) {
    this.localeHolder = __spreadValues(__spreadValues({}, this.localeHolderService.config), value);
  }
  set endKey(value) {
    if (value !== null) {
      this.endKeyHolder = value;
    } else {
      this.endKeyHolder = "endDate";
    }
  }
  get value() {
    return this.valueHolder || null;
  }
  set value(val) {
    this.valueHolder = val;
    this.onChangeFn(val);
    this.ref.markForCheck();
  }
  outsideClick(event) {
    if (!event.target) {
      return;
    }
    if (event.target.classList.contains("ngx-daterangepicker-action")) {
      return;
    }
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hide();
    }
  }
  hide(e) {
    this.picker.hide(e);
  }
  onBlur() {
    this.onTouched();
  }
  inputChanged(e) {
    if (e.target.tagName.toLowerCase() !== "input") {
      return;
    }
    if (!e.target.value.length) {
      return;
    }
    const dateString = e.target.value.split(this.picker.locale.separator);
    let start = null;
    let end = null;
    if (dateString.length === 2) {
      start = esm_default(dateString[0], this.picker.locale.format);
      end = esm_default(dateString[1], this.picker.locale.format);
    }
    if (this.singleDatePicker || start === null || end === null) {
      start = esm_default(e.target.value, this.picker.locale.format);
      end = start;
    }
    if (!start.isValid() || !end.isValid()) {
      return;
    }
    this.picker.setStartDate(start);
    this.picker.setEndDate(end);
    this.picker.updateView();
  }
  open(event) {
    if (this.disabled) {
      return;
    }
    this.picker.show(event);
    setTimeout(() => {
      this.setPosition();
    });
  }
  ngOnInit() {
    this.picker.startDateChanged.asObservable().subscribe((itemChanged) => {
      this.startDateChanged.emit(itemChanged);
    });
    this.picker.endDateChanged.asObservable().subscribe((itemChanged) => {
      this.endDateChanged.emit(itemChanged);
    });
    this.picker.rangeClicked.asObservable().subscribe((range) => {
      this.rangeClicked.emit(range);
    });
    this.picker.datesUpdated.asObservable().subscribe((range) => {
      this.datesUpdated.emit(range);
    });
    this.picker.clearClicked.asObservable().subscribe(() => {
      this.clearClicked.emit();
    });
    this.picker.choosedDate.asObservable().subscribe((change) => {
      if (change) {
        const value = {
          [this.startKeyHolder]: change.startDate,
          [this.endKeyHolder]: change.endDate
        };
        this.value = value;
        this.onChange.emit(value);
        if (typeof change.chosenLabel === "string") {
          this.el.nativeElement.value = change.chosenLabel;
        }
      }
    });
    this.picker.firstMonthDayClass = this.firstMonthDayClass;
    this.picker.lastMonthDayClass = this.lastMonthDayClass;
    this.picker.emptyWeekRowClass = this.emptyWeekRowClass;
    this.picker.emptyWeekColumnClass = this.emptyWeekColumnClass;
    this.picker.firstDayOfNextMonthClass = this.firstDayOfNextMonthClass;
    this.picker.lastDayOfPreviousMonthClass = this.lastDayOfPreviousMonthClass;
    this.picker.drops = this.drops;
    this.picker.opens = this.opens;
    this.localeDiffer = this.differs.find(this.locale).create();
    this.picker.closeOnAutoApply = this.closeOnAutoApply;
  }
  ngOnChanges(changes) {
    for (const change in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, change)) {
        if (this.notForChangesProperty.indexOf(change) === -1) {
          this.picker[change] = changes[change].currentValue;
        }
      }
    }
  }
  ngDoCheck() {
    if (this.localeDiffer) {
      const changes = this.localeDiffer.diff(this.locale);
      if (changes) {
        this.picker.updateLocale(this.locale);
      }
    }
  }
  toggle(e) {
    if (this.picker.isShown) {
      this.hide(e);
    } else {
      this.open(e);
    }
  }
  clear() {
    this.picker.clear();
  }
  writeValue(value) {
    this.setValue(value);
  }
  registerOnChange(fn) {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(state) {
    this.disabledHolder = state;
  }
  setPosition() {
    let style;
    let containerTop;
    const container = this.picker.pickerContainer.nativeElement;
    const element = this.el.nativeElement;
    if (this.drops && this.drops === "up") {
      containerTop = element.offsetTop - container.clientHeight + "px";
    } else {
      containerTop = "auto";
    }
    if (this.opens === "left") {
      style = {
        top: containerTop,
        left: element.offsetLeft - container.clientWidth + element.clientWidth + "px",
        right: "auto"
      };
    } else if (this.opens === "center") {
      style = {
        top: containerTop,
        left: element.offsetLeft + element.clientWidth / 2 - container.clientWidth / 2 + "px",
        right: "auto"
      };
    } else if (this.opens === "right") {
      style = {
        top: containerTop,
        left: element.offsetLeft + "px",
        right: "auto"
      };
    } else {
      const position = element.offsetLeft + element.clientWidth / 2 - container.clientWidth / 2;
      if (position < 0) {
        style = {
          top: containerTop,
          left: element.offsetLeft + "px",
          right: "auto"
        };
      } else {
        style = {
          top: containerTop,
          left: position + "px",
          right: "auto"
        };
      }
    }
    if (style) {
      this.renderer.setStyle(container, "top", style.top);
      this.renderer.setStyle(container, "left", style.left);
      this.renderer.setStyle(container, "right", style.right);
    }
  }
  setValue(val) {
    if (val) {
      this.value = val;
      if (val[this.startKeyHolder]) {
        this.picker.setStartDate(val[this.startKeyHolder]);
      }
      if (val[this.endKeyHolder]) {
        this.picker.setEndDate(val[this.endKeyHolder]);
      }
      this.picker.calculateChosenLabel();
      if (this.picker.chosenLabel) {
        this.el.nativeElement.value = this.picker.chosenLabel;
      }
    } else {
      this.picker.clear();
    }
  }
};
__name(_DaterangepickerDirective, "DaterangepickerDirective");
var DaterangepickerDirective = _DaterangepickerDirective;
DaterangepickerDirective.ɵfac = /* @__PURE__ */ __name(function DaterangepickerDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DaterangepickerDirective)(ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(KeyValueDiffers), ɵɵdirectiveInject(LocaleService), ɵɵdirectiveInject(ElementRef));
}, "DaterangepickerDirective_Factory");
DaterangepickerDirective.ɵdir = ɵɵdefineDirective({
  type: DaterangepickerDirective,
  selectors: [["input", "ngxDaterangepickerMd", ""]],
  hostVars: 1,
  hostBindings: /* @__PURE__ */ __name(function DaterangepickerDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", /* @__PURE__ */ __name(function DaterangepickerDirective_click_HostBindingHandler($event) {
        return ctx.outsideClick($event);
      }, "DaterangepickerDirective_click_HostBindingHandler"), ɵɵresolveDocument)("keyup.esc", /* @__PURE__ */ __name(function DaterangepickerDirective_keyup_esc_HostBindingHandler($event) {
        return ctx.hide($event);
      }, "DaterangepickerDirective_keyup_esc_HostBindingHandler"))("blur", /* @__PURE__ */ __name(function DaterangepickerDirective_blur_HostBindingHandler() {
        return ctx.onBlur();
      }, "DaterangepickerDirective_blur_HostBindingHandler"))("keyup", /* @__PURE__ */ __name(function DaterangepickerDirective_keyup_HostBindingHandler($event) {
        return ctx.inputChanged($event);
      }, "DaterangepickerDirective_keyup_HostBindingHandler"))("click", /* @__PURE__ */ __name(function DaterangepickerDirective_click_HostBindingHandler($event) {
        return ctx.open($event);
      }, "DaterangepickerDirective_click_HostBindingHandler"));
    }
    if (rf & 2) {
      ɵɵdomProperty("disabled", ctx.disabled);
    }
  }, "DaterangepickerDirective_HostBindings"),
  inputs: {
    minDate: "minDate",
    maxDate: "maxDate",
    autoApply: "autoApply",
    alwaysShowCalendars: "alwaysShowCalendars",
    showCustomRangeLabel: "showCustomRangeLabel",
    linkedCalendars: "linkedCalendars",
    dateLimit: "dateLimit",
    singleDatePicker: "singleDatePicker",
    showWeekNumbers: "showWeekNumbers",
    showISOWeekNumbers: "showISOWeekNumbers",
    showDropdowns: "showDropdowns",
    isInvalidDate: "isInvalidDate",
    isCustomDate: "isCustomDate",
    isTooltipDate: "isTooltipDate",
    showClearButton: "showClearButton",
    customRangeDirection: "customRangeDirection",
    ranges: "ranges",
    opens: "opens",
    drops: "drops",
    firstMonthDayClass: "firstMonthDayClass",
    lastMonthDayClass: "lastMonthDayClass",
    emptyWeekRowClass: "emptyWeekRowClass",
    emptyWeekColumnClass: "emptyWeekColumnClass",
    firstDayOfNextMonthClass: "firstDayOfNextMonthClass",
    lastDayOfPreviousMonthClass: "lastDayOfPreviousMonthClass",
    keepCalendarOpeningWithRange: "keepCalendarOpeningWithRange",
    showRangeLabelOnInput: "showRangeLabelOnInput",
    showCancel: "showCancel",
    lockStartDate: "lockStartDate",
    timePicker: "timePicker",
    timePicker24Hour: "timePicker24Hour",
    timePickerIncrement: "timePickerIncrement",
    timePickerSeconds: "timePickerSeconds",
    closeOnAutoApply: "closeOnAutoApply",
    endKeyHolder: "endKeyHolder",
    startKey: "startKey",
    locale: "locale",
    endKey: "endKey"
  },
  outputs: {
    onChange: "change",
    rangeClicked: "rangeClicked",
    datesUpdated: "datesUpdated",
    startDateChanged: "startDateChanged",
    endDateChanged: "endDateChanged",
    clearClicked: "clearClicked"
  },
  standalone: false,
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DaterangepickerDirective),
    multi: true
  }]), ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DaterangepickerDirective, [{
    type: Directive,
    args: [{
      selector: "input[ngxDaterangepickerMd]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DaterangepickerDirective),
        multi: true
      }]
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }, {
      type: ChangeDetectorRef
    }, {
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: KeyValueDiffers
    }, {
      type: LocaleService
    }, {
      type: ElementRef
    }];
  }, {
    onChange: [{
      type: Output,
      args: ["change"]
    }],
    rangeClicked: [{
      type: Output,
      args: ["rangeClicked"]
    }],
    datesUpdated: [{
      type: Output,
      args: ["datesUpdated"]
    }],
    startDateChanged: [{
      type: Output
    }],
    endDateChanged: [{
      type: Output
    }],
    clearClicked: [{
      type: Output
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    autoApply: [{
      type: Input
    }],
    alwaysShowCalendars: [{
      type: Input
    }],
    showCustomRangeLabel: [{
      type: Input
    }],
    linkedCalendars: [{
      type: Input
    }],
    dateLimit: [{
      type: Input
    }],
    singleDatePicker: [{
      type: Input
    }],
    showWeekNumbers: [{
      type: Input
    }],
    showISOWeekNumbers: [{
      type: Input
    }],
    showDropdowns: [{
      type: Input
    }],
    isInvalidDate: [{
      type: Input
    }],
    isCustomDate: [{
      type: Input
    }],
    isTooltipDate: [{
      type: Input
    }],
    showClearButton: [{
      type: Input
    }],
    customRangeDirection: [{
      type: Input
    }],
    ranges: [{
      type: Input
    }],
    opens: [{
      type: Input
    }],
    drops: [{
      type: Input
    }],
    firstMonthDayClass: [{
      type: Input
    }],
    lastMonthDayClass: [{
      type: Input
    }],
    emptyWeekRowClass: [{
      type: Input
    }],
    emptyWeekColumnClass: [{
      type: Input
    }],
    firstDayOfNextMonthClass: [{
      type: Input
    }],
    lastDayOfPreviousMonthClass: [{
      type: Input
    }],
    keepCalendarOpeningWithRange: [{
      type: Input
    }],
    showRangeLabelOnInput: [{
      type: Input
    }],
    showCancel: [{
      type: Input
    }],
    lockStartDate: [{
      type: Input
    }],
    timePicker: [{
      type: Input
    }],
    timePicker24Hour: [{
      type: Input
    }],
    timePickerIncrement: [{
      type: Input
    }],
    timePickerSeconds: [{
      type: Input
    }],
    closeOnAutoApply: [{
      type: Input
    }],
    endKeyHolder: [{
      type: Input
    }],
    disabled: [{
      type: HostBinding,
      args: ["disabled"]
    }],
    startKey: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    endKey: [{
      type: Input
    }],
    outsideClick: [{
      type: HostListener,
      args: ["document:click", ["$event"]]
    }],
    hide: [{
      type: HostListener,
      args: ["keyup.esc", ["$event"]]
    }],
    onBlur: [{
      type: HostListener,
      args: ["blur"]
    }],
    inputChanged: [{
      type: HostListener,
      args: ["keyup", ["$event"]]
    }],
    open: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var _NgxDaterangepickerMd = class _NgxDaterangepickerMd {
  constructor() {
  }
  static forRoot(config = {}) {
    return {
      ngModule: _NgxDaterangepickerMd,
      providers: [{
        provide: LOCALE_CONFIG,
        useValue: config
      }, {
        provide: LocaleService,
        useClass: LocaleService,
        deps: [LOCALE_CONFIG]
      }]
    };
  }
};
__name(_NgxDaterangepickerMd, "NgxDaterangepickerMd");
var NgxDaterangepickerMd = _NgxDaterangepickerMd;
NgxDaterangepickerMd.ɵfac = /* @__PURE__ */ __name(function NgxDaterangepickerMd_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxDaterangepickerMd)();
}, "NgxDaterangepickerMd_Factory");
NgxDaterangepickerMd.ɵmod = ɵɵdefineNgModule({
  type: NgxDaterangepickerMd,
  declarations: [DaterangepickerComponent, DaterangepickerDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DaterangepickerComponent, DaterangepickerDirective]
});
NgxDaterangepickerMd.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, FormsModule, ReactiveFormsModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxDaterangepickerMd, [{
    type: NgModule,
    args: [{
      declarations: [DaterangepickerComponent, DaterangepickerDirective],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      providers: [],
      exports: [DaterangepickerComponent, DaterangepickerDirective]
    }]
  }], function() {
    return [];
  }, null);
})();
export {
  DaterangepickerComponent,
  DaterangepickerDirective,
  DefaultLocaleConfig,
  LOCALE_CONFIG,
  LocaleService,
  NgxDaterangepickerMd
};
//# sourceMappingURL=ngx-daterangepicker-material.js.map

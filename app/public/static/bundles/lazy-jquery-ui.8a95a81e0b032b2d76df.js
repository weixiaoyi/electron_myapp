webpackJsonp([8], {
  502: function(t, e, i) {
    'use strict';
    Object.defineProperty(e, '__esModule', { value: !0 }), i(995), i(1e3), i(994), i(999), i(1001);
  },
  994: function(module, exports) {
    !(function($, undefined) {
      function Datepicker() {
        (this.debug = !1),
          (this._curInst = null),
          (this._keyEvent = !1),
          (this._disabledInputs = []),
          (this._datepickerShowing = !1),
          (this._inDialog = !1),
          (this._mainDivId = 'ui-datepicker-div'),
          (this._inlineClass = 'ui-datepicker-inline'),
          (this._appendClass = 'ui-datepicker-append'),
          (this._triggerClass = 'ui-datepicker-trigger'),
          (this._dialogClass = 'ui-datepicker-dialog'),
          (this._disableClass = 'ui-datepicker-disabled'),
          (this._unselectableClass = 'ui-datepicker-unselectable'),
          (this._currentClass = 'ui-datepicker-current-day'),
          (this._dayOverClass = 'ui-datepicker-days-cell-over'),
          (this.regional = []),
          (this.regional[''] = {
            closeText: 'Done',
            prevText: 'Prev',
            nextText: 'Next',
            currentText: 'Today',
            monthNames: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            weekHeader: 'Wk',
            dateFormat: 'mm/dd/yy',
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: '',
          }),
          (this._defaults = {
            showOn: 'focus',
            showAnim: 'fadeIn',
            showOptions: {},
            defaultDate: null,
            appendText: '',
            buttonText: '...',
            buttonImage: '',
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: 'c-10:c+10',
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: '+10',
            minDate: null,
            maxDate: null,
            duration: 'fast',
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: '',
            altFormat: '',
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
          }),
          $.extend(this._defaults, this.regional['']),
          (this.dpDiv = $(
            '<div id="' +
              this._mainDivId +
              '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'
          ));
      }
      function extendRemove(t, e) {
        $.extend(t, e);
        for (var i in e) (null != e[i] && e[i] != undefined) || (t[i] = e[i]);
        return t;
      }
      function isArray(t) {
        return (
          t &&
          (($.browser.safari && 'object' == typeof t && t.length) ||
            (t.constructor && ('' + t.constructor).match(/\Array\(\)/)))
        );
      }
      var PROP_NAME, dpuuid;
      $.extend($.ui, { datepicker: { version: '@VERSION' } }),
        (PROP_NAME = 'datepicker'),
        (dpuuid = new Date().getTime()),
        $.extend(Datepicker.prototype, {
          markerClassName: 'hasDatepicker',
          log: function() {
            this.debug && console.log.apply('', arguments);
          },
          _widgetDatepicker: function() {
            return this.dpDiv;
          },
          setDefaults: function(t) {
            return extendRemove(this._defaults, t || {}), this;
          },
          _attachDatepicker: function(target, settings) {
            var attrName,
              attrValue,
              nodeName,
              inline,
              inst,
              inlineSettings = null;
            for (attrName in this._defaults)
              if ((attrValue = target.getAttribute('date:' + attrName))) {
                inlineSettings = inlineSettings || {};
                try {
                  inlineSettings[attrName] = eval(attrValue);
                } catch (t) {
                  inlineSettings[attrName] = attrValue;
                }
              }
            (nodeName = target.nodeName.toLowerCase()),
              (inline = 'div' == nodeName || 'span' == nodeName),
              target.id || ((this.uuid += 1), (target.id = 'dp' + this.uuid)),
              (inst = this._newInst($(target), inline)),
              (inst.settings = $.extend({}, settings || {}, inlineSettings || {})),
              'input' == nodeName
                ? this._connectDatepicker(target, inst)
                : inline && this._inlineDatepicker(target, inst);
          },
          _newInst: function(t, e) {
            return {
              id: t[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'),
              input: t,
              selectedDay: 0,
              selectedMonth: 0,
              selectedYear: 0,
              drawMonth: 0,
              drawYear: 0,
              inline: e,
              dpDiv: e
                ? $(
                    '<div class="' +
                      this._inlineClass +
                      ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'
                  )
                : this.dpDiv,
            };
          },
          _connectDatepicker: function(t, e) {
            var i = $(t);
            (e.append = $([])),
              (e.trigger = $([])),
              i.hasClass(this.markerClassName) ||
                (this._attachments(i, e),
                i
                  .addClass(this.markerClassName)
                  .keydown(this._doKeyDown)
                  .keypress(this._doKeyPress)
                  .keyup(this._doKeyUp)
                  .bind('setData.datepicker', function(t, i, s) {
                    e.settings[i] = s;
                  })
                  .bind('getData.datepicker', function(t, i) {
                    return this._get(e, i);
                  }),
                this._autoSize(e),
                $.data(t, PROP_NAME, e));
          },
          _attachments: function(t, e) {
            var i,
              s,
              n,
              o = this._get(e, 'appendText'),
              r = this._get(e, 'isRTL');
            e.append && e.append.remove(),
              o &&
                ((e.append = $('<span class="' + this._appendClass + '">' + o + '</span>')),
                t[r ? 'before' : 'after'](e.append)),
              t.unbind('focus', this._showDatepicker),
              e.trigger && e.trigger.remove(),
              (i = this._get(e, 'showOn')),
              ('focus' != i && 'both' != i) || t.focus(this._showDatepicker),
              ('button' != i && 'both' != i) ||
                ((s = this._get(e, 'buttonText')),
                (n = this._get(e, 'buttonImage')),
                (e.trigger = $(
                  this._get(e, 'buttonImageOnly')
                    ? $('<img/>')
                        .addClass(this._triggerClass)
                        .attr({ src: n, alt: s, title: s })
                    : $('<button type="button"></button>')
                        .addClass(this._triggerClass)
                        .html('' == n ? s : $('<img/>').attr({ src: n, alt: s, title: s }))
                )),
                t[r ? 'before' : 'after'](e.trigger),
                e.trigger.click(function() {
                  return (
                    $.datepicker._datepickerShowing && $.datepicker._lastInput == t[0]
                      ? $.datepicker._hideDatepicker()
                      : $.datepicker._showDatepicker(t[0]),
                    !1
                  );
                }));
          },
          _autoSize: function(t) {
            var e, i, s;
            this._get(t, 'autoSize') &&
              !t.inline &&
              ((e = new Date(2009, 11, 20)),
              (i = this._get(t, 'dateFormat')),
              i.match(/[DM]/) &&
                ((s = function(t) {
                  var e,
                    i = 0,
                    s = 0;
                  for (e = 0; e < t.length; e++) t[e].length > i && ((i = t[e].length), (s = e));
                  return s;
                }),
                e.setMonth(s(this._get(t, i.match(/MM/) ? 'monthNames' : 'monthNamesShort'))),
                e.setDate(s(this._get(t, i.match(/DD/) ? 'dayNames' : 'dayNamesShort')) + 20 - e.getDay())),
              t.input.attr('size', this._formatDate(t, e).length));
          },
          _inlineDatepicker: function(t, e) {
            var i = $(t);
            i.hasClass(this.markerClassName) ||
              (i
                .addClass(this.markerClassName)
                .append(e.dpDiv)
                .bind('setData.datepicker', function(t, i, s) {
                  e.settings[i] = s;
                })
                .bind('getData.datepicker', function(t, i) {
                  return this._get(e, i);
                }),
              $.data(t, PROP_NAME, e),
              this._setDate(e, this._getDefaultDate(e), !0),
              this._updateDatepicker(e),
              this._updateAlternate(e),
              e.dpDiv.show());
          },
          _dialogDatepicker: function(t, e, i, s, n) {
            var o,
              r,
              a,
              h,
              l,
              c = this._dialogInst;
            return (
              c ||
                ((this.uuid += 1),
                (o = 'dp' + this.uuid),
                (this._dialogInput = $(
                  '<input type="text" id="' +
                    o +
                    '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'
                )),
                this._dialogInput.keydown(this._doKeyDown),
                $('body').append(this._dialogInput),
                (c = this._dialogInst = this._newInst(this._dialogInput, !1)),
                (c.settings = {}),
                $.data(this._dialogInput[0], PROP_NAME, c)),
              extendRemove(c.settings, s || {}),
              (e = e && e.constructor == Date ? this._formatDate(c, e) : e),
              this._dialogInput.val(e),
              (this._pos = n ? (n.length ? n : [n.pageX, n.pageY]) : null),
              this._pos ||
                ((r = document.documentElement.clientWidth),
                (a = document.documentElement.clientHeight),
                (h = document.documentElement.scrollLeft || document.body.scrollLeft),
                (l = document.documentElement.scrollTop || document.body.scrollTop),
                (this._pos = [r / 2 - 100 + h, a / 2 - 150 + l])),
              this._dialogInput.css('left', this._pos[0] + 20 + 'px').css('top', this._pos[1] + 'px'),
              (c.settings.onSelect = i),
              (this._inDialog = !0),
              this.dpDiv.addClass(this._dialogClass),
              this._showDatepicker(this._dialogInput[0]),
              $.blockUI && $.blockUI(this.dpDiv),
              $.data(this._dialogInput[0], PROP_NAME, c),
              this
            );
          },
          _destroyDatepicker: function(t) {
            var e,
              i = $(t),
              s = $.data(t, PROP_NAME);
            i.hasClass(this.markerClassName) &&
              ((e = t.nodeName.toLowerCase()),
              $.removeData(t, PROP_NAME),
              'input' == e
                ? (s.append.remove(),
                  s.trigger.remove(),
                  i
                    .removeClass(this.markerClassName)
                    .unbind('focus', this._showDatepicker)
                    .unbind('keydown', this._doKeyDown)
                    .unbind('keypress', this._doKeyPress)
                    .unbind('keyup', this._doKeyUp))
                : ('div' != e && 'span' != e) || i.removeClass(this.markerClassName).empty());
          },
          _enableDatepicker: function(t) {
            var e,
              i,
              s = $(t),
              n = $.data(t, PROP_NAME);
            s.hasClass(this.markerClassName) &&
              ((e = t.nodeName.toLowerCase()),
              'input' == e
                ? ((t.disabled = !1),
                  n.trigger
                    .filter('button')
                    .each(function() {
                      this.disabled = !1;
                    })
                    .end()
                    .filter('img')
                    .css({ opacity: '1.0', cursor: '' }))
                : ('div' != e && 'span' != e) ||
                  ((i = s.children('.' + this._inlineClass)), i.children().removeClass('ui-state-disabled')),
              (this._disabledInputs = $.map(this._disabledInputs, function(e) {
                return e == t ? null : e;
              })));
          },
          _disableDatepicker: function(t) {
            var e,
              i,
              s = $(t),
              n = $.data(t, PROP_NAME);
            s.hasClass(this.markerClassName) &&
              ((e = t.nodeName.toLowerCase()),
              'input' == e
                ? ((t.disabled = !0),
                  n.trigger
                    .filter('button')
                    .each(function() {
                      this.disabled = !0;
                    })
                    .end()
                    .filter('img')
                    .css({ opacity: '0.5', cursor: 'default' }))
                : ('div' != e && 'span' != e) ||
                  ((i = s.children('.' + this._inlineClass)), i.children().addClass('ui-state-disabled')),
              (this._disabledInputs = $.map(this._disabledInputs, function(e) {
                return e == t ? null : e;
              })),
              (this._disabledInputs[this._disabledInputs.length] = t));
          },
          _isDisabledDatepicker: function(t) {
            if (!t) return !1;
            for (var e = 0; e < this._disabledInputs.length; e++) if (this._disabledInputs[e] == t) return !0;
            return !1;
          },
          _getInst: function(t) {
            try {
              return $.data(t, PROP_NAME);
            } catch (t) {
              throw 'Missing instance data for this datepicker';
            }
          },
          _optionDatepicker: function(t, e, i) {
            var s,
              n,
              o,
              r,
              a = this._getInst(t);
            if (2 == arguments.length && 'string' == typeof e)
              return 'defaults' == e
                ? $.extend({}, $.datepicker._defaults)
                : a
                ? 'all' == e
                  ? $.extend({}, a.settings)
                  : this._get(a, e)
                : null;
            (s = e || {}),
              'string' == typeof e && ((s = {}), (s[e] = i)),
              a &&
                (this._curInst == a && this._hideDatepicker(),
                (n = this._getDateDatepicker(t, !0)),
                (o = this._getMinMaxDate(a, 'min')),
                (r = this._getMinMaxDate(a, 'max')),
                extendRemove(a.settings, s),
                null !== o &&
                  s.dateFormat !== undefined &&
                  s.minDate === undefined &&
                  (a.settings.minDate = this._formatDate(a, o)),
                null !== r &&
                  s.dateFormat !== undefined &&
                  s.maxDate === undefined &&
                  (a.settings.maxDate = this._formatDate(a, r)),
                this._attachments($(t), a),
                this._autoSize(a),
                this._setDateDatepicker(t, n),
                this._updateDatepicker(a));
          },
          _changeDatepicker: function(t, e, i) {
            this._optionDatepicker(t, e, i);
          },
          _refreshDatepicker: function(t) {
            var e = this._getInst(t);
            e && this._updateDatepicker(e);
          },
          _setDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i));
          },
          _getDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null;
          },
          _doKeyDown: function(t) {
            var e,
              i = $.datepicker._getInst(t.target),
              s = !0,
              n = i.dpDiv.is('.ui-datepicker-rtl');
            if (((i._keyEvent = !0), $.datepicker._datepickerShowing))
              switch (t.keyCode) {
                case 9:
                  $.datepicker._hideDatepicker(), (s = !1);
                  break;
                case 13:
                  return (
                    (e = $('td.' + $.datepicker._dayOverClass + ':not(.' + $.datepicker._currentClass + ')', i.dpDiv)),
                    e[0]
                      ? $.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, e[0])
                      : $.datepicker._hideDatepicker(),
                    !1
                  );
                case 27:
                  $.datepicker._hideDatepicker();
                  break;
                case 33:
                  $.datepicker._adjustDate(
                    t.target,
                    t.ctrlKey ? -$.datepicker._get(i, 'stepBigMonths') : -$.datepicker._get(i, 'stepMonths'),
                    'M'
                  );
                  break;
                case 34:
                  $.datepicker._adjustDate(
                    t.target,
                    t.ctrlKey ? +$.datepicker._get(i, 'stepBigMonths') : +$.datepicker._get(i, 'stepMonths'),
                    'M'
                  );
                  break;
                case 35:
                  (t.ctrlKey || t.metaKey) && $.datepicker._clearDate(t.target), (s = t.ctrlKey || t.metaKey);
                  break;
                case 36:
                  (t.ctrlKey || t.metaKey) && $.datepicker._gotoToday(t.target), (s = t.ctrlKey || t.metaKey);
                  break;
                case 37:
                  (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, n ? 1 : -1, 'D'),
                    (s = t.ctrlKey || t.metaKey),
                    t.originalEvent.altKey &&
                      $.datepicker._adjustDate(
                        t.target,
                        t.ctrlKey ? -$.datepicker._get(i, 'stepBigMonths') : -$.datepicker._get(i, 'stepMonths'),
                        'M'
                      );
                  break;
                case 38:
                  (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, -7, 'D'), (s = t.ctrlKey || t.metaKey);
                  break;
                case 39:
                  (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, n ? -1 : 1, 'D'),
                    (s = t.ctrlKey || t.metaKey),
                    t.originalEvent.altKey &&
                      $.datepicker._adjustDate(
                        t.target,
                        t.ctrlKey ? +$.datepicker._get(i, 'stepBigMonths') : +$.datepicker._get(i, 'stepMonths'),
                        'M'
                      );
                  break;
                case 40:
                  (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, 7, 'D'), (s = t.ctrlKey || t.metaKey);
                  break;
                default:
                  s = !1;
              }
            else 36 == t.keyCode && t.ctrlKey ? $.datepicker._showDatepicker(this) : (s = !1);
            s && (t.preventDefault(), t.stopPropagation());
          },
          _doKeyPress: function(t) {
            var e,
              i,
              s = $.datepicker._getInst(t.target);
            if ($.datepicker._get(s, 'constrainInput'))
              return (
                (e = $.datepicker._possibleChars($.datepicker._get(s, 'dateFormat'))),
                (i = String.fromCharCode(t.charCode == undefined ? t.keyCode : t.charCode)),
                t.ctrlKey || t.metaKey || i < ' ' || !e || e.indexOf(i) > -1
              );
          },
          _doKeyUp: function(t) {
            var e,
              i = $.datepicker._getInst(t.target);
            if (i.input.val() != i.lastVal)
              try {
                (e = $.datepicker.parseDate(
                  $.datepicker._get(i, 'dateFormat'),
                  i.input ? i.input.val() : null,
                  $.datepicker._getFormatConfig(i)
                )),
                  e &&
                    ($.datepicker._setDateFromField(i),
                    $.datepicker._updateAlternate(i),
                    $.datepicker._updateDatepicker(i));
              } catch (t) {
                $.datepicker.log(t);
              }
            return !0;
          },
          _showDatepicker: function(t) {
            var e, i, s, n, o, r, a;
            (t = t.target || t),
              'input' != t.nodeName.toLowerCase() && (t = $('input', t.parentNode)[0]),
              $.datepicker._isDisabledDatepicker(t) ||
                $.datepicker._lastInput == t ||
                ((e = $.datepicker._getInst(t)),
                $.datepicker._curInst && $.datepicker._curInst != e && $.datepicker._curInst.dpDiv.stop(!0, !0),
                (i = $.datepicker._get(e, 'beforeShow')),
                extendRemove(e.settings, i ? i.apply(t, [t, e]) : {}),
                (e.lastVal = null),
                ($.datepicker._lastInput = t),
                $.datepicker._setDateFromField(e),
                $.datepicker._inDialog && (t.value = ''),
                $.datepicker._pos ||
                  (($.datepicker._pos = $.datepicker._findPos(t)), ($.datepicker._pos[1] += t.offsetHeight)),
                (s = !1),
                $(t)
                  .parents()
                  .each(function() {
                    return !(s |= 'fixed' == $(this).css('position'));
                  }),
                s &&
                  $.browser.opera &&
                  (($.datepicker._pos[0] -= document.documentElement.scrollLeft),
                  ($.datepicker._pos[1] -= document.documentElement.scrollTop)),
                (n = { left: $.datepicker._pos[0], top: $.datepicker._pos[1] }),
                ($.datepicker._pos = null),
                e.dpDiv.empty(),
                e.dpDiv.css({ position: 'absolute', display: 'block', top: '-1000px' }),
                $.datepicker._updateDatepicker(e),
                (n = $.datepicker._checkOffset(e, n, s)),
                e.dpDiv.css({
                  position: $.datepicker._inDialog && $.blockUI ? 'static' : s ? 'fixed' : 'absolute',
                  display: 'none',
                  left: n.left + 'px',
                  top: n.top + 'px',
                }),
                e.inline ||
                  ((o = $.datepicker._get(e, 'showAnim')),
                  (r = $.datepicker._get(e, 'duration')),
                  (a = function() {
                    var t, i;
                    ($.datepicker._datepickerShowing = !0),
                      (t = e.dpDiv.find('iframe.ui-datepicker-cover')),
                      t.length &&
                        ((i = $.datepicker._getBorders(e.dpDiv)),
                        t.css({ left: -i[0], top: -i[1], width: e.dpDiv.outerWidth(), height: e.dpDiv.outerHeight() }));
                  }),
                  e.dpDiv.zIndex($(t).zIndex() + 1),
                  $.effects && $.effects[o]
                    ? e.dpDiv.show(o, $.datepicker._get(e, 'showOptions'), r, a)
                    : e.dpDiv[o || 'show'](o ? r : null, a),
                  (o && r) || a(),
                  e.input.is(':visible') && !e.input.is(':disabled') && e.input.focus(),
                  ($.datepicker._curInst = e)));
          },
          _updateDatepicker: function(t) {
            var e,
              i,
              s,
              n,
              o,
              r = this,
              a = $.datepicker._getBorders(t.dpDiv);
            t.dpDiv.empty().append(this._generateHTML(t)),
              (e = t.dpDiv.find('iframe.ui-datepicker-cover')),
              e.length &&
                e.css({ left: -a[0], top: -a[1], width: t.dpDiv.outerWidth(), height: t.dpDiv.outerHeight() }),
              t.dpDiv
                .find('button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a')
                .bind('mouseout', function() {
                  $(this).removeClass('ui-state-hover'),
                    -1 != this.className.indexOf('ui-datepicker-prev') &&
                      $(this).removeClass('ui-datepicker-prev-hover'),
                    -1 != this.className.indexOf('ui-datepicker-next') &&
                      $(this).removeClass('ui-datepicker-next-hover');
                })
                .bind('mouseover', function() {
                  r._isDisabledDatepicker(t.inline ? t.dpDiv.parent()[0] : t.input[0]) ||
                    ($(this)
                      .parents('.ui-datepicker-calendar')
                      .find('a')
                      .removeClass('ui-state-hover'),
                    $(this).addClass('ui-state-hover'),
                    -1 != this.className.indexOf('ui-datepicker-prev') && $(this).addClass('ui-datepicker-prev-hover'),
                    -1 != this.className.indexOf('ui-datepicker-next') && $(this).addClass('ui-datepicker-next-hover'));
                })
                .end()
                .find('.' + this._dayOverClass + ' a')
                .trigger('mouseover')
                .end(),
              (i = this._getNumberOfMonths(t)),
              (s = i[1]),
              (n = 17),
              s > 1
                ? t.dpDiv.addClass('ui-datepicker-multi-' + s).css('width', n * s + 'em')
                : t.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width(''),
              t.dpDiv[(1 != i[0] || 1 != i[1] ? 'add' : 'remove') + 'Class']('ui-datepicker-multi'),
              t.dpDiv[(this._get(t, 'isRTL') ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl'),
              t == $.datepicker._curInst &&
                $.datepicker._datepickerShowing &&
                t.input &&
                t.input.is(':visible') &&
                !t.input.is(':disabled') &&
                t.input[0] != document.activeElement &&
                t.input.focus(),
              t.yearshtml &&
                ((o = t.yearshtml),
                setTimeout(function() {
                  o === t.yearshtml && t.dpDiv.find('select.ui-datepicker-year:first').replaceWith(t.yearshtml),
                    (o = t.yearshtml = null);
                }, 0));
          },
          _getBorders: function(t) {
            var e = function(t) {
              return { thin: 1, medium: 2, thick: 3 }[t] || t;
            };
            return [parseFloat(e(t.css('border-left-width'))), parseFloat(e(t.css('border-top-width')))];
          },
          _checkOffset: function(t, e, i) {
            var s = t.dpDiv.outerWidth(),
              n = t.dpDiv.outerHeight(),
              o = t.input ? t.input.outerWidth() : 0,
              r = t.input ? t.input.outerHeight() : 0,
              a = document.documentElement.clientWidth + $(document).scrollLeft(),
              h = document.documentElement.clientHeight + $(document).scrollTop();
            return (
              (e.left -= this._get(t, 'isRTL') ? s - o : 0),
              (e.left -= i && e.left == t.input.offset().left ? $(document).scrollLeft() : 0),
              (e.top -= i && e.top == t.input.offset().top + r ? $(document).scrollTop() : 0),
              (e.left -= Math.min(e.left, e.left + s > a && a > s ? Math.abs(e.left + s - a) : 0)),
              (e.top -= Math.min(e.top, e.top + n > h && h > n ? Math.abs(n + r) : 0)),
              e
            );
          },
          _findPos: function(t) {
            for (
              var e, i = this._getInst(t), s = this._get(i, 'isRTL');
              t && ('hidden' == t.type || 1 != t.nodeType || $.expr.filters.hidden(t));

            )
              t = t[s ? 'previousSibling' : 'nextSibling'];
            return (e = $(t).offset()), [e.left, e.top];
          },
          _hideDatepicker: function(t) {
            var e,
              i,
              s,
              n,
              o = this._curInst;
            !o ||
              (t && o != $.data(t, PROP_NAME)) ||
              (this._datepickerShowing &&
                ((e = this._get(o, 'showAnim')),
                (i = this._get(o, 'duration')),
                (s = function() {
                  $.datepicker._tidyDialog(o), (this._curInst = null);
                }),
                $.effects && $.effects[e]
                  ? o.dpDiv.hide(e, $.datepicker._get(o, 'showOptions'), i, s)
                  : o.dpDiv['slideDown' == e ? 'slideUp' : 'fadeIn' == e ? 'fadeOut' : 'hide'](e ? i : null, s),
                e || s(),
                (n = this._get(o, 'onClose')),
                n && n.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : '', o]),
                (this._datepickerShowing = !1),
                (this._lastInput = null),
                this._inDialog &&
                  (this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' }),
                  $.blockUI && ($.unblockUI(), $('body').append(this.dpDiv))),
                (this._inDialog = !1)));
          },
          _tidyDialog: function(t) {
            t.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
          },
          _checkExternalClick: function(t) {
            if ($.datepicker._curInst) {
              var e = $(t.target);
              e[0].id == $.datepicker._mainDivId ||
                0 != e.parents('#' + $.datepicker._mainDivId).length ||
                e.hasClass($.datepicker.markerClassName) ||
                e.hasClass($.datepicker._triggerClass) ||
                !$.datepicker._datepickerShowing ||
                ($.datepicker._inDialog && $.blockUI) ||
                $.datepicker._hideDatepicker();
            }
          },
          _adjustDate: function(t, e, i) {
            var s = $(t),
              n = this._getInst(s[0]);
            this._isDisabledDatepicker(s[0]) ||
              (this._adjustInstDate(n, e + ('M' == i ? this._get(n, 'showCurrentAtPos') : 0), i),
              this._updateDatepicker(n));
          },
          _gotoToday: function(t) {
            var e,
              i = $(t),
              s = this._getInst(i[0]);
            this._get(s, 'gotoCurrent') && s.currentDay
              ? ((s.selectedDay = s.currentDay),
                (s.drawMonth = s.selectedMonth = s.currentMonth),
                (s.drawYear = s.selectedYear = s.currentYear))
              : ((e = new Date()),
                (s.selectedDay = e.getDate()),
                (s.drawMonth = s.selectedMonth = e.getMonth()),
                (s.drawYear = s.selectedYear = e.getFullYear())),
              this._notifyChange(s),
              this._adjustDate(i);
          },
          _selectMonthYear: function(t, e, i) {
            var s = $(t),
              n = this._getInst(s[0]);
            (n._selectingMonthYear = !1),
              (n['selected' + ('M' == i ? 'Month' : 'Year')] = n['draw' + ('M' == i ? 'Month' : 'Year')] = parseInt(
                e.options[e.selectedIndex].value,
                10
              )),
              this._notifyChange(n),
              this._adjustDate(s);
          },
          _clickMonthYear: function(t) {
            var e = $(t),
              i = this._getInst(e[0]);
            i.input &&
              i._selectingMonthYear &&
              setTimeout(function() {
                i.input.focus();
              }, 0),
              (i._selectingMonthYear = !i._selectingMonthYear);
          },
          _selectDay: function(t, e, i, s) {
            var n,
              o = $(t);
            $(s).hasClass(this._unselectableClass) ||
              this._isDisabledDatepicker(o[0]) ||
              ((n = this._getInst(o[0])),
              (n.selectedDay = n.currentDay = $('a', s).html()),
              (n.selectedMonth = n.currentMonth = e),
              (n.selectedYear = n.currentYear = i),
              this._selectDate(t, this._formatDate(n, n.currentDay, n.currentMonth, n.currentYear)));
          },
          _clearDate: function(t) {
            var e = $(t);
            this._getInst(e[0]);
            this._selectDate(e, '');
          },
          _selectDate: function(t, e) {
            var i,
              s = $(t),
              n = this._getInst(s[0]);
            (e = null != e ? e : this._formatDate(n)),
              n.input && n.input.val(e),
              this._updateAlternate(n),
              (i = this._get(n, 'onSelect')),
              i ? i.apply(n.input ? n.input[0] : null, [e, n]) : n.input && n.input.trigger('change'),
              n.inline
                ? this._updateDatepicker(n)
                : (this._hideDatepicker(),
                  (this._lastInput = n.input[0]),
                  'object' != typeof n.input[0] && n.input.focus(),
                  (this._lastInput = null));
          },
          _updateAlternate: function(t) {
            var e,
              i,
              s,
              n = this._get(t, 'altField');
            n &&
              ((e = this._get(t, 'altFormat') || this._get(t, 'dateFormat')),
              (i = this._getDate(t)),
              (s = this.formatDate(e, i, this._getFormatConfig(t))),
              $(n).each(function() {
                $(this).val(s);
              }));
          },
          noWeekends: function(t) {
            var e = t.getDay();
            return [e > 0 && e < 6, ''];
          },
          iso8601Week: function(t) {
            var e,
              i = new Date(t.getTime());
            return (
              i.setDate(i.getDate() + 4 - (i.getDay() || 7)),
              (e = i.getTime()),
              i.setMonth(0),
              i.setDate(1),
              Math.floor(Math.round((e - i) / 864e5) / 7) + 1
            );
          },
          parseDate: function(t, e, i) {
            var s, n, o, r, a, h, l, c, p, d, u, f, g, m, _, v, b, y;
            if (null == t || null == e) throw 'Invalid arguments';
            if ('' == (e = 'object' == typeof e ? '' + e : e + '')) return null;
            for (
              s = (i ? i.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                s = 'string' != typeof s ? s : (new Date().getFullYear() % 100) + parseInt(s, 10),
                n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                o = (i ? i.dayNames : null) || this._defaults.dayNames,
                r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                a = (i ? i.monthNames : null) || this._defaults.monthNames,
                h = -1,
                l = -1,
                c = -1,
                p = -1,
                d = !1,
                u = function(e) {
                  var i = v + 1 < t.length && t.charAt(v + 1) == e;
                  return i && v++, i;
                },
                f = function(t) {
                  var i = u(t),
                    s = '@' == t ? 14 : '!' == t ? 20 : 'y' == t && i ? 4 : 'o' == t ? 3 : 2,
                    n = RegExp('^\\d{1,' + s + '}'),
                    o = e.substring(_).match(n);
                  if (!o) throw 'Missing number at position ' + _;
                  return (_ += o[0].length), parseInt(o[0], 10);
                },
                g = function(t, i, s) {
                  var n,
                    o = u(t) ? s : i;
                  for (n = 0; n < o.length; n++)
                    if (e.substr(_, o[n].length).toLowerCase() == o[n].toLowerCase()) return (_ += o[n].length), n + 1;
                  throw 'Unknown name at position ' + _;
                },
                m = function() {
                  if (e.charAt(_) != t.charAt(v)) throw 'Unexpected literal at position ' + _;
                  _++;
                },
                _ = 0,
                v = 0;
              v < t.length;
              v++
            )
              if (d) "'" != t.charAt(v) || u("'") ? m() : (d = !1);
              else
                switch (t.charAt(v)) {
                  case 'd':
                    c = f('d');
                    break;
                  case 'D':
                    g('D', n, o);
                    break;
                  case 'o':
                    p = f('o');
                    break;
                  case 'm':
                    l = f('m');
                    break;
                  case 'M':
                    l = g('M', r, a);
                    break;
                  case 'y':
                    h = f('y');
                    break;
                  case '@':
                    (b = new Date(f('@'))), (h = b.getFullYear()), (l = b.getMonth() + 1), (c = b.getDate());
                    break;
                  case '!':
                    (b = new Date((f('!') - this._ticksTo1970) / 1e4)),
                      (h = b.getFullYear()),
                      (l = b.getMonth() + 1),
                      (c = b.getDate());
                    break;
                  case "'":
                    u("'") ? m() : (d = !0);
                    break;
                  default:
                    m();
                }
            if (
              (-1 == h
                ? (h = new Date().getFullYear())
                : h < 100 && (h += new Date().getFullYear() - (new Date().getFullYear() % 100) + (h <= s ? 0 : -100)),
              p > -1)
            )
              for (l = 1, c = p; ; ) {
                if (((y = this._getDaysInMonth(h, l - 1)), c <= y)) break;
                l++, (c -= y);
              }
            if (
              ((b = this._daylightSavingAdjust(new Date(h, l - 1, c))),
              b.getFullYear() != h || b.getMonth() + 1 != l || b.getDate() != c)
            )
              throw 'Invalid date';
            return b;
          },
          ATOM: 'yy-mm-dd',
          COOKIE: 'D, dd M yy',
          ISO_8601: 'yy-mm-dd',
          RFC_822: 'D, d M y',
          RFC_850: 'DD, dd-M-y',
          RFC_1036: 'D, d M y',
          RFC_1123: 'D, d M yy',
          RFC_2822: 'D, d M yy',
          RSS: 'D, d M y',
          TICKS: '!',
          TIMESTAMP: '@',
          W3C: 'yy-mm-dd',
          _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
          formatDate: function(t, e, i) {
            var s, n, o, r, a, h, l, c, p, d;
            if (!e) return '';
            if (
              ((s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort),
              (n = (i ? i.dayNames : null) || this._defaults.dayNames),
              (o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort),
              (r = (i ? i.monthNames : null) || this._defaults.monthNames),
              (a = function(e) {
                var i = d + 1 < t.length && t.charAt(d + 1) == e;
                return i && d++, i;
              }),
              (h = function(t, e, i) {
                var s = '' + e;
                if (a(t)) for (; s.length < i; ) s = '0' + s;
                return s;
              }),
              (l = function(t, e, i, s) {
                return a(t) ? s[e] : i[e];
              }),
              (c = ''),
              (p = !1),
              e)
            )
              for (d = 0; d < t.length; d++)
                if (p) "'" != t.charAt(d) || a("'") ? (c += t.charAt(d)) : (p = !1);
                else
                  switch (t.charAt(d)) {
                    case 'd':
                      c += h('d', e.getDate(), 2);
                      break;
                    case 'D':
                      c += l('D', e.getDay(), s, n);
                      break;
                    case 'o':
                      c += h('o', (e.getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5, 3);
                      break;
                    case 'm':
                      c += h('m', e.getMonth() + 1, 2);
                      break;
                    case 'M':
                      c += l('M', e.getMonth(), o, r);
                      break;
                    case 'y':
                      c += a('y') ? e.getFullYear() : (e.getYear() % 100 < 10 ? '0' : '') + (e.getYear() % 100);
                      break;
                    case '@':
                      c += e.getTime();
                      break;
                    case '!':
                      c += 1e4 * e.getTime() + this._ticksTo1970;
                      break;
                    case "'":
                      a("'") ? (c += "'") : (p = !0);
                      break;
                    default:
                      c += t.charAt(d);
                  }
            return c;
          },
          _possibleChars: function(t) {
            var e,
              i = '',
              s = !1,
              n = function(i) {
                var s = e + 1 < t.length && t.charAt(e + 1) == i;
                return s && e++, s;
              };
            for (e = 0; e < t.length; e++)
              if (s) "'" != t.charAt(e) || n("'") ? (i += t.charAt(e)) : (s = !1);
              else
                switch (t.charAt(e)) {
                  case 'd':
                  case 'm':
                  case 'y':
                  case '@':
                    i += '0123456789';
                    break;
                  case 'D':
                  case 'M':
                    return null;
                  case "'":
                    n("'") ? (i += "'") : (s = !0);
                    break;
                  default:
                    i += t.charAt(e);
                }
            return i;
          },
          _get: function(t, e) {
            return t.settings[e] !== undefined ? t.settings[e] : this._defaults[e];
          },
          _setDateFromField: function(t, e) {
            var i, s, n, o, r;
            if (t.input.val() != t.lastVal) {
              (i = this._get(t, 'dateFormat')),
                (s = t.lastVal = t.input ? t.input.val() : null),
                (n = o = this._getDefaultDate(t)),
                (r = this._getFormatConfig(t));
              try {
                n = this.parseDate(i, s, r) || o;
              } catch (t) {
                this.log(t), (s = e ? '' : s);
              }
              (t.selectedDay = n.getDate()),
                (t.drawMonth = t.selectedMonth = n.getMonth()),
                (t.drawYear = t.selectedYear = n.getFullYear()),
                (t.currentDay = s ? n.getDate() : 0),
                (t.currentMonth = s ? n.getMonth() : 0),
                (t.currentYear = s ? n.getFullYear() : 0),
                this._adjustInstDate(t);
            }
          },
          _getDefaultDate: function(t) {
            return this._restrictMinMax(t, this._determineDate(t, this._get(t, 'defaultDate'), new Date()));
          },
          _determineDate: function(t, e, i) {
            var s = function(t) {
                var e = new Date();
                return e.setDate(e.getDate() + t), e;
              },
              n = function(e) {
                var i, s, n, o, r, a;
                try {
                  return $.datepicker.parseDate(
                    $.datepicker._get(t, 'dateFormat'),
                    e,
                    $.datepicker._getFormatConfig(t)
                  );
                } catch (t) {}
                for (
                  i = (e.toLowerCase().match(/^c/) ? $.datepicker._getDate(t) : null) || new Date(),
                    s = i.getFullYear(),
                    n = i.getMonth(),
                    o = i.getDate(),
                    r = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                    a = r.exec(e);
                  a;

                ) {
                  switch (a[2] || 'd') {
                    case 'd':
                    case 'D':
                      o += parseInt(a[1], 10);
                      break;
                    case 'w':
                    case 'W':
                      o += 7 * parseInt(a[1], 10);
                      break;
                    case 'm':
                    case 'M':
                      (n += parseInt(a[1], 10)), (o = Math.min(o, $.datepicker._getDaysInMonth(s, n)));
                      break;
                    case 'y':
                    case 'Y':
                      (s += parseInt(a[1], 10)), (o = Math.min(o, $.datepicker._getDaysInMonth(s, n)));
                  }
                  a = r.exec(e);
                }
                return new Date(s, n, o);
              },
              o =
                null == e || '' === e
                  ? i
                  : 'string' == typeof e
                  ? n(e)
                  : 'number' == typeof e
                  ? isNaN(e)
                    ? i
                    : s(e)
                  : new Date(e.getTime());
            return (
              (o = o && '' + o == 'Invalid Date' ? i : o),
              o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)),
              this._daylightSavingAdjust(o)
            );
          },
          _daylightSavingAdjust: function(t) {
            return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null;
          },
          _setDate: function(t, e, i) {
            var s = !e,
              n = t.selectedMonth,
              o = t.selectedYear,
              r = this._restrictMinMax(t, this._determineDate(t, e, new Date()));
            (t.selectedDay = t.currentDay = r.getDate()),
              (t.drawMonth = t.selectedMonth = t.currentMonth = r.getMonth()),
              (t.drawYear = t.selectedYear = t.currentYear = r.getFullYear()),
              (n == t.selectedMonth && o == t.selectedYear) || i || this._notifyChange(t),
              this._adjustInstDate(t),
              t.input && t.input.val(s ? '' : this._formatDate(t));
          },
          _getDate: function(t) {
            return !t.currentYear || (t.input && '' == t.input.val())
              ? null
              : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
          },
          _generateHTML: function(t) {
            var e,
              i,
              s,
              n,
              o,
              r,
              a,
              h,
              l,
              c,
              p,
              d,
              u,
              f,
              g,
              m,
              _,
              v,
              b,
              y,
              k,
              w,
              D,
              P,
              I,
              M,
              x,
              z,
              C,
              S,
              T,
              N,
              R,
              A,
              H,
              Y,
              O,
              E,
              F,
              W,
              L,
              j,
              K,
              X,
              B,
              Q,
              V,
              U,
              J,
              Z,
              q,
              G = new Date();
            if (
              ((G = this._daylightSavingAdjust(new Date(G.getFullYear(), G.getMonth(), G.getDate()))),
              (e = this._get(t, 'isRTL')),
              (i = this._get(t, 'showButtonPanel')),
              (s = this._get(t, 'hideIfNoPrevNext')),
              (n = this._get(t, 'navigationAsDateFormat')),
              (o = this._getNumberOfMonths(t)),
              (r = this._get(t, 'showCurrentAtPos')),
              (a = this._get(t, 'stepMonths')),
              (h = 1 != o[0] || 1 != o[1]),
              (l = this._daylightSavingAdjust(
                t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)
              )),
              (c = this._getMinMaxDate(t, 'min')),
              (p = this._getMinMaxDate(t, 'max')),
              (d = t.drawMonth - r),
              (u = t.drawYear),
              d < 0 && ((d += 12), u--),
              p)
            )
              for (
                f = this._daylightSavingAdjust(new Date(p.getFullYear(), p.getMonth() - o[0] * o[1] + 1, p.getDate())),
                  f = c && f < c ? c : f;
                this._daylightSavingAdjust(new Date(u, d, 1)) > f;

              )
                --d < 0 && ((d = 11), u--);
            for (
              t.drawMonth = d,
                t.drawYear = u,
                g = this._get(t, 'prevText'),
                g = n
                  ? this.formatDate(g, this._daylightSavingAdjust(new Date(u, d - a, 1)), this._getFormatConfig(t))
                  : g,
                m = this._canAdjustMonth(t, -1, u, d)
                  ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' +
                    dpuuid +
                    ".datepicker._adjustDate('#" +
                    t.id +
                    "', -" +
                    a +
                    ', \'M\');" title="' +
                    g +
                    '"><span class="ui-icon ui-icon-circle-triangle-' +
                    (e ? 'e' : 'w') +
                    '">' +
                    g +
                    '</span></a>'
                  : s
                  ? ''
                  : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' +
                    g +
                    '"><span class="ui-icon ui-icon-circle-triangle-' +
                    (e ? 'e' : 'w') +
                    '">' +
                    g +
                    '</span></a>',
                _ = this._get(t, 'nextText'),
                _ = n
                  ? this.formatDate(_, this._daylightSavingAdjust(new Date(u, d + a, 1)), this._getFormatConfig(t))
                  : _,
                v = this._canAdjustMonth(t, 1, u, d)
                  ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' +
                    dpuuid +
                    ".datepicker._adjustDate('#" +
                    t.id +
                    "', +" +
                    a +
                    ', \'M\');" title="' +
                    _ +
                    '"><span class="ui-icon ui-icon-circle-triangle-' +
                    (e ? 'w' : 'e') +
                    '">' +
                    _ +
                    '</span></a>'
                  : s
                  ? ''
                  : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' +
                    _ +
                    '"><span class="ui-icon ui-icon-circle-triangle-' +
                    (e ? 'w' : 'e') +
                    '">' +
                    _ +
                    '</span></a>',
                b = this._get(t, 'currentText'),
                y = this._get(t, 'gotoCurrent') && t.currentDay ? l : G,
                b = n ? this.formatDate(b, y, this._getFormatConfig(t)) : b,
                k = t.inline
                  ? ''
                  : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' +
                    dpuuid +
                    '.datepicker._hideDatepicker();">' +
                    this._get(t, 'closeText') +
                    '</button>',
                w = i
                  ? '<div class="ui-datepicker-buttonpane ui-widget-content">' +
                    (e ? k : '') +
                    (this._isInRange(t, y)
                      ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' +
                        dpuuid +
                        ".datepicker._gotoToday('#" +
                        t.id +
                        '\');">' +
                        b +
                        '</button>'
                      : '') +
                    (e ? '' : k) +
                    '</div>'
                  : '',
                D = parseInt(this._get(t, 'firstDay'), 10),
                D = isNaN(D) ? 0 : D,
                P = this._get(t, 'showWeek'),
                I = this._get(t, 'dayNames'),
                this._get(t, 'dayNamesShort'),
                M = this._get(t, 'dayNamesMin'),
                x = this._get(t, 'monthNames'),
                z = this._get(t, 'monthNamesShort'),
                C = this._get(t, 'beforeShowDay'),
                S = this._get(t, 'showOtherMonths'),
                T = this._get(t, 'selectOtherMonths'),
                this._get(t, 'calculateWeek') || this.iso8601Week,
                N = this._getDefaultDate(t),
                R = '',
                A = 0;
              A < o[0];
              A++
            ) {
              for (H = '', Y = 0; Y < o[1]; Y++) {
                if (
                  ((O = this._daylightSavingAdjust(new Date(u, d, t.selectedDay))), (E = ' ui-corner-all'), (F = ''), h)
                ) {
                  if (((F += '<div class="ui-datepicker-group'), o[1] > 1))
                    switch (Y) {
                      case 0:
                        (F += ' ui-datepicker-group-first'), (E = ' ui-corner-' + (e ? 'right' : 'left'));
                        break;
                      case o[1] - 1:
                        (F += ' ui-datepicker-group-last'), (E = ' ui-corner-' + (e ? 'left' : 'right'));
                        break;
                      default:
                        (F += ' ui-datepicker-group-middle'), (E = '');
                    }
                  F += '">';
                }
                for (
                  F +=
                    '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' +
                    E +
                    '">' +
                    (/all|left/.test(E) && 0 == A ? (e ? v : m) : '') +
                    (/all|right/.test(E) && 0 == A ? (e ? m : v) : '') +
                    this._generateMonthYearHeader(t, d, u, c, p, A > 0 || Y > 0, x, z) +
                    '</div><table class="ui-datepicker-calendar"><thead><tr>',
                    W = P ? '<th class="ui-datepicker-week-col">' + this._get(t, 'weekHeader') + '</th>' : '',
                    L = 0;
                  L < 7;
                  L++
                )
                  (j = (L + D) % 7),
                    (W +=
                      '<th' +
                      ((L + D + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') +
                      '><span title="' +
                      I[j] +
                      '">' +
                      M[j] +
                      '</span></th>');
                for (
                  F += W + '</tr></thead><tbody>',
                    K = this._getDaysInMonth(u, d),
                    u == t.selectedYear && d == t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, K)),
                    X = (this._getFirstDayOfMonth(u, d) - D + 7) % 7,
                    B = h ? 6 : Math.ceil((X + K) / 7),
                    Q = this._daylightSavingAdjust(new Date(u, d, 1 - X)),
                    V = 0;
                  V < B;
                  V++
                ) {
                  for (
                    F += '<tr>',
                      U = P ? '<td class="ui-datepicker-week-col">' + this._get(t, 'calculateWeek')(Q) + '</td>' : '',
                      L = 0;
                    L < 7;
                    L++
                  )
                    (J = C ? C.apply(t.input ? t.input[0] : null, [Q]) : [!0, '']),
                      (Z = Q.getMonth() != d),
                      (q = (Z && !T) || !J[0] || (c && Q < c) || (p && Q > p)),
                      (U +=
                        '<td class="' +
                        ((L + D + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') +
                        (Z ? ' ui-datepicker-other-month' : '') +
                        ((Q.getTime() == O.getTime() && d == t.selectedMonth && t._keyEvent) ||
                        (N.getTime() == Q.getTime() && N.getTime() == O.getTime())
                          ? ' ' + this._dayOverClass
                          : '') +
                        (q ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') +
                        (Z && !S
                          ? ''
                          : ' ' +
                            J[1] +
                            (Q.getTime() == l.getTime() ? ' ' + this._currentClass : '') +
                            (Q.getTime() == G.getTime() ? ' ui-datepicker-today' : '')) +
                        '"' +
                        ((Z && !S) || !J[2] ? '' : ' title="' + J[2] + '"') +
                        (q
                          ? ''
                          : ' onclick="DP_jQuery_' +
                            dpuuid +
                            ".datepicker._selectDay('#" +
                            t.id +
                            "'," +
                            Q.getMonth() +
                            ',' +
                            Q.getFullYear() +
                            ', this);return false;"') +
                        '>' +
                        (Z && !S
                          ? '&#xa0;'
                          : q
                          ? '<span class="ui-state-default">' + Q.getDate() + '</span>'
                          : '<a class="ui-state-default' +
                            (Q.getTime() == G.getTime() ? ' ui-state-highlight' : '') +
                            (Q.getTime() == l.getTime() ? ' ui-state-active' : '') +
                            (Z ? ' ui-priority-secondary' : '') +
                            '" href="#">' +
                            Q.getDate() +
                            '</a>') +
                        '</td>'),
                      Q.setDate(Q.getDate() + 1),
                      (Q = this._daylightSavingAdjust(Q));
                  F += U + '</tr>';
                }
                d++,
                  d > 11 && ((d = 0), u++),
                  (F +=
                    '</tbody></table>' +
                    (h
                      ? '</div>' + (o[0] > 0 && Y == o[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : '')
                      : '')),
                  (H += F);
              }
              R += H;
            }
            return (
              (R +=
                w +
                ($.browser.msie && parseInt($.browser.version, 10) < 7 && !t.inline
                  ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>'
                  : '')),
              (t._keyEvent = !1),
              R
            );
          },
          _generateMonthYearHeader: function(t, e, i, s, n, o, r, a) {
            var h,
              l,
              c,
              p,
              d,
              u,
              f,
              g,
              m = this._get(t, 'changeMonth'),
              _ = this._get(t, 'changeYear'),
              v = this._get(t, 'showMonthAfterYear'),
              b = '<div class="ui-datepicker-title">',
              y = '';
            if (o || !m) y += '<span class="ui-datepicker-month">' + r[e] + '</span>';
            else {
              for (
                h = s && s.getFullYear() == i,
                  l = n && n.getFullYear() == i,
                  y +=
                    '<select class="ui-datepicker-month" onchange="DP_jQuery_' +
                    dpuuid +
                    ".datepicker._selectMonthYear('#" +
                    t.id +
                    "', this, 'M');\" onclick=\"DP_jQuery_" +
                    dpuuid +
                    ".datepicker._clickMonthYear('#" +
                    t.id +
                    '\');">',
                  c = 0;
                c < 12;
                c++
              )
                (!h || c >= s.getMonth()) &&
                  (!l || c <= n.getMonth()) &&
                  (y +=
                    '<option value="' + c + '"' + (c == e ? ' selected="selected"' : '') + '>' + a[c] + '</option>');
              y += '</select>';
            }
            if ((v || (b += y + (!o && m && _ ? '' : '&#xa0;')), (t.yearshtml = ''), o || !_))
              b += '<span class="ui-datepicker-year">' + i + '</span>';
            else {
              for (
                p = this._get(t, 'yearRange').split(':'),
                  d = new Date().getFullYear(),
                  u = function(t) {
                    var e = t.match(/c[+-].*/)
                      ? i + parseInt(t.substring(1), 10)
                      : t.match(/[+-].*/)
                      ? d + parseInt(t, 10)
                      : parseInt(t, 10);
                    return isNaN(e) ? d : e;
                  },
                  f = u(p[0]),
                  g = Math.max(f, u(p[1] || '')),
                  f = s ? Math.max(f, s.getFullYear()) : f,
                  g = n ? Math.min(g, n.getFullYear()) : g,
                  t.yearshtml +=
                    '<select class="ui-datepicker-year" onchange="DP_jQuery_' +
                    dpuuid +
                    ".datepicker._selectMonthYear('#" +
                    t.id +
                    "', this, 'Y');\" onclick=\"DP_jQuery_" +
                    dpuuid +
                    ".datepicker._clickMonthYear('#" +
                    t.id +
                    '\');">';
                f <= g;
                f++
              )
                t.yearshtml +=
                  '<option value="' + f + '"' + (f == i ? ' selected="selected"' : '') + '>' + f + '</option>';
              (t.yearshtml += '</select>'),
                $.browser.mozilla
                  ? (b +=
                      '<select class="ui-datepicker-year"><option value="' +
                      i +
                      '" selected="selected">' +
                      i +
                      '</option></select>')
                  : ((b += t.yearshtml), (t.yearshtml = null));
            }
            return (b += this._get(t, 'yearSuffix')), v && (b += (!o && m && _ ? '' : '&#xa0;') + y), (b += '</div>');
          },
          _adjustInstDate: function(t, e, i) {
            var s = t.drawYear + ('Y' == i ? e : 0),
              n = t.drawMonth + ('M' == i ? e : 0),
              o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ('D' == i ? e : 0),
              r = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));
            (t.selectedDay = r.getDate()),
              (t.drawMonth = t.selectedMonth = r.getMonth()),
              (t.drawYear = t.selectedYear = r.getFullYear()),
              ('M' != i && 'Y' != i) || this._notifyChange(t);
          },
          _restrictMinMax: function(t, e) {
            var i = this._getMinMaxDate(t, 'min'),
              s = this._getMinMaxDate(t, 'max'),
              n = i && e < i ? i : e;
            return (n = s && n > s ? s : n);
          },
          _notifyChange: function(t) {
            var e = this._get(t, 'onChangeMonthYear');
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t]);
          },
          _getNumberOfMonths: function(t) {
            var e = this._get(t, 'numberOfMonths');
            return null == e ? [1, 1] : 'number' == typeof e ? [1, e] : e;
          },
          _getMinMaxDate: function(t, e) {
            return this._determineDate(t, this._get(t, e + 'Date'), null);
          },
          _getDaysInMonth: function(t, e) {
            return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
          },
          _getFirstDayOfMonth: function(t, e) {
            return new Date(t, e, 1).getDay();
          },
          _canAdjustMonth: function(t, e, i, s) {
            var n = this._getNumberOfMonths(t),
              o = this._daylightSavingAdjust(new Date(i, s + (e < 0 ? e : n[0] * n[1]), 1));
            return e < 0 && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o);
          },
          _isInRange: function(t, e) {
            var i = this._getMinMaxDate(t, 'min'),
              s = this._getMinMaxDate(t, 'max');
            return (!i || e.getTime() >= i.getTime()) && (!s || e.getTime() <= s.getTime());
          },
          _getFormatConfig: function(t) {
            var e = this._get(t, 'shortYearCutoff');
            return (
              (e = 'string' != typeof e ? e : (new Date().getFullYear() % 100) + parseInt(e, 10)),
              {
                shortYearCutoff: e,
                dayNamesShort: this._get(t, 'dayNamesShort'),
                dayNames: this._get(t, 'dayNames'),
                monthNamesShort: this._get(t, 'monthNamesShort'),
                monthNames: this._get(t, 'monthNames'),
              }
            );
          },
          _formatDate: function(t, e, i, s) {
            e || ((t.currentDay = t.selectedDay), (t.currentMonth = t.selectedMonth), (t.currentYear = t.selectedYear));
            var n = e
              ? 'object' == typeof e
                ? e
                : this._daylightSavingAdjust(new Date(s, i, e))
              : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return this.formatDate(this._get(t, 'dateFormat'), n, this._getFormatConfig(t));
          },
        }),
        ($.fn.datepicker = function(t) {
          if (!this.length) return this;
          $.datepicker.initialized ||
            ($(document)
              .mousedown($.datepicker._checkExternalClick)
              .find('body')
              .append($.datepicker.dpDiv),
            ($.datepicker.initialized = !0));
          var e = Array.prototype.slice.call(arguments, 1);
          return 'string' != typeof t || ('isDisabled' != t && 'getDate' != t && 'widget' != t)
            ? 'option' == t && 2 == arguments.length && 'string' == typeof arguments[1]
              ? $.datepicker['_' + t + 'Datepicker'].apply($.datepicker, [this[0]].concat(e))
              : this.each(function() {
                  'string' == typeof t
                    ? $.datepicker['_' + t + 'Datepicker'].apply($.datepicker, [this].concat(e))
                    : $.datepicker._attachDatepicker(this, t);
                })
            : $.datepicker['_' + t + 'Datepicker'].apply($.datepicker, [this[0]].concat(e));
        }),
        ($.datepicker = new Datepicker()),
        ($.datepicker.initialized = !1),
        ($.datepicker.uuid = new Date().getTime()),
        ($.datepicker.version = '@VERSION'),
        (window['DP_jQuery_' + dpuuid] = $);
    })(jQuery);
  },
  995: function(t, e) {
    !(function(t, e) {
      t.widget('ui.draggable', t.ui.mouse, {
        widgetEventPrefix: 'drag',
        options: {
          addClasses: !0,
          appendTo: 'parent',
          axis: !1,
          connectToSortable: !1,
          containment: !1,
          cursor: 'auto',
          cursorAt: !1,
          grid: !1,
          handle: !1,
          helper: 'original',
          iframeFix: !1,
          opacity: !1,
          refreshPositions: !1,
          revert: !1,
          revertDuration: 500,
          scope: 'default',
          scroll: !0,
          scrollSensitivity: 20,
          scrollSpeed: 20,
          snap: !1,
          snapMode: 'both',
          snapTolerance: 20,
          stack: !1,
          zIndex: !1,
        },
        _create: function() {
          'original' != this.options.helper ||
            /^(?:r|a|f)/.test(this.element.css('position')) ||
            (this.element[0].style.position = 'relative'),
            this.options.addClasses && this.element.addClass('ui-draggable'),
            this.options.disabled && this.element.addClass('ui-draggable-disabled'),
            this._mouseInit();
        },
        destroy: function() {
          if (this.element.data('draggable'))
            return (
              this.element
                .removeData('draggable')
                .unbind('.draggable')
                .removeClass('ui-draggable ui-draggable-dragging ui-draggable-disabled'),
              this._mouseDestroy(),
              this
            );
        },
        _mouseCapture: function(e) {
          var i = this.options;
          return (
            !(this.helper || i.disabled || t(e.target).is('.ui-resizable-handle')) &&
            ((this.handle = this._getHandle(e)), !!this.handle)
          );
        },
        _mouseStart: function(e) {
          var i = this.options;
          return (
            (this.helper = this._createHelper(e)),
            this._cacheHelperProportions(),
            t.ui.ddmanager && (t.ui.ddmanager.current = this),
            this._cacheMargins(),
            (this.cssPosition = this.helper.css('position')),
            (this.scrollParent = this.helper.scrollParent()),
            (this.offset = this.positionAbs = this.element.offset()),
            (this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }),
            t.extend(this.offset, {
              click: { left: e.pageX - this.offset.left, top: e.pageY - this.offset.top },
              parent: this._getParentOffset(),
              relative: this._getRelativeOffset(),
            }),
            (this.originalPosition = this.position = this._generatePosition(e)),
            (this.originalPageX = e.pageX),
            (this.originalPageY = e.pageY),
            i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
            i.containment && this._setContainment(),
            !1 === this._trigger('start', e)
              ? (this._clear(), !1)
              : (this._cacheHelperProportions(),
                t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e),
                this.helper.addClass('ui-draggable-dragging'),
                this._mouseDrag(e, !0),
                !0)
          );
        },
        _mouseDrag: function(e, i) {
          if (
            ((this.position = this._generatePosition(e)), (this.positionAbs = this._convertPositionTo('absolute')), !i)
          ) {
            var s = this._uiHash();
            if (!1 === this._trigger('drag', e, s)) return this._mouseUp({}), !1;
            this.position = s.position;
          }
          return (
            (this.options.axis && 'y' == this.options.axis) || (this.helper[0].style.left = this.position.left + 'px'),
            (this.options.axis && 'x' == this.options.axis) || (this.helper[0].style.top = this.position.top + 'px'),
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            !1
          );
        },
        _mouseStop: function(e) {
          var i,
            s = !1;
          return (
            t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)),
            this.dropped && ((s = this.dropped), (this.dropped = !1)),
            !!((this.element[0] && this.element[0].parentNode) || 'original' != this.options.helper) &&
              (('invalid' == this.options.revert && !s) ||
              ('valid' == this.options.revert && s) ||
              !0 === this.options.revert ||
              (t.isFunction(this.options.revert) && this.options.revert.call(this.element, s))
                ? ((i = this),
                  t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    !1 !== i._trigger('stop', e) && i._clear();
                  }))
                : !1 !== this._trigger('stop', e) && this._clear(),
              !1)
          );
        },
        cancel: function() {
          return this.helper.is('.ui-draggable-dragging') ? this._mouseUp({}) : this._clear(), this;
        },
        _getHandle: function(e) {
          var i = !this.options.handle || !t(this.options.handle, this.element).length;
          return (
            t(this.options.handle, this.element)
              .find('*')
              .andSelf()
              .each(function() {
                this == e.target && (i = !0);
              }),
            i
          );
        },
        _createHelper: function(e) {
          var i = this.options,
            s = t.isFunction(i.helper)
              ? t(i.helper.apply(this.element[0], [e]))
              : 'clone' == i.helper
              ? this.element.clone()
              : this.element;
          return (
            s.parents('body').length || s.appendTo('parent' == i.appendTo ? this.element[0].parentNode : i.appendTo),
            s[0] == this.element[0] || /(fixed|absolute)/.test(s.css('position')) || s.css('position', 'absolute'),
            s
          );
        },
        _adjustOffsetFromHelper: function(e) {
          'string' == typeof e && (e = e.split(' ')),
            t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
            'left' in e && (this.offset.click.left = e.left + this.margins.left),
            'right' in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
            'top' in e && (this.offset.click.top = e.top + this.margins.top),
            'bottom' in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
        },
        _getParentOffset: function() {
          this.offsetParent = this.helper.offsetParent();
          var e = this.offsetParent.offset();
          return (
            'absolute' == this.cssPosition &&
              this.scrollParent[0] != document &&
              t.ui.contains(this.scrollParent[0], this.offsetParent[0]) &&
              ((e.left += this.scrollParent.scrollLeft()), (e.top += this.scrollParent.scrollTop())),
            (this.offsetParent[0] == document.body ||
              (this.offsetParent[0].tagName &&
                'html' == this.offsetParent[0].tagName.toLowerCase() &&
                t.browser.msie)) &&
              (e = { top: 0, left: 0 }),
            {
              top: e.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
              left: e.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0),
            }
          );
        },
        _getRelativeOffset: function() {
          if ('relative' == this.cssPosition) {
            var t = this.element.position();
            return {
              top: t.top - (parseInt(this.helper.css('top'), 10) || 0) + this.scrollParent.scrollTop(),
              left: t.left - (parseInt(this.helper.css('left'), 10) || 0) + this.scrollParent.scrollLeft(),
            };
          }
          return { top: 0, left: 0 };
        },
        _cacheMargins: function() {
          this.margins = {
            left: parseInt(this.element.css('marginLeft'), 10) || 0,
            top: parseInt(this.element.css('marginTop'), 10) || 0,
            right: parseInt(this.element.css('marginRight'), 10) || 0,
            bottom: parseInt(this.element.css('marginBottom'), 10) || 0,
          };
        },
        _cacheHelperProportions: function() {
          this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
        },
        _setContainment: function() {
          var e,
            i,
            s,
            n = this.options;
          if (
            ('parent' == n.containment && (n.containment = this.helper[0].parentNode),
            ('document' != n.containment && 'window' != n.containment) ||
              (this.containment = [
                ('document' == n.containment ? 0 : t(window).scrollLeft()) -
                  this.offset.relative.left -
                  this.offset.parent.left,
                ('document' == n.containment ? 0 : t(window).scrollTop()) -
                  this.offset.relative.top -
                  this.offset.parent.top,
                ('document' == n.containment ? 0 : t(window).scrollLeft()) +
                  t('document' == n.containment ? document : window).width() -
                  this.helperProportions.width -
                  this.margins.left,
                ('document' == n.containment ? 0 : t(window).scrollTop()) +
                  (t('document' == n.containment ? document : window).height() ||
                    document.body.parentNode.scrollHeight) -
                  this.helperProportions.height -
                  this.margins.top,
              ]),
            /^(document|window|parent)$/.test(n.containment) || n.containment.constructor == Array)
          )
            n.containment.constructor == Array && (this.containment = n.containment);
          else {
            if (!(e = t(n.containment)[0])) return;
            (i = t(n.containment).offset()),
              (s = 'hidden' != t(e).css('overflow')),
              (this.containment = [
                i.left +
                  (parseInt(t(e).css('borderLeftWidth'), 10) || 0) +
                  (parseInt(t(e).css('paddingLeft'), 10) || 0),
                i.top + (parseInt(t(e).css('borderTopWidth'), 10) || 0) + (parseInt(t(e).css('paddingTop'), 10) || 0),
                i.left +
                  (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) -
                  (parseInt(t(e).css('borderLeftWidth'), 10) || 0) -
                  (parseInt(t(e).css('paddingRight'), 10) || 0) -
                  this.helperProportions.width -
                  this.margins.left -
                  this.margins.right,
                i.top +
                  (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) -
                  (parseInt(t(e).css('borderTopWidth'), 10) || 0) -
                  (parseInt(t(e).css('paddingBottom'), 10) || 0) -
                  this.helperProportions.height -
                  this.margins.top -
                  this.margins.bottom,
              ]);
          }
        },
        _convertPositionTo: function(e, i) {
          var s, n, o;
          return (
            i || (i = this.position),
            (s = 'absolute' == e ? 1 : -1),
            this.options,
            (n =
              'absolute' != this.cssPosition ||
              (this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]))
                ? this.scrollParent
                : this.offsetParent),
            (o = /(html|body)/i.test(n[0].tagName)),
            {
              top:
                i.top +
                this.offset.relative.top * s +
                this.offset.parent.top * s -
                (t.browser.safari && t.browser.version < 526 && 'fixed' == this.cssPosition
                  ? 0
                  : ('fixed' == this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s),
              left:
                i.left +
                this.offset.relative.left * s +
                this.offset.parent.left * s -
                (t.browser.safari && t.browser.version < 526 && 'fixed' == this.cssPosition
                  ? 0
                  : ('fixed' == this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s),
            }
          );
        },
        _generatePosition: function(e) {
          var i,
            s,
            n = this.options,
            o =
              'absolute' != this.cssPosition ||
              (this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]))
                ? this.scrollParent
                : this.offsetParent,
            r = /(html|body)/i.test(o[0].tagName),
            a = e.pageX,
            h = e.pageY;
          return (
            this.originalPosition &&
              (this.containment &&
                (e.pageX - this.offset.click.left < this.containment[0] &&
                  (a = this.containment[0] + this.offset.click.left),
                e.pageY - this.offset.click.top < this.containment[1] &&
                  (h = this.containment[1] + this.offset.click.top),
                e.pageX - this.offset.click.left > this.containment[2] &&
                  (a = this.containment[2] + this.offset.click.left),
                e.pageY - this.offset.click.top > this.containment[3] &&
                  (h = this.containment[3] + this.offset.click.top)),
              n.grid &&
                ((i = this.originalPageY + Math.round((h - this.originalPageY) / n.grid[1]) * n.grid[1]),
                (h =
                  this.containment &&
                  (i - this.offset.click.top < this.containment[1] || i - this.offset.click.top > this.containment[3])
                    ? i - this.offset.click.top < this.containment[1]
                      ? i + n.grid[1]
                      : i - n.grid[1]
                    : i),
                (s = this.originalPageX + Math.round((a - this.originalPageX) / n.grid[0]) * n.grid[0]),
                (a =
                  this.containment &&
                  (s - this.offset.click.left < this.containment[0] || s - this.offset.click.left > this.containment[2])
                    ? s - this.offset.click.left < this.containment[0]
                      ? s + n.grid[0]
                      : s - n.grid[0]
                    : s))),
            {
              top:
                h -
                this.offset.click.top -
                this.offset.relative.top -
                this.offset.parent.top +
                (t.browser.safari && t.browser.version < 526 && 'fixed' == this.cssPosition
                  ? 0
                  : 'fixed' == this.cssPosition
                  ? -this.scrollParent.scrollTop()
                  : r
                  ? 0
                  : o.scrollTop()),
              left:
                a -
                this.offset.click.left -
                this.offset.relative.left -
                this.offset.parent.left +
                (t.browser.safari && t.browser.version < 526 && 'fixed' == this.cssPosition
                  ? 0
                  : 'fixed' == this.cssPosition
                  ? -this.scrollParent.scrollLeft()
                  : r
                  ? 0
                  : o.scrollLeft()),
            }
          );
        },
        _clear: function() {
          this.helper.removeClass('ui-draggable-dragging'),
            this.helper[0] == this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
            (this.helper = null),
            (this.cancelHelperRemoval = !1);
        },
        _trigger: function(e, i, s) {
          return (
            (s = s || this._uiHash()),
            t.ui.plugin.call(this, e, [i, s]),
            'drag' == e && (this.positionAbs = this._convertPositionTo('absolute')),
            t.Widget.prototype._trigger.call(this, e, i, s)
          );
        },
        plugins: {},
        _uiHash: function(t) {
          return {
            helper: this.helper,
            position: this.position,
            originalPosition: this.originalPosition,
            offset: this.positionAbs,
          };
        },
      }),
        t.extend(t.ui.draggable, { version: '@VERSION' }),
        t.ui.plugin.add('draggable', 'connectToSortable', {
          start: function(e, i) {
            var s = t(this).data('draggable'),
              n = s.options,
              o = t.extend({}, i, { item: s.element });
            (s.sortables = []),
              t(n.connectToSortable).each(function() {
                var i = t.data(this, 'sortable');
                i &&
                  !i.options.disabled &&
                  (s.sortables.push({ instance: i, shouldRevert: i.options.revert }),
                  i.refreshPositions(),
                  i._trigger('activate', e, o));
              });
          },
          stop: function(e, i) {
            var s = t(this).data('draggable'),
              n = t.extend({}, i, { item: s.element });
            t.each(s.sortables, function() {
              this.instance.isOver
                ? ((this.instance.isOver = 0),
                  (s.cancelHelperRemoval = !0),
                  (this.instance.cancelHelperRemoval = !1),
                  this.shouldRevert && (this.instance.options.revert = !0),
                  this.instance._mouseStop(e),
                  (this.instance.options.helper = this.instance.options._helper),
                  'original' == s.options.helper && this.instance.currentItem.css({ top: 'auto', left: 'auto' }))
                : ((this.instance.cancelHelperRemoval = !1), this.instance._trigger('deactivate', e, n));
            });
          },
          drag: function(e, i) {
            var s = t(this).data('draggable'),
              n = this;
            t.each(s.sortables, function(o) {
              (this.instance.positionAbs = s.positionAbs),
                (this.instance.helperProportions = s.helperProportions),
                (this.instance.offset.click = s.offset.click),
                this.instance._intersectsWith(this.instance.containerCache)
                  ? (this.instance.isOver ||
                      ((this.instance.isOver = 1),
                      (this.instance.currentItem = t(n)
                        .clone()
                        .appendTo(this.instance.element)
                        .data('sortable-item', !0)),
                      (this.instance.options._helper = this.instance.options.helper),
                      (this.instance.options.helper = function() {
                        return i.helper[0];
                      }),
                      (e.target = this.instance.currentItem[0]),
                      this.instance._mouseCapture(e, !0),
                      this.instance._mouseStart(e, !0, !0),
                      (this.instance.offset.click.top = s.offset.click.top),
                      (this.instance.offset.click.left = s.offset.click.left),
                      (this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left),
                      (this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top),
                      s._trigger('toSortable', e),
                      (s.dropped = this.instance.element),
                      (s.currentItem = s.element),
                      (this.instance.fromOutside = s)),
                    this.instance.currentItem && this.instance._mouseDrag(e))
                  : this.instance.isOver &&
                    ((this.instance.isOver = 0),
                    (this.instance.cancelHelperRemoval = !0),
                    (this.instance.options.revert = !1),
                    this.instance._trigger('out', e, this.instance._uiHash(this.instance)),
                    this.instance._mouseStop(e, !0),
                    (this.instance.options.helper = this.instance.options._helper),
                    this.instance.currentItem.remove(),
                    this.instance.placeholder && this.instance.placeholder.remove(),
                    s._trigger('fromSortable', e),
                    (s.dropped = !1));
            });
          },
        }),
        t.ui.plugin.add('draggable', 'cursor', {
          start: function(e, i) {
            var s = t('body'),
              n = t(this).data('draggable').options;
            s.css('cursor') && (n._cursor = s.css('cursor')), s.css('cursor', n.cursor);
          },
          stop: function(e, i) {
            var s = t(this).data('draggable').options;
            s._cursor && t('body').css('cursor', s._cursor);
          },
        }),
        t.ui.plugin.add('draggable', 'iframeFix', {
          start: function(e, i) {
            var s = t(this).data('draggable').options;
            t(!0 === s.iframeFix ? 'iframe' : s.iframeFix).each(function() {
              t('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
                .css({
                  width: this.offsetWidth + 'px',
                  height: this.offsetHeight + 'px',
                  position: 'absolute',
                  opacity: '0.001',
                  zIndex: 1e3,
                })
                .css(t(this).offset())
                .appendTo('body');
            });
          },
          stop: function(e, i) {
            t('div.ui-draggable-iframeFix').each(function() {
              this.parentNode.removeChild(this);
            });
          },
        }),
        t.ui.plugin.add('draggable', 'opacity', {
          start: function(e, i) {
            var s = t(i.helper),
              n = t(this).data('draggable').options;
            s.css('opacity') && (n._opacity = s.css('opacity')), s.css('opacity', n.opacity);
          },
          stop: function(e, i) {
            var s = t(this).data('draggable').options;
            s._opacity && t(i.helper).css('opacity', s._opacity);
          },
        }),
        t.ui.plugin.add('draggable', 'scroll', {
          start: function(e, i) {
            var s = t(this).data('draggable');
            s.scrollParent[0] != document &&
              'HTML' != s.scrollParent[0].tagName &&
              (s.overflowOffset = s.scrollParent.offset());
          },
          drag: function(e, i) {
            var s = t(this).data('draggable'),
              n = s.options,
              o = !1;
            s.scrollParent[0] != document && 'HTML' != s.scrollParent[0].tagName
              ? ((n.axis && 'x' == n.axis) ||
                  (s.overflowOffset.top + s.scrollParent[0].offsetHeight - e.pageY < n.scrollSensitivity
                    ? (s.scrollParent[0].scrollTop = o = s.scrollParent[0].scrollTop + n.scrollSpeed)
                    : e.pageY - s.overflowOffset.top < n.scrollSensitivity &&
                      (s.scrollParent[0].scrollTop = o = s.scrollParent[0].scrollTop - n.scrollSpeed)),
                (n.axis && 'y' == n.axis) ||
                  (s.overflowOffset.left + s.scrollParent[0].offsetWidth - e.pageX < n.scrollSensitivity
                    ? (s.scrollParent[0].scrollLeft = o = s.scrollParent[0].scrollLeft + n.scrollSpeed)
                    : e.pageX - s.overflowOffset.left < n.scrollSensitivity &&
                      (s.scrollParent[0].scrollLeft = o = s.scrollParent[0].scrollLeft - n.scrollSpeed)))
              : ((n.axis && 'x' == n.axis) ||
                  (e.pageY - t(document).scrollTop() < n.scrollSensitivity
                    ? (o = t(document).scrollTop(t(document).scrollTop() - n.scrollSpeed))
                    : t(window).height() - (e.pageY - t(document).scrollTop()) < n.scrollSensitivity &&
                      (o = t(document).scrollTop(t(document).scrollTop() + n.scrollSpeed))),
                (n.axis && 'y' == n.axis) ||
                  (e.pageX - t(document).scrollLeft() < n.scrollSensitivity
                    ? (o = t(document).scrollLeft(t(document).scrollLeft() - n.scrollSpeed))
                    : t(window).width() - (e.pageX - t(document).scrollLeft()) < n.scrollSensitivity &&
                      (o = t(document).scrollLeft(t(document).scrollLeft() + n.scrollSpeed)))),
              !1 !== o && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e);
          },
        }),
        t.ui.plugin.add('draggable', 'snap', {
          start: function(e, i) {
            var s = t(this).data('draggable'),
              n = s.options;
            (s.snapElements = []),
              t(n.snap.constructor != String ? n.snap.items || ':data(draggable)' : n.snap).each(function() {
                var e = t(this),
                  i = e.offset();
                this != s.element[0] &&
                  s.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: i.top,
                    left: i.left,
                  });
              });
          },
          drag: function(e, i) {
            var s,
              n,
              o,
              r,
              a,
              h,
              l,
              c,
              p,
              d,
              u = t(this).data('draggable'),
              f = u.options,
              g = f.snapTolerance,
              m = i.offset.left,
              _ = m + u.helperProportions.width,
              v = i.offset.top,
              b = v + u.helperProportions.height;
            for (s = u.snapElements.length - 1; s >= 0; s--)
              (n = u.snapElements[s].left),
                (o = n + u.snapElements[s].width),
                (r = u.snapElements[s].top),
                (a = r + u.snapElements[s].height),
                (n - g < m && m < o + g && r - g < v && v < a + g) ||
                (n - g < m && m < o + g && r - g < b && b < a + g) ||
                (n - g < _ && _ < o + g && r - g < v && v < a + g) ||
                (n - g < _ && _ < o + g && r - g < b && b < a + g)
                  ? ('inner' != f.snapMode &&
                      ((h = Math.abs(r - b) <= g),
                      (l = Math.abs(a - v) <= g),
                      (c = Math.abs(n - _) <= g),
                      (p = Math.abs(o - m) <= g),
                      h &&
                        (i.position.top =
                          u._convertPositionTo('relative', { top: r - u.helperProportions.height, left: 0 }).top -
                          u.margins.top),
                      l && (i.position.top = u._convertPositionTo('relative', { top: a, left: 0 }).top - u.margins.top),
                      c &&
                        (i.position.left =
                          u._convertPositionTo('relative', { top: 0, left: n - u.helperProportions.width }).left -
                          u.margins.left),
                      p &&
                        (i.position.left =
                          u._convertPositionTo('relative', { top: 0, left: o }).left - u.margins.left)),
                    (d = h || l || c || p),
                    'outer' != f.snapMode &&
                      ((h = Math.abs(r - v) <= g),
                      (l = Math.abs(a - b) <= g),
                      (c = Math.abs(n - m) <= g),
                      (p = Math.abs(o - _) <= g),
                      h && (i.position.top = u._convertPositionTo('relative', { top: r, left: 0 }).top - u.margins.top),
                      l &&
                        (i.position.top =
                          u._convertPositionTo('relative', { top: a - u.helperProportions.height, left: 0 }).top -
                          u.margins.top),
                      c &&
                        (i.position.left = u._convertPositionTo('relative', { top: 0, left: n }).left - u.margins.left),
                      p &&
                        (i.position.left =
                          u._convertPositionTo('relative', { top: 0, left: o - u.helperProportions.width }).left -
                          u.margins.left)),
                    !u.snapElements[s].snapping &&
                      (h || l || c || p || d) &&
                      u.options.snap.snap &&
                      u.options.snap.snap.call(
                        u.element,
                        e,
                        t.extend(u._uiHash(), { snapItem: u.snapElements[s].item })
                      ),
                    (u.snapElements[s].snapping = h || l || c || p || d))
                  : (u.snapElements[s].snapping &&
                      u.options.snap.release &&
                      u.options.snap.release.call(
                        u.element,
                        e,
                        t.extend(u._uiHash(), { snapItem: u.snapElements[s].item })
                      ),
                    (u.snapElements[s].snapping = !1));
          },
        }),
        t.ui.plugin.add('draggable', 'stack', {
          start: function(e, i) {
            var s,
              n = t(this).data('draggable').options,
              o = t.makeArray(t(n.stack)).sort(function(e, i) {
                return (parseInt(t(e).css('zIndex'), 10) || 0) - (parseInt(t(i).css('zIndex'), 10) || 0);
              });
            o.length &&
              ((s = parseInt(o[0].style.zIndex) || 0),
              t(o).each(function(t) {
                this.style.zIndex = s + t;
              }),
              (this[0].style.zIndex = s + o.length));
          },
        }),
        t.ui.plugin.add('draggable', 'zIndex', {
          start: function(e, i) {
            var s = t(i.helper),
              n = t(this).data('draggable').options;
            s.css('zIndex') && (n._zIndex = s.css('zIndex')), s.css('zIndex', n.zIndex);
          },
          stop: function(e, i) {
            var s = t(this).data('draggable').options;
            s._zIndex && t(i.helper).css('zIndex', s._zIndex);
          },
        });
    })(jQuery);
  },
  999: function(t, e) {
    !(function(t, e) {
      var i, s;
      t.widget('ui.resizable', t.ui.mouse, {
        widgetEventPrefix: 'resize',
        options: {
          alsoResize: !1,
          animate: !1,
          animateDuration: 'slow',
          animateEasing: 'swing',
          aspectRatio: !1,
          autoHide: !1,
          containment: !1,
          ghost: !1,
          grid: !1,
          handles: 'e,s,se',
          helper: !1,
          maxHeight: null,
          maxWidth: null,
          minHeight: 10,
          minWidth: 10,
          zIndex: 1e3,
        },
        _create: function() {
          var e,
            i,
            s,
            n,
            o,
            r = this,
            a = this.options;
          if (
            (this.element.addClass('ui-resizable'),
            t.extend(this, {
              _aspectRatio: !!a.aspectRatio,
              aspectRatio: a.aspectRatio,
              originalElement: this.element,
              _proportionallyResizeElements: [],
              _helper: a.helper || a.ghost || a.animate ? a.helper || 'ui-resizable-helper' : null,
            }),
            this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) &&
              (/relative/.test(this.element.css('position')) &&
                t.browser.opera &&
                this.element.css({ position: 'relative', top: 'auto', left: 'auto' }),
              this.element.wrap(
                t('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                  position: this.element.css('position'),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css('top'),
                  left: this.element.css('left'),
                })
              ),
              (this.element = this.element.parent().data('resizable', this.element.data('resizable'))),
              (this.elementIsWrapper = !0),
              this.element.css({
                marginLeft: this.originalElement.css('marginLeft'),
                marginTop: this.originalElement.css('marginTop'),
                marginRight: this.originalElement.css('marginRight'),
                marginBottom: this.originalElement.css('marginBottom'),
              }),
              this.originalElement.css({ marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0 }),
              (this.originalResizeStyle = this.originalElement.css('resize')),
              this.originalElement.css('resize', 'none'),
              this._proportionallyResizeElements.push(
                this.originalElement.css({ position: 'static', zoom: 1, display: 'block' })
              ),
              this.originalElement.css({ margin: this.originalElement.css('margin') }),
              this._proportionallyResize()),
            (this.handles =
              a.handles ||
              (t('.ui-resizable-handle', this.element).length
                ? {
                    n: '.ui-resizable-n',
                    e: '.ui-resizable-e',
                    s: '.ui-resizable-s',
                    w: '.ui-resizable-w',
                    se: '.ui-resizable-se',
                    sw: '.ui-resizable-sw',
                    ne: '.ui-resizable-ne',
                    nw: '.ui-resizable-nw',
                  }
                : 'e,s,se')),
            this.handles.constructor == String)
          )
            for (
              'all' == this.handles && (this.handles = 'n,e,s,w,se,sw,ne,nw'),
                e = this.handles.split(','),
                this.handles = {},
                i = 0;
              i < e.length;
              i++
            )
              (s = t.trim(e[i])),
                (n = 'ui-resizable-' + s),
                (o = t('<div class="ui-resizable-handle ' + n + '"></div>')),
                /sw|se|ne|nw/.test(s) && o.css({ zIndex: ++a.zIndex }),
                'se' == s && o.addClass('ui-icon ui-icon-gripsmall-diagonal-se'),
                (this.handles[s] = '.ui-resizable-' + s),
                this.element.append(o);
          (this._renderAxis = function(e) {
            var i, s, n, o;
            e = e || this.element;
            for (i in this.handles)
              this.handles[i].constructor == String && (this.handles[i] = t(this.handles[i], this.element).show()),
                this.elementIsWrapper &&
                  this.originalElement[0].nodeName.match(/textarea|input|select|button/i) &&
                  ((s = t(this.handles[i], this.element)),
                  (n = 0),
                  (n = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth()),
                  (o =
                    'padding' +
                    (/ne|nw|n/.test(i) ? 'Top' : /se|sw|s/.test(i) ? 'Bottom' : /^e$/.test(i) ? 'Right' : 'Left')),
                  e.css(o, n),
                  this._proportionallyResize()),
                t(this.handles[i]).length;
          }),
            this._renderAxis(this.element),
            (this._handles = t('.ui-resizable-handle', this.element).disableSelection()),
            this._handles.mouseover(function() {
              if (!r.resizing) {
                if (this.className) var t = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                r.axis = t && t[1] ? t[1] : 'se';
              }
            }),
            a.autoHide &&
              (this._handles.hide(),
              t(this.element)
                .addClass('ui-resizable-autohide')
                .hover(
                  function() {
                    t(this).removeClass('ui-resizable-autohide'), r._handles.show();
                  },
                  function() {
                    r.resizing || (t(this).addClass('ui-resizable-autohide'), r._handles.hide());
                  }
                )),
            this._mouseInit();
        },
        destroy: function() {
          var e, i;
          return (
            this._mouseDestroy(),
            (e = function(e) {
              t(e)
                .removeClass('ui-resizable ui-resizable-disabled ui-resizable-resizing')
                .removeData('resizable')
                .unbind('.resizable')
                .find('.ui-resizable-handle')
                .remove();
            }),
            this.elementIsWrapper &&
              (e(this.element),
              (i = this.element),
              i
                .after(
                  this.originalElement.css({
                    position: i.css('position'),
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: i.css('top'),
                    left: i.css('left'),
                  })
                )
                .remove()),
            this.originalElement.css('resize', this.originalResizeStyle),
            e(this.originalElement),
            this
          );
        },
        _mouseCapture: function(e) {
          var i,
            s = !1;
          for (i in this.handles) t(this.handles[i])[0] == e.target && (s = !0);
          return !this.options.disabled && s;
        },
        _mouseStart: function(e) {
          var s,
            n,
            o,
            r = this.options,
            a = this.element.position(),
            h = this.element;
          return (
            (this.resizing = !0),
            (this.documentScroll = { top: t(document).scrollTop(), left: t(document).scrollLeft() }),
            (h.is('.ui-draggable') || /absolute/.test(h.css('position'))) &&
              h.css({ position: 'absolute', top: a.top, left: a.left }),
            t.browser.opera &&
              /relative/.test(h.css('position')) &&
              h.css({ position: 'relative', top: 'auto', left: 'auto' }),
            this._renderProxy(),
            (s = i(this.helper.css('left'))),
            (n = i(this.helper.css('top'))),
            r.containment && ((s += t(r.containment).scrollLeft() || 0), (n += t(r.containment).scrollTop() || 0)),
            (this.offset = this.helper.offset()),
            (this.position = { left: s, top: n }),
            (this.size = this._helper
              ? { width: h.outerWidth(), height: h.outerHeight() }
              : { width: h.width(), height: h.height() }),
            (this.originalSize = this._helper
              ? { width: h.outerWidth(), height: h.outerHeight() }
              : { width: h.width(), height: h.height() }),
            (this.originalPosition = { left: s, top: n }),
            (this.sizeDiff = { width: h.outerWidth() - h.width(), height: h.outerHeight() - h.height() }),
            (this.originalMousePosition = { left: e.pageX, top: e.pageY }),
            (this.aspectRatio =
              'number' == typeof r.aspectRatio
                ? r.aspectRatio
                : this.originalSize.width / this.originalSize.height || 1),
            (o = t('.ui-resizable-' + this.axis).css('cursor')),
            t('body').css('cursor', 'auto' == o ? this.axis + '-resize' : o),
            h.addClass('ui-resizable-resizing'),
            this._propagate('start', e),
            !0
          );
        },
        _mouseDrag: function(e) {
          var i,
            s = this.helper,
            n = (this.options, this.originalMousePosition),
            o = this.axis,
            r = e.pageX - n.left || 0,
            a = e.pageY - n.top || 0,
            h = this._change[o];
          return (
            !!h &&
            ((i = h.apply(this, [e, r, a])),
            t.browser.msie && t.browser.version < 7,
            this.sizeDiff,
            (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)),
            (i = this._respectSize(i, e)),
            this._propagate('resize', e),
            s.css({
              top: this.position.top + 'px',
              left: this.position.left + 'px',
              width: this.size.width + 'px',
              height: this.size.height + 'px',
            }),
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
            this._updateCache(i),
            this._trigger('resize', e, this.ui()),
            !1)
          );
        },
        _mouseStop: function(e) {
          var i, s, n, o, r, a, h, l, c;
          return (
            (this.resizing = !1),
            (i = this.options),
            (s = this),
            this._helper &&
              ((n = this._proportionallyResizeElements),
              (o = n.length && /textarea/i.test(n[0].nodeName)),
              (r = o && t.ui.hasScroll(n[0], 'left') ? 0 : s.sizeDiff.height),
              (a = o ? 0 : s.sizeDiff.width),
              (h = { width: s.helper.width() - a, height: s.helper.height() - r }),
              (l = parseInt(s.element.css('left'), 10) + (s.position.left - s.originalPosition.left) || null),
              (c = parseInt(s.element.css('top'), 10) + (s.position.top - s.originalPosition.top) || null),
              i.animate || this.element.css(t.extend(h, { top: c, left: l })),
              s.helper.height(s.size.height),
              s.helper.width(s.size.width),
              this._helper && !i.animate && this._proportionallyResize()),
            t('body').css('cursor', 'auto'),
            this.element.removeClass('ui-resizable-resizing'),
            this._propagate('stop', e),
            this._helper && this.helper.remove(),
            !1
          );
        },
        _updateCache: function(t) {
          this.options;
          (this.offset = this.helper.offset()),
            s(t.left) && (this.position.left = t.left),
            s(t.top) && (this.position.top = t.top),
            s(t.height) && (this.size.height = t.height),
            s(t.width) && (this.size.width = t.width);
        },
        _updateRatio: function(t, e) {
          var i = (this.options, this.position),
            s = this.size,
            n = this.axis;
          return (
            t.height ? (t.width = s.height * this.aspectRatio) : t.width && (t.height = s.width / this.aspectRatio),
            'sw' == n && ((t.left = i.left + (s.width - t.width)), (t.top = null)),
            'nw' == n && ((t.top = i.top + (s.height - t.height)), (t.left = i.left + (s.width - t.width))),
            t
          );
        },
        _respectSize: function(t, e) {
          var i,
            n,
            o,
            r,
            a,
            h = (this.helper, this.options),
            l = (this._aspectRatio || e.shiftKey, this.axis),
            c = s(t.width) && h.maxWidth && h.maxWidth < t.width,
            p = s(t.height) && h.maxHeight && h.maxHeight < t.height,
            d = s(t.width) && h.minWidth && h.minWidth > t.width,
            u = s(t.height) && h.minHeight && h.minHeight > t.height;
          return (
            d && (t.width = h.minWidth),
            u && (t.height = h.minHeight),
            c && (t.width = h.maxWidth),
            p && (t.height = h.maxHeight),
            (i = this.originalPosition.left + this.originalSize.width),
            (n = this.position.top + this.size.height),
            (o = /sw|nw|w/.test(l)),
            (r = /nw|ne|n/.test(l)),
            d && o && (t.left = i - h.minWidth),
            c && o && (t.left = i - h.maxWidth),
            u && r && (t.top = n - h.minHeight),
            p && r && (t.top = n - h.maxHeight),
            (a = !t.width && !t.height),
            a && !t.left && t.top ? (t.top = null) : a && !t.top && t.left && (t.left = null),
            t
          );
        },
        _proportionallyResize: function() {
          var e, i, s, n, o;
          this.options;
          if (this._proportionallyResizeElements.length)
            for (e = this.helper || this.element, i = 0; i < this._proportionallyResizeElements.length; i++)
              (s = this._proportionallyResizeElements[i]),
                this.borderDif ||
                  ((n = [
                    s.css('borderTopWidth'),
                    s.css('borderRightWidth'),
                    s.css('borderBottomWidth'),
                    s.css('borderLeftWidth'),
                  ]),
                  (o = [s.css('paddingTop'), s.css('paddingRight'), s.css('paddingBottom'), s.css('paddingLeft')]),
                  (this.borderDif = t.map(n, function(t, e) {
                    return (parseInt(t, 10) || 0) + (parseInt(o[e], 10) || 0);
                  }))),
                (t.browser.msie && (t(e).is(':hidden') || t(e).parents(':hidden').length)) ||
                  s.css({
                    height: e.height() - this.borderDif[0] - this.borderDif[2] || 0,
                    width: e.width() - this.borderDif[1] - this.borderDif[3] || 0,
                  });
        },
        _renderProxy: function() {
          var e,
            i,
            s,
            n = this.element,
            o = this.options;
          (this.elementOffset = n.offset()),
            this._helper
              ? ((this.helper = this.helper || t('<div style="overflow:hidden;"></div>')),
                (e = t.browser.msie && t.browser.version < 7),
                (i = e ? 1 : 0),
                (s = e ? 2 : -1),
                this.helper
                  .addClass(this._helper)
                  .css({
                    width: this.element.outerWidth() + s,
                    height: this.element.outerHeight() + s,
                    position: 'absolute',
                    left: this.elementOffset.left - i + 'px',
                    top: this.elementOffset.top - i + 'px',
                    zIndex: ++o.zIndex,
                  }),
                this.helper.appendTo('body').disableSelection())
              : (this.helper = this.element);
        },
        _change: {
          e: function(t, e, i) {
            return { width: this.originalSize.width + e };
          },
          w: function(t, e, i) {
            var s = (this.options, this.originalSize);
            return { left: this.originalPosition.left + e, width: s.width - e };
          },
          n: function(t, e, i) {
            var s = (this.options, this.originalSize);
            return { top: this.originalPosition.top + i, height: s.height - i };
          },
          s: function(t, e, i) {
            return { height: this.originalSize.height + i };
          },
          se: function(e, i, s) {
            return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]));
          },
          sw: function(e, i, s) {
            return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]));
          },
          ne: function(e, i, s) {
            return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]));
          },
          nw: function(e, i, s) {
            return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]));
          },
        },
        _propagate: function(e, i) {
          t.ui.plugin.call(this, e, [i, this.ui()]), 'resize' != e && this._trigger(e, i, this.ui());
        },
        plugins: {},
        ui: function() {
          return {
            originalElement: this.originalElement,
            element: this.element,
            helper: this.helper,
            position: this.position,
            size: this.size,
            originalSize: this.originalSize,
            originalPosition: this.originalPosition,
          };
        },
      }),
        t.extend(t.ui.resizable, { version: '@VERSION' }),
        t.ui.plugin.add('resizable', 'alsoResize', {
          start: function(e, i) {
            var s = t(this).data('resizable'),
              n = s.options,
              o = function(e) {
                t(e).each(function() {
                  var e = t(this);
                  e.data('resizable-alsoresize', {
                    width: parseInt(e.width(), 10),
                    height: parseInt(e.height(), 10),
                    left: parseInt(e.css('left'), 10),
                    top: parseInt(e.css('top'), 10),
                    position: e.css('position'),
                  });
                });
              };
            'object' != typeof n.alsoResize || n.alsoResize.parentNode
              ? o(n.alsoResize)
              : n.alsoResize.length
              ? ((n.alsoResize = n.alsoResize[0]), o(n.alsoResize))
              : t.each(n.alsoResize, function(t) {
                  o(t);
                });
          },
          resize: function(e, i) {
            var s = t(this).data('resizable'),
              n = s.options,
              o = s.originalSize,
              r = s.originalPosition,
              a = {
                height: s.size.height - o.height || 0,
                width: s.size.width - o.width || 0,
                top: s.position.top - r.top || 0,
                left: s.position.left - r.left || 0,
              },
              h = function(e, n) {
                t(e).each(function() {
                  var e = t(this),
                    o = t(this).data('resizable-alsoresize'),
                    r = {},
                    h =
                      n && n.length
                        ? n
                        : e.parents(i.originalElement[0]).length
                        ? ['width', 'height']
                        : ['width', 'height', 'top', 'left'];
                  t.each(h, function(t, e) {
                    var i = (o[e] || 0) + (a[e] || 0);
                    i && i >= 0 && (r[e] = i || null);
                  }),
                    t.browser.opera &&
                      /relative/.test(e.css('position')) &&
                      ((s._revertToRelativePosition = !0), e.css({ position: 'absolute', top: 'auto', left: 'auto' })),
                    e.css(r);
                });
              };
            'object' != typeof n.alsoResize || n.alsoResize.nodeType
              ? h(n.alsoResize)
              : t.each(n.alsoResize, function(t, e) {
                  h(t, e);
                });
          },
          stop: function(e, i) {
            var s = t(this).data('resizable'),
              n = s.options,
              o = function(e) {
                t(e).each(function() {
                  var e = t(this);
                  e.css({ position: e.data('resizable-alsoresize').position });
                });
              };
            s._revertToRelativePosition &&
              ((s._revertToRelativePosition = !1),
              'object' != typeof n.alsoResize || n.alsoResize.nodeType
                ? o(n.alsoResize)
                : t.each(n.alsoResize, function(t) {
                    o(t);
                  })),
              t(this).removeData('resizable-alsoresize');
          },
        }),
        t.ui.plugin.add('resizable', 'animate', {
          stop: function(e, i) {
            var s = t(this).data('resizable'),
              n = s.options,
              o = s._proportionallyResizeElements,
              r = o.length && /textarea/i.test(o[0].nodeName),
              a = r && t.ui.hasScroll(o[0], 'left') ? 0 : s.sizeDiff.height,
              h = r ? 0 : s.sizeDiff.width,
              l = { width: s.size.width - h, height: s.size.height - a },
              c = parseInt(s.element.css('left'), 10) + (s.position.left - s.originalPosition.left) || null,
              p = parseInt(s.element.css('top'), 10) + (s.position.top - s.originalPosition.top) || null;
            s.element.animate(t.extend(l, p && c ? { top: p, left: c } : {}), {
              duration: n.animateDuration,
              easing: n.animateEasing,
              step: function() {
                var i = {
                  width: parseInt(s.element.css('width'), 10),
                  height: parseInt(s.element.css('height'), 10),
                  top: parseInt(s.element.css('top'), 10),
                  left: parseInt(s.element.css('left'), 10),
                };
                o && o.length && t(o[0]).css({ width: i.width, height: i.height }),
                  s._updateCache(i),
                  s._propagate('resize', e);
              },
            });
          },
        }),
        t.ui.plugin.add('resizable', 'containment', {
          start: function(e, s) {
            var n,
              o,
              r,
              a,
              h,
              l,
              c,
              p = t(this).data('resizable'),
              d = p.options,
              u = p.element,
              f = d.containment,
              g = f instanceof t ? f.get(0) : /parent/.test(f) ? u.parent().get(0) : f;
            g &&
              ((p.containerElement = t(g)),
              /document/.test(f) || f == document
                ? ((p.containerOffset = { left: 0, top: 0 }),
                  (p.containerPosition = { left: 0, top: 0 }),
                  (p.parentData = {
                    element: t(document),
                    left: 0,
                    top: 0,
                    width: t(document).width(),
                    height: t(document).height() || document.body.parentNode.scrollHeight,
                  }))
                : ((n = t(g)),
                  (o = []),
                  t(['Top', 'Right', 'Left', 'Bottom']).each(function(t, e) {
                    o[t] = i(n.css('padding' + e));
                  }),
                  (p.containerOffset = n.offset()),
                  (p.containerPosition = n.position()),
                  (p.containerSize = { height: n.innerHeight() - o[3], width: n.innerWidth() - o[1] }),
                  (r = p.containerOffset),
                  (a = p.containerSize.height),
                  (h = p.containerSize.width),
                  (l = t.ui.hasScroll(g, 'left') ? g.scrollWidth : h),
                  (c = t.ui.hasScroll(g) ? g.scrollHeight : a),
                  (p.parentData = { element: g, left: r.left, top: r.top, width: l, height: c })));
          },
          resize: function(e, i) {
            var s,
              n,
              o,
              r,
              a = t(this).data('resizable'),
              h = a.options,
              l = (a.containerSize, a.containerOffset),
              c = (a.size, a.position),
              p = a._aspectRatio || e.shiftKey,
              d = { top: 0, left: 0 },
              u = a.containerElement,
              f = /^static$/.test(u.css('position'));
            u[0] != document && f && (d = l),
              c.left < (a._helper ? l.left : 0) &&
                ((a.size.width = a.size.width + (a._helper ? a.position.left - l.left : a.position.left - d.left)),
                p && (a.size.height = a.size.width / h.aspectRatio),
                (a.position.left = h.helper ? l.left : 0)),
              c.top < (a._helper ? l.top : 0) &&
                ((a.size.height = a.size.height + (a._helper ? a.position.top - l.top : a.position.top)),
                p && (a.size.width = a.size.height * h.aspectRatio),
                (a.position.top = a._helper ? l.top : 0)),
              (a.offset.left = a.parentData.left + a.position.left),
              (a.offset.top = a.parentData.top + a.position.top),
              (s = Math.abs((a._helper, a.offset.left - d.left + a.sizeDiff.width))),
              (n = Math.abs((a._helper ? a.offset.top - d.top : a.offset.top - l.top) + a.sizeDiff.height)),
              (o = a.containerElement.get(0) == a.element.parent().get(0)),
              (r = /relative|absolute/.test(a.containerElement.css('position'))),
              o && r && (s -= a.parentData.left),
              s + a.size.width >= a.parentData.width &&
                ((a.size.width = a.parentData.width - s), p && (a.size.height = a.size.width / a.aspectRatio)),
              n + a.size.height >= a.parentData.height &&
                ((a.size.height = a.parentData.height - n), p && (a.size.width = a.size.height * a.aspectRatio));
          },
          stop: function(e, i) {
            var s = t(this).data('resizable'),
              n = s.options,
              o = (s.position, s.containerOffset),
              r = s.containerPosition,
              a = s.containerElement,
              h = t(s.helper),
              l = h.offset(),
              c = h.outerWidth() - s.sizeDiff.width,
              p = h.outerHeight() - s.sizeDiff.height;
            s._helper &&
              !n.animate &&
              /relative/.test(a.css('position')) &&
              t(this).css({ left: l.left - r.left - o.left, width: c, height: p }),
              s._helper &&
                !n.animate &&
                /^static$/.test(a.css('position')) &&
                t(this).css({ left: l.left - r.left - o.left, width: c, height: p });
          },
        }),
        t.ui.plugin.add('resizable', 'ghost', {
          start: function(e, i) {
            var s = t(this).data('resizable'),
              n = s.options,
              o = s.size;
            (s.ghost = s.originalElement.clone()),
              s.ghost
                .css({
                  opacity: 0.25,
                  display: 'block',
                  position: 'relative',
                  height: o.height,
                  width: o.width,
                  margin: 0,
                  left: 0,
                  top: 0,
                })
                .addClass('ui-resizable-ghost')
                .addClass('string' == typeof n.ghost ? n.ghost : ''),
              s.ghost.appendTo(s.helper);
          },
          resize: function(e, i) {
            var s = t(this).data('resizable');
            s.options;
            s.ghost && s.ghost.css({ position: 'relative', height: s.size.height, width: s.size.width });
          },
          stop: function(e, i) {
            var s = t(this).data('resizable');
            s.options;
            s.ghost && s.helper && s.helper.get(0).removeChild(s.ghost.get(0));
          },
        }),
        t.ui.plugin.add('resizable', 'grid', {
          resize: function(e, i) {
            var s,
              n,
              o = t(this).data('resizable'),
              r = o.options,
              a = o.size,
              h = o.originalSize,
              l = o.originalPosition,
              c = o.axis;
            r._aspectRatio || e.shiftKey;
            (r.grid = 'number' == typeof r.grid ? [r.grid, r.grid] : r.grid),
              (s = Math.round((a.width - h.width) / (r.grid[0] || 1)) * (r.grid[0] || 1)),
              (n = Math.round((a.height - h.height) / (r.grid[1] || 1)) * (r.grid[1] || 1)),
              /^(se|s|e)$/.test(c)
                ? ((o.size.width = h.width + s), (o.size.height = h.height + n))
                : /^(ne)$/.test(c)
                ? ((o.size.width = h.width + s), (o.size.height = h.height + n), (o.position.top = l.top - n))
                : /^(sw)$/.test(c)
                ? ((o.size.width = h.width + s), (o.size.height = h.height + n), (o.position.left = l.left - s))
                : ((o.size.width = h.width + s),
                  (o.size.height = h.height + n),
                  (o.position.top = l.top - n),
                  (o.position.left = l.left - s));
          },
        }),
        (i = function(t) {
          return parseInt(t, 10) || 0;
        }),
        (s = function(t) {
          return !isNaN(parseInt(t, 10));
        });
    })(jQuery);
  },
  1e3: function(t, e) {
    !(function(t, e) {
      t.widget('ui.sortable', t.ui.mouse, {
        widgetEventPrefix: 'sort',
        options: {
          appendTo: 'parent',
          axis: !1,
          connectWith: !1,
          containment: !1,
          cursor: 'auto',
          cursorAt: !1,
          dropOnEmpty: !0,
          forcePlaceholderSize: !1,
          forceHelperSize: !1,
          grid: !1,
          handle: !1,
          helper: 'original',
          items: '> *',
          opacity: !1,
          placeholder: !1,
          revert: !1,
          scroll: !0,
          scrollSensitivity: 20,
          scrollSpeed: 20,
          scope: 'default',
          tolerance: 'intersect',
          zIndex: 1e3,
        },
        _create: function() {
          this.options;
          (this.containerCache = {}),
            this.element.addClass('ui-sortable'),
            this.refresh(),
            (this.floating =
              !!this.items.length &&
              (/left|right/.test(this.items[0].item.css('float')) ||
                /inline|table-cell/.test(this.items[0].item.css('display')))),
            (this.offset = this.element.offset()),
            this._mouseInit();
        },
        destroy: function() {
          this.element
            .removeClass('ui-sortable ui-sortable-disabled')
            .removeData('sortable')
            .unbind('.sortable'),
            this._mouseDestroy();
          for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData('sortable-item');
          return this;
        },
        _setOption: function(e, i) {
          'disabled' === e
            ? ((this.options[e] = i), this.widget()[i ? 'addClass' : 'removeClass']('ui-sortable-disabled'))
            : t.Widget.prototype._setOption.apply(this, arguments);
        },
        _mouseCapture: function(e, i) {
          var s, n, o;
          return (
            !this.reverting &&
            (!this.options.disabled &&
              'static' != this.options.type &&
              (this._refreshItems(e),
              (s = null),
              (n = this),
              t(e.target)
                .parents()
                .each(function() {
                  if (t.data(this, 'sortable-item') == n) return (s = t(this)), !1;
                }),
              t.data(e.target, 'sortable-item') == n && (s = t(e.target)),
              !!s &&
                (!(
                  this.options.handle &&
                  !i &&
                  ((o = !1),
                  t(this.options.handle, s)
                    .find('*')
                    .andSelf()
                    .each(function() {
                      this == e.target && (o = !0);
                    }),
                  !o)
                ) &&
                  ((this.currentItem = s), this._removeCurrentsFromItems(), !0))))
          );
        },
        _mouseStart: function(e, i, s) {
          var n,
            o = this.options,
            r = this;
          if (
            ((this.currentContainer = this),
            this.refreshPositions(),
            (this.helper = this._createHelper(e)),
            this._cacheHelperProportions(),
            this._cacheMargins(),
            (this.scrollParent = this.helper.scrollParent()),
            (this.offset = this.currentItem.offset()),
            (this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }),
            this.helper.css('position', 'absolute'),
            (this.cssPosition = this.helper.css('position')),
            t.extend(this.offset, {
              click: { left: e.pageX - this.offset.left, top: e.pageY - this.offset.top },
              parent: this._getParentOffset(),
              relative: this._getRelativeOffset(),
            }),
            (this.originalPosition = this._generatePosition(e)),
            (this.originalPageX = e.pageX),
            (this.originalPageY = e.pageY),
            o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
            (this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] }),
            this.helper[0] != this.currentItem[0] && this.currentItem.hide(),
            this._createPlaceholder(),
            o.containment && this._setContainment(),
            o.cursor &&
              (t('body').css('cursor') && (this._storedCursor = t('body').css('cursor')),
              t('body').css('cursor', o.cursor)),
            o.opacity &&
              (this.helper.css('opacity') && (this._storedOpacity = this.helper.css('opacity')),
              this.helper.css('opacity', o.opacity)),
            o.zIndex &&
              (this.helper.css('zIndex') && (this._storedZIndex = this.helper.css('zIndex')),
              this.helper.css('zIndex', o.zIndex)),
            this.scrollParent[0] != document &&
              'HTML' != this.scrollParent[0].tagName &&
              (this.overflowOffset = this.scrollParent.offset()),
            this._trigger('start', e, this._uiHash()),
            this._preserveHelperProportions || this._cacheHelperProportions(),
            !s)
          )
            for (n = this.containers.length - 1; n >= 0; n--)
              this.containers[n]._trigger('activate', e, r._uiHash(this));
          return (
            t.ui.ddmanager && (t.ui.ddmanager.current = this),
            t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e),
            (this.dragging = !0),
            this.helper.addClass('ui-sortable-helper'),
            this._mouseDrag(e),
            !0
          );
        },
        _mouseDrag: function(e) {
          var i, s, n, o, r, a;
          for (
            this.position = this._generatePosition(e),
              this.positionAbs = this._convertPositionTo('absolute'),
              this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
              this.options.scroll &&
                ((i = this.options),
                (s = !1),
                this.scrollParent[0] != document && 'HTML' != this.scrollParent[0].tagName
                  ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < i.scrollSensitivity
                      ? (this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop + i.scrollSpeed)
                      : e.pageY - this.overflowOffset.top < i.scrollSensitivity &&
                        (this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop - i.scrollSpeed),
                    this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < i.scrollSensitivity
                      ? (this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft + i.scrollSpeed)
                      : e.pageX - this.overflowOffset.left < i.scrollSensitivity &&
                        (this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft - i.scrollSpeed))
                  : (e.pageY - t(document).scrollTop() < i.scrollSensitivity
                      ? (s = t(document).scrollTop(t(document).scrollTop() - i.scrollSpeed))
                      : t(window).height() - (e.pageY - t(document).scrollTop()) < i.scrollSensitivity &&
                        (s = t(document).scrollTop(t(document).scrollTop() + i.scrollSpeed)),
                    e.pageX - t(document).scrollLeft() < i.scrollSensitivity
                      ? (s = t(document).scrollLeft(t(document).scrollLeft() - i.scrollSpeed))
                      : t(window).width() - (e.pageX - t(document).scrollLeft()) < i.scrollSensitivity &&
                        (s = t(document).scrollLeft(t(document).scrollLeft() + i.scrollSpeed))),
                !1 !== s && t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)),
              this.positionAbs = this._convertPositionTo('absolute'),
              (this.options.axis && 'y' == this.options.axis) ||
                (this.helper[0].style.left = this.position.left + 'px'),
              (this.options.axis && 'x' == this.options.axis) || (this.helper[0].style.top = this.position.top + 'px'),
              n = this.items.length - 1;
            n >= 0;
            n--
          )
            if (
              ((o = this.items[n]),
              (r = o.item[0]),
              (a = this._intersectsWithPointer(o)),
              a &&
                !(
                  r == this.currentItem[0] ||
                  this.placeholder[1 == a ? 'next' : 'prev']()[0] == r ||
                  t.ui.contains(this.placeholder[0], r) ||
                  ('semi-dynamic' == this.options.type && t.ui.contains(this.element[0], r))
                ))
            ) {
              if (
                ((this.direction = 1 == a ? 'down' : 'up'),
                'pointer' != this.options.tolerance && !this._intersectsWithSides(o))
              )
                break;
              this._rearrange(e, o), this._trigger('change', e, this._uiHash());
              break;
            }
          return (
            this._contactContainers(e),
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            this._trigger('sort', e, this._uiHash()),
            (this.lastPositionAbs = this.positionAbs),
            !1
          );
        },
        _mouseStop: function(e, i) {
          var s, n;
          if (e)
            return (
              t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e),
              this.options.revert
                ? ((s = this),
                  (n = s.placeholder.offset()),
                  (s.reverting = !0),
                  t(this.helper).animate(
                    {
                      left:
                        n.left -
                        this.offset.parent.left -
                        s.margins.left +
                        (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                      top:
                        n.top -
                        this.offset.parent.top -
                        s.margins.top +
                        (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop),
                    },
                    parseInt(this.options.revert, 10) || 500,
                    function() {
                      s._clear(e);
                    }
                  ))
                : this._clear(e, i),
              !1
            );
        },
        cancel: function() {
          var e,
            i = this;
          if (this.dragging)
            for (
              this._mouseUp({ target: null }),
                'original' == this.options.helper
                  ? this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper')
                  : this.currentItem.show(),
                e = this.containers.length - 1;
              e >= 0;
              e--
            )
              this.containers[e]._trigger('deactivate', null, i._uiHash(this)),
                this.containers[e].containerCache.over &&
                  (this.containers[e]._trigger('out', null, i._uiHash(this)),
                  (this.containers[e].containerCache.over = 0));
          return (
            this.placeholder &&
              (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
              'original' != this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(),
              t.extend(this, { helper: null, dragging: !1, reverting: !1, _noFinalSort: null }),
              this.domPosition.prev
                ? t(this.domPosition.prev).after(this.currentItem)
                : t(this.domPosition.parent).prepend(this.currentItem)),
            this
          );
        },
        serialize: function(e) {
          var i = this._getItemsAsjQuery(e && e.connected),
            s = [];
          return (
            (e = e || {}),
            t(i).each(function() {
              var i = (t(e.item || this).attr(e.attribute || 'id') || '').match(e.expression || /(.+)[-=_](.+)/);
              i && s.push((e.key || i[1] + '[]') + '=' + (e.key && e.expression ? i[1] : i[2]));
            }),
            !s.length && e.key && s.push(e.key + '='),
            s.join('&')
          );
        },
        toArray: function(e) {
          var i = this._getItemsAsjQuery(e && e.connected),
            s = [];
          return (
            (e = e || {}),
            i.each(function() {
              s.push(t(e.item || this).attr(e.attribute || 'id') || '');
            }),
            s
          );
        },
        _intersectsWith: function(t) {
          var e = this.positionAbs.left,
            i = e + this.helperProportions.width,
            s = this.positionAbs.top,
            n = s + this.helperProportions.height,
            o = t.left,
            r = o + t.width,
            a = t.top,
            h = a + t.height,
            l = this.offset.click.top,
            c = this.offset.click.left,
            p = s + l > a && s + l < h && e + c > o && e + c < r;
          return 'pointer' == this.options.tolerance ||
            this.options.forcePointerForContainers ||
            ('pointer' != this.options.tolerance &&
              this.helperProportions[this.floating ? 'width' : 'height'] > t[this.floating ? 'width' : 'height'])
            ? p
            : o < e + this.helperProportions.width / 2 &&
                i - this.helperProportions.width / 2 < r &&
                a < s + this.helperProportions.height / 2 &&
                n - this.helperProportions.height / 2 < h;
        },
        _intersectsWithPointer: function(e) {
          var i = t.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height),
            s = t.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width),
            n = i && s,
            o = this._getDragVerticalDirection(),
            r = this._getDragHorizontalDirection();
          return !!n && (this.floating ? ((r && 'right' == r) || 'down' == o ? 2 : 1) : o && ('down' == o ? 2 : 1));
        },
        _intersectsWithSides: function(e) {
          var i = t.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
            s = t.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
            n = this._getDragVerticalDirection(),
            o = this._getDragHorizontalDirection();
          return this.floating && o
            ? ('right' == o && s) || ('left' == o && !s)
            : n && (('down' == n && i) || ('up' == n && !i));
        },
        _getDragVerticalDirection: function() {
          var t = this.positionAbs.top - this.lastPositionAbs.top;
          return 0 != t && (t > 0 ? 'down' : 'up');
        },
        _getDragHorizontalDirection: function() {
          var t = this.positionAbs.left - this.lastPositionAbs.left;
          return 0 != t && (t > 0 ? 'right' : 'left');
        },
        refresh: function(t) {
          return this._refreshItems(t), this.refreshPositions(), this;
        },
        _connectWith: function() {
          var t = this.options;
          return t.connectWith.constructor == String ? [t.connectWith] : t.connectWith;
        },
        _getItemsAsjQuery: function(e) {
          var i,
            s,
            n,
            o,
            r = [],
            a = [],
            h = this._connectWith();
          if (h && e)
            for (i = h.length - 1; i >= 0; i--)
              for (s = t(h[i]), n = s.length - 1; n >= 0; n--)
                (o = t.data(s[n], 'sortable')) &&
                  o != this &&
                  !o.options.disabled &&
                  a.push([
                    t.isFunction(o.options.items)
                      ? o.options.items.call(o.element)
                      : t(o.options.items, o.element)
                          .not('.ui-sortable-helper')
                          .not('.ui-sortable-placeholder'),
                    o,
                  ]);
          for (
            a.push([
              t.isFunction(this.options.items)
                ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem })
                : t(this.options.items, this.element)
                    .not('.ui-sortable-helper')
                    .not('.ui-sortable-placeholder'),
              this,
            ]),
              i = a.length - 1;
            i >= 0;
            i--
          )
            a[i][0].each(function() {
              r.push(this);
            });
          return t(r);
        },
        _removeCurrentsFromItems: function() {
          var t,
            e,
            i = this.currentItem.find(':data(sortable-item)');
          for (t = 0; t < this.items.length; t++)
            for (e = 0; e < i.length; e++) i[e] == this.items[t].item[0] && this.items.splice(t, 1);
        },
        _refreshItems: function(e) {
          var i, s, n, o, r, a, h, l, c, p, d;
          if (
            ((this.items = []),
            (this.containers = [this]),
            (i = this.items),
            this,
            (s = [
              [
                t.isFunction(this.options.items)
                  ? this.options.items.call(this.element[0], e, { item: this.currentItem })
                  : t(this.options.items, this.element),
                this,
              ],
            ]),
            (n = this._connectWith()))
          )
            for (o = n.length - 1; o >= 0; o--)
              for (r = t(n[o]), a = r.length - 1; a >= 0; a--)
                (h = t.data(r[a], 'sortable')) &&
                  h != this &&
                  !h.options.disabled &&
                  (s.push([
                    t.isFunction(h.options.items)
                      ? h.options.items.call(h.element[0], e, { item: this.currentItem })
                      : t(h.options.items, h.element),
                    h,
                  ]),
                  this.containers.push(h));
          for (o = s.length - 1; o >= 0; o--)
            for (l = s[o][1], c = s[o][0], a = 0, p = c.length; a < p; a++)
              (d = t(c[a])),
                d.data('sortable-item', l),
                i.push({ item: d, instance: l, width: 0, height: 0, left: 0, top: 0 });
        },
        refreshPositions: function(e) {
          var i, s, n, o;
          for (
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset()),
              i = this.items.length - 1;
            i >= 0;
            i--
          )
            (s = this.items[i]),
              (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item),
              e || ((s.width = n.outerWidth()), (s.height = n.outerHeight())),
              (o = n.offset()),
              (s.left = o.left),
              (s.top = o.top);
          if (this.options.custom && this.options.custom.refreshContainers)
            this.options.custom.refreshContainers.call(this);
          else
            for (i = this.containers.length - 1; i >= 0; i--)
              (o = this.containers[i].element.offset()),
                (this.containers[i].containerCache.left = o.left),
                (this.containers[i].containerCache.top = o.top),
                (this.containers[i].containerCache.width = this.containers[i].element.outerWidth()),
                (this.containers[i].containerCache.height = this.containers[i].element.outerHeight());
          return this;
        },
        _createPlaceholder: function(e) {
          var i,
            s = e || this,
            n = s.options;
          (n.placeholder && n.placeholder.constructor != String) ||
            ((i = n.placeholder),
            (n.placeholder = {
              element: function() {
                var e = t(document.createElement(s.currentItem[0].nodeName))
                  .addClass(i || s.currentItem[0].className + ' ui-sortable-placeholder')
                  .removeClass('ui-sortable-helper')[0];
                return i || (e.style.visibility = 'hidden'), e;
              },
              update: function(t, e) {
                (i && !n.forcePlaceholderSize) ||
                  (e.height() ||
                    e.height(
                      s.currentItem.innerHeight() -
                        parseInt(s.currentItem.css('paddingTop') || 0, 10) -
                        parseInt(s.currentItem.css('paddingBottom') || 0, 10)
                    ),
                  e.width() ||
                    e.width(
                      s.currentItem.innerWidth() -
                        parseInt(s.currentItem.css('paddingLeft') || 0, 10) -
                        parseInt(s.currentItem.css('paddingRight') || 0, 10)
                    ));
              },
            })),
            (s.placeholder = t(n.placeholder.element.call(s.element, s.currentItem))),
            s.currentItem.after(s.placeholder),
            n.placeholder.update(s, s.placeholder);
        },
        _contactContainers: function(e) {
          var i,
            s,
            n,
            o,
            r,
            a,
            h = null,
            l = null;
          for (i = this.containers.length - 1; i >= 0; i--)
            if (!t.ui.contains(this.currentItem[0], this.containers[i].element[0]))
              if (this._intersectsWith(this.containers[i].containerCache)) {
                if (h && t.ui.contains(this.containers[i].element[0], h.element[0])) continue;
                (h = this.containers[i]), (l = i);
              } else
                this.containers[i].containerCache.over &&
                  (this.containers[i]._trigger('out', e, this._uiHash(this)),
                  (this.containers[i].containerCache.over = 0));
          if (h)
            if (1 === this.containers.length)
              this.containers[l]._trigger('over', e, this._uiHash(this)), (this.containers[l].containerCache.over = 1);
            else if (this.currentContainer != this.containers[l]) {
              for (
                s = 1e4,
                  n = null,
                  o = this.positionAbs[this.containers[l].floating ? 'left' : 'top'],
                  r = this.items.length - 1;
                r >= 0;
                r--
              )
                t.ui.contains(this.containers[l].element[0], this.items[r].item[0]) &&
                  ((a = this.items[r][this.containers[l].floating ? 'left' : 'top']),
                  Math.abs(a - o) < s && ((s = Math.abs(a - o)), (n = this.items[r])));
              if (!n && !this.options.dropOnEmpty) return;
              (this.currentContainer = this.containers[l]),
                n ? this._rearrange(e, n, null, !0) : this._rearrange(e, null, this.containers[l].element, !0),
                this._trigger('change', e, this._uiHash()),
                this.containers[l]._trigger('change', e, this._uiHash(this)),
                this.options.placeholder.update(this.currentContainer, this.placeholder),
                this.containers[l]._trigger('over', e, this._uiHash(this)),
                (this.containers[l].containerCache.over = 1);
            }
        },
        _createHelper: function(e) {
          var i = this.options,
            s = t.isFunction(i.helper)
              ? t(i.helper.apply(this.element[0], [e, this.currentItem]))
              : 'clone' == i.helper
              ? this.currentItem.clone()
              : this.currentItem;
          return (
            s.parents('body').length ||
              t('parent' != i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]),
            s[0] == this.currentItem[0] &&
              (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css('position'),
                top: this.currentItem.css('top'),
                left: this.currentItem.css('left'),
              }),
            ('' == s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()),
            ('' == s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()),
            s
          );
        },
        _adjustOffsetFromHelper: function(e) {
          'string' == typeof e && (e = e.split(' ')),
            t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
            'left' in e && (this.offset.click.left = e.left + this.margins.left),
            'right' in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
            'top' in e && (this.offset.click.top = e.top + this.margins.top),
            'bottom' in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
        },
        _getParentOffset: function() {
          this.offsetParent = this.helper.offsetParent();
          var e = this.offsetParent.offset();
          return (
            'absolute' == this.cssPosition &&
              this.scrollParent[0] != document &&
              t.ui.contains(this.scrollParent[0], this.offsetParent[0]) &&
              ((e.left += this.scrollParent.scrollLeft()), (e.top += this.scrollParent.scrollTop())),
            (this.offsetParent[0] == document.body ||
              (this.offsetParent[0].tagName &&
                'html' == this.offsetParent[0].tagName.toLowerCase() &&
                t.browser.msie)) &&
              (e = { top: 0, left: 0 }),
            {
              top: e.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
              left: e.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0),
            }
          );
        },
        _getRelativeOffset: function() {
          if ('relative' == this.cssPosition) {
            var t = this.currentItem.position();
            return {
              top: t.top - (parseInt(this.helper.css('top'), 10) || 0) + this.scrollParent.scrollTop(),
              left: t.left - (parseInt(this.helper.css('left'), 10) || 0) + this.scrollParent.scrollLeft(),
            };
          }
          return { top: 0, left: 0 };
        },
        _cacheMargins: function() {
          this.margins = {
            left: parseInt(this.currentItem.css('marginLeft'), 10) || 0,
            top: parseInt(this.currentItem.css('marginTop'), 10) || 0,
          };
        },
        _cacheHelperProportions: function() {
          this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
        },
        _setContainment: function() {
          var e,
            i,
            s,
            n = this.options;
          'parent' == n.containment && (n.containment = this.helper[0].parentNode),
            ('document' != n.containment && 'window' != n.containment) ||
              (this.containment = [
                0 - this.offset.relative.left - this.offset.parent.left,
                0 - this.offset.relative.top - this.offset.parent.top,
                t('document' == n.containment ? document : window).width() -
                  this.helperProportions.width -
                  this.margins.left,
                (t('document' == n.containment ? document : window).height() || document.body.parentNode.scrollHeight) -
                  this.helperProportions.height -
                  this.margins.top,
              ]),
            /^(document|window|parent)$/.test(n.containment) ||
              ((e = t(n.containment)[0]),
              (i = t(n.containment).offset()),
              (s = 'hidden' != t(e).css('overflow')),
              (this.containment = [
                i.left +
                  (parseInt(t(e).css('borderLeftWidth'), 10) || 0) +
                  (parseInt(t(e).css('paddingLeft'), 10) || 0) -
                  this.margins.left,
                i.top +
                  (parseInt(t(e).css('borderTopWidth'), 10) || 0) +
                  (parseInt(t(e).css('paddingTop'), 10) || 0) -
                  this.margins.top,
                i.left +
                  (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) -
                  (parseInt(t(e).css('borderLeftWidth'), 10) || 0) -
                  (parseInt(t(e).css('paddingRight'), 10) || 0) -
                  this.helperProportions.width -
                  this.margins.left,
                i.top +
                  (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) -
                  (parseInt(t(e).css('borderTopWidth'), 10) || 0) -
                  (parseInt(t(e).css('paddingBottom'), 10) || 0) -
                  this.helperProportions.height -
                  this.margins.top,
              ]));
        },
        _convertPositionTo: function(e, i) {
          var s, n, o;
          return (
            i || (i = this.position),
            (s = 'absolute' == e ? 1 : -1),
            this.options,
            (n =
              'absolute' != this.cssPosition ||
              (this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]))
                ? this.scrollParent
                : this.offsetParent),
            (o = /(html|body)/i.test(n[0].tagName)),
            {
              top:
                i.top +
                this.offset.relative.top * s +
                this.offset.parent.top * s -
                (t.browser.safari && 'fixed' == this.cssPosition
                  ? 0
                  : ('fixed' == this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s),
              left:
                i.left +
                this.offset.relative.left * s +
                this.offset.parent.left * s -
                (t.browser.safari && 'fixed' == this.cssPosition
                  ? 0
                  : ('fixed' == this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s),
            }
          );
        },
        _generatePosition: function(e) {
          var i,
            s,
            n,
            o,
            r = this.options,
            a =
              'absolute' != this.cssPosition ||
              (this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]))
                ? this.scrollParent
                : this.offsetParent,
            h = /(html|body)/i.test(a[0].tagName);
          return (
            'relative' != this.cssPosition ||
              (this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0]) ||
              (this.offset.relative = this._getRelativeOffset()),
            (i = e.pageX),
            (s = e.pageY),
            this.originalPosition &&
              (this.containment &&
                (e.pageX - this.offset.click.left < this.containment[0] &&
                  (i = this.containment[0] + this.offset.click.left),
                e.pageY - this.offset.click.top < this.containment[1] &&
                  (s = this.containment[1] + this.offset.click.top),
                e.pageX - this.offset.click.left > this.containment[2] &&
                  (i = this.containment[2] + this.offset.click.left),
                e.pageY - this.offset.click.top > this.containment[3] &&
                  (s = this.containment[3] + this.offset.click.top)),
              r.grid &&
                ((n = this.originalPageY + Math.round((s - this.originalPageY) / r.grid[1]) * r.grid[1]),
                (s =
                  this.containment &&
                  (n - this.offset.click.top < this.containment[1] || n - this.offset.click.top > this.containment[3])
                    ? n - this.offset.click.top < this.containment[1]
                      ? n + r.grid[1]
                      : n - r.grid[1]
                    : n),
                (o = this.originalPageX + Math.round((i - this.originalPageX) / r.grid[0]) * r.grid[0]),
                (i =
                  this.containment &&
                  (o - this.offset.click.left < this.containment[0] || o - this.offset.click.left > this.containment[2])
                    ? o - this.offset.click.left < this.containment[0]
                      ? o + r.grid[0]
                      : o - r.grid[0]
                    : o))),
            {
              top:
                s -
                this.offset.click.top -
                this.offset.relative.top -
                this.offset.parent.top +
                (t.browser.safari && 'fixed' == this.cssPosition
                  ? 0
                  : 'fixed' == this.cssPosition
                  ? -this.scrollParent.scrollTop()
                  : h
                  ? 0
                  : a.scrollTop()),
              left:
                i -
                this.offset.click.left -
                this.offset.relative.left -
                this.offset.parent.left +
                (t.browser.safari && 'fixed' == this.cssPosition
                  ? 0
                  : 'fixed' == this.cssPosition
                  ? -this.scrollParent.scrollLeft()
                  : h
                  ? 0
                  : a.scrollLeft()),
            }
          );
        },
        _rearrange: function(t, e, i, s) {
          i
            ? i[0].appendChild(this.placeholder[0])
            : e.item[0].parentNode.insertBefore(
                this.placeholder[0],
                'down' == this.direction ? e.item[0] : e.item[0].nextSibling
              ),
            (this.counter = this.counter ? ++this.counter : 1);
          var n = this,
            o = this.counter;
          window.setTimeout(function() {
            o == n.counter && n.refreshPositions(!s);
          }, 0);
        },
        _clear: function(e, i) {
          var s, n;
          if (
            ((this.reverting = !1),
            (s = []),
            this,
            !this._noFinalSort && this.currentItem[0].parentNode && this.placeholder.before(this.currentItem),
            (this._noFinalSort = null),
            this.helper[0] == this.currentItem[0])
          ) {
            for (n in this._storedCSS)
              ('auto' != this._storedCSS[n] && 'static' != this._storedCSS[n]) || (this._storedCSS[n] = '');
            this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper');
          } else this.currentItem.show();
          if (
            (this.fromOutside &&
              !i &&
              s.push(function(t) {
                this._trigger('receive', t, this._uiHash(this.fromOutside));
              }),
            (!this.fromOutside &&
              this.domPosition.prev == this.currentItem.prev().not('.ui-sortable-helper')[0] &&
              this.domPosition.parent == this.currentItem.parent()[0]) ||
              i ||
              s.push(function(t) {
                this._trigger('update', t, this._uiHash());
              }),
            !t.ui.contains(this.element[0], this.currentItem[0]))
          )
            for (
              i ||
                s.push(function(t) {
                  this._trigger('remove', t, this._uiHash());
                }),
                n = this.containers.length - 1;
              n >= 0;
              n--
            )
              t.ui.contains(this.containers[n].element[0], this.currentItem[0]) &&
                !i &&
                (s.push(
                  function(t) {
                    return function(e) {
                      t._trigger('receive', e, this._uiHash(this));
                    };
                  }.call(this, this.containers[n])
                ),
                s.push(
                  function(t) {
                    return function(e) {
                      t._trigger('update', e, this._uiHash(this));
                    };
                  }.call(this, this.containers[n])
                ));
          for (n = this.containers.length - 1; n >= 0; n--)
            i ||
              s.push(
                function(t) {
                  return function(e) {
                    t._trigger('deactivate', e, this._uiHash(this));
                  };
                }.call(this, this.containers[n])
              ),
              this.containers[n].containerCache.over &&
                (s.push(
                  function(t) {
                    return function(e) {
                      t._trigger('out', e, this._uiHash(this));
                    };
                  }.call(this, this.containers[n])
                ),
                (this.containers[n].containerCache.over = 0));
          if (
            (this._storedCursor && t('body').css('cursor', this._storedCursor),
            this._storedOpacity && this.helper.css('opacity', this._storedOpacity),
            this._storedZIndex && this.helper.css('zIndex', 'auto' == this._storedZIndex ? '' : this._storedZIndex),
            (this.dragging = !1),
            this.cancelHelperRemoval)
          ) {
            if (!i) {
              for (this._trigger('beforeStop', e, this._uiHash()), n = 0; n < s.length; n++) s[n].call(this, e);
              this._trigger('stop', e, this._uiHash());
            }
            return !1;
          }
          if (
            (i || this._trigger('beforeStop', e, this._uiHash()),
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.helper[0] != this.currentItem[0] && this.helper.remove(),
            (this.helper = null),
            !i)
          ) {
            for (n = 0; n < s.length; n++) s[n].call(this, e);
            this._trigger('stop', e, this._uiHash());
          }
          return (this.fromOutside = !1), !0;
        },
        _trigger: function() {
          !1 === t.Widget.prototype._trigger.apply(this, arguments) && this.cancel();
        },
        _uiHash: function(e) {
          var i = e || this;
          return {
            helper: i.helper,
            placeholder: i.placeholder || t([]),
            position: i.position,
            originalPosition: i.originalPosition,
            offset: i.positionAbs,
            item: i.currentItem,
            sender: e ? e.element : null,
          };
        },
      }),
        t.extend(t.ui.sortable, { version: '@VERSION' });
    })(jQuery);
  },
  1001: function(t, e) {
    'use strict';
    !(function(t) {
      function e(t, e) {
        if (!(t.originalEvent.touches.length > 1)) {
          t.preventDefault();
          var i = t.originalEvent.changedTouches[0],
            s = document.createEvent('MouseEvents');
          s.initMouseEvent(e, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null),
            t.target.dispatchEvent(s);
        }
      }
      if (((t.support.touch = 'ontouchend' in document), t.support.touch)) {
        var i,
          s = t.ui.mouse.prototype,
          n = s._mouseInit,
          o = s._mouseDestroy;
        (s._touchStart = function(t) {
          var s = this;
          !i &&
            s._mouseCapture(t.originalEvent.changedTouches[0]) &&
            ((i = !0), (s._touchMoved = !1), e(t, 'mouseover'), e(t, 'mousemove'), e(t, 'mousedown'));
        }),
          (s._touchMove = function(t) {
            i && ((this._touchMoved = !0), e(t, 'mousemove'));
          }),
          (s._touchEnd = function(t) {
            i && (e(t, 'mouseup'), e(t, 'mouseout'), this._touchMoved || e(t, 'click'), (i = !1));
          }),
          (s._mouseInit = function() {
            var e = this;
            e.element.bind({
              touchstart: t.proxy(e, '_touchStart'),
              touchmove: t.proxy(e, '_touchMove'),
              touchend: t.proxy(e, '_touchEnd'),
            }),
              n.call(e);
          }),
          (s._mouseDestroy = function() {
            var e = this;
            e.element.unbind({
              touchstart: t.proxy(e, '_touchStart'),
              touchmove: t.proxy(e, '_touchMove'),
              touchend: t.proxy(e, '_touchEnd'),
            }),
              o.call(e);
          });
      }
    })(jQuery);
  },
});

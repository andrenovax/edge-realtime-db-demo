import * as e from "cloudflare:workers";
import { env as t } from "cloudflare:workers";
var n = Object.defineProperty,
  __name = (e, t) => n(e, `name`, { value: t, configurable: !0 }),
  __esmMin = (e, t, n) => () => {
    if (n) throw n[0];
    try {
      return (e && (t = e((e = 0))), t);
    } catch (e) {
      throw ((n = [e]), e);
    }
  },
  r = __esmMin(() => {});
function pipe(e, t, n, r, i, a, o, s, c) {
  switch (arguments.length) {
    case 1:
      return e;
    case 2:
      return t(e);
    case 3:
      return n(t(e));
    case 4:
      return r(n(t(e)));
    case 5:
      return i(r(n(t(e))));
    case 6:
      return a(i(r(n(t(e)))));
    case 7:
      return o(a(i(r(n(t(e))))));
    case 8:
      return s(o(a(i(r(n(t(e)))))));
    case 9:
      return c(s(o(a(i(r(n(t(e))))))));
    default: {
      let e = arguments[0];
      for (let t = 1; t < arguments.length; t++) e = arguments[t](e);
      return e;
    }
  }
}
var i,
  dual,
  identity,
  constant,
  a,
  o,
  s,
  c,
  l = __esmMin(() => {
    ((i = __name((e) => typeof e == `function`, `isFunction`)),
      (dual = function (e, t) {
        if (typeof e == `function`)
          return function () {
            return e(arguments) ? t.apply(this, arguments) : (e) => t(e, ...arguments);
          };
        switch (e) {
          case 0:
          case 1:
            throw RangeError(`Invalid arity ${e}`);
          case 2:
            return function (e, n) {
              return arguments.length >= 2
                ? t(e, n)
                : function (n) {
                    return t(n, e);
                  };
            };
          case 3:
            return function (e, n, r) {
              return arguments.length >= 3
                ? t(e, n, r)
                : function (r) {
                    return t(r, e, n);
                  };
            };
          case 4:
            return function (e, n, r, i) {
              return arguments.length >= 4
                ? t(e, n, r, i)
                : function (i) {
                    return t(i, e, n, r);
                  };
            };
          case 5:
            return function (e, n, r, i, a) {
              return arguments.length >= 5
                ? t(e, n, r, i, a)
                : function (a) {
                    return t(a, e, n, r, i);
                  };
            };
          default:
            return function () {
              if (arguments.length >= e) return t.apply(this, arguments);
              let n = arguments;
              return function (e) {
                return t(e, ...n);
              };
            };
        }
      }),
      (identity = (e) => e),
      (constant = (e) => () => e),
      (a = constant(!0)),
      (o = constant(!1)),
      (s = constant(void 0)),
      (c = s));
  }),
  u,
  isStrictEquivalent,
  strict,
  d,
  p,
  m,
  h,
  g = __esmMin(() => {
    (l(),
      (u = __name((e) => (t, n) => t === n || e(t, n), `make`)),
      (isStrictEquivalent = (e, t) => e === t),
      (strict = () => isStrictEquivalent),
      (d = strict()),
      (p = dual(2, (e, t) => u((n, r) => e(t(n), t(r))))),
      (m = p(d, (e) => e.getTime())),
      (h = __name(
        (e) =>
          u((t, n) => {
            if (t.length !== n.length) return !1;
            for (let r = 0; r < t.length; r++) if (!e(t[r], n[r])) return !1;
            return !0;
          }),
        `array`,
      )));
  }),
  _,
  v,
  globalValue,
  y = __esmMin(() => {
    ((_ = `effect/GlobalValue`),
      (globalValue = (e, t) => (
        (v ||= ((globalThis[_] ??= new Map()), globalThis[_])),
        v.has(e) || v.set(e, t()),
        v.get(e)
      )));
  }),
  isTruthy,
  isString,
  isNumber,
  isBoolean,
  isBigInt,
  isSymbol,
  ee,
  isUndefined,
  isNotUndefined,
  isNotNull,
  isNever,
  isRecordOrArray,
  te,
  b,
  ne,
  isNullable,
  isNotNullable,
  isUint8Array,
  isDate,
  isIterable,
  isRecord,
  isPromiseLike,
  x = __esmMin(() => {
    (l(),
      (isTruthy = (e) => !!e),
      (isString = (e) => typeof e == `string`),
      (isNumber = (e) => typeof e == `number`),
      (isBoolean = (e) => typeof e == `boolean`),
      (isBigInt = (e) => typeof e == `bigint`),
      (isSymbol = (e) => typeof e == `symbol`),
      (ee = i),
      (isUndefined = (e) => e === void 0),
      (isNotUndefined = (e) => e !== void 0),
      (isNotNull = (e) => e !== null),
      (isNever = (e) => !1),
      (isRecordOrArray = (e) => typeof e == `object` && !!e),
      (te = __name((e) => isRecordOrArray(e) || ee(e), `isObject`)),
      (b = dual(2, (e, t) => te(e) && t in e)),
      (ne = dual(2, (e, t) => b(e, `_tag`) && e._tag === t)),
      (isNullable = (e) => e == null),
      (isNotNullable = (e) => e != null),
      (isUint8Array = (e) => e instanceof Uint8Array),
      (isDate = (e) => e instanceof Date),
      (isIterable = (e) => typeof e == `string` || b(e, Symbol.iterator)),
      (isRecord = (e) => isRecordOrArray(e) && !Array.isArray(e)),
      (isPromiseLike = (e) => b(e, `then`) && ee(e.then)));
  }),
  getBugErrorMessage,
  re = __esmMin(() => {
    getBugErrorMessage = (e) =>
      `BUG: ${e} - please report an issue at https://github.com/Effect-TS/effect/issues`;
  });
function mul64(e, t, n, r, i) {
  let a = ((n >>> 16) * (i & 65535)) >>> 0,
    o = ((n & 65535) * (i >>> 16)) >>> 0,
    s = ((n & 65535) * (i & 65535)) >>> 0,
    c = ((n >>> 16) * (i >>> 16) + ((o >>> 16) + (a >>> 16))) >>> 0;
  ((o = (o << 16) >>> 0),
    (s = (s + o) >>> 0),
    s >>> 0 < o >>> 0 && (c = (c + 1) >>> 0),
    (a = (a << 16) >>> 0),
    (s = (s + a) >>> 0),
    s >>> 0 < a >>> 0 && (c = (c + 1) >>> 0),
    (c = (c + Math.imul(n, r)) >>> 0),
    (c = (c + Math.imul(t, i)) >>> 0),
    (e[0] = c),
    (e[1] = s));
}
function add64(e, t, n, r, i) {
  let a = (t + r) >>> 0,
    o = (n + i) >>> 0;
  (o >>> 0 < n >>> 0 && (a = (a + 1) | 0), (e[0] = a), (e[1] = o));
}
function yieldWrapGet(e) {
  if (typeof e == `object` && e && de in e) return e[de]();
  throw Error(getBugErrorMessage(`yieldWrapGet`));
}
var ie,
  ae,
  oe,
  se,
  ce,
  le,
  ue,
  PCGRandom,
  de,
  YieldWrap,
  fe,
  pe,
  me,
  he,
  ge,
  _e = __esmMin(() => {
    (y(),
      re(),
      x(),
      (ie = class SingleShotGen$1 {
        static {
          __name(this, `SingleShotGen`);
        }
        self;
        called = !1;
        constructor(e) {
          this.self = e;
        }
        next(e) {
          return this.called
            ? { value: e, done: !0 }
            : ((this.called = !0), { value: this.self, done: !1 });
        }
        return(e) {
          return { value: e, done: !0 };
        }
        throw(e) {
          throw e;
        }
        [Symbol.iterator]() {
          return new SingleShotGen$1(this.self);
        }
      }),
      (ae = 335903614),
      (oe = 4150755663),
      (se = 1481765933),
      (ce = 1284865837),
      (le = 9007199254740992),
      (ue = 134217728),
      (PCGRandom = class {
        _state;
        constructor(e, t, n, r) {
          return (
            isNullable(t) && isNullable(e)
              ? ((t = (Math.random() * 4294967295) >>> 0), (e = 0))
              : isNullable(t) && ((t = e), (e = 0)),
            isNullable(r) && isNullable(n)
              ? ((r = this._state ? this._state[3] : oe), (n = this._state ? this._state[2] : ae))
              : isNullable(r) && ((r = n), (n = 0)),
            (this._state = new Int32Array([0, 0, n >>> 0, ((r || 0) | 1) >>> 0])),
            this._next(),
            add64(this._state, this._state[0], this._state[1], e >>> 0, t >>> 0),
            this._next(),
            this
          );
        }
        getState() {
          return [this._state[0], this._state[1], this._state[2], this._state[3]];
        }
        setState(e) {
          ((this._state[0] = e[0]),
            (this._state[1] = e[1]),
            (this._state[2] = e[2]),
            (this._state[3] = e[3] | 1));
        }
        integer(e) {
          return Math.round(this.number() * (2 ** 53 - 1)) % e;
        }
        number() {
          let e = (this._next() & 67108863) * 1,
            t = (this._next() & 134217727) * 1;
          return (e * ue + t) / le;
        }
        _next() {
          let e = this._state[0] >>> 0,
            t = this._state[1] >>> 0;
          (mul64(this._state, e, t, se, ce),
            add64(this._state, this._state[0], this._state[1], this._state[2], this._state[3]));
          let n = e >>> 18,
            r = ((t >>> 18) | (e << 14)) >>> 0;
          ((n = (n ^ e) >>> 0), (r = (r ^ t) >>> 0));
          let i = ((r >>> 27) | (n << 5)) >>> 0,
            a = e >>> 27,
            o = ((-a >>> 0) & 31) >>> 0;
          return ((i >>> a) | (i << o)) >>> 0;
        }
      }),
      (de = Symbol.for(`effect/Utils/YieldWrap`)),
      (YieldWrap = class {
        #e;
        constructor(e) {
          this.#e = e;
        }
        [de]() {
          return this.#e;
        }
      }),
      (fe = globalValue(`effect/Utils/isStructuralRegion`, () => ({
        enabled: !1,
        tester: void 0,
      }))),
      (pe = { effect_internal_function: (e) => e() }),
      (me = {
        effect_internal_function: (e) => {
          try {
            return e();
          } finally {
          }
        },
      }),
      (he =
        pe.effect_internal_function(() => Error().stack)?.includes(`effect_internal_function`) ===
        !0),
      (ge = he ? pe.effect_internal_function : me.effect_internal_function),
      function* () {}.constructor);
  }),
  ve,
  S,
  hash,
  random,
  C,
  optimize,
  isHash,
  ye,
  string,
  structureKeys,
  structure,
  array,
  w,
  T = __esmMin(() => {
    (l(),
      y(),
      x(),
      _e(),
      (ve = globalValue(Symbol.for(`effect/Hash/randomHashCache`), () => new WeakMap())),
      (S = Symbol.for(`effect/Hash`)),
      (hash = (e) => {
        if (fe.enabled === !0) return 0;
        switch (typeof e) {
          case `number`:
            return ye(e);
          case `bigint`:
            return string(e.toString(10));
          case `boolean`:
            return string(String(e));
          case `symbol`:
            return string(String(e));
          case `string`:
            return string(e);
          case `undefined`:
            return string(`undefined`);
          case `function`:
          case `object`:
            return e === null
              ? string(`null`)
              : e instanceof Date
                ? Number.isNaN(e.getTime())
                  ? string(`Invalid Date`)
                  : hash(e.toISOString())
                : e instanceof URL
                  ? hash(e.href)
                  : isHash(e)
                    ? e[S]()
                    : random(e);
          default:
            throw Error(
              `BUG: unhandled typeof ${typeof e} - please report an issue at https://github.com/Effect-TS/effect/issues`,
            );
        }
      }),
      (random = (e) => (
        ve.has(e) || ve.set(e, ye(Math.floor(Math.random() * (2 ** 53 - 1)))),
        ve.get(e)
      )),
      (C = __name((e) => (t) => (t * 53) ^ e, `combine`)),
      (optimize = (e) => (e & 3221225471) | ((e >>> 1) & 1073741824)),
      (isHash = (e) => b(e, S)),
      (ye = __name((e) => {
        if (e !== e || e === 1 / 0) return 0;
        let t = e | 0;
        for (t !== e && (t ^= e * 4294967295); e > 4294967295;) t ^= e /= 4294967295;
        return optimize(t);
      }, `number`)),
      (string = (e) => {
        let t = 5381,
          n = e.length;
        for (; n;) t = (t * 33) ^ e.charCodeAt(--n);
        return optimize(t);
      }),
      (structureKeys = (e, t) => {
        let n = 12289;
        for (let r = 0; r < t.length; r++) n ^= pipe(string(t[r]), C(hash(e[t[r]])));
        return optimize(n);
      }),
      (structure = (e) => structureKeys(e, Object.keys(e))),
      (array = (e) => {
        let t = 6151;
        for (let n = 0; n < e.length; n++) t = pipe(t, C(hash(e[n])));
        return optimize(t);
      }),
      (w = __name(function () {
        if (arguments.length === 1) {
          let e = arguments[0];
          return function (t) {
            return (
              Object.defineProperty(e, S, {
                value() {
                  return t;
                },
                enumerable: !1,
              }),
              t
            );
          };
        }
        let e = arguments[0],
          t = arguments[1];
        return (
          Object.defineProperty(e, S, {
            value() {
              return t;
            },
            enumerable: !1,
          }),
          t
        );
      }, `cached`)));
  });
function equals$2() {
  return arguments.length === 1
    ? (e) => compareBoth(e, arguments[0])
    : compareBoth(arguments[0], arguments[1]);
}
function compareBoth(e, t) {
  if (e === t) return !0;
  let n = typeof e;
  if (n !== typeof t) return !1;
  if (n === `object` || n === `function`) {
    if (e !== null && t !== null) {
      if (isEqual(e) && isEqual(t))
        return hash(e) === hash(t) && e[E](t) ? !0 : fe.enabled && fe.tester ? fe.tester(e, t) : !1;
      if (e instanceof Date && t instanceof Date) {
        let n = e.getTime(),
          r = t.getTime();
        return n === r || (Number.isNaN(n) && Number.isNaN(r));
      } else if (e instanceof URL && t instanceof URL) return e.href === t.href;
    }
    if (fe.enabled) {
      if (e === null || t === null) return !1;
      if (Array.isArray(e) && Array.isArray(t))
        return e.length === t.length && e.every((e, n) => compareBoth(e, t[n]));
      if (
        Object.getPrototypeOf(e) === Object.prototype &&
        Object.getPrototypeOf(t) === Object.prototype
      ) {
        let n = Object.keys(e),
          r = Object.keys(t);
        if (n.length === r.length) {
          for (let r of n)
            if (!(r in t && compareBoth(e[r], t[r]))) return fe.tester ? fe.tester(e, t) : !1;
          return !0;
        }
      }
      return fe.tester ? fe.tester(e, t) : !1;
    }
  }
  return fe.enabled && fe.tester ? fe.tester(e, t) : !1;
}
var E,
  isEqual,
  equivalence,
  D = __esmMin(() => {
    (T(),
      x(),
      _e(),
      (E = Symbol.for(`effect/Equal`)),
      __name(equals$2, `equals`),
      (isEqual = (e) => b(e, E)),
      (equivalence = () => equals$2));
  });
function formatDate(e) {
  try {
    return e.toISOString();
  } catch {
    return `Invalid Date`;
  }
}
function safeToString(e) {
  try {
    let t = e.toString();
    return typeof t == `string` ? t : String(t);
  } catch {
    return `[toString threw]`;
  }
}
function formatPropertyKey$1(e) {
  return isString(e) ? JSON.stringify(e) : String(e);
}
function formatUnknown(e, t) {
  let n = t?.space ?? 0,
    r = new WeakSet(),
    i = n ? (isNumber(n) ? ` `.repeat(n) : n) : ``,
    ind = (e) => i.repeat(e),
    wrap = (e, t) => {
      let n = e?.constructor;
      return n && n !== Object.prototype.constructor && n.name ? `${n.name}(${t})` : t;
    },
    ownKeys = (e) => {
      try {
        return Reflect.ownKeys(e);
      } catch {
        return [`[ownKeys threw]`];
      }
    };
  function go(e, n = 0) {
    if (Array.isArray(e)) {
      if (r.has(e)) return be;
      if ((r.add(e), !i || e.length <= 1)) return `[${e.map((e) => go(e, n)).join(`,`)}]`;
      let t = e
        .map((e) => go(e, n + 1))
        .join(
          `,
` + ind(n + 1),
        );
      return `[\n${ind(n + 1)}${t}\n${ind(n)}]`;
    }
    if (isDate(e)) return formatDate(e);
    if (
      !t?.ignoreToString &&
      b(e, `toString`) &&
      ee(e.toString) &&
      e.toString !== Object.prototype.toString &&
      e.toString !== Array.prototype.toString
    ) {
      let t = safeToString(e);
      return e instanceof Error && e.cause ? `${t} (cause: ${go(e.cause, n)})` : t;
    }
    if (isString(e)) return JSON.stringify(e);
    if (isNumber(e) || e == null || isBoolean(e) || isSymbol(e)) return String(e);
    if (isBigInt(e)) return String(e) + `n`;
    if (e instanceof Set || e instanceof Map)
      return r.has(e) ? be : (r.add(e), `${e.constructor.name}(${go(Array.from(e), n)})`);
    if (te(e)) {
      if (r.has(e)) return be;
      r.add(e);
      let t = ownKeys(e);
      if (!i || t.length <= 1) {
        let r = `{${t.map((t) => `${formatPropertyKey$1(t)}:${go(e[t], n)}`).join(`,`)}}`;
        return wrap(e, r);
      }
      let a = `{\n${t.map((t) => `${ind(n + 1)}${formatPropertyKey$1(t)}: ${go(e[t], n + 1)}`)
        .join(`,
`)}\n${ind(n)}}`;
      return wrap(e, a);
    }
    return String(e);
  }
  return go(e, 0);
}
var O,
  toJSON,
  be,
  xe,
  toStringUnknown,
  stringifyCircular,
  Se,
  isRedactable,
  Ce,
  withRedactableContext,
  redact,
  k = __esmMin(() => {
    (y(),
      x(),
      (O = Symbol.for(`nodejs.util.inspect.custom`)),
      (toJSON = (e) => {
        try {
          if (b(e, `toJSON`) && ee(e.toJSON) && e.toJSON.length === 0) return e.toJSON();
          if (Array.isArray(e)) return e.map(toJSON);
        } catch {
          return {};
        }
        return redact(e);
      }),
      (be = `[Circular]`),
      __name(formatPropertyKey$1, `formatPropertyKey`),
      (xe = __name((e) => JSON.stringify(e, null, 2), `format`)),
      (toStringUnknown = (e, t = 2) => {
        if (typeof e == `string`) return e;
        try {
          return typeof e == `object` ? stringifyCircular(e, t) : String(e);
        } catch {
          return String(e);
        }
      }),
      (stringifyCircular = (e, t) => {
        let n = [],
          r = JSON.stringify(
            e,
            (e, t) =>
              typeof t == `object` && t
                ? n.includes(t)
                  ? void 0
                  : n.push(t) &&
                    (Ce.fiberRefs !== void 0 && isRedactable(t) ? t[Se](Ce.fiberRefs) : t)
                : t,
            t,
          );
        return ((n = void 0), r);
      }),
      (Se = Symbol.for(`effect/Inspectable/Redactable`)),
      (isRedactable = (e) => typeof e == `object` && !!e && Se in e),
      (Ce = globalValue(`effect/Inspectable/redactableState`, () => ({ fiberRefs: void 0 }))),
      (withRedactableContext = (e, t) => {
        let n = Ce.fiberRefs;
        Ce.fiberRefs = e;
        try {
          return t();
        } finally {
          Ce.fiberRefs = n;
        }
      }),
      (redact = (e) => (isRedactable(e) && Ce.fiberRefs !== void 0 ? e[Se](Ce.fiberRefs) : e)));
  }),
  pipeArguments,
  A = __esmMin(() => {
    pipeArguments = (e, t) => {
      switch (t.length) {
        case 0:
          return e;
        case 1:
          return t[0](e);
        case 2:
          return t[1](t[0](e));
        case 3:
          return t[2](t[1](t[0](e)));
        case 4:
          return t[3](t[2](t[1](t[0](e))));
        case 5:
          return t[4](t[3](t[2](t[1](t[0](e)))));
        case 6:
          return t[5](t[4](t[3](t[2](t[1](t[0](e))))));
        case 7:
          return t[6](t[5](t[4](t[3](t[2](t[1](t[0](e)))))));
        case 8:
          return t[7](t[6](t[5](t[4](t[3](t[2](t[1](t[0](e))))))));
        case 9:
          return t[8](t[7](t[6](t[5](t[4](t[3](t[2](t[1](t[0](e)))))))));
        default: {
          let n = e;
          for (let e = 0, r = t.length; e < r; e++) n = t[e](n);
          return n;
        }
      }
    };
  }),
  we,
  Te,
  Ee,
  De,
  Oe,
  ke,
  Ae,
  je,
  Me,
  Ne,
  Pe,
  Fe,
  Ie,
  Le,
  Re = __esmMin(() => {
    ((we = `Async`),
      (Te = `Commit`),
      (Ee = `Failure`),
      (De = `OnFailure`),
      (Oe = `OnSuccess`),
      (ke = `OnSuccessAndFailure`),
      (Ae = `Success`),
      (je = `Sync`),
      (Me = `UpdateRuntimeFlags`),
      (Ne = `While`),
      (Pe = `Iterator`),
      (Fe = `WithRuntime`),
      (Ie = `Yield`),
      (Le = `RevertFlags`));
  }),
  ze,
  getCurrentVersion,
  Be = __esmMin(() => {
    ((ze = `3.22.1`), (getCurrentVersion = () => ze));
  }),
  Ve,
  He,
  Ue,
  We,
  Ge,
  Ke,
  qe,
  Je,
  Ye,
  Xe,
  Ze,
  Qe,
  $e = __esmMin(() => {
    (D(),
      T(),
      A(),
      _e(),
      Re(),
      Be(),
      (Ve = Symbol.for(`effect/Effect`)),
      (He = Symbol.for(`effect/Stream`)),
      (Ue = Symbol.for(`effect/Sink`)),
      (We = Symbol.for(`effect/Channel`)),
      (Ge = { _R: (e) => e, _E: (e) => e, _A: (e) => e, _V: getCurrentVersion() }),
      (Ke = { _A: (e) => e, _In: (e) => e, _L: (e) => e, _E: (e) => e, _R: (e) => e }),
      (qe = {
        _Env: (e) => e,
        _InErr: (e) => e,
        _InElem: (e) => e,
        _InDone: (e) => e,
        _OutErr: (e) => e,
        _OutElem: (e) => e,
        _OutDone: (e) => e,
      }),
      (Je = {
        [Ve]: Ge,
        [He]: Ge,
        [Ue]: Ke,
        [We]: qe,
        [E](e) {
          return this === e;
        },
        [S]() {
          return w(this, random(this));
        },
        [Symbol.iterator]() {
          return new ie(new YieldWrap(this));
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (Ye = {
        [S]() {
          return w(this, structure(this));
        },
        [E](e) {
          let t = Object.keys(this),
            n = Object.keys(e);
          if (t.length !== n.length) return !1;
          for (let n of t) if (!(n in e && equals$2(this[n], e[n]))) return !1;
          return !0;
        },
      }),
      (Xe = { ...Je, _op: Te }),
      (Ze = { ...Xe, ...Ye }),
      (Qe = (function () {
        function Base() {}
        return ((Base.prototype = Xe), Base);
      })()));
  }),
  et,
  tt,
  nt,
  rt,
  it,
  at,
  ot,
  st,
  ct,
  lt,
  ut = __esmMin(() => {
    (D(),
      T(),
      k(),
      x(),
      $e(),
      (et = Symbol.for(`effect/Option`)),
      (tt = {
        ...Je,
        [et]: { _A: (e) => e },
        [O]() {
          return this.toJSON();
        },
        toString() {
          return xe(this.toJSON());
        },
      }),
      (nt = Object.assign(Object.create(tt), {
        _tag: `Some`,
        _op: `Some`,
        [E](e) {
          return at(e) && st(e) && equals$2(this.value, e.value);
        },
        [S]() {
          return w(this, C(hash(this._tag))(hash(this.value)));
        },
        toJSON() {
          return { _id: `Option`, _tag: this._tag, value: toJSON(this.value) };
        },
      })),
      (rt = hash(`None`)),
      (it = Object.assign(Object.create(tt), {
        _tag: `None`,
        _op: `None`,
        [E](e) {
          return at(e) && ot(e);
        },
        [S]() {
          return rt;
        },
        toJSON() {
          return { _id: `Option`, _tag: this._tag };
        },
      })),
      (at = __name((e) => b(e, et), `isOption`)),
      (ot = __name((e) => e._tag === `None`, `isNone`)),
      (st = __name((e) => e._tag === `Some`, `isSome`)),
      (ct = Object.create(it)),
      (lt = __name((e) => {
        let t = Object.create(nt);
        return ((t.value = e), t);
      }, `some`)));
  }),
  dt,
  ft,
  pt,
  mt,
  ht,
  gt,
  _t,
  vt,
  yt,
  bt,
  xt = __esmMin(() => {
    (D(),
      l(),
      T(),
      k(),
      x(),
      $e(),
      ut(),
      (dt = Symbol.for(`effect/Either`)),
      (ft = {
        ...Je,
        [dt]: { _R: (e) => e },
        [O]() {
          return this.toJSON();
        },
        toString() {
          return xe(this.toJSON());
        },
      }),
      (pt = Object.assign(Object.create(ft), {
        _tag: `Right`,
        _op: `Right`,
        [E](e) {
          return ht(e) && _t(e) && equals$2(this.right, e.right);
        },
        [S]() {
          return C(hash(this._tag))(hash(this.right));
        },
        toJSON() {
          return { _id: `Either`, _tag: this._tag, right: toJSON(this.right) };
        },
      })),
      (mt = Object.assign(Object.create(ft), {
        _tag: `Left`,
        _op: `Left`,
        [E](e) {
          return ht(e) && gt(e) && equals$2(this.left, e.left);
        },
        [S]() {
          return C(hash(this._tag))(hash(this.left));
        },
        toJSON() {
          return { _id: `Either`, _tag: this._tag, left: toJSON(this.left) };
        },
      })),
      (ht = __name((e) => b(e, dt), `isEither`)),
      (gt = __name((e) => e._tag === `Left`, `isLeft`)),
      (_t = __name((e) => e._tag === `Right`, `isRight`)),
      (vt = __name((e) => {
        let t = Object.create(mt);
        return ((t.left = e), t);
      }, `left`)),
      (yt = __name((e) => {
        let t = Object.create(pt);
        return ((t.right = e), t);
      }, `right`)),
      (bt = dual(2, (e, t) => (ot(e) ? vt(t()) : yt(e.value)))));
  }),
  j,
  M,
  St,
  try_,
  Ct,
  wt,
  Tt,
  Et,
  Dt,
  Ot,
  kt,
  At,
  jt,
  Mt,
  Nt = __esmMin(() => {
    (l(),
      xt(),
      x(),
      (j = yt),
      (M = vt),
      (St = bt),
      (try_ = (e) => {
        if (ee(e))
          try {
            return j(e());
          } catch (e) {
            return M(e);
          }
        else
          try {
            return j(e.try());
          } catch (t) {
            return M(e.catch(t));
          }
      }),
      (Ct = ht),
      (wt = gt),
      (Tt = _t),
      (Et = dual(2, (e, { onLeft: t, onRight: n }) => (wt(e) ? M(t(e.left)) : j(n(e.right))))),
      (Dt = dual(2, (e, t) => (wt(e) ? M(t(e.left)) : j(e.right)))),
      (Ot = dual(2, (e, t) => (Tt(e) ? j(t(e.right)) : M(e.left)))),
      (kt = dual(2, (e, { onLeft: t, onRight: n }) => (wt(e) ? t(e.left) : n(e.right)))),
      (At = kt({ onLeft: identity, onRight: identity })),
      (jt = dual(2, (e, t) => {
        if (Tt(e)) return e.right;
        throw t(e.left);
      })),
      (Mt = jt(() => Error(`getOrThrow called on a Left`))));
  }),
  Pt,
  Ft = __esmMin(() => {
    Pt = __name((e) => e.length > 0, `isNonEmptyArray`);
  }),
  It,
  Lt,
  Rt,
  zt,
  Bt = __esmMin(() => {
    (l(),
      (It = __name((e) => (t, n) => (t === n ? 0 : e(t, n)), `make`)),
      (Lt = It((e, t) => (e < t ? -1 : 1))),
      (Rt = dual(2, (e, t) => It((n, r) => e(t(n), t(r))))),
      (zt = __name((e) => dual(2, (t, n) => e(t, n) === 1), `greaterThan`)));
  }),
  N,
  P,
  Vt,
  F,
  I,
  L,
  R,
  Ht,
  Ut,
  fromNullable,
  Wt,
  liftThrowable,
  Gt,
  Kt,
  qt,
  Jt,
  Yt,
  Xt,
  Zt,
  containsWith,
  Qt,
  $t,
  en,
  z = __esmMin(() => {
    (D(),
      g(),
      l(),
      ut(),
      (N = __name(() => ct, `none`)),
      (P = lt),
      (Vt = at),
      (F = ot),
      (I = st),
      (L = dual(2, (e, { onNone: t, onSome: n }) => (F(e) ? t() : n(e.value)))),
      (R = dual(2, (e, t) => (F(e) ? t() : e.value))),
      (Ht = dual(2, (e, t) => (F(e) ? t() : e))),
      (Ut = dual(2, (e, t) => (F(e) ? P(t()) : e))),
      (fromNullable = (e) => (e == null ? N() : P(e))),
      (Wt = R(s)),
      (liftThrowable =
        (e) =>
        (...t) => {
          try {
            return P(e(...t));
          } catch {
            return N();
          }
        }),
      (Gt = dual(2, (e, t) => {
        if (I(e)) return e.value;
        throw t();
      })),
      (Kt = dual(2, (e, t) => (F(e) ? N() : P(t(e.value))))),
      (qt = dual(2, (e, t) => (F(e) ? N() : t(e.value)))),
      (Jt = dual(2, (e, t) => (F(e) ? N() : fromNullable(t(e.value))))),
      (Yt = qt),
      (Xt = dual(2, (e, t) => Yt(e, (e) => (t(e) ? lt(e) : ct)))),
      (Zt = __name(
        (e) => u((t, n) => (F(t) ? F(n) : !F(n) && e(t.value, n.value))),
        `getEquivalence`,
      )),
      (containsWith = (e) => dual(2, (t, n) => !F(t) && e(t.value, n))),
      (Qt = equivalence()),
      ($t = containsWith(Qt)),
      (en = dual(2, (e, t) => !F(e) && t(e.value))));
  }),
  tn,
  nn = __esmMin(() => {
    (x(), (tn = __name((...e) => e, `make`)));
  }),
  rn,
  an = __esmMin(() => {
    (l(),
      z(),
      x(),
      (rn = dual(2, (e, t) => {
        let n = 0;
        for (let r of e) {
          let e = t(r, n);
          if (isBoolean(e)) {
            if (e) return P(r);
          } else if (I(e)) return e;
          n++;
        }
        return N();
      })));
  }),
  allocate,
  on,
  B,
  ensure,
  sn,
  cn,
  ln,
  un,
  dn,
  isEmptyArray,
  pn,
  mn,
  V,
  isOutOfBounds,
  clamp,
  hn,
  gn,
  _n,
  vn,
  last,
  lastNonEmpty,
  yn,
  spanIndex,
  bn,
  xn,
  Sn,
  Cn,
  wn,
  Tn,
  En,
  Dn,
  On,
  kn,
  An,
  jn,
  Mn,
  Nn,
  Pn,
  Fn,
  In,
  Ln,
  Rn,
  zn,
  unfold,
  Bn,
  Vn,
  dedupe,
  Hn,
  H = __esmMin(() => {
    (D(),
      g(),
      l(),
      Ft(),
      an(),
      z(),
      nn(),
      (allocate = (e) => Array(e)),
      (on = dual(2, (e, t) => {
        let n = Math.max(1, Math.floor(e)),
          r = Array(n);
        for (let e = 0; e < n; e++) r[e] = t(e);
        return r;
      })),
      (B = __name((e) => (Array.isArray(e) ? e : Array.from(e)), `fromIterable`)),
      (ensure = (e) => (Array.isArray(e) ? e : [e])),
      (sn = dual(2, (e, { onEmpty: t, onNonEmpty: n }) => (V(e) ? n(vn(e), yn(e)) : t()))),
      (cn = dual(2, (e, t) => [t, ...e])),
      (ln = dual(2, (e, t) => [...e, t])),
      (un = dual(2, (e, t) => B(e).concat(B(t)))),
      (dn = Array.isArray),
      (isEmptyArray = (e) => e.length === 0),
      (pn = isEmptyArray),
      (mn = Pt),
      (V = Pt),
      (isOutOfBounds = (e, t) => e < 0 || e >= t.length),
      (clamp = (e, t) => Math.floor(Math.min(Math.max(0, e), t.length))),
      (hn = dual(2, (e, t) => {
        let n = Math.floor(t);
        return isOutOfBounds(n, e) ? N() : P(e[n]);
      })),
      (gn = dual(2, (e, t) => {
        let n = Math.floor(t);
        if (isOutOfBounds(n, e)) throw Error(`Index ${n} out of bounds`);
        return e[n];
      })),
      (_n = hn(0)),
      (vn = gn(0)),
      (last = (e) => (V(e) ? P(lastNonEmpty(e)) : N())),
      (lastNonEmpty = (e) => e[e.length - 1]),
      (yn = __name((e) => e.slice(1), `tailNonEmpty`)),
      (spanIndex = (e, t) => {
        let n = 0;
        for (let r of e) {
          if (!t(r, n)) break;
          n++;
        }
        return n;
      }),
      (bn = dual(2, (e, t) => On(e, spanIndex(e, t)))),
      (xn = dual(2, (e, t) => {
        let n = B(e);
        return n.slice(clamp(t, n), n.length);
      })),
      (Sn = rn),
      (Cn = __name((e) => Array.from(e).reverse(), `reverse`)),
      (wn = dual(2, (e, t) => {
        let n = Array.from(e);
        return (n.sort(t), n);
      })),
      (Tn = dual(2, (e, t) => En(e, t, tn))),
      (En = dual(3, (e, t, n) => {
        let r = B(e),
          i = B(t);
        if (V(r) && V(i)) {
          let e = [n(vn(r), vn(i))],
            t = Math.min(r.length, i.length);
          for (let a = 1; a < t; a++) e[a] = n(r[a], i[a]);
          return e;
        }
        return [];
      })),
      (Dn = equivalence()),
      (On = dual(2, (e, t) => {
        let n = Array.from(e),
          r = Math.floor(t);
        return V(n) ? (r >= 1 ? kn(n, r) : [[], n]) : [n, []];
      })),
      (kn = dual(2, (e, t) => {
        let n = Math.max(1, Math.floor(t));
        return n >= e.length ? [An(e), []] : [cn(e.slice(1, n), vn(e)), e.slice(n)];
      })),
      (An = __name((e) => e.slice(), `copy`)),
      (jn = dual(3, (e, t, n) => {
        let r = B(e),
          i = B(t);
        return V(r) ? (V(i) ? Vn(n)(un(r, i)) : r) : i;
      })),
      (Mn = dual(2, (e, t) => jn(e, t, Dn))),
      (Nn = __name(() => [], `empty`)),
      (Pn = __name((e) => [e], `of`)),
      (Fn = dual(2, (e, t) => e.map(t))),
      (In = dual(2, (e, t) => {
        if (pn(e)) return [];
        let n = [];
        for (let r = 0; r < e.length; r++) {
          let i = t(e[r], r);
          for (let e = 0; e < i.length; e++) n.push(i[e]);
        }
        return n;
      })),
      (Ln = In(identity)),
      (Rn = dual(2, (e, t) => {
        let n = B(e),
          r = [];
        for (let e = 0; e < n.length; e++) {
          let i = t(n[e], e);
          I(i) && r.push(i.value);
        }
        return r;
      })),
      (zn = dual(3, (e, t, n) => B(e).reduce((e, t, r) => n(e, t, r), t))),
      (unfold = (e, t) => {
        let n = [],
          r = e,
          i;
        for (; I((i = t(r)));) {
          let [e, t] = i.value;
          (n.push(e), (r = t));
        }
        return n;
      }),
      (Bn = h),
      (Vn = dual(2, (e, t) => {
        let n = B(e);
        if (V(n)) {
          let e = [vn(n)],
            r = yn(n);
          for (let n of r) e.every((e) => !t(n, e)) && e.push(n);
          return e;
        }
        return [];
      })),
      (dedupe = (e) => Vn(e, equivalence())),
      (Hn = dual(2, (e, t) => B(e).join(t))));
  });
function copy(e, t, n, r, i) {
  for (let a = t; a < Math.min(e.length, t + i); a++) n[r + a - t] = e[a];
  return n;
}
var Un,
  Wn,
  Gn,
  Kn,
  qn,
  makeChunk,
  isChunk,
  Jn,
  Yn,
  Xn,
  Zn,
  Qn,
  copyToArray,
  toReadonlyArray_,
  $n,
  reverseChunk,
  er,
  unsafeFromArray,
  unsafeFromNonEmptyArray,
  tr,
  nr,
  rr,
  ir,
  ar,
  or,
  sr,
  unsafeHead,
  cr,
  tailNonEmpty,
  lr = __esmMin(() => {
    (H(),
      D(),
      g(),
      l(),
      T(),
      k(),
      A(),
      x(),
      (Un = Symbol.for(`effect/Chunk`)),
      (Wn = []),
      (Gn = __name(
        (e) => u((t, n) => t.length === n.length && $n(t).every((t, r) => e(t, tr(n, r)))),
        `getEquivalence`,
      )),
      (Kn = Gn(equals$2)),
      (qn = {
        [Un]: { _A: (e) => e },
        toString() {
          return xe(this.toJSON());
        },
        toJSON() {
          return { _id: `Chunk`, values: $n(this).map(toJSON) };
        },
        [O]() {
          return this.toJSON();
        },
        [E](e) {
          return isChunk(e) && Kn(this, e);
        },
        [S]() {
          return w(this, array($n(this)));
        },
        [Symbol.iterator]() {
          switch (this.backing._tag) {
            case `IArray`:
              return this.backing.array[Symbol.iterator]();
            case `IEmpty`:
              return Wn[Symbol.iterator]();
            default:
              return $n(this)[Symbol.iterator]();
          }
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (makeChunk = (e) => {
        let t = Object.create(qn);
        switch (((t.backing = e), e._tag)) {
          case `IEmpty`:
            ((t.length = 0), (t.depth = 0), (t.left = t), (t.right = t));
            break;
          case `IConcat`:
            ((t.length = e.left.length + e.right.length),
              (t.depth = 1 + Math.max(e.left.depth, e.right.depth)),
              (t.left = e.left),
              (t.right = e.right));
            break;
          case `IArray`:
            ((t.length = e.array.length), (t.depth = 0), (t.left = Jn), (t.right = Jn));
            break;
          case `ISingleton`:
            ((t.length = 1), (t.depth = 0), (t.left = Jn), (t.right = Jn));
            break;
          case `ISlice`:
            ((t.length = e.length), (t.depth = e.chunk.depth + 1), (t.left = Jn), (t.right = Jn));
            break;
        }
        return t;
      }),
      (isChunk = (e) => b(e, Un)),
      (Jn = makeChunk({ _tag: `IEmpty` })),
      (Yn = __name(() => Jn, `empty`)),
      (Xn = __name((...e) => unsafeFromNonEmptyArray(e), `make`)),
      (Zn = __name((e) => makeChunk({ _tag: `ISingleton`, a: e }), `of`)),
      (Qn = __name((e) => (isChunk(e) ? e : unsafeFromArray(B(e))), `fromIterable`)),
      (copyToArray = (e, t, n) => {
        switch (e.backing._tag) {
          case `IArray`:
            copy(e.backing.array, 0, t, n, e.length);
            break;
          case `IConcat`:
            (copyToArray(e.left, t, n), copyToArray(e.right, t, n + e.left.length));
            break;
          case `ISingleton`:
            t[n] = e.backing.a;
            break;
          case `ISlice`: {
            let r = 0,
              i = n;
            for (; r < e.length;) ((t[i] = tr(e, r)), (r += 1), (i += 1));
            break;
          }
        }
      }),
      (toReadonlyArray_ = (e) => {
        switch (e.backing._tag) {
          case `IEmpty`:
            return Wn;
          case `IArray`:
            return e.backing.array;
          default: {
            let t = Array(e.length);
            return (
              copyToArray(e, t, 0),
              (e.backing = { _tag: `IArray`, array: t }),
              (e.left = Jn),
              (e.right = Jn),
              (e.depth = 0),
              t
            );
          }
        }
      }),
      ($n = toReadonlyArray_),
      (reverseChunk = (e) => {
        switch (e.backing._tag) {
          case `IEmpty`:
          case `ISingleton`:
            return e;
          case `IArray`:
            return makeChunk({ _tag: `IArray`, array: Cn(e.backing.array) });
          case `IConcat`:
            return makeChunk({
              _tag: `IConcat`,
              left: er(e.backing.right),
              right: er(e.backing.left),
            });
          case `ISlice`:
            return unsafeFromArray(Cn($n(e)));
        }
      }),
      (er = reverseChunk),
      (unsafeFromArray = (e) =>
        e.length === 0
          ? Yn()
          : e.length === 1
            ? Zn(e[0])
            : makeChunk({ _tag: `IArray`, array: e })),
      (unsafeFromNonEmptyArray = (e) => unsafeFromArray(e)),
      (tr = dual(2, (e, t) => {
        switch (e.backing._tag) {
          case `IEmpty`:
            throw Error(`Index out of bounds`);
          case `ISingleton`:
            if (t !== 0) throw Error(`Index out of bounds`);
            return e.backing.a;
          case `IArray`:
            if (t >= e.length || t < 0) throw Error(`Index out of bounds`);
            return e.backing.array[t];
          case `IConcat`:
            return t < e.left.length ? tr(e.left, t) : tr(e.right, t - e.left.length);
          case `ISlice`:
            return tr(e.backing.chunk, t + e.backing.offset);
        }
      })),
      (nr = dual(2, (e, t) => ar(e, Zn(t)))),
      (rr = dual(2, (e, t) => ar(Zn(t), e))),
      (ir = dual(2, (e, t) => {
        if (t <= 0) return e;
        if (t >= e.length) return Jn;
        switch (e.backing._tag) {
          case `ISlice`:
            return makeChunk({
              _tag: `ISlice`,
              chunk: e.backing.chunk,
              offset: e.backing.offset + t,
              length: e.backing.length - t,
            });
          case `IConcat`:
            return t > e.left.length
              ? ir(e.right, t - e.left.length)
              : makeChunk({ _tag: `IConcat`, left: ir(e.left, t), right: e.right });
          default:
            return makeChunk({ _tag: `ISlice`, chunk: e, offset: t, length: e.length - t });
        }
      })),
      (ar = dual(2, (e, t) => {
        if (e.backing._tag === `IEmpty`) return t;
        if (t.backing._tag === `IEmpty`) return e;
        let n = t.depth - e.depth;
        if (Math.abs(n) <= 1) return makeChunk({ _tag: `IConcat`, left: e, right: t });
        if (n < -1)
          if (e.left.depth >= e.right.depth) {
            let n = ar(e.right, t);
            return makeChunk({ _tag: `IConcat`, left: e.left, right: n });
          } else {
            let n = ar(e.right.right, t);
            if (n.depth === e.depth - 3) {
              let t = makeChunk({ _tag: `IConcat`, left: e.right.left, right: n });
              return makeChunk({ _tag: `IConcat`, left: e.left, right: t });
            } else {
              let t = makeChunk({ _tag: `IConcat`, left: e.left, right: e.right.left });
              return makeChunk({ _tag: `IConcat`, left: t, right: n });
            }
          }
        else if (t.right.depth >= t.left.depth) {
          let n = ar(e, t.left);
          return makeChunk({ _tag: `IConcat`, left: n, right: t.right });
        } else {
          let n = ar(e, t.left.left);
          if (n.depth === t.depth - 3) {
            let e = makeChunk({ _tag: `IConcat`, left: n, right: t.left.right });
            return makeChunk({ _tag: `IConcat`, left: e, right: t.right });
          } else {
            let e = makeChunk({ _tag: `IConcat`, left: t.left.right, right: t.right });
            return makeChunk({ _tag: `IConcat`, left: n, right: e });
          }
        }
      })),
      (or = __name((e) => e.length === 0, `isEmpty`)),
      (sr = __name((e) => e.length > 0, `isNonEmpty`)),
      (unsafeHead = (e) => tr(e, 0)),
      (cr = unsafeHead),
      (tailNonEmpty = (e) => ir(e, 1)));
  }),
  ur,
  dr,
  fr,
  pr,
  mr = __esmMin(() => {
    ((ur = 2 ** 5), (dr = ur - 1), (fr = ur / 2), (pr = ur / 4));
  });
function popcount(e) {
  return (
    (e -= (e >> 1) & 1431655765),
    (e = (e & 858993459) + ((e >> 2) & 858993459)),
    (e = (e + (e >> 4)) & 252645135),
    (e += e >> 8),
    (e += e >> 16),
    e & 127
  );
}
function hashFragment(e, t) {
  return (t >>> e) & dr;
}
function toBitmap(e) {
  return 1 << e;
}
function fromBitmap(e, t) {
  return popcount(e & (t - 1));
}
var hr = __esmMin(() => {
    mr();
  }),
  gr,
  _r = __esmMin(() => {
    gr = __name((e, t) => ({ value: e, previous: t }), `make`);
  });
function arrayUpdate(e, t, n, r) {
  let i = r;
  if (!e) {
    let e = r.length;
    i = Array(e);
    for (let t = 0; t < e; ++t) i[t] = r[t];
  }
  return ((i[t] = n), i);
}
function arraySpliceOut(e, t, n) {
  let r = n.length - 1,
    i = 0,
    a = 0,
    o = n;
  if (e) i = a = t;
  else for (o = Array(r); i < t;) o[a++] = n[i++];
  for (++i; i <= r;) o[a++] = n[i++];
  return (e && (o.length = r), o);
}
function arraySpliceIn(e, t, n, r) {
  let i = r.length;
  if (e) {
    let e = i;
    for (; e >= t;) r[e--] = r[e];
    return ((r[t] = n), r);
  }
  let a = 0,
    o = 0,
    s = Array(i + 1);
  for (; a < t;) s[o++] = r[a++];
  for (s[t] = n; a < i;) s[++o] = r[a++];
  return s;
}
var vr = __esmMin(() => {});
function isEmptyNode(e) {
  return ne(e, `EmptyNode`);
}
function isLeafNode(e) {
  return isEmptyNode(e) || e._tag === `LeafNode` || e._tag === `CollisionNode`;
}
function canEditNode(e, t) {
  return !isEmptyNode(e) && t === e.edit;
}
function pack(e, t, n, r) {
  let i = Array(t - 1),
    a = 0,
    o = 0;
  for (let e = 0, t = r.length; e < t; ++e)
    if (e !== n) {
      let t = r[e];
      t && !isEmptyNode(t) && ((i[a++] = t), (o |= 1 << e));
    }
  return new Sr(e, o, i);
}
function expand(e, t, n, r, i) {
  let a = [],
    o = r,
    s = 0;
  for (let e = 0; o; ++e) (o & 1 && (a[e] = i[s++]), (o >>>= 1));
  return ((a[t] = n), new Cr(e, s + 1, a));
}
function mergeLeavesInner(e, t, n, r, i, a) {
  if (n === i) return new xr(e, n, [a, r]);
  let o = hashFragment(t, n),
    s = hashFragment(t, i);
  if (o === s) return (t) => new Sr(e, toBitmap(o) | toBitmap(s), [t]);
  {
    let t = o < s ? [r, a] : [a, r];
    return new Sr(e, toBitmap(o) | toBitmap(s), t);
  }
}
function mergeLeaves(e, t, n, r, i, a) {
  let o,
    s = t;
  for (;;) {
    let t = mergeLeavesInner(e, s, n, r, i, a);
    if (typeof t == `function`) ((o = gr(t, o)), (s += 5));
    else {
      let e = t;
      for (; o != null;) ((e = o.value(e)), (o = o.previous));
      return e;
    }
  }
}
var yr,
  br,
  xr,
  Sr,
  Cr,
  wr = __esmMin(() => {
    (D(),
      z(),
      x(),
      _r(),
      vr(),
      hr(),
      mr(),
      (yr = class EmptyNode {
        _tag = `EmptyNode`;
        modify(e, t, n, r, i, a) {
          let o = n(N());
          return F(o) ? new EmptyNode() : (++a.value, new br(e, r, i, o));
        }
      }),
      (br = class LeafNode {
        edit;
        hash;
        key;
        value;
        _tag = `LeafNode`;
        constructor(e, t, n, r) {
          ((this.edit = e), (this.hash = t), (this.key = n), (this.value = r));
        }
        modify(e, t, n, r, i, a) {
          if (equals$2(i, this.key)) {
            let t = n(this.value);
            return t === this.value
              ? this
              : F(t)
                ? (--a.value, new yr())
                : canEditNode(this, e)
                  ? ((this.value = t), this)
                  : new LeafNode(e, r, i, t);
          }
          let o = n(N());
          return F(o)
            ? this
            : (++a.value, mergeLeaves(e, t, this.hash, this, r, new LeafNode(e, r, i, o)));
        }
      }),
      (xr = class CollisionNode {
        edit;
        hash;
        children;
        _tag = `CollisionNode`;
        constructor(e, t, n) {
          ((this.edit = e), (this.hash = t), (this.children = n));
        }
        modify(e, t, n, r, i, a) {
          if (r === this.hash) {
            let t = canEditNode(this, e),
              r = this.updateCollisionList(t, e, this.hash, this.children, n, i, a);
            return r === this.children
              ? this
              : r.length > 1
                ? new CollisionNode(e, this.hash, r)
                : r[0];
          }
          let o = n(N());
          return F(o)
            ? this
            : (++a.value, mergeLeaves(e, t, this.hash, this, r, new br(e, r, i, o)));
        }
        updateCollisionList(e, t, n, r, i, a, o) {
          let s = r.length;
          for (let c = 0; c < s; ++c) {
            let s = r[c];
            if (`key` in s && equals$2(a, s.key)) {
              let l = s.value,
                u = i(l);
              return u === l
                ? r
                : F(u)
                  ? (--o.value, arraySpliceOut(e, c, r))
                  : arrayUpdate(e, c, new br(t, n, a, u), r);
            }
          }
          let c = i(N());
          return F(c) ? r : (++o.value, arrayUpdate(e, s, new br(t, n, a, c), r));
        }
      }),
      (Sr = class IndexedNode {
        edit;
        mask;
        children;
        _tag = `IndexedNode`;
        constructor(e, t, n) {
          ((this.edit = e), (this.mask = t), (this.children = n));
        }
        modify(e, t, n, r, i, a) {
          let o = this.mask,
            s = this.children,
            c = hashFragment(t, r),
            l = toBitmap(c),
            u = fromBitmap(o, l),
            d = o & l,
            p = canEditNode(this, e);
          if (!d) {
            let d = new yr().modify(e, t + 5, n, r, i, a);
            return d
              ? s.length >= fr
                ? expand(e, c, d, o, s)
                : new IndexedNode(e, o | l, arraySpliceIn(p, u, d, s))
              : this;
          }
          let m = s[u],
            h = m.modify(e, t + 5, n, r, i, a);
          if (m === h) return this;
          let g = o,
            _;
          if (isEmptyNode(h)) {
            if (((g &= ~l), !g)) return new yr();
            if (s.length <= 2 && isLeafNode(s[u ^ 1])) return s[u ^ 1];
            _ = arraySpliceOut(p, u, s);
          } else _ = arrayUpdate(p, u, h, s);
          return p ? ((this.mask = g), (this.children = _), this) : new IndexedNode(e, g, _);
        }
      }),
      (Cr = class ArrayNode {
        edit;
        size;
        children;
        _tag = `ArrayNode`;
        constructor(e, t, n) {
          ((this.edit = e), (this.size = t), (this.children = n));
        }
        modify(e, t, n, r, i, a) {
          let o = this.size,
            s = this.children,
            c = hashFragment(t, r),
            l = s[c],
            u = (l || new yr()).modify(e, t + 5, n, r, i, a);
          if (l === u) return this;
          let d = canEditNode(this, e),
            p;
          if (isEmptyNode(l) && !isEmptyNode(u)) (++o, (p = arrayUpdate(d, c, u, s)));
          else if (!isEmptyNode(l) && isEmptyNode(u)) {
            if ((--o, o <= pr)) return pack(e, o, c, s);
            p = arrayUpdate(d, c, new yr(), s);
          } else p = arrayUpdate(d, c, u, s);
          return d ? ((this.size = o), (this.children = p), this) : new ArrayNode(e, o, p);
        }
      }));
  }),
  Tr,
  Er,
  Dr,
  kr,
  Ar,
  applyCont,
  visitLazy,
  visitLazyChildren,
  jr,
  Mr,
  Nr,
  isHashMap,
  Pr,
  Fr,
  Ir,
  Lr,
  Rr,
  zr,
  Br,
  Vr,
  Hr,
  Ur,
  Wr,
  Gr,
  Kr,
  qr,
  Jr,
  Yr,
  Xr = __esmMin(() => {
    (D(),
      l(),
      T(),
      k(),
      z(),
      A(),
      x(),
      hr(),
      mr(),
      wr(),
      (Tr = `effect/HashMap`),
      (Er = Symbol.for(Tr)),
      (Dr = {
        [Er]: Er,
        [Symbol.iterator]() {
          return new Ar(this, (e, t) => [e, t]);
        },
        [S]() {
          let e = hash(Tr);
          for (let t of this) e ^= pipe(hash(t[0]), C(hash(t[1])));
          return w(this, e);
        },
        [E](e) {
          if (isHashMap(e)) {
            if (e._size !== this._size) return !1;
            for (let t of this) {
              let n = pipe(e, Ir(t[0], hash(t[0])));
              if (F(n) || !equals$2(t[1], n.value)) return !1;
            }
            return !0;
          }
          return !1;
        },
        toString() {
          return xe(this.toJSON());
        },
        toJSON() {
          return { _id: `HashMap`, values: Array.from(this).map(toJSON) };
        },
        [O]() {
          return this.toJSON();
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (kr = __name((e, t, n, r) => {
        let i = Object.create(Dr);
        return ((i._editable = e), (i._edit = t), (i._root = n), (i._size = r), i);
      }, `makeImpl`)),
      (Ar = class HashMapIterator {
        map;
        f;
        v;
        constructor(e, t) {
          ((this.map = e), (this.f = t), (this.v = visitLazy(this.map._root, this.f, void 0)));
        }
        next() {
          if (F(this.v)) return { done: !0, value: void 0 };
          let e = this.v.value;
          return ((this.v = applyCont(e.cont)), { done: !1, value: e.value });
        }
        [Symbol.iterator]() {
          return new HashMapIterator(this.map, this.f);
        }
      }),
      (applyCont = (e) => (e ? visitLazyChildren(e[0], e[1], e[2], e[3], e[4]) : N())),
      (visitLazy = (e, t, n = void 0) => {
        switch (e._tag) {
          case `LeafNode`:
            return I(e.value) ? P({ value: t(e.key, e.value.value), cont: n }) : applyCont(n);
          case `CollisionNode`:
          case `ArrayNode`:
          case `IndexedNode`: {
            let r = e.children;
            return visitLazyChildren(r.length, r, 0, t, n);
          }
          default:
            return applyCont(n);
        }
      }),
      (visitLazyChildren = (e, t, n, r, i) => {
        for (; n < e;) {
          let a = t[n++];
          if (a && !isEmptyNode(a)) return visitLazy(a, r, [e, t, n, r, i]);
        }
        return applyCont(i);
      }),
      (jr = kr(!1, 0, new yr(), 0)),
      (Mr = __name(() => jr, `empty`)),
      (Nr = __name((e) => {
        let t = Hr(Mr());
        for (let n of e) Rr(t, n[0], n[1]);
        return Ur(t);
      }, `fromIterable`)),
      (isHashMap = (e) => b(e, Er)),
      (Pr = __name((e) => e && isEmptyNode(e._root), `isEmpty`)),
      (Fr = dual(2, (e, t) => Ir(e, t, hash(t)))),
      (Ir = dual(3, (e, t, n) => {
        let r = e._root,
          i = 0;
        for (;;)
          switch (r._tag) {
            case `LeafNode`:
              return equals$2(t, r.key) ? r.value : N();
            case `CollisionNode`:
              if (n === r.hash) {
                let e = r.children;
                for (let n = 0, r = e.length; n < r; ++n) {
                  let r = e[n];
                  if (`key` in r && equals$2(t, r.key)) return r.value;
                }
              }
              return N();
            case `IndexedNode`: {
              let e = toBitmap(hashFragment(i, n));
              if (r.mask & e) {
                ((r = r.children[fromBitmap(r.mask, e)]), (i += 5));
                break;
              }
              return N();
            }
            case `ArrayNode`:
              if (((r = r.children[hashFragment(i, n)]), r)) {
                i += 5;
                break;
              }
              return N();
            default:
              return N();
          }
      })),
      (Lr = dual(2, (e, t) => I(Ir(e, t, hash(t))))),
      (Rr = dual(3, (e, t, n) => Wr(e, t, () => P(n)))),
      (zr = dual(3, (e, t, n) =>
        e._editable
          ? ((e._root = t), (e._size = n), e)
          : t === e._root
            ? e
            : kr(e._editable, e._edit, t, n),
      )),
      (Br = __name((e) => new Ar(e, (e) => e), `keys`)),
      (Vr = __name((e) => e._size, `size`)),
      (Hr = __name((e) => kr(!0, e._edit + 1, e._root, e._size), `beginMutation`)),
      (Ur = __name((e) => ((e._editable = !1), e), `endMutation`)),
      (Wr = dual(3, (e, t, n) => Gr(e, t, hash(t), n))),
      (Gr = dual(4, (e, t, n, r) => {
        let i = { value: e._size },
          a = e._root.modify(e._editable ? e._edit : NaN, 0, r, n, t, i);
        return pipe(e, zr(a, i.value));
      })),
      (Kr = dual(2, (e, t) => Wr(e, t, N))),
      (qr = dual(2, (e, t) => Yr(e, Mr(), (e, n, r) => Rr(e, r, t(n, r))))),
      (Jr = dual(2, (e, t) => Yr(e, void 0, (e, n, r) => t(n, r)))),
      (Yr = dual(3, (e, t, n) => {
        let r = e._root;
        if (r._tag === `LeafNode`) return I(r.value) ? n(t, r.value.value, r.key) : t;
        if (r._tag === `EmptyNode`) return t;
        let i = [r.children],
          a;
        for (; (a = i.pop());)
          for (let e = 0, r = a.length; e < r;) {
            let r = a[e++];
            r &&
              !isEmptyNode(r) &&
              (r._tag === `LeafNode`
                ? I(r.value) && (t = n(t, r.value.value, r.key))
                : i.push(r.children));
          }
        return t;
      })));
  }),
  Zr,
  Qr,
  $r,
  makeImpl,
  isHashSet,
  ei,
  ti,
  ni,
  ri,
  ii,
  ai,
  beginMutation,
  endMutation,
  oi,
  si,
  ci,
  li,
  ui,
  di,
  fi,
  pi = __esmMin(() => {
    (D(),
      l(),
      T(),
      k(),
      A(),
      x(),
      Xr(),
      (Zr = `effect/HashSet`),
      (Qr = Symbol.for(Zr)),
      ($r = {
        [Qr]: Qr,
        [Symbol.iterator]() {
          return Br(this._keyMap);
        },
        [S]() {
          return w(this, C(hash(this._keyMap))(hash(Zr)));
        },
        [E](e) {
          return isHashSet(e)
            ? Vr(this._keyMap) === Vr(e._keyMap) && equals$2(this._keyMap, e._keyMap)
            : !1;
        },
        toString() {
          return xe(this.toJSON());
        },
        toJSON() {
          return { _id: `HashSet`, values: Array.from(this).map(toJSON) };
        },
        [O]() {
          return this.toJSON();
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (makeImpl = (e) => {
        let t = Object.create($r);
        return ((t._keyMap = e), t);
      }),
      (isHashSet = (e) => b(e, Qr)),
      (ei = makeImpl(Mr())),
      (ti = __name(() => ei, `empty`)),
      (ni = __name((e) => {
        let t = beginMutation(ti());
        for (let n of e) si(t, n);
        return endMutation(t);
      }, `fromIterable`)),
      (ri = __name((...e) => {
        let t = beginMutation(ti());
        for (let n of e) si(t, n);
        return endMutation(t);
      }, `make`)),
      (ii = dual(2, (e, t) => Lr(e._keyMap, t))),
      (ai = __name((e) => Vr(e._keyMap), `size`)),
      (beginMutation = (e) => makeImpl(Hr(e._keyMap))),
      (endMutation = (e) => ((e._keyMap._editable = !1), e)),
      (oi = dual(2, (e, t) => {
        let n = beginMutation(e);
        return (t(n), endMutation(n));
      })),
      (si = dual(2, (e, t) =>
        e._keyMap._editable ? (Rr(t, !0)(e._keyMap), e) : makeImpl(Rr(t, !0)(e._keyMap)),
      )),
      (ci = dual(2, (e, t) =>
        e._keyMap._editable ? (Kr(t)(e._keyMap), e) : makeImpl(Kr(t)(e._keyMap)),
      )),
      (li = dual(2, (e, t) =>
        oi(e, (e) => {
          for (let n of t) ci(e, n);
        }),
      )),
      (ui = dual(2, (e, t) =>
        oi(ti(), (n) => {
          di(e, (e) => si(n, e));
          for (let e of t) si(n, e);
        }),
      )),
      (di = dual(2, (e, t) => Jr(e._keyMap, (e, n) => t(n)))),
      (fi = dual(3, (e, t, n) => Yr(e._keyMap, t, (e, t, r) => n(e, r)))));
  }),
  mi,
  hi,
  gi,
  _i,
  vi,
  yi,
  bi,
  xi,
  Si,
  Ci,
  wi = __esmMin(() => {
    (pi(),
      (mi = ti),
      (hi = ni),
      (gi = ri),
      (_i = ii),
      (vi = ai),
      (yi = si),
      (bi = ci),
      (xi = li),
      (Si = ui),
      (Ci = fi));
  }),
  Ti,
  Ei,
  Di,
  Oi,
  ki,
  Ai = __esmMin(() => {
    ((Ti = `Empty`), (Ei = `Fail`), (Di = `Interrupt`), (Oi = `Parallel`), (ki = `Sequential`));
  }),
  ji,
  Mi,
  Ni,
  Pi,
  Fi,
  Ii,
  Li,
  interrupt,
  Ri,
  zi,
  isCause,
  isEmptyType,
  Bi,
  isDieType,
  Vi,
  isInterrupted,
  Hi,
  failures,
  defects,
  interruptors,
  failureOption,
  failureOrCause,
  interruptOption,
  stripFailures,
  electFailures,
  Ui,
  Wi,
  causeEquals,
  flattenCause,
  flattenCauseLoop,
  Gi,
  evaluateCause,
  Ki,
  qi,
  Ji,
  Yi,
  Xi,
  Zi,
  Qi,
  renderErrorCause,
  makePrettyError,
  prettyErrorMessage,
  $i,
  ea,
  prettyErrorStack,
  ta,
  na,
  ra = __esmMin(() => {
    (H(),
      lr(),
      Nt(),
      D(),
      l(),
      y(),
      T(),
      wi(),
      k(),
      z(),
      A(),
      x(),
      re(),
      Ai(),
      (ji = `effect/Cause`),
      (Mi = Symbol.for(ji)),
      (Ni = { _E: (e) => e }),
      (Pi = {
        [Mi]: Ni,
        [S]() {
          return pipe(hash(ji), C(hash(flattenCause(this))), w(this));
        },
        [E](e) {
          return isCause(e) && causeEquals(this, e);
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
        toJSON() {
          switch (this._tag) {
            case `Empty`:
              return { _id: `Cause`, _tag: this._tag };
            case `Die`:
              return { _id: `Cause`, _tag: this._tag, defect: toJSON(this.defect) };
            case `Interrupt`:
              return { _id: `Cause`, _tag: this._tag, fiberId: this.fiberId.toJSON() };
            case `Fail`:
              return { _id: `Cause`, _tag: this._tag, failure: toJSON(this.error) };
            case `Sequential`:
            case `Parallel`:
              return {
                _id: `Cause`,
                _tag: this._tag,
                left: toJSON(this.left),
                right: toJSON(this.right),
              };
          }
        },
        toString() {
          return Qi(this);
        },
        [O]() {
          return this.toJSON();
        },
      }),
      (Fi = (() => {
        let e = Object.create(Pi);
        return ((e._tag = Ti), e);
      })()),
      (Ii = __name((e) => {
        let t = Object.create(Pi);
        return ((t._tag = Ei), (t.error = e), t);
      }, `fail`)),
      (Li = __name((e) => {
        let t = Object.create(Pi);
        return ((t._tag = `Die`), (t.defect = e), t);
      }, `die`)),
      (interrupt = (e) => {
        let t = Object.create(Pi);
        return ((t._tag = Di), (t.fiberId = e), t);
      }),
      (Ri = __name((e, t) => {
        let n = Object.create(Pi);
        return ((n._tag = Oi), (n.left = e), (n.right = t), n);
      }, `parallel`)),
      (zi = __name((e, t) => {
        let n = Object.create(Pi);
        return ((n._tag = ki), (n.left = e), (n.right = t), n);
      }, `sequential`)),
      (isCause = (e) => b(e, Mi)),
      (isEmptyType = (e) => e._tag === Ti),
      (Bi = __name((e) => e._tag === Ei, `isFailType`)),
      (isDieType = (e) => e._tag === `Die`),
      (Vi = __name(
        (e) =>
          e._tag === `Empty` ||
          Xi(e, !0, (e, t) => {
            switch (t._tag) {
              case Ti:
                return P(e);
              case `Die`:
              case Ei:
              case Di:
                return P(!1);
              default:
                return N();
            }
          }),
        `isEmpty`,
      )),
      (isInterrupted = (e) => I(interruptOption(e))),
      (Hi = __name((e) => Zi(void 0, Ki)(e), `isInterruptedOnly`)),
      (failures = (e) =>
        er(Xi(e, Yn(), (e, t) => (t._tag === `Fail` ? P(pipe(e, rr(t.error))) : N())))),
      (defects = (e) =>
        er(Xi(e, Yn(), (e, t) => (t._tag === `Die` ? P(pipe(e, rr(t.defect))) : N())))),
      (interruptors = (e) =>
        Xi(e, mi(), (e, t) => (t._tag === `Interrupt` ? P(pipe(e, yi(t.fiberId))) : N()))),
      (failureOption = (e) => Gi(e, (e) => (e._tag === `Fail` ? P(e.error) : N()))),
      (failureOrCause = (e) => {
        let t = failureOption(e);
        switch (t._tag) {
          case `None`:
            return j(e);
          case `Some`:
            return M(t.value);
        }
      }),
      (interruptOption = (e) => Gi(e, (e) => (e._tag === `Interrupt` ? P(e.fiberId) : N()))),
      (stripFailures = (e) =>
        Yi(e, {
          onEmpty: Fi,
          onFail: () => Fi,
          onDie: Li,
          onInterrupt: interrupt,
          onSequential: zi,
          onParallel: Ri,
        })),
      (electFailures = (e) =>
        Yi(e, {
          onEmpty: Fi,
          onFail: Li,
          onDie: Li,
          onInterrupt: interrupt,
          onSequential: zi,
          onParallel: Ri,
        })),
      (Ui = dual(2, (e, t) => Wi(e, (e) => Ii(t(e))))),
      (Wi = dual(2, (e, t) =>
        Yi(e, {
          onEmpty: Fi,
          onFail: (e) => t(e),
          onDie: (e) => Li(e),
          onInterrupt: (e) => interrupt(e),
          onSequential: (e, t) => zi(e, t),
          onParallel: (e, t) => Ri(e, t),
        }),
      )),
      (causeEquals = (e, t) => {
        let n = Zn(e),
          r = Zn(t);
        for (; sr(n) && sr(r);) {
          let [e, t] = pipe(
              cr(n),
              Xi([mi(), Yn()], ([e, t], n) => {
                let [r, i] = evaluateCause(n);
                return P([pipe(e, Si(r)), pipe(t, ar(i))]);
              }),
            ),
            [i, a] = pipe(
              cr(r),
              Xi([mi(), Yn()], ([e, t], n) => {
                let [r, i] = evaluateCause(n);
                return P([pipe(e, Si(r)), pipe(t, ar(i))]);
              }),
            );
          if (!equals$2(e, i)) return !1;
          ((n = t), (r = a));
        }
        return !0;
      }),
      (flattenCause = (e) => flattenCauseLoop(Zn(e), Yn())),
      (flattenCauseLoop = (e, t) => {
        for (;;) {
          let [n, r] = pipe(
              e,
              zn([mi(), Yn()], ([e, t], n) => {
                let [r, i] = evaluateCause(n);
                return [pipe(e, Si(r)), pipe(t, ar(i))];
              }),
            ),
            i = vi(n) > 0 ? pipe(t, rr(n)) : t;
          if (or(r)) return er(i);
          ((e = r), (t = i));
        }
        throw Error(getBugErrorMessage(`Cause.flattenCauseLoop`));
      }),
      (Gi = dual(2, (e, t) => {
        let n = [e];
        for (; n.length > 0;) {
          let e = n.pop(),
            r = t(e);
          switch (r._tag) {
            case `None`:
              switch (e._tag) {
                case ki:
                case Oi:
                  (n.push(e.right), n.push(e.left));
                  break;
              }
              break;
            case `Some`:
              return r;
          }
        }
        return N();
      })),
      (evaluateCause = (e) => {
        let t = e,
          n = [],
          r = mi(),
          i = Yn();
        for (; t !== void 0;)
          switch (t._tag) {
            case Ti:
              if (n.length === 0) return [r, i];
              t = n.pop();
              break;
            case Ei:
              if (((r = yi(r, Xn(t._tag, t.error))), n.length === 0)) return [r, i];
              t = n.pop();
              break;
            case `Die`:
              if (((r = yi(r, Xn(t._tag, t.defect))), n.length === 0)) return [r, i];
              t = n.pop();
              break;
            case Di:
              if (((r = yi(r, Xn(t._tag, t.fiberId))), n.length === 0)) return [r, i];
              t = n.pop();
              break;
            case ki:
              switch (t.left._tag) {
                case Ti:
                  t = t.right;
                  break;
                case ki:
                  t = zi(t.left.left, zi(t.left.right, t.right));
                  break;
                case Oi:
                  t = Ri(zi(t.left.left, t.right), zi(t.left.right, t.right));
                  break;
                default:
                  ((i = rr(i, t.right)), (t = t.left));
                  break;
              }
              break;
            case Oi:
              (n.push(t.right), (t = t.left));
              break;
          }
        throw Error(getBugErrorMessage(`Cause.evaluateCauseLoop`));
      }),
      (Ki = {
        emptyCase: a,
        failCase: o,
        dieCase: o,
        interruptCase: a,
        sequentialCase: (e, t, n) => t && n,
        parallelCase: (e, t, n) => t && n,
      }),
      (qi = `SequentialCase`),
      (Ji = `ParallelCase`),
      (Yi = dual(
        2,
        (e, { onDie: t, onEmpty: n, onFail: r, onInterrupt: i, onParallel: a, onSequential: o }) =>
          Zi(e, void 0, {
            emptyCase: () => n,
            failCase: (e, t) => r(t),
            dieCase: (e, n) => t(n),
            interruptCase: (e, t) => i(t),
            sequentialCase: (e, t, n) => o(t, n),
            parallelCase: (e, t, n) => a(t, n),
          }),
      )),
      (Xi = dual(3, (e, t, n) => {
        let r = t,
          i = e,
          a = [];
        for (; i !== void 0;) {
          let e = n(r, i);
          switch (((r = I(e) ? e.value : r), i._tag)) {
            case ki:
              (a.push(i.right), (i = i.left));
              break;
            case Oi:
              (a.push(i.right), (i = i.left));
              break;
            default:
              i = void 0;
              break;
          }
          i === void 0 && a.length > 0 && (i = a.pop());
        }
        return r;
      })),
      (Zi = dual(3, (e, t, n) => {
        let r = [e],
          i = [];
        for (; r.length > 0;) {
          let e = r.pop();
          switch (e._tag) {
            case Ti:
              i.push(j(n.emptyCase(t)));
              break;
            case Ei:
              i.push(j(n.failCase(t, e.error)));
              break;
            case `Die`:
              i.push(j(n.dieCase(t, e.defect)));
              break;
            case Di:
              i.push(j(n.interruptCase(t, e.fiberId)));
              break;
            case ki:
              (r.push(e.right), r.push(e.left), i.push(M({ _tag: qi })));
              break;
            case Oi:
              (r.push(e.right), r.push(e.left), i.push(M({ _tag: Ji })));
              break;
          }
        }
        let a = [];
        for (; i.length > 0;) {
          let e = i.pop();
          switch (e._tag) {
            case `Left`:
              switch (e.left._tag) {
                case qi: {
                  let e = a.pop(),
                    r = a.pop(),
                    i = n.sequentialCase(t, e, r);
                  a.push(i);
                  break;
                }
                case Ji: {
                  let e = a.pop(),
                    r = a.pop(),
                    i = n.parallelCase(t, e, r);
                  a.push(i);
                  break;
                }
              }
              break;
            case `Right`:
              a.push(e.right);
              break;
          }
        }
        if (a.length === 0)
          throw Error(
            `BUG: Cause.reduceWithContext - please report an issue at https://github.com/Effect-TS/effect/issues`,
          );
        return a.pop();
      })),
      (Qi = __name(
        (e, t) =>
          Hi(e)
            ? `All fibers interrupted without errors.`
            : na(e).map(function (e) {
                return t?.renderErrorCause !== !0 || e.cause === void 0
                  ? e.stack
                  : `${e.stack} {\n${renderErrorCause(e.cause, `  `)}\n}`;
              }).join(`
`),
        `pretty`,
      )),
      (renderErrorCause = (e, t) => {
        let n = e.stack.split(`
`),
          r = `${t}[cause]: ${n[0]}`;
        for (let e = 1, i = n.length; e < i; e++) r += `\n${t}${n[e]}`;
        return (e.cause && (r += ` {\n${renderErrorCause(e.cause, `${t}  `)}\n${t}}`), r);
      }),
      (makePrettyError = (e) => {
        let t = typeof e == `object` && !!e,
          n = Error.stackTraceLimit;
        Error.stackTraceLimit = 1;
        let r = Error(
          prettyErrorMessage(e),
          t && `cause` in e && e.cause !== void 0 ? { cause: makePrettyError(e.cause) } : void 0,
        );
        return (
          (Error.stackTraceLimit = n),
          r.message === `` && (r.message = `An error has occurred`),
          (Error.stackTraceLimit = n),
          (r.name = e instanceof Error ? e.name : `Error`),
          t &&
            (ta in e && (r.span = e[ta]),
            Object.keys(e).forEach((t) => {
              t in r || (r[t] = e[t]);
            })),
          (r.stack = prettyErrorStack(
            `${r.name}: ${r.message}`,
            e instanceof Error && e.stack ? e.stack : ``,
            r.span,
          )),
          r
        );
      }),
      (prettyErrorMessage = (e) => {
        if (typeof e == `string`) return e;
        if (typeof e == `object` && e && e instanceof Error) return e.message;
        try {
          if (
            b(e, `toString`) &&
            ee(e.toString) &&
            e.toString !== Object.prototype.toString &&
            e.toString !== globalThis.Array.prototype.toString
          )
            return e.toString();
        } catch {}
        return stringifyCircular(e);
      }),
      ($i = /\((.*)\)/g),
      (ea = globalValue(`effect/Tracer/spanToTrace`, () => new WeakMap())),
      (prettyErrorStack = (e, t, n) => {
        let r = [e],
          i = t.startsWith(e)
            ? t.slice(e.length).split(`
`)
            : t.split(`
`);
        for (let e = 1; e < i.length; e++) {
          if (i[e].includes(` at new BaseEffectError`) || i[e].includes(` at new YieldableError`)) {
            e++;
            continue;
          }
          if (i[e].includes(`Generator.next`) || i[e].includes(`effect_internal_function`)) break;
          r.push(
            i[e]
              .replace(/at .*effect_instruction_i.*\((.*)\)/, `at $1`)
              .replace(/EffectPrimitive\.\w+/, `<anonymous>`),
          );
        }
        if (n) {
          let e = n,
            t = 0;
          for (; e && e._tag === `Span` && t < 10;) {
            let n = ea.get(e);
            if (typeof n == `function`) {
              let t = n();
              if (typeof t == `string`) {
                let n = t.matchAll($i),
                  i = !1;
                for (let [, t] of n) ((i = !0), r.push(`    at ${e.name} (${t})`));
                i || r.push(`    at ${e.name} (${t.replace(/^at /, ``)})`);
              } else r.push(`    at ${e.name}`);
            } else r.push(`    at ${e.name}`);
            ((e = Wt(e.parent)), t++);
          }
        }
        return r.join(`
`);
      }),
      (ta = Symbol.for(`effect/SpanAnnotation`)),
      (na = __name(
        (e) =>
          Zi(e, void 0, {
            emptyCase: () => [],
            dieCase: (e, t) => [makePrettyError(t)],
            failCase: (e, t) => [makePrettyError(t)],
            interruptCase: () => [],
            parallelCase: (e, t, n) => [...t, ...n],
            sequentialCase: (e, t, n) => [...t, ...n],
          }),
        `prettyErrors`,
      )));
  }),
  ia,
  aa,
  oa,
  sa,
  ca,
  la,
  makeGenericTag,
  ua,
  da,
  fa,
  pa,
  makeContext,
  serviceNotFoundError,
  isContext,
  isReference,
  ma,
  ha,
  ga,
  _a,
  va,
  getDefaultValue,
  unsafeGetReference,
  ya,
  ba,
  xa,
  Sa,
  Ca = __esmMin(() => {
    (D(),
      l(),
      y(),
      T(),
      k(),
      A(),
      x(),
      $e(),
      ut(),
      (ia = Symbol.for(`effect/Context/Tag`)),
      (aa = Symbol.for(`effect/Context/Reference`)),
      (oa = `effect/STM`),
      (sa = Symbol.for(oa)),
      (ca = {
        ...Je,
        _op: `Tag`,
        [sa]: Ge,
        [ia]: { _Service: (e) => e, _Identifier: (e) => e },
        toString() {
          return xe(this.toJSON());
        },
        toJSON() {
          return { _id: `Tag`, key: this.key, stack: this.stack };
        },
        [O]() {
          return this.toJSON();
        },
        of(e) {
          return e;
        },
        context(e) {
          return ga(this, e);
        },
      }),
      (la = { ...ca, [aa]: aa }),
      (makeGenericTag = (e) => {
        let t = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        let n = Error();
        Error.stackTraceLimit = t;
        let r = Object.create(ca);
        return (
          Object.defineProperty(r, "stack", {
            get() {
              return n.stack;
            },
          }),
          (r.key = e),
          r
        );
      }),
      (ua = __name(
        (e) => () => {
          let t = Error.stackTraceLimit;
          Error.stackTraceLimit = 2;
          let n = Error();
          Error.stackTraceLimit = t;
          function TagClass() {}
          return (
            Object.setPrototypeOf(TagClass, ca),
            (TagClass.key = e),
            Object.defineProperty(TagClass, "stack", {
              get() {
                return n.stack;
              },
            }),
            TagClass
          );
        },
        `Tag`,
      )),
      (da = __name(
        () => (e, t) => {
          let n = Error.stackTraceLimit;
          Error.stackTraceLimit = 2;
          let r = Error();
          Error.stackTraceLimit = n;
          function ReferenceClass() {}
          return (
            Object.setPrototypeOf(ReferenceClass, la),
            (ReferenceClass.key = e),
            (ReferenceClass.defaultValue = t.defaultValue),
            Object.defineProperty(ReferenceClass, "stack", {
              get() {
                return r.stack;
              },
            }),
            ReferenceClass
          );
        },
        `Reference`,
      )),
      (fa = Symbol.for(`effect/Context`)),
      (pa = {
        [fa]: { _Services: (e) => e },
        [E](e) {
          if (isContext(e) && this.unsafeMap.size === e.unsafeMap.size) {
            for (let t of this.unsafeMap.keys())
              if (!e.unsafeMap.has(t) || !equals$2(this.unsafeMap.get(t), e.unsafeMap.get(t)))
                return !1;
            return !0;
          }
          return !1;
        },
        [S]() {
          return w(this, ye(this.unsafeMap.size));
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
        toString() {
          return xe(this.toJSON());
        },
        toJSON() {
          return { _id: `Context`, services: Array.from(this.unsafeMap).map(toJSON) };
        },
        [O]() {
          return this.toJSON();
        },
      }),
      (makeContext = (e) => {
        let t = Object.create(pa);
        return ((t.unsafeMap = e), t);
      }),
      (serviceNotFoundError = (e) => {
        let t = Error(`Service not found${e.key ? `: ${String(e.key)}` : ``}`);
        if (e.stack) {
          let n = e.stack.split(`
`);
          if (n.length > 2) {
            let e = n[2].match(/at (.*)/);
            e && (t.message += ` (defined at ${e[1]})`);
          }
        }
        if (t.stack) {
          let e = t.stack.split(`
`);
          (e.splice(1, 3),
            (t.stack = e.join(`
`)));
        }
        return t;
      }),
      (isContext = (e) => b(e, fa)),
      (isReference = (e) => b(e, aa)),
      (ma = makeContext(new Map())),
      (ha = __name(() => ma, `empty`)),
      (ga = __name((e, t) => makeContext(new Map([[e.key, t]])), `make`)),
      (_a = dual(3, (e, t, n) => {
        let r = new Map(e.unsafeMap);
        return (r.set(t.key, n), makeContext(r));
      })),
      (va = globalValue(`effect/Context/defaultValueCache`, () => new Map())),
      (getDefaultValue = (e) => {
        if (va.has(e.key)) return va.get(e.key);
        let t = e.defaultValue();
        return (va.set(e.key, t), t);
      }),
      (unsafeGetReference = (e, t) =>
        e.unsafeMap.has(t.key) ? e.unsafeMap.get(t.key) : getDefaultValue(t)),
      (ya = dual(2, (e, t) => {
        if (!e.unsafeMap.has(t.key)) {
          if (aa in t) return getDefaultValue(t);
          throw serviceNotFoundError(t);
        }
        return e.unsafeMap.get(t.key);
      })),
      (ba = ya),
      (xa = dual(2, (e, t) =>
        e.unsafeMap.has(t.key)
          ? lt(e.unsafeMap.get(t.key))
          : isReference(t)
            ? lt(getDefaultValue(t))
            : ct,
      )),
      (Sa = dual(2, (e, t) => {
        let n = new Map(e.unsafeMap);
        for (let [e, r] of t.unsafeMap) n.set(e, r);
        return makeContext(n);
      })));
  }),
  wa,
  Ta,
  Ea,
  Da,
  Oa,
  ka,
  Aa,
  ja,
  Ma,
  Na,
  Pa = __esmMin(() => {
    (Ca(),
      (wa = makeGenericTag),
      (Ta = ha),
      (Ea = ga),
      (Da = _a),
      (Oa = ba),
      (ka = ya),
      (Aa = xa),
      (ja = Sa),
      (Ma = ua),
      (Na = da));
  }),
  Fa,
  Ia,
  La,
  Ra,
  za,
  Ba,
  Va,
  Ha,
  Ua,
  Wa,
  Ga,
  Ka,
  qa,
  isDuration,
  Ja,
  Ya,
  Xa,
  Za,
  nanos,
  micros,
  millis,
  seconds,
  minutes,
  hours,
  days,
  weeks,
  toMillis,
  toNanos,
  unsafeToNanos,
  toHrTime,
  Qa,
  $a,
  eo,
  to,
  no,
  ro,
  parts,
  io,
  ao = __esmMin(() => {
    (D(),
      l(),
      T(),
      k(),
      z(),
      A(),
      x(),
      (Fa = Symbol.for(`effect/Duration`)),
      (Ia = BigInt(0)),
      (La = BigInt(24)),
      (Ra = BigInt(60)),
      (za = BigInt(1e3)),
      (Ba = BigInt(1e6)),
      (Va = BigInt(1e9)),
      (Ha = /^(-?\d+(?:\.\d+)?)\s+(nanos?|micros?|millis?|seconds?|minutes?|hours?|days?|weeks?)$/),
      (Ua = __name((e) => {
        if (isDuration(e)) return e;
        if (isNumber(e)) return millis(e);
        if (isBigInt(e)) return nanos(e);
        if (Array.isArray(e) && e.length === 2 && e.every(isNumber))
          return e[0] === -1 / 0 || e[1] === -1 / 0 || Number.isNaN(e[0]) || Number.isNaN(e[1])
            ? Xa
            : e[0] === 1 / 0 || e[1] === 1 / 0
              ? Za
              : nanos(BigInt(Math.round(e[0] * 1e9)) + BigInt(Math.round(e[1])));
        if (isString(e)) {
          let t = Ha.exec(e);
          if (t) {
            let [e, n, r] = t,
              i = Number(n);
            switch (r) {
              case `nano`:
              case `nanos`:
                return nanos(BigInt(n));
              case `micro`:
              case `micros`:
                return micros(BigInt(n));
              case `milli`:
              case `millis`:
                return millis(i);
              case `second`:
              case `seconds`:
                return seconds(i);
              case `minute`:
              case `minutes`:
                return minutes(i);
              case `hour`:
              case `hours`:
                return hours(i);
              case `day`:
              case `days`:
                return days(i);
              case `week`:
              case `weeks`:
                return weeks(i);
            }
          }
        }
        throw Error(`Invalid DurationInput`);
      }, `decode`)),
      (Wa = { _tag: `Millis`, millis: 0 }),
      (Ga = { _tag: `Infinity` }),
      (Ka = {
        [Fa]: Fa,
        [S]() {
          return w(this, structure(this.value));
        },
        [E](e) {
          return isDuration(e) && ro(this, e);
        },
        toString() {
          return `Duration(${io(this)})`;
        },
        toJSON() {
          switch (this.value._tag) {
            case `Millis`:
              return { _id: `Duration`, _tag: `Millis`, millis: this.value.millis };
            case `Nanos`:
              return { _id: `Duration`, _tag: `Nanos`, hrtime: toHrTime(this) };
            case `Infinity`:
              return { _id: `Duration`, _tag: `Infinity` };
          }
        },
        [O]() {
          return this.toJSON();
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (qa = __name((e) => {
        let t = Object.create(Ka);
        return (
          isNumber(e)
            ? isNaN(e) || e <= 0
              ? (t.value = Wa)
              : Number.isFinite(e)
                ? Number.isInteger(e)
                  ? (t.value = { _tag: `Millis`, millis: e })
                  : (t.value = { _tag: `Nanos`, nanos: BigInt(Math.round(e * 1e6)) })
                : (t.value = Ga)
            : e <= Ia
              ? (t.value = Wa)
              : (t.value = { _tag: `Nanos`, nanos: e }),
          t
        );
      }, `make`)),
      (isDuration = (e) => b(e, Fa)),
      (Ja = __name((e) => e.value._tag !== `Infinity`, `isFinite`)),
      (Ya = __name((e) => {
        switch (e.value._tag) {
          case `Millis`:
            return e.value.millis === 0;
          case `Nanos`:
            return e.value.nanos === Ia;
          case `Infinity`:
            return !1;
        }
      }, `isZero`)),
      (Xa = qa(0)),
      (Za = qa(1 / 0)),
      (nanos = (e) => qa(e)),
      (micros = (e) => qa(e * za)),
      (millis = (e) => qa(e)),
      (seconds = (e) => qa(e * 1e3)),
      (minutes = (e) => qa(e * 6e4)),
      (hours = (e) => qa(e * 36e5)),
      (days = (e) => qa(e * 864e5)),
      (weeks = (e) => qa(e * 6048e5)),
      (toMillis = (e) => Qa(e, { onMillis: (e) => e, onNanos: (e) => Number(e) / 1e6 })),
      (toNanos = (e) => {
        let t = Ua(e);
        switch (t.value._tag) {
          case `Infinity`:
            return N();
          case `Nanos`:
            return P(t.value.nanos);
          case `Millis`:
            return P(BigInt(Math.round(t.value.millis * 1e6)));
        }
      }),
      (unsafeToNanos = (e) => {
        let t = Ua(e);
        switch (t.value._tag) {
          case `Infinity`:
            throw Error(`Cannot convert infinite duration to nanos`);
          case `Nanos`:
            return t.value.nanos;
          case `Millis`:
            return BigInt(Math.round(t.value.millis * 1e6));
        }
      }),
      (toHrTime = (e) => {
        let t = Ua(e);
        switch (t.value._tag) {
          case `Infinity`:
            return [1 / 0, 0];
          case `Nanos`:
            return [Number(t.value.nanos / Va), Number(t.value.nanos % Va)];
          case `Millis`:
            return [Math.floor(t.value.millis / 1e3), Math.round((t.value.millis % 1e3) * 1e6)];
        }
      }),
      (Qa = dual(2, (e, t) => {
        let n = Ua(e);
        switch (n.value._tag) {
          case `Nanos`:
            return t.onNanos(n.value.nanos);
          case `Infinity`:
            return t.onMillis(1 / 0);
          case `Millis`:
            return t.onMillis(n.value.millis);
        }
      })),
      ($a = dual(3, (e, t, n) => {
        let r = Ua(e),
          i = Ua(t);
        if (r.value._tag === `Infinity` || i.value._tag === `Infinity`)
          return n.onMillis(toMillis(r), toMillis(i));
        if (r.value._tag === `Nanos` || i.value._tag === `Nanos`) {
          let e =
              r.value._tag === `Nanos` ? r.value.nanos : BigInt(Math.round(r.value.millis * 1e6)),
            t = i.value._tag === `Nanos` ? i.value.nanos : BigInt(Math.round(i.value.millis * 1e6));
          return n.onNanos(e, t);
        }
        return n.onMillis(r.value.millis, i.value.millis);
      })),
      (eo = __name(
        (e, t) => $a(e, t, { onMillis: (e, t) => e === t, onNanos: (e, t) => e === t }),
        `Equivalence`,
      )),
      (to = dual(2, (e, t) => $a(e, t, { onMillis: (e, t) => e <= t, onNanos: (e, t) => e <= t }))),
      (no = dual(2, (e, t) => $a(e, t, { onMillis: (e, t) => e >= t, onNanos: (e, t) => e >= t }))),
      (ro = dual(2, (e, t) => eo(Ua(e), Ua(t)))),
      (parts = (e) => {
        let t = Ua(e);
        if (t.value._tag === `Infinity`)
          return {
            days: 1 / 0,
            hours: 1 / 0,
            minutes: 1 / 0,
            seconds: 1 / 0,
            millis: 1 / 0,
            nanos: 1 / 0,
          };
        let n = unsafeToNanos(t),
          r = n / Ba,
          i = r / za,
          a = i / Ra,
          o = a / Ra,
          s = o / La;
        return {
          days: Number(s),
          hours: Number(o % La),
          minutes: Number(a % Ra),
          seconds: Number(i % Ra),
          millis: Number(r % za),
          nanos: Number(n % Ba),
        };
      }),
      (io = __name((e) => {
        let t = Ua(e);
        if (t.value._tag === `Infinity`) return `Infinity`;
        if (Ya(t)) return `0`;
        let n = parts(t),
          r = [];
        return (
          n.days !== 0 && r.push(`${n.days}d`),
          n.hours !== 0 && r.push(`${n.hours}h`),
          n.minutes !== 0 && r.push(`${n.minutes}m`),
          n.seconds !== 0 && r.push(`${n.seconds}s`),
          n.millis !== 0 && r.push(`${n.millis}ms`),
          n.nanos !== 0 && r.push(`${n.nanos}ns`),
          r.join(` `)
        );
      }, `format`)));
  }),
  oo,
  so,
  co,
  lo,
  uo,
  fo = __esmMin(() => {
    (l(),
      k(),
      A(),
      (oo = Symbol.for(`effect/MutableRef`)),
      (so = {
        [oo]: oo,
        toString() {
          return xe(this.toJSON());
        },
        toJSON() {
          return { _id: `MutableRef`, current: toJSON(this.current) };
        },
        [O]() {
          return this.toJSON();
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (co = __name((e) => {
        let t = Object.create(so);
        return ((t.current = e), t);
      }, `make`)),
      (lo = __name((e) => e.current, `get`)),
      (uo = dual(2, (e, t) => ((e.current = t), e))));
  }),
  po,
  mo,
  ho,
  _o,
  vo,
  yo,
  None$2,
  Runtime,
  Composite$2,
  bo,
  xo,
  So,
  Co,
  ids,
  wo,
  To,
  Eo,
  Do = __esmMin(() => {
    (D(),
      l(),
      y(),
      T(),
      wi(),
      k(),
      fo(),
      x(),
      (po = `effect/FiberId`),
      (mo = Symbol.for(po)),
      (ho = `None`),
      (_o = `Runtime`),
      (vo = `Composite`),
      (yo = string(`${po}-${ho}`)),
      (None$2 = class {
        static {
          __name(this, `None`);
        }
        [mo] = mo;
        _tag = ho;
        id = -1;
        startTimeMillis = -1;
        [S]() {
          return yo;
        }
        [E](e) {
          return Co(e) && e._tag === ho;
        }
        toString() {
          return xe(this.toJSON());
        }
        toJSON() {
          return { _id: `FiberId`, _tag: this._tag };
        }
        [O]() {
          return this.toJSON();
        }
      }),
      (Runtime = class {
        id;
        startTimeMillis;
        [mo] = mo;
        _tag = _o;
        constructor(e, t) {
          ((this.id = e), (this.startTimeMillis = t));
        }
        [S]() {
          return w(this, string(`${po}-${this._tag}-${this.id}-${this.startTimeMillis}`));
        }
        [E](e) {
          return (
            Co(e) && e._tag === _o && this.id === e.id && this.startTimeMillis === e.startTimeMillis
          );
        }
        toString() {
          return xe(this.toJSON());
        }
        toJSON() {
          return {
            _id: `FiberId`,
            _tag: this._tag,
            id: this.id,
            startTimeMillis: this.startTimeMillis,
          };
        }
        [O]() {
          return this.toJSON();
        }
      }),
      (Composite$2 = class {
        static {
          __name(this, `Composite`);
        }
        left;
        right;
        [mo] = mo;
        _tag = vo;
        constructor(e, t) {
          ((this.left = e), (this.right = t));
        }
        _hash;
        [S]() {
          return pipe(
            string(`${po}-${this._tag}`),
            C(hash(this.left)),
            C(hash(this.right)),
            w(this),
          );
        }
        [E](e) {
          return (
            Co(e) && e._tag === vo && equals$2(this.left, e.left) && equals$2(this.right, e.right)
          );
        }
        toString() {
          return xe(this.toJSON());
        }
        toJSON() {
          return {
            _id: `FiberId`,
            _tag: this._tag,
            left: toJSON(this.left),
            right: toJSON(this.right),
          };
        }
        [O]() {
          return this.toJSON();
        }
      }),
      (bo = new None$2()),
      (xo = __name((e, t) => new Runtime(e, t), `runtime`)),
      (So = __name((e, t) => new Composite$2(e, t), `composite`)),
      (Co = __name((e) => b(e, mo), `isFiberId`)),
      (ids = (e) => {
        switch (e._tag) {
          case ho:
            return mi();
          case _o:
            return gi(e.id);
          case vo:
            return pipe(ids(e.left), Si(ids(e.right)));
        }
      }),
      (wo = globalValue(Symbol.for(`effect/Fiber/Id/_fiberCounter`), () => co(0))),
      (To = __name(
        (e) =>
          Array.from(ids(e))
            .map((e) => `#${e}`)
            .join(`,`),
        `threadName`,
      )),
      (Eo = __name(() => {
        let e = lo(wo);
        return (pipe(wo, uo(e + 1)), new Runtime(e, Date.now()));
      }, `unsafeMake`)));
  }),
  Oo,
  ko,
  Ao,
  jo,
  Mo,
  No,
  Po = __esmMin(() => {
    (Do(), (Oo = bo), (ko = xo), (Ao = So), (jo = Co), (Mo = To), (No = Eo));
  }),
  Fo,
  Io,
  Lo,
  Ro,
  zo,
  Bo,
  Vo,
  Ho,
  Uo,
  Wo = __esmMin(() => {
    (Xr(),
      (Fo = Mr),
      (Io = Nr),
      (Lo = Pr),
      (Ro = Fr),
      (zo = Rr),
      (Bo = Br),
      (Vo = Wr),
      (Ho = qr),
      (Uo = Yr));
  }),
  Go,
  toArray,
  getEquivalence,
  Ko,
  qo,
  makeCons,
  Jo,
  Yo,
  Xo,
  isList,
  isNil,
  isCons,
  nil,
  cons,
  Zo,
  of,
  Qo,
  $o,
  es,
  ts,
  reverse,
  ns = __esmMin(() => {
    (H(),
      D(),
      g(),
      l(),
      T(),
      k(),
      A(),
      x(),
      (Go = Symbol.for(`effect/List`)),
      (toArray = (e) => B(e)),
      (getEquivalence = (e) => p(Bn(e), toArray)),
      (Ko = getEquivalence(equals$2)),
      (qo = {
        [Go]: Go,
        _tag: `Cons`,
        toString() {
          return xe(this.toJSON());
        },
        toJSON() {
          return { _id: `List`, _tag: `Cons`, values: toArray(this).map(toJSON) };
        },
        [O]() {
          return this.toJSON();
        },
        [E](e) {
          return isList(e) && this._tag === e._tag && Ko(this, e);
        },
        [S]() {
          return w(this, array(toArray(this)));
        },
        [Symbol.iterator]() {
          let e = !1,
            t = this;
          return {
            next() {
              if (e) return this.return();
              if (t._tag === `Nil`) return ((e = !0), this.return());
              let n = t.head;
              return ((t = t.tail), { done: e, value: n });
            },
            return(t) {
              return ((e ||= !0), { done: !0, value: t });
            },
          };
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (makeCons = (e, t) => {
        let n = Object.create(qo);
        return ((n.head = e), (n.tail = t), n);
      }),
      (Jo = string(`Nil`)),
      (Yo = {
        [Go]: Go,
        _tag: `Nil`,
        toString() {
          return xe(this.toJSON());
        },
        toJSON() {
          return { _id: `List`, _tag: `Nil` };
        },
        [O]() {
          return this.toJSON();
        },
        [S]() {
          return Jo;
        },
        [E](e) {
          return isList(e) && this._tag === e._tag;
        },
        [Symbol.iterator]() {
          return {
            next() {
              return { done: !0, value: void 0 };
            },
          };
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (Xo = Object.create(Yo)),
      (isList = (e) => b(e, Go)),
      (isNil = (e) => e._tag === `Nil`),
      (isCons = (e) => e._tag === `Cons`),
      (nil = () => Xo),
      (cons = (e, t) => makeCons(e, t)),
      (Zo = nil),
      (of = (e) => makeCons(e, Xo)),
      (Qo = dual(2, (e, t) => es(t, e))),
      ($o = dual(2, (e, t) => cons(t, e))),
      (es = dual(2, (e, t) => {
        if (isNil(e)) return t;
        if (isNil(t)) return e;
        {
          let n = makeCons(t.head, e),
            r = n,
            i = t.tail;
          for (; !isNil(i);) {
            let t = makeCons(i.head, e);
            ((r.tail = t), (r = t), (i = i.tail));
          }
          return n;
        }
      })),
      (ts = dual(3, (e, t, n) => {
        let r = t,
          i = e;
        for (; !isNil(i);) ((r = n(r, i.head)), (i = i.tail));
        return r;
      })),
      (reverse = (e) => {
        let t = Zo(),
          n = e;
        for (; !isNil(n);) ((t = $o(t, n.head)), (n = n.tail));
        return t;
      }));
  }),
  rs,
  as = __esmMin(() => {
    (D(),
      T(),
      $e(),
      Array.prototype,
      (rs = (function () {
        function Structural(e) {
          e && Object.assign(this, e);
        }
        return ((Structural.prototype = Ye), Structural);
      })()));
  });
function variance$3(e) {
  return e;
}
var os,
  ss,
  cs,
  ls,
  us,
  ds,
  fs,
  makeAddService,
  ps,
  makeRemoveService,
  ms,
  makeUpdateService,
  hs,
  gs,
  _s,
  vs = __esmMin(() => {
    (lr(),
      D(),
      l(),
      Ca(),
      as(),
      (os = Symbol.for(`effect/DifferContextPatch`)),
      __name(variance$3, `variance`),
      (ss = { ...rs.prototype, [os]: { _Value: variance$3, _Patch: variance$3 } }),
      (cs = Object.create(Object.assign(Object.create(ss), { _tag: `Empty` }))),
      (ls = __name(() => cs, `empty`)),
      (us = Object.assign(Object.create(ss), { _tag: `AndThen` })),
      (ds = __name((e, t) => {
        let n = Object.create(us);
        return ((n.first = e), (n.second = t), n);
      }, `makeAndThen`)),
      (fs = Object.assign(Object.create(ss), { _tag: `AddService` })),
      (makeAddService = (e, t) => {
        let n = Object.create(fs);
        return ((n.key = e), (n.service = t), n);
      }),
      (ps = Object.assign(Object.create(ss), { _tag: `RemoveService` })),
      (makeRemoveService = (e) => {
        let t = Object.create(ps);
        return ((t.key = e), t);
      }),
      (ms = Object.assign(Object.create(ss), { _tag: `UpdateService` })),
      (makeUpdateService = (e, t) => {
        let n = Object.create(ms);
        return ((n.key = e), (n.update = t), n);
      }),
      (hs = __name((e, t) => {
        let n = new Map(e.unsafeMap),
          r = ls();
        for (let [e, i] of t.unsafeMap.entries())
          if (n.has(e)) {
            let t = n.get(e);
            (n.delete(e), equals$2(t, i) || (r = gs(makeUpdateService(e, () => i))(r)));
          } else (n.delete(e), (r = gs(makeAddService(e, i))(r)));
        for (let [e] of n.entries()) r = gs(makeRemoveService(e))(r);
        return r;
      }, `diff`)),
      (gs = dual(2, (e, t) => ds(e, t))),
      (_s = dual(2, (e, t) => {
        if (e._tag === `Empty`) return t;
        let n = !1,
          r = Zn(e),
          i = new Map(t.unsafeMap);
        for (; sr(r);) {
          let e = cr(r),
            t = tailNonEmpty(r);
          switch (e._tag) {
            case `Empty`:
              r = t;
              break;
            case `AddService`:
              (i.set(e.key, e.service), (r = t));
              break;
            case `AndThen`:
              r = rr(rr(t, e.second), e.first);
              break;
            case `RemoveService`:
              (i.delete(e.key), (r = t));
              break;
            case `UpdateService`:
              (i.set(e.key, e.update(i.get(e.key))), (n = !0), (r = t));
              break;
          }
        }
        if (!n) return makeContext(i);
        let a = new Map();
        for (let [e] of t.unsafeMap) i.has(e) && (a.set(e, i.get(e)), i.delete(e));
        for (let [e, t] of i) a.set(e, t);
        return makeContext(a);
      })));
  });
function variance$2(e) {
  return e;
}
var ys,
  bs,
  xs,
  Ss,
  Cs,
  ws,
  Ts,
  makeAdd,
  Es,
  makeRemove,
  Ds,
  Os,
  ks,
  As = __esmMin(() => {
    (lr(),
      l(),
      wi(),
      as(),
      (ys = Symbol.for(`effect/DifferHashSetPatch`)),
      __name(variance$2, `variance`),
      (bs = {
        ...rs.prototype,
        [ys]: { _Value: variance$2, _Key: variance$2, _Patch: variance$2 },
      }),
      (xs = Object.create(Object.assign(Object.create(bs), { _tag: `Empty` }))),
      (Ss = __name(() => xs, `empty`)),
      (Cs = Object.assign(Object.create(bs), { _tag: `AndThen` })),
      (ws = __name((e, t) => {
        let n = Object.create(Cs);
        return ((n.first = e), (n.second = t), n);
      }, `makeAndThen`)),
      (Ts = Object.assign(Object.create(bs), { _tag: `Add` })),
      (makeAdd = (e) => {
        let t = Object.create(Ts);
        return ((t.value = e), t);
      }),
      (Es = Object.assign(Object.create(bs), { _tag: `Remove` })),
      (makeRemove = (e) => {
        let t = Object.create(Es);
        return ((t.value = e), t);
      }),
      (Ds = __name((e, t) => {
        let [n, r] = Ci([e, Ss()], ([e, t], n) =>
          _i(n)(e) ? [bi(n)(e), t] : [e, Os(makeAdd(n))(t)],
        )(t);
        return Ci(r, (e, t) => Os(makeRemove(t))(e))(n);
      }, `diff`)),
      (Os = dual(2, (e, t) => ws(e, t))),
      (ks = dual(2, (e, t) => {
        if (e._tag === `Empty`) return t;
        let n = t,
          r = Zn(e);
        for (; sr(r);) {
          let e = cr(r),
            t = tailNonEmpty(r);
          switch (e._tag) {
            case `Empty`:
              r = t;
              break;
            case `AndThen`:
              r = rr(e.first)(rr(e.second)(t));
              break;
            case `Add`:
              ((n = yi(e.value)(n)), (r = t));
              break;
            case `Remove`:
              ((n = bi(e.value)(n)), (r = t));
          }
        }
        return n;
      })));
  });
function variance$1(e) {
  return e;
}
var js,
  Ms,
  Ns,
  Ps,
  Fs,
  makeAndThen,
  Is,
  makeAppend,
  Ls,
  makeSlice,
  Rs,
  makeUpdate,
  zs,
  Bs,
  Vs,
  Hs = __esmMin(() => {
    (H(),
      D(),
      l(),
      as(),
      (js = Symbol.for(`effect/DifferReadonlyArrayPatch`)),
      __name(variance$1, `variance`),
      (Ms = { ...rs.prototype, [js]: { _Value: variance$1, _Patch: variance$1 } }),
      (Ns = Object.create(Object.assign(Object.create(Ms), { _tag: `Empty` }))),
      (Ps = __name(() => Ns, `empty`)),
      (Fs = Object.assign(Object.create(Ms), { _tag: `AndThen` })),
      (makeAndThen = (e, t) => {
        let n = Object.create(Fs);
        return ((n.first = e), (n.second = t), n);
      }),
      (Is = Object.assign(Object.create(Ms), { _tag: `Append` })),
      (makeAppend = (e) => {
        let t = Object.create(Is);
        return ((t.values = e), t);
      }),
      (Ls = Object.assign(Object.create(Ms), { _tag: `Slice` })),
      (makeSlice = (e, t) => {
        let n = Object.create(Ls);
        return ((n.from = e), (n.until = t), n);
      }),
      (Rs = Object.assign(Object.create(Ms), { _tag: `Update` })),
      (makeUpdate = (e, t) => {
        let n = Object.create(Rs);
        return ((n.index = e), (n.patch = t), n);
      }),
      (zs = __name((e) => {
        let t = 0,
          n = Ps();
        for (; t < e.oldValue.length && t < e.newValue.length;) {
          let r = e.oldValue[t],
            i = e.newValue[t],
            a = e.differ.diff(r, i);
          (equals$2(a, e.differ.empty) || (n = Bs(n, makeUpdate(t, a))), (t += 1));
        }
        return (
          t < e.oldValue.length && (n = Bs(n, makeSlice(0, t))),
          t < e.newValue.length && (n = Bs(n, makeAppend(xn(t)(e.newValue)))),
          n
        );
      }, `diff`)),
      (Bs = dual(2, (e, t) => makeAndThen(e, t))),
      (Vs = dual(3, (e, t, n) => {
        if (e._tag === `Empty`) return t;
        let r = t.slice(),
          i = Pn(e);
        for (; mn(i);) {
          let e = vn(i),
            t = yn(i);
          switch (e._tag) {
            case `Empty`:
              i = t;
              break;
            case `AndThen`:
              (t.unshift(e.first, e.second), (i = t));
              break;
            case `Append`:
              for (let t of e.values) r.push(t);
              i = t;
              break;
            case `Slice`:
              ((r = r.slice(e.from, e.until)), (i = t));
              break;
            case `Update`:
              ((r[e.index] = n.patch(e.patch, r[e.index])), (i = t));
              break;
          }
        }
        return r;
      })));
  }),
  Us,
  Ws,
  Gs,
  environment,
  hashSet,
  readonlyArray,
  Ks,
  updateWith,
  qs = __esmMin(() => {
    (D(),
      l(),
      A(),
      vs(),
      As(),
      Hs(),
      (Us = Symbol.for(`effect/Differ`)),
      (Ws = {
        [Us]: { _P: identity, _V: identity },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (Gs = __name((e) => {
        let t = Object.create(Ws);
        return (
          (t.empty = e.empty), (t.diff = e.diff), (t.combine = e.combine), (t.patch = e.patch), t
        );
      }, `make`)),
      (environment = () =>
        Gs({
          empty: ls(),
          combine: (e, t) => gs(t)(e),
          diff: (e, t) => hs(e, t),
          patch: (e, t) => _s(t)(e),
        })),
      (hashSet = () =>
        Gs({
          empty: Ss(),
          combine: (e, t) => Os(t)(e),
          diff: (e, t) => Ds(e, t),
          patch: (e, t) => ks(t)(e),
        })),
      (readonlyArray = (e) =>
        Gs({
          empty: Ps(),
          combine: (e, t) => Bs(e, t),
          diff: (t, n) => zs({ oldValue: t, newValue: n, differ: e }),
          patch: (t, n) => Vs(t, n, e),
        })),
      (Ks = __name(() => updateWith((e, t) => t), `update`)),
      (updateWith = (e) =>
        Gs({
          empty: identity,
          combine: (e, t) => (e === identity ? t : t === identity ? e : (n) => t(e(n))),
          diff: (e, t) => (equals$2(e, t) ? identity : constant(t)),
          patch: (t, n) => e(n, t(n)),
        })));
  }),
  Js,
  Ys,
  active,
  enabled,
  Xs,
  Zs,
  Qs,
  $s,
  ec,
  tc,
  invert,
  nc = __esmMin(() => {
    (l(),
      (Js = 255),
      (Ys = 8),
      (active = (e) => e & Js),
      (enabled = (e) => (e >> Ys) & Js),
      (Xs = __name((e, t) => (e & Js) + ((t & e & Js) << Ys), `make`)),
      (Zs = Xs(0, 0)),
      (Qs = __name((e) => Xs(e, e), `enable`)),
      ($s = __name((e) => Xs(e, 0), `disable`)),
      (ec = dual(2, (e, t) => Xs(active(e) & ~t, enabled(e)))),
      (tc = dual(2, (e, t) => e | t)),
      (invert = (e) => (~e >>> 0) & Js));
  }),
  cooperativeYielding,
  rc,
  ic,
  interruption,
  ac,
  oc,
  sc,
  runtimeMetrics,
  windDown,
  cc,
  lc,
  uc,
  dc = __esmMin(() => {
    (l(),
      qs(),
      nc(),
      (cooperativeYielding = (e) => ac(e, 32)),
      (rc = dual(2, (e, t) => e | t)),
      (ic = __name((e) => interruption(e) && !windDown(e), `interruptible`)),
      (interruption = (e) => ac(e, 1)),
      (ac = dual(2, (e, t) => (e & t) !== 0)),
      (oc = __name((...e) => e.reduce((e, t) => e | t, 0), `make`)),
      (sc = oc(0)),
      (runtimeMetrics = (e) => ac(e, 4)),
      (windDown = (e) => ac(e, 16)),
      (cc = dual(2, (e, t) => Xs(e ^ t, t))),
      (lc = dual(2, (e, t) => (e & (invert(active(t)) | enabled(t))) | (active(t) & enabled(t)))),
      (uc = Gs({
        empty: Zs,
        diff: (e, t) => cc(e, t),
        combine: (e, t) => tc(t)(e),
        patch: (e, t) => lc(t, e),
      })));
  }),
  fc,
  pc,
  mc,
  hc = __esmMin(() => {
    (nc(), (fc = Qs), (pc = $s), (mc = ec));
  }),
  par,
  seq,
  gc,
  _c,
  merge,
  vc,
  yc,
  ParallelImpl,
  parallelCollectionEmpty,
  parallelCollectionAdd,
  parallelCollectionCombine,
  parallelCollectionIsEmpty,
  parallelCollectionKeys,
  parallelCollectionToSequentialCollection,
  bc,
  xc,
  SequentialImpl,
  sequentialCollectionMake,
  sequentialCollectionCombine,
  sequentialCollectionKeys,
  sequentialCollectionToChunk,
  Sc = __esmMin(() => {
    (lr(),
      D(),
      Wo(),
      ns(),
      z(),
      (par = (e, t) => ({ _tag: `Par`, left: e, right: t })),
      (seq = (e, t) => ({ _tag: `Seq`, left: e, right: t })),
      (gc = __name((e) => {
        let t = of(e),
          n = Zo();
        for (;;) {
          let [e, r] = ts(t, [parallelCollectionEmpty(), Zo()], ([e, t], n) => {
            let [r, i] = _c(n);
            return [parallelCollectionCombine(e, r), Qo(t, i)];
          });
          if (((n = merge(n, e)), isNil(r))) return reverse(n);
          t = r;
        }
        throw Error(
          `BUG: BlockedRequests.flatten - please report an issue at https://github.com/Effect-TS/effect/issues`,
        );
      }, `flatten`)),
      (_c = __name((e) => {
        let t = e,
          n = parallelCollectionEmpty(),
          r = Zo(),
          i = Zo();
        for (;;)
          switch (t._tag) {
            case `Empty`:
              if (isNil(r)) return [n, i];
              ((t = r.head), (r = r.tail));
              break;
            case `Par`:
              ((r = cons(t.right, r)), (t = t.left));
              break;
            case `Seq`: {
              let e = t.left,
                n = t.right;
              switch (e._tag) {
                case `Empty`:
                  t = n;
                  break;
                case `Par`: {
                  let r = e.left,
                    i = e.right;
                  t = par(seq(r, n), seq(i, n));
                  break;
                }
                case `Seq`: {
                  let r = e.left,
                    i = e.right;
                  t = seq(r, seq(i, n));
                  break;
                }
                case `Single`:
                  ((t = e), (i = cons(n, i)));
                  break;
              }
              break;
            }
            case `Single`:
              if (((n = parallelCollectionAdd(n, t)), isNil(r))) return [n, i];
              ((t = r.head), (r = r.tail));
              break;
          }
        throw Error(
          `BUG: BlockedRequests.step - please report an issue at https://github.com/Effect-TS/effect/issues`,
        );
      }, `step`)),
      (merge = (e, t) => {
        if (isNil(e)) return of(parallelCollectionToSequentialCollection(t));
        if (parallelCollectionIsEmpty(t)) return e;
        let n = sequentialCollectionKeys(e.head),
          r = parallelCollectionKeys(t);
        return n.length === 1 && r.length === 1 && equals$2(n[0], r[0])
          ? cons(
              sequentialCollectionCombine(e.head, parallelCollectionToSequentialCollection(t)),
              e.tail,
            )
          : cons(parallelCollectionToSequentialCollection(t), e);
      }),
      (vc = Symbol.for(`effect/RequestBlock/RequestBlockParallel`)),
      (yc = { _R: (e) => e }),
      (ParallelImpl = class {
        map;
        [vc] = yc;
        constructor(e) {
          this.map = e;
        }
      }),
      (parallelCollectionEmpty = () => new ParallelImpl(Fo())),
      (parallelCollectionAdd = (e, t) =>
        new ParallelImpl(
          Vo(e.map, t.dataSource, (e) =>
            Ut(Kt(e, nr(t.blockedRequest)), () => Zn(t.blockedRequest)),
          ),
        )),
      (parallelCollectionCombine = (e, t) =>
        new ParallelImpl(
          Uo(e.map, t.map, (e, t, n) =>
            zo(e, n, L(Ro(e, n), { onNone: () => t, onSome: (e) => ar(t, e) })),
          ),
        )),
      (parallelCollectionIsEmpty = (e) => Lo(e.map)),
      (parallelCollectionKeys = (e) => Array.from(Bo(e.map))),
      (parallelCollectionToSequentialCollection = (e) =>
        sequentialCollectionMake(Ho(e.map, (e) => Zn(e)))),
      (bc = Symbol.for(`effect/RequestBlock/RequestBlockSequential`)),
      (xc = { _R: (e) => e }),
      (SequentialImpl = class {
        map;
        [bc] = xc;
        constructor(e) {
          this.map = e;
        }
      }),
      (sequentialCollectionMake = (e) => new SequentialImpl(e)),
      (sequentialCollectionCombine = (e, t) =>
        new SequentialImpl(
          Uo(t.map, e.map, (e, t, n) =>
            zo(e, n, L(Ro(e, n), { onNone: () => Yn(), onSome: (e) => ar(e, t) })),
          ),
        )),
      (sequentialCollectionKeys = (e) => Array.from(Bo(e.map))),
      (sequentialCollectionToChunk = (e) => Array.from(e.map)));
  }),
  Cc,
  wc,
  Tc = __esmMin(() => {
    ((Cc = `Pending`), (wc = `Done`));
  }),
  Ec,
  Dc,
  Oc,
  pending,
  kc,
  Ac = __esmMin(() => {
    (Tc(),
      (Ec = `effect/Deferred`),
      (Dc = Symbol.for(Ec)),
      (Oc = { _E: (e) => e, _A: (e) => e }),
      (pending = (e) => ({ _tag: Cc, joiners: e })),
      (kc = __name((e) => ({ _tag: wc, effect: e }), `done`)));
  }),
  jc,
  Mc = __esmMin(() => {
    jc = class SingleShotGen {
      self;
      called = !1;
      constructor(e) {
        this.self = e;
      }
      next(e) {
        return this.called
          ? { value: e, done: !0 }
          : ((this.called = !0), { value: this.self, done: !1 });
      }
      return(e) {
        return { value: e, done: !0 };
      }
      throw(e) {
        throw e;
      }
      [Symbol.iterator]() {
        return new SingleShotGen(this.self);
      }
    };
  }),
  blocked,
  runRequestBlock,
  Nc,
  RevertFlags,
  EffectPrimitive,
  EffectPrimitiveFailure,
  EffectPrimitiveSuccess,
  Pc,
  withFiberRuntime,
  Fc,
  Ic,
  asVoid,
  custom,
  unsafeAsync,
  asyncInterrupt,
  async_,
  Lc,
  Rc,
  zc,
  Bc,
  capture,
  Vc,
  dieMessage,
  Hc,
  exit,
  Uc,
  failSync,
  Wc,
  Gc,
  Kc,
  fiberIdWith,
  U,
  step,
  qc,
  Jc,
  Yc,
  Xc,
  Zc,
  Qc,
  $c,
  el,
  tl,
  nl,
  rl,
  il,
  W,
  G,
  K,
  al,
  transplant,
  uninterruptible,
  ol,
  sl,
  updateRuntimeFlags,
  whileLoop,
  fromIterator,
  cl,
  ll,
  ul,
  dl,
  fl,
  interruptFiber,
  pl,
  ml,
  hl,
  gl,
  _l,
  vl,
  yl,
  bl,
  xl,
  Sl,
  Cl,
  wl,
  fiberRefGet,
  Tl,
  El,
  Dl,
  Ol,
  kl,
  fiberRefUnsafeMake,
  fiberRefUnsafeMakeHashSet,
  fiberRefUnsafeMakeReadonlyArray,
  fiberRefUnsafeMakeContext,
  fiberRefUnsafeMakePatch,
  fiberRefUnsafeMakeRuntimeFlags,
  Al,
  jl,
  Ml,
  Nl,
  Pl,
  Fl,
  Il,
  Ll,
  Rl,
  zl,
  Bl,
  Vl,
  Hl,
  Ul,
  Wl,
  Gl,
  scopeAddFinalizer,
  scopeClose,
  scopeFork,
  Kl,
  makeException,
  ql,
  Jl,
  Yl,
  isInterruptedException,
  Xl,
  Zl,
  Ql,
  $l,
  eu,
  tu,
  exitIsExit,
  exitIsFailure,
  exitIsSuccess,
  nu,
  exitAsVoid,
  exitCollectAll,
  ru,
  exitFail,
  q,
  iu,
  au,
  ou,
  J,
  su,
  cu,
  exitCollectAllInternal,
  deferredUnsafeMake,
  deferredAwait,
  deferredUnsafeDone,
  deferredInterruptJoiner,
  lu,
  context,
  contextWithEffect,
  uu,
  du,
  currentSpanFromFiber,
  Y = __esmMin(() => {
    (H(),
      lr(),
      Pa(),
      Nt(),
      D(),
      Po(),
      l(),
      y(),
      T(),
      Wo(),
      k(),
      ns(),
      fo(),
      z(),
      A(),
      x(),
      hc(),
      _e(),
      ra(),
      Ac(),
      qs(),
      $e(),
      re(),
      Tc(),
      Re(),
      dc(),
      Mc(),
      (blocked = (e, t) => {
        let n = new EffectPrimitive(`Blocked`);
        return ((n.effect_instruction_i0 = e), (n.effect_instruction_i1 = t), n);
      }),
      (runRequestBlock = (e) => {
        let t = new EffectPrimitive(`RunBlocked`);
        return ((t.effect_instruction_i0 = e), t);
      }),
      (Nc = Symbol.for(`effect/Effect`)),
      (RevertFlags = class {
        patch;
        op;
        _op = Le;
        constructor(e, t) {
          ((this.patch = e), (this.op = t));
        }
      }),
      (EffectPrimitive = class {
        _op;
        effect_instruction_i0 = void 0;
        effect_instruction_i1 = void 0;
        effect_instruction_i2 = void 0;
        trace = void 0;
        [Nc] = Ge;
        constructor(e) {
          this._op = e;
        }
        [E](e) {
          return this === e;
        }
        [S]() {
          return w(this, random(this));
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
        toJSON() {
          return {
            _id: `Effect`,
            _op: this._op,
            effect_instruction_i0: toJSON(this.effect_instruction_i0),
            effect_instruction_i1: toJSON(this.effect_instruction_i1),
            effect_instruction_i2: toJSON(this.effect_instruction_i2),
          };
        }
        toString() {
          return xe(this.toJSON());
        }
        [O]() {
          return this.toJSON();
        }
        [Symbol.iterator]() {
          return new jc(new YieldWrap(this));
        }
      }),
      (EffectPrimitiveFailure = class {
        _op;
        effect_instruction_i0 = void 0;
        effect_instruction_i1 = void 0;
        effect_instruction_i2 = void 0;
        trace = void 0;
        [Nc] = Ge;
        constructor(e) {
          ((this._op = e), (this._tag = e));
        }
        [E](e) {
          return (
            exitIsExit(e) &&
            e._op === `Failure` &&
            equals$2(this.effect_instruction_i0, e.effect_instruction_i0)
          );
        }
        [S]() {
          return pipe(string(this._tag), C(hash(this.effect_instruction_i0)), w(this));
        }
        get cause() {
          return this.effect_instruction_i0;
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
        toJSON() {
          return { _id: `Exit`, _tag: this._op, cause: this.cause.toJSON() };
        }
        toString() {
          return xe(this.toJSON());
        }
        [O]() {
          return this.toJSON();
        }
        [Symbol.iterator]() {
          return new jc(new YieldWrap(this));
        }
      }),
      (EffectPrimitiveSuccess = class {
        _op;
        effect_instruction_i0 = void 0;
        effect_instruction_i1 = void 0;
        effect_instruction_i2 = void 0;
        trace = void 0;
        [Nc] = Ge;
        constructor(e) {
          ((this._op = e), (this._tag = e));
        }
        [E](e) {
          return (
            exitIsExit(e) &&
            e._op === `Success` &&
            equals$2(this.effect_instruction_i0, e.effect_instruction_i0)
          );
        }
        [S]() {
          return pipe(string(this._tag), C(hash(this.effect_instruction_i0)), w(this));
        }
        get value() {
          return this.effect_instruction_i0;
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
        toJSON() {
          return { _id: `Exit`, _tag: this._op, value: toJSON(this.value) };
        }
        toString() {
          return xe(this.toJSON());
        }
        [O]() {
          return this.toJSON();
        }
        [Symbol.iterator]() {
          return new jc(new YieldWrap(this));
        }
      }),
      (Pc = __name((e) => b(e, Nc), `isEffect`)),
      (withFiberRuntime = (e) => {
        let t = new EffectPrimitive(Fe);
        return ((t.effect_instruction_i0 = e), t);
      }),
      (Fc = dual(3, (e, t, n) =>
        ol((r) =>
          U(e, (e) =>
            U(exit(G(() => r(t(e)))), (t) =>
              G(() => n(e, t)).pipe(
                Yc({
                  onFailure: (e) => {
                    switch (t._tag) {
                      case Ee:
                        return Wc(zi(t.effect_instruction_i0, e));
                      case Ae:
                        return Wc(e);
                    }
                  },
                  onSuccess: () => t,
                }),
              ),
            ),
          ),
        ),
      )),
      (Ic = dual(2, (e, t) => U(e, () => W(t)))),
      (asVoid = (e) => Ic(e, void 0)),
      (custom = function () {
        let e = new EffectPrimitive(Te);
        switch (arguments.length) {
          case 2:
            ((e.effect_instruction_i0 = arguments[0]), (e.commit = arguments[1]));
            break;
          case 3:
            ((e.effect_instruction_i0 = arguments[0]),
              (e.effect_instruction_i1 = arguments[1]),
              (e.commit = arguments[2]));
            break;
          case 4:
            ((e.effect_instruction_i0 = arguments[0]),
              (e.effect_instruction_i1 = arguments[1]),
              (e.effect_instruction_i2 = arguments[2]),
              (e.commit = arguments[3]));
            break;
          default:
            throw Error(getBugErrorMessage(`you're not supposed to end up here`));
        }
        return e;
      }),
      (unsafeAsync = (e, t = Oo) => {
        let n = new EffectPrimitive(we),
          r;
        return (
          (n.effect_instruction_i0 = (t) => {
            r = e(t);
          }),
          (n.effect_instruction_i1 = t),
          il(n, (e) => (Pc(r) ? r : sl))
        );
      }),
      (asyncInterrupt = (e, t = Oo) => G(() => unsafeAsync(e, t))),
      (async_ = (e, t = Oo) =>
        custom(e, function () {
          let e, n;
          function proxyResume(t) {
            e ? e(t) : n === void 0 && (n = t);
          }
          let r = new EffectPrimitive(we);
          ((r.effect_instruction_i0 = (t) => {
            ((e = t), n && t(n));
          }),
            (r.effect_instruction_i1 = t));
          let i, a;
          return (
            this.effect_instruction_i0.length === 1
              ? (i = ge(() => this.effect_instruction_i0(proxyResume)))
              : ((a = new AbortController()),
                (i = ge(() => this.effect_instruction_i0(proxyResume, a.signal)))),
            i || a ? il(r, (e) => (a && a.abort(), i ?? sl)) : r
          );
        })),
      (Lc = dual(2, (e, t) => {
        let n = new EffectPrimitive(De);
        return ((n.effect_instruction_i0 = e), (n.effect_instruction_i1 = t), n);
      })),
      (Rc = dual(2, (e, t) => Xc(e, { onFailure: t, onSuccess: W }))),
      (zc = dual(3, (e, t, n) =>
        Lc(e, (e) => {
          let r = failureOrCause(e);
          switch (r._tag) {
            case `Left`:
              return t(r.left) ? n(r.left) : Wc(e);
            case `Right`:
              return Wc(r.right);
          }
        }),
      )),
      (Bc = Symbol.for(`effect/OriginalAnnotation`)),
      (capture = (e, t) =>
        I(t)
          ? new Proxy(e, {
              has(e, t) {
                return t === ta || t === Bc || t in e;
              },
              get(n, r) {
                return r === ta ? t.value : r === Bc ? e : n[r];
              },
            })
          : e),
      (Vc = __name(
        (e) =>
          te(e) && !(ta in e)
            ? withFiberRuntime((t) => Wc(Li(capture(e, currentSpanFromFiber(t)))))
            : Wc(Li(e)),
        `die`,
      )),
      (dieMessage = (e) => Gc(() => Li(new Jl(e)))),
      (Hc = __name(
        (e) => Xc(e, { onFailure: (e) => W(M(e)), onSuccess: (e) => W(j(e)) }),
        `either`,
      )),
      (exit = (e) => Jc(e, { onFailure: q, onSuccess: J })),
      (Uc = __name(
        (e) =>
          te(e) && !(ta in e)
            ? withFiberRuntime((t) => Wc(Ii(capture(e, currentSpanFromFiber(t)))))
            : Wc(Ii(e)),
        `fail`,
      )),
      (failSync = (e) => U(K(e), Uc)),
      (Wc = __name((e) => {
        let t = new EffectPrimitiveFailure(Ee);
        return ((t.effect_instruction_i0 = e), t);
      }, `failCause`)),
      (Gc = __name((e) => U(K(e), Wc), `failCauseSync`)),
      (Kc = withFiberRuntime((e) => W(e.id()))),
      (fiberIdWith = (e) => withFiberRuntime((t) => e(t.id()))),
      (U = dual(2, (e, t) => {
        let n = new EffectPrimitive(Oe);
        return ((n.effect_instruction_i0 = e), (n.effect_instruction_i1 = t), n);
      })),
      (step = (e) => {
        let t = new EffectPrimitive(`OnStep`);
        return ((t.effect_instruction_i0 = e), t);
      }),
      (qc = __name((e) => U(e, identity), `flatten`)),
      (Jc = dual(2, (e, t) =>
        Yc(e, { onFailure: (e) => W(t.onFailure(e)), onSuccess: (e) => W(t.onSuccess(e)) }),
      )),
      (Yc = dual(2, (e, t) => {
        let n = new EffectPrimitive(ke);
        return (
          (n.effect_instruction_i0 = e),
          (n.effect_instruction_i1 = t.onFailure),
          (n.effect_instruction_i2 = t.onSuccess),
          n
        );
      })),
      (Xc = dual(2, (e, t) =>
        Yc(e, {
          onFailure: (e) => {
            if (defects(e).length > 0) return Wc(electFailures(e));
            let n = failures(e);
            return n.length > 0 ? t.onFailure(unsafeHead(n)) : Wc(e);
          },
          onSuccess: t.onSuccess,
        }),
      )),
      (Zc = dual(2, (e, t) =>
        G(() => {
          let n = B(e),
            r = allocate(n.length),
            i = 0;
          return Ic(
            whileLoop({
              while: () => i < n.length,
              body: () => t(n[i], i),
              step: (e) => {
                r[i++] = e;
              },
            }),
            r,
          );
        }),
      )),
      (Qc = dual(2, (e, t) =>
        G(() => {
          let n = B(e),
            r = 0;
          return whileLoop({
            while: () => r < n.length,
            body: () => t(n[r], r),
            step: () => {
              r++;
            },
          });
        }),
      )),
      ($c = __name((e) => {
        let t = new EffectPrimitive(Me);
        return ((t.effect_instruction_i0 = fc(1)), (t.effect_instruction_i1 = () => e), t);
      }, `interruptible`)),
      (el = dual(2, (e, t) => U(e, (e) => K(() => t(e))))),
      (tl = dual(2, (e, t) =>
        Xc(e, {
          onFailure: (e) => failSync(() => t.onFailure(e)),
          onSuccess: (e) => K(() => t.onSuccess(e)),
        }),
      )),
      (nl = dual(2, (e, t) =>
        Yc(e, {
          onFailure: (e) => {
            let n = failureOrCause(e);
            switch (n._tag) {
              case `Left`:
                return failSync(() => t(n.left));
              case `Right`:
                return Wc(n.right);
            }
          },
          onSuccess: W,
        }),
      )),
      (rl = dual(2, (e, t) =>
        ol((n) =>
          Yc(n(e), {
            onFailure: (e) => {
              let n = q(e);
              return Yc(t(n), { onFailure: (t) => q(zi(e, t)), onSuccess: () => n });
            },
            onSuccess: (e) => {
              let n = J(e);
              return fl(t(n), n);
            },
          }),
        ),
      )),
      (il = dual(2, (e, t) =>
        rl(
          e,
          ou({ onFailure: (e) => (Hi(e) ? asVoid(t(interruptors(e))) : sl), onSuccess: () => sl }),
        ),
      )),
      (W = __name((e) => {
        let t = new EffectPrimitiveSuccess(Ae);
        return ((t.effect_instruction_i0 = e), t);
      }, `succeed`)),
      (G = __name((e) => {
        let t = new EffectPrimitive(Te);
        return ((t.commit = e), t);
      }, `suspend`)),
      (K = __name((e) => {
        let t = new EffectPrimitive(je);
        return ((t.effect_instruction_i0 = e), t);
      }, `sync`)),
      (al = dual(
        (e) => e.length === 3 || (e.length === 2 && !(te(e[1]) && `onlyEffect` in e[1])),
        (e, t) =>
          U(e, (e) => {
            let n = typeof t == `function` ? t(e) : t;
            return Pc(n)
              ? Ic(n, e)
              : isPromiseLike(n)
                ? unsafeAsync((t) => {
                    n.then(
                      (n) => t(W(e)),
                      (e) => t(Uc(new tu(e, `An unknown error occurred in Effect.tap`))),
                    );
                  })
                : W(e);
          }),
      )),
      (transplant = (e) =>
        withFiberRuntime((t) => {
          let n = pipe(
            t.getFiberRef(Hl),
            R(() => t.scope()),
          );
          return e(Ol(Hl, P(n)));
        })),
      (uninterruptible = (e) => {
        let t = new EffectPrimitive(Me);
        return ((t.effect_instruction_i0 = pc(1)), (t.effect_instruction_i1 = () => e), t);
      }),
      (ol = __name(
        (e) =>
          custom(e, function () {
            let e = new EffectPrimitive(Me);
            return (
              (e.effect_instruction_i0 = pc(1)),
              (e.effect_instruction_i1 = (e) =>
                interruption(e)
                  ? ge(() => this.effect_instruction_i0($c))
                  : ge(() => this.effect_instruction_i0(uninterruptible))),
              e
            );
          }),
        `uninterruptibleMask`,
      )),
      (sl = W(void 0)),
      (updateRuntimeFlags = (e) => {
        let t = new EffectPrimitive(Me);
        return ((t.effect_instruction_i0 = e), (t.effect_instruction_i1 = void 0), t);
      }),
      (whileLoop = (e) => {
        let t = new EffectPrimitive(Ne);
        return (
          (t.effect_instruction_i0 = e.while),
          (t.effect_instruction_i1 = e.body),
          (t.effect_instruction_i2 = e.step),
          t
        );
      }),
      (fromIterator = (e) =>
        G(() => {
          let t = new EffectPrimitive(Pe);
          return ((t.effect_instruction_i0 = e()), t);
        })),
      (cl = __name(function () {
        let e = arguments.length === 1 ? arguments[0] : arguments[1].bind(arguments[0]);
        return fromIterator(() => e(pipe));
      }, `gen`)),
      (ll = __name((e) => {
        let t = new EffectPrimitive(Ie);
        return e?.priority === void 0 ? t : Il(t, e.priority);
      }, `yieldNow`)),
      (ul = dual(2, (e, t) => U(e, (e) => el(t, (t) => [e, t])))),
      (dl = dual(2, (e, t) => U(e, (e) => Ic(t, e)))),
      (fl = dual(2, (e, t) => U(e, () => t))),
      (interruptFiber = (e) => U(Kc, (t) => pipe(e, pl(t)))),
      (pl = dual(2, (e, t) => U(e.interruptAsFork(t), () => e.await))),
      (ml = {
        _tag: `All`,
        syslog: 0,
        label: `ALL`,
        ordinal: -(2 ** 53 - 1),
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (hl = {
        _tag: `Fatal`,
        syslog: 2,
        label: `FATAL`,
        ordinal: 5e4,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (gl = {
        _tag: `Error`,
        syslog: 3,
        label: `ERROR`,
        ordinal: 4e4,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (_l = {
        _tag: `Warning`,
        syslog: 4,
        label: `WARN`,
        ordinal: 3e4,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (vl = {
        _tag: `Info`,
        syslog: 6,
        label: `INFO`,
        ordinal: 2e4,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (yl = {
        _tag: `Debug`,
        syslog: 7,
        label: `DEBUG`,
        ordinal: 1e4,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (bl = {
        _tag: `Trace`,
        syslog: 7,
        label: `TRACE`,
        ordinal: 0,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (xl = {
        _tag: `None`,
        syslog: 7,
        label: `OFF`,
        ordinal: 2 ** 53 - 1,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (Sl = `effect/FiberRef`),
      (Cl = Symbol.for(Sl)),
      (wl = { _A: (e) => e }),
      (fiberRefGet = (e) => withFiberRuntime((t) => J(t.getFiberRef(e)))),
      (Tl = dual(2, (e, t) => U(fiberRefGet(e), t))),
      (El = dual(2, (e, t) => Dl(e, () => [void 0, t]))),
      (Dl = dual(2, (e, t) =>
        withFiberRuntime((n) => {
          let [r, i] = t(n.getFiberRef(e));
          return (n.setFiberRef(e, i), W(r));
        }),
      )),
      (Ol = dual(3, (e, t, n) =>
        Fc(
          dl(fiberRefGet(t), El(t, n)),
          () => e,
          (e) => El(t, e),
        ),
      )),
      (kl = dual(3, (e, t, n) => Tl(t, (r) => Ol(e, t, n(r))))),
      (fiberRefUnsafeMake = (e, t) =>
        fiberRefUnsafeMakePatch(e, { differ: Ks(), fork: t?.fork ?? identity, join: t?.join })),
      (fiberRefUnsafeMakeHashSet = (e) => {
        let t = hashSet();
        return fiberRefUnsafeMakePatch(e, { differ: t, fork: t.empty });
      }),
      (fiberRefUnsafeMakeReadonlyArray = (e) => {
        let t = readonlyArray(Ks());
        return fiberRefUnsafeMakePatch(e, { differ: t, fork: t.empty });
      }),
      (fiberRefUnsafeMakeContext = (e) => {
        let t = environment();
        return fiberRefUnsafeMakePatch(e, { differ: t, fork: t.empty });
      }),
      (fiberRefUnsafeMakePatch = (e, t) => ({
        ...Xe,
        [Cl]: wl,
        initial: e,
        commit() {
          return fiberRefGet(this);
        },
        diff: (e, n) => t.differ.diff(e, n),
        combine: (e, n) => t.differ.combine(e, n),
        patch: (e) => (n) => t.differ.patch(e, n),
        fork: t.fork,
        join: t.join ?? ((e, t) => t),
      })),
      (fiberRefUnsafeMakeRuntimeFlags = (e) =>
        fiberRefUnsafeMakePatch(e, { differ: uc, fork: uc.empty })),
      (Al = globalValue(Symbol.for(`effect/FiberRef/currentContext`), () =>
        fiberRefUnsafeMakeContext(Ta()),
      )),
      (jl = globalValue(Symbol.for(`effect/FiberRef/currentSchedulingPriority`), () =>
        fiberRefUnsafeMake(0),
      )),
      (Ml = globalValue(Symbol.for(`effect/FiberRef/currentMaxOpsBeforeYield`), () =>
        fiberRefUnsafeMake(2048),
      )),
      (Nl = globalValue(Symbol.for(`effect/FiberRef/currentLogAnnotation`), () =>
        fiberRefUnsafeMake(Fo()),
      )),
      (Pl = globalValue(Symbol.for(`effect/FiberRef/currentLogLevel`), () =>
        fiberRefUnsafeMake(vl),
      )),
      (Fl = globalValue(Symbol.for(`effect/FiberRef/currentLogSpan`), () =>
        fiberRefUnsafeMake(Zo()),
      )),
      (Il = dual(2, (e, t) => Ol(e, jl, t))),
      (Ll = globalValue(Symbol.for(`effect/FiberRef/currentConcurrency`), () =>
        fiberRefUnsafeMake(`unbounded`),
      )),
      (Rl = globalValue(Symbol.for(`effect/FiberRef/currentRequestBatching`), () =>
        fiberRefUnsafeMake(!0),
      )),
      (zl = globalValue(Symbol.for(`effect/FiberRef/currentUnhandledErrorLogLevel`), () =>
        fiberRefUnsafeMake(P(yl)),
      )),
      (Bl = globalValue(Symbol.for(`effect/FiberRef/versionMismatchErrorLogLevel`), () =>
        fiberRefUnsafeMake(P(_l)),
      )),
      (Vl = globalValue(Symbol.for(`effect/FiberRef/currentMetricLabels`), () =>
        fiberRefUnsafeMakeReadonlyArray(Nn()),
      )),
      (Hl = globalValue(Symbol.for(`effect/FiberRef/currentForkScopeOverride`), () =>
        fiberRefUnsafeMake(N(), { fork: () => N(), join: (e, t) => e }),
      )),
      (Ul = globalValue(Symbol.for(`effect/FiberRef/currentInterruptedCause`), () =>
        fiberRefUnsafeMake(Fi, { fork: () => Fi, join: (e, t) => e }),
      )),
      (Wl = Symbol.for(`effect/Scope`)),
      (Gl = Symbol.for(`effect/CloseableScope`)),
      (scopeAddFinalizer = (e, t) => e.addFinalizer(() => asVoid(t))),
      (scopeClose = (e, t) => e.close(t)),
      (scopeFork = (e, t) => e.fork(t)),
      (Kl = (function () {
        class YieldableError extends globalThis.Error {
          commit() {
            return Uc(this);
          }
          toJSON() {
            let e = { ...this };
            return (
              this.message && (e.message = this.message), this.cause && (e.cause = this.cause), e
            );
          }
          [O]() {
            return this.toString === globalThis.Error.prototype.toString
              ? `Bun` in globalThis
                ? Qi(Ii(this), { renderErrorCause: !0 })
                : this
              : this.stack
                ? `${this.toString()}\n${this.stack
                    .split(`
`)
                    .slice(1).join(`
`)}`
                : this.toString();
          }
        }
        return (Object.assign(YieldableError.prototype, Ze), YieldableError);
      })()),
      (makeException = (e, t) => {
        class Base extends Kl {
          _tag = t;
        }
        return (Object.assign(Base.prototype, e), (Base.prototype.name = t), Base);
      }),
      (ql = Symbol.for(`effect/Cause/errors/RuntimeException`)),
      (Jl = makeException({ [ql]: ql }, `RuntimeException`)),
      (Yl = Symbol.for(`effect/Cause/errors/InterruptedException`)),
      (isInterruptedException = (e) => b(e, Yl)),
      (Xl = Symbol.for(`effect/Cause/errors/IllegalArgument`)),
      (Zl = makeException({ [Xl]: Xl }, `IllegalArgumentException`)),
      (Ql = Symbol.for(`effect/Cause/errors/NoSuchElement`)),
      ($l = makeException({ [Ql]: Ql }, `NoSuchElementException`)),
      (eu = Symbol.for(`effect/Cause/errors/UnknownException`)),
      (tu = (function () {
        class UnknownException extends Kl {
          _tag = `UnknownException`;
          error;
          constructor(e, t) {
            (super(t ?? `An unknown error occurred`, { cause: e }), (this.error = e));
          }
        }
        return (
          Object.assign(UnknownException.prototype, { [eu]: eu, name: `UnknownException` }),
          UnknownException
        );
      })()),
      (exitIsExit = (e) => Pc(e) && `_tag` in e && (e._tag === `Success` || e._tag === `Failure`)),
      (exitIsFailure = (e) => e._tag === `Failure`),
      (exitIsSuccess = (e) => e._tag === `Success`),
      (nu = dual(2, (e, t) => {
        switch (e._tag) {
          case Ee:
            return q(e.effect_instruction_i0);
          case Ae:
            return J(t);
        }
      })),
      (exitAsVoid = (e) => nu(e, void 0)),
      (exitCollectAll = (e, t) => exitCollectAllInternal(e, t?.parallel ? Ri : zi)),
      (ru = __name((e) => q(Li(e)), `exitDie`)),
      (exitFail = (e) => q(Ii(e))),
      (q = __name((e) => {
        let t = new EffectPrimitiveFailure(Ee);
        return ((t.effect_instruction_i0 = e), t);
      }, `exitFailCause`)),
      (iu = __name((e) => q(interrupt(e)), `exitInterrupt`)),
      (au = dual(2, (e, t) => {
        switch (e._tag) {
          case Ee:
            return q(e.effect_instruction_i0);
          case Ae:
            return J(t(e.effect_instruction_i0));
        }
      })),
      (ou = dual(2, (e, { onFailure: t, onSuccess: n }) => {
        switch (e._tag) {
          case Ee:
            return t(e.effect_instruction_i0);
          case Ae:
            return n(e.effect_instruction_i0);
        }
      })),
      (J = __name((e) => {
        let t = new EffectPrimitiveSuccess(Ae);
        return ((t.effect_instruction_i0 = e), t);
      }, `exitSucceed`)),
      (su = J(void 0)),
      (cu = dual(3, (e, t, { onFailure: n, onSuccess: r }) => {
        switch (e._tag) {
          case Ee:
            switch (t._tag) {
              case Ae:
                return q(e.effect_instruction_i0);
              case Ee:
                return q(n(e.effect_instruction_i0, t.effect_instruction_i0));
            }
          case Ae:
            switch (t._tag) {
              case Ae:
                return J(r(e.effect_instruction_i0, t.effect_instruction_i0));
              case Ee:
                return q(t.effect_instruction_i0);
            }
        }
      })),
      (exitCollectAllInternal = (e, t) => {
        let n = Qn(e);
        return sr(n)
          ? pipe(
              tailNonEmpty(n),
              zn(pipe(cr(n), au(Zn)), (e, n) =>
                pipe(e, cu(n, { onSuccess: (e, t) => pipe(e, rr(t)), onFailure: t })),
              ),
              au(er),
              au((e) => $n(e)),
              P,
            )
          : N();
      }),
      (deferredUnsafeMake = (e) => ({
        ...Xe,
        [Dc]: Oc,
        state: co(pending([])),
        commit() {
          return deferredAwait(this);
        },
        blockingOn: e,
      })),
      (deferredAwait = (e) =>
        asyncInterrupt((t) => {
          let n = lo(e.state);
          switch (n._tag) {
            case wc:
              return t(n.effect);
            case Cc:
              return (n.joiners.push(t), deferredInterruptJoiner(e, t));
          }
        }, e.blockingOn)),
      (deferredUnsafeDone = (e, t) => {
        let n = lo(e.state);
        if (n._tag === `Pending`) {
          uo(e.state, kc(t));
          for (let e = 0, r = n.joiners.length; e < r; e++) n.joiners[e](t);
        }
      }),
      (deferredInterruptJoiner = (e, t) =>
        K(() => {
          let n = lo(e.state);
          if (n._tag === `Pending`) {
            let e = n.joiners.indexOf(t);
            e >= 0 && n.joiners.splice(e, 1);
          }
        })),
      (lu = withFiberRuntime((e) => J(e.currentContext))),
      (context = () => lu),
      (contextWithEffect = (e) => U(context(), e)),
      (uu = dual(2, (e, t) => Ol(Al, t)(e))),
      (du = dual(2, (e, t) => contextWithEffect((n) => uu(e, t(n))))),
      (currentSpanFromFiber = (e) => {
        let t = e.currentSpan;
        return t !== void 0 && t._tag === `Span` ? P(t) : N();
      }));
  }),
  fu,
  pu,
  mu,
  hu,
  gu,
  _u,
  vu,
  ClockImpl,
  yu,
  bu = __esmMin(() => {
    (Pa(),
      ao(),
      l(),
      Y(),
      (fu = `effect/Clock`),
      (pu = Symbol.for(fu)),
      (mu = wa(`effect/Clock`)),
      (hu = 2 ** 31 - 1),
      (gu = {
        unsafeSchedule(e, t) {
          let n = toMillis(t);
          if (n > hu) return o;
          let r = !1,
            i = setTimeout(() => {
              ((r = !0), e());
            }, n);
          return () => (clearTimeout(i), !r);
        },
      }),
      (_u = (function () {
        let e = BigInt(1e6);
        if (typeof performance > `u` || typeof performance.now != `function`)
          return () => BigInt(Date.now()) * e;
        let t;
        return () => (
          t === void 0 &&
            (t = BigInt(Date.now()) * e - BigInt(Math.round(performance.now() * 1e6))),
          t + BigInt(Math.round(performance.now() * 1e6))
        );
      })()),
      (vu = (function () {
        let e =
          typeof process == `object` &&
          `hrtime` in process &&
          typeof process.hrtime.bigint == `function`
            ? process.hrtime
            : void 0;
        if (!e) return _u;
        let t = _u() - e.bigint();
        return () => t + e.bigint();
      })()),
      (ClockImpl = class {
        [pu] = pu;
        unsafeCurrentTimeMillis() {
          return Date.now();
        }
        unsafeCurrentTimeNanos() {
          return vu();
        }
        currentTimeMillis = K(() => this.unsafeCurrentTimeMillis());
        currentTimeNanos = K(() => this.unsafeCurrentTimeNanos());
        scheduler() {
          return W(gu);
        }
        sleep(e) {
          return async_((t) => {
            let n = gu.unsafeSchedule(() => t(sl), e);
            return asVoid(K(n));
          });
        }
      }),
      (yu = __name(() => new ClockImpl(), `make`)));
  }),
  xu,
  parse,
  Su = __esmMin(() => {
    (ut(),
      Bt(),
      (xu = Lt),
      (parse = (e) => {
        if (e === `NaN`) return lt(NaN);
        if (e === `Infinity`) return lt(1 / 0);
        if (e === `-Infinity`) return lt(-1 / 0);
        if (e.trim() === ``) return ct;
        let t = Number(e);
        return Number.isNaN(t) ? ct : lt(t);
      }));
  }),
  escape,
  Cu = __esmMin(() => {
    escape = (e) => e.replace(/[/\\^$*+?.()|[\]{}]/g, `\\$&`);
  }),
  wu,
  Tu,
  Eu,
  Du,
  Ou = __esmMin(() => {
    ((wu = `InvalidData`), (Tu = `MissingData`), (Eu = `SourceUnavailable`), (Du = `Unsupported`));
  }),
  ku,
  Au,
  ju,
  And,
  Or,
  InvalidData,
  MissingData,
  SourceUnavailable,
  Unsupported,
  Mu,
  Nu,
  Pu = __esmMin(() => {
    (H(),
      Nt(),
      l(),
      Ou(),
      (ku = `effect/ConfigError`),
      (Au = Symbol.for(ku)),
      (ju = { _tag: `ConfigError`, [Au]: Au }),
      (And = (e, t) => {
        let n = Object.create(ju);
        return (
          (n._op = `And`),
          (n.left = e),
          (n.right = t),
          Object.defineProperty(n, "toString", {
            enumerable: !1,
            value() {
              return `${this.left} and ${this.right}`;
            },
          }),
          Object.defineProperty(n, "message", {
            enumerable: !1,
            get() {
              return this.toString();
            },
          }),
          n
        );
      }),
      (Or = (e, t) => {
        let n = Object.create(ju);
        return (
          (n._op = `Or`),
          (n.left = e),
          (n.right = t),
          Object.defineProperty(n, "toString", {
            enumerable: !1,
            value() {
              return `${this.left} or ${this.right}`;
            },
          }),
          Object.defineProperty(n, "message", {
            enumerable: !1,
            get() {
              return this.toString();
            },
          }),
          n
        );
      }),
      (InvalidData = (e, t, n = { pathDelim: `.` }) => {
        let r = Object.create(ju);
        return (
          (r._op = wu),
          (r.path = e),
          (r.message = t),
          Object.defineProperty(r, "toString", {
            enumerable: !1,
            value() {
              return `(Invalid data at ${pipe(this.path, Hn(n.pathDelim))}: "${this.message}")`;
            },
          }),
          r
        );
      }),
      (MissingData = (e, t, n = { pathDelim: `.` }) => {
        let r = Object.create(ju);
        return (
          (r._op = Tu),
          (r.path = e),
          (r.message = t),
          Object.defineProperty(r, "toString", {
            enumerable: !1,
            value() {
              return `(Missing data at ${pipe(this.path, Hn(n.pathDelim))}: "${this.message}")`;
            },
          }),
          r
        );
      }),
      (SourceUnavailable = (e, t, n, r = { pathDelim: `.` }) => {
        let i = Object.create(ju);
        return (
          (i._op = Eu),
          (i.path = e),
          (i.message = t),
          (i.cause = n),
          Object.defineProperty(i, "toString", {
            enumerable: !1,
            value() {
              return `(Source unavailable at ${pipe(this.path, Hn(r.pathDelim))}: "${this.message}")`;
            },
          }),
          i
        );
      }),
      (Unsupported = (e, t, n = { pathDelim: `.` }) => {
        let r = Object.create(ju);
        return (
          (r._op = Du),
          (r.path = e),
          (r.message = t),
          Object.defineProperty(r, "toString", {
            enumerable: !1,
            value() {
              return `(Unsupported operation at ${pipe(this.path, Hn(n.pathDelim))}: "${this.message}")`;
            },
          }),
          r
        );
      }),
      (Mu = dual(2, (e, t) => {
        switch (e._op) {
          case `And`:
            return And(Mu(e.left, t), Mu(e.right, t));
          case `Or`:
            return Or(Mu(e.left, t), Mu(e.right, t));
          case wu:
            return InvalidData([...t, ...e.path], e.message);
          case Tu:
            return MissingData([...t, ...e.path], e.message);
          case Eu:
            return SourceUnavailable([...t, ...e.path], e.message, e.cause);
          case Du:
            return Unsupported([...t, ...e.path], e.message);
        }
      })),
      (Nu = dual(3, (e, t, n) => {
        let r = [e],
          i = [];
        for (; r.length > 0;) {
          let e = r.pop();
          switch (e._op) {
            case `And`:
              (r.push(e.right), r.push(e.left), i.push(M({ _op: `AndCase` })));
              break;
            case `Or`:
              (r.push(e.right), r.push(e.left), i.push(M({ _op: `OrCase` })));
              break;
            case wu:
              i.push(j(n.invalidDataCase(t, e.path, e.message)));
              break;
            case Tu:
              i.push(j(n.missingDataCase(t, e.path, e.message)));
              break;
            case Eu:
              i.push(j(n.sourceUnavailableCase(t, e.path, e.message, e.cause)));
              break;
            case Du:
              i.push(j(n.unsupportedCase(t, e.path, e.message)));
              break;
          }
        }
        let a = [];
        for (; i.length > 0;) {
          let e = i.pop();
          switch (e._op) {
            case `Left`:
              switch (e.left._op) {
                case `AndCase`: {
                  let e = a.pop(),
                    r = a.pop(),
                    i = n.andCase(t, e, r);
                  a.push(i);
                  break;
                }
                case `OrCase`: {
                  let e = a.pop(),
                    r = a.pop(),
                    i = n.orCase(t, e, r);
                  a.push(i);
                  break;
                }
              }
              break;
            case `Right`:
              a.push(e.right);
              break;
          }
        }
        if (a.length === 0)
          throw Error(
            `BUG: ConfigError.reduceWithContext - please report an issue at https://github.com/Effect-TS/effect/issues`,
          );
        return a.pop();
      })));
  }),
  Fu,
  Iu,
  Lu = __esmMin(() => {
    (H(),
      Nt(),
      l(),
      ns(),
      z(),
      Pu(),
      (Fu = { _tag: `Empty` }),
      (Iu = dual(2, (e, t) => {
        let n = of(t),
          r = e;
        for (; isCons(n);) {
          let e = n.head;
          switch (e._tag) {
            case `Empty`:
              n = n.tail;
              break;
            case `AndThen`:
              n = cons(e.first, cons(e.second, n.tail));
              break;
            case `MapName`:
              ((r = Fn(r, e.f)), (n = n.tail));
              break;
            case `Nested`:
              ((r = cn(r, e.name)), (n = n.tail));
              break;
            case `Unnested`:
              if (pipe(_n(r), $t(e.name))) ((r = yn(r)), (n = n.tail));
              else
                return M(
                  MissingData(r, `Expected ${e.name} to be in path in ConfigProvider#unnested`),
                );
              break;
          }
        }
        return j(r);
      })));
  }),
  Ru,
  zu,
  Bu,
  Vu,
  Hu,
  Uu,
  Wu,
  Gu,
  Ku,
  qu,
  Ju,
  Yu,
  Xu = __esmMin(() => {
    ((Ru = `Constant`),
      (zu = `Fail`),
      (Bu = `Fallback`),
      (Vu = `Described`),
      (Hu = `Lazy`),
      (Uu = `MapOrFail`),
      (Wu = `Nested`),
      (Gu = `Primitive`),
      (Ku = `Redacted`),
      (qu = `Sequence`),
      (Ju = `HashMap`),
      (Yu = `ZipWith`));
  }),
  Zu,
  Qu,
  $u,
  ed,
  td,
  nd,
  rd,
  makeFlat,
  fromFlat,
  fromEnv,
  id,
  appendConfigPath,
  ad,
  redactConfigError,
  fromFlatLoop,
  fromFlatLoopFail,
  splitPathString,
  parsePrimitive,
  transpose,
  indicesFrom,
  od,
  parseQuotedIndex,
  parseInteger,
  sd = __esmMin(() => {
    (H(),
      Pa(),
      Nt(),
      l(),
      Wo(),
      wi(),
      Su(),
      z(),
      A(),
      Cu(),
      Pu(),
      Lu(),
      Y(),
      Xu(),
      (Zu = __name((e, t) => [...e, ...t], `concat`)),
      (Qu = `effect/ConfigProvider`),
      ($u = Symbol.for(Qu)),
      (ed = wa(`effect/ConfigProvider`)),
      (td = `effect/ConfigProviderFlat`),
      (nd = Symbol.for(td)),
      (rd = __name(
        (e) => ({
          [$u]: $u,
          pipe() {
            return pipeArguments(this, arguments);
          },
          ...e,
        }),
        `make`,
      )),
      (makeFlat = (e) => ({
        [nd]: nd,
        patch: e.patch,
        load: (t, n, r = !0) => e.load(t, n, r),
        enumerateChildren: e.enumerateChildren,
      })),
      (fromFlat = (e) =>
        rd({
          load: (t) =>
            U(fromFlatLoop(e, Nn(), t, !1), (e) =>
              L(_n(e), {
                onNone: () =>
                  Uc(MissingData(Nn(), `Expected a single value having structure: ${t}`)),
                onSome: W,
              }),
            ),
          flattened: e,
        })),
      (fromEnv = (e) => {
        let { pathDelim: t, seqDelim: n } = Object.assign({}, { pathDelim: `_`, seqDelim: `,` }, e),
          makePathString = (e) => pipe(e, Hn(t)),
          unmakePathString = (e) => e.split(t),
          getEnv = () =>
            typeof process < `u` && `env` in process && typeof process.env == `object`
              ? process.env
              : {},
          load = (e, t, r = !0) => {
            let i = makePathString(e),
              a = getEnv();
            return pipe(
              i in a ? P(a[i]) : N(),
              nl(() => MissingData(e, `Expected ${i} to exist in the process context`)),
              U((i) => parsePrimitive(i, e, t, n, r)),
            );
          },
          enumerateChildren = (e) =>
            K(() => {
              let t = getEnv(),
                n = Object.keys(t)
                  .map((e) => unmakePathString(e.toUpperCase()))
                  .filter((t) => {
                    for (let n = 0; n < e.length; n++) {
                      let r = pipe(e, gn(n)),
                        i = t[n];
                      if (i === void 0 || r !== i) return !1;
                    }
                    return !0;
                  })
                  .flatMap((t) => t.slice(e.length, e.length + 1));
              return hi(n);
            });
        return fromFlat(makeFlat({ load, enumerateChildren, patch: Fu }));
      }),
      (id = __name((e, t, n, r) => {
        let i = unfold(n.length, (t) => (t >= r.length ? N() : P([e(t), t + 1]))),
          a = unfold(r.length, (e) => (e >= n.length ? N() : P([t(e), e + 1])));
        return [Zu(n, i), Zu(r, a)];
      }, `extend`)),
      (appendConfigPath = (e, t) => {
        let n = t;
        if (n._tag === `Nested`) {
          let t = e.slice();
          for (; n._tag === `Nested`;) (t.push(n.name), (n = n.config));
          return t;
        }
        return e;
      }),
      (ad = {
        andCase: (e, t, n) => And(t, n),
        orCase: (e, t, n) => Or(t, n),
        invalidDataCase: (e, t) => InvalidData(t, `<redacted>`),
        missingDataCase: (e, t) => MissingData(t, `<redacted>`),
        sourceUnavailableCase: (e, t, n, r) => SourceUnavailable(t, `<redacted>`, r),
        unsupportedCase: (e, t) => Unsupported(t, `<redacted>`),
      }),
      (redactConfigError = (e) => Nu(e, void 0, ad)),
      (fromFlatLoop = (e, t, n, r) => {
        let i = n;
        switch (i._tag) {
          case Ru:
            return W(Pn(i.value));
          case Vu:
            return G(() => fromFlatLoop(e, t, i.config, r));
          case zu:
            return Uc(MissingData(t, i.message));
          case Bu:
            return pipe(
              G(() => fromFlatLoop(e, t, i.first, r)),
              Rc((n) =>
                i.condition(n)
                  ? pipe(
                      fromFlatLoop(e, t, i.second, r),
                      Rc((e) => Uc(Or(n, e))),
                    )
                  : Uc(n),
              ),
            );
          case Hu:
            return G(() => fromFlatLoop(e, t, i.config(), r));
          case Uu:
            return G(() =>
              pipe(
                fromFlatLoop(e, t, i.original, r),
                U(Zc((e) => pipe(i.mapOrFail(e), nl(Mu(appendConfigPath(t, i.original)))))),
              ),
            );
          case Wu:
            return G(() => fromFlatLoop(e, Zu(t, Pn(i.name)), i.config, r));
          case Gu:
            return pipe(
              Iu(t, e.patch),
              U((t) =>
                pipe(
                  e.load(t, i, r),
                  U((e) => {
                    if (e.length === 0) {
                      let e = pipe(
                        last(t),
                        R(() => `<n/a>`),
                      );
                      return Uc(MissingData([], `Expected ${i.description} with name ${e}`));
                    }
                    return W(e);
                  }),
                ),
              ),
            );
          case Ku:
            return G(() =>
              pipe(fromFlatLoop(e, t, i.original, r), nl(redactConfigError), el(Fn(i.redact))),
            );
          case qu:
            return pipe(
              Iu(t, e.patch),
              U((n) =>
                pipe(
                  e.enumerateChildren(n),
                  U(indicesFrom),
                  U((n) =>
                    n.length === 0
                      ? G(() => el(fromFlatLoop(e, t, i.config, !0), Pn))
                      : pipe(
                          Zc(n, (n) => fromFlatLoop(e, ln(t, `[${n}]`), i.config, !0)),
                          el((e) => {
                            let t = Ln(e);
                            return t.length === 0 ? Pn(Nn()) : Pn(t);
                          }),
                        ),
                  ),
                ),
              ),
            );
          case Ju:
            return G(() =>
              pipe(
                Iu(t, e.patch),
                U((t) =>
                  pipe(
                    e.enumerateChildren(t),
                    U((n) =>
                      pipe(
                        n,
                        Zc((n) => fromFlatLoop(e, Zu(t, Pn(n)), i.valueConfig, r)),
                        el((e) =>
                          e.length === 0
                            ? Pn(Fo())
                            : pipe(
                                transpose(e),
                                Fn((e) => Io(Tn(B(n), e))),
                              ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            );
          case Yu:
            return G(() =>
              pipe(
                fromFlatLoop(e, t, i.left, r),
                Hc,
                U((n) =>
                  pipe(
                    fromFlatLoop(e, t, i.right, r),
                    Hc,
                    U((e) => {
                      if (wt(n) && wt(e)) return Uc(And(n.left, e.left));
                      if (wt(n) && Tt(e)) return Uc(n.left);
                      if (Tt(n) && wt(e)) return Uc(e.left);
                      if (Tt(n) && Tt(e)) {
                        let r = pipe(t, Hn(`.`)),
                          a = fromFlatLoopFail(t, r),
                          [o, s] = id(a, a, pipe(n.right, Fn(j)), pipe(e.right, Fn(j)));
                        return pipe(
                          o,
                          Tn(s),
                          Zc(([e, t]) =>
                            pipe(
                              ul(e, t),
                              el(([e, t]) => i.zip(e, t)),
                            ),
                          ),
                        );
                      }
                      throw Error(
                        `BUG: ConfigProvider.fromFlatLoop - please report an issue at https://github.com/Effect-TS/effect/issues`,
                      );
                    }),
                  ),
                ),
              ),
            );
        }
      }),
      (fromFlatLoopFail = (e, t) => (n) =>
        M(MissingData(e, `The element at index ${n} in a sequence at path "${t}" was missing`))),
      (splitPathString = (e, t) => e.split(RegExp(`\\s*${escape(t)}\\s*`))),
      (parsePrimitive = (e, t, n, r, i) =>
        i
          ? pipe(
              splitPathString(e, r),
              Zc((e) => n.parse(e.trim())),
              nl(Mu(t)),
            )
          : pipe(n.parse(e), tl({ onFailure: Mu(t), onSuccess: Pn }))),
      (transpose = (e) => Object.keys(e[0]).map((t) => e.map((e) => e[t]))),
      (indicesFrom = (e) =>
        pipe(
          Zc(e, parseQuotedIndex),
          tl({ onFailure: () => Nn(), onSuccess: wn(xu) }),
          Hc,
          el(At),
        )),
      (od = /^(\[(\d+)\])$/),
      (parseQuotedIndex = (e) => {
        let t = e.match(od);
        if (t !== null) {
          let e = t[2];
          return pipe(e !== void 0 && e.length > 0 ? P(e) : N(), qt(parseInteger));
        }
        return N();
      }),
      (parseInteger = (e) => {
        let t = Number.parseInt(e);
        return Number.isNaN(t) ? N() : P(t);
      }));
  }),
  cd,
  ld,
  ud,
  dd = __esmMin(() => {
    (Pa(),
      Y(),
      (cd = Symbol.for(`effect/Console`)),
      (ld = wa(`effect/Console`)),
      (ud = {
        [cd]: cd,
        assert(e, ...t) {
          return K(() => {
            console.assert(e, ...t);
          });
        },
        clear: K(() => {
          console.clear();
        }),
        count(e) {
          return K(() => {
            console.count(e);
          });
        },
        countReset(e) {
          return K(() => {
            console.countReset(e);
          });
        },
        debug(...e) {
          return K(() => {
            console.debug(...e);
          });
        },
        dir(e, t) {
          return K(() => {
            console.dir(e, t);
          });
        },
        dirxml(...e) {
          return K(() => {
            console.dirxml(...e);
          });
        },
        error(...e) {
          return K(() => {
            console.error(...e);
          });
        },
        group(e) {
          return e?.collapsed
            ? K(() => console.groupCollapsed(e?.label))
            : K(() => console.group(e?.label));
        },
        groupEnd: K(() => {
          console.groupEnd();
        }),
        info(...e) {
          return K(() => {
            console.info(...e);
          });
        },
        log(...e) {
          return K(() => {
            console.log(...e);
          });
        },
        table(e, t) {
          return K(() => {
            console.table(e, t);
          });
        },
        time(e) {
          return K(() => console.time(e));
        },
        timeEnd(e) {
          return K(() => console.timeEnd(e));
        },
        timeLog(e, ...t) {
          return K(() => {
            console.timeLog(e, ...t);
          });
        },
        trace(...e) {
          return K(() => {
            console.trace(...e);
          });
        },
        warn(...e) {
          return K(() => {
            console.warn(...e);
          });
        },
        unsafe: console,
      }));
  }),
  fd,
  pd,
  md,
  RandomImpl,
  shuffleWith,
  hd,
  gd,
  _d = __esmMin(() => {
    (lr(),
      Pa(),
      l(),
      T(),
      _e(),
      Y(),
      (fd = `effect/Random`),
      (pd = Symbol.for(fd)),
      (md = wa(`effect/Random`)),
      (RandomImpl = class {
        seed;
        [pd] = pd;
        PRNG;
        constructor(e) {
          ((this.seed = e), (this.PRNG = new PCGRandom(e)));
        }
        get next() {
          return K(() => this.PRNG.number());
        }
        get nextBoolean() {
          return el(this.next, (e) => e > 0.5);
        }
        get nextInt() {
          return K(() => this.PRNG.integer(2 ** 53 - 1));
        }
        nextRange(e, t) {
          return el(this.next, (n) => (t - e) * n + e);
        }
        nextIntBetween(e, t) {
          return K(() => this.PRNG.integer(t - e) + e);
        }
        shuffle(e) {
          return shuffleWith(e, (e) => this.nextIntBetween(0, e));
        }
      }),
      (shuffleWith = (e, t) =>
        G(() =>
          pipe(
            K(() => Array.from(e)),
            U((e) => {
              let n = [];
              for (let t = e.length; t >= 2; --t) n.push(t);
              return pipe(
                n,
                Qc((n) =>
                  pipe(
                    t(n),
                    el((t) => hd(e, n - 1, t)),
                  ),
                ),
                Ic(Qn(e)),
              );
            }),
          ),
        )),
      (hd = __name((e, t, n) => {
        let r = e[t];
        return ((e[t] = e[n]), (e[n] = r), e);
      }, `swap`)),
      (gd = __name((e) => new RandomImpl(hash(e)), `make`)));
  }),
  vd,
  yd,
  bd,
  xd,
  Sd,
  NativeSpan,
  Cd,
  wd,
  Td = __esmMin(() => {
    (Pa(),
      l(),
      (vd = Symbol.for(`effect/Tracer`)),
      (yd = __name((e) => ({ [vd]: vd, ...e }), `make`)),
      (bd = wa(`effect/Tracer`)),
      (xd = wa(`effect/ParentSpan`)),
      (Sd = (function () {
        return function (e) {
          let t = ``;
          for (let n = 0; n < e; n++)
            t += `abcdef0123456789`.charAt(Math.floor(Math.random() * 16));
          return t;
        };
      })()),
      (NativeSpan = class {
        name;
        parent;
        context;
        startTime;
        kind;
        _tag = `Span`;
        spanId;
        traceId = `native`;
        sampled = !0;
        status;
        attributes;
        events = [];
        links;
        constructor(e, t, n, r, i, a) {
          ((this.name = e),
            (this.parent = t),
            (this.context = n),
            (this.startTime = i),
            (this.kind = a),
            (this.status = { _tag: `Started`, startTime: i }),
            (this.attributes = new Map()),
            (this.traceId = t._tag === `Some` ? t.value.traceId : Sd(32)),
            (this.spanId = Sd(16)),
            (this.links = Array.from(r)));
        }
        end(e, t) {
          this.status = { _tag: `Ended`, endTime: e, exit: t, startTime: this.status.startTime };
        }
        attribute(e, t) {
          this.attributes.set(e, t);
        }
        event(e, t, n) {
          this.events.push([e, t, n ?? {}]);
        }
        addLinks(e) {
          this.links.push(...e);
        }
      }),
      (Cd = yd({
        span: (e, t, n, r, i, a) => new NativeSpan(e, t, n, r, i, a),
        context: (e) => e(),
      })),
      (wd = Na()(`effect/Tracer/DisablePropagation`, { defaultValue: o })));
  }),
  Ed,
  Dd,
  defaultServicesWith,
  Od,
  kd = __esmMin(() => {
    (Pa(),
      l(),
      y(),
      bu(),
      sd(),
      Y(),
      dd(),
      _d(),
      Td(),
      (Ed = pipe(
        Ta(),
        Da(mu, yu()),
        Da(ld, ud),
        Da(md, gd(Math.random())),
        Da(ed, fromEnv()),
        Da(bd, Cd),
      )),
      (Dd = globalValue(Symbol.for(`effect/DefaultServices/currentServices`), () =>
        fiberRefUnsafeMakeContext(Ed),
      )),
      (defaultServicesWith = (e) => withFiberRuntime((t) => e(t.currentDefaultServices))),
      (Od = __name((e) => defaultServicesWith((t) => e(t.unsafeMap.get(mu.key))), `clockWith`)));
  }),
  not,
  Ad = __esmMin(() => {
    not = (e) => !e;
  }),
  jd,
  Md,
  Class$2,
  Nd = __esmMin(() => {
    ($e(),
      (jd = Je),
      (Md = Qe),
      (Class$2 = class extends Md {
        static {
          __name(this, `Class`);
        }
      }));
  }),
  Pd,
  Fd,
  Id,
  Ld,
  Rd,
  zd,
  isSequential,
  isParallel,
  Bd = __esmMin(() => {
    ((Pd = `Sequential`),
      (Fd = `Parallel`),
      (Id = `ParallelN`),
      (Ld = { _tag: Pd }),
      (Rd = { _tag: Fd }),
      (zd = __name((e) => ({ _tag: Id, parallelism: e }), `parallelN`)),
      (isSequential = (e) => e._tag === Pd),
      (isParallel = (e) => e._tag === Fd));
  }),
  Vd,
  Hd,
  Ud,
  Wd = __esmMin(() => {
    (Bd(), (Vd = Ld), (Hd = Rd), (Ud = zd));
  });
function unsafeMake$4(e) {
  return new FiberRefsImpl(e);
}
function empty$5() {
  return unsafeMake$4(new Map());
}
var Gd,
  FiberRefsImpl,
  findAncestor,
  Kd,
  qd,
  unsafeForkAs,
  Jd,
  Yd,
  Xd,
  Zd,
  unsafeUpdateAs,
  Qd,
  $d = __esmMin(() => {
    (H(),
      D(),
      l(),
      z(),
      A(),
      __name(unsafeMake$4, `unsafeMake`),
      __name(empty$5, `empty`),
      (Gd = Symbol.for(`effect/FiberRefs`)),
      (FiberRefsImpl = class {
        locals;
        [Gd] = Gd;
        constructor(e) {
          this.locals = e;
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (findAncestor = (e, t, n, r = !1) => {
        let i = e,
          a = t,
          o = n,
          s = r,
          c;
        for (; c === void 0;)
          if (V(a) && V(o)) {
            let e = vn(a)[0],
              t = yn(a),
              n = vn(o)[0],
              r = vn(o)[1],
              i = yn(o);
            e.startTimeMillis < n.startTimeMillis
              ? ((o = i), (s = !0))
              : e.startTimeMillis > n.startTimeMillis
                ? (a = t)
                : e.id < n.id
                  ? ((o = i), (s = !0))
                  : e.id > n.id
                    ? (a = t)
                    : (c = [r, s]);
          } else c = [i.initial, !0];
        return c;
      }),
      (Kd = dual(3, (e, t, n) => {
        let r = new Map(e.locals);
        return (
          n.locals.forEach((e, n) => {
            let i = e[0][1];
            if (!e[0][0][E](t)) {
              if (!r.has(n)) {
                if (equals$2(i, n.initial)) return;
                r.set(n, [[t, n.join(n.initial, i)]]);
                return;
              }
              let a = r.get(n),
                [o, s] = findAncestor(n, a, e);
              if (s) {
                let e = n.diff(o, i),
                  s = a[0][1],
                  c = n.join(s, n.patch(e)(s));
                if (!equals$2(s, c)) {
                  let e,
                    i = a[0][0];
                  ((e = i[E](t) ? [[i, c], ...a.slice(1)] : [[t, c], ...a]), r.set(n, e));
                }
              }
            }
          }),
          new FiberRefsImpl(r)
        );
      })),
      (qd = dual(2, (e, t) => {
        let n = new Map();
        return (unsafeForkAs(e, n, t), new FiberRefsImpl(n));
      })),
      (unsafeForkAs = (e, t, n) => {
        e.locals.forEach((e, r) => {
          let i = e[0][1],
            a = r.patch(r.fork)(i);
          equals$2(i, a) ? t.set(r, e) : t.set(r, [[n, a], ...e]);
        });
      }),
      (Jd = dual(2, (e, t) => {
        let n = new Map(e.locals);
        return (n.delete(t), new FiberRefsImpl(n));
      })),
      (Yd = dual(2, (e, t) => (e.locals.has(t) ? P(vn(e.locals.get(t))[1]) : N()))),
      (Xd = dual(2, (e, t) =>
        pipe(
          Yd(e, t),
          R(() => t.initial),
        ),
      )),
      (Zd = dual(2, (e, { fiberId: t, fiberRef: n, value: r }) => {
        if (e.locals.size === 0) return new FiberRefsImpl(new Map([[n, [[t, r]]]]));
        let i = new Map(e.locals);
        return (unsafeUpdateAs(i, t, n, r), new FiberRefsImpl(i));
      })),
      (unsafeUpdateAs = (e, t, n, r) => {
        let i = e.get(n) ?? [],
          a;
        if (V(i)) {
          let [e, n] = vn(i);
          if (e[E](t)) {
            if (equals$2(n, r)) return;
            a = [[t, r], ...i.slice(1)];
          } else a = [[t, r], ...i];
        } else a = [[t, r]];
        e.set(n, a);
      }),
      (Qd = dual(2, (e, { entries: t, forkAs: n }) => {
        if (e.locals.size === 0) return new FiberRefsImpl(new Map(t));
        let r = new Map(e.locals);
        return (
          n !== void 0 && unsafeForkAs(e, r, n),
          t.forEach(([e, t]) => {
            t.length === 1
              ? unsafeUpdateAs(r, t[0][0], e, t[0][1])
              : t.forEach(([t, n]) => {
                  unsafeUpdateAs(r, t, e, n);
                });
          }),
          new FiberRefsImpl(r)
        );
      })));
  }),
  ef,
  tf,
  nf,
  rf = __esmMin(() => {
    ($d(), (ef = Xd), (tf = Qd), (nf = empty$5));
  }),
  af,
  sf,
  cf,
  lf,
  uf,
  df,
  ff,
  pf,
  mf = __esmMin(() => {
    (H(),
      D(),
      l(),
      $d(),
      (af = `Empty`),
      (sf = `Remove`),
      (cf = `Update`),
      (lf = `AndThen`),
      (uf = { _tag: af }),
      (df = __name((e, t) => {
        let n = new Map(e.locals),
          r = uf;
        for (let [e, i] of t.locals.entries()) {
          let t = vn(i)[1],
            a = n.get(e);
          if (a !== void 0) {
            let n = vn(a)[1];
            equals$2(n, t) || (r = ff({ _tag: cf, fiberRef: e, patch: e.diff(n, t) })(r));
          } else r = ff({ _tag: `Add`, fiberRef: e, value: t })(r);
          n.delete(e);
        }
        for (let [e] of n.entries()) r = ff({ _tag: sf, fiberRef: e })(r);
        return r;
      }, `diff`)),
      (ff = dual(2, (e, t) => ({ _tag: lf, first: e, second: t }))),
      (pf = dual(3, (e, t, n) => {
        let r = n,
          i = Pn(e);
        for (; V(i);) {
          let e = vn(i),
            n = yn(i);
          switch (e._tag) {
            case af:
              i = n;
              break;
            case `Add`:
              ((r = Zd(r, { fiberId: t, fiberRef: e.fiberRef, value: e.value })), (i = n));
              break;
            case sf:
              ((r = Jd(r, e.fiberRef)), (i = n));
              break;
            case cf: {
              let a = Xd(r, e.fiberRef);
              ((r = Zd(r, {
                fiberId: t,
                fiberRef: e.fiberRef,
                value: e.fiberRef.patch(e.patch)(a),
              })),
                (i = n));
              break;
            }
            case lf:
              i = cn(e.first)(cn(e.second)(n));
              break;
          }
        }
        return r;
      })));
  }),
  hf,
  gf,
  _f = __esmMin(() => {
    (mf(), (hf = df), (gf = pf));
  }),
  vf,
  yf,
  bf,
  xf,
  Sf,
  Cf,
  Done,
  Running,
  Suspended,
  wf,
  Tf,
  Ef,
  isFiberStatus,
  Df,
  Of = __esmMin(() => {
    (D(),
      l(),
      T(),
      x(),
      (vf = `effect/FiberStatus`),
      (yf = Symbol.for(vf)),
      (bf = `Done`),
      (xf = `Running`),
      (Sf = `Suspended`),
      (Cf = string(`${vf}-${bf}`)),
      (Done = class {
        [yf] = yf;
        _tag = bf;
        [S]() {
          return Cf;
        }
        [E](e) {
          return isFiberStatus(e) && e._tag === `Done`;
        }
      }),
      (Running = class {
        runtimeFlags;
        [yf] = yf;
        _tag = xf;
        constructor(e) {
          this.runtimeFlags = e;
        }
        [S]() {
          return pipe(hash(vf), C(hash(this._tag)), C(hash(this.runtimeFlags)), w(this));
        }
        [E](e) {
          return isFiberStatus(e) && e._tag === `Running` && this.runtimeFlags === e.runtimeFlags;
        }
      }),
      (Suspended = class {
        runtimeFlags;
        blockingOn;
        [yf] = yf;
        _tag = Sf;
        constructor(e, t) {
          ((this.runtimeFlags = e), (this.blockingOn = t));
        }
        [S]() {
          return pipe(
            hash(vf),
            C(hash(this._tag)),
            C(hash(this.runtimeFlags)),
            C(hash(this.blockingOn)),
            w(this),
          );
        }
        [E](e) {
          return (
            isFiberStatus(e) &&
            e._tag === `Suspended` &&
            this.runtimeFlags === e.runtimeFlags &&
            equals$2(this.blockingOn, e.blockingOn)
          );
        }
      }),
      (wf = new Done()),
      (Tf = __name((e) => new Running(e), `running`)),
      (Ef = __name((e, t) => new Suspended(e, t), `suspended`)),
      (isFiberStatus = (e) => b(e, yf)),
      (Df = __name((e) => e._tag === bf, `isDone`)));
  }),
  kf,
  Af,
  jf,
  Mf,
  Nf = __esmMin(() => {
    (Of(), (kf = wf), (Af = Tf), (jf = Ef), (Mf = Df));
  }),
  Pf,
  Ff,
  If,
  Lf,
  Rf,
  zf,
  Bf,
  Vf,
  Hf,
  Uf,
  fromLiteral,
  Wf = __esmMin(() => {
    (l(),
      Y(),
      Su(),
      Bt(),
      (Pf = ml),
      (Ff = hl),
      (If = gl),
      (Lf = _l),
      (Rf = vl),
      (zf = yl),
      (Bf = bl),
      (Vf = xl),
      (Hf = pipe(
        xu,
        Rt((e) => e.ordinal),
      )),
      (Uf = zt(Hf)),
      (fromLiteral = (e) => {
        switch (e) {
          case `All`:
            return Pf;
          case `Debug`:
            return zf;
          case `Error`:
            return If;
          case `Fatal`:
            return Ff;
          case `Info`:
            return Rf;
          case `Trace`:
            return Bf;
          case `None`:
            return Vf;
          case `Warning`:
            return Lf;
        }
      }));
  });
function defaultEvaluate(e) {
  return exitDie(`Micro.evaluate: Not implemented`);
}
var Gf,
  Kf,
  qf,
  Jf,
  MicroCauseImpl,
  Fail,
  causeFail,
  Die,
  causeDie,
  Interrupt,
  causeInterrupt,
  causeIsInterrupt,
  Yf,
  Xf,
  MicroFiberImpl,
  Zf,
  Qf,
  X,
  $f,
  ep,
  tp,
  np,
  rp,
  ip,
  ap,
  makePrimitiveProto,
  makePrimitive,
  makeExit,
  op,
  sp,
  cp,
  lp,
  up,
  dp,
  fp,
  pp,
  mp,
  isMicroExit,
  hp,
  gp,
  _p,
  exitDie,
  vp,
  yp,
  MicroSchedulerDefault,
  bp,
  xp,
  MaxOpsBeforeYield,
  CurrentScheduler,
  Sp,
  Cp,
  wp,
  Tp,
  interruptible,
  uninterruptibleMask,
  Ep,
  Dp,
  Op,
  kp,
  Ap = __esmMin(() => {
    (Pa(),
      Nd(),
      D(),
      l(),
      y(),
      T(),
      k(),
      Ca(),
      $e(),
      A(),
      x(),
      _e(),
      (Gf = Symbol.for(`effect/Micro`)),
      (Kf = Symbol.for(`effect/Micro/MicroExit`)),
      (qf = Symbol.for(`effect/Micro/MicroCause`)),
      (Jf = { _E: identity }),
      (MicroCauseImpl = class extends globalThis.Error {
        _tag;
        traces;
        [qf];
        constructor(e, t, n) {
          let r = `MicroCause.${e}`,
            i,
            a,
            o;
          if (t instanceof globalThis.Error) {
            ((i = `(${r}) ${t.name}`), (a = t.message));
            let e = a.split(`
`).length;
            o = t.stack
              ? `(${r}) ${t.stack
                  .split(`
`)
                  .slice(0, e + 3).join(`
`)}`
              : `${i}: ${a}`;
          } else ((i = r), (a = toStringUnknown(t, 0)), (o = `${i}: ${a}`));
          (n.length > 0 &&
            (o += `\n    ${n.join(`
    `)}`),
            super(a),
            (this._tag = e),
            (this.traces = n),
            (this[qf] = Jf),
            (this.name = i),
            (this.stack = o));
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
        toString() {
          return this.stack;
        }
        [O]() {
          return this.stack;
        }
      }),
      (Fail = class extends MicroCauseImpl {
        error;
        constructor(e, t = []) {
          (super(`Fail`, e, t), (this.error = e));
        }
      }),
      (causeFail = (e, t = []) => new Fail(e, t)),
      (Die = class extends MicroCauseImpl {
        defect;
        constructor(e, t = []) {
          (super(`Die`, e, t), (this.defect = e));
        }
      }),
      (causeDie = (e, t = []) => new Die(e, t)),
      (Interrupt = class extends MicroCauseImpl {
        constructor(e = []) {
          super(`Interrupt`, `interrupted`, e);
        }
      }),
      (causeInterrupt = (e = []) => new Interrupt(e)),
      (causeIsInterrupt = (e) => e._tag === `Interrupt`),
      (Yf = Symbol.for(`effect/Micro/MicroFiber`)),
      (Xf = { _A: identity, _E: identity }),
      (MicroFiberImpl = class {
        context;
        interruptible;
        [Yf];
        _stack = [];
        _observers = [];
        _exit;
        _children;
        currentOpCount = 0;
        constructor(e, t = !0) {
          ((this.context = e), (this.interruptible = t), (this[Yf] = Xf));
        }
        getRef(e) {
          return unsafeGetReference(this.context, e);
        }
        addObserver(e) {
          return this._exit
            ? (e(this._exit), c)
            : (this._observers.push(e),
              () => {
                let t = this._observers.indexOf(e);
                t >= 0 && this._observers.splice(t, 1);
              });
        }
        _interrupted = !1;
        unsafeInterrupt() {
          this._exit || ((this._interrupted = !0), this.interruptible && this.evaluate(_p));
        }
        unsafePoll() {
          return this._exit;
        }
        evaluate(e) {
          if (this._exit) return;
          if (this._yielded !== void 0) {
            let e = this._yielded;
            ((this._yielded = void 0), e());
          }
          let t = this.runLoop(e);
          if (t === rp) return;
          let n = Zf.interruptChildren && Zf.interruptChildren(this);
          if (n !== void 0) return this.evaluate(pp(n, () => t));
          this._exit = t;
          for (let e = 0; e < this._observers.length; e++) this._observers[e](t);
          this._observers.length = 0;
        }
        runLoop(e) {
          let t = !1,
            n = e;
          this.currentOpCount = 0;
          try {
            for (;;) {
              if ((this.currentOpCount++, !t && this.getRef(CurrentScheduler).shouldYield(this))) {
                t = !0;
                let e = n;
                n = pp(up, () => e);
              }
              if (((n = n[$f](this)), n === rp)) {
                let e = this._yielded;
                return Kf in e ? ((this._yielded = void 0), e) : rp;
              }
            }
          } catch (e) {
            return b(n, $f)
              ? exitDie(e)
              : exitDie(`MicroFiber.runLoop: Not a valid effect: ${String(n)}`);
          }
        }
        getCont(e) {
          for (;;) {
            let t = this._stack.pop();
            if (!t) return;
            let n = t[np] && t[np](this);
            if (n) return { [e]: n };
            if (t[e]) return t;
          }
        }
        _yielded = void 0;
        yieldWith(e) {
          return ((this._yielded = e), rp);
        }
        children() {
          return (this._children ??= new Set());
        }
      }),
      (Zf = globalValue(`effect/Micro/fiberMiddleware`, () => ({ interruptChildren: void 0 }))),
      (Qf = Symbol.for(`effect/Micro/identifier`)),
      (X = Symbol.for(`effect/Micro/args`)),
      ($f = Symbol.for(`effect/Micro/evaluate`)),
      (ep = Symbol.for(`effect/Micro/successCont`)),
      (tp = Symbol.for(`effect/Micro/failureCont`)),
      (np = Symbol.for(`effect/Micro/ensureCont`)),
      (rp = Symbol.for(`effect/Micro/Yield`)),
      (ip = { _A: identity, _E: identity, _R: identity }),
      (ap = {
        ...jd,
        _op: `Micro`,
        [Gf]: ip,
        pipe() {
          return pipeArguments(this, arguments);
        },
        [Symbol.iterator]() {
          return new ie(new YieldWrap(this));
        },
        toJSON() {
          return { _id: `Micro`, op: this[Qf], ...(X in this ? { args: this[X] } : void 0) };
        },
        toString() {
          return xe(this);
        },
        [O]() {
          return xe(this);
        },
      }),
      (makePrimitiveProto = (e) => ({
        ...ap,
        [Qf]: e.op,
        [$f]: e.eval ?? defaultEvaluate,
        [ep]: e.contA,
        [tp]: e.contE,
        [np]: e.ensure,
      })),
      (makePrimitive = (e) => {
        let t = makePrimitiveProto(e);
        return function () {
          let n = Object.create(t);
          return ((n[X] = e.single === !1 ? arguments : arguments[0]), n);
        };
      }),
      (makeExit = (e) => {
        let t = {
          ...makePrimitiveProto(e),
          [Kf]: Kf,
          _tag: e.op,
          get [e.prop]() {
            return this[X];
          },
          toJSON() {
            return { _id: `MicroExit`, _tag: e.op, [e.prop]: this[X] };
          },
          [E](t) {
            return isMicroExit(t) && t._tag === e.op && equals$2(this[X], t[X]);
          },
          [S]() {
            return w(this, C(string(e.op))(hash(this[X])));
          },
        };
        return function (e) {
          let n = Object.create(t);
          return ((n[X] = e), (n[ep] = void 0), (n[tp] = void 0), (n[np] = void 0), n);
        };
      }),
      (op = makeExit({
        op: `Success`,
        prop: `value`,
        eval(e) {
          let t = e.getCont(ep);
          return t ? t[ep](this[X], e) : e.yieldWith(this);
        },
      })),
      (sp = makeExit({
        op: `Failure`,
        prop: `cause`,
        eval(e) {
          let t = e.getCont(tp);
          for (; causeIsInterrupt(this[X]) && t && e.interruptible;) t = e.getCont(tp);
          return t ? t[tp](this[X], e) : e.yieldWith(this);
        },
      })),
      (cp = __name((e) => sp(causeFail(e)), `fail`)),
      (lp = makePrimitive({
        op: `Yield`,
        eval(e) {
          let t = !1;
          return (
            e.getRef(CurrentScheduler).scheduleTask(() => {
              t || e.evaluate(vp);
            }, this[X] ?? 0),
            e.yieldWith(() => {
              t = !0;
            })
          );
        },
      })),
      (up = lp(0)),
      (dp = op(void 0)),
      (fp = makePrimitive({
        op: `WithMicroFiber`,
        eval(e) {
          return this[X](e);
        },
      })),
      (pp = dual(2, (e, t) => {
        let n = Object.create(mp);
        return ((n[X] = e), (n[ep] = t), n);
      })),
      (mp = makePrimitiveProto({
        op: `OnSuccess`,
        eval(e) {
          return (e._stack.push(this), this[X]);
        },
      })),
      (isMicroExit = (e) => b(e, Kf)),
      (hp = op),
      (gp = sp),
      (_p = gp(causeInterrupt())),
      (exitDie = (e) => gp(causeDie(e))),
      (vp = hp(void 0)),
      (yp = `setImmediate` in globalThis ? globalThis.setImmediate : (e) => setTimeout(e, 0)),
      (MicroSchedulerDefault = class {
        tasks = [];
        running = !1;
        scheduleTask(e, t) {
          (this.tasks.push(e), this.running || ((this.running = !0), yp(this.afterScheduled)));
        }
        afterScheduled = () => {
          ((this.running = !1), this.runTasks());
        };
        runTasks() {
          let e = this.tasks;
          this.tasks = [];
          for (let t = 0, n = e.length; t < n; t++) e[t]();
        }
        shouldYield(e) {
          return e.currentOpCount >= e.getRef(MaxOpsBeforeYield);
        }
        flush() {
          for (; this.tasks.length > 0;) this.runTasks();
        }
      }),
      (bp = dual(2, (e, t) =>
        fp((n) => {
          let r = n.context;
          return ((n.context = t(r)), wp(e, () => ((n.context = r), dp)));
        }),
      )),
      (xp = dual(2, (e, t) => bp(e, ja(t)))),
      (MaxOpsBeforeYield = class extends (
        Na()(`effect/Micro/currentMaxOpsBeforeYield`, { defaultValue: () => 2048 })
      ) {}),
      Na()(`effect/Micro/currentConcurrency`, { defaultValue: () => `unbounded` }),
      (CurrentScheduler = class extends (
        Na()(`effect/Micro/currentScheduler`, { defaultValue: () => new MicroSchedulerDefault() })
      ) {}),
      (Sp = dual(2, (e, t) => {
        let n = Object.create(Cp);
        return ((n[X] = e), (n[ep] = t.onSuccess), (n[tp] = t.onFailure), n);
      })),
      (Cp = makePrimitiveProto({
        op: `OnSuccessAndFailure`,
        eval(e) {
          return (e._stack.push(this), this[X]);
        },
      })),
      (wp = dual(2, (e, t) =>
        uninterruptibleMask((n) =>
          Sp(n(e), {
            onFailure: (e) => pp(t(gp(e)), () => sp(e)),
            onSuccess: (e) => pp(t(hp(e)), () => op(e)),
          }),
        ),
      )),
      (Tp = makePrimitive({
        op: `SetInterruptible`,
        ensure(e) {
          if (((e.interruptible = this[X]), e._interrupted && e.interruptible)) return () => _p;
        },
      })),
      (interruptible = (e) =>
        fp((t) =>
          t.interruptible
            ? e
            : ((t.interruptible = !0), t._stack.push(Tp(!1)), t._interrupted ? _p : e),
        )),
      (uninterruptibleMask = (e) =>
        fp((t) =>
          t.interruptible
            ? ((t.interruptible = !1), t._stack.push(Tp(!0)), e(interruptible))
            : e(identity),
        )),
      (Ep = __name((e, t) => {
        let n = new MicroFiberImpl(
          CurrentScheduler.context(t?.scheduler ?? new MicroSchedulerDefault()),
        );
        if ((n.evaluate(e), t?.signal))
          if (t.signal.aborted) n.unsafeInterrupt();
          else {
            let abort = () => n.unsafeInterrupt();
            (t.signal.addEventListener(`abort`, abort, { once: !0 }),
              n.addObserver(() => t.signal.removeEventListener(`abort`, abort)));
          }
        return n;
      }, `runFork`)),
      (Dp = (function () {
        class YieldableError extends globalThis.Error {}
        return (
          Object.assign(YieldableError.prototype, ap, Ye, {
            [Qf]: `Failure`,
            [$f]() {
              return cp(this);
            },
            toString() {
              return this.message ? `${this.name}: ${this.message}` : this.name;
            },
            toJSON() {
              return { ...this };
            },
            [O]() {
              let e = this.stack;
              return e
                ? `${this.toString()}\n${e
                    .split(`
`)
                    .slice(1).join(`
`)}`
                : this.toString();
            },
          }),
          YieldableError
        );
      })()),
      (Op = (function () {
        return class extends Dp {
          constructor(e) {
            (super(), e && Object.assign(this, e));
          }
        };
      })()),
      (kp = __name((e) => {
        class Base extends Op {
          _tag = e;
        }
        return ((Base.prototype.name = e), Base);
      }, `TaggedError`)),
      kp(`NoSuchElementException`),
      kp(`TimeoutException`));
  }),
  jp,
  PriorityBuckets,
  MixedScheduler,
  Mp,
  SyncScheduler,
  Np,
  Pp = __esmMin(() => {
    (y(),
      Y(),
      (jp = class SchedulerRunner {
        scheduleDrain;
        running = !1;
        tasks = new PriorityBuckets();
        constructor(e) {
          this.scheduleDrain = e;
        }
        starveInternal = (e) => {
          let t = this.tasks.buckets;
          this.tasks.buckets = [];
          for (let [e, n] of t) for (let e = 0; e < n.length; e++) n[e]();
          this.tasks.buckets.length === 0 ? (this.running = !1) : this.starve(e);
        };
        starve(e = 0) {
          this.scheduleDrain(e, this.starveInternal);
        }
        scheduleTask(e, t) {
          (this.tasks.scheduleTask(e, t), this.running || ((this.running = !0), this.starve()));
        }
        static cached(e) {
          let t = new SchedulerRunner(e),
            n = new WeakMap();
          return (r) => {
            if (r === void 0) return t;
            let i = n.get(r);
            return (i === void 0 && ((i = new SchedulerRunner(e)), n.set(r, i)), i);
          };
        }
      }),
      (PriorityBuckets = class {
        buckets = [];
        scheduleTask(e, t) {
          let n = this.buckets.length,
            r,
            i = 0;
          for (; i < n && this.buckets[i][0] <= t; i++) r = this.buckets[i];
          r && r[0] === t
            ? r[1].push(e)
            : i === n
              ? this.buckets.push([t, [e]])
              : this.buckets.splice(i, 0, [t, [e]]);
        }
      }),
      (MixedScheduler = class {
        maxNextTickBeforeTimer;
        getRunner = jp.cached((e, t) => {
          e >= this.maxNextTickBeforeTimer
            ? setTimeout(() => t(0), 0)
            : Promise.resolve(void 0).then(() => t(e + 1));
        });
        constructor(e) {
          this.maxNextTickBeforeTimer = e;
        }
        shouldYield(e) {
          return e.currentOpCount > e.getFiberRef(Ml) && e.getFiberRef(jl);
        }
        scheduleTask(e, t, n) {
          this.getRunner(n).scheduleTask(e, t);
        }
      }),
      (Mp = globalValue(
        Symbol.for(`effect/Scheduler/defaultScheduler`),
        () => new MixedScheduler(2048),
      )),
      (SyncScheduler = class {
        tasks = new PriorityBuckets();
        deferred = !1;
        scheduleTask(e, t, n) {
          this.deferred ? Mp.scheduleTask(e, t, n) : this.tasks.scheduleTask(e, t);
        }
        shouldYield(e) {
          return e.currentOpCount > e.getFiberRef(Ml) && e.getFiberRef(jl);
        }
        flush() {
          for (; this.tasks.buckets.length > 0;) {
            let e = this.tasks.buckets;
            this.tasks.buckets = [];
            for (let [t, n] of e) for (let e = 0; e < n.length; e++) n[e]();
          }
          this.deferred = !0;
        }
      }),
      (Np = globalValue(Symbol.for(`effect/FiberRef/currentScheduler`), () =>
        fiberRefUnsafeMake(Mp),
      )));
  }),
  Fp,
  Ip = __esmMin(() => {
    (y(),
      Y(),
      (Fp = globalValue(Symbol.for(`effect/FiberRef/currentRequestMap`), () =>
        fiberRefUnsafeMake(new Map()),
      )));
  }),
  Lp,
  Rp = __esmMin(() => {
    (Y(),
      (Lp = __name((e, t, n, r) => {
        switch (e) {
          case void 0:
            return t();
          case `unbounded`:
            return n();
          case `inherit`:
            return Tl(Ll, (e) => (e === `unbounded` ? n() : e > 1 ? r(e) : t()));
          default:
            return e > 1 ? r(e) : t();
        }
      }, `match`)));
  }),
  zp,
  Bp = __esmMin(() => {
    (kd(), (zp = Od));
  }),
  formatLabel,
  render,
  Vp = __esmMin(() => {
    ((formatLabel = (e) => e.replace(/[\s="]/g, `_`)),
      (render = (e) => (t) => `${formatLabel(t.label)}=${e - t.startTime}ms`));
  }),
  Hp,
  Up,
  MetricLabelImpl,
  Wp,
  isMetricLabel,
  Gp = __esmMin(() => {
    (D(),
      T(),
      A(),
      x(),
      (Hp = `effect/MetricLabel`),
      (Up = Symbol.for(Hp)),
      (MetricLabelImpl = class {
        key;
        value;
        [Up] = Up;
        _hash;
        constructor(e, t) {
          ((this.key = e), (this.value = t), (this._hash = string(Hp + this.key + this.value)));
        }
        [S]() {
          return this._hash;
        }
        [E](e) {
          return isMetricLabel(e) && this.key === e.key && this.value === e.value;
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (Wp = __name((e, t) => new MetricLabelImpl(e, t), `make`)),
      (isMetricLabel = (e) => b(e, Up)));
  }),
  Kp,
  qp,
  Jp,
  Yp,
  Xp,
  logWithLevel,
  Zp,
  Qp,
  $p,
  em,
  tm,
  nm,
  rm = __esmMin(() => {
    (Bp(),
      Pa(),
      l(),
      Wo(),
      Wf(),
      z(),
      x(),
      ra(),
      Y(),
      Td(),
      (Kp = dual(
        (e) => Pc(e[0]),
        function () {
          let e = arguments;
          return kl(
            e[0],
            Nl,
            typeof e[1] == `string`
              ? zo(e[1], e[2])
              : (t) => Object.entries(e[1]).reduce((e, [t, n]) => zo(e, t, n), t),
          );
        },
      )),
      (qp = dual(2, (e, t) =>
        Lc(e, (e) => {
          let n = Gi(e, (e) => (isDieType(e) ? P(e) : N()));
          switch (n._tag) {
            case `None`:
              return Wc(e);
            case `Some`:
              return t(n.value.defect);
          }
        }),
      )),
      (Jp = dual(
        (e) => Pc(e[0]),
        (e, ...t) => {
          let n = t[t.length - 1],
            r;
          return (
            (r =
              t.length === 2
                ? ne(t[0])
                : (e) => {
                    let n = b(e, `_tag`) ? e._tag : void 0;
                    if (!n) return !1;
                    for (let e = 0; e < t.length - 1; e++) if (t[e] === n) return !0;
                    return !1;
                  }),
            zc(e, r, n)
          );
        },
      )),
      (Yp = zp),
      (Xp = dual(2, (e, t) =>
        Xc(e, { onFailure: (e) => W(t.onFailure(e)), onSuccess: (e) => W(t.onSuccess(e)) }),
      )),
      (logWithLevel =
        (e) =>
        (...t) => {
          let n = fromNullable(e),
            r;
          for (let e = 0, n = t.length; e < n; e++) {
            let n = t[e];
            isCause(n) &&
              ((r = r === void 0 ? n : zi(r, n)), (t = [...t.slice(0, e), ...t.slice(e + 1)]), e--);
          }
          return (r === void 0 && (r = Fi), withFiberRuntime((e) => (e.log(t, r, n), sl)));
        }),
      (Zp = logWithLevel(If)),
      (Qp = __name((e) => Xc(e, { onFailure: () => W(N()), onSuccess: (e) => W(P(e)) }), `option`)),
      ($p = __name(
        (e) =>
          e.length >= 1
            ? async_((t, n) => {
                try {
                  e(n).then(
                    (e) => t(W(e)),
                    (e) => t(Vc(e)),
                  );
                } catch (e) {
                  t(Vc(e));
                }
              })
            : async_((t) => {
                try {
                  e().then(
                    (e) => t(W(e)),
                    (e) => t(Vc(e)),
                  );
                } catch (e) {
                  t(Vc(e));
                }
              }),
        `promise`,
      )),
      (em = dual(2, (e, t) => Yc(e, { onFailure: (e) => fl(t(e), Wc(e)), onSuccess: W }))),
      (tm = U(context(), (e) => {
        let t = e.unsafeMap.get(xd.key);
        return t !== void 0 && t._tag === `Span` ? W(t) : Uc(new $l());
      })),
      (nm = qt((e) => (Oa(e.context, wd) ? (e._tag === `Span` ? nm(e.parent) : N()) : P(e)))));
  }),
  im,
  am,
  om,
  sm,
  cm = __esmMin(() => {
    (Y(), (im = exitIsFailure), (am = exitIsSuccess), (om = ru), (sm = su));
  }),
  lm,
  um,
  dm,
  fm,
  interruptSignal,
  stateful,
  resume,
  yieldNow,
  pm = __esmMin(() => {
    ((lm = `InterruptSignal`),
      (um = `Stateful`),
      (dm = `Resume`),
      (fm = `YieldNow`),
      (interruptSignal = (e) => ({ _tag: lm, cause: e })),
      (stateful = (e) => ({ _tag: um, onFiber: e })),
      (resume = (e) => ({ _tag: dm, effect: e })),
      (yieldNow = () => ({ _tag: fm })));
  }),
  mm,
  hm,
  Global,
  Local,
  gm,
  _m,
  vm = __esmMin(() => {
    (Po(),
      y(),
      pm(),
      (mm = `effect/FiberScope`),
      (hm = Symbol.for(mm)),
      (Global = class {
        [hm] = hm;
        fiberId = Oo;
        roots = new Set();
        add(e, t) {
          (this.roots.add(t),
            t.addObserver(() => {
              this.roots.delete(t);
            }));
        }
      }),
      (Local = class {
        fiberId;
        parent;
        [hm] = hm;
        constructor(e, t) {
          ((this.fiberId = e), (this.parent = t));
        }
        add(e, t) {
          this.parent.tell(
            stateful((e) => {
              (e.addChild(t),
                t.addObserver(() => {
                  e.removeChild(t);
                }));
            }),
          );
        }
      }),
      (gm = __name((e) => new Local(e.id(), e), `unsafeMake`)),
      (_m = globalValue(Symbol.for(`effect/FiberScope/Global`), () => new Global())));
  }),
  ym,
  bm,
  xm,
  Sm,
  Cm,
  wm,
  join,
  Tm,
  Em,
  Dm = __esmMin(() => {
    (Po(),
      z(),
      A(),
      Y(),
      $e(),
      (ym = `effect/Fiber`),
      (bm = Symbol.for(ym)),
      (xm = { _E: (e) => e, _A: (e) => e }),
      (Sm = {
        [bm]: xm,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (Cm = `effect/Fiber`),
      (wm = Symbol.for(Cm)),
      (join = (e) => dl(qc(e.await), e.inheritAll)),
      { ...Xe },
      { ...Sm },
      (Tm = `effect/FiberCurrent`),
      (Em = __name(() => fromNullable(globalThis[Tm]), `getCurrentFiber`)));
  }),
  Om,
  km,
  Am,
  makeLogger,
  jm,
  Mm,
  escapeDoubleQuotes,
  Nm,
  Pm,
  Fm,
  Im = __esmMin(() => {
    (H(),
      k(),
      A(),
      ra(),
      Do(),
      Vp(),
      (Om = `effect/Logger`),
      (km = Symbol.for(Om)),
      (Am = { _Message: (e) => e, _Output: (e) => e }),
      (makeLogger = (e) => ({
        [km]: Am,
        log: e,
        pipe() {
          return pipeArguments(this, arguments);
        },
      })),
      (jm = /^[^\s"=]*$/),
      (Mm = __name(
        (e, t) =>
          ({
            annotations: n,
            cause: r,
            date: i,
            fiberId: a,
            logLevel: o,
            message: s,
            spans: c,
          }) => {
            let formatValue = (t) => (t.match(jm) ? t : e(t)),
              format = (e, t) => `${formatLabel(e)}=${formatValue(t)}`,
              append = (e, t) => ` ` + format(e, t),
              l = format(`timestamp`, i.toISOString());
            ((l += append(`level`, o.label)), (l += append(`fiber`, To(a))));
            let u = ensure(s);
            for (let e = 0; e < u.length; e++) l += append(`message`, toStringUnknown(u[e], t));
            isEmptyType(r) || (l += append(`cause`, Qi(r, { renderErrorCause: !0 })));
            for (let e of c) l += ` ` + render(i.getTime())(e);
            for (let [e, r] of n) l += append(e, toStringUnknown(r, t));
            return l;
          },
        `format`,
      )),
      (escapeDoubleQuotes = (e) => `"${e.replace(/\\([\s\S])|(")/g, `\\$1$2`)}"`),
      (Nm = makeLogger(Mm(escapeDoubleQuotes))),
      (Pm = {
        bold: `1`,
        red: `31`,
        green: `32`,
        yellow: `33`,
        blue: `34`,
        cyan: `36`,
        white: `37`,
        gray: `90`,
        black: `30`,
        bgBrightRed: `101`,
      }),
      Pm.gray,
      Pm.blue,
      Pm.green,
      Pm.yellow,
      Pm.red,
      Pm.bgBrightRed,
      Pm.black,
      (Fm =
        typeof process == `object` &&
        process !== null &&
        typeof process.stdout == `object` &&
        process.stdout !== null),
      Fm && process.stdout.isTTY,
      Fm || `Deno` in globalThis);
  }),
  Lm,
  Rm,
  MetricBoundariesImpl,
  isMetricBoundaries,
  fromIterable,
  exponential,
  zm = __esmMin(() => {
    (H(),
      lr(),
      D(),
      l(),
      T(),
      A(),
      x(),
      (Lm = `effect/MetricBoundaries`),
      (Rm = Symbol.for(Lm)),
      (MetricBoundariesImpl = class {
        values;
        [Rm] = Rm;
        constructor(e) {
          ((this.values = e), (this._hash = pipe(string(Lm), C(array(this.values)))));
        }
        _hash;
        [S]() {
          return this._hash;
        }
        [E](e) {
          return isMetricBoundaries(e) && equals$2(this.values, e.values);
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (isMetricBoundaries = (e) => b(e, Rm)),
      (fromIterable = (e) => {
        let t = pipe(e, un(Zn(1 / 0)), dedupe);
        return new MetricBoundariesImpl(t);
      }),
      (exponential = (e) =>
        pipe(
          on(e.count - 1, (t) => e.start * e.factor ** +t),
          unsafeFromArray,
          fromIterable,
        )));
  }),
  Bm,
  Vm,
  Hm,
  Um,
  Wm,
  Gm,
  Km,
  qm,
  Jm,
  Ym,
  Xm,
  Zm,
  Qm,
  CounterKeyType,
  HistogramKeyType,
  $m,
  eh,
  isCounterKey,
  isFrequencyKey,
  isGaugeKey,
  isHistogramKey,
  isSummaryKey,
  th = __esmMin(() => {
    (D(),
      l(),
      T(),
      A(),
      x(),
      (Bm = `effect/MetricKeyType`),
      (Vm = Symbol.for(Bm)),
      (Hm = `effect/MetricKeyType/Counter`),
      (Um = Symbol.for(Hm)),
      (Wm = `effect/MetricKeyType/Frequency`),
      (Gm = Symbol.for(Wm)),
      (Km = `effect/MetricKeyType/Gauge`),
      (qm = Symbol.for(Km)),
      (Jm = `effect/MetricKeyType/Histogram`),
      (Ym = Symbol.for(Jm)),
      (Xm = `effect/MetricKeyType/Summary`),
      (Zm = Symbol.for(Xm)),
      (Qm = { _In: (e) => e, _Out: (e) => e }),
      (CounterKeyType = class {
        incremental;
        bigint;
        [Vm] = Qm;
        [Um] = Um;
        constructor(e, t) {
          ((this.incremental = e), (this.bigint = t), (this._hash = string(Hm)));
        }
        _hash;
        [S]() {
          return this._hash;
        }
        [E](e) {
          return isCounterKey(e);
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (HistogramKeyType = class {
        boundaries;
        [Vm] = Qm;
        [Ym] = Ym;
        constructor(e) {
          ((this.boundaries = e), (this._hash = pipe(string(Jm), C(hash(this.boundaries)))));
        }
        _hash;
        [S]() {
          return this._hash;
        }
        [E](e) {
          return isHistogramKey(e) && equals$2(this.boundaries, e.boundaries);
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      ($m = __name((e) => new CounterKeyType(e?.incremental ?? !1, e?.bigint ?? !1), `counter`)),
      (eh = __name((e) => new HistogramKeyType(e), `histogram`)),
      (isCounterKey = (e) => b(e, Um)),
      (isFrequencyKey = (e) => b(e, Gm)),
      (isGaugeKey = (e) => b(e, qm)),
      (isHistogramKey = (e) => b(e, Ym)),
      (isSummaryKey = (e) => b(e, Zm)));
  }),
  nh,
  rh,
  ih,
  ah,
  MetricKeyImpl,
  isMetricKey,
  oh,
  sh,
  ch,
  lh = __esmMin(() => {
    (H(),
      D(),
      l(),
      T(),
      z(),
      A(),
      x(),
      th(),
      (nh = `effect/MetricKey`),
      (rh = Symbol.for(nh)),
      (ih = { _Type: (e) => e }),
      (ah = Bn(equals$2)),
      (MetricKeyImpl = class {
        name;
        keyType;
        description;
        tags;
        [rh] = ih;
        constructor(e, t, n, r = []) {
          ((this.name = e),
            (this.keyType = t),
            (this.description = n),
            (this.tags = r),
            (this._hash = pipe(
              string(this.name + this.description),
              C(hash(this.keyType)),
              C(array(this.tags)),
            )));
        }
        _hash;
        [S]() {
          return this._hash;
        }
        [E](e) {
          return (
            isMetricKey(e) &&
            this.name === e.name &&
            equals$2(this.keyType, e.keyType) &&
            equals$2(this.description, e.description) &&
            ah(this.tags, e.tags)
          );
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (isMetricKey = (e) => b(e, rh)),
      (oh = __name((e, t) => new MetricKeyImpl(e, $m(t), fromNullable(t?.description)), `counter`)),
      (sh = __name((e, t, n) => new MetricKeyImpl(e, eh(t), fromNullable(n)), `histogram`)),
      (ch = dual(2, (e, t) =>
        t.length === 0 ? e : new MetricKeyImpl(e.name, e.keyType, e.description, Mn(e.tags, t)),
      )));
  }),
  uh,
  dh,
  fh,
  BucketIterator,
  ph,
  mh,
  getFromBucket,
  hh,
  gh,
  removeFromBucket,
  _h = __esmMin(() => {
    (D(),
      l(),
      T(),
      k(),
      z(),
      A(),
      (uh = Symbol.for(`effect/MutableHashMap`)),
      (dh = {
        [uh]: uh,
        [Symbol.iterator]() {
          return new fh(this);
        },
        toString() {
          return xe(this.toJSON());
        },
        toJSON() {
          return { _id: `MutableHashMap`, values: Array.from(this).map(toJSON) };
        },
        [O]() {
          return this.toJSON();
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (fh = class MutableHashMapIterator {
        self;
        referentialIterator;
        bucketIterator;
        constructor(e) {
          ((this.self = e), (this.referentialIterator = e.referential[Symbol.iterator]()));
        }
        next() {
          if (this.bucketIterator !== void 0) return this.bucketIterator.next();
          let e = this.referentialIterator.next();
          return e.done
            ? ((this.bucketIterator = new BucketIterator(this.self.buckets.values())), this.next())
            : e;
        }
        [Symbol.iterator]() {
          return new MutableHashMapIterator(this.self);
        }
      }),
      (BucketIterator = class {
        backing;
        constructor(e) {
          this.backing = e;
        }
        currentBucket;
        next() {
          if (this.currentBucket === void 0) {
            let e = this.backing.next();
            if (e.done) return e;
            this.currentBucket = e.value[Symbol.iterator]();
          }
          let e = this.currentBucket.next();
          return e.done ? ((this.currentBucket = void 0), this.next()) : e;
        }
      }),
      (ph = __name(() => {
        let e = Object.create(dh);
        return ((e.referential = new Map()), (e.buckets = new Map()), (e.bucketsSize = 0), e);
      }, `empty`)),
      (mh = dual(2, (e, t) => {
        if (isEqual(t) === !1) return e.referential.has(t) ? P(e.referential.get(t)) : N();
        let n = t[S](),
          r = e.buckets.get(n);
        return r === void 0 ? N() : getFromBucket(e, r, t);
      })),
      (getFromBucket = (e, t, n, r = !1) => {
        for (let i = 0, a = t.length; i < a; i++)
          if (n[E](t[i][0])) {
            let n = t[i][1];
            return (r && (t.splice(i, 1), e.bucketsSize--), P(n));
          }
        return N();
      }),
      (hh = dual(2, (e, t) => I(mh(e, t)))),
      (gh = dual(3, (e, t, n) => {
        if (isEqual(t) === !1) return (e.referential.set(t, n), e);
        let r = t[S](),
          i = e.buckets.get(r);
        return i === void 0
          ? (e.buckets.set(r, [[t, n]]), e.bucketsSize++, e)
          : (removeFromBucket(e, i, t), i.push([t, n]), e.bucketsSize++, e);
      })),
      (removeFromBucket = (e, t, n) => {
        for (let r = 0, i = t.length; r < i; r++)
          if (n[E](t[r][0])) {
            (t.splice(r, 1), e.bucketsSize--);
            return;
          }
      }));
  }),
  vh,
  yh,
  bh,
  xh,
  Sh,
  Ch,
  wh,
  Th,
  Eh,
  Dh,
  Oh,
  kh,
  Ah,
  CounterState,
  jh,
  FrequencyState,
  GaugeState,
  HistogramState,
  SummaryState,
  Mh,
  Nh,
  Ph,
  Fh,
  Ih,
  isCounterState,
  isFrequencyState,
  isGaugeState,
  isHistogramState,
  isSummaryState,
  Lh = __esmMin(() => {
    (H(),
      D(),
      l(),
      T(),
      A(),
      x(),
      (vh = `effect/MetricState`),
      (yh = Symbol.for(vh)),
      (bh = `effect/MetricState/Counter`),
      (xh = Symbol.for(bh)),
      (Sh = `effect/MetricState/Frequency`),
      (Ch = Symbol.for(Sh)),
      (wh = `effect/MetricState/Gauge`),
      (Th = Symbol.for(wh)),
      (Eh = `effect/MetricState/Histogram`),
      (Dh = Symbol.for(Eh)),
      (Oh = `effect/MetricState/Summary`),
      (kh = Symbol.for(Oh)),
      (Ah = { _A: (e) => e }),
      (CounterState = class {
        count;
        [yh] = Ah;
        [xh] = xh;
        constructor(e) {
          this.count = e;
        }
        [S]() {
          return pipe(hash(bh), C(hash(this.count)), w(this));
        }
        [E](e) {
          return isCounterState(e) && this.count === e.count;
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (jh = Bn(equals$2)),
      (FrequencyState = class {
        occurrences;
        [yh] = Ah;
        [Ch] = Ch;
        constructor(e) {
          this.occurrences = e;
        }
        _hash;
        [S]() {
          return pipe(string(Sh), C(array(B(this.occurrences.entries()))), w(this));
        }
        [E](e) {
          return (
            isFrequencyState(e) && jh(B(this.occurrences.entries()), B(e.occurrences.entries()))
          );
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (GaugeState = class {
        value;
        [yh] = Ah;
        [Th] = Th;
        constructor(e) {
          this.value = e;
        }
        [S]() {
          return pipe(hash(wh), C(hash(this.value)), w(this));
        }
        [E](e) {
          return isGaugeState(e) && this.value === e.value;
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (HistogramState = class {
        buckets;
        count;
        min;
        max;
        sum;
        [yh] = Ah;
        [Dh] = Dh;
        constructor(e, t, n, r, i) {
          ((this.buckets = e), (this.count = t), (this.min = n), (this.max = r), (this.sum = i));
        }
        [S]() {
          return pipe(
            hash(Eh),
            C(hash(this.buckets)),
            C(hash(this.count)),
            C(hash(this.min)),
            C(hash(this.max)),
            C(hash(this.sum)),
            w(this),
          );
        }
        [E](e) {
          return (
            isHistogramState(e) &&
            equals$2(this.buckets, e.buckets) &&
            this.count === e.count &&
            this.min === e.min &&
            this.max === e.max &&
            this.sum === e.sum
          );
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (SummaryState = class {
        error;
        quantiles;
        count;
        min;
        max;
        sum;
        [yh] = Ah;
        [kh] = kh;
        constructor(e, t, n, r, i, a) {
          ((this.error = e),
            (this.quantiles = t),
            (this.count = n),
            (this.min = r),
            (this.max = i),
            (this.sum = a));
        }
        [S]() {
          return pipe(
            hash(Oh),
            C(hash(this.error)),
            C(hash(this.quantiles)),
            C(hash(this.count)),
            C(hash(this.min)),
            C(hash(this.max)),
            C(hash(this.sum)),
            w(this),
          );
        }
        [E](e) {
          return (
            isSummaryState(e) &&
            this.error === e.error &&
            equals$2(this.quantiles, e.quantiles) &&
            this.count === e.count &&
            this.min === e.min &&
            this.max === e.max &&
            this.sum === e.sum
          );
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (Mh = __name((e) => new CounterState(e), `counter`)),
      (Nh = __name((e) => new FrequencyState(e), `frequency`)),
      (Ph = __name((e) => new GaugeState(e), `gauge`)),
      (Fh = __name(
        (e) => new HistogramState(e.buckets, e.count, e.min, e.max, e.sum),
        `histogram`,
      )),
      (Ih = __name(
        (e) => new SummaryState(e.error, e.quantiles, e.count, e.min, e.max, e.sum),
        `summary`,
      )),
      (isCounterState = (e) => b(e, xh)),
      (isFrequencyState = (e) => b(e, Ch)),
      (isGaugeState = (e) => b(e, Th)),
      (isHistogramState = (e) => b(e, Dh)),
      (isSummaryState = (e) => b(e, kh)));
  }),
  Rh,
  zh,
  Bh,
  Vh,
  Hh,
  Uh,
  frequency,
  gauge,
  Wh,
  summary,
  calculateQuantiles,
  resolveQuantile,
  Gh = __esmMin(() => {
    (H(),
      ao(),
      l(),
      Su(),
      z(),
      A(),
      Lh(),
      (Rh = `effect/MetricHook`),
      (zh = Symbol.for(Rh)),
      (Bh = { _In: (e) => e, _Out: (e) => e }),
      (Vh = __name(
        (e) => ({
          [zh]: Bh,
          pipe() {
            return pipeArguments(this, arguments);
          },
          ...e,
        }),
        `make`,
      )),
      (Hh = BigInt(0)),
      (Uh = __name((e) => {
        let t = e.keyType.bigint ? Hh : 0,
          n = e.keyType.incremental
            ? e.keyType.bigint
              ? (e) => e >= Hh
              : (e) => e >= 0
            : (e) => !0,
          update = (e) => {
            n(e) && (t += e);
          };
        return Vh({ get: () => Mh(t), update, modify: update });
      }, `counter`)),
      (frequency = (e) => {
        let t = new Map();
        for (let n of e.keyType.preregisteredWords) t.set(n, 0);
        let update = (e) => {
          let n = t.get(e) ?? 0;
          t.set(e, n + 1);
        };
        return Vh({ get: () => Nh(t), update, modify: update });
      }),
      (gauge = (e, t) => {
        let n = t;
        return Vh({
          get: () => Ph(n),
          update: (e) => {
            n = e;
          },
          modify: (e) => {
            n += e;
          },
        });
      }),
      (Wh = __name((e) => {
        let t = e.keyType.boundaries.values,
          n = t.length,
          r = new Uint32Array(n + 1),
          i = new Float64Array(n),
          a = 0,
          o = 0,
          s = Number.MAX_VALUE,
          c = Number.MIN_VALUE;
        pipe(
          t,
          wn(xu),
          Fn((e, t) => {
            i[t] = e;
          }),
        );
        let update = (e) => {
            let t = 0,
              l = n;
            for (; t !== l;) {
              let n = Math.floor(t + (l - t) / 2);
              (e <= i[n] ? (l = n) : (t = n), l === t + 1 && (e <= i[t] ? (l = t) : (t = l)));
            }
            ((r[t] = r[t] + 1), (a += 1), (o += e), e < s && (s = e), e > c && (c = e));
          },
          getBuckets = () => {
            let e = allocate(n),
              t = 0;
            for (let a = 0; a < n; a++) {
              let n = i[a],
                o = r[a];
              ((t += o), (e[a] = [n, t]));
            }
            return e;
          };
        return Vh({
          get: () => Fh({ buckets: getBuckets(), count: a, min: s, max: c, sum: o }),
          update,
          modify: update,
        });
      }, `histogram`)),
      (summary = (e) => {
        let { error: t, maxAge: n, maxSize: r, quantiles: i } = e.keyType,
          a = pipe(i, wn(xu)),
          o = allocate(r),
          s = 0,
          c = 0,
          l = 0,
          u = 0,
          d = 0,
          snapshot = (e) => {
            let i = [],
              s = 0;
            for (; s !== r - 1;) {
              let t = o[s];
              if (t != null) {
                let [r, a] = t,
                  o = millis(e - r);
                no(o, Xa) && to(o, n) && i.push(a);
              }
              s += 1;
            }
            return calculateQuantiles(t, a, wn(i, xu));
          },
          observe = (e, t) => {
            if (r > 0) {
              s += 1;
              let n = s % r;
              o[n] = [t, e];
            }
            ((u = c === 0 ? e : Math.min(u, e)),
              (d = c === 0 ? e : Math.max(d, e)),
              (c += 1),
              (l += e));
          };
        return Vh({
          get: () =>
            Ih({ error: t, quantiles: snapshot(Date.now()), count: c, min: u, max: d, sum: l }),
          update: ([e, t]) => observe(e, t),
          modify: ([e, t]) => observe(e, t),
        });
      }),
      (calculateQuantiles = (e, t, n) => {
        let r = n.length;
        if (!V(t)) return Nn();
        let i = t[0],
          a = t.slice(1),
          o = resolveQuantile(e, r, N(), 0, i, n),
          s = Pn(o);
        return (
          a.forEach((t) => {
            s.push(resolveQuantile(e, r, o.value, o.consumed, t, o.rest));
          }),
          Fn(s, (e) => [e.quantile, e.value])
        );
      }),
      (resolveQuantile = (e, t, n, r, i, a) => {
        let o = e,
          s = t,
          c = n,
          l = r,
          u = i,
          d = a,
          p = e,
          m = t,
          h = n,
          g = r,
          _ = i,
          v = a;
        for (;;) {
          if (!V(d)) return { quantile: u, value: N(), consumed: l, rest: [] };
          if (u === 1)
            return { quantile: u, value: P(lastNonEmpty(d)), consumed: l + d.length, rest: [] };
          let e = vn(d),
            t = bn(d, (t) => t === e),
            n = u * s,
            r = (o / 2) * n,
            i = l + t[0].length,
            a = Math.abs(i - n);
          if (i < n - r) {
            ((p = o),
              (m = s),
              (h = _n(d)),
              (g = i),
              (_ = u),
              (v = t[1]),
              (o = p),
              (s = m),
              (c = h),
              (l = g),
              (u = _),
              (d = v));
            continue;
          }
          if (i > n + r) {
            let t = F(c) ? P(e) : c;
            return { quantile: u, value: t, consumed: l, rest: d };
          }
          switch (c._tag) {
            case `None`:
              ((p = o),
                (m = s),
                (h = _n(d)),
                (g = i),
                (_ = u),
                (v = t[1]),
                (o = p),
                (s = m),
                (c = h),
                (l = g),
                (u = _),
                (d = v));
              continue;
            case `Some`:
              if (a < Math.abs(n - c.value)) {
                ((p = o),
                  (m = s),
                  (h = _n(d)),
                  (g = i),
                  (_ = u),
                  (v = t[1]),
                  (o = p),
                  (s = m),
                  (c = h),
                  (l = g),
                  (u = _),
                  (d = v));
                continue;
              }
              return { quantile: u, value: P(c.value), consumed: l, rest: d };
          }
        }
        throw Error(
          `BUG: MetricHook.resolveQuantiles - please report an issue at https://github.com/Effect-TS/effect/issues`,
        );
      }));
  }),
  Kh,
  qh,
  Jh,
  Yh,
  Xh = __esmMin(() => {
    (A(),
      (Kh = `effect/MetricPair`),
      (qh = Symbol.for(Kh)),
      (Jh = { _Type: (e) => e }),
      (Yh = __name(
        (e, t) => ({
          [qh]: Jh,
          metricKey: e,
          metricState: t,
          pipe() {
            return pipeArguments(this, arguments);
          },
        }),
        `unsafeMake`,
      )));
  }),
  Zh,
  Qh,
  MetricRegistryImpl,
  $h,
  eg = __esmMin(() => {
    (l(),
      _h(),
      z(),
      Gh(),
      th(),
      Xh(),
      (Zh = `effect/MetricRegistry`),
      (Qh = Symbol.for(Zh)),
      (MetricRegistryImpl = class {
        [Qh] = Qh;
        map = ph();
        snapshot() {
          let e = [];
          for (let [t, n] of this.map) e.push(Yh(t, n.get()));
          return e;
        }
        get(e) {
          let t = pipe(this.map, mh(e), Wt);
          if (t == null) {
            if (isCounterKey(e.keyType)) return this.getCounter(e);
            if (isGaugeKey(e.keyType)) return this.getGauge(e);
            if (isFrequencyKey(e.keyType)) return this.getFrequency(e);
            if (isHistogramKey(e.keyType)) return this.getHistogram(e);
            if (isSummaryKey(e.keyType)) return this.getSummary(e);
            throw Error(
              `BUG: MetricRegistry.get - unknown MetricKeyType - please report an issue at https://github.com/Effect-TS/effect/issues`,
            );
          } else return t;
        }
        getCounter(e) {
          let t = pipe(this.map, mh(e), Wt);
          if (t == null) {
            let n = Uh(e);
            (pipe(this.map, hh(e)) || pipe(this.map, gh(e, n)), (t = n));
          }
          return t;
        }
        getFrequency(e) {
          let t = pipe(this.map, mh(e), Wt);
          if (t == null) {
            let n = frequency(e);
            (pipe(this.map, hh(e)) || pipe(this.map, gh(e, n)), (t = n));
          }
          return t;
        }
        getGauge(e) {
          let t = pipe(this.map, mh(e), Wt);
          if (t == null) {
            let n = gauge(e, e.keyType.bigint ? BigInt(0) : 0);
            (pipe(this.map, hh(e)) || pipe(this.map, gh(e, n)), (t = n));
          }
          return t;
        }
        getHistogram(e) {
          let t = pipe(this.map, mh(e), Wt);
          if (t == null) {
            let n = Wh(e);
            (pipe(this.map, hh(e)) || pipe(this.map, gh(e, n)), (t = n));
          }
          return t;
        }
        getSummary(e) {
          let t = pipe(this.map, mh(e), Wt);
          if (t == null) {
            let n = summary(e);
            (pipe(this.map, hh(e)) || pipe(this.map, gh(e, n)), (t = n));
          }
          return t;
        }
      }),
      ($h = __name(() => new MetricRegistryImpl(), `make`)));
  }),
  tg,
  ng,
  rg,
  ig,
  ag,
  counter,
  fromMetricKey,
  histogram,
  og,
  sg,
  cg,
  lg = __esmMin(() => {
    (H(),
      l(),
      y(),
      A(),
      Y(),
      lh(),
      Gp(),
      eg(),
      (tg = `effect/Metric`),
      (ng = Symbol.for(tg)),
      (rg = { _Type: (e) => e, _In: (e) => e, _Out: (e) => e }),
      (ig = globalValue(Symbol.for(`effect/Metric/globalMetricRegistry`), () => $h())),
      (ag = __name(function (e, t, n, r) {
        let i = Object.assign((e) => al(e, (e) => cg(i, e)), {
          [ng]: rg,
          keyType: e,
          unsafeUpdate: t,
          unsafeValue: n,
          unsafeModify: r,
          register() {
            return (this.unsafeValue([]), this);
          },
          pipe() {
            return pipeArguments(this, arguments);
          },
        });
        return i;
      }, `make`)),
      (counter = (e, t) => fromMetricKey(oh(e, t))),
      (fromMetricKey = (e) => {
        let t,
          n = new WeakMap(),
          hook = (r) => {
            if (r.length === 0) return (t === void 0 && (t = ig.get(e)), t);
            let i = n.get(r);
            return i === void 0 ? ((i = ig.get(ch(e, r))), n.set(r, i), i) : i;
          };
        return ag(
          e.keyType,
          (e, t) => hook(t).update(e),
          (e) => hook(e).get(),
          (e, t) => hook(t).modify(e),
        );
      }),
      (histogram = (e, t, n) => fromMetricKey(sh(e, t, n))),
      (og = dual(3, (e, t, n) => sg(e, [Wp(t, n)]))),
      (sg = dual(2, (e, t) =>
        ag(
          e.keyType,
          (n, r) => e.unsafeUpdate(n, Mn(t, r)),
          (n) => e.unsafeValue(Mn(t, n)),
          (n, r) => e.unsafeModify(n, Mn(t, r)),
        ),
      )),
      (cg = dual(2, (e, t) => Tl(Vl, (n) => K(() => e.unsafeUpdate(t, n))))));
  }),
  ug,
  dg = __esmMin(() => {
    (l(),
      Ip(),
      Y(),
      $e(),
      { ...Ye },
      (ug = dual(2, (e, t) =>
        Tl(Fp, (n) =>
          K(() => {
            if (n.has(e)) {
              let r = n.get(e);
              r.state.completed || ((r.state.completed = !0), deferredUnsafeDone(r.result, t));
            }
          }),
        ),
      )));
  }),
  fg,
  pg,
  mg,
  hg,
  gg,
  isZip,
  Const,
  _g,
  vg,
  yg = __esmMin(() => {
    (l(),
      y(),
      x(),
      Y(),
      (fg = `effect/Supervisor`),
      (pg = Symbol.for(fg)),
      (mg = { _T: (e) => e }),
      (hg = class ProxySupervisor {
        underlying;
        value0;
        [pg] = mg;
        constructor(e, t) {
          ((this.underlying = e), (this.value0 = t));
        }
        get value() {
          return this.value0;
        }
        onStart(e, t, n, r) {
          this.underlying.onStart(e, t, n, r);
        }
        onEnd(e, t) {
          this.underlying.onEnd(e, t);
        }
        onEffect(e, t) {
          this.underlying.onEffect(e, t);
        }
        onSuspend(e) {
          this.underlying.onSuspend(e);
        }
        onResume(e) {
          this.underlying.onResume(e);
        }
        map(e) {
          return new ProxySupervisor(this, pipe(this.value, el(e)));
        }
        zip(e) {
          return new gg(this, e);
        }
      }),
      (gg = class Zip {
        left;
        right;
        _tag = `Zip`;
        [pg] = mg;
        constructor(e, t) {
          ((this.left = e), (this.right = t));
        }
        get value() {
          return ul(this.left.value, this.right.value);
        }
        onStart(e, t, n, r) {
          (this.left.onStart(e, t, n, r), this.right.onStart(e, t, n, r));
        }
        onEnd(e, t) {
          (this.left.onEnd(e, t), this.right.onEnd(e, t));
        }
        onEffect(e, t) {
          (this.left.onEffect(e, t), this.right.onEffect(e, t));
        }
        onSuspend(e) {
          (this.left.onSuspend(e), this.right.onSuspend(e));
        }
        onResume(e) {
          (this.left.onResume(e), this.right.onResume(e));
        }
        map(e) {
          return new hg(this, pipe(this.value, el(e)));
        }
        zip(e) {
          return new Zip(this, e);
        }
      }),
      (isZip = (e) => b(e, pg) && ne(e, `Zip`)),
      (Const = class {
        effect;
        [pg] = mg;
        constructor(e) {
          this.effect = e;
        }
        get value() {
          return this.effect;
        }
        onStart(e, t, n, r) {}
        onEnd(e, t) {}
        onEffect(e, t) {}
        onSuspend(e) {}
        onResume(e) {}
        map(e) {
          return new hg(this, pipe(this.value, el(e)));
        }
        zip(e) {
          return new gg(this, e);
        }
        onRun(e, t) {
          return e();
        }
      }),
      (_g = __name((e) => new Const(e), `fromEffect`)),
      (vg = globalValue(`effect/Supervisor/none`, () => _g(sl))));
  }),
  bg,
  xg = __esmMin(() => {
    (qs(), (bg = Gs));
  }),
  Sg,
  Cg,
  wg,
  Tg,
  Eg,
  combine,
  patch,
  patchLoop,
  removeSupervisor,
  toSet,
  diff,
  Dg,
  Og = __esmMin(() => {
    (lr(),
      xg(),
      D(),
      l(),
      wi(),
      yg(),
      (Sg = `Empty`),
      (Cg = `AddSupervisor`),
      (wg = `RemoveSupervisor`),
      (Tg = `AndThen`),
      (Eg = { _tag: Sg }),
      (combine = (e, t) => ({ _tag: Tg, first: e, second: t })),
      (patch = (e, t) => patchLoop(t, Zn(e))),
      (patchLoop = (e, t) => {
        let n = e,
          r = t;
        for (; sr(r);) {
          let e = cr(r);
          switch (e._tag) {
            case Sg:
              r = tailNonEmpty(r);
              break;
            case Cg:
              ((n = n.zip(e.supervisor)), (r = tailNonEmpty(r)));
              break;
            case wg:
              ((n = removeSupervisor(n, e.supervisor)), (r = tailNonEmpty(r)));
              break;
            case Tg:
              r = rr(e.first)(rr(e.second)(tailNonEmpty(r)));
              break;
          }
        }
        return n;
      }),
      (removeSupervisor = (e, t) =>
        equals$2(e, t)
          ? vg
          : isZip(e)
            ? removeSupervisor(e.left, t).zip(removeSupervisor(e.right, t))
            : e),
      (toSet = (e) =>
        equals$2(e, vg) ? mi() : isZip(e) ? pipe(toSet(e.left), Si(toSet(e.right))) : gi(e)),
      (diff = (e, t) => {
        if (equals$2(e, t)) return Eg;
        let n = toSet(e),
          r = toSet(t),
          i = pipe(
            r,
            xi(n),
            Ci(Eg, (e, t) => combine(e, { _tag: Cg, supervisor: t })),
          ),
          a = pipe(
            n,
            xi(r),
            Ci(Eg, (e, t) => combine(e, { _tag: wg, supervisor: t })),
          );
        return combine(i, a);
      }),
      (Dg = bg({ empty: Eg, patch, combine, diff })));
  }),
  kg,
  Ag,
  jg,
  Mg,
  Ng,
  Pg,
  Fg,
  Ig,
  Lg,
  absurd,
  Rg,
  zg,
  Bg,
  Vg,
  runBlockedRequests,
  Hg,
  FiberRuntime,
  Ug,
  loggerWithConsoleLog,
  Wg,
  Gg,
  Kg,
  qg,
  forEachParUnbounded,
  forEachConcurrentDiscard,
  forEachParN,
  forkDaemon,
  Jg,
  unsafeForkUnstarted,
  unsafeMakeChildFiber,
  forkWithScopeOverride,
  parallelFinalizers,
  parallelNFinalizers,
  finalizersMaskInternal,
  sequentialFinalizers,
  Yg,
  scopeUnsafeAddFinalizer,
  Xg,
  scopeUnsafeMake,
  Zg,
  fiberRefUnsafeMakeSupervisor,
  Qg,
  $g,
  e_,
  invokeWithInterrupt,
  t_ = __esmMin(() => {
    (H(),
      lr(),
      Pa(),
      Nd(),
      Wd(),
      Po(),
      rf(),
      _f(),
      Nf(),
      l(),
      y(),
      wi(),
      k(),
      Wf(),
      Ap(),
      z(),
      A(),
      x(),
      hc(),
      Pp(),
      _e(),
      Sc(),
      ra(),
      bu(),
      Ip(),
      Rp(),
      rm(),
      Y(),
      kd(),
      dd(),
      Bd(),
      Dm(),
      pm(),
      $d(),
      vm(),
      Im(),
      lg(),
      zm(),
      Re(),
      dg(),
      dc(),
      yg(),
      Og(),
      Td(),
      Be(),
      (kg = counter(`effect_fiber_started`, { incremental: !0 })),
      (Ag = counter(`effect_fiber_active`)),
      (jg = counter(`effect_fiber_successes`, { incremental: !0 })),
      (Mg = counter(`effect_fiber_failures`, { incremental: !0 })),
      (Ng = og(
        histogram(`effect_fiber_lifetimes`, exponential({ start: 0.5, factor: 2, count: 35 })),
        `time_unit`,
        `milliseconds`,
      )),
      (Pg = `Continue`),
      (Fg = `Done`),
      (Ig = `Yield`),
      (Lg = { _E: (e) => e, _A: (e) => e }),
      (absurd = (e) => {
        throw Error(
          `BUG: FiberRuntime - ${toStringUnknown(e)} - please report an issue at https://github.com/Effect-TS/effect/issues`,
        );
      }),
      (Rg = Symbol.for(`effect/internal/fiberRuntime/YieldedOp`)),
      (zg = globalValue(`effect/internal/fiberRuntime/yieldedOpChannel`, () => ({
        currentOp: null,
      }))),
      (Bg = {
        [Oe]: (e, t, n) => ge(() => t.effect_instruction_i1(n)),
        OnStep: (e, t, n) => J(J(n)),
        [ke]: (e, t, n) => ge(() => t.effect_instruction_i2(n)),
        [Le]: (e, t, n) => (
          e.patchRuntimeFlags(e.currentRuntimeFlags, t.patch),
          ic(e.currentRuntimeFlags) && e.isInterrupted() ? q(e.getInterruptedCause()) : J(n)
        ),
        [Ne]: (e, t, n) => (
          ge(() => t.effect_instruction_i2(n)),
          ge(() => t.effect_instruction_i0())
            ? (e.pushStack(t), ge(() => t.effect_instruction_i1()))
            : sl
        ),
        [Pe]: (e, t, n) => {
          for (;;) {
            let r = ge(() => t.effect_instruction_i0.next(n));
            if (r.done) return J(r.value);
            let i = yieldWrapGet(r.value);
            if (!exitIsExit(i)) return (e.pushStack(t), i);
            if (i._tag === `Failure`) return i;
            n = i.value;
          }
        },
      }),
      (Vg = {
        [lm]: (e, t, n, r) => (e.processNewInterruptSignal(r.cause), ic(t) ? q(r.cause) : n),
        [dm]: (e, t, n, r) => {
          throw Error(`It is illegal to have multiple concurrent run loops in a single fiber`);
        },
        [um]: (e, t, n, r) => (r.onFiber(e, Af(t)), n),
        [fm]: (e, t, n, r) => U(ll(), () => n),
      }),
      (runBlockedRequests = (e) =>
        Qc(gc(e), (e) =>
          forEachConcurrentDiscard(
            sequentialCollectionToChunk(e),
            ([e, t]) => {
              let n = new Map(),
                r = [];
              for (let e of t) {
                r.push($n(e));
                for (let t of e) n.set(t.request, t);
              }
              let i = r.flat();
              return Ol(
                invokeWithInterrupt(e.runAll(r), i, () =>
                  i.forEach((e) => {
                    e.listeners.interrupted = !0;
                  }),
                ),
                Fp,
                n,
              );
            },
            !1,
            !1,
          ),
        )),
      (Hg = getCurrentVersion()),
      (FiberRuntime = class extends Class$2 {
        [bm] = xm;
        [wm] = Lg;
        _fiberRefs;
        _fiberId;
        _queue = [];
        _children = null;
        _observers = [];
        _running = !1;
        _stack = [];
        _asyncInterruptor = null;
        _asyncBlockingOn = null;
        _exitValue = null;
        _steps = [];
        _isYielding = !1;
        currentRuntimeFlags;
        currentOpCount = 0;
        currentSupervisor;
        currentScheduler;
        currentTracer;
        currentSpan;
        currentContext;
        currentDefaultServices;
        constructor(e, t, n) {
          if (
            (super(),
            (this.currentRuntimeFlags = n),
            (this._fiberId = e),
            (this._fiberRefs = t),
            runtimeMetrics(n))
          ) {
            let e = this.getFiberRef(Vl);
            (kg.unsafeUpdate(1, e), Ag.unsafeUpdate(1, e));
          }
          this.refreshRefCache();
        }
        commit() {
          return join(this);
        }
        id() {
          return this._fiberId;
        }
        resume(e) {
          this.tell(resume(e));
        }
        get status() {
          return this.ask((e, t) => t);
        }
        get runtimeFlags() {
          return this.ask((e, t) => (Mf(t) ? e.currentRuntimeFlags : t.runtimeFlags));
        }
        scope() {
          return gm(this);
        }
        get children() {
          return this.ask((e) => Array.from(e.getChildren()));
        }
        getChildren() {
          return (this._children === null && (this._children = new Set()), this._children);
        }
        getInterruptedCause() {
          return this.getFiberRef(Ul);
        }
        fiberRefs() {
          return this.ask((e) => e.getFiberRefs());
        }
        ask(e) {
          return G(() => {
            let t = deferredUnsafeMake(this._fiberId);
            return (
              this.tell(
                stateful((n, r) => {
                  deferredUnsafeDone(
                    t,
                    K(() => e(n, r)),
                  );
                }),
              ),
              deferredAwait(t)
            );
          });
        }
        tell(e) {
          (this._queue.push(e),
            this._running || ((this._running = !0), this.drainQueueLaterOnExecutor()));
        }
        get await() {
          return async_((e) => {
            let cb = (t) => e(W(t));
            if (this._exitValue !== null) {
              cb(this._exitValue);
              return;
            }
            return (
              this.tell(
                stateful((e, t) => {
                  e._exitValue === null ? e.addObserver(cb) : cb(this._exitValue);
                }),
              ),
              K(() =>
                this.tell(
                  stateful((e, t) => {
                    e.removeObserver(cb);
                  }),
                ),
              )
            );
          }, this.id());
        }
        get inheritAll() {
          return withFiberRuntime((e, t) => {
            let n = e.id(),
              r = e.getFiberRefs(),
              i = t.runtimeFlags,
              a = this.getFiberRefs(),
              o = Kd(r, n, a);
            e.setFiberRefs(o);
            let s = e.getFiberRef(Qg),
              c = pipe(cc(i, s), mc(1), mc(16));
            return updateRuntimeFlags(c);
          });
        }
        get poll() {
          return K(() => fromNullable(this._exitValue));
        }
        unsafePoll() {
          return this._exitValue;
        }
        interruptAsFork(e) {
          return K(() => this.tell(interruptSignal(interrupt(e))));
        }
        unsafeInterruptAsFork(e) {
          this.tell(interruptSignal(interrupt(e)));
        }
        addObserver(e) {
          this._exitValue === null ? this._observers.push(e) : e(this._exitValue);
        }
        removeObserver(e) {
          this._observers = this._observers.filter((t) => t !== e);
        }
        getFiberRefs() {
          return (this.setFiberRef(Qg, this.currentRuntimeFlags), this._fiberRefs);
        }
        unsafeDeleteFiberRef(e) {
          this._fiberRefs = Jd(this._fiberRefs, e);
        }
        getFiberRef(e) {
          return this._fiberRefs.locals.has(e) ? this._fiberRefs.locals.get(e)[0][1] : e.initial;
        }
        setFiberRef(e, t) {
          ((this._fiberRefs = Zd(this._fiberRefs, {
            fiberId: this._fiberId,
            fiberRef: e,
            value: t,
          })),
            this.refreshRefCache());
        }
        refreshRefCache() {
          ((this.currentDefaultServices = this.getFiberRef(Dd)),
            (this.currentTracer = this.currentDefaultServices.unsafeMap.get(bd.key)),
            (this.currentSupervisor = this.getFiberRef($g)),
            (this.currentScheduler = this.getFiberRef(Np)),
            (this.currentContext = this.getFiberRef(Al)),
            (this.currentSpan = this.currentContext.unsafeMap.get(xd.key)));
        }
        setFiberRefs(e) {
          ((this._fiberRefs = e), this.refreshRefCache());
        }
        addChild(e) {
          this.getChildren().add(e);
        }
        removeChild(e) {
          this.getChildren().delete(e);
        }
        transferChildren(e) {
          let t = this._children;
          if (((this._children = null), t !== null && t.size > 0))
            for (let n of t) n._exitValue === null && e.add(this.currentRuntimeFlags, n);
        }
        drainQueueOnCurrentThread() {
          let e = !0;
          for (; e;) {
            let t = Pg,
              n = globalThis[Tm];
            globalThis[Tm] = this;
            try {
              for (; t === Pg;)
                t =
                  this._queue.length === 0
                    ? Fg
                    : this.evaluateMessageWhileSuspended(this._queue.splice(0, 1)[0]);
            } finally {
              ((this._running = !1), (globalThis[Tm] = n));
            }
            this._queue.length > 0 && !this._running
              ? ((this._running = !0),
                t === Ig ? (this.drainQueueLaterOnExecutor(), (e = !1)) : (e = !0))
              : (e = !1);
          }
        }
        drainQueueLaterOnExecutor() {
          this.currentScheduler.scheduleTask(this.run, this.getFiberRef(jl), this);
        }
        drainQueueWhileRunning(e, t) {
          let n = t;
          for (; this._queue.length > 0;) {
            let t = this._queue.splice(0, 1)[0];
            n = Vg[t._tag](this, e, n, t);
          }
          return n;
        }
        isInterrupted() {
          return !Vi(this.getFiberRef(Ul));
        }
        addInterruptedCause(e) {
          let t = this.getFiberRef(Ul);
          this.setFiberRef(Ul, zi(t, e));
        }
        processNewInterruptSignal(e) {
          (this.addInterruptedCause(e), this.sendInterruptSignalToAllChildren());
        }
        sendInterruptSignalToAllChildren() {
          if (this._children === null || this._children.size === 0) return !1;
          let e = !1;
          for (let t of this._children) (t.tell(interruptSignal(interrupt(this.id()))), (e = !0));
          return e;
        }
        interruptAllChildren() {
          if (this.sendInterruptSignalToAllChildren()) {
            let e = this._children.values();
            this._children = null;
            let t = !1,
              body = () => {
                let n = e.next();
                return n.done
                  ? K(() => {
                      t = !0;
                    })
                  : asVoid(n.value.await);
              };
            return whileLoop({ while: () => !t, body, step: () => {} });
          }
          return null;
        }
        reportExitValue(e) {
          if (runtimeMetrics(this.currentRuntimeFlags)) {
            let t = this.getFiberRef(Vl),
              n = this.id().startTimeMillis,
              r = Date.now();
            switch ((Ng.unsafeUpdate(r - n, t), Ag.unsafeUpdate(-1, t), e._tag)) {
              case Ae:
                jg.unsafeUpdate(1, t);
                break;
              case Ee:
                Mg.unsafeUpdate(1, t);
                break;
            }
          }
          if (e._tag === `Failure`) {
            let t = this.getFiberRef(zl);
            !Hi(e.cause) &&
              t._tag === `Some` &&
              this.log(`Fiber terminated with an unhandled error`, e.cause, t);
          }
        }
        setExitValue(e) {
          ((this._exitValue = e), this.reportExitValue(e));
          for (let t = this._observers.length - 1; t >= 0; t--) this._observers[t](e);
          this._observers = [];
        }
        getLoggers() {
          return this.getFiberRef(Kg);
        }
        log(e, t, n) {
          let r = I(n) ? n.value : this.getFiberRef(Pl),
            i = this.getFiberRef(Ug);
          if (Uf(i, r)) return;
          let a = this.getFiberRef(Fl),
            o = this.getFiberRef(Nl),
            s = this.getLoggers(),
            c = this.getFiberRefs();
          if (vi(s) > 0) {
            let n = Oa(this.getFiberRef(Dd), mu),
              i = new Date(n.unsafeCurrentTimeMillis());
            withRedactableContext(c, () => {
              for (let n of s)
                n.log({
                  fiberId: this.id(),
                  logLevel: r,
                  message: e,
                  cause: t,
                  context: c,
                  spans: a,
                  annotations: o,
                  date: i,
                });
            });
          }
        }
        evaluateMessageWhileSuspended(e) {
          switch (e._tag) {
            case fm:
              return Ig;
            case lm:
              return (
                this.processNewInterruptSignal(e.cause),
                this._asyncInterruptor !== null &&
                  (this._asyncInterruptor(q(e.cause)), (this._asyncInterruptor = null)),
                Pg
              );
            case dm:
              return (
                (this._asyncInterruptor = null),
                (this._asyncBlockingOn = null),
                this.evaluateEffect(e.effect),
                Pg
              );
            case um:
              return (
                e.onFiber(
                  this,
                  this._exitValue === null
                    ? jf(this.currentRuntimeFlags, this._asyncBlockingOn)
                    : kf,
                ),
                Pg
              );
            default:
              return absurd(e);
          }
        }
        evaluateEffect(e) {
          this.currentSupervisor.onResume(this);
          try {
            let t =
              ic(this.currentRuntimeFlags) && this.isInterrupted()
                ? q(this.getInterruptedCause())
                : e;
            for (; t !== null;) {
              let e = t,
                n = this.runLoop(e);
              if (n === Rg) {
                let e = zg.currentOp;
                ((zg.currentOp = null),
                  e._op === `Yield`
                    ? cooperativeYielding(this.currentRuntimeFlags)
                      ? (this.tell(yieldNow()), this.tell(resume(su)), (t = null))
                      : (t = su)
                    : e._op === `Async` && (t = null));
              } else {
                this.currentRuntimeFlags = pipe(this.currentRuntimeFlags, rc(16));
                let e = this.interruptAllChildren();
                e === null
                  ? (this._queue.length === 0 ? this.setExitValue(n) : this.tell(resume(n)),
                    (t = null))
                  : (t = U(e, () => n));
              }
            }
          } finally {
            this.currentSupervisor.onSuspend(this);
          }
        }
        start(e) {
          if (this._running) this.tell(resume(e));
          else {
            this._running = !0;
            let t = globalThis[Tm];
            globalThis[Tm] = this;
            try {
              this.evaluateEffect(e);
            } finally {
              ((this._running = !1),
                (globalThis[Tm] = t),
                this._queue.length > 0 && this.drainQueueLaterOnExecutor());
            }
          }
        }
        startFork(e) {
          this.tell(resume(e));
        }
        patchRuntimeFlags(e, t) {
          let n = lc(e, t);
          return ((globalThis[Tm] = this), (this.currentRuntimeFlags = n), n);
        }
        initiateAsync(e, t) {
          let n = !1,
            callback = (e) => {
              n || ((n = !0), this.tell(resume(e)));
            };
          ic(e) && (this._asyncInterruptor = callback);
          try {
            t(callback);
          } catch (e) {
            callback(Wc(Li(e)));
          }
        }
        pushStack(e) {
          (this._stack.push(e),
            e._op === `OnStep` &&
              this._steps.push({ refs: this.getFiberRefs(), flags: this.currentRuntimeFlags }));
        }
        popStack() {
          let e = this._stack.pop();
          if (e) return (e._op === `OnStep` && this._steps.pop(), e);
        }
        getNextSuccessCont() {
          let e = this.popStack();
          for (; e;) {
            if (e._op !== `OnFailure`) return e;
            e = this.popStack();
          }
        }
        getNextFailCont() {
          let e = this.popStack();
          for (; e;) {
            if (e._op !== `OnSuccess` && e._op !== `While` && e._op !== `Iterator`) return e;
            e = this.popStack();
          }
        }
        Tag(e) {
          return K(() => ka(this.currentContext, e));
        }
        Left(e) {
          return Uc(e.left);
        }
        None(e) {
          return Uc(new $l());
        }
        Right(e) {
          return J(e.right);
        }
        Some(e) {
          return J(e.value);
        }
        Micro(e) {
          return unsafeAsync((t) => {
            let resume = t,
              n = Ep(xp(e, this.currentContext));
            return (
              n.addObserver((e) => {
                if (e._tag === `Success`) return resume(J(e.value));
                switch (e.cause._tag) {
                  case `Interrupt`:
                    return resume(q(interrupt(Oo)));
                  case `Fail`:
                    return resume(Uc(e.cause.error));
                  case `Die`:
                    return resume(Vc(e.cause.defect));
                }
              }),
              unsafeAsync((e) => {
                ((resume = (t) => {
                  e(sl);
                }),
                  n.unsafeInterrupt());
              })
            );
          });
        }
        [je](e) {
          let t = ge(() => e.effect_instruction_i0()),
            n = this.getNextSuccessCont();
          return n === void 0
            ? ((zg.currentOp = J(t)), Rg)
            : (n._op in Bg || absurd(n), Bg[n._op](this, n, t));
        }
        [Ae](e) {
          let t = e,
            n = this.getNextSuccessCont();
          return n === void 0
            ? ((zg.currentOp = t), Rg)
            : (n._op in Bg || absurd(n), Bg[n._op](this, n, t.effect_instruction_i0));
        }
        [Ee](e) {
          let t = e.effect_instruction_i0,
            n = this.getNextFailCont();
          if (n !== void 0)
            switch (n._op) {
              case De:
              case ke:
                return ic(this.currentRuntimeFlags) && this.isInterrupted()
                  ? q(stripFailures(t))
                  : ge(() => n.effect_instruction_i1(t));
              case `OnStep`:
                return ic(this.currentRuntimeFlags) && this.isInterrupted()
                  ? q(stripFailures(t))
                  : J(q(t));
              case Le:
                return (
                  this.patchRuntimeFlags(this.currentRuntimeFlags, n.patch),
                  ic(this.currentRuntimeFlags) && this.isInterrupted()
                    ? q(zi(t, this.getInterruptedCause()))
                    : q(t)
                );
              default:
                absurd(n);
            }
          else return ((zg.currentOp = q(t)), Rg);
        }
        [Fe](e) {
          return ge(() => e.effect_instruction_i0(this, Af(this.currentRuntimeFlags)));
        }
        Blocked(e) {
          let t = this.getFiberRefs(),
            n = this.currentRuntimeFlags;
          if (this._steps.length > 0) {
            let r = [],
              i = this._steps[this._steps.length - 1],
              a = this.popStack();
            for (; a && a._op !== `OnStep`;) (r.push(a), (a = this.popStack()));
            (this.setFiberRefs(i.refs), (this.currentRuntimeFlags = i.flags));
            let o = hf(i.refs, t),
              s = cc(i.flags, n);
            return J(
              blocked(
                e.effect_instruction_i0,
                withFiberRuntime((t) => {
                  for (; r.length > 0;) t.pushStack(r.pop());
                  return (
                    t.setFiberRefs(gf(t.id(), t.getFiberRefs())(o)),
                    (t.currentRuntimeFlags = lc(s)(t.currentRuntimeFlags)),
                    e.effect_instruction_i1
                  );
                }),
              ),
            );
          }
          return ol((t) =>
            U(forkDaemon(runRequestBlock(e.effect_instruction_i0)), () =>
              t(e.effect_instruction_i1),
            ),
          );
        }
        RunBlocked(e) {
          return runBlockedRequests(e.effect_instruction_i0);
        }
        [Me](e) {
          let t = e.effect_instruction_i0,
            n = this.currentRuntimeFlags,
            r = lc(n, t);
          if (ic(r) && this.isInterrupted()) return q(this.getInterruptedCause());
          if ((this.patchRuntimeFlags(this.currentRuntimeFlags, t), e.effect_instruction_i1)) {
            let t = cc(r, n);
            return (this.pushStack(new RevertFlags(t, e)), ge(() => e.effect_instruction_i1(n)));
          } else return su;
        }
        [Oe](e) {
          return (this.pushStack(e), e.effect_instruction_i0);
        }
        OnStep(e) {
          return (this.pushStack(e), e.effect_instruction_i0);
        }
        [De](e) {
          return (this.pushStack(e), e.effect_instruction_i0);
        }
        [ke](e) {
          return (this.pushStack(e), e.effect_instruction_i0);
        }
        [we](e) {
          return (
            (this._asyncBlockingOn = e.effect_instruction_i1),
            this.initiateAsync(this.currentRuntimeFlags, e.effect_instruction_i0),
            (zg.currentOp = e),
            Rg
          );
        }
        [Ie](e) {
          return ((this._isYielding = !1), (zg.currentOp = e), Rg);
        }
        [Ne](e) {
          let t = e.effect_instruction_i0,
            n = e.effect_instruction_i1;
          return t() ? (this.pushStack(e), n()) : su;
        }
        [Pe](e) {
          return Bg[Pe](this, e, void 0);
        }
        [Te](e) {
          return ge(() => e.commit());
        }
        runLoop(e) {
          let t = e;
          for (this.currentOpCount = 0; ;) {
            if (
              (this.currentRuntimeFlags & 2 && this.currentSupervisor.onEffect(this, t),
              this._queue.length > 0 &&
                (t = this.drainQueueWhileRunning(this.currentRuntimeFlags, t)),
              !this._isYielding)
            ) {
              this.currentOpCount += 1;
              let e = this.currentScheduler.shouldYield(this);
              if (e !== !1) {
                ((this._isYielding = !0), (this.currentOpCount = 0));
                let n = t;
                t = U(ll({ priority: e }), () => n);
              }
            }
            try {
              if (
                ((t = this.currentTracer.context(() => {
                  if (Hg !== t[Nc]._V) {
                    let e = this.getFiberRef(Bl);
                    if (e._tag === `Some`) {
                      let n = t[Nc]._V;
                      this.log(
                        `Executing an Effect versioned ${n} with a Runtime of version ${getCurrentVersion()}, you may want to dedupe the effect dependencies, you can use the language service plugin to detect this at compile time: https://github.com/Effect-TS/language-service`,
                        Fi,
                        e,
                      );
                    }
                  }
                  return this[t._op](t);
                }, this)),
                t === Rg)
              ) {
                let e = zg.currentOp;
                return e._op === `Yield` || e._op === `Async`
                  ? Rg
                  : ((zg.currentOp = null),
                    e._op === `Success` || e._op === `Failure` ? e : q(Li(e)));
              }
            } catch (e) {
              t =
                (t !== Rg && !b(t, `_op`)) || !(t._op in this)
                  ? dieMessage(`Not a valid effect: ${toStringUnknown(t)}`)
                  : isInterruptedException(e)
                    ? q(zi(Li(e), interrupt(Oo)))
                    : Vc(e);
            }
          }
        }
        run = () => {
          this.drainQueueOnCurrentThread();
        };
      }),
      (Ug = globalValue(`effect/FiberRef/currentMinimumLogLevel`, () =>
        fiberRefUnsafeMake(fromLiteral(`Info`)),
      )),
      (loggerWithConsoleLog = (e) =>
        makeLogger((t) => {
          let n = ef(t.context, Dd);
          Oa(n, ld).unsafe.log(e.log(t));
        })),
      (Wg = globalValue(Symbol.for(`effect/Logger/defaultLogger`), () => loggerWithConsoleLog(Nm))),
      (Gg = globalValue(Symbol.for(`effect/Logger/tracerLogger`), () =>
        makeLogger(
          ({ annotations: e, cause: t, context: n, fiberId: r, logLevel: i, message: a }) => {
            let o = nm(Aa(Xd(n, Al), xd));
            if (o._tag === `None` || o.value._tag === `ExternalSpan`) return;
            let s = ka(Xd(n, Dd), mu),
              c = {};
            for (let [t, n] of e) c[t] = n;
            ((c[`effect.fiberId`] = Mo(r)),
              (c[`effect.logLevel`] = i.label),
              t !== null &&
                t._tag !== `Empty` &&
                (c[`effect.cause`] = Qi(t, { renderErrorCause: !0 })),
              o.value.event(
                toStringUnknown(Array.isArray(a) && a.length === 1 ? a[0] : a),
                s.unsafeCurrentTimeNanos(),
                c,
              ));
          },
        ),
      )),
      (Kg = globalValue(Symbol.for(`effect/FiberRef/currentLoggers`), () =>
        fiberRefUnsafeMakeHashSet(gi(Wg, Gg)),
      )),
      (qg = dual(
        (e) => isIterable(e[0]),
        (e, t, n) =>
          withFiberRuntime((r) => {
            let i = n?.batching === !0 || (n?.batching === `inherit` && r.getFiberRef(Rl));
            return n?.discard
              ? Lp(
                  n.concurrency,
                  () =>
                    finalizersMaskInternal(
                      Vd,
                      n?.concurrentFinalizers,
                    )((n) =>
                      i
                        ? forEachConcurrentDiscard(e, (e, r) => n(t(e, r)), !0, !1, 1)
                        : Qc(e, (e, r) => n(t(e, r))),
                    ),
                  () =>
                    finalizersMaskInternal(
                      Hd,
                      n?.concurrentFinalizers,
                    )((n) => forEachConcurrentDiscard(e, (e, r) => n(t(e, r)), i, !1)),
                  (r) =>
                    finalizersMaskInternal(
                      Ud(r),
                      n?.concurrentFinalizers,
                    )((n) => forEachConcurrentDiscard(e, (e, r) => n(t(e, r)), i, !1, r)),
                )
              : Lp(
                  n?.concurrency,
                  () =>
                    finalizersMaskInternal(
                      Vd,
                      n?.concurrentFinalizers,
                    )((n) =>
                      i ? forEachParN(e, 1, (e, r) => n(t(e, r)), !0) : Zc(e, (e, r) => n(t(e, r))),
                    ),
                  () =>
                    finalizersMaskInternal(
                      Hd,
                      n?.concurrentFinalizers,
                    )((n) => forEachParUnbounded(e, (e, r) => n(t(e, r)), i)),
                  (r) =>
                    finalizersMaskInternal(
                      Ud(r),
                      n?.concurrentFinalizers,
                    )((n) => forEachParN(e, r, (e, r) => n(t(e, r)), i)),
                );
          }),
      )),
      (forEachParUnbounded = (e, t, n) =>
        G(() => {
          let r = B(e),
            i = Array(r.length),
            fn = (e, n) => U(t(e, n), (e) => K(() => (i[n] = e)));
          return fl(forEachConcurrentDiscard(r, fn, n, !1), W(i));
        })),
      (forEachConcurrentDiscard = (e, t, n, r, i) =>
        ol((a) =>
          transplant((o) =>
            withFiberRuntime((s) => {
              let c = Array.from(e).reverse(),
                l = c.length;
              if (l === 0) return sl;
              let u = 0,
                d = !1,
                p = i ? Math.min(c.length, i) : c.length,
                m = new Set(),
                h = [],
                interruptAll = () =>
                  m.forEach((e) => {
                    e.currentScheduler.scheduleTask(
                      () => {
                        e.unsafeInterruptAsFork(s.id());
                      },
                      0,
                      e,
                    );
                  }),
                g = [],
                _ = [],
                v = [],
                collectExits = () => {
                  let e = h
                    .filter(({ exit: e }) => e._tag === `Failure`)
                    .sort((e, t) => (e.index < t.index ? -1 : e.index === t.index ? 0 : 1))
                    .map(({ exit: e }) => e);
                  return (e.length === 0 && e.push(su), e);
                },
                runFiber = (e, t = !1) => {
                  let n = uninterruptible(o(e)),
                    r = unsafeForkUnstarted(n, s, s.currentRuntimeFlags, _m);
                  return (
                    s.currentScheduler.scheduleTask(
                      () => {
                        (t && r.unsafeInterruptAsFork(s.id()), r.resume(n));
                      },
                      0,
                      r,
                    ),
                    r
                  );
                },
                onInterruptSignal = () => {
                  (r || ((l -= c.length), (c = [])), (d = !0), interruptAll());
                },
                y = n ? step : exit,
                ee = runFiber(
                  async_((e) => {
                    let pushResult = (e, t) => {
                        e._op === `Blocked`
                          ? v.push(e)
                          : (h.push({ index: t, exit: e }),
                            e._op === `Failure` && !d && onInterruptSignal());
                      },
                      next = () => {
                        if (c.length > 0) {
                          let r = c.pop(),
                            o = u++,
                            returnNextElement = () => {
                              let e = c.pop();
                              return ((o = u++), U(ll(), () => U(y(a(t(e, o))), onRes)));
                            },
                            onRes = (e) =>
                              c.length > 0 && (pushResult(e, o), c.length > 0)
                                ? returnNextElement()
                                : W(e),
                            p = U(y(a(t(r, o))), onRes),
                            ee = runFiber(p);
                          (g.push(ee),
                            m.add(ee),
                            d &&
                              ee.currentScheduler.scheduleTask(
                                () => {
                                  ee.unsafeInterruptAsFork(s.id());
                                },
                                0,
                                ee,
                              ),
                            ee.addObserver((t) => {
                              let r;
                              if (
                                ((r = t._op === `Failure` ? t : t.effect_instruction_i0),
                                _.push(ee),
                                m.delete(ee),
                                pushResult(r, o),
                                h.length === l)
                              )
                                e(W(R(exitCollectAll(collectExits(), { parallel: !0 }), () => su)));
                              else if (v.length + h.length === l) {
                                let t = collectExits(),
                                  r = v.map((e) => e.effect_instruction_i0).reduce(par);
                                e(
                                  W(
                                    blocked(
                                      r,
                                      forEachConcurrentDiscard(
                                        [
                                          R(exitCollectAll(t, { parallel: !0 }), () => su),
                                          ...v.map((e) => e.effect_instruction_i1),
                                        ],
                                        (e) => e,
                                        n,
                                        !0,
                                        i,
                                      ),
                                    ),
                                  ),
                                );
                              } else next();
                            }));
                        }
                      };
                    for (let e = 0; e < p; e++) next();
                  }),
                );
              return asVoid(
                rl(
                  qc(a(join(ee))),
                  ou({
                    onFailure: (e) => {
                      onInterruptSignal();
                      let t = v.length + 1,
                        n = Math.min(typeof i == `number` ? i : v.length, v.length),
                        r = Array.from(v);
                      return async_((i) => {
                        let a = [],
                          o = 0,
                          s = 0,
                          check = (n, s) => (c) => {
                            ((a[n] = c), o++, o === t && i(J(q(e))), r.length > 0 && s && next());
                          },
                          next = () => {
                            (runFiber(r.pop(), !0).addObserver(check(s, !0)), s++);
                          };
                        (ee.addObserver(check(s, !1)), s++);
                        for (let e = 0; e < n; e++) next();
                      });
                    },
                    onSuccess: () => Zc(_, (e) => e.inheritAll),
                  }),
                ),
              );
            }),
          ),
        )),
      (forEachParN = (e, t, n, r) =>
        G(() => {
          let i = B(e),
            a = Array(i.length),
            fn = (e, t) => el(n(e, t), (e) => (a[t] = e));
          return fl(forEachConcurrentDiscard(i, fn, r, !1, t), W(a));
        })),
      (forkDaemon = (e) => forkWithScopeOverride(e, _m)),
      (Jg = __name((e, t, n, r = null) => {
        let i = unsafeMakeChildFiber(e, t, n, r);
        return (i.resume(e), i);
      }, `unsafeFork`)),
      (unsafeForkUnstarted = (e, t, n, r = null) => unsafeMakeChildFiber(e, t, n, r)),
      (unsafeMakeChildFiber = (e, t, n, r = null) => {
        let i = No(),
          a = t.getFiberRefs(),
          o = qd(a, i),
          s = new FiberRuntime(i, o, n),
          c = Xd(o, Al),
          l = s.currentSupervisor;
        return (
          l.onStart(c, e, P(t), s),
          s.addObserver((e) => l.onEnd(e, s)),
          (r === null
            ? pipe(
                t.getFiberRef(Hl),
                R(() => t.scope()),
              )
            : r
          ).add(n, s),
          s
        );
      }),
      (forkWithScopeOverride = (e, t) =>
        withFiberRuntime((n, r) => W(Jg(e, n, r.runtimeFlags, t)))),
      (parallelFinalizers = (e) =>
        contextWithEffect((t) =>
          L(Aa(t, Yg), {
            onNone: () => e,
            onSome: (t) => {
              switch (t.strategy._tag) {
                case `Parallel`:
                  return e;
                case `Sequential`:
                case `ParallelN`:
                  return U(scopeFork(t, Hd), (t) => Zg(e, t));
              }
            },
          }),
        )),
      (parallelNFinalizers = (e) => (t) =>
        contextWithEffect((n) =>
          L(Aa(n, Yg), {
            onNone: () => t,
            onSome: (n) =>
              n.strategy._tag === `ParallelN` && n.strategy.parallelism === e
                ? t
                : U(scopeFork(n, Ud(e)), (e) => Zg(t, e)),
          }),
        )),
      (finalizersMaskInternal = (e, t) => (n) =>
        contextWithEffect((r) =>
          L(Aa(r, Yg), {
            onNone: () => n(identity),
            onSome: (r) => {
              if (t === !0) {
                let t =
                  e._tag === `Parallel`
                    ? parallelFinalizers
                    : e._tag === `Sequential`
                      ? sequentialFinalizers
                      : parallelNFinalizers(e.parallelism);
                switch (r.strategy._tag) {
                  case `Parallel`:
                    return t(n(parallelFinalizers));
                  case `Sequential`:
                    return t(n(sequentialFinalizers));
                  case `ParallelN`:
                    return t(n(parallelNFinalizers(r.strategy.parallelism)));
                }
              } else return n(identity);
            },
          }),
        )),
      (sequentialFinalizers = (e) =>
        contextWithEffect((t) =>
          L(Aa(t, Yg), {
            onNone: () => e,
            onSome: (t) => {
              switch (t.strategy._tag) {
                case `Sequential`:
                  return e;
                case `Parallel`:
                case `ParallelN`:
                  return U(scopeFork(t, Vd), (t) => Zg(e, t));
              }
            },
          }),
        )),
      (Yg = wa(`effect/Scope`)),
      (scopeUnsafeAddFinalizer = (e, t) => {
        e.state._tag === `Open` && e.state.finalizers.set({}, t);
      }),
      (Xg = {
        [Wl]: Wl,
        [Gl]: Gl,
        pipe() {
          return pipeArguments(this, arguments);
        },
        fork(e) {
          return K(() => {
            let t = scopeUnsafeMake(e);
            if (this.state._tag === `Closed`) return ((t.state = this.state), t);
            let n = {},
              fin = (e) => t.close(e);
            return (
              this.state.finalizers.set(n, fin),
              scopeUnsafeAddFinalizer(t, (e) =>
                K(() => {
                  this.state._tag === `Open` && this.state.finalizers.delete(n);
                }),
              ),
              t
            );
          });
        },
        close(e) {
          return G(() => {
            if (this.state._tag === `Closed`) return sl;
            let t = Array.from(this.state.finalizers.values()).reverse();
            return (
              (this.state = { _tag: `Closed`, exit: e }),
              t.length === 0
                ? sl
                : isSequential(this.strategy)
                  ? pipe(
                      Zc(t, (t) => exit(t(e))),
                      U((e) =>
                        pipe(
                          exitCollectAll(e),
                          Kt(exitAsVoid),
                          R(() => su),
                        ),
                      ),
                    )
                  : isParallel(this.strategy)
                    ? pipe(
                        forEachParUnbounded(t, (t) => exit(t(e)), !1),
                        U((e) =>
                          pipe(
                            exitCollectAll(e, { parallel: !0 }),
                            Kt(exitAsVoid),
                            R(() => su),
                          ),
                        ),
                      )
                    : pipe(
                        forEachParN(t, this.strategy.parallelism, (t) => exit(t(e)), !1),
                        U((e) =>
                          pipe(
                            exitCollectAll(e, { parallel: !0 }),
                            Kt(exitAsVoid),
                            R(() => su),
                          ),
                        ),
                      )
            );
          });
        },
        addFinalizer(e) {
          return G(() =>
            this.state._tag === `Closed`
              ? e(this.state.exit)
              : (this.state.finalizers.set({}, e), sl),
          );
        },
      }),
      (scopeUnsafeMake = (e = Ld) => {
        let t = Object.create(Xg);
        return ((t.strategy = e), (t.state = { _tag: `Open`, finalizers: new Map() }), t);
      }),
      (Zg = dual(2, (e, t) => du(e, ja(Ea(Yg, t))))),
      (fiberRefUnsafeMakeSupervisor = (e) => fiberRefUnsafeMakePatch(e, { differ: Dg, fork: Eg })),
      (Qg = fiberRefUnsafeMakeRuntimeFlags(sc)),
      ($g = fiberRefUnsafeMakeSupervisor(vg)),
      (e_ = dual(2, (e, t) =>
        ol((n) =>
          Yc(n(e), {
            onFailure: (e) => Yc(t, { onFailure: (t) => Wc(zi(e, t)), onSuccess: () => Wc(e) }),
            onSuccess: (e) => Ic(t, e),
          }),
        ),
      )),
      (invokeWithInterrupt = (e, t, n) =>
        fiberIdWith((r) =>
          e_(
            U(forkDaemon($c(e)), (e) =>
              async_((r) => {
                let i = t.map((e) => e.listeners.count),
                  checkDone = () => {
                    i.every((e) => e === 0) &&
                      t.every(
                        (e) =>
                          e.result.state.current._tag === `Pending` ||
                          !!(
                            e.result.state.current._tag === `Done` &&
                            exitIsExit(e.result.state.current.effect) &&
                            e.result.state.current.effect._tag === `Failure` &&
                            isInterrupted(e.result.state.current.effect.cause)
                          ),
                      ) &&
                      (a.forEach((e) => e()), n?.(), r(interruptFiber(e)));
                  };
                e.addObserver((e) => {
                  (a.forEach((e) => e()), r(e));
                });
                let a = t.map((e, t) => {
                  let observer = (e) => {
                    ((i[t] = e), checkDone());
                  };
                  return (
                    e.listeners.addObserver(observer), () => e.listeners.removeObserver(observer)
                  );
                });
                return (
                  checkDone(),
                  K(() => {
                    a.forEach((e) => e());
                  })
                );
              }),
            ),
            G(() => {
              let e = t.flatMap((e) => (e.state.completed ? [] : [e]));
              return Qc(e, (e) => ug(e.request, iu(r)));
            }),
          ),
        )));
  }),
  n_,
  r_,
  i_,
  a_,
  o_,
  s_,
  c_,
  l_ = __esmMin(() => {
    (ra(), Y(), (n_ = Ii), (r_ = Bi), (i_ = Hi), (a_ = Ui), (o_ = Zl), (s_ = Qi), (c_ = na));
  }),
  u_,
  d_,
  f_ = __esmMin(() => {
    (Y(), (u_ = scopeClose), (d_ = scopeFork));
  }),
  p_,
  m_,
  h_ = __esmMin(() => {
    ((p_ = `Fold`), (m_ = `FromEffect`));
  }),
  g_,
  __ = __esmMin(() => {
    (Dm(), (g_ = Em));
  }),
  makeDual,
  v_,
  y_,
  AsyncFiberExceptionImpl,
  asyncFiberException,
  b_,
  x_,
  FiberFailureImpl,
  fiberFailure,
  fastPath,
  S_,
  C_,
  w_,
  RuntimeImpl,
  T_,
  E_,
  D_,
  O_,
  k_,
  A_,
  j_ = __esmMin(() => {
    (Pa(),
      D(),
      Po(),
      rf(),
      k(),
      z(),
      A(),
      Pp(),
      f_(),
      ra(),
      Y(),
      Bd(),
      t_(),
      vm(),
      Re(),
      dc(),
      yg(),
      (makeDual = (e) =>
        function () {
          if (arguments.length === 1) {
            let t = arguments[0];
            return (n, ...r) => e(t, n, ...r);
          }
          return e.apply(this, arguments);
        }),
      (v_ = makeDual((e, t, n) => {
        let r = No(),
          i = [[Al, [[r, e.context]]]];
        n?.scheduler && i.push([Np, [[r, n.scheduler]]]);
        let a = tf(e.fiberRefs, { entries: i, forkAs: r });
        n?.updateRefs && (a = n.updateRefs(a, r));
        let o = new FiberRuntime(r, a, e.runtimeFlags),
          s = t;
        n?.scope &&
          (s = U(d_(n.scope, Ld), (e) =>
            fl(
              scopeAddFinalizer(
                e,
                fiberIdWith((e) => (equals$2(e, o.id()) ? sl : pl(o, e))),
              ),
              rl(t, (t) => u_(e, t)),
            ),
          ));
        let c = o.currentSupervisor;
        return (
          c !== vg && (c.onStart(e.context, s, N(), o), o.addObserver((e) => c.onEnd(e, o))),
          _m.add(e.runtimeFlags, o),
          n?.immediate === !1 ? o.resume(s) : o.start(s),
          o
        );
      })),
      (y_ = makeDual((e, t) => {
        let n = S_(e)(t);
        if (n._tag === `Failure`) throw fiberFailure(n.effect_instruction_i0);
        return n.effect_instruction_i0;
      })),
      (AsyncFiberExceptionImpl = class extends Error {
        fiber;
        _tag = `AsyncFiberException`;
        constructor(e) {
          (super(
            `Fiber #${e.id().id} cannot be resolved synchronously. This is caused by using runSync on an effect that performs async work`,
          ),
            (this.fiber = e),
            (this.name = this._tag),
            (this.stack = this.message));
        }
      }),
      (asyncFiberException = (e) => {
        let t = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        let n = new AsyncFiberExceptionImpl(e);
        return ((Error.stackTraceLimit = t), n);
      }),
      (b_ = Symbol.for(`effect/Runtime/FiberFailure`)),
      (x_ = Symbol.for(`effect/Runtime/FiberFailure/Cause`)),
      (FiberFailureImpl = class extends Error {
        [b_];
        [x_];
        constructor(e) {
          let t = na(e)[0];
          (super(t?.message || `An error has occurred`),
            (this[b_] = b_),
            (this[x_] = e),
            (this.name = t ? `(FiberFailure) ${t.name}` : `FiberFailure`),
            t?.stack && (this.stack = t.stack));
        }
        toJSON() {
          return { _id: `FiberFailure`, cause: this[x_].toJSON() };
        }
        toString() {
          return `(FiberFailure) ` + Qi(this[x_], { renderErrorCause: !0 });
        }
        [O]() {
          return this.toString();
        }
      }),
      (fiberFailure = (e) => {
        let t = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        let n = new FiberFailureImpl(e);
        return ((Error.stackTraceLimit = t), n);
      }),
      (fastPath = (e) => {
        let t = e;
        switch (t._op) {
          case `Failure`:
          case `Success`:
            return t;
          case `Left`:
            return exitFail(t.left);
          case `Right`:
            return J(t.right);
          case `Some`:
            return J(t.value);
          case `None`:
            return exitFail(new $l());
        }
      }),
      (S_ = makeDual((e, t) => {
        let n = fastPath(t);
        if (n) return n;
        let r = new SyncScheduler(),
          i = v_(e)(t, { scheduler: r });
        return (
          r.flush(), i.unsafePoll() || ru(capture(asyncFiberException(i), currentSpanFromFiber(i)))
        );
      })),
      (C_ = makeDual((e, t, n) =>
        w_(e, t, n).then((e) => {
          switch (e._tag) {
            case Ae:
              return e.effect_instruction_i0;
            case Ee:
              throw fiberFailure(e.effect_instruction_i0);
          }
        }),
      )),
      (w_ = makeDual(
        (e, t, n) =>
          new Promise((r) => {
            let i = fastPath(t);
            i && r(i);
            let a = v_(e)(t);
            (a.addObserver((e) => {
              r(e);
            }),
              n?.signal !== void 0 &&
                (n.signal.aborted
                  ? a.unsafeInterruptAsFork(a.id())
                  : n.signal.addEventListener(
                      `abort`,
                      () => {
                        a.unsafeInterruptAsFork(a.id());
                      },
                      { once: !0 },
                    )));
          }),
      )),
      (RuntimeImpl = class {
        context;
        runtimeFlags;
        fiberRefs;
        constructor(e, t, n) {
          ((this.context = e), (this.runtimeFlags = t), (this.fiberRefs = n));
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (T_ = __name((e) => new RuntimeImpl(e.context, e.runtimeFlags, e.fiberRefs), `make`)),
      (E_ = oc(1, 32, 4)),
      (D_ = T_({ context: Ta(), runtimeFlags: E_, fiberRefs: nf() })),
      (O_ = v_(D_)),
      (k_ = C_(D_)),
      (A_ = y_(D_)));
  });
function fromEffectContext(e) {
  let t = Object.create(F_);
  return ((t._op_layer = m_), (t.effect = e), t);
}
var M_,
  N_,
  P_,
  F_,
  I_,
  L_,
  R_,
  z_,
  succeedContext,
  B_ = __esmMin(() => {
    (l_(),
      l(),
      A(),
      Y(),
      h_(),
      (M_ = `effect/Layer`),
      (N_ = Symbol.for(M_)),
      (P_ = { _RIn: (e) => e, _E: (e) => e, _ROut: (e) => e }),
      (F_ = {
        [N_]: P_,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (I_ = dual(2, (e, t) => z_(e, { onFailure: t, onSuccess: succeedContext }))),
      (L_ = __name((e) => R_(n_(e)), `fail`)),
      (R_ = __name((e) => fromEffectContext(Wc(e)), `failCause`)),
      (z_ = dual(2, (e, { onFailure: t, onSuccess: n }) => {
        let r = Object.create(F_);
        return ((r._op_layer = p_), (r.layer = e), (r.failureK = t), (r.successK = n), r);
      })),
      (succeedContext = (e) => fromEffectContext(W(e))));
  }),
  V_,
  H_,
  U_,
  W_ = __esmMin(() => {
    (Y(),
      as(),
      (V_ = rs),
      (H_ = (function () {
        let e = Symbol.for(`effect/Data/Error/plainArgs`);
        return {
          BaseEffectError: class extends Kl {
            constructor(t) {
              (super(t?.message, t?.cause ? { cause: t.cause } : void 0),
                t &&
                  (Object.assign(this, t),
                  Object.defineProperty(this, e, { value: t, enumerable: !1 })));
            }
            toJSON() {
              return { ...this[e], ...this };
            }
          },
        }.BaseEffectError;
      })()),
      (U_ = __name((e) => {
        let t = {
          BaseEffectError: class extends H_ {
            _tag = e;
          },
        };
        return ((t.BaseEffectError.prototype.name = e), t.BaseEffectError);
      }, `TaggedError`)));
  }),
  G_,
  K_,
  q_,
  J_,
  Y_,
  X_,
  Z_,
  Q_,
  makeZonedProto,
  $_,
  isTimeZone,
  ev,
  tv,
  nv,
  rv,
  iv,
  makeUtc,
  av,
  ov,
  hasZone,
  sv,
  cv,
  lv,
  uv,
  dv,
  fv,
  pv,
  mv,
  zoneMakeIntl,
  hv,
  gv,
  _v,
  vv,
  yv,
  bv,
  xv,
  toDate,
  zonedOffset,
  offsetToString,
  zonedOffsetIso,
  Sv,
  setPartsDate,
  Cv,
  makeZonedFromAdjusted,
  wv,
  parseOffset,
  calculateNamedOffset,
  Tv,
  formatIsoOffset,
  Ev,
  Dv = __esmMin(() => {
    (l_(),
      D(),
      g(),
      l(),
      y(),
      T(),
      k(),
      z(),
      A(),
      x(),
      (G_ = Symbol.for(`effect/DateTime`)),
      (K_ = Symbol.for(`effect/DateTime/TimeZone`)),
      (q_ = {
        [G_]: G_,
        pipe() {
          return pipeArguments(this, arguments);
        },
        [O]() {
          return this.toString();
        },
        toJSON() {
          return xv(this).toJSON();
        },
      }),
      (J_ = {
        ...q_,
        _tag: `Utc`,
        [S]() {
          return w(this, ye(this.epochMillis));
        },
        [E](e) {
          return $_(e) && e._tag === `Utc` && this.epochMillis === e.epochMillis;
        },
        toString() {
          return `DateTime.Utc(${xv(this).toJSON()})`;
        },
      }),
      (Y_ = {
        ...q_,
        _tag: `Zoned`,
        [S]() {
          return pipe(ye(this.epochMillis), C(hash(this.zone)), w(this));
        },
        [E](e) {
          return (
            $_(e) &&
            e._tag === `Zoned` &&
            this.epochMillis === e.epochMillis &&
            equals$2(this.zone, e.zone)
          );
        },
        toString() {
          return `DateTime.Zoned(${Ev(this)})`;
        },
      }),
      (X_ = {
        [K_]: K_,
        [O]() {
          return this.toString();
        },
      }),
      (Z_ = {
        ...X_,
        _tag: `Named`,
        [S]() {
          return w(this, string(`Named:${this.id}`));
        },
        [E](e) {
          return isTimeZone(e) && e._tag === `Named` && this.id === e.id;
        },
        toString() {
          return `TimeZone.Named(${this.id})`;
        },
        toJSON() {
          return { _id: `TimeZone`, _tag: `Named`, id: this.id };
        },
      }),
      (Q_ = {
        ...X_,
        _tag: `Offset`,
        [S]() {
          return w(this, string(`Offset:${this.offset}`));
        },
        [E](e) {
          return isTimeZone(e) && e._tag === `Offset` && this.offset === e.offset;
        },
        toString() {
          return `TimeZone.Offset(${offsetToString(this.offset)})`;
        },
        toJSON() {
          return { _id: `TimeZone`, _tag: `Offset`, offset: this.offset };
        },
      }),
      (makeZonedProto = (e, t, n) => {
        let r = Object.create(Y_);
        return (
          (r.epochMillis = e),
          (r.zone = t),
          Object.defineProperty(r, "partsUtc", { value: n, enumerable: !1, writable: !0 }),
          Object.defineProperty(r, "adjustedEpochMillis", {
            value: void 0,
            enumerable: !1,
            writable: !0,
          }),
          Object.defineProperty(r, "partsAdjusted", {
            value: void 0,
            enumerable: !1,
            writable: !0,
          }),
          r
        );
      }),
      ($_ = __name((e) => b(e, G_), `isDateTime`)),
      (isTimeZone = (e) => b(e, K_)),
      (ev = __name((e) => isTimeZone(e) && e._tag === `Offset`, `isTimeZoneOffset`)),
      (tv = __name((e) => isTimeZone(e) && e._tag === `Named`, `isTimeZoneNamed`)),
      (nv = __name((e) => e._tag === `Utc`, `isUtc`)),
      (rv = __name((e) => e._tag === `Zoned`, `isZoned`)),
      (iv = u((e, t) => e.epochMillis === t.epochMillis)),
      (makeUtc = (e) => {
        let t = Object.create(J_);
        return (
          (t.epochMillis = e),
          Object.defineProperty(t, "partsUtc", { value: void 0, enumerable: !1, writable: !0 }),
          t
        );
      }),
      (av = __name((e) => {
        let t = e.getTime();
        if (Number.isNaN(t)) throw new o_(`Invalid date`);
        return makeUtc(t);
      }, `unsafeFromDate`)),
      (ov = __name((e) => {
        if ($_(e)) return e;
        if (e instanceof Date) return av(e);
        if (typeof e == `object`) {
          let t = new Date(0);
          return (setPartsDate(t, e), av(t));
        } else if (typeof e == `string` && !hasZone(e)) return av(new Date(e + `Z`));
        return av(new Date(e));
      }, `unsafeMake`)),
      (hasZone = (e) => /Z|[+-]\d{2}$|[+-]\d{2}:?\d{2}$|\]$/.test(e)),
      (sv = -86399999568e5),
      (cv = 864e13 - 840 * 60 * 1e3),
      (lv = __name((e, t) => {
        if (t?.timeZone === void 0 && $_(e) && rv(e)) return e;
        let n = ov(e);
        if (n.epochMillis < sv || n.epochMillis > cv)
          throw RangeError(`Epoch millis out of range: ${n.epochMillis}`);
        let r;
        if (t?.timeZone === void 0) {
          let e = new Date(n.epochMillis).getTimezoneOffset() * -60 * 1e3;
          r = gv(e);
        } else if (isTimeZone(t?.timeZone)) r = t.timeZone;
        else if (typeof t?.timeZone == `number`) r = gv(t.timeZone);
        else {
          let e = yv(t.timeZone);
          if (F(e)) throw new o_(`Invalid time zone: ${t.timeZone}`);
          r = e.value;
        }
        return t?.adjustForTimeZone === !0
          ? makeZonedFromAdjusted(n.epochMillis, r, t?.disambiguation ?? `compatible`)
          : makeZonedProto(n.epochMillis, r, n.partsUtc);
      }, `unsafeMakeZoned`)),
      (uv = liftThrowable(lv)),
      (dv = /^(.{17,35})\[(.+)\]$/),
      (fv = __name((e) => {
        let t = dv.exec(e);
        if (t === null) {
          let t = parseOffset(e);
          return t === null ? N() : uv(e, { timeZone: t });
        }
        let [, n, r] = t;
        return uv(n, { timeZone: r });
      }, `makeZonedFromString`)),
      (pv = globalValue(`effect/DateTime/validZoneCache`, () => new Map())),
      (mv = {
        day: `numeric`,
        month: `numeric`,
        year: `numeric`,
        hour: `numeric`,
        minute: `numeric`,
        second: `numeric`,
        timeZoneName: `longOffset`,
        fractionalSecondDigits: 3,
        hourCycle: `h23`,
      }),
      (zoneMakeIntl = (e) => {
        let t = e.resolvedOptions().timeZone;
        if (pv.has(t)) return pv.get(t);
        let n = Object.create(Z_);
        return ((n.id = t), (n.format = e), pv.set(t, n), n);
      }),
      (hv = __name((e) => {
        if (pv.has(e)) return pv.get(e);
        try {
          return zoneMakeIntl(new Intl.DateTimeFormat(`en-US`, { ...mv, timeZone: e }));
        } catch {
          throw new o_(`Invalid time zone: ${e}`);
        }
      }, `zoneUnsafeMakeNamed`)),
      (gv = __name((e) => {
        let t = Object.create(Q_);
        return ((t.offset = e), t);
      }, `zoneMakeOffset`)),
      (_v = liftThrowable(hv)),
      (vv = /^(?:GMT|[+-])/),
      (yv = __name((e) => {
        if (vv.test(e)) {
          let t = parseOffset(e);
          return t === null ? N() : P(gv(t));
        }
        return _v(e);
      }, `zoneFromString`)),
      (bv = __name((e) => (e._tag === `Offset` ? offsetToString(e.offset) : e.id), `zoneToString`)),
      (xv = __name((e) => new Date(e.epochMillis), `toDateUtc`)),
      (toDate = (e) => {
        if (e._tag === `Utc`) return new Date(e.epochMillis);
        if (e.zone._tag === `Offset`) return new Date(e.epochMillis + e.zone.offset);
        if (e.adjustedEpochMillis !== void 0) return new Date(e.adjustedEpochMillis);
        let t = e.zone.format.formatToParts(e.epochMillis).filter((e) => e.type !== `literal`),
          n = new Date(0);
        return (
          n.setUTCFullYear(Number(t[2].value), Number(t[0].value) - 1, Number(t[1].value)),
          n.setUTCHours(
            Number(t[3].value),
            Number(t[4].value),
            Number(t[5].value),
            Number(t[6].value),
          ),
          (e.adjustedEpochMillis = n.getTime()),
          n
        );
      }),
      (zonedOffset = (e) => toDate(e).getTime() - Sv(e)),
      (offsetToString = (e) => {
        let t = Math.abs(e),
          n = Math.floor(t / (3600 * 1e3)),
          r = Math.round((t % (3600 * 1e3)) / (60 * 1e3));
        return (
          r === 60 && ((n += 1), (r = 0)),
          `${e < 0 ? `-` : `+`}${String(n).padStart(2, `0`)}:${String(r).padStart(2, `0`)}`
        );
      }),
      (zonedOffsetIso = (e) => offsetToString(zonedOffset(e))),
      (Sv = __name((e) => e.epochMillis, `toEpochMillis`)),
      (setPartsDate = (e, t) => {
        if (
          (t.year !== void 0 && e.setUTCFullYear(t.year),
          t.month !== void 0 && e.setUTCMonth(t.month - 1),
          t.day !== void 0 && e.setUTCDate(t.day),
          t.weekDay !== void 0)
        ) {
          let n = t.weekDay - e.getUTCDay();
          e.setUTCDate(e.getUTCDate() + n);
        }
        (t.hours !== void 0 && e.setUTCHours(t.hours),
          t.minutes !== void 0 && e.setUTCMinutes(t.minutes),
          t.seconds !== void 0 && e.setUTCSeconds(t.seconds),
          t.millis !== void 0 && e.setUTCMilliseconds(t.millis));
      }),
      (Cv = 1440 * 60 * 1e3),
      (makeZonedFromAdjusted = (e, t, n) => {
        if (t._tag === `Offset`) return makeZonedProto(e - t.offset, t);
        let r = calculateNamedOffset(e - Cv, e, t),
          i = calculateNamedOffset(e + Cv, e, t);
        if (r === i) return makeZonedProto(e - r, t);
        let a = r < i,
          o = r - i;
        if (a) {
          if (calculateNamedOffset(e - i, e, t) === i) return makeZonedProto(e - i, t);
          let a = makeZonedProto(e - r, t);
          if (e !== toDate(a).getTime())
            switch (n) {
              case `reject`: {
                let n = new Date(e).toISOString();
                throw RangeError(`Gap time: ${n} does not exist in time zone ${t.id}`);
              }
              case `earlier`:
                return makeZonedProto(e - i, t);
              case `compatible`:
              case `later`:
                return a;
            }
          return a;
        }
        if (calculateNamedOffset(e - r, e, t) === r) {
          if (
            n === `earlier` ||
            n === `compatible` ||
            calculateNamedOffset(e - r + o, e + o, t) === r
          )
            return makeZonedProto(e - r, t);
          if (n === `reject`) {
            let n = new Date(e).toISOString();
            throw RangeError(`Ambiguous time: ${n} occurs twice in time zone ${t.id}`);
          }
        }
        return makeZonedProto(e - i, t);
      }),
      (wv = /([+-])(\d{2}):(\d{2})$/),
      (parseOffset = (e) => {
        let t = wv.exec(e);
        if (t === null) return null;
        let [, n, r, i] = t;
        return (n === `+` ? 1 : -1) * (Number(r) * 60 + Number(i)) * 60 * 1e3;
      }),
      (calculateNamedOffset = (e, t, n) => {
        let r = n.format.formatToParts(e).find((e) => e.type === `timeZoneName`)?.value ?? ``;
        if (r === `GMT`) return 0;
        let i = parseOffset(r);
        return i === null ? zonedOffset(makeZonedProto(t, n)) : i;
      }),
      (Tv = __name((e) => xv(e).toISOString(), `formatIso`)),
      (formatIsoOffset = (e) => {
        let t = toDate(e);
        return e._tag === `Utc`
          ? t.toISOString()
          : `${t.toISOString().slice(0, -1)}${zonedOffsetIso(e)}`;
      }),
      (Ev = __name(
        (e) =>
          e.zone._tag === `Offset` ? formatIsoOffset(e) : `${formatIsoOffset(e)}[${e.zone.id}]`,
        `formatIsoZoned`,
      )));
  }),
  toUpperCase,
  toLowerCase,
  capitalize,
  uncapitalize,
  Ov,
  kv = __esmMin(() => {
    ((toUpperCase = (e) => e.toUpperCase()),
      (toLowerCase = (e) => e.toLowerCase()),
      (capitalize = (e) => (e.length === 0 ? e : toUpperCase(e[0]) + e.slice(1))),
      (uncapitalize = (e) => (e.length === 0 ? e : toLowerCase(e[0]) + e.slice(1))),
      (Ov = __name((e) => e.length > 0, `isNonEmpty`)));
  }),
  Av,
  jv,
  Mv,
  Nv,
  Pv,
  Fv,
  Iv,
  Lv,
  Rv,
  zv,
  Bv,
  Vv,
  Hv,
  Uv,
  Wv,
  Gv,
  Kv,
  qv,
  Jv,
  Yv,
  Xv,
  Zv,
  Qv,
  $v,
  ey,
  ty,
  ny = __esmMin(() => {
    (rm(),
      Y(),
      t_(),
      j_(),
      (Av = Pc),
      (jv = qg),
      (Mv = cl),
      (Nv = $p),
      (Pv = W),
      (Fv = G),
      (Iv = sl),
      (Lv = Rc),
      (Rv = qp),
      (zv = zc),
      (Bv = Jp),
      (Vv = el),
      (Hv = tl),
      (Uv = nl),
      (Wv = Yp),
      (Gv = Qp),
      (Kv = Hc),
      (qv = U),
      (Jv = em),
      (Yv = Xp),
      (Xv = Zp),
      (Zv = Kp),
      (Qv = O_),
      ($v = k_),
      (ey = A_),
      (ty = tm));
  }),
  ry,
  iy,
  ay,
  isBigDecimal,
  oy,
  unsafeMakeNormalized,
  sy,
  cy,
  ly,
  normalize,
  uy,
  abs,
  dy,
  fy,
  unsafeFromNumber,
  safeFromNumber,
  py,
  my,
  toExponential,
  unsafeToNumber,
  isZero,
  isNegative,
  hy = __esmMin(() => {
    (D(),
      g(),
      l(),
      T(),
      k(),
      z(),
      A(),
      x(),
      (ry = /^[+-]?\d+$/),
      (iy = Symbol.for(`effect/BigDecimal`)),
      (ay = {
        [iy]: iy,
        [S]() {
          let e = normalize(this);
          return pipe(hash(e.value), C(ye(e.scale)), w(this));
        },
        [E](e) {
          return isBigDecimal(e) && fy(this, e);
        },
        toString() {
          return `BigDecimal(${my(this)})`;
        },
        toJSON() {
          return { _id: `BigDecimal`, value: String(this.value), scale: this.scale };
        },
        [O]() {
          return this.toJSON();
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (isBigDecimal = (e) => b(e, iy)),
      (oy = __name((e, t) => {
        let n = Object.create(ay);
        return ((n.value = e), (n.scale = t), n);
      }, `make`)),
      (unsafeMakeNormalized = (e, t) => {
        if (e !== sy && e % cy === sy) throw RangeError(`Value must be normalized`);
        let n = oy(e, t);
        return ((n.normalized = n), n);
      }),
      (sy = BigInt(0)),
      (cy = BigInt(10)),
      (ly = unsafeMakeNormalized(sy, 0)),
      (normalize = (e) => {
        if (e.normalized === void 0)
          if (e.value === sy) e.normalized = ly;
          else {
            let t = `${e.value}`,
              n = 0;
            for (let e = t.length - 1; e >= 0 && t[e] === `0`; e--) n++;
            n === 0 && (e.normalized = e);
            let r = BigInt(t.substring(0, t.length - n)),
              i = e.scale - n;
            e.normalized = unsafeMakeNormalized(r, i);
          }
        return e.normalized;
      }),
      (uy = dual(2, (e, t) =>
        t > e.scale
          ? oy(e.value * cy ** BigInt(t - e.scale), t)
          : t < e.scale
            ? oy(e.value / cy ** BigInt(e.scale - t), t)
            : e,
      )),
      (abs = (e) => (e.value < sy ? oy(-e.value, e.scale) : e)),
      (dy = u((e, t) =>
        e.scale > t.scale
          ? uy(t, e.scale).value === e.value
          : e.scale < t.scale
            ? uy(e, t.scale).value === t.value
            : e.value === t.value,
      )),
      (fy = dual(2, (e, t) => dy(e, t))),
      (unsafeFromNumber = (e) =>
        Gt(safeFromNumber(e), () => RangeError(`Number must be finite, got ${e}`))),
      (safeFromNumber = (e) => {
        if (!Number.isFinite(e)) return N();
        let t = `${e}`;
        if (t.includes(`e`)) return py(t);
        let [n, r = ``] = t.split(`.`);
        return P(oy(BigInt(`${n}${r}`), r.length));
      }),
      (py = __name((e) => {
        if (e === ``) return P(ly);
        let t,
          n,
          r = e.search(/[eE]/);
        if (r !== -1) {
          let i = e.slice(r + 1);
          if (
            ((t = e.slice(0, r)),
            (n = Number(i)),
            t === `` || !Number.isSafeInteger(n) || !ry.test(i))
          )
            return N();
        } else ((t = e), (n = 0));
        let i,
          a,
          o = t.search(/\./);
        if (o !== -1) {
          let e = t.slice(0, o),
            n = t.slice(o + 1);
          ((i = `${e}${n}`), (a = n.length));
        } else ((i = t), (a = 0));
        if (!ry.test(i)) return N();
        let s = a - n;
        return Number.isSafeInteger(s) ? P(oy(BigInt(i), s)) : N();
      }, `fromString`)),
      (my = __name((e) => {
        let t = normalize(e);
        if (Math.abs(t.scale) >= 16) return toExponential(t);
        let n = t.value < sy,
          r = n ? `${t.value}`.substring(1) : `${t.value}`,
          i,
          a;
        if (t.scale >= r.length) ((i = `0`), (a = `0`.repeat(t.scale - r.length) + r));
        else {
          let e = r.length - t.scale;
          if (e > r.length) {
            let t = e - r.length;
            ((i = `${r}${`0`.repeat(t)}`), (a = ``));
          } else ((a = r.slice(e)), (i = r.slice(0, e)));
        }
        let o = a === `` ? i : `${i}.${a}`;
        return n ? `-${o}` : o;
      }, `format`)),
      (toExponential = (e) => {
        if (isZero(e)) return `0e+0`;
        let t = normalize(e),
          n = `${abs(t).value}`,
          r = n.slice(0, 1),
          i = n.slice(1),
          a = `${isNegative(t) ? `-` : ``}${r}`;
        i !== `` && (a += `.${i}`);
        let o = i.length - t.scale;
        return `${a}e${o >= 0 ? `+` : ``}${o}`;
      }),
      (unsafeToNumber = (e) => Number(my(e))),
      (isZero = (e) => e.value === sy),
      (isNegative = (e) => e.value < sy));
  }),
  toNumber,
  fromString,
  fromNumber,
  gy = __esmMin(() => {
    (z(),
      (toNumber = (e) =>
        e > BigInt(2 ** 53 - 1) || e < BigInt(-(2 ** 53 - 1)) ? N() : P(Number(e))),
      (fromString = (e) => {
        try {
          return e.trim() === `` ? N() : P(BigInt(e));
        } catch {
          return N();
        }
      }),
      (fromNumber = (e) => {
        if (e > 2 ** 53 - 1 || e < -(2 ** 53 - 1)) return N();
        try {
          return P(BigInt(e));
        } catch {
          return N();
        }
      }));
  }),
  _y,
  vy,
  yy = __esmMin(() => {
    (B_(), (_y = I_), (vy = L_));
  }),
  by,
  xy,
  Sy,
  Cy,
  wy,
  Ty,
  Ey,
  Dy,
  Oy,
  ky,
  Ay,
  jy,
  My,
  Ny,
  Py,
  Fy,
  Iy,
  Ly,
  Ry = __esmMin(() => {
    (Pa(),
      Dv(),
      (by = $_),
      (xy = ev),
      (Sy = tv),
      (Cy = nv),
      (wy = rv),
      (Ty = iv),
      (Ey = av),
      (Dy = ov),
      (Oy = lv),
      (ky = fv),
      (Ay = hv),
      (jy = gv),
      (My = yv),
      (Ny = bv),
      (Py = xv),
      (Fy = Sv),
      Ma(`effect/DateTime/CurrentTimeZone`)(),
      (Iy = Tv),
      (Ly = Ev));
  }),
  zy,
  By,
  Vy,
  Hy,
  Uy,
  Wy = __esmMin(() => {
    (x(),
      (zy = Symbol.for(`effect/Encoding/errors/Decode`)),
      (By = __name((e, t) => {
        let n = { _tag: `DecodeException`, [zy]: zy, input: e };
        return (isString(t) && (n.message = t), n);
      }, `DecodeException`)),
      (Vy = Symbol.for(`effect/Encoding/errors/Encode`)),
      (Hy = __name((e, t) => {
        let n = { _tag: `EncodeException`, [Vy]: Vy, input: e };
        return (isString(t) && (n.message = t), n);
      }, `EncodeException`)),
      (Uy = new TextEncoder()));
  });
function getBase64Code(e) {
  if (e >= Jy.length) throw TypeError(`Invalid character ${String.fromCharCode(e)}`);
  let t = Jy[e];
  if (t === 255) throw TypeError(`Invalid character ${String.fromCharCode(e)}`);
  return t;
}
var Gy,
  Ky,
  stripCrlf,
  qy,
  Jy,
  Yy = __esmMin(() => {
    (Nt(),
      Wy(),
      (Gy = __name((e) => {
        let t = e.length,
          n = ``,
          r;
        for (r = 2; r < t; r += 3)
          ((n += qy[e[r - 2] >> 2]),
            (n += qy[((e[r - 2] & 3) << 4) | (e[r - 1] >> 4)]),
            (n += qy[((e[r - 1] & 15) << 2) | (e[r] >> 6)]),
            (n += qy[e[r] & 63]));
        return (
          r === t + 1 && ((n += qy[e[r - 2] >> 2]), (n += qy[(e[r - 2] & 3) << 4]), (n += `==`)),
          r === t &&
            ((n += qy[e[r - 2] >> 2]),
            (n += qy[((e[r - 2] & 3) << 4) | (e[r - 1] >> 4)]),
            (n += qy[(e[r - 1] & 15) << 2]),
            (n += `=`)),
          n
        );
      }, `encode`)),
      (Ky = __name((e) => {
        let t = stripCrlf(e),
          n = t.length;
        if (n % 4 != 0) return M(By(t, `Length must be a multiple of 4, but is ${n}`));
        let r = t.indexOf(`=`);
        if (r !== -1 && (r < n - 2 || (r === n - 2 && t[n - 1] !== `=`)))
          return M(By(t, `Found a '=' character, but it is not at the end`));
        try {
          let e = t.endsWith(`==`) ? 2 : +!!t.endsWith(`=`),
            r = new Uint8Array((n / 4) * 3 - e);
          for (let e = 0, i = 0; e < n; e += 4, i += 3) {
            let n =
              (getBase64Code(t.charCodeAt(e)) << 18) |
              (getBase64Code(t.charCodeAt(e + 1)) << 12) |
              (getBase64Code(t.charCodeAt(e + 2)) << 6) |
              getBase64Code(t.charCodeAt(e + 3));
            ((r[i] = n >> 16), (r[i + 1] = (n >> 8) & 255), (r[i + 2] = n & 255));
          }
          return j(r);
        } catch (e) {
          return M(By(t, e instanceof Error ? e.message : `Invalid input`));
        }
      }, `decode`)),
      (stripCrlf = (e) => e.replace(/[\n\r]/g, ``)),
      (qy = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.split(``)),
      (Jy = [
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
        255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59,
        60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
      ]));
  }),
  encodeBase64,
  Xy,
  encodeUriComponent,
  decodeUriComponent,
  Zy,
  Qy,
  $y = __esmMin(() => {
    (Nt(),
      Yy(),
      Wy(),
      (encodeBase64 = (e) => Gy(typeof e == `string` ? Uy.encode(e) : e)),
      (Xy = __name((e) => Ky(e), `decodeBase64`)),
      (encodeUriComponent = (e) =>
        try_({
          try: () => encodeURIComponent(e),
          catch: (t) => Qy(e, t instanceof Error ? t.message : `Invalid input`),
        })),
      (decodeUriComponent = (e) =>
        try_({
          try: () => decodeURIComponent(e),
          catch: (t) => Zy(e, t instanceof Error ? t.message : `Invalid input`),
        })),
      (Zy = By),
      (Qy = Hy));
  }),
  getKeysForIndexSignature,
  memoizeThunk,
  isNonEmpty,
  isSingle,
  formatPathKey,
  formatPath,
  eb = __esmMin(() => {
    (k(),
      (getKeysForIndexSignature = (e, t) => {
        switch (t._tag) {
          case `StringKeyword`:
          case `TemplateLiteral`:
            return Object.keys(e);
          case `SymbolKeyword`:
            return Object.getOwnPropertySymbols(e);
          case `Refinement`:
            return getKeysForIndexSignature(e, t.from);
        }
      }),
      (memoizeThunk = (e) => {
        let t = !1,
          n;
        return () => (t ? n : ((n = e()), (t = !0), n));
      }),
      (isNonEmpty = (e) => Array.isArray(e)),
      (isSingle = (e) => !Array.isArray(e)),
      (formatPathKey = (e) => `[${formatPropertyKey$1(e)}]`),
      (formatPath = (e) => (isNonEmpty(e) ? e.map(formatPathKey).join(``) : formatPathKey(e))));
  }),
  tb,
  getUnsupportedSchemaErrorMessage,
  getSchemaExtendErrorMessage,
  getASTUnsupportedSchemaErrorMessage,
  getASTUnsupportedKeySchemaErrorMessage,
  getASTUnsupportedLiteralErrorMessage,
  getASTDuplicateIndexSignatureErrorMessage,
  nb,
  rb,
  getASTDuplicatePropertySignatureTransformationErrorMessage,
  getASTDuplicatePropertySignatureErrorMessage,
  ib = __esmMin(() => {
    (H(),
      k(),
      eb(),
      (tb = __name((e, t, n, r) => {
        let i = e;
        return (
          n && V(n) && (i += `\nat path: ${formatPath(n)}`),
          t !== void 0 && (i += `\ndetails: ${t}`),
          r && (i += `\nschema (${r._tag}): ${r}`),
          i
        );
      }, `getErrorMessage`)),
      (getUnsupportedSchemaErrorMessage = (e, t, n) => tb(`Unsupported schema`, e, t, n)),
      (getSchemaExtendErrorMessage = (e, t, n) =>
        tb(`Unsupported schema or overlapping types`, `cannot extend ${e} with ${t}`, n)),
      (getASTUnsupportedSchemaErrorMessage = (e) =>
        getUnsupportedSchemaErrorMessage(void 0, void 0, e)),
      (getASTUnsupportedKeySchemaErrorMessage = (e) =>
        tb(`Unsupported key schema`, void 0, void 0, e)),
      (getASTUnsupportedLiteralErrorMessage = (e) =>
        tb(`Unsupported literal`, `literal value: ${formatUnknown(e)}`)),
      (getASTDuplicateIndexSignatureErrorMessage = (e) =>
        tb(`Duplicate index signature`, `${e} index signature`)),
      (nb = tb(
        `Unsupported index signature parameter`,
        "An index signature parameter type must be `string`, `symbol`, a template literal type or a refinement of the previous types",
      )),
      (rb = tb(
        `Invalid element`,
        `A required element cannot follow an optional element. ts(1257)`,
      )),
      (getASTDuplicatePropertySignatureTransformationErrorMessage = (e) =>
        tb(`Duplicate property signature transformation`, `Duplicate key ${formatUnknown(e)}`)),
      (getASTDuplicatePropertySignatureErrorMessage = (e) =>
        tb(`Duplicate property signature`, `Duplicate key ${formatUnknown(e)}`)));
  }),
  ab,
  ob,
  sb,
  lb,
  ub,
  db,
  fb,
  pb,
  mb,
  hb,
  gb,
  _b,
  vb,
  yb,
  bb = __esmMin(() => {
    ((ab = Symbol.for(`effect/SchemaId/DateFromSelf`)),
      (ob = Symbol.for(`effect/SchemaId/GreaterThan`)),
      (sb = Symbol.for(`effect/SchemaId/GreaterThanOrEqualTo`)),
      (lb = Symbol.for(`effect/SchemaId/LessThan`)),
      (ub = Symbol.for(`effect/SchemaId/LessThanOrEqualTo`)),
      (db = Symbol.for(`effect/SchemaId/Int`)),
      (fb = Symbol.for(`effect/SchemaId/NonNaN`)),
      (pb = Symbol.for(`effect/SchemaId/Finite`)),
      (mb = Symbol.for(`effect/SchemaId/JsonNumber`)),
      (hb = Symbol.for(`effect/SchemaId/Between`)),
      (gb = Symbol.for(`effect/SchemaId/GreaterThanOrEqualToBigint`)),
      (_b = Symbol.for(`effect/SchemaId/BetweenBigint`)),
      (vb = Symbol.for(`effect/SchemaId/MinLength`)),
      (yb = Symbol.for(`effect/SchemaId/Length`)));
  });
function changeMap(e, t) {
  let n = !1,
    r = allocate(e.length);
  for (let i = 0; i < e.length; i++) {
    let a = e[i],
      o = t(a);
    (o !== a && (n = !0), (r[i] = o));
  }
  return n ? r : e;
}
function getBrands(e) {
  return L(Gb(e), {
    onNone: () => ``,
    onSome: (e) => e.map((e) => ` & Brand<${formatUnknown(e)}>`).join(``),
  });
}
var xb,
  Sb,
  Cb,
  wb,
  Tb,
  Eb,
  Db,
  Ob,
  kb,
  Ab,
  jb,
  Mb,
  Nb,
  Pb,
  Fb,
  Ib,
  Lb,
  Rb,
  zb,
  Bb,
  Vb,
  Hb,
  Ub,
  Wb,
  Gb,
  Kb,
  qb,
  Jb,
  Yb,
  Xb,
  Zb,
  Qb,
  $b,
  ex,
  tx,
  nx,
  rx,
  ix,
  hasStableFilter,
  ax,
  ox,
  getJSONIdentifier,
  sx,
  Declaration,
  createASTGuard,
  Literal$1,
  cx,
  lx,
  UniqueSymbol,
  UndefinedKeyword,
  ux,
  NeverKeyword,
  dx,
  fx,
  UnknownKeyword,
  px,
  AnyKeyword,
  mx,
  StringKeyword,
  hx,
  gx,
  NumberKeyword,
  _x,
  vx,
  BooleanKeyword,
  yx,
  bx,
  BigIntKeyword,
  xx,
  SymbolKeyword,
  Sx,
  Cx,
  Type$1,
  OptionalType,
  getRestASTs,
  TupleType,
  formatTuple,
  PropertySignature,
  isParameter,
  IndexSignature,
  TypeLiteral,
  formatIndexSignatures,
  formatTypeLiteral,
  wx,
  Tx,
  Ex,
  Dx,
  unify,
  Ox,
  mapMembers,
  isMembers,
  kx,
  Ax,
  Suspend,
  Refinement$1,
  jx,
  Mx,
  Transformation$1,
  Nx,
  FinalTransformation,
  createTransformationGuard,
  ComposeTransformation,
  Px,
  PropertySignatureTransformation$1,
  TypeLiteralTransformation,
  Fx,
  annotations,
  Ix,
  Lx,
  getTemplateLiteralSpanTypePattern,
  handleTemplateLiteralSpanTypeParens,
  getTemplateLiteralPattern,
  getTemplateLiteralRegExp,
  getTypeLiteralPropertySignature,
  getPropertyKeyIndexedAccess,
  record,
  Rx,
  zx,
  pickAnnotations,
  omitAnnotations,
  Bx,
  typeAST,
  getTransformationFrom,
  encodedAST_,
  encodedAST,
  toJSONAnnotations,
  getEncodedParameter,
  Vx,
  formatKeyword,
  getOrElseExpected,
  getExpected,
  Hx,
  Ux = __esmMin(() => {
    (H(),
      l(),
      y(),
      k(),
      ib(),
      eb(),
      Su(),
      z(),
      Bt(),
      x(),
      Cu(),
      (xb = Symbol.for(`effect/annotation/TypeConstructor`)),
      (Sb = Symbol.for(`effect/annotation/Brand`)),
      (Cb = Symbol.for(`effect/annotation/SchemaId`)),
      (wb = Symbol.for(`effect/annotation/Message`)),
      (Tb = Symbol.for(`effect/annotation/MissingMessage`)),
      (Eb = Symbol.for(`effect/annotation/Identifier`)),
      (Db = Symbol.for(`effect/annotation/Title`)),
      (Ob = Symbol.for(`effect/annotation/AutoTitle`)),
      (kb = Symbol.for(`effect/annotation/Description`)),
      (Ab = Symbol.for(`effect/annotation/Examples`)),
      (jb = Symbol.for(`effect/annotation/Default`)),
      (Mb = Symbol.for(`effect/annotation/JSONSchema`)),
      (Nb = Symbol.for(`effect/annotation/Arbitrary`)),
      (Pb = Symbol.for(`effect/annotation/Pretty`)),
      (Fb = Symbol.for(`effect/annotation/Equivalence`)),
      (Ib = Symbol.for(`effect/annotation/Documentation`)),
      (Lb = Symbol.for(`effect/annotation/Concurrency`)),
      (Rb = Symbol.for(`effect/annotation/Batching`)),
      (zb = Symbol.for(`effect/annotation/ParseIssueTitle`)),
      (Bb = Symbol.for(`effect/annotation/ParseOptions`)),
      (Vb = Symbol.for(`effect/annotation/DecodingFallback`)),
      (Hb = Symbol.for(`effect/annotation/Surrogate`)),
      (Ub = Symbol.for(`effect/annotation/StableFilter`)),
      (Wb = dual(2, (e, t) =>
        Object.prototype.hasOwnProperty.call(e.annotations, t) ? P(e.annotations[t]) : N(),
      )),
      (Gb = Wb(Sb)),
      (Kb = Wb(wb)),
      (qb = Wb(Tb)),
      (Jb = Wb(Db)),
      (Yb = Wb(Ob)),
      (Xb = Wb(Eb)),
      (Zb = Wb(kb)),
      (Qb = Wb(Lb)),
      ($b = Wb(Rb)),
      (ex = Wb(zb)),
      (tx = Wb(Bb)),
      (nx = Wb(Vb)),
      (rx = Wb(Hb)),
      (ix = Wb(Ub)),
      (hasStableFilter = (e) => en(ix(e), (e) => e === !0)),
      (ax = Symbol.for(`effect/annotation/JSONIdentifier`)),
      (ox = Wb(ax)),
      (getJSONIdentifier = (e) => Ht(ox(e), () => Xb(e))),
      (sx = Symbol.for(`effect/schema/ParseJson`)),
      (Declaration = class {
        typeParameters;
        decodeUnknown;
        encodeUnknown;
        annotations;
        _tag = `Declaration`;
        constructor(e, t, n, r = {}) {
          ((this.typeParameters = e),
            (this.decodeUnknown = t),
            (this.encodeUnknown = n),
            (this.annotations = r));
        }
        toString() {
          return R(getExpected(this), () => `<declaration schema>`);
        }
        toJSON() {
          return {
            _tag: this._tag,
            typeParameters: this.typeParameters.map((e) => e.toJSON()),
            annotations: toJSONAnnotations(this.annotations),
          };
        }
      }),
      (createASTGuard = (e) => (t) => t._tag === e),
      (Literal$1 = class {
        static {
          __name(this, `Literal`);
        }
        literal;
        annotations;
        _tag = `Literal`;
        constructor(e, t = {}) {
          ((this.literal = e), (this.annotations = t));
        }
        toString() {
          return R(getExpected(this), () => formatUnknown(this.literal));
        }
        toJSON() {
          return {
            _tag: this._tag,
            literal: isBigInt(this.literal) ? String(this.literal) : this.literal,
            annotations: toJSONAnnotations(this.annotations),
          };
        }
      }),
      (cx = createASTGuard(`Literal`)),
      (lx = new Literal$1(null)),
      (UniqueSymbol = class {
        symbol;
        annotations;
        _tag = `UniqueSymbol`;
        constructor(e, t = {}) {
          ((this.symbol = e), (this.annotations = t));
        }
        toString() {
          return R(getExpected(this), () => formatUnknown(this.symbol));
        }
        toJSON() {
          return {
            _tag: this._tag,
            symbol: String(this.symbol),
            annotations: toJSONAnnotations(this.annotations),
          };
        }
      }),
      (UndefinedKeyword = class {
        annotations;
        _tag = `UndefinedKeyword`;
        constructor(e = {}) {
          this.annotations = e;
        }
        toString() {
          return formatKeyword(this);
        }
        toJSON() {
          return { _tag: this._tag, annotations: toJSONAnnotations(this.annotations) };
        }
      }),
      (ux = new UndefinedKeyword({ [Db]: `undefined` })),
      (NeverKeyword = class {
        annotations;
        _tag = `NeverKeyword`;
        constructor(e = {}) {
          this.annotations = e;
        }
        toString() {
          return formatKeyword(this);
        }
        toJSON() {
          return { _tag: this._tag, annotations: toJSONAnnotations(this.annotations) };
        }
      }),
      (dx = new NeverKeyword({ [Db]: `never` })),
      (fx = createASTGuard(`NeverKeyword`)),
      (UnknownKeyword = class {
        annotations;
        _tag = `UnknownKeyword`;
        constructor(e = {}) {
          this.annotations = e;
        }
        toString() {
          return formatKeyword(this);
        }
        toJSON() {
          return { _tag: this._tag, annotations: toJSONAnnotations(this.annotations) };
        }
      }),
      (px = new UnknownKeyword({ [Db]: `unknown` })),
      (AnyKeyword = class {
        annotations;
        _tag = `AnyKeyword`;
        constructor(e = {}) {
          this.annotations = e;
        }
        toString() {
          return formatKeyword(this);
        }
        toJSON() {
          return { _tag: this._tag, annotations: toJSONAnnotations(this.annotations) };
        }
      }),
      (mx = new AnyKeyword({ [Db]: `any` })),
      (StringKeyword = class {
        annotations;
        _tag = `StringKeyword`;
        constructor(e = {}) {
          this.annotations = e;
        }
        toString() {
          return formatKeyword(this);
        }
        toJSON() {
          return { _tag: this._tag, annotations: toJSONAnnotations(this.annotations) };
        }
      }),
      (hx = new StringKeyword({ [Db]: `string`, [kb]: `a string` })),
      (gx = createASTGuard(`StringKeyword`)),
      (NumberKeyword = class {
        annotations;
        _tag = `NumberKeyword`;
        constructor(e = {}) {
          this.annotations = e;
        }
        toString() {
          return formatKeyword(this);
        }
        toJSON() {
          return { _tag: this._tag, annotations: toJSONAnnotations(this.annotations) };
        }
      }),
      (_x = new NumberKeyword({ [Db]: `number`, [kb]: `a number` })),
      (vx = createASTGuard(`NumberKeyword`)),
      (BooleanKeyword = class {
        annotations;
        _tag = `BooleanKeyword`;
        constructor(e = {}) {
          this.annotations = e;
        }
        toString() {
          return formatKeyword(this);
        }
        toJSON() {
          return { _tag: this._tag, annotations: toJSONAnnotations(this.annotations) };
        }
      }),
      (yx = new BooleanKeyword({ [Db]: `boolean`, [kb]: `a boolean` })),
      (bx = createASTGuard(`BooleanKeyword`)),
      (BigIntKeyword = class {
        annotations;
        _tag = `BigIntKeyword`;
        constructor(e = {}) {
          this.annotations = e;
        }
        toString() {
          return formatKeyword(this);
        }
        toJSON() {
          return { _tag: this._tag, annotations: toJSONAnnotations(this.annotations) };
        }
      }),
      (xx = new BigIntKeyword({ [Db]: `bigint`, [kb]: `a bigint` })),
      (SymbolKeyword = class {
        annotations;
        _tag = `SymbolKeyword`;
        constructor(e = {}) {
          this.annotations = e;
        }
        toString() {
          return formatKeyword(this);
        }
        toJSON() {
          return { _tag: this._tag, annotations: toJSONAnnotations(this.annotations) };
        }
      }),
      (Sx = new SymbolKeyword({ [Db]: `symbol`, [kb]: `a symbol` })),
      (Cx = createASTGuard(`SymbolKeyword`)),
      (Type$1 = class {
        static {
          __name(this, `Type`);
        }
        type;
        annotations;
        constructor(e, t = {}) {
          ((this.type = e), (this.annotations = t));
        }
        toJSON() {
          return { type: this.type.toJSON(), annotations: toJSONAnnotations(this.annotations) };
        }
        toString() {
          return String(this.type);
        }
      }),
      (OptionalType = class extends Type$1 {
        isOptional;
        constructor(e, t, n = {}) {
          (super(e, n), (this.isOptional = t));
        }
        toJSON() {
          return {
            type: this.type.toJSON(),
            isOptional: this.isOptional,
            annotations: toJSONAnnotations(this.annotations),
          };
        }
        toString() {
          return String(this.type) + (this.isOptional ? `?` : ``);
        }
      }),
      (getRestASTs = (e) => e.map((e) => e.type)),
      (TupleType = class {
        elements;
        rest;
        isReadonly;
        annotations;
        _tag = `TupleType`;
        constructor(e, t, n, r = {}) {
          ((this.elements = e), (this.rest = t), (this.isReadonly = n), (this.annotations = r));
          let i = !1,
            a = !1;
          for (let t of e)
            if (t.isOptional) i = !0;
            else if (i) {
              a = !0;
              break;
            }
          if (a || (i && t.length > 1)) throw Error(rb);
        }
        toString() {
          return R(getExpected(this), () => formatTuple(this));
        }
        toJSON() {
          return {
            _tag: this._tag,
            elements: this.elements.map((e) => e.toJSON()),
            rest: this.rest.map((e) => e.toJSON()),
            isReadonly: this.isReadonly,
            annotations: toJSONAnnotations(this.annotations),
          };
        }
      }),
      (formatTuple = (e) => {
        let t = e.elements.map(String).join(`, `);
        return sn(e.rest, {
          onEmpty: () => `readonly [${t}]`,
          onNonEmpty: (n, r) => {
            let i = String(n),
              a = i.includes(` | `) ? `(${i})` : i;
            if (r.length > 0) {
              let n = r.map(String).join(`, `);
              return e.elements.length > 0
                ? `readonly [${t}, ...${a}[], ${n}]`
                : `readonly [...${a}[], ${n}]`;
            } else if (e.elements.length > 0) return `readonly [${t}, ...${a}[]]`;
            else return `ReadonlyArray<${i}>`;
          },
        });
      }),
      (PropertySignature = class extends OptionalType {
        name;
        isReadonly;
        constructor(e, t, n, r, i) {
          (super(t, n, i), (this.name = e), (this.isReadonly = r));
        }
        toString() {
          return (
            (this.isReadonly ? `readonly ` : ``) +
            String(this.name) +
            (this.isOptional ? `?` : ``) +
            `: ` +
            this.type
          );
        }
        toJSON() {
          return {
            name: String(this.name),
            type: this.type.toJSON(),
            isOptional: this.isOptional,
            isReadonly: this.isReadonly,
            annotations: toJSONAnnotations(this.annotations),
          };
        }
      }),
      (isParameter = (e) => {
        switch (e._tag) {
          case `StringKeyword`:
          case `SymbolKeyword`:
          case `TemplateLiteral`:
            return !0;
          case `Refinement`:
            return isParameter(e.from);
        }
        return !1;
      }),
      (IndexSignature = class {
        type;
        isReadonly;
        parameter;
        constructor(e, t, n) {
          if (((this.type = t), (this.isReadonly = n), isParameter(e))) this.parameter = e;
          else throw Error(nb);
        }
        toString() {
          return (this.isReadonly ? `readonly ` : ``) + `[x: ${this.parameter}]: ${this.type}`;
        }
        toJSON() {
          return {
            parameter: this.parameter.toJSON(),
            type: this.type.toJSON(),
            isReadonly: this.isReadonly,
          };
        }
      }),
      (TypeLiteral = class {
        annotations;
        _tag = `TypeLiteral`;
        propertySignatures;
        indexSignatures;
        constructor(e, t, n = {}) {
          this.annotations = n;
          let r = {};
          for (let t = 0; t < e.length; t++) {
            let n = e[t].name;
            if (Object.prototype.hasOwnProperty.call(r, n))
              throw Error(getASTDuplicatePropertySignatureErrorMessage(n));
            r[n] = null;
          }
          let i = { string: !1, symbol: !1 };
          for (let e = 0; e < t.length; e++) {
            let n = getEncodedParameter(t[e].parameter);
            if (gx(n)) {
              if (i.string) throw Error(getASTDuplicateIndexSignatureErrorMessage(`string`));
              i.string = !0;
            } else if (Cx(n)) {
              if (i.symbol) throw Error(getASTDuplicateIndexSignatureErrorMessage(`symbol`));
              i.symbol = !0;
            }
          }
          ((this.propertySignatures = e), (this.indexSignatures = t));
        }
        toString() {
          return R(getExpected(this), () => formatTypeLiteral(this));
        }
        toJSON() {
          return {
            _tag: this._tag,
            propertySignatures: this.propertySignatures.map((e) => e.toJSON()),
            indexSignatures: this.indexSignatures.map((e) => e.toJSON()),
            annotations: toJSONAnnotations(this.annotations),
          };
        }
      }),
      (formatIndexSignatures = (e) => e.map(String).join(`; `)),
      (formatTypeLiteral = (e) => {
        if (e.propertySignatures.length > 0) {
          let t = e.propertySignatures.map(String).join(`; `);
          return e.indexSignatures.length > 0
            ? `{ ${t}; ${formatIndexSignatures(e.indexSignatures)} }`
            : `{ ${t} }`;
        } else if (e.indexSignatures.length > 0)
          return `{ ${formatIndexSignatures(e.indexSignatures)} }`;
        else return `{}`;
      }),
      (wx = createASTGuard(`TypeLiteral`)),
      (Tx = wn(
        Rt(xu, (e) => {
          switch (e._tag) {
            case `AnyKeyword`:
              return 0;
            case `UnknownKeyword`:
              return 1;
            case `ObjectKeyword`:
              return 2;
            case `StringKeyword`:
            case `NumberKeyword`:
            case `BooleanKeyword`:
            case `BigIntKeyword`:
            case `SymbolKeyword`:
              return 3;
          }
          return 4;
        }),
      )),
      (Ex = {
        string: `StringKeyword`,
        number: `NumberKeyword`,
        boolean: `BooleanKeyword`,
        bigint: `BigIntKeyword`,
      }),
      (Dx = __name((e) => In(e, (e) => (kx(e) ? Dx(e.types) : [e])), `flatten`)),
      (unify = (e) => {
        let t = Tx(e),
          n = [],
          r = {},
          i = [];
        for (let e of t)
          switch (e._tag) {
            case `NeverKeyword`:
              break;
            case `AnyKeyword`:
              return [mx];
            case `UnknownKeyword`:
              return [px];
            case `ObjectKeyword`:
            case `UndefinedKeyword`:
            case `VoidKeyword`:
            case `StringKeyword`:
            case `NumberKeyword`:
            case `BooleanKeyword`:
            case `BigIntKeyword`:
            case `SymbolKeyword`:
              r[e._tag] || ((r[e._tag] = e), n.push(e));
              break;
            case `Literal`: {
              let t = typeof e.literal;
              switch (t) {
                case `string`:
                case `number`:
                case `bigint`:
                case `boolean`:
                  !r[Ex[t]] && !i.includes(e.literal) && (i.push(e.literal), n.push(e));
                  break;
                case `object`:
                  i.includes(e.literal) || (i.push(e.literal), n.push(e));
                  break;
              }
              break;
            }
            case `UniqueSymbol`:
              !r.SymbolKeyword && !i.includes(e.symbol) && (i.push(e.symbol), n.push(e));
              break;
            case `TupleType`:
              r.ObjectKeyword || n.push(e);
              break;
            case `TypeLiteral`:
              e.propertySignatures.length === 0 && e.indexSignatures.length === 0
                ? r[`{}`] || ((r[`{}`] = e), n.push(e))
                : r.ObjectKeyword || n.push(e);
              break;
            default:
              n.push(e);
          }
        return n;
      }),
      (Ox = class Union$1 {
        static {
          __name(this, `Union`);
        }
        types;
        annotations;
        static make = (e, t) => (isMembers(e) ? new Union$1(e, t) : e.length === 1 ? e[0] : dx);
        static unify = (e, t) => Union$1.make(unify(Dx(e)), t);
        _tag = `Union`;
        constructor(e, t = {}) {
          ((this.types = e), (this.annotations = t));
        }
        toString() {
          return R(getExpected(this), () => this.types.map(String).join(` | `));
        }
        toJSON() {
          return {
            _tag: this._tag,
            types: this.types.map((e) => e.toJSON()),
            annotations: toJSONAnnotations(this.annotations),
          };
        }
      }),
      (mapMembers = (e, t) => e.map(t)),
      (isMembers = (e) => e.length > 1),
      (kx = createASTGuard(`Union`)),
      (Ax = globalValue(Symbol.for(`effect/Schema/AST/toJSONMemoMap`), () => new WeakMap())),
      (Suspend = class {
        f;
        annotations;
        _tag = `Suspend`;
        constructor(e, t = {}) {
          ((this.f = e), (this.annotations = t), (this.f = memoizeThunk(e)));
        }
        toString() {
          return getExpected(this).pipe(
            Ht(() => qt(liftThrowable(this.f)(), (e) => getExpected(e))),
            R(() => `<suspended schema>`),
          );
        }
        toJSON() {
          let e = this.f(),
            t = Ax.get(e);
          return (
            t ||
            (Ax.set(e, { _tag: this._tag }),
            (t = {
              _tag: this._tag,
              ast: e.toJSON(),
              annotations: toJSONAnnotations(this.annotations),
            }),
            Ax.set(e, t),
            t)
          );
        }
      }),
      (Refinement$1 = class {
        static {
          __name(this, `Refinement`);
        }
        from;
        filter;
        annotations;
        _tag = `Refinement`;
        constructor(e, t, n = {}) {
          ((this.from = e), (this.filter = t), (this.annotations = n));
        }
        toString() {
          return Xb(this).pipe(
            R(() =>
              L(getOrElseExpected(this), {
                onNone: () => `{ ${this.from} | filter }`,
                onSome: (e) => (jx(this.from) ? String(this.from) + ` & ` + e : e),
              }),
            ),
          );
        }
        toJSON() {
          return {
            _tag: this._tag,
            from: this.from.toJSON(),
            annotations: toJSONAnnotations(this.annotations),
          };
        }
      }),
      (jx = createASTGuard(`Refinement`)),
      (Mx = {}),
      (Transformation$1 = class {
        static {
          __name(this, `Transformation`);
        }
        from;
        to;
        transformation;
        annotations;
        _tag = `Transformation`;
        constructor(e, t, n, r = {}) {
          ((this.from = e), (this.to = t), (this.transformation = n), (this.annotations = r));
        }
        toString() {
          return R(getExpected(this), () => `(${String(this.from)} <-> ${String(this.to)})`);
        }
        toJSON() {
          return {
            _tag: this._tag,
            from: this.from.toJSON(),
            to: this.to.toJSON(),
            annotations: toJSONAnnotations(this.annotations),
          };
        }
      }),
      (Nx = createASTGuard(`Transformation`)),
      (FinalTransformation = class {
        decode;
        encode;
        _tag = `FinalTransformation`;
        constructor(e, t) {
          ((this.decode = e), (this.encode = t));
        }
      }),
      (createTransformationGuard = (e) => (t) => t._tag === e),
      (ComposeTransformation = class {
        _tag = `ComposeTransformation`;
      }),
      (Px = new ComposeTransformation()),
      (PropertySignatureTransformation$1 = class {
        static {
          __name(this, `PropertySignatureTransformation`);
        }
        from;
        to;
        decode;
        encode;
        constructor(e, t, n, r) {
          ((this.from = e), (this.to = t), (this.decode = n), (this.encode = r));
        }
      }),
      (TypeLiteralTransformation = class {
        propertySignatureTransformations;
        _tag = `TypeLiteralTransformation`;
        constructor(e) {
          this.propertySignatureTransformations = e;
          let t = {},
            n = {};
          for (let r of e) {
            let e = r.from;
            if (t[e]) throw Error(getASTDuplicatePropertySignatureTransformationErrorMessage(e));
            t[e] = !0;
            let i = r.to;
            if (n[i]) throw Error(getASTDuplicatePropertySignatureTransformationErrorMessage(i));
            n[i] = !0;
          }
        }
      }),
      (Fx = createTransformationGuard(`TypeLiteralTransformation`)),
      (annotations = (e, t) => {
        let n = Object.getOwnPropertyDescriptors(e),
          r = { ...e.annotations };
        delete r[Eb];
        let i = { ...r, ...t },
          a = rx(e);
        return (
          I(a) && (i[Hb] = annotations(a.value, t)),
          (n.annotations.value = i),
          Object.create(Object.getPrototypeOf(e), n)
        );
      }),
      (Ix = `[\\s\\S]*?`),
      (Lx = `[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?`),
      (getTemplateLiteralSpanTypePattern = (e, t) => {
        switch (e._tag) {
          case `Literal`:
            return escape(String(e.literal));
          case `StringKeyword`:
            return Ix;
          case `NumberKeyword`:
            return Lx;
          case `TemplateLiteral`:
            return getTemplateLiteralPattern(e, t, !1);
          case `Union`:
            return e.types.map((e) => getTemplateLiteralSpanTypePattern(e, t)).join(`|`);
        }
      }),
      (handleTemplateLiteralSpanTypeParens = (e, t, n, r) => {
        if (kx(e)) {
          if (n && !r) return `(?:${t})`;
        } else if (!n || !r) return t;
        return `(${t})`;
      }),
      (getTemplateLiteralPattern = (e, t, n) => {
        let r = ``;
        if (e.head !== ``) {
          let i = escape(e.head);
          r += t && n ? `(${i})` : i;
        }
        for (let i of e.spans) {
          let e = getTemplateLiteralSpanTypePattern(i.type, t);
          if (((r += handleTemplateLiteralSpanTypeParens(i.type, e, t, n)), i.literal !== ``)) {
            let e = escape(i.literal);
            r += t && n ? `(${e})` : e;
          }
        }
        return r;
      }),
      (getTemplateLiteralRegExp = (e) => RegExp(`^${getTemplateLiteralPattern(e, !1, !0)}$`)),
      (getTypeLiteralPropertySignature = (e, t) => {
        let n = Sn(e.propertySignatures, (e) => e.name === t);
        if (I(n)) return n.value;
        if (isString(t)) {
          let n;
          for (let r of e.indexSignatures) {
            let e = getEncodedParameter(r.parameter);
            switch (e._tag) {
              case `TemplateLiteral`:
                if (getTemplateLiteralRegExp(e).test(t))
                  return new PropertySignature(t, r.type, !1, !0);
                break;
              case `StringKeyword`:
                n === void 0 && (n = new PropertySignature(t, r.type, !1, !0));
            }
          }
          if (n) return n;
        } else if (isSymbol(t))
          for (let n of e.indexSignatures) {
            let e = getEncodedParameter(n.parameter);
            if (Cx(e)) return new PropertySignature(t, n.type, !1, !0);
          }
      }),
      (getPropertyKeyIndexedAccess = (e, t) => {
        let n = rx(e);
        if (I(n)) return getPropertyKeyIndexedAccess(n.value, t);
        switch (e._tag) {
          case `TypeLiteral`: {
            let n = getTypeLiteralPropertySignature(e, t);
            if (n) return n;
            break;
          }
          case `Union`:
            return new PropertySignature(
              t,
              Ox.make(e.types.map((e) => getPropertyKeyIndexedAccess(e, t).type)),
              !1,
              !0,
            );
          case `Suspend`:
            return getPropertyKeyIndexedAccess(e.f(), t);
          case `Refinement`:
            return getPropertyKeyIndexedAccess(e.from, t);
          case `Transformation`:
            return getPropertyKeyIndexedAccess(e.to, t);
        }
        throw Error(getASTUnsupportedSchemaErrorMessage(e));
      }),
      (record = (e, t) => {
        let n = [],
          r = [],
          go = (e) => {
            switch (e._tag) {
              case `NeverKeyword`:
                break;
              case `StringKeyword`:
              case `SymbolKeyword`:
              case `TemplateLiteral`:
              case `Refinement`:
                r.push(new IndexSignature(e, t, !0));
                break;
              case `Literal`:
                if (isString(e.literal) || isNumber(e.literal))
                  n.push(new PropertySignature(e.literal, t, !1, !0));
                else throw Error(getASTUnsupportedLiteralErrorMessage(e.literal));
                break;
              case `Enums`:
                for (let [r, i] of e.enums) n.push(new PropertySignature(i, t, !1, !0));
                break;
              case `UniqueSymbol`:
                n.push(new PropertySignature(e.symbol, t, !1, !0));
                break;
              case `Union`:
                e.types.forEach(go);
                break;
              default:
                throw Error(getASTUnsupportedKeySchemaErrorMessage(e));
            }
          };
        return (go(e), { propertySignatures: n, indexSignatures: r });
      }),
      (Rx = __name((e, t) => {
        let n = rx(e);
        if (I(n)) return Rx(n.value, t);
        switch (e._tag) {
          case `TypeLiteral`: {
            let n = [],
              r = {};
            for (let i of e.propertySignatures)
              ((r[i.name] = null), t.includes(i.name) && n.push(i));
            for (let i of t)
              if (!(i in r)) {
                let t = getTypeLiteralPropertySignature(e, i);
                t && n.push(t);
              }
            return new TypeLiteral(n, []);
          }
          case `Union`:
            return new TypeLiteral(
              t.map((t) => getPropertyKeyIndexedAccess(e, t)),
              [],
            );
          case `Suspend`:
            return Rx(e.f(), t);
          case `Refinement`:
            return Rx(e.from, t);
          case `Transformation`:
            switch (e.transformation._tag) {
              case `ComposeTransformation`:
                return new Transformation$1(Rx(e.from, t), Rx(e.to, t), Px);
              case `TypeLiteralTransformation`: {
                let n = [],
                  r = [];
                for (let i of t) {
                  let t = e.transformation.propertySignatureTransformations.find((e) => e.to === i);
                  t ? (n.push(t), r.push(t.from)) : r.push(i);
                }
                return V(n)
                  ? new Transformation$1(
                      Rx(e.from, r),
                      Rx(e.to, t),
                      new TypeLiteralTransformation(n),
                    )
                  : Rx(e.from, r);
              }
            }
        }
        throw Error(getASTUnsupportedSchemaErrorMessage(e));
      }, `pick`)),
      (zx = __name((e) => {
        switch (e._tag) {
          case `TupleType`:
            return e.isReadonly === !1 ? e : new TupleType(e.elements, e.rest, !1, e.annotations);
          case `TypeLiteral`: {
            let t = changeMap(e.propertySignatures, (e) =>
                e.isReadonly === !1
                  ? e
                  : new PropertySignature(e.name, e.type, e.isOptional, !1, e.annotations),
              ),
              n = changeMap(e.indexSignatures, (e) =>
                e.isReadonly === !1 ? e : new IndexSignature(e.parameter, e.type, !1),
              );
            return t === e.propertySignatures && n === e.indexSignatures
              ? e
              : new TypeLiteral(t, n, e.annotations);
          }
          case `Union`: {
            let t = changeMap(e.types, zx);
            return t === e.types ? e : Ox.make(t, e.annotations);
          }
          case `Suspend`:
            return new Suspend(() => zx(e.f()), e.annotations);
          case `Refinement`: {
            let t = zx(e.from);
            return t === e.from ? e : new Refinement$1(t, e.filter, e.annotations);
          }
          case `Transformation`: {
            let t = zx(e.from),
              n = zx(e.to);
            return t === e.from && n === e.to
              ? e
              : new Transformation$1(t, n, e.transformation, e.annotations);
          }
        }
        return e;
      }, `mutable`)),
      (pickAnnotations = (e) => (t) => {
        let n;
        for (let r of e)
          Object.prototype.hasOwnProperty.call(t.annotations, r) &&
            (n === void 0 && (n = {}), (n[r] = t.annotations[r]));
        return n;
      }),
      (omitAnnotations = (e) => (t) => {
        let n = { ...t.annotations };
        for (let t of e) delete n[t];
        return n;
      }),
      (Bx = pickAnnotations([Ab, jb, Mb, Nb, Pb, Fb])),
      (typeAST = (e) => {
        switch (e._tag) {
          case `Declaration`: {
            let t = changeMap(e.typeParameters, typeAST);
            return t === e.typeParameters
              ? e
              : new Declaration(t, e.decodeUnknown, e.encodeUnknown, e.annotations);
          }
          case `TupleType`: {
            let t = changeMap(e.elements, (e) => {
                let t = typeAST(e.type);
                return t === e.type ? e : new OptionalType(t, e.isOptional);
              }),
              n = getRestASTs(e.rest),
              r = changeMap(n, typeAST);
            return t === e.elements && r === n
              ? e
              : new TupleType(
                  t,
                  r.map((e) => new Type$1(e)),
                  e.isReadonly,
                  e.annotations,
                );
          }
          case `TypeLiteral`: {
            let t = changeMap(e.propertySignatures, (e) => {
                let t = typeAST(e.type);
                return t === e.type
                  ? e
                  : new PropertySignature(e.name, t, e.isOptional, e.isReadonly);
              }),
              n = changeMap(e.indexSignatures, (e) => {
                let t = typeAST(e.type);
                return t === e.type ? e : new IndexSignature(e.parameter, t, e.isReadonly);
              });
            return t === e.propertySignatures && n === e.indexSignatures
              ? e
              : new TypeLiteral(t, n, e.annotations);
          }
          case `Union`: {
            let t = changeMap(e.types, typeAST);
            return t === e.types ? e : Ox.make(t, e.annotations);
          }
          case `Suspend`:
            return new Suspend(() => typeAST(e.f()), e.annotations);
          case `Refinement`: {
            let t = typeAST(e.from);
            return t === e.from ? e : new Refinement$1(t, e.filter, e.annotations);
          }
          case `Transformation`: {
            let t = Bx(e);
            return typeAST(t === void 0 ? e.to : annotations(e.to, t));
          }
        }
        return e;
      }),
      (getTransformationFrom = (e) => {
        switch (e._tag) {
          case `Transformation`:
            return e.from;
          case `Refinement`:
            return getTransformationFrom(e.from);
          case `Suspend`:
            return getTransformationFrom(e.f());
        }
      }),
      (encodedAST_ = (e, t) => {
        switch (e._tag) {
          case `Declaration`: {
            let n = changeMap(e.typeParameters, (e) => encodedAST_(e, t));
            return n === e.typeParameters
              ? e
              : new Declaration(n, e.decodeUnknown, e.encodeUnknown);
          }
          case `TupleType`: {
            let n = changeMap(e.elements, (e) => {
                let n = encodedAST_(e.type, t);
                return n === e.type ? e : new OptionalType(n, e.isOptional);
              }),
              r = getRestASTs(e.rest),
              i = changeMap(r, (e) => encodedAST_(e, t));
            return n === e.elements && i === r
              ? e
              : new TupleType(
                  n,
                  i.map((e) => new Type$1(e)),
                  e.isReadonly,
                );
          }
          case `TypeLiteral`: {
            let n = changeMap(e.propertySignatures, (e) => {
                let n = encodedAST_(e.type, t);
                return n === e.type
                  ? e
                  : new PropertySignature(e.name, n, e.isOptional, e.isReadonly);
              }),
              r = changeMap(e.indexSignatures, (e) => {
                let n = encodedAST_(e.type, t);
                return n === e.type ? e : new IndexSignature(e.parameter, n, e.isReadonly);
              });
            return n === e.propertySignatures && r === e.indexSignatures
              ? e
              : new TypeLiteral(n, r);
          }
          case `Union`: {
            let n = changeMap(e.types, (e) => encodedAST_(e, t));
            return n === e.types ? e : Ox.make(n);
          }
          case `Suspend`: {
            let n,
              r = getJSONIdentifier(e);
            if (I(r)) {
              let e = t ? `Bound` : ``;
              n = { [ax]: `${r.value}Encoded${e}` };
            }
            return new Suspend(() => encodedAST_(e.f(), t), n);
          }
          case `Refinement`: {
            let n = encodedAST_(e.from, t);
            return t
              ? n === e.from
                ? e
                : getTransformationFrom(e.from) === void 0 && hasStableFilter(e)
                  ? new Refinement$1(n, e.filter, e.annotations)
                  : n
              : n;
          }
          case `Transformation`:
            return encodedAST_(e.from, t);
        }
        return e;
      }),
      (encodedAST = (e) => encodedAST_(e, !1)),
      (toJSONAnnotations = (e) => {
        let t = {};
        for (let n of Object.getOwnPropertySymbols(e)) t[String(n)] = e[n];
        return t;
      }),
      (getEncodedParameter = (e) => {
        switch (e._tag) {
          case `StringKeyword`:
          case `SymbolKeyword`:
          case `TemplateLiteral`:
            return e;
          case `Refinement`:
            return getEncodedParameter(e.from);
        }
      }),
      (Vx = __name((e, t) => new Transformation$1(e, t, Px), `compose`)),
      (formatKeyword = (e) => R(getExpected(e), () => e._tag)),
      (getOrElseExpected = (e) =>
        Jb(e).pipe(
          Ht(() => Zb(e)),
          Ht(() => Yb(e)),
          Kt((t) => t + getBrands(e)),
        )),
      (getExpected = (e) => Ht(Xb(e), () => getOrElseExpected(e))),
      (Hx = __name((e, t, n) => {
        switch (e._tag) {
          case `UndefinedKeyword`:
            return dx;
          case `Union`: {
            let n = [],
              r = !1;
            for (let i of e.types) {
              let e = t(i);
              e ? ((r = !0), fx(e) || n.push(e)) : n.push(i);
            }
            if (r) return Ox.make(n);
            break;
          }
          case `Suspend`:
            return t(e.f());
          case `Transformation`:
            return n(e);
        }
      }, `pruneUndefined`)));
  });
function sortByIndex(e) {
  return e.sort(compare).map((e) => e[1]);
}
function getRefinementExpected(e) {
  return Zb(e).pipe(
    Ht(() => Jb(e)),
    Ht(() => Yb(e)),
    Ht(() => Xb(e)),
    R(() => `{ ${e.from} | filter }`),
  );
}
function getDefaultTypeMessage(e) {
  return e.message === void 0
    ? `Expected ${jx(e.ast) ? getRefinementExpected(e.ast) : String(e.ast)}, actual ${formatUnknown(e.actual)}`
    : e.message;
}
var Pointer,
  Unexpected,
  Missing,
  Composite$1,
  Refinement,
  Transformation,
  Type,
  Forbidden,
  Wx,
  ParseError,
  parseError,
  Z,
  Gx,
  Kx,
  qx,
  Jx,
  Yx,
  Xx,
  Zx,
  Qx,
  $x,
  mergeInternalOptions,
  getEither,
  getSync,
  getEffect,
  decodeUnknownSync,
  eS,
  tS,
  encodeUnknownSync,
  encodeUnknown,
  nS,
  rS,
  validateSync,
  is,
  iS,
  aS,
  oS,
  sS,
  goMemo,
  getConcurrency,
  getBatching,
  go,
  fromRefinement,
  getLiterals,
  getSearchTree,
  dropRightRefinement,
  handleForbidden,
  compare,
  getFinalTransformation,
  makeTree,
  cS,
  drawTree,
  draw,
  formatTransformationKind,
  formatRefinementKind,
  getAnnotated,
  lS,
  getCurrentMessage,
  createParseIssueGuard,
  uS,
  dS,
  fS,
  getMessage,
  getParseIssueTitleAnnotation,
  formatTypeMessage,
  getParseIssueTitle,
  formatForbiddenMessage,
  formatUnexpectedMessage,
  formatMissingMessage,
  formatTree,
  pS = __esmMin(() => {
    (H(),
      l_(),
      W_(),
      ny(),
      Nt(),
      cm(),
      l(),
      y(),
      k(),
      eb(),
      z(),
      x(),
      Pp(),
      Ux(),
      (Pointer = class {
        path;
        actual;
        issue;
        _tag = `Pointer`;
        constructor(e, t, n) {
          ((this.path = e), (this.actual = t), (this.issue = n));
        }
      }),
      (Unexpected = class {
        actual;
        message;
        _tag = `Unexpected`;
        constructor(e, t) {
          ((this.actual = e), (this.message = t));
        }
      }),
      (Missing = class {
        ast;
        message;
        _tag = `Missing`;
        actual = void 0;
        constructor(e, t) {
          ((this.ast = e), (this.message = t));
        }
      }),
      (Composite$1 = class {
        static {
          __name(this, `Composite`);
        }
        ast;
        actual;
        issues;
        output;
        _tag = `Composite`;
        constructor(e, t, n, r) {
          ((this.ast = e), (this.actual = t), (this.issues = n), (this.output = r));
        }
      }),
      (Refinement = class {
        ast;
        actual;
        kind;
        issue;
        _tag = `Refinement`;
        constructor(e, t, n, r) {
          ((this.ast = e), (this.actual = t), (this.kind = n), (this.issue = r));
        }
      }),
      (Transformation = class {
        ast;
        actual;
        kind;
        issue;
        _tag = `Transformation`;
        constructor(e, t, n, r) {
          ((this.ast = e), (this.actual = t), (this.kind = n), (this.issue = r));
        }
      }),
      (Type = class {
        ast;
        actual;
        message;
        _tag = `Type`;
        constructor(e, t, n) {
          ((this.ast = e), (this.actual = t), (this.message = n));
        }
      }),
      (Forbidden = class {
        ast;
        actual;
        message;
        _tag = `Forbidden`;
        constructor(e, t, n) {
          ((this.ast = e), (this.actual = t), (this.message = n));
        }
      }),
      (Wx = Symbol.for(`effect/Schema/ParseErrorTypeId`)),
      (ParseError = class extends U_(`ParseError`) {
        [Wx] = Wx;
        get message() {
          return this.toString();
        }
        toString() {
          return cS.formatIssueSync(this.issue);
        }
        toJSON() {
          return { _id: `ParseError`, message: this.toString() };
        }
        [O]() {
          return this.toJSON();
        }
      }),
      (parseError = (e) => new ParseError({ issue: e })),
      (Z = j),
      (Gx = M),
      (Kx = try_),
      (qx = St),
      (Jx = Ct),
      (Yx = dual(2, (e, t) => (Jx(e) ? kt(e, { onLeft: M, onRight: t }) : qv(e, t)))),
      (Xx = dual(2, (e, t) => (Jx(e) ? Ot(e, t) : Vv(e, t)))),
      (Zx = dual(2, (e, t) => (Jx(e) ? Dt(e, t) : Uv(e, t)))),
      (Qx = dual(2, (e, t) =>
        Jx(e) ? Et(e, { onLeft: t.onFailure, onRight: t.onSuccess }) : Hv(e, t),
      )),
      ($x = dual(2, (e, t) => (Jx(e) ? kt(e, { onLeft: t, onRight: j }) : Lv(e, t)))),
      (mergeInternalOptions = (e, t) =>
        t === void 0 || isNumber(t) ? e : e === void 0 ? t : { ...e, ...t }),
      (getEither = (e, t, n) => {
        let r = goMemo(e, t);
        return (e, t) => r(e, mergeInternalOptions(n, t));
      }),
      (getSync = (e, t, n) => {
        let r = getEither(e, t, n);
        return (e, t) => jt(r(e, t), parseError);
      }),
      (getEffect = (e, t, n) => {
        let r = goMemo(e, t);
        return (e, t) => r(e, { ...mergeInternalOptions(n, t), isEffectAllowed: !0 });
      }),
      (decodeUnknownSync = (e, t) => getSync(e.ast, !0, t)),
      (eS = __name((e, t) => getEither(e.ast, !0, t), `decodeUnknownEither`)),
      (tS = __name((e, t) => getEffect(e.ast, !0, t), `decodeUnknown`)),
      (encodeUnknownSync = (e, t) => getSync(e.ast, !1, t)),
      (encodeUnknown = (e, t) => getEffect(e.ast, !1, t)),
      (nS = decodeUnknownSync),
      (rS = tS),
      (validateSync = (e, t) => getSync(typeAST(e.ast), !0, t)),
      (is = (e, t) => {
        let n = goMemo(typeAST(e.ast), !0);
        return (e, r) => Tt(n(e, { exact: !0, ...mergeInternalOptions(t, r) }));
      }),
      (iS = encodeUnknownSync),
      (aS = encodeUnknown),
      (oS = globalValue(Symbol.for(`effect/ParseResult/decodeMemoMap`), () => new WeakMap())),
      (sS = globalValue(Symbol.for(`effect/ParseResult/encodeMemoMap`), () => new WeakMap())),
      (goMemo = (e, t) => {
        let n = t ? oS : sS,
          r = n.get(e);
        if (r) return r;
        let i = go(e, t),
          a = tx(e),
          o = I(a) ? (e, t) => i(e, mergeInternalOptions(t, a.value)) : i,
          s = nx(e),
          c = t && I(s) ? (t, n) => handleForbidden($x(o(t, n), s.value), e, t, n) : o;
        return (n.set(e, c), c);
      }),
      (getConcurrency = (e) => Wt(Qb(e))),
      (getBatching = (e) => Wt($b(e))),
      (go = (e, t) => {
        switch (e._tag) {
          case `Refinement`:
            if (t) {
              let t = goMemo(e.from, !0);
              return (n, r) => {
                r ??= Mx;
                let i = r?.errors === `all`,
                  a = Yx(
                    $x(t(n, r), (t) => {
                      let a = new Refinement(e, n, `From`, t);
                      return i && hasStableFilter(e) && uS(t)
                        ? L(e.filter(n, r, e), {
                            onNone: () => M(a),
                            onSome: (t) =>
                              M(new Composite$1(e, n, [a, new Refinement(e, n, `Predicate`, t)])),
                          })
                        : M(a);
                    }),
                    (t) =>
                      L(e.filter(t, r, e), {
                        onNone: () => j(t),
                        onSome: (t) => M(new Refinement(e, n, `Predicate`, t)),
                      }),
                  );
                return handleForbidden(a, e, n, r);
              };
            } else {
              let t = goMemo(typeAST(e), !0),
                n = goMemo(dropRightRefinement(e.from), !1);
              return (r, i) =>
                handleForbidden(
                  Yx(t(r, i), (e) => n(e, i)),
                  e,
                  r,
                  i,
                );
            }
          case `Transformation`: {
            let n = getFinalTransformation(e.transformation, t),
              r = t ? goMemo(e.from, !0) : goMemo(e.to, !1),
              i = t ? goMemo(e.to, !0) : goMemo(e.from, !1);
            return (a, o) =>
              handleForbidden(
                Yx(
                  Zx(r(a, o), (n) => new Transformation(e, a, t ? `Encoded` : `Type`, n)),
                  (r) =>
                    Yx(
                      Zx(n(r, o ?? Mx, e, a), (t) => new Transformation(e, a, `Transformation`, t)),
                      (n) =>
                        Zx(i(n, o), (n) => new Transformation(e, a, t ? `Type` : `Encoded`, n)),
                    ),
                ),
                e,
                a,
                o,
              );
          }
          case `Declaration`: {
            let n = t ? e.decodeUnknown(...e.typeParameters) : e.encodeUnknown(...e.typeParameters);
            return (t, r) => handleForbidden(n(t, r ?? Mx, e), e, t, r);
          }
          case `Literal`:
            return fromRefinement(e, (t) => t === e.literal);
          case `UniqueSymbol`:
            return fromRefinement(e, (t) => t === e.symbol);
          case `UndefinedKeyword`:
            return fromRefinement(e, isUndefined);
          case `NeverKeyword`:
            return fromRefinement(e, isNever);
          case `UnknownKeyword`:
          case `AnyKeyword`:
          case `VoidKeyword`:
            return j;
          case `StringKeyword`:
            return fromRefinement(e, isString);
          case `NumberKeyword`:
            return fromRefinement(e, isNumber);
          case `BooleanKeyword`:
            return fromRefinement(e, isBoolean);
          case `BigIntKeyword`:
            return fromRefinement(e, isBigInt);
          case `SymbolKeyword`:
            return fromRefinement(e, isSymbol);
          case `ObjectKeyword`:
            return fromRefinement(e, te);
          case `Enums`:
            return fromRefinement(e, (t) => e.enums.some(([e, n]) => n === t));
          case `TemplateLiteral`: {
            if (e.spans.every((e) => gx(e.type)))
              return fromRefinement(e, (t) => {
                if (!isString(t) || !t.startsWith(e.head)) return !1;
                let n = e.head.length;
                for (let r = 0; r < e.spans.length - 1; r++) {
                  let i = e.spans[r].literal,
                    a = t.indexOf(i, n);
                  if (a === -1) return !1;
                  n = a + i.length;
                }
                let r = e.spans[e.spans.length - 1].literal;
                return t.endsWith(r) && t.length - r.length >= n;
              });
            let t = getTemplateLiteralRegExp(e);
            return fromRefinement(e, (e) => isString(e) && t.test(e));
          }
          case `TupleType`: {
            let n = e.elements.map((e) => goMemo(e.type, t)),
              r = e.rest.map((e) => goMemo(e.type, t)),
              i = e.elements.filter((e) => !e.isOptional);
            e.rest.length > 0 && (i = i.concat(e.rest.slice(1)));
            let a = i.length,
              o = e.elements.length > 0 ? e.elements.map((e, t) => t).join(` | `) : `never`,
              s = getConcurrency(e),
              c = getBatching(e);
            return (t, l) => {
              if (!dn(t)) return M(new Type(e, t));
              let u = l?.errors === `all`,
                d = [],
                p = 0,
                m = [],
                h = t.length;
              for (let n = h; n <= a - 1; n++) {
                let r = new Pointer(n, t, new Missing(i[n - h]));
                if (u) {
                  d.push([p++, r]);
                  continue;
                } else return M(new Composite$1(e, t, r, m));
              }
              if (e.rest.length === 0)
                for (let n = e.elements.length; n <= h - 1; n++) {
                  let r = new Pointer(n, t, new Unexpected(t[n], `is unexpected, expected: ${o}`));
                  if (u) {
                    d.push([p++, r]);
                    continue;
                  } else return M(new Composite$1(e, t, r, m));
                }
              let g = 0,
                _;
              for (; g < n.length; g++)
                if (h < g + 1) {
                  if (e.elements[g].isOptional) continue;
                } else {
                  let r = n[g],
                    i = r(t[g], l);
                  if (Jx(i)) {
                    if (wt(i)) {
                      let n = new Pointer(g, t, i.left);
                      if (u) {
                        d.push([p++, n]);
                        continue;
                      } else return M(new Composite$1(e, t, n, sortByIndex(m)));
                    }
                    m.push([p++, i.right]);
                  } else {
                    let n = p++,
                      r = g;
                    ((_ ||= []),
                      _.push(({ es: a, output: o }) =>
                        qv(Kv(i), (i) => {
                          if (wt(i)) {
                            let s = new Pointer(r, t, i.left);
                            return u
                              ? (a.push([n, s]), Iv)
                              : M(new Composite$1(e, t, s, sortByIndex(o)));
                          }
                          return (o.push([n, i.right]), Iv);
                        }),
                      ));
                  }
                }
              if (V(r)) {
                let [n, ...i] = r;
                for (; g < h - i.length; g++) {
                  let r = n(t[g], l);
                  if (Jx(r))
                    if (wt(r)) {
                      let n = new Pointer(g, t, r.left);
                      if (u) {
                        d.push([p++, n]);
                        continue;
                      } else return M(new Composite$1(e, t, n, sortByIndex(m)));
                    } else m.push([p++, r.right]);
                  else {
                    let n = p++,
                      i = g;
                    ((_ ||= []),
                      _.push(({ es: a, output: o }) =>
                        qv(Kv(r), (r) => {
                          if (wt(r)) {
                            let s = new Pointer(i, t, r.left);
                            return u
                              ? (a.push([n, s]), Iv)
                              : M(new Composite$1(e, t, s, sortByIndex(o)));
                          } else return (o.push([n, r.right]), Iv);
                        }),
                      ));
                  }
                }
                for (let n = 0; n < i.length; n++) {
                  let r = g + n;
                  if (!(h < r + 1)) {
                    let a = i[n](t[r], l);
                    if (Jx(a)) {
                      if (wt(a)) {
                        let n = new Pointer(r, t, a.left);
                        if (u) {
                          d.push([p++, n]);
                          continue;
                        } else return M(new Composite$1(e, t, n, sortByIndex(m)));
                      }
                      m.push([p++, a.right]);
                    } else {
                      let n = p++;
                      ((_ ||= []),
                        _.push(({ es: i, output: o }) =>
                          qv(Kv(a), (a) => {
                            if (wt(a)) {
                              let s = new Pointer(r, t, a.left);
                              return u
                                ? (i.push([n, s]), Iv)
                                : M(new Composite$1(e, t, s, sortByIndex(o)));
                            }
                            return (o.push([n, a.right]), Iv);
                          }),
                        ));
                    }
                  }
                }
              }
              let computeResult = ({ es: n, output: r }) =>
                mn(n)
                  ? M(new Composite$1(e, t, sortByIndex(n), sortByIndex(r)))
                  : j(sortByIndex(r));
              if (_ && _.length > 0) {
                let e = _;
                return Fv(() => {
                  let t = { es: An(d), output: An(m) };
                  return qv(
                    jv(e, (e) => e(t), { concurrency: s, batching: c, discard: !0 }),
                    () => computeResult(t),
                  );
                });
              }
              return computeResult({ output: m, es: d });
            };
          }
          case `TypeLiteral`: {
            if (e.propertySignatures.length === 0 && e.indexSignatures.length === 0)
              return fromRefinement(e, isNotNullable);
            let n = [],
              r = {},
              i = [];
            for (let a of e.propertySignatures)
              (n.push([goMemo(a.type, t), a]), (r[a.name] = null), i.push(a.name));
            let a = e.indexSignatures.map((e) => [
                goMemo(e.parameter, t),
                goMemo(e.type, t),
                e.parameter,
              ]),
              o = Ox.make(
                e.indexSignatures
                  .map((e) => e.parameter)
                  .concat(i.map((e) => (isSymbol(e) ? new UniqueSymbol(e) : new Literal$1(e)))),
              ),
              s = goMemo(o, t),
              c = getConcurrency(e),
              l = getBatching(e);
            return (t, u) => {
              if (!isRecord(t)) return M(new Type(e, t));
              let d = u?.errors === `all`,
                p = [],
                m = 0,
                h = u?.onExcessProperty === `error`,
                g = u?.onExcessProperty === `preserve`,
                _ = {},
                v;
              if (h || g) {
                v = Reflect.ownKeys(t);
                for (let n of v) {
                  let r = s(n, u);
                  if (Jx(r) && wt(r))
                    if (h) {
                      let r = new Pointer(
                        n,
                        t,
                        new Unexpected(t[n], `is unexpected, expected: ${String(o)}`),
                      );
                      if (d) {
                        p.push([m++, r]);
                        continue;
                      } else return M(new Composite$1(e, t, r, _));
                    } else _[n] = t[n];
                }
              }
              let y,
                ee = u?.exact === !0;
              for (let r = 0; r < n.length; r++) {
                let i = n[r][1],
                  a = i.name,
                  o = Object.prototype.hasOwnProperty.call(t, a);
                if (!o) {
                  if (i.isOptional) continue;
                  if (ee) {
                    let n = new Pointer(a, t, new Missing(i));
                    if (d) {
                      p.push([m++, n]);
                      continue;
                    } else return M(new Composite$1(e, t, n, _));
                  }
                }
                let s = n[r][0],
                  c = s(t[a], u);
                if (Jx(c)) {
                  if (wt(c)) {
                    let n = new Pointer(a, t, o ? c.left : new Missing(i));
                    if (d) {
                      p.push([m++, n]);
                      continue;
                    } else return M(new Composite$1(e, t, n, _));
                  }
                  _[a] = c.right;
                } else {
                  let n = m++,
                    r = a;
                  ((y ||= []),
                    y.push(({ es: a, output: s }) =>
                      qv(Kv(c), (c) => {
                        if (wt(c)) {
                          let l = new Pointer(r, t, o ? c.left : new Missing(i));
                          return d ? (a.push([n, l]), Iv) : M(new Composite$1(e, t, l, s));
                        }
                        return ((s[r] = c.right), Iv);
                      }),
                    ));
                }
              }
              for (let n = 0; n < a.length; n++) {
                let i = a[n],
                  o = i[0],
                  s = i[1],
                  c = getKeysForIndexSignature(t, i[2]);
                for (let n of c) {
                  let i = o(n, u);
                  if (Jx(i) && Tt(i)) {
                    let i = s(t[n], u);
                    if (Jx(i))
                      if (wt(i)) {
                        let r = new Pointer(n, t, i.left);
                        if (d) {
                          p.push([m++, r]);
                          continue;
                        } else return M(new Composite$1(e, t, r, _));
                      } else Object.prototype.hasOwnProperty.call(r, n) || (_[n] = i.right);
                    else {
                      let a = m++,
                        o = n;
                      ((y ||= []),
                        y.push(({ es: s, output: c }) =>
                          qv(Kv(i), (i) => {
                            if (wt(i)) {
                              let n = new Pointer(o, t, i.left);
                              return d ? (s.push([a, n]), Iv) : M(new Composite$1(e, t, n, c));
                            } else
                              return (
                                Object.prototype.hasOwnProperty.call(r, n) || (c[n] = i.right), Iv
                              );
                          }),
                        ));
                    }
                  }
                }
              }
              let computeResult = ({ es: n, output: r }) => {
                if (mn(n)) return M(new Composite$1(e, t, sortByIndex(n), r));
                if (u?.propertyOrder === `original`) {
                  let e = v || Reflect.ownKeys(t);
                  for (let t of i) e.indexOf(t) === -1 && e.push(t);
                  let n = {};
                  for (let t of e) Object.prototype.hasOwnProperty.call(r, t) && (n[t] = r[t]);
                  return j(n);
                }
                return j(r);
              };
              if (y && y.length > 0) {
                let e = y;
                return Fv(() => {
                  let t = { es: An(p), output: Object.assign({}, _) };
                  return qv(
                    jv(e, (e) => e(t), { concurrency: c, batching: l, discard: !0 }),
                    () => computeResult(t),
                  );
                });
              }
              return computeResult({ es: p, output: _ });
            };
          }
          case `Union`: {
            let n = getSearchTree(e.types, t),
              r = Reflect.ownKeys(n.keys),
              i = r.length,
              a = e.types.length,
              o = new Map();
            for (let n = 0; n < a; n++) o.set(e.types[n], goMemo(e.types[n], t));
            let s = getConcurrency(e) ?? 1,
              c = getBatching(e);
            return (t, l) => {
              let u = [],
                d = 0,
                p = [];
              if (i > 0)
                if (isRecordOrArray(t))
                  for (let e = 0; e < i; e++) {
                    let i = r[e],
                      o = n.keys[i].buckets;
                    if (Object.prototype.hasOwnProperty.call(t, i)) {
                      let e = String(t[i]);
                      if (Object.prototype.hasOwnProperty.call(o, e)) p = p.concat(o[e]);
                      else {
                        let { candidates: e, literals: r } = n.keys[i],
                          o = Ox.make(r),
                          s =
                            e.length === a
                              ? new TypeLiteral([new PropertySignature(i, o, !1, !0)], [])
                              : Ox.make(e);
                        u.push([d++, new Composite$1(s, t, new Pointer(i, t, new Type(o, t[i])))]);
                      }
                    } else {
                      let { candidates: e, literals: r } = n.keys[i],
                        o = new PropertySignature(i, Ox.make(r), !1, !0),
                        s = e.length === a ? new TypeLiteral([o], []) : Ox.make(e);
                      u.push([d++, new Composite$1(s, t, new Pointer(i, t, new Missing(o)))]);
                    }
                  }
                else {
                  let r = n.candidates.length === a ? e : Ox.make(n.candidates);
                  u.push([d++, new Type(r, t)]);
                }
              n.otherwise.length > 0 && (p = p.concat(n.otherwise));
              let m;
              for (let e = 0; e < p.length; e++) {
                let n = p[e],
                  r = o.get(n)(t, l);
                if (Jx(r) && (!m || m.length === 0)) {
                  if (Tt(r)) return r;
                  u.push([d++, r.left]);
                } else {
                  let e = d++;
                  ((m ||= []),
                    m.push((t) =>
                      Fv(() =>
                        `finalResult` in t
                          ? Iv
                          : qv(
                              Kv(r),
                              (n) => (Tt(n) ? (t.finalResult = n) : t.es.push([e, n.left]), Iv),
                            ),
                      ),
                    ));
                }
              }
              let computeResult = (n) =>
                mn(n)
                  ? n.length === 1 && n[0][1]._tag === `Type`
                    ? M(n[0][1])
                    : M(new Composite$1(e, t, sortByIndex(n)))
                  : M(new Type(e, t));
              if (m && m.length > 0) {
                let e = m;
                return Fv(() => {
                  let t = { es: An(u) };
                  return qv(
                    jv(e, (e) => e(t), { concurrency: s, batching: c, discard: !0 }),
                    () => (`finalResult` in t ? t.finalResult : computeResult(t.es)),
                  );
                });
              }
              return computeResult(u);
            };
          }
          case `Suspend`: {
            let n = memoizeThunk(() => goMemo(e.f(), t));
            return (e, t) => n()(e, t);
          }
        }
      }),
      (fromRefinement = (e, t) => (n) => (t(n) ? j(n) : M(new Type(e, n)))),
      (getLiterals = (e, t) => {
        switch (e._tag) {
          case `Declaration`: {
            let n = rx(e);
            if (I(n)) return getLiterals(n.value, t);
            break;
          }
          case `TypeLiteral`: {
            let n = [];
            for (let r = 0; r < e.propertySignatures.length; r++) {
              let i = e.propertySignatures[r],
                a = t ? encodedAST(i.type) : typeAST(i.type);
              cx(a) && !i.isOptional && n.push([i.name, a]);
            }
            return n;
          }
          case `TupleType`: {
            let n = [];
            for (let r = 0; r < e.elements.length; r++) {
              let i = e.elements[r],
                a = t ? encodedAST(i.type) : typeAST(i.type);
              cx(a) && !i.isOptional && n.push([r, a]);
            }
            return n;
          }
          case `Refinement`:
            return getLiterals(e.from, t);
          case `Suspend`:
            return getLiterals(e.f(), t);
          case `Transformation`:
            return getLiterals(t ? e.from : e.to, t);
        }
        return [];
      }),
      (getSearchTree = (e, t) => {
        let n = {},
          r = [],
          i = [];
        for (let a = 0; a < e.length; a++) {
          let o = e[a],
            s = getLiterals(o, t);
          if (s.length > 0) {
            i.push(o);
            for (let e = 0; e < s.length; e++) {
              let [t, r] = s[e],
                i = String(r.literal);
              n[t] = n[t] || { buckets: {}, literals: [], candidates: [] };
              let a = n[t].buckets;
              if (Object.prototype.hasOwnProperty.call(a, i)) {
                if (e < s.length - 1) continue;
                (a[i].push(o), n[t].literals.push(r), n[t].candidates.push(o));
              } else {
                ((a[i] = [o]), n[t].literals.push(r), n[t].candidates.push(o));
                break;
              }
            }
          } else r.push(o);
        }
        return { keys: n, otherwise: r, candidates: i };
      }),
      (dropRightRefinement = (e) => (jx(e) ? dropRightRefinement(e.from) : e)),
      (handleForbidden = (e, t, n, r) => {
        if (r?.isEffectAllowed === !0 || Jx(e)) return e;
        let i = new SyncScheduler(),
          a = Qv(e, { scheduler: i });
        i.flush();
        let o = a.unsafePoll();
        if (o) {
          if (am(o)) return j(o.value);
          let e = o.cause;
          return r_(e) ? M(e.error) : M(new Forbidden(t, n, s_(e)));
        }
        return M(
          new Forbidden(
            t,
            n,
            `cannot be be resolved synchronously, this is caused by using runSync on an effect that performs async work`,
          ),
        );
      }),
      (compare = ([e], [t]) => (e > t ? 1 : e < t ? -1 : 0)),
      (getFinalTransformation = (e, t) => {
        switch (e._tag) {
          case `FinalTransformation`:
            return t ? e.decode : e.encode;
          case `ComposeTransformation`:
            return j;
          case `TypeLiteralTransformation`:
            return (n) => {
              let r = j(n);
              for (let n of e.propertySignatureTransformations) {
                let [e, i] = t ? [n.from, n.to] : [n.to, n.from],
                  a = t ? n.decode : n.encode,
                  f = (t) => {
                    let n = a(Object.prototype.hasOwnProperty.call(t, e) ? P(t[e]) : N());
                    return (delete t[e], I(n) && (t[i] = n.value), t);
                  };
                r = Xx(r, f);
              }
              return r;
            };
        }
      }),
      (makeTree = (e, t = []) => ({ value: e, forest: t })),
      (cS = {
        formatIssue: (e) => Xx(formatTree(e), drawTree),
        formatIssueSync: (e) => {
          let t = cS.formatIssue(e);
          return Jx(t) ? Mt(t) : ey(t);
        },
        formatError: (e) => cS.formatIssue(e.issue),
        formatErrorSync: (e) => cS.formatIssueSync(e.issue),
      }),
      (drawTree = (e) =>
        e.value +
        draw(
          `
`,
          e.forest,
        )),
      (draw = (e, t) => {
        let n = ``,
          r = t.length,
          i;
        for (let a = 0; a < r; a++) {
          i = t[a];
          let o = a === r - 1;
          ((n += e + (o ? `└` : `├`) + `─ ` + i.value),
            (n += draw(e + (r > 1 && !o ? `│  ` : `   `), i.forest)));
        }
        return n;
      }),
      (formatTransformationKind = (e) => {
        switch (e) {
          case `Encoded`:
            return `Encoded side transformation failure`;
          case `Transformation`:
            return `Transformation process failure`;
          case `Type`:
            return `Type side transformation failure`;
        }
      }),
      (formatRefinementKind = (e) => {
        switch (e) {
          case `From`:
            return `From side refinement failure`;
          case `Predicate`:
            return `Predicate refinement failure`;
        }
      }),
      (getAnnotated = (e) => (`ast` in e ? P(e.ast) : N())),
      (lS = j(void 0)),
      (getCurrentMessage = (e) =>
        getAnnotated(e).pipe(
          qt(Kb),
          L({
            onNone: () => lS,
            onSome: (t) => {
              let n = t(e);
              return isString(n)
                ? j({ message: n, override: !1 })
                : Av(n)
                  ? Vv(n, (e) => ({ message: e, override: !1 }))
                  : isString(n.message)
                    ? j({ message: n.message, override: n.override })
                    : Vv(n.message, (e) => ({ message: e, override: n.override }));
            },
          }),
        )),
      (createParseIssueGuard = (e) => (t) => t._tag === e),
      (uS = createParseIssueGuard(`Composite`)),
      (dS = createParseIssueGuard(`Refinement`)),
      (fS = createParseIssueGuard(`Transformation`)),
      (getMessage = (e) =>
        Yx(getCurrentMessage(e), (t) =>
          t === void 0
            ? lS
            : !t.override &&
                (uS(e) || (dS(e) && e.kind === `From`) || (fS(e) && e.kind !== `Transformation`))
              ? fS(e) || dS(e)
                ? getMessage(e.issue)
                : lS
              : j(t.message),
        )),
      (getParseIssueTitleAnnotation = (e) =>
        getAnnotated(e).pipe(
          qt(ex),
          Jt((t) => t(e)),
          Wt,
        )),
      (formatTypeMessage = (e) =>
        Xx(getMessage(e), (t) => t ?? getParseIssueTitleAnnotation(e) ?? getDefaultTypeMessage(e))),
      (getParseIssueTitle = (e) => getParseIssueTitleAnnotation(e) ?? String(e.ast)),
      (formatForbiddenMessage = (e) => e.message ?? `is forbidden`),
      (formatUnexpectedMessage = (e) => e.message ?? `is unexpected`),
      (formatMissingMessage = (e) => {
        let t = qb(e.ast);
        if (I(t)) {
          let e = t.value();
          return isString(e) ? j(e) : e;
        }
        return j(e.message ?? `is missing`);
      }),
      (formatTree = (e) => {
        switch (e._tag) {
          case `Type`:
            return Xx(formatTypeMessage(e), makeTree);
          case `Forbidden`:
            return j(makeTree(getParseIssueTitle(e), [makeTree(formatForbiddenMessage(e))]));
          case `Unexpected`:
            return j(makeTree(formatUnexpectedMessage(e)));
          case `Missing`:
            return Xx(formatMissingMessage(e), makeTree);
          case `Transformation`:
            return Yx(getMessage(e), (t) =>
              t === void 0
                ? Xx(formatTree(e.issue), (t) =>
                    makeTree(getParseIssueTitle(e), [
                      makeTree(formatTransformationKind(e.kind), [t]),
                    ]),
                  )
                : j(makeTree(t)),
            );
          case `Refinement`:
            return Yx(getMessage(e), (t) =>
              t === void 0
                ? Xx(formatTree(e.issue), (t) =>
                    makeTree(getParseIssueTitle(e), [makeTree(formatRefinementKind(e.kind), [t])]),
                  )
                : j(makeTree(t)),
            );
          case `Pointer`:
            return Xx(formatTree(e.issue), (t) => makeTree(formatPath(e.path), [t]));
          case `Composite`:
            return Yx(getMessage(e), (t) => {
              if (t !== void 0) return j(makeTree(t));
              let n = getParseIssueTitle(e);
              return isNonEmpty(e.issues)
                ? Xx(jv(e.issues, formatTree), (e) => makeTree(n, e))
                : Xx(formatTree(e.issues), (e) => makeTree(n, [e]));
            });
        }
      }));
  }),
  mS,
  hS,
  gS = __esmMin(() => {
    (l(),
      x(),
      (mS = dual(
        (e) => te(e[0]),
        (e, ...t) => {
          let n = {};
          for (let r of t) r in e && (n[r] = e[r]);
          return n;
        },
      )),
      (hS = dual(
        (e) => te(e[0]),
        (e, ...t) => {
          let n = { ...e };
          for (let e of t) delete n[e];
          return n;
        },
      )));
  });
function make$2(e) {
  return class SchemaClass {
    [_S] = vS;
    static ast = e;
    static annotations(e) {
      return make$2(mergeSchemaAnnotations(this.ast, e));
    }
    static pipe() {
      return pipeArguments(this, arguments);
    }
    static toString() {
      return String(e);
    }
    static Type;
    static Encoded;
    static Context;
    static [_S] = vS;
  };
}
function asSchema(e) {
  return e;
}
function getDefaultLiteralAST(e) {
  return isMembers(e) ? Ox.make(mapMembers(e, (e) => new Literal$1(e))) : new Literal$1(e[0]);
}
function makeLiteralClass(e, t = getDefaultLiteralAST(e)) {
  return class LiteralClass extends make$2(t) {
    static annotations(e) {
      return makeLiteralClass(this.literals, mergeSchemaAnnotations(this.ast, e));
    }
    static literals = [...e];
  };
}
function Literal(...e) {
  return V(e) ? makeLiteralClass(e) : Never;
}
function makeDeclareClass(e, t) {
  return class DeclareClass extends make$2(t) {
    static annotations(e) {
      return makeDeclareClass(this.typeParameters, mergeSchemaAnnotations(this.ast, e));
    }
    static typeParameters = [...e];
  };
}
function makeUnionClass(e, t = getDefaultUnionAST(e)) {
  return class UnionClass extends make$2(t) {
    static annotations(e) {
      return makeUnionClass(this.members, mergeSchemaAnnotations(this.ast, e));
    }
    static members = [...e];
  };
}
function Union(...e) {
  return isMembers(e) ? makeUnionClass(e) : V(e) ? e[0] : Never;
}
function makeTupleTypeClass(e, t, n = getDefaultTupleTypeAST(e, t)) {
  return class TupleTypeClass extends make$2(n) {
    static annotations(e) {
      return makeTupleTypeClass(this.elements, this.rest, mergeSchemaAnnotations(this.ast, e));
    }
    static elements = [...e];
    static rest = [...t];
  };
}
function Tuple(...e) {
  return Array.isArray(e[0]) ? makeTupleTypeClass(e[0], e.slice(1)) : makeTupleTypeClass(e, []);
}
function makeArrayClass(e, t) {
  return class ArrayClass extends makeTupleTypeClass([], [e], t) {
    static annotations(e) {
      return makeArrayClass(this.value, mergeSchemaAnnotations(this.ast, e));
    }
    static value = e;
  };
}
function makeTypeLiteralClass(e, t, n = getDefaultTypeLiteralAST(e, t)) {
  return class TypeLiteralClass extends make$2(n) {
    static annotations(e) {
      return makeTypeLiteralClass(this.fields, this.records, mergeSchemaAnnotations(this.ast, e));
    }
    static fields = { ...e };
    static records = [...t];
    static make = (t, n) => {
      let r = lazilyMergeDefaults(e, { ...t });
      return getDisableValidationMakeOption(n) ? r : validateSync(this)(r);
    };
    static pick(...t) {
      return Struct(mS(e, ...t));
    }
    static omit(...t) {
      return Struct(hS(e, ...t));
    }
  };
}
function Struct(e, ...t) {
  return makeTypeLiteralClass(e, t);
}
function makeRecordClass(e, t, n) {
  return class RecordClass extends makeTypeLiteralClass({}, [{ key: e, value: t }], n) {
    static annotations(n) {
      return makeRecordClass(e, t, mergeSchemaAnnotations(this.ast, n));
    }
    static key = e;
    static value = t;
  };
}
function makeBrandClass(e, t) {
  return class BrandClass extends make$2(t) {
    static annotations(e) {
      return makeBrandClass(this.from, mergeSchemaAnnotations(this.ast, e));
    }
    static make = (e, t) => (getDisableValidationMakeOption(t) ? e : validateSync(this)(e));
    static from = e;
  };
}
function makeRefineClass(e, t, n) {
  return class RefineClass extends make$2(n) {
    static annotations(e) {
      return makeRefineClass(this.from, this.filter, mergeSchemaAnnotations(this.ast, e));
    }
    static [FS] = e;
    static from = e;
    static filter = t;
    static make = (e, t) => (getDisableValidationMakeOption(t) ? e : validateSync(this)(e));
  };
}
function filter(e, t) {
  return (n) => {
    function filter(t, n, r) {
      return toFilterParseIssue(e(t, n, r), r, t);
    }
    return makeRefineClass(n, filter, new Refinement$1(n.ast, filter, toASTAnnotations(t)));
  };
}
function makeTransformationClass(e, t, n) {
  return class TransformationClass extends make$2(n) {
    static annotations(e) {
      return makeTransformationClass(this.from, this.to, mergeSchemaAnnotations(this.ast, e));
    }
    static from = e;
    static to = t;
  };
}
function parseNumber(e) {
  return Q(e, Number$, {
    strict: !1,
    decode: (e, t, n) =>
      qx(parse(e), () => new Type(n, e, `Unable to decode ${JSON.stringify(e)} into a number`)),
    encode: (e) => Z(String(e)),
  });
}
function Option(e) {
  let t = asSchema(e);
  return $(optionEncoded(t), OptionFromSelf(typeSchema(t)), {
    strict: !0,
    decode: (e) => optionDecode(e),
    encode: (e) => L(e, { onNone: () => vC, onSome: makeSomeEncoded }),
  });
}
function getDisableValidationMakeOption(e) {
  return isBoolean(e) ? e : (e?.disableValidation ?? !1);
}
var _S,
  vS,
  yS,
  toASTAnnotations,
  mergeSchemaAnnotations,
  format,
  encodedSchema,
  typeSchema,
  decodeUnknown,
  decodeUnknownEither,
  isSchema,
  declareConstructor,
  declarePrimitive,
  declare,
  bS,
  fromBrand,
  xS,
  instanceOf,
  Undefined,
  Null,
  Never,
  Unknown,
  Any,
  BigIntFromSelf,
  SymbolFromSelf,
  String$,
  Number$,
  Boolean$,
  getDefaultUnionAST,
  NullOr,
  UndefinedOr,
  NullishOr,
  element,
  SS,
  getDefaultTupleTypeAST,
  Array$,
  formatPropertySignatureToken,
  PropertySignatureDeclaration,
  FromPropertySignature,
  ToPropertySignature,
  formatPropertyKey,
  PropertySignatureTransformation,
  mergeSignatureAnnotations,
  CS,
  isPropertySignature,
  wS,
  makePropertySignature,
  TS,
  propertySignature,
  ES,
  applyDefaultValue,
  pruneUndefined,
  DS,
  OS,
  optionalToRequired,
  optionalToOptional,
  optionalPropertySignatureAST,
  optional,
  kS,
  AS,
  getDefaultTypeLiteralAST,
  lazilyMergeDefaults,
  jS,
  TaggedStruct,
  Record,
  pick,
  mutable,
  intersectTypeLiterals,
  MS,
  addRefinementToMembers,
  extendAST,
  getTypes,
  intersectUnionMembers,
  NS,
  PS,
  suspend,
  FS,
  fromFilterPredicateReturnTypeItem,
  toFilterParseIssue,
  Q,
  $,
  IS,
  trimmed,
  LS,
  minLength,
  RS,
  length,
  zS,
  pattern,
  BS,
  lowercased,
  Lowercased,
  VS,
  uppercased,
  Uppercased,
  HS,
  capitalized,
  Capitalized,
  US,
  uncapitalized,
  Uncapitalized,
  nonEmptyString,
  Trimmed,
  NonEmptyTrimmedString,
  getErrorMessage,
  getParseJsonTransformation,
  parseJson,
  WS,
  GS,
  KS,
  qS,
  URLFromSelf,
  JS,
  finite,
  YS,
  greaterThan,
  XS,
  greaterThanOrEqualTo,
  ZS,
  int,
  QS,
  lessThan,
  $S,
  lessThanOrEqualTo,
  eC,
  between,
  tC,
  nonNaN,
  positive,
  negative,
  nonPositive,
  nonNegative,
  Int,
  NonNegative,
  nC,
  encodeSymbol,
  decodeSymbol,
  rC,
  greaterThanOrEqualToBigInt,
  iC,
  betweenBigInt,
  nonNegativeBigInt,
  BigInt$,
  aC,
  toComposite,
  DurationFromSelf,
  oC,
  sC,
  cC,
  lC,
  uC,
  dC,
  fC,
  isDurationValue,
  Uint8ArrayFromSelf,
  Uint8,
  Uint8Array$,
  makeUint8ArrayTransformation,
  pC,
  mC,
  hC,
  validDate,
  gC,
  DateFromSelf,
  DateFromString,
  DateTimeUtcFromSelf,
  decodeDateTimeUtc,
  timeZoneOffsetArbitrary,
  TimeZoneOffsetFromSelf,
  timeZoneNamedArbitrary,
  TimeZoneNamedFromSelf,
  TimeZoneFromSelf,
  timeZoneArbitrary,
  DateTimeZonedFromSelf,
  _C,
  optionSomeEncoded,
  optionEncoded,
  optionDecode,
  optionArbitrary,
  optionPretty,
  optionParse,
  OptionFromSelf_,
  OptionFromSelf,
  vC,
  makeSomeEncoded,
  bigDecimalPretty,
  bigDecimalArbitrary,
  BigDecimalFromSelf,
  isField,
  isFields,
  getFields,
  getSchemaFromFieldsOr,
  getFieldsFromFieldsOr,
  Class,
  getClassTag,
  TaggedError,
  extendFields,
  yC,
  getClassAnnotations,
  makeClass,
  bC,
  fiberIdArbitrary,
  fiberIdPretty,
  FiberIdFromSelf,
  fiberIdDecode,
  fiberIdEncode,
  Defect,
  xC,
  SC,
  PropertyKey$,
  CC = __esmMin(() => {
    (H(),
      hy(),
      gy(),
      Ad(),
      W_(),
      Ry(),
      ao(),
      Nt(),
      $y(),
      D(),
      g(),
      Po(),
      l(),
      y(),
      k(),
      ra(),
      ib(),
      bb(),
      eb(),
      Su(),
      z(),
      pS(),
      A(),
      x(),
      Ux(),
      kv(),
      gS(),
      (_S = Symbol.for(`effect/Schema`)),
      __name(make$2, `make`),
      (vS = { _A: (e) => e, _I: (e) => e, _R: (e) => e }),
      (yS = {
        typeConstructor: xb,
        schemaId: Cb,
        message: wb,
        missingMessage: Tb,
        identifier: Eb,
        title: Db,
        description: kb,
        examples: Ab,
        default: jb,
        documentation: Ib,
        jsonSchema: Mb,
        arbitrary: Nb,
        pretty: Pb,
        equivalence: Fb,
        concurrency: Lb,
        batching: Rb,
        parseIssueTitle: zb,
        parseOptions: Bb,
        decodingFallback: Vb,
      }),
      (toASTAnnotations = (e) => {
        if (!e) return {};
        let t = { ...e };
        for (let n in yS)
          if (n in e) {
            let r = yS[n];
            ((t[r] = e[n]), delete t[n]);
          }
        return t;
      }),
      (mergeSchemaAnnotations = (e, t) => annotations(e, toASTAnnotations(t))),
      (format = (e) => String(e.ast)),
      (encodedSchema = (e) => make$2(encodedAST(e.ast))),
      (typeSchema = (e) => make$2(typeAST(e.ast))),
      (decodeUnknown = (e, t) => {
        let n = tS(e, t);
        return (e, t) => Zx(n(e, t), parseError);
      }),
      (decodeUnknownEither = (e, t) => {
        let n = eS(e, t);
        return (e, t) => Dt(n(e, t), parseError);
      }),
      (isSchema = (e) => b(e, _S) && te(e[_S])),
      (declareConstructor = (e, t, n) =>
        makeDeclareClass(
          e,
          new Declaration(
            e.map((e) => e.ast),
            (...e) => t.decode(...e.map(make$2)),
            (...e) => t.encode(...e.map(make$2)),
            toASTAnnotations(n),
          ),
        )),
      (declarePrimitive = (e, t) => {
        let decodeUnknown = () => (t, n, r) => (e(t) ? Z(t) : Gx(new Type(r, t)));
        return makeDeclareClass(
          [],
          new Declaration([], decodeUnknown, decodeUnknown, toASTAnnotations(t)),
        );
      }),
      (declare = function () {
        if (Array.isArray(arguments[0])) {
          let e = arguments[0],
            t = arguments[1],
            n = arguments[2];
          return declareConstructor(e, t, n);
        }
        let e = arguments[0],
          t = arguments[1];
        return declarePrimitive(e, t);
      }),
      (bS = Symbol.for(`effect/SchemaId/Brand`)),
      (fromBrand = (e, t) => (n) =>
        makeBrandClass(
          n,
          new Refinement$1(
            n.ast,
            function predicate(t, n, r) {
              let i = e.either(t);
              return wt(i) ? P(new Type(r, t, i.left.map((e) => e.message).join(`, `))) : N();
            },
            toASTAnnotations({ schemaId: bS, [bS]: { constructor: e }, ...t }),
          ),
        )),
      (xS = Symbol.for(`effect/SchemaId/InstanceOf`)),
      (instanceOf = (e, t) =>
        declare((t) => t instanceof e, {
          title: e.name,
          description: `an instance of ${e.name}`,
          pretty: () => String,
          schemaId: xS,
          [xS]: { constructor: e },
          ...t,
        })),
      (Undefined = class extends make$2(ux) {}),
      (Null = class extends make$2(lx) {}),
      (Never = class extends make$2(dx) {}),
      (Unknown = class extends make$2(px) {}),
      (Any = class extends make$2(mx) {}),
      (BigIntFromSelf = class extends make$2(xx) {}),
      (SymbolFromSelf = class extends make$2(Sx) {}),
      (String$ = class extends make$2(hx) {}),
      (Number$ = class extends make$2(_x) {}),
      (Boolean$ = class extends make$2(yx) {}),
      (getDefaultUnionAST = (e) => Ox.make(e.map((e) => e.ast))),
      (NullOr = (e) => Union(e, Null)),
      (UndefinedOr = (e) => Union(e, Undefined)),
      (NullishOr = (e) => Union(e, Null, Undefined)),
      (element = (e) => new SS(new OptionalType(e.ast, !1), e)),
      (SS = class ElementImpl {
        ast;
        from;
        [_S];
        _Token;
        constructor(e, t) {
          ((this.ast = e), (this.from = t));
        }
        annotations(e) {
          return new ElementImpl(
            new OptionalType(this.ast.type, this.ast.isOptional, {
              ...this.ast.annotations,
              ...toASTAnnotations(e),
            }),
            this.from,
          );
        }
        toString() {
          return `${this.ast.type}${this.ast.isOptional ? `?` : ``}`;
        }
      }),
      (getDefaultTupleTypeAST = (e, t) =>
        new TupleType(
          e.map((e) => (isSchema(e) ? new OptionalType(e.ast, !1) : e.ast)),
          t.map((e) => (isSchema(e) ? new Type$1(e.ast) : e.ast)),
          !0,
        )),
      (Array$ = (e) => makeArrayClass(e)),
      (formatPropertySignatureToken = (e) => (e ? `"?:"` : `":"`)),
      (PropertySignatureDeclaration = class extends OptionalType {
        isReadonly;
        defaultValue;
        _tag = `PropertySignatureDeclaration`;
        constructor(e, t, n, r, i) {
          (super(e, t, r), (this.isReadonly = n), (this.defaultValue = i));
        }
        toString() {
          let e = formatPropertySignatureToken(this.isOptional),
            t = String(this.type);
          return `PropertySignature<${e}, ${t}, never, ${e}, ${t}>`;
        }
      }),
      (FromPropertySignature = class extends OptionalType {
        isReadonly;
        fromKey;
        constructor(e, t, n, r, i) {
          (super(e, t, r), (this.isReadonly = n), (this.fromKey = i));
        }
      }),
      (ToPropertySignature = class extends OptionalType {
        isReadonly;
        defaultValue;
        constructor(e, t, n, r, i) {
          (super(e, t, r), (this.isReadonly = n), (this.defaultValue = i));
        }
      }),
      (formatPropertyKey = (e) =>
        e === void 0 ? `never` : isString(e) ? JSON.stringify(e) : String(e)),
      (PropertySignatureTransformation = class {
        from;
        to;
        decode;
        encode;
        _tag = `PropertySignatureTransformation`;
        constructor(e, t, n, r) {
          ((this.from = e), (this.to = t), (this.decode = n), (this.encode = r));
        }
        toString() {
          return `PropertySignature<${formatPropertySignatureToken(this.to.isOptional)}, ${this.to.type}, ${formatPropertyKey(this.from.fromKey)}, ${formatPropertySignatureToken(this.from.isOptional)}, ${this.from.type}>`;
        }
      }),
      (mergeSignatureAnnotations = (e, t) => {
        switch (e._tag) {
          case `PropertySignatureDeclaration`:
            return new PropertySignatureDeclaration(
              e.type,
              e.isOptional,
              e.isReadonly,
              { ...e.annotations, ...t },
              e.defaultValue,
            );
          case `PropertySignatureTransformation`:
            return new PropertySignatureTransformation(
              e.from,
              new ToPropertySignature(
                e.to.type,
                e.to.isOptional,
                e.to.isReadonly,
                { ...e.to.annotations, ...t },
                e.to.defaultValue,
              ),
              e.decode,
              e.encode,
            );
        }
      }),
      (CS = Symbol.for(`effect/PropertySignature`)),
      (isPropertySignature = (e) => b(e, CS)),
      (wS = class PropertySignatureImpl {
        ast;
        [_S];
        [CS] = null;
        _TypeToken;
        _Key;
        _EncodedToken;
        _HasDefault;
        constructor(e) {
          this.ast = e;
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
        annotations(e) {
          return new PropertySignatureImpl(
            mergeSignatureAnnotations(this.ast, toASTAnnotations(e)),
          );
        }
        toString() {
          return String(this.ast);
        }
      }),
      (makePropertySignature = (e) => new wS(e)),
      (TS = class PropertySignatureWithFromImpl extends wS {
        from;
        constructor(e, t) {
          (super(e), (this.from = t));
        }
        annotations(e) {
          return new PropertySignatureWithFromImpl(
            mergeSignatureAnnotations(this.ast, toASTAnnotations(e)),
            this.from,
          );
        }
      }),
      (propertySignature = (e) =>
        new TS(new PropertySignatureDeclaration(e.ast, !1, !0, {}, void 0), e)),
      (ES = dual(2, (e, t) => {
        let n = e.ast;
        switch (n._tag) {
          case `PropertySignatureDeclaration`:
            return makePropertySignature(
              new PropertySignatureDeclaration(
                n.type,
                n.isOptional,
                n.isReadonly,
                n.annotations,
                t,
              ),
            );
          case `PropertySignatureTransformation`:
            return makePropertySignature(
              new PropertySignatureTransformation(
                n.from,
                new ToPropertySignature(
                  n.to.type,
                  n.to.isOptional,
                  n.to.isReadonly,
                  n.to.annotations,
                  t,
                ),
                n.decode,
                n.encode,
              ),
            );
        }
      })),
      (applyDefaultValue = (e, t) =>
        L(e, { onNone: () => P(t()), onSome: (e) => P(e === void 0 ? t() : e) })),
      (pruneUndefined = (e) =>
        Hx(e, pruneUndefined, (e) => {
          let t = pruneUndefined(e.to);
          if (t) return new Transformation$1(e.from, t, e.transformation);
        })),
      (DS = dual(2, (e, t) => {
        let n = e.ast;
        switch (n._tag) {
          case `PropertySignatureDeclaration`: {
            let e = typeAST(n.type);
            return makePropertySignature(
              new PropertySignatureTransformation(
                new FromPropertySignature(n.type, n.isOptional, n.isReadonly, n.annotations),
                new ToPropertySignature(pruneUndefined(e) ?? e, !1, !0, {}, n.defaultValue),
                (e) => applyDefaultValue(e, t),
                identity,
              ),
            );
          }
          case `PropertySignatureTransformation`: {
            let e = n.to.type;
            return makePropertySignature(
              new PropertySignatureTransformation(
                n.from,
                new ToPropertySignature(
                  pruneUndefined(e) ?? e,
                  !1,
                  n.to.isReadonly,
                  n.to.annotations,
                  n.to.defaultValue,
                ),
                (e) => applyDefaultValue(n.decode(e), t),
                n.encode,
              ),
            );
          }
        }
      })),
      (OS = dual(2, (e, t) => e.pipe(DS(t.decoding), ES(t.constructor)))),
      (optionalToRequired = (e, t, n) =>
        makePropertySignature(
          new PropertySignatureTransformation(
            new FromPropertySignature(e.ast, !0, !0, {}, void 0),
            new ToPropertySignature(t.ast, !1, !0, {}, void 0),
            (e) => P(n.decode(e)),
            qt(n.encode),
          ),
        )),
      (optionalToOptional = (e, t, n) =>
        makePropertySignature(
          new PropertySignatureTransformation(
            new FromPropertySignature(e.ast, !0, !0, {}, void 0),
            new ToPropertySignature(t.ast, !0, !0, {}, void 0),
            n.decode,
            n.encode,
          ),
        )),
      (optionalPropertySignatureAST = (e, t) => {
        let n = t?.exact,
          r = t?.default,
          i = t?.nullable,
          a = t?.as == `Option`,
          o = t?.onNoneEncoding ? Ht(t.onNoneEncoding) : identity;
        if (n) {
          if (r)
            return i
              ? ES(
                  optionalToRequired(NullOr(e), typeSchema(e), {
                    decode: L({ onNone: r, onSome: (e) => (e === null ? r() : e) }),
                    encode: P,
                  }),
                  r,
                ).ast
              : ES(
                  optionalToRequired(e, typeSchema(e), {
                    decode: L({ onNone: r, onSome: identity }),
                    encode: P,
                  }),
                  r,
                ).ast;
          if (a) {
            let t = OptionFromSelf_(typeSchema(e));
            return i
              ? optionalToRequired(NullOr(e), t, { decode: Xt(isNotNull), encode: o }).ast
              : optionalToRequired(e, t, { decode: identity, encode: identity }).ast;
          } else if (i)
            return optionalToOptional(NullOr(e), typeSchema(e), {
              decode: Xt(isNotNull),
              encode: identity,
            }).ast;
          else return new PropertySignatureDeclaration(e.ast, !0, !0, {}, void 0);
        } else if (r)
          return i
            ? ES(
                optionalToRequired(NullishOr(e), typeSchema(e), {
                  decode: L({ onNone: r, onSome: (e) => e ?? r() }),
                  encode: P,
                }),
                r,
              ).ast
            : ES(
                optionalToRequired(UndefinedOr(e), typeSchema(e), {
                  decode: L({ onNone: r, onSome: (e) => (e === void 0 ? r() : e) }),
                  encode: P,
                }),
                r,
              ).ast;
        else if (a) {
          let t = OptionFromSelf_(typeSchema(e));
          return i
            ? optionalToRequired(NullishOr(e), t, { decode: Xt((e) => e != null), encode: o }).ast
            : optionalToRequired(UndefinedOr(e), t, { decode: Xt(isNotUndefined), encode: o }).ast;
        } else if (i)
          return optionalToOptional(NullishOr(e), UndefinedOr(typeSchema(e)), {
            decode: Xt(isNotNull),
            encode: identity,
          }).ast;
        else return new PropertySignatureDeclaration(UndefinedOr(e).ast, !0, !0, {}, void 0);
      }),
      (optional = (e) => {
        let t = e.ast === ux || e.ast === dx ? ux : UndefinedOr(e).ast;
        return new TS(new PropertySignatureDeclaration(t, !0, !0, {}, void 0), e);
      }),
      (kS = dual(
        (e) => isSchema(e[0]),
        (e, t) => new TS(optionalPropertySignatureAST(e, t), e),
      )),
      (AS = pickAnnotations([Tb])),
      (getDefaultTypeLiteralAST = (e, t) => {
        let n = Reflect.ownKeys(e),
          r = [];
        if (n.length > 0) {
          let i = [],
            a = [],
            o = [];
          for (let t = 0; t < n.length; t++) {
            let s = n[t],
              c = e[s];
            if (isPropertySignature(c)) {
              let e = c.ast;
              switch (e._tag) {
                case `PropertySignatureDeclaration`: {
                  let t = e.type,
                    n = e.isOptional,
                    o = e.annotations;
                  (i.push(new PropertySignature(s, t, n, !0, AS(e))),
                    a.push(new PropertySignature(s, typeAST(t), n, !0, o)),
                    r.push(new PropertySignature(s, t, n, !0, o)));
                  break;
                }
                case `PropertySignatureTransformation`: {
                  let t = e.from.fromKey ?? s;
                  (i.push(
                    new PropertySignature(
                      t,
                      e.from.type,
                      e.from.isOptional,
                      !0,
                      e.from.annotations,
                    ),
                  ),
                    a.push(
                      new PropertySignature(s, e.to.type, e.to.isOptional, !0, e.to.annotations),
                    ),
                    o.push(new PropertySignatureTransformation$1(t, s, e.decode, e.encode)));
                  break;
                }
              }
            } else
              (i.push(new PropertySignature(s, c.ast, !1, !0)),
                a.push(new PropertySignature(s, typeAST(c.ast), !1, !0)),
                r.push(new PropertySignature(s, c.ast, !1, !0)));
          }
          if (V(o)) {
            let e = [],
              n = [];
            for (let r of t) {
              let { indexSignatures: t, propertySignatures: o } = record(r.key.ast, r.value.ast);
              (o.forEach((e) => {
                (i.push(e),
                  a.push(
                    new PropertySignature(
                      e.name,
                      typeAST(e.type),
                      e.isOptional,
                      e.isReadonly,
                      e.annotations,
                    ),
                  ));
              }),
                t.forEach((t) => {
                  (e.push(t),
                    n.push(new IndexSignature(t.parameter, typeAST(t.type), t.isReadonly)));
                }));
            }
            return new Transformation$1(
              new TypeLiteral(i, e, { [Ob]: `Struct (Encoded side)` }),
              new TypeLiteral(a, n, { [Ob]: `Struct (Type side)` }),
              new TypeLiteralTransformation(o),
            );
          }
        }
        let i = [];
        for (let e of t) {
          let { indexSignatures: t, propertySignatures: n } = record(e.key.ast, e.value.ast);
          (n.forEach((e) => r.push(e)), t.forEach((e) => i.push(e)));
        }
        return new TypeLiteral(r, i);
      }),
      (lazilyMergeDefaults = (e, t) => {
        let n = Reflect.ownKeys(e);
        for (let r of n) {
          let n = e[r];
          if (t[r] === void 0 && isPropertySignature(n)) {
            let e = n.ast,
              i = e._tag === `PropertySignatureDeclaration` ? e.defaultValue : e.to.defaultValue;
            i !== void 0 && (t[r] = i());
          }
        }
        return t;
      }),
      (jS = __name(
        (e) =>
          Literal(e).pipe(
            propertySignature,
            ES(() => e),
          ),
        `tag`,
      )),
      (TaggedStruct = (e, t) => Struct({ _tag: jS(e), ...t })),
      (Record = (e) => makeRecordClass(e.key, e.value)),
      (pick =
        (...e) =>
        (t) =>
          make$2(Rx(t.ast, e))),
      (mutable = (e) => make$2(zx(e.ast))),
      (intersectTypeLiterals = (e, t, n) => {
        if (wx(e) && wx(t)) {
          let r = [...e.propertySignatures];
          for (let e of t.propertySignatures) {
            let t = e.name,
              i = r.findIndex((e) => e.name === t);
            if (i === -1) r.push(e);
            else {
              let { isOptional: a, type: o } = r[i];
              r[i] = new PropertySignature(t, extendAST(o, e.type, n.concat(t)), a, !0);
            }
          }
          return new TypeLiteral(r, e.indexSignatures.concat(t.indexSignatures));
        }
        throw Error(getSchemaExtendErrorMessage(e, t, n));
      }),
      (MS = omitAnnotations([Eb])),
      (addRefinementToMembers = (e, t) => t.map((t) => new Refinement$1(t, e.filter, MS(e)))),
      (extendAST = (e, t, n) => Ox.make(intersectUnionMembers([e], [t], n))),
      (getTypes = (e) => (kx(e) ? e.types : [e])),
      (intersectUnionMembers = (e, t, n) =>
        In(e, (e) =>
          In(t, (t) => {
            switch (t._tag) {
              case `Literal`:
                if (
                  (isString(t.literal) && gx(e)) ||
                  (isNumber(t.literal) && vx(e)) ||
                  (isBoolean(t.literal) && bx(e))
                )
                  return [t];
                break;
              case `StringKeyword`:
                if (t === hx) {
                  if (gx(e) || (cx(e) && isString(e.literal))) return [e];
                  if (jx(e))
                    return addRefinementToMembers(
                      e,
                      intersectUnionMembers(getTypes(e.from), [t], n),
                    );
                } else if (e === hx) return [t];
                break;
              case `NumberKeyword`:
                if (t === _x) {
                  if (vx(e) || (cx(e) && isNumber(e.literal))) return [e];
                  if (jx(e))
                    return addRefinementToMembers(
                      e,
                      intersectUnionMembers(getTypes(e.from), [t], n),
                    );
                } else if (e === _x) return [t];
                break;
              case `BooleanKeyword`:
                if (t === yx) {
                  if (bx(e) || (cx(e) && isBoolean(e.literal))) return [e];
                  if (jx(e))
                    return addRefinementToMembers(
                      e,
                      intersectUnionMembers(getTypes(e.from), [t], n),
                    );
                } else if (e === yx) return [t];
                break;
              case `Union`:
                return intersectUnionMembers(getTypes(e), t.types, n);
              case `Suspend`:
                return [new Suspend(() => extendAST(e, t.f(), n))];
              case `Refinement`:
                return addRefinementToMembers(
                  t,
                  intersectUnionMembers(getTypes(e), getTypes(t.from), n),
                );
              case `TypeLiteral`:
                switch (e._tag) {
                  case `Union`:
                    return intersectUnionMembers(e.types, [t], n);
                  case `Suspend`:
                    return [new Suspend(() => extendAST(e.f(), t, n))];
                  case `Refinement`:
                    return addRefinementToMembers(
                      e,
                      intersectUnionMembers(getTypes(e.from), [t], n),
                    );
                  case `TypeLiteral`:
                    return [intersectTypeLiterals(e, t, n)];
                  case `Transformation`: {
                    let r = e.transformation,
                      i = intersectTypeLiterals(e.from, t, n),
                      a = intersectTypeLiterals(e.to, typeAST(t), n);
                    switch (r._tag) {
                      case `TypeLiteralTransformation`:
                        return [
                          new Transformation$1(
                            i,
                            a,
                            new TypeLiteralTransformation(r.propertySignatureTransformations),
                          ),
                        ];
                      case `ComposeTransformation`:
                        return [new Transformation$1(i, a, Px)];
                      case `FinalTransformation`:
                        return [
                          new Transformation$1(
                            i,
                            a,
                            new FinalTransformation(
                              (e, t, n, i) => Xx(r.decode(e, t, n, i), (t) => ({ ...e, ...t })),
                              (e, t, n, i) => Xx(r.encode(e, t, n, i), (t) => ({ ...e, ...t })),
                            ),
                          ),
                        ];
                    }
                  }
                }
                break;
              case `Transformation`:
                if (Nx(e)) {
                  if (Fx(t.transformation) && Fx(e.transformation))
                    return [
                      new Transformation$1(
                        intersectTypeLiterals(e.from, t.from, n),
                        intersectTypeLiterals(e.to, t.to, n),
                        new TypeLiteralTransformation(
                          t.transformation.propertySignatureTransformations.concat(
                            e.transformation.propertySignatureTransformations,
                          ),
                        ),
                      ),
                    ];
                } else return intersectUnionMembers([t], [e], n);
                break;
            }
            throw Error(getSchemaExtendErrorMessage(e, t, n));
          }),
        )),
      (NS = dual(2, (e, t) => make$2(extendAST(e.ast, t.ast, [])))),
      (PS = dual(
        (e) => isSchema(e[1]),
        (e, t) => makeTransformationClass(e, t, Vx(e.ast, t.ast)),
      )),
      (suspend = (e) => make$2(new Suspend(() => e().ast))),
      (FS = Symbol.for(`effect/SchemaId/Refine`)),
      (fromFilterPredicateReturnTypeItem = (e, t, n) => {
        if (isBoolean(e)) return e ? N() : P(new Type(t, n));
        if (isString(e)) return P(new Type(t, n, e));
        if (e !== void 0) {
          if (`_tag` in e) return P(e);
          let r = new Type(t, n, e.message);
          return P(V(e.path) ? new Pointer(e.path, n, r) : r);
        }
        return N();
      }),
      (toFilterParseIssue = (e, t, n) => {
        if (isSingle(e)) return fromFilterPredicateReturnTypeItem(e, t, n);
        if (V(e)) {
          let r = Rn(e, (e) => fromFilterPredicateReturnTypeItem(e, t, n));
          if (V(r)) return P(r.length === 1 ? r[0] : new Composite$1(t, n, r));
        }
        return N();
      }),
      (Q = dual(
        (e) => isSchema(e[0]) && isSchema(e[1]),
        (e, t, n) =>
          makeTransformationClass(
            e,
            t,
            new Transformation$1(e.ast, t.ast, new FinalTransformation(n.decode, n.encode)),
          ),
      )),
      ($ = dual(
        (e) => isSchema(e[0]) && isSchema(e[1]),
        (e, t, n) =>
          Q(e, t, {
            strict: !0,
            decode: (e, t, r, i) => Z(n.decode(e, i)),
            encode: (e, t, r, i) => Z(n.encode(e, i)),
          }),
      )),
      (IS = Symbol.for(`effect/SchemaId/Trimmed`)),
      (trimmed = (e) => (t) =>
        t.pipe(
          filter((e) => e === e.trim(), {
            schemaId: IS,
            title: `trimmed`,
            description: `a string with no leading or trailing whitespace`,
            jsonSchema: { pattern: `^\\S[\\s\\S]*\\S$|^\\S$|^$` },
            ...e,
          }),
        )),
      (LS = vb),
      (minLength = (e, t) => (n) =>
        n.pipe(
          filter((t) => t.length >= e, {
            schemaId: LS,
            title: `minLength(${e})`,
            description: `a string at least ${e} character(s) long`,
            jsonSchema: { minLength: e },
            ...t,
          }),
        )),
      (RS = yb),
      (length = (e, t) => (n) => {
        let r = te(e) ? Math.max(0, Math.floor(e.min)) : Math.max(0, Math.floor(e)),
          i = te(e) ? Math.max(r, Math.floor(e.max)) : r;
        return r === i
          ? n.pipe(
              filter((e) => e.length === r, {
                schemaId: RS,
                title: `length(${r})`,
                description: r === 1 ? `a single character` : `a string ${r} character(s) long`,
                jsonSchema: { minLength: r, maxLength: r },
                ...t,
              }),
            )
          : n.pipe(
              filter((e) => e.length >= r && e.length <= i, {
                schemaId: RS,
                title: `length({ min: ${r}, max: ${i})`,
                description: `a string at least ${r} character(s) and at most ${i} character(s) long`,
                jsonSchema: { minLength: r, maxLength: i },
                ...t,
              }),
            );
      }),
      (zS = Symbol.for(`effect/SchemaId/Pattern`)),
      (pattern = (e, t) => (n) => {
        let r = e.source;
        return n.pipe(
          filter((t) => ((e.lastIndex = 0), e.test(t)), {
            schemaId: zS,
            [zS]: { regex: e },
            description: `a string matching the pattern ${r}`,
            jsonSchema: { pattern: r },
            ...t,
          }),
        );
      }),
      (BS = Symbol.for(`effect/SchemaId/Lowercased`)),
      (lowercased = (e) => (t) =>
        t.pipe(
          filter((e) => e === e.toLowerCase(), {
            schemaId: BS,
            title: `lowercased`,
            description: `a lowercase string`,
            jsonSchema: { pattern: `^[^A-Z]*$` },
            ...e,
          }),
        )),
      (Lowercased = class extends String$.pipe(lowercased({ identifier: `Lowercased` })) {}),
      (VS = Symbol.for(`effect/SchemaId/Uppercased`)),
      (uppercased = (e) => (t) =>
        t.pipe(
          filter((e) => e === e.toUpperCase(), {
            schemaId: VS,
            title: `uppercased`,
            description: `an uppercase string`,
            jsonSchema: { pattern: `^[^a-z]*$` },
            ...e,
          }),
        )),
      (Uppercased = class extends String$.pipe(uppercased({ identifier: `Uppercased` })) {}),
      (HS = Symbol.for(`effect/SchemaId/Capitalized`)),
      (capitalized = (e) => (t) =>
        t.pipe(
          filter((e) => e[0]?.toUpperCase() === e[0], {
            schemaId: HS,
            title: `capitalized`,
            description: `a capitalized string`,
            jsonSchema: { pattern: `^[^a-z]?.*$` },
            ...e,
          }),
        )),
      (Capitalized = class extends String$.pipe(capitalized({ identifier: `Capitalized` })) {}),
      (US = Symbol.for(`effect/SchemaId/Uncapitalized`)),
      (uncapitalized = (e) => (t) =>
        t.pipe(
          filter((e) => e[0]?.toLowerCase() === e[0], {
            schemaId: US,
            title: `uncapitalized`,
            description: `a uncapitalized string`,
            jsonSchema: { pattern: `^[^A-Z]?.*$` },
            ...e,
          }),
        )),
      (Uncapitalized = class extends (
        String$.pipe(uncapitalized({ identifier: `Uncapitalized` }))
      ) {}),
      String$.pipe(length(1, { identifier: `Char` })),
      (nonEmptyString = (e) =>
        minLength(1, { title: `nonEmptyString`, description: `a non empty string`, ...e })),
      $(
        String$.annotations({ description: `a string that will be converted to lowercase` }),
        Lowercased,
        { strict: !0, decode: (e) => e.toLowerCase(), encode: identity },
      ).annotations({ identifier: `Lowercase` }),
      $(
        String$.annotations({ description: `a string that will be converted to uppercase` }),
        Uppercased,
        { strict: !0, decode: (e) => e.toUpperCase(), encode: identity },
      ).annotations({ identifier: `Uppercase` }),
      $(
        String$.annotations({
          description: `a string that will be converted to a capitalized format`,
        }),
        Capitalized,
        { strict: !0, decode: (e) => capitalize(e), encode: identity },
      ).annotations({ identifier: `Capitalize` }),
      $(
        String$.annotations({
          description: `a string that will be converted to an uncapitalized format`,
        }),
        Uncapitalized,
        { strict: !0, decode: (e) => uncapitalize(e), encode: identity },
      ).annotations({ identifier: `Uncapitalize` }),
      (Trimmed = class extends String$.pipe(trimmed({ identifier: `Trimmed` })) {}),
      (NonEmptyTrimmedString = class extends (
        Trimmed.pipe(nonEmptyString({ identifier: `NonEmptyTrimmedString` }))
      ) {}),
      $(String$.annotations({ description: `a string that will be trimmed` }), Trimmed, {
        strict: !0,
        decode: (e) => e.trim(),
        encode: identity,
      }).annotations({ identifier: `Trim` }),
      (getErrorMessage = (e) => (e instanceof Error ? e.message : String(e))),
      (getParseJsonTransformation = (e) =>
        Q(String$.annotations({ description: `a string to be decoded into JSON` }), Unknown, {
          strict: !0,
          decode: (t, n, r) =>
            Kx({
              try: () => JSON.parse(t, e?.reviver),
              catch: (e) => new Type(r, t, getErrorMessage(e)),
            }),
          encode: (t, n, r) =>
            Kx({
              try: () => JSON.stringify(t, e?.replacer, e?.space),
              catch: (e) => new Type(r, t, getErrorMessage(e)),
            }),
        }).annotations({ title: `parseJson`, schemaId: sx })),
      (parseJson = (e, t) => (isSchema(e) ? PS(parseJson(t), e) : getParseJsonTransformation(e))),
      String$.pipe(nonEmptyString({ identifier: `NonEmptyString` })),
      (WS = Symbol.for(`effect/SchemaId/UUID`)),
      (GS = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i),
      String$.pipe(
        pattern(GS, {
          schemaId: WS,
          identifier: `UUID`,
          jsonSchema: { format: `uuid`, pattern: GS.source },
          description: `a Universally Unique Identifier`,
          arbitrary: () => (e) => e.uuid(),
        }),
      ),
      (KS = Symbol.for(`effect/SchemaId/ULID`)),
      (qS = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i),
      String$.pipe(
        pattern(qS, {
          schemaId: KS,
          identifier: `ULID`,
          description: `a Universally Unique Lexicographically Sortable Identifier`,
          arbitrary: () => (e) => e.ulid(),
        }),
      ),
      (URLFromSelf = class extends (
        instanceOf(URL, {
          typeConstructor: { _tag: `URL` },
          identifier: `URLFromSelf`,
          arbitrary: () => (e) => e.webUrl().map((e) => new URL(e)),
          pretty: () => (e) => e.toString(),
        })
      ) {}),
      Q(String$.annotations({ description: `a string to be decoded into a URL` }), URLFromSelf, {
        strict: !0,
        decode: (e, t, n) =>
          Kx({
            try: () => new URL(e),
            catch: (t) =>
              new Type(
                n,
                e,
                `Unable to decode ${JSON.stringify(e)} into a URL. ${getErrorMessage(t)}`,
              ),
          }),
        encode: (e) => Z(e.toString()),
      }).annotations({ identifier: `URL`, pretty: () => (e) => e.toString() }),
      (JS = pb),
      (finite = (e) => (t) =>
        t.pipe(
          filter(Number.isFinite, {
            schemaId: JS,
            title: `finite`,
            description: `a finite number`,
            jsonSchema: {},
            ...e,
          }),
        )),
      (YS = ob),
      (greaterThan = (e, t) => (n) =>
        n.pipe(
          filter((t) => t > e, {
            schemaId: YS,
            title: `greaterThan(${e})`,
            description: e === 0 ? `a positive number` : `a number greater than ${e}`,
            jsonSchema: { exclusiveMinimum: e },
            ...t,
          }),
        )),
      (XS = sb),
      (greaterThanOrEqualTo = (e, t) => (n) =>
        n.pipe(
          filter((t) => t >= e, {
            schemaId: XS,
            title: `greaterThanOrEqualTo(${e})`,
            description:
              e === 0 ? `a non-negative number` : `a number greater than or equal to ${e}`,
            jsonSchema: { minimum: e },
            ...t,
          }),
        )),
      (ZS = db),
      (int = (e) => (t) =>
        t.pipe(
          filter((e) => Number.isSafeInteger(e), {
            schemaId: ZS,
            title: `int`,
            description: `an integer`,
            jsonSchema: { type: `integer` },
            ...e,
          }),
        )),
      (QS = lb),
      (lessThan = (e, t) => (n) =>
        n.pipe(
          filter((t) => t < e, {
            schemaId: QS,
            title: `lessThan(${e})`,
            description: e === 0 ? `a negative number` : `a number less than ${e}`,
            jsonSchema: { exclusiveMaximum: e },
            ...t,
          }),
        )),
      ($S = ub),
      (lessThanOrEqualTo = (e, t) => (n) =>
        n.pipe(
          filter((t) => t <= e, {
            schemaId: $S,
            title: `lessThanOrEqualTo(${e})`,
            description: e === 0 ? `a non-positive number` : `a number less than or equal to ${e}`,
            jsonSchema: { maximum: e },
            ...t,
          }),
        )),
      (eC = hb),
      (between = (e, t, n) => (r) =>
        r.pipe(
          filter((n) => n >= e && n <= t, {
            schemaId: eC,
            title: `between(${e}, ${t})`,
            description: `a number between ${e} and ${t}`,
            jsonSchema: { minimum: e, maximum: t },
            ...n,
          }),
        )),
      (tC = fb),
      (nonNaN = (e) => (t) =>
        t.pipe(
          filter((e) => !Number.isNaN(e), {
            schemaId: tC,
            title: `nonNaN`,
            description: `a number excluding NaN`,
            ...e,
          }),
        )),
      (positive = (e) => greaterThan(0, { title: `positive`, ...e })),
      (negative = (e) => lessThan(0, { title: `negative`, ...e })),
      (nonPositive = (e) => lessThanOrEqualTo(0, { title: `nonPositive`, ...e })),
      (nonNegative = (e) => greaterThanOrEqualTo(0, { title: `nonNegative`, ...e })),
      parseNumber(
        String$.annotations({ description: `a string to be decoded into a number` }),
      ).annotations({ identifier: `NumberFromString` }),
      Number$.pipe(finite({ identifier: `Finite` })),
      (Int = class extends Number$.pipe(int({ identifier: `Int` })) {}),
      Number$.pipe(nonNaN({ identifier: `NonNaN` })),
      Number$.pipe(positive({ identifier: `Positive` })),
      Number$.pipe(negative({ identifier: `Negative` })),
      Number$.pipe(nonPositive({ identifier: `NonPositive` })),
      (NonNegative = class extends Number$.pipe(nonNegative({ identifier: `NonNegative` })) {}),
      (nC = mb),
      Number$.pipe(finite({ schemaId: nC, identifier: `JsonNumber` })),
      $(Boolean$.annotations({ description: `a boolean that will be negated` }), Boolean$, {
        strict: !0,
        decode: (e) => not(e),
        encode: (e) => not(e),
      }),
      (encodeSymbol = (e, t) => {
        let n = Symbol.keyFor(e);
        return n === void 0
          ? Gx(new Type(t, e, `Unable to encode a unique symbol ${String(e)} into a string`))
          : Z(n);
      }),
      (decodeSymbol = (e) => Z(Symbol.for(e))),
      Q(
        String$.annotations({
          description: `a string to be decoded into a globally shared symbol`,
        }),
        SymbolFromSelf,
        { strict: !1, decode: (e) => decodeSymbol(e), encode: (e, t, n) => encodeSymbol(e, n) },
      ).annotations({ identifier: `Symbol` }),
      (rC = gb),
      (greaterThanOrEqualToBigInt = (e, t) => (n) =>
        n.pipe(
          filter((t) => t >= e, {
            schemaId: rC,
            [rC]: { min: e },
            title: `greaterThanOrEqualToBigInt(${e})`,
            description:
              e === 0n ? `a non-negative bigint` : `a bigint greater than or equal to ${e}n`,
            ...t,
          }),
        )),
      (iC = _b),
      (betweenBigInt = (e, t, n) => (r) =>
        r.pipe(
          filter((n) => n >= e && n <= t, {
            schemaId: iC,
            [iC]: { min: e, max: t },
            title: `betweenBigInt(${e}, ${t})`,
            description: `a bigint between ${e}n and ${t}n`,
            ...n,
          }),
        )),
      (nonNegativeBigInt = (e) =>
        greaterThanOrEqualToBigInt(0n, { title: `nonNegativeBigInt`, ...e })),
      (BigInt$ = class extends (
        Q(
          String$.annotations({ description: `a string to be decoded into a bigint` }),
          BigIntFromSelf,
          {
            strict: !0,
            decode: (e, t, n) =>
              qx(
                fromString(e),
                () => new Type(n, e, `Unable to decode ${JSON.stringify(e)} into a bigint`),
              ),
            encode: (e) => Z(String(e)),
          },
        ).annotations({ identifier: `BigInt` })
      ) {}),
      (aC = BigIntFromSelf.pipe(nonNegativeBigInt({ identifier: `NonNegativeBigintFromSelf` }))),
      Q(
        Number$.annotations({ description: `a number to be decoded into a bigint` }),
        BigIntFromSelf.pipe(betweenBigInt(BigInt(-(2 ** 53 - 1)), BigInt(2 ** 53 - 1))),
        {
          strict: !0,
          decode: (e, t, n) =>
            qx(fromNumber(e), () => new Type(n, e, `Unable to decode ${e} into a bigint`)),
          encode: (e, t, n) =>
            qx(toNumber(e), () => new Type(n, e, `Unable to encode ${e}n into a number`)),
        },
      ).annotations({ identifier: `BigIntFromNumber` }),
      (toComposite = (e, t, n, r) =>
        Qx(e, { onFailure: (e) => new Composite$1(n, r, e), onSuccess: t })),
      (DurationFromSelf = class extends (
        declare(isDuration, {
          typeConstructor: { _tag: `effect/Duration` },
          identifier: `DurationFromSelf`,
          pretty: () => String,
          arbitrary: () => (e) =>
            e.oneof(
              e.constant(Za),
              e.bigInt({ min: 0n }).map((e) => nanos(e)),
              e.maxSafeNat().map((e) => millis(e)),
            ),
          equivalence: () => eo,
        })
      ) {}),
      Q(
        aC.annotations({ description: `a bigint to be decoded into a Duration` }),
        DurationFromSelf.pipe(filter((e) => Ja(e), { description: `a finite duration` })),
        {
          strict: !0,
          decode: (e) => Z(nanos(e)),
          encode: (e, t, n) =>
            L(toNanos(e), {
              onNone: () => Gx(new Type(n, e, `Unable to encode ${e} into a bigint`)),
              onSome: (e) => Z(e),
            }),
        },
      ).annotations({ identifier: `DurationFromNanos` }),
      (oC = NonNegative.pipe(int()).annotations({ identifier: `NonNegativeInt` })),
      $(
        NonNegative.annotations({
          description: `a non-negative number to be decoded into a Duration`,
        }),
        DurationFromSelf,
        { strict: !0, decode: (e) => millis(e), encode: (e) => toMillis(e) },
      ).annotations({ identifier: `DurationFromMillis` }),
      (sC = TaggedStruct(`Millis`, { millis: oC })),
      (cC = TaggedStruct(`Nanos`, { nanos: BigInt$ })),
      (lC = TaggedStruct(`Infinity`, {})),
      (uC = lC.make({})),
      (dC = Union(sC, cC, lC).annotations({
        identifier: `DurationValue`,
        description: `an JSON-compatible tagged union to be decoded into a Duration`,
      })),
      (fC = Union(
        Tuple(
          element(oC).annotations({ title: `seconds` }),
          element(oC).annotations({ title: `nanos` }),
        ).annotations({ identifier: `FiniteHRTime` }),
        Tuple(Literal(-1), Literal(0)).annotations({ identifier: `InfiniteHRTime` }),
      ).annotations({
        identifier: `HRTime`,
        description: `a tuple of seconds and nanos to be decoded into a Duration`,
      })),
      (isDurationValue = (e) => typeof e == `object`),
      $(Union(dC, fC), DurationFromSelf, {
        strict: !0,
        decode: (e) => {
          if (isDurationValue(e))
            switch (e._tag) {
              case `Millis`:
                return millis(e.millis);
              case `Nanos`:
                return nanos(e.nanos);
              case `Infinity`:
                return Za;
            }
          let [t, n] = e;
          return t === -1 ? Za : nanos(BigInt(t) * BigInt(1e9) + BigInt(n));
        },
        encode: (e) => {
          switch (e.value._tag) {
            case `Millis`:
              return sC.make({ millis: e.value.millis });
            case `Nanos`:
              return cC.make({ nanos: e.value.nanos });
            case `Infinity`:
              return uC;
          }
        },
      }).annotations({ identifier: `Duration` }),
      (Uint8ArrayFromSelf = class extends (
        declare(isUint8Array, {
          typeConstructor: { _tag: `Uint8Array` },
          identifier: `Uint8ArrayFromSelf`,
          pretty: () => (e) => `new Uint8Array(${JSON.stringify(Array.from(e))})`,
          arbitrary: () => (e) => e.uint8Array(),
          equivalence: () => Bn(equals$2),
        })
      ) {}),
      (Uint8 = class extends (
        Number$.pipe(
          between(0, 255, { identifier: `Uint8`, description: `a 8-bit unsigned integer` }),
        )
      ) {}),
      (Uint8Array$ = class extends (
        $(
          Array$(Uint8).annotations({
            description: `an array of 8-bit unsigned integers to be decoded into a Uint8Array`,
          }),
          Uint8ArrayFromSelf,
          { strict: !0, decode: (e) => Uint8Array.from(e), encode: (e) => Array.from(e) },
        ).annotations({ identifier: `Uint8Array` })
      ) {}),
      (makeUint8ArrayTransformation = (e, t, n) =>
        Q(
          String$.annotations({ description: `a string to be decoded into a Uint8Array` }),
          Uint8ArrayFromSelf,
          {
            strict: !0,
            decode: (e, n, r) => Dt(t(e), (t) => new Type(r, e, t.message)),
            encode: (e) => Z(n(e)),
          },
        ).annotations({ identifier: e })),
      (pC = makeUint8ArrayTransformation(`Uint8ArrayFromBase64`, Xy, encodeBase64)),
      (mC = Q(
        String$.annotations({
          description: `A string that is interpreted as being UriComponent-encoded and will be decoded into a UTF-8 string`,
        }),
        String$,
        {
          strict: !0,
          decode: (e, t, n) => Dt(decodeUriComponent(e), (t) => new Type(n, e, t.message)),
          encode: (e, t, n) => Dt(encodeUriComponent(e), (t) => new Type(n, e, t.message)),
        },
      ).annotations({ identifier: `StringFromUriComponent` })),
      (hC = Symbol.for(`effect/SchemaId/ValidDate`)),
      (validDate = (e) => (t) =>
        t.pipe(
          filter((e) => !Number.isNaN(e.getTime()), {
            schemaId: hC,
            [hC]: { noInvalidDate: !0 },
            title: `validDate`,
            description: `a valid Date`,
            ...e,
          }),
        )),
      (gC = ab),
      (DateFromSelf = class extends (
        declare(isDate, {
          typeConstructor: { _tag: `Date` },
          identifier: `DateFromSelf`,
          schemaId: gC,
          [gC]: { noInvalidDate: !1 },
          description: `a potentially invalid Date instance`,
          pretty: () => (e) => `new Date(${JSON.stringify(e)})`,
          arbitrary: () => (e) => e.date({ noInvalidDate: !1 }),
          equivalence: () => m,
        })
      ) {}),
      DateFromSelf.pipe(
        validDate({ identifier: `ValidDateFromSelf`, description: `a valid Date instance` }),
      ),
      (DateFromString = class extends (
        $(
          String$.annotations({ description: `a string to be decoded into a Date` }),
          DateFromSelf,
          { strict: !0, decode: (e) => new Date(e), encode: (e) => formatDate(e) },
        ).annotations({ identifier: `DateFromString` })
      ) {}),
      DateFromString.pipe(validDate({ identifier: `Date` })),
      $(Number$.annotations({ description: `a number to be decoded into a Date` }), DateFromSelf, {
        strict: !0,
        decode: (e) => new Date(e),
        encode: (e) => e.getTime(),
      }).annotations({ identifier: `DateFromNumber` }),
      (DateTimeUtcFromSelf = class extends (
        declare((e) => by(e) && Cy(e), {
          typeConstructor: { _tag: `effect/DateTime.Utc` },
          identifier: `DateTimeUtcFromSelf`,
          description: `a DateTime.Utc instance`,
          pretty: () => (e) => e.toString(),
          arbitrary: () => (e) => e.date({ noInvalidDate: !0 }).map((e) => Ey(e)),
          equivalence: () => Ty,
        })
      ) {}),
      (decodeDateTimeUtc = (e, t) =>
        Kx({
          try: () => Dy(e),
          catch: () => new Type(t, e, `Unable to decode ${formatUnknown(e)} into a DateTime.Utc`),
        })),
      Q(
        Number$.annotations({ description: `a number to be decoded into a DateTime.Utc` }),
        DateTimeUtcFromSelf,
        { strict: !0, decode: (e, t, n) => decodeDateTimeUtc(e, n), encode: (e) => Z(Fy(e)) },
      ).annotations({ identifier: `DateTimeUtcFromNumber` }),
      Q(
        DateFromSelf.annotations({ description: `a Date to be decoded into a DateTime.Utc` }),
        DateTimeUtcFromSelf,
        { strict: !0, decode: (e, t, n) => decodeDateTimeUtc(e, n), encode: (e) => Z(Py(e)) },
      ).annotations({ identifier: `DateTimeUtcFromDate` }),
      Q(
        String$.annotations({ description: `a string to be decoded into a DateTime.Utc` }),
        DateTimeUtcFromSelf,
        { strict: !0, decode: (e, t, n) => decodeDateTimeUtc(e, n), encode: (e) => Z(Iy(e)) },
      ).annotations({ identifier: `DateTimeUtc` }),
      (timeZoneOffsetArbitrary = () => (e) =>
        e.integer({ min: -720 * 60 * 1e3, max: 840 * 60 * 1e3 }).map(jy)),
      (TimeZoneOffsetFromSelf = class extends (
        declare(xy, {
          typeConstructor: { _tag: `effect/DateTime.TimeZone.Offset` },
          identifier: `TimeZoneOffsetFromSelf`,
          description: `a TimeZone.Offset instance`,
          pretty: () => (e) => e.toString(),
          arbitrary: timeZoneOffsetArbitrary,
        })
      ) {}),
      $(
        Number$.annotations({ description: `a number to be decoded into a TimeZone.Offset` }),
        TimeZoneOffsetFromSelf,
        { strict: !0, decode: (e) => jy(e), encode: (e) => e.offset },
      ).annotations({ identifier: `TimeZoneOffset` }),
      (timeZoneNamedArbitrary = () => (e) =>
        e.constantFrom(...Intl.supportedValuesOf(`timeZone`)).map(Ay)),
      (TimeZoneNamedFromSelf = class extends (
        declare(Sy, {
          typeConstructor: { _tag: `effect/DateTime.TimeZone.Named` },
          identifier: `TimeZoneNamedFromSelf`,
          description: `a TimeZone.Named instance`,
          pretty: () => (e) => e.toString(),
          arbitrary: timeZoneNamedArbitrary,
        })
      ) {}),
      Q(
        String$.annotations({ description: `a string to be decoded into a TimeZone.Named` }),
        TimeZoneNamedFromSelf,
        {
          strict: !0,
          decode: (e, t, n) =>
            Kx({
              try: () => Ay(e),
              catch: () =>
                new Type(n, e, `Unable to decode ${JSON.stringify(e)} into a TimeZone.Named`),
            }),
          encode: (e) => Z(e.id),
        },
      ).annotations({ identifier: `TimeZoneNamed` }),
      (TimeZoneFromSelf = class extends Union(TimeZoneOffsetFromSelf, TimeZoneNamedFromSelf) {}),
      Q(
        String$.annotations({ description: `a string to be decoded into a TimeZone` }),
        TimeZoneFromSelf,
        {
          strict: !0,
          decode: (e, t, n) =>
            L(My(e), {
              onNone: () =>
                Gx(new Type(n, e, `Unable to decode ${JSON.stringify(e)} into a TimeZone`)),
              onSome: Z,
            }),
          encode: (e) => Z(Ny(e)),
        },
      ).annotations({ identifier: `TimeZone` }),
      (timeZoneArbitrary = (e) =>
        e.oneof(timeZoneOffsetArbitrary()(e), timeZoneNamedArbitrary()(e))),
      (DateTimeZonedFromSelf = class extends (
        declare((e) => by(e) && wy(e), {
          typeConstructor: { _tag: `effect/DateTime.Zoned` },
          identifier: `DateTimeZonedFromSelf`,
          description: `a DateTime.Zoned instance`,
          pretty: () => (e) => e.toString(),
          arbitrary: () => (e) =>
            e
              .tuple(e.integer({ min: -31536e9, max: 31536e9 }), timeZoneArbitrary(e))
              .map(([e, t]) => Oy(e, { timeZone: t })),
          equivalence: () => Ty,
        })
      ) {}),
      Q(
        String$.annotations({ description: `a string to be decoded into a DateTime.Zoned` }),
        DateTimeZonedFromSelf,
        {
          strict: !0,
          decode: (e, t, n) =>
            L(ky(e), {
              onNone: () =>
                Gx(new Type(n, e, `Unable to decode ${JSON.stringify(e)} into a DateTime.Zoned`)),
              onSome: Z,
            }),
          encode: (e) => Z(Ly(e)),
        },
      ).annotations({ identifier: `DateTimeZoned` }),
      (_C = Struct({ _tag: Literal(`None`) }).annotations({ description: `NoneEncoded` })),
      (optionSomeEncoded = (e) =>
        Struct({ _tag: Literal(`Some`), value: e }).annotations({
          description: `SomeEncoded<${format(e)}>`,
        })),
      (optionEncoded = (e) =>
        Union(_C, optionSomeEncoded(e)).annotations({
          description: `OptionEncoded<${format(e)}>`,
        })),
      (optionDecode = (e) => (e._tag === `None` ? N() : P(e.value))),
      (optionArbitrary = (e, t) => (n) =>
        n
          .oneof(
            t,
            n.record({ _tag: n.constant(`None`) }),
            n.record({ _tag: n.constant(`Some`), value: e(n) }),
          )
          .map(optionDecode)),
      (optionPretty = (e) => L({ onNone: () => `none()`, onSome: (t) => `some(${e(t)})` })),
      (optionParse = (e) => (t, n, r) =>
        Vt(t) ? (F(t) ? Z(N()) : toComposite(e(t.value, n), P, r, t)) : Gx(new Type(r, t))),
      (OptionFromSelf_ = (e) =>
        declare(
          [e],
          { decode: (e) => optionParse(tS(e)), encode: (e) => optionParse(encodeUnknown(e)) },
          {
            typeConstructor: { _tag: `effect/Option` },
            pretty: optionPretty,
            arbitrary: optionArbitrary,
            equivalence: Zt,
          },
        )),
      (OptionFromSelf = (e) =>
        OptionFromSelf_(e).annotations({ description: `Option<${format(e)}>` })),
      (vC = { _tag: `None` }),
      (makeSomeEncoded = (e) => ({ _tag: `Some`, value: e })),
      $(String$, OptionFromSelf(NonEmptyTrimmedString), {
        strict: !0,
        decode: (e) => Xt(P(e.trim()), Ov),
        encode: (e) => R(e, () => ``),
      }),
      (bigDecimalPretty = () => (e) => `BigDecimal(${my(normalize(e))})`),
      (bigDecimalArbitrary = () => (e) =>
        e.tuple(e.bigInt(), e.integer({ min: -18, max: 18 })).map(([e, t]) => oy(e, t))),
      (BigDecimalFromSelf = class extends (
        declare(isBigDecimal, {
          typeConstructor: { _tag: `effect/BigDecimal` },
          identifier: `BigDecimalFromSelf`,
          pretty: bigDecimalPretty,
          arbitrary: bigDecimalArbitrary,
          equivalence: () => dy,
        })
      ) {}),
      Q(
        String$.annotations({ description: `a string to be decoded into a BigDecimal` }),
        BigDecimalFromSelf,
        {
          strict: !0,
          decode: (e, t, n) =>
            py(e).pipe(
              L({
                onNone: () =>
                  Gx(new Type(n, e, `Unable to decode ${JSON.stringify(e)} into a BigDecimal`)),
                onSome: (e) => Z(normalize(e)),
              }),
            ),
          encode: (e) => Z(my(normalize(e))),
        },
      ).annotations({ identifier: `BigDecimal` }),
      $(
        Number$.annotations({ description: `a number to be decoded into a BigDecimal` }),
        BigDecimalFromSelf,
        { strict: !0, decode: (e) => unsafeFromNumber(e), encode: (e) => unsafeToNumber(e) },
      ).annotations({ identifier: `BigDecimalFromNumber` }),
      (isField = (e) => isSchema(e) || isPropertySignature(e)),
      (isFields = (e) => Reflect.ownKeys(e).every((t) => isField(e[t]))),
      (getFields = (e) => (`fields` in e ? e.fields : getFields(e[FS]))),
      (getSchemaFromFieldsOr = (e) =>
        isFields(e) ? Struct(e) : isSchema(e) ? e : Struct(getFields(e))),
      (getFieldsFromFieldsOr = (e) => (isFields(e) ? e : getFields(e))),
      (Class = (e) => (t, n) =>
        makeClass({
          kind: `Class`,
          identifier: e,
          schema: getSchemaFromFieldsOr(t),
          fields: getFieldsFromFieldsOr(t),
          Base: V_,
          annotations: n,
        })),
      (getClassTag = (e) => ES(propertySignature(Literal(e)), () => e)),
      (TaggedError = (e) => (t, n, r) => {
        class Base extends H_ {}
        Base.prototype.name = t;
        let i = getFieldsFromFieldsOr(n),
          a = getSchemaFromFieldsOr(n),
          o = { _tag: getClassTag(t) },
          s = extendFields(o, i),
          c = `message` in s;
        class TaggedErrorClass extends makeClass({
          kind: `TaggedError`,
          identifier: e ?? t,
          schema: NS(a, Struct(o)),
          fields: s,
          Base,
          annotations: r,
          disableToString: !0,
        }) {
          static _tag = t;
        }
        return (
          c ||
            Object.defineProperty(TaggedErrorClass.prototype, "message", {
              get() {
                return `{ ${Reflect.ownKeys(i)
                  .map((e) => `${formatPropertyKey$1(e)}: ${formatUnknown(this[e])}`)
                  .join(`, `)} }`;
              },
              enumerable: !1,
              configurable: !0,
            }),
          TaggedErrorClass
        );
      }),
      (extendFields = (e, t) => {
        let n = { ...e };
        for (let r of Reflect.ownKeys(t)) {
          if (r in e) throw Error(getASTDuplicatePropertySignatureErrorMessage(r));
          n[r] = t[r];
        }
        return n;
      }),
      (yC = globalValue(`effect/Schema/astCache`, () => new WeakMap())),
      (getClassAnnotations = (e) => (e === void 0 ? [] : Array.isArray(e) ? e : [e])),
      (makeClass = ({
        Base: e,
        annotations: t,
        disableToString: n,
        fields: r,
        identifier: i,
        kind: a,
        schema: o,
      }) => {
        let s = Symbol.for(`effect/Schema/${a}/${i}`),
          [c, l, u] = getClassAnnotations(t),
          d = typeSchema(o),
          p = d.annotations({ identifier: i, ...c }),
          m = d.annotations({ [Ob]: `${i} (Type side)`, ...c }),
          h = o.annotations({ [Ob]: `${i} (Constructor)`, ...c }),
          g = o.annotations({ [Ob]: `${i} (Encoded side)`, ...u }),
          _ = o.annotations({ ...u, ...c, ...l }),
          fallbackInstanceOf = (e) => b(e, s) && is(m)(e),
          klass = class extends e {
            constructor(e = {}, t = !1) {
              ((e = { ...e }),
                a !== `Class` && delete e._tag,
                (e = lazilyMergeDefaults(r, e)),
                getDisableValidationMakeOption(t) || (e = validateSync(h)(e)),
                super(e, !0));
            }
            static [_S] = vS;
            static get ast() {
              let e = yC.get(this);
              if (e) return e;
              let t = declare(
                [o],
                {
                  decode: () => (e, t, n) =>
                    e instanceof this || fallbackInstanceOf(e) ? Z(e) : Gx(new Type(n, e)),
                  encode: () => (e, t) =>
                    e instanceof this ? Z(e) : Xx(encodeUnknown(m)(e, t), (e) => new this(e, !0)),
                },
                {
                  identifier: i,
                  pretty: (e) => (t) => `${i}(${e(t)})`,
                  arbitrary: (e) => (t) => e(t).map((e) => new this(e)),
                  equivalence: identity,
                  [Hb]: p.ast,
                  ...c,
                },
              );
              return (
                (e = $(g, t, {
                  strict: !0,
                  decode: (e) => new this(e, !0),
                  encode: identity,
                }).annotations({ [Hb]: _.ast, ...l }).ast),
                yC.set(this, e),
                e
              );
            }
            static pipe() {
              return pipeArguments(this, arguments);
            }
            static annotations(e) {
              return make$2(this.ast).annotations(e);
            }
            static toString() {
              return `(${String(g)} <-> ${i})`;
            }
            static make(...e) {
              return new this(...e);
            }
            static fields = { ...r };
            static identifier = i;
            static extend(e) {
              return (t, n) => {
                let i = getFieldsFromFieldsOr(t),
                  s = getSchemaFromFieldsOr(t),
                  c = extendFields(r, i);
                return makeClass({
                  kind: a,
                  identifier: e,
                  schema: NS(o, s),
                  fields: c,
                  Base: this,
                  annotations: n,
                });
              };
            }
            static transformOrFail(e) {
              return (t, n, i) => {
                let s = extendFields(r, t);
                return makeClass({
                  kind: a,
                  identifier: e,
                  schema: Q(o, typeSchema(Struct(s)), n),
                  fields: s,
                  Base: this,
                  annotations: i,
                });
              };
            }
            static transformOrFailFrom(e) {
              return (t, n, i) => {
                let s = extendFields(r, t);
                return makeClass({
                  kind: a,
                  identifier: e,
                  schema: Q(encodedSchema(o), Struct(s), n),
                  fields: s,
                  Base: this,
                  annotations: i,
                });
              };
            }
            get [s]() {
              return s;
            }
          };
        return (
          n !== !0 &&
            Object.defineProperty(klass.prototype, "toString", {
              value() {
                return `${i}({ ${Reflect.ownKeys(r)
                  .map((e) => `${formatPropertyKey$1(e)}: ${formatUnknown(this[e])}`)
                  .join(`, `)} })`;
              },
              configurable: !0,
              writable: !0,
            }),
          klass
        );
      }),
      (bC = Union(
        Struct({ _tag: Literal(`None`) }).annotations({ identifier: `FiberIdNoneEncoded` }),
        Struct({ _tag: Literal(`Runtime`), id: Int, startTimeMillis: Int }).annotations({
          identifier: `FiberIdRuntimeEncoded`,
        }),
        Struct({
          _tag: Literal(`Composite`),
          left: suspend(() => bC),
          right: suspend(() => bC),
        }).annotations({ identifier: `FiberIdCompositeEncoded` }),
      ).annotations({ identifier: `FiberIdEncoded` })),
      (fiberIdArbitrary = (e) =>
        e
          .letrec((t) => ({
            None: e.record({ _tag: e.constant(`None`) }),
            Runtime: e.record({
              _tag: e.constant(`Runtime`),
              id: e.integer(),
              startTimeMillis: e.integer(),
            }),
            Composite: e.record({
              _tag: e.constant(`Composite`),
              left: t(`FiberId`),
              right: t(`FiberId`),
            }),
            FiberId: e.oneof(t(`None`), t(`Runtime`), t(`Composite`)),
          }))
          .FiberId.map(fiberIdDecode)),
      (fiberIdPretty = (e) => {
        switch (e._tag) {
          case `None`:
            return `FiberId.none`;
          case `Runtime`:
            return `FiberId.runtime(${e.id}, ${e.startTimeMillis})`;
          case `Composite`:
            return `FiberId.composite(${fiberIdPretty(e.right)}, ${fiberIdPretty(e.left)})`;
        }
      }),
      (FiberIdFromSelf = class extends (
        declare(jo, {
          typeConstructor: { _tag: `effect/FiberId` },
          identifier: `FiberIdFromSelf`,
          pretty: () => fiberIdPretty,
          arbitrary: () => fiberIdArbitrary,
        })
      ) {}),
      (fiberIdDecode = (e) => {
        switch (e._tag) {
          case `None`:
            return Oo;
          case `Runtime`:
            return ko(e.id, e.startTimeMillis);
          case `Composite`:
            return Ao(fiberIdDecode(e.left), fiberIdDecode(e.right));
        }
      }),
      (fiberIdEncode = (e) => {
        switch (e._tag) {
          case `None`:
            return { _tag: `None` };
          case `Runtime`:
            return { _tag: `Runtime`, id: e.id, startTimeMillis: e.startTimeMillis };
          case `Composite`:
            return {
              _tag: `Composite`,
              left: fiberIdEncode(e.left),
              right: fiberIdEncode(e.right),
            };
        }
      }),
      $(bC, FiberIdFromSelf, {
        strict: !0,
        decode: (e) => fiberIdDecode(e),
        encode: (e) => fiberIdEncode(e),
      }).annotations({ identifier: `FiberId` }),
      (Defect = class extends (
        $(Unknown, Unknown, {
          strict: !0,
          decode: (e) => {
            if (te(e) && `message` in e && typeof e.message == `string`) {
              let t = Error(e.message, { cause: e });
              return (
                `name` in e && typeof e.name == `string` && (t.name = e.name),
                (t.stack = `stack` in e && typeof e.stack == `string` ? e.stack : ``),
                t
              );
            }
            return prettyErrorMessage(e);
          },
          encode: (e) =>
            e instanceof Error ? { name: e.name, message: e.message } : prettyErrorMessage(e),
        }).annotations({ identifier: `Defect` })
      ) {}),
      $(Unknown, Boolean$, {
        strict: !0,
        decode: (e) => isTruthy(e),
        encode: identity,
      }).annotations({ identifier: `BooleanFromUnknown` }),
      $(
        Literal(`true`, `false`).annotations({
          description: `a string to be decoded into a boolean`,
        }),
        Boolean$,
        { strict: !0, decode: (e) => e === `true`, encode: (e) => (e ? `true` : `false`) },
      ).annotations({ identifier: `BooleanFromString` }),
      (xC = TaggedStruct(`symbol`, { key: String$ }).annotations({
        description: `an object to be decoded into a globally shared symbol`,
      })),
      (SC = Q(xC, SymbolFromSelf, {
        strict: !0,
        decode: (e) => decodeSymbol(e.key),
        encode: (e, t, n) => Xx(encodeSymbol(e, n), (e) => xC.make({ key: e })),
      })),
      (PropertyKey$ = class extends (
        Union(String$, Number$, SC).annotations({ identifier: `PropertyKey` })
      ) {}),
      Struct({
        _tag: propertySignature(
          Literal(
            `Pointer`,
            `Unexpected`,
            `Missing`,
            `Composite`,
            `Refinement`,
            `Transformation`,
            `Type`,
            `Forbidden`,
          ),
        ).annotations({ description: `The tag identifying the type of parse issue` }),
        path: propertySignature(Array$(PropertyKey$)).annotations({
          description: `The path to the property where the issue occurred`,
        }),
        message: propertySignature(String$).annotations({
          description: `A descriptive message explaining the issue`,
        }),
      }).annotations({
        identifier: `ArrayFormatterIssue`,
        description: `Represents an issue returned by the ArrayFormatter formatter`,
      }));
  }),
  wC,
  nominal,
  TC = __esmMin(() => {
    (Nt(),
      z(),
      (wC = Symbol.for(`effect/Brand/Refined`)),
      (nominal = () =>
        Object.assign((e) => e, {
          [wC]: wC,
          option: (e) => P(e),
          either: (e) => j(e),
          is: (e) => !0,
        })));
  }),
  EC,
  DC = __esmMin(() => {
    EC = `ContinuationK`;
  }),
  OC,
  kC,
  ContinuationKImpl,
  AC = __esmMin(() => {
    (cm(),
      DC(),
      (OC = Symbol.for(`effect/ChannelContinuation`)),
      (kC = {
        _Env: (e) => e,
        _InErr: (e) => e,
        _InElem: (e) => e,
        _InDone: (e) => e,
        _OutErr: (e) => e,
        _OutDone: (e) => e,
        _OutErr2: (e) => e,
        _OutElem: (e) => e,
        _OutDone2: (e) => e,
      }),
      (ContinuationKImpl = class {
        onSuccess;
        onHalt;
        _tag = EC;
        [OC] = kC;
        constructor(e, t) {
          ((this.onSuccess = e), (this.onHalt = t));
        }
        onExit(e) {
          return im(e) ? this.onHalt(e.cause) : this.onSuccess(e.value);
        }
      }));
  }),
  jC,
  MC,
  NC,
  PC,
  FC,
  IC,
  LC = __esmMin(() => {
    ((jC = `Emit`),
      (MC = `Fail`),
      (NC = `Fold`),
      (PC = `FromEffect`),
      (FC = `Succeed`),
      (IC = `SucceedNow`));
  }),
  RC,
  zC,
  BC,
  VC,
  HC,
  fail,
  failCause,
  failCauseSync,
  UC,
  WC,
  succeed,
  succeedNow,
  sync,
  GC,
  write,
  KC = __esmMin(() => {
    (l_(),
      l(),
      A(),
      AC(),
      LC(),
      (RC = `effect/Channel`),
      (zC = Symbol.for(RC)),
      (BC = {
        _Env: (e) => e,
        _InErr: (e) => e,
        _InElem: (e) => e,
        _InDone: (e) => e,
        _OutErr: (e) => e,
        _OutElem: (e) => e,
        _OutDone: (e) => e,
      }),
      (VC = {
        [zC]: BC,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (HC = dual(2, (e, t) => {
        let n = Object.create(VC);
        return ((n._tag = NC), (n.channel = e), (n.k = new ContinuationKImpl(succeed, t)), n);
      })),
      (fail = (e) => failCause(n_(e))),
      (failCause = (e) => failCauseSync(() => e)),
      (failCauseSync = (e) => {
        let t = Object.create(VC);
        return ((t._tag = MC), (t.error = e), t);
      }),
      (UC = dual(2, (e, t) => {
        let n = Object.create(VC);
        return ((n._tag = NC), (n.channel = e), (n.k = new ContinuationKImpl(t, failCause)), n);
      })),
      (WC = __name((e) => {
        let t = Object.create(VC);
        return ((t._tag = PC), (t.effect = () => e), t);
      }, `fromEffect`)),
      (succeed = (e) => sync(() => e)),
      (succeedNow = (e) => {
        let t = Object.create(VC);
        return ((t._tag = IC), (t.terminal = e), t);
      }),
      (sync = (e) => {
        let t = Object.create(VC);
        return ((t._tag = FC), (t.evaluate = e), t);
      }),
      (GC = succeedNow(void 0)),
      (write = (e) => {
        let t = Object.create(VC);
        return ((t._tag = jC), (t.out = e), t);
      }));
  }),
  flatten,
  qC,
  JC,
  unwrap,
  YC = __esmMin(() => {
    (l_(),
      l(),
      KC(),
      (flatten = (e) => UC(e, identity)),
      (qC = dual(2, (e, t) => JC(e, a_(t)))),
      (JC = dual(2, (e, t) => HC(e, (e) => failCause(t(e))))),
      (unwrap = (e) => flatten(WC(e))));
  }),
  XC,
  ZC,
  QC,
  StreamImpl,
  toChannel,
  fromEffect,
  fromEffectOption,
  $C,
  ew = __esmMin(() => {
    (lr(),
      ny(),
      l(),
      z(),
      A(),
      YC(),
      KC(),
      (XC = `effect/Stream`),
      (ZC = Symbol.for(XC)),
      (QC = { _R: (e) => e, _E: (e) => e, _A: (e) => e }),
      (StreamImpl = class {
        channel;
        [ZC] = QC;
        constructor(e) {
          this.channel = e;
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (toChannel = (e) => {
        if (`channel` in e) return e.channel;
        if (Av(e)) return toChannel(fromEffect(e));
        throw TypeError(`Expected a Stream.`);
      }),
      (fromEffect = (e) => pipe(e, Uv(P), fromEffectOption)),
      (fromEffectOption = (e) =>
        new StreamImpl(
          unwrap(
            Yv(e, {
              onFailure: L({ onNone: () => GC, onSome: fail }),
              onSuccess: (e) => write(Zn(e)),
            }),
          ),
        )),
      ($C = dual(2, (e, t) => new StreamImpl(pipe(toChannel(e), qC(t))))));
  }),
  tw,
  nw = __esmMin(() => {
    (ew(), (tw = $C));
  }),
  fromInput,
  fromInputNested,
  toRecord,
  schemaStruct,
  rw = __esmMin(() => {
    (H(),
      CC(),
      (fromInput = (e) => {
        let t = fromInputNested(e),
          n = [];
        for (let e = 0; e < t.length; e++)
          if (Array.isArray(t[e][0])) {
            let [r, i] = t[e];
            n.push([`${r[0]}[${r.slice(1).join(`][`)}]`, i]);
          } else n.push(t[e]);
        return n;
      }),
      (fromInputNested = (e) => {
        let t = Symbol.iterator in e ? B(e) : Object.entries(e),
          n = [];
        for (let [e, r] of t)
          if (Array.isArray(r))
            for (let t = 0; t < r.length; t++) r[t] !== void 0 && n.push([e, String(r[t])]);
          else if (typeof r == `object`) {
            let t = fromInputNested(r);
            for (let [r, i] of t) n.push([[e, ...(typeof r == `string` ? [r] : r)], i]);
          } else r !== void 0 && n.push([e, String(r)]);
        return n;
      }),
      (toRecord = (e) => {
        let t = Object.create(null);
        for (let [n, r] of e) {
          let e = t[n];
          e === void 0 ? (t[n] = r) : typeof e == `string` ? (t[n] = [e, r]) : e.push(r);
        }
        return { ...t };
      }),
      (schemaStruct = (e, t) => (n) => decodeUnknown(e, t)(toRecord(n))));
  }),
  iw = __esmMin(() => {
    (YC(),
      KC(),
      H(),
      l_(),
      lr(),
      Bp(),
      ao(),
      ny(),
      Nt(),
      cm(),
      l(),
      Wo(),
      wi(),
      z(),
      A(),
      x(),
      Nd(),
      k(),
      fo(),
      Su(),
      Y(),
      Bd(),
      t_(),
      f_(),
      ew(),
      CC(),
      nw(),
      TC(),
      Pa(),
      D(),
      W_(),
      yy(),
      y(),
      Sc(),
      Ac(),
      T(),
      _h(),
      rm(),
      as(),
      Do(),
      dg(),
      Pp(),
      rf(),
      g(),
      kv(),
      Dv(),
      kd(),
      _d(),
      re(),
      ra(),
      Po(),
      Dm(),
      vm(),
      yg(),
      rw(),
      Td(),
      Ux(),
      pS(),
      gS(),
      $y(),
      __(),
      j_(),
      Wd(),
      an(),
      ib(),
      bb(),
      Pu(),
      sd(),
      Lu(),
      B_(),
      dc(),
      nc(),
      ns(),
      $d(),
      Im());
  }),
  aw = __esmMin(() => {
    (l(),
      H(),
      y(),
      ib(),
      bb(),
      eb(),
      z(),
      x(),
      Ux(),
      hy(),
      gy(),
      Ad(),
      TC(),
      Pa(),
      Y(),
      Ac(),
      ao(),
      Nt(),
      D(),
      cm(),
      T(),
      _h(),
      lr(),
      k(),
      A(),
      fo(),
      rm(),
      as(),
      Do(),
      t_(),
      l_(),
      YC(),
      KC(),
      Bp(),
      ny(),
      Wo(),
      wi(),
      Nd(),
      Su(),
      Bd(),
      f_(),
      ew(),
      Pu(),
      kd(),
      $e(),
      Xu(),
      sd(),
      Lu(),
      dd(),
      B_(),
      W_(),
      g(),
      Dv(),
      kv(),
      Ry(),
      xg(),
      $y(),
      _d(),
      re(),
      ra(),
      Po(),
      Pp(),
      Dm(),
      vm(),
      yg(),
      yy(),
      Wd(),
      __(),
      j_(),
      an(),
      Sc(),
      dg(),
      rf(),
      _f(),
      Nf(),
      LC(),
      DC(),
      AC(),
      pS(),
      ns(),
      Wf(),
      Vp(),
      dc(),
      nc(),
      Td(),
      $d(),
      Im(),
      lg(),
      zm(),
      Gh(),
      lh(),
      th(),
      Gp(),
      Xh(),
      eg(),
      Lh(),
      Ap(),
      Be(),
      Bt(),
      _r(),
      Cu(),
      hc(),
      _e(),
      Re(),
      Mc(),
      CC(),
      nw(),
      gS(),
      bu(),
      nn());
  }),
  ow,
  sw = __esmMin(() => {
    (function (e) {
      ((e[(e.NONE = 0)] = `NONE`), (e[(e.SAMPLED = 1)] = `SAMPLED`));
    })((ow ||= {}));
  }),
  cw,
  lw = __esmMin(() => {
    (function (e) {
      ((e[(e.INTERNAL = 0)] = `INTERNAL`),
        (e[(e.SERVER = 1)] = `SERVER`),
        (e[(e.CLIENT = 2)] = `CLIENT`),
        (e[(e.PRODUCER = 3)] = `PRODUCER`),
        (e[(e.CONSUMER = 4)] = `CONSUMER`));
    })((cw ||= {}));
  }),
  uw,
  dw = __esmMin(() => {
    (function (e) {
      ((e[(e.UNSET = 0)] = `UNSET`), (e[(e.OK = 1)] = `OK`), (e[(e.ERROR = 2)] = `ERROR`));
    })((uw ||= {}));
  });
function validateKey(e) {
  return hw.test(e);
}
function validateValue(e) {
  return gw.test(e) && !_w.test(e);
}
var fw,
  pw,
  mw,
  hw,
  gw,
  _w,
  vw = __esmMin(() => {
    ((fw = `[_0-9a-z-*/]`),
      (pw = `[a-z]` + fw + `{0,255}`),
      (mw = `[a-z0-9]` + fw + `{0,240}@[a-z]` + fw + `{0,13}`),
      (hw = RegExp(`^(?:` + pw + `|` + mw + `)$`)),
      (gw = /^[ -~]{0,255}[!-~]$/),
      (_w = /,|=/));
  }),
  yw,
  bw,
  xw,
  Sw,
  Cw,
  ww = __esmMin(() => {
    (vw(),
      (yw = 32),
      (bw = 512),
      (xw = `,`),
      (Sw = `=`),
      (Cw = (function () {
        function TraceStateImpl(e) {
          ((this._internalState = new Map()), e && this._parse(e));
        }
        return (
          (TraceStateImpl.prototype.set = function (e, t) {
            var n = this._clone();
            return (
              n._internalState.has(e) && n._internalState.delete(e), n._internalState.set(e, t), n
            );
          }),
          (TraceStateImpl.prototype.unset = function (e) {
            var t = this._clone();
            return (t._internalState.delete(e), t);
          }),
          (TraceStateImpl.prototype.get = function (e) {
            return this._internalState.get(e);
          }),
          (TraceStateImpl.prototype.serialize = function () {
            var e = this;
            return this._keys()
              .reduce(function (t, n) {
                return (t.push(n + Sw + e.get(n)), t);
              }, [])
              .join(xw);
          }),
          (TraceStateImpl.prototype._parse = function (e) {
            e.length > bw ||
              ((this._internalState = e
                .split(xw)
                .reverse()
                .reduce(function (e, t) {
                  var n = t.trim(),
                    r = n.indexOf(Sw);
                  if (r !== -1) {
                    var i = n.slice(0, r),
                      a = n.slice(r + 1, t.length);
                    validateKey(i) && validateValue(a) && e.set(i, a);
                  }
                  return e;
                }, new Map())),
              this._internalState.size > yw &&
                (this._internalState = new Map(
                  Array.from(this._internalState.entries()).reverse().slice(0, yw),
                )));
          }),
          (TraceStateImpl.prototype._keys = function () {
            return Array.from(this._internalState.keys()).reverse();
          }),
          (TraceStateImpl.prototype._clone = function () {
            var e = new TraceStateImpl();
            return ((e._internalState = new Map(this._internalState)), e);
          }),
          TraceStateImpl
        );
      })()));
  });
function createTraceState$1(e) {
  return new Cw(e);
}
var Tw = __esmMin(() => {
    (ww(), __name(createTraceState$1, `createTraceState`));
  }),
  Ew = __esmMin(() => {
    (sw(), lw(), dw(), Tw());
  }),
  Dw,
  Ow,
  kw,
  makeExternalSpan,
  makeOtelSpan,
  Aw,
  jw,
  isTimeInput,
  convertOtelTimeInput,
  Mw,
  Nw,
  Pw = __esmMin(() => {
    (Ew(),
      l_(),
      Pa(),
      ny(),
      cm(),
      l(),
      z(),
      (Dw = Symbol.for(`@effect/opentelemetry/Tracer/OtelSpan`)),
      cw.INTERNAL,
      cw.CLIENT,
      cw.SERVER,
      cw.PRODUCER,
      cw.CONSUMER,
      (Ow = wa(`@effect/opentelemetry/Tracer/OtelTraceFlags`)),
      (kw = wa(`@effect/opentelemetry/Tracer/OtelTraceState`)),
      (makeExternalSpan = (e) => {
        let t = Ta();
        return (
          e.traceFlags !== void 0 && (t = Da(t, Ow, e.traceFlags)),
          typeof e.traceState == `string`
            ? (t = L(Nw(e.traceState), { onNone: () => t, onSome: (e) => Da(t, kw, e) }))
            : e.traceState && (t = Da(t, kw, e.traceState)),
          {
            _tag: `ExternalSpan`,
            traceId: e.traceId,
            spanId: e.spanId,
            sampled: e.traceFlags === void 0 || (e.traceFlags & ow.SAMPLED) === ow.SAMPLED,
            context: t,
          }
        );
      }),
      (makeOtelSpan = (e, t) => {
        let n = {
            traceId: e.traceId,
            spanId: e.spanId,
            traceFlags: e.sampled ? ow.SAMPLED : ow.NONE,
            isRemote: !1,
          },
          r = sm,
          i = {
            spanContext: () => n,
            setAttribute(t, n) {
              return (e.attribute(t, n), i);
            },
            setAttributes(t) {
              for (let [n, r] of Object.entries(t)) e.attribute(n, r);
              return i;
            },
            addEvent(n) {
              let r, a;
              if (arguments.length === 3) ((r = arguments[1]), (a = arguments[2]));
              else if (arguments.length === 2) {
                let e = arguments[1];
                isTimeInput(e) ? (a = e) : (r = e);
              }
              return (e.event(n, convertOtelTimeInput(a, t), r), i);
            },
            addLink(t) {
              return (
                e.addLinks([
                  {
                    _tag: `SpanLink`,
                    span: makeExternalSpan(t.context),
                    attributes: t.attributes ?? {},
                  },
                ]),
                i
              );
            },
            addLinks(t) {
              return (
                e.addLinks(
                  t.map((e) => ({
                    _tag: `SpanLink`,
                    span: makeExternalSpan(e.context),
                    attributes: e.attributes ?? {},
                  })),
                ),
                i
              );
            },
            setStatus(e) {
              return ((r = uw.ERROR ? om(e.message ?? `Unknown error`) : sm), i);
            },
            updateName: () => i,
            end(n) {
              let a = convertOtelTimeInput(n, t);
              return (e.end(a, r), i);
            },
            isRecording: a,
            recordException(n, r) {
              let i = convertOtelTimeInput(r, t),
                a = n_(n),
                o = c_(a)[0];
              e.event(o.message, i, {
                "exception.type": o.name,
                "exception.message": o.message,
                "exception.stacktrace": o.stack ?? ``,
              });
            },
          };
        return i;
      }),
      (Aw = BigInt(1e6)),
      (jw = BigInt(1e9)),
      (isTimeInput = (e) =>
        typeof e == `number` ||
        e instanceof Date ||
        (Array.isArray(e) && e.length === 2 && typeof e[0] == `number` && typeof e[1] == `number`)),
      (convertOtelTimeInput = (e, t) => {
        if (e === void 0) return t.unsafeCurrentTimeNanos();
        if (typeof e == `number`) return BigInt(Math.round(e * 1e6));
        if (e instanceof Date) return BigInt(e.getTime()) * Aw;
        let [n, r] = e;
        return BigInt(n) * jw + BigInt(r);
      }),
      (Mw = Wv((e) => Vv(ty, (t) => (Dw in t ? t.span : makeOtelSpan(t, e))))),
      (Nw = liftThrowable(createTraceState$1)));
  }),
  Fw,
  Iw = __esmMin(() => {
    (Pw(), (Fw = Mw));
  }),
  Lw = __esmMin(() => {}),
  Rw = __esmMin(() => {}),
  zw = __esmMin(() => {}),
  Bw = __esmMin(() => {
    typeof navigator < `u` && navigator.product;
  }),
  Vw = __esmMin(() => {}),
  Hw = __esmMin(() => {}),
  Uw = __esmMin(() => {}),
  Ww = __esmMin(() => {}),
  Gw = __esmMin(() => {}),
  Kw = __esmMin(() => {}),
  qw = __esmMin(() => {
    (Ww(), Gw(), Kw());
  }),
  Jw = __esmMin(() => {}),
  Yw = __esmMin(() => {}),
  Xw = __esmMin(() => {}),
  Zw = __esmMin(() => {}),
  memoizeByRef,
  Qw = __esmMin(() => {
    (Lw(),
      Rw(),
      Bw(),
      Vw(),
      Hw(),
      zw(),
      Uw(),
      qw(),
      Jw(),
      Yw(),
      Xw(),
      Zw(),
      zw(),
      (memoizeByRef = (e) => {
        let t = new Map();
        return (n) => {
          if (t.has(n) === !0) return t.get(n);
          let r = e(n);
          return (t.set(n, r), r);
        };
      }));
  }),
  $w = __esmMin(() => {}),
  tapCauseLogPretty,
  getSpanTrace,
  logSpanTrace,
  eT = __esmMin(() => {
    (Iw(),
      aw(),
      l(),
      ny(),
      (tapCauseLogPretty = (e) =>
        Jv(e, (e) =>
          Mv(function* () {
            if (i_(e) === !0) return;
            let t = yield* Fw.pipe(Bv(`NoSuchElementException`, (e) => Pv(void 0))),
              n = e.toString().split(`
`)[0];
            yield* Xv(n, e).pipe((e) =>
              t === void 0
                ? e
                : Zv({ spanId: t.spanContext().spanId, traceId: t.spanContext().traceId })(e),
            );
          }),
        )),
      dual(2, (e, t) => e.pipe(zv(t, () => Iv))),
      (getSpanTrace = () => {
        let e = g_();
        return e._tag === `None` || e.value.currentSpan === void 0 ? `No current fiber` : ``;
      }),
      (logSpanTrace = () => console.log(getSpanTrace())),
      (globalThis.getSpanTrace = getSpanTrace),
      (globalThis.logSpanTrace = logSpanTrace));
  }),
  tT = __esmMin(() => {}),
  swap,
  nT,
  rT = __esmMin(() => {
    (aw(),
      CC(),
      tT(),
      (swap = (e) => Q(typeSchema(e), encodedSchema(e), { decode: aS(e), encode: rS(e) })),
      swap(pC),
      (nT = Union(
        String$,
        Number$,
        Boolean$,
        Null,
        Array$(suspend(() => nT)),
        Record({ key: String$, value: suspend(() => nT) }),
      ).annotations({ identifier: `JsonValue` })));
  }),
  iT = __esmMin(() => {
    nw();
  }),
  aT = __esmMin(() => {
    (r(),
      ny(),
      k(),
      x(),
      CC(),
      W_(),
      Pa(),
      Nt(),
      $y(),
      l(),
      yy(),
      z(),
      TC(),
      YC(),
      KC(),
      H(),
      l_(),
      lr(),
      Bp(),
      ao(),
      cm(),
      Wo(),
      wi(),
      A(),
      Nd(),
      fo(),
      Su(),
      Y(),
      Bd(),
      t_(),
      f_(),
      ew(),
      nw(),
      pS(),
      kd(),
      _d(),
      y(),
      ib(),
      bb(),
      eb(),
      Ux(),
      kv(),
      D(),
      __(),
      Sc(),
      Ac(),
      T(),
      _h(),
      rm(),
      as(),
      Do(),
      dg(),
      j_(),
      Pp(),
      rf(),
      g(),
      rw(),
      Dv(),
      re(),
      ra(),
      Po(),
      Dm(),
      vm(),
      yg(),
      Td(),
      Wd(),
      an(),
      gS(),
      B_(),
      dc(),
      nc(),
      ns(),
      $d(),
      Im(),
      lg(),
      Lh(),
      Ry(),
      Pu(),
      $e(),
      Xu(),
      iw(),
      aw(),
      eT(),
      $w(),
      Iw(),
      rT(),
      iT(),
      zw());
  }),
  oT = __esmMin(() => {}),
  sT = __esmMin(() => {}),
  cT = __esmMin(() => {}),
  lT = __esmMin(() => {}),
  uT = __esmMin(() => {}),
  dT = __esmMin(() => {
    (oT(), sT(), cT(), lT(), uT());
  }),
  fT,
  pT,
  mT,
  hT = __esmMin(() => {
    (aT(), (fT = nominal()), (pT = fromBrand(fT)(Int)), (mT = fT));
  }),
  gT,
  _T,
  vT,
  toString,
  yT,
  makeComposite,
  bT,
  xT = __esmMin(() => {
    (aT(),
      hT(),
      (gT = nominal()),
      (_T = fromBrand(gT)(Int)),
      (vT = gT),
      vT(0),
      (toString = (e) => {
        let t = e.rebaseGeneration > 0 ? `r${e.rebaseGeneration}` : ``;
        return e.client === 0 ? `e${e.global}${t}` : `e${e.global}.${e.client}${t}`;
      }),
      (yT = Struct({ global: pT, client: _T, rebaseGeneration: Int }).annotations({
        title: `EventSequenceNumber.Composite`,
        pretty: () => (e) => toString(e),
      })),
      (makeComposite = (e) =>
        is(yT)(e) === !0 ? e : nS(yT)({ ...e, rebaseGeneration: e.rebaseGeneration ?? 0 })),
      (bT = Object.assign(yT, { make: makeComposite })),
      mT(0));
  }),
  ST = __esmMin(() => {
    (xT(), hT());
  }),
  CT,
  makeSchema,
  wT = __esmMin(() => {
    (Qw(),
      aT(),
      ST(),
      Struct({
        name: String$,
        args: Any,
        seqNum: bT,
        parentSeqNum: bT,
        clientId: String$,
        sessionId: String$,
      }).annotations({ title: `LiveStoreEvent.Client.Decoded` }),
      (CT = Struct({
        name: String$,
        args: Any,
        seqNum: bT,
        parentSeqNum: bT,
        clientId: String$,
        sessionId: String$,
      }).annotations({ title: `LiveStoreEvent.Client.Encoded` })),
      Class(`LiveStoreEvent.Client.EncodedWithMeta`)({
        name: String$,
        args: Any,
        seqNum: bT,
        parentSeqNum: bT,
        clientId: String$,
        sessionId: String$,
        meta: Struct({
          sessionChangeset: Union(
            TaggedStruct(`sessionChangeset`, { data: Uint8Array$, debug: Any.pipe(optional) }),
            TaggedStruct(`no-op`, {}),
            TaggedStruct(`unset`, {}),
          ),
          syncMetadata: Option(nT),
          materializerHashLeader: Option(Number$),
          materializerHashSession: Option(Number$),
        }).pipe(
          mutable,
          optional,
          OS({
            constructor: () => ({
              sessionChangeset: { _tag: `unset` },
              syncMetadata: N(),
              materializerHashLeader: N(),
              materializerHashSession: N(),
            }),
            decoding: () => ({
              sessionChangeset: { _tag: `unset` },
              syncMetadata: N(),
              materializerHashLeader: N(),
              materializerHashSession: N(),
            }),
          }),
        ),
      }),
      (makeSchema = (e) =>
        Union(
          ...[...e.eventsDefsMap.values()].map((e) =>
            Struct({
              name: Literal(e.name),
              args: e.schema,
              seqNum: bT,
              parentSeqNum: bT,
              clientId: String$,
              sessionId: String$,
            }),
          ),
        ).annotations({ title: `LiveStoreEvent.Client` })),
      memoizeByRef(makeSchema));
  }),
  TT,
  ET = __esmMin(() => {
    (aT(),
      ST(),
      (TT = Struct({
        name: String$,
        args: Any,
        seqNum: pT,
        parentSeqNum: pT,
        clientId: String$,
        sessionId: String$,
      }).annotations({ title: `LiveStoreEvent.Global.Encoded` })));
  }),
  DT = __esmMin(() => {
    (wT(), ET(), aT());
  }),
  OT = __esmMin(() => {}),
  kT,
  MaterializerHashMismatchError,
  SqliteError,
  UnknownEventError,
  AT = __esmMin(() => {
    (aT(),
      DT(),
      (kT = class UnknownError extends (
        TaggedError(`~@livestore/common/UnknownError`)(`UnknownError`, {
          cause: Defect,
          note: optional(String$),
          payload: optional(Any),
        })
      ) {
        static mapToUnknownError = (e) =>
          e.pipe(
            Uv((e) => (is(UnknownError)(e) === !0 ? e : new UnknownError({ cause: e }))),
            Rv((e) => new UnknownError({ cause: e })),
          );
        static mapToUnknownErrorLayer = (e) =>
          e.pipe(
            _y((e) =>
              r_(e) === !0 && is(UnknownError)(e.error) === !0
                ? vy(e.error)
                : vy(new UnknownError({ cause: e })),
            ),
          );
        static mapToUnknownErrorStream = (e) =>
          e.pipe(tw((e) => (is(UnknownError)(e) === !0 ? e : new UnknownError({ cause: e }))));
      }),
      (MaterializerHashMismatchError = class extends (
        TaggedError(`~@livestore/common/MaterializerHashMismatchError`)(
          `MaterializerHashMismatchError`,
          {
            eventName: String$,
            note: kS(String$, {
              default: () =>
                `Please make sure your event materializer is a pure function without side effects.`,
            }),
          },
        )
      ) {}),
      TaggedError(`~@livestore/common/IntentionalShutdownCause`)(`IntentionalShutdownCause`, {
        reason: Literal(
          `devtools-reset`,
          `devtools-import`,
          `adapter-reset`,
          `manual`,
          `backend-id-mismatch`,
        ),
      }),
      TaggedError(`~@livestore/common/StoreInterrupted`)(`StoreInterrupted`, { reason: String$ }),
      (SqliteError = class extends (
        TaggedError(`~@livestore/common/SqliteError`)(`SqliteError`, {
          query: optional(
            Struct({
              sql: String$,
              bindValues: Union(Record({ key: String$, value: Any }), Array$(Any)),
            }),
          ),
          code: optional(Union(Number$, String$)),
          cause: Defect,
          note: optional(String$),
        })
      ) {}),
      (UnknownEventError = class extends (
        TaggedError(`~@livestore/common/UnknownEventError`)(`UnknownEventError`, {
          event: CT.pipe(pick(`name`, `args`, `seqNum`, `clientId`, `sessionId`)),
          reason: Literal(`event-definition-missing`, `materializer-missing`),
          operation: String$,
          note: optional(String$),
        })
      ) {}),
      TaggedError(`~@livestore/common/MaterializeError`)(`MaterializeError`, {
        cause: Union(MaterializerHashMismatchError, SqliteError, UnknownEventError),
        note: optional(String$),
      }));
  }),
  jT = __esmMin(() => {}),
  MT = __esmMin(() => {
    (OT(), AT(), jT());
  }),
  NT = __esmMin(() => {}),
  PT = __esmMin(() => {}),
  FT = __esmMin(() => {}),
  IT = __esmMin(() => {
    (PT(), FT());
  }),
  LT = __esmMin(() => {}),
  RT = __esmMin(() => {}),
  zT = __esmMin(() => {}),
  BT = __esmMin(() => {}),
  VT = __esmMin(() => {
    (BT(), LT());
  }),
  HT = __esmMin(() => {
    (dT(), ST(), dT(), DT(), RT(), Qw(), aT(), MT(), NT(), IT(), LT(), zT(), VT(), AT());
  }),
  UT = __esmMin(() => {}),
  WT = __esmMin(() => {}),
  GT,
  KT = __esmMin(() => {
    (aT(),
      HT(),
      TaggedError(`~@livestore/common/IsOfflineError`)(`IsOfflineError`, { cause: Defect }),
      (GT = String$.annotations({ title: `@livestore/sync-cf:BackendId` })),
      TaggedError(`~@livestore/common/BackendIdMismatchError`)(`BackendIdMismatchError`, {
        expected: GT,
        received: GT,
      }),
      TaggedError(`~@livestore/common/ServerAheadError`)(`ServerAheadError`, {
        minimumExpectedNum: pT,
        providedNum: pT,
      }));
  }),
  qT = __esmMin(() => {}),
  JT,
  YT = __esmMin(() => {
    (aT(),
      qT(),
      Struct({
        isConnected: Boolean$,
        timestampMs: Number$,
        devtools: Struct({ latchClosed: Boolean$ }),
      }).annotations({ title: `NetworkStatus` }),
      (JT = Union(
        TaggedStruct(`MoreUnknown`, {}),
        TaggedStruct(`MoreKnown`, { remaining: Number$ }),
        TaggedStruct(`NoMore`, {}),
      )));
  }),
  XT = __esmMin(() => {
    (KT(), YT());
  }),
  ZT = __esmMin(() => {}),
  QT = __esmMin(() => {}),
  $T = __esmMin(() => {
    new TextEncoder();
  }),
  eE = __esmMin(() => {
    (WT(), QT(), XT(), YT(), $T(), ZT());
  }),
  tE = __esmMin(() => {}),
  nE = __esmMin(() => {}),
  rE = __esmMin(() => {}),
  iE = __esmMin(() => {
    globalThis.__LIVESTORE_DEVTOOLS_PROTOCOL_VERSION_OVERRIDE__;
  }),
  aE = __esmMin(() => {}),
  oE = __esmMin(() => {}),
  sE = __esmMin(() => {}),
  cE = __esmMin(() => {}),
  lE = __esmMin(() => {}),
  uE = __esmMin(() => {}),
  dE = __esmMin(() => {
    (MT(),
      nE(),
      rE(),
      aT(),
      rE(),
      HT(),
      NT(),
      YT(),
      DT(),
      Qw(),
      ST(),
      aE(),
      oE(),
      sE(),
      cE(),
      IT(),
      VT(),
      lE(),
      MT(),
      IT(),
      UT(),
      eE(),
      NT(),
      iE(),
      uE());
  }),
  fE,
  pE,
  mE,
  hE,
  gE,
  _E,
  vE,
  yE,
  bE,
  xE,
  SE,
  CE,
  wE,
  TE = __esmMin(() => {
    (dE(),
      HT(),
      aT(),
      (fE = TaggedStruct(`SyncMessage.SyncMetadata`, { createdAt: String$ }).annotations({
        title: `@livestore/sync-cf:SyncMetadata`,
      })),
      (pE = Struct({
        cursor: Option(Struct({ backendId: GT, eventSequenceNumber: pT })),
      }).annotations({ title: `@livestore/sync-cf:PullRequest` })),
      (mE = Struct({
        batch: Array$(Struct({ eventEncoded: TT, metadata: Option(fE) })),
        pageInfo: JT,
        backendId: GT,
      }).annotations({ title: `@livestore/sync-cf:PullResponse` })),
      (hE = Struct({ batch: Array$(TT), backendId: Option(GT) }).annotations({
        title: `@livestore/sync-cf:PushRequest`,
      })),
      (gE = Struct({}).annotations({ title: `@livestore/sync-cf:PushAck` })),
      (_E = TaggedStruct(`SyncMessage.Ping`, {}).annotations({ title: `@livestore/sync-cf:Ping` })),
      (vE = TaggedStruct(`SyncMessage.Pong`, {}).annotations({ title: `@livestore/sync-cf:Pong` })),
      (yE = TaggedStruct(`SyncMessage.AdminResetRoomRequest`, { adminSecret: String$ }).annotations(
        { title: `@livestore/sync-cf:AdminResetRoomRequest` },
      )),
      (bE = TaggedStruct(`SyncMessage.AdminResetRoomResponse`, {}).annotations({
        title: `@livestore/sync-cf:AdminResetRoomResponse`,
      })),
      (xE = TaggedStruct(`SyncMessage.AdminInfoRequest`, { adminSecret: String$ }).annotations({
        title: `@livestore/sync-cf:AdminInfoRequest`,
      })),
      (SE = TaggedStruct(`SyncMessage.AdminInfoResponse`, {
        info: Struct({ durableObjectId: String$ }),
      }).annotations({ title: `@livestore/sync-cf:AdminInfoResponse` })),
      (CE = Union(mE, gE, vE, bE, SE)),
      (wE = Union(pE, hE, _E, yE, xE)),
      Union(CE, wE));
  }),
  EE,
  DE = __esmMin(() => {
    (aT(),
      tE(),
      dE(),
      TE(),
      (EE = Struct({
        storeId: String$,
        payload: PS(mC, parseJson(nT)).pipe(UndefinedOr),
        transport: Literal(`http`, `ws`),
      })));
  }),
  matchSyncRequest,
  OE = __esmMin(() => {
    (aT(),
      DE(),
      iS(parseJson(CE)),
      iS(parseJson(wE)),
      (matchSyncRequest = (e) => {
        let t = new URL(e.url),
          n = fromInput(t.searchParams),
          r = schemaStruct(EE)(n).pipe(Gv, ey);
        if (r._tag !== `None`) return r.value;
      }),
      parseJson(
        Struct({
          storeId: String$,
          payload: optional(nT),
          pullRequestIds: Array$(String$),
          headers: optional(Record({ key: String$, value: String$ })),
        }),
      ));
  }),
  kE = __esmMin(() => {}),
  requestHeadersToMap,
  handleSyncRequest,
  AE = __esmMin(() => {
    (dE(),
      aT(),
      (requestHeadersToMap = (e) => {
        let t = new Map();
        return (
          e.headers.forEach((e, n) => {
            t.set(n.toLowerCase(), e);
          }),
          t
        );
      }),
      (handleSyncRequest = ({
        request: e,
        searchParams: { storeId: n, payload: r, transport: i },
        env: a,
        syncBackendBinding: o,
        headers: s,
        validatePayload: c,
        syncPayloadSchema: l,
      }) =>
        Mv(function* () {
          if (c !== void 0) {
            let t = requestHeadersToMap(e);
            if (l !== void 0) {
              let e = decodeUnknownEither(l)(r);
              if (e._tag === `Left`) {
                let t = e.left.toString();
                return (
                  console.error(`Invalid payload (decode failed)`, t),
                  new Response(t, { status: 400, ...(s === void 0 ? {} : { headers: s }) })
                );
              }
              let i = yield* Nv(async () => c(e.right, { storeId: n, headers: t })).pipe(
                kT.mapToUnknownError,
                Kv,
              );
              if (i._tag === `Left`)
                return (
                  console.error(`Invalid payload (validation failed)`, i.left),
                  new Response(i.left.toString(), {
                    status: 400,
                    ...(s === void 0 ? {} : { headers: s }),
                  })
                );
            } else {
              let e = yield* Nv(async () => c(r, { storeId: n, headers: t })).pipe(
                kT.mapToUnknownError,
                Kv,
              );
              if (e._tag === `Left`)
                return (
                  console.error(`Invalid payload (validation failed)`, e.left),
                  new Response(e.left.toString(), {
                    status: 400,
                    ...(s === void 0 ? {} : { headers: s }),
                  })
                );
            }
          }
          let u = a ?? t;
          if (!(o in u))
            return new Response(
              `Failed dependency: Required Durable Object binding '${o}' not available`,
              { status: 424, ...(s === void 0 ? {} : { headers: s }) },
            );
          let d = u[o],
            p = d.idFromName(n),
            m = d.get(p),
            h = e.headers.get(`Upgrade`);
          return i === `ws` && (h === null || h !== `websocket`)
            ? new Response(`Durable Object expected Upgrade: websocket`, {
                status: 426,
                ...(s === void 0 ? {} : { headers: s }),
              })
            : yield* Nv(() => m.fetch(e));
        }).pipe(tapCauseLogPretty, $v)));
  }),
  jE = __esmMin(() => {
    (kE(), OE(), AE());
  });
function typeForRpc(e) {
  switch (typeof e) {
    case `boolean`:
    case `number`:
    case `string`:
      return `primitive`;
    case `undefined`:
      return `undefined`;
    case `object`:
    case `function`:
      break;
    case `bigint`:
      return `bigint`;
    default:
      return `unsupported`;
  }
  if (e === null) return `primitive`;
  let t = Object.getPrototypeOf(e);
  switch (t) {
    case Object.prototype:
      return `object`;
    case Function.prototype:
    case FE.prototype:
      return `function`;
    case Array.prototype:
      return `array`;
    case Date.prototype:
      return `date`;
    case Uint8Array.prototype:
    case IE:
      return `bytes`;
    case WritableStream.prototype:
      return `writable`;
    case ReadableStream.prototype:
      return `readable`;
    case Headers.prototype:
      return `headers`;
    case Request.prototype:
      return `request`;
    case Response.prototype:
      return `response`;
    case Blob.prototype:
      return `blob`;
    case HE.prototype:
      return `stub`;
    case RpcPromise$1.prototype:
      return `rpc-promise`;
    default:
      if (NE) {
        if (t == NE.RpcStub.prototype || e instanceof NE.ServiceStub) return `rpc-target`;
        if (t == NE.RpcPromise.prototype || t == NE.RpcProperty.prototype) return `rpc-thenable`;
      }
      return e instanceof PE ? `rpc-target` : e instanceof Error ? `error` : `unsupported`;
  }
}
function mapNotLoaded() {
  throw Error(`RPC map() implementation was not loaded.`);
}
function streamNotLoaded() {
  throw Error(`Stream implementation was not loaded.`);
}
function withCallInterceptor(e, t) {
  let n = doCall;
  doCall = e;
  try {
    return t();
  } finally {
    doCall = n;
  }
}
function unwrapStubTakingOwnership(e) {
  let { hook: t, pathIfPromise: n } = e[BE];
  return n && n.length > 0 ? t.get(n) : t;
}
function unwrapStubAndDup(e) {
  let { hook: t, pathIfPromise: n } = e[BE];
  return n ? t.get(n) : t.dup();
}
function unwrapStubNoProperties(e) {
  let { hook: t, pathIfPromise: n } = e[BE];
  if (!(n && n.length > 0)) return t;
}
function unwrapStubOrParent(e) {
  return e[BE].hook;
}
function unwrapStubAndPath(e) {
  return e[BE];
}
async function pullPromise(e) {
  let { hook: t, pathIfPromise: n } = e[BE];
  return (n.length > 0 && (t = t.get(n)), (await t.pull()).deliverResolve());
}
function followPath(e, t, n, r) {
  for (let i = 0; i < n.length; i++) {
    t = e;
    let a = n[i];
    if (a in Object.prototype) {
      e = void 0;
      continue;
    }
    switch (typeForRpc(e)) {
      case `object`:
      case `function`:
        e = Object.hasOwn(e, a) ? e[a] : void 0;
        break;
      case `array`:
        e = Number.isInteger(a) && a >= 0 ? e[a] : void 0;
        break;
      case `rpc-target`:
      case `rpc-thenable`:
        if (Object.hasOwn(e, a))
          throw TypeError(
            `Attempted to access property '${a}', which is an instance property of the RpcTarget. To avoid leaking private internals, instance properties cannot be accessed over RPC. If you want to make this property available over RPC, define it as a method or getter on the class, instead of an instance property.`,
          );
        ((e = e[a]), (r = null));
        break;
      case `stub`:
      case `rpc-promise`: {
        let { hook: t, pathIfPromise: r } = unwrapStubAndPath(e);
        return { hook: t, remainingPath: r ? r.concat(n.slice(i)) : n.slice(i) };
      }
      case `writable`:
        e = void 0;
        break;
      case `readable`:
        e = void 0;
        break;
      case `primitive`:
      case `bigint`:
      case `bytes`:
      case `blob`:
      case `date`:
      case `error`:
      case `headers`:
      case `request`:
      case `response`:
        e = void 0;
        break;
      case `undefined`:
        e = e[a];
        break;
      case `unsupported`:
        if (i === 0) throw TypeError(`RPC stub points at a non-serializable type.`);
        {
          let e = n.slice(0, i).join(`.`),
            t = n.slice(0, i).join(`.`);
          throw TypeError(
            `'${e}' is not a serializable type, so property ${t} cannot be accessed.`,
          );
        }
      default:
        throw TypeError(`unreachable`);
    }
  }
  if (e instanceof RpcPromise$1) {
    let { hook: t, pathIfPromise: n } = unwrapStubAndPath(e);
    return { hook: t, remainingPath: n || [] };
  }
  return { value: e, parent: t, owner: r };
}
function disposeRpcTarget(e) {
  if (Symbol.dispose in e)
    try {
      e[Symbol.dispose]();
    } catch (e) {
      Promise.reject(e);
    }
}
async function streamToBlob(e, t) {
  let n = await new Response(e).blob();
  return n.type === t ? n : n.slice(0, n.size, t);
}
function fixBrokenRequestBody(e, t) {
  return new RpcPromise$1(
    new KE(
      new Response(t).arrayBuffer().then((t) => {
        let n = new Uint8Array(t),
          r = new Request(e, { body: n });
        return new WE(UE.fromAppReturn(r));
      }),
    ),
    [],
  );
}
function streamToBlobPromise(e, t) {
  return new RpcPromise$1(new KE(streamToBlob(e, t).then((e) => new WE(UE.fromAppReturn(e)))), []);
}
function estimateStringSize(e) {
  return 2 + e.length * 3;
}
function estimateEncodedSize(e, t, n = 0) {
  if (n >= tD) return $E;
  switch (typeof e) {
    case `string`:
      return estimateStringSize(e);
    case `number`:
      return 16;
    case `bigint`:
      return 16;
    case `boolean`:
      return 8;
    case `undefined`:
      return 16;
    case `object`: {
      if (e === null) return 8;
      if (ArrayBuffer.isView(e) || e instanceof ArrayBuffer) return eD + e.byteLength;
      if (typeof Blob < `u` && e instanceof Blob) return eD + e.size;
      if (e instanceof Date) return 16;
      if (((t ??= new WeakSet()), t.has(e))) return $E;
      if ((t.add(e), e instanceof Array)) {
        let r = QE;
        for (let i of e) r += $E + estimateEncodedSize(i, t, n + 1);
        return r;
      }
      if (e instanceof Error) {
        let r =
          QE +
          estimateStringSize(e.name) +
          estimateStringSize(e.message) +
          estimateStringSize(e.stack ?? ``);
        for (let i of Object.keys(e))
          r += $E + estimateStringSize(i) + estimateEncodedSize(e[i], t, n + 1);
        return r;
      }
      let r = QE;
      for (let i of Object.keys(e))
        r += $E + estimateStringSize(i) + estimateEncodedSize(e[i], t, n + 1);
      return r;
    }
    default:
      return 16;
  }
}
function newWebSocketRpcSession$1(e, t, n) {
  return (
    typeof e == `string` && (e = new WebSocket(e)),
    new RpcSession$1(new WebSocketTransport(e), t, n).getRemoteMain()
  );
}
function newWorkersWebSocketRpcResponse(e, t, n) {
  if (e.headers.get(`Upgrade`)?.toLowerCase() !== `websocket`)
    return new Response(`This endpoint only accepts WebSocket requests.`, { status: 400 });
  let r = new WebSocketPair(),
    i = r[0];
  return (
    i.accept(),
    newWebSocketRpcSession$1(i, t, n),
    new Response(null, { status: 101, webSocket: r[1] })
  );
}
async function newHttpBatchRpcResponse(e, t, n) {
  if (e.method !== `POST`)
    return new Response(`This endpoint only accepts POST requests.`, { status: 405 });
  let r = await e.text(),
    i = new BatchServerTransport(
      r === ``
        ? []
        : r.split(`
`),
    ),
    a = new RpcSession$1(i, t, n);
  return (await i.whenAllReceived(), await a.drain(), new Response(i.getResponseBody()));
}
function throwMapperBuilderUseError() {
  throw Error(
    `Attempted to use an abstract placeholder from a mapper function. Please make sure your map function has no side effects.`,
  );
}
function applyMapToElement(e, t, n, r, i) {
  let a = new MapApplicator(r, new WE(UE.deepCopyFrom(e, t, n)));
  try {
    return a.apply(i);
  } finally {
    a.dispose();
  }
}
function createWritableStreamFromHook(e) {
  let t,
    n = !1,
    r = new FlowController(() => performance.now()),
    i,
    a,
    disposeHook = () => {
      n || ((n = !0), e.dispose());
    };
  return new WritableStream({
    write(n, o) {
      if (t !== void 0) throw t;
      let s = UE.fromAppParams([n]),
        { promise: c, size: l } = e.stream([`write`], s);
      if (l === void 0)
        return c.catch((e) => {
          throw (t === void 0 && (t = e), e);
        });
      {
        let { token: e, shouldBlock: n } = r.onSend(l);
        if (
          (c.then(
            () => {
              r.onAck(e) && i && (i(), (i = void 0), (a = void 0));
            },
            (n) => {
              (r.onError(e),
                t === void 0 && ((t = n), o.error(n), disposeHook()),
                (a &&= (a(n), (i = void 0), void 0)));
            },
          ),
          n)
        )
          return new Promise((e, t) => {
            ((i = e), (a = t));
          });
      }
    },
    async close() {
      if (t !== void 0) throw (disposeHook(), t);
      let { promise: n } = e.stream([`close`], UE.fromAppParams([]));
      try {
        await n;
      } catch (e) {
        throw t ?? e;
      } finally {
        disposeHook();
      }
    },
    abort(n) {
      if (t !== void 0) return;
      ((t = n ?? Error(`WritableStream was aborted`)), (a &&= (a(t), (i = void 0), void 0)));
      let { promise: r } = e.stream([`abort`], UE.fromAppParams([n]));
      r.then(
        () => disposeHook(),
        () => disposeHook(),
      );
    },
  });
}
async function newWorkersRpcResponse(e, t, n) {
  if (e.method === `POST`) {
    let r = await newHttpBatchRpcResponse(e, t, n);
    return (r.headers.set(`Access-Control-Allow-Origin`, `*`), r);
  } else if (e.headers.get(`Upgrade`)?.toLowerCase() === `websocket`)
    return newWorkersWebSocketRpcResponse(e, t, n);
  else
    return new Response(`This endpoint only accepts POST or WebSocket requests.`, { status: 400 });
}
var ME,
  NE,
  PE,
  FE,
  IE,
  LE,
  RE,
  StubHook,
  ErrorStubHook,
  zE,
  doCall,
  BE,
  VE,
  HE,
  RpcPromise$1,
  UE,
  ValueStubHook,
  WE,
  GE,
  KE,
  qE,
  NullExporter,
  JE,
  YE,
  XE,
  NullImporter,
  ZE,
  QE,
  $E,
  eD,
  tD,
  ImportTableEntry,
  nD,
  RpcMainHook,
  RpcSessionImpl,
  RpcSession$1,
  WebSocketTransport,
  BatchServerTransport,
  rD,
  MapBuilder,
  MapVariableHook,
  MapApplicator,
  iD,
  aD,
  oD,
  sD,
  cD,
  lD,
  uD,
  dD,
  FlowController,
  fD,
  pD,
  mD = __esmMin(() => {
    ((ME = Symbol(`workers-module`)),
      (globalThis[ME] = e),
      Symbol.dispose || (Symbol.dispose = Symbol.for(`dispose`)),
      Symbol.asyncDispose || (Symbol.asyncDispose = Symbol.for(`asyncDispose`)),
      Promise.withResolvers ||
        (Promise.withResolvers = function () {
          let e, t;
          return {
            promise: new Promise((n, r) => {
              ((e = n), (t = r));
            }),
            resolve: e,
            reject: t,
          };
        }),
      (NE = globalThis[ME]),
      (PE = NE ? NE.RpcTarget : class {}),
      (FE = async function () {}.constructor),
      (IE = typeof Buffer < `u` ? Buffer.prototype : void 0),
      (LE = { applyMap: mapNotLoaded, sendMap: mapNotLoaded }),
      (RE = {
        createWritableStreamHook: streamNotLoaded,
        createWritableStreamFromHook: streamNotLoaded,
        createReadableStreamHook: streamNotLoaded,
      }),
      (StubHook = class {
        stream(e, t) {
          let n = this.call(e, t).pull(),
            r;
          return (
            n instanceof Promise
              ? (r = n.then((e) => {
                  e.dispose();
                }))
              : (n.dispose(), (r = Promise.resolve())),
            { promise: r }
          );
        }
      }),
      (ErrorStubHook = class extends StubHook {
        error;
        constructor(e) {
          (super(), (this.error = e));
        }
        call(e, t) {
          return this;
        }
        map(e, t, n) {
          return this;
        }
        get(e) {
          return this;
        }
        dup() {
          return this;
        }
        pull() {
          return Promise.reject(this.error);
        }
        ignoreUnhandledRejections() {}
        dispose() {}
        onBroken(e) {
          try {
            e(this.error);
          } catch (e) {
            Promise.resolve(e);
          }
        }
      }),
      (zE = new ErrorStubHook(Error(`Attempted to use RPC stub after it has been disposed.`))),
      (doCall = (e, t, n) => e.call(t, n)),
      (BE = Symbol(`realStub`)),
      (VE = {
        apply(e, t, n) {
          let r = e.raw;
          return new RpcPromise$1(doCall(r.hook, r.pathIfPromise || [], UE.fromAppParams(n)), []);
        },
        get(e, t, n) {
          let r = e.raw;
          if (t === BE) return r;
          if (t in RpcPromise$1.prototype) return r[t];
          if (typeof t == `string`)
            return new RpcPromise$1(r.hook, r.pathIfPromise ? [...r.pathIfPromise, t] : [t]);
          if (t === Symbol.dispose && (!r.pathIfPromise || r.pathIfPromise.length == 0))
            return () => {
              (r.hook.dispose(), (r.hook = zE));
            };
        },
        has(e, t) {
          let n = e.raw;
          return t === BE
            ? !0
            : t in RpcPromise$1.prototype
              ? t in n
              : typeof t == `string` ||
                (t === Symbol.dispose && (!n.pathIfPromise || n.pathIfPromise.length == 0));
        },
        construct(e, t) {
          throw Error(`An RPC stub cannot be used as a constructor.`);
        },
        defineProperty(e, t, n) {
          throw Error(`Can't define properties on RPC stubs.`);
        },
        deleteProperty(e, t) {
          throw Error(`Can't delete properties on RPC stubs.`);
        },
        getOwnPropertyDescriptor(e, t) {},
        getPrototypeOf(e) {
          return Object.getPrototypeOf(e.raw);
        },
        isExtensible(e) {
          return !1;
        },
        ownKeys(e) {
          return [];
        },
        preventExtensions(e) {
          return !0;
        },
        set(e, t, n, r) {
          throw Error(`Can't assign properties on RPC stubs.`);
        },
        setPrototypeOf(e, t) {
          throw Error(`Can't override prototype of RPC stubs.`);
        },
      }),
      (HE = class RpcStub$1 extends PE {
        constructor(e, t) {
          if ((super(), !(e instanceof StubHook))) {
            let n = e;
            if (
              ((e =
                n instanceof PE || n instanceof Function
                  ? GE.create(n, void 0)
                  : new WE(UE.fromAppReturn(n))),
              t)
            )
              throw TypeError(`RpcStub constructor expected one argument, received two.`);
          }
          ((this.hook = e), (this.pathIfPromise = t));
          let func = () => {};
          return ((func.raw = this), new Proxy(func, VE));
        }
        hook;
        pathIfPromise;
        dup() {
          let e = this[BE];
          return e.pathIfPromise
            ? new RpcStub$1(e.hook.get(e.pathIfPromise))
            : new RpcStub$1(e.hook.dup());
        }
        onRpcBroken(e) {
          this[BE].hook.onBroken(e);
        }
        map(e) {
          let { hook: t, pathIfPromise: n } = this[BE];
          return LE.sendMap(t, n || [], e);
        }
        toString() {
          return `[object RpcStub]`;
        }
      }),
      (RpcPromise$1 = class extends HE {
        constructor(e, t) {
          super(e, t);
        }
        then(e, t) {
          return pullPromise(this).then(...arguments);
        }
        catch(e) {
          return pullPromise(this).catch(...arguments);
        }
        finally(e) {
          return pullPromise(this).finally(...arguments);
        }
        toString() {
          return `[object RpcPromise]`;
        }
      }),
      (UE = class RpcPayload {
        value;
        source;
        hooks;
        promises;
        static fromAppParams(e) {
          return new RpcPayload(e, `params`);
        }
        static fromAppReturn(e) {
          return new RpcPayload(e, `return`);
        }
        static fromArray(e) {
          let t = [],
            n = [],
            r = [];
          for (let i of e) {
            i.ensureDeepCopied();
            for (let e of i.hooks) t.push(e);
            for (let e of i.promises)
              (e.parent === i && (e = { parent: r, property: r.length, promise: e.promise }),
                n.push(e));
            r.push(i.value);
          }
          return new RpcPayload(r, `owned`, t, n);
        }
        static forEvaluate(e, t) {
          return new RpcPayload(null, `owned`, e, t);
        }
        static deepCopyFrom(e, t, n) {
          let r = new RpcPayload(null, `owned`, [], []);
          return ((r.value = r.deepCopy(e, t, `value`, r, !0, n)), r);
        }
        constructor(e, t, n, r) {
          ((this.value = e), (this.source = t), (this.hooks = n), (this.promises = r));
        }
        rpcTargets;
        getHookForRpcTarget(e, t, n = !0) {
          if (this.source === `params`) {
            if (n) {
              let t = e;
              typeof t.dup == `function` && (e = t.dup());
            }
            return GE.create(e, t);
          } else if (this.source === `return`) {
            let r = this.rpcTargets?.get(e);
            return r
              ? n
                ? r.dup()
                : (this.rpcTargets?.delete(e), r)
              : ((r = GE.create(e, t)),
                n ? ((this.rpcTargets ||= new Map()), this.rpcTargets.set(e, r), r.dup()) : r);
          } else throw Error(`owned payload shouldn't contain raw RpcTargets`);
        }
        getHookForWritableStream(e, t, n = !0) {
          if (this.source === `params`) return RE.createWritableStreamHook(e);
          if (this.source === `return`) {
            let t = this.rpcTargets?.get(e);
            return t
              ? n
                ? t.dup()
                : (this.rpcTargets?.delete(e), t)
              : ((t = RE.createWritableStreamHook(e)),
                n ? ((this.rpcTargets ||= new Map()), this.rpcTargets.set(e, t), t.dup()) : t);
          } else throw Error(`owned payload shouldn't contain raw WritableStreams`);
        }
        getHookForReadableStream(e, t, n = !0) {
          if (this.source === `params`) return RE.createReadableStreamHook(e);
          if (this.source === `return`) {
            let t = this.rpcTargets?.get(e);
            return t
              ? n
                ? t.dup()
                : (this.rpcTargets?.delete(e), t)
              : ((t = RE.createReadableStreamHook(e)),
                n ? ((this.rpcTargets ||= new Map()), this.rpcTargets.set(e, t), t.dup()) : t);
          } else throw Error(`owned payload shouldn't contain raw ReadableStreams`);
        }
        deepCopy(e, t, n, r, i, a) {
          switch (typeForRpc(e)) {
            case `unsupported`:
              return e;
            case `primitive`:
            case `bigint`:
            case `date`:
            case `bytes`:
            case `blob`:
            case `error`:
            case `undefined`:
              return e;
            case `array`: {
              let t = e,
                n = t.length,
                r = Array(n);
              for (let e = 0; e < n; e++) r[e] = this.deepCopy(t[e], t, e, r, i, a);
              return r;
            }
            case `object`: {
              let t = {},
                n = e;
              for (let e in n) t[e] = this.deepCopy(n[e], n, e, t, i, a);
              return t;
            }
            case `stub`:
            case `rpc-promise`: {
              let t = e,
                a;
              if (
                ((a = i ? unwrapStubAndDup(t) : unwrapStubTakingOwnership(t)),
                t instanceof RpcPromise$1)
              ) {
                let e = new RpcPromise$1(a, []);
                return (this.promises.push({ parent: r, property: n, promise: e }), e);
              } else return (this.hooks.push(a), new HE(a));
            }
            case `function`:
            case `rpc-target`: {
              let n = e,
                r;
              return (
                (r = a ? a.getHookForRpcTarget(n, t, i) : GE.create(n, t)),
                this.hooks.push(r),
                new HE(r)
              );
            }
            case `rpc-thenable`: {
              let o = e,
                s;
              return (
                (s = a
                  ? new RpcPromise$1(a.getHookForRpcTarget(o, t, i), [])
                  : new RpcPromise$1(GE.create(o, t), [])),
                this.promises.push({ parent: r, property: n, promise: s }),
                s
              );
            }
            case `writable`: {
              let n = e,
                r;
              return (
                (r = a ? a.getHookForWritableStream(n, t, i) : RE.createWritableStreamHook(n)),
                this.hooks.push(r),
                n
              );
            }
            case `readable`: {
              let n = e,
                r;
              return (
                (r = a ? a.getHookForReadableStream(n, t, i) : RE.createReadableStreamHook(n)),
                this.hooks.push(r),
                n
              );
            }
            case `headers`:
              return new Headers(e);
            case `request`: {
              let t = e;
              return (t.body && this.deepCopy(t.body, t, `body`, t, i, a), new Request(t));
            }
            case `response`: {
              let t = e;
              return (t.body && this.deepCopy(t.body, t, `body`, t, i, a), new Response(t.body, t));
            }
            default:
              throw Error(`unreachable`);
          }
        }
        ensureDeepCopied() {
          if (this.source !== `owned`) {
            let e = this.source === `params`;
            ((this.hooks = []), (this.promises = []));
            try {
              this.value = this.deepCopy(this.value, void 0, `value`, this, e, this);
            } catch (e) {
              throw ((this.hooks = void 0), (this.promises = void 0), e);
            }
            if (((this.source = `owned`), this.rpcTargets && this.rpcTargets.size > 0))
              throw Error(`Not all rpcTargets were accounted for in deep-copy?`);
            this.rpcTargets = void 0;
          }
        }
        deliverTo(e, t, n) {
          if ((this.ensureDeepCopied(), this.value instanceof RpcPromise$1))
            RpcPayload.deliverRpcPromiseTo(this.value, e, t, n);
          else {
            e[t] = this.value;
            for (let e of this.promises)
              RpcPayload.deliverRpcPromiseTo(e.promise, e.parent, e.property, n);
          }
        }
        static deliverRpcPromiseTo(e, t, n, r) {
          let i = unwrapStubNoProperties(e);
          if (!i) throw Error(`property promises should have been resolved earlier`);
          let a = i.pull();
          a instanceof RpcPayload
            ? a.deliverTo(t, n, r)
            : r.push(
                a.then((e) => {
                  let r = [];
                  if ((e.deliverTo(t, n, r), r.length > 0)) return Promise.all(r);
                }),
              );
        }
        async deliverCall(e, t) {
          try {
            let n = [];
            (this.deliverTo(this, `value`, n), n.length > 0 && (await Promise.all(n)));
            let r = Function.prototype.apply.call(e, t, this.value);
            return r instanceof RpcPromise$1
              ? RpcPayload.fromAppReturn(r)
              : RpcPayload.fromAppReturn(await r);
          } finally {
            this.dispose();
          }
        }
        async deliverResolve() {
          try {
            let e = [];
            (this.deliverTo(this, `value`, e), e.length > 0 && (await Promise.all(e)));
            let t = this.value;
            return (
              t instanceof Object &&
                (Symbol.dispose in t ||
                  Object.defineProperty(t, Symbol.dispose, {
                    value: () => this.dispose(),
                    writable: !0,
                    enumerable: !1,
                    configurable: !0,
                  })),
              t
            );
          } catch (e) {
            throw (this.dispose(), e);
          }
        }
        dispose() {
          if (this.source === `owned`)
            (this.hooks.forEach((e) => e.dispose()),
              this.promises.forEach((e) => e.promise[Symbol.dispose]()));
          else if (
            this.source === `return` &&
            (this.disposeImpl(this.value, void 0), this.rpcTargets && this.rpcTargets.size > 0)
          )
            throw Error(`Not all rpcTargets were accounted for in disposeImpl()?`);
          ((this.source = `owned`), (this.hooks = []), (this.promises = []));
        }
        disposeImpl(e, t) {
          switch (typeForRpc(e)) {
            case `unsupported`:
            case `primitive`:
            case `bigint`:
            case `bytes`:
            case `blob`:
            case `date`:
            case `error`:
            case `undefined`:
              return;
            case `array`: {
              let t = e,
                n = t.length;
              for (let e = 0; e < n; e++) this.disposeImpl(t[e], t);
              return;
            }
            case `object`: {
              let t = e;
              for (let e in t) this.disposeImpl(t[e], t);
              return;
            }
            case `stub`:
            case `rpc-promise`: {
              let t = unwrapStubNoProperties(e);
              t && t.dispose();
              return;
            }
            case `function`:
            case `rpc-target`: {
              let t = e,
                n = this.rpcTargets?.get(t);
              n ? (n.dispose(), this.rpcTargets.delete(t)) : disposeRpcTarget(t);
              return;
            }
            case `rpc-thenable`:
              return;
            case `headers`:
              return;
            case `request`: {
              let t = e;
              t.body && this.disposeImpl(t.body, t);
              return;
            }
            case `response`: {
              let t = e;
              t.body && this.disposeImpl(t.body, t);
              return;
            }
            case `writable`: {
              let t = e,
                n = this.rpcTargets?.get(t);
              (n ? this.rpcTargets.delete(t) : (n = RE.createWritableStreamHook(t)), n.dispose());
              return;
            }
            case `readable`: {
              let t = e,
                n = this.rpcTargets?.get(t);
              (n ? this.rpcTargets.delete(t) : (n = RE.createReadableStreamHook(t)), n.dispose());
              return;
            }
            default:
              return;
          }
        }
        ignoreUnhandledRejections() {
          this.hooks
            ? (this.hooks.forEach((e) => {
                e.ignoreUnhandledRejections();
              }),
              this.promises.forEach((e) =>
                unwrapStubOrParent(e.promise).ignoreUnhandledRejections(),
              ))
            : this.ignoreUnhandledRejectionsImpl(this.value);
        }
        ignoreUnhandledRejectionsImpl(e) {
          switch (typeForRpc(e)) {
            case `unsupported`:
            case `primitive`:
            case `bigint`:
            case `bytes`:
            case `blob`:
            case `date`:
            case `error`:
            case `undefined`:
            case `function`:
            case `rpc-target`:
            case `writable`:
            case `readable`:
            case `headers`:
            case `request`:
            case `response`:
              return;
            case `array`: {
              let t = e,
                n = t.length;
              for (let e = 0; e < n; e++) this.ignoreUnhandledRejectionsImpl(t[e]);
              return;
            }
            case `object`: {
              let t = e;
              for (let e in t) this.ignoreUnhandledRejectionsImpl(t[e]);
              return;
            }
            case `stub`:
            case `rpc-promise`:
              unwrapStubOrParent(e).ignoreUnhandledRejections();
              return;
            case `rpc-thenable`:
              e.then(
                (e) => {},
                (e) => {},
              );
              return;
            default:
              return;
          }
        }
      }),
      (ValueStubHook = class extends StubHook {
        call(e, t) {
          try {
            let { value: n, owner: r } = this.getValue(),
              i = followPath(n, void 0, e, r);
            if (i.hook) return i.hook.call(i.remainingPath, t);
            if (typeof i.value != `function`)
              throw TypeError(`'${e.join(`.`)}' is not a function.`);
            return new KE(t.deliverCall(i.value, i.parent).then((e) => new WE(e)));
          } catch (e) {
            return new ErrorStubHook(e);
          }
        }
        map(e, t, n) {
          try {
            let r;
            try {
              let { value: t, owner: n } = this.getValue();
              r = followPath(t, void 0, e, n);
            } catch (e) {
              for (let e of t) e.dispose();
              throw e;
            }
            return r.hook
              ? r.hook.map(r.remainingPath, t, n)
              : LE.applyMap(r.value, r.parent, r.owner, t, n);
          } catch (e) {
            return new ErrorStubHook(e);
          }
        }
        get(e) {
          try {
            let { value: t, owner: n } = this.getValue();
            if (e.length === 0 && n === null)
              throw Error(`Can't dup an RpcTarget stub as a promise.`);
            let r = followPath(t, void 0, e, n);
            return r.hook
              ? r.hook.get(r.remainingPath)
              : new WE(UE.deepCopyFrom(r.value, r.parent, r.owner));
          } catch (e) {
            return new ErrorStubHook(e);
          }
        }
      }),
      (WE = class PayloadStubHook extends ValueStubHook {
        constructor(e) {
          (super(), (this.payload = e));
        }
        payload;
        getPayload() {
          if (this.payload) return this.payload;
          throw Error(`Attempted to use an RPC StubHook after it was disposed.`);
        }
        getValue() {
          let e = this.getPayload();
          return { value: e.value, owner: e };
        }
        dup() {
          let e = this.getPayload();
          return new PayloadStubHook(UE.deepCopyFrom(e.value, void 0, e));
        }
        pull() {
          return this.getPayload();
        }
        ignoreUnhandledRejections() {
          this.payload && this.payload.ignoreUnhandledRejections();
        }
        dispose() {
          this.payload &&= (this.payload.dispose(), void 0);
        }
        onBroken(e) {
          this.payload && this.payload.value instanceof HE && this.payload.value.onRpcBroken(e);
        }
      }),
      (GE = class TargetStubHook extends ValueStubHook {
        static create(e, t) {
          return (typeof e != `function` && (t = void 0), new TargetStubHook(e, t));
        }
        constructor(e, t, n) {
          (super(),
            (this.target = e),
            (this.parent = t),
            n
              ? n.refcount && ((this.refcount = n.refcount), ++this.refcount.count)
              : Symbol.dispose in e && (this.refcount = { count: 1 }));
        }
        target;
        parent;
        refcount;
        getTarget() {
          if (this.target) return this.target;
          throw Error(`Attempted to use an RPC StubHook after it was disposed.`);
        }
        getValue() {
          return { value: this.getTarget(), owner: null };
        }
        dup() {
          return new TargetStubHook(this.getTarget(), this.parent, this);
        }
        pull() {
          let e = this.getTarget();
          return `then` in e
            ? Promise.resolve(e).then((e) => UE.fromAppReturn(e))
            : Promise.reject(Error(`Tried to resolve a non-promise stub.`));
        }
        ignoreUnhandledRejections() {}
        dispose() {
          this.target &&=
            (this.refcount && --this.refcount.count == 0 && disposeRpcTarget(this.target), void 0);
        }
        onBroken(e) {}
      }),
      (KE = class PromiseStubHook extends StubHook {
        promise;
        resolution;
        constructor(e) {
          (super(), (this.promise = e.then((e) => ((this.resolution = e), e))));
        }
        call(e, t) {
          return (
            t.ensureDeepCopied(), new PromiseStubHook(this.promise.then((n) => n.call(e, t)))
          );
        }
        stream(e, t) {
          return (
            t.ensureDeepCopied(), { promise: this.promise.then((n) => n.stream(e, t).promise) }
          );
        }
        map(e, t, n) {
          return new PromiseStubHook(
            this.promise.then(
              (r) => r.map(e, t, n),
              (e) => {
                for (let e of t) e.dispose();
                throw e;
              },
            ),
          );
        }
        get(e) {
          return new PromiseStubHook(this.promise.then((t) => t.get(e)));
        }
        dup() {
          return this.resolution
            ? this.resolution.dup()
            : new PromiseStubHook(this.promise.then((e) => e.dup()));
        }
        pull() {
          return this.resolution ? this.resolution.pull() : this.promise.then((e) => e.pull());
        }
        ignoreUnhandledRejections() {
          this.resolution
            ? this.resolution.ignoreUnhandledRejections()
            : this.promise.then(
                (e) => {
                  e.ignoreUnhandledRejections();
                },
                (e) => {},
              );
        }
        dispose() {
          this.resolution
            ? this.resolution.dispose()
            : this.promise.then(
                (e) => {
                  e.dispose();
                },
                (e) => {},
              );
        }
        onBroken(e) {
          this.resolution
            ? this.resolution.onBroken(e)
            : this.promise.then((t) => {
                t.onBroken(e);
              }, e);
        }
      }),
      (qE = { maxBigIntDigits: 16384, maxDepth: 256, maxMessageSize: 32 * 1024 * 1024 }),
      (NullExporter = class {
        exportStub(e) {
          throw Error(`Cannot serialize RPC stubs without an RPC session.`);
        }
        exportPromise(e) {
          throw Error(`Cannot serialize RPC stubs without an RPC session.`);
        }
        getImport(e) {}
        unexport(e) {}
        createPipe(e) {
          throw Error(`Cannot create pipes without an RPC session.`);
        }
        onSendError(e) {}
      }),
      (JE = new NullExporter()),
      (YE = Object.assign(Object.create(null), {
        Error,
        EvalError,
        RangeError,
        ReferenceError,
        SyntaxError,
        TypeError,
        URIError,
        AggregateError,
      })),
      (XE = class Devaluator {
        exporter;
        source;
        encodingLevel;
        constructor(e, t, n) {
          ((this.exporter = e), (this.source = t), (this.encodingLevel = n));
        }
        static devaluate(e, t, n = JE, r, i = `string`) {
          let a = new Devaluator(n, r, i);
          try {
            return a.devaluateImpl(e, t, 0);
          } catch (e) {
            if (a.exports)
              try {
                n.unexport(a.exports);
              } catch {}
            throw e;
          }
        }
        exports;
        devaluateImpl(e, t, n) {
          if (n >= 256)
            throw Error(
              `Serialization exceeded maximum allowed depth. (Does the message contain cycles?)`,
            );
          switch (typeForRpc(e)) {
            case `unsupported`: {
              let t;
              try {
                t = `Cannot serialize value: ${e}`;
              } catch {
                t = `Cannot serialize value: (couldn't stringify value)`;
              }
              throw TypeError(t);
            }
            case `primitive`:
              return typeof e == `number` && !isFinite(e)
                ? this.encodingLevel === `structuredClonable`
                  ? e
                  : e === 1 / 0
                    ? [`inf`]
                    : e === -1 / 0
                      ? [`-inf`]
                      : [`nan`]
                : e;
            case `object`: {
              let t = e,
                r = {};
              for (let e in t) r[e] = this.devaluateImpl(t[e], t, n + 1);
              return r;
            }
            case `array`: {
              let t = e,
                r = t.length,
                i = Array(r);
              for (let e = 0; e < r; e++) i[e] = this.devaluateImpl(t[e], t, n + 1);
              return [i];
            }
            case `bigint`:
              return this.encodingLevel === `structuredClonable` ? e : [`bigint`, e.toString()];
            case `date`: {
              if (this.encodingLevel === `structuredClonable`) return e;
              let t = e.getTime();
              return [`date`, Number.isNaN(t) ? null : t];
            }
            case `bytes`: {
              let t = e;
              if (
                this.encodingLevel === `structuredClonable` ||
                this.encodingLevel === `jsonCompatibleWithBytes`
              )
                return [`bytes`, t];
              if (t.toBase64) return [`bytes`, t.toBase64({ omitPadding: !0 })];
              let n;
              if (typeof Buffer < `u`)
                n = (
                  t instanceof Buffer ? t : Buffer.from(t.buffer, t.byteOffset, t.byteLength)
                ).toString(`base64`);
              else {
                let e = ``;
                for (let n = 0; n < t.length; n++) e += String.fromCharCode(t[n]);
                n = btoa(e);
              }
              return [`bytes`, n.replace(/=+$/, ``)];
            }
            case `headers`:
              return [`headers`, [...e]];
            case `request`: {
              let t = e,
                r = {};
              t.method !== `GET` && (r.method = t.method);
              let i = [...t.headers];
              if ((i.length > 0 && (r.headers = i), t.body))
                ((r.body = this.devaluateImpl(t.body, t, n + 1)), (r.duplex = t.duplex || `half`));
              else if (
                t.body === void 0 &&
                ![`GET`, `HEAD`, `OPTIONS`, `TRACE`, `DELETE`].includes(t.method)
              ) {
                let e = t.arrayBuffer(),
                  n = new ReadableStream({
                    async start(t) {
                      try {
                        (t.enqueue(new Uint8Array(await e)), t.close());
                      } catch (e) {
                        t.error(e);
                      }
                    },
                  }),
                  i = RE.createReadableStreamHook(n);
                ((r.body = [`readable`, this.exporter.createPipe(n, i)]),
                  (r.duplex = t.duplex || `half`));
              }
              (t.cache && t.cache !== "default" && (r.cache = t.cache),
                t.redirect !== `follow` && (r.redirect = t.redirect),
                t.integrity && (r.integrity = t.integrity),
                t.mode && t.mode !== `cors` && (r.mode = t.mode),
                t.credentials && t.credentials !== `same-origin` && (r.credentials = t.credentials),
                t.referrer && t.referrer !== `about:client` && (r.referrer = t.referrer),
                t.referrerPolicy && (r.referrerPolicy = t.referrerPolicy),
                t.keepalive && (r.keepalive = t.keepalive));
              let a = t;
              return (
                a.cf && (r.cf = a.cf),
                a.encodeResponseBody &&
                  a.encodeResponseBody !== `automatic` &&
                  (r.encodeResponseBody = a.encodeResponseBody),
                [`request`, t.url, r]
              );
            }
            case `response`: {
              let t = e,
                r = this.devaluateImpl(t.body, t, n + 1),
                i = {};
              (t.status !== 200 && (i.status = t.status),
                t.statusText && (i.statusText = t.statusText));
              let a = [...t.headers];
              a.length > 0 && (i.headers = a);
              let o = t;
              if (
                (o.cf && (i.cf = o.cf),
                o.encodeBody && o.encodeBody !== `automatic` && (i.encodeBody = o.encodeBody),
                o.webSocket)
              )
                throw TypeError(`Can't serialize a Response containing a webSocket.`);
              return [`response`, r, i];
            }
            case `blob`: {
              let t = e,
                n = t.stream(),
                r = RE.createReadableStreamHook(n),
                i = this.exporter.createPipe(n, r);
              return [`blob`, t.type, [`readable`, i]];
            }
            case `error`: {
              let t = e,
                r = this.exporter.onSendError(t);
              r && (t = r);
              let i = t,
                a,
                captureProp = (e, r) => {
                  let i = this.exports?.length ?? 0;
                  try {
                    let i = this.devaluateImpl(r, t, n + 1);
                    ((a ||= {}), (a[e] = i));
                  } catch {
                    if (this.exports && this.exports.length > i) {
                      let e = this.exports.splice(i);
                      try {
                        this.exporter.unexport(e);
                      } catch {}
                    }
                  }
                };
              for (let e of Object.keys(t))
                e === `name` || e === `message` || e === `stack` || captureProp(e, i[e]);
              (`cause` in t && captureProp(`cause`, i.cause),
                t instanceof AggregateError && captureProp(`errors`, t.errors));
              let o = [`error`, t.name, t.message];
              return (
                a
                  ? (o.push(r && r.stack ? r.stack : null), o.push(a))
                  : r && r.stack && o.push(r.stack),
                o
              );
            }
            case `undefined`:
              return this.encodingLevel === `structuredClonable` ? void 0 : [`undefined`];
            case `stub`:
            case `rpc-promise`: {
              if (!this.source) throw Error(`Can't serialize RPC stubs in this context.`);
              let { hook: t, pathIfPromise: n } = unwrapStubAndPath(e),
                r = this.exporter.getImport(t);
              return r === void 0
                ? ((t = n ? t.get(n) : t.dup()), this.devaluateHook(n ? `promise` : `export`, t))
                : n
                  ? n.length > 0
                    ? [`pipeline`, r, n]
                    : [`pipeline`, r]
                  : [`import`, r];
            }
            case `function`:
            case `rpc-target`: {
              if (!this.source) throw Error(`Can't serialize RPC stubs in this context.`);
              let n = this.source.getHookForRpcTarget(e, t);
              return this.devaluateHook(`export`, n);
            }
            case `rpc-thenable`: {
              if (!this.source) throw Error(`Can't serialize RPC stubs in this context.`);
              let n = this.source.getHookForRpcTarget(e, t);
              return this.devaluateHook(`promise`, n);
            }
            case `writable`: {
              if (!this.source) throw Error(`Can't serialize WritableStream in this context.`);
              let n = this.source.getHookForWritableStream(e, t);
              return this.devaluateHook(`writable`, n);
            }
            case `readable`: {
              if (!this.source) throw Error(`Can't serialize ReadableStream in this context.`);
              let n = e,
                r = this.source.getHookForReadableStream(n, t);
              return [`readable`, this.exporter.createPipe(n, r)];
            }
            default:
              throw Error(`unreachable`);
          }
        }
        devaluateHook(e, t) {
          this.exports ||= [];
          let n = e === `promise` ? this.exporter.exportPromise(t) : this.exporter.exportStub(t);
          return (this.exports.push(n), [e, n]);
        }
      }),
      (NullImporter = class {
        importStub(e) {
          throw Error(`Cannot deserialize RPC stubs without an RPC session.`);
        }
        importPromise(e) {
          throw Error(`Cannot deserialize RPC stubs without an RPC session.`);
        }
        getExport(e) {}
        getPipeReadable(e) {
          throw Error(`Cannot retrieve pipe readable without an RPC session.`);
        }
        getLimits() {
          return qE;
        }
      }),
      new NullImporter(),
      (ZE = class Evaluator {
        importer;
        encodingLevel;
        limits;
        constructor(e, t = `string`) {
          ((this.importer = e), (this.encodingLevel = t), (this.limits = e.getLimits()));
        }
        hooks = [];
        promises = [];
        evaluate(e) {
          return this.evaluateWithDepth(e, 0);
        }
        evaluateWithDepth(e, t) {
          let n = UE.forEvaluate(this.hooks, this.promises);
          try {
            return ((n.value = this.evaluateImpl(e, n, `value`, t)), n);
          } catch (e) {
            throw (n.dispose(), e);
          }
        }
        evaluateCopy(e) {
          return this.evaluate(structuredClone(e));
        }
        evaluateImpl(e, t, n, r) {
          let i = this.limits.maxDepth;
          if (r >= i)
            throw TypeError(`Deserialization exceeded maximum allowed message depth of ${i}.`);
          if (
            this.encodingLevel === `structuredClonable` &&
            (e instanceof Date || typeof e == `bigint`)
          )
            return e;
          if (e instanceof Array) {
            if (e.length == 1 && e[0] instanceof Array) {
              let t = e[0];
              for (let e = 0; e < t.length; e++) t[e] = this.evaluateImpl(t[e], t, e, r + 1);
              return t;
            } else
              switch (e[0]) {
                case `bigint`:
                  if (typeof e[1] == `string`) {
                    let t = e[1],
                      n = this.limits.maxBigIntDigits;
                    if (t.length > n)
                      throw TypeError(`Deserialized bigint exceeds maximum length of ${n} digits.`);
                    return BigInt(t);
                  }
                  break;
                case `date`:
                  if (e[1] === null) return new Date(NaN);
                  if (typeof e[1] == `number`) return new Date(e[1]);
                  break;
                case `bytes`:
                  if (e[1] instanceof Uint8Array) return e[1];
                  if (typeof e[1] == `string`) {
                    if (typeof Buffer < `u`) return Buffer.from(e[1], `base64`);
                    if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e[1]);
                    {
                      let t = atob(e[1]),
                        n = t.length,
                        r = new Uint8Array(n);
                      for (let e = 0; e < n; e++) r[e] = t.charCodeAt(e);
                      return r;
                    }
                  }
                  break;
                case `error`:
                  if (e.length >= 3 && typeof e[1] == `string` && typeof e[2] == `string`) {
                    let t = YE[e[1]] || Error,
                      n = t === AggregateError ? new t([], e[2]) : new t(e[2]);
                    if ((typeof e[3] == `string` && (n.stack = e[3]), e.length >= 5)) {
                      let t = e[4];
                      if (!t || typeof t != `object` || Array.isArray(t)) break;
                      let i = n,
                        a = t;
                      for (let e of Object.keys(a))
                        if (!(e === `name` || e === `message` || e === `stack`)) {
                          if (e in Object.prototype || e === `toJSON`) {
                            this.evaluateImpl(a[e], n, e, r + 1);
                            continue;
                          }
                          i[e] = this.evaluateImpl(a[e], n, e, r + 1);
                        }
                    }
                    return n;
                  }
                  break;
                case `undefined`:
                  if (e.length === 1) return;
                  break;
                case `inf`:
                  return 1 / 0;
                case `-inf`:
                  return -1 / 0;
                case `nan`:
                  return NaN;
                case `headers`:
                  if (e.length === 2 && e[1] instanceof Array) return new Headers(e[1]);
                  break;
                case `request`: {
                  if (e.length !== 3 || typeof e[1] != `string`) break;
                  let i = e[1],
                    a = e[2];
                  if (typeof a != `object` || !a) break;
                  if (
                    a.body &&
                    ((a.body = this.evaluateImpl(a.body, a, `body`, r + 1)),
                    !(
                      a.body === null ||
                      typeof a.body == `string` ||
                      a.body instanceof Uint8Array ||
                      a.body instanceof ReadableStream
                    ))
                  )
                    throw TypeError(`Request body must be of type ReadableStream.`);
                  if (
                    a.signal &&
                    ((a.signal = this.evaluateImpl(a.signal, a, `signal`, r + 1)),
                    !(a.signal instanceof AbortSignal))
                  )
                    throw TypeError(`Request siganl must be of type AbortSignal.`);
                  if (a.headers && !(a.headers instanceof Array))
                    throw TypeError(`Request headers must be serialized as an array of pairs.`);
                  let o = new Request(i, a);
                  if (a.body instanceof ReadableStream && o.body === void 0) {
                    let e = fixBrokenRequestBody(o, a.body);
                    return (this.promises.push({ promise: e, parent: t, property: n }), e);
                  } else return o;
                }
                case `response`: {
                  if (e.length !== 3) break;
                  let i = this.evaluateImpl(e[1], t, n, r + 1);
                  if (
                    !(
                      i === null ||
                      typeof i == `string` ||
                      i instanceof Uint8Array ||
                      i instanceof ReadableStream
                    )
                  )
                    throw TypeError(`Response body must be of type ReadableStream.`);
                  let a = e[2];
                  if (typeof a != `object` || !a) break;
                  if (a.webSocket)
                    throw TypeError(`Can't deserialize a Response containing a webSocket.`);
                  if (a.headers && !(a.headers instanceof Array))
                    throw TypeError(`Request headers must be serialized as an array of pairs.`);
                  return new Response(i, a);
                }
                case `blob`: {
                  if (e.length !== 3 || typeof e[1] != `string`) break;
                  let i = e[1],
                    a = this.evaluateImpl(e[2], t, n, r + 1);
                  if (!(a instanceof ReadableStream))
                    throw TypeError(`Blob content must be serialized as a ReadableStream.`);
                  let o = streamToBlobPromise(a, i);
                  return (this.promises.push({ promise: o, parent: t, property: n }), o);
                }
                case `import`:
                case `pipeline`: {
                  if (e.length < 2 || e.length > 4 || typeof e[1] != `number`) break;
                  let i = this.importer.getExport(e[1]);
                  if (!i) throw Error(`no such entry on exports table: ${e[1]}`);
                  let a = e[0] == `pipeline`,
                    addStub = (e) => {
                      if (a) {
                        let r = new RpcPromise$1(e, []);
                        return (this.promises.push({ promise: r, parent: t, property: n }), r);
                      } else return (this.hooks.push(e), new RpcPromise$1(e, []));
                    };
                  if (e.length == 2) return addStub(a ? i.get([]) : i.dup());
                  let o = e[2];
                  if (
                    !(o instanceof Array) ||
                    !o.every((e) => typeof e == `string` || typeof e == `number`)
                  )
                    break;
                  if (e.length == 3) return addStub(i.get(o));
                  let s = e[3];
                  if (!(s instanceof Array)) break;
                  return (
                    (s = new Evaluator(this.importer).evaluateWithDepth([s], r)),
                    addStub(i.call(o, s))
                  );
                }
                case `remap`: {
                  if (
                    e.length !== 5 ||
                    typeof e[1] != `number` ||
                    !(e[2] instanceof Array) ||
                    !(e[3] instanceof Array) ||
                    !(e[4] instanceof Array)
                  )
                    break;
                  let r = this.importer.getExport(e[1]);
                  if (!r) throw Error(`no such entry on exports table: ${e[1]}`);
                  let i = e[2];
                  if (!i.every((e) => typeof e == `string` || typeof e == `number`)) break;
                  let a = e[3].map((e) => {
                      if (
                        !(e instanceof Array) ||
                        e.length !== 2 ||
                        (e[0] !== `import` && e[0] !== `export`) ||
                        typeof e[1] != `number`
                      )
                        throw TypeError(`unknown map capture: ${JSON.stringify(e)}`);
                      if (e[0] === `export`) return this.importer.importStub(e[1]);
                      {
                        let t = this.importer.getExport(e[1]);
                        if (!t) throw Error(`no such entry on exports table: ${e[1]}`);
                        return t.dup();
                      }
                    }),
                    o = e[4],
                    s = new RpcPromise$1(r.map(i, a, o), []);
                  return (this.promises.push({ promise: s, parent: t, property: n }), s);
                }
                case `export`:
                case `promise`:
                  if (typeof e[1] == `number`)
                    if (e[0] == `promise`) {
                      let r = new RpcPromise$1(this.importer.importPromise(e[1]), []);
                      return (this.promises.push({ parent: t, property: n, promise: r }), r);
                    } else {
                      let t = this.importer.importStub(e[1]);
                      return (this.hooks.push(t), new HE(t));
                    }
                  break;
                case `writable`:
                  if (typeof e[1] == `number`) {
                    let t = this.importer.importStub(e[1]),
                      n = RE.createWritableStreamFromHook(t);
                    return (this.hooks.push(t), n);
                  }
                  break;
                case `readable`:
                  if (typeof e[1] == `number`) {
                    let t = this.importer.getPipeReadable(e[1]),
                      n = RE.createReadableStreamHook(t);
                    return (this.hooks.push(n), t);
                  }
                  break;
              }
            throw TypeError(`unknown special value: ${JSON.stringify(e)}`);
          } else if (e instanceof Object) {
            let t = e;
            for (let e in t)
              e in Object.prototype || e === `toJSON`
                ? (this.evaluateImpl(t[e], t, e, r + 1), delete t[e])
                : (t[e] = this.evaluateImpl(t[e], t, e, r + 1));
            return t;
          } else return e;
        }
      }),
      (QE = 16),
      ($E = 8),
      (eD = 16),
      (tD = 64),
      (ImportTableEntry = class {
        session;
        importId;
        constructor(e, t, n) {
          ((this.session = e),
            (this.importId = t),
            n && (this.activePull = Promise.withResolvers()));
        }
        localRefcount = 0;
        remoteRefcount = 1;
        activePull;
        resolution;
        onBrokenRegistrations;
        resolve(e) {
          if (this.resolution) {
            e.dispose();
            return;
          }
          if (this.localRefcount == 0) {
            e.dispose();
            return;
          }
          if (((this.resolution = e), this.sendRelease(), this.onBrokenRegistrations)) {
            for (let t of this.onBrokenRegistrations) {
              let n = this.session.onBrokenCallbacks[t],
                r = this.session.onBrokenCallbacks.length;
              (e.onBroken(n),
                this.session.onBrokenCallbacks[r] === n
                  ? delete this.session.onBrokenCallbacks[r]
                  : delete this.session.onBrokenCallbacks[t]);
            }
            this.onBrokenRegistrations = void 0;
          }
          this.activePull &&= (this.activePull.resolve(), void 0);
        }
        async awaitResolution() {
          return (
            (this.activePull ||= (this.session.sendPull(this.importId), Promise.withResolvers())),
            await this.activePull.promise,
            this.resolution.pull()
          );
        }
        dispose() {
          this.resolution
            ? this.resolution.dispose()
            : (this.abort(Error(`RPC was canceled because the RpcPromise was disposed.`)),
              this.sendRelease());
        }
        abort(e) {
          this.resolution ||
            ((this.resolution = new ErrorStubHook(e)),
            (this.activePull &&= (this.activePull.reject(e), void 0)),
            (this.onBrokenRegistrations = void 0));
        }
        onBroken(e) {
          if (this.resolution) this.resolution.onBroken(e);
          else {
            let t = this.session.onBrokenCallbacks.length;
            (this.session.onBrokenCallbacks.push(e),
              (this.onBrokenRegistrations ||= []),
              this.onBrokenRegistrations.push(t));
          }
        }
        sendRelease() {
          this.remoteRefcount > 0 &&
            (this.session.sendRelease(this.importId, this.remoteRefcount),
            (this.remoteRefcount = 0));
        }
      }),
      (nD = class RpcImportHook extends StubHook {
        isPromise;
        entry;
        constructor(e, t) {
          (super(), (this.isPromise = e), ++t.localRefcount, (this.entry = t));
        }
        collectPath(e) {
          return this;
        }
        getEntry() {
          if (this.entry) return this.entry;
          throw Error(`This RpcImportHook was already disposed.`);
        }
        call(e, t) {
          let n = this.getEntry();
          return n.resolution ? n.resolution.call(e, t) : n.session.sendCall(n.importId, e, t);
        }
        stream(e, t) {
          let n = this.getEntry();
          return n.resolution ? n.resolution.stream(e, t) : n.session.sendStream(n.importId, e, t);
        }
        map(e, t, n) {
          let r;
          try {
            r = this.getEntry();
          } catch (e) {
            for (let e of t) e.dispose();
            throw e;
          }
          return r.resolution ? r.resolution.map(e, t, n) : r.session.sendMap(r.importId, e, t, n);
        }
        get(e) {
          let t = this.getEntry();
          return t.resolution ? t.resolution.get(e) : t.session.sendCall(t.importId, e);
        }
        dup() {
          return new RpcImportHook(!1, this.getEntry());
        }
        pull() {
          let e = this.getEntry();
          if (!this.isPromise) throw Error(`Can't pull this hook because it's not a promise hook.`);
          return e.resolution ? e.resolution.pull() : e.awaitResolution();
        }
        ignoreUnhandledRejections() {}
        dispose() {
          let e = this.entry;
          ((this.entry = void 0), e && --e.localRefcount === 0 && e.dispose());
        }
        onBroken(e) {
          this.entry && this.entry.onBroken(e);
        }
      }),
      (RpcMainHook = class extends nD {
        session;
        constructor(e) {
          (super(!1, e), (this.session = e.session));
        }
        dispose() {
          if (this.session) {
            let e = this.session;
            ((this.session = void 0), e.shutdown());
          }
        }
      }),
      (RpcSessionImpl = class {
        transport;
        options;
        exports = [];
        reverseExports = new Map();
        imports = [];
        abortReason;
        cancelReadLoop;
        nextExportId = -1;
        onBatchDone;
        pullCount = 0;
        onBrokenCallbacks = [];
        encodingLevel;
        limits;
        constructor(e, t, n) {
          ((this.transport = e), (this.options = n));
          let r = `string`;
          if (`encodingLevel` in e) {
            let t = e.encodingLevel;
            if (t !== void 0) {
              if (
                t !== `string` &&
                t !== `jsonCompatible` &&
                t !== `jsonCompatibleWithBytes` &&
                t !== `structuredClonable`
              )
                throw TypeError(`Unknown transport encodingLevel: ${String(t)}`);
              r = t;
            }
          }
          ((this.encodingLevel = r),
            (this.limits = { ...qE, ...n.limits }),
            this.exports.push({ hook: t, refcount: 1 }),
            this.imports.push(new ImportTableEntry(this, 0, !1)),
            this.readLoop().catch((e) => this.abort(e)));
        }
        getMainImport() {
          return new RpcMainHook(this.imports[0]);
        }
        shutdown() {
          this.abort(Error(`RPC session was shut down by disposing the main stub`), !1);
        }
        exportStub(e) {
          if (this.abortReason) throw this.abortReason;
          let t = this.reverseExports.get(e);
          if (t !== void 0) return (++this.exports[t].refcount, t);
          {
            let t = this.nextExportId--;
            return ((this.exports[t] = { hook: e, refcount: 1 }), this.reverseExports.set(e, t), t);
          }
        }
        exportPromise(e) {
          if (this.abortReason) throw this.abortReason;
          let t = this.nextExportId--;
          return (
            (this.exports[t] = { hook: e, refcount: 1 }),
            this.reverseExports.set(e, t),
            this.ensureResolvingExport(t),
            t
          );
        }
        unexport(e) {
          for (let t of e) this.releaseExport(t, 1);
        }
        releaseExport(e, t) {
          let n = this.exports[e];
          if (!n) throw Error(`no such export ID: ${e}`);
          if (n.refcount < t) throw Error(`refcount would go negative: ${n.refcount} < ${t}`);
          ((n.refcount -= t),
            n.refcount === 0 &&
              (delete this.exports[e], this.reverseExports.delete(n.hook), n.hook.dispose()));
        }
        onSendError(e) {
          if (this.options.onSendError) return this.options.onSendError(e);
        }
        ensureResolvingExport(e) {
          let t = this.exports[e];
          if (!t) throw Error(`no such export ID: ${e}`);
          if (!t.pull) {
            let resolve = async () => {
                let e = t.hook;
                for (;;) {
                  let t = await e.pull();
                  if (t.value instanceof HE) {
                    let { hook: n, pathIfPromise: r } = unwrapStubAndPath(t.value);
                    if (r && r.length == 0 && this.getImport(e) === void 0) {
                      e = n;
                      continue;
                    }
                  }
                  return t;
                }
              },
              n = t.autoRelease;
            (++this.pullCount,
              (t.pull = resolve()
                .then(
                  (t) => {
                    let r = XE.devaluate(t.value, void 0, this, t, this.encodingLevel);
                    (this.send([`resolve`, e, r]), n && this.releaseExport(e, 1));
                  },
                  (t) => {
                    (this.send([
                      `reject`,
                      e,
                      XE.devaluate(t, void 0, this, void 0, this.encodingLevel),
                    ]),
                      n && this.releaseExport(e, 1));
                  },
                )
                .catch((t) => {
                  try {
                    (this.send([
                      `reject`,
                      e,
                      XE.devaluate(t, void 0, this, void 0, this.encodingLevel),
                    ]),
                      n && this.releaseExport(e, 1));
                  } catch (e) {
                    this.abort(e);
                  }
                })
                .finally(() => {
                  --this.pullCount === 0 && this.onBatchDone && this.onBatchDone.resolve();
                })));
          }
        }
        getImport(e) {
          if (e instanceof nD && e.entry && e.entry.session === this) return e.entry.importId;
        }
        importStub(e) {
          if (this.abortReason) throw this.abortReason;
          let t = this.imports[e];
          return (
            t || ((t = new ImportTableEntry(this, e, !1)), (this.imports[e] = t)), new nD(!1, t)
          );
        }
        importPromise(e) {
          if (this.abortReason) throw this.abortReason;
          if (this.imports[e])
            return new ErrorStubHook(
              Error(`Bug in RPC system: The peer sent a promise reusing an existing export ID.`),
            );
          let t = new ImportTableEntry(this, e, !0);
          return ((this.imports[e] = t), new nD(!0, t));
        }
        getExport(e) {
          return this.exports[e]?.hook;
        }
        getPipeReadable(e) {
          let t = this.exports[e];
          if (!t || !t.pipeReadable)
            throw Error(`Export ${e} is not a pipe or its readable end was already consumed.`);
          let n = t.pipeReadable;
          return ((t.pipeReadable = void 0), n);
        }
        getLimits() {
          return this.limits;
        }
        createPipe(e, t) {
          if (this.abortReason) throw this.abortReason;
          this.send([`pipe`]);
          let n = this.imports.length,
            r = new ImportTableEntry(this, n, !1);
          this.imports.push(r);
          let i = new nD(!1, r),
            a = RE.createWritableStreamFromHook(i);
          return (
            e
              .pipeTo(a)
              .catch(() => {})
              .finally(() => t.dispose()),
            n
          );
        }
        send(e) {
          if (this.abortReason !== void 0) return 0;
          if (this.encodingLevel === `string`) {
            let t;
            try {
              t = JSON.stringify(e);
            } catch (e) {
              try {
                this.abort(e);
              } catch {}
              throw e;
            }
            try {
              let e = this.transport.send(t);
              e !== void 0 && typeof e.catch == `function` && e.catch((e) => this.abort(e, !1));
            } catch (e) {
              queueMicrotask(() => this.abort(e, !1));
            }
            return t.length;
          } else
            try {
              let t = this.transport.send(e);
              if (typeof t == `number`) return t;
              let n = t;
              n &&
                typeof n.then == `function` &&
                Promise.resolve(n).catch((e) => this.abort(e, !1));
              return;
            } catch (e) {
              queueMicrotask(() => this.abort(e, !1));
              return;
            }
        }
        sendCall(e, t, n) {
          if (this.abortReason) throw this.abortReason;
          let r = [`pipeline`, e, t];
          if (n) {
            let e = XE.devaluate(n.value, void 0, this, n, this.encodingLevel);
            r.push(e[0]);
          }
          this.send([`push`, r]);
          let i = new ImportTableEntry(this, this.imports.length, !1);
          return (this.imports.push(i), new nD(!0, i));
        }
        sendStream(e, t, n) {
          if (this.abortReason) throw this.abortReason;
          let r = [`pipeline`, e, t],
            i = XE.devaluate(n.value, void 0, this, n, this.encodingLevel);
          r.push(i[0]);
          let a = [`stream`, r],
            o = this.send(a);
          o === void 0 && (o = estimateEncodedSize(a));
          let s = this.imports.length,
            c = new ImportTableEntry(this, s, !0);
          return (
            (c.remoteRefcount = 0),
            (c.localRefcount = 1),
            this.imports.push(c),
            {
              promise: c.awaitResolution().then(
                (e) => {
                  (e.dispose(), delete this.imports[s]);
                },
                (e) => {
                  throw (delete this.imports[s], e);
                },
              ),
              size: o,
            }
          );
        }
        sendMap(e, t, n, r) {
          if (this.abortReason) {
            for (let e of n) e.dispose();
            throw this.abortReason;
          }
          let i = [
            `remap`,
            e,
            t,
            n.map((e) => {
              let t = this.getImport(e);
              return t === void 0 ? [`export`, this.exportStub(e)] : [`import`, t];
            }),
            r,
          ];
          this.send([`push`, i]);
          let a = new ImportTableEntry(this, this.imports.length, !1);
          return (this.imports.push(a), new nD(!0, a));
        }
        sendPull(e) {
          if (this.abortReason) throw this.abortReason;
          this.send([`pull`, e]);
        }
        sendRelease(e, t) {
          this.abortReason || (this.send([`release`, e, t]), delete this.imports[e]);
        }
        abort(e, t = !0) {
          if (this.abortReason === void 0) {
            if ((this.cancelReadLoop?.(e), (this.cancelReadLoop = void 0), t))
              try {
                let t = [`abort`, XE.devaluate(e, void 0, this, void 0, this.encodingLevel)];
                if (this.encodingLevel === `string`) {
                  let e = this.transport.send(JSON.stringify(t));
                  e !== void 0 && typeof e.catch == `function` && e.catch((e) => {});
                } else {
                  let e = this.transport.send(t);
                  e && typeof e.then == `function` && Promise.resolve(e).catch((e) => {});
                }
              } catch {}
            if (
              (e === void 0 && (e = `undefined`),
              (this.abortReason = e),
              this.onBatchDone && this.onBatchDone.reject(e),
              this.transport.abort)
            )
              try {
                this.transport.abort(e);
              } catch (e) {
                Promise.resolve(e);
              }
            for (let t in this.onBrokenCallbacks)
              try {
                this.onBrokenCallbacks[t](e);
              } catch (e) {
                Promise.resolve(e);
              }
            for (let t in this.imports) this.imports[t].abort(e);
            for (let e in this.exports) this.exports[e].hook.dispose();
          }
        }
        async readLoop() {
          for (; !this.abortReason;) {
            let e = Promise.withResolvers();
            this.cancelReadLoop = e.reject;
            let t;
            try {
              t = await Promise.race([this.transport.receive(), e.promise]);
            } finally {
              this.cancelReadLoop === e.reject && (this.cancelReadLoop = void 0);
            }
            if (this.encodingLevel === `string` && t.length > this.limits.maxMessageSize)
              throw TypeError(
                `Incoming message exceeds maximum size of ${this.limits.maxMessageSize} UTF-16 code units.`,
              );
            if (this.abortReason) break;
            let n = this.encodingLevel === `string` ? JSON.parse(t) : t;
            if (n instanceof Array)
              switch (n[0]) {
                case `push`:
                  if (n.length > 1) {
                    let e = new WE(new ZE(this, this.encodingLevel).evaluate(n[1]));
                    (e.ignoreUnhandledRejections(), this.exports.push({ hook: e, refcount: 1 }));
                    continue;
                  }
                  break;
                case `stream`:
                  if (n.length > 1) {
                    let e = new WE(new ZE(this, this.encodingLevel).evaluate(n[1]));
                    e.ignoreUnhandledRejections();
                    let t = this.exports.length;
                    (this.exports.push({ hook: e, refcount: 1, autoRelease: !0 }),
                      this.ensureResolvingExport(t));
                    continue;
                  }
                  break;
                case `pipe`: {
                  let { readable: e, writable: t } = new TransformStream(),
                    n = RE.createWritableStreamHook(t);
                  this.exports.push({ hook: n, refcount: 1, pipeReadable: e });
                  continue;
                }
                case `pull`: {
                  let e = n[1];
                  if (typeof e == `number`) {
                    this.ensureResolvingExport(e);
                    continue;
                  }
                  break;
                }
                case `resolve`:
                case `reject`: {
                  let e = n[1];
                  if (typeof e == `number` && n.length > 2) {
                    let t = this.imports[e];
                    if (t)
                      if (n[0] == `resolve`)
                        t.resolve(new WE(new ZE(this, this.encodingLevel).evaluate(n[2])));
                      else {
                        let e = new ZE(this, this.encodingLevel).evaluate(n[2]);
                        (e.dispose(), t.resolve(new ErrorStubHook(e.value)));
                      }
                    else
                      n[0] == `resolve` &&
                        new ZE(this, this.encodingLevel).evaluate(n[2]).dispose();
                    continue;
                  }
                  break;
                }
                case `release`: {
                  let e = n[1],
                    t = n[2];
                  if (typeof e == `number` && typeof t == `number`) {
                    this.releaseExport(e, t);
                    continue;
                  }
                  break;
                }
                case `abort`: {
                  let e = new ZE(this, this.encodingLevel).evaluate(n[1]);
                  (e.dispose(), this.abort(e.value, !1));
                  break;
                }
              }
            throw Error(`bad RPC message: ${JSON.stringify(n)}`);
          }
        }
        async drain() {
          if (this.abortReason) throw this.abortReason;
          if (this.pullCount > 0) {
            let { promise: e, resolve: t, reject: n } = Promise.withResolvers();
            ((this.onBatchDone = { resolve: t, reject: n }), await e);
          }
        }
        getStats() {
          let e = { imports: 0, exports: 0 };
          for (let t in this.imports) ++e.imports;
          for (let t in this.exports) ++e.exports;
          return e;
        }
      }),
      (RpcSession$1 = class {
        #e;
        #t;
        constructor(e, t, n = {}) {
          let r;
          ((r = t
            ? new WE(UE.fromAppReturn(t))
            : new ErrorStubHook(Error(`This connection has no main object.`))),
            (this.#e = new RpcSessionImpl(e, r, n)),
            (this.#t = new HE(this.#e.getMainImport())));
        }
        getRemoteMain() {
          return this.#t;
        }
        getStats() {
          return this.#e.getStats();
        }
        drain() {
          return this.#e.drain();
        }
      }),
      (WebSocketTransport = class {
        constructor(e) {
          ((this.#e = e),
            (e.binaryType = `arraybuffer`),
            e.readyState === WebSocket.CONNECTING &&
              ((this.#t = []),
              e.addEventListener(`open`, (t) => {
                try {
                  for (let t of this.#t) e.send(t);
                } catch (e) {
                  this.#o(e);
                }
                this.#t = void 0;
              })),
            e.addEventListener(`message`, (e) => {
              this.#a ||
                (typeof e.data == `string` || e.data instanceof ArrayBuffer
                  ? this.#n
                    ? (this.#n(e.data), (this.#n = void 0), (this.#r = void 0))
                    : this.#i.push(e.data)
                  : this.#o(TypeError(`Received unexpected message type from WebSocket.`)));
            }),
            e.addEventListener(`close`, (e) => {
              this.#o(Error(`Peer closed WebSocket: ${e.code} ${e.reason}`));
            }),
            e.addEventListener(`error`, (e) => {
              this.#o(Error(`WebSocket connection failed.`));
            }));
        }
        #e;
        #t;
        #n;
        #r;
        #i = [];
        #a;
        send(e) {
          this.#t === void 0 ? this.#e.send(e) : this.#t.push(e);
        }
        receive() {
          return this.#i.length > 0
            ? Promise.resolve(this.#i.shift())
            : this.#a
              ? Promise.reject(this.#a)
              : new Promise((e, t) => {
                  ((this.#n = e), (this.#r = t));
                });
        }
        abort(e) {
          let t;
          t = e instanceof Error ? e.message : `${e}`;
          let n = new TextEncoder().encode(t);
          (n.length > 123 && (t = new TextDecoder().decode(n.subarray(0, 123), { stream: !0 })),
            this.#e.close(3e3, t),
            (this.#a ||= e));
        }
        #o(e) {
          this.#a || ((this.#a = e), (this.#r &&= (this.#r(e), (this.#n = void 0), void 0)));
        }
      }),
      (BatchServerTransport = class {
        constructor(e) {
          this.#t = e;
        }
        #e = [];
        #t;
        #n = Promise.withResolvers();
        send(e) {
          this.#e.push(e);
        }
        async receive() {
          let e = this.#t.shift();
          return e === void 0 ? (this.#n.resolve(), new Promise((e) => {})) : e;
        }
        abort(e) {
          this.#n.reject(e);
        }
        whenAllReceived() {
          return this.#n.promise;
        }
        getResponseBody() {
          return this.#e.join(`
`);
        }
      }),
      (MapBuilder = class {
        context;
        captureMap = new Map();
        instructions = [];
        constructor(e, t) {
          (rD
            ? (this.context = { parent: rD, captures: [], subject: rD.capture(e), path: t })
            : (this.context = { parent: void 0, captures: [], subject: e, path: t }),
            (rD = this));
        }
        unregister() {
          rD = this.context.parent;
        }
        makeInput() {
          return new MapVariableHook(this, 0);
        }
        makeOutput(e) {
          let t;
          try {
            t = XE.devaluate(e.value, void 0, this, e);
          } finally {
            e.dispose();
          }
          return (
            this.instructions.push(t),
            this.context.parent
              ? (this.context.parent.instructions.push([
                  `remap`,
                  this.context.subject,
                  this.context.path,
                  this.context.captures.map((e) => [`import`, e]),
                  this.instructions,
                ]),
                new MapVariableHook(this.context.parent, this.context.parent.instructions.length))
              : this.context.subject.map(
                  this.context.path,
                  this.context.captures,
                  this.instructions,
                )
          );
        }
        pushCall(e, t, n) {
          let r = XE.devaluate(n.value, void 0, this, n);
          r = r[0];
          let i = this.capture(e.dup());
          return (
            this.instructions.push([`pipeline`, i, t, r]),
            new MapVariableHook(this, this.instructions.length)
          );
        }
        pushGet(e, t) {
          let n = this.capture(e.dup());
          return (
            this.instructions.push([`pipeline`, n, t]),
            new MapVariableHook(this, this.instructions.length)
          );
        }
        capture(e) {
          if (e instanceof MapVariableHook && e.mapper === this) return e.idx;
          let t = this.captureMap.get(e);
          if (t === void 0) {
            if (this.context.parent) {
              let t = this.context.parent.capture(e);
              this.context.captures.push(t);
            } else this.context.captures.push(e);
            ((t = -this.context.captures.length), this.captureMap.set(e, t));
          }
          return t;
        }
        exportStub(e) {
          throw Error(
            `Can't construct an RpcTarget or RPC callback inside a mapper function. Try creating a new RpcStub outside the callback first, then using it inside the callback.`,
          );
        }
        exportPromise(e) {
          return this.exportStub(e);
        }
        getImport(e) {
          return this.capture(e);
        }
        unexport(e) {}
        createPipe(e) {
          throw Error(`Cannot send ReadableStream inside a mapper function.`);
        }
        onSendError(e) {}
      }),
      (LE.sendMap = (e, t, n) => {
        let r = new MapBuilder(e, t),
          i;
        try {
          i = UE.fromAppReturn(
            withCallInterceptor(r.pushCall.bind(r), () => n(new RpcPromise$1(r.makeInput(), []))),
          );
        } finally {
          r.unregister();
        }
        if (i instanceof Promise)
          throw (i.catch((e) => {}), Error(`RPC map() callbacks cannot be async.`));
        return new RpcPromise$1(r.makeOutput(i), []);
      }),
      (MapVariableHook = class extends StubHook {
        mapper;
        idx;
        constructor(e, t) {
          (super(), (this.mapper = e), (this.idx = t));
        }
        dup() {
          return this;
        }
        dispose() {}
        get(e) {
          if (e.length == 0) return this;
          if (rD) return rD.pushGet(this, e);
          throwMapperBuilderUseError();
        }
        call(e, t) {
          throwMapperBuilderUseError();
        }
        map(e, t, n) {
          throwMapperBuilderUseError();
        }
        pull() {
          throwMapperBuilderUseError();
        }
        ignoreUnhandledRejections() {}
        onBroken(e) {
          throwMapperBuilderUseError();
        }
      }),
      (MapApplicator = class {
        captures;
        variables;
        constructor(e, t) {
          ((this.captures = e), (this.variables = [t]));
        }
        dispose() {
          for (let e of this.variables) e.dispose();
        }
        apply(e) {
          try {
            if (e.length < 1) throw Error(`Invalid empty mapper function.`);
            for (let t of e.slice(0, -1)) {
              let e = new ZE(this).evaluateCopy(t);
              if (e.value instanceof HE) {
                let t = unwrapStubNoProperties(e.value);
                if (t) {
                  this.variables.push(t);
                  continue;
                }
              }
              this.variables.push(new WE(e));
            }
            return new ZE(this).evaluateCopy(e[e.length - 1]);
          } finally {
            for (let e of this.variables) e.dispose();
          }
        }
        importStub(e) {
          throw Error(`A mapper function cannot refer to exports.`);
        }
        importPromise(e) {
          return this.importStub(e);
        }
        getExport(e) {
          return e < 0 ? this.captures[-e - 1] : this.variables[e];
        }
        getPipeReadable(e) {
          throw Error(`A mapper function cannot use pipe readables.`);
        }
        getLimits() {
          return qE;
        }
      }),
      (LE.applyMap = (e, t, n, r, i) => {
        try {
          let a;
          if (e instanceof RpcPromise$1) throw Error(`applyMap() can't be called on RpcPromise`);
          if (e instanceof Array) {
            let t = [];
            try {
              for (let a of e) t.push(applyMapToElement(a, e, n, r, i));
            } catch (e) {
              for (let e of t) e.dispose();
              throw e;
            }
            a = UE.fromArray(t);
          } else a = e == null ? UE.fromAppReturn(e) : applyMapToElement(e, t, n, r, i);
          return new WE(a);
        } finally {
          for (let e of r) e.dispose();
        }
      }),
      (iD = class WritableStreamStubHook extends StubHook {
        state;
        static create(e) {
          return new WritableStreamStubHook({ refcount: 1, writer: e.getWriter(), closed: !1 });
        }
        constructor(e, t) {
          (super(), (this.state = e), t && ++e.refcount);
        }
        getState() {
          if (this.state) return this.state;
          throw Error(`Attempted to use a WritableStreamStubHook after it was disposed.`);
        }
        call(e, t) {
          try {
            let n = this.getState();
            if (e.length !== 1 || typeof e[0] != `string`)
              throw Error(`WritableStream stub only supports direct method calls`);
            let r = e[0];
            if (r !== `write` && r !== `close` && r !== `abort`)
              throw (t.dispose(), Error(`Unknown WritableStream method: ${r}`));
            (r === `close` || r === `abort`) && (n.closed = !0);
            let i = n.writer[r];
            return new KE(t.deliverCall(i, n.writer).then((e) => new WE(e)));
          } catch (e) {
            return new ErrorStubHook(e);
          }
        }
        map(e, t, n) {
          for (let e of t) e.dispose();
          return new ErrorStubHook(Error(`Cannot use map() on a WritableStream`));
        }
        get(e) {
          return new ErrorStubHook(Error(`Cannot access properties on a WritableStream stub`));
        }
        dup() {
          return new WritableStreamStubHook(this.getState(), this);
        }
        pull() {
          return Promise.reject(Error(`Cannot pull a WritableStream stub`));
        }
        ignoreUnhandledRejections() {}
        dispose() {
          let e = this.state;
          ((this.state = void 0),
            e &&
              --e.refcount === 0 &&
              (e.closed ||
                e.writer
                  .abort(Error(`WritableStream RPC stub was disposed without calling close()`))
                  .catch(() => {}),
              e.writer.releaseLock()));
        }
        onBroken(e) {}
      }),
      (aD = 256 * 1024),
      (oD = 1024 * 1024 * 1024),
      (sD = 64 * 1024),
      (cD = 2),
      (lD = 1.25),
      (uD = 0.9),
      (dD = 3),
      (FlowController = class {
        now;
        window = aD;
        bytesInFlight = 0;
        inStartupPhase = !0;
        delivered = 0;
        deliveredTime = 0;
        firstAckTime = 0;
        firstAckDelivered = 0;
        minRtt = 1 / 0;
        roundsWithoutIncrease = 0;
        lastRoundWindow = 0;
        roundStartTime = 0;
        constructor(e) {
          this.now = e;
        }
        onSend(e) {
          this.bytesInFlight += e;
          let t = {
            sentTime: this.now(),
            size: e,
            deliveredAtSend: this.delivered,
            deliveredTimeAtSend: this.deliveredTime,
            windowAtSend: this.window,
            windowFullAtSend: this.bytesInFlight >= this.window,
          };
          return { token: t, shouldBlock: t.windowFullAtSend };
        }
        onError(e) {
          this.bytesInFlight -= e.size;
        }
        onAck(e) {
          let t = this.now();
          ((this.delivered += e.size), (this.deliveredTime = t), (this.bytesInFlight -= e.size));
          let n = t - e.sentTime;
          if (((this.minRtt = Math.min(this.minRtt, n)), this.firstAckTime === 0))
            ((this.firstAckTime = t), (this.firstAckDelivered = this.delivered));
          else {
            let n, r;
            e.deliveredTimeAtSend === 0
              ? ((n = this.firstAckTime), (r = this.firstAckDelivered))
              : ((n = e.deliveredTimeAtSend), (r = e.deliveredAtSend));
            let i = t - n,
              a = (this.delivered - r) / i,
              o = this.inStartupPhase ? cD : lD,
              s = a * this.minRtt * o;
            ((s = Math.min(s, e.windowAtSend * o)),
              (s = e.windowFullAtSend
                ? Math.max(s, e.windowAtSend * uD)
                : Math.max(s, this.window)),
              (this.window = Math.max(Math.min(s, oD), sD)),
              this.inStartupPhase &&
                e.sentTime >= this.roundStartTime &&
                (this.window > this.lastRoundWindow * lD
                  ? (this.roundsWithoutIncrease = 0)
                  : ++this.roundsWithoutIncrease >= dD && (this.inStartupPhase = !1),
                (this.roundStartTime = t),
                (this.lastRoundWindow = this.window)));
          }
          return this.bytesInFlight < this.window;
        }
      }),
      (fD = class ReadableStreamStubHook extends StubHook {
        state;
        static create(e) {
          return new ReadableStreamStubHook({ refcount: 1, stream: e, canceled: !1 });
        }
        constructor(e, t) {
          (super(), (this.state = e), t && ++e.refcount);
        }
        call(e, t) {
          return (
            t.dispose(), new ErrorStubHook(Error(`Cannot call methods on a ReadableStream stub`))
          );
        }
        map(e, t, n) {
          for (let e of t) e.dispose();
          return new ErrorStubHook(Error(`Cannot use map() on a ReadableStream`));
        }
        get(e) {
          return new ErrorStubHook(Error(`Cannot access properties on a ReadableStream stub`));
        }
        dup() {
          let e = this.state;
          if (!e) throw Error(`Attempted to dup a ReadableStreamStubHook after it was disposed.`);
          return new ReadableStreamStubHook(e, this);
        }
        pull() {
          return Promise.reject(Error(`Cannot pull a ReadableStream stub`));
        }
        ignoreUnhandledRejections() {}
        dispose() {
          let e = this.state;
          ((this.state = void 0),
            e &&
              --e.refcount === 0 &&
              (e.canceled ||
                ((e.canceled = !0),
                e.stream.locked ||
                  e.stream
                    .cancel(Error(`ReadableStream RPC stub was disposed without being consumed`))
                    .catch(() => {}))));
        }
        onBroken(e) {}
      }),
      (RE.createWritableStreamHook = iD.create),
      (RE.createWritableStreamFromHook = createWritableStreamFromHook),
      (RE.createReadableStreamHook = fD.create),
      (pD = PE));
  });
function concat(...e) {
  let t = e.reduce((e, { length: t }) => e + t, 0),
    n = new Uint8Array(t),
    r = 0;
  for (let t of e) (n.set(t, r), (r += t.length));
  return n;
}
function encode(e) {
  let t = new Uint8Array(e.length);
  for (let n = 0; n < e.length; n++) {
    let r = e.charCodeAt(n);
    if (r > 127) throw TypeError(`non-ASCII string encountered in encode()`);
    t[n] = r;
  }
  return t;
}
var hD,
  gD,
  _D,
  vD = __esmMin(() => {
    ((hD = new TextEncoder()),
      (gD = new TextDecoder()),
      (_D = new TextDecoder(`utf-8`, { fatal: !0 })));
  });
function checkUsage(e, t) {
  if (t && !e.usages.includes(t))
    throw TypeError(`CryptoKey does not support this operation, its usages must include ${t}.`);
}
function checkModulusLength(e, t) {
  let { modulusLength: n } = t.algorithm;
  if (typeof n != `number` || n < 2048)
    throw TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
}
function checkCryptoKey(e, t, n) {
  let r = e.algorithm;
  if (r.name !== t.name) throw unusable(t.name);
  if (t.hash && r.hash?.name !== t.hash) throw unusable(t.hash, `algorithm.hash`);
  if (t.namedCurve && r.namedCurve !== t.namedCurve)
    throw unusable(t.namedCurve, `algorithm.namedCurve`);
  if (t.length !== void 0 && r.length !== t.length) throw unusable(t.length, `algorithm.length`);
  checkUsage(e, n);
}
var unusable,
  yD = __esmMin(() => {
    unusable = (e, t = `algorithm.name`) =>
      TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`);
  });
function message(e, t, ...n) {
  if (n.length > 2) {
    let t = n.pop();
    e += `one of type ${n.join(`, `)}, or ${t}.`;
  } else n.length === 2 ? (e += `one of type ${n[0]} or ${n[1]}.`) : (e += `of type ${n[0]}.`);
  return (
    t == null
      ? (e += ` Received ${t}`)
      : typeof t == `function` && t.name
        ? (e += ` Received function ${t.name}`)
        : typeof t == `object` &&
          t &&
          t.constructor?.name &&
          (e += ` Received an instance of ${t.constructor.name}`),
    e
  );
}
var withAlg,
  bD = __esmMin(() => {
    withAlg = (e, t, ...n) => message(`Key for the ${e} algorithm must be `, t, ...n);
  }),
  JOSEError,
  JWTClaimValidationFailed,
  JWTExpired,
  JOSEAlgNotAllowed,
  JOSENotSupported,
  JWSInvalid,
  JWTInvalid,
  JWKSInvalid,
  JWKSNoMatchingKey,
  JWKSMultipleMatchingKeys,
  JWSSignatureVerificationFailed,
  xD = __esmMin(() => {
    ((JOSEError = class extends Error {
      static code = `ERR_JOSE_GENERIC`;
      code = `ERR_JOSE_GENERIC`;
      constructor(e, t) {
        (super(e, t),
          (this.name = this.constructor.name),
          Error.captureStackTrace?.(this, this.constructor));
      }
    }),
      (JWTClaimValidationFailed = class extends JOSEError {
        static code = `ERR_JWT_CLAIM_VALIDATION_FAILED`;
        code = `ERR_JWT_CLAIM_VALIDATION_FAILED`;
        claim;
        reason;
        payload;
        constructor(e, t, n = `unspecified`, r = `unspecified`) {
          (super(e, { cause: { claim: n, reason: r, payload: t } }),
            (this.claim = n),
            (this.reason = r),
            (this.payload = t));
        }
      }),
      (JWTExpired = class extends JOSEError {
        static code = `ERR_JWT_EXPIRED`;
        code = `ERR_JWT_EXPIRED`;
        claim;
        reason;
        payload;
        constructor(e, t, n = `unspecified`, r = `unspecified`) {
          (super(e, { cause: { claim: n, reason: r, payload: t } }),
            (this.claim = n),
            (this.reason = r),
            (this.payload = t));
        }
      }),
      (JOSEAlgNotAllowed = class extends JOSEError {
        static code = `ERR_JOSE_ALG_NOT_ALLOWED`;
        code = `ERR_JOSE_ALG_NOT_ALLOWED`;
      }),
      (JOSENotSupported = class extends JOSEError {
        static code = `ERR_JOSE_NOT_SUPPORTED`;
        code = `ERR_JOSE_NOT_SUPPORTED`;
      }),
      (JWSInvalid = class extends JOSEError {
        static code = `ERR_JWS_INVALID`;
        code = `ERR_JWS_INVALID`;
      }),
      (JWTInvalid = class extends JOSEError {
        static code = `ERR_JWT_INVALID`;
        code = `ERR_JWT_INVALID`;
      }),
      (JWKSInvalid = class extends JOSEError {
        static code = `ERR_JWKS_INVALID`;
        code = `ERR_JWKS_INVALID`;
      }),
      (JWKSNoMatchingKey = class extends JOSEError {
        static code = `ERR_JWKS_NO_MATCHING_KEY`;
        code = `ERR_JWKS_NO_MATCHING_KEY`;
        constructor(e = `no applicable key found in the JSON Web Key Set`, t) {
          super(e, t);
        }
      }),
      (JWKSMultipleMatchingKeys = class extends JOSEError {
        [Symbol.asyncIterator] = async function* () {};
        static code = `ERR_JWKS_MULTIPLE_MATCHING_KEYS`;
        code = `ERR_JWKS_MULTIPLE_MATCHING_KEYS`;
        constructor(e = `multiple matching keys found in the JSON Web Key Set`, t) {
          super(e, t);
        }
      }),
      (JWSSignatureVerificationFailed = class extends JOSEError {
        static code = `ERR_JWS_SIGNATURE_VERIFICATION_FAILED`;
        code = `ERR_JWS_SIGNATURE_VERIFICATION_FAILED`;
        constructor(e = `signature verification failed`, t) {
          super(e, t);
        }
      }));
  }),
  isCryptoKey,
  isKeyObject,
  isKeyLike,
  SD = __esmMin(() => {
    ((isCryptoKey = (e) => {
      if (e?.[Symbol.toStringTag] === `CryptoKey`) return !0;
      try {
        return e instanceof CryptoKey;
      } catch {
        return !1;
      }
    }),
      (isKeyObject = (e) => e?.[Symbol.toStringTag] === `KeyObject`),
      (isKeyLike = (e) => isCryptoKey(e) || isKeyObject(e)));
  });
function decodeBase64(e) {
  if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e);
  let t = atob(e),
    n = new Uint8Array(t.length);
  for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
  return n;
}
var CD = __esmMin(() => {});
function decode(e) {
  if (Uint8Array.fromBase64)
    try {
      return Uint8Array.fromBase64(typeof e == `string` ? e : gD.decode(e), {
        alphabet: `base64url`,
      });
    } catch (e) {
      throw TypeError(wD, { cause: e });
    }
  let t = e;
  if ((t instanceof Uint8Array && (t = gD.decode(t)), t.includes(`+`) || t.includes(`/`)))
    throw TypeError(wD);
  t = t.replace(/-/g, `+`).replace(/_/g, `/`);
  try {
    return decodeBase64(t);
  } catch {
    throw TypeError(wD);
  }
}
var wD,
  TD = __esmMin(() => {
    (vD(), CD(), (wD = `The input to be decoded is not correctly encoded.`));
  });
function isObject(e) {
  if (typeof e != `object` || !e || Object.prototype.toString.call(e) !== `[object Object]`)
    return !1;
  let t = Object.getPrototypeOf(e);
  if (t === null) return !0;
  let n = t;
  for (; Object.getPrototypeOf(n) !== null;) n = Object.getPrototypeOf(n);
  return t === n;
}
function isDisjoint(...e) {
  let t = new Set();
  for (let n of e)
    if (n)
      for (let e of Object.keys(n)) {
        if (t.has(e)) return !1;
        t.add(e);
      }
  return !0;
}
var isJWK,
  isPrivateJWK,
  isPublicJWK,
  isSecretJWK,
  ED = __esmMin(() => {
    ((isJWK = (e) => isObject(e) && typeof e.kty == `string`),
      (isPrivateJWK = (e) =>
        e.kty !== `oct` &&
        ((e.kty === `AKP` && typeof e.priv == `string`) || typeof e.d == `string`)),
      (isPublicJWK = (e) => e.kty !== `oct` && e.d === void 0 && e.priv === void 0),
      (isSecretJWK = (e) => e.kty === `oct` && typeof e.k == `string`));
  });
function decodeBase64url(e, t, n) {
  try {
    return decode(e);
  } catch {
    throw new n(`Failed to base64url decode the ${t}`);
  }
}
function encodeBase64url(e, t, n) {
  try {
    return encode(e);
  } catch {
    throw new n(`The ${t} is not a valid base64url string`);
  }
}
function parseJoseHeader(e, t, n) {
  let r;
  try {
    r = JSON.parse(_D.decode(decode(e)));
  } catch {
    throw new t(n);
  }
  if (!isObject(r)) throw new t(n);
  return r;
}
var DD = __esmMin(() => {
  (TD(), vD(), ED());
});
async function jwkToKey(e, t) {
  if (t.kty === `RSA` && `oth` in t && t.oth !== void 0)
    throw new JOSENotSupported(
      `RSA JWK "oth" (Other Primes Info) Parameter value is not supported`,
    );
  if (!e.kty.includes(t.kty))
    throw new JOSENotSupported(`Invalid or unsupported JWK "alg" (Algorithm) Parameter value`);
  let n = e.resolve?.({ kty: t.kty, crv: t.crv }) ?? e.subtle,
    r = !!(t.d || t.priv),
    i = { ...t };
  return (
    i.kty !== `AKP` && delete i.alg,
    delete i.use,
    crypto.subtle.importKey(`jwk`, i, n, t.ext ?? !r, t.key_ops ?? e.usages[+!!r])
  );
}
var OD = __esmMin(() => {
  xD();
});
function checkKeyType(e, t, n) {
  let { alg: r, secret: i } = e,
    a = n === `decrypt` || n === `sign`;
  if (i && t instanceof Uint8Array) return [kD, t];
  if (isJWK(t)) {
    if (i ? !isSecretJWK(t) : !(a ? isPrivateJWK(t) : isPublicJWK(t)))
      throw TypeError(
        i
          ? `JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`
          : `JSON Web Key for this operation must be a ${a ? `private` : `public`} JWK`,
      );
    return (jwkMatchesOp(e, t, n), [MD, t]);
  }
  if (!isKeyLike(t))
    throw TypeError(
      i
        ? withAlg(r, t, `CryptoKey`, `KeyObject`, `JSON Web Key`, `Uint8Array`)
        : withAlg(r, t, `CryptoKey`, `KeyObject`, `JSON Web Key`),
    );
  if (i) {
    if (t.type !== `secret`)
      throw TypeError(`${tag(t)} instances for symmetric algorithms must be of type "secret"`);
  } else {
    if (t.type === `secret`)
      throw TypeError(`${tag(t)} instances for asymmetric algorithms must not be of type "secret"`);
    let e = a ? `private` : `public`;
    if ((t.type === `public` || t.type === `private`) && t.type !== e) {
      let r = n === `sign` ? `signing` : n === `verify` ? `verifying` : `${n.slice(0, -1)}tion`;
      throw TypeError(`${tag(t)} instances for asymmetric algorithm ${r} must be of type "${e}"`);
    }
  }
  return isCryptoKey(t) ? [AD, t] : [jD, t];
}
function cached(e, t, n) {
  ND ||= new WeakMap();
  let r = ND.get(e);
  return (n && (r ? (r[t] = n) : ND.set(e, { __proto__: null, [t]: n })), n ?? r?.[t]);
}
async function prepareKey(e, t, n) {
  let r = checkKeyType(e, t, n);
  switch (r[0]) {
    case kD:
    case AD:
      return r[1];
    case MD: {
      let t = r[1];
      if (t.k) return decode(t.k);
      if (!Object.isFrozen(t)) {
        let { key_ops: e } = t;
        (Array.isArray(e) && Object.freeze(e), Object.freeze(t));
      }
      return handleJWK(t, t, e);
    }
    case jD: {
      let t = r[1];
      return t.type === `secret`
        ? t.export()
        : `toCryptoKey` in t && typeof t.toCryptoKey == `function`
          ? handleKeyObject(t, e)
          : handleJWK(t, t.export({ format: `jwk` }), e);
    }
  }
}
var tag,
  jwkMatchesOp,
  kD,
  AD,
  jD,
  MD,
  ND,
  PD,
  handleJWK,
  handleKeyObject,
  FD = __esmMin(() => {
    (bD(),
      SD(),
      ED(),
      TD(),
      OD(),
      (tag = (e) => e[Symbol.toStringTag]),
      (jwkMatchesOp = (e, t, n) => {
        let { alg: r } = e;
        if (t.use !== void 0) {
          let e = n === `sign` || n === `verify` ? `sig` : `enc`;
          if (t.use !== e)
            throw TypeError(
              `Invalid key for this operation, its "use" must be "${e}" when present`,
            );
        }
        if (t.alg !== void 0 && t.alg !== r)
          throw TypeError(`Invalid key for this operation, its "alg" must be "${r}" when present`);
        if (Array.isArray(t.key_ops)) {
          let r = n === `encrypt` || n === `decrypt` ? e.ops?.[n === `encrypt` ? 0 : 1] : n;
          if (r && !t.key_ops.includes(r))
            throw TypeError(
              `Invalid key for this operation, its "key_ops" must include "${r}" when present`,
            );
        }
      }),
      (kD = 0),
      (AD = 1),
      (jD = 2),
      (MD = 3),
      (PD = { __proto__: null, prime256v1: `P-256`, secp384r1: `P-384`, secp521r1: `P-521` }),
      (handleJWK = async (e, t, n) =>
        cached(e, n.alg) ?? cached(e, n.alg, await jwkToKey(n, { ...t, alg: n.alg }))),
      (handleKeyObject = (e, t) => {
        let n = cached(e, t.alg);
        if (n) return n;
        let r = e.type === `public`,
          i = t.usages[+!r],
          { asymmetricKeyType: a } = e,
          o = PD[e.asymmetricKeyDetails?.namedCurve],
          s = t.resolve?.({ crv: o, asymmetricKeyType: a }) ?? t.subtle;
        return cached(e, t.alg, e.toCryptoKey(s, r, i));
      }));
  });
function table(e) {
  let t = { __proto__: null };
  for (let n in e) t[n] = { ...e[n], alg: n };
  return t;
}
var ID = __esmMin(() => {});
function validateAlgorithms(e, t) {
  if (t !== void 0 && (!Array.isArray(t) || t.some((e) => typeof e != `string`)))
    throw TypeError(`"${e}" option must be an array of strings`);
  if (t) return new Set(t);
}
function validateCrit(e, t, n, r, i) {
  if (i.crit !== void 0 && r?.crit === void 0)
    throw new e(`"crit" (Critical) Header Parameter MUST be integrity protected`);
  if (!r || r.crit === void 0) return [];
  if (
    !Array.isArray(r.crit) ||
    r.crit.length === 0 ||
    r.crit.some((e) => typeof e != `string` || e.length === 0)
  )
    throw new e(
      `"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present`,
    );
  let a = n === void 0 ? t : { __proto__: null, ...n, ...t };
  for (let t of r.crit) {
    if (!(t in a))
      throw new JOSENotSupported(`Extension Header Parameter "${t}" is not recognized`);
    if (!Object.hasOwn(i, t) || i[t] === void 0)
      throw new e(`Extension Header Parameter "${t}" is missing`);
    if (a[t] && (!Object.hasOwn(r, t) || r[t] === void 0))
      throw new e(`Extension Header Parameter "${t}" MUST be integrity protected`);
  }
  return r.crit;
}
var LD,
  RD = __esmMin(() => {
    (xD(), (LD = { __proto__: null, b64: !0 }));
  });
async function getSigKey(e, t, n) {
  return t instanceof Uint8Array
    ? crypto.subtle.importKey(`raw`, t, e.subtle, !1, [n])
    : (checkCryptoKey(t, e.subtle, n), e.minRsaBits && checkModulusLength(e.alg, t), t);
}
async function verify(e, t, n, r) {
  let i = await getSigKey(e, t, `verify`);
  try {
    return await crypto.subtle.verify(e.signing, i, n, r);
  } catch {
    return !1;
  }
}
var zD = __esmMin(() => {
  yD();
});
function hmac(e) {
  let t = { name: `HMAC`, hash: `SHA-${e}` };
  return { kty: [`oct`], secret: !0, subtle: t, signing: t, usages: BD };
}
function rsa(e, t) {
  let n = { name: t ? `RSA-PSS` : `RSASSA-PKCS1-v1_5`, hash: `SHA-${e}` };
  return {
    kty: [`RSA`],
    subtle: n,
    signing: t ? { ...n, saltLength: t } : n,
    usages: BD,
    minRsaBits: 2048,
  };
}
function ecdsa(e, t) {
  return {
    kty: [`EC`],
    crv: e,
    subtle: { name: `ECDSA`, namedCurve: e },
    signing: { name: `ECDSA`, hash: `SHA-${t}` },
    usages: BD,
  };
}
function eddsa() {
  let e = { name: `Ed25519` };
  return { kty: [`OKP`], crv: `Ed25519`, subtle: e, signing: e, usages: BD };
}
function mldsa(e) {
  let t = { name: `ML-DSA-${e}` };
  return { kty: [`AKP`], subtle: t, signing: t, usages: BD };
}
function jwsAlgorithm(e) {
  let t = typeof e == `string` ? VD[e] : void 0;
  if (!t)
    throw new JOSENotSupported(
      `alg ${e} is not supported either by JOSE or your javascript runtime`,
    );
  return t;
}
var BD,
  VD,
  HD = __esmMin(() => {
    (xD(),
      ID(),
      (BD = [[`verify`], [`sign`]]),
      (VD = table({
        HS256: hmac(256),
        HS384: hmac(384),
        HS512: hmac(512),
        RS256: rsa(256),
        RS384: rsa(384),
        RS512: rsa(512),
        PS256: rsa(256, 32),
        PS384: rsa(384, 48),
        PS512: rsa(512, 64),
        ES256: ecdsa(`P-256`, 256),
        ES384: ecdsa(`P-384`, 384),
        ES512: ecdsa(`P-521`, 512),
        EdDSA: eddsa(),
        Ed25519: eddsa(),
        "ML-DSA-44": mldsa(44),
        "ML-DSA-65": mldsa(65),
        "ML-DSA-87": mldsa(87),
      })));
  });
function prepareVerify(e) {
  return [e && validateAlgorithms(`algorithms`, e.algorithms), e?.crit];
}
async function verifySignature(e, t, n) {
  let { protected: r, header: i, payload: a } = e,
    o = {};
  r && (o = parseJoseHeader(r, JWSInvalid, `JWS Protected Header is invalid`));
  let s;
  if (i !== void 0) {
    if (!isDisjoint(o, i))
      throw new JWSInvalid(
        `JWS Protected and JWS Unprotected Header Parameter names must be disjoint`,
      );
    s = { ...o, ...i };
  } else s = o;
  let c = validateCrit(JWSInvalid, LD, t[1], o, s),
    l = !0;
  if (c.includes(`b64`) && ((l = o.b64), typeof l != `boolean`))
    throw new JWSInvalid(`The "b64" (base64url-encode payload) Header Parameter must be a boolean`);
  let { alg: u } = s;
  if (typeof u != `string` || !u)
    throw new JWSInvalid(`JWS "alg" (Algorithm) Header Parameter missing or invalid`);
  if (t[0] && !t[0].has(u))
    throw new JOSEAlgNotAllowed(`"alg" (Algorithm) Header Parameter value not allowed`);
  if (l) {
    if (typeof a != `string`) throw new JWSInvalid(`JWS Payload must be a string`);
  } else if (typeof a != `string` && !(a instanceof Uint8Array))
    throw new JWSInvalid(`JWS Payload must be a string or an Uint8Array instance`);
  let d = !1;
  typeof n == `function` && ((n = await n(o, e)), (d = !0));
  let p = jwsAlgorithm(u),
    m = concat(
      r === void 0 ? new Uint8Array() : encode(r),
      encode(`.`),
      typeof a == `string`
        ? l
          ? (t[2] ??= encodeBase64url(a, `payload`, JWSInvalid))
          : hD.encode(a)
        : a,
    ),
    h = decodeBase64url(e.signature, `signature`, JWSInvalid),
    g = await prepareKey(p, n, `verify`);
  if (!(await verify(p, g, h, m))) throw new JWSSignatureVerificationFailed();
  let _;
  return (
    (_ = l ? decodeBase64url(a, `payload`, JWSInvalid) : typeof a == `string` ? hD.encode(a) : a),
    [_, o, l, g, d]
  );
}
async function verifyCompact(e, t, n) {
  if ((e instanceof Uint8Array && (e = gD.decode(e)), typeof e != `string`))
    throw new JWSInvalid(`Compact JWS must be a string or Uint8Array`);
  let { 0: r, 1: i, 2: a, length: o } = e.split(`.`);
  if (o !== 3) throw new JWSInvalid(`Invalid Compact JWS`);
  return verifySignature({ payload: i, protected: r, signature: a }, t, n);
}
var UD = __esmMin(() => {
  (zD(), HD(), xD(), vD(), DD(), ED(), RD(), FD());
});
function secs(e) {
  let t = GD.exec(e);
  if (!t || (t[4] && t[1])) throw TypeError(`Invalid time period format`);
  let n = parseFloat(t[2]),
    r = Math.round(n * WD[t[3][0].toLowerCase()]);
  return t[1] === `-` || t[4] === `ago` ? -r : r;
}
function validateInput(e, t) {
  if (!Number.isFinite(t)) throw TypeError(`Invalid ${e} input`);
  return t;
}
function validateNumericDate(e, t, n = !1) {
  let r = e[t];
  if (!(r === void 0 && !n)) {
    if (typeof r != `number`)
      throw new JWTClaimValidationFailed(`"${t}" claim must be a number`, e, t, `invalid`);
    return r;
  }
}
function unexpectedClaim(e, t) {
  throw new JWTClaimValidationFailed(`unexpected "${t}" claim value`, e, t, KD);
}
function validateClaimsSet(e, t, n = {}) {
  let r;
  try {
    r = JSON.parse(_D.decode(t));
  } catch {}
  if (!isObject(r)) throw new JWTInvalid(`JWT Claims Set must be a top-level JSON object`);
  let { typ: i } = n;
  if (i && (typeof e.typ != `string` || normalizeTyp(e.typ) !== normalizeTyp(i)))
    throw new JWTClaimValidationFailed(`unexpected "typ" JWT header value`, r, `typ`, KD);
  let { requiredClaims: a = [], issuer: o, subject: s, audience: c, maxTokenAge: l } = n,
    u = [...a];
  (l !== void 0 && u.push(`iat`),
    c !== void 0 && u.push(`aud`),
    s !== void 0 && u.push(`sub`),
    o !== void 0 && u.push(`iss`));
  for (let e of new Set(u.reverse()))
    if (!Object.hasOwn(r, e))
      throw new JWTClaimValidationFailed(`missing required "${e}" claim`, r, e, `missing`);
  (o !== void 0 && !(Array.isArray(o) ? o : [o]).includes(r.iss) && unexpectedClaim(r, `iss`),
    s !== void 0 && r.sub !== s && unexpectedClaim(r, `sub`),
    c !== void 0 &&
      !checkAudiencePresence(r.aud, typeof c == `string` ? [c] : c) &&
      unexpectedClaim(r, `aud`));
  let { clockTolerance: d } = n,
    p = 0;
  if (typeof d == `string`) p = secs(d);
  else if (d !== void 0) {
    if (typeof d != `number`) throw TypeError(`Invalid clockTolerance option type`);
    p = d;
  }
  validateInput(`clockTolerance option`, p);
  let { currentDate: m } = n,
    h = validateInput(`currentDate option`, epoch(m || new Date())),
    g = validateNumericDate(r, `iat`, l !== void 0),
    _ = validateNumericDate(r, `nbf`);
  if (_ !== void 0 && _ > h + p)
    throw new JWTClaimValidationFailed(`"nbf" claim timestamp check failed`, r, `nbf`, KD);
  let v = validateNumericDate(r, `exp`);
  if (v !== void 0 && v <= h - p)
    throw new JWTExpired(`"exp" claim timestamp check failed`, r, `exp`, KD);
  if (l !== void 0) {
    let e = h - g,
      t = typeof l == `number` ? l : secs(l);
    if (e - p > t)
      throw new JWTExpired(
        `"iat" claim timestamp check failed (too far in the past)`,
        r,
        `iat`,
        KD,
      );
    if (e < 0 - p)
      throw new JWTClaimValidationFailed(
        `"iat" claim timestamp check failed (it should be in the past)`,
        r,
        `iat`,
        KD,
      );
  }
  return r;
}
var epoch,
  WD,
  GD,
  KD,
  normalizeTyp,
  checkAudiencePresence,
  qD = __esmMin(() => {
    (xD(),
      vD(),
      ED(),
      (epoch = (e) => Math.floor(e.getTime() / 1e3)),
      (WD = { s: 1, m: 60, h: 3600, d: 86400, w: 604800, y: 31557600 }),
      (GD =
        /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i),
      (KD = `check_failed`),
      (normalizeTyp = (e) =>
        e.includes(`/`) ? e.toLowerCase() : `application/${e.toLowerCase()}`),
      (checkAudiencePresence = (e, t) =>
        typeof e == `string`
          ? t.includes(e)
          : Array.isArray(e)
            ? t.some((t) => e.includes(t))
            : !1));
  });
async function jwtVerify(e, t, n) {
  let r = await verifyCompact(e, prepareVerify(n), t);
  if (!r[2]) throw new JWTInvalid(`JWTs MUST NOT use unencoded payload`);
  let i = { payload: validateClaimsSet(r[1], r[0], n), protectedHeader: r[1] };
  return typeof t == `function` ? { ...i, key: r[3] } : i;
}
var JD = __esmMin(() => {
  (UD(), qD(), xD());
});
function signatureAlgorithm(e) {
  let t = typeof e == `string` ? VD[e] : void 0;
  if (!t || t.secret) throw new JOSENotSupported(`Unsupported "alg" value for a JSON Web Key Set`);
  return t;
}
function isJWKSLike(e) {
  if (!e || typeof e != `object`) return !1;
  let { keys: t } = e;
  return Array.isArray(t) && t.every(isObject);
}
async function importWithAlgCache(e, t, n) {
  let r = e.get(t) || e.set(t, { __proto__: null }).get(t);
  if (r[n.alg] === void 0) {
    let e = await jwkToKey(n, { ...t, alg: n.alg, ext: !0 });
    if (e.type !== `public`) throw new JWKSInvalid(`JSON Web Key Set members must be public keys`);
    r[n.alg] = e;
  }
  return r[n.alg];
}
function createLocalJWKSet(e) {
  let t = new LocalJWKSetImpl(e),
    localJWKSet = async (e, n) => t.getKey(e, n);
  return (
    Object.defineProperty(localJWKSet, "jwks", { value: () => structuredClone(t.jwks()) }),
    localJWKSet
  );
}
var LocalJWKSetImpl,
  YD = __esmMin(() => {
    (OD(),
      HD(),
      xD(),
      ED(),
      (LocalJWKSetImpl = class {
        #e;
        #t = new WeakMap();
        constructor(e) {
          if (!isJWKSLike(e)) throw new JWKSInvalid(`JSON Web Key Set malformed`);
          this.#e = structuredClone(e);
        }
        jwks() {
          return this.#e;
        }
        async getKey(e, t) {
          let { alg: n, kid: r } = { ...e, ...t?.header },
            i = signatureAlgorithm(n),
            a = this.#e.keys.filter(
              (e) =>
                i.kty.includes(e.kty) &&
                (typeof r != `string` || r === e.kid) &&
                (!(typeof e.alg == `string` || e.kty === `AKP`) || n === e.alg) &&
                (typeof e.use != `string` || e.use === `sig`) &&
                (!Array.isArray(e.key_ops) || e.key_ops.includes(`verify`)) &&
                (!i.crv || e.crv === i.crv),
            ),
            { 0: o, length: s } = a;
          if (s === 0) throw new JWKSNoMatchingKey();
          if (s !== 1) {
            let e = new JWKSMultipleMatchingKeys(),
              t = this.#t;
            throw (
              (e[Symbol.asyncIterator] = async function* () {
                for (let e of a)
                  try {
                    yield await importWithAlgCache(t, e, i);
                  } catch {}
              }),
              e
            );
          }
          return importWithAlgCache(this.#t, o, i);
        }
      }));
  }),
  XD = __esmMin(() => {
    (vD(),
      yD(),
      bD(),
      xD(),
      SD(),
      DD(),
      ED(),
      TD(),
      FD(),
      OD(),
      ID(),
      RD(),
      UD(),
      JD(),
      qD(),
      zD(),
      HD(),
      CD(),
      YD());
  });
async function getJwks(e) {
  if (!ZD || Date.now() - QD > $D) {
    let t = await e.AUTH.fetch(`https://auth.internal/api/auth/jwks`);
    if (!t.ok) throw Error(`jwks fetch failed: ${t.status}`);
    ((ZD = createLocalJWKSet(await t.json())), (QD = Date.now()));
  }
  return ZD;
}
async function verifyToken(e, t) {
  try {
    let { payload: n } = await jwtVerify(t, await getJwks(e));
    return typeof n.sub == `string` ? n.sub : null;
  } catch {
    ZD = null;
    try {
      let { payload: n } = await jwtVerify(t, await getJwks(e));
      return typeof n.sub == `string` ? n.sub : null;
    } catch {
      return null;
    }
  }
}
async function verifyUser(e, t) {
  let n = new URL(t.url),
    r = t.headers.get(`authorization`)?.replace(/^Bearer /, ``) ?? n.searchParams.get(`auth`);
  return r ? verifyToken(e, r) : null;
}
var ZD,
  QD,
  $D,
  eO = __esmMin(() => {
    (XD(), (ZD = null), (QD = 0), ($D = 600 * 1e3));
  }),
  AuthedApi,
  UserApi,
  tO = __esmMin(() => {
    (mD(),
      (AuthedApi = class extends pD {
        #e;
        constructor(e) {
          (super(), (this.#e = e));
        }
        profile() {
          return { id: this.#e, name: `User ${this.#e}` };
        }
        items(e) {
          return Array.from({ length: e }, (e, t) => ({
            id: t,
            title: `item-${t}`,
            owner: this.#e,
          }));
        }
      }),
      (UserApi = class extends pD {
        greet(e) {
          return `Hello, ${e}!`;
        }
        authenticate(e) {
          if (!e.startsWith(`tok-`)) throw Error(`bad token`);
          return new AuthedApi(e.slice(4));
        }
      }));
  }),
  nO,
  rO = __esmMin(() => {
    (jE(),
      mD(),
      eO(),
      tO(),
      (nO = {
        async fetch(e, t, n) {
          let r = new URL(e.url);
          if (r.pathname.startsWith(`/auth/`)) {
            let n = new URL(e.url);
            return (
              (n.pathname = r.pathname.replace(/^\/auth\//, `/api/auth/`)),
              t.AUTH.fetch(new Request(n, e))
            );
          }
          let i = matchSyncRequest(e);
          if (i !== void 0)
            return await handleSyncRequest({
              request: e,
              searchParams: i,
              env: t,
              ctx: n,
              syncBackendBinding: `SYNC_BACKEND_DO`,
              validatePayload: async (e, { storeId: n }) => {
                let r = typeof e == `object` && e && `authToken` in e ? e.authToken : void 0;
                if (typeof r != `string`) throw Error(`missing auth token`);
                let i = await verifyToken(t, r);
                if (!i) throw Error(`invalid auth token`);
                if (n !== i) throw Error(`forbidden: not your store`);
              },
            });
          if (r.pathname === `/do/rpc`) {
            let n = await verifyUser(t, e);
            return n
              ? t.USER_DO.getByName(n).fetch(e)
              : Response.json({ error: `unauthorized` }, { status: 401 });
          }
          if (r.pathname === `/rpc`) return newWorkersRpcResponse(e, new UserApi());
          if (r.pathname.startsWith(`/agents/`)) {
            let n = await verifyUser(t, e);
            if (!n) return Response.json({ error: `unauthorized` }, { status: 401 });
            let r = new Headers(e.headers);
            return (
              r.set(`x-user-id`, n),
              t.AGENT.fetch(new Request(e.url, new Request(e, { headers: r })))
            );
          }
          return t.ASSETS
            ? t.ASSETS.fetch(e)
            : new Response(`flue-alchemy-demo front worker (no SPA yet)`, { status: 200 });
        },
      }));
  }),
  iO;
__esmMin(() => {
  (rO(), rO(), (iO = nO ?? {}));
})();
export { iO as default };

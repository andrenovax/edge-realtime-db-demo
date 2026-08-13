import "cloudflare:workers";
var e = Object.defineProperty,
  __name = (t, n) => e(t, `name`, { value: n, configurable: !0 }),
  __esmMin = (e, t, n) => () => {
    if (n) throw n[0];
    try {
      return (e && (t = e((e = 0))), t);
    } catch (e) {
      throw ((n = [e]), e);
    }
  },
  t = __esmMin(() => {});
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
var n,
  dual,
  identity,
  constant,
  r,
  i,
  a,
  o,
  s = __esmMin(() => {
    ((n = __name((e) => typeof e == `function`, `isFunction`)),
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
      (r = constant(!0)),
      (i = constant(!1)),
      (a = constant(void 0)),
      (o = a));
  }),
  c,
  isStrictEquivalent,
  strict,
  l,
  u,
  d,
  p,
  m = __esmMin(() => {
    (s(),
      (c = __name((e) => (t, n) => t === n || e(t, n), `make`)),
      (isStrictEquivalent = (e, t) => e === t),
      (strict = () => isStrictEquivalent),
      (l = strict()),
      (u = dual(2, (e, t) => c((n, r) => e(t(n), t(r))))),
      (d = u(l, (e) => e.getTime())),
      (p = __name(
        (e) =>
          c((t, n) => {
            if (t.length !== n.length) return !1;
            for (let r = 0; r < t.length; r++) if (!e(t[r], n[r])) return !1;
            return !0;
          }),
        `array`,
      )));
  }),
  h,
  g,
  globalValue,
  _ = __esmMin(() => {
    ((h = `effect/GlobalValue`),
      (globalValue = (e, t) => (
        (g ||= ((globalThis[h] ??= new Map()), globalThis[h])),
        g.has(e) || g.set(e, t()),
        g.get(e)
      )));
  }),
  isTruthy,
  isString,
  isNumber,
  isBoolean,
  isBigInt,
  isSymbol,
  v,
  isUndefined,
  isNever,
  isRecordOrArray,
  y,
  b,
  ee,
  isNullable,
  isNotNullable,
  isUint8Array,
  isDate,
  isIterable,
  isRecord,
  isPromiseLike,
  x = __esmMin(() => {
    (s(),
      (isTruthy = (e) => !!e),
      (isString = (e) => typeof e == `string`),
      (isNumber = (e) => typeof e == `number`),
      (isBoolean = (e) => typeof e == `boolean`),
      (isBigInt = (e) => typeof e == `bigint`),
      (isSymbol = (e) => typeof e == `symbol`),
      (v = n),
      (isUndefined = (e) => e === void 0),
      (isNever = (e) => !1),
      (isRecordOrArray = (e) => typeof e == `object` && !!e),
      (y = __name((e) => isRecordOrArray(e) || v(e), `isObject`)),
      (b = dual(2, (e, t) => y(e) && t in e)),
      (ee = dual(2, (e, t) => b(e, `_tag`) && e._tag === t)),
      (isNullable = (e) => e == null),
      (isNotNullable = (e) => e != null),
      (isUint8Array = (e) => e instanceof Uint8Array),
      (isDate = (e) => e instanceof Date),
      (isIterable = (e) => typeof e == `string` || b(e, Symbol.iterator)),
      (isRecord = (e) => isRecordOrArray(e) && !Array.isArray(e)),
      (isPromiseLike = (e) => b(e, `then`) && v(e.then)));
  }),
  getBugErrorMessage,
  te = __esmMin(() => {
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
  if (typeof e == `object` && e && le in e) return e[le]();
  throw Error(getBugErrorMessage(`yieldWrapGet`));
}
var ne,
  re,
  ie,
  ae,
  oe,
  se,
  ce,
  PCGRandom,
  le,
  YieldWrap,
  ue,
  de,
  fe,
  pe,
  me,
  he = __esmMin(() => {
    (_(),
      te(),
      x(),
      (ne = class SingleShotGen$1 {
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
      (re = 335903614),
      (ie = 4150755663),
      (ae = 1481765933),
      (oe = 1284865837),
      (se = 9007199254740992),
      (ce = 134217728),
      (PCGRandom = class {
        _state;
        constructor(e, t, n, r) {
          return (
            isNullable(t) && isNullable(e)
              ? ((t = (Math.random() * 4294967295) >>> 0), (e = 0))
              : isNullable(t) && ((t = e), (e = 0)),
            isNullable(r) && isNullable(n)
              ? ((r = this._state ? this._state[3] : ie), (n = this._state ? this._state[2] : re))
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
          return (e * ce + t) / se;
        }
        _next() {
          let e = this._state[0] >>> 0,
            t = this._state[1] >>> 0;
          (mul64(this._state, e, t, ae, oe),
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
      (le = Symbol.for(`effect/Utils/YieldWrap`)),
      (YieldWrap = class {
        #e;
        constructor(e) {
          this.#e = e;
        }
        [le]() {
          return this.#e;
        }
      }),
      (ue = globalValue(`effect/Utils/isStructuralRegion`, () => ({
        enabled: !1,
        tester: void 0,
      }))),
      (de = { effect_internal_function: (e) => e() }),
      (fe = {
        effect_internal_function: (e) => {
          try {
            return e();
          } finally {
          }
        },
      }),
      (pe =
        de.effect_internal_function(() => Error().stack)?.includes(`effect_internal_function`) ===
        !0),
      (me = pe ? de.effect_internal_function : fe.effect_internal_function),
      function* () {}.constructor);
  }),
  ge,
  S,
  hash,
  random,
  C,
  optimize,
  isHash,
  _e,
  string,
  structureKeys,
  structure,
  array,
  w,
  T = __esmMin(() => {
    (s(),
      _(),
      x(),
      he(),
      (ge = globalValue(Symbol.for(`effect/Hash/randomHashCache`), () => new WeakMap())),
      (S = Symbol.for(`effect/Hash`)),
      (hash = (e) => {
        if (ue.enabled === !0) return 0;
        switch (typeof e) {
          case `number`:
            return _e(e);
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
        ge.has(e) || ge.set(e, _e(Math.floor(Math.random() * (2 ** 53 - 1)))),
        ge.get(e)
      )),
      (C = __name((e) => (t) => (t * 53) ^ e, `combine`)),
      (optimize = (e) => (e & 3221225471) | ((e >>> 1) & 1073741824)),
      (isHash = (e) => b(e, S)),
      (_e = __name((e) => {
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
        return hash(e) === hash(t) && e[E](t) ? !0 : ue.enabled && ue.tester ? ue.tester(e, t) : !1;
      if (e instanceof Date && t instanceof Date) {
        let n = e.getTime(),
          r = t.getTime();
        return n === r || (Number.isNaN(n) && Number.isNaN(r));
      } else if (e instanceof URL && t instanceof URL) return e.href === t.href;
    }
    if (ue.enabled) {
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
            if (!(r in t && compareBoth(e[r], t[r]))) return ue.tester ? ue.tester(e, t) : !1;
          return !0;
        }
      }
      return ue.tester ? ue.tester(e, t) : !1;
    }
  }
  return ue.enabled && ue.tester ? ue.tester(e, t) : !1;
}
var E,
  isEqual,
  equivalence,
  D = __esmMin(() => {
    (T(),
      x(),
      he(),
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
      if (r.has(e)) return ve;
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
      v(e.toString) &&
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
      return r.has(e) ? ve : (r.add(e), `${e.constructor.name}(${go(Array.from(e), n)})`);
    if (y(e)) {
      if (r.has(e)) return ve;
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
  ve,
  k,
  toStringUnknown,
  stringifyCircular,
  ye,
  isRedactable,
  be,
  withRedactableContext,
  redact,
  A = __esmMin(() => {
    (_(),
      x(),
      (O = Symbol.for(`nodejs.util.inspect.custom`)),
      (toJSON = (e) => {
        try {
          if (b(e, `toJSON`) && v(e.toJSON) && e.toJSON.length === 0) return e.toJSON();
          if (Array.isArray(e)) return e.map(toJSON);
        } catch {
          return {};
        }
        return redact(e);
      }),
      (ve = `[Circular]`),
      __name(formatPropertyKey$1, `formatPropertyKey`),
      (k = __name((e) => JSON.stringify(e, null, 2), `format`)),
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
                    (be.fiberRefs !== void 0 && isRedactable(t) ? t[ye](be.fiberRefs) : t)
                : t,
            t,
          );
        return ((n = void 0), r);
      }),
      (ye = Symbol.for(`effect/Inspectable/Redactable`)),
      (isRedactable = (e) => typeof e == `object` && !!e && ye in e),
      (be = globalValue(`effect/Inspectable/redactableState`, () => ({ fiberRefs: void 0 }))),
      (withRedactableContext = (e, t) => {
        let n = be.fiberRefs;
        be.fiberRefs = e;
        try {
          return t();
        } finally {
          be.fiberRefs = n;
        }
      }),
      (redact = (e) => (isRedactable(e) && be.fiberRefs !== void 0 ? e[ye](be.fiberRefs) : e)));
  }),
  pipeArguments,
  j = __esmMin(() => {
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
  xe,
  Se,
  Ce,
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
  Fe = __esmMin(() => {
    ((xe = `Async`),
      (Se = `Commit`),
      (Ce = `Failure`),
      (we = `OnFailure`),
      (Te = `OnSuccess`),
      (Ee = `OnSuccessAndFailure`),
      (De = `Success`),
      (Oe = `Sync`),
      (ke = `UpdateRuntimeFlags`),
      (Ae = `While`),
      (je = `Iterator`),
      (Me = `WithRuntime`),
      (Ne = `Yield`),
      (Pe = `RevertFlags`));
  }),
  Ie,
  getCurrentVersion,
  Le = __esmMin(() => {
    ((Ie = `3.22.1`), (getCurrentVersion = () => Ie));
  }),
  Re,
  ze,
  Be,
  Ve,
  He,
  Ue,
  We,
  Ge,
  Ke,
  qe,
  Je,
  Ye,
  Xe = __esmMin(() => {
    (D(),
      T(),
      j(),
      he(),
      Fe(),
      Le(),
      (Re = Symbol.for(`effect/Effect`)),
      (ze = Symbol.for(`effect/Stream`)),
      (Be = Symbol.for(`effect/Sink`)),
      (Ve = Symbol.for(`effect/Channel`)),
      (He = { _R: (e) => e, _E: (e) => e, _A: (e) => e, _V: getCurrentVersion() }),
      (Ue = { _A: (e) => e, _In: (e) => e, _L: (e) => e, _E: (e) => e, _R: (e) => e }),
      (We = {
        _Env: (e) => e,
        _InErr: (e) => e,
        _InElem: (e) => e,
        _InDone: (e) => e,
        _OutErr: (e) => e,
        _OutElem: (e) => e,
        _OutDone: (e) => e,
      }),
      (Ge = {
        [Re]: He,
        [ze]: He,
        [Be]: Ue,
        [Ve]: We,
        [E](e) {
          return this === e;
        },
        [S]() {
          return w(this, random(this));
        },
        [Symbol.iterator]() {
          return new ne(new YieldWrap(this));
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (Ke = {
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
      (qe = { ...Ge, _op: Se }),
      (Je = { ...qe, ...Ke }),
      (Ye = (function () {
        function Base() {}
        return ((Base.prototype = qe), Base);
      })()));
  }),
  Ze,
  Qe,
  $e,
  et,
  tt,
  nt,
  rt,
  it,
  at,
  ot,
  st = __esmMin(() => {
    (D(),
      T(),
      A(),
      x(),
      Xe(),
      (Ze = Symbol.for(`effect/Option`)),
      (Qe = {
        ...Ge,
        [Ze]: { _A: (e) => e },
        [O]() {
          return this.toJSON();
        },
        toString() {
          return k(this.toJSON());
        },
      }),
      ($e = Object.assign(Object.create(Qe), {
        _tag: `Some`,
        _op: `Some`,
        [E](e) {
          return nt(e) && it(e) && equals$2(this.value, e.value);
        },
        [S]() {
          return w(this, C(hash(this._tag))(hash(this.value)));
        },
        toJSON() {
          return { _id: `Option`, _tag: this._tag, value: toJSON(this.value) };
        },
      })),
      (et = hash(`None`)),
      (tt = Object.assign(Object.create(Qe), {
        _tag: `None`,
        _op: `None`,
        [E](e) {
          return nt(e) && rt(e);
        },
        [S]() {
          return et;
        },
        toJSON() {
          return { _id: `Option`, _tag: this._tag };
        },
      })),
      (nt = __name((e) => b(e, Ze), `isOption`)),
      (rt = __name((e) => e._tag === `None`, `isNone`)),
      (it = __name((e) => e._tag === `Some`, `isSome`)),
      (at = Object.create(tt)),
      (ot = __name((e) => {
        let t = Object.create($e);
        return ((t.value = e), t);
      }, `some`)));
  }),
  ct,
  lt,
  ut,
  dt,
  ft,
  pt,
  mt,
  ht,
  gt,
  _t,
  vt = __esmMin(() => {
    (D(),
      s(),
      T(),
      A(),
      x(),
      Xe(),
      st(),
      (ct = Symbol.for(`effect/Either`)),
      (lt = {
        ...Ge,
        [ct]: { _R: (e) => e },
        [O]() {
          return this.toJSON();
        },
        toString() {
          return k(this.toJSON());
        },
      }),
      (ut = Object.assign(Object.create(lt), {
        _tag: `Right`,
        _op: `Right`,
        [E](e) {
          return ft(e) && mt(e) && equals$2(this.right, e.right);
        },
        [S]() {
          return C(hash(this._tag))(hash(this.right));
        },
        toJSON() {
          return { _id: `Either`, _tag: this._tag, right: toJSON(this.right) };
        },
      })),
      (dt = Object.assign(Object.create(lt), {
        _tag: `Left`,
        _op: `Left`,
        [E](e) {
          return ft(e) && pt(e) && equals$2(this.left, e.left);
        },
        [S]() {
          return C(hash(this._tag))(hash(this.left));
        },
        toJSON() {
          return { _id: `Either`, _tag: this._tag, left: toJSON(this.left) };
        },
      })),
      (ft = __name((e) => b(e, ct), `isEither`)),
      (pt = __name((e) => e._tag === `Left`, `isLeft`)),
      (mt = __name((e) => e._tag === `Right`, `isRight`)),
      (ht = __name((e) => {
        let t = Object.create(dt);
        return ((t.left = e), t);
      }, `left`)),
      (gt = __name((e) => {
        let t = Object.create(ut);
        return ((t.right = e), t);
      }, `right`)),
      (_t = dual(2, (e, t) => (rt(e) ? ht(t()) : gt(e.value)))));
  }),
  M,
  N,
  yt,
  try_,
  bt,
  P,
  xt,
  St,
  Ct,
  wt,
  Tt,
  Et,
  Dt,
  Ot,
  kt = __esmMin(() => {
    (s(),
      vt(),
      x(),
      (M = gt),
      (N = ht),
      (yt = _t),
      (try_ = (e) => {
        if (v(e))
          try {
            return M(e());
          } catch (e) {
            return N(e);
          }
        else
          try {
            return M(e.try());
          } catch (t) {
            return N(e.catch(t));
          }
      }),
      (bt = ft),
      (P = pt),
      (xt = mt),
      (St = dual(2, (e, { onLeft: t, onRight: n }) => (P(e) ? N(t(e.left)) : M(n(e.right))))),
      (Ct = dual(2, (e, t) => (P(e) ? N(t(e.left)) : M(e.right)))),
      (wt = dual(2, (e, t) => (xt(e) ? M(t(e.right)) : N(e.left)))),
      (Tt = dual(2, (e, { onLeft: t, onRight: n }) => (P(e) ? t(e.left) : n(e.right)))),
      (Et = Tt({ onLeft: identity, onRight: identity })),
      (Dt = dual(2, (e, t) => {
        if (xt(e)) return e.right;
        throw t(e.left);
      })),
      (Ot = Dt(() => Error(`getOrThrow called on a Left`))));
  }),
  At,
  jt = __esmMin(() => {
    At = __name((e) => e.length > 0, `isNonEmptyArray`);
  }),
  Mt,
  Nt,
  Pt,
  Ft,
  It = __esmMin(() => {
    (s(),
      (Mt = __name((e) => (t, n) => (t === n ? 0 : e(t, n)), `make`)),
      (Nt = Mt((e, t) => (e < t ? -1 : 1))),
      (Pt = dual(2, (e, t) => Mt((n, r) => e(t(n), t(r))))),
      (Ft = __name((e) => dual(2, (t, n) => e(t, n) === 1), `greaterThan`)));
  }),
  F,
  I,
  Lt,
  L,
  R,
  Rt,
  z,
  zt,
  Bt,
  fromNullable,
  Vt,
  liftThrowable,
  Ht,
  Ut,
  Wt,
  Gt,
  Kt,
  qt,
  Jt,
  containsWith,
  Yt,
  Xt,
  Zt,
  B = __esmMin(() => {
    (D(),
      m(),
      s(),
      st(),
      (F = __name(() => at, `none`)),
      (I = ot),
      (Lt = nt),
      (L = rt),
      (R = it),
      (Rt = dual(2, (e, { onNone: t, onSome: n }) => (L(e) ? t() : n(e.value)))),
      (z = dual(2, (e, t) => (L(e) ? t() : e.value))),
      (zt = dual(2, (e, t) => (L(e) ? t() : e))),
      (Bt = dual(2, (e, t) => (L(e) ? I(t()) : e))),
      (fromNullable = (e) => (e == null ? F() : I(e))),
      (Vt = z(a)),
      (liftThrowable =
        (e) =>
        (...t) => {
          try {
            return I(e(...t));
          } catch {
            return F();
          }
        }),
      (Ht = dual(2, (e, t) => {
        if (R(e)) return e.value;
        throw t();
      })),
      (Ut = dual(2, (e, t) => (L(e) ? F() : I(t(e.value))))),
      (Wt = dual(2, (e, t) => (L(e) ? F() : t(e.value)))),
      (Gt = dual(2, (e, t) => (L(e) ? F() : fromNullable(t(e.value))))),
      (Kt = Wt),
      (qt = dual(2, (e, t) => Kt(e, (e) => (t(e) ? ot(e) : at)))),
      (Jt = __name(
        (e) => c((t, n) => (L(t) ? L(n) : !L(n) && e(t.value, n.value))),
        `getEquivalence`,
      )),
      (containsWith = (e) => dual(2, (t, n) => !L(t) && e(t.value, n))),
      (Yt = equivalence()),
      (Xt = containsWith(Yt)),
      (Zt = dual(2, (e, t) => !L(e) && t(e.value))));
  }),
  Qt,
  $t = __esmMin(() => {
    (x(), (Qt = __name((...e) => e, `make`)));
  }),
  allocate,
  en,
  V,
  ensure,
  tn,
  nn,
  rn,
  an,
  on,
  isEmptyArray,
  sn,
  cn,
  H,
  isOutOfBounds,
  clamp,
  ln,
  un,
  dn,
  pn,
  last,
  lastNonEmpty,
  mn,
  spanIndex,
  hn,
  gn,
  _n,
  vn,
  yn,
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
  unfold,
  Pn,
  Fn,
  dedupe,
  In,
  U = __esmMin(() => {
    (D(),
      m(),
      s(),
      jt(),
      B(),
      $t(),
      (allocate = (e) => Array(e)),
      (en = dual(2, (e, t) => {
        let n = Math.max(1, Math.floor(e)),
          r = Array(n);
        for (let e = 0; e < n; e++) r[e] = t(e);
        return r;
      })),
      (V = __name((e) => (Array.isArray(e) ? e : Array.from(e)), `fromIterable`)),
      (ensure = (e) => (Array.isArray(e) ? e : [e])),
      (tn = dual(2, (e, { onEmpty: t, onNonEmpty: n }) => (H(e) ? n(pn(e), mn(e)) : t()))),
      (nn = dual(2, (e, t) => [t, ...e])),
      (rn = dual(2, (e, t) => [...e, t])),
      (an = dual(2, (e, t) => V(e).concat(V(t)))),
      (on = Array.isArray),
      (isEmptyArray = (e) => e.length === 0),
      (sn = isEmptyArray),
      (cn = At),
      (H = At),
      (isOutOfBounds = (e, t) => e < 0 || e >= t.length),
      (clamp = (e, t) => Math.floor(Math.min(Math.max(0, e), t.length))),
      (ln = dual(2, (e, t) => {
        let n = Math.floor(t);
        return isOutOfBounds(n, e) ? F() : I(e[n]);
      })),
      (un = dual(2, (e, t) => {
        let n = Math.floor(t);
        if (isOutOfBounds(n, e)) throw Error(`Index ${n} out of bounds`);
        return e[n];
      })),
      (dn = ln(0)),
      (pn = un(0)),
      (last = (e) => (H(e) ? I(lastNonEmpty(e)) : F())),
      (lastNonEmpty = (e) => e[e.length - 1]),
      (mn = __name((e) => e.slice(1), `tailNonEmpty`)),
      (spanIndex = (e, t) => {
        let n = 0;
        for (let r of e) {
          if (!t(r, n)) break;
          n++;
        }
        return n;
      }),
      (hn = dual(2, (e, t) => Sn(e, spanIndex(e, t)))),
      (gn = dual(2, (e, t) => {
        let n = V(e);
        return n.slice(clamp(t, n), n.length);
      })),
      (_n = __name((e) => Array.from(e).reverse(), `reverse`)),
      (vn = dual(2, (e, t) => {
        let n = Array.from(e);
        return (n.sort(t), n);
      })),
      (yn = dual(2, (e, t) => bn(e, t, Qt))),
      (bn = dual(3, (e, t, n) => {
        let r = V(e),
          i = V(t);
        if (H(r) && H(i)) {
          let e = [n(pn(r), pn(i))],
            t = Math.min(r.length, i.length);
          for (let a = 1; a < t; a++) e[a] = n(r[a], i[a]);
          return e;
        }
        return [];
      })),
      (xn = equivalence()),
      (Sn = dual(2, (e, t) => {
        let n = Array.from(e),
          r = Math.floor(t);
        return H(n) ? (r >= 1 ? Cn(n, r) : [[], n]) : [n, []];
      })),
      (Cn = dual(2, (e, t) => {
        let n = Math.max(1, Math.floor(t));
        return n >= e.length ? [wn(e), []] : [nn(e.slice(1, n), pn(e)), e.slice(n)];
      })),
      (wn = __name((e) => e.slice(), `copy`)),
      (Tn = dual(3, (e, t, n) => {
        let r = V(e),
          i = V(t);
        return H(r) ? (H(i) ? Fn(n)(an(r, i)) : r) : i;
      })),
      (En = dual(2, (e, t) => Tn(e, t, xn))),
      (Dn = __name(() => [], `empty`)),
      (On = __name((e) => [e], `of`)),
      (kn = dual(2, (e, t) => e.map(t))),
      (An = dual(2, (e, t) => {
        if (sn(e)) return [];
        let n = [];
        for (let r = 0; r < e.length; r++) {
          let i = t(e[r], r);
          for (let e = 0; e < i.length; e++) n.push(i[e]);
        }
        return n;
      })),
      (jn = An(identity)),
      (Mn = dual(2, (e, t) => {
        let n = V(e),
          r = [];
        for (let e = 0; e < n.length; e++) {
          let i = t(n[e], e);
          R(i) && r.push(i.value);
        }
        return r;
      })),
      (Nn = dual(3, (e, t, n) => V(e).reduce((e, t, r) => n(e, t, r), t))),
      (unfold = (e, t) => {
        let n = [],
          r = e,
          i;
        for (; R((i = t(r)));) {
          let [e, t] = i.value;
          (n.push(e), (r = t));
        }
        return n;
      }),
      (Pn = p),
      (Fn = dual(2, (e, t) => {
        let n = V(e);
        if (H(n)) {
          let e = [pn(n)],
            r = mn(n);
          for (let n of r) e.every((e) => !t(n, e)) && e.push(n);
          return e;
        }
        return [];
      })),
      (dedupe = (e) => Fn(e, equivalence())),
      (In = dual(2, (e, t) => V(e).join(t))));
  });
function copy(e, t, n, r, i) {
  for (let a = t; a < Math.min(e.length, t + i); a++) n[r + a - t] = e[a];
  return n;
}
var Ln,
  Rn,
  zn,
  Bn,
  Vn,
  makeChunk,
  isChunk,
  Hn,
  Un,
  Wn,
  Gn,
  Kn,
  copyToArray,
  toReadonlyArray_,
  qn,
  reverseChunk,
  Jn,
  unsafeFromArray,
  unsafeFromNonEmptyArray,
  Yn,
  Xn,
  Zn,
  Qn,
  $n,
  er,
  tr,
  unsafeHead,
  nr,
  tailNonEmpty,
  rr = __esmMin(() => {
    (U(),
      D(),
      m(),
      s(),
      T(),
      A(),
      j(),
      x(),
      (Ln = Symbol.for(`effect/Chunk`)),
      (Rn = []),
      (zn = __name(
        (e) => c((t, n) => t.length === n.length && qn(t).every((t, r) => e(t, Yn(n, r)))),
        `getEquivalence`,
      )),
      (Bn = zn(equals$2)),
      (Vn = {
        [Ln]: { _A: (e) => e },
        toString() {
          return k(this.toJSON());
        },
        toJSON() {
          return { _id: `Chunk`, values: qn(this).map(toJSON) };
        },
        [O]() {
          return this.toJSON();
        },
        [E](e) {
          return isChunk(e) && Bn(this, e);
        },
        [S]() {
          return w(this, array(qn(this)));
        },
        [Symbol.iterator]() {
          switch (this.backing._tag) {
            case `IArray`:
              return this.backing.array[Symbol.iterator]();
            case `IEmpty`:
              return Rn[Symbol.iterator]();
            default:
              return qn(this)[Symbol.iterator]();
          }
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (makeChunk = (e) => {
        let t = Object.create(Vn);
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
            ((t.length = e.array.length), (t.depth = 0), (t.left = Hn), (t.right = Hn));
            break;
          case `ISingleton`:
            ((t.length = 1), (t.depth = 0), (t.left = Hn), (t.right = Hn));
            break;
          case `ISlice`:
            ((t.length = e.length), (t.depth = e.chunk.depth + 1), (t.left = Hn), (t.right = Hn));
            break;
        }
        return t;
      }),
      (isChunk = (e) => b(e, Ln)),
      (Hn = makeChunk({ _tag: `IEmpty` })),
      (Un = __name(() => Hn, `empty`)),
      (Wn = __name((...e) => unsafeFromNonEmptyArray(e), `make`)),
      (Gn = __name((e) => makeChunk({ _tag: `ISingleton`, a: e }), `of`)),
      (Kn = __name((e) => (isChunk(e) ? e : unsafeFromArray(V(e))), `fromIterable`)),
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
            for (; r < e.length;) ((t[i] = Yn(e, r)), (r += 1), (i += 1));
            break;
          }
        }
      }),
      (toReadonlyArray_ = (e) => {
        switch (e.backing._tag) {
          case `IEmpty`:
            return Rn;
          case `IArray`:
            return e.backing.array;
          default: {
            let t = Array(e.length);
            return (
              copyToArray(e, t, 0),
              (e.backing = { _tag: `IArray`, array: t }),
              (e.left = Hn),
              (e.right = Hn),
              (e.depth = 0),
              t
            );
          }
        }
      }),
      (qn = toReadonlyArray_),
      (reverseChunk = (e) => {
        switch (e.backing._tag) {
          case `IEmpty`:
          case `ISingleton`:
            return e;
          case `IArray`:
            return makeChunk({ _tag: `IArray`, array: _n(e.backing.array) });
          case `IConcat`:
            return makeChunk({
              _tag: `IConcat`,
              left: Jn(e.backing.right),
              right: Jn(e.backing.left),
            });
          case `ISlice`:
            return unsafeFromArray(_n(qn(e)));
        }
      }),
      (Jn = reverseChunk),
      (unsafeFromArray = (e) =>
        e.length === 0
          ? Un()
          : e.length === 1
            ? Gn(e[0])
            : makeChunk({ _tag: `IArray`, array: e })),
      (unsafeFromNonEmptyArray = (e) => unsafeFromArray(e)),
      (Yn = dual(2, (e, t) => {
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
            return t < e.left.length ? Yn(e.left, t) : Yn(e.right, t - e.left.length);
          case `ISlice`:
            return Yn(e.backing.chunk, t + e.backing.offset);
        }
      })),
      (Xn = dual(2, (e, t) => $n(e, Gn(t)))),
      (Zn = dual(2, (e, t) => $n(Gn(t), e))),
      (Qn = dual(2, (e, t) => {
        if (t <= 0) return e;
        if (t >= e.length) return Hn;
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
              ? Qn(e.right, t - e.left.length)
              : makeChunk({ _tag: `IConcat`, left: Qn(e.left, t), right: e.right });
          default:
            return makeChunk({ _tag: `ISlice`, chunk: e, offset: t, length: e.length - t });
        }
      })),
      ($n = dual(2, (e, t) => {
        if (e.backing._tag === `IEmpty`) return t;
        if (t.backing._tag === `IEmpty`) return e;
        let n = t.depth - e.depth;
        if (Math.abs(n) <= 1) return makeChunk({ _tag: `IConcat`, left: e, right: t });
        if (n < -1)
          if (e.left.depth >= e.right.depth) {
            let n = $n(e.right, t);
            return makeChunk({ _tag: `IConcat`, left: e.left, right: n });
          } else {
            let n = $n(e.right.right, t);
            if (n.depth === e.depth - 3) {
              let t = makeChunk({ _tag: `IConcat`, left: e.right.left, right: n });
              return makeChunk({ _tag: `IConcat`, left: e.left, right: t });
            } else {
              let t = makeChunk({ _tag: `IConcat`, left: e.left, right: e.right.left });
              return makeChunk({ _tag: `IConcat`, left: t, right: n });
            }
          }
        else if (t.right.depth >= t.left.depth) {
          let n = $n(e, t.left);
          return makeChunk({ _tag: `IConcat`, left: n, right: t.right });
        } else {
          let n = $n(e, t.left.left);
          if (n.depth === t.depth - 3) {
            let e = makeChunk({ _tag: `IConcat`, left: n, right: t.left.right });
            return makeChunk({ _tag: `IConcat`, left: e, right: t.right });
          } else {
            let e = makeChunk({ _tag: `IConcat`, left: t.left.right, right: t.right });
            return makeChunk({ _tag: `IConcat`, left: n, right: e });
          }
        }
      })),
      (er = __name((e) => e.length === 0, `isEmpty`)),
      (tr = __name((e) => e.length > 0, `isNonEmpty`)),
      (unsafeHead = (e) => Yn(e, 0)),
      (nr = unsafeHead),
      (tailNonEmpty = (e) => Qn(e, 1)));
  }),
  ir,
  ar,
  or,
  sr,
  cr = __esmMin(() => {
    ((ir = 2 ** 5), (ar = ir - 1), (or = ir / 2), (sr = ir / 4));
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
  return (t >>> e) & ar;
}
function toBitmap(e) {
  return 1 << e;
}
function fromBitmap(e, t) {
  return popcount(e & (t - 1));
}
var lr = __esmMin(() => {
    cr();
  }),
  ur,
  dr = __esmMin(() => {
    ur = __name((e, t) => ({ value: e, previous: t }), `make`);
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
var fr = __esmMin(() => {});
function isEmptyNode(e) {
  return ee(e, `EmptyNode`);
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
  return new gr(e, o, i);
}
function expand(e, t, n, r, i) {
  let a = [],
    o = r,
    s = 0;
  for (let e = 0; o; ++e) (o & 1 && (a[e] = i[s++]), (o >>>= 1));
  return ((a[t] = n), new _r(e, s + 1, a));
}
function mergeLeavesInner(e, t, n, r, i, a) {
  if (n === i) return new hr(e, n, [a, r]);
  let o = hashFragment(t, n),
    s = hashFragment(t, i);
  if (o === s) return (t) => new gr(e, toBitmap(o) | toBitmap(s), [t]);
  {
    let t = o < s ? [r, a] : [a, r];
    return new gr(e, toBitmap(o) | toBitmap(s), t);
  }
}
function mergeLeaves(e, t, n, r, i, a) {
  let o,
    s = t;
  for (;;) {
    let t = mergeLeavesInner(e, s, n, r, i, a);
    if (typeof t == `function`) ((o = ur(t, o)), (s += 5));
    else {
      let e = t;
      for (; o != null;) ((e = o.value(e)), (o = o.previous));
      return e;
    }
  }
}
var pr,
  mr,
  hr,
  gr,
  _r,
  vr = __esmMin(() => {
    (D(),
      B(),
      x(),
      dr(),
      fr(),
      lr(),
      cr(),
      (pr = class EmptyNode {
        _tag = `EmptyNode`;
        modify(e, t, n, r, i, a) {
          let o = n(F());
          return L(o) ? new EmptyNode() : (++a.value, new mr(e, r, i, o));
        }
      }),
      (mr = class LeafNode {
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
              : L(t)
                ? (--a.value, new pr())
                : canEditNode(this, e)
                  ? ((this.value = t), this)
                  : new LeafNode(e, r, i, t);
          }
          let o = n(F());
          return L(o)
            ? this
            : (++a.value, mergeLeaves(e, t, this.hash, this, r, new LeafNode(e, r, i, o)));
        }
      }),
      (hr = class CollisionNode {
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
          let o = n(F());
          return L(o)
            ? this
            : (++a.value, mergeLeaves(e, t, this.hash, this, r, new mr(e, r, i, o)));
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
                : L(u)
                  ? (--o.value, arraySpliceOut(e, c, r))
                  : arrayUpdate(e, c, new mr(t, n, a, u), r);
            }
          }
          let c = i(F());
          return L(c) ? r : (++o.value, arrayUpdate(e, s, new mr(t, n, a, c), r));
        }
      }),
      (gr = class IndexedNode {
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
            let d = new pr().modify(e, t + 5, n, r, i, a);
            return d
              ? s.length >= or
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
            if (((g &= ~l), !g)) return new pr();
            if (s.length <= 2 && isLeafNode(s[u ^ 1])) return s[u ^ 1];
            _ = arraySpliceOut(p, u, s);
          } else _ = arrayUpdate(p, u, h, s);
          return p ? ((this.mask = g), (this.children = _), this) : new IndexedNode(e, g, _);
        }
      }),
      (_r = class ArrayNode {
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
            u = (l || new pr()).modify(e, t + 5, n, r, i, a);
          if (l === u) return this;
          let d = canEditNode(this, e),
            p;
          if (isEmptyNode(l) && !isEmptyNode(u)) (++o, (p = arrayUpdate(d, c, u, s)));
          else if (!isEmptyNode(l) && isEmptyNode(u)) {
            if ((--o, o <= sr)) return pack(e, o, c, s);
            p = arrayUpdate(d, c, new pr(), s);
          } else p = arrayUpdate(d, c, u, s);
          return d ? ((this.size = o), (this.children = p), this) : new ArrayNode(e, o, p);
        }
      }));
  }),
  yr,
  br,
  xr,
  Sr,
  Cr,
  applyCont,
  visitLazy,
  visitLazyChildren,
  wr,
  Tr,
  Er,
  isHashMap,
  Dr,
  kr,
  Ar,
  jr,
  Mr,
  Nr,
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
  Wr = __esmMin(() => {
    (D(),
      s(),
      T(),
      A(),
      B(),
      j(),
      x(),
      lr(),
      cr(),
      vr(),
      (yr = `effect/HashMap`),
      (br = Symbol.for(yr)),
      (xr = {
        [br]: br,
        [Symbol.iterator]() {
          return new Cr(this, (e, t) => [e, t]);
        },
        [S]() {
          let e = hash(yr);
          for (let t of this) e ^= pipe(hash(t[0]), C(hash(t[1])));
          return w(this, e);
        },
        [E](e) {
          if (isHashMap(e)) {
            if (e._size !== this._size) return !1;
            for (let t of this) {
              let n = pipe(e, Ar(t[0], hash(t[0])));
              if (L(n) || !equals$2(t[1], n.value)) return !1;
            }
            return !0;
          }
          return !1;
        },
        toString() {
          return k(this.toJSON());
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
      (Sr = __name((e, t, n, r) => {
        let i = Object.create(xr);
        return ((i._editable = e), (i._edit = t), (i._root = n), (i._size = r), i);
      }, `makeImpl`)),
      (Cr = class HashMapIterator {
        map;
        f;
        v;
        constructor(e, t) {
          ((this.map = e), (this.f = t), (this.v = visitLazy(this.map._root, this.f, void 0)));
        }
        next() {
          if (L(this.v)) return { done: !0, value: void 0 };
          let e = this.v.value;
          return ((this.v = applyCont(e.cont)), { done: !1, value: e.value });
        }
        [Symbol.iterator]() {
          return new HashMapIterator(this.map, this.f);
        }
      }),
      (applyCont = (e) => (e ? visitLazyChildren(e[0], e[1], e[2], e[3], e[4]) : F())),
      (visitLazy = (e, t, n = void 0) => {
        switch (e._tag) {
          case `LeafNode`:
            return R(e.value) ? I({ value: t(e.key, e.value.value), cont: n }) : applyCont(n);
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
      (wr = Sr(!1, 0, new pr(), 0)),
      (Tr = __name(() => wr, `empty`)),
      (Er = __name((e) => {
        let t = Ir(Tr());
        for (let n of e) Mr(t, n[0], n[1]);
        return Lr(t);
      }, `fromIterable`)),
      (isHashMap = (e) => b(e, br)),
      (Dr = __name((e) => e && isEmptyNode(e._root), `isEmpty`)),
      (kr = dual(2, (e, t) => Ar(e, t, hash(t)))),
      (Ar = dual(3, (e, t, n) => {
        let r = e._root,
          i = 0;
        for (;;)
          switch (r._tag) {
            case `LeafNode`:
              return equals$2(t, r.key) ? r.value : F();
            case `CollisionNode`:
              if (n === r.hash) {
                let e = r.children;
                for (let n = 0, r = e.length; n < r; ++n) {
                  let r = e[n];
                  if (`key` in r && equals$2(t, r.key)) return r.value;
                }
              }
              return F();
            case `IndexedNode`: {
              let e = toBitmap(hashFragment(i, n));
              if (r.mask & e) {
                ((r = r.children[fromBitmap(r.mask, e)]), (i += 5));
                break;
              }
              return F();
            }
            case `ArrayNode`:
              if (((r = r.children[hashFragment(i, n)]), r)) {
                i += 5;
                break;
              }
              return F();
            default:
              return F();
          }
      })),
      (jr = dual(2, (e, t) => R(Ar(e, t, hash(t))))),
      (Mr = dual(3, (e, t, n) => Rr(e, t, () => I(n)))),
      (Nr = dual(3, (e, t, n) =>
        e._editable
          ? ((e._root = t), (e._size = n), e)
          : t === e._root
            ? e
            : Sr(e._editable, e._edit, t, n),
      )),
      (Pr = __name((e) => new Cr(e, (e) => e), `keys`)),
      (Fr = __name((e) => e._size, `size`)),
      (Ir = __name((e) => Sr(!0, e._edit + 1, e._root, e._size), `beginMutation`)),
      (Lr = __name((e) => ((e._editable = !1), e), `endMutation`)),
      (Rr = dual(3, (e, t, n) => zr(e, t, hash(t), n))),
      (zr = dual(4, (e, t, n, r) => {
        let i = { value: e._size },
          a = e._root.modify(e._editable ? e._edit : NaN, 0, r, n, t, i);
        return pipe(e, Nr(a, i.value));
      })),
      (Br = dual(2, (e, t) => Rr(e, t, F))),
      (Vr = dual(2, (e, t) => Ur(e, Tr(), (e, n, r) => Mr(e, r, t(n, r))))),
      (Hr = dual(2, (e, t) => Ur(e, void 0, (e, n, r) => t(n, r)))),
      (Ur = dual(3, (e, t, n) => {
        let r = e._root;
        if (r._tag === `LeafNode`) return R(r.value) ? n(t, r.value.value, r.key) : t;
        if (r._tag === `EmptyNode`) return t;
        let i = [r.children],
          a;
        for (; (a = i.pop());)
          for (let e = 0, r = a.length; e < r;) {
            let r = a[e++];
            r &&
              !isEmptyNode(r) &&
              (r._tag === `LeafNode`
                ? R(r.value) && (t = n(t, r.value.value, r.key))
                : i.push(r.children));
          }
        return t;
      })));
  }),
  Gr,
  Kr,
  qr,
  makeImpl,
  isHashSet,
  Jr,
  Yr,
  Xr,
  Zr,
  Qr,
  $r,
  beginMutation,
  endMutation,
  ei,
  ti,
  ni,
  ri,
  ii,
  ai,
  oi,
  si = __esmMin(() => {
    (D(),
      s(),
      T(),
      A(),
      j(),
      x(),
      Wr(),
      (Gr = `effect/HashSet`),
      (Kr = Symbol.for(Gr)),
      (qr = {
        [Kr]: Kr,
        [Symbol.iterator]() {
          return Pr(this._keyMap);
        },
        [S]() {
          return w(this, C(hash(this._keyMap))(hash(Gr)));
        },
        [E](e) {
          return isHashSet(e)
            ? Fr(this._keyMap) === Fr(e._keyMap) && equals$2(this._keyMap, e._keyMap)
            : !1;
        },
        toString() {
          return k(this.toJSON());
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
        let t = Object.create(qr);
        return ((t._keyMap = e), t);
      }),
      (isHashSet = (e) => b(e, Kr)),
      (Jr = makeImpl(Tr())),
      (Yr = __name(() => Jr, `empty`)),
      (Xr = __name((e) => {
        let t = beginMutation(Yr());
        for (let n of e) ti(t, n);
        return endMutation(t);
      }, `fromIterable`)),
      (Zr = __name((...e) => {
        let t = beginMutation(Yr());
        for (let n of e) ti(t, n);
        return endMutation(t);
      }, `make`)),
      (Qr = dual(2, (e, t) => jr(e._keyMap, t))),
      ($r = __name((e) => Fr(e._keyMap), `size`)),
      (beginMutation = (e) => makeImpl(Ir(e._keyMap))),
      (endMutation = (e) => ((e._keyMap._editable = !1), e)),
      (ei = dual(2, (e, t) => {
        let n = beginMutation(e);
        return (t(n), endMutation(n));
      })),
      (ti = dual(2, (e, t) =>
        e._keyMap._editable ? (Mr(t, !0)(e._keyMap), e) : makeImpl(Mr(t, !0)(e._keyMap)),
      )),
      (ni = dual(2, (e, t) =>
        e._keyMap._editable ? (Br(t)(e._keyMap), e) : makeImpl(Br(t)(e._keyMap)),
      )),
      (ri = dual(2, (e, t) =>
        ei(e, (e) => {
          for (let n of t) ni(e, n);
        }),
      )),
      (ii = dual(2, (e, t) =>
        ei(Yr(), (n) => {
          ai(e, (e) => ti(n, e));
          for (let e of t) ti(n, e);
        }),
      )),
      (ai = dual(2, (e, t) => Hr(e._keyMap, (e, n) => t(n)))),
      (oi = dual(3, (e, t, n) => Ur(e._keyMap, t, (e, t, r) => n(e, r)))));
  }),
  ci,
  li,
  ui,
  di,
  fi,
  pi,
  mi,
  hi,
  gi,
  _i,
  vi = __esmMin(() => {
    (si(),
      (ci = Yr),
      (li = Xr),
      (ui = Zr),
      (di = Qr),
      (fi = $r),
      (pi = ti),
      (mi = ni),
      (hi = ri),
      (gi = ii),
      (_i = oi));
  }),
  yi,
  bi,
  xi,
  Si,
  Ci,
  wi = __esmMin(() => {
    ((yi = `Empty`), (bi = `Fail`), (xi = `Interrupt`), (Si = `Parallel`), (Ci = `Sequential`));
  }),
  Ti,
  Ei,
  Di,
  Oi,
  ki,
  Ai,
  ji,
  interrupt,
  Mi,
  Ni,
  isCause,
  isEmptyType,
  Pi,
  Fi,
  isInterrupted,
  isInterruptedOnly,
  failures,
  defects,
  interruptors,
  failureOption,
  failureOrCause,
  interruptOption,
  stripFailures,
  electFailures,
  causeEquals,
  flattenCause,
  flattenCauseLoop,
  Ii,
  evaluateCause,
  Li,
  Ri,
  zi,
  Bi,
  Vi,
  Hi,
  Ui,
  renderErrorCause,
  makePrettyError,
  prettyErrorMessage,
  Wi,
  Gi,
  prettyErrorStack,
  Ki,
  prettyErrors,
  qi = __esmMin(() => {
    (U(),
      rr(),
      kt(),
      D(),
      s(),
      _(),
      T(),
      vi(),
      A(),
      B(),
      j(),
      x(),
      te(),
      wi(),
      (Ti = `effect/Cause`),
      (Ei = Symbol.for(Ti)),
      (Di = { _E: (e) => e }),
      (Oi = {
        [Ei]: Di,
        [S]() {
          return pipe(hash(Ti), C(hash(flattenCause(this))), w(this));
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
          return Ui(this);
        },
        [O]() {
          return this.toJSON();
        },
      }),
      (ki = (() => {
        let e = Object.create(Oi);
        return ((e._tag = yi), e);
      })()),
      (Ai = __name((e) => {
        let t = Object.create(Oi);
        return ((t._tag = bi), (t.error = e), t);
      }, `fail`)),
      (ji = __name((e) => {
        let t = Object.create(Oi);
        return ((t._tag = `Die`), (t.defect = e), t);
      }, `die`)),
      (interrupt = (e) => {
        let t = Object.create(Oi);
        return ((t._tag = xi), (t.fiberId = e), t);
      }),
      (Mi = __name((e, t) => {
        let n = Object.create(Oi);
        return ((n._tag = Si), (n.left = e), (n.right = t), n);
      }, `parallel`)),
      (Ni = __name((e, t) => {
        let n = Object.create(Oi);
        return ((n._tag = Ci), (n.left = e), (n.right = t), n);
      }, `sequential`)),
      (isCause = (e) => b(e, Ei)),
      (isEmptyType = (e) => e._tag === yi),
      (Pi = __name((e) => e._tag === bi, `isFailType`)),
      (Fi = __name(
        (e) =>
          e._tag === `Empty` ||
          Vi(e, !0, (e, t) => {
            switch (t._tag) {
              case yi:
                return I(e);
              case `Die`:
              case bi:
              case xi:
                return I(!1);
              default:
                return F();
            }
          }),
        `isEmpty`,
      )),
      (isInterrupted = (e) => R(interruptOption(e))),
      (isInterruptedOnly = (e) => Hi(void 0, Li)(e)),
      (failures = (e) =>
        Jn(Vi(e, Un(), (e, t) => (t._tag === `Fail` ? I(pipe(e, Zn(t.error))) : F())))),
      (defects = (e) =>
        Jn(Vi(e, Un(), (e, t) => (t._tag === `Die` ? I(pipe(e, Zn(t.defect))) : F())))),
      (interruptors = (e) =>
        Vi(e, ci(), (e, t) => (t._tag === `Interrupt` ? I(pipe(e, pi(t.fiberId))) : F()))),
      (failureOption = (e) => Ii(e, (e) => (e._tag === `Fail` ? I(e.error) : F()))),
      (failureOrCause = (e) => {
        let t = failureOption(e);
        switch (t._tag) {
          case `None`:
            return M(e);
          case `Some`:
            return N(t.value);
        }
      }),
      (interruptOption = (e) => Ii(e, (e) => (e._tag === `Interrupt` ? I(e.fiberId) : F()))),
      (stripFailures = (e) =>
        Bi(e, {
          onEmpty: ki,
          onFail: () => ki,
          onDie: ji,
          onInterrupt: interrupt,
          onSequential: Ni,
          onParallel: Mi,
        })),
      (electFailures = (e) =>
        Bi(e, {
          onEmpty: ki,
          onFail: ji,
          onDie: ji,
          onInterrupt: interrupt,
          onSequential: Ni,
          onParallel: Mi,
        })),
      (causeEquals = (e, t) => {
        let n = Gn(e),
          r = Gn(t);
        for (; tr(n) && tr(r);) {
          let [e, t] = pipe(
              nr(n),
              Vi([ci(), Un()], ([e, t], n) => {
                let [r, i] = evaluateCause(n);
                return I([pipe(e, gi(r)), pipe(t, $n(i))]);
              }),
            ),
            [i, a] = pipe(
              nr(r),
              Vi([ci(), Un()], ([e, t], n) => {
                let [r, i] = evaluateCause(n);
                return I([pipe(e, gi(r)), pipe(t, $n(i))]);
              }),
            );
          if (!equals$2(e, i)) return !1;
          ((n = t), (r = a));
        }
        return !0;
      }),
      (flattenCause = (e) => flattenCauseLoop(Gn(e), Un())),
      (flattenCauseLoop = (e, t) => {
        for (;;) {
          let [n, r] = pipe(
              e,
              Nn([ci(), Un()], ([e, t], n) => {
                let [r, i] = evaluateCause(n);
                return [pipe(e, gi(r)), pipe(t, $n(i))];
              }),
            ),
            i = fi(n) > 0 ? pipe(t, Zn(n)) : t;
          if (er(r)) return Jn(i);
          ((e = r), (t = i));
        }
        throw Error(getBugErrorMessage(`Cause.flattenCauseLoop`));
      }),
      (Ii = dual(2, (e, t) => {
        let n = [e];
        for (; n.length > 0;) {
          let e = n.pop(),
            r = t(e);
          switch (r._tag) {
            case `None`:
              switch (e._tag) {
                case Ci:
                case Si:
                  (n.push(e.right), n.push(e.left));
                  break;
              }
              break;
            case `Some`:
              return r;
          }
        }
        return F();
      })),
      (evaluateCause = (e) => {
        let t = e,
          n = [],
          r = ci(),
          i = Un();
        for (; t !== void 0;)
          switch (t._tag) {
            case yi:
              if (n.length === 0) return [r, i];
              t = n.pop();
              break;
            case bi:
              if (((r = pi(r, Wn(t._tag, t.error))), n.length === 0)) return [r, i];
              t = n.pop();
              break;
            case `Die`:
              if (((r = pi(r, Wn(t._tag, t.defect))), n.length === 0)) return [r, i];
              t = n.pop();
              break;
            case xi:
              if (((r = pi(r, Wn(t._tag, t.fiberId))), n.length === 0)) return [r, i];
              t = n.pop();
              break;
            case Ci:
              switch (t.left._tag) {
                case yi:
                  t = t.right;
                  break;
                case Ci:
                  t = Ni(t.left.left, Ni(t.left.right, t.right));
                  break;
                case Si:
                  t = Mi(Ni(t.left.left, t.right), Ni(t.left.right, t.right));
                  break;
                default:
                  ((i = Zn(i, t.right)), (t = t.left));
                  break;
              }
              break;
            case Si:
              (n.push(t.right), (t = t.left));
              break;
          }
        throw Error(getBugErrorMessage(`Cause.evaluateCauseLoop`));
      }),
      (Li = {
        emptyCase: r,
        failCase: i,
        dieCase: i,
        interruptCase: r,
        sequentialCase: (e, t, n) => t && n,
        parallelCase: (e, t, n) => t && n,
      }),
      (Ri = `SequentialCase`),
      (zi = `ParallelCase`),
      (Bi = dual(
        2,
        (e, { onDie: t, onEmpty: n, onFail: r, onInterrupt: i, onParallel: a, onSequential: o }) =>
          Hi(e, void 0, {
            emptyCase: () => n,
            failCase: (e, t) => r(t),
            dieCase: (e, n) => t(n),
            interruptCase: (e, t) => i(t),
            sequentialCase: (e, t, n) => o(t, n),
            parallelCase: (e, t, n) => a(t, n),
          }),
      )),
      (Vi = dual(3, (e, t, n) => {
        let r = t,
          i = e,
          a = [];
        for (; i !== void 0;) {
          let e = n(r, i);
          switch (((r = R(e) ? e.value : r), i._tag)) {
            case Ci:
              (a.push(i.right), (i = i.left));
              break;
            case Si:
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
      (Hi = dual(3, (e, t, n) => {
        let r = [e],
          i = [];
        for (; r.length > 0;) {
          let e = r.pop();
          switch (e._tag) {
            case yi:
              i.push(M(n.emptyCase(t)));
              break;
            case bi:
              i.push(M(n.failCase(t, e.error)));
              break;
            case `Die`:
              i.push(M(n.dieCase(t, e.defect)));
              break;
            case xi:
              i.push(M(n.interruptCase(t, e.fiberId)));
              break;
            case Ci:
              (r.push(e.right), r.push(e.left), i.push(N({ _tag: Ri })));
              break;
            case Si:
              (r.push(e.right), r.push(e.left), i.push(N({ _tag: zi })));
              break;
          }
        }
        let a = [];
        for (; i.length > 0;) {
          let e = i.pop();
          switch (e._tag) {
            case `Left`:
              switch (e.left._tag) {
                case Ri: {
                  let e = a.pop(),
                    r = a.pop(),
                    i = n.sequentialCase(t, e, r);
                  a.push(i);
                  break;
                }
                case zi: {
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
      (Ui = __name(
        (e, t) =>
          isInterruptedOnly(e)
            ? `All fibers interrupted without errors.`
            : prettyErrors(e).map(function (e) {
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
            (Ki in e && (r.span = e[Ki]),
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
            v(e.toString) &&
            e.toString !== Object.prototype.toString &&
            e.toString !== globalThis.Array.prototype.toString
          )
            return e.toString();
        } catch {}
        return stringifyCircular(e);
      }),
      (Wi = /\((.*)\)/g),
      (Gi = globalValue(`effect/Tracer/spanToTrace`, () => new WeakMap())),
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
            let n = Gi.get(e);
            if (typeof n == `function`) {
              let t = n();
              if (typeof t == `string`) {
                let n = t.matchAll(Wi),
                  i = !1;
                for (let [, t] of n) ((i = !0), r.push(`    at ${e.name} (${t})`));
                i || r.push(`    at ${e.name} (${t.replace(/^at /, ``)})`);
              } else r.push(`    at ${e.name}`);
            } else r.push(`    at ${e.name}`);
            ((e = Vt(e.parent)), t++);
          }
        }
        return r.join(`
`);
      }),
      (Ki = Symbol.for(`effect/SpanAnnotation`)),
      (prettyErrors = (e) =>
        Hi(e, void 0, {
          emptyCase: () => [],
          dieCase: (e, t) => [makePrettyError(t)],
          failCase: (e, t) => [makePrettyError(t)],
          interruptCase: () => [],
          parallelCase: (e, t, n) => [...t, ...n],
          sequentialCase: (e, t, n) => [...t, ...n],
        })));
  }),
  Ji,
  Yi,
  Xi,
  Zi,
  Qi,
  $i,
  makeGenericTag,
  ea,
  ta,
  na,
  ra,
  makeContext,
  serviceNotFoundError,
  isContext,
  isReference,
  ia,
  aa,
  oa,
  sa,
  ca,
  getDefaultValue,
  unsafeGetReference,
  la,
  ua,
  da,
  fa,
  pa = __esmMin(() => {
    (D(),
      s(),
      _(),
      T(),
      A(),
      j(),
      x(),
      Xe(),
      st(),
      (Ji = Symbol.for(`effect/Context/Tag`)),
      (Yi = Symbol.for(`effect/Context/Reference`)),
      (Xi = `effect/STM`),
      (Zi = Symbol.for(Xi)),
      (Qi = {
        ...Ge,
        _op: `Tag`,
        [Zi]: He,
        [Ji]: { _Service: (e) => e, _Identifier: (e) => e },
        toString() {
          return k(this.toJSON());
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
          return oa(this, e);
        },
      }),
      ($i = { ...Qi, [Yi]: Yi }),
      (makeGenericTag = (e) => {
        let t = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        let n = Error();
        Error.stackTraceLimit = t;
        let r = Object.create(Qi);
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
      (ea = __name(
        (e) => () => {
          let t = Error.stackTraceLimit;
          Error.stackTraceLimit = 2;
          let n = Error();
          Error.stackTraceLimit = t;
          function TagClass() {}
          return (
            Object.setPrototypeOf(TagClass, Qi),
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
      (ta = __name(
        () => (e, t) => {
          let n = Error.stackTraceLimit;
          Error.stackTraceLimit = 2;
          let r = Error();
          Error.stackTraceLimit = n;
          function ReferenceClass() {}
          return (
            Object.setPrototypeOf(ReferenceClass, $i),
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
      (na = Symbol.for(`effect/Context`)),
      (ra = {
        [na]: { _Services: (e) => e },
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
          return w(this, _e(this.unsafeMap.size));
        },
        pipe() {
          return pipeArguments(this, arguments);
        },
        toString() {
          return k(this.toJSON());
        },
        toJSON() {
          return { _id: `Context`, services: Array.from(this.unsafeMap).map(toJSON) };
        },
        [O]() {
          return this.toJSON();
        },
      }),
      (makeContext = (e) => {
        let t = Object.create(ra);
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
      (isContext = (e) => b(e, na)),
      (isReference = (e) => b(e, Yi)),
      (ia = makeContext(new Map())),
      (aa = __name(() => ia, `empty`)),
      (oa = __name((e, t) => makeContext(new Map([[e.key, t]])), `make`)),
      (sa = dual(3, (e, t, n) => {
        let r = new Map(e.unsafeMap);
        return (r.set(t.key, n), makeContext(r));
      })),
      (ca = globalValue(`effect/Context/defaultValueCache`, () => new Map())),
      (getDefaultValue = (e) => {
        if (ca.has(e.key)) return ca.get(e.key);
        let t = e.defaultValue();
        return (ca.set(e.key, t), t);
      }),
      (unsafeGetReference = (e, t) =>
        e.unsafeMap.has(t.key) ? e.unsafeMap.get(t.key) : getDefaultValue(t)),
      (la = dual(2, (e, t) => {
        if (!e.unsafeMap.has(t.key)) {
          if (Yi in t) return getDefaultValue(t);
          throw serviceNotFoundError(t);
        }
        return e.unsafeMap.get(t.key);
      })),
      (ua = la),
      (da = dual(2, (e, t) =>
        e.unsafeMap.has(t.key)
          ? ot(e.unsafeMap.get(t.key))
          : isReference(t)
            ? ot(getDefaultValue(t))
            : at,
      )),
      (fa = dual(2, (e, t) => {
        let n = new Map(e.unsafeMap);
        for (let [e, r] of t.unsafeMap) n.set(e, r);
        return makeContext(n);
      })));
  }),
  ma,
  ha,
  ga,
  _a,
  va,
  ya,
  ba,
  xa,
  Sa,
  Ca,
  wa = __esmMin(() => {
    (pa(),
      (ma = makeGenericTag),
      (ha = aa),
      (ga = oa),
      (_a = sa),
      (va = ua),
      (ya = la),
      (ba = da),
      (xa = fa),
      (Sa = ea),
      (Ca = ta));
  }),
  Ta,
  Ea,
  Da,
  Oa,
  ka,
  Aa,
  ja,
  Ma,
  Na,
  Pa,
  Fa,
  Ia,
  La,
  isDuration,
  isFinite,
  Ra,
  za,
  Ba,
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
  Va,
  Ha,
  Ua,
  Wa,
  Ga,
  Ka,
  parts,
  qa,
  Ja = __esmMin(() => {
    (D(),
      s(),
      T(),
      A(),
      B(),
      j(),
      x(),
      (Ta = Symbol.for(`effect/Duration`)),
      (Ea = BigInt(0)),
      (Da = BigInt(24)),
      (Oa = BigInt(60)),
      (ka = BigInt(1e3)),
      (Aa = BigInt(1e6)),
      (ja = BigInt(1e9)),
      (Ma = /^(-?\d+(?:\.\d+)?)\s+(nanos?|micros?|millis?|seconds?|minutes?|hours?|days?|weeks?)$/),
      (Na = __name((e) => {
        if (isDuration(e)) return e;
        if (isNumber(e)) return millis(e);
        if (isBigInt(e)) return nanos(e);
        if (Array.isArray(e) && e.length === 2 && e.every(isNumber))
          return e[0] === -1 / 0 || e[1] === -1 / 0 || Number.isNaN(e[0]) || Number.isNaN(e[1])
            ? za
            : e[0] === 1 / 0 || e[1] === 1 / 0
              ? Ba
              : nanos(BigInt(Math.round(e[0] * 1e9)) + BigInt(Math.round(e[1])));
        if (isString(e)) {
          let t = Ma.exec(e);
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
      (Pa = { _tag: `Millis`, millis: 0 }),
      (Fa = { _tag: `Infinity` }),
      (Ia = {
        [Ta]: Ta,
        [S]() {
          return w(this, structure(this.value));
        },
        [E](e) {
          return isDuration(e) && Ka(this, e);
        },
        toString() {
          return `Duration(${qa(this)})`;
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
      (La = __name((e) => {
        let t = Object.create(Ia);
        return (
          isNumber(e)
            ? isNaN(e) || e <= 0
              ? (t.value = Pa)
              : Number.isFinite(e)
                ? Number.isInteger(e)
                  ? (t.value = { _tag: `Millis`, millis: e })
                  : (t.value = { _tag: `Nanos`, nanos: BigInt(Math.round(e * 1e6)) })
                : (t.value = Fa)
            : e <= Ea
              ? (t.value = Pa)
              : (t.value = { _tag: `Nanos`, nanos: e }),
          t
        );
      }, `make`)),
      (isDuration = (e) => b(e, Ta)),
      (isFinite = (e) => e.value._tag !== `Infinity`),
      (Ra = __name((e) => {
        switch (e.value._tag) {
          case `Millis`:
            return e.value.millis === 0;
          case `Nanos`:
            return e.value.nanos === Ea;
          case `Infinity`:
            return !1;
        }
      }, `isZero`)),
      (za = La(0)),
      (Ba = La(1 / 0)),
      (nanos = (e) => La(e)),
      (micros = (e) => La(e * ka)),
      (millis = (e) => La(e)),
      (seconds = (e) => La(e * 1e3)),
      (minutes = (e) => La(e * 6e4)),
      (hours = (e) => La(e * 36e5)),
      (days = (e) => La(e * 864e5)),
      (weeks = (e) => La(e * 6048e5)),
      (toMillis = (e) => Va(e, { onMillis: (e) => e, onNanos: (e) => Number(e) / 1e6 })),
      (toNanos = (e) => {
        let t = Na(e);
        switch (t.value._tag) {
          case `Infinity`:
            return F();
          case `Nanos`:
            return I(t.value.nanos);
          case `Millis`:
            return I(BigInt(Math.round(t.value.millis * 1e6)));
        }
      }),
      (unsafeToNanos = (e) => {
        let t = Na(e);
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
        let t = Na(e);
        switch (t.value._tag) {
          case `Infinity`:
            return [1 / 0, 0];
          case `Nanos`:
            return [Number(t.value.nanos / ja), Number(t.value.nanos % ja)];
          case `Millis`:
            return [Math.floor(t.value.millis / 1e3), Math.round((t.value.millis % 1e3) * 1e6)];
        }
      }),
      (Va = dual(2, (e, t) => {
        let n = Na(e);
        switch (n.value._tag) {
          case `Nanos`:
            return t.onNanos(n.value.nanos);
          case `Infinity`:
            return t.onMillis(1 / 0);
          case `Millis`:
            return t.onMillis(n.value.millis);
        }
      })),
      (Ha = dual(3, (e, t, n) => {
        let r = Na(e),
          i = Na(t);
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
      (Ua = __name(
        (e, t) => Ha(e, t, { onMillis: (e, t) => e === t, onNanos: (e, t) => e === t }),
        `Equivalence`,
      )),
      (Wa = dual(2, (e, t) => Ha(e, t, { onMillis: (e, t) => e <= t, onNanos: (e, t) => e <= t }))),
      (Ga = dual(2, (e, t) => Ha(e, t, { onMillis: (e, t) => e >= t, onNanos: (e, t) => e >= t }))),
      (Ka = dual(2, (e, t) => Ua(Na(e), Na(t)))),
      (parts = (e) => {
        let t = Na(e);
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
          r = n / Aa,
          i = r / ka,
          a = i / Oa,
          o = a / Oa,
          s = o / Da;
        return {
          days: Number(s),
          hours: Number(o % Da),
          minutes: Number(a % Oa),
          seconds: Number(i % Oa),
          millis: Number(r % ka),
          nanos: Number(n % Aa),
        };
      }),
      (qa = __name((e) => {
        let t = Na(e);
        if (t.value._tag === `Infinity`) return `Infinity`;
        if (Ra(t)) return `0`;
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
  Ya,
  Xa,
  Za,
  Qa,
  $a,
  eo = __esmMin(() => {
    (s(),
      A(),
      j(),
      (Ya = Symbol.for(`effect/MutableRef`)),
      (Xa = {
        [Ya]: Ya,
        toString() {
          return k(this.toJSON());
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
      (Za = __name((e) => {
        let t = Object.create(Xa);
        return ((t.current = e), t);
      }, `make`)),
      (Qa = __name((e) => e.current, `get`)),
      ($a = dual(2, (e, t) => ((e.current = t), e))));
  }),
  to,
  no,
  ro,
  io,
  ao,
  oo,
  None$2,
  Runtime,
  Composite$1,
  so,
  co,
  lo,
  uo,
  ids,
  fo,
  po,
  mo,
  ho = __esmMin(() => {
    (D(),
      s(),
      _(),
      T(),
      vi(),
      A(),
      eo(),
      x(),
      (to = `effect/FiberId`),
      (no = Symbol.for(to)),
      (ro = `None`),
      (io = `Runtime`),
      (ao = `Composite`),
      (oo = string(`${to}-${ro}`)),
      (None$2 = class {
        static {
          __name(this, `None`);
        }
        [no] = no;
        _tag = ro;
        id = -1;
        startTimeMillis = -1;
        [S]() {
          return oo;
        }
        [E](e) {
          return uo(e) && e._tag === ro;
        }
        toString() {
          return k(this.toJSON());
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
        [no] = no;
        _tag = io;
        constructor(e, t) {
          ((this.id = e), (this.startTimeMillis = t));
        }
        [S]() {
          return w(this, string(`${to}-${this._tag}-${this.id}-${this.startTimeMillis}`));
        }
        [E](e) {
          return (
            uo(e) && e._tag === io && this.id === e.id && this.startTimeMillis === e.startTimeMillis
          );
        }
        toString() {
          return k(this.toJSON());
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
      (Composite$1 = class {
        static {
          __name(this, `Composite`);
        }
        left;
        right;
        [no] = no;
        _tag = ao;
        constructor(e, t) {
          ((this.left = e), (this.right = t));
        }
        _hash;
        [S]() {
          return pipe(
            string(`${to}-${this._tag}`),
            C(hash(this.left)),
            C(hash(this.right)),
            w(this),
          );
        }
        [E](e) {
          return (
            uo(e) && e._tag === ao && equals$2(this.left, e.left) && equals$2(this.right, e.right)
          );
        }
        toString() {
          return k(this.toJSON());
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
      (so = new None$2()),
      (co = __name((e, t) => new Runtime(e, t), `runtime`)),
      (lo = __name((e, t) => new Composite$1(e, t), `composite`)),
      (uo = __name((e) => b(e, no), `isFiberId`)),
      (ids = (e) => {
        switch (e._tag) {
          case ro:
            return ci();
          case io:
            return ui(e.id);
          case ao:
            return pipe(ids(e.left), gi(ids(e.right)));
        }
      }),
      (fo = globalValue(Symbol.for(`effect/Fiber/Id/_fiberCounter`), () => Za(0))),
      (po = __name(
        (e) =>
          Array.from(ids(e))
            .map((e) => `#${e}`)
            .join(`,`),
        `threadName`,
      )),
      (mo = __name(() => {
        let e = Qa(fo);
        return (pipe(fo, $a(e + 1)), new Runtime(e, Date.now()));
      }, `unsafeMake`)));
  }),
  _o,
  vo,
  yo,
  bo,
  xo,
  So,
  Co = __esmMin(() => {
    (ho(), (_o = so), (vo = co), (yo = lo), (bo = uo), (xo = po), (So = mo));
  }),
  wo,
  To,
  Eo,
  Do,
  Oo,
  ko,
  Ao,
  jo,
  Mo,
  No = __esmMin(() => {
    (Wr(),
      (wo = Tr),
      (To = Er),
      (Eo = Dr),
      (Do = kr),
      (Oo = Mr),
      (ko = Pr),
      (Ao = Rr),
      (jo = Vr),
      (Mo = Ur));
  }),
  Po,
  toArray,
  getEquivalence,
  Fo,
  Io,
  makeCons,
  Lo,
  Ro,
  zo,
  isList,
  isNil,
  isCons,
  nil,
  cons,
  Bo,
  of,
  Vo,
  Ho,
  Uo,
  Wo,
  reverse,
  Go = __esmMin(() => {
    (U(),
      D(),
      m(),
      s(),
      T(),
      A(),
      j(),
      x(),
      (Po = Symbol.for(`effect/List`)),
      (toArray = (e) => V(e)),
      (getEquivalence = (e) => u(Pn(e), toArray)),
      (Fo = getEquivalence(equals$2)),
      (Io = {
        [Po]: Po,
        _tag: `Cons`,
        toString() {
          return k(this.toJSON());
        },
        toJSON() {
          return { _id: `List`, _tag: `Cons`, values: toArray(this).map(toJSON) };
        },
        [O]() {
          return this.toJSON();
        },
        [E](e) {
          return isList(e) && this._tag === e._tag && Fo(this, e);
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
        let n = Object.create(Io);
        return ((n.head = e), (n.tail = t), n);
      }),
      (Lo = string(`Nil`)),
      (Ro = {
        [Po]: Po,
        _tag: `Nil`,
        toString() {
          return k(this.toJSON());
        },
        toJSON() {
          return { _id: `List`, _tag: `Nil` };
        },
        [O]() {
          return this.toJSON();
        },
        [S]() {
          return Lo;
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
      (zo = Object.create(Ro)),
      (isList = (e) => b(e, Po)),
      (isNil = (e) => e._tag === `Nil`),
      (isCons = (e) => e._tag === `Cons`),
      (nil = () => zo),
      (cons = (e, t) => makeCons(e, t)),
      (Bo = nil),
      (of = (e) => makeCons(e, zo)),
      (Vo = dual(2, (e, t) => Uo(t, e))),
      (Ho = dual(2, (e, t) => cons(t, e))),
      (Uo = dual(2, (e, t) => {
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
      (Wo = dual(3, (e, t, n) => {
        let r = t,
          i = e;
        for (; !isNil(i);) ((r = n(r, i.head)), (i = i.tail));
        return r;
      })),
      (reverse = (e) => {
        let t = Bo(),
          n = e;
        for (; !isNil(n);) ((t = Ho(t, n.head)), (n = n.tail));
        return t;
      }));
  }),
  Ko,
  qo = __esmMin(() => {
    (D(),
      T(),
      Xe(),
      Array.prototype,
      (Ko = (function () {
        function Structural(e) {
          e && Object.assign(this, e);
        }
        return ((Structural.prototype = Ke), Structural);
      })()));
  });
function variance$3(e) {
  return e;
}
var Jo,
  Yo,
  Xo,
  Zo,
  Qo,
  $o,
  es,
  makeAddService,
  ts,
  makeRemoveService,
  ns,
  makeUpdateService,
  rs,
  as,
  os,
  ss = __esmMin(() => {
    (rr(),
      D(),
      s(),
      pa(),
      qo(),
      (Jo = Symbol.for(`effect/DifferContextPatch`)),
      __name(variance$3, `variance`),
      (Yo = { ...Ko.prototype, [Jo]: { _Value: variance$3, _Patch: variance$3 } }),
      (Xo = Object.create(Object.assign(Object.create(Yo), { _tag: `Empty` }))),
      (Zo = __name(() => Xo, `empty`)),
      (Qo = Object.assign(Object.create(Yo), { _tag: `AndThen` })),
      ($o = __name((e, t) => {
        let n = Object.create(Qo);
        return ((n.first = e), (n.second = t), n);
      }, `makeAndThen`)),
      (es = Object.assign(Object.create(Yo), { _tag: `AddService` })),
      (makeAddService = (e, t) => {
        let n = Object.create(es);
        return ((n.key = e), (n.service = t), n);
      }),
      (ts = Object.assign(Object.create(Yo), { _tag: `RemoveService` })),
      (makeRemoveService = (e) => {
        let t = Object.create(ts);
        return ((t.key = e), t);
      }),
      (ns = Object.assign(Object.create(Yo), { _tag: `UpdateService` })),
      (makeUpdateService = (e, t) => {
        let n = Object.create(ns);
        return ((n.key = e), (n.update = t), n);
      }),
      (rs = __name((e, t) => {
        let n = new Map(e.unsafeMap),
          r = Zo();
        for (let [e, i] of t.unsafeMap.entries())
          if (n.has(e)) {
            let t = n.get(e);
            (n.delete(e), equals$2(t, i) || (r = as(makeUpdateService(e, () => i))(r)));
          } else (n.delete(e), (r = as(makeAddService(e, i))(r)));
        for (let [e] of n.entries()) r = as(makeRemoveService(e))(r);
        return r;
      }, `diff`)),
      (as = dual(2, (e, t) => $o(e, t))),
      (os = dual(2, (e, t) => {
        if (e._tag === `Empty`) return t;
        let n = !1,
          r = Gn(e),
          i = new Map(t.unsafeMap);
        for (; tr(r);) {
          let e = nr(r),
            t = tailNonEmpty(r);
          switch (e._tag) {
            case `Empty`:
              r = t;
              break;
            case `AddService`:
              (i.set(e.key, e.service), (r = t));
              break;
            case `AndThen`:
              r = Zn(Zn(t, e.second), e.first);
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
var cs,
  ls,
  us,
  ds,
  fs,
  ps,
  ms,
  makeAdd,
  hs,
  makeRemove,
  gs,
  _s,
  vs,
  ys = __esmMin(() => {
    (rr(),
      s(),
      vi(),
      qo(),
      (cs = Symbol.for(`effect/DifferHashSetPatch`)),
      __name(variance$2, `variance`),
      (ls = {
        ...Ko.prototype,
        [cs]: { _Value: variance$2, _Key: variance$2, _Patch: variance$2 },
      }),
      (us = Object.create(Object.assign(Object.create(ls), { _tag: `Empty` }))),
      (ds = __name(() => us, `empty`)),
      (fs = Object.assign(Object.create(ls), { _tag: `AndThen` })),
      (ps = __name((e, t) => {
        let n = Object.create(fs);
        return ((n.first = e), (n.second = t), n);
      }, `makeAndThen`)),
      (ms = Object.assign(Object.create(ls), { _tag: `Add` })),
      (makeAdd = (e) => {
        let t = Object.create(ms);
        return ((t.value = e), t);
      }),
      (hs = Object.assign(Object.create(ls), { _tag: `Remove` })),
      (makeRemove = (e) => {
        let t = Object.create(hs);
        return ((t.value = e), t);
      }),
      (gs = __name((e, t) => {
        let [n, r] = _i([e, ds()], ([e, t], n) =>
          di(n)(e) ? [mi(n)(e), t] : [e, _s(makeAdd(n))(t)],
        )(t);
        return _i(r, (e, t) => _s(makeRemove(t))(e))(n);
      }, `diff`)),
      (_s = dual(2, (e, t) => ps(e, t))),
      (vs = dual(2, (e, t) => {
        if (e._tag === `Empty`) return t;
        let n = t,
          r = Gn(e);
        for (; tr(r);) {
          let e = nr(r),
            t = tailNonEmpty(r);
          switch (e._tag) {
            case `Empty`:
              r = t;
              break;
            case `AndThen`:
              r = Zn(e.first)(Zn(e.second)(t));
              break;
            case `Add`:
              ((n = pi(e.value)(n)), (r = t));
              break;
            case `Remove`:
              ((n = mi(e.value)(n)), (r = t));
          }
        }
        return n;
      })));
  });
function variance$1(e) {
  return e;
}
var bs,
  xs,
  Ss,
  Cs,
  ws,
  makeAndThen,
  Ts,
  makeAppend,
  Es,
  makeSlice,
  Ds,
  makeUpdate,
  Os,
  ks,
  As,
  js = __esmMin(() => {
    (U(),
      D(),
      s(),
      qo(),
      (bs = Symbol.for(`effect/DifferReadonlyArrayPatch`)),
      __name(variance$1, `variance`),
      (xs = { ...Ko.prototype, [bs]: { _Value: variance$1, _Patch: variance$1 } }),
      (Ss = Object.create(Object.assign(Object.create(xs), { _tag: `Empty` }))),
      (Cs = __name(() => Ss, `empty`)),
      (ws = Object.assign(Object.create(xs), { _tag: `AndThen` })),
      (makeAndThen = (e, t) => {
        let n = Object.create(ws);
        return ((n.first = e), (n.second = t), n);
      }),
      (Ts = Object.assign(Object.create(xs), { _tag: `Append` })),
      (makeAppend = (e) => {
        let t = Object.create(Ts);
        return ((t.values = e), t);
      }),
      (Es = Object.assign(Object.create(xs), { _tag: `Slice` })),
      (makeSlice = (e, t) => {
        let n = Object.create(Es);
        return ((n.from = e), (n.until = t), n);
      }),
      (Ds = Object.assign(Object.create(xs), { _tag: `Update` })),
      (makeUpdate = (e, t) => {
        let n = Object.create(Ds);
        return ((n.index = e), (n.patch = t), n);
      }),
      (Os = __name((e) => {
        let t = 0,
          n = Cs();
        for (; t < e.oldValue.length && t < e.newValue.length;) {
          let r = e.oldValue[t],
            i = e.newValue[t],
            a = e.differ.diff(r, i);
          (equals$2(a, e.differ.empty) || (n = ks(n, makeUpdate(t, a))), (t += 1));
        }
        return (
          t < e.oldValue.length && (n = ks(n, makeSlice(0, t))),
          t < e.newValue.length && (n = ks(n, makeAppend(gn(t)(e.newValue)))),
          n
        );
      }, `diff`)),
      (ks = dual(2, (e, t) => makeAndThen(e, t))),
      (As = dual(3, (e, t, n) => {
        if (e._tag === `Empty`) return t;
        let r = t.slice(),
          i = On(e);
        for (; cn(i);) {
          let e = pn(i),
            t = mn(i);
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
  Ms,
  Ns,
  Ps,
  environment,
  hashSet,
  readonlyArray,
  Fs,
  updateWith,
  Is = __esmMin(() => {
    (D(),
      s(),
      j(),
      ss(),
      ys(),
      js(),
      (Ms = Symbol.for(`effect/Differ`)),
      (Ns = {
        [Ms]: { _P: identity, _V: identity },
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (Ps = __name((e) => {
        let t = Object.create(Ns);
        return (
          (t.empty = e.empty), (t.diff = e.diff), (t.combine = e.combine), (t.patch = e.patch), t
        );
      }, `make`)),
      (environment = () =>
        Ps({
          empty: Zo(),
          combine: (e, t) => as(t)(e),
          diff: (e, t) => rs(e, t),
          patch: (e, t) => os(t)(e),
        })),
      (hashSet = () =>
        Ps({
          empty: ds(),
          combine: (e, t) => _s(t)(e),
          diff: (e, t) => gs(e, t),
          patch: (e, t) => vs(t)(e),
        })),
      (readonlyArray = (e) =>
        Ps({
          empty: Cs(),
          combine: (e, t) => ks(e, t),
          diff: (t, n) => Os({ oldValue: t, newValue: n, differ: e }),
          patch: (t, n) => As(t, n, e),
        })),
      (Fs = __name(() => updateWith((e, t) => t), `update`)),
      (updateWith = (e) =>
        Ps({
          empty: identity,
          combine: (e, t) => (e === identity ? t : t === identity ? e : (n) => t(e(n))),
          diff: (e, t) => (equals$2(e, t) ? identity : constant(t)),
          patch: (t, n) => e(n, t(n)),
        })));
  }),
  Ls,
  Rs,
  active,
  enabled,
  zs,
  Bs,
  Vs,
  Hs,
  Us,
  Ws,
  invert,
  Gs = __esmMin(() => {
    (s(),
      (Ls = 255),
      (Rs = 8),
      (active = (e) => e & Ls),
      (enabled = (e) => (e >> Rs) & Ls),
      (zs = __name((e, t) => (e & Ls) + ((t & e & Ls) << Rs), `make`)),
      (Bs = zs(0, 0)),
      (Vs = __name((e) => zs(e, e), `enable`)),
      (Hs = __name((e) => zs(e, 0), `disable`)),
      (Us = dual(2, (e, t) => zs(active(e) & ~t, enabled(e)))),
      (Ws = dual(2, (e, t) => e | t)),
      (invert = (e) => (~e >>> 0) & Ls));
  }),
  cooperativeYielding,
  Ks,
  qs,
  interruption,
  Js,
  Ys,
  Xs,
  runtimeMetrics,
  windDown,
  Zs,
  Qs,
  $s,
  ec = __esmMin(() => {
    (s(),
      Is(),
      Gs(),
      (cooperativeYielding = (e) => Js(e, 32)),
      (Ks = dual(2, (e, t) => e | t)),
      (qs = __name((e) => interruption(e) && !windDown(e), `interruptible`)),
      (interruption = (e) => Js(e, 1)),
      (Js = dual(2, (e, t) => (e & t) !== 0)),
      (Ys = __name((...e) => e.reduce((e, t) => e | t, 0), `make`)),
      (Xs = Ys(0)),
      (runtimeMetrics = (e) => Js(e, 4)),
      (windDown = (e) => Js(e, 16)),
      (Zs = dual(2, (e, t) => zs(e ^ t, t))),
      (Qs = dual(2, (e, t) => (e & (invert(active(t)) | enabled(t))) | (active(t) & enabled(t)))),
      ($s = Ps({
        empty: Bs,
        diff: (e, t) => Zs(e, t),
        combine: (e, t) => Ws(t)(e),
        patch: (e, t) => Qs(t, e),
      })));
  }),
  tc,
  nc,
  rc,
  ic = __esmMin(() => {
    (Gs(), (tc = Vs), (nc = Hs), (rc = Us));
  }),
  par,
  seq,
  ac,
  oc,
  merge,
  sc,
  cc,
  ParallelImpl,
  parallelCollectionEmpty,
  parallelCollectionAdd,
  parallelCollectionCombine,
  parallelCollectionIsEmpty,
  parallelCollectionKeys,
  parallelCollectionToSequentialCollection,
  lc,
  uc,
  SequentialImpl,
  sequentialCollectionMake,
  sequentialCollectionCombine,
  sequentialCollectionKeys,
  sequentialCollectionToChunk,
  dc = __esmMin(() => {
    (rr(),
      D(),
      No(),
      Go(),
      B(),
      (par = (e, t) => ({ _tag: `Par`, left: e, right: t })),
      (seq = (e, t) => ({ _tag: `Seq`, left: e, right: t })),
      (ac = __name((e) => {
        let t = of(e),
          n = Bo();
        for (;;) {
          let [e, r] = Wo(t, [parallelCollectionEmpty(), Bo()], ([e, t], n) => {
            let [r, i] = oc(n);
            return [parallelCollectionCombine(e, r), Vo(t, i)];
          });
          if (((n = merge(n, e)), isNil(r))) return reverse(n);
          t = r;
        }
        throw Error(
          `BUG: BlockedRequests.flatten - please report an issue at https://github.com/Effect-TS/effect/issues`,
        );
      }, `flatten`)),
      (oc = __name((e) => {
        let t = e,
          n = parallelCollectionEmpty(),
          r = Bo(),
          i = Bo();
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
      (sc = Symbol.for(`effect/RequestBlock/RequestBlockParallel`)),
      (cc = { _R: (e) => e }),
      (ParallelImpl = class {
        map;
        [sc] = cc;
        constructor(e) {
          this.map = e;
        }
      }),
      (parallelCollectionEmpty = () => new ParallelImpl(wo())),
      (parallelCollectionAdd = (e, t) =>
        new ParallelImpl(
          Ao(e.map, t.dataSource, (e) =>
            Bt(Ut(e, Xn(t.blockedRequest)), () => Gn(t.blockedRequest)),
          ),
        )),
      (parallelCollectionCombine = (e, t) =>
        new ParallelImpl(
          Mo(e.map, t.map, (e, t, n) =>
            Oo(e, n, Rt(Do(e, n), { onNone: () => t, onSome: (e) => $n(t, e) })),
          ),
        )),
      (parallelCollectionIsEmpty = (e) => Eo(e.map)),
      (parallelCollectionKeys = (e) => Array.from(ko(e.map))),
      (parallelCollectionToSequentialCollection = (e) =>
        sequentialCollectionMake(jo(e.map, (e) => Gn(e)))),
      (lc = Symbol.for(`effect/RequestBlock/RequestBlockSequential`)),
      (uc = { _R: (e) => e }),
      (SequentialImpl = class {
        map;
        [lc] = uc;
        constructor(e) {
          this.map = e;
        }
      }),
      (sequentialCollectionMake = (e) => new SequentialImpl(e)),
      (sequentialCollectionCombine = (e, t) =>
        new SequentialImpl(
          Mo(t.map, e.map, (e, t, n) =>
            Oo(e, n, Rt(Do(e, n), { onNone: () => Un(), onSome: (e) => $n(e, t) })),
          ),
        )),
      (sequentialCollectionKeys = (e) => Array.from(ko(e.map))),
      (sequentialCollectionToChunk = (e) => Array.from(e.map)));
  }),
  fc,
  pc,
  mc = __esmMin(() => {
    ((fc = `Pending`), (pc = `Done`));
  }),
  hc,
  gc,
  _c,
  pending,
  vc,
  yc = __esmMin(() => {
    (mc(),
      (hc = `effect/Deferred`),
      (gc = Symbol.for(hc)),
      (_c = { _E: (e) => e, _A: (e) => e }),
      (pending = (e) => ({ _tag: fc, joiners: e })),
      (vc = __name((e) => ({ _tag: pc, effect: e }), `done`)));
  }),
  bc,
  xc = __esmMin(() => {
    bc = class SingleShotGen {
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
  Sc,
  RevertFlags,
  EffectPrimitive,
  EffectPrimitiveFailure,
  EffectPrimitiveSuccess,
  Cc,
  withFiberRuntime,
  wc,
  Tc,
  asVoid,
  custom,
  unsafeAsync,
  asyncInterrupt,
  async_,
  Ec,
  Dc,
  capture,
  die,
  dieMessage,
  Oc,
  exit,
  kc,
  failSync,
  Ac,
  failCauseSync,
  jc,
  fiberIdWith,
  W,
  step,
  Mc,
  Nc,
  Pc,
  Fc,
  Ic,
  Lc,
  Rc,
  zc,
  Bc,
  Vc,
  Hc,
  Uc,
  G,
  K,
  sync,
  Wc,
  transplant,
  uninterruptible,
  Gc,
  Kc,
  updateRuntimeFlags,
  whileLoop,
  qc,
  Jc,
  Yc,
  Xc,
  interruptFiber,
  Zc,
  Qc,
  $c,
  el,
  tl,
  nl,
  rl,
  il,
  al,
  ol,
  sl,
  cl,
  fiberRefGet,
  ll,
  ul,
  dl,
  fl,
  fiberRefUnsafeMake,
  fiberRefUnsafeMakeHashSet,
  fiberRefUnsafeMakeReadonlyArray,
  fiberRefUnsafeMakeContext,
  fiberRefUnsafeMakePatch,
  fiberRefUnsafeMakeRuntimeFlags,
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
  Tl,
  El,
  Dl,
  Ol,
  scopeAddFinalizer,
  scopeClose,
  scopeFork,
  kl,
  makeException,
  Al,
  jl,
  Ml,
  isInterruptedException,
  Nl,
  Pl,
  Fl,
  Il,
  Ll,
  Rl,
  exitIsExit,
  exitIsSuccess,
  zl,
  exitAsVoid,
  exitCollectAll,
  Bl,
  exitFail,
  q,
  Vl,
  Hl,
  Ul,
  J,
  Wl,
  Gl,
  exitCollectAllInternal,
  deferredUnsafeMake,
  deferredAwait,
  deferredUnsafeDone,
  deferredInterruptJoiner,
  Kl,
  context,
  contextWithEffect,
  ql,
  Jl,
  currentSpanFromFiber,
  Y = __esmMin(() => {
    (U(),
      rr(),
      wa(),
      kt(),
      D(),
      Co(),
      s(),
      _(),
      T(),
      No(),
      A(),
      Go(),
      eo(),
      B(),
      j(),
      x(),
      ic(),
      he(),
      qi(),
      yc(),
      Is(),
      Xe(),
      te(),
      mc(),
      Fe(),
      ec(),
      xc(),
      (blocked = (e, t) => {
        let n = new EffectPrimitive(`Blocked`);
        return ((n.effect_instruction_i0 = e), (n.effect_instruction_i1 = t), n);
      }),
      (runRequestBlock = (e) => {
        let t = new EffectPrimitive(`RunBlocked`);
        return ((t.effect_instruction_i0 = e), t);
      }),
      (Sc = Symbol.for(`effect/Effect`)),
      (RevertFlags = class {
        patch;
        op;
        _op = Pe;
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
        [Sc] = He;
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
          return k(this.toJSON());
        }
        [O]() {
          return this.toJSON();
        }
        [Symbol.iterator]() {
          return new bc(new YieldWrap(this));
        }
      }),
      (EffectPrimitiveFailure = class {
        _op;
        effect_instruction_i0 = void 0;
        effect_instruction_i1 = void 0;
        effect_instruction_i2 = void 0;
        trace = void 0;
        [Sc] = He;
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
          return k(this.toJSON());
        }
        [O]() {
          return this.toJSON();
        }
        [Symbol.iterator]() {
          return new bc(new YieldWrap(this));
        }
      }),
      (EffectPrimitiveSuccess = class {
        _op;
        effect_instruction_i0 = void 0;
        effect_instruction_i1 = void 0;
        effect_instruction_i2 = void 0;
        trace = void 0;
        [Sc] = He;
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
          return k(this.toJSON());
        }
        [O]() {
          return this.toJSON();
        }
        [Symbol.iterator]() {
          return new bc(new YieldWrap(this));
        }
      }),
      (Cc = __name((e) => b(e, Sc), `isEffect`)),
      (withFiberRuntime = (e) => {
        let t = new EffectPrimitive(Me);
        return ((t.effect_instruction_i0 = e), t);
      }),
      (wc = dual(3, (e, t, n) =>
        Gc((r) =>
          W(e, (e) =>
            W(exit(K(() => r(t(e)))), (t) =>
              K(() => n(e, t)).pipe(
                Pc({
                  onFailure: (e) => {
                    switch (t._tag) {
                      case Ce:
                        return Ac(Ni(t.effect_instruction_i0, e));
                      case De:
                        return Ac(e);
                    }
                  },
                  onSuccess: () => t,
                }),
              ),
            ),
          ),
        ),
      )),
      (Tc = dual(2, (e, t) => W(e, () => G(t)))),
      (asVoid = (e) => Tc(e, void 0)),
      (custom = function () {
        let e = new EffectPrimitive(Se);
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
      (unsafeAsync = (e, t = _o) => {
        let n = new EffectPrimitive(xe),
          r;
        return (
          (n.effect_instruction_i0 = (t) => {
            r = e(t);
          }),
          (n.effect_instruction_i1 = t),
          Uc(n, (e) => (Cc(r) ? r : Kc))
        );
      }),
      (asyncInterrupt = (e, t = _o) => K(() => unsafeAsync(e, t))),
      (async_ = (e, t = _o) =>
        custom(e, function () {
          let e, n;
          function proxyResume(t) {
            e ? e(t) : n === void 0 && (n = t);
          }
          let r = new EffectPrimitive(xe);
          ((r.effect_instruction_i0 = (t) => {
            ((e = t), n && t(n));
          }),
            (r.effect_instruction_i1 = t));
          let i, a;
          return (
            this.effect_instruction_i0.length === 1
              ? (i = me(() => this.effect_instruction_i0(proxyResume)))
              : ((a = new AbortController()),
                (i = me(() => this.effect_instruction_i0(proxyResume, a.signal)))),
            i || a ? Uc(r, (e) => (a && a.abort(), i ?? Kc)) : r
          );
        })),
      (Ec = dual(2, (e, t) => Fc(e, { onFailure: t, onSuccess: G }))),
      (Dc = Symbol.for(`effect/OriginalAnnotation`)),
      (capture = (e, t) =>
        R(t)
          ? new Proxy(e, {
              has(e, t) {
                return t === Ki || t === Dc || t in e;
              },
              get(n, r) {
                return r === Ki ? t.value : r === Dc ? e : n[r];
              },
            })
          : e),
      (die = (e) =>
        y(e) && !(Ki in e)
          ? withFiberRuntime((t) => Ac(ji(capture(e, currentSpanFromFiber(t)))))
          : Ac(ji(e))),
      (dieMessage = (e) => failCauseSync(() => ji(new jl(e)))),
      (Oc = __name(
        (e) => Fc(e, { onFailure: (e) => G(N(e)), onSuccess: (e) => G(M(e)) }),
        `either`,
      )),
      (exit = (e) => Nc(e, { onFailure: q, onSuccess: J })),
      (kc = __name(
        (e) =>
          y(e) && !(Ki in e)
            ? withFiberRuntime((t) => Ac(Ai(capture(e, currentSpanFromFiber(t)))))
            : Ac(Ai(e)),
        `fail`,
      )),
      (failSync = (e) => W(sync(e), kc)),
      (Ac = __name((e) => {
        let t = new EffectPrimitiveFailure(Ce);
        return ((t.effect_instruction_i0 = e), t);
      }, `failCause`)),
      (failCauseSync = (e) => W(sync(e), Ac)),
      (jc = withFiberRuntime((e) => G(e.id()))),
      (fiberIdWith = (e) => withFiberRuntime((t) => e(t.id()))),
      (W = dual(2, (e, t) => {
        let n = new EffectPrimitive(Te);
        return ((n.effect_instruction_i0 = e), (n.effect_instruction_i1 = t), n);
      })),
      (step = (e) => {
        let t = new EffectPrimitive(`OnStep`);
        return ((t.effect_instruction_i0 = e), t);
      }),
      (Mc = __name((e) => W(e, identity), `flatten`)),
      (Nc = dual(2, (e, t) =>
        Pc(e, { onFailure: (e) => G(t.onFailure(e)), onSuccess: (e) => G(t.onSuccess(e)) }),
      )),
      (Pc = dual(2, (e, t) => {
        let n = new EffectPrimitive(Ee);
        return (
          (n.effect_instruction_i0 = e),
          (n.effect_instruction_i1 = t.onFailure),
          (n.effect_instruction_i2 = t.onSuccess),
          n
        );
      })),
      (Fc = dual(2, (e, t) =>
        Pc(e, {
          onFailure: (e) => {
            if (defects(e).length > 0) return Ac(electFailures(e));
            let n = failures(e);
            return n.length > 0 ? t.onFailure(unsafeHead(n)) : Ac(e);
          },
          onSuccess: t.onSuccess,
        }),
      )),
      (Ic = dual(2, (e, t) =>
        K(() => {
          let n = V(e),
            r = allocate(n.length),
            i = 0;
          return Tc(
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
      (Lc = dual(2, (e, t) =>
        K(() => {
          let n = V(e),
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
      (Rc = __name((e) => {
        let t = new EffectPrimitive(ke);
        return ((t.effect_instruction_i0 = tc(1)), (t.effect_instruction_i1 = () => e), t);
      }, `interruptible`)),
      (zc = dual(2, (e, t) => W(e, (e) => sync(() => t(e))))),
      (Bc = dual(2, (e, t) =>
        Fc(e, {
          onFailure: (e) => failSync(() => t.onFailure(e)),
          onSuccess: (e) => sync(() => t.onSuccess(e)),
        }),
      )),
      (Vc = dual(2, (e, t) =>
        Pc(e, {
          onFailure: (e) => {
            let n = failureOrCause(e);
            switch (n._tag) {
              case `Left`:
                return failSync(() => t(n.left));
              case `Right`:
                return Ac(n.right);
            }
          },
          onSuccess: G,
        }),
      )),
      (Hc = dual(2, (e, t) =>
        Gc((n) =>
          Pc(n(e), {
            onFailure: (e) => {
              let n = q(e);
              return Pc(t(n), { onFailure: (t) => q(Ni(e, t)), onSuccess: () => n });
            },
            onSuccess: (e) => {
              let n = J(e);
              return Xc(t(n), n);
            },
          }),
        ),
      )),
      (Uc = dual(2, (e, t) =>
        Hc(
          e,
          Ul({
            onFailure: (e) => (isInterruptedOnly(e) ? asVoid(t(interruptors(e))) : Kc),
            onSuccess: () => Kc,
          }),
        ),
      )),
      (G = __name((e) => {
        let t = new EffectPrimitiveSuccess(De);
        return ((t.effect_instruction_i0 = e), t);
      }, `succeed`)),
      (K = __name((e) => {
        let t = new EffectPrimitive(Se);
        return ((t.commit = e), t);
      }, `suspend`)),
      (sync = (e) => {
        let t = new EffectPrimitive(Oe);
        return ((t.effect_instruction_i0 = e), t);
      }),
      (Wc = dual(
        (e) => e.length === 3 || (e.length === 2 && !(y(e[1]) && `onlyEffect` in e[1])),
        (e, t) =>
          W(e, (e) => {
            let n = typeof t == `function` ? t(e) : t;
            return Cc(n)
              ? Tc(n, e)
              : isPromiseLike(n)
                ? unsafeAsync((t) => {
                    n.then(
                      (n) => t(G(e)),
                      (e) => t(kc(new Rl(e, `An unknown error occurred in Effect.tap`))),
                    );
                  })
                : G(e);
          }),
      )),
      (transplant = (e) =>
        withFiberRuntime((t) => {
          let n = pipe(
            t.getFiberRef(Tl),
            z(() => t.scope()),
          );
          return e(fl(Tl, I(n)));
        })),
      (uninterruptible = (e) => {
        let t = new EffectPrimitive(ke);
        return ((t.effect_instruction_i0 = nc(1)), (t.effect_instruction_i1 = () => e), t);
      }),
      (Gc = __name(
        (e) =>
          custom(e, function () {
            let e = new EffectPrimitive(ke);
            return (
              (e.effect_instruction_i0 = nc(1)),
              (e.effect_instruction_i1 = (e) =>
                interruption(e)
                  ? me(() => this.effect_instruction_i0(Rc))
                  : me(() => this.effect_instruction_i0(uninterruptible))),
              e
            );
          }),
        `uninterruptibleMask`,
      )),
      (Kc = G(void 0)),
      (updateRuntimeFlags = (e) => {
        let t = new EffectPrimitive(ke);
        return ((t.effect_instruction_i0 = e), (t.effect_instruction_i1 = void 0), t);
      }),
      (whileLoop = (e) => {
        let t = new EffectPrimitive(Ae);
        return (
          (t.effect_instruction_i0 = e.while),
          (t.effect_instruction_i1 = e.body),
          (t.effect_instruction_i2 = e.step),
          t
        );
      }),
      (qc = __name((e) => {
        let t = new EffectPrimitive(Ne);
        return e?.priority === void 0 ? t : yl(t, e.priority);
      }, `yieldNow`)),
      (Jc = dual(2, (e, t) => W(e, (e) => zc(t, (t) => [e, t])))),
      (Yc = dual(2, (e, t) => W(e, (e) => Tc(t, e)))),
      (Xc = dual(2, (e, t) => W(e, () => t))),
      (interruptFiber = (e) => W(jc, (t) => pipe(e, Zc(t)))),
      (Zc = dual(2, (e, t) => W(e.interruptAsFork(t), () => e.await))),
      (Qc = {
        _tag: `All`,
        syslog: 0,
        label: `ALL`,
        ordinal: -(2 ** 53 - 1),
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      ($c = {
        _tag: `Fatal`,
        syslog: 2,
        label: `FATAL`,
        ordinal: 5e4,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (el = {
        _tag: `Error`,
        syslog: 3,
        label: `ERROR`,
        ordinal: 4e4,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (tl = {
        _tag: `Warning`,
        syslog: 4,
        label: `WARN`,
        ordinal: 3e4,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (nl = {
        _tag: `Info`,
        syslog: 6,
        label: `INFO`,
        ordinal: 2e4,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (rl = {
        _tag: `Debug`,
        syslog: 7,
        label: `DEBUG`,
        ordinal: 1e4,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (il = {
        _tag: `Trace`,
        syslog: 7,
        label: `TRACE`,
        ordinal: 0,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (al = {
        _tag: `None`,
        syslog: 7,
        label: `OFF`,
        ordinal: 2 ** 53 - 1,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (ol = `effect/FiberRef`),
      (sl = Symbol.for(ol)),
      (cl = { _A: (e) => e }),
      (fiberRefGet = (e) => withFiberRuntime((t) => J(t.getFiberRef(e)))),
      (ll = dual(2, (e, t) => W(fiberRefGet(e), t))),
      (ul = dual(2, (e, t) => dl(e, () => [void 0, t]))),
      (dl = dual(2, (e, t) =>
        withFiberRuntime((n) => {
          let [r, i] = t(n.getFiberRef(e));
          return (n.setFiberRef(e, i), G(r));
        }),
      )),
      (fl = dual(3, (e, t, n) =>
        wc(
          Yc(fiberRefGet(t), ul(t, n)),
          () => e,
          (e) => ul(t, e),
        ),
      )),
      (fiberRefUnsafeMake = (e, t) =>
        fiberRefUnsafeMakePatch(e, { differ: Fs(), fork: t?.fork ?? identity, join: t?.join })),
      (fiberRefUnsafeMakeHashSet = (e) => {
        let t = hashSet();
        return fiberRefUnsafeMakePatch(e, { differ: t, fork: t.empty });
      }),
      (fiberRefUnsafeMakeReadonlyArray = (e) => {
        let t = readonlyArray(Fs());
        return fiberRefUnsafeMakePatch(e, { differ: t, fork: t.empty });
      }),
      (fiberRefUnsafeMakeContext = (e) => {
        let t = environment();
        return fiberRefUnsafeMakePatch(e, { differ: t, fork: t.empty });
      }),
      (fiberRefUnsafeMakePatch = (e, t) => ({
        ...qe,
        [sl]: cl,
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
        fiberRefUnsafeMakePatch(e, { differ: $s, fork: $s.empty })),
      (pl = globalValue(Symbol.for(`effect/FiberRef/currentContext`), () =>
        fiberRefUnsafeMakeContext(ha()),
      )),
      (ml = globalValue(Symbol.for(`effect/FiberRef/currentSchedulingPriority`), () =>
        fiberRefUnsafeMake(0),
      )),
      (hl = globalValue(Symbol.for(`effect/FiberRef/currentMaxOpsBeforeYield`), () =>
        fiberRefUnsafeMake(2048),
      )),
      (gl = globalValue(Symbol.for(`effect/FiberRef/currentLogAnnotation`), () =>
        fiberRefUnsafeMake(wo()),
      )),
      (_l = globalValue(Symbol.for(`effect/FiberRef/currentLogLevel`), () =>
        fiberRefUnsafeMake(nl),
      )),
      (vl = globalValue(Symbol.for(`effect/FiberRef/currentLogSpan`), () =>
        fiberRefUnsafeMake(Bo()),
      )),
      (yl = dual(2, (e, t) => fl(e, ml, t))),
      (bl = globalValue(Symbol.for(`effect/FiberRef/currentConcurrency`), () =>
        fiberRefUnsafeMake(`unbounded`),
      )),
      (xl = globalValue(Symbol.for(`effect/FiberRef/currentRequestBatching`), () =>
        fiberRefUnsafeMake(!0),
      )),
      (Sl = globalValue(Symbol.for(`effect/FiberRef/currentUnhandledErrorLogLevel`), () =>
        fiberRefUnsafeMake(I(rl)),
      )),
      (Cl = globalValue(Symbol.for(`effect/FiberRef/versionMismatchErrorLogLevel`), () =>
        fiberRefUnsafeMake(I(tl)),
      )),
      (wl = globalValue(Symbol.for(`effect/FiberRef/currentMetricLabels`), () =>
        fiberRefUnsafeMakeReadonlyArray(Dn()),
      )),
      (Tl = globalValue(Symbol.for(`effect/FiberRef/currentForkScopeOverride`), () =>
        fiberRefUnsafeMake(F(), { fork: () => F(), join: (e, t) => e }),
      )),
      (El = globalValue(Symbol.for(`effect/FiberRef/currentInterruptedCause`), () =>
        fiberRefUnsafeMake(ki, { fork: () => ki, join: (e, t) => e }),
      )),
      (Dl = Symbol.for(`effect/Scope`)),
      (Ol = Symbol.for(`effect/CloseableScope`)),
      (scopeAddFinalizer = (e, t) => e.addFinalizer(() => asVoid(t))),
      (scopeClose = (e, t) => e.close(t)),
      (scopeFork = (e, t) => e.fork(t)),
      (kl = (function () {
        class YieldableError extends globalThis.Error {
          commit() {
            return kc(this);
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
                ? Ui(Ai(this), { renderErrorCause: !0 })
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
        return (Object.assign(YieldableError.prototype, Je), YieldableError);
      })()),
      (makeException = (e, t) => {
        class Base extends kl {
          _tag = t;
        }
        return (Object.assign(Base.prototype, e), (Base.prototype.name = t), Base);
      }),
      (Al = Symbol.for(`effect/Cause/errors/RuntimeException`)),
      (jl = makeException({ [Al]: Al }, `RuntimeException`)),
      (Ml = Symbol.for(`effect/Cause/errors/InterruptedException`)),
      (isInterruptedException = (e) => b(e, Ml)),
      (Nl = Symbol.for(`effect/Cause/errors/IllegalArgument`)),
      (Pl = makeException({ [Nl]: Nl }, `IllegalArgumentException`)),
      (Fl = Symbol.for(`effect/Cause/errors/NoSuchElement`)),
      (Il = makeException({ [Fl]: Fl }, `NoSuchElementException`)),
      (Ll = Symbol.for(`effect/Cause/errors/UnknownException`)),
      (Rl = (function () {
        class UnknownException extends kl {
          _tag = `UnknownException`;
          error;
          constructor(e, t) {
            (super(t ?? `An unknown error occurred`, { cause: e }), (this.error = e));
          }
        }
        return (
          Object.assign(UnknownException.prototype, { [Ll]: Ll, name: `UnknownException` }),
          UnknownException
        );
      })()),
      (exitIsExit = (e) => Cc(e) && `_tag` in e && (e._tag === `Success` || e._tag === `Failure`)),
      (exitIsSuccess = (e) => e._tag === `Success`),
      (zl = dual(2, (e, t) => {
        switch (e._tag) {
          case Ce:
            return q(e.effect_instruction_i0);
          case De:
            return J(t);
        }
      })),
      (exitAsVoid = (e) => zl(e, void 0)),
      (exitCollectAll = (e, t) => exitCollectAllInternal(e, t?.parallel ? Mi : Ni)),
      (Bl = __name((e) => q(ji(e)), `exitDie`)),
      (exitFail = (e) => q(Ai(e))),
      (q = __name((e) => {
        let t = new EffectPrimitiveFailure(Ce);
        return ((t.effect_instruction_i0 = e), t);
      }, `exitFailCause`)),
      (Vl = __name((e) => q(interrupt(e)), `exitInterrupt`)),
      (Hl = dual(2, (e, t) => {
        switch (e._tag) {
          case Ce:
            return q(e.effect_instruction_i0);
          case De:
            return J(t(e.effect_instruction_i0));
        }
      })),
      (Ul = dual(2, (e, { onFailure: t, onSuccess: n }) => {
        switch (e._tag) {
          case Ce:
            return t(e.effect_instruction_i0);
          case De:
            return n(e.effect_instruction_i0);
        }
      })),
      (J = __name((e) => {
        let t = new EffectPrimitiveSuccess(De);
        return ((t.effect_instruction_i0 = e), t);
      }, `exitSucceed`)),
      (Wl = J(void 0)),
      (Gl = dual(3, (e, t, { onFailure: n, onSuccess: r }) => {
        switch (e._tag) {
          case Ce:
            switch (t._tag) {
              case De:
                return q(e.effect_instruction_i0);
              case Ce:
                return q(n(e.effect_instruction_i0, t.effect_instruction_i0));
            }
          case De:
            switch (t._tag) {
              case De:
                return J(r(e.effect_instruction_i0, t.effect_instruction_i0));
              case Ce:
                return q(t.effect_instruction_i0);
            }
        }
      })),
      (exitCollectAllInternal = (e, t) => {
        let n = Kn(e);
        return tr(n)
          ? pipe(
              tailNonEmpty(n),
              Nn(pipe(nr(n), Hl(Gn)), (e, n) =>
                pipe(e, Gl(n, { onSuccess: (e, t) => pipe(e, Zn(t)), onFailure: t })),
              ),
              Hl(Jn),
              Hl((e) => qn(e)),
              I,
            )
          : F();
      }),
      (deferredUnsafeMake = (e) => ({
        ...qe,
        [gc]: _c,
        state: Za(pending([])),
        commit() {
          return deferredAwait(this);
        },
        blockingOn: e,
      })),
      (deferredAwait = (e) =>
        asyncInterrupt((t) => {
          let n = Qa(e.state);
          switch (n._tag) {
            case pc:
              return t(n.effect);
            case fc:
              return (n.joiners.push(t), deferredInterruptJoiner(e, t));
          }
        }, e.blockingOn)),
      (deferredUnsafeDone = (e, t) => {
        let n = Qa(e.state);
        if (n._tag === `Pending`) {
          $a(e.state, vc(t));
          for (let e = 0, r = n.joiners.length; e < r; e++) n.joiners[e](t);
        }
      }),
      (deferredInterruptJoiner = (e, t) =>
        sync(() => {
          let n = Qa(e.state);
          if (n._tag === `Pending`) {
            let e = n.joiners.indexOf(t);
            e >= 0 && n.joiners.splice(e, 1);
          }
        })),
      (Kl = withFiberRuntime((e) => J(e.currentContext))),
      (context = () => Kl),
      (contextWithEffect = (e) => W(context(), e)),
      (ql = dual(2, (e, t) => fl(pl, t)(e))),
      (Jl = dual(2, (e, t) => contextWithEffect((n) => ql(e, t(n))))),
      (currentSpanFromFiber = (e) => {
        let t = e.currentSpan;
        return t !== void 0 && t._tag === `Span` ? I(t) : F();
      }));
  }),
  Yl,
  Xl,
  Zl,
  Ql,
  $l,
  eu,
  tu,
  ClockImpl,
  nu,
  ru = __esmMin(() => {
    (wa(),
      Ja(),
      s(),
      Y(),
      (Yl = `effect/Clock`),
      (Xl = Symbol.for(Yl)),
      (Zl = ma(`effect/Clock`)),
      (Ql = 2 ** 31 - 1),
      ($l = {
        unsafeSchedule(e, t) {
          let n = toMillis(t);
          if (n > Ql) return i;
          let r = !1,
            a = setTimeout(() => {
              ((r = !0), e());
            }, n);
          return () => (clearTimeout(a), !r);
        },
      }),
      (eu = (function () {
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
      (tu = (function () {
        let e =
          typeof process == `object` &&
          `hrtime` in process &&
          typeof process.hrtime.bigint == `function`
            ? process.hrtime
            : void 0;
        if (!e) return eu;
        let t = eu() - e.bigint();
        return () => t + e.bigint();
      })()),
      (ClockImpl = class {
        [Xl] = Xl;
        unsafeCurrentTimeMillis() {
          return Date.now();
        }
        unsafeCurrentTimeNanos() {
          return tu();
        }
        currentTimeMillis = sync(() => this.unsafeCurrentTimeMillis());
        currentTimeNanos = sync(() => this.unsafeCurrentTimeNanos());
        scheduler() {
          return G($l);
        }
        sleep(e) {
          return async_((t) => {
            let n = $l.unsafeSchedule(() => t(Kc), e);
            return asVoid(sync(n));
          });
        }
      }),
      (nu = __name(() => new ClockImpl(), `make`)));
  }),
  iu,
  parse,
  au = __esmMin(() => {
    (st(),
      It(),
      (iu = Nt),
      (parse = (e) => {
        if (e === `NaN`) return ot(NaN);
        if (e === `Infinity`) return ot(1 / 0);
        if (e === `-Infinity`) return ot(-1 / 0);
        if (e.trim() === ``) return at;
        let t = Number(e);
        return Number.isNaN(t) ? at : ot(t);
      }));
  }),
  escape,
  ou = __esmMin(() => {
    escape = (e) => e.replace(/[/\\^$*+?.()|[\]{}]/g, `\\$&`);
  }),
  su,
  cu,
  lu,
  uu,
  du = __esmMin(() => {
    ((su = `InvalidData`), (cu = `MissingData`), (lu = `SourceUnavailable`), (uu = `Unsupported`));
  }),
  fu,
  pu,
  mu,
  And,
  Or,
  InvalidData,
  MissingData,
  SourceUnavailable,
  Unsupported,
  hu,
  gu,
  _u = __esmMin(() => {
    (U(),
      kt(),
      s(),
      du(),
      (fu = `effect/ConfigError`),
      (pu = Symbol.for(fu)),
      (mu = { _tag: `ConfigError`, [pu]: pu }),
      (And = (e, t) => {
        let n = Object.create(mu);
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
        let n = Object.create(mu);
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
        let r = Object.create(mu);
        return (
          (r._op = su),
          (r.path = e),
          (r.message = t),
          Object.defineProperty(r, "toString", {
            enumerable: !1,
            value() {
              return `(Invalid data at ${pipe(this.path, In(n.pathDelim))}: "${this.message}")`;
            },
          }),
          r
        );
      }),
      (MissingData = (e, t, n = { pathDelim: `.` }) => {
        let r = Object.create(mu);
        return (
          (r._op = cu),
          (r.path = e),
          (r.message = t),
          Object.defineProperty(r, "toString", {
            enumerable: !1,
            value() {
              return `(Missing data at ${pipe(this.path, In(n.pathDelim))}: "${this.message}")`;
            },
          }),
          r
        );
      }),
      (SourceUnavailable = (e, t, n, r = { pathDelim: `.` }) => {
        let i = Object.create(mu);
        return (
          (i._op = lu),
          (i.path = e),
          (i.message = t),
          (i.cause = n),
          Object.defineProperty(i, "toString", {
            enumerable: !1,
            value() {
              return `(Source unavailable at ${pipe(this.path, In(r.pathDelim))}: "${this.message}")`;
            },
          }),
          i
        );
      }),
      (Unsupported = (e, t, n = { pathDelim: `.` }) => {
        let r = Object.create(mu);
        return (
          (r._op = uu),
          (r.path = e),
          (r.message = t),
          Object.defineProperty(r, "toString", {
            enumerable: !1,
            value() {
              return `(Unsupported operation at ${pipe(this.path, In(n.pathDelim))}: "${this.message}")`;
            },
          }),
          r
        );
      }),
      (hu = dual(2, (e, t) => {
        switch (e._op) {
          case `And`:
            return And(hu(e.left, t), hu(e.right, t));
          case `Or`:
            return Or(hu(e.left, t), hu(e.right, t));
          case su:
            return InvalidData([...t, ...e.path], e.message);
          case cu:
            return MissingData([...t, ...e.path], e.message);
          case lu:
            return SourceUnavailable([...t, ...e.path], e.message, e.cause);
          case uu:
            return Unsupported([...t, ...e.path], e.message);
        }
      })),
      (gu = dual(3, (e, t, n) => {
        let r = [e],
          i = [];
        for (; r.length > 0;) {
          let e = r.pop();
          switch (e._op) {
            case `And`:
              (r.push(e.right), r.push(e.left), i.push(N({ _op: `AndCase` })));
              break;
            case `Or`:
              (r.push(e.right), r.push(e.left), i.push(N({ _op: `OrCase` })));
              break;
            case su:
              i.push(M(n.invalidDataCase(t, e.path, e.message)));
              break;
            case cu:
              i.push(M(n.missingDataCase(t, e.path, e.message)));
              break;
            case lu:
              i.push(M(n.sourceUnavailableCase(t, e.path, e.message, e.cause)));
              break;
            case uu:
              i.push(M(n.unsupportedCase(t, e.path, e.message)));
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
  vu,
  yu,
  bu = __esmMin(() => {
    (U(),
      kt(),
      s(),
      Go(),
      B(),
      _u(),
      (vu = { _tag: `Empty` }),
      (yu = dual(2, (e, t) => {
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
              ((r = kn(r, e.f)), (n = n.tail));
              break;
            case `Nested`:
              ((r = nn(r, e.name)), (n = n.tail));
              break;
            case `Unnested`:
              if (pipe(dn(r), Xt(e.name))) ((r = mn(r)), (n = n.tail));
              else
                return N(
                  MissingData(r, `Expected ${e.name} to be in path in ConfigProvider#unnested`),
                );
              break;
          }
        }
        return M(r);
      })));
  }),
  xu,
  Su,
  Cu,
  wu,
  Tu,
  Eu,
  Du,
  Ou,
  ku,
  Au,
  ju,
  Mu,
  Nu = __esmMin(() => {
    ((xu = `Constant`),
      (Su = `Fail`),
      (Cu = `Fallback`),
      (wu = `Described`),
      (Tu = `Lazy`),
      (Eu = `MapOrFail`),
      (Du = `Nested`),
      (Ou = `Primitive`),
      (ku = `Redacted`),
      (Au = `Sequence`),
      (ju = `HashMap`),
      (Mu = `ZipWith`));
  }),
  Pu,
  Fu,
  Iu,
  Lu,
  Ru,
  zu,
  Bu,
  makeFlat,
  fromFlat,
  fromEnv,
  Vu,
  appendConfigPath,
  Hu,
  redactConfigError,
  fromFlatLoop,
  fromFlatLoopFail,
  splitPathString,
  parsePrimitive,
  transpose,
  indicesFrom,
  Uu,
  parseQuotedIndex,
  parseInteger,
  Wu = __esmMin(() => {
    (U(),
      wa(),
      kt(),
      s(),
      No(),
      vi(),
      au(),
      B(),
      j(),
      ou(),
      _u(),
      bu(),
      Y(),
      Nu(),
      (Pu = __name((e, t) => [...e, ...t], `concat`)),
      (Fu = `effect/ConfigProvider`),
      (Iu = Symbol.for(Fu)),
      (Lu = ma(`effect/ConfigProvider`)),
      (Ru = `effect/ConfigProviderFlat`),
      (zu = Symbol.for(Ru)),
      (Bu = __name(
        (e) => ({
          [Iu]: Iu,
          pipe() {
            return pipeArguments(this, arguments);
          },
          ...e,
        }),
        `make`,
      )),
      (makeFlat = (e) => ({
        [zu]: zu,
        patch: e.patch,
        load: (t, n, r = !0) => e.load(t, n, r),
        enumerateChildren: e.enumerateChildren,
      })),
      (fromFlat = (e) =>
        Bu({
          load: (t) =>
            W(fromFlatLoop(e, Dn(), t, !1), (e) =>
              Rt(dn(e), {
                onNone: () =>
                  kc(MissingData(Dn(), `Expected a single value having structure: ${t}`)),
                onSome: G,
              }),
            ),
          flattened: e,
        })),
      (fromEnv = (e) => {
        let { pathDelim: t, seqDelim: n } = Object.assign({}, { pathDelim: `_`, seqDelim: `,` }, e),
          makePathString = (e) => pipe(e, In(t)),
          unmakePathString = (e) => e.split(t),
          getEnv = () =>
            typeof process < `u` && `env` in process && typeof process.env == `object`
              ? process.env
              : {},
          load = (e, t, r = !0) => {
            let i = makePathString(e),
              a = getEnv();
            return pipe(
              i in a ? I(a[i]) : F(),
              Vc(() => MissingData(e, `Expected ${i} to exist in the process context`)),
              W((i) => parsePrimitive(i, e, t, n, r)),
            );
          },
          enumerateChildren = (e) =>
            sync(() => {
              let t = getEnv(),
                n = Object.keys(t)
                  .map((e) => unmakePathString(e.toUpperCase()))
                  .filter((t) => {
                    for (let n = 0; n < e.length; n++) {
                      let r = pipe(e, un(n)),
                        i = t[n];
                      if (i === void 0 || r !== i) return !1;
                    }
                    return !0;
                  })
                  .flatMap((t) => t.slice(e.length, e.length + 1));
              return li(n);
            });
        return fromFlat(makeFlat({ load, enumerateChildren, patch: vu }));
      }),
      (Vu = __name((e, t, n, r) => {
        let i = unfold(n.length, (t) => (t >= r.length ? F() : I([e(t), t + 1]))),
          a = unfold(r.length, (e) => (e >= n.length ? F() : I([t(e), e + 1])));
        return [Pu(n, i), Pu(r, a)];
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
      (Hu = {
        andCase: (e, t, n) => And(t, n),
        orCase: (e, t, n) => Or(t, n),
        invalidDataCase: (e, t) => InvalidData(t, `<redacted>`),
        missingDataCase: (e, t) => MissingData(t, `<redacted>`),
        sourceUnavailableCase: (e, t, n, r) => SourceUnavailable(t, `<redacted>`, r),
        unsupportedCase: (e, t) => Unsupported(t, `<redacted>`),
      }),
      (redactConfigError = (e) => gu(e, void 0, Hu)),
      (fromFlatLoop = (e, t, n, r) => {
        let i = n;
        switch (i._tag) {
          case xu:
            return G(On(i.value));
          case wu:
            return K(() => fromFlatLoop(e, t, i.config, r));
          case Su:
            return kc(MissingData(t, i.message));
          case Cu:
            return pipe(
              K(() => fromFlatLoop(e, t, i.first, r)),
              Ec((n) =>
                i.condition(n)
                  ? pipe(
                      fromFlatLoop(e, t, i.second, r),
                      Ec((e) => kc(Or(n, e))),
                    )
                  : kc(n),
              ),
            );
          case Tu:
            return K(() => fromFlatLoop(e, t, i.config(), r));
          case Eu:
            return K(() =>
              pipe(
                fromFlatLoop(e, t, i.original, r),
                W(Ic((e) => pipe(i.mapOrFail(e), Vc(hu(appendConfigPath(t, i.original)))))),
              ),
            );
          case Du:
            return K(() => fromFlatLoop(e, Pu(t, On(i.name)), i.config, r));
          case Ou:
            return pipe(
              yu(t, e.patch),
              W((t) =>
                pipe(
                  e.load(t, i, r),
                  W((e) => {
                    if (e.length === 0) {
                      let e = pipe(
                        last(t),
                        z(() => `<n/a>`),
                      );
                      return kc(MissingData([], `Expected ${i.description} with name ${e}`));
                    }
                    return G(e);
                  }),
                ),
              ),
            );
          case ku:
            return K(() =>
              pipe(fromFlatLoop(e, t, i.original, r), Vc(redactConfigError), zc(kn(i.redact))),
            );
          case Au:
            return pipe(
              yu(t, e.patch),
              W((n) =>
                pipe(
                  e.enumerateChildren(n),
                  W(indicesFrom),
                  W((n) =>
                    n.length === 0
                      ? K(() => zc(fromFlatLoop(e, t, i.config, !0), On))
                      : pipe(
                          Ic(n, (n) => fromFlatLoop(e, rn(t, `[${n}]`), i.config, !0)),
                          zc((e) => {
                            let t = jn(e);
                            return t.length === 0 ? On(Dn()) : On(t);
                          }),
                        ),
                  ),
                ),
              ),
            );
          case ju:
            return K(() =>
              pipe(
                yu(t, e.patch),
                W((t) =>
                  pipe(
                    e.enumerateChildren(t),
                    W((n) =>
                      pipe(
                        n,
                        Ic((n) => fromFlatLoop(e, Pu(t, On(n)), i.valueConfig, r)),
                        zc((e) =>
                          e.length === 0
                            ? On(wo())
                            : pipe(
                                transpose(e),
                                kn((e) => To(yn(V(n), e))),
                              ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            );
          case Mu:
            return K(() =>
              pipe(
                fromFlatLoop(e, t, i.left, r),
                Oc,
                W((n) =>
                  pipe(
                    fromFlatLoop(e, t, i.right, r),
                    Oc,
                    W((e) => {
                      if (P(n) && P(e)) return kc(And(n.left, e.left));
                      if (P(n) && xt(e)) return kc(n.left);
                      if (xt(n) && P(e)) return kc(e.left);
                      if (xt(n) && xt(e)) {
                        let r = pipe(t, In(`.`)),
                          a = fromFlatLoopFail(t, r),
                          [o, s] = Vu(a, a, pipe(n.right, kn(M)), pipe(e.right, kn(M)));
                        return pipe(
                          o,
                          yn(s),
                          Ic(([e, t]) =>
                            pipe(
                              Jc(e, t),
                              zc(([e, t]) => i.zip(e, t)),
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
        N(MissingData(e, `The element at index ${n} in a sequence at path "${t}" was missing`))),
      (splitPathString = (e, t) => e.split(RegExp(`\\s*${escape(t)}\\s*`))),
      (parsePrimitive = (e, t, n, r, i) =>
        i
          ? pipe(
              splitPathString(e, r),
              Ic((e) => n.parse(e.trim())),
              Vc(hu(t)),
            )
          : pipe(n.parse(e), Bc({ onFailure: hu(t), onSuccess: On }))),
      (transpose = (e) => Object.keys(e[0]).map((t) => e.map((e) => e[t]))),
      (indicesFrom = (e) =>
        pipe(
          Ic(e, parseQuotedIndex),
          Bc({ onFailure: () => Dn(), onSuccess: vn(iu) }),
          Oc,
          zc(Et),
        )),
      (Uu = /^(\[(\d+)\])$/),
      (parseQuotedIndex = (e) => {
        let t = e.match(Uu);
        if (t !== null) {
          let e = t[2];
          return pipe(e !== void 0 && e.length > 0 ? I(e) : F(), Wt(parseInteger));
        }
        return F();
      }),
      (parseInteger = (e) => {
        let t = Number.parseInt(e);
        return Number.isNaN(t) ? F() : I(t);
      }));
  }),
  Gu,
  Ku,
  qu,
  Ju = __esmMin(() => {
    (wa(),
      Y(),
      (Gu = Symbol.for(`effect/Console`)),
      (Ku = ma(`effect/Console`)),
      (qu = {
        [Gu]: Gu,
        assert(e, ...t) {
          return sync(() => {
            console.assert(e, ...t);
          });
        },
        clear: sync(() => {
          console.clear();
        }),
        count(e) {
          return sync(() => {
            console.count(e);
          });
        },
        countReset(e) {
          return sync(() => {
            console.countReset(e);
          });
        },
        debug(...e) {
          return sync(() => {
            console.debug(...e);
          });
        },
        dir(e, t) {
          return sync(() => {
            console.dir(e, t);
          });
        },
        dirxml(...e) {
          return sync(() => {
            console.dirxml(...e);
          });
        },
        error(...e) {
          return sync(() => {
            console.error(...e);
          });
        },
        group(e) {
          return e?.collapsed
            ? sync(() => console.groupCollapsed(e?.label))
            : sync(() => console.group(e?.label));
        },
        groupEnd: sync(() => {
          console.groupEnd();
        }),
        info(...e) {
          return sync(() => {
            console.info(...e);
          });
        },
        log(...e) {
          return sync(() => {
            console.log(...e);
          });
        },
        table(e, t) {
          return sync(() => {
            console.table(e, t);
          });
        },
        time(e) {
          return sync(() => console.time(e));
        },
        timeEnd(e) {
          return sync(() => console.timeEnd(e));
        },
        timeLog(e, ...t) {
          return sync(() => {
            console.timeLog(e, ...t);
          });
        },
        trace(...e) {
          return sync(() => {
            console.trace(...e);
          });
        },
        warn(...e) {
          return sync(() => {
            console.warn(...e);
          });
        },
        unsafe: console,
      }));
  }),
  Yu,
  Xu,
  Zu,
  RandomImpl,
  shuffleWith,
  Qu,
  $u,
  ed = __esmMin(() => {
    (rr(),
      wa(),
      s(),
      T(),
      he(),
      Y(),
      (Yu = `effect/Random`),
      (Xu = Symbol.for(Yu)),
      (Zu = ma(`effect/Random`)),
      (RandomImpl = class {
        seed;
        [Xu] = Xu;
        PRNG;
        constructor(e) {
          ((this.seed = e), (this.PRNG = new PCGRandom(e)));
        }
        get next() {
          return sync(() => this.PRNG.number());
        }
        get nextBoolean() {
          return zc(this.next, (e) => e > 0.5);
        }
        get nextInt() {
          return sync(() => this.PRNG.integer(2 ** 53 - 1));
        }
        nextRange(e, t) {
          return zc(this.next, (n) => (t - e) * n + e);
        }
        nextIntBetween(e, t) {
          return sync(() => this.PRNG.integer(t - e) + e);
        }
        shuffle(e) {
          return shuffleWith(e, (e) => this.nextIntBetween(0, e));
        }
      }),
      (shuffleWith = (e, t) =>
        K(() =>
          pipe(
            sync(() => Array.from(e)),
            W((e) => {
              let n = [];
              for (let t = e.length; t >= 2; --t) n.push(t);
              return pipe(
                n,
                Lc((n) =>
                  pipe(
                    t(n),
                    zc((t) => Qu(e, n - 1, t)),
                  ),
                ),
                Tc(Kn(e)),
              );
            }),
          ),
        )),
      (Qu = __name((e, t, n) => {
        let r = e[t];
        return ((e[t] = e[n]), (e[n] = r), e);
      }, `swap`)),
      ($u = __name((e) => new RandomImpl(hash(e)), `make`)));
  }),
  td,
  nd,
  rd,
  id,
  ad,
  NativeSpan,
  od,
  sd,
  cd = __esmMin(() => {
    (wa(),
      s(),
      (td = Symbol.for(`effect/Tracer`)),
      (nd = __name((e) => ({ [td]: td, ...e }), `make`)),
      (rd = ma(`effect/Tracer`)),
      (id = ma(`effect/ParentSpan`)),
      (ad = (function () {
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
            (this.traceId = t._tag === `Some` ? t.value.traceId : ad(32)),
            (this.spanId = ad(16)),
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
      (od = nd({
        span: (e, t, n, r, i, a) => new NativeSpan(e, t, n, r, i, a),
        context: (e) => e(),
      })),
      (sd = Ca()(`effect/Tracer/DisablePropagation`, { defaultValue: i })));
  }),
  ld,
  ud,
  dd = __esmMin(() => {
    (wa(),
      s(),
      _(),
      ru(),
      Wu(),
      Y(),
      Ju(),
      ed(),
      cd(),
      (ld = pipe(
        ha(),
        _a(Zl, nu()),
        _a(Ku, qu),
        _a(Zu, $u(Math.random())),
        _a(Lu, fromEnv()),
        _a(rd, od),
      )),
      (ud = globalValue(Symbol.for(`effect/DefaultServices/currentServices`), () =>
        fiberRefUnsafeMakeContext(ld),
      )));
  }),
  not,
  fd = __esmMin(() => {
    not = (e) => !e;
  }),
  pd,
  md,
  Class,
  hd = __esmMin(() => {
    (Xe(), (pd = Ge), (md = Ye), (Class = class extends md {}));
  }),
  gd,
  _d,
  vd,
  yd,
  bd,
  xd,
  isSequential,
  isParallel,
  Sd = __esmMin(() => {
    ((gd = `Sequential`),
      (_d = `Parallel`),
      (vd = `ParallelN`),
      (yd = { _tag: gd }),
      (bd = { _tag: _d }),
      (xd = __name((e) => ({ _tag: vd, parallelism: e }), `parallelN`)),
      (isSequential = (e) => e._tag === gd),
      (isParallel = (e) => e._tag === _d));
  }),
  Cd,
  wd,
  Td,
  Ed = __esmMin(() => {
    (Sd(), (Cd = yd), (wd = bd), (Td = xd));
  });
function unsafeMake$4(e) {
  return new FiberRefsImpl(e);
}
function empty$4() {
  return unsafeMake$4(new Map());
}
var Dd,
  FiberRefsImpl,
  findAncestor,
  Od,
  kd,
  unsafeForkAs,
  Ad,
  jd,
  Md,
  Nd,
  unsafeUpdateAs,
  Pd,
  Fd = __esmMin(() => {
    (U(),
      D(),
      s(),
      B(),
      j(),
      __name(unsafeMake$4, `unsafeMake`),
      __name(empty$4, `empty`),
      (Dd = Symbol.for(`effect/FiberRefs`)),
      (FiberRefsImpl = class {
        locals;
        [Dd] = Dd;
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
          if (H(a) && H(o)) {
            let e = pn(a)[0],
              t = mn(a),
              n = pn(o)[0],
              r = pn(o)[1],
              i = mn(o);
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
      (Od = dual(3, (e, t, n) => {
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
      (kd = dual(2, (e, t) => {
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
      (Ad = dual(2, (e, t) => {
        let n = new Map(e.locals);
        return (n.delete(t), new FiberRefsImpl(n));
      })),
      (jd = dual(2, (e, t) => (e.locals.has(t) ? I(pn(e.locals.get(t))[1]) : F()))),
      (Md = dual(2, (e, t) =>
        pipe(
          jd(e, t),
          z(() => t.initial),
        ),
      )),
      (Nd = dual(2, (e, { fiberId: t, fiberRef: n, value: r }) => {
        if (e.locals.size === 0) return new FiberRefsImpl(new Map([[n, [[t, r]]]]));
        let i = new Map(e.locals);
        return (unsafeUpdateAs(i, t, n, r), new FiberRefsImpl(i));
      })),
      (unsafeUpdateAs = (e, t, n, r) => {
        let i = e.get(n) ?? [],
          a;
        if (H(i)) {
          let [e, n] = pn(i);
          if (e[E](t)) {
            if (equals$2(n, r)) return;
            a = [[t, r], ...i.slice(1)];
          } else a = [[t, r], ...i];
        } else a = [[t, r]];
        e.set(n, a);
      }),
      (Pd = dual(2, (e, { entries: t, forkAs: n }) => {
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
  Id,
  Ld,
  Rd,
  zd = __esmMin(() => {
    (Fd(), (Id = Md), (Ld = Pd), (Rd = empty$4));
  }),
  Bd,
  Vd,
  Hd,
  Ud,
  Wd,
  Gd,
  Kd,
  qd,
  Jd = __esmMin(() => {
    (U(),
      D(),
      s(),
      Fd(),
      (Bd = `Empty`),
      (Vd = `Remove`),
      (Hd = `Update`),
      (Ud = `AndThen`),
      (Wd = { _tag: Bd }),
      (Gd = __name((e, t) => {
        let n = new Map(e.locals),
          r = Wd;
        for (let [e, i] of t.locals.entries()) {
          let t = pn(i)[1],
            a = n.get(e);
          if (a !== void 0) {
            let n = pn(a)[1];
            equals$2(n, t) || (r = Kd({ _tag: Hd, fiberRef: e, patch: e.diff(n, t) })(r));
          } else r = Kd({ _tag: `Add`, fiberRef: e, value: t })(r);
          n.delete(e);
        }
        for (let [e] of n.entries()) r = Kd({ _tag: Vd, fiberRef: e })(r);
        return r;
      }, `diff`)),
      (Kd = dual(2, (e, t) => ({ _tag: Ud, first: e, second: t }))),
      (qd = dual(3, (e, t, n) => {
        let r = n,
          i = On(e);
        for (; H(i);) {
          let e = pn(i),
            n = mn(i);
          switch (e._tag) {
            case Bd:
              i = n;
              break;
            case `Add`:
              ((r = Nd(r, { fiberId: t, fiberRef: e.fiberRef, value: e.value })), (i = n));
              break;
            case Vd:
              ((r = Ad(r, e.fiberRef)), (i = n));
              break;
            case Hd: {
              let a = Md(r, e.fiberRef);
              ((r = Nd(r, {
                fiberId: t,
                fiberRef: e.fiberRef,
                value: e.fiberRef.patch(e.patch)(a),
              })),
                (i = n));
              break;
            }
            case Ud:
              i = nn(e.first)(nn(e.second)(n));
              break;
          }
        }
        return r;
      })));
  }),
  Yd,
  Xd,
  Zd = __esmMin(() => {
    (Jd(), (Yd = Gd), (Xd = qd));
  }),
  Qd,
  $d,
  ef,
  tf,
  nf,
  rf,
  Done,
  Running,
  Suspended,
  af,
  sf,
  cf,
  isFiberStatus,
  lf,
  uf = __esmMin(() => {
    (D(),
      s(),
      T(),
      x(),
      (Qd = `effect/FiberStatus`),
      ($d = Symbol.for(Qd)),
      (ef = `Done`),
      (tf = `Running`),
      (nf = `Suspended`),
      (rf = string(`${Qd}-${ef}`)),
      (Done = class {
        [$d] = $d;
        _tag = ef;
        [S]() {
          return rf;
        }
        [E](e) {
          return isFiberStatus(e) && e._tag === `Done`;
        }
      }),
      (Running = class {
        runtimeFlags;
        [$d] = $d;
        _tag = tf;
        constructor(e) {
          this.runtimeFlags = e;
        }
        [S]() {
          return pipe(hash(Qd), C(hash(this._tag)), C(hash(this.runtimeFlags)), w(this));
        }
        [E](e) {
          return isFiberStatus(e) && e._tag === `Running` && this.runtimeFlags === e.runtimeFlags;
        }
      }),
      (Suspended = class {
        runtimeFlags;
        blockingOn;
        [$d] = $d;
        _tag = nf;
        constructor(e, t) {
          ((this.runtimeFlags = e), (this.blockingOn = t));
        }
        [S]() {
          return pipe(
            hash(Qd),
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
      (af = new Done()),
      (sf = __name((e) => new Running(e), `running`)),
      (cf = __name((e, t) => new Suspended(e, t), `suspended`)),
      (isFiberStatus = (e) => b(e, $d)),
      (lf = __name((e) => e._tag === ef, `isDone`)));
  }),
  df,
  ff,
  pf,
  mf,
  hf = __esmMin(() => {
    (uf(), (df = af), (ff = sf), (pf = cf), (mf = lf));
  }),
  gf,
  _f,
  vf,
  yf,
  bf,
  xf,
  Sf,
  Cf,
  wf,
  Tf,
  fromLiteral,
  Ef = __esmMin(() => {
    (s(),
      Y(),
      au(),
      It(),
      (gf = Qc),
      (_f = $c),
      (vf = el),
      (yf = tl),
      (bf = nl),
      (xf = rl),
      (Sf = il),
      (Cf = al),
      (wf = pipe(
        iu,
        Pt((e) => e.ordinal),
      )),
      (Tf = Ft(wf)),
      (fromLiteral = (e) => {
        switch (e) {
          case `All`:
            return gf;
          case `Debug`:
            return xf;
          case `Error`:
            return vf;
          case `Fatal`:
            return _f;
          case `Info`:
            return bf;
          case `Trace`:
            return Sf;
          case `None`:
            return Cf;
          case `Warning`:
            return yf;
        }
      }));
  });
function defaultEvaluate(e) {
  return exitDie(`Micro.evaluate: Not implemented`);
}
var Df,
  Of,
  kf,
  Af,
  MicroCauseImpl,
  Fail,
  causeFail,
  Die,
  causeDie,
  Interrupt,
  causeInterrupt,
  causeIsInterrupt,
  jf,
  Mf,
  MicroFiberImpl,
  Nf,
  Pf,
  X,
  Ff,
  If,
  Lf,
  Rf,
  zf,
  Bf,
  Vf,
  makePrimitiveProto,
  makePrimitive,
  makeExit,
  Hf,
  Uf,
  Wf,
  Gf,
  Kf,
  qf,
  Jf,
  Yf,
  Xf,
  isMicroExit,
  Zf,
  Qf,
  $f,
  exitDie,
  ep,
  tp,
  MicroSchedulerDefault,
  np,
  rp,
  MaxOpsBeforeYield,
  CurrentScheduler,
  ip,
  ap,
  op,
  sp,
  interruptible,
  uninterruptibleMask,
  cp,
  lp,
  up,
  dp,
  fp = __esmMin(() => {
    (wa(),
      hd(),
      D(),
      s(),
      _(),
      T(),
      A(),
      pa(),
      Xe(),
      j(),
      x(),
      he(),
      (Df = Symbol.for(`effect/Micro`)),
      (Of = Symbol.for(`effect/Micro/MicroExit`)),
      (kf = Symbol.for(`effect/Micro/MicroCause`)),
      (Af = { _E: identity }),
      (MicroCauseImpl = class extends globalThis.Error {
        _tag;
        traces;
        [kf];
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
            (this[kf] = Af),
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
      (jf = Symbol.for(`effect/Micro/MicroFiber`)),
      (Mf = { _A: identity, _E: identity }),
      (MicroFiberImpl = class {
        context;
        interruptible;
        [jf];
        _stack = [];
        _observers = [];
        _exit;
        _children;
        currentOpCount = 0;
        constructor(e, t = !0) {
          ((this.context = e), (this.interruptible = t), (this[jf] = Mf));
        }
        getRef(e) {
          return unsafeGetReference(this.context, e);
        }
        addObserver(e) {
          return this._exit
            ? (e(this._exit), o)
            : (this._observers.push(e),
              () => {
                let t = this._observers.indexOf(e);
                t >= 0 && this._observers.splice(t, 1);
              });
        }
        _interrupted = !1;
        unsafeInterrupt() {
          this._exit || ((this._interrupted = !0), this.interruptible && this.evaluate($f));
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
          if (t === zf) return;
          let n = Nf.interruptChildren && Nf.interruptChildren(this);
          if (n !== void 0) return this.evaluate(Yf(n, () => t));
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
                n = Yf(Kf, () => e);
              }
              if (((n = n[Ff](this)), n === zf)) {
                let e = this._yielded;
                return Of in e ? ((this._yielded = void 0), e) : zf;
              }
            }
          } catch (e) {
            return b(n, Ff)
              ? exitDie(e)
              : exitDie(`MicroFiber.runLoop: Not a valid effect: ${String(n)}`);
          }
        }
        getCont(e) {
          for (;;) {
            let t = this._stack.pop();
            if (!t) return;
            let n = t[Rf] && t[Rf](this);
            if (n) return { [e]: n };
            if (t[e]) return t;
          }
        }
        _yielded = void 0;
        yieldWith(e) {
          return ((this._yielded = e), zf);
        }
        children() {
          return (this._children ??= new Set());
        }
      }),
      (Nf = globalValue(`effect/Micro/fiberMiddleware`, () => ({ interruptChildren: void 0 }))),
      (Pf = Symbol.for(`effect/Micro/identifier`)),
      (X = Symbol.for(`effect/Micro/args`)),
      (Ff = Symbol.for(`effect/Micro/evaluate`)),
      (If = Symbol.for(`effect/Micro/successCont`)),
      (Lf = Symbol.for(`effect/Micro/failureCont`)),
      (Rf = Symbol.for(`effect/Micro/ensureCont`)),
      (zf = Symbol.for(`effect/Micro/Yield`)),
      (Bf = { _A: identity, _E: identity, _R: identity }),
      (Vf = {
        ...pd,
        _op: `Micro`,
        [Df]: Bf,
        pipe() {
          return pipeArguments(this, arguments);
        },
        [Symbol.iterator]() {
          return new ne(new YieldWrap(this));
        },
        toJSON() {
          return { _id: `Micro`, op: this[Pf], ...(X in this ? { args: this[X] } : void 0) };
        },
        toString() {
          return k(this);
        },
        [O]() {
          return k(this);
        },
      }),
      (makePrimitiveProto = (e) => ({
        ...Vf,
        [Pf]: e.op,
        [Ff]: e.eval ?? defaultEvaluate,
        [If]: e.contA,
        [Lf]: e.contE,
        [Rf]: e.ensure,
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
          [Of]: Of,
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
          return ((n[X] = e), (n[If] = void 0), (n[Lf] = void 0), (n[Rf] = void 0), n);
        };
      }),
      (Hf = makeExit({
        op: `Success`,
        prop: `value`,
        eval(e) {
          let t = e.getCont(If);
          return t ? t[If](this[X], e) : e.yieldWith(this);
        },
      })),
      (Uf = makeExit({
        op: `Failure`,
        prop: `cause`,
        eval(e) {
          let t = e.getCont(Lf);
          for (; causeIsInterrupt(this[X]) && t && e.interruptible;) t = e.getCont(Lf);
          return t ? t[Lf](this[X], e) : e.yieldWith(this);
        },
      })),
      (Wf = __name((e) => Uf(causeFail(e)), `fail`)),
      (Gf = makePrimitive({
        op: `Yield`,
        eval(e) {
          let t = !1;
          return (
            e.getRef(CurrentScheduler).scheduleTask(() => {
              t || e.evaluate(ep);
            }, this[X] ?? 0),
            e.yieldWith(() => {
              t = !0;
            })
          );
        },
      })),
      (Kf = Gf(0)),
      (qf = Hf(void 0)),
      (Jf = makePrimitive({
        op: `WithMicroFiber`,
        eval(e) {
          return this[X](e);
        },
      })),
      (Yf = dual(2, (e, t) => {
        let n = Object.create(Xf);
        return ((n[X] = e), (n[If] = t), n);
      })),
      (Xf = makePrimitiveProto({
        op: `OnSuccess`,
        eval(e) {
          return (e._stack.push(this), this[X]);
        },
      })),
      (isMicroExit = (e) => b(e, Of)),
      (Zf = Hf),
      (Qf = Uf),
      ($f = Qf(causeInterrupt())),
      (exitDie = (e) => Qf(causeDie(e))),
      (ep = Zf(void 0)),
      (tp = `setImmediate` in globalThis ? globalThis.setImmediate : (e) => setTimeout(e, 0)),
      (MicroSchedulerDefault = class {
        tasks = [];
        running = !1;
        scheduleTask(e, t) {
          (this.tasks.push(e), this.running || ((this.running = !0), tp(this.afterScheduled)));
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
      (np = dual(2, (e, t) =>
        Jf((n) => {
          let r = n.context;
          return ((n.context = t(r)), op(e, () => ((n.context = r), qf)));
        }),
      )),
      (rp = dual(2, (e, t) => np(e, xa(t)))),
      (MaxOpsBeforeYield = class extends (
        Ca()(`effect/Micro/currentMaxOpsBeforeYield`, { defaultValue: () => 2048 })
      ) {}),
      Ca()(`effect/Micro/currentConcurrency`, { defaultValue: () => `unbounded` }),
      (CurrentScheduler = class extends (
        Ca()(`effect/Micro/currentScheduler`, { defaultValue: () => new MicroSchedulerDefault() })
      ) {}),
      (ip = dual(2, (e, t) => {
        let n = Object.create(ap);
        return ((n[X] = e), (n[If] = t.onSuccess), (n[Lf] = t.onFailure), n);
      })),
      (ap = makePrimitiveProto({
        op: `OnSuccessAndFailure`,
        eval(e) {
          return (e._stack.push(this), this[X]);
        },
      })),
      (op = dual(2, (e, t) =>
        uninterruptibleMask((n) =>
          ip(n(e), {
            onFailure: (e) => Yf(t(Qf(e)), () => Uf(e)),
            onSuccess: (e) => Yf(t(Zf(e)), () => Hf(e)),
          }),
        ),
      )),
      (sp = makePrimitive({
        op: `SetInterruptible`,
        ensure(e) {
          if (((e.interruptible = this[X]), e._interrupted && e.interruptible)) return () => $f;
        },
      })),
      (interruptible = (e) =>
        Jf((t) =>
          t.interruptible
            ? e
            : ((t.interruptible = !0), t._stack.push(sp(!1)), t._interrupted ? $f : e),
        )),
      (uninterruptibleMask = (e) =>
        Jf((t) =>
          t.interruptible
            ? ((t.interruptible = !1), t._stack.push(sp(!0)), e(interruptible))
            : e(identity),
        )),
      (cp = __name((e, t) => {
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
      (lp = (function () {
        class YieldableError extends globalThis.Error {}
        return (
          Object.assign(YieldableError.prototype, Vf, Ke, {
            [Pf]: `Failure`,
            [Ff]() {
              return Wf(this);
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
      (up = (function () {
        return class extends lp {
          constructor(e) {
            (super(), e && Object.assign(this, e));
          }
        };
      })()),
      (dp = __name((e) => {
        class Base extends up {
          _tag = e;
        }
        return ((Base.prototype.name = e), Base);
      }, `TaggedError`)),
      dp(`NoSuchElementException`),
      dp(`TimeoutException`));
  }),
  pp,
  PriorityBuckets,
  MixedScheduler,
  mp,
  SyncScheduler,
  hp,
  gp = __esmMin(() => {
    (_(),
      Y(),
      (pp = class SchedulerRunner {
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
        getRunner = pp.cached((e, t) => {
          e >= this.maxNextTickBeforeTimer
            ? setTimeout(() => t(0), 0)
            : Promise.resolve(void 0).then(() => t(e + 1));
        });
        constructor(e) {
          this.maxNextTickBeforeTimer = e;
        }
        shouldYield(e) {
          return e.currentOpCount > e.getFiberRef(hl) && e.getFiberRef(ml);
        }
        scheduleTask(e, t, n) {
          this.getRunner(n).scheduleTask(e, t);
        }
      }),
      (mp = globalValue(
        Symbol.for(`effect/Scheduler/defaultScheduler`),
        () => new MixedScheduler(2048),
      )),
      (SyncScheduler = class {
        tasks = new PriorityBuckets();
        deferred = !1;
        scheduleTask(e, t, n) {
          this.deferred ? mp.scheduleTask(e, t, n) : this.tasks.scheduleTask(e, t);
        }
        shouldYield(e) {
          return e.currentOpCount > e.getFiberRef(hl) && e.getFiberRef(ml);
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
      (hp = globalValue(Symbol.for(`effect/FiberRef/currentScheduler`), () =>
        fiberRefUnsafeMake(mp),
      )));
  }),
  _p,
  vp = __esmMin(() => {
    (_(),
      Y(),
      (_p = globalValue(Symbol.for(`effect/FiberRef/currentRequestMap`), () =>
        fiberRefUnsafeMake(new Map()),
      )));
  }),
  match,
  yp = __esmMin(() => {
    (Y(),
      (match = (e, t, n, r) => {
        switch (e) {
          case void 0:
            return t();
          case `unbounded`:
            return n();
          case `inherit`:
            return ll(bl, (e) => (e === `unbounded` ? n() : e > 1 ? r(e) : t()));
          default:
            return e > 1 ? r(e) : t();
        }
      }));
  }),
  formatLabel,
  render,
  bp = __esmMin(() => {
    ((formatLabel = (e) => e.replace(/[\s="]/g, `_`)),
      (render = (e) => (t) => `${formatLabel(t.label)}=${e - t.startTime}ms`));
  }),
  xp,
  Sp,
  MetricLabelImpl,
  Cp,
  isMetricLabel,
  wp = __esmMin(() => {
    (D(),
      T(),
      j(),
      x(),
      (xp = `effect/MetricLabel`),
      (Sp = Symbol.for(xp)),
      (MetricLabelImpl = class {
        key;
        value;
        [Sp] = Sp;
        _hash;
        constructor(e, t) {
          ((this.key = e), (this.value = t), (this._hash = string(xp + this.key + this.value)));
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
      (Cp = __name((e, t) => new MetricLabelImpl(e, t), `make`)),
      (isMetricLabel = (e) => b(e, Sp)));
  }),
  Tp,
  Ep,
  Dp = __esmMin(() => {
    (wa(),
      B(),
      Y(),
      cd(),
      (Tp = __name((e) => Fc(e, { onFailure: () => G(F()), onSuccess: (e) => G(I(e)) }), `option`)),
      (Ep = Wt((e) => (va(e.context, sd) ? (e._tag === `Span` ? Ep(e.parent) : F()) : I(e)))));
  }),
  Op,
  kp = __esmMin(() => {
    (Y(), (Op = exitIsSuccess));
  }),
  Ap,
  jp,
  Mp,
  Np,
  interruptSignal,
  stateful,
  resume,
  yieldNow,
  Pp = __esmMin(() => {
    ((Ap = `InterruptSignal`),
      (jp = `Stateful`),
      (Mp = `Resume`),
      (Np = `YieldNow`),
      (interruptSignal = (e) => ({ _tag: Ap, cause: e })),
      (stateful = (e) => ({ _tag: jp, onFiber: e })),
      (resume = (e) => ({ _tag: Mp, effect: e })),
      (yieldNow = () => ({ _tag: Np })));
  }),
  Fp,
  Ip,
  Global,
  Local,
  Lp,
  Rp,
  zp = __esmMin(() => {
    (Co(),
      _(),
      Pp(),
      (Fp = `effect/FiberScope`),
      (Ip = Symbol.for(Fp)),
      (Global = class {
        [Ip] = Ip;
        fiberId = _o;
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
        [Ip] = Ip;
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
      (Lp = __name((e) => new Local(e.id(), e), `unsafeMake`)),
      (Rp = globalValue(Symbol.for(`effect/FiberScope/Global`), () => new Global())));
  }),
  Bp,
  Vp,
  Hp,
  Up,
  Wp,
  Gp,
  join,
  Kp,
  qp = __esmMin(() => {
    (Co(),
      B(),
      j(),
      Y(),
      Xe(),
      (Bp = `effect/Fiber`),
      (Vp = Symbol.for(Bp)),
      (Hp = { _E: (e) => e, _A: (e) => e }),
      (Up = {
        [Vp]: Hp,
        pipe() {
          return pipeArguments(this, arguments);
        },
      }),
      (Wp = `effect/Fiber`),
      (Gp = Symbol.for(Wp)),
      (join = (e) => Yc(Mc(e.await), e.inheritAll)),
      { ...qe },
      { ...Up },
      (Kp = `effect/FiberCurrent`));
  }),
  Jp,
  Yp,
  Xp,
  makeLogger,
  Zp,
  Qp,
  escapeDoubleQuotes,
  $p,
  em,
  tm,
  nm = __esmMin(() => {
    (U(),
      A(),
      j(),
      qi(),
      ho(),
      bp(),
      (Jp = `effect/Logger`),
      (Yp = Symbol.for(Jp)),
      (Xp = { _Message: (e) => e, _Output: (e) => e }),
      (makeLogger = (e) => ({
        [Yp]: Xp,
        log: e,
        pipe() {
          return pipeArguments(this, arguments);
        },
      })),
      (Zp = /^[^\s"=]*$/),
      (Qp = __name(
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
            let formatValue = (t) => (t.match(Zp) ? t : e(t)),
              format = (e, t) => `${formatLabel(e)}=${formatValue(t)}`,
              append = (e, t) => ` ` + format(e, t),
              l = format(`timestamp`, i.toISOString());
            ((l += append(`level`, o.label)), (l += append(`fiber`, po(a))));
            let u = ensure(s);
            for (let e = 0; e < u.length; e++) l += append(`message`, toStringUnknown(u[e], t));
            isEmptyType(r) || (l += append(`cause`, Ui(r, { renderErrorCause: !0 })));
            for (let e of c) l += ` ` + render(i.getTime())(e);
            for (let [e, r] of n) l += append(e, toStringUnknown(r, t));
            return l;
          },
        `format`,
      )),
      (escapeDoubleQuotes = (e) => `"${e.replace(/\\([\s\S])|(")/g, `\\$1$2`)}"`),
      ($p = makeLogger(Qp(escapeDoubleQuotes))),
      (em = {
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
      em.gray,
      em.blue,
      em.green,
      em.yellow,
      em.red,
      em.bgBrightRed,
      em.black,
      (tm =
        typeof process == `object` &&
        process !== null &&
        typeof process.stdout == `object` &&
        process.stdout !== null),
      tm && process.stdout.isTTY,
      tm || `Deno` in globalThis);
  }),
  rm,
  im,
  MetricBoundariesImpl,
  isMetricBoundaries,
  fromIterable,
  exponential,
  am = __esmMin(() => {
    (U(),
      rr(),
      D(),
      s(),
      T(),
      j(),
      x(),
      (rm = `effect/MetricBoundaries`),
      (im = Symbol.for(rm)),
      (MetricBoundariesImpl = class {
        values;
        [im] = im;
        constructor(e) {
          ((this.values = e), (this._hash = pipe(string(rm), C(array(this.values)))));
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
      (isMetricBoundaries = (e) => b(e, im)),
      (fromIterable = (e) => {
        let t = pipe(e, an(Gn(1 / 0)), dedupe);
        return new MetricBoundariesImpl(t);
      }),
      (exponential = (e) =>
        pipe(
          en(e.count - 1, (t) => e.start * e.factor ** +t),
          unsafeFromArray,
          fromIterable,
        )));
  }),
  om,
  sm,
  cm,
  lm,
  um,
  dm,
  fm,
  pm,
  mm,
  hm,
  gm,
  _m,
  vm,
  CounterKeyType,
  HistogramKeyType,
  ym,
  bm,
  isCounterKey,
  isFrequencyKey,
  isGaugeKey,
  isHistogramKey,
  isSummaryKey,
  xm = __esmMin(() => {
    (D(),
      s(),
      T(),
      j(),
      x(),
      (om = `effect/MetricKeyType`),
      (sm = Symbol.for(om)),
      (cm = `effect/MetricKeyType/Counter`),
      (lm = Symbol.for(cm)),
      (um = `effect/MetricKeyType/Frequency`),
      (dm = Symbol.for(um)),
      (fm = `effect/MetricKeyType/Gauge`),
      (pm = Symbol.for(fm)),
      (mm = `effect/MetricKeyType/Histogram`),
      (hm = Symbol.for(mm)),
      (gm = `effect/MetricKeyType/Summary`),
      (_m = Symbol.for(gm)),
      (vm = { _In: (e) => e, _Out: (e) => e }),
      (CounterKeyType = class {
        incremental;
        bigint;
        [sm] = vm;
        [lm] = lm;
        constructor(e, t) {
          ((this.incremental = e), (this.bigint = t), (this._hash = string(cm)));
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
        [sm] = vm;
        [hm] = hm;
        constructor(e) {
          ((this.boundaries = e), (this._hash = pipe(string(mm), C(hash(this.boundaries)))));
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
      (ym = __name((e) => new CounterKeyType(e?.incremental ?? !1, e?.bigint ?? !1), `counter`)),
      (bm = __name((e) => new HistogramKeyType(e), `histogram`)),
      (isCounterKey = (e) => b(e, lm)),
      (isFrequencyKey = (e) => b(e, dm)),
      (isGaugeKey = (e) => b(e, pm)),
      (isHistogramKey = (e) => b(e, hm)),
      (isSummaryKey = (e) => b(e, _m)));
  }),
  Sm,
  Cm,
  wm,
  Tm,
  MetricKeyImpl,
  isMetricKey,
  Em,
  Dm,
  Om,
  km = __esmMin(() => {
    (U(),
      D(),
      s(),
      T(),
      B(),
      j(),
      x(),
      xm(),
      (Sm = `effect/MetricKey`),
      (Cm = Symbol.for(Sm)),
      (wm = { _Type: (e) => e }),
      (Tm = Pn(equals$2)),
      (MetricKeyImpl = class {
        name;
        keyType;
        description;
        tags;
        [Cm] = wm;
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
            Tm(this.tags, e.tags)
          );
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (isMetricKey = (e) => b(e, Cm)),
      (Em = __name((e, t) => new MetricKeyImpl(e, ym(t), fromNullable(t?.description)), `counter`)),
      (Dm = __name((e, t, n) => new MetricKeyImpl(e, bm(t), fromNullable(n)), `histogram`)),
      (Om = dual(2, (e, t) =>
        t.length === 0 ? e : new MetricKeyImpl(e.name, e.keyType, e.description, En(e.tags, t)),
      )));
  }),
  Am,
  jm,
  Mm,
  BucketIterator,
  Nm,
  Pm,
  getFromBucket,
  Fm,
  Im,
  removeFromBucket,
  Lm = __esmMin(() => {
    (D(),
      s(),
      T(),
      A(),
      B(),
      j(),
      (Am = Symbol.for(`effect/MutableHashMap`)),
      (jm = {
        [Am]: Am,
        [Symbol.iterator]() {
          return new Mm(this);
        },
        toString() {
          return k(this.toJSON());
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
      (Mm = class MutableHashMapIterator {
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
      (Nm = __name(() => {
        let e = Object.create(jm);
        return ((e.referential = new Map()), (e.buckets = new Map()), (e.bucketsSize = 0), e);
      }, `empty`)),
      (Pm = dual(2, (e, t) => {
        if (isEqual(t) === !1) return e.referential.has(t) ? I(e.referential.get(t)) : F();
        let n = t[S](),
          r = e.buckets.get(n);
        return r === void 0 ? F() : getFromBucket(e, r, t);
      })),
      (getFromBucket = (e, t, n, r = !1) => {
        for (let i = 0, a = t.length; i < a; i++)
          if (n[E](t[i][0])) {
            let n = t[i][1];
            return (r && (t.splice(i, 1), e.bucketsSize--), I(n));
          }
        return F();
      }),
      (Fm = dual(2, (e, t) => R(Pm(e, t)))),
      (Im = dual(3, (e, t, n) => {
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
  Rm,
  zm,
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
  CounterState,
  Zm,
  FrequencyState,
  GaugeState,
  HistogramState,
  SummaryState,
  Qm,
  $m,
  eh,
  th,
  nh,
  isCounterState,
  isFrequencyState,
  isGaugeState,
  isHistogramState,
  isSummaryState,
  rh = __esmMin(() => {
    (U(),
      D(),
      s(),
      T(),
      j(),
      x(),
      (Rm = `effect/MetricState`),
      (zm = Symbol.for(Rm)),
      (Bm = `effect/MetricState/Counter`),
      (Vm = Symbol.for(Bm)),
      (Hm = `effect/MetricState/Frequency`),
      (Um = Symbol.for(Hm)),
      (Wm = `effect/MetricState/Gauge`),
      (Gm = Symbol.for(Wm)),
      (Km = `effect/MetricState/Histogram`),
      (qm = Symbol.for(Km)),
      (Jm = `effect/MetricState/Summary`),
      (Ym = Symbol.for(Jm)),
      (Xm = { _A: (e) => e }),
      (CounterState = class {
        count;
        [zm] = Xm;
        [Vm] = Vm;
        constructor(e) {
          this.count = e;
        }
        [S]() {
          return pipe(hash(Bm), C(hash(this.count)), w(this));
        }
        [E](e) {
          return isCounterState(e) && this.count === e.count;
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (Zm = Pn(equals$2)),
      (FrequencyState = class {
        occurrences;
        [zm] = Xm;
        [Um] = Um;
        constructor(e) {
          this.occurrences = e;
        }
        _hash;
        [S]() {
          return pipe(string(Hm), C(array(V(this.occurrences.entries()))), w(this));
        }
        [E](e) {
          return (
            isFrequencyState(e) && Zm(V(this.occurrences.entries()), V(e.occurrences.entries()))
          );
        }
        pipe() {
          return pipeArguments(this, arguments);
        }
      }),
      (GaugeState = class {
        value;
        [zm] = Xm;
        [Gm] = Gm;
        constructor(e) {
          this.value = e;
        }
        [S]() {
          return pipe(hash(Wm), C(hash(this.value)), w(this));
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
        [zm] = Xm;
        [qm] = qm;
        constructor(e, t, n, r, i) {
          ((this.buckets = e), (this.count = t), (this.min = n), (this.max = r), (this.sum = i));
        }
        [S]() {
          return pipe(
            hash(Km),
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
        [zm] = Xm;
        [Ym] = Ym;
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
            hash(Jm),
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
      (Qm = __name((e) => new CounterState(e), `counter`)),
      ($m = __name((e) => new FrequencyState(e), `frequency`)),
      (eh = __name((e) => new GaugeState(e), `gauge`)),
      (th = __name(
        (e) => new HistogramState(e.buckets, e.count, e.min, e.max, e.sum),
        `histogram`,
      )),
      (nh = __name(
        (e) => new SummaryState(e.error, e.quantiles, e.count, e.min, e.max, e.sum),
        `summary`,
      )),
      (isCounterState = (e) => b(e, Vm)),
      (isFrequencyState = (e) => b(e, Um)),
      (isGaugeState = (e) => b(e, Gm)),
      (isHistogramState = (e) => b(e, qm)),
      (isSummaryState = (e) => b(e, Ym)));
  }),
  ih,
  ah,
  oh,
  sh,
  ch,
  lh,
  frequency,
  gauge,
  uh,
  summary,
  calculateQuantiles,
  resolveQuantile,
  dh = __esmMin(() => {
    (U(),
      Ja(),
      s(),
      au(),
      B(),
      j(),
      rh(),
      (ih = `effect/MetricHook`),
      (ah = Symbol.for(ih)),
      (oh = { _In: (e) => e, _Out: (e) => e }),
      (sh = __name(
        (e) => ({
          [ah]: oh,
          pipe() {
            return pipeArguments(this, arguments);
          },
          ...e,
        }),
        `make`,
      )),
      (ch = BigInt(0)),
      (lh = __name((e) => {
        let t = e.keyType.bigint ? ch : 0,
          n = e.keyType.incremental
            ? e.keyType.bigint
              ? (e) => e >= ch
              : (e) => e >= 0
            : (e) => !0,
          update = (e) => {
            n(e) && (t += e);
          };
        return sh({ get: () => Qm(t), update, modify: update });
      }, `counter`)),
      (frequency = (e) => {
        let t = new Map();
        for (let n of e.keyType.preregisteredWords) t.set(n, 0);
        let update = (e) => {
          let n = t.get(e) ?? 0;
          t.set(e, n + 1);
        };
        return sh({ get: () => $m(t), update, modify: update });
      }),
      (gauge = (e, t) => {
        let n = t;
        return sh({
          get: () => eh(n),
          update: (e) => {
            n = e;
          },
          modify: (e) => {
            n += e;
          },
        });
      }),
      (uh = __name((e) => {
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
          vn(iu),
          kn((e, t) => {
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
        return sh({
          get: () => th({ buckets: getBuckets(), count: a, min: s, max: c, sum: o }),
          update,
          modify: update,
        });
      }, `histogram`)),
      (summary = (e) => {
        let { error: t, maxAge: n, maxSize: r, quantiles: i } = e.keyType,
          a = pipe(i, vn(iu)),
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
                Ga(o, za) && Wa(o, n) && i.push(a);
              }
              s += 1;
            }
            return calculateQuantiles(t, a, vn(i, iu));
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
        return sh({
          get: () =>
            nh({ error: t, quantiles: snapshot(Date.now()), count: c, min: u, max: d, sum: l }),
          update: ([e, t]) => observe(e, t),
          modify: ([e, t]) => observe(e, t),
        });
      }),
      (calculateQuantiles = (e, t, n) => {
        let r = n.length;
        if (!H(t)) return Dn();
        let i = t[0],
          a = t.slice(1),
          o = resolveQuantile(e, r, F(), 0, i, n),
          s = On(o);
        return (
          a.forEach((t) => {
            s.push(resolveQuantile(e, r, o.value, o.consumed, t, o.rest));
          }),
          kn(s, (e) => [e.quantile, e.value])
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
          if (!H(d)) return { quantile: u, value: F(), consumed: l, rest: [] };
          if (u === 1)
            return { quantile: u, value: I(lastNonEmpty(d)), consumed: l + d.length, rest: [] };
          let e = pn(d),
            t = hn(d, (t) => t === e),
            n = u * s,
            r = (o / 2) * n,
            i = l + t[0].length,
            a = Math.abs(i - n);
          if (i < n - r) {
            ((p = o),
              (m = s),
              (h = dn(d)),
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
            let t = L(c) ? I(e) : c;
            return { quantile: u, value: t, consumed: l, rest: d };
          }
          switch (c._tag) {
            case `None`:
              ((p = o),
                (m = s),
                (h = dn(d)),
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
                  (h = dn(d)),
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
              return { quantile: u, value: I(c.value), consumed: l, rest: d };
          }
        }
        throw Error(
          `BUG: MetricHook.resolveQuantiles - please report an issue at https://github.com/Effect-TS/effect/issues`,
        );
      }));
  }),
  fh,
  ph,
  mh,
  hh,
  gh = __esmMin(() => {
    (j(),
      (fh = `effect/MetricPair`),
      (ph = Symbol.for(fh)),
      (mh = { _Type: (e) => e }),
      (hh = __name(
        (e, t) => ({
          [ph]: mh,
          metricKey: e,
          metricState: t,
          pipe() {
            return pipeArguments(this, arguments);
          },
        }),
        `unsafeMake`,
      )));
  }),
  _h,
  vh,
  MetricRegistryImpl,
  yh,
  bh = __esmMin(() => {
    (s(),
      Lm(),
      B(),
      dh(),
      xm(),
      gh(),
      (_h = `effect/MetricRegistry`),
      (vh = Symbol.for(_h)),
      (MetricRegistryImpl = class {
        [vh] = vh;
        map = Nm();
        snapshot() {
          let e = [];
          for (let [t, n] of this.map) e.push(hh(t, n.get()));
          return e;
        }
        get(e) {
          let t = pipe(this.map, Pm(e), Vt);
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
          let t = pipe(this.map, Pm(e), Vt);
          if (t == null) {
            let n = lh(e);
            (pipe(this.map, Fm(e)) || pipe(this.map, Im(e, n)), (t = n));
          }
          return t;
        }
        getFrequency(e) {
          let t = pipe(this.map, Pm(e), Vt);
          if (t == null) {
            let n = frequency(e);
            (pipe(this.map, Fm(e)) || pipe(this.map, Im(e, n)), (t = n));
          }
          return t;
        }
        getGauge(e) {
          let t = pipe(this.map, Pm(e), Vt);
          if (t == null) {
            let n = gauge(e, e.keyType.bigint ? BigInt(0) : 0);
            (pipe(this.map, Fm(e)) || pipe(this.map, Im(e, n)), (t = n));
          }
          return t;
        }
        getHistogram(e) {
          let t = pipe(this.map, Pm(e), Vt);
          if (t == null) {
            let n = uh(e);
            (pipe(this.map, Fm(e)) || pipe(this.map, Im(e, n)), (t = n));
          }
          return t;
        }
        getSummary(e) {
          let t = pipe(this.map, Pm(e), Vt);
          if (t == null) {
            let n = summary(e);
            (pipe(this.map, Fm(e)) || pipe(this.map, Im(e, n)), (t = n));
          }
          return t;
        }
      }),
      (yh = __name(() => new MetricRegistryImpl(), `make`)));
  }),
  xh,
  Sh,
  Ch,
  wh,
  Th,
  counter,
  fromMetricKey,
  histogram,
  Eh,
  Dh,
  Oh,
  kh = __esmMin(() => {
    (U(),
      s(),
      _(),
      j(),
      Y(),
      km(),
      wp(),
      bh(),
      (xh = `effect/Metric`),
      (Sh = Symbol.for(xh)),
      (Ch = { _Type: (e) => e, _In: (e) => e, _Out: (e) => e }),
      (wh = globalValue(Symbol.for(`effect/Metric/globalMetricRegistry`), () => yh())),
      (Th = __name(function (e, t, n, r) {
        let i = Object.assign((e) => Wc(e, (e) => Oh(i, e)), {
          [Sh]: Ch,
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
      (counter = (e, t) => fromMetricKey(Em(e, t))),
      (fromMetricKey = (e) => {
        let t,
          n = new WeakMap(),
          hook = (r) => {
            if (r.length === 0) return (t === void 0 && (t = wh.get(e)), t);
            let i = n.get(r);
            return i === void 0 ? ((i = wh.get(Om(e, r))), n.set(r, i), i) : i;
          };
        return Th(
          e.keyType,
          (e, t) => hook(t).update(e),
          (e) => hook(e).get(),
          (e, t) => hook(t).modify(e),
        );
      }),
      (histogram = (e, t, n) => fromMetricKey(Dm(e, t, n))),
      (Eh = dual(3, (e, t, n) => Dh(e, [Cp(t, n)]))),
      (Dh = dual(2, (e, t) =>
        Th(
          e.keyType,
          (n, r) => e.unsafeUpdate(n, En(t, r)),
          (n) => e.unsafeValue(En(t, n)),
          (n, r) => e.unsafeModify(n, En(t, r)),
        ),
      )),
      (Oh = dual(2, (e, t) => ll(wl, (n) => sync(() => e.unsafeUpdate(t, n))))));
  }),
  Ah,
  jh = __esmMin(() => {
    (s(),
      vp(),
      Y(),
      Xe(),
      { ...Ke },
      (Ah = dual(2, (e, t) =>
        ll(_p, (n) =>
          sync(() => {
            if (n.has(e)) {
              let r = n.get(e);
              r.state.completed || ((r.state.completed = !0), deferredUnsafeDone(r.result, t));
            }
          }),
        ),
      )));
  }),
  Mh,
  Nh,
  Ph,
  Fh,
  Ih,
  isZip,
  Const,
  fromEffect,
  Lh,
  Rh = __esmMin(() => {
    (s(),
      _(),
      x(),
      Y(),
      (Mh = `effect/Supervisor`),
      (Nh = Symbol.for(Mh)),
      (Ph = { _T: (e) => e }),
      (Fh = class ProxySupervisor {
        underlying;
        value0;
        [Nh] = Ph;
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
          return new ProxySupervisor(this, pipe(this.value, zc(e)));
        }
        zip(e) {
          return new Ih(this, e);
        }
      }),
      (Ih = class Zip {
        left;
        right;
        _tag = `Zip`;
        [Nh] = Ph;
        constructor(e, t) {
          ((this.left = e), (this.right = t));
        }
        get value() {
          return Jc(this.left.value, this.right.value);
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
          return new Fh(this, pipe(this.value, zc(e)));
        }
        zip(e) {
          return new Zip(this, e);
        }
      }),
      (isZip = (e) => b(e, Nh) && ee(e, `Zip`)),
      (Const = class {
        effect;
        [Nh] = Ph;
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
          return new Fh(this, pipe(this.value, zc(e)));
        }
        zip(e) {
          return new Ih(this, e);
        }
        onRun(e, t) {
          return e();
        }
      }),
      (fromEffect = (e) => new Const(e)),
      (Lh = globalValue(`effect/Supervisor/none`, () => fromEffect(Kc))));
  }),
  zh,
  Bh = __esmMin(() => {
    (Is(), (zh = Ps));
  }),
  Vh,
  Hh,
  Uh,
  Wh,
  Gh,
  combine,
  patch,
  patchLoop,
  removeSupervisor,
  toSet,
  diff,
  Kh,
  qh = __esmMin(() => {
    (rr(),
      Bh(),
      D(),
      s(),
      vi(),
      Rh(),
      (Vh = `Empty`),
      (Hh = `AddSupervisor`),
      (Uh = `RemoveSupervisor`),
      (Wh = `AndThen`),
      (Gh = { _tag: Vh }),
      (combine = (e, t) => ({ _tag: Wh, first: e, second: t })),
      (patch = (e, t) => patchLoop(t, Gn(e))),
      (patchLoop = (e, t) => {
        let n = e,
          r = t;
        for (; tr(r);) {
          let e = nr(r);
          switch (e._tag) {
            case Vh:
              r = tailNonEmpty(r);
              break;
            case Hh:
              ((n = n.zip(e.supervisor)), (r = tailNonEmpty(r)));
              break;
            case Uh:
              ((n = removeSupervisor(n, e.supervisor)), (r = tailNonEmpty(r)));
              break;
            case Wh:
              r = Zn(e.first)(Zn(e.second)(tailNonEmpty(r)));
              break;
          }
        }
        return n;
      }),
      (removeSupervisor = (e, t) =>
        equals$2(e, t)
          ? Lh
          : isZip(e)
            ? removeSupervisor(e.left, t).zip(removeSupervisor(e.right, t))
            : e),
      (toSet = (e) =>
        equals$2(e, Lh) ? ci() : isZip(e) ? pipe(toSet(e.left), gi(toSet(e.right))) : ui(e)),
      (diff = (e, t) => {
        if (equals$2(e, t)) return Gh;
        let n = toSet(e),
          r = toSet(t),
          i = pipe(
            r,
            hi(n),
            _i(Gh, (e, t) => combine(e, { _tag: Hh, supervisor: t })),
          ),
          a = pipe(
            n,
            hi(r),
            _i(Gh, (e, t) => combine(e, { _tag: Uh, supervisor: t })),
          );
        return combine(i, a);
      }),
      (Kh = zh({ empty: Gh, patch, combine, diff })));
  }),
  Jh,
  Yh,
  Xh,
  Zh,
  Qh,
  $h,
  eg,
  tg,
  ng,
  absurd,
  rg,
  ig,
  ag,
  og,
  runBlockedRequests,
  sg,
  FiberRuntime,
  cg,
  loggerWithConsoleLog,
  lg,
  ug,
  dg,
  fg,
  forEachParUnbounded,
  forEachConcurrentDiscard,
  forEachParN,
  forkDaemon,
  pg,
  unsafeForkUnstarted,
  unsafeMakeChildFiber,
  forkWithScopeOverride,
  parallelFinalizers,
  parallelNFinalizers,
  finalizersMaskInternal,
  sequentialFinalizers,
  mg,
  scopeUnsafeAddFinalizer,
  hg,
  scopeUnsafeMake,
  gg,
  fiberRefUnsafeMakeSupervisor,
  _g,
  vg,
  yg,
  invokeWithInterrupt,
  bg = __esmMin(() => {
    (U(),
      rr(),
      wa(),
      hd(),
      Ed(),
      Co(),
      zd(),
      Zd(),
      hf(),
      s(),
      _(),
      vi(),
      A(),
      Ef(),
      fp(),
      B(),
      j(),
      x(),
      ic(),
      gp(),
      he(),
      dc(),
      qi(),
      ru(),
      vp(),
      yp(),
      Dp(),
      Y(),
      dd(),
      Ju(),
      Sd(),
      qp(),
      Pp(),
      Fd(),
      zp(),
      nm(),
      kh(),
      am(),
      Fe(),
      jh(),
      ec(),
      Rh(),
      qh(),
      cd(),
      Le(),
      (Jh = counter(`effect_fiber_started`, { incremental: !0 })),
      (Yh = counter(`effect_fiber_active`)),
      (Xh = counter(`effect_fiber_successes`, { incremental: !0 })),
      (Zh = counter(`effect_fiber_failures`, { incremental: !0 })),
      (Qh = Eh(
        histogram(`effect_fiber_lifetimes`, exponential({ start: 0.5, factor: 2, count: 35 })),
        `time_unit`,
        `milliseconds`,
      )),
      ($h = `Continue`),
      (eg = `Done`),
      (tg = `Yield`),
      (ng = { _E: (e) => e, _A: (e) => e }),
      (absurd = (e) => {
        throw Error(
          `BUG: FiberRuntime - ${toStringUnknown(e)} - please report an issue at https://github.com/Effect-TS/effect/issues`,
        );
      }),
      (rg = Symbol.for(`effect/internal/fiberRuntime/YieldedOp`)),
      (ig = globalValue(`effect/internal/fiberRuntime/yieldedOpChannel`, () => ({
        currentOp: null,
      }))),
      (ag = {
        [Te]: (e, t, n) => me(() => t.effect_instruction_i1(n)),
        OnStep: (e, t, n) => J(J(n)),
        [Ee]: (e, t, n) => me(() => t.effect_instruction_i2(n)),
        [Pe]: (e, t, n) => (
          e.patchRuntimeFlags(e.currentRuntimeFlags, t.patch),
          qs(e.currentRuntimeFlags) && e.isInterrupted() ? q(e.getInterruptedCause()) : J(n)
        ),
        [Ae]: (e, t, n) => (
          me(() => t.effect_instruction_i2(n)),
          me(() => t.effect_instruction_i0())
            ? (e.pushStack(t), me(() => t.effect_instruction_i1()))
            : Kc
        ),
        [je]: (e, t, n) => {
          for (;;) {
            let r = me(() => t.effect_instruction_i0.next(n));
            if (r.done) return J(r.value);
            let i = yieldWrapGet(r.value);
            if (!exitIsExit(i)) return (e.pushStack(t), i);
            if (i._tag === `Failure`) return i;
            n = i.value;
          }
        },
      }),
      (og = {
        [Ap]: (e, t, n, r) => (e.processNewInterruptSignal(r.cause), qs(t) ? q(r.cause) : n),
        [Mp]: (e, t, n, r) => {
          throw Error(`It is illegal to have multiple concurrent run loops in a single fiber`);
        },
        [jp]: (e, t, n, r) => (r.onFiber(e, ff(t)), n),
        [Np]: (e, t, n, r) => W(qc(), () => n),
      }),
      (runBlockedRequests = (e) =>
        Lc(ac(e), (e) =>
          forEachConcurrentDiscard(
            sequentialCollectionToChunk(e),
            ([e, t]) => {
              let n = new Map(),
                r = [];
              for (let e of t) {
                r.push(qn(e));
                for (let t of e) n.set(t.request, t);
              }
              let i = r.flat();
              return fl(
                invokeWithInterrupt(e.runAll(r), i, () =>
                  i.forEach((e) => {
                    e.listeners.interrupted = !0;
                  }),
                ),
                _p,
                n,
              );
            },
            !1,
            !1,
          ),
        )),
      (sg = getCurrentVersion()),
      (FiberRuntime = class extends Class {
        [Vp] = Hp;
        [Gp] = ng;
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
            let e = this.getFiberRef(wl);
            (Jh.unsafeUpdate(1, e), Yh.unsafeUpdate(1, e));
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
          return this.ask((e, t) => (mf(t) ? e.currentRuntimeFlags : t.runtimeFlags));
        }
        scope() {
          return Lp(this);
        }
        get children() {
          return this.ask((e) => Array.from(e.getChildren()));
        }
        getChildren() {
          return (this._children === null && (this._children = new Set()), this._children);
        }
        getInterruptedCause() {
          return this.getFiberRef(El);
        }
        fiberRefs() {
          return this.ask((e) => e.getFiberRefs());
        }
        ask(e) {
          return K(() => {
            let t = deferredUnsafeMake(this._fiberId);
            return (
              this.tell(
                stateful((n, r) => {
                  deferredUnsafeDone(
                    t,
                    sync(() => e(n, r)),
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
            let cb = (t) => e(G(t));
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
              sync(() =>
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
              o = Od(r, n, a);
            e.setFiberRefs(o);
            let s = e.getFiberRef(_g),
              c = pipe(Zs(i, s), rc(1), rc(16));
            return updateRuntimeFlags(c);
          });
        }
        get poll() {
          return sync(() => fromNullable(this._exitValue));
        }
        unsafePoll() {
          return this._exitValue;
        }
        interruptAsFork(e) {
          return sync(() => this.tell(interruptSignal(interrupt(e))));
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
          return (this.setFiberRef(_g, this.currentRuntimeFlags), this._fiberRefs);
        }
        unsafeDeleteFiberRef(e) {
          this._fiberRefs = Ad(this._fiberRefs, e);
        }
        getFiberRef(e) {
          return this._fiberRefs.locals.has(e) ? this._fiberRefs.locals.get(e)[0][1] : e.initial;
        }
        setFiberRef(e, t) {
          ((this._fiberRefs = Nd(this._fiberRefs, {
            fiberId: this._fiberId,
            fiberRef: e,
            value: t,
          })),
            this.refreshRefCache());
        }
        refreshRefCache() {
          ((this.currentDefaultServices = this.getFiberRef(ud)),
            (this.currentTracer = this.currentDefaultServices.unsafeMap.get(rd.key)),
            (this.currentSupervisor = this.getFiberRef(vg)),
            (this.currentScheduler = this.getFiberRef(hp)),
            (this.currentContext = this.getFiberRef(pl)),
            (this.currentSpan = this.currentContext.unsafeMap.get(id.key)));
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
            let t = $h,
              n = globalThis[Kp];
            globalThis[Kp] = this;
            try {
              for (; t === $h;)
                t =
                  this._queue.length === 0
                    ? eg
                    : this.evaluateMessageWhileSuspended(this._queue.splice(0, 1)[0]);
            } finally {
              ((this._running = !1), (globalThis[Kp] = n));
            }
            this._queue.length > 0 && !this._running
              ? ((this._running = !0),
                t === tg ? (this.drainQueueLaterOnExecutor(), (e = !1)) : (e = !0))
              : (e = !1);
          }
        }
        drainQueueLaterOnExecutor() {
          this.currentScheduler.scheduleTask(this.run, this.getFiberRef(ml), this);
        }
        drainQueueWhileRunning(e, t) {
          let n = t;
          for (; this._queue.length > 0;) {
            let t = this._queue.splice(0, 1)[0];
            n = og[t._tag](this, e, n, t);
          }
          return n;
        }
        isInterrupted() {
          return !Fi(this.getFiberRef(El));
        }
        addInterruptedCause(e) {
          let t = this.getFiberRef(El);
          this.setFiberRef(El, Ni(t, e));
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
                  ? sync(() => {
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
            let t = this.getFiberRef(wl),
              n = this.id().startTimeMillis,
              r = Date.now();
            switch ((Qh.unsafeUpdate(r - n, t), Yh.unsafeUpdate(-1, t), e._tag)) {
              case De:
                Xh.unsafeUpdate(1, t);
                break;
              case Ce:
                Zh.unsafeUpdate(1, t);
                break;
            }
          }
          if (e._tag === `Failure`) {
            let t = this.getFiberRef(Sl);
            !isInterruptedOnly(e.cause) &&
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
          return this.getFiberRef(dg);
        }
        log(e, t, n) {
          let r = R(n) ? n.value : this.getFiberRef(_l),
            i = this.getFiberRef(cg);
          if (Tf(i, r)) return;
          let a = this.getFiberRef(vl),
            o = this.getFiberRef(gl),
            s = this.getLoggers(),
            c = this.getFiberRefs();
          if (fi(s) > 0) {
            let n = va(this.getFiberRef(ud), Zl),
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
            case Np:
              return tg;
            case Ap:
              return (
                this.processNewInterruptSignal(e.cause),
                this._asyncInterruptor !== null &&
                  (this._asyncInterruptor(q(e.cause)), (this._asyncInterruptor = null)),
                $h
              );
            case Mp:
              return (
                (this._asyncInterruptor = null),
                (this._asyncBlockingOn = null),
                this.evaluateEffect(e.effect),
                $h
              );
            case jp:
              return (
                e.onFiber(
                  this,
                  this._exitValue === null
                    ? pf(this.currentRuntimeFlags, this._asyncBlockingOn)
                    : df,
                ),
                $h
              );
            default:
              return absurd(e);
          }
        }
        evaluateEffect(e) {
          this.currentSupervisor.onResume(this);
          try {
            let t =
              qs(this.currentRuntimeFlags) && this.isInterrupted()
                ? q(this.getInterruptedCause())
                : e;
            for (; t !== null;) {
              let e = t,
                n = this.runLoop(e);
              if (n === rg) {
                let e = ig.currentOp;
                ((ig.currentOp = null),
                  e._op === `Yield`
                    ? cooperativeYielding(this.currentRuntimeFlags)
                      ? (this.tell(yieldNow()), this.tell(resume(Wl)), (t = null))
                      : (t = Wl)
                    : e._op === `Async` && (t = null));
              } else {
                this.currentRuntimeFlags = pipe(this.currentRuntimeFlags, Ks(16));
                let e = this.interruptAllChildren();
                e === null
                  ? (this._queue.length === 0 ? this.setExitValue(n) : this.tell(resume(n)),
                    (t = null))
                  : (t = W(e, () => n));
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
            let t = globalThis[Kp];
            globalThis[Kp] = this;
            try {
              this.evaluateEffect(e);
            } finally {
              ((this._running = !1),
                (globalThis[Kp] = t),
                this._queue.length > 0 && this.drainQueueLaterOnExecutor());
            }
          }
        }
        startFork(e) {
          this.tell(resume(e));
        }
        patchRuntimeFlags(e, t) {
          let n = Qs(e, t);
          return ((globalThis[Kp] = this), (this.currentRuntimeFlags = n), n);
        }
        initiateAsync(e, t) {
          let n = !1,
            callback = (e) => {
              n || ((n = !0), this.tell(resume(e)));
            };
          qs(e) && (this._asyncInterruptor = callback);
          try {
            t(callback);
          } catch (e) {
            callback(Ac(ji(e)));
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
          return sync(() => ya(this.currentContext, e));
        }
        Left(e) {
          return kc(e.left);
        }
        None(e) {
          return kc(new Il());
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
              n = cp(rp(e, this.currentContext));
            return (
              n.addObserver((e) => {
                if (e._tag === `Success`) return resume(J(e.value));
                switch (e.cause._tag) {
                  case `Interrupt`:
                    return resume(q(interrupt(_o)));
                  case `Fail`:
                    return resume(kc(e.cause.error));
                  case `Die`:
                    return resume(die(e.cause.defect));
                }
              }),
              unsafeAsync((e) => {
                ((resume = (t) => {
                  e(Kc);
                }),
                  n.unsafeInterrupt());
              })
            );
          });
        }
        [Oe](e) {
          let t = me(() => e.effect_instruction_i0()),
            n = this.getNextSuccessCont();
          return n === void 0
            ? ((ig.currentOp = J(t)), rg)
            : (n._op in ag || absurd(n), ag[n._op](this, n, t));
        }
        [De](e) {
          let t = e,
            n = this.getNextSuccessCont();
          return n === void 0
            ? ((ig.currentOp = t), rg)
            : (n._op in ag || absurd(n), ag[n._op](this, n, t.effect_instruction_i0));
        }
        [Ce](e) {
          let t = e.effect_instruction_i0,
            n = this.getNextFailCont();
          if (n !== void 0)
            switch (n._op) {
              case we:
              case Ee:
                return qs(this.currentRuntimeFlags) && this.isInterrupted()
                  ? q(stripFailures(t))
                  : me(() => n.effect_instruction_i1(t));
              case `OnStep`:
                return qs(this.currentRuntimeFlags) && this.isInterrupted()
                  ? q(stripFailures(t))
                  : J(q(t));
              case Pe:
                return (
                  this.patchRuntimeFlags(this.currentRuntimeFlags, n.patch),
                  qs(this.currentRuntimeFlags) && this.isInterrupted()
                    ? q(Ni(t, this.getInterruptedCause()))
                    : q(t)
                );
              default:
                absurd(n);
            }
          else return ((ig.currentOp = q(t)), rg);
        }
        [Me](e) {
          return me(() => e.effect_instruction_i0(this, ff(this.currentRuntimeFlags)));
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
            let o = Yd(i.refs, t),
              s = Zs(i.flags, n);
            return J(
              blocked(
                e.effect_instruction_i0,
                withFiberRuntime((t) => {
                  for (; r.length > 0;) t.pushStack(r.pop());
                  return (
                    t.setFiberRefs(Xd(t.id(), t.getFiberRefs())(o)),
                    (t.currentRuntimeFlags = Qs(s)(t.currentRuntimeFlags)),
                    e.effect_instruction_i1
                  );
                }),
              ),
            );
          }
          return Gc((t) =>
            W(forkDaemon(runRequestBlock(e.effect_instruction_i0)), () =>
              t(e.effect_instruction_i1),
            ),
          );
        }
        RunBlocked(e) {
          return runBlockedRequests(e.effect_instruction_i0);
        }
        [ke](e) {
          let t = e.effect_instruction_i0,
            n = this.currentRuntimeFlags,
            r = Qs(n, t);
          if (qs(r) && this.isInterrupted()) return q(this.getInterruptedCause());
          if ((this.patchRuntimeFlags(this.currentRuntimeFlags, t), e.effect_instruction_i1)) {
            let t = Zs(r, n);
            return (this.pushStack(new RevertFlags(t, e)), me(() => e.effect_instruction_i1(n)));
          } else return Wl;
        }
        [Te](e) {
          return (this.pushStack(e), e.effect_instruction_i0);
        }
        OnStep(e) {
          return (this.pushStack(e), e.effect_instruction_i0);
        }
        [we](e) {
          return (this.pushStack(e), e.effect_instruction_i0);
        }
        [Ee](e) {
          return (this.pushStack(e), e.effect_instruction_i0);
        }
        [xe](e) {
          return (
            (this._asyncBlockingOn = e.effect_instruction_i1),
            this.initiateAsync(this.currentRuntimeFlags, e.effect_instruction_i0),
            (ig.currentOp = e),
            rg
          );
        }
        [Ne](e) {
          return ((this._isYielding = !1), (ig.currentOp = e), rg);
        }
        [Ae](e) {
          let t = e.effect_instruction_i0,
            n = e.effect_instruction_i1;
          return t() ? (this.pushStack(e), n()) : Wl;
        }
        [je](e) {
          return ag[je](this, e, void 0);
        }
        [Se](e) {
          return me(() => e.commit());
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
                t = W(qc({ priority: e }), () => n);
              }
            }
            try {
              if (
                ((t = this.currentTracer.context(() => {
                  if (sg !== t[Sc]._V) {
                    let e = this.getFiberRef(Cl);
                    if (e._tag === `Some`) {
                      let n = t[Sc]._V;
                      this.log(
                        `Executing an Effect versioned ${n} with a Runtime of version ${getCurrentVersion()}, you may want to dedupe the effect dependencies, you can use the language service plugin to detect this at compile time: https://github.com/Effect-TS/language-service`,
                        ki,
                        e,
                      );
                    }
                  }
                  return this[t._op](t);
                }, this)),
                t === rg)
              ) {
                let e = ig.currentOp;
                return e._op === `Yield` || e._op === `Async`
                  ? rg
                  : ((ig.currentOp = null),
                    e._op === `Success` || e._op === `Failure` ? e : q(ji(e)));
              }
            } catch (e) {
              t =
                (t !== rg && !b(t, `_op`)) || !(t._op in this)
                  ? dieMessage(`Not a valid effect: ${toStringUnknown(t)}`)
                  : isInterruptedException(e)
                    ? q(Ni(ji(e), interrupt(_o)))
                    : die(e);
            }
          }
        }
        run = () => {
          this.drainQueueOnCurrentThread();
        };
      }),
      (cg = globalValue(`effect/FiberRef/currentMinimumLogLevel`, () =>
        fiberRefUnsafeMake(fromLiteral(`Info`)),
      )),
      (loggerWithConsoleLog = (e) =>
        makeLogger((t) => {
          let n = Id(t.context, ud);
          va(n, Ku).unsafe.log(e.log(t));
        })),
      (lg = globalValue(Symbol.for(`effect/Logger/defaultLogger`), () => loggerWithConsoleLog($p))),
      (ug = globalValue(Symbol.for(`effect/Logger/tracerLogger`), () =>
        makeLogger(
          ({ annotations: e, cause: t, context: n, fiberId: r, logLevel: i, message: a }) => {
            let o = Ep(ba(Md(n, pl), id));
            if (o._tag === `None` || o.value._tag === `ExternalSpan`) return;
            let s = ya(Md(n, ud), Zl),
              c = {};
            for (let [t, n] of e) c[t] = n;
            ((c[`effect.fiberId`] = xo(r)),
              (c[`effect.logLevel`] = i.label),
              t !== null &&
                t._tag !== `Empty` &&
                (c[`effect.cause`] = Ui(t, { renderErrorCause: !0 })),
              o.value.event(
                toStringUnknown(Array.isArray(a) && a.length === 1 ? a[0] : a),
                s.unsafeCurrentTimeNanos(),
                c,
              ));
          },
        ),
      )),
      (dg = globalValue(Symbol.for(`effect/FiberRef/currentLoggers`), () =>
        fiberRefUnsafeMakeHashSet(ui(lg, ug)),
      )),
      (fg = dual(
        (e) => isIterable(e[0]),
        (e, t, n) =>
          withFiberRuntime((r) => {
            let i = n?.batching === !0 || (n?.batching === `inherit` && r.getFiberRef(xl));
            return n?.discard
              ? match(
                  n.concurrency,
                  () =>
                    finalizersMaskInternal(
                      Cd,
                      n?.concurrentFinalizers,
                    )((n) =>
                      i
                        ? forEachConcurrentDiscard(e, (e, r) => n(t(e, r)), !0, !1, 1)
                        : Lc(e, (e, r) => n(t(e, r))),
                    ),
                  () =>
                    finalizersMaskInternal(
                      wd,
                      n?.concurrentFinalizers,
                    )((n) => forEachConcurrentDiscard(e, (e, r) => n(t(e, r)), i, !1)),
                  (r) =>
                    finalizersMaskInternal(
                      Td(r),
                      n?.concurrentFinalizers,
                    )((n) => forEachConcurrentDiscard(e, (e, r) => n(t(e, r)), i, !1, r)),
                )
              : match(
                  n?.concurrency,
                  () =>
                    finalizersMaskInternal(
                      Cd,
                      n?.concurrentFinalizers,
                    )((n) =>
                      i ? forEachParN(e, 1, (e, r) => n(t(e, r)), !0) : Ic(e, (e, r) => n(t(e, r))),
                    ),
                  () =>
                    finalizersMaskInternal(
                      wd,
                      n?.concurrentFinalizers,
                    )((n) => forEachParUnbounded(e, (e, r) => n(t(e, r)), i)),
                  (r) =>
                    finalizersMaskInternal(
                      Td(r),
                      n?.concurrentFinalizers,
                    )((n) => forEachParN(e, r, (e, r) => n(t(e, r)), i)),
                );
          }),
      )),
      (forEachParUnbounded = (e, t, n) =>
        K(() => {
          let r = V(e),
            i = Array(r.length),
            fn = (e, n) => W(t(e, n), (e) => sync(() => (i[n] = e)));
          return Xc(forEachConcurrentDiscard(r, fn, n, !1), G(i));
        })),
      (forEachConcurrentDiscard = (e, t, n, r, i) =>
        Gc((a) =>
          transplant((o) =>
            withFiberRuntime((s) => {
              let c = Array.from(e).reverse(),
                l = c.length;
              if (l === 0) return Kc;
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
                  return (e.length === 0 && e.push(Wl), e);
                },
                runFiber = (e, t = !1) => {
                  let n = uninterruptible(o(e)),
                    r = unsafeForkUnstarted(n, s, s.currentRuntimeFlags, Rp);
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
                b = runFiber(
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
                              return ((o = u++), W(qc(), () => W(y(a(t(e, o))), onRes)));
                            },
                            onRes = (e) =>
                              c.length > 0 && (pushResult(e, o), c.length > 0)
                                ? returnNextElement()
                                : G(e),
                            p = W(y(a(t(r, o))), onRes),
                            b = runFiber(p);
                          (g.push(b),
                            m.add(b),
                            d &&
                              b.currentScheduler.scheduleTask(
                                () => {
                                  b.unsafeInterruptAsFork(s.id());
                                },
                                0,
                                b,
                              ),
                            b.addObserver((t) => {
                              let r;
                              if (
                                ((r = t._op === `Failure` ? t : t.effect_instruction_i0),
                                _.push(b),
                                m.delete(b),
                                pushResult(r, o),
                                h.length === l)
                              )
                                e(G(z(exitCollectAll(collectExits(), { parallel: !0 }), () => Wl)));
                              else if (v.length + h.length === l) {
                                let t = collectExits(),
                                  r = v.map((e) => e.effect_instruction_i0).reduce(par);
                                e(
                                  G(
                                    blocked(
                                      r,
                                      forEachConcurrentDiscard(
                                        [
                                          z(exitCollectAll(t, { parallel: !0 }), () => Wl),
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
                Hc(
                  Mc(a(join(b))),
                  Ul({
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
                        (b.addObserver(check(s, !1)), s++);
                        for (let e = 0; e < n; e++) next();
                      });
                    },
                    onSuccess: () => Ic(_, (e) => e.inheritAll),
                  }),
                ),
              );
            }),
          ),
        )),
      (forEachParN = (e, t, n, r) =>
        K(() => {
          let i = V(e),
            a = Array(i.length),
            fn = (e, t) => zc(n(e, t), (e) => (a[t] = e));
          return Xc(forEachConcurrentDiscard(i, fn, r, !1, t), G(a));
        })),
      (forkDaemon = (e) => forkWithScopeOverride(e, Rp)),
      (pg = __name((e, t, n, r = null) => {
        let i = unsafeMakeChildFiber(e, t, n, r);
        return (i.resume(e), i);
      }, `unsafeFork`)),
      (unsafeForkUnstarted = (e, t, n, r = null) => unsafeMakeChildFiber(e, t, n, r)),
      (unsafeMakeChildFiber = (e, t, n, r = null) => {
        let i = So(),
          a = t.getFiberRefs(),
          o = kd(a, i),
          s = new FiberRuntime(i, o, n),
          c = Md(o, pl),
          l = s.currentSupervisor;
        return (
          l.onStart(c, e, I(t), s),
          s.addObserver((e) => l.onEnd(e, s)),
          (r === null
            ? pipe(
                t.getFiberRef(Tl),
                z(() => t.scope()),
              )
            : r
          ).add(n, s),
          s
        );
      }),
      (forkWithScopeOverride = (e, t) =>
        withFiberRuntime((n, r) => G(pg(e, n, r.runtimeFlags, t)))),
      (parallelFinalizers = (e) =>
        contextWithEffect((t) =>
          Rt(ba(t, mg), {
            onNone: () => e,
            onSome: (t) => {
              switch (t.strategy._tag) {
                case `Parallel`:
                  return e;
                case `Sequential`:
                case `ParallelN`:
                  return W(scopeFork(t, wd), (t) => gg(e, t));
              }
            },
          }),
        )),
      (parallelNFinalizers = (e) => (t) =>
        contextWithEffect((n) =>
          Rt(ba(n, mg), {
            onNone: () => t,
            onSome: (n) =>
              n.strategy._tag === `ParallelN` && n.strategy.parallelism === e
                ? t
                : W(scopeFork(n, Td(e)), (e) => gg(t, e)),
          }),
        )),
      (finalizersMaskInternal = (e, t) => (n) =>
        contextWithEffect((r) =>
          Rt(ba(r, mg), {
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
          Rt(ba(t, mg), {
            onNone: () => e,
            onSome: (t) => {
              switch (t.strategy._tag) {
                case `Sequential`:
                  return e;
                case `Parallel`:
                case `ParallelN`:
                  return W(scopeFork(t, Cd), (t) => gg(e, t));
              }
            },
          }),
        )),
      (mg = ma(`effect/Scope`)),
      (scopeUnsafeAddFinalizer = (e, t) => {
        e.state._tag === `Open` && e.state.finalizers.set({}, t);
      }),
      (hg = {
        [Dl]: Dl,
        [Ol]: Ol,
        pipe() {
          return pipeArguments(this, arguments);
        },
        fork(e) {
          return sync(() => {
            let t = scopeUnsafeMake(e);
            if (this.state._tag === `Closed`) return ((t.state = this.state), t);
            let n = {},
              fin = (e) => t.close(e);
            return (
              this.state.finalizers.set(n, fin),
              scopeUnsafeAddFinalizer(t, (e) =>
                sync(() => {
                  this.state._tag === `Open` && this.state.finalizers.delete(n);
                }),
              ),
              t
            );
          });
        },
        close(e) {
          return K(() => {
            if (this.state._tag === `Closed`) return Kc;
            let t = Array.from(this.state.finalizers.values()).reverse();
            return (
              (this.state = { _tag: `Closed`, exit: e }),
              t.length === 0
                ? Kc
                : isSequential(this.strategy)
                  ? pipe(
                      Ic(t, (t) => exit(t(e))),
                      W((e) =>
                        pipe(
                          exitCollectAll(e),
                          Ut(exitAsVoid),
                          z(() => Wl),
                        ),
                      ),
                    )
                  : isParallel(this.strategy)
                    ? pipe(
                        forEachParUnbounded(t, (t) => exit(t(e)), !1),
                        W((e) =>
                          pipe(
                            exitCollectAll(e, { parallel: !0 }),
                            Ut(exitAsVoid),
                            z(() => Wl),
                          ),
                        ),
                      )
                    : pipe(
                        forEachParN(t, this.strategy.parallelism, (t) => exit(t(e)), !1),
                        W((e) =>
                          pipe(
                            exitCollectAll(e, { parallel: !0 }),
                            Ut(exitAsVoid),
                            z(() => Wl),
                          ),
                        ),
                      )
            );
          });
        },
        addFinalizer(e) {
          return K(() =>
            this.state._tag === `Closed`
              ? e(this.state.exit)
              : (this.state.finalizers.set({}, e), Kc),
          );
        },
      }),
      (scopeUnsafeMake = (e = yd) => {
        let t = Object.create(hg);
        return ((t.strategy = e), (t.state = { _tag: `Open`, finalizers: new Map() }), t);
      }),
      (gg = dual(2, (e, t) => Jl(e, xa(ga(mg, t))))),
      (fiberRefUnsafeMakeSupervisor = (e) => fiberRefUnsafeMakePatch(e, { differ: Kh, fork: Gh })),
      (_g = fiberRefUnsafeMakeRuntimeFlags(Xs)),
      (vg = fiberRefUnsafeMakeSupervisor(Lh)),
      (yg = dual(2, (e, t) =>
        Gc((n) =>
          Pc(n(e), {
            onFailure: (e) => Pc(t, { onFailure: (t) => Ac(Ni(e, t)), onSuccess: () => Ac(e) }),
            onSuccess: (e) => Tc(t, e),
          }),
        ),
      )),
      (invokeWithInterrupt = (e, t, n) =>
        fiberIdWith((r) =>
          yg(
            W(forkDaemon(Rc(e)), (e) =>
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
                  sync(() => {
                    a.forEach((e) => e());
                  })
                );
              }),
            ),
            K(() => {
              let e = t.flatMap((e) => (e.state.completed ? [] : [e]));
              return Lc(e, (e) => Ah(e.request, Vl(r)));
            }),
          ),
        )));
  }),
  xg,
  Sg,
  Cg,
  wg = __esmMin(() => {
    (qi(), Y(), (xg = Pi), (Sg = Pl), (Cg = Ui));
  }),
  Tg,
  Eg,
  Dg = __esmMin(() => {
    (Y(), (Tg = scopeClose), (Eg = scopeFork));
  }),
  makeDual,
  Og,
  kg,
  AsyncFiberExceptionImpl,
  asyncFiberException,
  Ag,
  jg,
  FiberFailureImpl,
  fiberFailure,
  fastPath,
  Mg,
  RuntimeImpl,
  Ng,
  Pg,
  Fg,
  Ig,
  Lg,
  Rg = __esmMin(() => {
    (wa(),
      D(),
      Co(),
      zd(),
      A(),
      B(),
      j(),
      gp(),
      Dg(),
      qi(),
      Y(),
      Sd(),
      bg(),
      zp(),
      ec(),
      Rh(),
      (makeDual = (e) =>
        function () {
          if (arguments.length === 1) {
            let t = arguments[0];
            return (n, ...r) => e(t, n, ...r);
          }
          return e.apply(this, arguments);
        }),
      (Og = makeDual((e, t, n) => {
        let r = So(),
          i = [[pl, [[r, e.context]]]];
        n?.scheduler && i.push([hp, [[r, n.scheduler]]]);
        let a = Ld(e.fiberRefs, { entries: i, forkAs: r });
        n?.updateRefs && (a = n.updateRefs(a, r));
        let o = new FiberRuntime(r, a, e.runtimeFlags),
          s = t;
        n?.scope &&
          (s = W(Eg(n.scope, yd), (e) =>
            Xc(
              scopeAddFinalizer(
                e,
                fiberIdWith((e) => (equals$2(e, o.id()) ? Kc : Zc(o, e))),
              ),
              Hc(t, (t) => Tg(e, t)),
            ),
          ));
        let c = o.currentSupervisor;
        return (
          c !== Lh && (c.onStart(e.context, s, F(), o), o.addObserver((e) => c.onEnd(e, o))),
          Rp.add(e.runtimeFlags, o),
          n?.immediate === !1 ? o.resume(s) : o.start(s),
          o
        );
      })),
      (kg = makeDual((e, t) => {
        let n = Mg(e)(t);
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
      (Ag = Symbol.for(`effect/Runtime/FiberFailure`)),
      (jg = Symbol.for(`effect/Runtime/FiberFailure/Cause`)),
      (FiberFailureImpl = class extends Error {
        [Ag];
        [jg];
        constructor(e) {
          let t = prettyErrors(e)[0];
          (super(t?.message || `An error has occurred`),
            (this[Ag] = Ag),
            (this[jg] = e),
            (this.name = t ? `(FiberFailure) ${t.name}` : `FiberFailure`),
            t?.stack && (this.stack = t.stack));
        }
        toJSON() {
          return { _id: `FiberFailure`, cause: this[jg].toJSON() };
        }
        toString() {
          return `(FiberFailure) ` + Ui(this[jg], { renderErrorCause: !0 });
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
            return exitFail(new Il());
        }
      }),
      (Mg = makeDual((e, t) => {
        let n = fastPath(t);
        if (n) return n;
        let r = new SyncScheduler(),
          i = Og(e)(t, { scheduler: r });
        return (
          r.flush(), i.unsafePoll() || Bl(capture(asyncFiberException(i), currentSpanFromFiber(i)))
        );
      })),
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
      (Ng = __name((e) => new RuntimeImpl(e.context, e.runtimeFlags, e.fiberRefs), `make`)),
      (Pg = Ys(1, 32, 4)),
      (Fg = Ng({ context: ha(), runtimeFlags: Pg, fiberRefs: Rd() })),
      (Ig = Og(Fg)),
      (Lg = kg(Fg)));
  }),
  zg,
  Bg,
  Vg = __esmMin(() => {
    (Y(),
      (zg = (function () {
        let e = Symbol.for(`effect/Data/Error/plainArgs`);
        return {
          BaseEffectError: class extends kl {
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
      (Bg = __name((e) => {
        let t = {
          BaseEffectError: class extends zg {
            _tag = e;
          },
        };
        return ((t.BaseEffectError.prototype.name = e), t.BaseEffectError);
      }, `TaggedError`)));
  }),
  Hg,
  Ug,
  Wg,
  Gg,
  Kg,
  qg,
  Jg,
  Yg,
  makeZonedProto,
  Xg,
  isTimeZone,
  Zg,
  Qg,
  $g,
  e_,
  t_,
  makeUtc,
  n_,
  r_,
  hasZone,
  i_,
  a_,
  o_,
  s_,
  c_,
  l_,
  u_,
  d_,
  zoneMakeIntl,
  f_,
  p_,
  m_,
  h_,
  g_,
  __,
  v_,
  toDate,
  zonedOffset,
  offsetToString,
  zonedOffsetIso,
  y_,
  setPartsDate,
  b_,
  makeZonedFromAdjusted,
  x_,
  parseOffset,
  calculateNamedOffset,
  S_,
  formatIsoOffset,
  C_,
  w_ = __esmMin(() => {
    (wg(),
      D(),
      m(),
      s(),
      _(),
      T(),
      A(),
      B(),
      j(),
      x(),
      (Hg = Symbol.for(`effect/DateTime`)),
      (Ug = Symbol.for(`effect/DateTime/TimeZone`)),
      (Wg = {
        [Hg]: Hg,
        pipe() {
          return pipeArguments(this, arguments);
        },
        [O]() {
          return this.toString();
        },
        toJSON() {
          return v_(this).toJSON();
        },
      }),
      (Gg = {
        ...Wg,
        _tag: `Utc`,
        [S]() {
          return w(this, _e(this.epochMillis));
        },
        [E](e) {
          return Xg(e) && e._tag === `Utc` && this.epochMillis === e.epochMillis;
        },
        toString() {
          return `DateTime.Utc(${v_(this).toJSON()})`;
        },
      }),
      (Kg = {
        ...Wg,
        _tag: `Zoned`,
        [S]() {
          return pipe(_e(this.epochMillis), C(hash(this.zone)), w(this));
        },
        [E](e) {
          return (
            Xg(e) &&
            e._tag === `Zoned` &&
            this.epochMillis === e.epochMillis &&
            equals$2(this.zone, e.zone)
          );
        },
        toString() {
          return `DateTime.Zoned(${C_(this)})`;
        },
      }),
      (qg = {
        [Ug]: Ug,
        [O]() {
          return this.toString();
        },
      }),
      (Jg = {
        ...qg,
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
      (Yg = {
        ...qg,
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
        let r = Object.create(Kg);
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
      (Xg = __name((e) => b(e, Hg), `isDateTime`)),
      (isTimeZone = (e) => b(e, Ug)),
      (Zg = __name((e) => isTimeZone(e) && e._tag === `Offset`, `isTimeZoneOffset`)),
      (Qg = __name((e) => isTimeZone(e) && e._tag === `Named`, `isTimeZoneNamed`)),
      ($g = __name((e) => e._tag === `Utc`, `isUtc`)),
      (e_ = __name((e) => e._tag === `Zoned`, `isZoned`)),
      (t_ = c((e, t) => e.epochMillis === t.epochMillis)),
      (makeUtc = (e) => {
        let t = Object.create(Gg);
        return (
          (t.epochMillis = e),
          Object.defineProperty(t, "partsUtc", { value: void 0, enumerable: !1, writable: !0 }),
          t
        );
      }),
      (n_ = __name((e) => {
        let t = e.getTime();
        if (Number.isNaN(t)) throw new Sg(`Invalid date`);
        return makeUtc(t);
      }, `unsafeFromDate`)),
      (r_ = __name((e) => {
        if (Xg(e)) return e;
        if (e instanceof Date) return n_(e);
        if (typeof e == `object`) {
          let t = new Date(0);
          return (setPartsDate(t, e), n_(t));
        } else if (typeof e == `string` && !hasZone(e)) return n_(new Date(e + `Z`));
        return n_(new Date(e));
      }, `unsafeMake`)),
      (hasZone = (e) => /Z|[+-]\d{2}$|[+-]\d{2}:?\d{2}$|\]$/.test(e)),
      (i_ = -86399999568e5),
      (a_ = 864e13 - 840 * 60 * 1e3),
      (o_ = __name((e, t) => {
        if (t?.timeZone === void 0 && Xg(e) && e_(e)) return e;
        let n = r_(e);
        if (n.epochMillis < i_ || n.epochMillis > a_)
          throw RangeError(`Epoch millis out of range: ${n.epochMillis}`);
        let r;
        if (t?.timeZone === void 0) {
          let e = new Date(n.epochMillis).getTimezoneOffset() * -60 * 1e3;
          r = p_(e);
        } else if (isTimeZone(t?.timeZone)) r = t.timeZone;
        else if (typeof t?.timeZone == `number`) r = p_(t.timeZone);
        else {
          let e = g_(t.timeZone);
          if (L(e)) throw new Sg(`Invalid time zone: ${t.timeZone}`);
          r = e.value;
        }
        return t?.adjustForTimeZone === !0
          ? makeZonedFromAdjusted(n.epochMillis, r, t?.disambiguation ?? `compatible`)
          : makeZonedProto(n.epochMillis, r, n.partsUtc);
      }, `unsafeMakeZoned`)),
      (s_ = liftThrowable(o_)),
      (c_ = /^(.{17,35})\[(.+)\]$/),
      (l_ = __name((e) => {
        let t = c_.exec(e);
        if (t === null) {
          let t = parseOffset(e);
          return t === null ? F() : s_(e, { timeZone: t });
        }
        let [, n, r] = t;
        return s_(n, { timeZone: r });
      }, `makeZonedFromString`)),
      (u_ = globalValue(`effect/DateTime/validZoneCache`, () => new Map())),
      (d_ = {
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
        if (u_.has(t)) return u_.get(t);
        let n = Object.create(Jg);
        return ((n.id = t), (n.format = e), u_.set(t, n), n);
      }),
      (f_ = __name((e) => {
        if (u_.has(e)) return u_.get(e);
        try {
          return zoneMakeIntl(new Intl.DateTimeFormat(`en-US`, { ...d_, timeZone: e }));
        } catch {
          throw new Sg(`Invalid time zone: ${e}`);
        }
      }, `zoneUnsafeMakeNamed`)),
      (p_ = __name((e) => {
        let t = Object.create(Yg);
        return ((t.offset = e), t);
      }, `zoneMakeOffset`)),
      (m_ = liftThrowable(f_)),
      (h_ = /^(?:GMT|[+-])/),
      (g_ = __name((e) => {
        if (h_.test(e)) {
          let t = parseOffset(e);
          return t === null ? F() : I(p_(t));
        }
        return m_(e);
      }, `zoneFromString`)),
      (__ = __name((e) => (e._tag === `Offset` ? offsetToString(e.offset) : e.id), `zoneToString`)),
      (v_ = __name((e) => new Date(e.epochMillis), `toDateUtc`)),
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
      (zonedOffset = (e) => toDate(e).getTime() - y_(e)),
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
      (y_ = __name((e) => e.epochMillis, `toEpochMillis`)),
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
      (b_ = 1440 * 60 * 1e3),
      (makeZonedFromAdjusted = (e, t, n) => {
        if (t._tag === `Offset`) return makeZonedProto(e - t.offset, t);
        let r = calculateNamedOffset(e - b_, e, t),
          i = calculateNamedOffset(e + b_, e, t);
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
      (x_ = /([+-])(\d{2}):(\d{2})$/),
      (parseOffset = (e) => {
        let t = x_.exec(e);
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
      (S_ = __name((e) => v_(e).toISOString(), `formatIso`)),
      (formatIsoOffset = (e) => {
        let t = toDate(e);
        return e._tag === `Utc`
          ? t.toISOString()
          : `${t.toISOString().slice(0, -1)}${zonedOffsetIso(e)}`;
      }),
      (C_ = __name(
        (e) =>
          e.zone._tag === `Offset` ? formatIsoOffset(e) : `${formatIsoOffset(e)}[${e.zone.id}]`,
        `formatIsoZoned`,
      )));
  }),
  toUpperCase,
  toLowerCase,
  capitalize,
  uncapitalize,
  T_,
  E_ = __esmMin(() => {
    ((toUpperCase = (e) => e.toUpperCase()),
      (toLowerCase = (e) => e.toLowerCase()),
      (capitalize = (e) => (e.length === 0 ? e : toUpperCase(e[0]) + e.slice(1))),
      (uncapitalize = (e) => (e.length === 0 ? e : toLowerCase(e[0]) + e.slice(1))),
      (T_ = __name((e) => e.length > 0, `isNonEmpty`)));
  }),
  D_,
  O_,
  k_,
  A_,
  j_,
  M_,
  N_,
  P_,
  F_,
  I_,
  L_,
  R_,
  z_,
  B_ = __esmMin(() => {
    (Dp(),
      Y(),
      bg(),
      Rg(),
      (D_ = Cc),
      (O_ = fg),
      (k_ = K),
      (A_ = Kc),
      (j_ = Ec),
      (M_ = zc),
      (N_ = Bc),
      (P_ = Vc),
      (F_ = Tp),
      (I_ = Oc),
      (L_ = W),
      (R_ = Ig),
      (z_ = Lg));
  }),
  V_,
  H_,
  U_,
  isBigDecimal,
  W_,
  unsafeMakeNormalized,
  G_,
  K_,
  q_,
  normalize,
  J_,
  abs,
  Y_,
  X_,
  unsafeFromNumber,
  safeFromNumber,
  Z_,
  Q_,
  toExponential,
  unsafeToNumber,
  isZero,
  isNegative,
  $_ = __esmMin(() => {
    (D(),
      m(),
      s(),
      T(),
      A(),
      B(),
      j(),
      x(),
      (V_ = /^[+-]?\d+$/),
      (H_ = Symbol.for(`effect/BigDecimal`)),
      (U_ = {
        [H_]: H_,
        [S]() {
          let e = normalize(this);
          return pipe(hash(e.value), C(_e(e.scale)), w(this));
        },
        [E](e) {
          return isBigDecimal(e) && X_(this, e);
        },
        toString() {
          return `BigDecimal(${Q_(this)})`;
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
      (isBigDecimal = (e) => b(e, H_)),
      (W_ = __name((e, t) => {
        let n = Object.create(U_);
        return ((n.value = e), (n.scale = t), n);
      }, `make`)),
      (unsafeMakeNormalized = (e, t) => {
        if (e !== G_ && e % K_ === G_) throw RangeError(`Value must be normalized`);
        let n = W_(e, t);
        return ((n.normalized = n), n);
      }),
      (G_ = BigInt(0)),
      (K_ = BigInt(10)),
      (q_ = unsafeMakeNormalized(G_, 0)),
      (normalize = (e) => {
        if (e.normalized === void 0)
          if (e.value === G_) e.normalized = q_;
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
      (J_ = dual(2, (e, t) =>
        t > e.scale
          ? W_(e.value * K_ ** BigInt(t - e.scale), t)
          : t < e.scale
            ? W_(e.value / K_ ** BigInt(e.scale - t), t)
            : e,
      )),
      (abs = (e) => (e.value < G_ ? W_(-e.value, e.scale) : e)),
      (Y_ = c((e, t) =>
        e.scale > t.scale
          ? J_(t, e.scale).value === e.value
          : e.scale < t.scale
            ? J_(e, t.scale).value === t.value
            : e.value === t.value,
      )),
      (X_ = dual(2, (e, t) => Y_(e, t))),
      (unsafeFromNumber = (e) =>
        Ht(safeFromNumber(e), () => RangeError(`Number must be finite, got ${e}`))),
      (safeFromNumber = (e) => {
        if (!Number.isFinite(e)) return F();
        let t = `${e}`;
        if (t.includes(`e`)) return Z_(t);
        let [n, r = ``] = t.split(`.`);
        return I(W_(BigInt(`${n}${r}`), r.length));
      }),
      (Z_ = __name((e) => {
        if (e === ``) return I(q_);
        let t,
          n,
          r = e.search(/[eE]/);
        if (r !== -1) {
          let i = e.slice(r + 1);
          if (
            ((t = e.slice(0, r)),
            (n = Number(i)),
            t === `` || !Number.isSafeInteger(n) || !V_.test(i))
          )
            return F();
        } else ((t = e), (n = 0));
        let i,
          a,
          o = t.search(/\./);
        if (o !== -1) {
          let e = t.slice(0, o),
            n = t.slice(o + 1);
          ((i = `${e}${n}`), (a = n.length));
        } else ((i = t), (a = 0));
        if (!V_.test(i)) return F();
        let s = a - n;
        return Number.isSafeInteger(s) ? I(W_(BigInt(i), s)) : F();
      }, `fromString`)),
      (Q_ = __name((e) => {
        let t = normalize(e);
        if (Math.abs(t.scale) >= 16) return toExponential(t);
        let n = t.value < G_,
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
      (unsafeToNumber = (e) => Number(Q_(e))),
      (isZero = (e) => e.value === G_),
      (isNegative = (e) => e.value < G_));
  }),
  toNumber,
  fromString,
  fromNumber,
  ev = __esmMin(() => {
    (B(),
      (toNumber = (e) =>
        e > BigInt(2 ** 53 - 1) || e < BigInt(-(2 ** 53 - 1)) ? F() : I(Number(e))),
      (fromString = (e) => {
        try {
          return e.trim() === `` ? F() : I(BigInt(e));
        } catch {
          return F();
        }
      }),
      (fromNumber = (e) => {
        if (e > 2 ** 53 - 1 || e < -(2 ** 53 - 1)) return F();
        try {
          return I(BigInt(e));
        } catch {
          return F();
        }
      }));
  }),
  tv,
  nv,
  rv,
  iv,
  av,
  ov,
  sv,
  cv,
  lv,
  uv,
  dv,
  fv,
  pv,
  mv,
  hv,
  gv,
  _v,
  vv,
  yv = __esmMin(() => {
    (wa(),
      w_(),
      (tv = Xg),
      (nv = Zg),
      (rv = Qg),
      (iv = $g),
      (av = e_),
      (ov = t_),
      (sv = n_),
      (cv = r_),
      (lv = o_),
      (uv = l_),
      (dv = f_),
      (fv = p_),
      (pv = g_),
      (mv = __),
      (hv = v_),
      (gv = y_),
      Sa(`effect/DateTime/CurrentTimeZone`)(),
      (_v = S_),
      (vv = C_));
  }),
  bv,
  xv,
  Sv,
  Cv,
  wv,
  Tv = __esmMin(() => {
    (x(),
      (bv = Symbol.for(`effect/Encoding/errors/Decode`)),
      (xv = __name((e, t) => {
        let n = { _tag: `DecodeException`, [bv]: bv, input: e };
        return (isString(t) && (n.message = t), n);
      }, `DecodeException`)),
      (Sv = Symbol.for(`effect/Encoding/errors/Encode`)),
      (Cv = __name((e, t) => {
        let n = { _tag: `EncodeException`, [Sv]: Sv, input: e };
        return (isString(t) && (n.message = t), n);
      }, `EncodeException`)),
      (wv = new TextEncoder()));
  });
function getBase64Code(e) {
  if (e >= kv.length) throw TypeError(`Invalid character ${String.fromCharCode(e)}`);
  let t = kv[e];
  if (t === 255) throw TypeError(`Invalid character ${String.fromCharCode(e)}`);
  return t;
}
var Ev,
  Dv,
  stripCrlf,
  Ov,
  kv,
  Av = __esmMin(() => {
    (kt(),
      Tv(),
      (Ev = __name((e) => {
        let t = e.length,
          n = ``,
          r;
        for (r = 2; r < t; r += 3)
          ((n += Ov[e[r - 2] >> 2]),
            (n += Ov[((e[r - 2] & 3) << 4) | (e[r - 1] >> 4)]),
            (n += Ov[((e[r - 1] & 15) << 2) | (e[r] >> 6)]),
            (n += Ov[e[r] & 63]));
        return (
          r === t + 1 && ((n += Ov[e[r - 2] >> 2]), (n += Ov[(e[r - 2] & 3) << 4]), (n += `==`)),
          r === t &&
            ((n += Ov[e[r - 2] >> 2]),
            (n += Ov[((e[r - 2] & 3) << 4) | (e[r - 1] >> 4)]),
            (n += Ov[(e[r - 1] & 15) << 2]),
            (n += `=`)),
          n
        );
      }, `encode`)),
      (Dv = __name((e) => {
        let t = stripCrlf(e),
          n = t.length;
        if (n % 4 != 0) return N(xv(t, `Length must be a multiple of 4, but is ${n}`));
        let r = t.indexOf(`=`);
        if (r !== -1 && (r < n - 2 || (r === n - 2 && t[n - 1] !== `=`)))
          return N(xv(t, `Found a '=' character, but it is not at the end`));
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
          return M(r);
        } catch (e) {
          return N(xv(t, e instanceof Error ? e.message : `Invalid input`));
        }
      }, `decode`)),
      (stripCrlf = (e) => e.replace(/[\n\r]/g, ``)),
      (Ov = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.split(``)),
      (kv = [
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
        255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59,
        60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
      ]));
  }),
  encodeBase64,
  jv,
  encodeUriComponent,
  decodeUriComponent,
  Mv,
  Nv,
  Pv = __esmMin(() => {
    (kt(),
      Av(),
      Tv(),
      (encodeBase64 = (e) => Ev(typeof e == `string` ? wv.encode(e) : e)),
      (jv = __name((e) => Dv(e), `decodeBase64`)),
      (encodeUriComponent = (e) =>
        try_({
          try: () => encodeURIComponent(e),
          catch: (t) => Nv(e, t instanceof Error ? t.message : `Invalid input`),
        })),
      (decodeUriComponent = (e) =>
        try_({
          try: () => decodeURIComponent(e),
          catch: (t) => Mv(e, t instanceof Error ? t.message : `Invalid input`),
        })),
      (Mv = xv),
      (Nv = Cv));
  }),
  getKeysForIndexSignature,
  memoizeThunk,
  isNonEmpty,
  isSingle,
  formatPathKey,
  formatPath,
  Fv = __esmMin(() => {
    (A(),
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
  Iv,
  getSchemaExtendErrorMessage,
  getASTUnsupportedKeySchemaErrorMessage,
  getASTUnsupportedLiteralErrorMessage,
  getASTDuplicateIndexSignatureErrorMessage,
  Lv,
  Rv,
  getASTDuplicatePropertySignatureTransformationErrorMessage,
  getASTDuplicatePropertySignatureErrorMessage,
  zv = __esmMin(() => {
    (U(),
      A(),
      Fv(),
      (Iv = __name((e, t, n, r) => {
        let i = e;
        return (
          n && H(n) && (i += `\nat path: ${formatPath(n)}`),
          t !== void 0 && (i += `\ndetails: ${t}`),
          r && (i += `\nschema (${r._tag}): ${r}`),
          i
        );
      }, `getErrorMessage`)),
      (getSchemaExtendErrorMessage = (e, t, n) =>
        Iv(`Unsupported schema or overlapping types`, `cannot extend ${e} with ${t}`, n)),
      (getASTUnsupportedKeySchemaErrorMessage = (e) =>
        Iv(`Unsupported key schema`, void 0, void 0, e)),
      (getASTUnsupportedLiteralErrorMessage = (e) =>
        Iv(`Unsupported literal`, `literal value: ${formatUnknown(e)}`)),
      (getASTDuplicateIndexSignatureErrorMessage = (e) =>
        Iv(`Duplicate index signature`, `${e} index signature`)),
      (Lv = Iv(
        `Unsupported index signature parameter`,
        "An index signature parameter type must be `string`, `symbol`, a template literal type or a refinement of the previous types",
      )),
      (Rv = Iv(
        `Invalid element`,
        `A required element cannot follow an optional element. ts(1257)`,
      )),
      (getASTDuplicatePropertySignatureTransformationErrorMessage = (e) =>
        Iv(`Duplicate property signature transformation`, `Duplicate key ${formatUnknown(e)}`)),
      (getASTDuplicatePropertySignatureErrorMessage = (e) =>
        Iv(`Duplicate property signature`, `Duplicate key ${formatUnknown(e)}`)));
  }),
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
  ey = __esmMin(() => {
    ((Bv = Symbol.for(`effect/SchemaId/DateFromSelf`)),
      (Vv = Symbol.for(`effect/SchemaId/GreaterThan`)),
      (Hv = Symbol.for(`effect/SchemaId/GreaterThanOrEqualTo`)),
      (Uv = Symbol.for(`effect/SchemaId/LessThan`)),
      (Wv = Symbol.for(`effect/SchemaId/LessThanOrEqualTo`)),
      (Gv = Symbol.for(`effect/SchemaId/Int`)),
      (Kv = Symbol.for(`effect/SchemaId/NonNaN`)),
      (qv = Symbol.for(`effect/SchemaId/Finite`)),
      (Jv = Symbol.for(`effect/SchemaId/JsonNumber`)),
      (Yv = Symbol.for(`effect/SchemaId/Between`)),
      (Xv = Symbol.for(`effect/SchemaId/GreaterThanOrEqualToBigint`)),
      (Zv = Symbol.for(`effect/SchemaId/BetweenBigint`)),
      (Qv = Symbol.for(`effect/SchemaId/MinLength`)),
      ($v = Symbol.for(`effect/SchemaId/Length`)));
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
  return Rt(Ty(e), {
    onNone: () => ``,
    onSome: (e) => e.map((e) => ` & Brand<${formatUnknown(e)}>`).join(``),
  });
}
var ty,
  ny,
  ry,
  iy,
  ay,
  oy,
  sy,
  cy,
  ly,
  uy,
  dy,
  fy,
  py,
  my,
  hy,
  gy,
  _y,
  vy,
  yy,
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
  Ry,
  hasStableFilter,
  zy,
  By,
  getJSONIdentifier,
  Vy,
  Declaration,
  createASTGuard,
  Literal$1,
  Hy,
  Uy,
  UniqueSymbol,
  UndefinedKeyword,
  Wy,
  NeverKeyword,
  Gy,
  UnknownKeyword,
  Ky,
  AnyKeyword,
  qy,
  StringKeyword,
  Jy,
  Yy,
  NumberKeyword,
  Xy,
  Zy,
  BooleanKeyword,
  Qy,
  $y,
  BigIntKeyword,
  eb,
  SymbolKeyword,
  tb,
  nb,
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
  rb,
  ib,
  ab,
  flatten,
  unify,
  ob,
  mapMembers,
  isMembers,
  sb,
  lb,
  Suspend,
  Refinement$1,
  ub,
  db,
  Transformation$1,
  fb,
  FinalTransformation,
  createTransformationGuard,
  ComposeTransformation,
  pb,
  PropertySignatureTransformation$1,
  TypeLiteralTransformation,
  mb,
  annotations,
  hb,
  gb,
  getTemplateLiteralSpanTypePattern,
  handleTemplateLiteralSpanTypeParens,
  getTemplateLiteralPattern,
  getTemplateLiteralRegExp,
  record,
  pickAnnotations,
  omitAnnotations,
  _b,
  typeAST,
  getTransformationFrom,
  encodedAST_,
  encodedAST,
  toJSONAnnotations,
  getEncodedParameter,
  vb,
  formatKeyword,
  getOrElseExpected,
  getExpected,
  yb = __esmMin(() => {
    (U(),
      s(),
      _(),
      A(),
      zv(),
      Fv(),
      au(),
      B(),
      It(),
      x(),
      ou(),
      (ty = Symbol.for(`effect/annotation/TypeConstructor`)),
      (ny = Symbol.for(`effect/annotation/Brand`)),
      (ry = Symbol.for(`effect/annotation/SchemaId`)),
      (iy = Symbol.for(`effect/annotation/Message`)),
      (ay = Symbol.for(`effect/annotation/MissingMessage`)),
      (oy = Symbol.for(`effect/annotation/Identifier`)),
      (sy = Symbol.for(`effect/annotation/Title`)),
      (cy = Symbol.for(`effect/annotation/AutoTitle`)),
      (ly = Symbol.for(`effect/annotation/Description`)),
      (uy = Symbol.for(`effect/annotation/Examples`)),
      (dy = Symbol.for(`effect/annotation/Default`)),
      (fy = Symbol.for(`effect/annotation/JSONSchema`)),
      (py = Symbol.for(`effect/annotation/Arbitrary`)),
      (my = Symbol.for(`effect/annotation/Pretty`)),
      (hy = Symbol.for(`effect/annotation/Equivalence`)),
      (gy = Symbol.for(`effect/annotation/Documentation`)),
      (_y = Symbol.for(`effect/annotation/Concurrency`)),
      (vy = Symbol.for(`effect/annotation/Batching`)),
      (yy = Symbol.for(`effect/annotation/ParseIssueTitle`)),
      (by = Symbol.for(`effect/annotation/ParseOptions`)),
      (xy = Symbol.for(`effect/annotation/DecodingFallback`)),
      (Sy = Symbol.for(`effect/annotation/Surrogate`)),
      (Cy = Symbol.for(`effect/annotation/StableFilter`)),
      (wy = dual(2, (e, t) =>
        Object.prototype.hasOwnProperty.call(e.annotations, t) ? I(e.annotations[t]) : F(),
      )),
      (Ty = wy(ny)),
      (Ey = wy(iy)),
      (Dy = wy(ay)),
      (Oy = wy(sy)),
      (ky = wy(cy)),
      (Ay = wy(oy)),
      (jy = wy(ly)),
      (My = wy(_y)),
      (Ny = wy(vy)),
      (Py = wy(yy)),
      (Fy = wy(by)),
      (Iy = wy(xy)),
      (Ly = wy(Sy)),
      (Ry = wy(Cy)),
      (hasStableFilter = (e) => Zt(Ry(e), (e) => e === !0)),
      (zy = Symbol.for(`effect/annotation/JSONIdentifier`)),
      (By = wy(zy)),
      (getJSONIdentifier = (e) => zt(By(e), () => Ay(e))),
      (Vy = Symbol.for(`effect/schema/ParseJson`)),
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
          return z(getExpected(this), () => `<declaration schema>`);
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
          return z(getExpected(this), () => formatUnknown(this.literal));
        }
        toJSON() {
          return {
            _tag: this._tag,
            literal: isBigInt(this.literal) ? String(this.literal) : this.literal,
            annotations: toJSONAnnotations(this.annotations),
          };
        }
      }),
      (Hy = createASTGuard(`Literal`)),
      (Uy = new Literal$1(null)),
      (UniqueSymbol = class {
        symbol;
        annotations;
        _tag = `UniqueSymbol`;
        constructor(e, t = {}) {
          ((this.symbol = e), (this.annotations = t));
        }
        toString() {
          return z(getExpected(this), () => formatUnknown(this.symbol));
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
      (Wy = new UndefinedKeyword({ [sy]: `undefined` })),
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
      (Gy = new NeverKeyword({ [sy]: `never` })),
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
      (Ky = new UnknownKeyword({ [sy]: `unknown` })),
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
      (qy = new AnyKeyword({ [sy]: `any` })),
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
      (Jy = new StringKeyword({ [sy]: `string`, [ly]: `a string` })),
      (Yy = createASTGuard(`StringKeyword`)),
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
      (Xy = new NumberKeyword({ [sy]: `number`, [ly]: `a number` })),
      (Zy = createASTGuard(`NumberKeyword`)),
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
      (Qy = new BooleanKeyword({ [sy]: `boolean`, [ly]: `a boolean` })),
      ($y = createASTGuard(`BooleanKeyword`)),
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
      (eb = new BigIntKeyword({ [sy]: `bigint`, [ly]: `a bigint` })),
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
      (tb = new SymbolKeyword({ [sy]: `symbol`, [ly]: `a symbol` })),
      (nb = createASTGuard(`SymbolKeyword`)),
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
          if (a || (i && t.length > 1)) throw Error(Rv);
        }
        toString() {
          return z(getExpected(this), () => formatTuple(this));
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
        return tn(e.rest, {
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
          else throw Error(Lv);
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
            if (Yy(n)) {
              if (i.string) throw Error(getASTDuplicateIndexSignatureErrorMessage(`string`));
              i.string = !0;
            } else if (nb(n)) {
              if (i.symbol) throw Error(getASTDuplicateIndexSignatureErrorMessage(`symbol`));
              i.symbol = !0;
            }
          }
          ((this.propertySignatures = e), (this.indexSignatures = t));
        }
        toString() {
          return z(getExpected(this), () => formatTypeLiteral(this));
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
      (rb = createASTGuard(`TypeLiteral`)),
      (ib = vn(
        Pt(iu, (e) => {
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
      (ab = {
        string: `StringKeyword`,
        number: `NumberKeyword`,
        boolean: `BooleanKeyword`,
        bigint: `BigIntKeyword`,
      }),
      (flatten = (e) => An(e, (e) => (sb(e) ? flatten(e.types) : [e]))),
      (unify = (e) => {
        let t = ib(e),
          n = [],
          r = {},
          i = [];
        for (let e of t)
          switch (e._tag) {
            case `NeverKeyword`:
              break;
            case `AnyKeyword`:
              return [qy];
            case `UnknownKeyword`:
              return [Ky];
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
                  !r[ab[t]] && !i.includes(e.literal) && (i.push(e.literal), n.push(e));
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
      (ob = class Union$1 {
        static {
          __name(this, `Union`);
        }
        types;
        annotations;
        static make = (e, t) => (isMembers(e) ? new Union$1(e, t) : e.length === 1 ? e[0] : Gy);
        static unify = (e, t) => Union$1.make(unify(flatten(e)), t);
        _tag = `Union`;
        constructor(e, t = {}) {
          ((this.types = e), (this.annotations = t));
        }
        toString() {
          return z(getExpected(this), () => this.types.map(String).join(` | `));
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
      (sb = createASTGuard(`Union`)),
      (lb = globalValue(Symbol.for(`effect/Schema/AST/toJSONMemoMap`), () => new WeakMap())),
      (Suspend = class {
        f;
        annotations;
        _tag = `Suspend`;
        constructor(e, t = {}) {
          ((this.f = e), (this.annotations = t), (this.f = memoizeThunk(e)));
        }
        toString() {
          return getExpected(this).pipe(
            zt(() => Wt(liftThrowable(this.f)(), (e) => getExpected(e))),
            z(() => `<suspended schema>`),
          );
        }
        toJSON() {
          let e = this.f(),
            t = lb.get(e);
          return (
            t ||
            (lb.set(e, { _tag: this._tag }),
            (t = {
              _tag: this._tag,
              ast: e.toJSON(),
              annotations: toJSONAnnotations(this.annotations),
            }),
            lb.set(e, t),
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
          return Ay(this).pipe(
            z(() =>
              Rt(getOrElseExpected(this), {
                onNone: () => `{ ${this.from} | filter }`,
                onSome: (e) => (ub(this.from) ? String(this.from) + ` & ` + e : e),
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
      (ub = createASTGuard(`Refinement`)),
      (db = {}),
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
          return z(getExpected(this), () => `(${String(this.from)} <-> ${String(this.to)})`);
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
      (fb = createASTGuard(`Transformation`)),
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
      (pb = new ComposeTransformation()),
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
      (mb = createTransformationGuard(`TypeLiteralTransformation`)),
      (annotations = (e, t) => {
        let n = Object.getOwnPropertyDescriptors(e),
          r = { ...e.annotations };
        delete r[oy];
        let i = { ...r, ...t },
          a = Ly(e);
        return (
          R(a) && (i[Sy] = annotations(a.value, t)),
          (n.annotations.value = i),
          Object.create(Object.getPrototypeOf(e), n)
        );
      }),
      (hb = `[\\s\\S]*?`),
      (gb = `[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?`),
      (getTemplateLiteralSpanTypePattern = (e, t) => {
        switch (e._tag) {
          case `Literal`:
            return escape(String(e.literal));
          case `StringKeyword`:
            return hb;
          case `NumberKeyword`:
            return gb;
          case `TemplateLiteral`:
            return getTemplateLiteralPattern(e, t, !1);
          case `Union`:
            return e.types.map((e) => getTemplateLiteralSpanTypePattern(e, t)).join(`|`);
        }
      }),
      (handleTemplateLiteralSpanTypeParens = (e, t, n, r) => {
        if (sb(e)) {
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
      (_b = pickAnnotations([uy, dy, fy, py, my, hy])),
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
            return t === e.types ? e : ob.make(t, e.annotations);
          }
          case `Suspend`:
            return new Suspend(() => typeAST(e.f()), e.annotations);
          case `Refinement`: {
            let t = typeAST(e.from);
            return t === e.from ? e : new Refinement$1(t, e.filter, e.annotations);
          }
          case `Transformation`: {
            let t = _b(e);
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
            return n === e.types ? e : ob.make(n);
          }
          case `Suspend`: {
            let n,
              r = getJSONIdentifier(e);
            if (R(r)) {
              let e = t ? `Bound` : ``;
              n = { [zy]: `${r.value}Encoded${e}` };
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
      (vb = __name((e, t) => new Transformation$1(e, t, pb), `compose`)),
      (formatKeyword = (e) => z(getExpected(e), () => e._tag)),
      (getOrElseExpected = (e) =>
        Oy(e).pipe(
          zt(() => jy(e)),
          zt(() => ky(e)),
          Ut((t) => t + getBrands(e)),
        )),
      (getExpected = (e) => zt(Ay(e), () => getOrElseExpected(e))));
  });
function sortByIndex(e) {
  return e.sort(compare).map((e) => e[1]);
}
function getRefinementExpected(e) {
  return jy(e).pipe(
    zt(() => Oy(e)),
    zt(() => ky(e)),
    zt(() => Ay(e)),
    z(() => `{ ${e.from} | filter }`),
  );
}
function getDefaultTypeMessage(e) {
  return e.message === void 0
    ? `Expected ${ub(e.ast) ? getRefinementExpected(e.ast) : String(e.ast)}, actual ${formatUnknown(e.actual)}`
    : e.message;
}
var Pointer,
  Unexpected,
  Missing,
  Composite,
  Refinement,
  Transformation,
  Type,
  Forbidden,
  bb,
  ParseError,
  parseError,
  Z,
  xb,
  Sb,
  Cb,
  wb,
  Tb,
  Eb,
  Db,
  Ob,
  kb,
  mergeInternalOptions,
  getEither,
  getSync,
  getEffect,
  Ab,
  encodeUnknownSync,
  encodeUnknown,
  jb,
  validateSync,
  is,
  Mb,
  Nb,
  Pb,
  Fb,
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
  Ib,
  drawTree,
  draw,
  formatTransformationKind,
  formatRefinementKind,
  getAnnotated,
  Lb,
  getCurrentMessage,
  createParseIssueGuard,
  Rb,
  zb,
  Bb,
  getMessage,
  getParseIssueTitleAnnotation,
  formatTypeMessage,
  getParseIssueTitle,
  formatForbiddenMessage,
  formatUnexpectedMessage,
  formatMissingMessage,
  formatTree,
  Vb = __esmMin(() => {
    (U(),
      wg(),
      Vg(),
      B_(),
      kt(),
      kp(),
      s(),
      _(),
      A(),
      Fv(),
      B(),
      x(),
      gp(),
      yb(),
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
      (Composite = class {
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
      (bb = Symbol.for(`effect/Schema/ParseErrorTypeId`)),
      (ParseError = class extends Bg(`ParseError`) {
        [bb] = bb;
        get message() {
          return this.toString();
        }
        toString() {
          return Ib.formatIssueSync(this.issue);
        }
        toJSON() {
          return { _id: `ParseError`, message: this.toString() };
        }
        [O]() {
          return this.toJSON();
        }
      }),
      (parseError = (e) => new ParseError({ issue: e })),
      (Z = M),
      (xb = N),
      (Sb = try_),
      (Cb = yt),
      (wb = bt),
      (Tb = dual(2, (e, t) => (wb(e) ? Tt(e, { onLeft: N, onRight: t }) : L_(e, t)))),
      (Eb = dual(2, (e, t) => (wb(e) ? wt(e, t) : M_(e, t)))),
      (Db = dual(2, (e, t) => (wb(e) ? Ct(e, t) : P_(e, t)))),
      (Ob = dual(2, (e, t) =>
        wb(e) ? St(e, { onLeft: t.onFailure, onRight: t.onSuccess }) : N_(e, t),
      )),
      (kb = dual(2, (e, t) => (wb(e) ? Tt(e, { onLeft: t, onRight: M }) : j_(e, t)))),
      (mergeInternalOptions = (e, t) =>
        t === void 0 || isNumber(t) ? e : e === void 0 ? t : { ...e, ...t }),
      (getEither = (e, t, n) => {
        let r = goMemo(e, t);
        return (e, t) => r(e, mergeInternalOptions(n, t));
      }),
      (getSync = (e, t, n) => {
        let r = getEither(e, t, n);
        return (e, t) => Dt(r(e, t), parseError);
      }),
      (getEffect = (e, t, n) => {
        let r = goMemo(e, t);
        return (e, t) => r(e, { ...mergeInternalOptions(n, t), isEffectAllowed: !0 });
      }),
      (Ab = __name((e, t) => getEffect(e.ast, !0, t), `decodeUnknown`)),
      (encodeUnknownSync = (e, t) => getSync(e.ast, !1, t)),
      (encodeUnknown = (e, t) => getEffect(e.ast, !1, t)),
      (jb = Ab),
      (validateSync = (e, t) => getSync(typeAST(e.ast), !0, t)),
      (is = (e, t) => {
        let n = goMemo(typeAST(e.ast), !0);
        return (e, r) => xt(n(e, { exact: !0, ...mergeInternalOptions(t, r) }));
      }),
      (Mb = encodeUnknownSync),
      (Nb = encodeUnknown),
      (Pb = globalValue(Symbol.for(`effect/ParseResult/decodeMemoMap`), () => new WeakMap())),
      (Fb = globalValue(Symbol.for(`effect/ParseResult/encodeMemoMap`), () => new WeakMap())),
      (goMemo = (e, t) => {
        let n = t ? Pb : Fb,
          r = n.get(e);
        if (r) return r;
        let i = go(e, t),
          a = Fy(e),
          o = R(a) ? (e, t) => i(e, mergeInternalOptions(t, a.value)) : i,
          s = Iy(e),
          c = t && R(s) ? (t, n) => handleForbidden(kb(o(t, n), s.value), e, t, n) : o;
        return (n.set(e, c), c);
      }),
      (getConcurrency = (e) => Vt(My(e))),
      (getBatching = (e) => Vt(Ny(e))),
      (go = (e, t) => {
        switch (e._tag) {
          case `Refinement`:
            if (t) {
              let t = goMemo(e.from, !0);
              return (n, r) => {
                r ??= db;
                let i = r?.errors === `all`,
                  a = Tb(
                    kb(t(n, r), (t) => {
                      let a = new Refinement(e, n, `From`, t);
                      return i && hasStableFilter(e) && Rb(t)
                        ? Rt(e.filter(n, r, e), {
                            onNone: () => N(a),
                            onSome: (t) =>
                              N(new Composite(e, n, [a, new Refinement(e, n, `Predicate`, t)])),
                          })
                        : N(a);
                    }),
                    (t) =>
                      Rt(e.filter(t, r, e), {
                        onNone: () => M(t),
                        onSome: (t) => N(new Refinement(e, n, `Predicate`, t)),
                      }),
                  );
                return handleForbidden(a, e, n, r);
              };
            } else {
              let t = goMemo(typeAST(e), !0),
                n = goMemo(dropRightRefinement(e.from), !1);
              return (r, i) =>
                handleForbidden(
                  Tb(t(r, i), (e) => n(e, i)),
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
                Tb(
                  Db(r(a, o), (n) => new Transformation(e, a, t ? `Encoded` : `Type`, n)),
                  (r) =>
                    Tb(
                      Db(n(r, o ?? db, e, a), (t) => new Transformation(e, a, `Transformation`, t)),
                      (n) =>
                        Db(i(n, o), (n) => new Transformation(e, a, t ? `Type` : `Encoded`, n)),
                    ),
                ),
                e,
                a,
                o,
              );
          }
          case `Declaration`: {
            let n = t ? e.decodeUnknown(...e.typeParameters) : e.encodeUnknown(...e.typeParameters);
            return (t, r) => handleForbidden(n(t, r ?? db, e), e, t, r);
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
            return M;
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
            return fromRefinement(e, y);
          case `Enums`:
            return fromRefinement(e, (t) => e.enums.some(([e, n]) => n === t));
          case `TemplateLiteral`: {
            if (e.spans.every((e) => Yy(e.type)))
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
              if (!on(t)) return N(new Type(e, t));
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
                } else return N(new Composite(e, t, r, m));
              }
              if (e.rest.length === 0)
                for (let n = e.elements.length; n <= h - 1; n++) {
                  let r = new Pointer(n, t, new Unexpected(t[n], `is unexpected, expected: ${o}`));
                  if (u) {
                    d.push([p++, r]);
                    continue;
                  } else return N(new Composite(e, t, r, m));
                }
              let g = 0,
                _;
              for (; g < n.length; g++)
                if (h < g + 1) {
                  if (e.elements[g].isOptional) continue;
                } else {
                  let r = n[g],
                    i = r(t[g], l);
                  if (wb(i)) {
                    if (P(i)) {
                      let n = new Pointer(g, t, i.left);
                      if (u) {
                        d.push([p++, n]);
                        continue;
                      } else return N(new Composite(e, t, n, sortByIndex(m)));
                    }
                    m.push([p++, i.right]);
                  } else {
                    let n = p++,
                      r = g;
                    ((_ ||= []),
                      _.push(({ es: a, output: o }) =>
                        L_(I_(i), (i) => {
                          if (P(i)) {
                            let s = new Pointer(r, t, i.left);
                            return u
                              ? (a.push([n, s]), A_)
                              : N(new Composite(e, t, s, sortByIndex(o)));
                          }
                          return (o.push([n, i.right]), A_);
                        }),
                      ));
                  }
                }
              if (H(r)) {
                let [n, ...i] = r;
                for (; g < h - i.length; g++) {
                  let r = n(t[g], l);
                  if (wb(r))
                    if (P(r)) {
                      let n = new Pointer(g, t, r.left);
                      if (u) {
                        d.push([p++, n]);
                        continue;
                      } else return N(new Composite(e, t, n, sortByIndex(m)));
                    } else m.push([p++, r.right]);
                  else {
                    let n = p++,
                      i = g;
                    ((_ ||= []),
                      _.push(({ es: a, output: o }) =>
                        L_(I_(r), (r) => {
                          if (P(r)) {
                            let s = new Pointer(i, t, r.left);
                            return u
                              ? (a.push([n, s]), A_)
                              : N(new Composite(e, t, s, sortByIndex(o)));
                          } else return (o.push([n, r.right]), A_);
                        }),
                      ));
                  }
                }
                for (let n = 0; n < i.length; n++) {
                  let r = g + n;
                  if (!(h < r + 1)) {
                    let a = i[n](t[r], l);
                    if (wb(a)) {
                      if (P(a)) {
                        let n = new Pointer(r, t, a.left);
                        if (u) {
                          d.push([p++, n]);
                          continue;
                        } else return N(new Composite(e, t, n, sortByIndex(m)));
                      }
                      m.push([p++, a.right]);
                    } else {
                      let n = p++;
                      ((_ ||= []),
                        _.push(({ es: i, output: o }) =>
                          L_(I_(a), (a) => {
                            if (P(a)) {
                              let s = new Pointer(r, t, a.left);
                              return u
                                ? (i.push([n, s]), A_)
                                : N(new Composite(e, t, s, sortByIndex(o)));
                            }
                            return (o.push([n, a.right]), A_);
                          }),
                        ));
                    }
                  }
                }
              }
              let computeResult = ({ es: n, output: r }) =>
                cn(n) ? N(new Composite(e, t, sortByIndex(n), sortByIndex(r))) : M(sortByIndex(r));
              if (_ && _.length > 0) {
                let e = _;
                return k_(() => {
                  let t = { es: wn(d), output: wn(m) };
                  return L_(
                    O_(e, (e) => e(t), { concurrency: s, batching: c, discard: !0 }),
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
              o = ob.make(
                e.indexSignatures
                  .map((e) => e.parameter)
                  .concat(i.map((e) => (isSymbol(e) ? new UniqueSymbol(e) : new Literal$1(e)))),
              ),
              s = goMemo(o, t),
              c = getConcurrency(e),
              l = getBatching(e);
            return (t, u) => {
              if (!isRecord(t)) return N(new Type(e, t));
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
                  if (wb(r) && P(r))
                    if (h) {
                      let r = new Pointer(
                        n,
                        t,
                        new Unexpected(t[n], `is unexpected, expected: ${String(o)}`),
                      );
                      if (d) {
                        p.push([m++, r]);
                        continue;
                      } else return N(new Composite(e, t, r, _));
                    } else _[n] = t[n];
                }
              }
              let y,
                b = u?.exact === !0;
              for (let r = 0; r < n.length; r++) {
                let i = n[r][1],
                  a = i.name,
                  o = Object.prototype.hasOwnProperty.call(t, a);
                if (!o) {
                  if (i.isOptional) continue;
                  if (b) {
                    let n = new Pointer(a, t, new Missing(i));
                    if (d) {
                      p.push([m++, n]);
                      continue;
                    } else return N(new Composite(e, t, n, _));
                  }
                }
                let s = n[r][0],
                  c = s(t[a], u);
                if (wb(c)) {
                  if (P(c)) {
                    let n = new Pointer(a, t, o ? c.left : new Missing(i));
                    if (d) {
                      p.push([m++, n]);
                      continue;
                    } else return N(new Composite(e, t, n, _));
                  }
                  _[a] = c.right;
                } else {
                  let n = m++,
                    r = a;
                  ((y ||= []),
                    y.push(({ es: a, output: s }) =>
                      L_(I_(c), (c) => {
                        if (P(c)) {
                          let l = new Pointer(r, t, o ? c.left : new Missing(i));
                          return d ? (a.push([n, l]), A_) : N(new Composite(e, t, l, s));
                        }
                        return ((s[r] = c.right), A_);
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
                  if (wb(i) && xt(i)) {
                    let i = s(t[n], u);
                    if (wb(i))
                      if (P(i)) {
                        let r = new Pointer(n, t, i.left);
                        if (d) {
                          p.push([m++, r]);
                          continue;
                        } else return N(new Composite(e, t, r, _));
                      } else Object.prototype.hasOwnProperty.call(r, n) || (_[n] = i.right);
                    else {
                      let a = m++,
                        o = n;
                      ((y ||= []),
                        y.push(({ es: s, output: c }) =>
                          L_(I_(i), (i) => {
                            if (P(i)) {
                              let n = new Pointer(o, t, i.left);
                              return d ? (s.push([a, n]), A_) : N(new Composite(e, t, n, c));
                            } else
                              return (
                                Object.prototype.hasOwnProperty.call(r, n) || (c[n] = i.right), A_
                              );
                          }),
                        ));
                    }
                  }
                }
              }
              let computeResult = ({ es: n, output: r }) => {
                if (cn(n)) return N(new Composite(e, t, sortByIndex(n), r));
                if (u?.propertyOrder === `original`) {
                  let e = v || Reflect.ownKeys(t);
                  for (let t of i) e.indexOf(t) === -1 && e.push(t);
                  let n = {};
                  for (let t of e) Object.prototype.hasOwnProperty.call(r, t) && (n[t] = r[t]);
                  return M(n);
                }
                return M(r);
              };
              if (y && y.length > 0) {
                let e = y;
                return k_(() => {
                  let t = { es: wn(p), output: Object.assign({}, _) };
                  return L_(
                    O_(e, (e) => e(t), { concurrency: c, batching: l, discard: !0 }),
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
                          o = ob.make(r),
                          s =
                            e.length === a
                              ? new TypeLiteral([new PropertySignature(i, o, !1, !0)], [])
                              : ob.make(e);
                        u.push([d++, new Composite(s, t, new Pointer(i, t, new Type(o, t[i])))]);
                      }
                    } else {
                      let { candidates: e, literals: r } = n.keys[i],
                        o = new PropertySignature(i, ob.make(r), !1, !0),
                        s = e.length === a ? new TypeLiteral([o], []) : ob.make(e);
                      u.push([d++, new Composite(s, t, new Pointer(i, t, new Missing(o)))]);
                    }
                  }
                else {
                  let r = n.candidates.length === a ? e : ob.make(n.candidates);
                  u.push([d++, new Type(r, t)]);
                }
              n.otherwise.length > 0 && (p = p.concat(n.otherwise));
              let m;
              for (let e = 0; e < p.length; e++) {
                let n = p[e],
                  r = o.get(n)(t, l);
                if (wb(r) && (!m || m.length === 0)) {
                  if (xt(r)) return r;
                  u.push([d++, r.left]);
                } else {
                  let e = d++;
                  ((m ||= []),
                    m.push((t) =>
                      k_(() =>
                        `finalResult` in t
                          ? A_
                          : L_(
                              I_(r),
                              (n) => (xt(n) ? (t.finalResult = n) : t.es.push([e, n.left]), A_),
                            ),
                      ),
                    ));
                }
              }
              let computeResult = (n) =>
                cn(n)
                  ? n.length === 1 && n[0][1]._tag === `Type`
                    ? N(n[0][1])
                    : N(new Composite(e, t, sortByIndex(n)))
                  : N(new Type(e, t));
              if (m && m.length > 0) {
                let e = m;
                return k_(() => {
                  let t = { es: wn(u) };
                  return L_(
                    O_(e, (e) => e(t), { concurrency: s, batching: c, discard: !0 }),
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
      (fromRefinement = (e, t) => (n) => (t(n) ? M(n) : N(new Type(e, n)))),
      (getLiterals = (e, t) => {
        switch (e._tag) {
          case `Declaration`: {
            let n = Ly(e);
            if (R(n)) return getLiterals(n.value, t);
            break;
          }
          case `TypeLiteral`: {
            let n = [];
            for (let r = 0; r < e.propertySignatures.length; r++) {
              let i = e.propertySignatures[r],
                a = t ? encodedAST(i.type) : typeAST(i.type);
              Hy(a) && !i.isOptional && n.push([i.name, a]);
            }
            return n;
          }
          case `TupleType`: {
            let n = [];
            for (let r = 0; r < e.elements.length; r++) {
              let i = e.elements[r],
                a = t ? encodedAST(i.type) : typeAST(i.type);
              Hy(a) && !i.isOptional && n.push([r, a]);
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
      (dropRightRefinement = (e) => (ub(e) ? dropRightRefinement(e.from) : e)),
      (handleForbidden = (e, t, n, r) => {
        if (r?.isEffectAllowed === !0 || wb(e)) return e;
        let i = new SyncScheduler(),
          a = R_(e, { scheduler: i });
        i.flush();
        let o = a.unsafePoll();
        if (o) {
          if (Op(o)) return M(o.value);
          let e = o.cause;
          return xg(e) ? N(e.error) : N(new Forbidden(t, n, Cg(e)));
        }
        return N(
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
            return M;
          case `TypeLiteralTransformation`:
            return (n) => {
              let r = M(n);
              for (let n of e.propertySignatureTransformations) {
                let [e, i] = t ? [n.from, n.to] : [n.to, n.from],
                  a = t ? n.decode : n.encode,
                  f = (t) => {
                    let n = a(Object.prototype.hasOwnProperty.call(t, e) ? I(t[e]) : F());
                    return (delete t[e], R(n) && (t[i] = n.value), t);
                  };
                r = Eb(r, f);
              }
              return r;
            };
        }
      }),
      (makeTree = (e, t = []) => ({ value: e, forest: t })),
      (Ib = {
        formatIssue: (e) => Eb(formatTree(e), drawTree),
        formatIssueSync: (e) => {
          let t = Ib.formatIssue(e);
          return wb(t) ? Ot(t) : z_(t);
        },
        formatError: (e) => Ib.formatIssue(e.issue),
        formatErrorSync: (e) => Ib.formatIssueSync(e.issue),
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
      (getAnnotated = (e) => (`ast` in e ? I(e.ast) : F())),
      (Lb = M(void 0)),
      (getCurrentMessage = (e) =>
        getAnnotated(e).pipe(
          Wt(Ey),
          Rt({
            onNone: () => Lb,
            onSome: (t) => {
              let n = t(e);
              return isString(n)
                ? M({ message: n, override: !1 })
                : D_(n)
                  ? M_(n, (e) => ({ message: e, override: !1 }))
                  : isString(n.message)
                    ? M({ message: n.message, override: n.override })
                    : M_(n.message, (e) => ({ message: e, override: n.override }));
            },
          }),
        )),
      (createParseIssueGuard = (e) => (t) => t._tag === e),
      (Rb = createParseIssueGuard(`Composite`)),
      (zb = createParseIssueGuard(`Refinement`)),
      (Bb = createParseIssueGuard(`Transformation`)),
      (getMessage = (e) =>
        Tb(getCurrentMessage(e), (t) =>
          t === void 0
            ? Lb
            : !t.override &&
                (Rb(e) || (zb(e) && e.kind === `From`) || (Bb(e) && e.kind !== `Transformation`))
              ? Bb(e) || zb(e)
                ? getMessage(e.issue)
                : Lb
              : M(t.message),
        )),
      (getParseIssueTitleAnnotation = (e) =>
        getAnnotated(e).pipe(
          Wt(Py),
          Gt((t) => t(e)),
          Vt,
        )),
      (formatTypeMessage = (e) =>
        Eb(getMessage(e), (t) => t ?? getParseIssueTitleAnnotation(e) ?? getDefaultTypeMessage(e))),
      (getParseIssueTitle = (e) => getParseIssueTitleAnnotation(e) ?? String(e.ast)),
      (formatForbiddenMessage = (e) => e.message ?? `is forbidden`),
      (formatUnexpectedMessage = (e) => e.message ?? `is unexpected`),
      (formatMissingMessage = (e) => {
        let t = Dy(e.ast);
        if (R(t)) {
          let e = t.value();
          return isString(e) ? M(e) : e;
        }
        return M(e.message ?? `is missing`);
      }),
      (formatTree = (e) => {
        switch (e._tag) {
          case `Type`:
            return Eb(formatTypeMessage(e), makeTree);
          case `Forbidden`:
            return M(makeTree(getParseIssueTitle(e), [makeTree(formatForbiddenMessage(e))]));
          case `Unexpected`:
            return M(makeTree(formatUnexpectedMessage(e)));
          case `Missing`:
            return Eb(formatMissingMessage(e), makeTree);
          case `Transformation`:
            return Tb(getMessage(e), (t) =>
              t === void 0
                ? Eb(formatTree(e.issue), (t) =>
                    makeTree(getParseIssueTitle(e), [
                      makeTree(formatTransformationKind(e.kind), [t]),
                    ]),
                  )
                : M(makeTree(t)),
            );
          case `Refinement`:
            return Tb(getMessage(e), (t) =>
              t === void 0
                ? Eb(formatTree(e.issue), (t) =>
                    makeTree(getParseIssueTitle(e), [makeTree(formatRefinementKind(e.kind), [t])]),
                  )
                : M(makeTree(t)),
            );
          case `Pointer`:
            return Eb(formatTree(e.issue), (t) => makeTree(formatPath(e.path), [t]));
          case `Composite`:
            return Tb(getMessage(e), (t) => {
              if (t !== void 0) return M(makeTree(t));
              let n = getParseIssueTitle(e);
              return isNonEmpty(e.issues)
                ? Eb(O_(e.issues, formatTree), (e) => makeTree(n, e))
                : Eb(formatTree(e.issues), (e) => makeTree(n, [e]));
            });
        }
      }));
  }),
  Hb,
  Ub,
  Wb = __esmMin(() => {
    (s(),
      x(),
      (Hb = dual(
        (e) => y(e[0]),
        (e, ...t) => {
          let n = {};
          for (let r of t) r in e && (n[r] = e[r]);
          return n;
        },
      )),
      (Ub = dual(
        (e) => y(e[0]),
        (e, ...t) => {
          let n = { ...e };
          for (let e of t) delete n[e];
          return n;
        },
      )));
  });
function make(e) {
  return class SchemaClass {
    [Gb] = Kb;
    static ast = e;
    static annotations(e) {
      return make(mergeSchemaAnnotations(this.ast, e));
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
    static [Gb] = Kb;
  };
}
function asSchema(e) {
  return e;
}
function getDefaultLiteralAST(e) {
  return isMembers(e) ? ob.make(mapMembers(e, (e) => new Literal$1(e))) : new Literal$1(e[0]);
}
function makeLiteralClass(e, t = getDefaultLiteralAST(e)) {
  return class LiteralClass extends make(t) {
    static annotations(e) {
      return makeLiteralClass(this.literals, mergeSchemaAnnotations(this.ast, e));
    }
    static literals = [...e];
  };
}
function Literal(...e) {
  return H(e) ? makeLiteralClass(e) : Never;
}
function makeDeclareClass(e, t) {
  return class DeclareClass extends make(t) {
    static annotations(e) {
      return makeDeclareClass(this.typeParameters, mergeSchemaAnnotations(this.ast, e));
    }
    static typeParameters = [...e];
  };
}
function makeUnionClass(e, t = getDefaultUnionAST(e)) {
  return class UnionClass extends make(t) {
    static annotations(e) {
      return makeUnionClass(this.members, mergeSchemaAnnotations(this.ast, e));
    }
    static members = [...e];
  };
}
function Union(...e) {
  return isMembers(e) ? makeUnionClass(e) : H(e) ? e[0] : Never;
}
function makeTupleTypeClass(e, t, n = getDefaultTupleTypeAST(e, t)) {
  return class TupleTypeClass extends make(n) {
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
  return class TypeLiteralClass extends make(n) {
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
      return Struct(Hb(e, ...t));
    }
    static omit(...t) {
      return Struct(Ub(e, ...t));
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
  return class BrandClass extends make(t) {
    static annotations(e) {
      return makeBrandClass(this.from, mergeSchemaAnnotations(this.ast, e));
    }
    static make = (e, t) => (getDisableValidationMakeOption(t) ? e : validateSync(this)(e));
    static from = e;
  };
}
function makeRefineClass(e, t, n) {
  return class RefineClass extends make(n) {
    static annotations(e) {
      return makeRefineClass(this.from, this.filter, mergeSchemaAnnotations(this.ast, e));
    }
    static [ox] = e;
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
  return class TransformationClass extends make(n) {
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
      Cb(parse(e), () => new Type(n, e, `Unable to decode ${JSON.stringify(e)} into a number`)),
    encode: (e) => Z(String(e)),
  });
}
function Option(e) {
  let t = asSchema(e);
  return $(optionEncoded(t), OptionFromSelf(typeSchema(t)), {
    strict: !0,
    decode: (e) => optionDecode(e),
    encode: (e) => Rt(e, { onNone: () => Ux, onSome: makeSomeEncoded }),
  });
}
function getDisableValidationMakeOption(e) {
  return isBoolean(e) ? e : (e?.disableValidation ?? !1);
}
var Gb,
  Kb,
  qb,
  toASTAnnotations,
  mergeSchemaAnnotations,
  format,
  encodedSchema,
  typeSchema,
  decodeUnknown,
  isSchema,
  declareConstructor,
  declarePrimitive,
  declare,
  Jb,
  fromBrand,
  Yb,
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
  UndefinedOr,
  element,
  Xb,
  getDefaultTupleTypeAST,
  Array$,
  formatPropertySignatureToken,
  PropertySignatureDeclaration,
  ToPropertySignature,
  formatPropertyKey,
  PropertySignatureTransformation,
  mergeSignatureAnnotations,
  Zb,
  isPropertySignature,
  Qb,
  makePropertySignature,
  $b,
  propertySignature,
  ex,
  optional,
  tx,
  getDefaultTypeLiteralAST,
  lazilyMergeDefaults,
  nx,
  TaggedStruct,
  Record,
  intersectTypeLiterals,
  rx,
  addRefinementToMembers,
  extendAST,
  getTypes,
  intersectUnionMembers,
  ix,
  ax,
  suspend,
  ox,
  fromFilterPredicateReturnTypeItem,
  toFilterParseIssue,
  Q,
  $,
  sx,
  trimmed,
  cx,
  minLength,
  lx,
  length,
  ux,
  pattern,
  dx,
  lowercased,
  Lowercased,
  fx,
  uppercased,
  Uppercased,
  px,
  capitalized,
  Capitalized,
  mx,
  uncapitalized,
  Uncapitalized,
  nonEmptyString,
  Trimmed,
  NonEmptyTrimmedString,
  getErrorMessage,
  getParseJsonTransformation,
  parseJson,
  hx,
  gx,
  _x,
  vx,
  URLFromSelf,
  yx,
  finite,
  bx,
  greaterThan,
  xx,
  greaterThanOrEqualTo,
  Sx,
  int,
  Cx,
  lessThan,
  wx,
  lessThanOrEqualTo,
  Tx,
  between,
  Ex,
  nonNaN,
  positive,
  negative,
  nonPositive,
  nonNegative,
  Int,
  NonNegative,
  Dx,
  encodeSymbol,
  decodeSymbol,
  Ox,
  greaterThanOrEqualToBigInt,
  kx,
  betweenBigInt,
  nonNegativeBigInt,
  BigInt$,
  Ax,
  toComposite,
  DurationFromSelf,
  jx,
  Mx,
  Nx,
  Px,
  Fx,
  Ix,
  Lx,
  isDurationValue,
  Uint8ArrayFromSelf,
  Uint8,
  makeUint8ArrayTransformation,
  Rx,
  zx,
  Bx,
  validDate,
  Vx,
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
  Hx,
  optionSomeEncoded,
  optionEncoded,
  optionDecode,
  optionArbitrary,
  optionPretty,
  optionParse,
  OptionFromSelf_,
  OptionFromSelf,
  Ux,
  makeSomeEncoded,
  bigDecimalPretty,
  bigDecimalArbitrary,
  BigDecimalFromSelf,
  isField,
  isFields,
  getFields,
  getSchemaFromFieldsOr,
  getFieldsFromFieldsOr,
  getClassTag,
  TaggedError,
  extendFields,
  Wx,
  getClassAnnotations,
  makeClass,
  Gx,
  fiberIdArbitrary,
  fiberIdPretty,
  FiberIdFromSelf,
  fiberIdDecode,
  fiberIdEncode,
  Defect,
  Kx,
  qx,
  PropertyKey$,
  Jx = __esmMin(() => {
    (U(),
      $_(),
      ev(),
      fd(),
      Vg(),
      yv(),
      Ja(),
      kt(),
      Pv(),
      D(),
      m(),
      Co(),
      s(),
      _(),
      A(),
      qi(),
      zv(),
      ey(),
      Fv(),
      au(),
      B(),
      Vb(),
      j(),
      x(),
      yb(),
      E_(),
      Wb(),
      (Gb = Symbol.for(`effect/Schema`)),
      (Kb = { _A: (e) => e, _I: (e) => e, _R: (e) => e }),
      (qb = {
        typeConstructor: ty,
        schemaId: ry,
        message: iy,
        missingMessage: ay,
        identifier: oy,
        title: sy,
        description: ly,
        examples: uy,
        default: dy,
        documentation: gy,
        jsonSchema: fy,
        arbitrary: py,
        pretty: my,
        equivalence: hy,
        concurrency: _y,
        batching: vy,
        parseIssueTitle: yy,
        parseOptions: by,
        decodingFallback: xy,
      }),
      (toASTAnnotations = (e) => {
        if (!e) return {};
        let t = { ...e };
        for (let n in qb)
          if (n in e) {
            let r = qb[n];
            ((t[r] = e[n]), delete t[n]);
          }
        return t;
      }),
      (mergeSchemaAnnotations = (e, t) => annotations(e, toASTAnnotations(t))),
      (format = (e) => String(e.ast)),
      (encodedSchema = (e) => make(encodedAST(e.ast))),
      (typeSchema = (e) => make(typeAST(e.ast))),
      (decodeUnknown = (e, t) => {
        let n = Ab(e, t);
        return (e, t) => Db(n(e, t), parseError);
      }),
      (isSchema = (e) => b(e, Gb) && y(e[Gb])),
      (declareConstructor = (e, t, n) =>
        makeDeclareClass(
          e,
          new Declaration(
            e.map((e) => e.ast),
            (...e) => t.decode(...e.map(make)),
            (...e) => t.encode(...e.map(make)),
            toASTAnnotations(n),
          ),
        )),
      (declarePrimitive = (e, t) => {
        let decodeUnknown = () => (t, n, r) => (e(t) ? Z(t) : xb(new Type(r, t)));
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
      (Jb = Symbol.for(`effect/SchemaId/Brand`)),
      (fromBrand = (e, t) => (n) =>
        makeBrandClass(
          n,
          new Refinement$1(
            n.ast,
            function predicate(t, n, r) {
              let i = e.either(t);
              return P(i) ? I(new Type(r, t, i.left.map((e) => e.message).join(`, `))) : F();
            },
            toASTAnnotations({ schemaId: Jb, [Jb]: { constructor: e }, ...t }),
          ),
        )),
      (Yb = Symbol.for(`effect/SchemaId/InstanceOf`)),
      (instanceOf = (e, t) =>
        declare((t) => t instanceof e, {
          title: e.name,
          description: `an instance of ${e.name}`,
          pretty: () => String,
          schemaId: Yb,
          [Yb]: { constructor: e },
          ...t,
        })),
      (Undefined = class extends make(Wy) {}),
      (Null = class extends make(Uy) {}),
      (Never = class extends make(Gy) {}),
      (Unknown = class extends make(Ky) {}),
      (Any = class extends make(qy) {}),
      (BigIntFromSelf = class extends make(eb) {}),
      (SymbolFromSelf = class extends make(tb) {}),
      (String$ = class extends make(Jy) {}),
      (Number$ = class extends make(Xy) {}),
      (Boolean$ = class extends make(Qy) {}),
      (getDefaultUnionAST = (e) => ob.make(e.map((e) => e.ast))),
      (UndefinedOr = (e) => Union(e, Undefined)),
      (element = (e) => new Xb(new OptionalType(e.ast, !1), e)),
      (Xb = class ElementImpl {
        ast;
        from;
        [Gb];
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
      (Zb = Symbol.for(`effect/PropertySignature`)),
      (isPropertySignature = (e) => b(e, Zb)),
      (Qb = class PropertySignatureImpl {
        ast;
        [Gb];
        [Zb] = null;
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
      (makePropertySignature = (e) => new Qb(e)),
      ($b = class PropertySignatureWithFromImpl extends Qb {
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
        new $b(new PropertySignatureDeclaration(e.ast, !1, !0, {}, void 0), e)),
      (ex = dual(2, (e, t) => {
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
      (optional = (e) => {
        let t = e.ast === Wy || e.ast === Gy ? Wy : UndefinedOr(e).ast;
        return new $b(new PropertySignatureDeclaration(t, !0, !0, {}, void 0), e);
      }),
      (tx = pickAnnotations([ay])),
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
                  (i.push(new PropertySignature(s, t, n, !0, tx(e))),
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
          if (H(o)) {
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
              new TypeLiteral(i, e, { [cy]: `Struct (Encoded side)` }),
              new TypeLiteral(a, n, { [cy]: `Struct (Type side)` }),
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
      (nx = __name(
        (e) =>
          Literal(e).pipe(
            propertySignature,
            ex(() => e),
          ),
        `tag`,
      )),
      (TaggedStruct = (e, t) => Struct({ _tag: nx(e), ...t })),
      (Record = (e) => makeRecordClass(e.key, e.value)),
      (intersectTypeLiterals = (e, t, n) => {
        if (rb(e) && rb(t)) {
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
      (rx = omitAnnotations([oy])),
      (addRefinementToMembers = (e, t) => t.map((t) => new Refinement$1(t, e.filter, rx(e)))),
      (extendAST = (e, t, n) => ob.make(intersectUnionMembers([e], [t], n))),
      (getTypes = (e) => (sb(e) ? e.types : [e])),
      (intersectUnionMembers = (e, t, n) =>
        An(e, (e) =>
          An(t, (t) => {
            switch (t._tag) {
              case `Literal`:
                if (
                  (isString(t.literal) && Yy(e)) ||
                  (isNumber(t.literal) && Zy(e)) ||
                  (isBoolean(t.literal) && $y(e))
                )
                  return [t];
                break;
              case `StringKeyword`:
                if (t === Jy) {
                  if (Yy(e) || (Hy(e) && isString(e.literal))) return [e];
                  if (ub(e))
                    return addRefinementToMembers(
                      e,
                      intersectUnionMembers(getTypes(e.from), [t], n),
                    );
                } else if (e === Jy) return [t];
                break;
              case `NumberKeyword`:
                if (t === Xy) {
                  if (Zy(e) || (Hy(e) && isNumber(e.literal))) return [e];
                  if (ub(e))
                    return addRefinementToMembers(
                      e,
                      intersectUnionMembers(getTypes(e.from), [t], n),
                    );
                } else if (e === Xy) return [t];
                break;
              case `BooleanKeyword`:
                if (t === Qy) {
                  if ($y(e) || (Hy(e) && isBoolean(e.literal))) return [e];
                  if (ub(e))
                    return addRefinementToMembers(
                      e,
                      intersectUnionMembers(getTypes(e.from), [t], n),
                    );
                } else if (e === Qy) return [t];
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
                        return [new Transformation$1(i, a, pb)];
                      case `FinalTransformation`:
                        return [
                          new Transformation$1(
                            i,
                            a,
                            new FinalTransformation(
                              (e, t, n, i) => Eb(r.decode(e, t, n, i), (t) => ({ ...e, ...t })),
                              (e, t, n, i) => Eb(r.encode(e, t, n, i), (t) => ({ ...e, ...t })),
                            ),
                          ),
                        ];
                    }
                  }
                }
                break;
              case `Transformation`:
                if (fb(e)) {
                  if (mb(t.transformation) && mb(e.transformation))
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
      (ix = dual(2, (e, t) => make(extendAST(e.ast, t.ast, [])))),
      (ax = dual(
        (e) => isSchema(e[1]),
        (e, t) => makeTransformationClass(e, t, vb(e.ast, t.ast)),
      )),
      (suspend = (e) => make(new Suspend(() => e().ast))),
      (ox = Symbol.for(`effect/SchemaId/Refine`)),
      (fromFilterPredicateReturnTypeItem = (e, t, n) => {
        if (isBoolean(e)) return e ? F() : I(new Type(t, n));
        if (isString(e)) return I(new Type(t, n, e));
        if (e !== void 0) {
          if (`_tag` in e) return I(e);
          let r = new Type(t, n, e.message);
          return I(H(e.path) ? new Pointer(e.path, n, r) : r);
        }
        return F();
      }),
      (toFilterParseIssue = (e, t, n) => {
        if (isSingle(e)) return fromFilterPredicateReturnTypeItem(e, t, n);
        if (H(e)) {
          let r = Mn(e, (e) => fromFilterPredicateReturnTypeItem(e, t, n));
          if (H(r)) return I(r.length === 1 ? r[0] : new Composite(t, n, r));
        }
        return F();
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
      (sx = Symbol.for(`effect/SchemaId/Trimmed`)),
      (trimmed = (e) => (t) =>
        t.pipe(
          filter((e) => e === e.trim(), {
            schemaId: sx,
            title: `trimmed`,
            description: `a string with no leading or trailing whitespace`,
            jsonSchema: { pattern: `^\\S[\\s\\S]*\\S$|^\\S$|^$` },
            ...e,
          }),
        )),
      (cx = Qv),
      (minLength = (e, t) => (n) =>
        n.pipe(
          filter((t) => t.length >= e, {
            schemaId: cx,
            title: `minLength(${e})`,
            description: `a string at least ${e} character(s) long`,
            jsonSchema: { minLength: e },
            ...t,
          }),
        )),
      (lx = $v),
      (length = (e, t) => (n) => {
        let r = y(e) ? Math.max(0, Math.floor(e.min)) : Math.max(0, Math.floor(e)),
          i = y(e) ? Math.max(r, Math.floor(e.max)) : r;
        return r === i
          ? n.pipe(
              filter((e) => e.length === r, {
                schemaId: lx,
                title: `length(${r})`,
                description: r === 1 ? `a single character` : `a string ${r} character(s) long`,
                jsonSchema: { minLength: r, maxLength: r },
                ...t,
              }),
            )
          : n.pipe(
              filter((e) => e.length >= r && e.length <= i, {
                schemaId: lx,
                title: `length({ min: ${r}, max: ${i})`,
                description: `a string at least ${r} character(s) and at most ${i} character(s) long`,
                jsonSchema: { minLength: r, maxLength: i },
                ...t,
              }),
            );
      }),
      (ux = Symbol.for(`effect/SchemaId/Pattern`)),
      (pattern = (e, t) => (n) => {
        let r = e.source;
        return n.pipe(
          filter((t) => ((e.lastIndex = 0), e.test(t)), {
            schemaId: ux,
            [ux]: { regex: e },
            description: `a string matching the pattern ${r}`,
            jsonSchema: { pattern: r },
            ...t,
          }),
        );
      }),
      (dx = Symbol.for(`effect/SchemaId/Lowercased`)),
      (lowercased = (e) => (t) =>
        t.pipe(
          filter((e) => e === e.toLowerCase(), {
            schemaId: dx,
            title: `lowercased`,
            description: `a lowercase string`,
            jsonSchema: { pattern: `^[^A-Z]*$` },
            ...e,
          }),
        )),
      (Lowercased = class extends String$.pipe(lowercased({ identifier: `Lowercased` })) {}),
      (fx = Symbol.for(`effect/SchemaId/Uppercased`)),
      (uppercased = (e) => (t) =>
        t.pipe(
          filter((e) => e === e.toUpperCase(), {
            schemaId: fx,
            title: `uppercased`,
            description: `an uppercase string`,
            jsonSchema: { pattern: `^[^a-z]*$` },
            ...e,
          }),
        )),
      (Uppercased = class extends String$.pipe(uppercased({ identifier: `Uppercased` })) {}),
      (px = Symbol.for(`effect/SchemaId/Capitalized`)),
      (capitalized = (e) => (t) =>
        t.pipe(
          filter((e) => e[0]?.toUpperCase() === e[0], {
            schemaId: px,
            title: `capitalized`,
            description: `a capitalized string`,
            jsonSchema: { pattern: `^[^a-z]?.*$` },
            ...e,
          }),
        )),
      (Capitalized = class extends String$.pipe(capitalized({ identifier: `Capitalized` })) {}),
      (mx = Symbol.for(`effect/SchemaId/Uncapitalized`)),
      (uncapitalized = (e) => (t) =>
        t.pipe(
          filter((e) => e[0]?.toLowerCase() === e[0], {
            schemaId: mx,
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
            Sb({
              try: () => JSON.parse(t, e?.reviver),
              catch: (e) => new Type(r, t, getErrorMessage(e)),
            }),
          encode: (t, n, r) =>
            Sb({
              try: () => JSON.stringify(t, e?.replacer, e?.space),
              catch: (e) => new Type(r, t, getErrorMessage(e)),
            }),
        }).annotations({ title: `parseJson`, schemaId: Vy })),
      (parseJson = (e, t) => (isSchema(e) ? ax(parseJson(t), e) : getParseJsonTransformation(e))),
      String$.pipe(nonEmptyString({ identifier: `NonEmptyString` })),
      (hx = Symbol.for(`effect/SchemaId/UUID`)),
      (gx = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i),
      String$.pipe(
        pattern(gx, {
          schemaId: hx,
          identifier: `UUID`,
          jsonSchema: { format: `uuid`, pattern: gx.source },
          description: `a Universally Unique Identifier`,
          arbitrary: () => (e) => e.uuid(),
        }),
      ),
      (_x = Symbol.for(`effect/SchemaId/ULID`)),
      (vx = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i),
      String$.pipe(
        pattern(vx, {
          schemaId: _x,
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
          Sb({
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
      (yx = qv),
      (finite = (e) => (t) =>
        t.pipe(
          filter(Number.isFinite, {
            schemaId: yx,
            title: `finite`,
            description: `a finite number`,
            jsonSchema: {},
            ...e,
          }),
        )),
      (bx = Vv),
      (greaterThan = (e, t) => (n) =>
        n.pipe(
          filter((t) => t > e, {
            schemaId: bx,
            title: `greaterThan(${e})`,
            description: e === 0 ? `a positive number` : `a number greater than ${e}`,
            jsonSchema: { exclusiveMinimum: e },
            ...t,
          }),
        )),
      (xx = Hv),
      (greaterThanOrEqualTo = (e, t) => (n) =>
        n.pipe(
          filter((t) => t >= e, {
            schemaId: xx,
            title: `greaterThanOrEqualTo(${e})`,
            description:
              e === 0 ? `a non-negative number` : `a number greater than or equal to ${e}`,
            jsonSchema: { minimum: e },
            ...t,
          }),
        )),
      (Sx = Gv),
      (int = (e) => (t) =>
        t.pipe(
          filter((e) => Number.isSafeInteger(e), {
            schemaId: Sx,
            title: `int`,
            description: `an integer`,
            jsonSchema: { type: `integer` },
            ...e,
          }),
        )),
      (Cx = Uv),
      (lessThan = (e, t) => (n) =>
        n.pipe(
          filter((t) => t < e, {
            schemaId: Cx,
            title: `lessThan(${e})`,
            description: e === 0 ? `a negative number` : `a number less than ${e}`,
            jsonSchema: { exclusiveMaximum: e },
            ...t,
          }),
        )),
      (wx = Wv),
      (lessThanOrEqualTo = (e, t) => (n) =>
        n.pipe(
          filter((t) => t <= e, {
            schemaId: wx,
            title: `lessThanOrEqualTo(${e})`,
            description: e === 0 ? `a non-positive number` : `a number less than or equal to ${e}`,
            jsonSchema: { maximum: e },
            ...t,
          }),
        )),
      (Tx = Yv),
      (between = (e, t, n) => (r) =>
        r.pipe(
          filter((n) => n >= e && n <= t, {
            schemaId: Tx,
            title: `between(${e}, ${t})`,
            description: `a number between ${e} and ${t}`,
            jsonSchema: { minimum: e, maximum: t },
            ...n,
          }),
        )),
      (Ex = Kv),
      (nonNaN = (e) => (t) =>
        t.pipe(
          filter((e) => !Number.isNaN(e), {
            schemaId: Ex,
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
      (Dx = Jv),
      Number$.pipe(finite({ schemaId: Dx, identifier: `JsonNumber` })),
      $(Boolean$.annotations({ description: `a boolean that will be negated` }), Boolean$, {
        strict: !0,
        decode: (e) => not(e),
        encode: (e) => not(e),
      }),
      (encodeSymbol = (e, t) => {
        let n = Symbol.keyFor(e);
        return n === void 0
          ? xb(new Type(t, e, `Unable to encode a unique symbol ${String(e)} into a string`))
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
      (Ox = Xv),
      (greaterThanOrEqualToBigInt = (e, t) => (n) =>
        n.pipe(
          filter((t) => t >= e, {
            schemaId: Ox,
            [Ox]: { min: e },
            title: `greaterThanOrEqualToBigInt(${e})`,
            description:
              e === 0n ? `a non-negative bigint` : `a bigint greater than or equal to ${e}n`,
            ...t,
          }),
        )),
      (kx = Zv),
      (betweenBigInt = (e, t, n) => (r) =>
        r.pipe(
          filter((n) => n >= e && n <= t, {
            schemaId: kx,
            [kx]: { min: e, max: t },
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
              Cb(
                fromString(e),
                () => new Type(n, e, `Unable to decode ${JSON.stringify(e)} into a bigint`),
              ),
            encode: (e) => Z(String(e)),
          },
        ).annotations({ identifier: `BigInt` })
      ) {}),
      (Ax = BigIntFromSelf.pipe(nonNegativeBigInt({ identifier: `NonNegativeBigintFromSelf` }))),
      Q(
        Number$.annotations({ description: `a number to be decoded into a bigint` }),
        BigIntFromSelf.pipe(betweenBigInt(BigInt(-(2 ** 53 - 1)), BigInt(2 ** 53 - 1))),
        {
          strict: !0,
          decode: (e, t, n) =>
            Cb(fromNumber(e), () => new Type(n, e, `Unable to decode ${e} into a bigint`)),
          encode: (e, t, n) =>
            Cb(toNumber(e), () => new Type(n, e, `Unable to encode ${e}n into a number`)),
        },
      ).annotations({ identifier: `BigIntFromNumber` }),
      (toComposite = (e, t, n, r) =>
        Ob(e, { onFailure: (e) => new Composite(n, r, e), onSuccess: t })),
      (DurationFromSelf = class extends (
        declare(isDuration, {
          typeConstructor: { _tag: `effect/Duration` },
          identifier: `DurationFromSelf`,
          pretty: () => String,
          arbitrary: () => (e) =>
            e.oneof(
              e.constant(Ba),
              e.bigInt({ min: 0n }).map((e) => nanos(e)),
              e.maxSafeNat().map((e) => millis(e)),
            ),
          equivalence: () => Ua,
        })
      ) {}),
      Q(
        Ax.annotations({ description: `a bigint to be decoded into a Duration` }),
        DurationFromSelf.pipe(filter((e) => isFinite(e), { description: `a finite duration` })),
        {
          strict: !0,
          decode: (e) => Z(nanos(e)),
          encode: (e, t, n) =>
            Rt(toNanos(e), {
              onNone: () => xb(new Type(n, e, `Unable to encode ${e} into a bigint`)),
              onSome: (e) => Z(e),
            }),
        },
      ).annotations({ identifier: `DurationFromNanos` }),
      (jx = NonNegative.pipe(int()).annotations({ identifier: `NonNegativeInt` })),
      $(
        NonNegative.annotations({
          description: `a non-negative number to be decoded into a Duration`,
        }),
        DurationFromSelf,
        { strict: !0, decode: (e) => millis(e), encode: (e) => toMillis(e) },
      ).annotations({ identifier: `DurationFromMillis` }),
      (Mx = TaggedStruct(`Millis`, { millis: jx })),
      (Nx = TaggedStruct(`Nanos`, { nanos: BigInt$ })),
      (Px = TaggedStruct(`Infinity`, {})),
      (Fx = Px.make({})),
      (Ix = Union(Mx, Nx, Px).annotations({
        identifier: `DurationValue`,
        description: `an JSON-compatible tagged union to be decoded into a Duration`,
      })),
      (Lx = Union(
        Tuple(
          element(jx).annotations({ title: `seconds` }),
          element(jx).annotations({ title: `nanos` }),
        ).annotations({ identifier: `FiniteHRTime` }),
        Tuple(Literal(-1), Literal(0)).annotations({ identifier: `InfiniteHRTime` }),
      ).annotations({
        identifier: `HRTime`,
        description: `a tuple of seconds and nanos to be decoded into a Duration`,
      })),
      (isDurationValue = (e) => typeof e == `object`),
      $(Union(Ix, Lx), DurationFromSelf, {
        strict: !0,
        decode: (e) => {
          if (isDurationValue(e))
            switch (e._tag) {
              case `Millis`:
                return millis(e.millis);
              case `Nanos`:
                return nanos(e.nanos);
              case `Infinity`:
                return Ba;
            }
          let [t, n] = e;
          return t === -1 ? Ba : nanos(BigInt(t) * BigInt(1e9) + BigInt(n));
        },
        encode: (e) => {
          switch (e.value._tag) {
            case `Millis`:
              return Mx.make({ millis: e.value.millis });
            case `Nanos`:
              return Nx.make({ nanos: e.value.nanos });
            case `Infinity`:
              return Fx;
          }
        },
      }).annotations({ identifier: `Duration` }),
      (Uint8ArrayFromSelf = class extends (
        declare(isUint8Array, {
          typeConstructor: { _tag: `Uint8Array` },
          identifier: `Uint8ArrayFromSelf`,
          pretty: () => (e) => `new Uint8Array(${JSON.stringify(Array.from(e))})`,
          arbitrary: () => (e) => e.uint8Array(),
          equivalence: () => Pn(equals$2),
        })
      ) {}),
      (Uint8 = class extends (
        Number$.pipe(
          between(0, 255, { identifier: `Uint8`, description: `a 8-bit unsigned integer` }),
        )
      ) {}),
      $(
        Array$(Uint8).annotations({
          description: `an array of 8-bit unsigned integers to be decoded into a Uint8Array`,
        }),
        Uint8ArrayFromSelf,
        { strict: !0, decode: (e) => Uint8Array.from(e), encode: (e) => Array.from(e) },
      ).annotations({ identifier: `Uint8Array` }),
      (makeUint8ArrayTransformation = (e, t, n) =>
        Q(
          String$.annotations({ description: `a string to be decoded into a Uint8Array` }),
          Uint8ArrayFromSelf,
          {
            strict: !0,
            decode: (e, n, r) => Ct(t(e), (t) => new Type(r, e, t.message)),
            encode: (e) => Z(n(e)),
          },
        ).annotations({ identifier: e })),
      (Rx = makeUint8ArrayTransformation(`Uint8ArrayFromBase64`, jv, encodeBase64)),
      (zx = Q(
        String$.annotations({
          description: `A string that is interpreted as being UriComponent-encoded and will be decoded into a UTF-8 string`,
        }),
        String$,
        {
          strict: !0,
          decode: (e, t, n) => Ct(decodeUriComponent(e), (t) => new Type(n, e, t.message)),
          encode: (e, t, n) => Ct(encodeUriComponent(e), (t) => new Type(n, e, t.message)),
        },
      ).annotations({ identifier: `StringFromUriComponent` })),
      (Bx = Symbol.for(`effect/SchemaId/ValidDate`)),
      (validDate = (e) => (t) =>
        t.pipe(
          filter((e) => !Number.isNaN(e.getTime()), {
            schemaId: Bx,
            [Bx]: { noInvalidDate: !0 },
            title: `validDate`,
            description: `a valid Date`,
            ...e,
          }),
        )),
      (Vx = Bv),
      (DateFromSelf = class extends (
        declare(isDate, {
          typeConstructor: { _tag: `Date` },
          identifier: `DateFromSelf`,
          schemaId: Vx,
          [Vx]: { noInvalidDate: !1 },
          description: `a potentially invalid Date instance`,
          pretty: () => (e) => `new Date(${JSON.stringify(e)})`,
          arbitrary: () => (e) => e.date({ noInvalidDate: !1 }),
          equivalence: () => d,
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
        declare((e) => tv(e) && iv(e), {
          typeConstructor: { _tag: `effect/DateTime.Utc` },
          identifier: `DateTimeUtcFromSelf`,
          description: `a DateTime.Utc instance`,
          pretty: () => (e) => e.toString(),
          arbitrary: () => (e) => e.date({ noInvalidDate: !0 }).map((e) => sv(e)),
          equivalence: () => ov,
        })
      ) {}),
      (decodeDateTimeUtc = (e, t) =>
        Sb({
          try: () => cv(e),
          catch: () => new Type(t, e, `Unable to decode ${formatUnknown(e)} into a DateTime.Utc`),
        })),
      Q(
        Number$.annotations({ description: `a number to be decoded into a DateTime.Utc` }),
        DateTimeUtcFromSelf,
        { strict: !0, decode: (e, t, n) => decodeDateTimeUtc(e, n), encode: (e) => Z(gv(e)) },
      ).annotations({ identifier: `DateTimeUtcFromNumber` }),
      Q(
        DateFromSelf.annotations({ description: `a Date to be decoded into a DateTime.Utc` }),
        DateTimeUtcFromSelf,
        { strict: !0, decode: (e, t, n) => decodeDateTimeUtc(e, n), encode: (e) => Z(hv(e)) },
      ).annotations({ identifier: `DateTimeUtcFromDate` }),
      Q(
        String$.annotations({ description: `a string to be decoded into a DateTime.Utc` }),
        DateTimeUtcFromSelf,
        { strict: !0, decode: (e, t, n) => decodeDateTimeUtc(e, n), encode: (e) => Z(_v(e)) },
      ).annotations({ identifier: `DateTimeUtc` }),
      (timeZoneOffsetArbitrary = () => (e) =>
        e.integer({ min: -720 * 60 * 1e3, max: 840 * 60 * 1e3 }).map(fv)),
      (TimeZoneOffsetFromSelf = class extends (
        declare(nv, {
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
        { strict: !0, decode: (e) => fv(e), encode: (e) => e.offset },
      ).annotations({ identifier: `TimeZoneOffset` }),
      (timeZoneNamedArbitrary = () => (e) =>
        e.constantFrom(...Intl.supportedValuesOf(`timeZone`)).map(dv)),
      (TimeZoneNamedFromSelf = class extends (
        declare(rv, {
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
            Sb({
              try: () => dv(e),
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
            Rt(pv(e), {
              onNone: () =>
                xb(new Type(n, e, `Unable to decode ${JSON.stringify(e)} into a TimeZone`)),
              onSome: Z,
            }),
          encode: (e) => Z(mv(e)),
        },
      ).annotations({ identifier: `TimeZone` }),
      (timeZoneArbitrary = (e) =>
        e.oneof(timeZoneOffsetArbitrary()(e), timeZoneNamedArbitrary()(e))),
      (DateTimeZonedFromSelf = class extends (
        declare((e) => tv(e) && av(e), {
          typeConstructor: { _tag: `effect/DateTime.Zoned` },
          identifier: `DateTimeZonedFromSelf`,
          description: `a DateTime.Zoned instance`,
          pretty: () => (e) => e.toString(),
          arbitrary: () => (e) =>
            e
              .tuple(e.integer({ min: -31536e9, max: 31536e9 }), timeZoneArbitrary(e))
              .map(([e, t]) => lv(e, { timeZone: t })),
          equivalence: () => ov,
        })
      ) {}),
      Q(
        String$.annotations({ description: `a string to be decoded into a DateTime.Zoned` }),
        DateTimeZonedFromSelf,
        {
          strict: !0,
          decode: (e, t, n) =>
            Rt(uv(e), {
              onNone: () =>
                xb(new Type(n, e, `Unable to decode ${JSON.stringify(e)} into a DateTime.Zoned`)),
              onSome: Z,
            }),
          encode: (e) => Z(vv(e)),
        },
      ).annotations({ identifier: `DateTimeZoned` }),
      (Hx = Struct({ _tag: Literal(`None`) }).annotations({ description: `NoneEncoded` })),
      (optionSomeEncoded = (e) =>
        Struct({ _tag: Literal(`Some`), value: e }).annotations({
          description: `SomeEncoded<${format(e)}>`,
        })),
      (optionEncoded = (e) =>
        Union(Hx, optionSomeEncoded(e)).annotations({
          description: `OptionEncoded<${format(e)}>`,
        })),
      (optionDecode = (e) => (e._tag === `None` ? F() : I(e.value))),
      (optionArbitrary = (e, t) => (n) =>
        n
          .oneof(
            t,
            n.record({ _tag: n.constant(`None`) }),
            n.record({ _tag: n.constant(`Some`), value: e(n) }),
          )
          .map(optionDecode)),
      (optionPretty = (e) => Rt({ onNone: () => `none()`, onSome: (t) => `some(${e(t)})` })),
      (optionParse = (e) => (t, n, r) =>
        Lt(t) ? (L(t) ? Z(F()) : toComposite(e(t.value, n), I, r, t)) : xb(new Type(r, t))),
      (OptionFromSelf_ = (e) =>
        declare(
          [e],
          { decode: (e) => optionParse(Ab(e)), encode: (e) => optionParse(encodeUnknown(e)) },
          {
            typeConstructor: { _tag: `effect/Option` },
            pretty: optionPretty,
            arbitrary: optionArbitrary,
            equivalence: Jt,
          },
        )),
      (OptionFromSelf = (e) =>
        OptionFromSelf_(e).annotations({ description: `Option<${format(e)}>` })),
      (Ux = { _tag: `None` }),
      (makeSomeEncoded = (e) => ({ _tag: `Some`, value: e })),
      $(String$, OptionFromSelf(NonEmptyTrimmedString), {
        strict: !0,
        decode: (e) => qt(I(e.trim()), T_),
        encode: (e) => z(e, () => ``),
      }),
      (bigDecimalPretty = () => (e) => `BigDecimal(${Q_(normalize(e))})`),
      (bigDecimalArbitrary = () => (e) =>
        e.tuple(e.bigInt(), e.integer({ min: -18, max: 18 })).map(([e, t]) => W_(e, t))),
      (BigDecimalFromSelf = class extends (
        declare(isBigDecimal, {
          typeConstructor: { _tag: `effect/BigDecimal` },
          identifier: `BigDecimalFromSelf`,
          pretty: bigDecimalPretty,
          arbitrary: bigDecimalArbitrary,
          equivalence: () => Y_,
        })
      ) {}),
      Q(
        String$.annotations({ description: `a string to be decoded into a BigDecimal` }),
        BigDecimalFromSelf,
        {
          strict: !0,
          decode: (e, t, n) =>
            Z_(e).pipe(
              Rt({
                onNone: () =>
                  xb(new Type(n, e, `Unable to decode ${JSON.stringify(e)} into a BigDecimal`)),
                onSome: (e) => Z(normalize(e)),
              }),
            ),
          encode: (e) => Z(Q_(normalize(e))),
        },
      ).annotations({ identifier: `BigDecimal` }),
      $(
        Number$.annotations({ description: `a number to be decoded into a BigDecimal` }),
        BigDecimalFromSelf,
        { strict: !0, decode: (e) => unsafeFromNumber(e), encode: (e) => unsafeToNumber(e) },
      ).annotations({ identifier: `BigDecimalFromNumber` }),
      (isField = (e) => isSchema(e) || isPropertySignature(e)),
      (isFields = (e) => Reflect.ownKeys(e).every((t) => isField(e[t]))),
      (getFields = (e) => (`fields` in e ? e.fields : getFields(e[ox]))),
      (getSchemaFromFieldsOr = (e) =>
        isFields(e) ? Struct(e) : isSchema(e) ? e : Struct(getFields(e))),
      (getFieldsFromFieldsOr = (e) => (isFields(e) ? e : getFields(e))),
      (getClassTag = (e) => ex(propertySignature(Literal(e)), () => e)),
      (TaggedError = (e) => (t, n, r) => {
        class Base extends zg {}
        Base.prototype.name = t;
        let i = getFieldsFromFieldsOr(n),
          a = getSchemaFromFieldsOr(n),
          o = { _tag: getClassTag(t) },
          s = extendFields(o, i),
          c = `message` in s;
        class TaggedErrorClass extends makeClass({
          kind: `TaggedError`,
          identifier: e ?? t,
          schema: ix(a, Struct(o)),
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
      (Wx = globalValue(`effect/Schema/astCache`, () => new WeakMap())),
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
          m = d.annotations({ [cy]: `${i} (Type side)`, ...c }),
          h = o.annotations({ [cy]: `${i} (Constructor)`, ...c }),
          g = o.annotations({ [cy]: `${i} (Encoded side)`, ...u }),
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
            static [Gb] = Kb;
            static get ast() {
              let e = Wx.get(this);
              if (e) return e;
              let t = declare(
                [o],
                {
                  decode: () => (e, t, n) =>
                    e instanceof this || fallbackInstanceOf(e) ? Z(e) : xb(new Type(n, e)),
                  encode: () => (e, t) =>
                    e instanceof this ? Z(e) : Eb(encodeUnknown(m)(e, t), (e) => new this(e, !0)),
                },
                {
                  identifier: i,
                  pretty: (e) => (t) => `${i}(${e(t)})`,
                  arbitrary: (e) => (t) => e(t).map((e) => new this(e)),
                  equivalence: identity,
                  [Sy]: p.ast,
                  ...c,
                },
              );
              return (
                (e = $(g, t, {
                  strict: !0,
                  decode: (e) => new this(e, !0),
                  encode: identity,
                }).annotations({ [Sy]: _.ast, ...l }).ast),
                Wx.set(this, e),
                e
              );
            }
            static pipe() {
              return pipeArguments(this, arguments);
            }
            static annotations(e) {
              return make(this.ast).annotations(e);
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
                  schema: ix(o, s),
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
      (Gx = Union(
        Struct({ _tag: Literal(`None`) }).annotations({ identifier: `FiberIdNoneEncoded` }),
        Struct({ _tag: Literal(`Runtime`), id: Int, startTimeMillis: Int }).annotations({
          identifier: `FiberIdRuntimeEncoded`,
        }),
        Struct({
          _tag: Literal(`Composite`),
          left: suspend(() => Gx),
          right: suspend(() => Gx),
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
        declare(bo, {
          typeConstructor: { _tag: `effect/FiberId` },
          identifier: `FiberIdFromSelf`,
          pretty: () => fiberIdPretty,
          arbitrary: () => fiberIdArbitrary,
        })
      ) {}),
      (fiberIdDecode = (e) => {
        switch (e._tag) {
          case `None`:
            return _o;
          case `Runtime`:
            return vo(e.id, e.startTimeMillis);
          case `Composite`:
            return yo(fiberIdDecode(e.left), fiberIdDecode(e.right));
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
      $(Gx, FiberIdFromSelf, {
        strict: !0,
        decode: (e) => fiberIdDecode(e),
        encode: (e) => fiberIdEncode(e),
      }).annotations({ identifier: `FiberId` }),
      (Defect = class extends (
        $(Unknown, Unknown, {
          strict: !0,
          decode: (e) => {
            if (y(e) && `message` in e && typeof e.message == `string`) {
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
      (Kx = TaggedStruct(`symbol`, { key: String$ }).annotations({
        description: `an object to be decoded into a globally shared symbol`,
      })),
      (qx = Q(Kx, SymbolFromSelf, {
        strict: !0,
        decode: (e) => decodeSymbol(e.key),
        encode: (e, t, n) => Eb(encodeSymbol(e, n), (e) => Kx.make({ key: e })),
      })),
      (PropertyKey$ = class extends (
        Union(String$, Number$, qx).annotations({ identifier: `PropertyKey` })
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
  Yx,
  nominal,
  Xx = __esmMin(() => {
    (kt(),
      B(),
      (Yx = Symbol.for(`effect/Brand/Refined`)),
      (nominal = () =>
        Object.assign((e) => e, {
          [Yx]: Yx,
          option: (e) => I(e),
          either: (e) => M(e),
          is: (e) => !0,
        })));
  }),
  fromInput,
  fromInputNested,
  toRecord,
  schemaStruct,
  Zx = __esmMin(() => {
    (U(),
      Jx(),
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
        let t = Symbol.iterator in e ? V(e) : Object.entries(e),
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
  Qx = __esmMin(() => {
    (wg(),
      rr(),
      wa(),
      Y(),
      yc(),
      B_(),
      kt(),
      D(),
      kp(),
      Ja(),
      hd(),
      Co(),
      s(),
      T(),
      Lm(),
      B(),
      j(),
      x(),
      gp(),
      qi(),
      Dp(),
      qp(),
      bg(),
      zp(),
      eo(),
      Rh(),
      _(),
      dc(),
      A(),
      qo(),
      ho(),
      jh(),
      ru(),
      dd(),
      Zd(),
      No(),
      te(),
      Dg(),
      Sd(),
      Fe(),
      Rg(),
      ec(),
      cd(),
      vi(),
      Gs(),
      ed(),
      au(),
      U(),
      Ed(),
      Vg(),
      m(),
      w_(),
      E_(),
      he(),
      Xe(),
      xc(),
      $t(),
      Jx(),
      Xx(),
      zd(),
      Zx(),
      yb(),
      Vb(),
      Wb(),
      Pv(),
      zv(),
      ey(),
      _u(),
      Wu(),
      bu(),
      Go(),
      Fd(),
      nm());
  }),
  $x = __esmMin(() => {
    (s(),
      U(),
      _(),
      zv(),
      ey(),
      Fv(),
      B(),
      x(),
      yb(),
      $_(),
      ev(),
      fd(),
      Xx(),
      wa(),
      Y(),
      yc(),
      Ja(),
      kt(),
      D(),
      kp(),
      T(),
      Lm(),
      rr(),
      A(),
      j(),
      eo(),
      Dp(),
      qo(),
      ho(),
      bg(),
      wg(),
      B_(),
      hd(),
      Co(),
      gp(),
      qi(),
      qp(),
      zp(),
      Rh(),
      dc(),
      jh(),
      ru(),
      dd(),
      Zd(),
      No(),
      te(),
      Dg(),
      Sd(),
      Fe(),
      Rg(),
      ec(),
      cd(),
      vi(),
      Gs(),
      ed(),
      au(),
      Ed(),
      Vg(),
      m(),
      w_(),
      E_(),
      he(),
      Xe(),
      xc(),
      $t(),
      _u(),
      Nu(),
      Wu(),
      bu(),
      Ju(),
      yv(),
      Bh(),
      Pv(),
      zd(),
      hf(),
      Vb(),
      Go(),
      Ef(),
      bp(),
      Fd(),
      nm(),
      kh(),
      am(),
      dh(),
      km(),
      xm(),
      wp(),
      gh(),
      bh(),
      rh(),
      fp(),
      Le(),
      It(),
      dr(),
      ou(),
      ic(),
      Jx(),
      Wb());
  }),
  eS = __esmMin(() => {}),
  tS = __esmMin(() => {
    (B_(), $x());
  }),
  nS = __esmMin(() => {}),
  swap,
  rS,
  iS = __esmMin(() => {
    ($x(),
      Jx(),
      nS(),
      (swap = (e) => Q(typeSchema(e), encodedSchema(e), { decode: Nb(e), encode: jb(e) })),
      swap(Rx),
      (rS = Union(
        String$,
        Number$,
        Boolean$,
        Null,
        Array$(suspend(() => rS)),
        Record({ key: String$, value: suspend(() => rS) }),
      ).annotations({ identifier: `JsonValue` })));
  }),
  aS = __esmMin(() => {
    (t(),
      B_(),
      A(),
      x(),
      Jx(),
      Vg(),
      wa(),
      kt(),
      Pv(),
      s(),
      ru(),
      Y(),
      dd(),
      bg(),
      wg(),
      Ja(),
      Zd(),
      No(),
      j(),
      rr(),
      B(),
      te(),
      Dg(),
      Dp(),
      hd(),
      D(),
      kp(),
      Co(),
      T(),
      Lm(),
      gp(),
      qi(),
      qp(),
      zp(),
      eo(),
      Rh(),
      Sd(),
      Fe(),
      Rg(),
      ec(),
      cd(),
      vi(),
      Gs(),
      _(),
      dc(),
      yc(),
      qo(),
      ho(),
      jh(),
      ed(),
      Xx(),
      au(),
      U(),
      Ed(),
      m(),
      w_(),
      E_(),
      he(),
      Xe(),
      xc(),
      $t(),
      Vb(),
      zv(),
      ey(),
      Fv(),
      yb(),
      zd(),
      Zx(),
      Wb(),
      Go(),
      Fd(),
      nm(),
      kh(),
      rh(),
      yv(),
      _u(),
      Nu(),
      Qx(),
      $x(),
      tS(),
      eS(),
      iS());
  }),
  oS = __esmMin(() => {}),
  sS = __esmMin(() => {}),
  cS = __esmMin(() => {}),
  lS = __esmMin(() => {}),
  uS = __esmMin(() => {}),
  dS = __esmMin(() => {
    (oS(), sS(), cS(), lS(), uS());
  }),
  fS,
  pS,
  mS = __esmMin(() => {
    (aS(), (fS = nominal()), (pS = fromBrand(fS)(Int)));
  }),
  hS = __esmMin(() => {
    (aS(), mS());
  }),
  gS,
  _S = __esmMin(() => {
    (aS(),
      hS(),
      (gS = Struct({
        name: String$,
        args: Any,
        seqNum: pS,
        parentSeqNum: pS,
        clientId: String$,
        sessionId: String$,
      }).annotations({ title: `LiveStoreEvent.Global.Encoded` })));
  }),
  vS = __esmMin(() => {
    ($x(), aS(), hS(), _S());
  }),
  yS = __esmMin(() => {}),
  bS = __esmMin(() => {}),
  xS = __esmMin(() => {}),
  SS = __esmMin(() => {
    (yS(), bS(), xS());
  }),
  CS = __esmMin(() => {}),
  wS = __esmMin(() => {}),
  TS = __esmMin(() => {}),
  ES = __esmMin(() => {
    (wS(), TS());
  }),
  DS = __esmMin(() => {}),
  OS = __esmMin(() => {}),
  kS = __esmMin(() => {}),
  AS = __esmMin(() => {}),
  jS = __esmMin(() => {
    (AS(), DS());
  }),
  MS = __esmMin(() => {
    (dS(), hS(), dS(), vS(), OS(), $x(), aS(), SS(), CS(), ES(), DS(), kS(), jS(), bS());
  }),
  NS = __esmMin(() => {}),
  PS = __esmMin(() => {}),
  FS,
  IS = __esmMin(() => {
    (aS(),
      MS(),
      TaggedError(`~@livestore/common/IsOfflineError`)(`IsOfflineError`, { cause: Defect }),
      (FS = String$.annotations({ title: `@livestore/sync-cf:BackendId` })),
      TaggedError(`~@livestore/common/BackendIdMismatchError`)(`BackendIdMismatchError`, {
        expected: FS,
        received: FS,
      }),
      TaggedError(`~@livestore/common/ServerAheadError`)(`ServerAheadError`, {
        minimumExpectedNum: pS,
        providedNum: pS,
      }));
  }),
  LS = __esmMin(() => {}),
  RS,
  zS = __esmMin(() => {
    (aS(),
      LS(),
      Struct({
        isConnected: Boolean$,
        timestampMs: Number$,
        devtools: Struct({ latchClosed: Boolean$ }),
      }).annotations({ title: `NetworkStatus` }),
      (RS = Union(
        TaggedStruct(`MoreUnknown`, {}),
        TaggedStruct(`MoreKnown`, { remaining: Number$ }),
        TaggedStruct(`NoMore`, {}),
      )));
  }),
  BS = __esmMin(() => {
    (IS(), zS());
  }),
  VS = __esmMin(() => {}),
  HS = __esmMin(() => {}),
  US = __esmMin(() => {
    new TextEncoder();
  }),
  WS = __esmMin(() => {
    (PS(), HS(), BS(), zS(), US(), VS());
  }),
  GS = __esmMin(() => {}),
  KS = __esmMin(() => {}),
  qS = __esmMin(() => {}),
  JS = __esmMin(() => {
    globalThis.__LIVESTORE_DEVTOOLS_PROTOCOL_VERSION_OVERRIDE__;
  }),
  YS = __esmMin(() => {}),
  XS = __esmMin(() => {}),
  ZS = __esmMin(() => {}),
  QS = __esmMin(() => {}),
  $S = __esmMin(() => {}),
  eC = __esmMin(() => {}),
  tC = __esmMin(() => {
    (SS(),
      KS(),
      qS(),
      aS(),
      qS(),
      MS(),
      CS(),
      zS(),
      vS(),
      $x(),
      hS(),
      YS(),
      XS(),
      ZS(),
      QS(),
      ES(),
      jS(),
      $S(),
      SS(),
      ES(),
      NS(),
      WS(),
      CS(),
      JS(),
      eC());
  }),
  nC,
  rC,
  iC,
  aC,
  oC,
  sC,
  cC,
  lC,
  uC,
  dC,
  fC,
  pC,
  mC,
  hC = __esmMin(() => {
    (tC(),
      MS(),
      aS(),
      (nC = TaggedStruct(`SyncMessage.SyncMetadata`, { createdAt: String$ }).annotations({
        title: `@livestore/sync-cf:SyncMetadata`,
      })),
      (rC = Struct({
        cursor: Option(Struct({ backendId: FS, eventSequenceNumber: pS })),
      }).annotations({ title: `@livestore/sync-cf:PullRequest` })),
      (iC = Struct({
        batch: Array$(Struct({ eventEncoded: gS, metadata: Option(nC) })),
        pageInfo: RS,
        backendId: FS,
      }).annotations({ title: `@livestore/sync-cf:PullResponse` })),
      (aC = Struct({ batch: Array$(gS), backendId: Option(FS) }).annotations({
        title: `@livestore/sync-cf:PushRequest`,
      })),
      (oC = Struct({}).annotations({ title: `@livestore/sync-cf:PushAck` })),
      (sC = TaggedStruct(`SyncMessage.Ping`, {}).annotations({ title: `@livestore/sync-cf:Ping` })),
      (cC = TaggedStruct(`SyncMessage.Pong`, {}).annotations({ title: `@livestore/sync-cf:Pong` })),
      (lC = TaggedStruct(`SyncMessage.AdminResetRoomRequest`, { adminSecret: String$ }).annotations(
        { title: `@livestore/sync-cf:AdminResetRoomRequest` },
      )),
      (uC = TaggedStruct(`SyncMessage.AdminResetRoomResponse`, {}).annotations({
        title: `@livestore/sync-cf:AdminResetRoomResponse`,
      })),
      (dC = TaggedStruct(`SyncMessage.AdminInfoRequest`, { adminSecret: String$ }).annotations({
        title: `@livestore/sync-cf:AdminInfoRequest`,
      })),
      (fC = TaggedStruct(`SyncMessage.AdminInfoResponse`, {
        info: Struct({ durableObjectId: String$ }),
      }).annotations({ title: `@livestore/sync-cf:AdminInfoResponse` })),
      (pC = Union(iC, oC, cC, uC, fC)),
      (mC = Union(rC, aC, sC, lC, dC)),
      Union(pC, mC));
  }),
  gC,
  _C = __esmMin(() => {
    (aS(),
      GS(),
      tC(),
      hC(),
      (gC = Struct({
        storeId: String$,
        payload: ax(zx, parseJson(rS)).pipe(UndefinedOr),
        transport: Literal(`http`, `ws`),
      })));
  }),
  matchSyncRequest,
  vC = __esmMin(() => {
    (aS(),
      _C(),
      Mb(parseJson(pC)),
      Mb(parseJson(mC)),
      (matchSyncRequest = (e) => {
        let t = new URL(e.url),
          n = fromInput(t.searchParams),
          r = schemaStruct(gC)(n).pipe(F_, z_);
        if (r._tag !== `None`) return r.value;
      }),
      parseJson(
        Struct({
          storeId: String$,
          payload: optional(rS),
          pullRequestIds: Array$(String$),
          headers: optional(Record({ key: String$, value: String$ })),
        }),
      ));
  }),
  yC = __esmMin(() => {}),
  bC = __esmMin(() => {}),
  xC = __esmMin(() => {
    (yC(), vC(), bC());
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
var SC,
  CC,
  wC,
  TC = __esmMin(() => {
    ((SC = new TextEncoder()),
      (CC = new TextDecoder()),
      (wC = new TextDecoder(`utf-8`, { fatal: !0 })));
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
  EC = __esmMin(() => {
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
  DC = __esmMin(() => {
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
  OC = __esmMin(() => {
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
  kC = __esmMin(() => {
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
var AC = __esmMin(() => {});
function decode(e) {
  if (Uint8Array.fromBase64)
    try {
      return Uint8Array.fromBase64(typeof e == `string` ? e : CC.decode(e), {
        alphabet: `base64url`,
      });
    } catch (e) {
      throw TypeError(jC, { cause: e });
    }
  let t = e;
  if ((t instanceof Uint8Array && (t = CC.decode(t)), t.includes(`+`) || t.includes(`/`)))
    throw TypeError(jC);
  t = t.replace(/-/g, `+`).replace(/_/g, `/`);
  try {
    return decodeBase64(t);
  } catch {
    throw TypeError(jC);
  }
}
var jC,
  MC = __esmMin(() => {
    (TC(), AC(), (jC = `The input to be decoded is not correctly encoded.`));
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
  NC = __esmMin(() => {
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
    r = JSON.parse(wC.decode(decode(e)));
  } catch {
    throw new t(n);
  }
  if (!isObject(r)) throw new t(n);
  return r;
}
var PC = __esmMin(() => {
  (MC(), TC(), NC());
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
var FC = __esmMin(() => {
  OC();
});
function checkKeyType(e, t, n) {
  let { alg: r, secret: i } = e,
    a = n === `decrypt` || n === `sign`;
  if (i && t instanceof Uint8Array) return [IC, t];
  if (isJWK(t)) {
    if (i ? !isSecretJWK(t) : !(a ? isPrivateJWK(t) : isPublicJWK(t)))
      throw TypeError(
        i
          ? `JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`
          : `JSON Web Key for this operation must be a ${a ? `private` : `public`} JWK`,
      );
    return (jwkMatchesOp(e, t, n), [zC, t]);
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
  return isCryptoKey(t) ? [LC, t] : [RC, t];
}
function cached(e, t, n) {
  BC ||= new WeakMap();
  let r = BC.get(e);
  return (n && (r ? (r[t] = n) : BC.set(e, { __proto__: null, [t]: n })), n ?? r?.[t]);
}
async function prepareKey(e, t, n) {
  let r = checkKeyType(e, t, n);
  switch (r[0]) {
    case IC:
    case LC:
      return r[1];
    case zC: {
      let t = r[1];
      if (t.k) return decode(t.k);
      if (!Object.isFrozen(t)) {
        let { key_ops: e } = t;
        (Array.isArray(e) && Object.freeze(e), Object.freeze(t));
      }
      return handleJWK(t, t, e);
    }
    case RC: {
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
  IC,
  LC,
  RC,
  zC,
  BC,
  VC,
  handleJWK,
  handleKeyObject,
  HC = __esmMin(() => {
    (DC(),
      kC(),
      NC(),
      MC(),
      FC(),
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
      (IC = 0),
      (LC = 1),
      (RC = 2),
      (zC = 3),
      (VC = { __proto__: null, prime256v1: `P-256`, secp384r1: `P-384`, secp521r1: `P-521` }),
      (handleJWK = async (e, t, n) =>
        cached(e, n.alg) ?? cached(e, n.alg, await jwkToKey(n, { ...t, alg: n.alg }))),
      (handleKeyObject = (e, t) => {
        let n = cached(e, t.alg);
        if (n) return n;
        let r = e.type === `public`,
          i = t.usages[+!r],
          { asymmetricKeyType: a } = e,
          o = VC[e.asymmetricKeyDetails?.namedCurve],
          s = t.resolve?.({ crv: o, asymmetricKeyType: a }) ?? t.subtle;
        return cached(e, t.alg, e.toCryptoKey(s, r, i));
      }));
  });
function table(e) {
  let t = { __proto__: null };
  for (let n in e) t[n] = { ...e[n], alg: n };
  return t;
}
var UC = __esmMin(() => {});
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
var WC,
  GC = __esmMin(() => {
    (OC(), (WC = { __proto__: null, b64: !0 }));
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
var KC = __esmMin(() => {
  EC();
});
function hmac(e) {
  let t = { name: `HMAC`, hash: `SHA-${e}` };
  return { kty: [`oct`], secret: !0, subtle: t, signing: t, usages: qC };
}
function rsa(e, t) {
  let n = { name: t ? `RSA-PSS` : `RSASSA-PKCS1-v1_5`, hash: `SHA-${e}` };
  return {
    kty: [`RSA`],
    subtle: n,
    signing: t ? { ...n, saltLength: t } : n,
    usages: qC,
    minRsaBits: 2048,
  };
}
function ecdsa(e, t) {
  return {
    kty: [`EC`],
    crv: e,
    subtle: { name: `ECDSA`, namedCurve: e },
    signing: { name: `ECDSA`, hash: `SHA-${t}` },
    usages: qC,
  };
}
function eddsa() {
  let e = { name: `Ed25519` };
  return { kty: [`OKP`], crv: `Ed25519`, subtle: e, signing: e, usages: qC };
}
function mldsa(e) {
  let t = { name: `ML-DSA-${e}` };
  return { kty: [`AKP`], subtle: t, signing: t, usages: qC };
}
function jwsAlgorithm(e) {
  let t = typeof e == `string` ? JC[e] : void 0;
  if (!t)
    throw new JOSENotSupported(
      `alg ${e} is not supported either by JOSE or your javascript runtime`,
    );
  return t;
}
var qC,
  JC,
  YC = __esmMin(() => {
    (OC(),
      UC(),
      (qC = [[`verify`], [`sign`]]),
      (JC = table({
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
  let c = validateCrit(JWSInvalid, WC, t[1], o, s),
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
          : SC.encode(a)
        : a,
    ),
    h = decodeBase64url(e.signature, `signature`, JWSInvalid),
    g = await prepareKey(p, n, `verify`);
  if (!(await verify(p, g, h, m))) throw new JWSSignatureVerificationFailed();
  let _;
  return (
    (_ = l ? decodeBase64url(a, `payload`, JWSInvalid) : typeof a == `string` ? SC.encode(a) : a),
    [_, o, l, g, d]
  );
}
async function verifyCompact(e, t, n) {
  if ((e instanceof Uint8Array && (e = CC.decode(e)), typeof e != `string`))
    throw new JWSInvalid(`Compact JWS must be a string or Uint8Array`);
  let { 0: r, 1: i, 2: a, length: o } = e.split(`.`);
  if (o !== 3) throw new JWSInvalid(`Invalid Compact JWS`);
  return verifySignature({ payload: i, protected: r, signature: a }, t, n);
}
var XC = __esmMin(() => {
  (KC(), YC(), OC(), TC(), PC(), NC(), GC(), HC());
});
function secs(e) {
  let t = QC.exec(e);
  if (!t || (t[4] && t[1])) throw TypeError(`Invalid time period format`);
  let n = parseFloat(t[2]),
    r = Math.round(n * ZC[t[3][0].toLowerCase()]);
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
  throw new JWTClaimValidationFailed(`unexpected "${t}" claim value`, e, t, $C);
}
function validateClaimsSet(e, t, n = {}) {
  let r;
  try {
    r = JSON.parse(wC.decode(t));
  } catch {}
  if (!isObject(r)) throw new JWTInvalid(`JWT Claims Set must be a top-level JSON object`);
  let { typ: i } = n;
  if (i && (typeof e.typ != `string` || normalizeTyp(e.typ) !== normalizeTyp(i)))
    throw new JWTClaimValidationFailed(`unexpected "typ" JWT header value`, r, `typ`, $C);
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
    throw new JWTClaimValidationFailed(`"nbf" claim timestamp check failed`, r, `nbf`, $C);
  let v = validateNumericDate(r, `exp`);
  if (v !== void 0 && v <= h - p)
    throw new JWTExpired(`"exp" claim timestamp check failed`, r, `exp`, $C);
  if (l !== void 0) {
    let e = h - g,
      t = typeof l == `number` ? l : secs(l);
    if (e - p > t)
      throw new JWTExpired(
        `"iat" claim timestamp check failed (too far in the past)`,
        r,
        `iat`,
        $C,
      );
    if (e < 0 - p)
      throw new JWTClaimValidationFailed(
        `"iat" claim timestamp check failed (it should be in the past)`,
        r,
        `iat`,
        $C,
      );
  }
  return r;
}
var epoch,
  ZC,
  QC,
  $C,
  normalizeTyp,
  checkAudiencePresence,
  ew = __esmMin(() => {
    (OC(),
      TC(),
      NC(),
      (epoch = (e) => Math.floor(e.getTime() / 1e3)),
      (ZC = { s: 1, m: 60, h: 3600, d: 86400, w: 604800, y: 31557600 }),
      (QC =
        /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i),
      ($C = `check_failed`),
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
var tw = __esmMin(() => {
  (XC(), ew(), OC());
});
function signatureAlgorithm(e) {
  let t = typeof e == `string` ? JC[e] : void 0;
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
  nw = __esmMin(() => {
    (FC(),
      YC(),
      OC(),
      NC(),
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
  rw = __esmMin(() => {
    (TC(),
      EC(),
      DC(),
      OC(),
      kC(),
      PC(),
      NC(),
      MC(),
      HC(),
      FC(),
      UC(),
      GC(),
      XC(),
      tw(),
      ew(),
      KC(),
      YC(),
      AC(),
      nw());
  });
async function getJwks(e) {
  if (!iw || Date.now() - aw > ow) {
    let t = await e.AUTH.fetch(`https://auth.internal/api/auth/jwks`);
    if (!t.ok) throw Error(`jwks fetch failed: ${t.status}`);
    ((iw = createLocalJWKSet(await t.json())), (aw = Date.now()));
  }
  return iw;
}
async function verifyToken(e, t) {
  try {
    let { payload: n } = await jwtVerify(t, await getJwks(e));
    return typeof n.sub == `string` ? n.sub : null;
  } catch {
    iw = null;
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
var iw,
  aw,
  ow,
  sw = __esmMin(() => {
    (rw(), (iw = null), (aw = 0), (ow = 600 * 1e3));
  }),
  cw,
  forwardAsUser,
  lw,
  uw = __esmMin(() => {
    (xC(),
      sw(),
      (cw = [`/do/`, `/rpc`]),
      (forwardAsUser = (e, t, n) => {
        let r = new Headers(e.headers);
        return (r.set(`x-user-id`, n), t.fetch(new Request(e.url, new Request(e, { headers: r }))));
      }),
      (lw = {
        async fetch(e, t) {
          let n = new URL(e.url);
          if (n.pathname.startsWith(`/auth/`)) {
            let r = new URL(e.url);
            return (
              (r.pathname = n.pathname.replace(/^\/auth\//, `/api/auth/`)),
              t.AUTH.fetch(new Request(r, e))
            );
          }
          let r = matchSyncRequest(e);
          if (r !== void 0) {
            let n = r.payload,
              i = typeof n == `object` && n && `authToken` in n ? n.authToken : void 0;
            if (typeof i != `string`) return new Response(`missing auth token`, { status: 401 });
            let a = await verifyToken(t, i);
            return a
              ? r.storeId === a
                ? forwardAsUser(e, t.API, a)
                : new Response(`forbidden: not your store`, { status: 403 })
              : new Response(`invalid auth token`, { status: 401 });
          }
          if (cw.some((e) => n.pathname.startsWith(e))) {
            if (n.pathname === `/rpc`) return t.API.fetch(e);
            let r = await verifyUser(t, e);
            return r
              ? forwardAsUser(e, t.API, r)
              : Response.json({ error: `unauthorized` }, { status: 401 });
          }
          if (n.pathname.startsWith(`/agents/`)) {
            let n = await verifyUser(t, e);
            return n
              ? forwardAsUser(e, t.AGENT, n)
              : Response.json({ error: `unauthorized` }, { status: 401 });
          }
          return t.ASSETS
            ? t.ASSETS.fetch(e)
            : new Response(`flue-alchemy-demo front worker (no SPA yet)`, { status: 200 });
        },
      }));
  }),
  dw;
__esmMin(() => {
  (uw(), uw(), (dw = lw ?? {}));
})();
export { dw as default };

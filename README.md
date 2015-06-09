# fromlocalestring

Why is there no fromLocaleString in JavaScript?  I could really use it.  In
some locales, commas and periods have the opposite role, and trying to figure
out which to use can be error-prone.

Should work in all modern browsers.  With the help of
https://github.com/es-shims/es5-shim, should even work in ie8 (internet
explorer 8).

If you use number.toLocaleString(), you may get spaces (U+00a0), commas,
periods, etc. as the thousands-separators, and a period, comma, etc. as the
decimal-separator.  If you want to convert back to a number, you have to figure
out which separators to use.  This library will figure out what those are by
doing the conversion once, and detecting what characters were used.

# Usage

## From Node

This should change.  It should live in an npm module.  But it doesn't.  Yet.

```javascript
> var FromLocaleString = require('./fromlocalestring');
undefined
> var number = 1234;
undefined
> var txt = number.toLocaleString();
undefined
> txt
'1,234'
> var fromLocaleString = new FromLocaleString();
undefined
> fromLocaleString.number(txt);
1234
>
```

## From a Browser

```html
<script src="./fromlocalestring.js"></script>
<script>
var fromLocaleString = new FromLocaleString();
var number = 1234;
var txt = number.toLocaleString();
console.log(JSON.stringify(fromLocaleString.number(txt)));
</script>
```

... also gives you 1234.

# Methods

## .number

Convert using Number().

## .parseFloat

Convert using parseFloat().

## .parseInt

Convert using parseInt().  Using base as the second argument is supported.  If
you don't supply one, one is not passed to the native parseInt function.

# Constants

Well, not really constants because not only are they initialized to whatever
the current locale dictates, you can also change them at any time.

## .separators.thousandsSeparator

Probably a comma, period, U+00a0, ...

## .separators.decimalSeparator

Probably a period, comma, ...

"use strict";

describe('fls', function() {
  describe('initialization', function() {
    it('should work with no arguments', function() {
      var fls = new FromLocaleString();
      assert.equal(typeof fls, 'object');
    });
    it('should accept a known locale in a string', function() {
      var fls = new FromLocaleString('en-CA');
      assert.equal(typeof fls, 'object');
    });
    it('may or may not throw on unknown locale in a string', function() {
      try {
        var fls = new FromLocaleString('XXX');
        assert(true);
      } catch (e) {
        assert(true);
      }
    });
  });

  describe('with no locale-specifications (system)', function() {
    describe('number', function() {
      var fls;
      beforeEach(function() {
        fls = new FromLocaleString();
      });
      afterEach(function() {
        fls = null;
      });

      it('should parse a simple number', function() {
        var expected = 1234.0;

        // add decimals
        var i;
        for (i = 0; i < fls.separators.decimalPlaces; i += 1) {
          expected += 4 * Math.pow(10, -(i+1));
        };
        var input = expected.toLocaleString();
        var actual = fls.number(input);
        assert.equal(actual, expected);
      });

      it('should parse a larger number', function() {
        var expected = 123456789.0;

        // add decimals
        var i;
        for (i = 0; i < fls.separators.decimalPlaces; i += 1) {
          expected += 4 * Math.pow(10, -(i+1));
        };

        // fix floating-point imprecision
        expected = +(expected.toFixed(7));

        var input = expected.toLocaleString();
        var actual = fls.number(input);
        assert.equal(actual, expected);
      });
    });

    describe('parseFloat', function() {
    });

    describe('parseInt', function() {
    });

    // report what separators were used
    describe('used thousands-separator', function() {
      var fls = new FromLocaleString();
      var separator = '"' + fls.separators.thousandsSeparator + '"';
      it(separator, function() {
      });
    });
    describe('used decimal-separator', function() {
      var fls = new FromLocaleString();
      var separator = '"' + fls.separators.decimalSeparator + '"';
      it(separator, function() {
      });
    });
  });

  describe('with synthetic locale-specifications', function() {
    describe('number', function() {

      var tests = [
        {
          input: '1,234,567.89',
          expected: 1234567.89,
          thousandsSeparator : ',',
          decimalSeparator : '.'
        }, {
          input: '1.234.567,89',
          expected: 1234567.89,
          thousandsSeparator : '.',
          decimalSeparator : ','
        }, {
          input: '1\u00a0234\u00a0567,89',
          expected: 1234567.89,
          thousandsSeparator : '\u00a0',
          decimalSeparator : ','
        }
      ];


      tests.forEach(function(testSpecs) {

        var fls = new FromLocaleString();
        fls.separators.thousandsSeparator = testSpecs.thousandsSeparator;
        fls.separators.decimalSeparator = testSpecs.decimalSeparator;

        it('should parse with "' +fls.separators.thousandsSeparator+ '" and "' +fls.separators.decimalSeparator+ '"', function() {
          var expected = testSpecs.expected;

          var input = testSpecs.input;
          var actual = fls.number(input);
          assert.equal(actual, expected);
        });
      });
    });
  });
});

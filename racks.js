!function (name, context, definition) {
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    module.exports = definition();
  } else if (typeof define === 'function' && typeof define.amd  === 'object') {
    define(function () {
      return definition();
    });
  } else {
    context[name] = definition();
  }
}('Racks', this, function () {

    function require(p) {
      var path = require.resolve(p)
        , mod = require.modules[path];
      if (!mod) throw new Error('failed to require "' + p + '"');
      if (!mod.exports) {
        mod.exports = {};
        mod.call(mod.exports, mod, mod.exports, require.relative(path));
      }
      return mod.exports;
    }

    require.modules = {};

    require.resolve = function (path) {
      var orig = path
        , reg = path + '.js'
        , index = path + '/index.js';
      return require.modules[reg] && reg
        || require.modules[index] && index
        || orig;
    };

    require.register = function (path, fn) {
      require.modules[path] = fn;
    };

    require.relative = function (parent) {
      return function(p){
        if ('.' != p.charAt(0)) return require(p);

        var path = parent.split('/')
          , segs = p.split('/');
        path.pop();

        for (var i = 0; i < segs.length; i++) {
          var seg = segs[i];
          if ('..' == seg) path.pop();
          else if ('.' != seg) path.push(seg);
        }

        return require(path.join('/'));
      };
    };

    require.alias = function (from, to) {
      var fn = require.modules[from];
      require.modules[to] = fn;
    };


    require.register("racks.js", function(module, exports, require){

      /**
       * Racks.
       *
       * @constructor
       */

      function Racks() {
        this.stack = [];
        this.between = [];
      };

      /**
       * Register a middleware.
       *
       * @param {Function} fn
       * @returns {Racks} `this`
       * @api public
       */

      Racks.prototype.push =
      Racks.prototype.use = function(fn) {
        this.stack.push(fn);
        return this;
      };

      /**
       * Register a function executed
       * after each middleware.
       *
       * @param {Function} fn
       * @returns {Racks} `this`
       * @api public
       */

      Racks.prototype.after = function(fn) {
        this.between.push(fn);
        return this;
      };

      /**
       * Trigger the middlewares.
       *
       * @param {Mixed} param1
       * @param {Mixed} param2..
       * @api public
       */

      Racks.prototype.send = function() {
        var stack = this.batch();

        function next() {
          var fn = stack.shift()
            , args = slice(arguments);

          args.push(next);
          if (fn) fn.apply(this, args);
        };

        next.apply(this, slice(arguments));
      };

      /**
       * Return the stack. Apply the after
       * callbacks.
       *
       * @returns {Array}
       * @api private
       */

      Racks.prototype.batch = function() {
        var stack = this.stack
          , between = this.between;

        if (!stack.length || !between.length) return stack;

        return flatten(stack.map(function(middleware) {
          return [middleware].concat(between);
        }), []);
      };

      /*!
       * Slice.
       *
       * @param {Arguments} args
       * @returns {Array}
       */

      function slice(args) {
        return Array.prototype.slice.call(args);
      };

      /*!
       * Flatten.
       *
       * @param {Array} input
       * @param {Array} output
       * @returns {Array} output
       */

      function flatten(input, output) {
        input.forEach(function(item) {
          if (Array.isArray(item)) flatten(item, output);
          else output.push(item);
        });

        return output;
      };

      /*!
       * Export `Racks`.
       */

      module.exports = Racks;

    }); // module: racks.js

    require.alias("./racks.js", "racks");

  return require('racks');
});
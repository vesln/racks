var slice = require('sliced')
  , splice = Array.prototype.splice

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
  var stack = this.batch()
    , self = this

  function next() {
    var fn = stack.shift()
      , args = slice(arguments);

    args.push(next);
    if (fn) fn.apply(self, args);
  }

  next.apply(this, arguments);
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
    , between = this.between
    , len = stack.length

  if (!len || !between.length) return stack;

  stack = stack.slice()
  between = [len - 1, 0].concat(between)
  
  do {
    splice.apply(stack, between)
  } while (--between[0])

  return stack
};

/*!
 * Export `Racks`.
 */

module.exports = Racks;

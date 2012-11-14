
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

'use strict';

/**
 * Promisify the function sent
 * Arguments:
 * fn (Function) - function to be promisified that accepts a callback
 * opts(Object) -
 *   context - The context to be used when calling the function
 */
module.exports = function (fn, opts) {
  opts = opts || {};
  const context = opts.context || this;
  return function () {
    const args = Array.prototype.slice.call(arguments);
    return new Promise((resolve, reject) => {

      // our callback function
      args.push(function (err, result) {
        if (err) {
          reject(err);
        }
        else {
          const results = Array.prototype.slice.call(arguments);
          if (results.length > 2) {
            results.shift();
            resolve(results);
          }
          else {
            resolve(result);
          }
        }
      });
      return fn.apply(context, args);
    });
  };
};

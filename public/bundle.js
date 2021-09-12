
document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
(function () {
    'use strict';

    function EasyPromise(callback) {
        var _this = this;

        this.resolveObj = createCallbacks();
        this.rejectObj = createCallbacks();
        this.value;
        this.reason;
        this.status = "pending";
        this.innerResolve = function (value) {
            _this.value = value;
            setTimeout(function () {
                return _this.resolveObj.resolve(value);
            }, 0);
        };

        this.innerReject = function (reason) {
            _this.reason = reason;
            setTimeout(function () {
                return _this.rejectObj.resove(reason);
            }, 0);
        };

        callback && callback(this.innerResolve, this.innerReject);
    }

    EasyPromise.prototype.then = function (onResolved, onRejected) {
        var _this2 = this;

        if (this.isPending()) {
            return new EasyPromise(function (resolve, reject) {
                // waiting for promise.resolve.
                _this2.resolveObj.add(function () {
                    var res = onResolved(_this2.value);
                    if (res instanceof EasyPromise) {
                        res.then(resolve);
                    } else {
                        resolve(res);
                    }
                });
            });
        } else if (this.isResolved()) {
            onResolved(this.value);
            return this;
        } else if (thi.isRejected()) {
            onRejected(this.reason);
            return this;
        }
    };

    EasyPromise.prototype.resolve = function (value) {
        this.resolved();
        this.innerResolved(value);
    };

    EasyPromise.prototype.reject = function () {};

    EasyPromise.prototype.isPending = function () {
        return this.status === "pending";
    };

    EasyPromise.prototype.isResolved = function () {
        return this.status === "resolved";
    };

    EasyPromise.prototype.isRejected = function () {
        return this.status === "rejected";
    };

    EasyPromise.prototype.rejected = function () {
        this.status = "rejected";
    };

    EasyPromise.prototype.resolved = function () {
        this.status = "resolved";
    };

    function createCallbacks() {
        var fns = [];

        function add() {
            var args = Array.prototype.slice.call(arguments);
            for (var i = 0; i < args.length; i++) {
                fns.push(args[i]);
            }
        }

        function remove() {
            var args = Array.prototype.slice.call(arguments);

            var _loop = function _loop(i) {
                var idx = fns.findIndex(function (fn) {
                    return fn === args[i];
                });
                if (idx !== -1) {
                    fns.splice(idx, 1);
                }
            };

            for (var i = 0; i < args.length; i++) {
                _loop(i);
            }
        }

        function resolve(value) {
            fns.map(function (fn) {
                return fn(value);
            });
        }

        return {
            add: add,
            remove: remove,
            resolve: resolve
        };
    }

    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':5729/livereload.js?snipver=1"></' + 'script>');

    function onload() {
        var promise = new EasyPromise(function (resolve, reject) {
            var p = fetch("./json/a.json").then(function (res) {
                return res.json();
            });
            p.then(function (data) {
                console.log('a', data);
                resolve(data);
            });
        });

        promise.then(function (value) {
            console.log(value, 'value');
            var p1 = new EasyPromise(function (resolve, reject) {
                var p = fetch('./json/b.json?v=' + value.result).then(function (res) {
                    return res.json();
                });
                p.then(function (data) {
                    console.log(data, 'b');
                    resolve(data);
                });
            });
            return p1;
        });
    }

    window.addEventListener('load', onload, false);

}());
//# sourceMappingURL=bundle.js.map

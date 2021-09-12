export default function EasyPromise(callback) {
    this.resolveObj = createCallbacks();
    this.rejectObj = createCallbacks();
    this.value;
    this.reason;
    this.status = "pending";
    this.innerResolve = value => {
        this.value = value;
        setTimeout(() => this.resolveObj.resolve(value), 0);
    }

    this.innerReject = reason => {
        this.reason = reason;
        setTimeout(() => this.rejectObj.resove(reason), 0);
    }

    callback && callback(this.innerResolve, this.innerReject)
}

EasyPromise.prototype.then = function (onResolved, onRejected) {
    if (this.isPending()) {
        return new EasyPromise((resolve, reject) => {
            // waiting for promise.resolve.
            this.resolveObj.add(() => {
                const res = onResolved(this.value)
                if (res instanceof EasyPromise) {
                    res.then(resolve)
                } else {
                    resolve(res)
                }
            })
        });
    } else if (this.isResolved()) {
        onResolved(this.value);
        return this;
    } else if (thi.isRejected()) {
        onRejected(this.reason)
        return this;
    }
}

EasyPromise.prototype.resolve = function (value) {
    this.resolved();
    this.innerResolved(value);
}

EasyPromise.prototype.reject = function () {

}

EasyPromise.prototype.isPending = function () {
    return this.status === "pending"
}

EasyPromise.prototype.isResolved = function () {
    return this.status === "resolved"
}

EasyPromise.prototype.isRejected = function () {
    return this.status === "rejected"
}

EasyPromise.prototype.rejected = function () {
    this.status = "rejected"
}

EasyPromise.prototype.resolved = function () {
    this.status = "resolved"
}

function createCallbacks() {
    const fns = [];

    function add() {
        const args = Array.prototype.slice.call(arguments);
        for (let i = 0; i < args.length; i++) {
            fns.push(args[i])
        }
    }

    function remove() {
        const args = Array.prototype.slice.call(arguments);
        for (let i = 0; i < args.length; i++) {
            const idx = fns.findIndex(fn => fn === args[i]);
            if (idx !== -1) {
                fns.splice(idx, 1);
            }
        }
    }

    function resolve(value) {
        fns.map(fn => fn(value));
    }

    return {
        add,
        remove,
        resolve,
    }

}
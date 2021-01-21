"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(req, res, next) {
    console.log('authentication middleware!');
    // throw new Error('error from middleware');
    next();
}
exports.default = default_1;
;

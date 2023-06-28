"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionHandler = void 0;
const ExceptionHandler = (err, req, res, next) => {
    res.status(500).json({ 'Something went wrong. Error message': err.message });
};
exports.ExceptionHandler = ExceptionHandler;

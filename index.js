"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLog = exports.accessLog = void 0;
const morgan_1 = __importDefault(require("morgan"));
const rotating_file_stream_1 = require("rotating-file-stream");
const path_1 = require("path");
const accessLogStream = (filename, path = "logs", interval = "1d") => rotating_file_stream_1.createStream(`${filename}.log`, {
    interval,
    path: path_1.join(path),
});
const accessLog = (filename, format = "combined") => {
    return morgan_1.default(format, { stream: accessLogStream(filename) });
};
exports.accessLog = accessLog;
const errorLog = (format = "combined") => {
    return morgan_1.default(format, {
        skip: (req, res) => res.statusCode < 400,
    });
};
exports.errorLog = errorLog;
//# sourceMappingURL=index.js.map
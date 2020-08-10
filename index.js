import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import { join } from "path";
const accessLogStream = (filename, path = "logs", interval = "1d") => createStream(`${filename}.log`, {
    interval,
    path: join(path),
});
const accessLog = (filename, format = "combined") => {
    return morgan(format, { stream: accessLogStream(filename) });
};
const errorLog = (format = "combined") => {
    return morgan(format, {
        skip: (req, res) => res.statusCode < 400,
    });
};
export { accessLog, errorLog };
//# sourceMappingURL=index.js.map
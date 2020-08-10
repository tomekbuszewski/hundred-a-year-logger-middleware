import  morgan from "morgan";
import { createStream } from "rotating-file-stream";
import { join } from "path";
import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";

type LoggerFormat = "combined" | "common" | "dev" | "short";

type Handler<
  Request extends http.IncomingMessage,
  Response extends http.ServerResponse
  > = (req: Request, res: Response, callback: (err?: Error) => void) => void;

type ResponseHandler = Handler<http.IncomingMessage, http.ServerResponse>;

const accessLogStream = (filename: string, path = "logs", interval = "1d") =>
  createStream(`${filename}.log`, {
    interval,
    path: join(path),
  });

const accessLog = (filename: string, format: LoggerFormat = "combined"): ResponseHandler => {
  return morgan(format, { stream: accessLogStream(filename) });
};

const errorLog = (format: LoggerFormat = "combined"): ResponseHandler => {
  return morgan(format, {
    skip: (req: IncomingMessage, res: ServerResponse) => res.statusCode < 400,
  });
};

export { accessLog, errorLog };

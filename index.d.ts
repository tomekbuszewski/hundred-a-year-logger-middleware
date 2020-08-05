/// <reference types="node" />
import * as http from "http";
declare type LoggerFormat = "combined" | "common" | "dev" | "short";
declare type Handler<Request extends http.IncomingMessage, Response extends http.ServerResponse> = (req: Request, res: Response, callback: (err?: Error) => void) => void;
declare type ResponseHandler = Handler<http.IncomingMessage, http.ServerResponse>;
declare const accessLog: (filename: string, format?: LoggerFormat) => ResponseHandler;
declare const errorLog: (format?: LoggerFormat) => ResponseHandler;
export { accessLog, errorLog };

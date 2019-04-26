import { PromiseBuffer } from "@sentry/utils";
import { connect } from "socket.io-client";
import { LogService } from "./LogService";
import { ILogger, INeedsCleanup } from "./types";

export class ConsoleReLogger implements ILogger, INeedsCleanup {
    private cleanup = false;
    private socket: SocketIOClient.Socket;
    private buffer = new PromiseBuffer<void>(30);

    constructor(private channel: string) {
        this.socket = connect("https://console.re:443", {
            transports: ["websocket"],
        });

        this.socket.on("connect", () => {
            LogService.transportLog.information("ConsoleRe connected");
        });

        this.socket.on("connect_error", (error: any) => {
            LogService.transportLog.error(error, "ConsoleRe socket connect_error");
        });

        this.socket.on("reconnect_error", (error: any) => {
            LogService.transportLog.error(error, "ConsoleRe socket reconnect_error");
        });

        this.socket.on("error", (error: any) => {
            LogService.transportLog.error(error, "ConsoleRe socket error");
        });

        this.socket.on("disconnect", () => {
            LogService.transportLog.information("ConsoleRe disconnected");
            if (!this.cleanup) { this.socket.connect(); }
        });
    }

    public teardown(): Promise<boolean> {
        return this.buffer.drain().then(() => {
            this.cleanup = true;
            this.socket.disconnect();

            delete this.socket;
            delete this.buffer;

            LogService.transportLog.information("ConsoleRe cleaned up");
            return true;
        });
    }

    public information(category: string, message: string, ...args: any[]) {
        this.sendLog("info", `${category} ${message}`, ...args);
    }

    public debug(category: string, message: string, ...args: any[]) {
        this.sendLog("debug", `${category} ${message}`, ...args);
    }

    public error(exception: any, ...args: any[]) {
        this.sendLog("error", ...args, exception);
    }

    private sendLog(level: "info" | "debug" | "error", ...args: any[]) {
        if (!this.buffer.isReady()) {
            LogService.transportLog.error("ConsoleReLogger buffer full", level, ...args);
            return;
        }

        this.buffer.add(
            new Promise((resolve) => {
                if (this.socket.connected) {
                    this.socket.emit("toServerRe", {
                        // command: null,
                        channel: this.channel,
                        level,
                        args,
                        caller: { /* that's true */
                            file: "ConsoleReLogger.ts",
                            line: 75,
                            column: 9,
                        },
                        browser: {
                            browser: {
                                f: "homey-heating",
                                s: "H",
                            },
                            version: __VERSION,
                            OS: "Homey",
                        },
                    });
                }

                resolve();
            }),
        ).catch((e) => {
            LogService.transportLog.error(e, "ConsoleRe could not send log: ", ...args, e);
        });
    }
}

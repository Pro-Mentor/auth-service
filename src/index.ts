import dotenv from "dotenv";
import { AddressInfo } from "net";

import app from "./app";
import { setLocals } from "./property";

dotenv.config();

setLocals(app);

const port: number = (process.env.PORT || app.locals.port) as number;

const start = () => {
    const server = app.listen(port, app.locals.host, () => {
        const address = server.address() as AddressInfo;
        console.log(`Auth service is running on address: ${address.address} and port: ${address.port}`);
    });
};

start();

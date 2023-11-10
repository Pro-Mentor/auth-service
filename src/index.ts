/* eslint-disable import/first */
import dotenv from "dotenv";
import { AddressInfo } from "net";

if (process.env.NODE_ENV !== "development") {
    dotenv.config();
}

import app from "./app";
import { setLocals } from "./property";

import { connectToMongoDB, connectToRabbitMQ, rabbitMQWrapperSetup } from "./config/server-config";

setLocals(app);

const port: number = (process.env.PORT || app.locals.port) as number;
const host: string = (process.env.HOST || app.locals.host) as string;

// validate the environment variables
const envValidation = () => {
    if (!port) {
        throw new Error("The port must be defined");
    }

    if (!host) {
        throw new Error("The host must be defined");
    }

    if (!process.env.KEYCLOAK_CLIENT_ID) {
        throw new Error("The keycloak client id must be defined");
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("The mongodb uri must be defined");
    }

    if (!process.env.RABBITMQ_CONNECTION) {
        throw new Error("RabbmitMQ connection string is required");
    }
};

const startTheServer = async () => {
    const server = app.listen(port, host, () => {
        const address = server.address() as AddressInfo;
        console.log(`Auth service is running on address: ${address.address} and port: ${address.port}`);
    });
};

// start the server
const start = () => {
    envValidation();

    // connect to the rabbitMQ server
    connectToRabbitMQ()
        .then(async () => {
            try {
                await rabbitMQWrapperSetup();

                await connectToMongoDB();

                startTheServer();
            } catch (error) {
                console.error("Error occured while starting the server: ", error);
            }
        })
        .catch((err) => {
            console.error("Could not connect to the RabbmitMQ server: ", err);
        });
};

start();

import dotenv from "dotenv";

import app from "./app";

dotenv.config();

const port = process.env.PORT || 400;

const start = () => {
    app.listen(port, () => {
        console.log(`Auth service is running on port ${port}`);
    });
};

start();

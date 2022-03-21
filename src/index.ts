import express from "express";
import cors from "cors";
import config from "./config";


const app = express();

const port = config.port();

import {rest} from "./rest";

app.use("*", cors());

rest.configure({app, path: "/"});

app.listen({port}, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});


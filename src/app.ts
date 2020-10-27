import express from "express";
import bodyParser from "body-parser";
import path from "path";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

import * as homeController from "./controllers/home";

/**
 * Primary app routes.
 */
app.get("/", homeController.index);


export default app;
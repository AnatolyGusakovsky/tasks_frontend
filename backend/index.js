import Koa from 'koa';
import {router} from "./routes/tasks_routes.js";
import bodyParser from 'koa-bodyparser';

const app = new Koa();
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
console.log("Application is running on port 3000");
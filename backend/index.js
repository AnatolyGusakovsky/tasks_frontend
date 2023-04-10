import Koa from 'koa';

const app = new Koa();

app.use(ctx =>{
  ctx.body = 'Welcome to Koa!';
})

app.listen(3000);

console.log('Application is running on 3000 port')
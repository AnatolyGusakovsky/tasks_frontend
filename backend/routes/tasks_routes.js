import {create_task, delete_task, get_all_tasks, get_task, update_task} from "../api/tasks_api.js";

import Router from "@koa/router";


const router = new Router({
  prefix: '/tasks'
})

router.get('/', async ctx => {
  ctx.body = await get_all_tasks();
})

router.post('/', async ctx => {
  let task = ctx.request.body;
  task = await create_task(task);
  ctx.response.status = 200;
  ctx.body = task;
})

router.get('/:id', async ctx => {
  const id = ctx.params.id;
  ctx.body = await get_task(id);
})

router.delete('/:id', async ctx => {
  const id = ctx.params.id;
  ctx.body = await delete_task(id);
  ctx.response.status = 200;
})

router.put('/:id', async ctx => {
  const id = ctx.params.id;
  let task = ctx.request.body;
  task = await update_task(task);
  ctx.response.status = 200;
  ctx.body = task;

})

export {router}
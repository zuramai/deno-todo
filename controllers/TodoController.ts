import db from "./../database/mongo.ts";
import * as dejs from "https://deno.land/x/dejs@0.6.0/mod.ts";

class TodoController {
    async index(context:any) {
        const table = db.collection("todo");
        const users = await table.find({ task: { $ne: null } });
        const output = await dejs.renderFileToString(`${Deno.cwd()}/views/todo/index.ejs`, {users});
        context.response.body = output
    }

    async create(context:any) {
        const output = await dejs.renderFileToString(`${Deno.cwd()}/views/todo/create.ejs`, {});
        context.response.body = output;
        console.log("create")
    }

    async store({request,response}:any) {
        if (!request.hasBody) {
            response.status = 400;
            response.body = { msg: "Invalid beer data" };
            return;
        }
        let body = request.body({
            contentTypes: {
                text: ["application/json"],
            },
        });

        const {
        value: { task, time },
        } = await request.body();

        const todo = db.collection("todo");
        const insertId = await todo.insertOne({
            task: task,
            time: time
        });

        response.body = {
            success: true,
            message: "Successfully create task",
            data: insertId._id
        }
    }

    async edit({request,response, params}:any) {
        const todo = await db.collection('todo').findOne({ _id: { "$oid": params.id } });
        const output = await dejs.renderFileToString(`${Deno.cwd()}/views/todo/edit.ejs`, {todo});
        response.body = output;
    }

    show(context:any) {

    }

    async update({request, response, params}:any) {
        const {
            value: { task, time },
        } = await request.body();

        const { matchedCount, modifiedCount, upsertedId } = await db.collection('todo').updateOne(
            {_id: { "$oid": params.id }},
            { $set: { task: task } }
            );
        response.body = {
            success: true,
            message: "Successfully update task",
            matchedCount
        }; 

    }

    async destroy({request, response, params}:any) {
        const deleteCount = await db.collection('todo').deleteOne({ _id: {"$oid":params.id} });
        response.body = {
            success: true,
            message: "Successfully delete task",
            deleteCount
        }; 
    }

}

export default TodoController
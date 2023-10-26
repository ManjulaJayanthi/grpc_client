import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import path from "path";
import { ParsedQs } from "qs";

const GRPCClient = require('node-grpc-client');

const PROTO_PATH = path.resolve(__dirname, '../blog.proto');

console.log("\n PROTO_PATH : ", PROTO_PATH);

function createInsecure(host: string | undefined, data: any) {
    const myClient = new GRPCClient(PROTO_PATH, 'blog', 'UpdateBlog', host);
    return myClient.messageStream(data);
}

export let thumbs_up_event = async (req: Request) => {
    const blogInstance = await createInsecure(process.env.GRPC_SERVER, req.body);

    const promise = new Promise((resolve, reject) => {
        blogInstance.on('data', (streamData: any) => {
            console.log("Stream data received : ", streamData);
            resolve("ok");
        })
        blogInstance.on('error', (error: Error) => {
            console.log("Error in streaming : ", error);
            reject(error);
        })
        blogInstance.on('end', function () {
            console.log("Streaming end!")
            resolve("ok");
        });
    })
    return promise;
}


export let thumbs_down_event = async (req: Request) => {
    const blogInstance = await createInsecure(process.env.GRPC_SERVER, req.body);

    const promise = new Promise((resolve, reject) => {
        blogInstance.on('data', (streamData: any) => {
            console.log("Stream data received : ", streamData);
            resolve("ok");
        })
        blogInstance.on('error', (error: Error) => {
            console.log("Error in streaming : ", error);
            reject(error);
        })
        blogInstance.on('end', function () {
            console.log("Streaming end!")
            resolve("ok");
        });
    })
    return promise;
}
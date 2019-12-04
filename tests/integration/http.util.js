import request from "supertest";
import server from "../../src/server";
import {Path} from "../test.consts";

export const doPost = async data => {
    return request(server)
        .post(`${Path.API}${Path.USER}`)
        .send(data);
};

import request from "supertest";
import server from "../../src/server";
import {Message, Path} from "../test.consts";
import {HttpStatus} from "../../src/util/http-broker";

export const doPost = async data => {
    return request(server)
        .post(`${Path.API}${Path.USER}`)
        .send(data);
};

export const exceptInvalidArgument = (expected,res) => {
    expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
    const {message, errors} = JSON.parse(res.text);
    expect(message).toBe(Message.INVALID_ARGUMENTS);
    expect(errors && errors.length).toBeGreaterThan(0);
    expect(errors.findIndex(error => expected === error.param)).toBeGreaterThan(-1);
};

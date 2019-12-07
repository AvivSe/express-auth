import bcrypt from "bcrypt";

export default async password => bcrypt.hash(password, 10);

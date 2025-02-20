import { Pool } from 'pg';
import nodemailer from "nodemailer";
 
export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

export const email = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false, // No TLS
  });
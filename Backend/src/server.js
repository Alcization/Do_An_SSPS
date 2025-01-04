import express from 'express';

import { instanceMongoDb } from './config/connection.js'
import { env } from './config/environment.js';
import Router from './route/index.js';
import cookieParser from "cookie-parser"
import cors from 'cors'

import { corsOptions } from './config/cors.js';
const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.raw({ type: "*/*" }));
app.use(cors(corsOptions))

// Fix port khong chay duoc
const port = parseInt(env.PORT || '3000', 10);

app.use('/v1', Router);
app.use((req, res, next) => {
	const error = new Error("Not Found")
	error.status = 404
	next(error)
})
app.use((err, req, res, next) => {
	const statusCode = err.status || 500
	return res.status(statusCode).json({
		status: 'error',
		code: statusCode,
		stack: err.stack,
		message: err.message || 'Internal Server Error'
	})
})

const start = async () => {
	try {
		await instanceMongoDb

		app.listen(env.PORT, () => {
			console.log(`Example app listening on ${env.HOST_URL}`)
			// console.log(`Server is live on ${env.PORT}`)
		})
	}
	catch (error) {
		console.log(error);
	}
}
start();

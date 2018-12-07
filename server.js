var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	helmet = require('helmet'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser')
	;

const bookRoutes = require('./api/routes/books');

app.use(helmet());
app.use(cors());

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:' + process.env.MONOGO_ATLAS_PW + '@node-library-shard-00-00-ca0lo.mongodb.net:27017,node-library-shard-00-01-ca0lo.mongodb.net:27017,node-library-shard-00-02-ca0lo.mongodb.net:27017/test?ssl=true&replicaSet=node-library-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

app.use("/books", bookRoutes);

app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

app.listen(port);

console.log('Library RESTful API Server Started on: ' + port);

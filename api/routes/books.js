const express = require('express');
const router = express.Router();

// const mongoose = require('mongoose');
// const Book = require('../model/book');


var books = [{
	'id': '1',
	'title': 'Adventures of Aladin',
	'category': 'Drama',
	'description': 'Short stories full of advanture.'
}];


router.get('/', (req, res, next) => {

	console.log(books);
	res.status(200).json(books);

	// Book.find()
	// 	.exec()
	// 	.then(book => {
	// 		console.log(book);
	// 		res.status(200).json(book);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 		res.status(500).json({ error: err });
	// 	});
});

// router.get('/:bookId', (req, res, next) => {
// 	const id = req.params.bookId;

// 	Book.findById(id)
// 		.exec()
// 		.then(book => {
// 			console.log(book);
// 			if (book) {
// 				res.status(200).json(book);
// 			}

// 			res.status(404).json({ message: 'No matching book found the given ID.' });
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json({ error: err });
// 		});
// });

router.post('/', (req, res, next) => {

	var book = {
		_id: books.length + 1,
		title: req.body.title,
		category: req.body.category,
		description: req.body.description
	}

	books.push(book);

	res.status(201).json({
		message: "New Book created successfully.",
		createdBook: book
	});

	// book.save()
	// 	.then(result => {
	// 		console.log(result);
	// 		res.status(201).json({
	// 			message: "New Book created successfully.",
	// 			createdBook: book
	// 		})
	// 	})
	// 	.catch(err => {
	// 		console.log(err)
	// 		res.status(500).json({ error: err });
	// 	});
});

// router.delete('/:bookId', (req, res, next) => {
// 	const id = req.params.bookId;
// 	Book.remove({_id: id})
// 		.exec()
// 		.then(result => {
// 			res.status(200).json(result)
// 		})
// 		.catch(err => {
// 			console.log(err)
// 			res.status(500).json({ error: err });
// 		});
// });


module.exports = router;
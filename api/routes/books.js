const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Book = require('../model/book');

router.get('/', (req, res, next) => {
	Book.find()
		.exec()
		.then(book => {
			console.log(book);
			res.status(200).json(book);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.get('/:bookId', (req, res, next) => {
	const id = req.params.bookId;

	Book.findById(id)
		.exec()
		.then(book => {
			console.log(book);
			if (book) {
				res.status(200).json(book);
			}

			res.status(404).json({ message: 'No matching book found the given ID.' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.post('/', (req, res, next) => {

	const book = new Book({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		category: req.body.category,
		description: req.body.description
	});

	book.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: "New Book created successfully.",
				createdBook: book
			})
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ error: err });
		});
});

router.delete('/:bookId', (req, res, next) => {
	const id = req.params.bookId;
	Book.remove({_id: id})
		.exec()
		.then(result => {
			res.status(200).json(result)
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ error: err });
		});
});


module.exports = router;
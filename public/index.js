
// Retrieve all books from endpoint /posts
const loadBooks = async () => {
	const response = await fetch('http://localhost:3000/posts');
	const books = await response.json();

	for (let book of books) {
		const x = `
		 <h5 class="card-title">Title: ${book.title}</h5>
		 <h6 class="card-subtitle mb-2 text-muted">Author: ${book.description}</h6>
		 <hr>
		 <button type="button" class="btn btn-danger">Delete</button>
		 <button types="button" class="btn btn-primary" data-toggle="modal"
				 data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
				 Edit  
		 </button>
				 `
		document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
	}
}

loadBooks();

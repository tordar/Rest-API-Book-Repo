
// Retrieve all books from endpoint /posts
const loadBooks = async () => {
	const response = await fetch('http://localhost:3000/posts');
	const books = await response.json();

	for (let book of books) {
		const x = `
		<div class="card">
		 <img src="https://skeivesorlandsdager.no/wp-content/uploads/woocommerce-placeholder.png">
		 <h5 class="card-title">Title: ${book.title}</h5>
		 <h6 class="card-subtitle mb-2 text-muted">Author: ${book.description}</h6>
		 <button type="button" class="delete-button">Delete</button>
		 <button types="button" class="edit-button" data-toggle="modal"
				 data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
				 Edit  
		 </button>
		 </div>
				 `
		document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
	}
}

loadBooks();

const showCard = () => {
	let card = document.getElementById('howTo')
	if (card.style.display === "none") {
		card.style.display = "block";
	  } else {
		card.style.display = "none";
	  }
}

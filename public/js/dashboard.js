const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#post-name').value.trim();
  // const needed_funding = document.querySelector('#post-funding').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  if (name && description) { // && needed_funding
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ name, description }), // , needed_funding
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const editButtonHandler = async (event) => {
  if (event.target.classList.contains('btn-edit')) {
    const postId = event.target.getAttribute('data-id');
    
    // Redirect to the edit page using the post ID
    window.location.href = `/dashboard/edit/${postId}`;
  }
};

// Define an async function for the "DELETE" button click event
const deleteButtonHandler = async (event) => {
  if (event.target.classList.contains('btn-delete')) {
    const postId = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

// Wait for the document to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Attach event listeners to the "EDIT" and "DELETE" buttons
  const editButtons = document.querySelectorAll('.btn-edit');
  const deleteButtons = document.querySelectorAll('.btn-delete');

  editButtons.forEach((button) => {
    button.addEventListener('click', editButtonHandler);
  });

  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteButtonHandler);
  });
});

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);




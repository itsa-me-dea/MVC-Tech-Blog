// connected to dashboard-edit.handlebars
// event listener to update post in response to "update" submit button
document.addEventListener('submit', async (event) => {
  if (event.target.classList.contains('edit-post-form')) {
    event.preventDefault();

    const id = event.target.querySelector('.btn-update').getAttribute('data-id');
    console.log("ID:", id);
    const name = event.target.querySelector('#post-name').value.trim();
    const description = event.target.querySelector('#post-desc').value.trim();

    if (name && description) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace(`/dashboard/`);
        alert('Post updated');
      } else {
        alert('Failed to update post');
      }
    }
  }
});

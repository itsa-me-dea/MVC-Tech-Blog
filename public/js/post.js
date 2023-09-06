// connected to post.handlebars
// event listener to add comment in response to "comment" submit button
document.addEventListener('submit', async (event) => {
  if (event.target.classList.contains('new-comment-form')) {
    event.preventDefault();

    // Extract postId here
    const postId = event.target.closest('.text-center').querySelector('.post-title').getAttribute('post-id');
    console.log("Post ID:", postId);

    const comment = event.target.querySelector('#post-comment').value.trim();

    if (comment) { 
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment, post_id: postId }), // Include post_id in the payload
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        alert('Failed to add comment');
      }
    }
  }
});

const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Create comment
router.post('/', withAuth, async (req, res) => {
  try {
    const { comment, post_id } = req.body;

    if (!comment || !post_id) {
      return res.status(400).json({ message: 'Comment and post_id are required.' });
    }

    const newComment = await Comment.create({
      comment_text: comment,
      user_id: req.session.user_id,
      post_id,
    });

    if (!newComment) {
      return res.status(500).json({ message: 'Failed to create the comment.' });
    }

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err); // Log any errors to the console
    res.status(500).json(err);
  }
});


// Get all comments
router.get('/:post_id', async (req, res) => {
try {
    // Get all comment and JOIN with user data
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.post_id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
        });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log(comments);

    // Pass serialized data and session flag into template
    res.render('post', { 
    comments, 
    logged_in: req.session.logged_in 
    });
} catch (err) {
    res.status(500).json(err);
}
});
  
// Delete comment (future implementation)
router.delete('/:id', withAuth, async (req, res) => {
try {
    const commentData = await Comment.destroy({
    where: {
        id: req.params.id,
        post_id: req.session.post_id,
        user_id: req.session.user_id,
    },
    });

    if (!commentData) {
    res.status(404).json({ message: 'No comment found with this id!' });
    return;
    }

    res.status(200).json(commentData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
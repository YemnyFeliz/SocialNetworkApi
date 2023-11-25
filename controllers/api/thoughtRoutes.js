const router = require('express').Router();
const { User, Thought } = require('../../models');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const allThoughts = await Thought.find();
        return res.json(allThoughts);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:thoughtId', async (req, res) => {
    try {
        const oneThought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!oneThought) {
            return res.status(400).json({ message: 'thought not found'});
        }
        return res.json(oneThought);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        const userId = req.body.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: 'user not found'});
        }
        
        user.thoughts.push(newThought._id);
        await user.save();
        return res.json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:thoughtId', async (req, res) => {
    try {
        const updateThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true }
        );

        return res.json(updateThought);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId', async (req, res) => {
    try {
        const deleteThought = await Thought.findByIdAndDelete(req.params.thoughtId);

        return res.json(deleteThought);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/:thoughtId/reactions", async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(400).json({ message: "No thought with that ID" });
      }
      const newReactionId = new mongoose.Types.ObjectId();
      thought.reactions.push({
        reactionId: newReactionId,
        ...req.body,
      });
      const newReaction = await thought.save();
  
      return res.json(newReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(400).json({ message: "No thought with that ID" });
      }
      const reactionId = req.params.reactionId;
      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction.reactionId.toString() === reactionId
      );
  
      if (reactionIndex === -1) {
        return res.status(400).json({ message: "No reaction with that ID" });
      }
  
      thought.reactions.splice(reactionIndex, 1);
      const updatedThought = await thought.save();
  
      return res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
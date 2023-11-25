const router = require('express').Router();
const { User, Thought } = require('../../models');

//Route to get all users
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.json(allUsers);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to get user by ID
router.get('/:userId', async (req, res) => {
    try {
        const oneUser = await User.findById({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends');

        if (!oneUser) {
            return res.status(400).json({ message: 'user not found ' });
        }
        return res.json(oneUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to create user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        return res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to update user
router.put('/:userId', async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true }
        );

        res.status(200).json(updateUser)
    } catch (err) {
        res.status(400).json(err);
    }
});

//Route to delete user
router.delete('/:userId', async (req, res) => {
    try {

        const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });
        res.status(200).json(deleteUser);

    } catch (err) {
        res.status(400).json(err);
    }

});

//Route to add a friend to an user
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const newFriend = await User.create(req.body);
        return res.json(newFriend);

    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to delete a friend from an user
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true }
        );
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;
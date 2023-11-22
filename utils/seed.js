const connection = require('../config/connection');
const { Thought, User } = require('../models');
const mongoose = require('mongoose');

const seedData = async () => {
    try {
        const existingUsers = await User.find();
        const existingThoughts = await Thought.find();

        if (existingUsers.length === 0) {
            const user1 = await User.create({
                username: 'Ana',
                email: 'ana@example.com',
                thoughts: [],
                friends: [],
            });

            const user2 = await User.create({
                username: 'John',
                email: 'John@example.com',
                thoughts: [],
                friends: [],
            });

            const user3 = await User.create({
                username: 'Nina',
                email: 'nina@example.com',
                thoughts: [],
                friends: [],
            });

            const user4 = await User.create({
                username: 'Carl',
                email: 'carl@example.com',
                thoughts: [],
                friends: [],
            });

            const user5 = await User.create({
                username: 'nerd',
                email: 'nerd@example.com',
                thoughts: [],
                friends: [],
            });


            user1.friends.push(user2, user3, user4, user5);
            user2.friends.push(user1, user3, user4, user5);
            user3.friends.push(user1, user2, user4, user5);
            user4.friends.push(user1, user2, user3, user5);
            user5.friends.push(user1, user2, user3, user4);


            await user1.save();
            await user2.save();
            await user3.save();
            await user4.save();
            await user5.save();

        } else {
            'Seed data for users already exists'
        }


        if (existingThoughts.length === 0) {
            const thoughtUser1 = await User.findOne({ username: 'Ana '});
            const thoughtUser2 = await User.findOne({ username: 'John '});
            const thoughtUser3 = await User.findOne({ username: 'Nina '});
            const thoughtUser4 = await User.findOne({ username: 'Carl '});
            const thoughtUser5 = await User.findOne({ username: 'nerd '});

            const thought1 = await Thought.create({
                thoughtText: 'sequelize is great but mongoose is awesome',
                username: thoughtUser1.username,
                createdAt: new Date(),
                reaction: [
                    {
                        reactionBody: 'I agree!',
                        username: thoughtUser2.username,
                        crfeatedAt: new Date(),
                        reactionId: new mongoose.Types.ObjectId(),
                    },

                    {
                        reactionBody: 'Cool',
                        username: thoughtUser1.username,
                        createdAt: new Date(),
                        reactionId: new mongoose.Types.ObjectId(),
                    },
                ],
            });

            thoughtUser1.thoughts.push(thought1);

            await thoughtUser1.save();
        } else {
            console.log('Seed data for thoughts already exits');
        }
        process.exist(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};


seedData();
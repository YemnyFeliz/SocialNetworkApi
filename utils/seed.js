const connection = require("../config/connection");
const { Thought, User } = require("../models");
const mongoose = require("mongoose");

const seedData = async () => {
  try {
    const existingUsers = await User.find();
    const existingThoughts = await Thought.find();

    let user1, user2, user3, user4, user5; 

    if (existingUsers.length === 0) {
      // Create users
      user1 = await User.create({
        username: "Ana",
        email: "ana@example.com",
        thoughts: [],
        friends: [],
      });

      user2 = await User.create({
        username: "John",
        email: "John@example.com",
        thoughts: [],
        friends: [],
      });

      user3 = await User.create({
        username: "Nina",
        email: "nina@example.com",
        thoughts: [],
        friends: [],
      });

      user4 = await User.create({
        username: "Carl",
        email: "carla@example.com",
        thoughts: [],
        friends: [],
      });

      user5 = await User.create({
        username: "nerd",
        email: "nerd@example.com",
        thoughts: [],
        friends: [],
      });

      // Create friends for users
      user1.friends.push(user2, user3, user4, user5);
      user2.friends.push(user1, user3, user4, user5);
      user3.friends.push(user1, user2, user4, user5);
      user4.friends.push(user1, user2, user3, user5);
      user5.friends.push(user1, user2, user3, user4);

      // Save changes
      await user1.save();
      await user2.save();
      await user3.save();
      await user4.save();
      await user5.save();

      console.log("Seeds for users added correctly");
    } else {
      console.log("Seed data for users already exists");
    }

    if (existingThoughts.length === 0) {
        //Thoughts and reactions

      const thought1 = await Thought.create({
        thoughtText: "sequelize is great but mongoose is awesome",
        username: user1.username,
        createdAt: new Date(),
        reactions: [
          {
            reactionBody: "I agree!",
            username: user2.username,
            createdAt: new Date(),
            reactionId: new mongoose.Types.ObjectId(),
          },
          {
            reactionBody: "Cool",
            username: user1.username,
            createdAt: new Date(),
            reactionId: new mongoose.Types.ObjectId(),
          },
        ],
      });

      //Thoughts are linked to user
      user1.thoughts.push(thought1);

      await user1.save();


      console.log("Seed data for thoughts added correctly");
    } else {
      console.log("Seed data for thoughts already exists");
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
const { Schema, model } = require('mongoose');

//Reaction schema is defined
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Schema.Types.ObjectId(),
      },

      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },

      username: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now(),
        get: function (date) {
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const year = date.getFullYear();
          return `${month}/${day}/${year}`;
        },
      },
    },

    {
      toJSON: {
        getters: true,
      },

      id: false,
    }
  );

  //Thought schema defined
  const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now(),
            get: function (date){
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const year = date.getFullYear();
                return `${month}/${day}/${year}`;
            },
        },

        username: {
            type: String,
            required: true,
        },
        
        reactions: [reactionSchema],
    },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },

        id: false,
    }
);

  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  const Thought = model('Thought', thoughtSchema);
  
  module.exports = Thought;
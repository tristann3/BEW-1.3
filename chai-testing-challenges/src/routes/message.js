const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Message = require("../models/message");
const { json } = require("express");

/** Route to get all messages. */
router.get("/", (req, res) => {
  Message.find({}).then((messages) => {
    res.send(messages);
  });
});

/** Route to get one message by id. */
router.get("/:messageId", (req, res) => {
  Message.findById(req.params.messageId).then((message) => {
    res.send(message);
  });
});

/** Route to add a new message.
 * Create
 */

router.post("/", (req, res) => {
  let message = new Message(req.body);
  message
    .save()
    .then((messageResult) => {
      return User.findById(req.body.author);
    })
    .then((user) => {
      user.messages.unshift(message);
      return user.save();
    })
    .then(() => {
      return res.json({ message: "success" });
    })
    .catch((err) => {
      throw err.message;
    });
});

/** Route to update an existing message. */
router.put("/:messageId", (req, res) => {
  Message.findByIdAndUpdate(req.params.messageId, req.body)
    .then(() => {
      return Message.findOne({ _id: req.params.messageId });
    })
    .then((message) => {
      return res.json({ message });
    })
    .catch((err) => {
      throw err.message;
    });
});

/** Route to delete a message. */
router.delete("/:messageId", (req, res) => {
  Message.findById(req.params.messageId)
    .then((message) => {
      return User.findById(message.author);
    })
    .then((user) => {
      user.messages = user.messages.filter(
        (message) => message.id !== req.params.messageId
      );
      return user.save();
    })
    .then(() => {
      Message.findByIdAndDelete(req.params.messageId).then(() => {
        return res.json({
          message: "Successfully deleted.",
          _id: req.params.messageId,
        });
      });
    })
    .catch((err) => {
      throw err.message;
    });
  // TODO: Delete the specified Message using `findByIdAndDelete`. Make sure
  // to also delete the message from the User object's `messages` array
  // TODO: Return a JSON object indicating that the Message has been deleted
});

module.exports = router;

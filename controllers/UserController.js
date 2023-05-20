const express = require('express');
const router = express.Router();
router.use(express.json());

// Verify user by nickname or email, if it doesn't exists create new one

const User = require('../database/models/user.model');
const createUser = (req, res) => {
    console.log(req.body);
    const { customerId, firstName, lastName, nickname, email, password, role } = req.body;

    User.findOne({ $or: [{ nickname: nickname }, { email: email }] })
      .then(existingUser => {
        if (existingUser) {
          res.status(409).json({ msg: "User already exists" }); 
        } else {
          const newUser = new User({
            customerId, 
            firstName,
            lastName,
            nickname,
            email,
            password,
            role,
          });
  
          newUser.save()
            .then(savedUser => {
              res.status(200).json({
                msg: "User successfully created",
                user: savedUser,
              });
            })
            .catch(error => {
              res.status(500).json({ error: error.message });
            });
        }
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  };

  // Verify user by nickname or userId and update it

  const updateUser = (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, nickname, email, password, role } = req.body;
  
    User.findOneAndUpdate(
      { $or: [{ _id: userId }, { nickname: nickname }] },
      {
        $set: {
          firstName,
          lastName,
          nickname,
          email,
          password,
          role,
        },
      },
      { new: true }
    )
      .then(updatedUser => {
        if (updatedUser) {
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ msg: 'User not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  };
  

  // Delete user (removed from data base)


  const deleteUser = (req, res) => {
    const userId = req.params.id;
  
    User.findByIdAndRemove(userId)
      .then(deletedUser => {
        if (deletedUser) {
          res.status(200).json({ msg: 'User deleted successfully' });
        } else {
          res.status(404).json({ msg: 'User not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  };

  // Soft delete

  const softdeleteUser = (req, res) => {
    const userId = req.params.id;
  
    User.findByIdAndUpdate(userId, { isDeleted: true })
      .then(updatedUser => {
        if (updatedUser) {
          res.status(200).json({ msg: 'User deleted successfully' });
        } else {
          res.status(404).json({ msg: 'User not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  };

  module.exports = { createUser, updateUser, deleteUser, softdeleteUser };
const express = require("express");
const router = express.Router();

const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require("../controllers/user");


router.get("/", (req, res) => {
    res.send("Welcome to ShunyEka Systems Private Limited !");
});

router.post("/user", createUser);
router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);



module.exports = router;
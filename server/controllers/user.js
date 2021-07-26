const User = require("../db/userSchema");


exports.createUser = async (req, res) =>
{

    const { name, email, phones } = req.body;

    if (!name || !email || !phones)
    {
        return res.status(400).send("Please fill in all fields");
    }

    try
    {
        const isExist = await User.findOne({ email: email });

        if (isExist)
        {
            return res.status(400).json({ "error": "User already exist" });
        }

        const newUser = new User({ name, email, phones });

        if (newUser)
        {
            await newUser.save();
            return res.status(200).json({ "message": `Created new user with id ${ newUser._id }` });
        }
        else
        {
            return res.status(400).json({ "error": "Could not create user." });
        }

    }
    catch (err)
    {
        console.log(err);
    }

}

exports.getAllUsers = async (req, res) =>
{
    try
    {
        const allUsers = await User.find({});

        if (allUsers)
        {
            return res.status(200).json(allUsers);
        }
        else
        {
            return res.status(400).json({ "error": "Could not get all users." });
        }

    }
    catch (err)
    {
        console.log(err);
    }
}

exports.getUserById = async (req, res) =>
{
    const id = req.params.id;

    try
    {
        const user = await User.findOne({ _id: id });

        if (user)
        {
            return res.status(200).json(user);
        }
        else
        {
            return res.status(400).json({ "error": "Could not find the user with given id" });
        }

    }
    catch (err)
    {
        console.log(err);

        return res.status(500).json({ "error": "Internal Server Error" });
    }

}

exports.updateUser = async (req, res) =>
{
    const id = req.params.id;
    const updatedData = req.body;

    try
    {
        const user = await User.findOneAndUpdate({ _id: id }, updatedData, { new: true });

        if (user)
        {
            return res.status(200).json({ "message": "User updated successfully" });
        }
        else
        {
            return res.status(400).json({ "error": "Could not find the user with given id" });
        }
    }
    catch (err)
    {
        console.log(err);
    }
}

exports.deleteUser = async (req, res) =>
{
    const id = req.params.id;

    try
    {
        const user = await User.findOneAndRemove({ _id: id });

        if (user)
        {
            return res.status(200).json({ "message": "User deleted successfully" });
        }
        else
        {
            return res.status(400).json({ "error": "Could not find the user with given id" });
        }
    }
    catch (err)
    {
        console.log(err)
    }
}

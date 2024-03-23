const express = require("express");
const usersData = require("./database/data");
const validationSchema = require("./utils/validation");
const AppError = require("./AppError");
const { INVALID_SUBSCRIPTION } = require("./constants/errorCodes");
const errorHandler = require("./middlewares/errorHandler");
const catchAsync = require("./utils/catchAsync");

const app = express();

const getUsers = () => usersData;
const getUser = (username) => usersData.find(user => user.username === username);
const getSubscription = () => undefined;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.get("/users", catchAsync(async (req, res) => {
    const data = getUsers();

    if (!data.length) {
        throw new Error("Users not found");
    }

    res.status(200).send(data);
}));

app.post("/login", catchAsync(async (req, res) => {
    const { username } = req.body;
    const { error, value } = validationSchema.validate({ username });

    if (error) {
        throw new Error(error);
    }

    const user = getUser(value.username);

    if (!user) {
        throw new Error("User not found");
    }

    const subscription = getSubscription();
    if (!subscription) {
        throw new AppError(INVALID_SUBSCRIPTION, "Subscription not found", 400);
    }
}));

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server up");
});

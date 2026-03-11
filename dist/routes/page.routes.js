"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const pageRouter = (0, express_1.Router)();
const users = [{ username: " admin", password: "admin12345" }];
pageRouter.get("/", auth_middleware_1.checkNoAuth, (req, res) => {
    res.status(200).render("index");
});
pageRouter.get("/login", auth_middleware_1.checkNoAuth, (req, res) => {
    res.status(200).render("login");
});
pageRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username.trim() || !password.trim()) {
        res.status(400).send("Fill out information");
        return;
    }
    const foundUser = users.find((user) => user.username && user.password === password);
    if (!foundUser) {
        res.status(400).json({ message: "user not found" });
        return;
    }
    res.cookie("username", username, {
        maxAge: 10 * 60 * 1000,
    });
    res.cookie("password", password, {
        maxAge: 10 * 60 * 1000,
    });
    res.status(301).redirect("/profile");
});
pageRouter.get("/profile", auth_middleware_1.checkAuth, (req, res) => {
    const { username } = req.cookies;
    res.status(200).render("profile", {
        username,
    });
});
pageRouter.get("/logout", (req, res) => {
    (res.clearCookie("username"), res.clearCookie("password"));
    res.status(200).redirect("/");
});
exports.default = pageRouter;

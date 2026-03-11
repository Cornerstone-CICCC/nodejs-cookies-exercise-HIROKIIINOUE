"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNoAuth = exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    const { username } = req.cookies;
    if (!username) {
        res.status(301).redirect("/");
        return;
    }
    next();
};
exports.checkAuth = checkAuth;
const checkNoAuth = (req, res, next) => {
    const { username } = req.cookies;
    if (username) {
        res.status(301).redirect("/profile");
        return;
    }
    next();
};
exports.checkNoAuth = checkNoAuth;

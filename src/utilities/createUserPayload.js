const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("./jwt");

const createUserPayload = ({ res, user }) => {
    if (!user || !res) {
        throw new Error("res or user not provided");
    }

    const userPayload = {
        userId: user._id,
        name: user.name,
        email: user.email
    };

    attachCookiesToResponse({ res, user: userPayload });

    res.status(StatusCodes.OK).json({ user: userPayload });
};

module.exports = {
    createUserPayload
};

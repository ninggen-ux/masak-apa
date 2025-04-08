const supabase = require("../utils/supabase");

const loginHandler = async (request, h) => {
    const { email, password } = request.payload;

    if (!email || !password) {
        return h
            .response({
                message: "Please fill in all fields",
            })
            .code(400);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
    });

    if (error) {
        console.error(error);
        return h
            .response({
                status: "fail",
                message: error.message,
            })
            .code(error.status === 400 ? 400 : 500);
    }

    if (data.user) {
        const token = data.session.access_token;
        const userData = {
            id: data.user.id,
            email: data.user.email,
            username: data.user.user_metadata.username,
        };

        h.state("session", token, {
            isHttpOnly: true,
            isSecure: false,
            isSameSite: "Lax", // Production Ganti ke None, Development Ganti ke Lax
            path: "/",
            ttl: 24 * 60 * 60 * 1000,
        });

        return h
            .response({
                status: "success",
                message: "User logged in successfully",
                data: {
                    user: {
                        id: data.user.id,
                        username: data.user.user_metadata.username,
                        email: data.user.email,
                    },
                },
            })
            .header("Authorization", `Bearer ${token}`)
            .header("User-Data", JSON.stringify(userData))
            .code(200);
    }

    return h
        .response({
            status: "fail",
            message: "User not found",
        })
        .code(404);
};

const registerHandler = async (request, h) => {
    const { email, username, password } = request.payload;

    if (!email || !username || !password) {
        return h
            .response({
                message: "Please fill in all fields",
            })
            .code(400);
    }

    const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
        options: {
            data: {
                username,
            },
        },
    });

    if (error) {
        if (error.message.includes("User already registered")) {
            return h
                .response({
                    status: "fail",
                    message: "Email is already registered",
                })
                .code(400);
        }

        console.error(error);
        return h
            .response({
                status: "fail",
                message: error.message,
            })
            .code(500);
    }

    return h
        .response({
            status: "success",
            message: "User registered successfully",
            data: {
                user: {
                    id: data.user.id,
                    username: data.user.user_metadata.username,
                    email: data.user.email,
                },
            },
        })
        .code(201);
};

const signoutHandler = async (request, h) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
        return h
            .response({
                status: "fail",
                message: error.message,
            })
            .code(error.status === 400 ? 400 : 500);
    }

    h.unstate("session");
    return h
        .response({
            status: "success",
            message: "User signed out successfully",
        })
        .code(200);
};

const authStatusHandler = async (request, h) => {
    try {
        const token = request.state.session;

        if (!token) {
            console.error("Token is missing or invalid");
            return h
                .response({
                    status: "fail",
                    message: "Token is missing or invalid",
                })
                .code(401);
        }

        const { data, error } = await supabase.auth.getUser(token);

        if (error) {
            console.error("Error from Supabase:", error);
            return h
                .response({
                    status: "fail",
                    message: error.message,
                })
                .code(error.status === 400 ? 400 : 500);
        }

        return h
            .response({
                status: "success",
                message: "User authenticated successfully",
                data: data.user,
            })
            .code(200);
    } catch (err) {
        console.error("Unexpected error:", err);
        return h
            .response({
                status: "error",
                message: "An internal server error occurred",
            })
            .code(500);
    }
};

module.exports = {
    loginHandler,
    registerHandler,
    signoutHandler,
    authStatusHandler,
};

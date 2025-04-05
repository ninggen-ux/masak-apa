const supabase = require("./supabase");

const setupAuthListener = async () => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Auth event: ${event}`);
    if (event === "INITIAL_SESSION") {
      console.log("Initial session detected");
    } else if (event === "SIGNED_IN") {
      console.log("User signed in:", session.user);
    } else if (event === "SIGNED_OUT") {
      console.log("User signed out");
    } else if (event === "PASSWORD_RECOVERY") {
      console.log("Password recovery initiated for user:", session.user);
    } else if (event === "TOKEN_REFRESHED") {
      console.log("Token refreshed for user:", session.user);
    } else if (event === "USER_UPDATED") {
      console.log("User updated:", session.user);
    } else {
      console.log("Unhandled event:", event);
    }
  });
};

module.exports = setupAuthListener;

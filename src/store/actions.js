import auth, { anonymousSignIn } from "../firebase/auth.js";

const actions = {
  AUTH_CHECK({ commit }) {
    auth.onAuthStateChanged(user => {
      if (!user) {
        anon_signin();
      }
      commit("SET_USER", user);
    });
  },

  LOGOUT() {
    auth.signOut();
  }
};

function anon_signin() {
  anonymousSignIn()
    .then(() => {
      console.log("anon auth");
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ...
    });
}

export default actions;

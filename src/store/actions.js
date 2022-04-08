import auth from "../firebase/auth.js";

const actions = {
  AUTH_CHECK({ commit }) {
    console.log("auth check with commit: ", commit);
    auth.onAuthStateChanged(user => {
      console.log("auth state changed: ", user);
      commit("SET_USER", user);
    });
  },

  LOGOUT() {
    auth.signOut();
  }
};

export default actions;

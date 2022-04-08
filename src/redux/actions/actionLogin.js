import { types } from "../types/types";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { google } from "../../firebase/firebaseConfig";

// Create a reference to the cities collection

// Create a query against the collection.

const Errorlogin = (error) => ({
  type: types.login_fallido,
  payload: error,
});

export const loginGoogle = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, google)
      .then(({ user }) => {
        dispatch(LoginS(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const LoginS = (id, displayname, user) => {
  return {
    type: types.login,
    payload: {
      id,
      displayname,
      email: user.email,
    },
  };
};
export const Cargo = (cargo) => {
  return {
    type: types.cargo,
    payload: {
      cargo,
    },
  };
};
const logoutE = () => ({
  type: types.logout,
});

const logout_success = () => ({
  type: types.logout_success,
});

const logout_error = (error) => ({
  type: types.logout_fallido,
  payload: error,
});

export const setuser = (user) => ({
  type: types.set_user,
  payload: user,
});

export const loginEmailPassword = (email, password) => {
  return (dispatch) => {
    // dispatch(loginStart()  );
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(LoginS(user.uid, user.displayName, user));
      })
      .catch((e) => {
        console.log("El usuario no existe");
        dispatch(Errorlogin(e.message));
      });
  };
};
export const logoutInitiate = () => {
  return (dispatch) => {
    dispatch(logoutE());
    const auth = getAuth();
    signOut(auth)
      .then((resp) => {
        dispatch(logout_success(resp));
      })
      .catch((e) => {
        dispatch(logout_error(e.message));
      });
  };
};

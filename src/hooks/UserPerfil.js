import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export const UserPerfil = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [values, setValues] = useState({});

  const datosPerfil = () => {
    if (user !== null) {
      setValues({
        nombre: user.displayName,
        correo: user.email,
        emailVerified: user.emailVerified,
        foto: user.photoURL,
        id: user.uid,
      });
    }
  };

  useEffect(() => {
    datosPerfil();
  }, []);

  return values;
};

export default UserPerfil;

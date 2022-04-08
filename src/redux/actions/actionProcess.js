import { collection, deleteDoc, doc, getDocs, query, where, addDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { typesProcess } from "../types/types"
import Swal from "sweetalert2";



export const searchProcessAsync = (queryprocess) => {
  console.log(queryprocess)
    return async (dispatch) => {
        const getCollection = collection(db, "process")
        // const querySearch = query(getCollection, where("nombre", "==", queryprocess))
        const querySearch = query(getCollection, where("nombre",  '>=', queryprocess, '<', queryprocess + 'z'))
        const datos = await getDocs(querySearch);

        const process = []
        datos.forEach((doc) => {
            let data = doc.data();
            data["id"] = doc.id;
            process.push({
              ...data,
            });
          });
        console.log(process)
        dispatch(searchProcessSync(process))
    }
}

export const searchProcessSync = (process) => {
    return {
        type: typesProcess.searchProcess,
        payload: process
    }
}

export const listProcessAsync = () => {
  return async (dispatch) => {
    
    const querySnapshot = await getDocs(collection(db, "process"));
    const processes = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data["id"] = doc.id;
      processes.push({
        ...data,
      });
    });
    dispatch(listProcessSync(processes));
  };
};

export const listProcessSync = (process) => {
    return {
        type: typesProcess.list,
        payload: process
    }
}


export const editProcessAsync = (id, contentAll) => {
  return async (dispatch) => {
    updateDoc(doc(db, "process", id), contentAll);
    dispatch(editProcessSync(contentAll));
    Swal.fire({

      position: 'center',
      icon: 'success',
      title: 'Proceso editado con éxito.',
      showConfirmButton: true,
      timer: 5000
    })   

    dispatch(listProcessAsync());
    
  };
};

export const editProcessSync = (process) => {
  return {
    type: typesProcess.edit,
    payload: process
  }
}
export const deleteProcess = (id) => {
  return async (dispatch) => {
    deleteDoc(doc(db, "process", id));
    dispatch(deleteProcessSync(id));
    dispatch(listProcessAsync());
  };
};

export const deleteProcessSync = (id) => {
  return {
      type: typesProcess.delete,
      payload: id
  }
}



export const addProcessAsync = (newProcess) => {
  return (dispatch) => {
    
    addDoc(collection(db, "process"), newProcess)
      .then((resp) => {
        dispatch(addProcessSync(newProcess));
        Swal.fire({

            position: 'center',
            icon: 'success',
            title: 'Proceso subido con éxito.',
            showConfirmButton: false,
            timer: 5000
          })  
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const addProcessSync = (process) => {
  return {
    type: typesProcess.add,
    payload: process,
  };
};




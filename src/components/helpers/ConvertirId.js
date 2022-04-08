export const convertirID = (id) =>{
    let code1 = 0
    let code2 = 0
    for(let i = 0; i < id.length; i++){
        if(i%2 === 0){
          code1 += Number(id.charCodeAt(i))
        } else {
          code2 += Number(id.charCodeAt(i))
        }      
    }
    return code1 + "" + code2
  }
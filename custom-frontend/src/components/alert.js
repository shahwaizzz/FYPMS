import Swal from 'sweetalert2'

export const erroralert = (title,message) => {
   return(
    Swal.fire({
        title:title,
        icon: 'error',
        text:message,
        confirmButtonColor:'crimson'
    })
   )  
}

export const successalert = (title,message) => {
    return(
        Swal.fire({
            title:title,
            icon:'success',
            text:message,
            showConfirmButton:false,
            timer:2000
        })
    )
   
}


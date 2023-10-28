document.addEventListener("DOMContentLoaded", () => {
const url = 'https://utn-lubnan-api-1.herokuapp.com';
const urlEmployee = `${url}/api/Employee`;
const urlCompany = `${url}/api/Company`;

const table = document.getElementById('table');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');

const idCompanyRegister = document.getElementById('idCompany');
const nombreRegister = document.getElementById('nombreRegister');
const apellidoRegister = document.getElementById('apellidoRegister');
const emailRegister = document.getElementById('emailRegister');


let empleados = [];
let companys = [];

registerForm.style.display = "none";

function Empleado (companyId, firstName, lastName, email)
{
    this.companyId = companyId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let exitoso = buscarNombreYEmail(inputNombre.value, inputEmail.value, empleados);
    if (exitoso) 
    {
        registerForm.style.display = "block";
        alert("LOGUEO EXITOSO");
    }
    else 
    {
        alert("Los datos no han podido ser encontrados en nuestra base de datos :(");
    }
});
registerForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const emp = new Empleado (idCompanyRegister.value,nombreRegister.value,apellidoRegister.value,emailRegister.value)
    
    empleados.push(emp);
    const empJSON = JSON.stringify(emp);

    postEmployeeObject(empJSON);
})

fetch(urlEmployee)
.then(res => res.json())
.then(data => {
    empleados = data;
    return fetch(urlCompany);
})
.then(resCompany => resCompany.json())
.then (data => {
    companys = data;
    /*Ahora que tengo los respectivos datos (en companys las compañias y en empleados los employes, puedo utilizarlos)*/
    
    empleados.forEach(empleado => {
        const newRow = table.insertRow();

        const idEmpleadoCell = newRow.insertCell();
        idEmpleadoCell.innerHTML = empleado.employeeId; /*Ver en la API cual es el campo.*/
        
        const idCompanyCell = newRow.insertCell();
        idCompanyCell.innerHTML = empleado.companyId;

        const nombreCell = newRow.insertCell();
        nombreCell.innerHTML = empleado.firstName;

        const apellidoCell = newRow.insertCell();
        apellidoCell.innerHTML = empleado.lastName;

        const emailCell = newRow.insertCell();
        emailCell.innerHTML = empleado.email;

        const nombreCompanyCell = newRow.insertCell();
        nombreCompanyCell.innerHTML = asignarCompanyEmployee(empleado.companyId,companys);
    })
    /*Le paso la ID de la compania que tiene el empleado y el arreglo con todas las compañias para obtener el nombre de la compañia del empleado*/
    /*Recorro el array de compañias y si la id de la company (endpoint diferente), es igual a la que tiene el empleado*/
    /*Se le agrega al nombre retorno el nombre de esa compañia, ya que es la que le corresponde al empelado.*/   
function asignarCompanyEmployee (idEmployeeCompany,compañia)
{
   let nombreRetorno = "";
   
   compañia.forEach(idCompany => {
    if(idCompany.companyId === idEmployeeCompany)
    {
        nombreRetorno = idCompany.name; /*Fijarse API nombre de los campos*/ 
    }
   })
   return nombreRetorno;
}
})
function buscarNombreYEmail(nombre, email, empleados) 
{
    for (const empleado of empleados) 
    {
        if (empleado.firstName === nombre && empleado.email === email) 
        {
            return true;
        }
    }
        return false;
}

let empleadoNuevo = {
    companyId: 9,
    firstName: "Tomas",
    lastName: "Rosa",
    email: "tomasrosa@live.com.ar"
}
let empleadoNuevo2 = {
    companyId: 10,
    firstName: "Floky",
    lastName: "Rosa",
    email: "floky@live.com.ar"
}
empleados.push(empleadoNuevo);

async function postEmployee (empleado)
{
    const opciones = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(empleado)
    }

    const response = await fetch(urlEmployee,opciones);

    if(response.status === 200)
    {
        console.log("Empleado agregado correctamente. ");
    }
    else
    {
        console.log("Hubo un error al agregar un empleado. ");
    }
}
async function postEmployeeObject (empJSON)
{
    const opciones = {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: empJSON
    }

    const response = await fetch(urlEmployee,opciones);

    if(response.status === 200)
    {
        console.log("Empleado agregado correctamente. ");
    }
    else
    {
        console.log("Hubo un error al agregar un empleado. ");
    }
}

async function deleteEmployee(pos)
{
    const urlDelete = `${urlEmployee}/${pos}`;

    let response = await fetch(urlDelete, {
        method: "DELETE"
    })

    if(response.ok)
    {
        console.log("Eliminado correctamente. ");
    }
    else
    {
        console.log("Error al eliminar. ");
    }
}
postEmployee(empleadoNuevo2);
postEmployee(empleadoNuevo);
deleteEmployee(18);
})

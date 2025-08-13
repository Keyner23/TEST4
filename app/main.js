const $get = document.getElementById("get")
const $btn = document.getElementById("crear-usuario")
const $api = "http://localhost:3000/users"
const $apiPost = "http://localhost:3000/createuser"
const table = document.getElementById("users-get")
const save = document.getElementById("create-user")

save.addEventListener("click", async function () {
    const id = document.getElementById("id").value
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const address = document.getElementById("adrress").value
    const phone = document.getElementById("phone").value

    // usamos el metodo post del endpoint que levantamos
    try {
        const response = await fetch($apiPost, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ id, name, email, address, phone })
        });


        const data = await response.json();

        // console.log("Respuesta del servidor:", data);
        alert(data.mensaje || "Datos insertados"); //mostramos la alerta de que se creo 
    }
    catch (error) {
        alert("Error al enviar los datos:", error);
    }
})



$get.addEventListener("click", async function () {
    try {
        const resp = await fetch($api);
        const users = await resp.json();
        table.innerHTML = ""
        users.forEach(user => {

            table.innerHTML += `
                <tr>
                    <td>${user.identification_number}</td>
                    <td>${user.name}</td>
                    <td>${user.address}</td>
                    <td>${user.phone}</td>
                    <td>${user.email}</td>
                    <td><button id="clear" type="button" class="btn btn-danger">Eliminar</button></td>
                    <td><button type="button" class="btn btn-info">Editar</button></td>
                </tr>`
        });

    } catch {
        alert("no se pudieron traer los usuarios")
    }
});

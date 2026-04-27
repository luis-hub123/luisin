// IMPORTAR FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// CONFIGURACIÓN
const firebaseConfig = {
  apiKey: "AIzaSyA1wUyh8ir3D0Sy2AF-L34Y5q1i5bv6fU0",
  authDomain: "crud-firebase-app3.firebaseapp.com",
  projectId: "crud-firebase-app3",
  storageBucket: "crud-firebase-app3.firebasestorage.app",
  messagingSenderId: "190325391680",
  appId: "1:190325391680:web:12f4a09aab216e64f13aa5"
};

// INICIALIZAR
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// REFERENCIA
const productosRef = collection(db, "productos");

// VARIABLE PARA EDITAR
let idEditar = null;

// AGREGAR
window.agregarProducto = async () => {
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;

    if (!nombre || !precio) {
        alert("Llena todos los campos");
        return;
    }

    await addDoc(productosRef, { nombre, precio });

    limpiarInputs();
    mostrarProductos();
};

// MOSTRAR
async function mostrarProductos() {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    const querySnapshot = await getDocs(productosRef);

    querySnapshot.forEach((docu) => {
        tabla.innerHTML += `
            <tr>
                <td>${docu.data().nombre}</td>
                <td>${docu.data().precio}</td>
                <td>
                    <button onclick="cargarProducto('${docu.id}', '${docu.data().nombre}', '${docu.data().precio}')">Editar</button>
                    <button onclick="eliminarProducto('${docu.id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// CARGAR DATOS PARA EDITAR
window.cargarProducto = (id, nombre, precio) => {
    document.getElementById("nombre").value = nombre;
    document.getElementById("precio").value = precio;
    idEditar = id;
};

// EDITAR
window.editarProducto = async () => {
    if (!idEditar) {
        alert("Selecciona un producto primero");
        return;
    }

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;

    await updateDoc(doc(db, "productos", idEditar), {
        nombre,
        precio
    });

    alert("Producto actualizado");

    idEditar = null;
    limpiarInputs();
    mostrarProductos();
};

// ELIMINAR
window.eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
    mostrarProductos();
};

// BUSCAR
window.buscarProducto = () => {
    const filtro = document.getElementById("buscar").value.toLowerCase();
    const filas = document.querySelectorAll("#tabla tr");

    filas.forEach(fila => {
        const texto = fila.innerText.toLowerCase();
        fila.style.display = texto.includes(filtro) ? "" : "none";
    });
};

// LIMPIAR INPUTS
function limpiarInputs() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
}

// INICIAR
mostrarProductos();
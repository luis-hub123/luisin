// IMPORTAR FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1wUyh8ir3D0Sy2AF-L34Y5q1i5bv6fU0",
  authDomain: "crud-firebase-app3.firebaseapp.com",
  projectId: "crud-firebase-app3",
  storageBucket: "crud-firebase-app3.firebasestorage.app",
  messagingSenderId: "190325391680",
  appId: "1:190325391680:web:12f4a09aab216e64f13aa5"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// REFERENCIA A LA COLECCIÓN
const productosRef = collection(db, "productos");

// AGREGAR PRODUCTO
window.agregarProducto = async () => {
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;

    await addDoc(productosRef, {
        nombre: nombre,
        precio: precio
    });

    alert("Producto agregado");
    mostrarProductos();
};

// MOSTRAR PRODUCTOS
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
                    <button onclick="eliminarProducto('${docu.id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

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

// INICIAR
mostrarProductos();
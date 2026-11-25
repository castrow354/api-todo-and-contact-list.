const API_URL = '/tareas';
const textbox = document.getElementById('todo-title');
const datePicker = document.getElementById('date-picker');
const btnAgregar = document.getElementById('btn-agregar');
const todoList = document.getElementById('todo-list');
let editId = null;

cargarTareas();

async function cargarTareas() {
    const res = await fetch(API_URL);
    const tareas = await res.json();
    todoList.innerHTML = '';

    tareas.forEach(tarea => {
        const div = document.createElement('div');
        div.className = 'tarea-item';

        const span = document.createElement('span');
        span.textContent = `${tarea.title} ${tarea.dueDate ? '- ' + tarea.dueDate : ''}`;
        if (tarea.completada) span.classList.add('completada');
        span.style.cursor = 'pointer';
        span.onclick = () => toggleCompletada(tarea);

        const acciones = document.createElement('div');
        acciones.className = 'acciones';

        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Editar';
        btnEdit.className = 'btn-edit';
        btnEdit.onclick = () => {
            textbox.value = tarea.title;
            datePicker.value = tarea.dueDate;
            editId = tarea.id;
            btnAgregar.textContent = 'Actualizar';
        };

        const btnDel = document.createElement('button');
        btnDel.textContent = 'Eliminar';
        btnDel.className = 'btn-del';
        btnDel.onclick = () => eliminarTarea(tarea.id);

        acciones.append(btnEdit, btnDel);
        div.append(span, acciones);
        todoList.appendChild(div);
    });
}

btnAgregar.onclick = async () => {
    const title = textbox.value.trim();
    const dueDate = datePicker.value;
    if (!title) return alert('Escribe una tarea');

    if (editId) {
        await fetch(`${API_URL}/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, dueDate })
        });
        editId = null;
        btnAgregar.textContent = 'Añadir';
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, dueDate })
        });
    }
    textbox.value = '';
    datePicker.value = '';
    cargarTareas();
};

async function toggleCompletada(tarea) {
    await fetch(`${API_URL}/${tarea.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completada: !tarea.completada })
    });
    cargarTareas();
}

async function eliminarTarea(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    cargarTareas();
}

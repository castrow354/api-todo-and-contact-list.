const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Datos iniciales en memoria
let tareas = [
    { id: 1, title: 'Aprender Express', dueDate: '2026-11-25', completada: false },
    { id: 2, title: 'Conectar Frontend con API', dueDate: '2026-11-26', completada: false }
];

let contactos = [
    {
        id: 1,
        firstName: 'William',
        lastName: 'Castro',
        phone: '3153942569',
        city: 'Cali',
        address: 'avenida 7oeste-26A-132',
        gender: 'Male'
    }
];

// ================= RUTAS TAREAS =================
app.get('/tareas', (req, res) => {
    res.json(tareas);
});

app.post('/tareas', (req, res) => {
    const { title, dueDate } = req.body;
    if (!title) return res.status(400).json({ error: 'Título obligatorio' });
    const nueva = { id: Date.now(), title, dueDate: dueDate || '', completada: false };
    tareas.push(nueva);
    res.status(201).json(nueva);
});

app.put('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return res.status(404).json({ error: 'No encontrada' });
    tarea.title = req.body.title ?? tarea.title;
    tarea.dueDate = req.body.dueDate ?? tarea.dueDate;
    tarea.completada = req.body.completada ?? tarea.completada;
    res.json(tarea);
});

app.delete('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: 'No encontrada' });
    tareas.splice(index, 1);
    res.status(204).send();
});

// ================= RUTAS CONTACTOS =================
app.get('/contactos', (req, res) => {
    res.json(contactos);
});

app.post('/contactos', (req, res) => {
    const { firstName, lastName, phone, city, address, gender } = req.body;
    if (!firstName || !lastName) return res.status(400).json({ error: 'Nombre y apellido obligatorios' });
    const nuevo = {
        id: Date.now(),
        firstName,
        lastName,
        phone: phone || '',
        city: city || '',
        address: address || '',
        gender: gender || 'Male'
    };
    contactos.push(nuevo);
    res.status(201).json(nuevo);
});

app.put('/contactos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const contacto = contactos.find(c => c.id === id);
    if (!contacto) return res.status(404).json({ error: 'No encontrado' });
    Object.assign(contacto, req.body);
    res.json(contacto);
});

app.delete('/contactos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = contactos.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: 'No encontrado' });
    contactos.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

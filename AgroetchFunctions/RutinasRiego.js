const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarID() {
  return uuidv4();
}

// Función para agregar una nueva rutina de riego
async function addRutinaRiego(req, res, data) {
    const rutina_id = generarID(); // Generar un nuevo ID para la rutina de riego
    
    const Script = 'INSERT INTO riego (rid, bid, activado, desactivado, ciclos) VALUES ($1, $2, $3, $4, $5)';
    
    try {
        // Ejecutar la consulta para agregar la rutina de riego a la tabla "riego"
        await connection.query(Script, [rutina_id, data.BID, data.Activado, data.Desactivado, data.Ciclos]);
        console.log('Rutina de riego agregada correctamente');
        res.status(201).json({ message: 'Rutina de riego agregada correctamente', rutina_id: rutina_id });
    } catch (error) {
        console.error('Error al agregar la rutina de riego', error);
        res.status(500).json({ error: 'Error de servidor al agregar la rutina de riego' });
    }
}

// Función para obtener todas las rutinas de riego
async function getRutinasRiego(req, res) {
    const Script = 'SELECT * FROM riego';
    
    try {
        // Ejecutar la consulta para obtener todas las rutinas de riego de la tabla "riego"
        const result = await connection.query(Script);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener las rutinas de riego', error);
        res.status(500).json({ error: 'Error de servidor al obtener las rutinas de riego' });
    }
}

// Función para obtener una rutina de riego por su ID
async function getRutinaRiegoById(req, res, rutina_id) {
    const Script = 'SELECT * FROM riego WHERE rid = $1';
    
    try {
        // Ejecutar la consulta para obtener la rutina de riego con el ID especificado de la tabla "riego"
        const result = await connection.query(Script, [rutina_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Rutina de riego no encontrada' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener la rutina de riego', error);
        res.status(500).json({ error: 'Error de servidor al obtener la rutina de riego' });
    }
}

// Función para actualizar una rutina de riego por su ID
async function updateRutinaRiego(req, res, rutina_id, data) {
    const Script = 'UPDATE riego SET bid = $1, activado = $2, desactivado = $3, ciclos = $4 WHERE rid = $5';
    
    try {
        // Ejecutar la consulta para actualizar la rutina de riego con el ID especificado en la tabla "riego"
        await connection.query(Script, [data.BID, data.Activado, data.Desactivado, data.Ciclos, rutina_id]);
        console.log('Rutina de riego actualizada correctamente');
        res.status(200).json({ message: 'Rutina de riego actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la rutina de riego', error);
        res.status(500).json({ error: 'Error de servidor al actualizar la rutina de riego' });
    }
}

// Función para eliminar una rutina de riego por su ID
async function deleteRutinaRiego(req, res, rutina_id) {
    const Script = 'DELETE FROM riego WHERE rid = $1';
    
    try {
        // Ejecutar la consulta para eliminar la rutina de riego con el ID especificado de la tabla "riego"
        await connection.query(Script, [rutina_id]);
        console.log('Rutina de riego eliminada correctamente');
        res.status(200).json({ message: 'Rutina de riego eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la rutina de riego', error);
        res.status(500).json({ error: 'Error de servidor al eliminar la rutina de riego' });
    }
}

//crear una function para obtener



module.exports = {
    addRutinaRiego, getRutinasRiego, getRutinaRiegoById, updateRutinaRiego, deleteRutinaRiego
};


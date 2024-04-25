const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarID() {
  return uuidv4();
}

// Función para agregar una nueva cepa
async function addSensor(req, res, data) {
    const sensor_id = generarID(); // Generar un nuevo ID para la cepa
    
    const Script = 'INSERT INTO sensores (sid, uid, nombre) VALUES ($1, $2, $3)';
    
    try {
        // Ejecutar la consulta para agregar la cepa a la tabla "cepas"
        await connection.query(Script, [sensor_id, data.UID, data.Nombre]);
        console.log('Sensor agregado correctamente');
        res.status(201).json({ message: 'Sensor agregado correctamente', sensor_id: sensor_id });
    } catch (error) {
        console.error('Error al agregar la cepa', error);
        res.status(500).json({ error: 'Error de servidor al agregar la cepa' });
    }
}

// Función para obtener todos los sensores
async function getAllSensors(req, res) {
    const Script = 'SELECT * FROM sensores';

    try {
        // Ejecutar la consulta para obtener todos los sensores de la tabla "sensores"
        const result = await connection.query(Script);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener los sensores', error);
        res.status(500).json({ error: 'Error de servidor al obtener los sensores' });
    }
}

// Función para obtener un sensor por su ID
async function getSensorById(req, res, sensor_id) {
    const Script = 'SELECT * FROM sensores WHERE sid = $1';

    try {
        // Ejecutar la consulta para obtener el sensor por su ID de la tabla "sensores"
        const result = await connection.query(Script, [sensor_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Sensor no encontrado' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener el sensor', error);
        res.status(500).json({ error: 'Error de servidor al obtener el sensor' });
    }
}

// Función para actualizar un sensor por su ID
async function updateSensorById(req, res, data, sid) {

    const Script = 'UPDATE sensores SET sid = $1, nombre = $2 WHERE uid = $3';

    try {
        // Ejecutar la consulta para actualizar el sensor por su ID en la tabla "sensores"
        await connection.query(Script, [sid, data.Nombre, data.UID]);
        res.status(200).json({ message: 'Sensor actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el sensor', error);
        res.status(500).json({ error: 'Error de servidor al actualizar el sensor' });
    }
}

// Función para eliminar un sensor por su ID
async function deleteSensorById(req, res, id) {
    
    const Script = 'DELETE FROM sensores WHERE sid = $1';

    try {
        // Ejecutar la consulta para eliminar el sensor por su ID de la tabla "sensores"
        await connection.query(Script, [id]);
        res.status(200).json({ message: 'Sensor eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el sensor', error);
        res.status(500).json({ error: 'Error de servidor al eliminar el sensor' });
    }
}

module.exports = {
    addSensor,
    getAllSensors,
    getSensorById,
    updateSensorById,
    deleteSensorById
};

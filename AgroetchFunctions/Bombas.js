const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarID() {
  return uuidv4();
}
// Función para agregar una nueva bomba
async function addBomba(req, res, data) {
    const bomba_id = generarID(); // Generar un nuevo ID para la bomba
    
    const Script = 'INSERT INTO bombas (bid, pid) VALUES ($1, $2)';
    
    try {
        // Ejecutar la consulta para agregar la bomba a la tabla "bombas"
        await connection.query(Script, [bomba_id, data.pid]);
        console.log('Bomba agregada correctamente');
        res.status(201).json({ message: 'Bomba agregada correctamente', bomba_id: bomba_id });
    } catch (error) {
        console.error('Error al agregar la bomba', error);
        res.status(500).json({ error: 'Error de servidor al agregar la bomba' });
    }
}

// Función para obtener todas las bombas
async function getBombas(req, res) {
    const Script = 'SELECT * FROM bombas';
    
    try {
        // Ejecutar la consulta para obtener todas las bombas de la tabla "bombas"
        const result = await connection.query(Script);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener las bombas', error);
        res.status(500).json({ error: 'Error de servidor al obtener las bombas' });
    }
}

// Función para obtener una bomba por su ID
async function getBombaById(req, res, bomba_id) {
    const Script = 'SELECT * FROM bombas WHERE bid = $1';
    
    try {
        // Ejecutar la consulta para obtener la bomba con el ID especificado de la tabla "bombas"
        const result = await connection.query(Script, [bomba_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Bomba no encontrada' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener la bomba', error);
        res.status(500).json({ error: 'Error de servidor al obtener la bomba' });
    }
}

//function para delete bomba
// Función para eliminar un sensor por su ID
async function deleteBombaById(req, res, id) {
    
    const Script = 'DELETE FROM bombas WHERE bid = $1';

    try {
        // Ejecutar la consulta para eliminar el sensor por su ID de la tabla "sensores"
        await connection.query(Script, [id]);
        res.status(200).json({ message: 'Bomba eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar el sensor', error);
        res.status(500).json({ error: 'Error de servidor al eliminar el sensor' });
    }
}

module.exports = {
    addBomba,
    getBombas,
    getBombaById,
    deleteBombaById
};

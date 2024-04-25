const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarID() {
  return uuidv4();
}

// Función para agregar una nueva parcela
async function addParcela(req, res, data) {
    const parcela_id = generarID(); // Generar un nuevo ID para la parcela
    
    const Script = 'INSERT INTO parcela (pid, uid, etiqueta, instrucciones) VALUES ($1, $2, $3, $4)';
    
    try {
        // Ejecutar la consulta para agregar la parcela a la tabla "parcela"
        await connection.query(Script, [parcela_id, data.UID, data.Etiqueta, data.Instrucciones]);
        console.log('Parcela agregada correctamente');
        res.status(201).json({ message: 'Parcela agregada correctamente', parcela_id: parcela_id });
    } catch (error) {
        console.error('Error al agregar la parcela', error);
        res.status(500).json({ error: 'Error de servidor al agregar la parcela' });
    }
}

// Función para obtener todas las parcelas
async function getParcelas(req, res) {
    const Script = 'SELECT * FROM parcela';
    
    try {
        // Ejecutar la consulta para obtener todas las parcelas de la tabla "parcela"
        const result = await connection.query(Script);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener las parcelas', error);
        res.status(500).json({ error: 'Error de servidor al obtener las parcelas' });
    }
}

// Función para obtener una parcela por su ID
async function getParcelaById(req, res, parcela_id) {
    const Script = 'SELECT * FROM parcela WHERE pid = $1';
    
    try {
        // Ejecutar la consulta para obtener la parcela con el ID especificado de la tabla "parcela"
        const result = await connection.query(Script, [parcela_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Parcela no encontrada' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener la parcela', error);
        res.status(500).json({ error: 'Error de servidor al obtener la parcela' });
    }
}

// Función para actualizar una parcela por su ID
async function updateParcela(req, res, parcela_id, data) {
    const Script = 'UPDATE parcela SET etiqueta = $1, instrucciones = $2 WHERE pid = $3';
    
    try {
        // Ejecutar la consulta para actualizar la parcela con el ID especificado en la tabla "parcela"
        await connection.query(Script, [data.Etiqueta, data.Instrucciones, parcela_id]);
        console.log('Parcela actualizada correctamente');
        res.status(200).json({ message: 'Parcela actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la parcela', error);
        res.status(500).json({ error: 'Error de servidor al actualizar la parcela' });
    }
}

// Función para eliminar una parcela por su ID
async function deleteParcela(req, res, parcela_id) {
    const Script = 'DELETE FROM parcela WHERE pid = $1';
    
    try {
        // Ejecutar la consulta para eliminar la parcela con el ID especificado de la tabla "parcela"
        await connection.query(Script, [parcela_id]);
        console.log('Parcela eliminada correctamente');
        res.status(200).json({ message: 'Parcela eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la parcela', error);
        res.status(500).json({ error: 'Error de servidor al eliminar la parcela' });
    }
}

module.exports = {
    addParcela,
    getParcelas,
    getParcelaById,
    updateParcela,
    deleteParcela
};

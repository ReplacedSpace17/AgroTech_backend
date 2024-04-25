const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

const axios = require('axios');

function generarID() {
  return uuidv4();
}

// Función para agregar un nuevo registro de monitoreo
async function addMonitoreo(req, res, data) {
    console.log('Insertando registro de monitoreo:', data);
    const monitoreo_id = generarID(); // Generar un nuevo ID para el registro de monitoreo
    
    const Script = 'INSERT INTO monitoreo (mid, sid, pid, valor, fecha, hora) VALUES ($1, $2, $3, $4, $5, $6)';
    
    try {
        // Ejecutar la consulta para agregar el registro de monitoreo a la tabla "monitoreo"
        await connection.query(Script, [monitoreo_id, data.sid, data.pid, data.valor, data.fecha, data.hora]);
        console.log('Registro de monitoreo agregado correctamente');
        res.status(201).json({ message: 'Registro de monitoreo agregado correctamente', monitoreo_id: monitoreo_id });
    } catch (error) {
        console.error('Error al agregar el registro de monitoreo', error);
        res.status(500).json({ error: 'Error de servidor al agregar el registro de monitoreo' });
    }
}

// Función para obtener todos los registros de monitoreo
async function getAllMonitoreo(req, res) {
    const Script = 'SELECT * FROM monitoreo';

    try {
        // Ejecutar la consulta para obtener todos los registros de monitoreo de la tabla "monitoreo"
        const result = await connection.query(Script);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener los registros de monitoreo', error);
        res.status(500).json({ error: 'Error de servidor al obtener los registros de monitoreo' });
    }
}

// Función para obtener un registro de monitoreo por su ID
async function getMonitoreoById(req, res, monitoreo_id) {
    const Script = 'SELECT * FROM monitoreo WHERE mid = $1';

    try {
        // Ejecutar la consulta para obtener el registro de monitoreo por su ID de la tabla "monitoreo"
        const result = await connection.query(Script, [monitoreo_id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Registro de monitoreo no encontrado' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener el registro de monitoreo', error);
        res.status(500).json({ error: 'Error de servidor al obtener el registro de monitoreo' });
    }
}

// Función para actualizar un registro de monitoreo por su ID
async function updateMonitoreoById(req, res, data, mid) {

    const Script = 'UPDATE monitoreo SET mid = $1, sid = $2, pid = $3, valor = $4, fecha = $5, hora = $6 WHERE mid = $7';

    try {
        // Ejecutar la consulta para actualizar el registro de monitoreo por su ID en la tabla "monitoreo"
        await connection.query(Script, [mid, data.sid, data.pid, data.valor, data.fecha, data.hora, mid]);
        res.status(200).json({ message: 'Registro de monitoreo actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el registro de monitoreo', error);
        res.status(500).json({ error: 'Error de servidor al actualizar el registro de monitoreo' });
    }
}

// Función para eliminar un registro de monitoreo por su ID
async function deleteMonitoreoById(req, res, id) {
    
    const Script = 'DELETE FROM monitoreo WHERE mid = $1';

    try {
        // Ejecutar la consulta para eliminar el registro de monitoreo por su ID de la tabla "monitoreo"
        await connection.query(Script, [id]);
        res.status(200).json({ message: 'Registro de monitoreo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el registro de monitoreo', error);
        res.status(500).json({ error: 'Error de servidor al eliminar el registro de monitoreo' });
    }
}

async function generateAndInsertHumidityData(req, res, numRecords) {
    const sid = '2dfd4468-b70e-4362-bff1-5d50e0221a9b';
    const pid = '9b6f720e-6b56-4a30-ac0c-404da1a46bb0';

    const startDate = new Date('2024-04-24T06:00:00Z');
    const endDate = new Date('2024-04-25T06:16:24Z');

    for (let i = 0; i < numRecords; i++) {
        const valor = Math.round(Math.random() * 100); // Valor de humedad entre 0 y 100
        const date = randomDate(startDate, endDate);
        const fecha = date.toISOString().split('T')[0];
        const hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        const JSON = {
            sid: sid,
            pid: pid,
            valor: valor,
            fecha: fecha,
            hora: hora
        };

        try {
            await addMonitoreo(req, res, JSON);
            console.log(`Registro ${i + 1} de ${numRecords} insertado correctamente en monitoreo.`);
        } catch (error) {
            console.error(`Error al insertar el registro ${i + 1} en monitoreo:`, error);
        }
    }

    console.log(`Todos los registros (${numRecords}) insertados correctamente.`);
}

// Función para generar una fecha aleatoria dentro de un rango específico
function randomDate(start, end) {
    const diff = end.getTime() - start.getTime();
    const randomTime = start.getTime() + Math.random() * diff;
    const randomDate = new Date(randomTime);
    return randomDate;
}


//crear una funciion para obtener todos los registros de monitoreo cuando el sid sea "dsds"
async function getMonitoreoBySid(req, res) {
    const Script = 'SELECT * FROM monitoreo WHERE sid = $1';
    const sid = "2dfd4468-b70e-4362-bff1-5d50e0221a9b";
    try {
        // Ejecutar la consulta para obtener el registro de monitoreo por su ID de la tabla "monitoreo"
        const result = await connection.query(Script, [sid]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Registro de monitoreo no encontrado' });
        } else {
            //res.status(200).json(result.rows);
            try {
                // JSON que deseas enviar en el cuerpo de la solicitud
            
          
                // Realizar una solicitud POST al otro servidor usando axios
                const response = await axios.post('http://127.0.0.1:5000/CreateRutinaRiego', result.rows);
                const responseData = response.data;
          
                // Enviar la respuesta del servidor remoto como respuesta a la solicitud actual
                res.json(responseData);
            } catch (error) {
                console.error('Error al realizar la solicitud:', error.message);
                res.status(500).json({ error: 'Error al realizar la solicitud' });
            }
        }
    } catch (error) {
        console.error('Error al obtener el registro de monitoreo', error);
        res.status(500).json({ error: 'Error de servidor al obtener el registro de monitoreo' });
    }
}



module.exports = {
    addMonitoreo,
    getAllMonitoreo,
    getMonitoreoById,
    updateMonitoreoById,
    deleteMonitoreoById,
    generateAndInsertHumidityData,
    getMonitoreoBySid
};


// JSON para agregar un monitoreo



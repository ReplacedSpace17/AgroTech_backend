const fs = require('fs');

function generateHumidityData(numRecords, outputFile) {
    const data = [];
    const sid = '2dfd4468-b70e-4362-bff1-5d50e0221a9b';
    const pid = '9b6f720e-6b56-4a30-ac0c-404da1a46bb0';

    for (let i = 0; i < numRecords; i++) {
        const valor = Math.round(Math.random() * 100); // Valor de humedad entre 0 y 100

        // Generar una fecha y hora aleatoria dentro de un rango específico
        const date = randomDate(new Date('2024-02-01T00:00:00Z'), new Date('2024-02-28T23:59:59Z'));
        const fecha = date.toISOString().split('T')[0]; // Obtener solo la fecha (YYYY-MM-DD)
        const hora = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; // Obtener la hora (HH:MM:SS)

        const record = {
            sid: sid,
            pid: pid,
            valor: valor,
            fecha: fecha,
            hora: hora
        };

        data.push(record);
    }

    fs.writeFileSync(outputFile, JSON.stringify(data, null, 4));
    console.log(`Archivo JSON generado con ${numRecords} registros.`);
}

// Función auxiliar para generar una fecha aleatoria entre dos fechas dadas
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = generateHumidityData;

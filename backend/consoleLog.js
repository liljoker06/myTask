const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs.txt');

const logMessage = (type, message, data = null) => {
    const timestamp = new Date().toISOString();
    const logType = type.toUpperCase();
    const logData = data ? JSON.stringify(data, null, 2) : '';
    const logEntry = `[${timestamp}] [${logType}] ${message} ${logData}\n`;
    
    // Afficher dans la console
    console.log(logEntry);
    
    // Écrire dans un fichier log
    fs.appendFileSync(logFilePath, logEntry, 'utf8');
};

module.exports = {
    info: (message, data = null) => logMessage('info', message, data),
    error: (message, data = null) => logMessage('error', message, data),
    debug: (message, data = null) => logMessage('debug', message, data),
};

require('dotenv').config();

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const initVector = Buffer.from(process.env.INITVECTOR, 'hex');
const SecurityKey = Buffer.from(process.env.SECURITYKEY, 'hex');

exports.encrypt = async (data) => {
    try {
        const cipher = crypto.createCipheriv(algorithm, SecurityKey, initVector);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        return encrypted.toString('hex');
    } catch (error) {
        console.log(error);
    }
}

exports.decrypt = async (data) => {
    try {
        const encryptedText = Buffer.from(data, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, SecurityKey, initVector);
        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        console.log(error);
    }
}
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
// const { dotenv } = pkg;

dotenv.config();

const dbConnect = async () => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOSTNAME,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        return connection;
    }
    catch (err) {
        console.log(`Error connecting to database: ${err}`);
        return null;
    }
};

export { dbConnect };
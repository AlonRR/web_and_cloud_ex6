import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


const dbConnect = async () => {
    let connection;
    dotenv.config();
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
        console.log(`Connected to database`);
        return connection;
    }
    catch (err) {
        console.log(`Error connecting to database: ${err}`);
        return null;
    }
};

const dbMiddleware = async (req, res, next) => {
    try {
        req.context = {
            connection: await dbConnect()
        };
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default dbMiddleware;
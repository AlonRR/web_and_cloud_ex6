const checkIfVacationExists = async (req, res, next) => {
    const { connection: dbConnect } = req.context;
    try {
        const { id } = req.params;
        const [rows] = await dbConnect.execute(
            `SELECT * FROM tbl_17_vacations WHERE vacation_id = ?`, [id]
        );
        if (rows.length === 0) {
            throw new Error(`Vacation ID ${id} not found`);
        }
        next();
    }
    catch (err) {
        res.status(404).send(err.message);
    }
    finally {
        dbConnect.end();
    }
};

const getAllVacations = async (req, res) => {
    const { connection: dbConnect } = req.context;
    try {
        const [rows] = await dbConnect.execute(
            `SELECT * FROM tbl_17_vacations`
        );
        if (rows.length === 0) {
            throw new Error(`No vacations found`);
        }
        res.status(200).send(rows);
    }
    catch (err) {
        console.log(`Error: ${err}`);
        res.status(404).send(err.message);
    }
    finally {
        dbConnect.end();
    }
};

const getVacationById = async (req, res) => {
    const { connection: dbConnect } = req.context;
    try {
        const { id } = req.params;
        const [rows] = await dbConnect.execute(
            `SELECT * FROM tbl_17_vacations WHERE vacation_id = ?`, [id]
        );
        res.send(rows);
    }
    catch (err) {
        res.status(404).send(err.message);
    }
    finally {
        dbConnect.end();
    }
};

const createVacation = async (req, res) => {
    const { connection: dbConnect } = req.context;
    try {
        const { name, location, price, imageUrl } = req.body;
        if (!(name && location && price && imageUrl)) {
            throw new Error(`Please provide name, location, price, and imageUrl`);
        }
        const [result] = await dbConnect.execute(
            `INSERT INTO tbl_17_vacations (name, location, price, image_url) VALUES (?, ?, ?, ?)`,
            [name, location, price, imageUrl]
        );
        if (result.affectedRows === 0) {
            throw new Error(`Vacation not created`);
        }
        res.send(result);
    }
    catch (err) {
        res.status(404).send(err.message);
    }
    finally {
        dbConnect.end();
    }
};

const updateVacation = async (req, res) => {
    const { connection: dbConnect } = req.context;
    try {
        const vacationId = req.params.id;
        const { name, location, price, imageUrl } = req.body;
        if (!(name && location && price && imageUrl)) {
            throw new Error(`Please provide name, location, price, and imageUrl`);
        }
        const [result] = await dbConnect.execute(
            `UPDATE tbl_17_vacations SET name = ?, location = ?, price = ?, image_url = ? WHERE vacation_id = ?`,
            [name, location, price, imageUrl, vacationId]
        );
        if (result.affectedRows === 0) {
            throw new Error(`vacation ID ${req.params.id} not found`);
        }
        res.send(result);
    }
    catch (err) {
        res.status(404).send(err.message);
    }
    finally {
        dbConnect.end();
    }
};

const deleteVacation = async (req, res) => {
    const { connection: dbConnect } = req.context;
    try {
        const { id } = req.params;
        const [result] = await dbConnect.execute(
            `DELETE FROM tbl_17_vacations WHERE vacation_id = ?`,
            [id]
        );
        res.send(result);
    }
    catch (err) {
        res.status(404).send(err.message);
    }
    finally {
        dbConnect.end();
    }
};

const vacationController = {
    getAllVacations,
    getVacationById,
    createVacation,
    updateVacation,
    deleteVacation,
    checkIfVacationExists
};

export default vacationController;


const pool = require("../db/db");

// GET courses
const getCourses = async (req, res) => {
    try {
        const sql = 'SELECT * FROM course';
        const results = await pool.query(sql);
        res.json(results.rows);
    } catch (err) {
        res.status(500).send(err);
    }
};

// POST course
const addCourse = async (req, res) => {
    const { coursename, coursecode, credits, description, image } = req.body;

    const insert_query = 'INSERT INTO course(coursename, coursecode, credits, description, image) VALUES($1, $2, $3, $4, $5) RETURNING *';

    try {
        const result = await pool.query(insert_query, [coursename, coursecode, credits, description, image]);
        console.log(result);
        res.status(201).json({ message: "Course added successfully", course: result.rows[0] });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Updating course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { coursename, coursecode, credits, description, image } = req.body;

    const sql = `UPDATE course SET coursename = $1, coursecode = $2, credits = $3, description = $4, image = $5 WHERE id = $6 RETURNING *`;

    try {
        const results = await pool.query(sql, [coursename, coursecode, credits, description, image, id]);
        if (results.rowCount === 0) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json({ message: "Course updated successfully", course: results.rows[0] });
    } catch (err) {
        res.status(500).json({ error: "Failed to update course" });
    }
};

// Delete course
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM course WHERE id = $1 RETURNING *`;

    try {
        const results = await pool.query(sql, [id]);
        if (results.rowCount === 0) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse,
};
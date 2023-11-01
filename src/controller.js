import {pool} from './database.js';

class LibroController{

    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            console.log('ERROR: No se pudo obtener la lista:', error);
            res.status(500).json({ error: 'No se pudo obtener la lista de libros' });
        }
    }

    async getOne(req, res) {
        const libroId = req.params.id; 
        try {
            const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [libroId]);
            res.json(result);
        } catch (error) {
            console.log('ERROR: No se pudo obtener el libro por ID:', error);
            res.status(500).json({ error: 'No se pudo obtener el libro por ID' });
        }
    }

    async add(req, res){
        const libro = req.body;
        try {
            const [result] = await pool.query(`INSERT INTO libros (nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN]);
        res.json({"id insertado": result.insertId});
        }catch (error){
            console.log ('ERROR: El libro no pudo ser agregado:', error);
        }
        
    }

    async delete(req, res){
        const libro = req.body;
        try {
            const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [libro.ISBN]);
        res.json({"Registros eliminados por ISBN": result.affectedRows});
        }catch (error){
            console.log ('ERROR: No se pudo eliminar libro por ISBN:', error);
        }
        
    }

    async update(req, res) {
        const libro = req.body;
        try {
            const [result] = await pool.query('UPDATE libros SET nombre = ?, autor = ?, categoria = ?, año_publicacion = ?, ISBN = ? WHERE id = ?', [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN, libro.id]);
            res.json({ "Registros actualizados": result.changedRows });
        } catch (error) {
            console.log('ERROR: No se pudo actualizar el libro:', error);
        }
    }
}

export const libro = new LibroController();

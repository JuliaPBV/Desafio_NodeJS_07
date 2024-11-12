import { Curso } from '../entities/curso';
import { IDaoBase } from './IDaoBase';
import { query } from '../database/connection';

export class CursoDAO implements IDaoBase<Curso> {
    async create(curso: Curso): Promise<void> {
        try {
            const sql = 'INSERT INTO cursos (id, nome) VALUES ($1, $2)';
            await query(sql, [curso.id, curso.nome]);
        } catch (error) {
            console.error('Erro ao criar o curso:', error);
        }
    }

    async read(id: number): Promise<Curso | null> {
        try {
            const result = await query('SELECT * FROM cursos WHERE ID = $1', [id]);
            if (result.rows.length) {
                const { id, nome } = result.rows[0];
                return new Curso(id, nome);
            }
            return null;
        } catch (error) {
            console.error('Erro ao mostrar curso:', error);
            return null;
        }
    }

    async update(curso: Curso): Promise<void> {
        try {
            const sql = 'UPDATE cursos SET nome = $1 WHERE id = $2';
            await query(sql, [curso.id, curso.nome]);
        } catch (error) {
            console.error('Erro ao atualizar o curso:', error);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const sql = 'DELETE FROM cursos WHERE id = $1';
            await query(sql, [id]);
        } catch (error) {
            console.log('Error ao deletar o curso:', error);
        }
    }

    async findAll(): Promise<Curso[]> {
        try {
            const result = await query('SELECT * FROM cursos');
            return result.rows.map((row: { id: number, nome: string }) => new Curso(row.nome, row.id));
        } catch (error) {
            console.error('Erro ao buscar os cursos:', error);
            return [];
        }
    }
}
import { Aluno } from '../entities/aluno'; 
import { IDaoBase } from './IDaoBase';
import { query } from '../database/connection';

export class AlunoDAO implements IDaoBase<Aluno> {
    async create(aluno: Aluno): Promise<void> {
        try {
            const sql = 'INSERT INTO alunos (id, nome, curso_id) VALUES ($1, $2, $3)';
            await query(sql, [aluno.id, aluno.nome, aluno.cursoId]);
        } catch (error) {
            console.error('Erro ao criar o aluno:', error);
        }
    }

    async read(id: number): Promise<Aluno | null> {
        try {
            const result = await query('SELECT * FROM alunos WHERE id = $1', [id]);
            if (result.rows.length) {
                const { id, nome, curso_id } = result.rows[0];
                return new Aluno(id, nome, curso_id);
            }
            return null;
        } catch (error) {
            console.error('Erro ao mostrar aluno:', error);
            return null;
        }
    }

    async update(aluno: Aluno): Promise<void> {
        try {
            const sql = 'UPDATE alunos SET nome = $1 WHERE id = $2';
            await query(sql, [aluno.nome, aluno.id]);
        } catch (error) {
            console.log('Erro ao atualizar aluno:', error);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const sql = 'DELETE FROM alunos WHERE id = $1';
            await query(sql, [id]);
        } catch (error) {
            console.error('Erro ao deletar o aluno:', error);
        }
    }

    async findAll(): Promise<Aluno[]> {
        try {
            const result = await query('SELECT * FROM alunos');
            return result.rows.map((row: { id: number, nome: string, cursoId: number }) => new Aluno(row.id, row.nome, row.cursoId));
        } catch (error) {
            console.error('Erro ao buscar os alunos:', error);
            return [];
        }
    }
}

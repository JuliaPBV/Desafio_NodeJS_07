/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);


	// CÓDIGO PARA ATENDER OS REQUERIMENTOS
	// R01, R02, R03, R04, R05

});
import readlineSync from 'readline-sync';
import { Aluno } from './aluno';
import { Curso } from "./curso";
import { AlunoDAO } from "../dao/AlunoDAO";
import { CursoDAO } from "../dao/cursoDAO";

async function informações() {
	try {
		const alunoDAO = new AlunoDAO();
		const cursoDAO = new CursoDAO();

		const alunoId = parseInt(readlineSync.question('Digite o ID do aluno: '), 10);
		const nomeAluno = readlineSync.question('Digite o nome do aluno: ');
		const cursoId = parseInt(readlineSync.question('Digite o ID do curso: '), 10);
		const nomeCurso = readlineSync.question('Digite o nome do curso que o aluno esta matriculado: ');

		const curso = new Curso(cursoId, nomeCurso);

		const aluno = new Aluno(alunoId, nomeAluno, cursoId);

		const existeCurso = await cursoDAO.read(cursoId);
		if (!existeCurso) {
			const curso = new Curso(cursoId, nomeCurso);
			try {
				await cursoDAO.create(curso);
				console.log('Curso criado com sucesso!');
			} catch (error) {
				console.error('Erro ao criar curso!');
				return;
			}
		} else {
			console.log('Curso ja cadastrado sendo utilizado!');
		}

		const existeAluno = await alunoDAO.read(alunoId);
		if (!existeAluno) {
			const aluno = new Aluno(alunoId, nomeAluno, cursoId);
			try {
				await alunoDAO.create(aluno);
				console.log('Aluno criado com sucesso!');
			} catch (error) {
				console.error('Erro ao criar o aluno:', error);
				return;
			}
		} else {
			console.log('Aluno já existente!');
		}

		console.log('Aluno e curso salvos com sucesso!');

		const alunos = await alunoDAO.findAll();
		const cursos = await cursoDAO.findAll();

		console.log('Alunos cadastrados: ', alunos);
		console.log('Cursos cadastrados: ', cursos);

		const desejaAlterarNome = readlineSync.question('Deseja alterar o nome do aluno? (sim/nao): ');
		if (desejaAlterarNome.toLowerCase() === 'sim') {
			const novoNome = readlineSync.question('Qual é o novo nome do aluno? ');
			aluno.nome = novoNome;
			await alunoDAO.update(aluno);
			console.log('Nome do aluno atualizado!');
		} else {
			(desejaAlterarNome.toLowerCase() === 'nao')
				console.log('Tudo certo!');
			
		}

	} catch (error) {
		console.error('Erro ao salvar aluno e cursos');
	}
}
informações();
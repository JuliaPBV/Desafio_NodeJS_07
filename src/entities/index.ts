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
		const cursoDAO = new CursoDAO();
		const alunoDAO = new AlunoDAO();
		const opcao = readlineSync.question('O que deseja fazer?\n01- Cadastrar Curso\n02- Cadastrar Aluno\n03- Listar Cursos cadastrados\n04- Listar Alunos Cadastrados\n05- Buscar aluno\n06- buscar curso\nEscolha uma opcao: ');

		switch (opcao) {
			case "01":
				const nomeCurso = readlineSync.question('Digite o nome do curso: ');
				const cursoId = parseInt(readlineSync.question('Digite o ID do curso: '), 10);
				const curso = new Curso(nomeCurso, cursoId);

				const existeCurso = await cursoDAO.read(cursoId);
				if (!existeCurso) {
					try {
						await cursoDAO.create(curso);
						console.log('Curso criado com sucesso!');
					} catch (error) {
						console.error('Erro ao criar curso!');
						//return;
					}
				} else {
					console.log('Curso ja cadastrado sendo utilizado!');
				}
				break;

			case "02":
				const nomeAluno = readlineSync.question('Digite o nome do aluno: ');
				const alunoId = parseInt(readlineSync.question('Digite o ID do aluno: '), 10);
				const cursoIdAluno = parseInt(readlineSync.question('Digite o ID do curso: '), 10);
				const aluno = new Aluno(nomeAluno, alunoId, cursoIdAluno);

				const existeAluno = await alunoDAO.read(alunoId);
				if (!existeAluno) {
					try {
						await alunoDAO.create(aluno);
						console.log('Aluno criado com sucesso!');
					} catch (error) {
						console.error('Erro ao criar o aluno:', error);
						//return;
					}
				} else {
					console.log('Aluno já existente!');
				}
				break;

			case "03":
				const cursos = await cursoDAO.findAll();
				console.log('Cursos cadastrados: ', cursos);
				break;

			case "04":
				const alunos = await alunoDAO.findAll();
				console.log('Alunos cadastrados: ', alunos);
				break;

			case "05":
				const alunoBuscaId = parseInt(readlineSync.question('Digite o ID do aluno: '), 10);
				const alunoEncontrado = await alunoDAO.read(alunoBuscaId);
				if (alunoEncontrado) {
					console.log('Aluno encontrado: ', alunoEncontrado);

					const desejaAlterarNome = readlineSync.question('Deseja alterar o nome do aluno? (sim/nao): ');
					if (desejaAlterarNome.toLowerCase() === 'sim') {
						const novoNome = readlineSync.question('Qual é o novo nome do aluno? ');
						alunoEncontrado.nome = novoNome;
						await alunoDAO.update(alunoEncontrado);
						console.log('Nome do aluno atualizado!');
					} else {
						console.log('Nome do aluno não alterado!');
					}
				} else {
					console.log('Aluno não encontrado');
				}
				break;

			case "06":
				const cursoBuscarId = parseInt(readlineSync.question('Digite o ID do curso: '), 10);
				const cursoEncontrado = await cursoDAO.read(cursoBuscarId);
				if (cursoEncontrado) {
					console.log('Curso encontrado: ', cursoEncontrado);
				} else {
					console.log('Curso não encontrado');
				}
				break;

			default:
				console.log('Opção inválida!!!');
				return;
		}
	} catch (error) {
		console.error('Erro ao salvar aluno e cursos', error);
	}
}
informações();
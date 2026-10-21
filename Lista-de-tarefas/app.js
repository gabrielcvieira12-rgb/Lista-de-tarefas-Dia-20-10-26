// 1. IMPORTAÇÕES
import { db } from "./firebase.js";

import {
    ref,
    push,
    set,
    get,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-database.js";

// 2. ELEMENTOS DO HTML
const inputTarefa = document.getElementById("but-input");
const botaoAdicionar = document.getElementById("but-adicionar");
const listaTarefas = document.getElementById("Lista-tarefas");

// Referência para o "caminho" tarefas dentro do banco
const tarefasRef = ref(db, "tarefas");

// 3. FUNÇÃO ADICIONAR TAREFA
async function adicionarTarefa() {
    const texto = inputTarefa.value.trim();
    if (texto === "") return;

    const novaTarefaRef = push(tarefasRef); // cria um id único
    await set(novaTarefaRef, {
        texto: texto,
        concluida: false
    });

    inputTarefa.value = "";
    listarTarefas();
}

// 4. FUNÇÃO LISTAR TAREFAS
async function listarTarefas() {
    const snapshot = await get(tarefasRef);
    listaTarefas.innerHTML = "";

    if (!snapshot.exists()) return;

    snapshot.forEach((filho) => {
        const id = filho.key;
        const tarefa = filho.val();

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = tarefa.texto;
        if (tarefa.concluida) {
            span.style.textDecoration = "line-through";
        }

        const btnConcluir = document.createElement("button");
        btnConcluir.textContent = tarefa.concluida ? "Desfazer" : "Concluir";
        btnConcluir.addEventListener("click", () => concluirTarefa(id, tarefa.concluida));

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => editarTarefa(id, tarefa.texto));

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.addEventListener("click", () => excluirTarefa(id));

        li.append(span, btnConcluir, btnEditar, btnExcluir);
        listaTarefas.appendChild(li);
    });
}

// 5. FUNÇÃO EDITAR TAREFA
async function editarTarefa(id, textoAtual) {
    const novoTexto = prompt("Editar tarefa:", textoAtual);
    if (novoTexto === null || novoTexto.trim() === "") return;

    await update(ref(db, `tarefas/${id}`), { texto: novoTexto.trim() });
    listarTarefas();
}

// 6. FUNÇÃO CONCLUIR TAREFA
async function concluirTarefa(id, concluidaAtual) {
    await update(ref(db, `tarefas/${id}`), { concluida: !concluidaAtual });
    listarTarefas();
}

// 7. FUNÇÃO EXCLUIR TAREFA
async function excluirTarefa(id) {
    await remove(ref(db, `tarefas/${id}`));
    listarTarefas();
}

// 8. EVENTOS DOS BOTÕES
botaoAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keydown", (e) => {
    if (e.key === "Enter") adicionarTarefa();
});

// 9. CARREGAR AS TAREFAS INICIAIS
listarTarefas();
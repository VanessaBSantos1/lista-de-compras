// Seleciona os elementos HTML necessários
const itemInput = document.getElementById("itemInput");
const botao = document.getElementById("adicionar_item");
const listaDeCompras = document.getElementById("listaDeCompras");
const listaDeComprados = document.getElementById("listaDeComprados");
const divComprados = document.querySelector(".comprados");

// Exibe mensagem quando a lista está vazia
function exibeTexto(tag, texto) {
    const varTag = document.querySelector(tag);
    if (varTag) {
        varTag.innerHTML = texto;
    }
}

// Inicialmente exibe a mensagem se a lista estiver vazia
exibeTexto('#mensagemListaVazia', 'Sua lista está vazia. Adicione itens a ela para não esquecer nada na próxima compra');

// Adiciona um ouvinte de eventos para o botão
botao.addEventListener('click', adicionarItem);

function adicionarItem(evento) {
    evento.preventDefault(); // Evita a atualização da página

    if (itemInput.value.trim() === "") {
        alert('Por favor, adicione um item.');
        return;
    }

    // Cria os elementos da lista
    const itemLista = document.createElement("li");

    const listaItemConteiner = document.createElement("div");
    listaItemConteiner.classList.add("lista_item_conteiner");
    itemLista.appendChild(listaItemConteiner);

    // Contêiner que vai organizar a checkbox, texto e data
    const div = document.createElement("div");
    listaItemConteiner.appendChild(div);

    // Contêiner da checkbox
    const checkboxConteiner = document.createElement("div");
    checkboxConteiner.classList.add("checkbox_conteiner");
    div.appendChild(checkboxConteiner);

    // Checkbox e checkbox customizado
    const checkbox = document.createElement("label");
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.classList.add("input_checkbox");

    const customizado = document.createElement("div");
    customizado.classList.add("checkbox_customizado");

    checkbox.appendChild(inputCheckbox);
    checkbox.appendChild(customizado);
    checkboxConteiner.appendChild(checkbox);

    // Contêiner que vai organizar o texto e a data em coluna
    const itemTextoConteiner = document.createElement("div");
    itemTextoConteiner.classList.add("item_texto_conteiner");
    div.appendChild(itemTextoConteiner);

    // Adiciona texto ao item
    const textoItem = document.createElement("span");
    textoItem.textContent = itemInput.value;
    itemTextoConteiner.appendChild(textoItem);

    // Adiciona data e hora abaixo do texto
    const dataHora = new Date().toLocaleString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const dataItem = document.createElement("span");
    dataItem.classList.add("data_item");
    dataItem.textContent = `${dataHora}`;
    itemTextoConteiner.appendChild(dataItem);

    // Adiciona os botões de ação
    const divButton = document.createElement("div");

    // Botão excluir
    const buttonExcluir = document.createElement("button");
    buttonExcluir.classList.add("item_lista_button");
    buttonExcluir.innerHTML = `<img src="assets/Excluir.svg" alt="EXCLUIR">`;
    divButton.appendChild(buttonExcluir);

    // Botão editar
    const buttonEditar = document.createElement("button");
    buttonEditar.classList.add("item_lista_button");
    buttonEditar.innerHTML = `<img src="assets/Edição.svg" alt="EDITAR">`;
    divButton.appendChild(buttonEditar);

    listaItemConteiner.appendChild(divButton);

    // Adiciona o item à lista de compras
    listaDeCompras.appendChild(itemLista);

    // Limpa o campo de entrada
    itemInput.value = '';

    // Atualiza a mensagem de lista vazia
    atualizarMensagemListaVazia();

    // Evento de exclusão do item
    buttonExcluir.addEventListener("click", () => {
        listaDeCompras.removeChild(itemLista);
        atualizarMensagemListaVazia();
    });

    // Evento de marcação do checkbox
    inputCheckbox.addEventListener("change", () => {
        if (inputCheckbox.checked) {
            // Move o item para a lista de "Comprados" e aplica o estilo riscado
            listaItemConteiner.classList.add("strikethrough");
            listaDeComprados.appendChild(itemLista);

            // Mostra a div de "Comprados"
            divComprados.classList.add("show");
        } else {
            // Remove o riscado e move o item de volta para a lista de compras
            listaItemConteiner.classList.remove("strikethrough");
            listaDeCompras.appendChild(itemLista);

            // Verifica se a lista de "Comprados" está vazia e esconde a div
            if (listaDeComprados.children.length === 0) {
                divComprados.classList.remove("show");
            }
        }
    });
}

// Função que atualiza a mensagem de lista vazia
function atualizarMensagemListaVazia() {
    const mensagem = document.querySelector('#mensagemListaVazia');
    if (listaDeCompras.children.length === 0) {
        mensagem.style.display = 'block';
    } else {
        mensagem.style.display = 'none';
    }
}

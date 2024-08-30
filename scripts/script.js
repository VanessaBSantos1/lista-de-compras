const itemInput = document.getElementById("itemInput");
const botao = document.getElementById("adicionar_item");
const listaDeCompras = document.getElementById("listaDeCompras");
const listaDeComprados = document.getElementById("listaDeComprados");

botao.addEventListener("click", adicionarItem);

function adicionarItem(evento) {
    evento.preventDefault();
    console.log("Adicionando item...");

    // Criando o elemento 'li' para adicionar à lista
    const itemLista = document.createElement("li");

    // Criando o container do item da lista
    const listaItemConteiner = document.createElement("div");
    listaItemConteiner.classList.add("lista_item_conteiner");

    // Adicionando o container ao item da lista
    itemLista.appendChild(listaItemConteiner);

    // Criando a div que vai conter o checkbox e o texto
    const div = document.createElement("div");
    listaItemConteiner.appendChild(div);

    const checkboxConteiner = document.createElement("div");
    checkboxConteiner.classList.add("checkbox_conteiner");
    div.appendChild(checkboxConteiner);

    const checkbox = document.createElement("label");
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.classList.add("input_checkobox");

    const customizado = document.createElement("div");
    customizado.classList.add("checkbox_customizado");

    checkbox.appendChild(inputCheckbox);
    checkbox.appendChild(customizado);
    checkboxConteiner.appendChild(checkbox);

    // Adicionando o texto do item
    const textoItem = document.createElement("span");
    textoItem.textContent = itemInput.value;
    div.appendChild(textoItem);

    // Adicionando a data e hora ao item
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
    dataItem.textContent = ` ${dataHora}`;
    div.appendChild(dataItem);

    // Criando a div que vai conter os botões de edição/exclusão
    const divButton = document.createElement("div");

    // Botão de excluir
    const buttonExcluir = document.createElement("button");
    buttonExcluir.classList.add("item_lista_button");
    const imgExcluir = document.createElement("img");
    imgExcluir.src = "assets/Excluir.svg";
    imgExcluir.alt = "EXCLUIR";
    buttonExcluir.appendChild(imgExcluir);

    // Botão de editar
    const buttonEditar = document.createElement("button");
    buttonEditar.classList.add("item_lista_button");
    const imgEditar = document.createElement("img");
    imgEditar.src = "assets/Edição.svg";
    imgEditar.alt = "EDITAR";
    buttonEditar.appendChild(imgEditar);

    // Adicionando os botões na divButton
    divButton.appendChild(buttonExcluir);
    divButton.appendChild(buttonEditar);
    listaItemConteiner.appendChild(divButton);

    // Adicionando o item completo à lista
    listaDeCompras.appendChild(itemLista);

    // Limpar o campo de entrada
    itemInput.value = "";

    // Evento de exclusão do item
    buttonExcluir.addEventListener("click", () => {
        listaDeCompras.removeChild(itemLista);
    });

    // Evento de marcação do checkbox
    inputCheckbox.addEventListener("change", () => {
        if (inputCheckbox.checked) {
            // Mover o item para a lista de "Comprados" e aplicar o estilo riscado
            listaItemConteiner.classList.add("strikethrough");
            listaDeComprados.appendChild(itemLista);
        } else {
            // Remover o riscado e mover de volta para a lista de compras
            listaItemConteiner.classList.remove("strikethrough");
            listaDeCompras.appendChild(itemLista);
        }
    });
}

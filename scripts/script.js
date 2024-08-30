console.log("hello world");

const itemInput = document.getElementById("itemInput");
const botao = document.getElementById("adicionar_item");
const listaDeCompras = document.getElementById("listaDeCompras");

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

    // Criando a div que vai conter o checkbox
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

    // Criando a div que vai conter os botões de edição/exclusão
    const divButton = document.createElement("div");

    // Botão de excluir
    const buttonExcluir = document.createElement("button");
    buttonExcluir.classList.add("intem_lista_button");
    const imgExcluir = document.createElement("img");
    imgExcluir.src = "assets/Excluir.svg";
    imgExcluir.alt = "EXCLUIR";
    buttonExcluir.appendChild(imgExcluir);

    // Botão de editar
    const buttonEditar = document.createElement("button");
    buttonEditar.classList.add("intem_lista_button");
    const imgEditar = document.createElement("img");
    imgEditar.src = "assets/Edição.svg";
    imgEditar.alt = "EDITAR";
    buttonEditar.appendChild(imgEditar);

    // Adicionando os botões na divButton
    divButton.appendChild(buttonExcluir);
    divButton.appendChild(buttonEditar);
    listaItemConteiner.appendChild(divButton);

    // Adicionando o texto do item
    const textoItem = document.createTextNode(itemInput.value);
    div.appendChild(textoItem);

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
            // Move o item para a lista de comprados
            document.getElementById("listaDeComprados").appendChild(itemLista);
        } else {
            // Move o item de volta para a lista de compras
            listaDeCompras.appendChild(itemLista);
        }
    });
}

import { createClient } from '@supabase/supabase-js';

// Insira sua URL do Supabase e a chave pública (anon public) aqui
const supabaseUrl = 'https://goswnghiardcuosvbcvd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdvc3duZ2hpYXJkY3Vvc3ZiY3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0MjUyODYsImV4cCI6MjA0MjAwMTI4Nn0.-YpvREJck-jsBpPHJsP-xtfiMEh77WwH1U692xcpq-M';  // Insira a chave anônima aqui

// Inicializa o Supabase
const supabase = createClient(supabaseUrl, supabaseKey);


// Função para adicionar um item à tabela no Supabase
async function adicionarItemSupabase(item) {
  const { data, error } = await supabase
    .from('compras')
    .insert([
      { item: item, data: new Date().toISOString() }
    ]);

  if (error) {
    console.error('Erro ao adicionar item:', error);
  } else {
    console.log('Item adicionado com sucesso:', data);
    // Atualize a lista de compras no frontend
    carregarItens();
  }
}

// Função para carregar os itens da tabela e exibi-los na lista de compras
async function carregarItens() {
  const { data, error } = await supabase
    .from('compras')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Erro ao carregar itens:', error);
    return;
  }

  const listaDeCompras = document.getElementById('listaDeCompras');
  listaDeCompras.innerHTML = ''; // Limpa a lista antes de atualizar

  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.item} (Adicionado em: ${new Date(item.data).toLocaleString()})`;
    listaDeCompras.appendChild(li);
  });
}

// Evento de adicionar item ao clicar no botão
document.getElementById('adicionar_item').addEventListener('click', (e) => {
  e.preventDefault();
  const itemInput = document.getElementById('itemInput');
  const item = itemInput.value.trim();
  if (item) {
    adicionarItemSupabase(item);
    itemInput.value = ''; // Limpa o campo de entrada
  }
});

// Carregar os itens ao carregar a página
window.onload = carregarItens;

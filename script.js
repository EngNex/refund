//seleciona os elementos do formulario
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

//adiciona um evento de input para limpar o input ao digitar e deixar somente numeros
amount.oninput = () => {
  //substitui caracteres não numéricos por nada (g = global, \D = não-dígito)
  let value = amount.value.replace(/\D/g, "");

  //converte para centavos
  value = Number(value) / 100;

  //atualiza o valor ja formatado
  amount.value = formatCurrenciesBRL(value);
};

function formatCurrenciesBRL(value) {
  //formata o valor no padrao BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return value;
}

//Captura o evento de submit do form para obter os valores
form.onsubmit = (event) => {
  //previne o formulario de ser enviado normalmente
  event.preventDefault();

  //cria um novo objeto com os dados do formulario
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  //chama a função que ira adicionar o item na lista
  expenseAdd(newExpense);
};

//adiciona um novo item na lista de despesas
function expenseAdd(newExpense) {
  try {
    //cria o elemento de li para adiconar os itens na lista (ul)
    const expenseItem = document.createElement("li");

    //adiciona os dados do novo item na lista
    expenseItem.classList.add("expense");

    //cria o elemento visual de imagem relacionado ao tipo de consumo
    const expenseIcon = document.createElement("img");

    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //cria a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    //cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    //cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    //adiciona name e category em expense info
    expenseInfo.append(expenseName, expenseCategory);

    //cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$","")}`

    //cria o icone de remover despesa
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // Adicona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
    expenseList.append(expenseItem);

    //atualiza os totais
    updateTotals()
  } catch (e) {
    alert("Não foi possivel atualizar a lista de despesas.");
    console.error("Error:", e);
  }
}

function updateTotals(){
try{
    //recupera todos os itens da lista
    const items = expenseList.children

    //atualiza a quantidade de itens na lista 
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

//variavel para incrementar o total de despesas
let total = 0

//percore cada item que é adicionado na lista
for(let item = 0; item < items.length; item++){
  const itemAmount = items[item].querySelector(".expense-amount")

  //remover caracteres para fazer a concatenação dos valores
  let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

  //converter o valor para float
  value = parseFloat(value)

  //verifica se é numero valido
  if(isNaN(value)){
    return alert("Digite um valor valido")
  }

  //incrementa a soma do valores das despesas
  total += Number(value)
}


//criando a span para formatando o R$
const symbolBRL = document.createElement("small") 
symbolBRL.textContent = "R$"
 
//formata o valor e remove o R$ que sera exibido pela small com conteudo estilizado
total = formatCurrenciesBRL(total).toUpperCase().replace("R$", "")

//limpa o conteudo do elemento
expensesTotal.innerHTML = ""

//adiciona o simbolo e o valor na 
expensesTotal.append(symbolBRL, total)

}catch (error){
    console.log(error)
    alert("Não foi possivel atualizar os valores.")
    }
//f410
}
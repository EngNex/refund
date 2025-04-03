//seleciona os elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


//adiciona um evento de input para limpar o input ao digitar e deixar somente numeros
amount.oninput = () => {
   //substitui caracteres não numéricos por nada (g = global, \D = não-dígito)
   let value = amount.value.replace(/\D/g, "")

   //converte para centavos
   value = Number(value) / 100
   
   //atualiza o valor ja formatado
   amount.value = formatCurrenciesBRL(value)
}

function formatCurrenciesBRL(value){
    //formata o valor no padrao BRL
    value = value.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    })
    return value
}
//#f402 aula
//Captura o evento de submit do form para obter os valores
form.onsubmit = (event) => {
    //previne o formulario de ser enviado normalmente
    event.preventDefault() 

    //cria um novo objeto com os dados do formulario
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),

        } 

    }


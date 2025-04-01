//seleciona os elementos do formulario
const amount = document.getElementById("amount")

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


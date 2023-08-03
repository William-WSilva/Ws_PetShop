const btn_deletar_item = document.getElementsByClassName("deletar_item");
const inputs_qtds_itens = document.getElementsByClassName("item_qtd_registro");
const botoes_add_carrinho = document.getElementsByClassName("add_carrinho");
const itens_carrinho = [];
const carrinho_compras = document.getElementById("carrinho_compras");

const badge = document.querySelector(".badge");

let linhaRegistro = "";
let linhas_registros_carrinho = [];
let total_qtd_carrinho = 0;
let total_valor_carrinho = 0;

$(window).on("load", function(){
  for (let index = 0; index < botoes_add_carrinho.length; index++) {
    botoes_add_carrinho[index].addEventListener("click", function(event) {
      const add_produto_item_nome = event.target.parentElement.getElementsByClassName("produto_item_nome")[0].innerText;
      const add_produto_item_valor = event.target.parentElement.getElementsByClassName("preco")[0].innerText;
      const corpotabela = document.querySelector("tbody");
  
      if (itens_carrinho.includes(add_produto_item_nome)) {
        console.log("não preencher tabela");
      } else {
        console.log("preencher tabela");
        console.log(add_produto_item_nome);
  
        itens_carrinho.push(add_produto_item_nome);
  
        let inputLinha = `
          <tr class="linha_registro_carrinho">
            <td>${add_produto_item_nome}</td>
            <td class="item_preco_unit">${add_produto_item_valor}</td>
            <td><input type="number" min="1" value="1" class="item_qtd_registro"></td>
            <td>
              <span class="item_valor">${add_produto_item_valor}</span>
              <i class="deletar_item bi bi-trash3-fill"></i>
            </td>
          </tr>`;
  
        linhaRegistro += inputLinha;
        corpotabela.innerHTML = linhaRegistro;
        linhas_registros_carrinho = document.getElementsByClassName("linha_registro_carrinho");
        updateTotals();
        attachInputChangeEvent();
  
        // Adiciona addEventListener aos inputs de exclusão após a tabela ser preenchida
        const btn_deletar_item = document.getElementsByClassName("deletar_item");
        for (let i = 0; i < btn_deletar_item.length; i++) {
          btn_deletar_item[i].addEventListener("click", function(event) {
            event.target.parentElement.parentElement.remove();
            updateTotals();
          });
        }
      }
    });
  }
});

console.log(badge.textContent)


function attachInputChangeEvent() {
  for (let index = 0; index < inputs_qtds_itens.length; index++) {
    inputs_qtds_itens[index].addEventListener("change", function(event) {
      const qtd_input_item = event.target.value;
      const valor_registro_item = event.target.parentElement.parentElement.getElementsByClassName("item_preco_unit")[0].innerText.replace("R$", "").replace(",", ".");
      const valor_registro_atualizado = valor_registro_item * qtd_input_item;
      event.target.parentElement.parentElement.getElementsByClassName("item_valor")[0].innerText = "R$ " + valor_registro_atualizado.toFixed(2).replace(".", ",");
      updateTotals();
    });
  }
}

function updateTotals() {
  let total_qtd = 0;
  let total_valor = 0;

  for (let i = 0; i < linhas_registros_carrinho.length; i++) {
    const qtd_registro = parseInt(linhas_registros_carrinho[i].getElementsByClassName("item_qtd_registro")[0].value);
    const valor_registro_text = linhas_registros_carrinho[i].getElementsByClassName("item_valor")[0].innerText.replace("R$", "").replace(",", ".");
    const valor_registro = parseFloat(valor_registro_text);

    total_qtd += qtd_registro;
    total_valor += valor_registro;
  }

  document.getElementById("qtd_registros").innerText = linhas_registros_carrinho.length;
  document.getElementById("qtd_total").innerText = total_qtd;
  document.getElementById("valor_total").innerText = "R$ " + total_valor.toFixed(2).replace(".", ",");

  if (total_qtd > 0 ){
    carrinho_compras.classList.add("btn-success");
    carrinho_compras.classList.remove("btn-primary")
    badge.classList.remove("invisible")
    badge.classList.add("visible")
    badge.innerText = total_qtd
  }else{
    carrinho_compras.classList.remove("btn-success");
    carrinho_compras.classList.add("btn-primary")
    badge.classList.add("invisible")
    badge.classList.remove("visible")
    badge.innerText = total_qtd
  }

}


// mascaras para inputs do formulário
$("#telefone").mask("(00) 0 0000-0000",{
  placeholder: "(00) 0 0000-0000"
});

$("#telefone_carrinho").mask("(00) 0 0000-0000",{
  placeholder: "(00) 0 0000-0000"
});

// Validação de formulário
$("#formulario_contato").validate({
  rules:{
      nome:{required: true},
      email:{required: true, email: true},
      telefone_carrinho:{required: true},
      messages:{nome: "Por favor, insira seu nome"},
      submitHandler:function(form) {
          // console.log(form)
          form.submit();
      },
      invalidHandler:function(evento, validador) {
          let camposIncorretos = validador.numberOfInvalids();

          if (camposIncorretos) {
              alert(`Existem ${camposIncorretos} campos incorretos`);
          }
      }
  }       
})

$("#form_contato_compra").validate({
  rules:{
      nome:{required: true},
      email:{required: true, email: true},
      telefone:{required: false},
      messages:{nome: "Por favor, insira seu nome"},
      submitHandler:function(form) {
          // console.log(form)
          form.submit();
      },
      invalidHandler:function(evento, validador) {
          let camposIncorretos = validador.numberOfInvalids();

          if (camposIncorretos) {
              alert(`Existem ${camposIncorretos} campos incorretos`);
          }
      }
  }       
})
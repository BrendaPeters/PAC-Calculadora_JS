const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

function calcular() {
  try {
    // Validação básica
    const expr = display.value.trim();
    if (!expr) return;
    
    // Usa Function em vez de eval para maior segurança
    const resultado = Function('"use strict"; return (' + expr + ')')();
    display.value = resultado;
  } catch (erro) {
    display.value = "Erro";
  }
}

for (let button of buttons) {
  button.addEventListener("click", function () {
    const valor = button.textContent.trim();

    if (valor === "C") {
      display.value = "";
    } else if (valor === "←") {
      display.value = display.value.slice(0, -1);
    } else if (valor === "=") {
      calcular();
    } else if (valor === "") {
      // botão invisível, ignora
    } else {
      display.value += valor;
    }
  });
}

// Suporte a teclado
document.addEventListener("keydown", function (e) {
  const allowed = "0123456789.+-*/%";
  if (allowed.includes(e.key)) {
    display.value += e.key;
  } else if (e.key === "Enter" || e.key === "=") {
    calcular();
  } else if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (e.key === "Escape") {
    display.value = "";
  }
});

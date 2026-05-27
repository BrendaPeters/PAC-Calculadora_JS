const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let novoNumero = false;

function calcular() {
  try {
    const expr = display.value.trim();
    if (!expr) return;

    const resultado = Function('"use strict"; return (' + expr + ')')();

    if (!isFinite(resultado)) {
      display.value = "Erro";
    } else {
      display.value = resultado;
      novoNumero = true;
    }
  } catch (erro) {
    display.value = "Erro";
    novoNumero = true;
  }
}

for (let button of buttons) {
  button.addEventListener("click", function () {
    const valor = button.textContent.trim();

    if (valor === "C") {
      display.value = "";
      novoNumero = false;
    } else if (valor === "←") {
      display.value = display.value.slice(0, -1);
    } else if (valor === "=") {
      calcular();
    } else if ("+-*/%".includes(valor)) {
      if (novoNumero && display.value !== "Erro") {
        novoNumero = false;
      }
      display.value += valor;
    } else {
      if (novoNumero) {
        display.value = "";
        novoNumero = false;
      }
      display.value += valor;
    }
  });
}

document.addEventListener("keydown", function (e) {
  const allowed = "0123456789.+-*/%";

  if (allowed.includes(e.key)) {
    if (novoNumero && !"+-*/%".includes(e.key)) {
      display.value = "";
      novoNumero = false;
    }
    display.value += e.key;
  } else if (e.key === "Enter" || e.key === "=") {
    calcular();
  } else if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (e.key === "Escape") {
    display.value = "";
    novoNumero = false;
  }
});

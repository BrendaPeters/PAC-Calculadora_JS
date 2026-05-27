# 🧮 Calculadora em JavaScript

Calculadora desenvolvida com HTML, CSS e JavaScript puro. Ideal para praticar lógica de programação e manipulação do DOM.

Funcionalidades:

- Operações matemáticas básicas (soma, subtração, multiplicação, divisão, porcentagem)
- Suporte a entrada pelo teclado
- Tratamento de erros
- Limpeza do display e exclusão de caracteres
- Controle de nova operação após resultado

---

## Antes de começar: o que é JavaScript?

JavaScript (JS) é a linguagem responsável por adicionar comportamento às páginas web.

- **HTML** define a estrutura
- **CSS** cuida da aparência
- **JavaScript** trata da interatividade

É ele quem gerencia cliques, teclas, cálculos, animações e alterações na tela — tudo que faz a página responder às ações do usuário.

---

## Passo 1 — Localizando os elementos na tela

O JavaScript precisa primeiro localizar os elementos do HTML para poder manipulá-los:

```js
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
```

- `document` representa a página inteira
- `getElementById("display")"` retorna um elemento específico pelo seu ID
- `querySelectorAll("button")"` retorna todos os botões da página
- `const` declara uma variável que não será reatribuída

---

## Passo 2 — Variável de controle

```js
let novoNumero = false;
```

Essa variável indica se o próximo número digitado deve iniciar um novo valor ou continuar o atual.

**Exemplo:** após calcular `5 + 5 = 10`, se o usuário digitar `3`, o display deve mostrar `3` e não `103`. Quando `novoNumero` está como `true`, o display é limpo antes de inserir o próximo caractere.

- `let` declara uma variável que pode ter seu valor alterado
- `true`/`false` são valores booleanos

---

## Passo 3 — A função `calcular()`

```js
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
```

### Detalhamento:

- **`function`** cria um bloco de código reutilizável
- **`try/catch`** captura erros em tempo de execução, evitando que a aplicação quebre
- **`display.value`** contém o texto atual do visor
- **`.trim()`** remove espaços em branco no início e no fim da string
- **`if (!expr) return;`** interrompe a função se o display estiver vazio
- **`Function('"use strict"; return (' + expr + ')')()`** converte a string digitada (ex: `"5+5"`) em código executável e retorna o resultado
- **`isFinite()`** verifica se o resultado é um número válido — valores como `Infinity` são rejeitados

---

## Passo 4 — Botões e eventos de clique

```js
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
```

O código percorre todos os botões e adiciona um evento de clique a cada um. A ação executada depende do texto do botão:

| Botão | Ação |
|---|---|
| `C` | limpa o display |
| `←` | remove o último caractere |
| `=` | executa o cálculo |
| `+`, `-`, `*`, `/`, `%` | adiciona o operador ao display |
| demais | adiciona o caractere ao display |

- **`slice(0, -1)`** retorna a string sem o último caractere
- **`includes()`** verifica se um valor está presente em uma string

---

## Passo 5 — Suporte ao teclado

```js
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
```

O evento `keydown` é disparado quando uma tecla é pressionada. A propriedade `e.key` informa qual tecla foi acionada.

| Tecla | Função |
|---|---|
| `Enter` ou `=` | executa o cálculo |
| `Backspace` | remove o último caractere |
| `Escape` | limpa o display |
| `0-9`, `.` | insere números |
| `+`, `-`, `*`, `/`, `%` | insere operadores |

---

## Objetivo do projeto

Este projeto aborda conceitos fundamentais do JavaScript:

- lógica de programação
- eventos de clique e teclado
- funções
- tratamento de erros
- manipulação de strings e números

Um exercício prático para quem está começando a estudar JavaScript e quer ver o código em ação.

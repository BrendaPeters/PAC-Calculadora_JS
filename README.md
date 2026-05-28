# 👾 Projeto extensionista — 1º Semestre de Engenharia de Software

## 🧮 Calculadora em JavaScript

Site de apresentação do projeto, com descrição e materiais de estudo sobre JavaScript.
Desenvolvido com HTML, CSS e JavaScript puro.

Tópicos abordados:
```txt
- Operações básicas (soma, subtração, multiplicação, divisão, porcentagem)
- Uso pelo teclado
- Tratamento de erros
- Limpeza do display e exclusão de caracteres
- Controle de nova operação
```

## Antes de começar: o que é JavaScript? 🐣

JavaScript (JS) é o que dá vida ao site.

- **HTML** monta a estrutura 
- **CSS** cuida do visual
- **JavaScript** faz a magia acontecer

É ele que lida com cliques, teclas, cálculos, animações e tudo o que faz a página deixar de ser estática e **responder** aos usuários.


## Passo 1 — Localizando os elementos na tela🖼

Para a calculadora funcionar, o JS precisa achar o visor e os botões no HTML:

```js
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
```

- `document` é a página inteira
- `getElementById("display")"` acha um elemento específico pelo ID
- `querySelectorAll("button")"` pega todos os botões de uma vez
- `const` diz que essa lógica não vai ser trocada depois (fixa)


## Passo 2 — Variável de controle🕹

```js
let novoNumero = false;
```

Essa variável controla quando a calculadora deve **começar um número novo** em vez de continuar o anterior.

**Exemplo:** você calcula `5 + 5 = 10` e depois aperta `3`. Se não tivesse esse controle, apareceria `103` , o que não é correto. Com a flag, o display limpa e mostra `3` como deve ser.

- `let` cria uma variável que pode mudar de valor
- `true`/`false` são os valores lógicos (booleanos)


## Passo 3 — A função `calcular()` 🧠

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

### O que acontece:

- **`function`** cria um bloco de código reutilizável (o "cérebro" da calculadora)
- **`try/catch`** tenta executar e se algo der errado, captura o erro sem quebrar a página
- **`display.value`** é o texto que está aparecendo no visor
- **`.trim()`** remove espaços extras no começo e fim
- **`if (!expr) return;`** — se o display estiver vazio, a função para por ali mesmo
- **`Function('...')()`** pega o texto digitado (ex: `"5+5"`) e vira código de verdade, devolvendo o resultado
- **`isFinite()`** checa se o resultado é um número válido e o `Infinity` não passa


## Passo 4 — Botões e eventos de clique🎮

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

O código passa por cada botão e **escuta o clique**. Quando alguém clica:

| Botão | Ação |
|---|---|
| `C` | limpa tudo |
| `←` | apaga o último caractere |
| `=` | executa o cálculo |
| `+`, `-`, `*`, `/`, `%` | adiciona o operador |
| qualquer outro | adiciona o número no display |

- **`slice(0, -1)`** é um jeito simples de remover o último caractere de um texto
- **`includes()`** verifica se algo está dentro de uma string, ele verifica se "tem `+` nessa lista"


## Passo 5 — Suporte ao teclado🎹

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

Dá pra usar a calculadora inteira pelo teclado:

| Tecla | O que faz |
|---|---|
| `Enter` ou `=` | calcula |
| `Backspace` | apaga o último |
| `Escape` | limpa tudo |
| `0-9`, `.` | digita números |
| `+`, `-`, `*`, `/`, `%` | operadores |

O evento `keydown` é disparado no momento em que você aperta qualquer tecla, e `e.key` diz **qual tecla foi**.


## Pra que serve esse projeto❓

é um projeto simples onde cobrimos o essencial do JavaScript:

- lógica de programação
- eventos (clique e teclado)
- funções
- tratamento de erros
- manipulação de strings e números

# 🎉Obrigado pela participação!🎉

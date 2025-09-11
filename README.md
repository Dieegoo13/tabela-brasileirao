<h1 align="center" style="font-weight: bold;">Tabela do Campeonato Brasileiro ⚽</h1>

<p align="center">
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#funcionalidades">Funcionalidades</a> • 
 <a href="#como-rodar">Como Rodar</a> • 
 <a href="#preview">Preview</a> 
</p>

<p align="center">
    <b>Site interativo com simulação que exibe a tabela do Campeonato Brasileiro de Futebol com pontos, vitórias, empates, derrotas e escudos dos times, consumindo dados de um banco de dados MySQL através de uma API criada com Node-RED.</b>
</p>

<h2 id="tecnologias">💻 Tecnologias</h2>

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" width="30px" />
  <span>HTML</span>
</div>
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" width="30px" />
  <span>CSS</span>
</div>
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="30px" />
  <span>JavaScript</span>
</div>
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" width="30px" />
  <span>MySQL</span>
</div>
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" width="30px" />
  <span>Node-RED</span>
</div>

<h2 id="funcionalidades">🕹️ Funcionalidades</h2>

- **Tabela Atualizada**: Mostra a classificação atual de todos os times do Brasileirão.  
- **Simulador de Placares**: Calcula a classificação com base nos placares simulados, atribuindo 3 pontos para vitória, 1 ponto para empate e 0 pontos para derrota. 
- **Dados do Banco de Dados**: Pontos, vitórias, empates, derrotas, saldo de gols e posição na tabela são consumidos do MySQL.  
- **Escudos dos Times**: Exibe os escudos de cada time ao lado do nome.  
- **Integração via API**: Node-RED fornece os dados da API, que são consumidos pelo front-end com JavaScript.  
- **Filtro e Ordenação**: (Opcional) Permite ordenar por pontos, vitórias ou saldo de gols.  

<h2 id="como-rodar">🚀 Como Rodar</h2>

### Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- **Node.js** (para rodar o Node-RED)  
  [Download Node.js](https://nodejs.org/)  
- **Node-RED** (para criar a API que consome o banco de dados)  
  [Documentação Node-RED](https://nodered.org/docs/getting-started/)  
- **MySQL** (para armazenar os dados dos times e da tabela)  
  [Download MySQL](https://dev.mysql.com/downloads/)  
- **Navegador moderno** (Chrome, Edge, Firefox, etc.)  

### Passos para rodar o projeto

1️⃣ Clone o repositório:
```bash
git clone https://github.com/Dieegoo13/tabela-brasileirao.git

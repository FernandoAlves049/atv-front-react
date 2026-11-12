# Explorador do Brasil

Aplicação Front-End acadêmica para explorar as unidades federativas brasileiras e consultar os municípios de cada estado. Os dados são carregados da API pública de Localidades do IBGE com `fetch()`.

## Estrutura do projeto

```text
atv-front-react/
├── index.html
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── components/
        ├── Header.jsx
        ├── EstadoCard.jsx
        └── EstadoDetalhes.jsx
```

## Instalar e executar

É necessário ter Node.js instalado. No terminal, dentro da pasta do projeto:

```bash
npm install
npm run dev
```

Abra no navegador o endereço local mostrado pelo Vite. Para gerar os arquivos de publicação, use `npm run build`.

## Como funciona

- `main.jsx` inicia o React e monta o componente principal na página.
- `App.jsx` controla a tela, busca os estados e solicita municípios quando um estado é escolhido. Também contém a navegação, a busca de estados e os estados de carregamento e erro.
- `Header.jsx` apresenta a marca e a referência à fonte dos dados.
- `EstadoCard.jsx` mostra nome, sigla, região e código IBGE de um estado. Recebe os dados e a ação de clique por props.
- `EstadoDetalhes.jsx` apresenta os dados do estado e permite pesquisar municípios pelo nome.
- `index.css` define regras globais e `App.css` contém os estilos da aplicação e os ajustes para telas menores.

## Consulta à API do IBGE

O endereço base está na constante `API_IBGE` em `src/App.jsx`.

- Estados: `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
- Municípios: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios`

O navegador consulta os endpoints com `fetch()`, transforma a resposta em JSON e guarda os resultados em estado React. A lista usa diretamente os dados recebidos, sem substituir nomes ou códigos oficiais por dados inventados. A internet é necessária para carregar as informações.

## Conceitos de React usados

- **Componentes:** `Header`, `EstadoCard`, `EstadoDetalhes` e `App` dividem a interface em partes com responsabilidades claras.
- **Props:** `App` envia estado, municípios, indicadores e funções aos componentes filhos. `EstadoCard` recebe o estado para exibir e a função de seleção.
- **useState:** guarda estados retornados, estado selecionado, texto de busca, municípios e indicadores de carregamento e erro.
- **useEffect:** carrega os estados na abertura inicial da página.
- **Eventos:** `onChange` atualiza as buscas; `onClick` seleciona um estado, tenta novamente uma consulta ou volta à lista.
- **map():** cria os cards de estados e a lista de municípios a partir dos arrays recebidos da API.
- **Renderização condicional:** alterna entre a lista e os detalhes, e apresenta carregamento, erro, resultados ou mensagem de busca vazia conforme a situação.

## Roteiro curto para apresentar

1. Apresente o objetivo: consultar unidades federativas e municípios com dados oficiais do IBGE.
2. Mostre a lista de estados e explique que ela vem da API quando a página abre.
3. Pesquise um estado por nome, sigla ou região e abra um card.
4. Explique os dados do estado e mostre a busca dinâmica de municípios.
5. Volte para a lista e indique no código os componentes, props, `useState`, `useEffect`, eventos, `map()` e os estados condicionais de carregamento e erro.

Se a apresentação for em grupo, cada integrante deve conhecer o fluxo completo e estar preparado para explicar qualquer parte da aplicação.

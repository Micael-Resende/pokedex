#  App Pokedex - React Native 

PokéExplorer é um aplicativo móvel multiplataforma desenvolvido em **React Native** que permite aos usuários explorar, pesquisar e interagir com informações detalhadas sobre Pokémons utilizando a **PokéAPI**. Com uma interface amigável e responsiva, o aplicativo oferece uma experiência imersiva para fãs de Pokémon e entusiastas de tecnologia.

<span>**O projeto encontra-se atualmente em fase de desenvolvimento. Como esta é a minha primeira experiência programando em React Native, o período de aprendizado tem sido mais prolongado**.</span>

## 🛠️ Funcionalidades

- **Tela Inicial:**
  - Lista paginada de Pokémons com imagens e nomes.
  - Barra de busca para encontrar Pokémons específicos pelo nome.
  - Filtros por tipos (água, fogo, planta, etc.).

- **Detalhes do Pokémon:**
  - Imagem em alta resolução.
  - Nome, ID e número da Pokédex.
  - Tipos e habilidades.
  - Estatísticas básicas (HP, Ataque, Defesa, etc.).
  - Evoluções e formas alternativas.
  - Movimentos que o Pokémon pode aprender.

- **Favoritos:**
  - Marcar e desmarcar Pokémons como favoritos.
  - Lista dedicada de Pokémons favoritos com persistência local.

- **Navegação:**
  - Gerenciamento eficiente de telas utilizando **React Navigation**.

- **Design Responsivo:**
  - Interface inspirada no universo Pokémon, compatível com diferentes tamanhos de tela.

- **Otimização:**
  - Carregamento eficiente de imagens e dados com cache implementado.

- **Tratamento de Erros:**
  - Mensagens amigáveis em caso de falhas nas requisições.

- **Testes:**
  - Testes unitários e de integração para componentes e funcionalidades principais.

## 🚀 Tecnologias Utilizadas

- **Linguagens e Frameworks:**
  - [React Native](https://reactnative.dev/)
  - [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

- **Bibliotecas e Ferramentas:**
  - [Axios](https://axios-http.com/) - Requisições HTTP
  - [React Navigation](https://reactnavigation.org/) - Gerenciamento de navegação
  - [Redux Toolkit](https://redux-toolkit.js.org/) - Gerenciamento de estado
  - [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Persistência de dados locais
  - [ESLint](https://eslint.org/) - Linting de código
  - [Jest](https://jestjs.io/) & [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) - Testes

- **API Utilizada:**
  - [PokéAPI](https://pokeapi.co/)

## 📸 Screenshots

*Tela inicial com lista de Pokémons, busca e filtros.*


*Detalhes completos de um Pokémon selecionado.*


*Lista de Pokémons favoritos.*

## 🔧 Instalação

### 1. Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **Yarn**
- **React Native CLI**
- **Android Studio** e/ou **Xcode** (para emulação de dispositivos)

### 2. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/PokeExplorer.git
cd PokeExplorer
```

### 3. Instalar Dependências

**Usando npm:**

```bash
npm install
```

**Ou usando Yarn:**

```bash
yarn install
```

### 4. Configuração Adicional para iOS

Navegue até o diretório `ios` e instale as dependências com CocoaPods:

```bash
cd ios
pod install
cd ..
```

### 5. Executar o Aplicativo

**No Android:**

```bash
npx react-native run-android
```

**No iOS:**

```bash
npx react-native run-ios
```

## 🧪 Executando os Testes

O projeto utiliza **Jest** e **React Native Testing Library** para testes.

**Executar todos os testes:**

```bash
npm test
```

**Ou usando Yarn:**

```bash
yarn test
```

## 📦 Build e Deploy

### 1. Preparação para Publicação no Google Play

- **Configuração do Android:**
  - Atualize o arquivo `android/app/src/main/AndroidManifest.xml` com permissões e configurações necessárias.
  - Configure a assinatura do aplicativo seguindo a [documentação oficial](https://reactnative.dev/docs/signed-apk-android).

- **Build de Release:**

  ```bash
  cd android
  ./gradlew assembleRelease
  ```

- **Upload para o Google Play:**
  - Crie uma conta de desenvolvedor no Google Play.
  - Siga as instruções para enviar o APK/AAB.

### 2. Preparação para Publicação na Apple App Store

- **Configuração do iOS:**
  - Configure o projeto no Xcode com o certificado e perfil de provisão corretos.
  - Atualize as informações do aplicativo, como ícones e telas de lançamento.

- **Build de Release:**

  ```bash
  npx react-native run-ios --configuration Release
  ```

- **Upload para a App Store:**
  - Utilize o Xcode ou o Transporter para enviar o build.
  - Siga as diretrizes da Apple para aprovação.

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. **Fork o repositório**
2. **Crie uma branch** para a sua feature (`git checkout -b feature/nova-feature`)
3. **Comite suas mudanças** (`git commit -m 'Adiciona nova feature'`)
4. **Faça o push para a branch** (`git push origin feature/nova-feature`)
5. **Abra um Pull Request**

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 📞 Contato

Desenvolvido por [Micael Resende](mailto:@example.com). Sinta-se à vontade para abrir issues ou entrar em contato para sugestões e feedbacks.

---

<p align="center">
  <img src="./assets/logo.png" alt="PokéExplorer Logo" width="200"/>
</p>
```


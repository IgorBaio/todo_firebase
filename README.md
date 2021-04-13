# Bem-vindo ao TO-DO APP
## Este projeto é um aplicativo de Todo, utilizando firebase, navegação entre telas, AsyncStorage, redux, banco MongoDB e api em nodejs :

## Instruções

## npm install
### Ao baixar o código, na raiz da pasta 'todo_firebase' rode 'npm install'

## Modo debug:
### Ao término da instalação das dependências, pode executar o projeto com o comando 'npx react-native run-android'

## Modo Produção:
### Se desejar utilizar o app no modo de produção direto no seu celular pode acessar o link para baixar: https://drive.google.com/file/d/1x1-7e8Gz89Cze-ScngT1-NZqIEQPDlaA/view?usp=sharing

## API
### Para utilizar de modo online, foi construído uma api em nodejs com banco em mongoDB, para acessar este repositório basta ir para https://github.com/IgorBaio/api-todo-firebase


### Tela 1:
Tela de login e Cadastro feita via function components, o usuário caso já cadastrado insere o email e senha 
para se logar ao app, caso contrário, pode navegar à tela de cadastro para se cadatrar e entrar no app 

### Tela 2:
Tela de listagem, mostra todas as tarefas registradas no celular
Clicando no botão de adicionar é levado à tela 4
Arrastando a tarefa da esquerda para direita exclui automaticamente a tarefa
Arrastando a tarefa da direita para esquerda aparece um botão que permite a exclus~~ao da tarefa

### Tela 3:
Tela de visualização da tarefa, permite o usuário editar os dados e excluir determinada tarefa

### Tela 4:
Tela de Cadastro da tarefa inserindo título, descrição e data

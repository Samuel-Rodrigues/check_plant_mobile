## :rocket: Sobre o projeto

Criar um app utilizando a plataforma React Native com as seguintes características:
<p>
A tela principal do app, será um mapa com alguns pinos, e mais dois botões: Adicionar e Sincronizar.
<p>
Adicionar:
<p>
• O botão de Adicionar abre um formulário para o usuário digitar uma anotação, em um campo de texto longo, permitindo nova linha, etc...
• Ao salvar o texto, pegar a localização de GPS do app e a data/hora do momento e salvar no banco local do app.
• Esta operação de Adicionar deve funcionar 100% offline, onde o usuário pode registrar anotações sem ter sinal de internet 3G ou Wifi.
<p>
Sincronizar:
<p>
• Ao tocar em sincronizar, exibir a informação “Sincronização em andamento...” e, durante este processo, executar a seguinte tarefa:
• Para cada Anotação não sincronizada, enviar um post para uma API criada para este teste.
• Atenção: Não enviar anotações já sincronizadas.
• Se der certo, você vai receber um e‐mail com os dados enviados.
<p>
Pinos do Mapa:
<p>
• Para cada anotação registrada pelo usuário, deve ser exibido um pino no mapa, no ponto exato da localização capturada no momento em que a anotação foi registrada.
• Ao tocar no pino, mostrar a informação da anotação, com data e hora.
• Os pinos de anotações já sincronizadas, devem ser pintados de cinza, e os pinos de anotações não sincronizadas, devem ser pintados de verde.
• Os pinos do mapa devem ser exibidos mesmo que não tenha internet.

## :clipboard: Iniciando a aplicação Mobile (React-native)

1. Clone o repositório com `https://github.com/Samuel-Rodrigues/check_plant_mobile.git`
2. Instale todas as dependencias com o comando `yarn` depois: `cd ios; pod install; cd ..`
4. Digite `react-native run-ios` ou `react-native run-android`  para rodar o projeto

## :hammer: Ferramentas usadas

- ⚛️ **React-native** - Uma biblioteca JavaScript para criar mobile Apps 
- ⚛️ **Styled Components** - Biblioteca Javascript pra estilizar componentes
- 📄 **Axios** - Biblioteca Javascript para fazer requisições http
- 📄 **date-fns** - Formatar datas
- 📄 **react-native-geolocation-service** Lib para ajudar em coordenadas
- 📄 **Maps** Bibioteca para utlizar o maps do dispositivo
- 📄 **react-redux** Biblioteca para usar um estado global no React
- 📄 **redux-persist** Biblioteca para usar o banco de dados local e armazera um estado do redux
... entre outras.

## :camera: Demonstração
<h1 align="center"> <img alt="resultado" src="https://github.com/Samuel-Rodrigues/check_plant_mobile/blob/master/checkPlantGIF.gif"/>
</h1>

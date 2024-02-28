import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";
import DerivAPI from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPI";

const token = "ZZzdh0jfpRpT7NA";
const app_id = 52802;

function createWebSocket(app_id) {
  let connection;

  function connect() {
    connection = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`,
    );

    connection.onopen = function (event) {
      console.log("Conexão estabelecida:", event);
      connection;
    };

    connection.onmessage = function (event) {
      console.log("Mensagem recebida:", event.data);
    };

    connection.onclose = function (event) {
      console.log("Conexão fechada:", event);
      window.location.reload();
    };

    connection.onerror = function (event) {
      console.error("Erro na conexão:", event);
      window.location.reload();
    };
    return connection;
  }

  function reconnect() {
    console.log("Tentando reconectar em 500 milisegundos...");
    setTimeout(() => {
      connect();
    }, 500); // Tentar reconectar após 5 segundos
  }
  // Inicializa a conexão
  return connect();
}

const a1 = createWebSocket(app_id);
let api2 = new DerivAPI({connection: a1});
let api = api2.basic

const onCloseObservable = api.onClose();
const onOpenObservable = api.onOpen();

function criarParagrafo(texto) {
  // Crie um elemento de parágrafo
  var paragrafo = document.createElement("p");

  // Adicione texto ao parágrafo (opcional)
  paragrafo.textContent = texto || "Texto padrão para o parágrafo";

  // Adicione o parágrafo ao corpo do documento (ou qualquer outro elemento desejado)
  document.body.appendChild(paragrafo);
}

// Exemplo de uso

// Subscrever aos eventos de fechamento
onCloseObservable.subscribe(() => {
  console.log("Conexão fechada. Tentando reconectar...");
  window.location.reload();
  setTimeout(() => {
    try {
      // Usar o método reconnect() fornecido pela API
      api.closeHandler();
      api.reconnect();
      window.location.reload();
      console.log("Método closeHandler() chamado.");
      criarParagrafo("Conexão fechada");
    } catch (error) {
      console.error("Erro ao tentar reconectar:", error);
      api.closeHandler();
      api.reconnect();
      window.location.reload();
      console.log("Método closeHandler() chamado.");
    }
  }, 1000); // Tempo de espera de 1 segundos
});

window.addEventListener("offline", () => {
  console.log("O dispositivo está offline.");
  api.closeHandler();
  window.location.reload();
});

// Subscrever aos eventos de abertura
onOpenObservable.subscribe(() => {
  console.log("Conexão aberta.");
  autorization();
  tickSubscriber();
  ping();
});

const autorizacao = {
  authorize: "ZZzdh0jfpRpT7NA",
};
const autorization = () => api.authorize(autorizacao);

const balance1 = {
  balance: 1,
  subscribe: 1,
  account: "current",
  loginid: "VRTC2902626",
};

const balance2 = () => api.balance(balance1);

const simbolo = "R_25"

const ticks_history_request = {
  ticks_history: simbolo,

  count: 5,
  end: "latest",
  start: 1,
  style: "candles",
  granularity: 60,
  req_id: 3
};

const ticks_request = {
  ...ticks_history_request,
  subscribe: 1,
};

const getTicksHistory = () => api.ticksHistory(ticks_history_request);

const tickSubscriber = () => api.subscribe(ticks_request);


const ping = () => {
  setInterval(() => {
    api.ping();
  }, 15000);
};


const observable = api.onMessage(); // Assumindo que api.onMessage() retorna um Observable

let saldo;
let saldoAtual;
let balancinha;
let balanca3

const subscription1 = observable.subscribe((message) => {
  // Exibe os dados recebidos no console para depuração
  

  // Verifica se a estrutura da mensagem está conforme o esperado
  if (
    message &&
    message.name === 'message' &&
    message.data &&
    message.data.balance &&
    message.data.balance.balance !== undefined
  ) {
   saldo = message.data.balance.balance
   saldoAtual = parseFloat(saldo.toFixed(2));
   balancinha = saldoAtual * 0.3
   balanca3 = parseFloat(balancinha.toFixed(2))
    
  }
});



let timeepoch
let timeepoch3
let startTime
let endTime
const subscription2 = observable.subscribe((message) => {
  // Exibe os dados recebidos no console para depuração
  console.log("vix25:sub2")+console.log(message)

  // Verifica se a estrutura da mensagem está conforme o esperado
  if (
    message &&
    message.name === 'message' &&
    message.data &&
    message.data.ohlc &&
    message.data.ohlc !== undefined
  ) {
    getTicksHistory();
    console.log("vix25:ressub2")+console.log(message.data.ohlc.epoch)

    console.log("vix25:start:"+startTime+"vix25:end:"+endTime)
    timeepoch = message.data.ohlc.epoch;
    
    timeepoch3 = timeepoch % 60;
    
    
  }
});


let open3;
let close3;
let high3;
let low3;
let open2;
let close2;
let open1;
let close1;
let oc;
let ho;
let cl;
let hl;
let ochl;
let hohl;
let clhl;
let c1;
let c2;
let c3;
let c4;
let c5;
let c6;
let c7;
let c8;

const subscription3 = observable.subscribe((message) => {
  console.log("vix25:subs3")+ console.log(message)
  if (
    message &&
    message.name === 'message' &&
    message.data &&
    message.data.candles &&
    message.data.candles !== undefined
    ) {
    console.log("vix25:ressub3: ")+console.log(message.data.candles)
    open3 = message.data.candles[3].open;
    console.log("vix25:open3 "+open3)
    close3 = message.data.candles[3].close;
    console.log("vix25:close3 "+close3)
    high3 = message.data.candles[3].high;
    console.log("vix25:high3 "+high3)
    low3 = message.data.candles[3].low;
    console.log("vix25:low3 "+low3)
    open2 = message.data.candles[2].open;
    console.log("vix25:open2 "+open2)
    close2 = message.data.candles[2].close;
    console.log("vix25:close2 "+close2)
    open1 = message.data.candles[1].open;
    console.log("vix25:open1 "+open1)
    close1 = message.data.candles[1].close;
    console.log("vix25:close1 "+close1)

    oc = open3-close3
    console.log("vix25:oc "+oc)
    ho = high3-open3
    console.log("vix25:ho "+ho)
    cl = close3-low3
    console.log("vix25:cl "+cl)
    hl = high3-low3
    console.log("vix25:hl "+hl)
    ochl = oc/hl
    console.log("vix25:ochl "+ochl)
    hohl = ho/hl
    console.log("vix25:hohl "+hohl)
    clhl = cl/hl
    console.log("vix25:clhl "+clhl)

    c1 = ochl >= 0.05
    console.log("vix25:c1 "+c1)
    c2 = ochl <= 0.3
    console.log("vix25:c2 "+c2)
    c3 = hohl <=0.05
    console.log("vix25:c3 "+c3)
    c4 = clhl >=0.5
    console.log("vix25:c4 "+c4)
    c5 = open1 > close1
    console.log("vix25:c5 "+c5)
    c6 = open2 > close2
    console.log("vix25:c6 "+c6)
    c7 = open3 > close3
    console.log("vix25:c7 "+c7)
    c8 = open1 > open2
    console.log("vix25:c8 "+c8)
    }
})


const checkConditions = async () => {
  // Adicione a verificação do timeepoch aqui
  if (timeepoch3 >= 2 && timeepoch3 < 4) {
    // Avaliação preguiçosa
    if (c1 && c2 && c3) {
      // Avalia c4 somente se c3 for verdadeira
      if (c4) {
        // Avalia c5 somente se c4 for verdadeira
        if (c5) {
          if (c6) {
            if (c7) {
              if (c8) {
                // Continua para c6, c7, c8...
                console.log("vix10:Buy");
                console.log(timeepoch);
                // Chama a função de compra
                buy();
                return true;
              }
            }
          }
        }
      }
    }
  }
  
  return false;
};


const buyContract = {
  buy: 1,
  price: 25000,
  parameters: {
    contract_type: "CALL",
    amount: 50,
    basis: "stake",
    symbol: simbolo,
    currency: "USD",
    duration: 60,
    duration_unit: "s",
  }
};

const buy =  async () => {
  console.log("Iniciando buy()");
  api.buy(buyContract);
  console.log("Finalizando buy()")
  };


  const intervalTime = 1000; // Intervalo em milissegundos (2 segundos)
  const checkConditionsInterval = setInterval(() => {
  
    checkConditions();
  
  }, intervalTime);

let frames = 0;

const sprites = new Image();
sprites.src = './sprites/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [Plano de Fundo]
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

// [Chao]
function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;

      // console.log('[chao.x]', chao.x);
      // console.log('[repeteEm]',repeteEm);
      // console.log('[movimentacao]', movimentacao % repeteEm);
      
      chao.x = movimentacao % repeteEm;
    },
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
      );
  
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        chao.largura, chao.altura,
      );
    },
  };
  return chao;
}

function fazColisao(bird, chao) {
  const birdY = bird.y + bird.altura;
  const chaoY = chao.y;

  if(birdY >= chaoY) {
    return true;
  }

  return false;
}

function criabird() {
  const bird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      console.log('devo pular');
      console.log('[antes]', bird.velocidade);
      bird.velocidade =  - bird.pulo;
      console.log('[depois]', bird.velocidade);
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if(fazColisao(bird, globais.chao)) {
        console.log('Fez colisao');

        mudaParaTela(Telas.GAME_OVER);
        return;
      }
  
      bird.velocidade = bird.velocidade + bird.gravidade;
      bird.y = bird.y + bird.velocidade;
    },
    movimentos: [
      { spriteX: 0, spriteY: 0, }, // asa pra cima
      { spriteX: 0, spriteY: 26, }, // asa no meio 
      { spriteX: 0, spriteY: 52, }, // asa pra baixo
      { spriteX: 0, spriteY: 26, }, // asa no meio 
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {     
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;
      // console.log('passouOIntervalo', passouOIntervalo)

      if(passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + bird.frameAtual;
        const baseRepeticao = bird.movimentos.length;
        bird.frameAtual = incremento % baseRepeticao
      }
        // console.log('[incremento]', incremento);
        // console.log('[baseRepeticao]',baseRepeticao);
        // console.log('[frame]', incremento % baseRepeticao);
    },
    desenha() {
      bird.atualizaOFrameAtual();
      const { spriteX, spriteY } = bird.movimentos[bird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX, spriteY, // Sprite X, Sprite Y
        bird.largura, bird.altura, // Tamanho do recorte na sprite
        bird.x, bird.y,
        bird.largura, bird.altura,
      );
    }
  }
  return bird;  
}


/// [mensagemGetReady]
const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY,
      mensagemGetReady.w, mensagemGetReady.h,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h
    );
  }
}

// [mensagemGameOver]
const mensagemGameOver = {
  sX: 134,
  sY: 153,
  w: 226,
  h: 200,
  x: (canvas.width / 2) - 226 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGameOver.sX, mensagemGameOver.sY,
      mensagemGameOver.w, mensagemGameOver.h,
      mensagemGameOver.x, mensagemGameOver.y,
      mensagemGameOver.w, mensagemGameOver.h
    );
  }
}

// 
// [Canos]
// 

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach(function(par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;
  
        const canoCeuX = par.x;
        const canoCeuY = yRandom; 

        // [Cano do Céu]
        contexto.drawImage(
          sprites, 
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        )
        
        // [Cano do Chão]
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 
        contexto.drawImage(
          sprites, 
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        )

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },
    temColisaoComObird(par) {
      const cabecaDoFlappy = globais.bird.y;
      const peDoFlappy = globais.bird.y + globais.bird.altura;
      
      if((globais.bird.x + globais.bird.largura) >= par.x) {
        if(cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }

        if(peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }
      return false;
    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if(passou100Frames) {
        console.log('Passou 100 frames');
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        });
      }



      canos.pares.forEach(function(par) {
        par.x = par.x - 2;

        if(canos.temColisaoComObird(par)) {
          console.log('Você perdeu!')
          mudaParaTela(Telas.GAME_OVER);
        }

        if(par.x + canos.largura <= 0) {
          canos.pares.shift();
        }
      });

    }
  }

  return canos;
}

function criaPlacar() {
  const placar = {
    pontuacao: 0,
    maximo: 0,
    desenha() {
      contexto.font = '35px "VT323"';
      contexto.textAlign = 'right';
      contexto.fillStyle = 'white';
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);
    },
    atualiza() {
      const intervaloDeFrames = 20;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        placar.pontuacao = placar.pontuacao + 1;
      }
    }
  }
  return placar;
}


// 
// [Telas]
// 
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.rodando = true;
      globais.bird = criabird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha() {
      planoDeFundo.desenha();
      globais.bird.desenha();
      
      globais.chao.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();
    }
  }
};

Telas.JOGO = {
  inicializa() {
    globais.placar = criaPlacar();
  },
  desenha() {
    planoDeFundo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.bird.desenha();
    globais.placar.desenha();
  },
  click() {
    globais.bird.pula();
  },
  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.bird.atualiza();
    globais.placar.atualiza();
  }
};

Telas.GAME_OVER = {
  inicializa() {
    const login = usuarioAutenticado();
    const usuario = encontrarUsuarioPeloLogin(login);
    if (globais.placar.pontuacao > usuario.maximo) {
      globais.placar.maximo = globais.placar.pontuacao;
      atualizarMaximoDoUsuario(login, globais.placar.pontuacao);
    } else {
      globais.placar.maximo = usuario.maximo;
    }
  },
  desenha() {
    mensagemGameOver.desenha();
    contexto.font = '14px "VT323"';
    contexto.textAlign = 'right';
    contexto.fillStyle = 'black';
    contexto.fillText(globais.placar.pontuacao, 250, 142);
    contexto.fillText(globais.placar.maximo, 250, 182);
  },
  atualiza() {

  },
  click() {
    mudaParaTela(Telas.INICIO);
  }
}

function loop() {

  if (globais.rodando) {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
  }
}


canvas.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

function iniciarJogo() {
  mostraCanvas();
  mudaParaTela(Telas.INICIO);
  loop();
}





// gerenciamento das telas de login, cadastro e do jogo

function algumUsuarioAutenticado() {
  return usuarioAutenticado() !== null;
}

function autenticarUsuarioDoForm(form) {
  const data = new FormData(form);
  const login = data.get('login');
  const senha = data.get('senha');

  // como na criacao do usuario a senha nao foi salva como texto
  // plano, o primeiro passo da autenticacao passa a ser codificar a
  // senha recebida no formulario antes de compara-la com a senha
  // armazenada
  crypto.subtle
    .digest('SHA-256', new TextEncoder().encode(senha))
    .then(digest => {
      const usuario = encontrarUsuarioPeloLogin(login);
      if (usuario !== undefined && usuario.senha === buff2str(digest)) {
        form.reset();
        limpaErroNoForm('form-login', 'login');
        salvarUsuarioAutenticado(login);
        iniciarJogo();
        return;
      }
      mostraErroNoForm('form-login', 'login', 'login ou senha incorretos');
    });

  return false;
}

function criarUsuarioDoForm(form) {
  const data = new FormData(form);
  const login = data.get('login');
  const senha = data.get('senha');
  const avatar = data.get('avatar');
  if (validacaoFormCadastro(login, senha, avatar)) {
    // nao salvar a senha do usuario em texto plano
    crypto.subtle
      .digest('SHA-256', new TextEncoder().encode(senha))
      .then(digest => {
        form.reset();
        salvarUsuario(login, buff2str(digest), avatar);
        salvarUsuarioAutenticado(login);
        iniciarJogo();
      });
  }
  return false;
}

function sairDoJogo() {
  limparAutenticacao();
  mostraFormLogin();
}

function mostraErroNoForm(form, campo, erro) {
  const inputSelector = `article#${form} form input[name=${campo}]`;
  const inputElement = document.querySelector(inputSelector);
  inputElement.style.borderBottom = '1px solid red';
  inputElement.style.backgroundColor = '#fc0';

  const erroSelector = `article#${form} form label:has(> div input[name=${campo}]) .error`;
  const erroElement = document.querySelector(erroSelector);
  erroElement.innerHTML = erro;
  erroElement.style.display = 'block';
}

function limpaErroNoForm(form, campo) {
  const inputSelector = `article#${form} form input[name=${campo}]`;
  const inputElement = document.querySelector(inputSelector);
  inputElement.style.borderBottom = '1px solid #000';
  inputElement.style.backgroundColor = '#fff';
  const erroSelector = `article#${form} form label:has(> div input[name=${campo}]) .error`;
  const erroElement = document.querySelector(erroSelector);
  erroElement.style.display = 'none';
}

// funcoes de validacao de dados

function validacaoFormCadastro(login, senha, avatar) {
  // guarda estado final da validacao
  let valido = true;
  const validacaoLogin = validarLogin(login);
  if (validacaoLogin !== null) {
    mostraErroNoForm('form-cadastro', 'login', validacaoLogin);
    valido = false;
  } else {
    limpaErroNoForm('form-cadastro', 'login')
  }
  const validacaoSenha = validarSenha(senha);
  if (validacaoSenha !== null) {
    mostraErroNoForm('form-cadastro', 'senha', validacaoSenha);
    valido = false;
  } else {
    limpaErroNoForm('form-cadastro', 'senha')
  }
  return valido;
}

function validarLogin(login) {
  if (login.length < 3)
    return "login precisa ter mais de 3 caracteres";
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(login))
    return "login pode conter apenas letras, numeros ou underline";
  if (encontrarUsuarioPeloLogin(login) !== undefined)
    return "login ja existe";
  return null;
}

function validarSenha(senha) {
  if (senha.length < 3)
    return "senha precisa ter mais de 3 caracteres";
  return null;
}

// links entre artigos na pagina

function mostraFormLogin() {
  escondeCanvas();
  esconde('form-cadastro');
  mostra('form-login');
}

function mostraFormCadastro() {
  escondeCanvas();
  esconde('form-login');
  mostra('form-cadastro');
}

function mostraCanvas() {
  esconde('form-login');
  esconde('form-cadastro');
  mostra('game-container');
  document.getElementById('nome-usuario-autenticado').innerHTML = usuarioAutenticado();
}

function escondeCanvas() {
  globais.rodando = false;
  esconde('game-container');
}

// atalhos

function esconde(id) {
  document.getElementById(id).style.display = 'none';
}

function mostra(id) {
  document.getElementById(id).style.display = 'block';
}

// gerenciamento de usuarios

// chaveUsuarioAutenticado guarda o nome da chave em que o usuario
// autenticado atualmente fica armazenado no localStorage
const chaveUsuarioAutenticado = 'bird_usuario_autenticado';

// chaveTodosOsUsuarios guarda o nome da chave em que um array com
// todos os usuarios fica armazenado no localStorage
const chaveTodosOsUsuarios = 'bird_todos_os_usuarios';

// A funcao usuarioAutenticado retorna a estrutura de dados que
// representa o usuario autenticado no presente momento.  Antes de
// alguem se autenticar, esta funcao retorna `null`.
function usuarioAutenticado() {
  return window.localStorage.getItem(chaveUsuarioAutenticado);
}

// A funcao limparAutenticacao remove o valor associado a
// chaveUsuarioAutenticado e, consequentemente, funciona como um "log
// out".
function limparAutenticacao() {
  window.localStorage.removeItem(chaveUsuarioAutenticado);
}

// A funcao salvarUsuarioAutenticado armazena o login do usuario que
// acabou de ser autenticado sob a chave `chaveUsuarioAutenticado`
// dentro do `localStorage`
function salvarUsuarioAutenticado(login) {
  window.localStorage.setItem(chaveUsuarioAutenticado, login);
}

// A funcao encontrarUsuarioPeloLogin retorna um objeto com o usuario
// se o login existir ou `null` se o usuario nao existir
function encontrarUsuarioPeloLogin(login) {
  const todos = todosOsUsuarios();
  return todos[login];
}

// A funcao todosOsUsuarios retorna um objeto com todos os usuarios
// presentes sob a chave `chaveTodosOsUsuarios` no `localStorage`
function todosOsUsuarios() {
  let todos = window.localStorage.getItem(chaveTodosOsUsuarios);
  if (todos !== null)
    return JSON.parse(todos);//Utilização do JSON
  return {};
}

// A funcao salvarUsuario cria uma nova entrada no objeto sobre a
// chave `chaveTodosOsUsuarios` dentro do `localStorage`.
function salvarUsuario(login, senha, avatar) {
  const todos = todosOsUsuarios()
  todos[login] = { login, senha, avatar, maximo: 0 };
  window.localStorage.setItem(chaveTodosOsUsuarios, JSON.stringify(todos));
}

function atualizarMaximoDoUsuario(login, maximo) {
  const todos = todosOsUsuarios()
  const usuario = todos[login];
  if (usuario !== undefined) {
    usuario.maximo = maximo;
  }
  window.localStorage.setItem(chaveTodosOsUsuarios, JSON.stringify(todos));
}

function buff2str(buff) {
  return [...new Uint8Array(buff)]
    .map(x => x.toString(16))
    .join('');
}

// Entrada no jogo

if (algumUsuarioAutenticado()) {
  iniciarJogo();
} else {
  mostraFormLogin();
}

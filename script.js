console.log('Flappy bird');
const sprite = new Image();
sprite.src='imagens/sprites.png'
const canva= document.querySelector('canvas');
const contexto = canva.getContext('2d');
let janelaEl= document.querySelector('#janela');
let frames=0;

const fundo ={
    spriteX:390,
    spriteY:0,
    largura:275,
    altura:204,
    x:0,
    y:canva.height-315,
    desenha(){
        contexto.fillStyle= '#66F5FF';
        contexto.fillRect(0,0,canva.width,304);
        contexto.drawImage(
            sprite,
            fundo.spriteX,fundo.spriteY,
            fundo.largura,fundo.altura,
            fundo.x,fundo.y,
            fundo.largura,fundo.altura,
        );
        contexto.drawImage(
            sprite,
            fundo.spriteX,fundo.spriteY,
            fundo.largura,fundo.altura,
            (fundo.x+fundo.largura),fundo.y,
            fundo.largura,fundo.altura,
        );
    },
};
function criaChao(){
    const chao={
        spriteX:0,
        spriteY:610,
        largura:224,
        altura:112,
        x:0,
        y:canva.height-112,
        atualiza(){
            const movimentoChao=1;
            const repete= chao.largura/2;
            const movimentacao=chao.x-movimentoChao;
            chao.x=movimentacao% repete;
        },
        desenha(){
            contexto.drawImage(
            sprite,
            chao.spriteX,chao.spriteY,
            chao.largura,chao.altura,
            chao.x,chao.y,
            chao.largura,chao.altura,
            );
            contexto.drawImage(
                sprite,
                chao.spriteX,chao.spriteY,
                chao.largura,chao.altura,
                (chao.x+chao.largura),chao.y,
                chao.largura,chao.altura,
                );
        },
    };
    
    return chao;
}

function colisao(bird,chao){
   const birdY=bird.y+bird.altura;
   const chaoY= chao.y;
   if(birdY>=chaoY){
    return true;
   }
   return false;
}

function criaBird(){
    const bird ={
        spriteX:0,
        spriteY:0,
        largura:33,
        altura:24,
        x:10,
        y:50,
        velocidade:0,
        gravidade:0.25,
        pulo:4.6,
        pula(){
            bird.velocidade=-bird.pulo
        },        atualiza(){
            if(colisao(bird,globais.chao)){
                mudaTela(telas.INICIO);
                return;
            }
            bird.velocidade=bird.velocidade+bird.gravidade;
            bird.y=bird.y+bird.velocidade;
        },
        desenha(){
            contexto.drawImage(
                sprite,//imagem
                bird.spriteX,bird.spriteY,//valor em x e y
                bird.largura,bird.altura,// tamanho
                bird.x,bird.y,//valor x e y no canva
                bird.largura, bird.altura// tamanho no canva
                );
        }
    }
    return bird;
};
const getready ={
    spriteX:134,
    spriteY:0,
    largura:174,
    altura:152,
    x:(canva.width/2)-174/2,
    y:50,
    desenha(){
        contexto.drawImage(
            sprite,
            getready.spriteX,getready.spriteY,
            getready.largura,getready.altura,
            getready.x,getready.y,
            getready.largura,getready.altura,
        );
    },
}
function criaCano(){
    const canos={
        largura:52,
        altura:400,
        chao:{
            spriteX:0,
            spriteY:169,
        },
        ceu: {
            spriteX:52,
            spriteY:169,
        },
        espaco:80,
        desenha(){
            
            canos.pares.forEach(function(par){
                const espacamento=90;
                const Yrand= par.y;

                    //cano do alto
                const canoCeuX=par.x;
                const canoCeuY=Yrand;
                contexto.drawImage(
                    sprite,
                    canos.ceu.spriteX,canos.ceu.spriteY,
                    canos.largura,canos.altura,
                    canoCeuX,canoCeuY,
                    canos.largura,canos.altura,
                    );
                    // cano de baixo
                const canoChaoX=par.x;
                const canoChaoY=canos.altura+espacamento+Yrand;
                contexto.drawImage(
                    sprite,
                    canos.chao.spriteX,canos.chao.spriteY,
                    canos.largura,canos.altura,
                    canoChaoX,canoChaoY,
                    canos.largura,canos.altura,
                )
               
            })
           
        },
        colisaoNosCanos(par){
        },
        pares:[],
        atualiza(){
            const passou100Frames= frames%100===0;
            if (passou100Frames) {
                canos.pares.push({
                    x:canva.width,
                    y:-150*(Math.random()+1),
                
                })
            }
            canos.pares.forEach(function(par){
                par.x-=2;
                if(canos.colisaoNosCanos(par)){
                    console.log('trouxa');
                }

                if(par.x+canos.largura<=0){
                    canos.pares.shift();
                }

            })
        },
    };
    return canos;
}
const globais={};
let telaAtiva ={};
function mudaTela(novaTela){
    telaAtiva=novaTela;
    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
   
}
const telas ={
    INICIO:{
            inicializa(){
                globais.bird=criaBird();
                globais.chao=criaChao();
                globais.canos=criaCano();
            },
        desenha(){
            fundo.desenha();
            globais.canos.desenha();
            globais.bird.desenha();
            globais.chao.desenha();//funções que desenham o jogo
            //getready.desenha();
            
        },
        click(){
            mudaTela(telas.JOGO);
        },
        atualiza(){
            globais.chao.atualiza();
            globais.canos.atualiza();
        },
    },
    JOGO:{
        desenha(){
            globais.chao.desenha();//funções que desenham o jogo
            fundo.desenha();
            globais.bird.desenha();
            
        },
        click(){
            globais.bird.pula();
        },
        atualiza(){
            globais.bird.atualiza();//atualiza o passaro
        }
    },
}

function loop(){
   telaAtiva.desenha();
   telaAtiva.atualiza();
    frames+=1;
   requestAnimationFrame(loop);//função que reescreve o jogo
}

janelaEl.addEventListener('click',function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});
mudaTela(telas.INICIO);
loop();
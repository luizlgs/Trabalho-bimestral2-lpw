console.log('Flappy bird');
const sprite = new Image();
sprite.src='imagens/sprites.png'
const canva= document.querySelector('canvas');
const contexto = canva.getContext('2d');

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
const chao={
    spriteX:0,
    spriteY:610,
    largura:224,
    altura:112,
    x:0,
    y:canva.height-112,
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

const bird ={
    spriteX:0,
    spriteY:0,
    largura:33,
    altura:24,
    x:10,
    y:50,
    velocidade:0,
    gravidade:0.25,
    atualiza(){
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


function loop(){
   bird.atualiza();
   chao.desenha();
   fundo.desenha();
   bird.desenha();
   requestAnimationFrame(loop);//função que reescreve o jogo
}

loop();
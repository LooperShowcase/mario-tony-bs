kaboom({
  fullscreen: true,
  clearColor: [0.7, 0.7, 0.6, 1],
  global: true,
  scale: 2,
});

loadRoot("./sprites/");
loadSprite("ground", "block.png");
loadSprite("coin", "coin.png");
loadSprite("e_mushroom", "evil_mushroom.png");
loadSprite("mario", "mario.png");
loadSprite("peach", "princes.png");
loadSprite("star", "star.png");
loadSprite("surprise", "surprise.png");
loadSprite("Mushroom", "cc.png");
loadSprite("pipe", "pipe_up.png");
loadSound("jump", "jumpsound.mp3");
loadSound("gameSound", "gameSound.mp3");
loadSprite("unboxed", "unboxed.png");

let score = 0;

scene("game", () => {
  play("gameSound");
  layers(["bg", "obj", "ui"], "obj");

  const map = [
    "=                                                                                 ",
    "= =================================================                               ',                                                 ",
    "=                                                 =                               ",
    "=                                                 =                               ",
    "=                                                 =                               ",
    "=                                                 =                               ",
    "=                                                 =                              ",
    "=                                                 =                              ",
    "=                                                 =                              ",
    "=                                                 =                               ",
    "=                                                 =                               ",
    "=                                                 =                               ",
    "=                                             p   =                                ",
    "=                                               r =                                ",
    "=       cc   ==================   =?===============                              ",
    "=       -?                    ==                  =                               ",
    "=                                c                =                                ",
    "=       cc                       =========-       =                                       ",
    "=       ==                                        =                                 ",
    "=                                        c        =                                ",
    "=       c                                ==       =                                  ",
    "=       =d                     c    ==            =                                    ",
    "=                      cc    ===                  =                                  ",
    "=       c              ==                         =                                 ",
    "=       ==         ==                             =                                   ",
    "=               u                                 =                               ",
    "=           =====                                 =                                    ",
    "================================l==================                             ",
    "================================l==================                             ",

    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    "                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               ",
    " =                                                                               =========================================                                                    ",
    " =                                                                                                                       =          ",
    " =                                                                                                                       =       ",
    " =                                                                              ccccccccccccccccccccccccccccccccccccc  p =            ",
    " =                                                                              rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr    =                ",
    " =                                                                =    ===================================================            ",
    " =                                                                             =   ",
    " =                                                               =              =  ",
    " =                                                                  ==         =    ",
    " =                                                                             =  ",
    " =                                                                       d     =   ",
    " =                                                                             =  ",
    " =                                                                             =  ",
    " =                                                                       ==    =    ",
    " =                                                                             =  ",
    " =                                                                  ==         =    ",
    " =                                                            ==               =   ",
    " =                                                        -                    =   ",
    " =                                                                             =  ",
    " =                                                                             =  ",
    " =                                                        ?                    =   ",
    " =                                                                             = ",
    " =                                                                             =  ",
    " =                                                        -                    =   ",
    " =                                                                             =  ",
    " =                                                                             =  ",
    " =                                                        d                    =   ",
    " =                                                                             =  ",
    " =                                                      ===                    =     ",
    " =                                                    c                         =  ",
    " =                                                   ==                        =   ",
    " =                                                                             =  ",
    " =                                                      ===     c               =     ",
    " =                                                             ===    c         =     ",
    " =                                                                    ==       =   ",
    " =                                                                             =  ",
    " =                                                                             =  ",
    " =                                                                     -       =   ",
    " =                                                                             =  ",
    " =                                                                     c       =   ",
    " =                                                                     -       =   ",
    " =-------------                                                                =              ",
    " =               =                                                     c       =   ",
    " =ccccccccccccc                                                c       =       =   ",
    " ==============                                                ====            =     ",
    " =              ==                                        =                    =   ",
    " =                                                   =                         =  ",
    " =                                                                             =  ",
    " =              ===                              =                             =     ",
    " =                                          c                                   = ",
    " =                     ===           =      =                                  =     ",
    " =                                                                             = ",
    " =                           ====                                              =      ",
    " ================================================================================",
  ];
  const mapSymbols = {
    width: 20,
    height: 20,
    "=": [sprite("ground"), solid()],
    "-": [sprite("surprise"), solid(), "suprisee"],
    "?": [sprite("surprise"), solid(), "suprisee-Mushroom"],
    d: [sprite("surprise"), solid(), "suprisee-star"],
    s: [sprite("star"), solid(), "star", body()],
    m: [sprite("mario"), solid()],
    u: [sprite("e_mushroom"), solid(), "e_mushroom", body()],
    c: [sprite("coin"), "coins"],
    p: [sprite("pipe"), solid(), "pipe"],
    r: [sprite("peach"), solid()],
    l: [sprite("ground")],
    x: [sprite("unboxed"), solid()],
    n: [sprite("Mushroom"), solid(), "mushroom", body()],
  };
  const gameLevel = addLevel(map, mapSymbols);

  const scoreLable = add([text("score: " + score)]);

  const player = add([
    sprite("mario"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
    big(),
  ]);

  keyDown("right", () => {
    player.move(150, 0);
  });

  keyDown("left", () => {
    player.move(-150, 0);
  });

  keyDown("up", () => {
    if (player.grounded()) {
      play("jump");
      player.jump(330);
    }
  });

  player.on("headbump", (obj) => {
    if (obj.is("suprisee")) {
      console.log("you bumped");
      destroy(obj);
      gameLevel.spawn("x", obj.gridPos);
      gameLevel.spawn("c", obj.gridPos.sub(0, 1));
    }
    if (obj.is("suprisee-Mushroom")) {
      console.log("you bumped");
      destroy(obj);
      gameLevel.spawn("x", obj.gridPos);
      gameLevel.spawn("n", obj.gridPos.sub(0, 1));
    }
    if (obj.is("suprisee-star")) {
      console.log("you bumped");
      destroy(obj);
      gameLevel.spawn("x", obj.gridPos);
      gameLevel.spawn("s", obj.gridPos.sub(0, 1));
    }
  });

  action("star", (obj) => {
    obj.move(-15, 0);
  });

  action("mushroom", (obj) => {
    obj.move(15, 0);
  });

  player.collides("coins", (obj) => {
    score += 5;
    destroy(obj);
  });

  player.collides("star", (obj) => {
    score += 25;
    destroy(obj);
  });

  player.collides("mushroom", (obj) => {
    score += 15;
    destroy(obj);
    player.biggify(5);
  });

  player.collides("pipe", (obj) => {
  
    keyDown("enter", () => {
      go("win");
    });
  });

  player.action(() => {
    camPos(player.pos);
    scoreLable.pos = player.pos.sub(450, 220);
    scoreLable.text = "score: " + score;
  });

  action("e_mushroom", (obj) => {
    obj.move(-20, 0);
  });

  let isJumping = false;

  player.collides("e_mushroom", (obj) => {
    if (isJumping) {
      destroy(obj);
    } else {
      go("lose");
    }
  });

  player.action(() => {
    isJumping = !player.grounded();
  });

  //scene end
});

scene("lose", () => {
  add([
    text("GAME OVER\nPRESS SPACE", 64),
    origin("center"),
    pos(width() / 2, height() / 2),
  ]);

  keyDown("space", () => {
    go("game");
  });
});

scene("win", () => {
  add([text("YOU WON!", 64), origin("center"), pos(width() / 2, height() / 2)]);

  keyDown("space", () => {
    go("game");
  });
});

start("game");

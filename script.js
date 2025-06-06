const boardSize = 8;
const boardElem = document.getElementById('board');
const infoElem = document.getElementById('info');
const passBtn = document.getElementById('passBtn');

// 0 = 空, 1 = 黒, 2 = 白
let board = [];
let currentPlayer = 1; // 黒先手
let gameEnded = false;

// 方向ベクトル（8方向）
const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],          [0, 1],
  [1, -1],  [1, 0], [1, 1]
];

function initBoard() {
  board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(0));
  // 初期配置（中央4マス）
  board[3][3] = 2; // 左上白
  board[4][4] = 2; // 右下白
  board[3][4] = 1; // 右上黒
  board[4][3] = 1; // 左下黒
}

// ボード描画
function drawBoard() {
  boardElem.innerHTML = '';
  for(let r = 0; r < boardSize; r++) {
    for(let c = 0; c < boardSize; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', onCellClick);
      if(board[r][c] === 1) {
        const piece = document.createElement('div');
        piece.className = 'piece black';
        cell.appendChild(piece);
      } else if(board[r][c] === 2) {
        const piece = document.createElement('div');
        piece.className = 'piece white';
        cell.appendChild(piece);
      }
      boardElem.appendChild(cell);
    }
  }
}

// クリック処理
function onCellClick(e) {
  if(gameEnded) return;
  const r = Number(e.currentTarget.dataset.row);
  const c = Number(e.currentTarget.dataset.col);
  if(board[r][c] !== 0) return; // 空マスじゃない
  if(!isValidMove(r, c, currentPlayer)) return; // 合法手じゃない

  placePiece(r, c, currentPlayer);
  flipPieces(r, c, currentPlayer);
  switchPlayer();
  drawBoard();
  updateInfo();
  checkGameEnd();
}

// 合法手判定（少なくとも一方向で相手を挟めるか）
function isValidMove(r, c, player) {
  if(board[r][c] !== 0) return false;
  const opponent = player === 1 ? 2 : 1;
  for(const [dr, dc] of directions) {
    let nr = r + dr, nc = c + dc;
    let hasOpponentBetween = false;
    while(nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
      if(board[nr][nc] === opponent) {
        hasOpponentBetween = true;
      } else if(board[nr][nc] === player) {
        if(hasOpponentBetween) return true;
        else break;
      } else {
        break;
      }
      nr += dr;
      nc += dc;
    }
  }
  return false;
}

// 石を置く（配置）
function placePiece(r, c, player) {
  board[r][c] = player;
}

// 挟んだ相手の石を裏返す
function flipPieces(r, c, player) {
  const opponent = player === 1 ? 2 : 1;
  for(const [dr, dc] of directions) {
    let path = [];
    let nr = r + dr, nc = c + dc;
    while(nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
      if(board[nr][nc] === opponent) {
        path.push([nr, nc]);
      } else if(board[nr][nc] === player) {
        for(const [fr, fc] of path) {
          board[fr][fc] = player;
        }
        break;
      } else {
        break;
      }
      nr += dr;
      nc += dc;
    }
  }
}

// プレイヤー交代
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// 現在のプレイヤーの合法手があるか
function hasValidMoves(player) {
  for(let r=0; r<boardSize; r++) {
    for(let c=0; c<boardSize; c++) {
      if(isValidMove(r,c,player)) return true;
    }
  }
  return false;
}

// 情報表示更新
function updateInfo() {
  if(gameEnded) return;
  const playerStr = currentPlayer === 1 ? '黒' : '白';
  infoElem.textContent = `現在の手番: ${playerStr}`;
  // パスボタンの有効/無効切り替え
  if(hasValidMoves(currentPlayer)) {
    passBtn.disabled = true;
  } else {
    passBtn.disabled = false;
    infoElem.textContent += ' (パス可能)';
  }
}

// パス処理
passBtn.addEventListener('click', () => {
  if(gameEnded) return;
  if(!hasValidMoves(currentPlayer)) {
    switchPlayer();
    updateInfo();
    // 両者パスで終了判定
    if(!hasValidMoves(currentPlayer)) {
      gameEnded = true;
      showResult();
    }
  }
});

// ゲーム終了判定
function checkGameEnd() {
  // 全マス埋まったか
  let emptyCount = 0;
  for(let r=0; r<boardSize; r++) {
    for(let c=0; c<boardSize; c++) {
      if(board[r][c] === 0) emptyCount++;
    }
  }
  if(emptyCount === 0) {
    gameEnded = true;
    showResult();
    return;
  }
  // 両者とも合法手なしなら終了
  if(!hasValidMoves(1) && !hasValidMoves(2)) {
    gameEnded = true;
    showResult();
    return;
  }
}

// 勝者表示
function showResult() {
  let blackCount = 0, whiteCount = 0;
  for(let r=0; r<boardSize; r++) {
    for(let c=0; c<boardSize; c++) {
      if(board[r][c] === 1) blackCount++;
      else if(board[r][c] === 2) whiteCount++;
    }
  }
  let msg = `ゲーム終了！ 黒: ${blackCount} 個, 白: ${whiteCount} 個。 `;
  if(blackCount > whiteCount) msg += "黒の勝ち！";
  else if(whiteCount > blackCount) msg += "白の勝ち！";
  else msg += "引き分け！";

  infoElem.textContent = msg;
  passBtn.disabled = true;
}

// 初期化
function startGame() {
  initBoard();
  currentPlayer = 1;
  gameEnded = false;
  drawBoard();
  updateInfo();
}

startGame();

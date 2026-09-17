const CARDS = [
  { id: 'worker', name: '劳作者', type: 'worker', label: '人员', cost: 2, hp: 300, dps: 18, control: 3, glyph: '劳' },
  { id: 'carrier', name: '搬运队', type: 'carrier', label: '运输', cost: 2, hp: 260, dps: 12, control: 2, resourceBonus: 1, glyph: '运' },
  { id: 'guard', name: '守卫', type: 'guard', label: '人员', cost: 4, hp: 540, dps: 45, control: 1, glyph: '卫' },
  { id: 'builder', name: '筑堤工', type: 'worker', label: '人员', cost: 3, hp: 380, dps: 18, control: 2, glyph: '堤' },
  { id: 'fence', name: '木栅', type: 'facility', label: '设施', cost: 3, hp: 700, dps: 0, control: 0, glyph: '栅' },
  { id: 'store', name: '临时堆场', type: 'facility', label: '设施', cost: 3, hp: 520, dps: 0, control: 1, glyph: '仓' },
  { id: 'labor', name: '集中劳力', type: 'strategy', label: '策略', cost: 3, spell: 'labor', glyph: '聚' },
  { id: 'redeploy', name: '重新部署', type: 'strategy', label: '策略', cost: 2, spell: 'redeploy', glyph: '转' },
];
// 第一章全部战斗牌。高级牌沿用同一套稳定的竞技单位规则，以功能取向区分构筑。
const EXTRA_CARDS = [
  {id:'farmer',name:'农人',type:'worker',label:'人员',cost:2,hp:280,dps:12,control:4,glyph:'农'},
  {id:'forest',name:'林地采集队',type:'carrier',label:'运输',cost:3,hp:330,dps:15,control:3,glyph:'林'},
  {id:'raft',name:'渡河筏队',type:'carrier',label:'运输',cost:3,hp:310,dps:14,control:3,glyph:'筏'},
  {id:'repair',name:'抢修',type:'strategy',label:'策略',cost:2,spell:'labor',glyph:'修'},
  {id:'warehouse',name:'仓储点',type:'facility',label:'设施',cost:3,hp:560,dps:0,control:2,glyph:'仓'},
  {id:'watch',name:'轮值守备',type:'guard',label:'人员',cost:3,hp:430,dps:34,control:1,glyph:'守'},
  {id:'dock',name:'临时码头',type:'facility',label:'设施',cost:3,hp:520,dps:0,control:2,glyph:'泊'},
  {id:'boatman',name:'舟师',type:'carrier',label:'运输',cost:3,hp:340,dps:16,control:2,glyph:'舟'},
  {id:'waterroute',name:'水路转运',type:'strategy',label:'策略',cost:2,spell:'redeploy',glyph:'航'},
  {id:'ditch',name:'引水沟',type:'facility',label:'设施',cost:3,hp:600,dps:0,control:2,glyph:'渠'},
  {id:'canal',name:'开渠',type:'strategy',label:'策略',cost:5,spell:'labor',glyph:'开'},
  {id:'dam',name:'加固坝体',type:'facility',label:'设施',cost:4,hp:780,dps:0,control:1,glyph:'坝'},
  {id:'jointdam',name:'联合筑堤',type:'worker',label:'人员',cost:4,hp:460,dps:18,control:3,glyph:'联'},
  {id:'levy',name:'集中征调',type:'strategy',label:'策略',cost:4,spell:'labor',glyph:'征'},
  {id:'floodgate',name:'应急泄洪',type:'strategy',label:'策略',cost:3,spell:'redeploy',glyph:'泄'},
  {id:'survey',name:'勘料队',type:'worker',label:'人员',cost:2,hp:270,dps:10,control:3,glyph:'勘'},
  {id:'jadehaul',name:'玉料搬运队',type:'carrier',label:'运输',cost:3,hp:300,dps:14,control:3,glyph:'玉'},
  {id:'finehaul',name:'精细运输',type:'strategy',label:'策略',cost:3,spell:'redeploy',glyph:'精'},
  {id:'jadecraft',name:'玉工',type:'worker',label:'人员',cost:4,hp:370,dps:24,control:3,glyph:'工'},
  {id:'workshop',name:'玉作工棚',type:'facility',label:'设施',cost:4,hp:620,dps:0,control:2,glyph:'作'},
  {id:'grind',name:'砂水研磨',type:'strategy',label:'策略',cost:3,spell:'labor',glyph:'磨'},
  {id:'calibrate',name:'工艺校准',type:'strategy',label:'策略',cost:3,spell:'redeploy',glyph:'准'},
  {id:'ritual',name:'礼器筹备',type:'worker',label:'人员',cost:4,hp:380,dps:14,control:4,glyph:'礼'},
  {id:'envoy',name:'使者',type:'worker',label:'人员',cost:3,hp:300,dps:12,control:3,glyph:'使'},
  {id:'convoy',name:'联合航运',type:'carrier',label:'运输',cost:4,hp:420,dps:18,control:3,glyph:'航'},
  {id:'blockade',name:'水路封锁',type:'guard',label:'人员',cost:4,hp:490,dps:38,control:1,glyph:'封'},
  {id:'shrine',name:'祭仪场',type:'facility',label:'设施',cost:5,hp:700,dps:0,control:3,glyph:'祭'},
  {id:'summit',name:'会盟使者',type:'worker',label:'人员',cost:4,hp:390,dps:18,control:3,glyph:'盟'},
];
const CARD_LIBRARY = Object.fromEntries([...CARDS, ...EXTRA_CARDS].map((card) => [card.name, card]));

// #1 教学聚落：同样使用标准卡牌数值，但不会像高难度 NPC 那样连续压线。
const ENEMY_DECK = [CARDS[0], CARDS[1], CARDS[3], CARDS[4], CARDS[0], CARDS[1], CARDS[3], CARDS[5]];
const NODE_NAMES = ['北岸稻作区', '河湾渡口', '南侧林地'];
const RESOURCE_NODES = new Set([0, 2]);
const $ = (id) => document.getElementById(id);
const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
let state;
let battleFinishHandler = null;
let battleConfig = { kind:'standard', label:'控制更多节点以获胜', target:100 };
let battleSession = 0;

function freshState() {
  const playerDeck = battleConfig.deck?.map((name) => CARD_LIBRARY[name]).filter(Boolean);
  return {
    time: 180, energy: 5, enemyEnergy: 5, deck: playerDeck?.length ? playerDeck : [...CARDS], enemyDeck: [...ENEMY_DECK], hand: [], next: 0,
    selected: null, drag: null, justDropped: false, nodes: [0, 0, 0], units: [[], [], []], id: 0,
    laborBuffs: [0, 0, 0], leaderReady: true, relicUsed: false, firstLost: false, craftRefundUsed:false, objectiveProgress:0, integrity:100,
    // 教学聚落先给玩家建立第一处优势的窗口；后续仍保持持续换线压力。
    lastTick: performance.now(), regenClock: 0, enemyClock: 10.5, running: true, messageClock: 0,
  };
}

function start() {
  const session = ++battleSession;
  state = freshState();
  state.session = session;
  // 战斗入口一次性装入四张手牌；不依赖旧局残留的抽牌游标。
  if (!state.deck.length) state.deck = [...CARDS];
  state.hand = state.deck.slice(0, 4);
  state.next = state.hand.length % state.deck.length;
  $('result-overlay').hidden = true;
  $('battle-objective').textContent = battleConfig.label;
  const artifacts = battleConfig.artifacts || [];
  $('relic-left').querySelector('span').textContent = artifacts[0] || '未装备';
  $('relic-right').querySelector('span').textContent = artifacts[1] || '未装备';
  say(`按住一张手牌，拖到任意战略节点后松开 · 手牌 ${state.hand.length}/4`);
  render();
  requestAnimationFrame((now) => loop(now, session));
}

function draw() {
  state.hand.push(state.deck[state.next]);
  state.next = (state.next + 1) % state.deck.length;
}

function say(message) {
  $('notice').textContent = message;
  state.messageClock = 2.4;
}

function play(index, nodeIndex) {
  const card = state.hand[index];
  if (!card || state.energy < card.cost || !state.running) return;
  state.energy -= card.cost;
  state.hand.splice(index, 1);
  draw();
  state.selected = null;
  if (card.spell === 'labor') {
    state.laborBuffs[nodeIndex] = 8;
    say(`${NODE_NAMES[nodeIndex]}：劳作单位争夺 +30%（8秒）`);
  } else if (card.spell === 'redeploy') {
    const unit = closestFriendly(nodeIndex);
    if (unit) { unit.controlBoost = 1.2; unit.boostTime = 5; say(`${unit.card.name}已重新部署到${NODE_NAMES[nodeIndex]}`); }
    else { spawn(card, nodeIndex, 'player'); say('没有可重新部署的单位，策略转为鼓舞驻守者'); state.laborBuffs[nodeIndex] = 4; }
  } else {
    spawn(card, nodeIndex, 'player');
    const craftRefund = card.type === 'facility' && !state.craftRefundUsed && (battleConfig.artifacts || []).includes('玉梳背');
    if (craftRefund) { state.craftRefundUsed = true; state.energy = Math.min(10, state.energy + 1); }
    say(`${card.name}已前往${NODE_NAMES[nodeIndex]} · 剩余 ${state.energy} 动员力${craftRefund?' · 玉梳背返还 1 点':''}`);
  }
  render();
}

function spawn(card, node, team) {
  const unit = { id: ++state.id, card, team, hp: card.hp, maxHp: card.hp, dps: card.dps || 0, control: card.control || 0, born: 0, controlBoost: 1, boostTime: 0 };
  state.units[node].push(unit);
}

function closestFriendly(node) {
  const local = state.units[node].filter((u) => u.team === 'player' && u.card.type !== 'facility');
  if (local.length) return local[0];
  return state.units.flat().find((u) => u.team === 'player' && u.card.type !== 'facility');
}

function enemyPlay() {
  if (state.enemyEnergy < 2) return;
  // 第一关只验证基础占点：乌墩不会把单位无限堆进战场。
  // 难度来自换线时机，后续原型再逐步解除此训练轮限制。
  if (state.units.flat().filter((unit) => unit.team === 'enemy').length >= (battleConfig.enemyCap ?? 3)) return;
  // 教学 AI 优先对玩家已经建立的据点做单线回应，并保留明显的可乘之机。
  const playerHeld = state.nodes.map((value, index) => ({ value, index })).filter(({ value }) => value > 12);
  let target = playerHeld.length ? playerHeld.sort((a, b) => b.value - a.value)[0].index : Math.floor(Math.random() * 3);
  if (Math.random() < 0.38) target = Math.floor(Math.random() * 3);
  const affordable = state.enemyDeck.filter((card) => card.cost <= state.enemyEnergy && !card.spell);
  if (!affordable.length) return;
  const card = affordable[Math.floor(Math.random() * affordable.length)];
  state.enemyEnergy -= card.cost;
  spawn(card, target, 'enemy');
}

function update(dt) {
  const regenEvery = state.time > 60 ? 2.8 : 1.4;
  state.regenClock += dt;
  while (state.regenClock >= regenEvery) {
    state.regenClock -= regenEvery;
    state.energy = Math.min(10, state.energy + 1);
    state.enemyEnergy = Math.min(10, state.enemyEnergy + 1);
  }
  state.enemyClock -= dt;
  if (state.enemyClock <= 0) { enemyPlay(); state.enemyClock = 3.8 + Math.random() * 1.8; }
  state.messageClock -= dt;
  if (state.messageClock < 0) $('notice').textContent = state.selected === null ? '按住手牌，拖到战略节点后松开' : `已选「${state.hand[state.selected].name}」· 点选部署节点`;

  for (let n = 0; n < 3; n += 1) {
    state.laborBuffs[n] = Math.max(0, state.laborBuffs[n] - dt);
    const group = state.units[n];
    const playerUnits = group.filter((u) => u.team === 'player');
    const enemyUnits = group.filter((u) => u.team === 'enemy');
    dealDamage(playerUnits, enemyUnits, dt);
    dealDamage(enemyUnits, playerUnits, dt);
    state.units[n] = group.filter((u) => u.hp > 0);
    const p = controlValue(state.units[n], 'player', n);
    const e = controlValue(state.units[n], 'enemy', n);
    const before = state.nodes[n];
    state.nodes[n] = clamp(before + 1.5 * (p - e) * dt, -100, 100);
    if (before > 0 && state.nodes[n] <= 0 && !state.firstLost && (battleConfig.artifacts || []).includes('玉钺')) {
      state.firstLost = true;
      state.units[n].filter((u) => u.team === 'player' && u.card.id === 'guard').forEach((u) => { u.controlBoost = 1.2; u.boostTime = 8; });
      say('玉钺响应：守卫短暂强化');
    }
    if (!state.relicUsed && state.nodes.filter((v) => v >= 100).length >= 2 && (battleConfig.artifacts || []).includes('玉璧')) {
      state.relicUsed = true; state.energy = Math.min(10, state.energy + 1); say('玉璧响应：双节点控制，返还1点动员力');
    }
  }
  updateObjective(dt);
  state.units.flat().forEach((u) => { if (u.boostTime > 0) { u.boostTime -= dt; if (u.boostTime <= 0) u.controlBoost = 1; } });
}

function updateObjective(dt) {
  const held = state.nodes.filter((value) => value > 0).length;
  if (battleConfig.kind === 'engineering') state.objectiveProgress = clamp(state.objectiveProgress + (state.nodes[1] > 0 ? 1.35 : 0) * dt, 0, battleConfig.target);
  if (battleConfig.kind === 'transport') state.objectiveProgress = clamp(state.objectiveProgress + (state.nodes[0] > 0 && state.nodes[2] > 0 ? 1.1 : 0) * dt, 0, battleConfig.target);
  if (battleConfig.kind === 'production') state.objectiveProgress = clamp(state.objectiveProgress + (held >= (battleConfig.requiredHeld || 2) ? 1.05 : 0) * dt, 0, battleConfig.target);
  if (battleConfig.kind === 'crisis') state.integrity = clamp(state.integrity - (3 - held) * (battleConfig.crisisLossRate || .18) * dt, 0, 100);
  // 终局不是普通的“点数更多即胜”：两个被选中的遗存点必须同时被保住。
  if (battleConfig.kind === 'terminal') {
    const protectedNodes = battleConfig.protectedNodes || [0, 1];
    const terminalTargets = battleConfig.terminalTargets;
    const isIntact = (target) => target === 3 ? state.nodes[0] > 0 && state.nodes[2] > 0 : state.nodes[target] > 0;
    const intact = terminalTargets ? terminalTargets.filter(isIntact).length : protectedNodes.filter((index) => state.nodes[index] > 0).length;
    const required = terminalTargets?.length || protectedNodes.length;
    state.objectiveProgress = intact;
    $('battle-objective').textContent = `${battleConfig.label} ${intact} / ${required}`;
  }
  if (battleConfig.kind === 'engineering' || battleConfig.kind === 'transport' || battleConfig.kind === 'production') $('battle-objective').textContent = `${battleConfig.label} ${Math.round(state.objectiveProgress)} / ${battleConfig.target}`;
  if (battleConfig.kind === 'crisis') $('battle-objective').textContent = `${battleConfig.label} 保全 ${Math.round(state.integrity)}%`;
}

function controlValue(units, team, node) {
  return units.filter((u) => u.team === team).reduce((total, u) => {
    let result = u.control * u.controlBoost;
    if (team === 'player' && state.laborBuffs[node] > 0 && ['worker', 'carrier'].includes(u.card.type)) result *= 1.3;
    if (u.card.id === 'carrier' && RESOURCE_NODES.has(node)) result += 1;
    if (team === 'player' && node === 1 && (battleConfig.artifacts || []).includes('玉琮')) result += .7;
    if (team === 'enemy' && units.some((x) => x.team === 'player' && x.card.id === 'guard')) result = Math.max(0, result - 1);
    return total + result;
  }, 0);
}

function dealDamage(attackers, defenders, dt) {
  const target = defenders.find((u) => u.card.type !== 'facility') || defenders[0];
  if (!target) return;
  const damage = attackers.reduce((sum, u) => sum + u.dps * (u.controlBoost > 1 ? 1.2 : 1), 0) * dt;
  target.hp -= damage;
}

function leaderSkill() {
  if (!state.leaderReady || !state.running) { say('领袖技能尚未就绪'); return; }
  const target = state.selectedNode ?? state.nodes.indexOf(Math.min(...state.nodes));
  const collaborative = battleConfig.leaderStyle === '协作';
  state.leaderReady = false;
  if (collaborative) state.laborBuffs.forEach((_, index) => { state.laborBuffs[index] = Math.max(state.laborBuffs[index], index === target ? 8 : 4); });
  else state.laborBuffs[target] = Math.max(state.laborBuffs[target], battleConfig.leaderStyle === '集中' ? 12 : 8);
  say(collaborative ? `协作动员：全线响应，${NODE_NAMES[target]}优先` : `领袖发动聚力：${NODE_NAMES[target]}争夺提升`);
  setTimeout(() => { if (state.running) { state.leaderReady = true; render(); } }, (battleConfig.artifacts || []).includes('三叉形玉器') ? 18000 : 24000);
  render();
}

function loop(now, session) {
  if (!state.running || state.session !== session) return;
  const dt = Math.min(.1, (now - state.lastTick) / 1000);
  state.lastTick = now;
  state.time = Math.max(0, state.time - dt);
  update(dt);
  if (state.time <= 0) finish();
  render();
  if (state.running && state.session === session) requestAnimationFrame((next) => loop(next, session));
}

function finish() {
  state.running = false;
  const playerNodes = state.nodes.filter((v) => v > 0).length;
  const enemyNodes = state.nodes.filter((v) => v < 0).length;
  const playerTotal = state.nodes.reduce((a, b) => a + b, 0);
  let won = playerNodes >= (battleConfig.requiredNodes || 2) && playerNodes > enemyNodes;
  if (['engineering','transport','production'].includes(battleConfig.kind)) won = state.objectiveProgress >= battleConfig.target;
  if (battleConfig.kind === 'crisis') won = state.integrity >= 45;
  if (battleConfig.kind === 'terminal') won = state.objectiveProgress >= (battleConfig.terminalTargets?.length || battleConfig.protectedNodes || [0, 1]).length;
  state.battleWon = won;
  $('result-kicker').textContent = '河湾争域结束';
  $('result-title').textContent = won ? battleConfig.kind === 'crisis' ? '聚落渡过危机' : battleConfig.kind === 'terminal' ? '遗存被保全' : '河湾已守住' : playerNodes === enemyNodes ? '河湾尚未分出归属' : '乌墩夺下河湾';
  $('result-score').innerHTML = `${playerNodes} <i>:</i> ${enemyNodes}`;
  $('result-detail').textContent = won ? battleConfig.kind === 'terminal' ? '你留下了足以被后世辨认的核心遗存。' : '你完成了当前目标。下一步可将这份优势带回文明地图。' : '复盘节点与动员力，再用另一套出牌节奏挑战。';
  $('result-overlay').hidden = false;
}

function render() {
  const minutes = Math.floor(state.time / 60); const seconds = Math.floor(state.time % 60);
  $('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  $('timer').style.color = state.time <= 30 ? '#f0b292' : '';
  $('energy-number').textContent = state.energy;
  $('deck-count').textContent = state.deck.length;
  $('energy-pips').innerHTML = Array.from({ length: 10 }, (_, i) => `<i class="pip ${i < state.energy ? 'filled' : ''}"></i>`).join('');
  $('hand').innerHTML = state.hand.map((card, index) => `<button class="card ${state.selected === index ? 'selected' : ''} ${state.drag?.index === index ? 'drag-source' : ''} ${state.energy < card.cost ? 'disabled' : ''}" data-card="${index}" data-type="${card.type}" aria-label="${card.name}，${card.cost}点动员力"><span class="cost">${card.cost}</span><span class="type">${card.label}</span><span class="sub">${card.spell ? '指令' : `${card.control || 0} 争夺`}</span><strong>${card.name}</strong></button>`).join('');
  document.querySelectorAll('[data-card]').forEach(bindCardGesture);
  for (let n = 0; n < 3; n += 1) {
    const value = state.nodes[n]; const amount = Math.abs(value) / 2;
    const fill = $(`control-${n}`); fill.style.width = `${amount}%`; fill.style.left = value >= 0 ? '50%' : `${50 - amount}%`; fill.style.background = value >= 0 ? 'var(--jade-bright)' : 'var(--enemy-light)';
    $(`control-value-${n}`).textContent = Math.round(value);
    $(`score-${n}`).textContent = value > 4 ? '河湾聚落控制' : value < -4 ? '乌墩聚落控制' : '争夺中';
    $(`mini-${n}`).style.background = value > 4 ? 'var(--jade)' : value < -4 ? 'var(--enemy)' : '#dcd6c37a';
    const nodeEl = document.querySelector(`[data-node="${n}"]`); nodeEl.classList.toggle('selected', state.selectedNode === n || (state.selected !== null && state.selectedNode === n));
    $(`units-${n}`).innerHTML = state.units[n].map((u, i) => {
      const x = 20 + ((i * 37 + u.id * 13) % 61); const y = 38 + ((i * 23 + u.id * 7) % 38); const cls = `${u.team} ${u.card.id === 'guard' ? 'guard' : ''} ${u.card.type === 'facility' ? 'facility' : ''}`;
      return `<div class="unit ${cls}" style="left:${x}%;top:${y}%" title="${u.team === 'player' ? '我方' : '乌墩'} ${u.card.name}">${u.card.glyph}<span class="hp"><i style="width:${Math.max(0, u.hp / u.maxHp * 100)}%"></i></span></div>`;
    }).join('');
  }
  $('leader-skill').classList.toggle('cooldown', !state.leaderReady);
  $('leader-skill').querySelector('span').textContent = state.leaderReady ? '就绪' : '冷却';
}

document.querySelectorAll('.node').forEach((node) => {
  const activate = () => { if (state.justDropped || performance.now() < (state.suppressClickUntil || 0)) return; const n = Number(node.dataset.node); state.selectedNode = n; if (state.selected !== null) play(state.selected, n); else { say(`${NODE_NAMES[n]}：${Math.round(state.nodes[n])} 控制值`); render(); } };
  node.addEventListener('click', activate); node.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') activate(); });
});
$('leader-skill').addEventListener('click', leaderSkill);
$('rules-button').addEventListener('click', () => $('rules-dialog').showModal());
$('close-dialog').addEventListener('click', () => $('rules-dialog').close());
$('restart-button').addEventListener('click', () => {
  if (battleFinishHandler) {
    const handler = battleFinishHandler;
    battleFinishHandler = null;
    $('result-overlay').hidden = true;
    handler(state.battleWon);
    return;
  }
  start();
});

function bindCardGesture(button) {
  button.addEventListener('pointerdown', (event) => {
    const index = Number(button.dataset.card);
    if (state.energy < state.hand[index].cost) { say('动员力不足'); return; }
    state.drag = { index, startX: event.clientX, startY: event.clientY, active: false, ghost: null };
  });
  button.addEventListener('click', () => {
    if (state.justDropped || performance.now() < (state.suppressClickUntil || 0)) return;
    const index = Number(button.dataset.card);
    if (state.energy < state.hand[index].cost) { say('动员力不足'); return; }
    state.selected = state.selected === index ? null : index;
    render();
  });
}

document.addEventListener('pointermove', (event) => {
  if (!state?.drag) return;
  const drag = state.drag;
  if (!drag.active && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 8) {
    drag.active = true;
    const card = state.hand[drag.index];
    drag.ghost = document.createElement('div');
    drag.ghost.className = 'drag-ghost';
    drag.ghost.innerHTML = `<span>${card.cost}</span><b>${card.name}</b>`;
    document.body.append(drag.ghost);
    render();
    say(`拖动「${card.name}」到发光节点`);
  }
  if (!drag.active) return;
  drag.ghost.style.left = `${event.clientX}px`; drag.ghost.style.top = `${event.clientY}px`;
  const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('.node');
  document.querySelectorAll('.node').forEach((node) => node.classList.toggle('drop-target', node === target));
});

document.addEventListener('pointerup', (event) => {
  if (!state?.drag) return;
  const drag = state.drag;
  const target = drag.active ? document.elementFromPoint(event.clientX, event.clientY)?.closest('.node') : null;
  drag.ghost?.remove();
  document.querySelectorAll('.node').forEach((node) => node.classList.remove('drop-target'));
  state.drag = null;
  if (target) {
    state.justDropped = true;
    state.suppressClickUntil = performance.now() + 240;
    play(drag.index, Number(target.dataset.node));
    setTimeout(() => { if (state && performance.now() >= state.suppressClickUntil) state.justDropped = false; }, 250);
  } else if (drag.active) {
    say('拖到节点内再松手，即可部署');
    render();
  }
});
window.CivilizationBattle = {
  launch(onFinish, config = {}) { battleFinishHandler = onFinish; battleConfig = {kind:'standard', label:'控制更多节点以获胜', target:100, ...config}; $('restart-button').textContent = '返回文明地图'; start(); },
  stop() { battleSession += 1; if (state) state.running = false; },
};

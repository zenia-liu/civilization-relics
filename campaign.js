const CHAPTER_NODES = [
  ['河湾落脚','battle','控制至少两个河湾节点，建立第一块聚落核心地。','权势 +1，木材 +10'],
  ['水从哪里来','battle','夺下上游取水点，让稻田不再看天吃饭。','水利 +2，粮食产出 +4'],
  ['第一片稻田','build','安排农人整地，完成第一片稳定稻田。','生计 +3，解锁农人'],
  ['林地之争','diplomacy','乌墩控制着林地。谈成交换，或以争域取得木材。','木材来源，解锁林地采集队'],
  ['渡口','battle','控制跨河通道，让聚落不再被河流隔开。','交流 +2，解锁渡河筏队'],
  ['雨季来了','battle','守住稻田与住宅，别让第一场洪水毁掉收成。','水利 +2，解锁抢修'],
  ['仓中有粮','choice','第一次粮食盈余：存起来，还是继续扩田？','仓储或扩田路线'],
  ['一个真正的聚落','battle','抵御周边势力的试探，守住两个节点。','权势 +2，解锁轮值守备'],
  ['河流之外','explore','沿河网向北探索，南泽的船影出现在雾中。','交流 +1，发现南泽'],
  ['抢在涨水前','battle','在涨水前控制天然码头。','交流 +2，解锁临时码头'],
  ['第一支舟队','battle','保证来源与目的地，完成第一批河运。','水利 +1，交流 +2，解锁舟师'],
  ['水路转运','battle','使用舟师换线调动，在渡口完成战术争域。','交流 +1，解锁水路转运'],
  ['上游窄口','diplomacy','南泽守住上游。共享水源，或夺下窄口。','水利与关系分支，解锁引水沟'],
  ['堵，还是疏','choice','决定主要治水思路：开渠疏导，或加固坝体。','水利 +5，路线卡'],
  ['联合修坝','diplomacy','乌墩愿意共同修坝，但要付出互信。','合作或集中征调路线'],
  ['大水','battle','洪水中的三目标防守：堤坝、稻田、居住区。','水利 +5，解锁应急泄洪'],
  ['河滩里的石头','event','河滩冲出一块质地异常的石料。','玉料 +1，工艺 +1'],
  ['料从哪儿来','battle','沿三条线索探索玉料来源。','工艺 +1，交流 +2，解锁勘料队'],
  ['山前料场','diplomacy','岭前拥有稳定玉料。通过交易或争域建立路线。','玉料 +2，解锁玉料搬运队'],
  ['不能摔的东西','battle','护送高价值玉料，损失会改变之后的工艺。','工艺 +2，解锁精细运输'],
  ['第一间玉作坊','build','投入木材与玉料，建立第一间玉作坊。','工艺 +5，解锁玉工'],
  ['谁来治玉','event','从工匠中选择玉作负责人。','工艺 +3，解锁玉作工棚'],
  ['切、钻、磨','battle','同时维持原料、加工与研磨三处生产节点。','工艺 +5，解锁砂水研磨'],
  ['一件不该浪费的玉','battle','完成第一次高等级玉器制作。','获得第一件核心文物'],
  ['人越来越多','build','获取聚落扩展区，解决人口与居所压力。','生计 +4，人口容量 +60'],
  ['谁来管理这些人','choice','在分散协作与集中组织之间选择。','交流或权势路线'],
  ['远方的来客','event','与外来群体进行第一次正式交换。','交流 +5，解锁使者'],
  ['水路是谁的','diplomacy','南泽与河湾必须决定主航道归属。','联合航运或水路封锁'],
  ['仪式需要什么','battle','争取中心高地，为公共仪式与集会取得空间。','礼制 +7，解锁祭仪场'],
  ['玉不只是玉','event','让工艺、礼制与权势共同塑造第二件器物。','获得第二件核心文物'],
  ['三个聚落的会盟','diplomacy','乌墩、南泽、岭前重新确定区域关系。','交流、礼制、权势 +3'],
  ['谁是区域中心','battle','按你的文明路线证明谁是区域中心。','主路线 +5，文明阶段升级'],
  ['河道开始改变','battle','航道淤积，水路优势正缓慢消失。','降低水运损失'],
  ['粮食与人','battle','在危机中保证粮食供给与人口区域。','生计检验'],
  ['玉料断了','diplomacy','岭前的玉料网络突然中断。','维持玉料或进入紧缩'],
  ['盟友还算盟友吗','event','过去的信用与关系，在危机前集中结算。','决定大水援助'],
  ['大水再来','battle','保护堤坝、居住区与核心设施。','差异化危机损失'],
  ['中心的代价','choice','资源不足以保住所有公共系统。','选择一项主动放弃'],
  ['最后一次选择','choice','只可保全人口、工程、礼器、航运中的两项。','决定遗存权重'],
  ['水退之后','ending','时间加速。建筑腐朽，河流改道，文明成为遗址。','进入后世考古'],
].map(([name, type, description, reward], index) => ({ id:index + 1, name, type, description, reward }));
// 这些节点共享卡牌引擎，但改变胜利条件，而非仅替换地图美术。
[3,25,38,39].forEach((id) => { CHAPTER_NODES[id - 1].type = 'battle'; });

const CARD_UNLOCKS = {3:'农人',4:'林地采集队',5:'渡河筏队',6:'抢修',7:'仓储点',8:'轮值守备',10:'临时码头',11:'舟师',12:'水路转运',13:'引水沟',14:'开渠',15:'联合筑堤',16:'应急泄洪',18:'勘料队',19:'玉料搬运队',20:'精细运输',21:'玉工',22:'玉作工棚',23:['砂水研磨','工艺校准'],24:'礼器筹备',27:'使者',28:'联合航运',29:'祭仪场',31:'会盟使者'};
const DECISIONS = {
  7:{primary:'修建仓储，保留余粮',alternate:'继续扩田，追求产出'},
  14:{primary:'开渠疏导，分散洪水',alternate:'加固坝体，集中控制'},
  15:{primary:'与乌墩联合修坝',alternate:'独立征调劳力'},
  26:{primary:'分散协作，由聚落自治',alternate:'集中组织，由领袖调度'},
  38:{primary:'放弃航运，保住聚落系统',alternate:'放弃礼仪空间，保住航路'},
};
const EVENT_OPTIONS = {
  17:{primary:'作为公共玉料，交给聚落加工',alternate:'作为首领信物，先建立权威'},
  22:{primary:'推举经验工匠，优先提升工艺',alternate:'推举礼仪主持，连接玉作与仪式'},
  27:{primary:'以礼物与粮食欢迎来客',alternate:'谨慎观察，暂不开放核心航路'},
  30:{primary:'将玉器纳入礼仪秩序',alternate:'将玉器作为区域权力的标记'},
  31:{primary:'举行三方会盟，承担礼物成本',alternate:'分别许诺，以权势维持中心'},
  36:{primary:'兑现旧日信用，请求洪水援助',alternate:'保留资源，独自面对洪水'},
};
const DIPLOMACY_TERMS = {
  4:{faction:'乌墩',peace:'以粮食换取林地通行：粮食 -20，关系 +10，木材 +6 / 周期',force:'争夺林地：关系 -20，木材 +8 / 周期，权势 +1'},
  13:{faction:'南泽',peace:'共享上游：水利 +3，交流 +2，关系 +10',force:'独占窄口：水利 +5，权势 +1，关系 -15'},
  19:{faction:'岭前',peace:'以信用换玉料：玉料 +2 / 周期，交流 +2，关系 +10',force:'争夺料场：玉料 +2 / 周期，权势 +1，关系 -20'},
  28:{faction:'南泽',peace:'联合航运：交流 +4，关系 +15',force:'水路封锁：权势 +3，关系 -25'},
  35:{faction:'岭前',peace:'恢复旧约：粮食 -15，玉料网络得以维持',force:'强行夺回：权势 +2，关系 -20'},
  36:{faction:'乌墩',peace:'兑现旧日承诺，换取洪水援助',force:'拒绝援助，保留当前资源'},
};
const STORAGE_KEY = 'civilization-relics-campaign-v1';
const C = document.getElementById('campaign-view');
let campaign;
let activeView = 'world';

function initialCampaign() {
  const starter=['劳作者','搬运队','守卫','筑堤工','木栅','临时堆场','集中劳力','重新部署'];
  return { current:1, completed:[], resources:{population:120,food:80,jade:0,wood:60}, populationCap:180, stats:{生计:12,水利:5,工艺:5,交流:4,礼制:0,权势:3}, relations:{乌墩:0,南泽:5,岭前:0}, cards:starter, deck:starter, buildings:[], artifacts:[], equippedArtifacts:[], choices:[], history:['河湾聚落在湿地边缘落脚。'] };
}
const BUILDINGS = [
  {name:'稻田', cost:{wood:20}, effect:'粮食 +8 / 周期 · 生计 +3', stat:'生计', amount:3},
  {name:'小型水渠', cost:{wood:30}, effect:'粮食 +2 / 周期 · 水利 +4', stat:'水利', amount:4, requires:'稻田'},
  {name:'码头', cost:{wood:25}, effect:'木材 +2 / 周期 · 交流 +3', stat:'交流', amount:3},
  {name:'祭仪空间', cost:{wood:40,jade:1}, effect:'礼制 +5 · 解锁礼器路线', stat:'礼制', amount:5, requires:'玉作坊'},
  {name:'水利堤坝', cost:{wood:45}, effect:'危机战初始保全 +12% · 水利 +5', stat:'水利', amount:5, requires:'小型水渠'},
];
function canAfford(cost) { return Object.entries(cost).every(([key,value]) => campaign.resources[key] >= value); }
function costText(cost) { return Object.entries(cost).map(([key,value]) => `${key==='wood'?'木材':key==='jade'?'玉料':key} ${value}`).join(' · '); }
function loadCampaign() { try { const stored={...initialCampaign(), ...JSON.parse(localStorage.getItem(STORAGE_KEY))}; stored.deck ??= stored.cards.slice(0,8); stored.equippedArtifacts ??= []; stored.populationCap ??= 180; return stored; } catch { return initialCampaign(); } }
function saveCampaign() { localStorage.setItem(STORAGE_KEY, JSON.stringify(campaign)); document.querySelector('#save-state b').textContent = '已存'; setTimeout(() => { const e=document.querySelector('#save-state b'); if(e)e.textContent='已存'; }, 600); }
function node() { return CHAPTER_NODES[Math.min(campaign.current - 1, 39)]; }
function chapterFor(id) { return id <= 8 ? '第一幕 · 扎根' : id <= 16 ? '第二幕 · 水网' : id <= 24 ? '第三幕 · 玉从何来' : id <= 32 ? '第四幕 · 成为中心' : '第五幕 · 留下什么'; }
function updateHeader() { document.querySelector('#chapter-label').textContent = chapterFor(campaign.current); document.querySelector('#node-progress').textContent = `第 ${Math.min(campaign.current,40)} / 40 节点`; }
function chips() { const r=campaign.resources; return `<div class="resource-row"><span class="resource-chip">人口<b>${r.population}/${campaign.populationCap}</b></span><span class="resource-chip">粮食<b>${r.food}</b></span><span class="resource-chip">木材<b>${r.wood}</b></span><span class="resource-chip">玉料<b>${r.jade}</b></span></div>`; }

function renderWorld() {
  if (campaign.current > 40) return renderEnding();
  const current = node();
  const surrounding = [...new Set([Math.max(1,campaign.current-2), Math.max(1,campaign.current-1), campaign.current, Math.min(40,campaign.current+1), Math.min(40,campaign.current+2)])];
  C.innerHTML = `<div class="world-hero"><div class="world-orbit">${surrounding.map((id, i) => { const n=CHAPTER_NODES[id-1]; const done=campaign.completed.includes(id); const pos=[[11,56],[51,21],[45,54],[76,30],[17,12]][i]; return `<button class="world-node ${id===campaign.current?'current':done?'done':'locked'}" data-open-node="${id}" style="left:${pos[0]}%;top:${pos[1]}%"><b>${done?'✓':id}</b><small>${n.name}</small></button>`; }).join('')}</div><div class="world-caption"><p class="eyebrow">当前问题 · ${chapterFor(current.id)}</p><h1>${current.name}</h1><p>${current.description}</p>${chips()}<button data-open-node="${current.id}">查看问题与方案</button></div></div><div class="timeline">${CHAPTER_NODES.slice(Math.max(0,campaign.current-1), Math.min(40,campaign.current+5)).map(n=>`<button class="timeline-item ${n.id===campaign.current?'current':''}" data-open-node="${n.id}"><span class="timeline-index">${n.id}</span><span><strong>${n.name}</strong><small>${n.type==='battle'?'实时争域':n.type==='diplomacy'?'外交抉择':'文明处理'}</small></span><span>${n.id===campaign.current?'处理 →':'待解锁'}</span></button>`).join('')}</div>`;
  C.querySelectorAll('[data-open-node]').forEach((button)=>button.addEventListener('click',()=>openNode(Number(button.dataset.openNode))));
}
function openNode(id) {
  if (id !== campaign.current) return;
  const n=CHAPTER_NODES[id-1];
  if (n.id === 39) return openFinalChoice(n);
  const action = n.id===21 ? '建设玉作坊 · 木材 35 / 玉料 2' : n.type==='battle' ? '进入争域' : n.type==='diplomacy' ? '进行交涉' : n.type==='choice' ? '作出选择' : n.type==='ending' ? '开始时间加速' : '处理事件';
  document.querySelector('#sheet-backdrop').hidden=false;
  const sheet=document.querySelector('#node-sheet'); sheet.hidden=false;
  const terms=DIPLOMACY_TERMS[n.id]; const faction=terms?.faction|| (n.id===4||n.id===15?'乌墩':n.id===13||n.id===28?'南泽':'岭前');
  const diplomacy=n.type==='diplomacy'?`<div class="diplomacy-panel"><div class="npc-seal">${faction[0]}</div><div><small>${faction}首领 · 关系 ${campaign.relations[faction]||0}</small><strong>${faction==='乌墩'?'“林地能养活我们，也能让堤坝站得更久。”':faction==='南泽'?'“水不会属于谁，但航路可以有约。”':'“玉料来得不易，信用比石头更重。”'}</strong></div><div class="deal-line"><span>${terms?.peace||'我提供：粮食 × 10'}</span></div></div>`:'';
  const decision=DECISIONS[n.id]||EVENT_OPTIONS[n.id];
  sheet.innerHTML=`<p class="eyebrow">第 ${n.id} 节点 · ${n.type==='battle'?'实时争域':n.type==='diplomacy'?'外交交涉':n.type==='event'?'文明事件':'文明决策'}</p><h2>${n.name}</h2><p>${n.description}</p>${diplomacy}<p><b>完成结果：</b>${n.reward}</p>${chips()}<div class="node-options"><button data-resolve="primary" ${n.id===21&&!canAfford({wood:35,jade:2})?'disabled':''}>${n.type==='diplomacy'?`接受：${terms.peace}`:decision?decision.primary:action}</button>${n.type==='diplomacy'?`<button class="alt" data-resolve="force">${terms.force}</button>`:''}${n.type==='choice'||decision?`<button class="alt" data-resolve="alternate">${decision?.alternate||'选择另一条路线'}</button>`:''}<button class="close-sheet" data-close-sheet>稍后处理</button></div>`;
  sheet.querySelector('[data-resolve="primary"]')?.addEventListener('click',()=>resolveNode(n,'primary'));
  sheet.querySelector('[data-resolve="force"]')?.addEventListener('click',()=>resolveNode({...n,type:'battle'},'force'));
  sheet.querySelector('[data-resolve="alternate"]')?.addEventListener('click',()=>resolveNode(n,'alternate'));
  sheet.querySelector('[data-close-sheet]')?.addEventListener('click',closeSheet);
}
function openFinalChoice(n) {
  document.querySelector('#sheet-backdrop').hidden=false;
  const sheet=document.querySelector('#node-sheet'); sheet.hidden=false;
  const targets=['人口与居所','水利工程','礼器与仪式','航路与码头'];
  sheet.innerHTML=`<p class="eyebrow">第 39 节点 · 最后一次选择</p><h2>只能留下两项</h2><p>洪水与时间会带走大部分公共系统。选择两项优先遗存；这会决定终局战需要保全的节点与后世的解释。</p><div class="preserve-grid">${targets.map((label,index)=>`<label><input type="checkbox" value="${index}"><span>${label}</span></label>`).join('')}</div><div class="node-options"><button data-final-start disabled>选择 0 / 2</button><button class="close-sheet" data-close-sheet>稍后处理</button></div>`;
  const inputs=[...sheet.querySelectorAll('input')], start=sheet.querySelector('[data-final-start]');
  inputs.forEach(input=>input.addEventListener('change',()=>{const selected=inputs.filter(x=>x.checked); if(selected.length>2) input.checked=false; const kept=inputs.filter(x=>x.checked); start.disabled=kept.length!==2; start.textContent=`带着这两项进入保全战 ${kept.length} / 2`; }));
  start.addEventListener('click',()=>{const kept=inputs.filter(x=>x.checked).map(x=>Number(x.value)); campaign.preservedTargets=kept; closeSheet(); resolveNode(n,'preserve');});
  sheet.querySelector('[data-close-sheet]').addEventListener('click',closeSheet);
}
function closeSheet(){document.querySelector('#sheet-backdrop').hidden=true;document.querySelector('#node-sheet').hidden=true;}
function battleMode(n, route) {
  if (n.id===32) { const s=campaign.stats; if(s.权势>=s.交流&&s.权势>=s.礼制) return {kind:'standard',label:'区域中心：控制两处战略节点'}; if(s.交流>=s.工艺&&s.交流>=s.礼制)return {kind:'transport',label:'区域中心：维持航路运输',target:70}; return {kind:'production',label:'区域中心：维持中心与供应',target:70}; }
  if ([3,25].includes(n.id)) return {kind:'engineering', label:'工程推进', target:70};
  if ([11,20].includes(n.id)) return {kind:'transport', label:'完成运输', target:60};
  if ([6,16,33,37].includes(n.id)) return {kind:'crisis', label:'危机防守'};
  if (n.id===23) return {kind:'production', label:'三线生产：同时守住全部节点', target:65, requiredHeld:3};
  if ([24,34].includes(n.id)) return {kind:'production', label:'维持生产与供应', target:65, requiredHeld:2};
  if (n.id===38) return {kind:'terminal', label:'终局保全：守住两个目标', protectedNodes:route==='alternate'?[0,2]:[0,1]};
  if (n.id===39) return {kind:'terminal', label:'终局保全：守住你的两项遗存', terminalTargets:campaign.preservedTargets||[0,1]};
  return {kind:'standard', label:'控制更多节点以获胜'};
}
function resolveNode(n, route) {
  closeSheet();
  if(n.id===21 && (!canAfford({wood:35,jade:2}))) { campaign.history.push('玉作坊尚未建成：需要木材 35、玉料 2。'); saveCampaign(); renderCampaign(); openNode(n.id); return; }
  if (n.type === 'battle') { const relationValues=Object.values(campaign.relations); const averageRelation=relationValues.reduce((a,b)=>a+b,0)/relationValues.length; let enemyCap=route==='force'?4:averageRelation>=10?2:averageRelation<0?4:3; if(n.id===16&&campaign.allyAid)enemyCap=Math.max(2,enemyCap-1); const crisisLossRate=campaign.buildings.includes('水利堤坝')?.11:campaign.buildings.includes('小型水渠')?.15:.18; document.querySelector('.game-shell').classList.add('in-battle'); window.CivilizationBattle.launch((won)=>{ document.querySelector('.game-shell').classList.remove('in-battle'); if(won) completeNode(n,route); else { campaign.history.push(`${n.name}：争域失利，返回地图重整牌组。`); saveCampaign(); renderCampaign(); } }, {...battleMode(n,route), deck:campaign.deck, artifacts:campaign.equippedArtifacts, enemyCap, crisisLossRate, leaderStyle:campaign.leaderStyle}); return; }
  completeNode(n,route);
}
function completeNode(n, route) {
  const s=campaign.stats, r=campaign.resources;
  const gain = n.id <= 8 ? {生计:1,水利:1,权势:1} : n.id <=16 ? {水利:1,交流:1} : n.id<=24 ? {工艺:2,礼制:1} : n.id<=32 ? {交流:1,礼制:1,权势:1} : {生计:1,水利:1};
  Object.entries(gain).forEach(([key,value])=>s[key]+=value);
  r.food += 5; r.wood += 3; if(n.id>=17)r.jade+=1;
  if (DIPLOMACY_TERMS[n.id]) { const faction=DIPLOMACY_TERMS[n.id].faction; if(n.id!==36||route==='primary')campaign.relations[faction] += route==='force' ? -20 : 10; if(route==='force')s.权势+=2; else if(n.id!==36||route==='primary')s.交流+=2; }
  if (n.type==='choice'||EVENT_OPTIONS[n.id]) { campaign.choices.push({node:n.id,route}); if(n.type==='choice') route==='alternate' ? s.权势+=3 : s.交流+=3; }
  if(n.id===17) { if(route==='primary') { r.jade+=1; s.工艺+=1; } else s.权势+=2; }
  if(n.id===2) campaign.foodIncome=(campaign.foodIncome||0)+4;
  if(n.id===3) { campaign.foodIncome=(campaign.foodIncome||0)+8; s.生计+=2; }
  if(n.id===25) { campaign.populationCap+=60; s.生计+=3; }
  if(n.id===22) { if(route==='primary')s.工艺+=3; else {s.礼制+=3; campaign.advisor='礼仪主持';} }
  if(n.id===27) { if(route==='primary') {r.food=Math.max(0,r.food-10);campaign.relations.南泽+=5;s.交流+=2;} else s.权势+=1; }
  if(n.id===30) { if(route==='primary')s.礼制+=5; else s.权势+=4; }
  if(n.id===31) { if(route==='primary') {r.food=Math.max(0,r.food-15);Object.keys(campaign.relations).forEach(k=>campaign.relations[k]+=8);s.礼制+=2;} else {s.权势+=3;campaign.relations.岭前-=5;} }
  if (n.id===7) { if(route==='primary') { campaign.foodCap=(campaign.foodCap||120)+40; campaign.history.push('选择仓储：余粮上限提高 40。'); } else { s.生计+=2; campaign.foodIncome=(campaign.foodIncome||0)+8; } }
  if (n.id===14) { if(route==='primary') { campaign.waterRoute='疏导'; } else { campaign.waterRoute='筑坝'; s.权势+=1; } }
  if (n.id===15) { if(route==='primary') { campaign.relations.乌墩+=10; s.水利+=3; s.交流+=2; campaign.allyAid=true; } else { s.权势+=2; r.wood=Math.max(0,r.wood-20); campaign.allyAid=false; } }
  if (n.id===26) { campaign.leaderStyle=route==='alternate'?'集中':'协作'; if(route==='alternate')s.权势+=1; }
  if (n.id===38) { campaign.sacrificedSystem=route==='alternate'?'礼仪空间':'航运'; if(route==='alternate')s.礼制=Math.max(0,s.礼制-2); else s.交流=Math.max(0,s.交流-2); }
  if (DIPLOMACY_TERMS[n.id]) {
    if(n.id===4 && route==='primary') { r.food=Math.max(0,r.food-20); campaign.woodIncome=(campaign.woodIncome||0)+6; } if(n.id===4 && route==='force') campaign.woodIncome=(campaign.woodIncome||0)+8;
    if(n.id===13) { s.水利+=route==='primary'?3:5; } if(n.id===19) campaign.jadeIncome=(campaign.jadeIncome||0)+2;
    if(n.id===28 && route==='primary') s.交流+=2; if(n.id===35 && route==='primary')r.food=Math.max(0,r.food-15);
    if(n.id===36) campaign.allyAid=route==='primary' && Object.values(campaign.relations).filter(v=>v>=0).length>=2;
  }
  if (n.id===21 && !campaign.buildings.includes('玉作坊')) { r.wood-=35; r.jade-=2; campaign.buildings.push('玉作坊'); }
  if (n.id===24 && !campaign.artifacts.length) campaign.artifacts.push(s.工艺>s.礼制+3&&s.工艺>s.权势+3?'玉梳背':s.礼制>=s.权势?'玉璧':'玉钺');
  if (n.id===30) campaign.artifacts.push(route==='primary'||s.礼制>=s.权势?'玉琮':'三叉形玉器');
  campaign.equippedArtifacts = campaign.artifacts.slice(0,2);
  let unlock=CARD_UNLOCKS[n.id];
  if(n.id===14) unlock=route==='alternate'?'加固坝体':'开渠';
  if(n.id===15) unlock=route==='force'?'集中征调':'联合筑堤';
  if(n.id===28) unlock=route==='force'?'水路封锁':'联合航运';
  if(n.id===31&&route==='alternate') unlock=undefined;
  (Array.isArray(unlock)?unlock:[unlock]).filter(Boolean).forEach((card)=>{if(!campaign.cards.includes(card))campaign.cards.push(card);});
  campaign.completed.push(n.id); campaign.history.push(`第${n.id}节点「${n.name}」完成：${n.reward}`); if(campaign.completed.length%2===0) settleCycle(); campaign.current+=1; saveCampaign(); renderCampaign();
}
function settleCycle(){const r=campaign.resources;const farms=campaign.buildings.filter(x=>x==='稻田').length;const waterways=campaign.buildings.filter(x=>x==='小型水渠').length;const docks=campaign.buildings.filter(x=>x==='码头').length;const foodGain=24+farms*8+waterways*2+(campaign.foodIncome||0)-Math.floor(r.population/10);r.food=Math.min(campaign.foodCap||120,Math.max(0,r.food+foodGain));const woodGain=10+docks*2+(campaign.woodIncome||0);r.wood+=woodGain;r.jade+=campaign.jadeIncome||0;if(r.food>=40)r.population=Math.min(campaign.populationCap,Math.round(r.population*1.04));else if(r.food<15)r.population=Math.round(r.population*.95);campaign.history.push(`文明周期结算：粮食 ${foodGain>=0?'+':''}${foodGain}，木材 +${woodGain}${campaign.jadeIncome?`，玉料 +${campaign.jadeIncome}`:''}。`);}
function renderDeck(){C.innerHTML=`<h1 class="section-title">当前构筑</h1><p class="section-copy">${campaign.deck.length} / 8 张战斗牌。点击新牌即可替换最早编入的一张；本页选择会直接带入下一场争域。</p><div class="deck-grid">${campaign.cards.map((card)=>`<button class="deck-slot ${campaign.deck.includes(card)?'':'locked'}" data-deck-card="${card}"><span>${campaign.deck.includes(card)?'已编入':'已发现 · 待编入'} </span><b>${card}</b></button>`).join('')}</div>`;C.querySelectorAll('[data-deck-card]').forEach((button)=>button.addEventListener('click',()=>{const card=button.dataset.deckCard;if(!campaign.deck.includes(card)){campaign.deck.push(card);if(campaign.deck.length>8)campaign.deck.shift();saveCampaign();renderDeck();}}));}
function renderSettlement(){const r=campaign.resources; const governance=campaign.leaderStyle==='集中'?'集中组织：聚力在目标节点持续 12 秒':campaign.leaderStyle==='协作'?'分散协作：聚力会短暂支援全部节点':'尚未确定管理路线';const advisor=campaign.advisor?`玉作顾问：${campaign.advisor}`:'尚未任命玉作负责人';C.innerHTML=`<h1 class="section-title">河湾聚落</h1>${chips()}<p class="section-copy">${governance}。${advisor}</p><div class="stat-grid">${Object.entries(campaign.stats).map(([k,v])=>`<div class="stat-card"><span>${k}</span><b>${v}</b></div>`).join('')}</div><h2 class="section-title">建设</h2><div class="building-list">${BUILDINGS.map((b)=>{const built=campaign.buildings.includes(b.name);const unavailable=!canAfford(b.cost)||(b.requires&&!campaign.buildings.includes(b.requires));const note=built?'已建成':b.requires&&!campaign.buildings.includes(b.requires)?`前置：${b.requires}`:b.effect;return `<div class="building"><span><strong>${b.name}</strong><small>${costText(b.cost)} · ${note}</small></span><button data-build="${b.name}" ${built||unavailable?'disabled':''}>${built?'已建成':unavailable?'条件不足':'建设'}</button></div>`;}).join('')}</div>`;C.querySelectorAll('[data-build]').forEach(button=>button.addEventListener('click',()=>{const building=BUILDINGS.find(x=>x.name===button.dataset.build);if(!building||campaign.buildings.includes(building.name)||!canAfford(building.cost)||(building.requires&&!campaign.buildings.includes(building.requires)))return;Object.entries(building.cost).forEach(([key,value])=>campaign.resources[key]-=value);campaign.buildings.push(building.name);campaign.stats[building.stat]+=building.amount;campaign.history.push(`建成${building.name}：${building.effect}`);saveCampaign();renderSettlement();}));}
function artifactDescription(name){return {玉璧:'成组用玉：首次双节点控制返还 1 点动员力',玉钺:'执钺：首次丢点时守卫短暂强化',玉梳背:'工艺器：首次设施部署返还 1 点动员力',玉琮:'礼制器：渡口节点的己方争夺效率提高',三叉形玉器:'权势器：领袖「聚力」冷却缩短 6 秒'}[name]||'核心器物的被动效果';}
function renderArchive(){const known=[...campaign.cards,...campaign.artifacts];C.innerHTML=`<h1 class="section-title">文物与文明卡谱</h1><div class="artifact-stage"><div><div class="artifact-mark">${campaign.artifacts.length?'◉':'◌'}</div><h2>${campaign.artifacts[0]||'尚未形成核心器物'}</h2><p>${campaign.artifacts.length?`已装备 ${campaign.equippedArtifacts.length} / 2 件。文物只改变 Build，不提高基础卡数值。`:'推进至第 24 节点，完成第一个高等级玉器制作。'}</p></div></div><h2 class="section-title">核心文物</h2><div class="card-library">${campaign.artifacts.length?campaign.artifacts.map(x=>`<div class="collection-card"><span><strong>${x}</strong><small>${artifactDescription(x)}</small></span><button class="artifact-equip" data-artifact="${x}">${campaign.equippedArtifacts.includes(x)?'已装备':'装备'}</button></div>`).join(''):'<p class="section-copy">尚无核心文物。</p>'}</div><h2 class="section-title">已知卡谱</h2><div class="card-library">${known.filter(x=>!campaign.artifacts.includes(x)).map(x=>`<div class="collection-card"><span><strong>${x}</strong><small>已发现战斗牌</small></span><span>✓</span></div>`).join('')}</div>`;C.querySelectorAll('[data-artifact]').forEach(b=>b.addEventListener('click',()=>{const artifact=b.dataset.artifact;if(campaign.equippedArtifacts.includes(artifact))campaign.equippedArtifacts=campaign.equippedArtifacts.filter(x=>x!==artifact);else {campaign.equippedArtifacts.push(artifact);if(campaign.equippedArtifacts.length>2)campaign.equippedArtifacts.shift();}saveCampaign();renderArchive();}));}
function renderChronicle(){C.innerHTML=`<h1 class="section-title">文明卷宗</h1><div class="chronicle-card"><p class="eyebrow">河湾聚落 · 良渚</p><h2>正在形成的文明</h2><p>完成节点：${campaign.completed.length} / 40</p><p>乌墩 ${campaign.relations.乌墩 >=0?'友好':'紧张'} · 南泽 ${campaign.relations.南泽 >=0?'互信':'疏离'} · 岭前 ${campaign.relations.岭前 >=0?'通商':'对峙'}</p><p>终局后，这里将记录后世考古学家如何从遗存推断你的历史。</p></div><h2 class="section-title">关键纪事</h2><div class="timeline">${campaign.history.slice(-7).reverse().map((x,i)=>`<div class="timeline-item"><span class="timeline-index">${campaign.completed.length-i}</span><span><strong>${x}</strong><small>文明记忆</small></span></div>`).join('')}</div>`;}
function renderEnding(){const ranking=Object.entries(campaign.stats).sort((a,b)=>b[1]-a[1]);const evidence=ranking.slice(0,2).map(([name])=>name).join('与');const ties=Object.values(campaign.relations).filter(v=>v>=10).length;const targetNames=['人口与居所','水利工程','礼器与仪式','航路与码头'];const kept=(campaign.preservedTargets||[]).map(i=>targetNames[i]).join('、')||'零散的居所与工程';C.innerHTML=`<div class="artifact-stage"><div><p class="eyebrow">第一章完结 · 水退之后</p><div class="artifact-mark">◌</div><h2>遗址留在雾中</h2><p>河流已经改道。后世将从你的工程、器物与残存聚落中，尝试解释曾经的河湾文明。</p><button class="primary-action" id="new-civilization">开启新文明</button></div></div><div class="chronicle-card"><p class="eyebrow">后世考古报告 · 推断，不是全貌</p><h2>${evidence}塑造的河湾</h2><p>最后被主动保全的证据是：${kept}。${campaign.sacrificedSystem?`在中心的代价中，${campaign.sacrificedSystem}被放弃。`:''}</p><p>考古队在遗址中辨认出 ${campaign.buildings.length} 处公共建设与 ${campaign.artifacts.length} 件核心器物。${ties?`与 ${ties} 个邻近聚落的稳定关系，使交流遗存保留得更完整。`:'遗存显示出一个更依赖本地动员的聚落。'}</p><p>最强证据指向：${ranking[0][0]} ${ranking[0][1]} · ${ranking[1][0]} ${ranking[1][1]}。</p></div>`;C.querySelector('#new-civilization').addEventListener('click',()=>{campaign=initialCampaign();saveCampaign();renderCampaign();});}
function renderCampaign(){updateHeader();document.querySelectorAll('.campaign-nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===activeView));if(activeView==='world')renderWorld();if(activeView==='deck')renderDeck();if(activeView==='settlement')renderSettlement();if(activeView==='archive')renderArchive();if(activeView==='chronicle')renderChronicle();}
document.querySelectorAll('.campaign-nav button').forEach(b=>b.addEventListener('click',()=>{activeView=b.dataset.view;renderCampaign();}));document.querySelector('#sheet-backdrop').addEventListener('click',closeSheet);document.querySelector('#leader-button').addEventListener('click',()=>{activeView='chronicle';renderCampaign();});
campaign=loadCampaign();window.CivilizationBattle.stop();renderCampaign();

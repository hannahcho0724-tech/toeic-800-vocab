const DATA=window.TEST_DATA,Core=window.VocabCore;
const allWords=DATA.words;
let currentQuiz=[],currentType='',submitted=false,currentSection='ALL';
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function meanings(w,withUsage=true){return w.meanings.map((m,i)=>`<div class="sense"><span class="sense-number">${i+1}</span> <span class="pos">${esc(m.pos)}</span> ${esc(m.ko)}${withUsage&&m.usage?`<small class="usage">${esc(m.usage)}</small>`:''}</div>`).join('');}
function examples(w){return w.examples.map(e=>`<div class="example"><span class="sense-number">${e.sense}</span> <span class="example-en">${esc(e.en)}</span><small class="example-translation">${esc(e.ko)}</small></div>`).join('');}
function show(id){document.querySelectorAll('[data-view]').forEach(x=>x.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');window.scrollTo({top:0,behavior:'auto'});}
function backHome(){show('home');}
function renderVocab(section='ALL'){
 currentSection=section;show('vocab');document.querySelectorAll('[data-sec]').forEach(b=>{const selected=b.dataset.sec===section;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});renderRows();
}
function renderRows(){
 const query=Core.normalize(document.getElementById('wordSearch').value),hide=document.getElementById('hideMeanings').checked;
 const words=allWords.filter(w=>(currentSection==='ALL'||w.section===currentSection)&&(!query||Core.normalize(w.en+' '+w.meanings.map(m=>m.ko).join(' ')+' '+w.examples.map(e=>e.en+' '+e.ko).join(' ')).includes(query)));
 document.getElementById('wordCount').textContent=`${words.length}개 / 전체 200개`;
 document.getElementById('vocabBody').innerHTML=`<div class="vocab-scroll"><table class="vocab-table ${hide?'hide-meanings':''}"><colgroup><col><col><col><col></colgroup><thead><tr><th class="n">번호</th><th>영어 어휘</th><th>토익 핵심 뜻</th><th>예문 · 청크</th></tr></thead><tbody>${words.map(w=>`<tr><td><span class="badge">${w.section}-${(w.n-1)%50+1}</span><small class="global-number">${w.n}</small></td><td><b>${esc(w.en)}</b>${w.meanings.length>1?'<span class="multi-badge">다의어</span>':''}</td><td><div class="meaning-content">${meanings(w,false)}</div></td><td>${examples(w)}</td></tr>`).join('')}</tbody></table></div>${words.length?'':'<p class="note">검색 결과가 없습니다.</p>'}`;
}
function makeQuiz(type,count=40){
 currentType=type;submitted=false;currentQuiz=Core.makeQuiz(allWords,type,count);show('quiz');
 document.getElementById('quizTitle').textContent=type==='choice'?'랜덤 4지선다 40문항':'랜덤 주관식 40문항';
 document.getElementById('quizMeta').textContent=`TEST ${String(DATA.test).padStart(2,'0')} · A~D 전체에서 출제 · 같은 어휘는 한 번씩`;
 const area=document.getElementById('quizBody');
 area.innerHTML=currentQuiz.map((q,i)=>`<div class="card" id="quiz-card-${i}"><b>${i+1}. ${type==='choice'?'알맞은 뜻 묶음을 고르세요.':'뜻을 입력하세요.'}</b><div class="qword">${esc(q.word.en)}</div>${type==='choice'?`<fieldset class="choices"><legend class="sr-only">${i+1}번 선택지</legend>${q.choices.map((label,j)=>`<label class="choice"><input type="radio" name="q${i}" value="${j}"><span>${['①','②','③','④'][j]} ${esc(label)}</span></label>`).join('')}</fieldset>`:`<input class="answer" aria-label="${i+1}번 뜻 입력" autocomplete="off" placeholder="아는 뜻을 입력해 보세요"/>`}<div class="model-answer hidden"></div></div>`).join('');
 document.getElementById('quizResult').classList.add('hidden');document.getElementById('submitBtn').disabled=false;document.getElementById('retryBtn').classList.add('hidden');document.getElementById('newQuizBtn').classList.add('hidden');
}
function submitQuiz(){
 if(submitted)return;submitted=true;const cards=[...document.querySelectorAll('#quizBody .card')];
 const answers=cards.map(c=>{const x=c.querySelector('input:checked');return x?Number(x.value):null;});
 const result=currentType==='choice'?Core.grade(currentQuiz,answers):null;let filled=0;
 cards.forEach((card,i)=>{const q=currentQuiz[i],model=card.querySelector('.model-answer');model.classList.remove('hidden');model.innerHTML=`<b>모범답안</b>${meanings(q.word,false)}<b>예문 · 청크</b>${examples(q.word)}`;
  if(currentType==='choice'){card.classList.add(result.results[i].correct?'correct':'wrong');model.insertAdjacentHTML('afterbegin',`<div class="feedback">${result.results[i].correct?'✓ 정답':result.results[i].answered?'다시 확인하세요':'미응답'} · 정답 ${['①','②','③','④'][q.answerIndex]}</div>`);card.querySelectorAll('input').forEach(x=>x.disabled=true);}
  else {const input=card.querySelector('input.answer');if(input.value.trim())filled++;input.readOnly=true;}
 });
 const r=document.getElementById('quizResult');r.classList.remove('hidden');
 r.innerHTML=currentType==='choice'?`<b>채점 결과 ${result.score} / ${result.total}</b><p class="note">응답 ${result.answered}문항 · 미응답 ${result.total-result.answered}문항</p>`:`<b>모범답안을 공개했습니다.</b><p class="note">입력 ${filled} / ${currentQuiz.length}문항. 뜻을 표현하는 방법이 다양하므로 주관식은 자동채점하지 않습니다. 입력한 답과 핵심 뜻을 비교하세요.</p>`;
 document.getElementById('submitBtn').disabled=true;document.getElementById('retryBtn').classList.remove('hidden');document.getElementById('newQuizBtn').classList.remove('hidden');r.scrollIntoView({behavior:'smooth',block:'center'});
}
function retryQuiz(){
 submitted=false;document.querySelectorAll('#quizBody .card').forEach(c=>{c.classList.remove('correct','wrong');const m=c.querySelector('.model-answer');m.innerHTML='';m.classList.add('hidden');c.querySelectorAll('input').forEach(x=>{x.disabled=false;x.readOnly=false;if(x.type==='radio')x.checked=false;else x.value='';});});document.getElementById('quizResult').classList.add('hidden');document.getElementById('submitBtn').disabled=false;document.getElementById('retryBtn').classList.add('hidden');document.getElementById('newQuizBtn').classList.add('hidden');document.getElementById('quizBody').scrollIntoView({behavior:'smooth'});
}
document.getElementById('wordSearch').addEventListener('input',renderRows);
document.getElementById('hideMeanings').addEventListener('change',renderRows);

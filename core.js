(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VocabCore=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function shuffle(list,random=Math.random){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function normalize(text){return String(text).normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();}
  function meaningLabel(w){return w.meanings.map(m=>m.pos+' '+m.ko).join(' / ');}
  function uniqueWords(list){const map=new Map();for(const word of list){const key=normalize(word.en);if(!map.has(key))map.set(key,word);}return [...map.values()];}
  function tokens(w){return new Set(w.meanings.flatMap(m=>m.ko.replace(/\([^)]*\)/g,'').split(/[,;·/]/).map(x=>x.replace(/[~\s]/g,'')).filter(Boolean)));}
  function makeQuiz(list,type,count=40,random=Math.random){
    const pool=uniqueWords(list);return shuffle(pool,random).slice(0,Math.min(count,pool.length)).map(w=>{
      if(type==='word')return {word:w};
      const targetTokens=tokens(w),seen=new Set([meaningLabel(w)]);
      const candidates=shuffle(pool.filter(x=>normalize(x.en)!==normalize(w.en)&&![...tokens(x)].some(t=>targetTokens.has(t))),random);
      const wrong=[];for(const x of candidates){const label=meaningLabel(x);if(!seen.has(label)){seen.add(label);wrong.push(label);}if(wrong.length===3)break;}
      if(wrong.length!==3)throw new Error('서로 다른 선택지를 만들 수 없습니다.');
      const answer=meaningLabel(w),choices=shuffle([...wrong,answer],random);return {word:w,choices,answerIndex:choices.indexOf(answer)};
    });
  }
  function grade(quiz,answers){let answered=0,score=0;const results=quiz.map((q,i)=>{const value=answers[i];const has=Number.isInteger(value)&&value>=0&&value<4;if(has)answered++;const correct=has&&value===q.answerIndex;if(correct)score++;return {answered:has,correct};});return {score,answered,total:quiz.length,results};}
  return {shuffle,normalize,meaningLabel,uniqueWords,makeQuiz,grade};
});

// Set this to the public URL of a MailerLite form connected to the PRIME50 nurture group.
// Leave blank until configured. Never put API keys in this file.
const MAILERLITE_FORM_URL = '';

function calculatePrimeScore(answers) {
  if (answers.length !== 15) throw new Error('Exactly 15 answers required');
  if (answers.some(v => v !== null && (!Number.isInteger(v) || v < 0 || v > 4))) throw new Error('Invalid answer');
  const categories = ['Strength','Mobility','Longevity habits'].map((name,i)=>{
    const values=answers.slice(i*5,i*5+5);
    return {name, answered:values.filter(v=>v!==null).length, score:values.includes(null)?null:Math.round(values.reduce((a,b)=>a+b,0)/20*100)};
  });
  return {categories,total:answers.includes(null)?null:Math.round(answers.reduce((a,b)=>a+b,0)/60*100)};
}
if(typeof module!=='undefined') module.exports={calculatePrimeScore};
if(typeof document!=='undefined') {
  const form=document.getElementById('prime-form');
  form.querySelector('button[type="submit"]').style.background='#ef5b26';
  const results=document.getElementById('score-results');
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const answers=Array.from({length:15},(_,i)=>data.get('q'+i)==='unsure'?null:Number(data.get('q'+i)));
    const report=calculatePrimeScore(answers);
    document.getElementById('score-total').textContent=report.total===null?'Incomplete score':report.total+' / 100';
    document.getElementById('score-summary').textContent=report.total===null?'You selected “not sure” on one or more questions. Complete those when you can, or discuss them with Jeff. Completed category scores are shown below.':'Your self-reported starting point. Use this snapshot to choose a focus and track changes in your own answers over time.';
    const list=document.getElementById('category-results');list.replaceChildren();
    report.categories.forEach(c=>{const p=document.createElement('p');p.textContent=c.name+': '+(c.score===null?'Not scored ('+c.answered+'/5 answered)':c.score+' / 100');list.appendChild(p);});
    const completed=report.categories.filter(c=>c.score!==null).sort((a,b)=>a.score-b.score);
    document.getElementById('next-step').textContent=completed.length?'Start the conversation with '+completed[0].name.toLowerCase()+', your lowest completed category. Book a free 15-minute discovery call with Jeff to discuss your goal and find relevant resources inside PRIME50. Craig can help with training questions.':'Bring the questions you were unsure about to your free discovery call with Jeff. Together you can identify a starting point inside PRIME50.';
    results.hidden=false;form.hidden=true;results.focus();results.scrollIntoView({behavior:'smooth',block:'start'});
  });
  document.getElementById('edit-answers').addEventListener('click',()=>{results.hidden=true;form.hidden=false;form.querySelector('input').focus();});
  document.getElementById('print-report').addEventListener('click',()=>window.print());
  if(MAILERLITE_FORM_URL){try{const url=new URL(MAILERLITE_FORM_URL);if(url.protocol==='https:'){document.getElementById('mailer-signup').href=url.href;document.getElementById('email-followup').hidden=false;}}catch{}}
}

'use strict';
const KEY='prime50-app-v1';
let saved={};
try { saved=JSON.parse(localStorage.getItem(KEY)||'{}')||{}; } catch {}
const state={goal:typeof saved.goal==='string'?saved.goal:'',watched:saved.watched===true,clubWatched:saved.clubWatched===true,days:saved.days&&typeof saved.days==='object'?saved.days:{}};
const $=id=>document.getElementById(id);
let notification;
function announce(message){$('status').textContent=message;clearTimeout(notification);notification=setTimeout(()=>{$('status').textContent='';},4500);}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{announce('Browser storage unavailable. Changes will last for this visit only.');}renderStats();}
const monday=new Date();monday.setHours(12,0,0,0);monday.setDate(monday.getDate()-((monday.getDay()+6)%7));
const dates=Array.from({length:7},(_,i)=>{const d=new Date(monday);d.setDate(d.getDate()+i);return d;});
const dateKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
$('week-label').textContent='WEEK OF '+monday.toLocaleDateString(undefined,{month:'short',day:'numeric'}).toUpperCase();
const options=['Rest','Strength','Mobility','Walk','Balance','My choice'];
for(const date of dates){const key=dateKey(date);const entry=state.days[key]||{};const card=document.createElement('article');card.className='day';const label=document.createElement('label');label.htmlFor='focus-'+key;label.textContent=date.toLocaleDateString(undefined,{weekday:'short'});const time=document.createElement('time');time.dateTime=key;time.textContent=date.toLocaleDateString(undefined,{month:'short',day:'numeric'});const select=document.createElement('select');select.id=label.htmlFor;select.setAttribute('aria-label',`Focus for ${date.toDateString()}`);for(const text of options){const o=document.createElement('option');o.textContent=text;select.append(o);}select.value=options.includes(entry.focus)?entry.focus:'Rest';const done=document.createElement('label');done.className='check';const input=document.createElement('input');input.type='checkbox';input.checked=entry.done===true;input.setAttribute('aria-label',`Completed ${date.toDateString()}`);done.append(input,document.createTextNode('Done'));function update(){state.days[key]={focus:select.value,done:input.checked};persist();}select.addEventListener('change',update);input.addEventListener('change',update);card.append(label,time,select,done);$('days').append(card);}
function renderStats(){$('completed').textContent=dates.filter(d=>state.days[dateKey(d)]?.done).length;$('video-count').textContent=String(Number(state.watched)+Number(state.clubWatched));$('watched-club').textContent=state.clubWatched?'Club video watched ✓ — undo':'Mark club video as watched';$('watched-club').setAttribute('aria-pressed',String(state.clubWatched));$('watched').textContent=state.watched?'Watched ✓ — undo':'Mark as watched';$('watched').setAttribute('aria-pressed',String(state.watched));$('goal-value').textContent=state.goal||'Set a reason to show up.';}
$('settings').onclick=()=>{$('goal').value=state.goal;$('goal-dialog').showModal();};
$('cancel').onclick=()=>$('goal-dialog').close();
$('goal-form').onsubmit=e=>{e.preventDefault();const goal=$('goal').value.trim();if(!goal){$('goal').setCustomValidity('Please enter your goal.');$('goal').reportValidity();return;}state.goal=goal;persist();$('goal-dialog').close();announce('Your goal is saved on this device.');};
$('goal').oninput=()=>$('goal').setCustomValidity('');
$('watched').onclick=()=>{state.watched=!state.watched;persist();};
$('play').onclick=()=>{document.querySelector('#video-dialog a').href='https://youtube.com/shorts/nLTENVZcdPg';const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/nLTENVZcdPg';frame.title='PRIME50 Scorecard introduction';frame.allow='fullscreen; encrypted-media; picture-in-picture';frame.allowFullscreen=true;$('player').replaceChildren(frame);$('video-dialog').showModal();};
$('close-video').onclick=()=>$('video-dialog').close();
$('video-dialog').addEventListener('close',()=>$('player').replaceChildren());
$('reset').onclick=()=>{if(!confirm('Clear your goal, watched status and all weekly check-ins from this browser?'))return;try{localStorage.removeItem(KEY);}catch{}location.reload();};
const navLinks=document.querySelectorAll('nav a');function updateNav(){navLinks.forEach(a=>{const active=a.hash===(location.hash||'#today');a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}window.addEventListener('hashchange',updateNav);updateNav();renderStats();
$('video-search').addEventListener('input',event=>{const query=event.target.value.toLowerCase().trim();let count=0;document.querySelectorAll('[data-search]').forEach(card=>{card.hidden=!card.dataset.search.includes(query);if(!card.hidden)count++;});$('library-count').textContent=count?`${count} ${count===1?'video':'videos'} available`:'No matching videos. Explore our channel for more.';});

$('watched-club').onclick=()=>{state.clubWatched=!state.clubWatched;persist();};
document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+button.dataset.video;frame.title='Prime50 club video';frame.allow='fullscreen; encrypted-media; picture-in-picture';frame.allowFullscreen=true;$('player').replaceChildren(frame);document.querySelector('#video-dialog a').href='https://www.youtube.com/watch?v='+button.dataset.video;$('video-dialog').showModal();}));

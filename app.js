/* Digital Bible Journal: app logic. Uses data.js (OT, NT, V, ALL). */
const F={so:['Verse','Scripture (write it out)','Observation: what does it say?','Application: what will I do?','Prayer'],
 cs:['Book & chapter','Summary in my own words'],kw:['Word','Meaning & verses where I found it'],hy:['Hymn title','Lyrics or reflection'],
 sn:['Sermon title / speaker','Notes & takeaways'],gr:['I am grateful for…','Why it matters'],pj:['Prayer title','Dear God…'],no:['Title','Write here']};
// key, icon, title, tailwind gradient
const S=[
['ot','bi-bookmark-star-fill','Old Testament','tw-from-amber-400 tw-to-orange-500'],
['nt','bi-journal-bookmark-fill','New Testament','tw-from-sky-400 tw-to-blue-600'],
['se','bi-search','Search','tw-from-violet-400 tw-to-purple-600'],
['gr','bi-flower1','Gratitude Journal','tw-from-pink-400 tw-to-rose-500'],
['fv','bi-heart-fill','Favorite Verses','tw-from-rose-400 tw-to-red-500'],
['rt','bi-graph-up-arrow','Reading Tracker','tw-from-emerald-400 tw-to-teal-600'],
['hy','bi-music-note-beamed','Hymns','tw-from-fuchsia-400 tw-to-pink-600'],
['cs','bi-card-text','Chapter Summary','tw-from-cyan-400 tw-to-sky-600'],
['kw','bi-key-fill','Keywords','tw-from-yellow-400 tw-to-amber-500'],
['pj','bi-person-hearts','Prayer Journal','tw-from-indigo-400 tw-to-violet-600'],
['pl','bi-check2-square','Prayer List','tw-from-lime-400 tw-to-green-600'],
['so','bi-sun-fill','SOAP Bible Study','tw-from-orange-400 tw-to-rose-500'],
['sn','bi-mic-fill','Sermon Notes','tw-from-teal-400 tw-to-cyan-600'],
['ht','bi-calendar2-check-fill','Habit Tracker','tw-from-blue-400 tw-to-indigo-600'],
['no','bi-sticky-fill','Notes','tw-from-slate-400 tw-to-slate-600']];

let D={fav:{},read:{},vn:{},ent:{},pl:[],hab:['Read the Bible','Pray','Gratitude'],hl:{}};
try{Object.assign(D,JSON.parse(localStorage.getItem('bj')||'{}'))}catch(e){}
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const save=()=>{try{localStorage.setItem('bj',JSON.stringify(D))}catch(e){toast('Hindi ma-save (blocked ang storage)')}};
const toast=m=>{const t=$('#toast');t.querySelector('.toast-body').textContent=m;bootstrap.Toast.getOrCreateInstance(t,{delay:1800}).show()};
const today=()=>new Date().toISOString().slice(0,10);
const ents=k=>D.ent[k]||(D.ent[k]=[]);
const sec=k=>S.find(s=>s[0]==k);
const head=(k,extra='')=>{const s=sec(k);return`<div class="d-flex align-items-center gap-3 mb-3"><span class="tile-ico tw-bg-gradient-to-br ${s[3]} tw-text-white" style="width:48px;font-size:1.3rem"><i class="bi ${s[1]}"></i></span><h2 class="brand fs-2 mb-0 me-auto">${s[2]}</h2>${extra}</div>`};

/* ---------- verses ---------- */
const bt=on=>on?'btn-warning':'btn-outline-secondary';
const favL=r=>D.fav[r]?'<i class="bi bi-heart-fill"></i> Saved':'<i class="bi bi-heart"></i> Favorite';
const readL=r=>D.read[r]?'<i class="bi bi-check-circle-fill"></i> Read':'<i class="bi bi-circle"></i> Mark read';
const vcard=v=>{const r=esc(v.r);return`<div class="col"><article class="card vcard h-100 tw-rounded-3xl"><div class="card-body d-flex flex-column gap-2">
<div class="d-flex justify-content-between align-items-center"><span class="ref"><i class="bi bi-book me-1"></i>${r}</span><span class="badge rounded-pill text-bg-secondary-subtle text-secondary">KJV</span></div>
<p class="verse mb-1">${esc(v.t)}</p>
<div class="d-flex flex-wrap gap-2"><button data-a="fav" data-r="${r}" class="btn btn-sm rounded-pill ${bt(D.fav[v.r])}">${favL(v.r)}</button><button data-a="read" data-r="${r}" class="btn btn-sm rounded-pill ${bt(D.read[v.r])}">${readL(v.r)}</button><button data-a="cp" data-r="${r}" class="btn btn-sm btn-outline-secondary rounded-pill"><i class="bi bi-clipboard"></i> Copy</button></div>
<textarea class="form-control note mt-auto tw-rounded-2xl" rows="2" data-vn="${r}" placeholder="Write your thoughts on this verse…">${esc(D.vn[v.r]||'')}</textarea></div></article></div>`};
const vlist=(arr,q,b)=>{q=(q||'').toLowerCase();const r=arr.filter(v=>(!b||v.r.startsWith(b+' '))&&(!q||(v.r+' '+v.t).toLowerCase().includes(q)));
return r.length?`<div class="row row-cols-1 row-cols-lg-2 g-3">${r.map(vcard).join('')}</div>`:'<div class="empty"><i class="bi bi-emoji-neutral fs-1"></i><p>Walang nahanap. Subukan ang ibang salita.</p></div>'};
const books=a=>[...new Set(a.map(v=>v.r.replace(/ \d+:\d+$/,'')))];
function verses(k){const bk=books(V[k]);
app.innerHTML=head(k)+`<div class="row g-2 mb-3"><div class="col-12 col-md-7"><div class="input-group"><span class="input-group-text"><i class="bi bi-search"></i></span><input id="q" type="search" class="form-control" placeholder="Search ${V[k].length} verses…"></div></div><div class="col-12 col-md-5"><select id="bk" class="form-select"><option value="">All books</option>${bk.map(b=>`<option>${b}</option>`).join('')}</select></div></div><div id="vl">${vlist(V[k])}</div>`;
const f=()=>$('#vl').innerHTML=vlist(V[k],$('#q').value,$('#bk').value);$('#q').oninput=f;$('#bk').onchange=f}
function search(){app.innerHTML=head('se')+`<div class="input-group mb-3"><span class="input-group-text"><i class="bi bi-search"></i></span><input id="q" type="search" class="form-control form-control-lg" placeholder="Search all ${ALL.length} verses (peace, fear, love…)"></div><div id="vl">${vlist(ALL.slice(0,10))}</div>`;
$('#q').oninput=e=>$('#vl').innerHTML=vlist(e.target.value?ALL:ALL.slice(0,10),e.target.value)}
function favs(){const L=ALL.filter(v=>D.fav[v.r]);app.innerHTML=head('fv')+(L.length?`<div class="row row-cols-1 row-cols-lg-2 g-3">${L.map(vcard).join('')}</div>`:'<div class="empty"><i class="bi bi-heart fs-1"></i><p>Wala pang favorite. Buksan ang Old o New Testament at i-tap ang Favorite.</p></div>')}

/* ---------- journals ---------- */
function entries(k){const f=F[k],L=ents(k);
app.innerHTML=head(k,`<button class="btn btn-primary rounded-pill" data-a="new" data-k="${k}"><i class="bi bi-plus-lg"></i> New entry</button>`)+(L.length?`<div class="row row-cols-1 row-cols-lg-2 g-3">${L.map(e=>`<div class="col"><div class="card h-100 tw-rounded-3xl"><div class="card-body"><div class="d-flex justify-content-between align-items-center mb-2"><span class="ref"><i class="bi bi-calendar3 me-1"></i>${e.d}</span><button class="btn btn-sm btn-outline-danger rounded-pill" data-a="del" data-k="${k}" data-id="${e.id}" aria-label="Delete"><i class="bi bi-trash"></i></button></div>${f.map((p,i)=>i==0?`<input class="form-control fw-semibold mb-2 tw-rounded-2xl" data-e="${k}" data-id="${e.id}" data-i="0" placeholder="${p}" value="${esc(e.f[0])}">`:`<textarea class="form-control mb-2 tw-rounded-2xl" data-e="${k}" data-id="${e.id}" data-i="${i}" placeholder="${p}">${esc(e.f[i])}</textarea>`).join('')}</div></div></div>`).join('')}</div>`:'<div class="empty"><i class="bi bi-pencil-square fs-1"></i><p>Wala pang laman. I-tap ang “New entry” para magsimula.</p></div>')}

/* ---------- tracker / prayer list / habits ---------- */
function track(){const c=a=>a.filter(v=>D.read[v.r]).length,p=(n,t)=>Math.round(n/t*100),bar=(n,t,l)=>`<div class="mb-3"><div class="d-flex justify-content-between small fw-semibold"><span>${l}</span><span>${n}/${t} · ${p(n,t)}%</span></div><div class="progress" style="height:14px"><div class="progress-bar prog-bar" style="width:${p(n,t)}%"></div></div></div>`;
const R=ALL.filter(v=>D.read[v.r]);
app.innerHTML=head('rt')+`<div class="card tw-rounded-3xl mb-3"><div class="card-body">${bar(c(V.ot),V.ot.length,'Old Testament')}${bar(c(V.nt),V.nt.length,'New Testament')}${bar(c(ALL),ALL.length,'All verses')}</div></div>`+(R.length?`<div class="d-flex flex-wrap gap-2">${R.map(v=>`<span class="badge rounded-pill text-bg-success fs-6 fw-medium"><i class="bi bi-check2"></i> ${esc(v.r)}</span>`).join('')}</div>`:'<div class="empty"><i class="bi bi-book fs-1"></i><p>I-mark ang verses bilang read at lalabas sila dito.</p></div>')}
function plist(){app.innerHTML=head('pl')+`<div class="input-group mb-3"><input id="pi" type="text" class="form-control" placeholder="Who or what are you praying for?"><button class="btn btn-primary" data-a="padd"><i class="bi bi-plus-lg"></i> Add</button></div><div class="list-group tw-rounded-3xl tw-shadow-lg">${D.pl.map((p,i)=>`<label class="list-group-item d-flex align-items-center gap-3 py-3"><input class="form-check-input hab-check mt-0" type="checkbox" data-a="pdone" data-i="${i}" ${p.done?'checked':''}><span class="flex-grow-1 ${p.done?'done':''}">${esc(p.t)}</span>${p.done?'<span class="badge text-bg-success">Answered</span>':''}<button class="btn btn-sm btn-outline-danger rounded-pill" data-a="pdel" data-i="${i}" aria-label="Remove"><i class="bi bi-x-lg"></i></button></label>`).join('')||'<div class="list-group-item empty">Isulat ang mga ipinagdarasal mo. I-check kapag sinagot na.</div>'}</div>`;
$('#pi').onkeydown=e=>{if(e.key=='Enter')padd()}}
function padd(){const t=$('#pi').value.trim();if(!t)return;D.pl.unshift({t,done:0});save();plist()}
function habits(){const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return d.toISOString().slice(0,10)});
const lab=d=>new Date(d+'T00:00').toLocaleDateString('en',{weekday:'short'})+'<br><small class="text-secondary">'+d.slice(8)+'</small>';
app.innerHTML=head('ht')+`<div class="card tw-rounded-3xl mb-3"><div class="table-responsive"><table class="table align-middle text-center mb-0"><thead><tr><th class="text-start">Habit</th>${days.map(d=>`<th>${lab(d)}</th>`).join('')}<th><i class="bi bi-fire text-danger"></i></th></tr></thead><tbody>${D.hab.map((h,hi)=>{let s=0;for(let i=6;i>=0;i--){if((D.hl[days[i]]||{})[h])s++;else break}
return`<tr><td class="text-start text-nowrap">${esc(h)} <button class="btn btn-sm btn-link text-danger p-0 ms-1" data-a="hdel" data-i="${hi}" aria-label="Delete habit"><i class="bi bi-x-circle"></i></button></td>${days.map(d=>`<td><input type="checkbox" class="form-check-input hab-check" data-a="hlog" data-d="${d}" data-h="${esc(h)}" ${(D.hl[d]||{})[h]?'checked':''}></td>`).join('')}<td class="fw-bold">${s}</td></tr>`}).join('')}</tbody></table></div></div><div class="input-group"><input id="hi" type="text" class="form-control" placeholder="New habit (e.g. Memorize a verse)"><button class="btn btn-primary" data-a="hadd"><i class="bi bi-plus-lg"></i> Add habit</button></div>`}

/* ---------- home & router ---------- */
function home(){const d=new Date(),v=ALL[(d.getFullYear()*366+d.getMonth()*31+d.getDate())%ALL.length],rd=Object.keys(D.read).length;
return`<section class="votd tw-rounded-3xl tw-shadow-xl tw-bg-gradient-to-br tw-from-indigo-500 tw-via-violet-500 tw-to-fuchsia-500 text-white p-4 p-md-5 mb-4"><small class="opacity-75"><i class="bi bi-stars"></i> Verse of the day</small><p class="my-2">${esc(v.t)}</p><strong>${esc(v.r)}</strong></section>
<div class="row row-cols-2 row-cols-sm-3 row-cols-lg-5 g-3 g-md-4">${S.map((s,i)=>`<div class="col"><button class="tile tw-w-full tw-rounded-3xl d-flex flex-column align-items-center gap-2 p-3 py-4" style="--i:${i}" data-go="${s[0]}"><span class="tile-ico tw-bg-gradient-to-br ${s[3]} tw-text-white"><i class="bi ${s[1]}"></i></span><span class="small fw-medium text-center">${s[2]}</span>${s[0]=='rt'?`<span class="badge rounded-pill text-bg-warning">${rd}/${ALL.length}</span>`:''}</button></div>`).join('')}</div>`}
function render(){const k=location.hash.slice(1),s=sec(k);$('#back').hidden=!s;$('#ttl').textContent=s?s[2]:'Digital Bible Journal';window.scrollTo(0,0);
document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('act',b.dataset.go==(s?k:'')));
if(!s)app.innerHTML=home();else if(k=='ot'||k=='nt')verses(k);else if(k=='se')search();else if(k=='fv')favs();else if(k=='rt')track();else if(k=='pl')plist();else if(k=='ht')habits();else entries(k)}

document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g){location.hash=g.dataset.go;if(!g.dataset.go)history.replaceState(null,'',location.pathname);render();return}
const b=e.target.closest('[data-a]');if(!b||!app.contains(b))return;const a=b.dataset.a,r=b.dataset.r,i=+b.dataset.i,k=location.hash.slice(1);
if(a=='fav'){D.fav[r]?delete D.fav[r]:D.fav[r]=1;save();if(k=='fv')render();else{b.className='btn btn-sm rounded-pill '+bt(D.fav[r]);b.innerHTML=favL(r)}}
else if(a=='read'){D.read[r]?delete D.read[r]:D.read[r]=1;save();b.className='btn btn-sm rounded-pill '+bt(D.read[r]);b.innerHTML=readL(r)}
else if(a=='cp'){const v=ALL.find(x=>x.r==r);navigator.clipboard?.writeText(`${v.t} — ${v.r} (KJV)`).then(()=>toast('Na-copy!'),()=>toast('Hindi ma-copy'))}
else if(a=='new'){ents(b.dataset.k).unshift({id:Date.now(),d:today(),f:[]});save();render()}
else if(a=='del'){if(confirm('Burahin ang entry na ito?')){D.ent[b.dataset.k]=ents(b.dataset.k).filter(x=>x.id!=b.dataset.id);save();render()}}
else if(a=='padd')padd();else if(a=='pdone'){D.pl[i].done=b.checked?1:0;save();plist()}else if(a=='pdel'){D.pl.splice(i,1);save();plist()}
else if(a=='hadd'){const t=$('#hi').value.trim();if(t){D.hab.push(t);save();habits()}}
else if(a=='hdel'){if(confirm('Burahin ang habit?')){D.hab.splice(i,1);save();habits()}}
else if(a=='hlog'){const d=b.dataset.d;(D.hl[d]=D.hl[d]||{})[b.dataset.h]=b.checked?1:0;save();habits()}});
app.addEventListener('input',e=>{const t=e.target;if(t.dataset.vn!==undefined){t.value.trim()?D.vn[t.dataset.vn]=t.value:delete D.vn[t.dataset.vn];save()}
else if(t.dataset.e){const x=ents(t.dataset.e).find(y=>y.id==t.dataset.id);if(x){x.f[+t.dataset.i]=t.value;save()}}});
$('#back').onclick=()=>{history.back();if(!history.length)location.hash=''};
window.onhashchange=render;
const setTheme=t=>{document.documentElement.setAttribute('data-bs-theme',t);$('#th').innerHTML=`<i class="bi bi-${t=='dark'?'sun-fill':'moon-stars-fill'}"></i>`;try{localStorage.setItem('bjt',t)}catch(e){}};
$('#th').onclick=()=>setTheme(document.documentElement.getAttribute('data-bs-theme')=='dark'?'light':'dark');
try{const t=localStorage.getItem('bjt')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');setTheme(t)}catch(e){}
$('#exp').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(D)],{type:'application/json'}));a.download='bible-journal-backup-'+today()+'.json';a.click();toast('Na-download ang backup')};
$('#imp').onclick=()=>$('#fi').click();
$('#fi').onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{try{D=Object.assign(D,JSON.parse(t));save();render();toast('Na-restore!')}catch(x){toast('Invalid backup file')}})};
render();

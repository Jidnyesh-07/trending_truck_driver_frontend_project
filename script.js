const tracks=[
 ["Midnight Highway","Road Crew","🌙","Night"],
 ["Open Road Sunrise","Highway Echo","🌅","Country"],
 ["Diesel Dreams","Roadline","🚛","Rock"],
 ["Long Haul","The Wayfarers","🛣️","Rock"],
 ["Rain on the Windshield","Roadside Piano","🌧️","Chill"],
 ["Golden Mile","Highway Echo","🌄","Country"],
 ["City Lights Run","Night Route","🌃","Electronic"],
 ["Rest Stop Coffee","Roadside Piano","☕","Chill"],
 ["Six Wheels Rolling","Road Crew","🚚","Rock"],
 ["Desert Highway","The Wayfarers","🏜️","Country"],
 ["Late Delivery","Night Route","🌃","Electronic"],
 ["Morning Miles","Highway Echo","☀️","Chill"]
];
let current=0,playing=false,progress=0;
const grid=document.getElementById("songsGrid");
const search=document.getElementById("search");
function render(){
 const q=search.value.toLowerCase();
 const list=tracks.map((t,i)=>({...t,i})).filter(t=>t[0].toLowerCase().includes(q)||t[1].toLowerCase().includes(q)||t[3].toLowerCase().includes(q));
 grid.innerHTML=list.length?list.map(t=>`<article class="song"><div class="cover">${t[2]}</div><div><h3>${t[0]}</h3><p>${t[1]} • ${t[3]}</p></div><button onclick="selectTrack(${t.i})">▶</button></article>`).join(""):"<p>No tracks found.</p>";
}
function selectTrack(i){current=i;document.getElementById("nowTitle").textContent=tracks[i][0];document.getElementById("nowArtist").textContent=tracks[i][1]+" • "+tracks[i][3];playing=true;document.getElementById("play").textContent="Ⅱ";progress=0;}
function step(n){current=(current+n+tracks.length)%tracks.length;selectTrack(current)}
document.getElementById("play").onclick=()=>{playing=!playing;document.getElementById("play").textContent=playing?"Ⅱ":"▶"};
document.getElementById("next").onclick=()=>step(1);document.getElementById("prev").onclick=()=>step(-1);
setInterval(()=>{if(playing){progress+=.35;if(progress>=100){progress=0;step(1)}document.getElementById("bar").style.width=progress+"%"}},500);
search.addEventListener("input",render);render();
document.querySelectorAll("[data-playlist]").forEach(b=>b.onclick=()=>{const name=b.dataset.playlist;const matches={ "Sunrise Highway":1,"Midnight Run":0,"Daytime Highway":2,"Rainy Road":4};selectTrack(matches[name]??0);window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})});
document.getElementById("menu").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>document.getElementById("nav").classList.remove("open"));

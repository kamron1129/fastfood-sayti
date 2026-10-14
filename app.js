const $ = s => document.querySelector(s);
const S = SETTINGS;
let cart = {}, cat = "all", q = "";
try { cart = JSON.parse(localStorage.getItem("cart") || "{}"); } catch (e) {}
const save = () => { try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (e) {} };
const money = n => n.toLocaleString("ru-RU").replace(/\u00a0/g, " ") + " so'm";
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const p2 = n => String(n).padStart(2, "0");

/* ---- Soat va ish vaqti ---- */
const DAYS = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
function tick() {
  const d = new Date(), h = d.getHours();
  $("#time").textContent = `${p2(h)}:${p2(d.getMinutes())}:${p2(d.getSeconds())}`;
  $("#date").textContent = `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const open = h >= S.open || h < S.close;
  const st = $("#status");
  st.textContent = open ? "Hozir ochiq" : "Hozir yopiq";
  st.classList.toggle("off", !open);
}
tick(); setInterval(tick, 1000);

/* ---- Menyu ---- */
const catOf = k => CATS.find(c => c.k === k);
function ctrl(i) {
  const n = cart[i] || 0;
  return n
    ? `<div class="qty"><button data-a="dec" data-id="${i}" aria-label="Kamaytirish">−</button><b>${n}</b><button data-a="inc" data-id="${i}" aria-label="Ko'paytirish">+</button></div>`
    : `<button class="add" data-a="inc" data-id="${i}">Qo'shish</button>`;
}
function renderTabs() {
  const all = [{ k: "all", n: "Hammasi", e: "✨" }, ...CATS];
  $("#tabs").innerHTML = all.map(c => `<button data-cat="${c.k}" aria-pressed="${c.k === cat}">${c.e} ${c.n}</button>`).join("");
}
function renderGrid() {
  const list = ITEMS.map((it, i) => ({ it, i })).filter(({ it }) =>
    (cat === "all" || it[0] === cat) && (it[1] + " " + it[2]).toLowerCase().includes(q));
  $("#grid").innerHTML = list.length ? list.map(({ it, i }) => {
    const c = catOf(it[0]);
    const pic = it[5] ? `<img src="${esc(it[5])}" alt="${esc(it[1])}" loading="lazy">` : `<span>${it[4]}</span>`;
    return `<article class="card glass"><div class="pic" style="background:linear-gradient(135deg,${c.c[0]},${c.c[1]})">${pic}</div>
      <div class="cb"><h3>${esc(it[1])}</h3><p>${esc(it[2])}</p>
      <div class="row"><span class="price">${money(it[3])}</span><span id="c${i}">${ctrl(i)}</span></div></div></article>`;
  }).join("") : `<p class="empty">Hech narsa topilmadi.</p>`;
}

/* ---- Savat va hisob-kitob ---- */
function calc() {
  let sub = 0, cnt = 0;
  for (const i in cart) { sub += ITEMS[i][3] * cart[i]; cnt += cart[i]; }
  const type = $("#type").value;
  const service = type === "zal" ? Math.round(sub * S.service) : 0;
  const delivery = type === "yetkaz" && sub ? S.delivery : 0;
  return { sub, cnt, service, delivery, fee: service + delivery, total: sub + service + delivery, type };
}
function renderCart() {
  const k = Object.keys(cart);
  $("#lines").innerHTML = k.length ? k.map(i => `<div class="ln"><em>${ITEMS[i][4]}</em>
    <div>${esc(ITEMS[i][1])}<br><small>${money(ITEMS[i][3])}</small></div>
    <div><span class="qty"><button data-a="dec" data-id="${i}" aria-label="Kamaytirish">−</button><b>${cart[i]}</b><button data-a="inc" data-id="${i}" aria-label="Ko'paytirish">+</button></span></div></div>`).join("")
    : `<p class="empty">Savat bo'sh. Menyudan taom tanlang.</p>`;
  const c = calc();
  $("#sub").textContent = money(c.sub);
  $("#fee").textContent = money(c.fee);
  $("#total").textContent = money(c.total);
  $("#count").textContent = c.cnt;
  $("#tableBox").style.display = c.type === "zal" ? "grid" : "none";
}
function change(i, d) {
  cart[i] = Math.max(0, (cart[i] || 0) + d);
  if (!cart[i]) delete cart[i];
  save();
  const el = $("#c" + i); if (el) el.innerHTML = ctrl(i);
  renderCart();
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-a]");
  if (b) change(+b.dataset.id, b.dataset.a === "inc" ? 1 : -1);
  const t = e.target.closest("[data-cat]");
  if (t) { cat = t.dataset.cat; renderTabs(); renderGrid(); }
});
$("#search").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); renderGrid(); });
$("#type").addEventListener("change", renderCart);

const drawer = (on) => { $("#drawer").classList.toggle("on", on); $("#overlay").classList.toggle("on", on); };
$("#openCart").onclick = () => drawer(true);
$("#closeCart").onclick = $("#overlay").onclick = () => drawer(false);
$("#clear").onclick = () => { cart = {}; save(); renderGrid(); renderCart(); };

/* ---- Chek ---- */
$("#checkout").onclick = () => {
  const c = calc();
  if (!c.cnt) { alert("Avval taom tanlang."); return; }
  let no = 1000;
  try { no = (+localStorage.getItem("chk") || 1000) + 1; localStorage.setItem("chk", no); } catch (e) {}
  const d = new Date();
  const when = `${p2(d.getDate())}.${p2(d.getMonth() + 1)}.${d.getFullYear()} ${p2(d.getHours())}:${p2(d.getMinutes())}`;
  const types = { zal: "Zalda", olib: "Olib ketish", yetkaz: "Yetkazib berish" };
  const lines = Object.keys(cart).map(i => `<div>${esc(ITEMS[i][1])}</div><div class="r"><span>${cart[i]} x ${ITEMS[i][3].toLocaleString("ru-RU")}</span><span>${(cart[i] * ITEMS[i][3]).toLocaleString("ru-RU")}</span></div>`).join("");
  const tb = c.type === "zal" && $("#table").value ? ` | Stol: ${esc($("#table").value)}` : "";
  const nm = $("#name").value.trim() ? `<div>Mijoz: ${esc($("#name").value.trim())}</div>` : "";
  $("#receipt").innerHTML = `<h3>YAMMI BITE</h3><div class="c">Toshkent, Amir Temur 12<br>Tel: +998 90 123 45 67</div><hr>
    <div class="r"><span>Chek № ${no}</span><span>${when}</span></div>
    <div>${types[c.type]}${tb}</div>${nm}<hr>${lines}<hr>
    <div class="r"><span>Taomlar</span><span>${c.sub.toLocaleString("ru-RU")}</span></div>
    ${c.service ? `<div class="r"><span>Xizmat ${S.service * 100}%</span><span>${c.service.toLocaleString("ru-RU")}</span></div>` : ""}
    ${c.delivery ? `<div class="r"><span>Yetkazish</span><span>${c.delivery.toLocaleString("ru-RU")}</span></div>` : ""}
    <hr><div class="r t"><span>JAMI</span><span>${money(c.total)}</span></div><hr>
    <div class="c">Rahmat! Yana kutamiz.</div>`;
  drawer(false);
  $("#modal").classList.add("on");
};
$("#print").onclick = () => window.print();
$("#newOrder").onclick = () => { $("#modal").classList.remove("on"); cart = {}; save(); $("#table").value = $("#name").value = ""; renderGrid(); renderCart(); };

renderTabs(); renderGrid(); renderCart();

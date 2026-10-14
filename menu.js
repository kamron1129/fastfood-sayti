// Menyu ma'lumotlari. Yangi taom qo'shish: ITEMS ga bitta qator yozing.
// Format: [toifa, nomi, tavsif, narx (so'm), emoji, rasm (ixtiyoriy: "images/burger.jpg")]
const CATS = [
  { k: "burger",  n: "Burgerlar",  e: "🍔", c: ["#ff6a3d", "#ffb830"] },
  { k: "lavash",  n: "Lavash",     e: "🌯", c: ["#ffb830", "#ff7a59"] },
  { k: "pitsa",   n: "Pitsa",      e: "🍕", c: ["#ff3d5a", "#ff9f43"] },
  { k: "hotdog",  n: "Hot-dog",    e: "🌭", c: ["#ff9f43", "#ff5e62"] },
  { k: "snack",   n: "Snack",      e: "🍟", c: ["#ffd23f", "#ff8a3d"] },
  { k: "drink",   n: "Ichimliklar",e: "🥤", c: ["#38bdf8", "#7c5cff"] },
  { k: "dessert", n: "Desert",     e: "🍰", c: ["#f472b6", "#a78bfa"] }
];
const ITEMS = [
  ["burger","Klassik burger","Mol go'shti kotleti, salat, pomidor, maxsus sous",24000,"🍔"],
  ["burger","Chizburger","Qo'sh pishloq, bodring, ketchup",27000,"🍔"],
  ["burger","Dabl burger","Ikki kotlet, cheddar, qovurilgan piyoz",38000,"🍔"],
  ["burger","Chiken burger","Qarsildoq tovuq filesi, yengil mayonez",25000,"🍗"],
  ["lavash","Mol go'shtli lavash","Yangi sabzavot, sous, issiq non",28000,"🌯"],
  ["lavash","Tovuqli lavash","Grildagi tovuq, kartoshka, salat",25000,"🌯"],
  ["lavash","Pishloqli lavash","Erigan pishloq va go'sht",30000,"🌯"],
  ["lavash","Donar","Qalin go'sht, sirka piyoz, achchiq sous",32000,"🥙"],
  ["pitsa","Margarita","Pomidor, mozzarella, rayhon",55000,"🍕"],
  ["pitsa","Pepperoni","Achchiq kolbasa va ko'p pishloq",68000,"🍕"],
  ["pitsa","To'rt pishloq","Mozzarella, parmezan, cheddar, dor blyu",72000,"🍕"],
  ["pitsa","Mix pitsa","Go'sht, qo'ziqorin, bolgar qalampiri",70000,"🍕"],
  ["hotdog","Klassik hot-dog","Sosiska, gorchitsa, ketchup",15000,"🌭"],
  ["hotdog","Pishloqli hot-dog","Sosiska va erigan pishloq",18000,"🌭"],
  ["hotdog","Mini hot-dog (3 dona)","Kichik bo'laklar, hamma uchun",20000,"🌭"],
  ["snack","Fri kartoshka","Oltin rangli, tuz bilan",14000,"🍟"],
  ["snack","Naggets (6 dona)","Qarsildoq tovuq bo'laklari",22000,"🍗"],
  ["snack","Chicken wings (6 dona)","Achchiq BBQ sousda",34000,"🍗"],
  ["snack","Piyoz halqalari","Panirovkada qovurilgan",16000,"🧅"],
  ["snack","Pishloqli sous","Qo'shimcha sous",4000,"🧀"],
  ["drink","Coca-Cola 0.5 l","Sovuq gazlangan ichimlik",8000,"🥤"],
  ["drink","Fanta 0.5 l","Apelsin ta'mi",8000,"🥤"],
  ["drink","Limonad","Uy limonadi, yalpiz bilan",14000,"🍋"],
  ["drink","Muzli kofe","Sovuq kofe, sut, muz",18000,"☕"],
  ["drink","Kapuchino","Qaymoqli issiq kofe",16000,"☕"],
  ["drink","Choy","Qora yoki ko'k choy",6000,"🍵"],
  ["drink","Milkshake","Vanil, shokolad yoki qulupnay",22000,"🥛"],
  ["dessert","Chizkeyk","Nyu-York uslubida",24000,"🍰"],
  ["dessert","Donut","Glazurli, rangli sepma bilan",12000,"🍩"],
  ["dessert","Muzqaymoq","Uch xil sharik",15000,"🍦"],
  ["dessert","Shokoladli brauni","Issiq, yong'oqli",18000,"🍫"]
];
const SETTINGS = { service: 0.10, delivery: 12000, open: 9, close: 2 };

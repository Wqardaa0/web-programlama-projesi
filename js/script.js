// Tema seçimi sayfalar arasında korunur; varsayılan görünüm mevcut açık tasarımdır.
const themeStorageKey = "basMobilyaTheme";
function applyTheme(theme, savePreference = false) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = selectedTheme;
  if (savePreference) {
    try { localStorage.setItem(themeStorageKey, selectedTheme); } catch (error) { /* Depolama kapalıysa sayfa görünümü yine değişir. */ }
  }
  document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
    toggle.checked = selectedTheme === "dark";
  });
  const themeStatus = document.querySelector("[data-theme-status]");
  if (themeStatus) themeStatus.textContent = selectedTheme === "dark" ? "Koyu görünüm seçili." : "Açık görünüm seçili.";
}

try {
  applyTheme(localStorage.getItem(themeStorageKey) || "light");
} catch (error) {
  applyTheme("light");
}

// Ürün listesi: fiyatlar Türk lirası cinsindendir.
const products = [
  { id: 1, name: "Mira Üçlü Koltuk", category: "koltuk", price: 18500, image: "images/koltuk-mira-uclu.jpg", alt: "Açık renk kumaşlı modern koltuk", description: "Geniş oturma alanı ve yumuşak minderleriyle günlük dinlenme alanları için rahat bir üçlü koltuk.", specs: "Kumaş döşeme · Ahşap ayak · 3 kişilik" },
  { id: 2, name: "Lina Tekli Koltuk", category: "koltuk", price: 9200, image: "images/koltuk-lina-tekli.jpg", alt: "Sade tasarımlı tekli koltuk", description: "Okuma köşeleri ve küçük oturma alanları için tasarlanmış, sade çizgili tekli koltuk.", specs: "Kumaş döşeme · Ahşap ayak · 1 kişilik" },
  { id: 3, name: "Arin Yemek Masası", category: "masa", price: 12400, image: "images/masa-arin-yemek.jpg", alt: "Ahşap yemek masası", description: "Aile yemekleri ve arkadaş buluşmaları için sağlam, yalın tasarımlı yemek masası.", specs: "Masif ahşap görünümü · 4 kişilik · Temizliği kolay yüzey" },
  { id: 4, name: "Nora Yan Sehpa", category: "masa", price: 3600, image: "images/masa-nora-yan-sehpa.jpg", alt: "Doğal ahşap yan sehpa", description: "Koltuk yanında kitap, içecek ve günlük eşyalar için kullanışlı bir yan sehpa.", specs: "Ahşap yüzey · Kompakt ölçü · Kolay taşınır" },
  { id: 5, name: "Ekin Ahşap Sandalye", category: "sandalye", price: 2800, image: "images/sandalye-ekin-ahsap.jpg", alt: "Ahşap ayaklı sade sandalye", description: "Yemek masası çevresinde veya çalışma alanında kullanılabilen hafif ve sade sandalye.", specs: "Ahşap ayak · Kolay silinen oturma yüzeyi · 1 kişilik" },
  { id: 6, name: "Ada Döşemeli Sandalye", category: "sandalye", price: 4200, image: "images/sandalye-ada-dosemeli.jpg", alt: "Döşemeli yemek sandalyesi", description: "Döşemeli oturma bölümüyle yemek masasında daha konforlu kullanım sunar.", specs: "Kumaş oturma bölümü · Ahşap ayak · 1 kişilik" },
  { id: 7, name: "Mira İkili Koltuk", category: "koltuk", price: 13900, image: "images/koltuk-mira-ikili.jpg", alt: "İki kişilik sade koltuk", description: "Küçük salonlar ve oturma köşeleri için kompakt iki kişilik koltuk.", specs: "Kumaş döşeme · Ahşap ayak · 2 kişilik" },
  { id: 8, name: "Sera Köşe Koltuk", category: "koltuk", price: 26900, image: "images/koltuk-sera-kose.jpg", alt: "Köşe koltuk", description: "Geniş oturma alanı sunan, ailece vakit geçirmek için uygun köşe koltuk.", specs: "Kumaş döşeme · Geniş oturma alanı · L biçimli" },
  { id: 9, name: "Riva Berjer", category: "koltuk", price: 7800, image: "images/koltuk-riva-berjer.jpg", alt: "Tek kişilik berjer", description: "Salonunuza tamamlayıcı bir oturma alanı ekleyen rahat berjer.", specs: "Kumaş döşeme · Ahşap ayak · 1 kişilik" },
  { id: 10, name: "Ege Orta Sehpa", category: "masa", price: 4800, image: "images/masa-ege-orta-sehpa.jpg", alt: "Ahşap orta sehpa", description: "Oturma alanında günlük eşyalar için pratik ve sade bir orta sehpa.", specs: "Ahşap yüzey · Alçak tasarım · Salon kullanımı" },
  { id: 11, name: "Lora Çalışma Masası", category: "masa", price: 8900, image: "images/masa-lora-calisma.jpg", alt: "Ahşap çalışma masası", description: "Evde çalışma ve ders alanları için geniş yüzeyli kullanışlı masa.", specs: "Ahşap yüzey · Geniş çalışma alanı · Düz ayaklar" },
  { id: 12, name: "Ada Konsol Masa", category: "masa", price: 7600, image: "images/masa-ada-konsol.jpg", alt: "Sade konsol masa", description: "Antre veya yemek alanında düzen sağlamaya yardımcı çok amaçlı konsol.", specs: "Ahşap görünüm · Duvar yanı kullanım · Çok amaçlı" },
  { id: 13, name: "Mila Bar Sandalyesi", category: "sandalye", price: 3900, image: "images/sandalye-mila-bar.jpg", alt: "Yüksek bar sandalyesi", description: "Mutfak adaları ve yüksek masalar için sade tasarımlı bar sandalyesi.", specs: "Yüksek oturum · Ahşap ayak · 1 kişilik" },
  { id: 14, name: "Duru Kollu Sandalye", category: "sandalye", price: 5100, image: "images/sandalye-duru-kollu.jpg", alt: "Kollu döşemeli sandalye", description: "Kollu yapısı ve döşemeli oturma alanıyla masada rahatlık sağlar.", specs: "Kumaş döşeme · Kollu tasarım · Ahşap ayak" },
  { id: 15, name: "Yalın Çalışma Sandalyesi", category: "sandalye", price: 3400, image: "images/sandalye-yalin-calisma.jpg", alt: "Ahşap çalışma sandalyesi", description: "Çalışma masası yanında kullanılabilen, yalın ve hafif sandalye.", specs: "Ahşap ayak · Sade tasarım · 1 kişilik" },
  { id: 16, name: "Luna Çift Kişilik Yatak", category: "yatak", price: 21800, image: "images/yatak-luna-cift-kisilik.jpg", alt: "Çift kişilik yatak bulunan yatak odası", description: "Sade başlığı ve dengeli ölçüleriyle yatak odasına uyum sağlayan çift kişilik yatak.", specs: "160 × 200 cm · Döşemeli başlık · Yatak dahil değildir" },
  { id: 17, name: "Mira Tek Kişilik Yatak", category: "yatak", price: 14900, image: "images/yatak-mira-tek-kisilik.jpg", alt: "Tek kişilik yatak", description: "Çocuk ve genç odaları için sade çizgili tek kişilik yatak.", specs: "90 × 200 cm · Ahşap gövde · Yatak dahil değildir" },
  { id: 18, name: "Nora Karyola", category: "yatak", price: 17600, image: "images/yatak-nora-karyola.jpg", alt: "Ahşap karyola", description: "Doğal ahşap görünümüyle yatak odasında sıcak bir atmosfer oluşturur.", specs: "140 × 200 cm · Ahşap görünüm · Yatak dahil değildir" },
  { id: 19, name: "Ekin Başlıklı Karyola", category: "yatak", price: 23900, image: "images/yatak-ekin-baslikli.jpg", alt: "Başlıklı çift kişilik karyola", description: "Yumuşak başlığı ve sade yapısıyla dinlenme alanınızı tamamlar.", specs: "160 × 200 cm · Kumaş başlık · Yatak dahil değildir" },
  { id: 20, name: "Ada Bazalı Yatak", category: "yatak", price: 28700, image: "images/yatak-ada-bazali.jpg", alt: "Bazalı yatak", description: "Yatak odasında ek saklama alanı sağlayan kullanışlı bazalı model.", specs: "160 × 200 cm · Sandıklı baza · Yatak dahil değildir" },
  { id: 21, name: "Lina Gardırop", category: "dolap", price: 19400, image: "images/dolap-lina-gardirop.jpg", alt: "Ahşap gardırop", description: "Giysi ve ev eşyalarını düzenli tutmak için sade tasarımlı gardırop.", specs: "2 kapaklı · Askı ve raf alanı · Ahşap görünüm" },
  { id: 22, name: "Mira Bölmeli Kitaplık", category: "dolap", price: 25800, image: "images/kitaplik-mira-bolmeli.jpg", alt: "Kitaplarla düzenlenmiş ahşap kitaplık", description: "Kitaplar ve dekoratif eşyalar için bölmeli, geniş depolama alanı sunar.", specs: "Bölmeli raflar · Ahşap görünüm · Salon veya çalışma odası" },
  { id: 23, name: "Ege Çalışma Kitaplığı", category: "dolap", price: 11200, image: "images/kitaplik-ege-calisma.jpg", alt: "Ahşap raflarda düzenlenmiş kitaplık", description: "Çalışma alanında kitapları ve dosyaları düzenli tutmaya yardımcı olur.", specs: "Açık raflar · Kompakt tasarım · Ahşap görünüm" },
  { id: 24, name: "Duru Komodin", category: "dolap", price: 3900, image: "images/dolap-duru-komodin.jpg", alt: "Doğal ahşap yatak yanı komodin", description: "Yatak yanında kitap ve kişisel eşyalar için küçük komodin.", specs: "2 çekmece · Kompakt ölçü · Ahşap görünüm" },
  { id: 25, name: "Sera Kitaplık", category: "dolap", price: 9800, image: "images/kitaplik-sera.jpg", alt: "Ahşap ev kitaplığı ve raflarda sıralı kitaplar", description: "Kitapları ve dekoratif eşyaları düzenlemeye yardımcı açık raflı kitaplık.", specs: "5 raf · Duvara sabitlemeye uygun · Ahşap görünüm" }
];

const money = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });

const categoryNames = {
  koltuk: "Koltuk",
  masa: "Masa",
  sandalye: "Sandalye",
  yatak: "Yatak",
  dolap: "Dolap ve kitaplık"
};

// Sepet ve sipariş anahtarları standartlaştırıldı (eski anahtarlara geriye dönük uyumluluk korunur).
const cartStorageKey = "basMobilyaCart";
const orderStorageKey = "basMobilyaLastOrder";
const favoritesStorageKey = "basMobilyaFavorites";

// Favoriler verisini yönetir
function getFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(favoritesStorageKey)) || [];
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(favoritesStorageKey, JSON.stringify(favorites));
  updateFavoritesCount();
}

function isFavorite(productId) {
  return getFavorites().includes(productId);
}

function toggleFavorite(productId) {
  const favs = getFavorites();
  const index = favs.indexOf(productId);
  let isNowFav = false;
  if (index > -1) {
    favs.splice(index, 1);
  } else {
    favs.push(productId);
    isNowFav = true;
  }
  saveFavorites(favs);
  return isNowFav;
}

function updateFavoritesCount() {
  const count = getFavorites().length;
  document.querySelectorAll("[data-favorites-count]").forEach((element) => {
    element.textContent = count;
  });
}

// Bildirim (Toast) sistemi
function showToast(message, icon = "✓") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<div class="toast-content"><span class="toast-icon" aria-hidden="true">${icon}</span><span>${message}</span></div><button class="toast-close" type="button" aria-label="Kapat">×</button>`;
  container.appendChild(toast);

  window.requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  let timer;
  const dismiss = () => {
    window.clearTimeout(timer);
    toast.classList.remove("show");
    window.setTimeout(() => toast.remove(), 320);
  };

  toast.querySelector(".toast-close").addEventListener("click", dismiss);
  timer = window.setTimeout(dismiss, 3000);
}

// Scroll reveal görünüm gözlemcisi
function observeReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("revealed"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal:not(.revealed)").forEach((element) => observer.observe(element));
}

// Sepet verisini localStorage içinden alır; ilk ziyarette boş sepet döner.
function getCart() {
  try {
    const rawCart = localStorage.getItem(cartStorageKey) || localStorage.getItem("luneraCart");
    const savedCart = JSON.parse(rawCart) || [];
    return Array.isArray(savedCart) ? savedCart : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  localStorage.removeItem("luneraCart");
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = count;
  });
  document.querySelectorAll("[data-cart-item-count]").forEach((element) => {
    element.textContent = count;
  });
}

// Ürün kartlarını verilen alana ekler.
function createProductCard(product) {
  const isFav = isFavorite(product.id);
  return `<article class="product-card reveal">
    <button class="favorite-btn ${isFav ? 'active' : ''}" type="button" data-toggle-favorite="${product.id}" aria-label="${product.name} favorilere ekle veya çıkar" title="${isFav ? 'Favorilerden çıkar' : 'Favorilere ekle'}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>
    <button class="product-image-button" type="button" data-show-product="${product.id}" aria-label="${product.name} ürün bilgilerini göster"><img src="${product.image}" alt="${product.alt}" loading="lazy"></button>
    <div class="product-info"><h3>${product.name}</h3><p class="product-price">${money.format(product.price)}</p>
    <button class="button" type="button" data-add-to-cart="${product.id}">Sepete Ekle</button></div>
  </article>`;
}

function renderProducts(container, list) {
  if (container) {
    container.innerHTML = list.map(createProductCard).join("");
    observeReveal();
  }
}

function addToCart(productId) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) existingItem.quantity += 1;
  else cart.push({ id: productId, quantity: 1 });
  saveCart(cart);
}

function renderCart() {
  const cartContainer = document.querySelector("[data-cart-items]");
  const summary = document.querySelector("[data-cart-summary]");
  if (!cartContainer || !summary) return;

  const cart = getCart().filter((item) => products.some((product) => product.id === item.id));
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  document.querySelectorAll("[data-cart-item-count]").forEach((element) => {
    element.textContent = itemCount;
  });

  const cartActions = document.querySelector("[data-cart-actions]");
  const checkoutLink = document.querySelector("[data-checkout-link]");
  const summaryPanel = document.querySelector("[data-cart-summary-panel]");
  // Sepet boşken sonraki sipariş adımları tıklanamaz.
  document.querySelectorAll("[data-checkout-step]").forEach((stepLink) => {
    stepLink.setAttribute("aria-disabled", String(cart.length === 0));
    if (cart.length === 0) stepLink.setAttribute("tabindex", "-1");
    else stepLink.removeAttribute("tabindex");
  });
  if (cart.length === 0) {
    cartContainer.innerHTML = '<div class="empty-cart"><div class="empty-cart-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M12 17h24l-2 25H14l-2-25Z"></path><path d="M18 18v-5a6 6 0 0 1 12 0v5"></path></svg></div><h2>Sepetiniz henüz boş</h2><p>Size uygun mobilyaları keşfedin ve beğendiklerinizi sepetinize ekleyin.</p><a class="button" href="urunler.html">Ürünleri Keşfet</a></div>';
    summary.innerHTML = "";
    summary.hidden = true;
    if (cartActions) cartActions.hidden = true;
    if (checkoutLink) checkoutLink.hidden = true;
    if (summaryPanel) summaryPanel.hidden = true;
    return;
  }

  summary.hidden = false;
  if (cartActions) cartActions.hidden = false;
  if (checkoutLink) checkoutLink.hidden = false;
  if (summaryPanel) summaryPanel.hidden = false;

  let total = 0;
  cartContainer.innerHTML = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    const lineTotal = product.price * item.quantity;
    total += lineTotal;
    return `<article class="cart-row">
      <img class="cart-product-image" src="${product.image}" alt="${product.alt}" loading="lazy">
      <div class="cart-product-info"><p class="cart-product-category">${categoryNames[product.category] || product.category}</p><h3>${product.name}</h3><p class="cart-unit-price">Birim fiyatı: ${money.format(product.price)}</p></div>
      <div class="cart-quantity"><span>Adet</span><div class="quantity-control"><button class="quantity-button" type="button" data-quantity-change="-1" data-product-id="${product.id}" aria-label="${product.name} adetini azalt">−</button><output>${item.quantity}</output><button class="quantity-button" type="button" data-quantity-change="1" data-product-id="${product.id}" aria-label="${product.name} adetini artır">+</button></div></div>
      <strong class="cart-line-total">${money.format(lineTotal)}</strong>
      <button class="remove-button" type="button" data-remove-from-cart="${product.id}">Kaldır</button>
    </article>`;
  }).join("");

  summary.innerHTML = `<div class="summary-line"><span>Ürün ara toplamı (${itemCount} ürün)</span><strong>${money.format(total)}</strong></div><div class="cart-total-line"><span>Genel toplam</span><strong>${money.format(total)}</strong></div>`;
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateFavoritesCount();

  // Scroll to top butonu oluşturur ve bağlar
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.type = "button";
  scrollTopBtn.setAttribute("aria-label", "Yukarı çık");
  scrollTopBtn.title = "Yukarı çık";
  scrollTopBtn.innerHTML = "↑";
  document.body.appendChild(scrollTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }, { passive: true });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Sayfa içi bölümleri scroll reveal gözlemcisine ekler
  document.querySelectorAll(".section, .page-intro, .category-card, .process-item, .home-story, .home-process, .about-section, .about-story, .about-detail, .about-values, .value-item").forEach((el) => {
    el.classList.add("reveal");
  });
  observeReveal();

  // Ayarlar sayfasındaki seçim tema tercihini kaydeder.
  document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
    toggle.addEventListener("change", () => applyTheme(toggle.checked ? "dark" : "light", true));
  });

  // Ödeme sayfası boş sepetle açılırsa kullanıcıyı sepete geri gönderir.
  const hasOrderableItems = getCart().some((item) => products.some((product) => product.id === item.id));
  if (document.querySelector("[data-checkout-form]") && !hasOrderableItems) {
    window.location.replace("sepet.html");
    return;
  }

  // Ana sayfada üç öne çıkan ürünü gösterir.
  renderProducts(document.querySelector("[data-featured-products]"), products.slice(0, 3));

  // Ürün sayfasındaki kategori, arama ve sıralama kontrolleri
  const productList = document.querySelector("[data-product-list]");
  if (productList) {
    const filterButtons = Array.from(document.querySelectorAll("[data-category]"));
    const searchInput = document.getElementById("product-search");
    const searchClear = document.getElementById("search-clear");
    const sortSelect = document.getElementById("product-sort");
    const countBadge = document.querySelector("[data-product-count-badge]");

    let activeCategory = new URLSearchParams(window.location.search || "").get("kategori") || "all";
    let searchQuery = "";
    let activeSort = "default";

    function filterAndRenderCatalog(updateUrl = true) {
      // 1. Kategori / Favoriler Filtresi
      let filtered = products;
      if (activeCategory === "favorites") {
        const favs = getFavorites();
        filtered = filtered.filter((p) => favs.includes(p.id));
      } else if (activeCategory !== "all") {
        filtered = filtered.filter((p) => p.category === activeCategory);
      }

      // 2. Metin Arama Filtresi
      if (searchQuery) {
        const query = searchQuery.toLocaleLowerCase("tr");
        filtered = filtered.filter((p) =>
          p.name.toLocaleLowerCase("tr").includes(query) ||
          p.description.toLocaleLowerCase("tr").includes(query) ||
          p.specs.toLocaleLowerCase("tr").includes(query)
        );
      }

      // 3. Sıralama
      if (activeSort === "price-asc") {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
      } else if (activeSort === "price-desc") {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
      } else if (activeSort === "name-asc") {
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, "tr"));
      }

      // 4. Ekrana Basma
      if (filtered.length === 0) {
        productList.innerHTML = `<div class="no-results"><h3>Sonuç bulunamadı</h3><p>Seçili filtre veya arama kriterlerine uygun ürün bulunmamaktadır.</p><button type="button" class="button" data-reset-filters>Filtreleri Temizle</button></div>`;
      } else {
        renderProducts(productList, filtered);
      }

      // 5. Adet Rozeti
      if (countBadge) {
        countBadge.textContent = `${filtered.length} ürün listelendi`;
      }

      // 6. Aktif Kategori Butonu
      const selectedButton = filterButtons.find((button) => button.dataset.category === activeCategory) || filterButtons[0];
      filterButtons.forEach((button) => button.classList.toggle("active", button === selectedButton));

      // 7. URL Senkronizasyonu
      if (updateUrl) {
        const url = new URL(window.location);
        if (activeCategory === "all") {
          url.searchParams.delete("kategori");
        } else {
          url.searchParams.set("kategori", activeCategory);
        }
        window.history.replaceState({}, "", url);
      }
    }

    window.refreshCatalog = () => filterAndRenderCatalog(false);

    filterAndRenderCatalog(false);

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.category;
        filterAndRenderCatalog(true);
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        searchQuery = searchInput.value.trim();
        if (searchClear) searchClear.hidden = !searchQuery;
        filterAndRenderCatalog(false);
      });
    }

    if (searchClear) {
      searchClear.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        searchClear.hidden = true;
        filterAndRenderCatalog(false);
        searchInput.focus();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        activeSort = sortSelect.value;
        filterAndRenderCatalog(false);
      });
    }

    window.addEventListener("popstate", () => {
      activeCategory = new URLSearchParams(window.location.search || "").get("kategori") || "all";
      filterAndRenderCatalog(false);
    });
  }

  renderCart();

  // Sipariş sayfasında sepet özeti gösterilir.
  const checkoutItems = document.querySelector("[data-checkout-items]");
  const checkoutTotal = document.querySelector("[data-checkout-total]");
  if (checkoutItems && checkoutTotal) {
    const checkoutSubtotal = document.querySelector("[data-checkout-subtotal]");
    const cart = getCart().filter((item) => products.some((product) => product.id === item.id));
    if (cart.length === 0) {
      checkoutItems.innerHTML = '<p class="empty-cart">Sepetiniz boş. Önce ürün ekleyin.</p>';
      checkoutTotal.textContent = "Toplam: 0 ₺";
      if (checkoutSubtotal) checkoutSubtotal.textContent = money.format(0);
      const checkoutSubmit = document.querySelector(".checkout-submit");
      if (checkoutSubmit) checkoutSubmit.disabled = true;
    } else {
      let total = 0;
      checkoutItems.innerHTML = cart.map((item) => {
        const product = products.find((entry) => entry.id === item.id);
        total += product.price * item.quantity;
        return `<article class="checkout-summary-item"><img src="${product.image}" alt="${product.alt}"><div class="checkout-summary-copy"><strong>${product.name}</strong><span>${item.quantity} adet</span></div><strong class="checkout-item-price">${money.format(product.price * item.quantity)}</strong></article>`;
      }).join("");
      checkoutTotal.textContent = `Toplam: ${money.format(total)}`;
      if (checkoutSubtotal) checkoutSubtotal.textContent = money.format(total);
    }
  }

  // Kart düğmeleri dinamik oluşturulduğu için tıklamaları belge üzerinden yakalar.
  document.addEventListener("click", (event) => {
    const disabledCheckoutStep = event.target.closest('[data-checkout-step][aria-disabled="true"]');
    if (disabledCheckoutStep) {
      event.preventDefault();
      return;
    }
    const favButton = event.target.closest("[data-toggle-favorite]");
    const resetFiltersButton = event.target.closest("[data-reset-filters]");
    const addButton = event.target.closest("[data-add-to-cart]");
    const removeButton = event.target.closest("[data-remove-from-cart]");
    const quantityButton = event.target.closest("[data-quantity-change]");
    const detailButton = event.target.closest("[data-show-product]");
    const dialog = document.querySelector("[data-product-dialog]");

    if (resetFiltersButton) {
      const searchInput = document.getElementById("product-search");
      const searchClear = document.getElementById("search-clear");
      const sortSelect = document.getElementById("product-sort");
      if (searchInput) searchInput.value = "";
      if (searchClear) searchClear.hidden = true;
      if (sortSelect) sortSelect.value = "default";
      const allBtn = document.querySelector('[data-category="all"]');
      if (allBtn) allBtn.click();
      return;
    }

    if (favButton) {
      const productId = Number(favButton.dataset.toggleFavorite);
      const isNowFav = toggleFavorite(productId);
      favButton.classList.toggle("active", isNowFav);
      favButton.title = isNowFav ? "Favorilerden çıkar" : "Favorilere ekle";
      const product = products.find((item) => item.id === productId);
      const productName = product ? product.name : "Ürün";
      showToast(isNowFav ? `${productName} favorilere eklendi.` : `${productName} favorilerden çıkarıldı.`, isNowFav ? "♥" : "♡");

      const activeFavTab = document.querySelector('[data-category="favorites"].active');
      if (activeFavTab && typeof window.refreshCatalog === "function") {
        window.refreshCatalog();
      }
      return;
    }

    if (detailButton && dialog) {
      const product = products.find((item) => item.id === Number(detailButton.dataset.showProduct));
      if (product) {
        dialog.querySelector("[data-dialog-image]").src = product.image;
        dialog.querySelector("[data-dialog-image]").alt = product.alt;
        dialog.querySelector("[data-dialog-category]").textContent = categoryNames[product.category] || product.category;
        dialog.querySelector("[data-dialog-name]").textContent = product.name;
        dialog.querySelector("[data-dialog-price]").textContent = money.format(product.price);
        dialog.querySelector("[data-dialog-description]").textContent = product.description;
        dialog.querySelector("[data-dialog-specs]").textContent = product.specs;
        dialog.querySelector("[data-dialog-add]").dataset.addToCart = product.id;
        dialog.showModal();
      }
    }
    if (event.target.closest("[data-close-dialog]")) dialog?.close();
    if (addButton) {
      const productId = Number(addButton.dataset.addToCart);
      addToCart(productId);
      const product = products.find((item) => item.id === productId);
      showToast(`${product ? product.name : "Ürün"} sepete eklendi!`, "✓");
      addButton.textContent = "Eklendi";
      window.setTimeout(() => { addButton.textContent = "Sepete Ekle"; }, 900);
    }
    if (removeButton) {
      const updatedCart = getCart().filter((item) => item.id !== Number(removeButton.dataset.removeFromCart));
      saveCart(updatedCart);
      renderCart();
    }
    if (quantityButton) {
      const productId = Number(quantityButton.dataset.productId);
      const change = Number(quantityButton.dataset.quantityChange);
      const updatedCart = getCart().map((item) => item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item);
      saveCart(updatedCart);
      renderCart();
    }
  });

  document.querySelectorAll("[data-product-dialog]").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  // Form yalnızca alanları kontrol eder; gerçek bir sunucuya mesaj göndermez.
  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.querySelector("[data-form-message]");
      const name = contactForm.elements.name.value.trim();
      const email = contactForm.elements.email.value.trim();
      const text = contactForm.elements.message.value.trim();
      message.className = "form-message";
      if (!name || !email || !text) {
        message.textContent = "Lütfen tüm alanları doldurun.";
        message.classList.add("error");
      } else if (!contactForm.elements.email.checkValidity()) {
        message.textContent = "Lütfen geçerli bir e-posta adresi yazın.";
        message.classList.add("error");
      } else {
        message.textContent = "Gönderim denemeniz alındı. Bu örnek proje gerçek e-posta göndermez.";
        message.classList.add("success");
        contactForm.reset();
      }
    });
  }

  // Giriş ve kayıt formları alanları kontrol eder; şifreleri saklamaz.
  const loginForm = document.querySelector("[data-login-form]");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.querySelector("[data-login-message]");
      const email = loginForm.elements.email.value.trim();
      const password = loginForm.elements.password.value;
      message.className = "form-message";
      message.hidden = false;
      if (!email || !password) {
        message.textContent = "Lütfen e-posta ve şifre alanlarını doldurun.";
        message.classList.add("error");
      } else if (!loginForm.elements.email.checkValidity()) {
        message.textContent = "Geçerli bir e-posta adresi yazın.";
        message.classList.add("error");
      } else if (password.length < 8) {
        message.textContent = "Şifre en az 8 karakter olmalıdır.";
        message.classList.add("error");
      } else {
        message.textContent = "Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...";
        message.classList.add("success");
        message.classList.remove("error");
        message.hidden = false;
        loginForm.reset();
        window.setTimeout(() => {
          window.location.href = "index.html";
        }, 1200);
      }
    });
  }

  const registerForm = document.querySelector("[data-register-form]");
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.querySelector("[data-register-message]");
      const name = registerForm.elements.name.value.trim();
      const email = registerForm.elements.email.value.trim();
      const password = registerForm.elements.password.value;
      const passwordAgain = registerForm.elements.passwordAgain.value;
      message.className = "form-message";
      message.hidden = false;
      if (!name || !email || !password || !passwordAgain) {
        message.textContent = "Lütfen bütün alanları doldurun.";
        message.classList.add("error");
      } else if (!registerForm.elements.email.checkValidity()) {
        message.textContent = "Geçerli bir e-posta adresi yazın.";
        message.classList.add("error");
      } else if (password.length < 8) {
        message.textContent = "Şifre en az 8 karakter olmalıdır.";
        message.classList.add("error");
      } else if (password !== passwordAgain) {
        message.textContent = "Şifre alanları birbiriyle eşleşmiyor.";
        message.classList.add("error");
      } else {
        message.textContent = "Hesabınız başarıyla oluşturuldu! Giriş sayfasına yönlendiriliyorsunuz...";
        message.classList.add("success");
        message.classList.remove("error");
        message.hidden = false;
        registerForm.reset();
        window.setTimeout(() => {
          window.location.href = "giris.html";
        }, 1200);
      }
    });
  }

  // Sipariş formu demo onayı verir ve sepeti temizler.
  const checkoutForm = document.querySelector("[data-checkout-form]");
  if (checkoutForm) {
    const cardFields = checkoutForm.querySelector("[data-card-fields]");
    const cardInputs = Array.from(checkoutForm.querySelectorAll("[data-card-input]"));
    const paymentOptions = Array.from(checkoutForm.querySelectorAll('input[name="payment"]'));
    function updateCardFields() {
      const selectedPayment = checkoutForm.querySelector('input[name="payment"]:checked');
      const cardSelected = selectedPayment && selectedPayment.value === "Kredi kartı";
      cardFields.hidden = !cardSelected;
      cardInputs.forEach((input) => { input.required = cardSelected; });
    }
    paymentOptions.forEach((option) => option.addEventListener("change", updateCardFields));
    updateCardFields();

    const cardNumberInput = checkoutForm.querySelector("[data-card-number]");
    cardNumberInput?.addEventListener("input", () => {
      const digits = cardNumberInput.value.replace(/\D/g, "").slice(0, 16);
      cardNumberInput.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    });
    const cardExpiryInput = checkoutForm.querySelector("[data-card-expiry]");
    cardExpiryInput?.addEventListener("input", () => {
      const digits = cardExpiryInput.value.replace(/\D/g, "").slice(0, 4);
      cardExpiryInput.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    });

    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.querySelector("[data-checkout-message]");
      const formData = new FormData(checkoutForm);
      const requiredValues = [formData.get("name"), formData.get("surname"), formData.get("email"), formData.get("phone"), formData.get("city"), formData.get("district"), formData.get("address")];
      const emailInput = checkoutForm.elements.email;
      const payment = formData.get("payment");
      const cardNumber = String(formData.get("cardNumber") || "").replace(/\D/g, "");
      const cardExpiry = String(formData.get("cardExpiry") || "").trim();
      const cardCvv = String(formData.get("cardCvv") || "").trim();
      if (getCart().length === 0) {
        message.textContent = "Sipariş vermek için sepetinize ürün ekleyin.";
        message.className = "form-message error";
      } else if (requiredValues.some((value) => !String(value || "").trim())) {
        message.textContent = "Lütfen tüm teslimat alanlarını doldurun.";
        message.className = "form-message error";
      } else if (!emailInput.checkValidity()) {
        message.textContent = "Lütfen geçerli bir e-posta adresi yazın.";
        message.className = "form-message error";
      } else if (!/^\+?[0-9 ()-]{7,20}$/.test(String(formData.get("phone") || "").trim())) {
        message.textContent = "Lütfen geçerli bir telefon numarası yazın.";
        message.className = "form-message error";
      } else if (payment === "Kredi kartı" && !String(formData.get("cardName") || "").trim()) {
        message.textContent = "Lütfen kart üzerindeki ad soyadı yazın.";
        message.className = "form-message error";
      } else if (payment === "Kredi kartı" && cardNumber.length !== 16) {
        message.textContent = "Kart numarası 16 haneli olmalıdır.";
        message.className = "form-message error";
      } else if (payment === "Kredi kartı" && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
        message.textContent = "Son kullanma tarihini AA/YY biçiminde yazın.";
        message.className = "form-message error";
      } else if (payment === "Kredi kartı" && !/^\d{3,4}$/.test(cardCvv)) {
        message.textContent = "Güvenlik kodu 3 veya 4 haneli olmalıdır.";
        message.className = "form-message error";
      } else {
        const cart = getCart().filter((item) => products.some((product) => product.id === item.id));
        const total = cart.reduce((sum, item) => {
          const product = products.find((entry) => entry.id === item.id);
          return sum + product.price * item.quantity;
        }, 0);
        const order = {
          name: `${String(formData.get("name")).trim()} ${String(formData.get("surname")).trim()}`,
          email: String(formData.get("email")).trim(),
          phone: String(formData.get("phone")).trim(),
          city: String(formData.get("city")).trim(),
          district: String(formData.get("district")).trim(),
          address: String(formData.get("address")).trim(),
          addressNote: String(formData.get("addressNote") || "").trim(),
          payment,
          date: new Date().toLocaleDateString("tr-TR"),
          items: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
          total
        };
        localStorage.setItem(orderStorageKey, JSON.stringify(order));
        localStorage.removeItem("luneraLastOrder");
        saveCart([]);
        window.location.href = "siparis.html";
      }
    });
  }

  // Son sipariş özeti kart bilgileri olmadan gösterilir.
  const confirmation = document.querySelector("[data-order-confirmation]");
  if (confirmation) {
    try {
      const rawOrder = localStorage.getItem(orderStorageKey) || localStorage.getItem("luneraLastOrder");
      const order = rawOrder ? JSON.parse(rawOrder) : null;
      if (order && order.items && order.items.length > 0) {
        const orderDetails = confirmation.querySelector("[data-order-details]");
        const orderItems = confirmation.querySelector("[data-order-items]");
        const orderMessage = confirmation.querySelector("[data-order-message]");
        if (orderDetails && orderItems) {
          orderDetails.hidden = false;
          if (orderMessage) orderMessage.textContent = `Teşekkürler ${order.name}. Eğitim projesi sipariş örneğiniz tamamlandı; gerçek ödeme alınmadı.`;
          orderItems.innerHTML = (order.items || []).map((item) => {
            const product = products.find((entry) => entry.id === item.id);
            if (!product) return "";
            return `<li><span>${product.name} × ${item.quantity}</span><strong>${money.format(product.price * item.quantity)}</strong></li>`;
          }).join("");
          confirmation.querySelector("[data-order-payment]").textContent = order.payment || "";
          confirmation.querySelector("[data-order-address]").textContent = [order.city, order.district, order.address].filter(Boolean).join(", ");
          confirmation.querySelector("[data-order-total]").textContent = money.format(order.total || 0);
        }
      } else {
        // Sipariş bilgisi yokken siparis.html'e doğrudan girildiyse ana sayfaya yönlendir
        window.location.replace("index.html");
      }
    } catch (error) {
      console.error("Sipariş özeti okunamadı.", error);
      window.location.replace("index.html");
    }
  }

  // ── KULLANICI / HESAP MENÜSÜ AÇILIR PANELİ (DROPDOWN) ──
  const userMenuBtn = document.querySelector(".user-menu-btn");
  const userMenu = document.querySelector(".user-menu");
  if (userMenuBtn && userMenu) {
    userMenuBtn.addEventListener("click", (event) => {
      // Mobilde veya dokunmatik cihazlarda tıklayınca menüyü aç/kapat
      if (window.innerWidth <= 768) {
        event.preventDefault();
        userMenu.classList.toggle("open");
      }
    });

    document.addEventListener("click", (event) => {
      if (!userMenu.contains(event.target)) {
        userMenu.classList.remove("open");
      }
    });
  }

  // ── HESAP & AYARLAR SAYFASI YÖNETİMİ (ayarlar.html) ──
  const profileInfoForm = document.getElementById("profile-info-form");
  if (profileInfoForm) {
    const profileStorageKey = "basMobilyaUserProfile";
    const nameInput = document.getElementById("prof-name");
    const surnameInput = document.getElementById("prof-surname");
    const emailInput = document.getElementById("prof-email");
    const phoneInput = document.getElementById("prof-phone");
    const displayName = document.getElementById("profile-display-name");
    const displayEmail = document.getElementById("profile-display-email");
    const avatar = document.getElementById("profile-avatar");

    // Kayıtlı profil verisi varsa formu doldur
    try {
      const savedProfile = JSON.parse(localStorage.getItem(profileStorageKey));
      if (savedProfile) {
        if (nameInput && savedProfile.name) nameInput.value = savedProfile.name;
        if (surnameInput && savedProfile.surname) surnameInput.value = savedProfile.surname;
        if (emailInput && savedProfile.email) emailInput.value = savedProfile.email;
        if (phoneInput && savedProfile.phone) phoneInput.value = savedProfile.phone;

        const fullName = `${savedProfile.name || "Ahmet"} ${savedProfile.surname || "Yılmaz"}`.trim();
        if (displayName) displayName.textContent = fullName;
        if (displayEmail && savedProfile.email) displayEmail.textContent = savedProfile.email;
        if (avatar) {
          const initials = `${(savedProfile.name || "A")[0]}${(savedProfile.surname || "Y")[0]}`.toUpperCase();
          avatar.textContent = initials;
        }
      }
    } catch (e) {
      /* Varsayılan değerler kullanılır */
    }

    profileInfoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const updatedProfile = {
        name: nameInput.value.trim(),
        surname: surnameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
      };
      localStorage.setItem(profileStorageKey, JSON.stringify(updatedProfile));
      const fullName = `${updatedProfile.name} ${updatedProfile.surname}`.trim();
      if (displayName) displayName.textContent = fullName;
      if (displayEmail) displayEmail.textContent = updatedProfile.email;
      if (avatar) {
        const initials = `${(updatedProfile.name || "A")[0]}${(updatedProfile.surname || "Y")[0]}`.toUpperCase();
        avatar.textContent = initials;
      }
      showToast("Kişisel bilgileriniz başarıyla güncellendi!", "✓");
    });

    // Şifre değiştirme formu
    const passwordForm = document.getElementById("password-change-form");
    if (passwordForm) {
      passwordForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newPass = document.getElementById("new-pass").value;
        const newPassAgain = document.getElementById("new-pass-again").value;
        if (newPass.length < 8) {
          showToast("Yeni şifre en az 8 karakter olmalıdır.", "!");
          return;
        }
        if (newPass !== newPassAgain) {
          showToast("Girdiğiniz yeni şifreler eşleşmiyor.", "!");
          return;
        }
        showToast("Şifreniz başarıyla güncellendi!", "✓");
        passwordForm.reset();
      });
    }

    // Bildirim tercihleri
    document.querySelectorAll("#pref-email-notify, #pref-sms-notify").forEach((toggle) => {
      toggle.addEventListener("change", () => {
        showToast("İletişim ve bildirim tercihleriniz kaydedildi.", "✓");
      });
    });

    // Adres düzenleme butonu
    const btnEditAddress = document.getElementById("btn-edit-address");
    if (btnEditAddress) {
      btnEditAddress.addEventListener("click", () => {
        const currentAddress = document.getElementById("address-display-text")?.textContent || "";
        const newAddress = window.prompt("Yeni teslimat adresinizi girin:", currentAddress);
        if (newAddress && newAddress.trim()) {
          const displayText = document.getElementById("address-display-text");
          if (displayText) displayText.textContent = newAddress.trim();
          showToast("Teslimat adresiniz güncellendi!", "✓");
        }
      });
    }

    // Son sipariş durumu göstergesi
    const orderCountEl = document.getElementById("profile-orders-count");
    const sidebarOrderContent = document.getElementById("sidebar-order-content");
    try {
      const rawOrder = localStorage.getItem(orderStorageKey) || localStorage.getItem("luneraLastOrder");
      const lastOrder = rawOrder ? JSON.parse(rawOrder) : null;
      if (lastOrder && lastOrder.items && lastOrder.items.length > 0) {
        if (orderCountEl) orderCountEl.textContent = "1";
        if (sidebarOrderContent) {
          sidebarOrderContent.innerHTML = `
            <div class="order-mini-status">
              <span class="status-indicator"></span>
              <strong>Sipariş Hazırlanıyor</strong>
            </div>
            <p class="order-mini-desc">${lastOrder.date || "Yakın zamanda"} · ${money.format(lastOrder.total || 0)} tutarında siparişiniz bulunmaktadır.</p>
            <a class="text-link" href="siparis.html">Sipariş detayını incele →</a>
          `;
        }
      } else {
        if (orderCountEl) orderCountEl.textContent = "0";
        if (sidebarOrderContent) {
          sidebarOrderContent.innerHTML = `
            <p class="order-mini-desc">Henüz tamamlanmış bir siparişiniz bulunmamaktadır.</p>
            <a class="text-link" href="urunler.html">Alışverişe başla →</a>
          `;
        }
      }
    } catch (e) {
      /* Hata durumunda varsayılan gösterim kalır */
    }

    // Oturumu kapat butonu
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        showToast("Oturumunuz kapatıldı. Ziyaretçi olarak devam ediyorsunuz.", "ℹ");
        window.setTimeout(() => {
          window.location.href = "index.html";
        }, 1200);
      });
    }
  }
});

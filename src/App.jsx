import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  Boxes,
  CalendarRange,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  CreditCard,
  FileText,
  Headphones,
  Info,
  ListFilter,
  MapPin,
  Menu,
  Package,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Trash2,
  User,
  Users,
  X,
} from 'lucide-react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

const STORAGE_KEYS = {
  products: 'labready_products',
  orders: 'labready_orders',
  settings: 'labready_settings',
};

const defaultSettings = {
  whatsappNumber: '6281234567890',
  adminPhone: '6281234567890',
  contactEmail: 'hello@labready.demo',
  returnAddress: 'Gedung FPMIPA UPI Lt. 2, Jl. Dr. Setiabudi No. 229, Bandung',
  pickupPoints: [
    'Lobby Gedung FPMIPA UPI',
    'Taman Depan Gedung Laboratorium',
    'Pos Satpam Fakultas',
  ],
  policy: {
    tarif: 'Tarif dapat diubah melalui pengaturan admin demo.',
    jaminan: 'Uang jaminan dapat diatur sesuai kebijakan usaha yang berlaku.',
    keterlambatan: 'Biaya keterlambatan akan dihitung sesuai ketentuan yang ditetapkan admin.',
    kerusakan: 'Kerusakan dan kehilangan barang akan dicatat dan ditangani sesuai prosedur.',
  },
};

const demoProducts = [
  {
    id: 'kalkulator-ilmiah',
    name: 'Kalkulator Ilmiah',
    category: 'Alat Tulis & Hitung',
    description: 'Kalkulator ilmiah untuk mata kuliah statistik, matematika, dan analisis data.',
    price: 25000,
    stock: 6,
    condition: 'Baik',
    image:
      'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'jas-laboratorium',
    name: 'Jas Laboratorium',
    category: 'Perlengkapan Praktikum',
    description: 'Jas laboratorium dengan bahan nyaman, aman, dan sesuai kebutuhan praktikum.',
    price: 30000,
    stock: 4,
    condition: 'Baik',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'kacamata-pelindung',
    name: 'Kacamata Pelindung',
    category: 'Perlengkapan Safety',
    description: 'Kacamata pelindung untuk keamanan saat praktikum dengan bahan anti gores.',
    price: 20000,
    stock: 9,
    condition: 'Baik',
    image:
      'https://images.unsplash.com/photo-1577803947579-9f0c9b1d0d86?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'penggaris-gambar',
    name: 'Penggaris & Perlengkapan Gambar',
    category: 'Peralatan Gambar',
    description: 'Set penggaris, skala, dan alat gambar untuk tugas desain dan teknik.',
    price: 18000,
    stock: 8,
    condition: 'Baik',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'alat-tulis',
    name: 'Alat Tulis Praktikum',
    category: 'Alat Tulis',
    description: 'Pensil, spidol, dan perlengkapan tulis yang siap dipakai untuk praktikum.',
    price: 15000,
    stock: 12,
    condition: 'Baik',
    image:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'perlengkapan-praktikum',
    name: 'Perlengkapan Praktikum Lainnya',
    category: 'Perlengkapan Praktikum',
    description: 'Peralatan tambahan praktikum seperti masker, sarung tangan, dan kit eksperimen.',
    price: 22000,
    stock: 5,
    condition: 'Baik',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
  },
];

const demoOrders = [
  {
    id: 'LR-ALYA24',
    customerName: 'Alya Putri',
    nim: '220000101',
    studyProgram: 'Pendidikan Kimia',
    whatsapp: '628123456789',
    productName: 'Kalkulator Ilmiah',
    quantity: 1,
    startDate: '2026-10-05',
    endDate: '2026-10-08',
    pickupPoint: 'Lobby Gedung FPMIPA UPI',
    status: 'Menunggu Konfirmasi',
    createdAt: '2026-10-04T09:15:00.000Z',
    totalCost: 75000,
    notes: 'Butuh untuk ujian midterm.',
  },
  {
    id: 'LR-ZAIN92',
    customerName: 'Zainul Arifin',
    nim: '220000204',
    studyProgram: 'Pendidikan Biologi',
    whatsapp: '628765432123',
    productName: 'Jas Laboratorium',
    quantity: 2,
    startDate: '2026-10-07',
    endDate: '2026-10-12',
    pickupPoint: 'Taman Depan Gedung Laboratorium',
    status: 'Dikonfirmasi',
    createdAt: '2026-10-05T14:42:00.000Z',
    totalCost: 180000,
    notes: 'Untuk praktikum pengamatan mikroskop.',
  },
  {
    id: 'LR-RAFI88',
    customerName: 'Rafi Pratama',
    nim: '220000145',
    studyProgram: 'Pendidikan Fisika',
    whatsapp: '628111222333',
    productName: 'Kacamata Pelindung',
    quantity: 1,
    startDate: '2026-09-25',
    endDate: '2026-09-30',
    pickupPoint: 'Pos Satpam Fakultas',
    status: 'Selesai',
    createdAt: '2026-09-23T08:12:00.000Z',
    totalCost: 100000,
    notes: 'Pengembalian tepat waktu.',
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value || 0);

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];

const getDaysBetween = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = end - start;
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};

const generateOrderCode = () => {
  const prefix = 'LR';
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${random}`;
};

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const statusColors = {
  'Menunggu Konfirmasi': 'status-waiting',
  Dikonfirmasi: 'status-confirmed',
  'Siap Diambil': 'status-ready',
  'Sedang Disewa': 'status-rented',
  'Menunggu Pemeriksaan Pengembalian': 'status-return',
  Selesai: 'status-complete',
  Dibatalkan: 'status-cancelled',
};

function App() {
  const [products, setProducts] = useState(() => readStorage(STORAGE_KEYS.products, demoProducts));
  const [orders, setOrders] = useState(() => readStorage(STORAGE_KEYS.orders, demoOrders));
  const [settings, setSettings] = useState(() => readStorage(STORAGE_KEYS.settings, defaultSettings));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.products, products);
  }, [products]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.orders, orders);
  }, [orders]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.settings, settings);
  }, [settings]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const notify = (message, variant = 'success') => setToast({ message, variant });

  const allCategories = ['Semua', ...new Set(products.map((product) => product.category))];

  const addProduct = (newProduct) => {
    const cleanProduct = {
      ...newProduct,
      id: newProduct.id || `${newProduct.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      price: Number(newProduct.price || 0),
      stock: Number(newProduct.stock || 0),
    };
    setProducts((current) => [cleanProduct, ...current]);
    notify('Barang baru berhasil ditambahkan ke inventaris demo.');
  };

  const updateProduct = (productId, patch) => {
    setProducts((current) =>
      current.map((product) => (product.id === productId ? { ...product, ...patch } : product))
    );
    notify('Data barang berhasil diperbarui.');
  };

  const removeProduct = (productId) => {
    const product = products.find((item) => item.id === productId);
    const confirmed = window.confirm(`Hapus ${product?.name || 'barang'} dari inventaris?`);
    if (!confirmed) return;
    setProducts((current) => current.filter((item) => item.id !== productId));
    notify('Barang berhasil dihapus.');
  };

  const addOrder = (newOrder) => {
    setOrders((current) => [newOrder, ...current]);
    notify('Pesanan berhasil diajukan dan tersimpan di localStorage browser ini.');
  };

  const updateOrderStatus = (orderId, nextStatus) => {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status: nextStatus } : order))
    );
    notify(`Status pesanan diperbarui menjadi ${nextStatus}.`);
  };

  return (
    <div className="app-shell">
      <AppHeader />
      {toast && (
        <div className={`toast toast-${toast.variant}`}>
          <span>{toast.message}</span>
        </div>
      )}
      <main>
        <Routes>
          <Route path="/" element={<HomePage products={products} settings={settings} allCategories={allCategories} />} />
          <Route path="/catalog" element={<CatalogPage products={products} />} />
          <Route path="/product/:productId" element={<ProductDetailPage products={products} />} />
          <Route path="/checkout" element={<CheckoutPage products={products} settings={settings} addOrder={addOrder} />} />
          <Route path="/confirmation" element={<ConfirmationPage orders={orders} />} />
          <Route path="/orders" element={<OrderHistoryPage orders={orders} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/prosedur" element={<ProcedurePage settings={settings} />} />
          <Route path="/admin" element={<AdminPage products={products} orders={orders} settings={settings} setSettings={setSettings} addProduct={addProduct} updateProduct={updateProduct} removeProduct={removeProduct} updateOrderStatus={updateOrderStatus} />} />
        </Routes>
      </main>
      <Footer settings={settings} />
    </div>
  );
}

function AppHeader() {
  const navItems = [
    { to: '/', label: 'Beranda' },
    { to: '/catalog', label: 'Katalog' },
    { to: '/prosedur', label: 'Cara Sewa' },
    { to: '/about', label: 'Tentang Kami' },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" aria-label="LabReady beranda">
          <span className="brand-mark">L</span>
          <span>LabReady</span>
        </Link>

        <nav className={`nav ${mobileOpen ? 'nav-open' : ''}`} aria-label="Navigasi utama">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/orders" className="button button-secondary small-button">
            Riwayat
          </Link>
          <Link to="/admin" className="button small-button">
            Dashboard
          </Link>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Buka menu navigasi"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function HomePage({ products, settings, allCategories }) {
  const [query, setQuery] = useState('');
  const featured = products.slice(0, 4);
  const filteredProducts = products.filter((product) => {
    const text = query.toLowerCase();
    return product.name.toLowerCase().includes(text) || product.category.toLowerCase().includes(text);
  });

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Lupa Bawa? LabReady Solusinya!</div>
            <h1>Butuh Perlengkapan Kuliah? Sewa di LabReady!</h1>
            <p>
              Platform penyewaan perlengkapan akademik dan praktikum yang memudahkan mahasiswa FPMIPA UPI mendapatkan alat kebutuhan kuliah secara cepat, aman, dan terjangkau.
            </p>
            <div className="hero-actions">
              <Link to="/catalog" className="button">
                Lihat Katalog <ArrowRight size={18} />
              </Link>
              <Link to="/prosedur" className="button button-secondary">
                Cara Menyewa
              </Link>
            </div>

            <div className="search-card">
              <label className="search-field">
                <Search size={18} />
                <input
                  type="search"
                  placeholder="Cari barang yang kamu butuhkan..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
            </div>

            <div className="category-row">
              {allCategories.slice(1, 6).map((category) => (
                <span key={category} className="chip">
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="Mahasiswa belajar di lab"
              />
              <div className="mini-stat start-card">
                <BadgeCheck size={18} />
                <div>
                  <strong>Praktis</strong>
                  <span>Proses cepat</span>
                </div>
              </div>
              <div className="mini-stat end-card">
                <ShieldCheck size={18} />
                <div>
                  <strong>Terpercaya</strong>
                  <span>Demo catalog</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Barang Populer</span>
            <h2>Rekomendasi untuk kebutuhan kampusmu</h2>
          </div>
          <Link to="/catalog" className="inline-link">
            Lihat semua <ChevronRight size={16} />
          </Link>
        </div>

        <div className="product-grid">
          {filteredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section light-section">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Kenapa LabReady</span>
            <h2>Keunggulan yang membuat mahasiswa lebih mudah sewa</h2>
          </div>
          <div className="feature-grid">
            <FeatureCard
              icon={<ShoppingBag size={22} />}
              title="Mudah diakses"
              text="Cari dan pilih barang tanpa ribet, cukup lewat browser di perangkat apa pun."
            />
            <FeatureCard
              icon={<Clock3 size={22} />}
              title="Jadwal fleksibel"
              text="Atur tanggal mulai dan kembali sewa sesuai kebutuhan studi atau praktikum."
            />
            <FeatureCard
              icon={<ShieldCheck size={22} />}
              title="Transparan"
              text="Info harga, stok, kondisi barang, dan ketentuan pengembalian disampaikan jelas."
            />
            <FeatureCard
              icon={<Headphones size={22} />}
              title="Dukungan responsif"
              text="Tersedia panduan dan kontak admin untuk komunikasi melalui WhatsApp."
            />
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading center">
          <span className="eyebrow">Panduan Sewa</span>
          <h2>Proses sewa yang simpel dan cepat</h2>
        </div>
        <div className="steps-grid">
          <StepCard number="1" title="Pilih barang" text="Cari kebutuhan praktikum atau perkuliahan sesuai kategori dan stok." />
          <StepCard number="2" title="Tentukan durasi" text="Atur tanggal mulai dan pengembalian agar sesuai jadwal kegiatanmu." />
          <StepCard number="3" title="Ajukan pesanan" text="Isi formulir dengan data lengkap dan tunggu konfirmasi admin." />
          <StepCard number="4" title="Ambil & kembalikan" text="Datang ke titik pengambilan dan lakukan pemeriksaan saat pengembalian." />
        </div>
      </section>

      <section className="section light-section">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Testimoni Demo</span>
            <h2>Umpan balik dari mahasiswa yang mencoba demo</h2>
          </div>
          <div className="testimonial-grid">
            <TestimonialCard name="Nadia A." study="Pendidikan Kimia" text="Prosesnya cepat dan barang yang disewa sesuai kebutuhan praktikum. Saya tidak perlu khawatir membawa peralatan dari rumah." />
            <TestimonialCard name="Dimas P." study="Pendidikan Fisika" text="Tampilan website mudah dipahami dan estimasi biaya terasa jelas. Sangat cocok untuk kebutuhan kampus." />
            <TestimonialCard name="Salsabila R." study="Pendidikan Biologi" text="Saya suka karena ada detail barang dan tanggal sewa yang bisa diatur sesuai jadwal lab." />
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading center">
          <span className="eyebrow">FAQ</span>
          <h2>Pertanyaan umum seputar LabReady</h2>
        </div>
        <div className="faq-list">
          <details open>
            <summary>Apakah tarif sewa bersifat contoh untuk demo?</summary>
            <p>Ya. Harga yang terlihat pada demo merupakan data contoh dan dapat diubah admin untuk kebutuhan operasional yang sesungguhnya.</p>
          </details>
          <details>
            <summary>Berapa lama durasi penyewaan yang umum?</summary>
            <p>Durasi sewa bisa disesuaikan dengan kebutuhan, mulai dari beberapa hari hingga beberapa minggu tergantung jenis barang.</p>
          </details>
          <details>
            <summary>Bagaimana cara pengambilan barang?</summary>
            <p>Mahasiswa dapat memilih salah satu titik pengambilan yang tersedia di kampus sesuai jadwal dan konfirmasi dari admin.</p>
          </details>
          <details>
            <summary>Apa yang terjadi jika terlambat mengembalikan?</summary>
            <p>Durasi keterlambatan dapat dicatat dan diberlakukan biaya tambahan sesuai kebijakan admin yang tersedia di halaman prosedur.</p>
          </details>
          <details>
            <summary>Apakah pengembalian barang otomatis terverifikasi?</summary>
            <p>Tidak. Dalam prototipe ini, status pengembalian tetap memerlukan pemeriksaan admin untuk memastikan kondisi barang aman.</p>
          </details>
        </div>
      </section>
    </>
  );
}

function CatalogPage({ products }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('terendah');

  const categories = ['Semua', ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    return [...products]
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'Semua' || product.category === category;
        const matchesAvailability = !availableOnly || product.stock > 0;
        return matchesSearch && matchesCategory && matchesAvailability;
      })
      .sort((a, b) => {
        if (sortBy === 'tertinggi') return b.price - a.price;
        return a.price - b.price;
      });
  }, [category, products, search, sortBy, availableOnly]);

  return (
    <section className="section container">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Katalog Barang</span>
          <h2>Jelajahi perlengkapan yang tersedia</h2>
        </div>
      </div>

      <div className="filter-panel">
        <label className="search-field filter-search">
          <Search size={18} />
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari nama barang..." />
        </label>

        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="terendah">Harga: Terendah</option>
          <option value="tertinggi">Harga: Tertinggi</option>
        </select>

        <label className="toggle-check">
          <input type="checkbox" checked={availableOnly} onChange={(event) => setAvailableOnly(event.target.checked)} />
          <span>Hanya yang tersedia</span>
        </label>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <Package size={36} />
          <h3>Belum ada barang yang cocok</h3>
          <p>Coba ubah kata kunci, kategori, atau filter ketersediaan untuk melihat hasil lain.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProductDetailPage({ products }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = products.find((item) => item.id === productId);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 86400000 * 3);
    const defaultEnd = new Date(today.getTime() + 86400000 * 5);
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(defaultEnd.toISOString().split('T')[0]);
  }, [product]);

  if (!product) {
    return (
      <section className="section container">
        <div className="empty-state">
          <Info size={36} />
          <h3>Produk tidak ditemukan</h3>
          <p>Kembali ke katalog untuk memilih barang lain.</p>
          <Link to="/catalog" className="button">
            Kembali ke Katalog
          </Link>
        </div>
      </section>
    );
  }

  const totalDays = getDaysBetween(startDate, endDate);
  const estimatedCost = product.price * totalDays * quantity;

  const handleContinueOrder = () => {
    if (!startDate || !endDate) {
      alert('Silakan pilih tanggal mulai dan tanggal pengembalian terlebih dahulu.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      alert('Tanggal pengembalian tidak boleh lebih awal daripada tanggal mulai sewa.');
      return;
    }
    if (quantity > product.stock) {
      alert(`Jumlah barang melebihi stok tersedia (${product.stock}).`);
      return;
    }

    navigate('/checkout', {
      state: {
        product,
        startDate,
        endDate,
        quantity,
        totalDays,
        estimatedCost,
      },
    });
  };

  return (
    <section className="section container">
      <div className="detail-wrap">
        <div className="detail-gallery">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-content">
          <span className="eyebrow small">{product.category}</span>
          <h2>{product.name}</h2>
          <p className="detail-description">{product.description}</p>

          <div className="price-row">
            <strong>{formatCurrency(product.price)}</strong>
            <span>/ hari</span>
          </div>

          <div className="badge-row">
            <span className="status-pill">{product.condition}</span>
            <span className={`status-pill ${product.stock > 0 ? 'available' : 'out'}`}>
              {product.stock > 0 ? `Tersedia (${product.stock})` : 'Tidak Tersedia'}
            </span>
          </div>

          <div className="detail-specs">
            <div>
              <span>Kondisi</span>
              <strong>{product.condition}</strong>
            </div>
            <div>
              <span>Stok</span>
              <strong>{product.stock}</strong>
            </div>
            <div>
              <span>Durasi</span>
              <strong>{totalDays || 0} hari</strong>
            </div>
          </div>

          <div className="detail-form">
            <div className="input-row two-columns">
              <label>
                <span>Tanggal mulai</span>
                <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
              </label>
              <label>
                <span>Tanggal pengembalian</span>
                <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
              </label>
            </div>

            <label>
              <span>Jumlah barang</span>
              <input type="number" min="1" max={product.stock} value={quantity} onChange={(event) => setQuantity(Number(event.target.value) || 1)} />
            </label>

            <div className="cost-box">
              <div>
                <span>Estimasi biaya</span>
                <strong>{formatCurrency(estimatedCost)}</strong>
              </div>
              <small>
                {product.price} × {totalDays || 0} hari × {quantity} unit
              </small>
            </div>

            <button type="button" className="button wide" onClick={handleContinueOrder}>
              Lanjutkan Pemesanan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckoutPage({ products, settings, addOrder }) {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state || {};
  const selectedProduct = products.find((item) => item.id === orderData.product?.id) || orderData.product;

  const [form, setForm] = useState({
    fullName: '',
    nim: '',
    studyProgram: '',
    whatsapp: '',
    pickupPoint: settings.pickupPoints[0],
    notes: '',
    agree: false,
  });

  const supply = selectedProduct || null;
  const rentalDays = getDaysBetween(orderData.startDate, orderData.endDate);
  const quantity = orderData.quantity || 1;
  const total = (supply ? supply.price * rentalDays * quantity : 0) || orderData.estimatedCost || 0;

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!supply) {
      alert('Pilih produk terlebih dahulu agar proses pemesanan dapat dilanjutkan.');
      return;
    }

    const requiredFields = [form.fullName, form.nim, form.studyProgram, form.whatsapp, form.pickupPoint];
    if (requiredFields.some((value) => !String(value).trim())) {
      alert('Mohon lengkapi seluruh data wajib sebelum mengajukan pesanan.');
      return;
    }

    if (!form.agree) {
      alert('Anda harus menyetujui ketentuan penyewaan sebelum lanjut.');
      return;
    }

    const newOrder = {
      id: generateOrderCode(),
      customerName: form.fullName,
      nim: form.nim,
      studyProgram: form.studyProgram,
      whatsapp: form.whatsapp,
      productName: supply.name,
      quantity,
      startDate: orderData.startDate,
      endDate: orderData.endDate,
      pickupPoint: form.pickupPoint,
      status: 'Menunggu Konfirmasi',
      createdAt: new Date().toISOString(),
      totalCost: total,
      notes: form.notes,
      category: supply.category,
    };

    addOrder(newOrder);
    navigate('/confirmation', { state: { order: newOrder } });
  };

  if (!supply) {
    return (
      <section className="section container">
        <div className="empty-state">
          <Info size={36} />
          <h3>Belum ada produk yang dipilih</h3>
          <p>Pilih barang dari katalog terlebih dahulu sebelum melanjutkan checkout.</p>
          <Link to="/catalog" className="button">
            Buka Katalog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section container">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Formulir Pemesanan</span>
          <h2>Ajukan pesanan LabReady</h2>
        </div>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="input-row two-columns">
            <label>
              <span>Nama lengkap</span>
              <input type="text" name="fullName" value={form.fullName} onChange={handleInput} required />
            </label>
            <label>
              <span>NIM</span>
              <input type="text" name="nim" value={form.nim} onChange={handleInput} required />
            </label>
          </div>

          <div className="input-row two-columns">
            <label>
              <span>Program studi</span>
              <input type="text" name="studyProgram" value={form.studyProgram} onChange={handleInput} required />
            </label>
            <label>
              <span>Nomor WhatsApp</span>
              <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleInput} required />
            </label>
          </div>

          <div className="input-row two-columns">
            <label>
              <span>Barang yang disewa</span>
              <input type="text" value={supply.name} readOnly />
            </label>
            <label>
              <span>Jumlah barang</span>
              <input type="number" value={quantity} readOnly />
            </label>
          </div>

          <div className="input-row two-columns">
            <label>
              <span>Tanggal mulai sewa</span>
              <input type="date" value={orderData.startDate || ''} readOnly />
            </label>
            <label>
              <span>Tanggal akhir sewa</span>
              <input type="date" value={orderData.endDate || ''} readOnly />
            </label>
          </div>

          <label>
            <span>Titik pengambilan</span>
            <select name="pickupPoint" value={form.pickupPoint} onChange={handleInput}>
              {settings.pickupPoints.map((point) => (
                <option key={point} value={point}>
                  {point}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Catatan tambahan</span>
            <textarea name="notes" value={form.notes} onChange={handleInput} rows="4" placeholder="Opsional: catatan khusus, kebutuhan, atau permintaan tambahan" />
          </label>

          <label className="checkbox-line">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleInput} />
            <span>Saya setuju dengan ketentuan penyewaan dan bersedia mengikuti prosedur yang berlaku.</span>
          </label>

          <button type="submit" className="button wide">
            Ajukan Pesanan
          </button>
        </form>

        <aside className="summary-card">
          <h3>Rincian Biaya</h3>
          <div className="summary-row">
            <span>Barang</span>
            <strong>{supply.name}</strong>
          </div>
          <div className="summary-row">
            <span>Durasi</span>
            <strong>{rentalDays} hari</strong>
          </div>
          <div className="summary-row">
            <span>Tarif per hari</span>
            <strong>{formatCurrency(supply.price)}</strong>
          </div>
          <div className="summary-row">
            <span>Jumlah</span>
            <strong>{quantity} unit</strong>
          </div>
          <div className="summary-row total-line">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <div className="info-box">
            <MapPin size={15} />
            <span>Tagihan ini adalah estimasi demo. Status pembayaran baru berubah setelah verifikasi admin.</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ConfirmationPage({ orders }) {
  const location = useLocation();
  const order = location.state?.order || orders[0];

  if (!order) {
    return (
      <section className="section container">
        <div className="empty-state">
          <CheckCircle2 size={36} />
          <h3>Pesanan belum tersedia</h3>
          <p>Belum ada pesanan yang dapat ditampilkan untuk konfirmasi saat ini.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section container">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <span className="eyebrow">Pesanan Diajukan</span>
          <h2>Kode Pesanan: {order.id}</h2>
        </div>

        <div className="confirmation-grid">
          <div className="detail-box">
            <h3>Rincian barang</h3>
            <p>{order.productName}</p>
            <p>Jumlah: {order.quantity} unit</p>
            <p>Jadwal: {formatDate(order.startDate)} - {formatDate(order.endDate)}</p>
            <p>Pickup: {order.pickupPoint}</p>
          </div>
          <div className="detail-box">
            <h3>Biaya</h3>
            <p>Total: {formatCurrency(order.totalCost)}</p>
            <p>Status: <span className={`status-pill ${statusColors[order.status] || 'status-waiting'}`}>{order.status}</span></p>
            <p>Catatan: {order.notes || 'Tidak ada catatan tambahan'}</p>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/orders" className="button button-secondary">
            Lihat Riwayat Pesanan
          </Link>
          <a className="button" href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
            Hubungi Admin WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function OrderHistoryPage({ orders }) {
  return (
    <section className="section container">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Riwayat Pesanan</span>
          <h2>Status penyewaanmu</h2>
        </div>
      </div>

      <div className="info-banner">
        <Info size={17} />
        <span>Data pesanan disimpan di browser dan perangkat yang sama menggunakan localStorage. Informasi tidak ditransfer antar pengguna atau server.</span>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <ClipboardList size={36} />
          <h3>Belum ada pesanan</h3>
          <p>Pesanan yang baru dibuat akan muncul di halaman ini.</p>
        </div>
      ) : (
        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Tanggal</th>
                <th>Barang</th>
                <th>Total</th>
                <th>Ambil</th>
                <th>Kembali</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{order.productName}</td>
                  <td>{formatCurrency(order.totalCost)}</td>
                  <td>{formatDate(order.startDate)}</td>
                  <td>{formatDate(order.endDate)}</td>
                  <td>
                    <span className={`status-pill ${statusColors[order.status] || 'status-waiting'}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function AboutPage() {
  return (
    <section className="section container about-page">
      <div className="section-heading center">
        <span className="eyebrow">Tentang LabReady</span>
        <h2>Solusi praktis untuk kebutuhan perlengkapan akademik</h2>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>Latar belakang</h3>
          <p>
            LabReady lahir dari kebutuhan mahasiswa FPMIPA UPI yang sering menghadapi kendala saat harus menyiapkan alat praktikum maupun perlengkapan perkuliahan secara mendadak. Banyak mahasiswa tidak ingin membeli barang yang hanya dipakai dalam rentang waktu tertentu dan kerap kesulitan mencari alat yang tepat di saat dibutuhkan.
          </p>
        </div>
        <div className="about-card">
          <h3>Permasalahan yang diselesaikan</h3>
          <p>
            Banyak mahasiswa menghadapi masalah keterbatasan anggaran, kesulitan membawa barang berulang kali, serta kebutuhan yang berubah-ubah sesuai jadwal praktikum. LabReady hadir untuk menghubungkan kebutuhan tersebut dengan solusi sewa yang lebih praktis dan terjangkau.
          </p>
        </div>
        <div className="about-card">
          <h3>Tujuan usaha</h3>
          <p>
            Tujuan LabReady adalah memberikan akses mudah terhadap kebutuhan kampus dengan prosedur sederhana, layanan yang cepat, dan pengelolaan inventaris yang transparan bagi mahasiswa serta admin.
          </p>
        </div>
        <div className="about-card">
          <h3>Manfaat</h3>
          <p>
            Mahasiswa dapat menyewa perlengkapan sesuai kebutuhan tanpa membeli aset yang besar, menghemat biaya, dan menyiapkan alat tepat waktu untuk kegiatan akademik maupun praktikum.
          </p>
        </div>
      </div>

      <div className="values-panel">
        <h3>Nilai utama</h3>
        <div className="value-list">
          <span>Praktis</span>
          <span>Terjangkau</span>
          <span>Transparan</span>
          <span>Bertanggung jawab</span>
        </div>
      </div>
    </section>
  );
}

function ProcedurePage({ settings }) {
  return (
    <section className="section container">
      <div className="section-heading center">
        <span className="eyebrow">Ketentuan & Prosedur</span>
        <h2>Proses sewa yang jelas dan mudah dipantau</h2>
      </div>

      <div className="procedure-grid">
        <StepCard number="1" title="Pilih barang" text="Mahasiswa memilih barang yang sesuai kebutuhan akademik atau praktikum dari katalog." />
        <StepCard number="2" title="Tetapkan durasi" text="Tentukan tanggal mulai dan pengembalian sesuai jadwal kegiatan." />
        <StepCard number="3" title="Isi formulir pesanan" text="Lengkapi biodata, NIM, program studi, kontak WhatsApp, dan data peminjaman." />
        <StepCard number="4" title="Konfirmasi admin" text="Admin memeriksa ketersediaan dan menyesuaikan dengan stok aktual serta jadwal sewa." />
        <StepCard number="5" title="Pembayaran" text="Mahasiswa melakukan pembayaran melalui prosedur yang ditetapkan oleh admin dan sesuai kebijakan yang berlaku." />
        <StepCard number="6" title="Pengambilan" text="Barang diambil di titik pengambilan yang disepakati di kampus." />
        <StepCard number="7" title="Pengembalian" text="Barang dikembalikan sesuai jadwal dan diperiksa kondisi kekembaliannya." />
        <StepCard number="8" title="Penyelesaian" text="Admin memastikan barang kembali dalam kondisi layak lalu menyelesaikan transaksi." />
      </div>

      <div className="policy-box">
        <h3>Kebijakan yang dapat dikonfigurasi</h3>
        <ul>
          <li><strong>Tarif</strong>: {settings.policy.tarif}</li>
          <li><strong>Uang jaminan</strong>: {settings.policy.jaminan}</li>
          <li><strong>Keterlambatan</strong>: {settings.policy.keterlambatan}</li>
          <li><strong>Kerusakan & kehilangan</strong>: {settings.policy.kerusakan}</li>
          <li><strong>Alamat pengembalian</strong>: {settings.returnAddress}</li>
        </ul>
      </div>
    </section>
  );
}

function AdminPage({ products, orders, settings, setSettings, addProduct, updateProduct, removeProduct, updateOrderStatus }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Perlengkapan Praktikum',
    description: '',
    price: 0,
    stock: 1,
    condition: 'Baik',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [orderFilter, setOrderFilter] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [reportRange, setReportRange] = useState({ from: '', to: '' });
  const [settingsForm, setSettingsForm] = useState({
    whatsappNumber: settings.whatsappNumber,
    contactEmail: settings.contactEmail,
    returnAddress: settings.returnAddress,
    pickupPoints: settings.pickupPoints.join('\n'),
    tarif: settings.policy.tarif,
    jaminan: settings.policy.jaminan,
    keterlambatan: settings.policy.keterlambatan,
    kerusakan: settings.policy.kerusakan,
  });

  useEffect(() => {
    setSettingsForm({
      whatsappNumber: settings.whatsappNumber,
      contactEmail: settings.contactEmail,
      returnAddress: settings.returnAddress,
      pickupPoints: settings.pickupPoints.join('\n'),
      tarif: settings.policy.tarif,
      jaminan: settings.policy.jaminan,
      keterlambatan: settings.policy.keterlambatan,
      kerusakan: settings.policy.kerusakan,
    });
  }, [settings]);

  const totalStock = products.reduce((sum, product) => sum + Number(product.stock || 0), 0);
  const totalTypes = products.length;
  const activeRentals = orders.filter((order) => order.status === 'Sedang Disewa').length;
  const waitingOrders = orders.filter((order) => order.status === 'Menunggu Konfirmasi').length;

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = orderFilter === 'Semua' || order.status === orderFilter;
    const matchesSearch =
      !searchTerm ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredReportOrders = orders.filter((order) => {
    if (!reportRange.from && !reportRange.to) return true;
    const createdAt = new Date(order.createdAt).getTime();
    const from = reportRange.from ? new Date(reportRange.from).getTime() : -Infinity;
    const to = reportRange.to ? new Date(reportRange.to).getTime() + 86400000 : Infinity;
    return createdAt >= from && createdAt <= to;
  });

  const summaryRevenue = filteredReportOrders
    .filter((order) => order.status === 'Selesai' || order.status === 'Sedang Disewa')
    .reduce((sum, order) => sum + Number(order.totalCost || 0), 0);

  const handleNewProductSubmit = (event) => {
    event.preventDefault();
    if (!newProduct.name.trim() || !newProduct.description.trim()) {
      alert('Judul dan deskripsi barang tidak boleh kosong.');
      return;
    }
    addProduct(newProduct);
    setNewProduct({
      name: '',
      category: 'Perlengkapan Praktikum',
      description: '',
      price: 0,
      stock: 1,
      condition: 'Baik',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    });
  };

  const startEditProduct = (product) => {
    setEditingProductId(product.id);
    setEditingProduct({ ...product });
  };

  const saveEditProduct = () => {
    if (!editingProduct || !editingProduct.name.trim()) {
      alert('Nama barang tidak boleh kosong.');
      return;
    }

    updateProduct(editingProductId, {
      name: editingProduct.name,
      category: editingProduct.category,
      description: editingProduct.description,
      price: Number(editingProduct.price),
      stock: Number(editingProduct.stock),
      condition: editingProduct.condition,
      image: editingProduct.image,
    });

    setEditingProductId(null);
    setEditingProduct(null);
  };

  const handleSettingsSave = (event) => {
    event.preventDefault();
    const nextPickupPoints = settingsForm.pickupPoints
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    setSettings({
      ...settings,
      whatsappNumber: settingsForm.whatsappNumber,
      contactEmail: settingsForm.contactEmail,
      returnAddress: settingsForm.returnAddress,
      pickupPoints: nextPickupPoints.length ? nextPickupPoints : settings.pickupPoints,
      policy: {
        tarif: settingsForm.tarif,
        jaminan: settingsForm.jaminan,
        keterlambatan: settingsForm.keterlambatan,
        kerusakan: settingsForm.kerusakan,
      },
    });
    alert('Pengaturan admin berhasil diperbarui.');
  };

  return (
    <section className="section container admin-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Dashboard Admin</span>
          <h2>Kelola inventaris dan pesanan</h2>
        </div>
      </div>

      <div className="info-banner admin-banner">
        <Info size={17} />
        <span>Dashboard admin versi demo tidak memiliki autentikasi server yang aman; semua data hanya tersimpan di browser lokal melalui localStorage.</span>
      </div>

      <div className="summary-grid">
        <StatCard title="Total jenis barang" value={totalTypes} icon={<Boxes size={18} />} />
        <StatCard title="Total stok barang" value={totalStock} icon={<Package size={18} />} />
        <StatCard title="Jumlah pesanan masuk" value={orders.length} icon={<ShoppingBag size={18} />} />
        <StatCard title="Barang sedang disewa" value={activeRentals} icon={<Clock3 size={18} />} />
        <StatCard title="Pesanan menunggu konfirmasi" value={waitingOrders} icon={<User size={18} />} />
      </div>

      <div className="admin-section">
        <h3>Manajemen Inventaris</h3>
        <form onSubmit={handleNewProductSubmit} className="admin-form add-form">
          <div className="input-row two-columns">
            <label>
              <span>Nama barang</span>
              <input type="text" value={newProduct.name} onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })} />
            </label>
            <label>
              <span>Kategori</span>
              <select value={newProduct.category} onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}>
                <option value="Alat Tulis & Hitung">Alat Tulis & Hitung</option>
                <option value="Perlengkapan Praktikum">Perlengkapan Praktikum</option>
                <option value="Peralatan Gambar">Peralatan Gambar</option>
                <option value="Perlengkapan Safety">Perlengkapan Safety</option>
                <option value="Alat Tulis">Alat Tulis</option>
              </select>
            </label>
          </div>
          <label>
            <span>Deskripsi</span>
            <textarea rows="3" value={newProduct.description} onChange={(event) => setNewProduct({ ...newProduct, description: event.target.value })} />
          </label>
          <div className="input-row two-columns">
            <label>
              <span>Harga sewa / hari</span>
              <input type="number" value={newProduct.price} onChange={(event) => setNewProduct({ ...newProduct, price: Number(event.target.value) })} />
            </label>
            <label>
              <span>Stok awal</span>
              <input type="number" value={newProduct.stock} onChange={(event) => setNewProduct({ ...newProduct, stock: Number(event.target.value) })} />
            </label>
          </div>
          <div className="input-row two-columns">
            <label>
              <span>Kondisi</span>
              <select value={newProduct.condition} onChange={(event) => setNewProduct({ ...newProduct, condition: event.target.value })}>
                <option value="Baik">Baik</option>
                <option value="Layak Pakai">Layak Pakai</option>
                <option value="Perlu Perbaikan">Perlu Perbaikan</option>
              </select>
            </label>
            <label>
              <span>URL gambar</span>
              <input type="url" value={newProduct.image} onChange={(event) => setNewProduct({ ...newProduct, image: event.target.value })} />
            </label>
          </div>
          <button type="submit" className="button">
            <Plus size={16} /> Tambah Barang
          </button>
        </form>

        <div className="inventory-list">
          {products.length === 0 ? (
            <div className="empty-state compact">
              <Package size={24} />
              <h4>Inventaris masih kosong</h4>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="inventory-item">
                <img src={product.image} alt={product.name} />
                <div className="inventory-meta">
                  <strong>{product.name}</strong>
                  <span>{product.category}</span>
                  <small>{product.condition}</small>
                </div>
                <div className="inventory-values">
                  <span>{formatCurrency(product.price)} / hari</span>
                  <span>Stok: {product.stock}</span>
                </div>
                <div className="inventory-actions">
                  <button type="button" className="icon-button" onClick={() => startEditProduct(product)}>
                    <Pencil size={16} />
                  </button>
                  <button type="button" className="icon-button danger" onClick={() => removeProduct(product.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {editingProduct && (
          <div className="product-editor-card">
            <h4>Edit Barang</h4>
            <div className="input-row two-columns">
              <label>
                <span>Nama barang</span>
                <input type="text" value={editingProduct.name} onChange={(event) => setEditingProduct({ ...editingProduct, name: event.target.value })} />
              </label>
              <label>
                <span>Kategori</span>
                <select value={editingProduct.category} onChange={(event) => setEditingProduct({ ...editingProduct, category: event.target.value })}>
                  <option value="Alat Tulis & Hitung">Alat Tulis & Hitung</option>
                  <option value="Perlengkapan Praktikum">Perlengkapan Praktikum</option>
                  <option value="Peralatan Gambar">Peralatan Gambar</option>
                  <option value="Perlengkapan Safety">Perlengkapan Safety</option>
                  <option value="Alat Tulis">Alat Tulis</option>
                </select>
              </label>
            </div>
            <label>
              <span>Deskripsi</span>
              <textarea rows="3" value={editingProduct.description} onChange={(event) => setEditingProduct({ ...editingProduct, description: event.target.value })} />
            </label>
            <div className="input-row two-columns">
              <label>
                <span>Harga sewa / hari</span>
                <input type="number" value={editingProduct.price} onChange={(event) => setEditingProduct({ ...editingProduct, price: Number(event.target.value) })} />
              </label>
              <label>
                <span>Stok</span>
                <input type="number" value={editingProduct.stock} onChange={(event) => setEditingProduct({ ...editingProduct, stock: Number(event.target.value) })} />
              </label>
            </div>
            <div className="input-row two-columns">
              <label>
                <span>Kondisi</span>
                <select value={editingProduct.condition} onChange={(event) => setEditingProduct({ ...editingProduct, condition: event.target.value })}>
                  <option value="Baik">Baik</option>
                  <option value="Layak Pakai">Layak Pakai</option>
                  <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                </select>
              </label>
              <label>
                <span>URL foto</span>
                <input type="url" value={editingProduct.image} onChange={(event) => setEditingProduct({ ...editingProduct, image: event.target.value })} />
              </label>
            </div>
            <div className="editor-actions">
              <button type="button" className="button button-secondary" onClick={() => setEditingProduct(null)}>
                Batal
              </button>
              <button type="button" className="button" onClick={saveEditProduct}>
                Simpan Perubahan
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="admin-section">
        <h3>Pengaturan Admin</h3>
        <form className="admin-form settings-form" onSubmit={handleSettingsSave}>
          <div className="input-row two-columns">
            <label>
              <span>Nomor WhatsApp</span>
              <input type="text" value={settingsForm.whatsappNumber} onChange={(event) => setSettingsForm({ ...settingsForm, whatsappNumber: event.target.value })} />
            </label>
            <label>
              <span>Email kontak</span>
              <input type="email" value={settingsForm.contactEmail} onChange={(event) => setSettingsForm({ ...settingsForm, contactEmail: event.target.value })} />
            </label>
          </div>

          <label>
            <span>Alamat pengembalian</span>
            <textarea rows="3" value={settingsForm.returnAddress} onChange={(event) => setSettingsForm({ ...settingsForm, returnAddress: event.target.value })} />
          </label>

          <label>
            <span>Titik pengambilan (satu per baris)</span>
            <textarea rows="4" value={settingsForm.pickupPoints} onChange={(event) => setSettingsForm({ ...settingsForm, pickupPoints: event.target.value })} />
          </label>

          <div className="input-row two-columns">
            <label>
              <span>Tarif</span>
              <textarea rows="3" value={settingsForm.tarif} onChange={(event) => setSettingsForm({ ...settingsForm, tarif: event.target.value })} />
            </label>
            <label>
              <span>Uang jaminan</span>
              <textarea rows="3" value={settingsForm.jaminan} onChange={(event) => setSettingsForm({ ...settingsForm, jaminan: event.target.value })} />
            </label>
          </div>

          <div className="input-row two-columns">
            <label>
              <span>Keterlambatan</span>
              <textarea rows="3" value={settingsForm.keterlambatan} onChange={(event) => setSettingsForm({ ...settingsForm, keterlambatan: event.target.value })} />
            </label>
            <label>
              <span>Kerusakan & kehilangan</span>
              <textarea rows="3" value={settingsForm.kerusakan} onChange={(event) => setSettingsForm({ ...settingsForm, kerusakan: event.target.value })} />
            </label>
          </div>

          <button type="submit" className="button">
            Simpan Pengaturan
          </button>
        </form>
      </div>

      <div className="admin-section">
        <h3>Manajemen Pesanan</h3>
        <div className="filter-panel admin-filter-panel">
          <input type="search" placeholder="Cari kode atau nama pemesan" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
          <select value={orderFilter} onChange={(event) => setOrderFilter(event.target.value)}>
            <option value="Semua">Semua status</option>
            {Object.keys(statusColors).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Pemesan</th>
                <th>Barang</th>
                <th>Total</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.productName}</td>
                  <td>{formatCurrency(order.totalCost)}</td>
                  <td>
                    <span className={`status-pill ${statusColors[order.status] || 'status-waiting'}`}>{order.status}</span>
                  </td>
                  <td>
                    <select value={order.status} onChange={(event) => updateOrderStatus(order.id, event.target.value)}>
                      {Object.keys(statusColors).map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-section report-section">
        <h3>Riwayat Transaksi & Laporan Sederhana</h3>
        <div className="report-controls">
          <label>
            <span>Mulai</span>
            <input type="date" value={reportRange.from} onChange={(event) => setReportRange((current) => ({ ...current, from: event.target.value }))} />
          </label>
          <label>
            <span>Sampai</span>
            <input type="date" value={reportRange.to} onChange={(event) => setReportRange((current) => ({ ...current, to: event.target.value }))} />
          </label>
        </div>

        <div className="summary-grid compact-grid">
          <StatCard title="Total penyewaan" value={filteredReportOrders.length} icon={<BarChart3 size={18} />} />
          <StatCard title="Pendapatan demo" value={formatCurrency(summaryRevenue)} icon={<Banknote size={18} />} />
          <StatCard title="Status selesai" value={filteredReportOrders.filter((order) => order.status === 'Selesai').length} icon={<CheckCircle2 size={18} />} />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} />
        <span className={`status-pill ${product.stock > 0 ? 'available' : 'out'}`}>
          {product.stock > 0 ? 'Tersedia' : 'Habis'}
        </span>
      </div>

      <div className="product-body">
        <div className="meta-line">
          <span>{product.category}</span>
          <span>{product.condition}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="price-row">
          <strong>{formatCurrency(product.price)}</strong>
          <span>/ hari</span>
        </div>

        <div className="card-footer">
          <small>Stok: {product.stock}</small>
          <div className="card-actions">
            <Link to={`/product/${product.id}`} className="button button-secondary small-button">
              Lihat Detail
            </Link>
            <Link to={`/checkout`} state={{ product, quantity: 1, startDate: new Date().toISOString().slice(0, 10), endDate: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10), estimatedCost: product.price * 3 }} className="button small-button">
              Sewa Sekarang
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <div className="step-card">
      <div className="step-number">{number}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function TestimonialCard({ name, study, text }) {
  return (
    <div className="testimonial-card">
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          <Star key={index} size={14} fill="currentColor" />
        ))}
      </div>
      <p>“{text}”</p>
      <div className="person-meta">
        <strong>{name}</strong>
        <span>{study}</span>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Footer({ settings }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark">L</span>
            <span>LabReady</span>
          </div>
          <p>Sistem penyewaan perlengkapan akademik dan praktikum untuk mahasiswa FPMIPA UPI.</p>
        </div>
        <div>
          <h4>Kontak</h4>
          <ul>
            <li>WhatsApp: {settings.whatsappNumber}</li>
            <li>Email: {settings.contactEmail}</li>
            <li>Alamat pengembalian: {settings.returnAddress}</li>
          </ul>
        </div>
        <div>
          <h4>Titik Pengambilan</h4>
          <ul>
            {settings.pickupPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default App;

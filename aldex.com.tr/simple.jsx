import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Mail, Instagram } from 'lucide-react';
import { projects, services, news, team, headquarters } from './data-simple';
import './App.css';

// ============= HEADER COMPONENT =============
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const links = [
    { path: '/', label: 'Home' },
    { path: '/studio', label: 'Studio' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/news', label: 'News' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-light tracking-wide">AETHER STUDIO</Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-colors ${
                  location.pathname === link.path ? 'text-black font-medium' : 'text-gray-600 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm\"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

// ============= FOOTER COMPONENT =============
const Footer = () => (
  <footer className="bg-white border-t border-gray-100 mt-32">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h5 className="text-gray-500 text-sm mb-6">
          We always eager to explore new projects. Let's bring visionary designs to life together.
        </h5>
        <div className="flex flex-wrap gap-6">
          <Link to="/contact" className="inline-flex items-center gap-2 hover:opacity-70">
            Get in Touch <ArrowRight size={16} />
          </Link>
          <a href="mailto:info@aetherstudio.com" className="inline-flex items-center gap-2 hover:opacity-70">
            <Mail size={16} /> Info@aetherstudio.com
          </a>
          <a href="https://instagram.com" className="inline-flex items-center gap-2 hover:opacity-70">
            <Instagram size={16} /> @aetherStudio
          </a>
        </div>
      </div>

      <div className="mb-16">
        <img
          src="https://images.unsplash.com/photo-1707376064132-ad067e6f5221?w=1200"
          alt="Architecture"
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {news.slice(0, 2).map(article => (
          <div key={article.id}>
            <span className="text-sm text-gray-500">{article.category}</span>
            <p className="text-sm text-gray-400 my-2">{article.date}</p>
            <h3 className="text-lg font-medium">{article.title}</h3>
          </div>
        ))}
      </div>

      <div className="border-t pt-8 text-center text-sm text-gray-400">
        © 2025 Aether Studio. All rights reserved.
      </div>
    </div>
  </footer>
);

// ============= HOME PAGE =============
const HomePage = () => (
  <div className="min-h-screen bg-white">
    {/* Hero */}
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <p className="text-sm text-gray-500 mb-8">
            Founded in 2012, Aether Studio embodies forward-thinking and inspiring architectural design.
          </p>
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8">
            Aether Studio specializes in modern architecture and real estate development that seamlessly 
            integrates functionality, aesthetics, and sustainability.
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Co-founded by French-born visionary David Cole and creative Canadian architect Julian Cross.
          </p>
          <Link to="/studio" className="inline-flex items-center gap-2 px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors">
            MORE ABOUT US <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>

    {/* Hero Image with Overlay */}
    <section className="px-6 mb-32 relative">
      <div className="max-w-7xl mx-auto">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="flex items-center gap-8 text-white">
            <span className="text-sm tracking-widest">EST - 2012</span>
            <div className="hidden md:flex gap-4 text-sm">
              <span>Home / Studio / Contact</span>
            </div>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1581784878214-8d5596b98a01?w=1200"
          alt="Interior"
          className="w-full h-[500px] object-cover rounded-lg"
        />
      </div>
    </section>

    {/* Featured Projects */}
    <section className="px-6 mb-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-light mb-4">Featured Projects</h2>
        <p className="text-gray-500 mb-12">Discover our most exceptional projects from around the globe.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map(project => (
            <Link key={project.id} to="/projects" className="group">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-[400px] object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-500"
              />
              <h3 className="text-xl font-medium mb-2">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.category} / {project.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="px-6 mb-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-light mb-4">Reimagining Spaces</h2>
        <p className="text-gray-500 mb-12">We specialize in transforming environments into thoughtfully designed spaces.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={service.id}>
              <span className="text-4xl font-light text-gray-300 mb-4 block">{i + 1}.</span>
              <h4 className="text-xl font-medium">{service.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="px-6 mb-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-light mb-4">Sustainability</h2>
            <p className="text-gray-500">Our commitment to eco-conscious brilliance drives everything we do.</p>
          </div>
          <div className="space-y-12">
            <div>
              <div className="text-5xl font-light mb-2">40+</div>
              <h4 className="text-xl font-medium mb-2">Tasks Executed</h4>
              <p className="text-gray-600">Completed 40+ projects across residential, commercial, and public sectors.</p>
            </div>
            <div>
              <div className="text-5xl font-light mb-2">150+</div>
              <h4 className="text-xl font-medium mb-2">Proficient Experts</h4>
              <p className="text-gray-600">Our team of 150+ experienced architects and designers.</p>
            </div>
            <div>
              <div className="text-5xl font-light mb-2">$2B+</div>
              <h4 className="text-xl font-medium mb-2">Deliverable Value</h4>
              <p className="text-gray-600">Projects with a total value exceeding $2B+.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// ============= STUDIO PAGE =============
const StudioPage = () => (
  <div className="min-h-screen bg-white">
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light leading-tight mb-8 max-w-4xl">
          Aether Studio specializes in modern architecture and real estate development that seamlessly 
          integrates functionality, aesthetics, and sustainability.
        </h1>
        <p className="text-xl text-gray-700">
          Co-founded by French-born visionary David Cole and creative Canadian architect Julian Cross.
        </p>
      </div>
    </section>

    {/* Team */}
    <section className="px-6 mb-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-light mb-4">Our Visionaries</h2>
        <p className="text-gray-500 mb-12">These founders and leaders shape our path with creativity and innovation.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map(member => (
            <div key={member.name}>
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-[400px] object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-medium">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="px-6 mb-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-light mb-12">Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Innovation Through Design', 'Collaboration at the Core', 'Sustainability as a Foundation', 
            'Elevating Experiences', 'Integrity and Transparency'].map((value, i) => (
            <div key={i}>
              <span className="text-4xl font-light text-gray-300 mb-4 block">{i + 1}.</span>
              <h4 className="text-xl font-medium">{value}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// ============= SERVICES PAGE =============
const ServicesPage = () => (
  <div className="min-h-screen bg-white">
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-light leading-relaxed max-w-4xl">
          Our services go beyond traditional boundaries, blending creativity with precision to deliver 
          extraordinary results. Each service reflects our commitment to innovation and excellence.
        </h1>
      </div>
    </section>

    <section className="px-6 mb-32">
      <div className="max-w-7xl mx-auto space-y-24">
        {services.map((service, i) => (
          <div key={service.id}>
            <h3 className="text-6xl font-light text-gray-300 mb-4">({i + 1})</h3>
            <h2 className="text-3xl font-light mb-6">{service.title}</h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl mb-8">{service.desc}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(j => (
                <img
                  key={j}
                  src={`https://images.unsplash.com/photo-${151966297 + i * 100 + j}?w=600`}
                  alt={service.title}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ============= PROJECTS PAGE =============
const ProjectsPage = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light leading-relaxed max-w-4xl">
            We believe that architecture goes beyond buildings—it's about creating experiences that 
            evoke emotion, foster connection, and leave a lasting impact.
          </h1>
        </div>
      </section>

      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto space-y-12">
          {projects.map(project => (
            <div key={project.id}>
              <button
                onClick={() => setSelected(selected === project.id ? null : project.id)}
                className="w-full text-left mb-6"
              >
                <h2 className="text-3xl font-medium mb-2">{project.title}</h2>
                <p className="text-gray-500">{project.category} / {project.date}</p>
              </button>
              
              {selected === project.id && (
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {project.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={project.title}
                      className="w-full h-[350px] object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
              
              {selected !== project.id && <div className="border-b border-gray-200" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ============= NEWS PAGE =============
const NewsPage = () => {
  const [filter, setFilter] = useState('ALL');
  const filtered = filter === 'ALL' ? news : news.filter(n => n.category.toUpperCase() === filter);

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light leading-relaxed max-w-4xl">
            Welcome to a space where architecture meets inspiration, and ideas turn into transformative realities.
          </h1>
        </div>
      </section>

      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto flex gap-4">
          {['ALL', 'MAGAZINES', 'NEWS', 'INSIGHTS'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 text-sm ${filter === f ? 'bg-black text-white' : 'bg-white border'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {filtered.map(article => (
            <div key={article.id}>
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-[350px] object-cover rounded-lg mb-4"
              />
              <span className="text-sm text-gray-500">{article.category}</span>
              <p className="text-sm text-gray-400 my-2">{article.date}</p>
              <h3 className="text-xl font-medium">{article.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// ============= CONTACT PAGE =============
const ContactPage = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! Thank you for contacting us.');
    setForm({ firstName: '', lastName: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">First Name*</label>
                <input
                  required
                  value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Last Name*</label>
                <input
                  required
                  value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Email*</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Message*</label>
              <textarea
                required
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded min-h-[150px]"
              />
            </div>

            <button type="submit" className="px-8 py-3 bg-black text-white hover:bg-gray-800">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>

      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light mb-4">Headquarters</h2>
          <p className="text-gray-500 mb-12">Our global offices delivering exceptional services worldwide.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {headquarters.map((hq, i) => (
              <div key={i}>
                <img
                  src={hq.image}
                  alt={hq.city}
                  className="w-full h-[350px] object-cover rounded-lg mb-4"
                />
                {hq.label && <span className="text-sm text-gray-500 block mb-2">{hq.label}</span>}
                <h3 className="text-xl font-medium">{hq.city}</h3>
                <p className="text-gray-600">{hq.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ============= MAIN APP =============
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="studio" element={<StudioPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

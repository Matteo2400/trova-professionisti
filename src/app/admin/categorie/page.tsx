'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Users, X } from 'lucide-react';

interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  namePlural: string;
  icon: string;
  color: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  professionalsCount: number;
}

const iconOptions = ['Zap', 'Droplets', 'Paintbrush', 'Hammer', 'Key', 'TreePine', 'Wrench', 'Home', 'Thermometer', 'Wifi', 'Shield', 'Truck'];
const colorOptions = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#22C55E', '#F97316', '#EC4899', '#6366F1', '#14B8A6'];

export default function AdminCategorie() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CategoryItem | null>(null);
  const [form, setForm] = useState({
    name: '', namePlural: '', slug: '', icon: 'Wrench', color: '#3B82F6', description: '',
  });

  const fetchCategories = () => {
    setLoading(true);
    fetch('/api/admin/categorie')
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      await fetch('/api/admin/categorie', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
    } else {
      await fetch('/api/admin/categorie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setShowForm(false);
    setEditing(null);
    setForm({ name: '', namePlural: '', slug: '', icon: 'Wrench', color: '#3B82F6', description: '' });
    fetchCategories();
  };

  const handleEdit = (cat: CategoryItem) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      namePlural: cat.namePlural,
      slug: cat.slug,
      icon: cat.icon,
      color: cat.color,
      description: cat.description,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa categoria?')) return;
    const res = await fetch(`/api/admin/categorie?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
      return;
    }
    fetchCategories();
  };

  const handleToggle = async (cat: CategoryItem) => {
    await fetch('/api/admin/categorie', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: cat.id, isActive: !cat.isActive }),
    });
    fetchCategories();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Categorie</h1>
          <p className="text-zinc-500 text-sm mt-1">Gestisci le categorie di professionisti</p>
        </div>
        <button
          onClick={() => { setEditing(null); setForm({ name: '', namePlural: '', slug: '', icon: 'Wrench', color: '#3B82F6', description: '' }); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuova categoria
        </button>
      </div>

      {/* Category grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`bg-zinc-900 rounded-2xl border ${cat.isActive ? 'border-zinc-800' : 'border-zinc-800/50 opacity-60'} p-6 hover:border-zinc-700 transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: cat.color + '20', color: cat.color }}
                >
                  {cat.icon.substring(0, 2)}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg">{cat.name}</h3>
              <p className="text-zinc-500 text-sm mt-1 line-clamp-2">{cat.description}</p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{cat.professionalsCount} professionisti</span>
                </div>
                <button
                  onClick={() => handleToggle(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    cat.isActive
                      ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                      : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
                  }`}
                >
                  {cat.isActive ? 'Attiva' : 'Disattivata'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editing ? 'Modifica categoria' : 'Nuova categoria'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Nome (singolare)</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-zinc-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Nome (plurale)</label>
                  <input
                    value={form.namePlural}
                    onChange={(e) => setForm({ ...form, namePlural: e.target.value })}
                    className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-zinc-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-zinc-500"
                  required
                  disabled={!!editing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Descrizione</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-zinc-500 resize-none"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Icona</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setForm({ ...form, icon })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        form.icon === icon
                          ? 'bg-red-600 text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Colore</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm({ ...form, color })}
                      className={`w-8 h-8 rounded-lg transition-transform ${
                        form.color === color ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2.5 bg-zinc-800 text-zinc-400 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  {editing ? 'Salva modifiche' : 'Crea categoria'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Save, Upload, Loader2 } from 'lucide-react';

export default function ProfileEditPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '',
    description: '', city: '', province: '',
    coverageAreas: [] as string[],
    coverageRadius: 25,
    yearsExperience: 0,
    priceRange: '',
    available: true,
  });
  const [newArea, setNewArea] = useState('');

  useEffect(() => {
    fetch('/api/dashboard/profilo')
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setForm({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phone: data.phone || '',
          description: data.description || '',
          city: data.city || '',
          province: data.province || '',
          coverageAreas: data.coverageAreas || [],
          coverageRadius: data.coverageRadius || 25,
          yearsExperience: data.yearsExperience || 0,
          priceRange: data.priceRange || '',
          available: data.available ?? true,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    await fetch('/api/dashboard/profilo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addArea = () => {
    if (newArea.trim() && !form.coverageAreas.includes(newArea.trim())) {
      setForm({ ...form, coverageAreas: [...form.coverageAreas, newArea.trim()] });
      setNewArea('');
    }
  };

  const removeArea = (area: string) => {
    setForm({ ...form, coverageAreas: form.coverageAreas.filter((a) => a !== area) });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (data.url) {
      await fetch('/api/dashboard/profilo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileImage: data.url }),
      });
      setProfile({ ...profile, profileImage: data.url });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Modifica Profilo</h1>
          <p className="text-text-secondary text-sm mt-1">Aggiorna le informazioni del tuo profilo</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? 'Salvato!' : 'Salva modifiche'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Photo */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-text mb-4">Foto profilo</h2>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold overflow-hidden">
                {profile?.profileImage ? (
                  <img src={profile.profileImage} alt="Profilo" className="w-full h-full object-cover" />
                ) : (
                  `${form.firstName[0] || ''}${form.lastName[0] || ''}`
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 px-4 py-2 bg-surface text-text rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Carica foto
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
                <p className="text-xs text-text-secondary mt-2">JPG, PNG o WebP. Max 5MB.</p>
              </div>
            </div>
          </div>

          {/* Personal info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-text mb-4">Dati personali</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Nome</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
                  <input
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Cognome</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="input-field pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-text mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
                <input value={profile?.email || ''} disabled className="input-field pl-10 bg-gray-50 text-text-secondary" />
              </div>
              <p className="text-xs text-text-secondary mt-1">L&apos;email non puo essere modificata</p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-text mb-1.5">Telefono</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>

          {/* Professional info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-text mb-4">Dettagli professionali</h2>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Descrizione servizi</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="input-field resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Anni di esperienza</label>
                <input
                  type="number"
                  value={form.yearsExperience}
                  onChange={(e) => setForm({ ...form, yearsExperience: parseInt(e.target.value) || 0 })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Fascia di prezzo</label>
                <input
                  value={form.priceRange}
                  onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                  placeholder="Es: €40-80/ora"
                  className="input-field"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-text mb-1.5">P.IVA</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
                <input value={profile?.vatNumber || ''} disabled className="input-field pl-10 bg-gray-50 text-text-secondary" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) => setForm({ ...form, available: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
              </label>
              <span className="text-sm text-text">Disponibile per nuovi lavori</span>
            </div>
          </div>

          {/* Coverage */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-text mb-4">Zone di copertura</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Citta</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Raggio (km)</label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={form.coverageRadius}
                  onChange={(e) => setForm({ ...form, coverageRadius: parseInt(e.target.value) })}
                  className="w-full mt-3"
                />
                <p className="text-sm text-text-secondary text-center">{form.coverageRadius} km</p>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-text mb-1.5">Aree coperte</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {form.coverageAreas.map((area) => (
                  <span key={area} className="flex items-center gap-1 px-3 py-1.5 bg-primary/5 text-primary text-sm rounded-full">
                    {area}
                    <button onClick={() => removeArea(area)} className="ml-1 hover:text-red-500">&times;</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addArea())}
                  placeholder="Aggiungi zona..."
                  className="input-field flex-1"
                />
                <button onClick={addArea} className="px-4 py-2 bg-primary text-white rounded-none text-sm hover:bg-primary-light transition-colors">
                  Aggiungi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar preview */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-8">
            <h2 className="font-semibold text-text mb-4">Anteprima</h2>
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-3 overflow-hidden">
                {profile?.profileImage ? (
                  <img src={profile.profileImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  `${form.firstName[0] || ''}${form.lastName[0] || ''}`
                )}
              </div>
              <p className="font-bold text-text">{form.firstName} {form.lastName}</p>
              <p className="text-text-secondary text-sm">{profile?.categories?.join(', ')}</p>
              <p className="text-text-secondary text-xs mt-1">{form.city}</p>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Piano</span>
                <span className="font-medium text-text capitalize">{profile?.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Verificato</span>
                <span className={profile?.isVerified ? 'text-green-600' : 'text-text-secondary'}>
                  {profile?.isVerified ? 'Si' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Disponibile</span>
                <span className={form.available ? 'text-green-600' : 'text-red-500'}>
                  {form.available ? 'Si' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Esperienza</span>
                <span className="text-text">{form.yearsExperience} anni</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Lock, Mail, BookOpen, Plus, Save, Trash2, LogOut, Image as ImageIcon, Upload, X, Download, Filter, Edit3, Search, Eye, EyeOff, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import MDEditor from '@uiw/react-md-editor';

// Interfaces
interface Lead {
  id: string;
  email: string;
  name: string | null;
  source_tool: string;
  created_at: string;
}

interface Guide {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  image_url?: string;
  is_published: boolean;
  created_at: string;
  category?: string;
}

const CATEGORIES = [
  "Ciclo Menstrual",
  "Treino de Força",
  "Nutrição & Proteína",
  "Saúde & Hormônios",
  "Mentalidade & Recuperação"
];

export const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<'leads' | 'guides'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filterTool, setFilterTool] = useState<string>('all');
  const [searchTermGuides, setSearchTermGuides] = useState('');
  
  // New/Edit Guide State
  const [isCreatingGuide, setIsCreatingGuide] = useState(false);
  const [editingGuideId, setEditingGuideId] = useState<string | null>(null);
  const [newGuideTitle, setNewGuideTitle] = useState('');
  const [newGuideSubtitle, setNewGuideSubtitle] = useState('');
  const [newGuideSlug, setNewGuideSlug] = useState('');
  const [newGuideCategory, setNewGuideCategory] = useState('Ciclo Menstrual');
  const [newGuideContent, setNewGuideContent] = useState<string | undefined>('');
  const [newGuideIsPublished, setNewGuideIsPublished] = useState(true);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchLeads();
      fetchGuides();
    }
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setLeads(data);
    }
  };

  const fetchGuides = async () => {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setGuides(data);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `guides/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('guide-assets')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('guide-assets')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const resetForm = () => {
    setIsCreatingGuide(false);
    setEditingGuideId(null);
    setNewGuideTitle('');
    setNewGuideSubtitle('');
    setNewGuideSlug('');
    setNewGuideCategory('Ciclo Menstrual');
    setNewGuideContent('');
    setNewGuideIsPublished(true);
    setFeaturedImage(null);
    setImagePreview(null);
  };

  const handleEditClick = (guide: Guide) => {
    setEditingGuideId(guide.id);
    setNewGuideTitle(guide.title);
    setNewGuideSubtitle(guide.subtitle || '');
    setNewGuideSlug(guide.slug);
    setNewGuideCategory(guide.category || 'Ciclo Menstrual');
    setNewGuideContent(guide.content);
    setNewGuideIsPublished(guide.is_published);
    setImagePreview(guide.image_url || null);
    setIsCreatingGuide(true);
  };

  const togglePublishStatus = async (guide: Guide) => {
    const { error } = await supabase
      .from('guides')
      .update({ is_published: !guide.is_published })
      .eq('id', guide.id);
    
    if (!error) fetchGuides();
  };

  const handleSaveGuide = async () => {
    if (!newGuideTitle || !newGuideContent) return;
    setLoading(true);
    
    let imageUrl = imagePreview || '';
    if (featuredImage) {
      const uploadedUrl = await uploadImage(featuredImage);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const slug = newGuideSlug.trim() || newGuideTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');

    const guideData = { 
      title: newGuideTitle, 
      subtitle: newGuideSubtitle,
      content: newGuideContent, 
      slug, 
      category: newGuideCategory,
      image_url: imageUrl,
      is_published: newGuideIsPublished 
    };

    let result;
    if (editingGuideId) {
      result = await supabase
        .from('guides')
        .update(guideData)
        .eq('id', editingGuideId);
    } else {
      result = await supabase
        .from('guides')
        .insert([guideData]);
    }
      
    if (!result.error) {
      resetForm();
      fetchGuides();
    } else {
      alert("Erro ao salvar guia: " + result.error.message);
    }
    setLoading(false);
  };

  const handleDeleteGuide = async (id: string) => {
    if (!window.confirm("Certeza que deseja deletar este guia?")) return;
    const { error } = await supabase.from('guides').delete().eq('id', id);
    if (!error) fetchGuides();
  };

  const exportToCSV = () => {
    const filteredLeads = getFilteredLeads();
    if (filteredLeads.length === 0) return;

    const headers = ['Data', 'Nome', 'Email', 'Fonte'];
    const csvData = filteredLeads.map(lead => [
      new Date(lead.created_at).toLocaleDateString(),
      lead.name || '',
      lead.email,
      lead.source_tool
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_artemis_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilteredLeads = () => {
    if (filterTool === 'all') return leads;
    return leads.filter(l => l.source_tool === filterTool);
  };

  const getFilteredGuides = () => {
    if (!searchTermGuides) return guides;
    const term = searchTermGuides.toLowerCase();
    return guides.filter(g => 
      g.title.toLowerCase().includes(term) || 
      g.slug.toLowerCase().includes(term) ||
      g.category?.toLowerCase().includes(term)
    );
  };

  const uniqueTools = Array.from(new Set(leads.map(l => l.source_tool)));

  if (!session) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-dark-surface p-8 rounded-3xl border border-white/10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Lock size={20} className="text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold font-display text-center mb-6 text-white">Acesso Restrito</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="text-red-400 text-sm p-3 bg-red-400/10 rounded-xl">{error}</div>}
            <input
              type="email"
              placeholder="Email do Administrador"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark/60 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark/60 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-dark rounded-xl font-bold text-sm hover:brightness-110 flex items-center justify-center gap-2"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h1 className="text-3xl font-display font-bold">Painel de Controle</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition">
            <LogOut size={16} /> Sair
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => { setActiveTab('leads'); resetForm(); }}
            className={`px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition ${activeTab === 'leads' ? 'bg-primary text-dark' : 'bg-dark-surface border border-white/10 text-white hover:bg-white/5'}`}
          >
            <Mail size={16} /> {leads.length > 0 && <span className="w-2 h-2 bg-primary rounded-full" />} Leads
          </button>
          <button 
            onClick={() => setActiveTab('guides')}
            className={`px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition ${activeTab === 'guides' ? 'bg-primary text-dark' : 'bg-dark-surface border border-white/10 text-white hover:bg-white/5'}`}
          >
            <BookOpen size={16} /> Gerenciar Guias
          </button>
        </div>

        {/* Tab Content: LEADS */}
        {activeTab === 'leads' && (
          <div className="bg-dark-surface border border-white/10 rounded-3xl overflow-hidden p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                Total de Leads: {getFilteredLeads().length}
                {filterTool !== 'all' && <span className="text-xs text-white/40">(Filtrado)</span>}
              </h2>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-dark/40 px-3 py-2 rounded-xl border border-white/10 flex-grow md:flex-grow-0">
                  <Filter size={14} className="text-white/40" />
                  <select 
                    value={filterTool}
                    onChange={(e) => setFilterTool(e.target.value)}
                    className="bg-transparent text-sm focus:outline-none appearance-none cursor-pointer pr-4"
                  >
                    <option value="all">Todas as Fontes</option>
                    {uniqueTools.map(tool => (
                      <option key={tool} value={tool}>{tool}</option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition"
                >
                  <Download size={14} /> Exportar CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-white/50 border-b border-white/10">
                  <tr>
                    <th className="pb-3 pr-4 font-normal">Data</th>
                    <th className="pb-3 pr-4 font-normal">Nome</th>
                    <th className="pb-3 pr-4 font-normal">Email</th>
                    <th className="pb-3 font-normal">Ferramenta Origem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {getFilteredLeads().map(lead => (
                    <tr key={lead.id} className="hover:bg-white/5 transition">
                      <td className="py-4 pr-4 whitespace-nowrap text-white/70">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 pr-4">{lead.name || '-'}</td>
                      <td className="py-4 pr-4">{lead.email}</td>
                      <td className="py-4 text-primary font-mono text-[10px] uppercase tracking-wider">{lead.source_tool}</td>
                    </tr>
                  ))}
                  {getFilteredLeads().length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-white/40">Nenhum lead encontrado para este filtro.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: GUIDES */}
        {activeTab === 'guides' && (
          <div className="space-y-6">
            {isCreatingGuide ? (
              <div className="bg-dark-surface border border-white/10 rounded-3xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">{editingGuideId ? 'Editar' : 'Criar Novo'} Guia</h2>
                  <div className="flex items-center gap-2 bg-dark/40 p-1 rounded-xl border border-white/5">
                    <button 
                      onClick={() => setNewGuideIsPublished(true)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition ${newGuideIsPublished ? 'bg-primary text-dark shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
                    >
                      Publicado
                    </button>
                    <button 
                      onClick={() => setNewGuideIsPublished(false)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition ${!newGuideIsPublished ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}
                    >
                      Rascunho
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Featured Image Upload */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/50 uppercase tracking-widest font-bold">Imagem de Destaque</label>
                    <div className="relative group">
                      {imagePreview ? (
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            onClick={() => { setFeaturedImage(null); setImagePreview(null); }}
                            className="absolute top-2 right-2 p-2 bg-dark/80 rounded-full text-white hover:text-red-400 transition"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-white/10 bg-dark/40 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Upload size={20} className="text-white/40 group-hover:text-primary" />
                          </div>
                          <span className="text-sm text-white/40 group-hover:text-primary">Clique para subir a capa</span>
                          <span className="text-[10px] text-white/20 mt-1">Recomendado: 1920x1080px</span>
                          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-white/50 uppercase tracking-widest font-bold">Título</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Como treinar na fase lútea" 
                        value={newGuideTitle}
                        onChange={e => setNewGuideTitle(e.target.value)}
                        className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/50 uppercase tracking-widest font-bold">Subtítulo (Opcional)</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Seu corpo muda. Seu treino deveria mudar também." 
                        value={newGuideSubtitle}
                        onChange={e => setNewGuideSubtitle(e.target.value)}
                        className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/50 uppercase tracking-widest font-bold">Slug (Endereço da URL)</label>
                      <input 
                        type="text" 
                        placeholder="ex-slug-do-guia" 
                        value={newGuideSlug}
                        onChange={e => setNewGuideSlug(e.target.value)}
                        className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 font-mono text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/50 uppercase tracking-widest font-bold">Categoria</label>
                      <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                        <select 
                          value={newGuideCategory}
                          onChange={e => setNewGuideCategory(e.target.value)}
                          className="w-full bg-dark border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 appearance-none cursor-pointer"
                        >
                          {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2" data-color-mode="dark">
                    <label className="text-xs text-white/50 uppercase tracking-widest font-bold">Conteúdo (Markdown)</label>
                    <MDEditor
                      value={newGuideContent}
                      onChange={setNewGuideContent}
                      preview="edit"
                      height={400}
                      className="rounded-xl overflow-hidden"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={handleSaveGuide}
                      disabled={loading || !newGuideTitle || !newGuideContent}
                      className="px-8 py-3 bg-primary text-dark rounded-xl font-bold flex items-center gap-2 hover:brightness-110 transition disabled:opacity-50"
                    >
                      <Save size={18} /> {loading ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                    <button 
                      onClick={resetForm}
                      className="px-8 py-3 border border-white/10 text-white rounded-xl hover:bg-white/5 font-bold transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <button 
                    onClick={() => setIsCreatingGuide(true)}
                    className="flex-grow md:flex-grow-0 px-6 py-4 bg-primary text-dark rounded-2xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition"
                  >
                    <Plus size={20} /> Criar Novo Guia
                  </button>
                  
                  <div className="flex-grow flex items-center gap-3 bg-dark-surface border border-white/10 rounded-2xl px-4 py-2 focus-within:border-primary/50 transition-colors">
                    <Search size={18} className="text-white/30" />
                    <input 
                      type="text" 
                      placeholder="Pesquisar guias pelo título ou slug..." 
                      value={searchTermGuides}
                      onChange={(e) => setSearchTermGuides(e.target.value)}
                      className="bg-transparent w-full text-sm focus:outline-none text-white overflow-ellipsis"
                    />
                    {searchTermGuides && (
                      <button onClick={() => setSearchTermGuides('')} className="text-white/20 hover:text-white">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {getFilteredGuides().length === 0 ? (
                  <div className="text-center py-20 bg-dark-surface border border-white/10 rounded-3xl">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={32} className="text-white/10" />
                    </div>
                    <p className="text-white/40">Nenhum guia encontrado com esse termo.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                    {getFilteredGuides().map(guide => (
                      <div key={guide.id} className={`bg-dark-surface border rounded-3xl overflow-hidden flex flex-col group transition-all ${guide.is_published ? 'border-white/10 hover:border-primary/30' : 'border-white/5 opacity-60 grayscale'}`}>
                        <div className="aspect-video bg-dark flex items-center justify-center overflow-hidden border-b border-white/5 relative">
                          <div className="absolute top-4 right-4 z-10 bg-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-primary border border-primary/20">
                            {guide.category || 'Geral'}
                          </div>
                          {!guide.is_published && (
                            <div className="absolute top-4 left-4 z-10 bg-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/50 border border-white/10">
                              Rascunho
                            </div>
                          )}
                          {guide.image_url ? (
                            <img src={guide.image_url} alt={guide.title} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={32} className="text-white/10" />
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2">{guide.title}</h3>
                          <p className="text-xs text-white/30 font-mono mb-4">/{guide.slug}</p>
                          
                          <div className="mt-auto flex items-center justify-between">
                            <button 
                              onClick={() => togglePublishStatus(guide)}
                              className={`flex items-center gap-2 text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-tighter transition-all ${guide.is_published ? 'bg-primary/10 text-primary hover:bg-primary hover:text-dark' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
                            >
                              {guide.is_published ? <><Eye size={12} /> Publicado</> : <><EyeOff size={12} /> Desativado</>}
                            </button>
                            
                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => handleEditClick(guide)}
                                className="text-white/40 hover:text-primary p-2 rounded-xl transition"
                                title="Editar"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteGuide(guide.id)}
                                className="text-white/20 hover:text-red-400 p-2 rounded-xl transition"
                                title="Excluir"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

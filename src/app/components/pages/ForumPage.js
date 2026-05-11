"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquare, Newspaper, AlertTriangle, Users, Plus, X, ArrowLeft, CornerDownRight } from 'lucide-react';
import { useAuth, useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';

// Ruta hacia tu supabaseClient
import { supabase } from '../../utils/supabaseClient';

// CORRECCIÓN: Asegúrate de que el archivo en tu computadora se llame EXACTAMENTE "TiptapEditor.js" o "TiptapEditor.jsx" (con T y E mayúsculas).
const TiptapEditor = dynamic(() => import('../TiptapEditor'), {
  ssr: false,
  loading: () => (
    <div className="p-8 text-center text-[#39ff14] animate-pulse font-bold tracking-widest uppercase">
      Cargando interfaz de escritura...
    </div>
  )
});

// ==========================================
// COMPONENTE PRINCIPAL (CONTROLADOR DE VISTAS)
// ==========================================
export default function ForumPage() {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  
  // Sistema de navegación interno SPA (index, category, thread)
  const [view, setView] = useState({ 
    current: 'index', 
    id: null, 
    title: null, 
    parentId: null, 
    parentTitle: null 
  });

  // Renderizador dinámico según la vista actual
  return (
    <div className="tab-enter space-y-6 vt323-regular w-full">
      {view.current === 'index' && (
        <IndexView setView={setView} isSignedIn={isSignedIn} userId={userId} user={user} />
      )}
      
      {view.current === 'category' && (
        <CategoryView 
          categoryId={view.id} 
          categoryTitle={view.title} 
          setView={setView} 
          isSignedIn={isSignedIn} 
          userId={userId} 
          user={user} 
        />
      )}
      
      {view.current === 'thread' && (
        <ThreadView 
          threadId={view.id} 
          threadTitle={view.title} 
          parentId={view.parentId}
          parentTitle={view.parentTitle}
          setView={setView} 
          isSignedIn={isSignedIn} 
          userId={userId} 
          user={user} 
        />
      )}
    </div>
  );
}


// ==========================================
// VISTA 1: ÍNDICE DE SECTORES
// ==========================================
function IndexView({ setView, isSignedIn, userId, user }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data: catData } = await supabase.from('forum_categories').select('*').order('sort_order', { ascending: true });
    
    if (!catData) { setLoading(false); return; }

    const categoriesWithThreads = await Promise.all(catData.map(async (cat) => {
      const { data: threadData } = await supabase
        .from('forum_threads')
        .select('id, title, created_at, profiles(username, image_url)')
        .eq('category_id', cat.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      return { ...cat, latestThread: threadData || null };
    }));

    setCategories(categoriesWithThreads);
    if (categoriesWithThreads.length > 0) setSelectedCategory(categoriesWithThreads[0].id);
    setLoading(false);
  };

  const handleCreateThread = async () => {
    if (!newTitle || !newContent || !isSignedIn || !selectedCategory) {
      alert("Matriz incompleta."); return;
    }
    try {
      await supabase.from('profiles').upsert({ id: userId, username: user?.username || user?.firstName || 'Sobreviviente', image_url: user?.imageUrl || '/image_340025.png' });
      await supabase.from('forum_threads').insert({ title: newTitle, content: newContent, author_id: userId, category_id: selectedCategory });
      setIsCreating(false); setNewTitle(''); setNewContent(''); fetchCategories();
    } catch (err) { alert(`Error CRÍTICO: ${err.message}`); }
  };

  const getIcon = (title) => {
    if (title.includes('Anuncios')) return <Newspaper className="w-7 h-7 text-blue-400" />;
    if (title.includes('Reportes')) return <AlertTriangle className="w-7 h-7 text-red-500" />;
    if (title.includes('General')) return <Users className="w-7 h-7 text-[#39ff14]" />;
    return <MessageSquare className="w-7 h-7 text-purple-400" />;
  };

  const officialCategories = categories.filter(c => c.title.includes('Anuncios') || c.title.includes('Reportes'));
  const communityCategories = categories.filter(c => !c.title.includes('Anuncios') && !c.title.includes('Reportes'));

  return (
    <>
      <div className="flex justify-between items-center border-b border-purple-900 pb-4">
        <h2 className="text-3xl font-extrabold text-white tracking-widest uppercase Orbit-crew">Red de Comunicaciones</h2>
        {isSignedIn && !isCreating && (
          <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 neon-btn px-6 py-2 rounded text-xs font-bold uppercase tracking-widest transition-all">
            <Plus className="w-4 h-4" /> Nuevo Registro
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="glass-panel p-8 rounded-2xl border border-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.1)] bg-[#0d001a]/90 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-[#39ff14] uppercase tracking-widest text-xl font-bold">Transmitir Mensaje</h4>
            <button onClick={() => setIsCreating(false)} className="text-purple-400 hover:text-red-500 transition-colors"><X className="w-8 h-8" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <input type="text" placeholder="ASUNTO DEL REPORTE..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full bg-[#1a0536] border border-purple-900/50 focus:border-[#39ff14] text-white text-xl px-6 py-4 rounded uppercase tracking-wide outline-none transition-all font-bold h-full" />
            </div>
            <div>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-[#1a0536] border border-purple-900/50 focus:border-[#39ff14] text-purple-200 text-lg px-4 py-4 rounded uppercase outline-none transition-all font-bold h-full cursor-pointer">
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
              </select>
            </div>
          </div>
          <TiptapEditor content={newContent} onChange={setNewContent} />
          <div className="mt-6 flex justify-end"><button onClick={handleCreateThread} className="bg-[#39ff14] text-black px-10 py-3 rounded font-bold uppercase tracking-widest hover:bg-white transition-colors">SUBIR A LA RED</button></div>
        </div>
      ) : (
        <div className="space-y-10">
          {loading ? <div className="text-center py-20 text-[#39ff14] animate-pulse">SINCRONIZANDO SECTORES...</div> : (
            <>
              {officialCategories.length > 0 && (
                <div className="glass-panel rounded-xl overflow-hidden border border-purple-900/50 shadow-2xl">
                  <div className="bg-gradient-to-r from-red-900/40 to-[#0d001a] border-b border-red-500/30 px-6 py-3">
                    <h3 className="text-red-400 font-bold tracking-[0.2em] uppercase text-sm">Pitcharcity Official</h3>
                  </div>
                  <div className="bg-black/20 divide-y divide-purple-900/20">
                    {officialCategories.map(cat => <CategoryRow key={cat.id} cat={cat} getIcon={getIcon} setView={setView} />)}
                  </div>
                </div>
              )}
              {communityCategories.length > 0 && (
                <div className="glass-panel rounded-xl overflow-hidden border border-purple-900/50 shadow-2xl">
                  <div className="bg-gradient-to-r from-purple-900/40 to-[#0d001a] border-b border-[#39ff14]/30 px-6 py-3">
                    <h3 className="text-[#39ff14] font-bold tracking-[0.2em] uppercase text-sm">Pitcharcity Community</h3>
                  </div>
                  <div className="bg-black/20 divide-y divide-purple-900/20">
                    {communityCategories.map(cat => <CategoryRow key={cat.id} cat={cat} getIcon={getIcon} setView={setView} />)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

// Fila de Categoría
function CategoryRow({ cat, getIcon, setView }) {
  return (
    <div className="flex items-center p-5 hover:bg-white/5 transition-all group">
      <div className="w-16 flex justify-center opacity-70 group-hover:opacity-100 transition-all">{getIcon(cat.title)}</div>
      <div className="flex-1 px-4">
        <button onClick={() => setView({ current: 'category', id: cat.id, title: cat.title })} className="text-lg font-bold text-purple-100 group-hover:text-[#39ff14] transition-colors Orbit-crew uppercase block text-left">
          {cat.title}
        </button>
        <p className="text-xs text-purple-400 mt-1 font-mono uppercase tracking-tight">{cat.description}</p>
      </div>
      <div className="hidden md:flex w-80 items-center border-l border-purple-900/30 pl-6">
        {cat.latestThread ? (
          <div className="flex items-center gap-3">
            <img src={cat.latestThread.profiles?.image_url || '/image_340025.png'} alt="avatar" className="w-8 h-8 rounded border border-purple-500 object-cover grayscale group-hover:grayscale-0 transition-all"/>
            <div className="flex flex-col text-left">
              <button onClick={() => setView({ current: 'thread', id: cat.latestThread.id, title: cat.latestThread.title, parentId: cat.id, parentTitle: cat.title })} className="text-xs text-purple-200 font-bold hover:text-[#39ff14] truncate w-48 text-left">
                {cat.latestThread.title}
              </button>
              <span className="text-[9px] text-purple-600 font-mono mt-1">POR: {cat.latestThread.profiles?.username || 'ANÓNIMO'} · {new Date(cat.latestThread.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col"><span className="text-[10px] text-purple-500 uppercase tracking-widest mb-1">Última Transmisión</span><span className="text-[9px] text-purple-600 font-mono mt-1">SIN REGISTROS AÚN</span></div>
        )}
      </div>
    </div>
  );
}


// ==========================================
// VISTA 2: LISTA DE HILOS DENTRO DE UNA CATEGORÍA
// ==========================================
function CategoryView({ categoryId, categoryTitle, setView }) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchThreads() {
      const { data } = await supabase.from('forum_threads')
        .select('id, title, created_at, profiles(username, image_url)')
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });
      if (data) setThreads(data);
      setLoading(false);
    }
    fetchThreads();
  }, [categoryId]);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center border-b border-purple-900 pb-4 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setView({ current: 'index' })} className="p-2 bg-purple-900/50 text-white rounded hover:bg-[#39ff14] hover:text-black transition-colors"><ArrowLeft className="w-5 h-5" /></button>
          <div>
            <h2 className="text-3xl font-extrabold text-[#39ff14] tracking-widest uppercase Orbit-crew">{categoryTitle}</h2>
            <span className="text-xs text-purple-400 font-mono">SECTOR DE LA RED</span>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden border border-purple-900/50 shadow-2xl">
        <div className="bg-black/20 divide-y divide-purple-900/20">
          {loading ? <div className="p-10 text-center text-purple-400">Rastreando señales...</div> : 
           threads.length === 0 ? <div className="p-10 text-center text-purple-400 font-mono">No hay registros en este sector.</div> : 
           threads.map(thread => (
            <div key={thread.id} className="flex items-center p-4 hover:bg-white/5 transition-all group cursor-pointer" onClick={() => setView({ current: 'thread', id: thread.id, title: thread.title, parentId: categoryId, parentTitle: categoryTitle })}>
              <MessageSquare className="w-6 h-6 text-purple-500 group-hover:text-[#39ff14] mx-4 transition-colors" />
              <div className="flex-1">
                <h4 className="text-lg font-bold text-purple-100 group-hover:text-white transition-colors">{thread.title}</h4>
                <p className="text-xs text-purple-500 font-mono mt-1">Por: {thread.profiles?.username} · {new Date(thread.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ==========================================
// VISTA 3: EL POST (HILO) Y SUS RESPUESTAS
// ==========================================
function ThreadView({ threadId, threadTitle, parentId, parentTitle, setView, isSignedIn, userId, user }) {
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    fetchThreadData();
  }, [threadId]);

  const fetchThreadData = async () => {
    setLoading(true);
    // Traer el post original
    const { data: tData } = await supabase.from('forum_threads').select('*, profiles(username, image_url, rank)').eq('id', threadId).single();
    if (tData) setThread(tData);

    // Traer las respuestas
    const { data: rData } = await supabase.from('forum_replies').select('*, profiles(username, image_url, rank)').eq('thread_id', threadId).order('created_at', { ascending: true });
    if (rData) setReplies(rData);
    
    setLoading(false);
  };

  const handleReply = async () => {
    if (!replyContent || !isSignedIn) return;
    setIsReplying(true);
    
    // Asegurar sincronización de perfil
    await supabase.from('profiles').upsert({ id: userId, username: user?.username || user?.firstName || 'Sobreviviente', image_url: user?.imageUrl || '/image_340025.png' });
    
    await supabase.from('forum_replies').insert({ thread_id: threadId, author_id: userId, content: replyContent });
    
    setReplyContent('');
    setIsReplying(false);
    fetchThreadData();
  };

  if (loading) return <div className="text-center py-20 text-[#39ff14] animate-pulse">DESENCRIPTANDO REGISTRO...</div>;
  if (!thread) return <div className="text-center text-red-500">Señal perdida. Registro no encontrado.</div>;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      
      {/* Navegación superior */}
      <div className="flex items-center gap-2 mb-6 font-mono text-sm">
        <button onClick={() => setView({ current: 'index' })} className="text-purple-400 hover:text-[#39ff14]">Red</button>
        <span className="text-purple-700">/</span>
        <button onClick={() => setView({ current: 'category', id: parentId, title: parentTitle })} className="text-purple-400 hover:text-[#39ff14]">{parentTitle || 'Sector'}</button>
      </div>

      <h2 className="text-3xl font-extrabold text-white mb-6 Orbit-crew">{thread.title}</h2>

      {/* POST PRINCIPAL */}
      <div className="glass-panel border border-purple-500/30 rounded-xl overflow-hidden mb-6 flex flex-col md:flex-row">
        <div className="bg-[#05000a] md:w-48 p-6 flex flex-col items-center border-b md:border-b-0 md:border-r border-purple-900/50">
          <img src={thread.profiles?.image_url || '/image_340025.png'} className="w-20 h-20 rounded shadow-[0_0_15px_rgba(138,43,226,0.3)] mb-3 object-cover" />
          <span className="font-bold text-[#39ff14] uppercase text-center text-sm">{thread.profiles?.username || 'Anónimo'}</span>
          <span className="text-[10px] text-purple-400 mt-1 bg-purple-900/30 px-2 py-1 rounded">{thread.profiles?.rank || 'Sobreviviente'}</span>
        </div>
        
        <div className="flex-1 p-6 bg-[#0d001a]/80">
          <div className="text-xs text-purple-500 border-b border-purple-900/30 pb-2 mb-4 font-mono flex justify-between">
            <span>{new Date(thread.created_at).toLocaleString()}</span>
            <span>#1</span>
          </div>
          <div className="text-purple-100 prose prose-invert prose-p:my-2 prose-a:text-[#39ff14] max-w-none font-mono text-lg" dangerouslySetInnerHTML={{ __html: thread.content }}></div>
        </div>
      </div>

      {/* RESPUESTAS */}
      {replies.map((reply, index) => (
        <div key={reply.id} className="glass-panel border border-purple-900/40 rounded-xl overflow-hidden mb-4 flex flex-col md:flex-row opacity-90">
          <div className="bg-[#05000a] md:w-48 p-6 flex flex-col items-center border-b md:border-b-0 md:border-r border-purple-900/30">
            <img src={reply.profiles?.image_url || '/image_340025.png'} className="w-16 h-16 rounded mb-2 object-cover" />
            <span className="font-bold text-white uppercase text-center text-xs">{reply.profiles?.username || 'Anónimo'}</span>
          </div>
          <div className="flex-1 p-6 bg-[#0d001a]/50">
            <div className="text-xs text-purple-600 border-b border-purple-900/20 pb-2 mb-4 font-mono flex justify-between">
              <span>{new Date(reply.created_at).toLocaleString()}</span>
              <span>#{index + 2}</span>
            </div>
            <div className="text-purple-200 prose prose-invert max-w-none font-mono text-base" dangerouslySetInnerHTML={{ __html: reply.content }}></div>
          </div>
        </div>
      ))}

      {/* CAJA DE RESPUESTA RÁPIDA */}
      {isSignedIn ? (
        <div className="mt-10 border-t border-purple-500/50 pt-8">
          <div className="flex items-center gap-2 mb-4 text-[#39ff14] font-bold tracking-widest uppercase">
            <CornerDownRight className="w-5 h-5" /> Añadir Respuesta
          </div>
          <div className="glass-panel rounded-xl overflow-hidden p-1 bg-[#1a0536]">
            <TiptapEditor content={replyContent} onChange={setReplyContent} />
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={handleReply} disabled={isReplying} className="bg-purple-600 text-white px-8 py-2 rounded font-bold uppercase tracking-widest hover:bg-[#39ff14] hover:text-black transition-colors disabled:opacity-50">
              {isReplying ? 'ENVIANDO...' : 'RESPONDER'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10 p-6 glass-panel text-center rounded-xl border border-red-900">
          <p className="text-purple-300 uppercase tracking-widest text-sm">Debes acceder al sistema para dejar un registro.</p>
        </div>
      )}
    </div>
  );
}

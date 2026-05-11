"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
// CORRECCIÓN: TextStyle y Color deben ir entre llaves { }
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';

import { 
  Bold, Italic, Strikethrough, Underline as UnderlineIcon, Code, 
  Heading1, Heading2, Type, List, ListOrdered, 
  TerminalSquare, Quote, Minus, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Unlink, ImageIcon, Palette, Highlighter,
  Undo, Redo, Eraser 
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Subcomponente: La Barra de Herramientas Completa
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  // Lógica de "Estado Activo" para los botones
  const btnClass = (isActive) => 
    `p-1.5 rounded transition-all flex items-center justify-center ${
      isActive 
        ? 'bg-[#39ff14] text-black shadow-[0_0_8px_#39ff14] font-bold' 
        : 'text-purple-400 hover:bg-purple-900/50 hover:text-white'
    }`;

  // Funciones para pedir URLs mediante Prompts simples
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL del enlace:', previousUrl);
    
    if (url === null) return; // Cancelado
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Pega la URL de la imagen:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-[#05000a] border-b border-purple-900/50 select-none">
      
      {/* 1. Formato de Texto Básico */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Negrita"><Bold className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Cursiva"><Italic className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))} title="Subrayado"><UnderlineIcon className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive('strike'))} title="Tachado"><Strikethrough className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleCode().run()} className={btnClass(editor.isActive('code'))} title="Código en línea"><Code className="w-4 h-4" /></button>

      <div className="w-px h-5 bg-purple-900/50 mx-1"></div>

      {/* 2. Colores y Resaltado */}
      <div className="flex items-center gap-1" title="Color del texto">
        <label className="cursor-pointer text-purple-400 hover:text-white p-1.5 flex items-center gap-1">
          <Palette className="w-4 h-4" />
          <input 
            type="color" 
            onInput={event => editor.chain().focus().setColor(event.target.value).run()}
            value={editor.getAttributes('textStyle').color || '#ffffff'}
            className="w-4 h-4 p-0 border-0 bg-transparent cursor-pointer"
          />
        </label>
      </div>
      <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#39ff14' }).run()} className={btnClass(editor.isActive('highlight'))} title="Resaltar texto (Neón)"><Highlighter className="w-4 h-4" /></button>

      <div className="w-px h-5 bg-purple-900/50 mx-1"></div>

      {/* 3. Títulos y Párrafos */}
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive('heading', { level: 1 }))} title="Título Grande (H1)"><Heading1 className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))} title="Título Mediano (H2)"><Heading2 className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().setParagraph().run()} className={btnClass(editor.isActive('paragraph'))} title="Párrafo Normal"><Type className="w-4 h-4" /></button>

      <div className="w-px h-5 bg-purple-900/50 mx-1"></div>

      {/* 4. Alineación */}
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btnClass(editor.isActive({ textAlign: 'left' }))} title="Alinear a la Izquierda"><AlignLeft className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btnClass(editor.isActive({ textAlign: 'center' }))} title="Centrar"><AlignCenter className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btnClass(editor.isActive({ textAlign: 'right' }))} title="Alinear a la Derecha"><AlignRight className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={btnClass(editor.isActive({ textAlign: 'justify' }))} title="Justificar"><AlignJustify className="w-4 h-4" /></button>

      <div className="w-px h-5 bg-purple-900/50 mx-1"></div>

      {/* 5. Listas, Citas y Medios */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Lista de Viñetas"><List className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Lista Numerada"><ListOrdered className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btnClass(editor.isActive('codeBlock'))} title="Bloque de Código"><TerminalSquare className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))} title="Cita en bloque"><Quote className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnClass(false)} title="Línea Divisoria"><Minus className="w-4 h-4" /></button>
      
      <div className="w-px h-5 bg-purple-900/50 mx-1"></div>

      {/* 6. Enlaces e Imágenes */}
      <button onClick={setLink} className={btnClass(editor.isActive('link'))} title="Insertar Enlace"><LinkIcon className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} className="p-1.5 text-purple-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed" title="Quitar Enlace"><Unlink className="w-4 h-4" /></button>
      <button onClick={addImage} className={btnClass(false)} title="Insertar Imagen por URL"><ImageIcon className="w-4 h-4" /></button>

      <div className="w-px h-5 bg-purple-900/50 mx-1"></div>

      {/* 7. Acciones e Historial */}
      <button onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} className={btnClass(false)} title="Limpiar todos los Formatos"><Eraser className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-1.5 text-purple-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed" title="Deshacer (Ctrl+Z)"><Undo className="w-4 h-4" /></button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-1.5 text-purple-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed" title="Rehacer (Ctrl+Y)"><Redo className="w-4 h-4" /></button>
    </div>
  );
};

// Componente Principal
export default function TiptapEditor({ content, onChange }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension.configure({ inline: true, HTMLAttributes: { class: 'rounded-lg max-w-full h-auto border border-purple-500/50 my-4' } }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // Clases ajustadas para no pisar los estilos en línea que generan los colores y alineaciones
        class: 'prose prose-invert prose-p:my-1 prose-h1:text-3xl prose-h1:font-bold prose-h2:text-2xl prose-ul:list-disc prose-ol:list-decimal max-w-none focus:outline-none min-h-[250px] text-white p-6 font-mono text-lg',
      },
    },
  });

  if (!mounted || !editor) {
    return (
      <div className="p-8 text-[#39ff14] border-2 border-dashed border-purple-900/50 bg-[#0d001a] rounded-xl text-center uppercase tracking-widest font-bold animate-pulse">
        Cargando matriz de escritura...
      </div>
    );
  }

  return (
    <div className="border border-purple-900/50 focus-within:border-[#39ff14] transition-colors rounded-xl overflow-hidden bg-[#1a0536]">
      <MenuBar editor={editor} />
      {/* Editor Content donde el usuario escribe */}
      <EditorContent editor={editor} className="cursor-text bg-[#0d001a]/50 min-h-[250px]" />
    </div>
  );
}
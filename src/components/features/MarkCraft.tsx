import React, { useState } from 'react';
import { Bold, Italic, Code, Heading, List, Copy, Check, RotateCcw, FileText, Code2, Eye } from 'lucide-react';

const INITIAL_MD = `# High-Performance Engineering

Welcome to **MarkCraft Live**! This is a real-time reactive markdown preview engine.

### Core Architecture Highlights
- ⚡ **Ultra-low latency** client-side parsing
- 🛡️ **Zero external bloated parser dependencies**
- 📱 Responsive split-pane layout for desktop & mobile

### Quick Code Snippet
\`\`\`kotlin
fun executePipeline(): Flow<Result> = flow {
    emit(Result.Loading)
    val response = networkClient.fetchData()
    emit(Result.Success(response))
}
\`\`\`

> *"Simplicity is a prerequisite for reliability."* — Edsger W. Dijkstra

- [x] Responsive web design
- [x] Native Android support via Capacitor
- [x] Interactive mini-app feature demos
`;

export const MarkCraft: React.FC = () => {
  const [content, setContent] = useState<string>(INITIAL_MD);
  const [copied, setCopied] = useState(false);
  const [activeMobileView, setActiveMobileView] = useState<'editor' | 'preview'>('preview');
  const [showCode, setShowCode] = useState(false);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  const insertText = (prefix: string, suffix: string = '') => {
    setContent(prev => prev + `\n${prefix}sample${suffix}\n`);
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe lightweight parser for preview
  const renderPreview = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    lines.forEach((line, index) => {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // end of code block
          elements.push(
            <pre key={`code-${index}`} className="p-3 my-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto">
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-xl font-bold text-white mt-3 mb-2">{line.replace('# ', '')}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-lg font-bold text-slate-100 mt-3 mb-2">{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-sm font-semibold text-cyan-400 mt-2 mb-1">{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-cyan-500 pl-3 my-2 italic text-slate-300 text-sm bg-cyan-950/20 py-1 rounded-r">
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.startsWith('- [x] ')) {
        elements.push(
          <div key={index} className="flex items-center gap-2 text-sm text-slate-300 my-1">
            <span className="w-4 h-4 rounded bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-400 text-xs">✓</span>
            <span className="line-through text-slate-400">{line.replace('- [x] ', '')}</span>
          </div>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="text-sm text-slate-300 ml-4 list-disc my-0.5">
            {line.replace('- ', '')}
          </li>
        );
      } else if (line.trim() === '') {
        elements.push(<div key={index} className="h-2" />);
      } else {
        // Simple bold / italic inline replacement
        const formattedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');

        elements.push(
          <p key={index} className="text-sm text-slate-300 leading-relaxed my-1" dangerouslySetInnerHTML={{ __html: formattedLine }} />
        );
      }
    });

    return elements;
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            MarkCraft Live Markdown
          </h3>
          <p className="text-xs text-slate-400">
            Real-time live markdown formatting, developer documentation preview, and copy pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile view switch */}
          <div className="flex sm:hidden rounded-lg bg-slate-800 p-0.5 border border-slate-700">
            <button
              onClick={() => setActiveMobileView('editor')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                activeMobileView === 'editor' ? 'bg-cyan-500 text-white' : 'text-slate-400'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveMobileView('preview')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                activeMobileView === 'preview' ? 'bg-cyan-500 text-white' : 'text-slate-400'
              }`}
            >
              Preview
            </button>
          </div>

          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300"
          >
            {showCode ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
            {showCode ? 'View Demo' : 'View Code'}
          </button>

          <button
            onClick={copyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-all active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied MD' : 'Copy MD'}
          </button>
        </div>
      </div>

      {showCode ? (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300">
          <pre>{`// Real-time zero-dependency client markdown engine
export const parseMarkdownLine = (line: string) => {
  if (line.startsWith('# ')) return { type: 'h1', text: line.slice(2) };
  if (line.startsWith('## ')) return { type: 'h2', text: line.slice(3) };
  if (line.startsWith('- ')) return { type: 'li', text: line.slice(2) };
  return { type: 'p', text: line };
};`}</pre>
        </div>
      ) : (
        <>
          {/* Quick Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => insertText('**', '**')}
                title="Bold"
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 transition-colors"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => insertText('*', '*')}
                title="Italic"
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 transition-colors"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => insertText('### ')}
                title="Heading 3"
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 transition-colors"
              >
                <Heading className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => insertText('```ts\nconst greeting = "Hello, world!";\n```')}
                title="Code block"
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 transition-colors"
              >
                <Code className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => insertText('- ')}
                title="Bullet list"
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 transition-colors"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setContent(INITIAL_MD)}
                title="Reset sample"
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors ml-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-3">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
            </div>
          </div>

          {/* Dual Pane Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-96">
            {/* Editor Pane */}
            <div className={`h-full flex flex-col ${activeMobileView === 'preview' ? 'hidden sm:flex' : 'flex'}`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 px-1 flex items-center justify-between">
                <span>Markdown Raw Input</span>
                <span className="font-mono text-[10px] text-slate-500">Live Sync</span>
              </div>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Type markdown here..."
                className="flex-1 w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500 resize-none transition-colors"
              />
            </div>

            {/* Preview Pane */}
            <div className={`h-full flex flex-col ${activeMobileView === 'editor' ? 'hidden sm:flex' : 'flex'}`}>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 px-1 flex items-center justify-between">
                <span>Rendered Live Preview</span>
                <span className="text-[10px] text-emerald-400">● Live Active</span>
              </div>
              <div className="flex-1 p-4 rounded-xl bg-slate-900/70 border border-slate-800 overflow-y-auto">
                {renderPreview(content)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

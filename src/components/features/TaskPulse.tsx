import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Trash2, ArrowRight, ArrowLeft, Tag, Code2, Eye } from 'lucide-react';
import type { Task } from '../../types';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Migrate Room DB entities to Kotlin 2.0 KSP',
    category: 'Mobile / Android',
    priority: 'high',
    status: 'done',
    createdAt: 'Today',
  },
  {
    id: '2',
    title: 'Profile cold start memory footprints in Android Studio',
    category: 'Performance',
    priority: 'medium',
    status: 'in-progress',
    createdAt: 'Today',
  },
  {
    id: '3',
    title: 'Benchmark Capacitor bridge message serialisation',
    category: 'Architecture',
    priority: 'high',
    status: 'todo',
    createdAt: 'Today',
  },
];

export const TaskPulse: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_tasks', JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      status: 'todo',
      createdAt: 'Just now',
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTitle('');
  };

  const moveTask = (id: string, direction: 'forward' | 'backward') => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task;
        if (direction === 'forward') {
          if (task.status === 'todo') return { ...task, status: 'in-progress' };
          if (task.status === 'in-progress') return { ...task, status: 'done' };
        } else {
          if (task.status === 'done') return { ...task, status: 'in-progress' };
          if (task.status === 'in-progress') return { ...task, status: 'todo' };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filterPriority === 'all') return true;
    return t.priority === filterPriority;
  });

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'low':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-cyan-400" />
            TaskPulse Micro-Kanban
          </h3>
          <p className="text-xs text-slate-400">
            Offline-first agile board with priority queues, state progression, and LocalStorage persistence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            {showCode ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
            {showCode ? 'View Demo' : 'View Code'}
          </button>
        </div>
      </div>

      {showCode ? (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300">
          <pre>{`// TaskPulse state transition engine
export const advanceTaskStatus = (task: Task): Task => {
  const transitions: Record<Task['status'], Task['status']> = {
    'todo': 'in-progress',
    'in-progress': 'done',
    'done': 'done'
  };
  return { ...task, status: transitions[task.status] };
};`}</pre>
        </div>
      ) : (
        <>
          {/* Add Task input form */}
          <form onSubmit={addTask} className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <input
              type="text"
              placeholder="Add a new engineering task..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
            />
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
            >
              <option value="Mobile / Android">Mobile / Android</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Architecture">Architecture</option>
              <option value="Performance">Performance</option>
            </select>
            <select
              value={newPriority}
              onChange={e => setNewPriority(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              type="submit"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </form>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['todo', 'in-progress', 'done'] as const).map(columnStatus => {
              const columnTasks = filteredTasks.filter(t => t.status === columnStatus);
              const colTitles = {
                'todo': { label: 'To Do', color: 'text-amber-400', countBg: 'bg-amber-500/20 text-amber-300' },
                'in-progress': { label: 'In Progress', color: 'text-cyan-400', countBg: 'bg-cyan-500/20 text-cyan-300' },
                'done': { label: 'Completed', color: 'text-emerald-400', countBg: 'bg-emerald-500/20 text-emerald-300' },
              }[columnStatus];

              return (
                <div key={columnStatus} className="flex flex-col rounded-xl bg-slate-900/50 border border-slate-800/80 p-3 min-h-[300px]">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className={`text-xs font-bold uppercase tracking-wider ${colTitles.color}`}>
                      {colTitles.label}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colTitles.countBg}`}>
                      {columnTasks.length}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1">
                    {columnTasks.map(task => (
                      <div
                        key={task.id}
                        className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all space-y-2 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-medium text-slate-200 leading-snug">{task.title}</p>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 flex items-center gap-1 border border-slate-800">
                              <Tag className="w-2.5 h-2.5" />
                              {task.category}
                            </span>
                            <span className={`text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded border ${getPriorityBadge(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            {columnStatus !== 'todo' && (
                              <button
                                onClick={() => moveTask(task.id, 'backward')}
                                title="Move back"
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </button>
                            )}
                            {columnStatus !== 'done' && (
                              <button
                                onClick={() => moveTask(task.id, 'forward')}
                                title="Move forward"
                                className="p-1 rounded bg-cyan-600/80 hover:bg-cyan-500 text-white transition-colors"
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {columnTasks.length === 0 && (
                      <div className="h-28 flex items-center justify-center border border-dashed border-slate-800/80 rounded-lg text-slate-600 text-xs">
                        No tasks
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

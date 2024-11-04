import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, X } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200 text-white/90 font-medium glow-effect"
      >
        {isOpen ? 'Hide Tasks' : 'Show Tasks'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-md w-full shadow-xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Tasks</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={addTodo} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 rounded-lg bg-black/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
              />
              <button
                type="submit"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </form>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {todos.map(todo => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-black/20 group"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  <span className={`flex-1 text-white/90 ${todo.completed ? 'line-through text-white/50' : ''}`}>
                    {todo.text}
                  </span>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 text-white/60 hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {todos.length === 0 && (
                <div className="text-center text-white/50 py-4">
                  No tasks yet. Add one above!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
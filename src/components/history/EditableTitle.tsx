import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface EditableTitleProps {
  title: string;
  onSave: (newTitle: string) => void;
  disabled?: boolean;
}

export function EditableTitle({ title: initialTitle, onSave, disabled }: EditableTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  const handleSave = () => {
    if (title.trim() && !disabled) {
      onSave(title);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-md md:text-lg py-3 font-bold bg-white/10 text-white rounded px-3 w-full"
          autoFocus
          disabled={disabled}
        />
        <button
          onClick={handleSave}
          disabled={disabled}
          className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
        >
          <Check className="w-5 h-5 text-green-400" />
        </button>
        <button
          onClick={handleCancel}
          disabled={disabled}
          className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5 text-red-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <h2 className="text-2xl py-3 font-bold text-white">{title}</h2>
      <button
        onClick={() => setIsEditing(true)}
        disabled={disabled}
        className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
      >
        <Pencil className="w-5 h-5 text-white/70" />
      </button>
    </div>
  );
}

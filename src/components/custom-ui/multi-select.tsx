"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface CollectionType {
  _id: string;
  title: string;
}

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const selected =
    value.length === 0
      ? []
      : (value
          .map((id) => collections.find((collection) => collection._id === id))
          .filter(Boolean) as CollectionType[]);

  const selectables = collections.filter(
    (collection) => !selected.includes(collection)
  );

  return (
    <div className="multi-select">
      {/* Input field */}
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        className="multi-select-input"
      />

      {/* Selected items */}
      <div className="flex gap-1 flex-wrap mt-4">
        {selected.map((collection) => (
          <Badge key={collection._id} className="">
            <span>{collection.title}</span>
            <button
              type="button"
              className="remove-button"
              onClick={() => onRemove(collection._id)}
            >
              ×
            </button>
          </Badge>
        ))}
      </div>

      {/* Dropdown list */}
      {open && selectables.length > 0 && (
        <div className="border mx-2 mt-2 rounded">
          {selectables.map((collection) => (
            <div
              key={collection._id}
              className="cursor-pointer hover:bg-gray-400 p-1"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(collection._id);
                setInputValue("");
              }}
            >
              {collection.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;

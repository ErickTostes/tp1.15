import React, { useState } from 'react';

function EditableList() {
  const [items, setItems] = useState([
    { id: 1, value: 'Item 1' },
    { id: 2, value: 'Item 2' },
    { id: 3, value: 'Item 3' },
  ]);
  const [errors, setErrors] = useState({});

  const handleChange = (id, event) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, value: event.target.value };
      }
      return item;
    });
    setItems(newItems);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: false })); // Remove erro se o campo é editado
  };

  const handleRemove = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    setErrors((prevErrors) => {
      const { [id]: removedError, ...rest } = prevErrors;
      return rest; // Remove erro correspondente ao item removido
    });
  };

  const handleBlur = (id) => {
    const item = items.find((item) => item.id === id);
    if (!item.value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: 'Este campo não pode estar vazio.' }));
    }
  };

  return (
    <div>
      <h2>Lista Editável</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="text"
              value={item.value}
              onChange={(event) => handleChange(item.id, event)}
              onBlur={() => handleBlur(item.id)}
            />
            <button onClick={() => handleRemove(item.id)}>Remover</button>
            {errors[item.id] && <span className="error">{errors[item.id]}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditableList;

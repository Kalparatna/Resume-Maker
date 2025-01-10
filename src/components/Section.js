import React from "react";

const Section = ({
  title,
  fields,
  items,
  onAdd,
  onRemove,
  onUpdate,
  addButtonClass, 
  removeButtonClass, 
}) => {
  return (
    <div className="section">
      <h2>{title}</h2>

      {/* Render input fields if there are fields */}
      {fields &&
        fields.map((field, index) => (
          <div key={index}>
            <label>{field.name}</label>
            {field.type === "textarea" ? (
              <textarea
                value={field.value}
                onChange={field.onChange}
                placeholder={field.name}
              />
            ) : (
              <input
                type="text"
                value={field.value}
                onChange={field.onChange}
                placeholder={field.name}
              />
            )}
          </div>
        ))}

      {/* Render dynamic items (experience, education, etc.) */}
      {items &&
        items.map((item, index) => (
          <div key={index}>
            {Object.keys(item).map((key, idx) => (
              <div key={idx}>
                <label>{key}</label>
                <input
                  type="text"
                  value={item[key]}
                  onChange={(e) =>
                    onUpdate(index, key, e.target.value)
                  }
                  placeholder={key}
                />
              </div>
            ))}
            <button
              className={removeButtonClass}
              onClick={() => onRemove(index)}
            >
              Remove {title.slice(0, -1)} 
            </button>
          </div>
        ))}

      {/* Add New Item Button */}
      <button className={addButtonClass} onClick={onAdd}>
        Add {title.slice(0, -1)} 
      </button>
    </div>
  );
};

export default Section;

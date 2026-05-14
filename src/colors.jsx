import { useState } from "react";


export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
  const [focusedIndex, setFocusedIndex] = useState(null);

const colors = [
  { name: "Red", hex: "#9D1F1F" },
  { name: "Biege", hex: "#C6B1A0" },
  { name: "Black", hex: "#0E0E0E" },
  { name: "White", hex: "#EFF1F7" }
];

function handleClick(color) {
  setSelectedColor(color)
  navigator.clipboard.writeText(color.hex);
}
function handleMouseEnter(hex) {
  setSelectedColor({ hex, name: null });
}
function handleMouseLeave() {
  setSelectedColor({ hex: null, name: null });
}
function handleFocus(index){
  setFocusedIndex(index);
}
function handleBlur(){
setFocusedIndex(null);
}
function handleKeyDown(e){
  if(e.key === 'Enter' && focusedIndex !== null){
    setSelectedColor(colors[focusedIndex]);
  }
}

return (
  <div className="color-picker">
  <h1>Color Picker</h1>
  <div className="color-list">
    {colors.map((color, index) => (
      <div
        key={index}
        className={`color-item ${focusedIndex === index ? 'focused' : ''}`}
        style={{ backgroundColor: color.hex }}
        onClick={() => handleClick(color)}
        onMouseEnter={() => handleMouseEnter(color.hex)}
        onMouseLeave={handleMouseLeave}
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        onKeyDown={(e) => handleKeyDown(e, index)}
        tabIndex={0}
      >
        {selectedColor.hex === color.hex && (
          <span className="color-code">{selectedColor.name || color.hex}</span>
        )}
      </div>
    ))}
  </div>
</div>
)
};
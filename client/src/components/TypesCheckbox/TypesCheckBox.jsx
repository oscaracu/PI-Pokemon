import { useState } from "react";

const TypesCheckBox = ({ types, setInputs }) => {
  // Creamos un estado para los checkboxs
  const [checkedState, setCheckedState] = useState(
    new Array(types.length).fill(false)
  );

  const handleCheckOnChange = (position) => {
    setCheckedState(new Array(types.length).fill(false));

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    // const checkedTypes = updatedCheckedState.map((currentState, index) =>
    //   currentState ? types[index].id : null
    // );

    const checkedTypes = [];
    updatedCheckedState.forEach((check, index) => {
      if (check) checkedTypes.push(types[index].id);
    });
    console.log(checkedTypes);
    setInputs((values) => ({ ...values, types: checkedTypes }));
  };

  return (
    <ul>
      {types.map((type, index) => (
        <li key={type.id}>
          <input
            type="checkbox"
            name={type.name}
            id={type.name}
            value={type.id}
            checked={checkedState[index]}
            onChange={() => handleCheckOnChange(index)}
          />
          <label htmlFor={type.name}>{type.name}</label>
        </li>
      ))}
    </ul>
  );
};

export default TypesCheckBox;

import { useState } from "react";
import { validate } from "../CreatePokemon/CreatePokemon";

const TypesCheckBox = ({ types, setInputs, setErrors, inputs }) => {
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
    setErrors(validate({ ...inputs, types: checkedTypes }));
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

// export function validate(inputs) {
//   const errors = {};

//   if (!inputs.name) {
//     errors.name = "Name is required";
//   } else if (!/^[a-zA-Z -]+$/.test(inputs.name)) {
//     errors.name = "Name must only contain letters without numbers";
//   }

//   if (!inputs.height) {
//     errors.height = "Height in centimeters is required";
//   } else if (inputs.height < 0 || inputs.height > 1000) {
//     errors.height = "Height must be greater than 0 and less than 1000";
//   }

//   if (!inputs.weight) {
//     errors.height = "Weight in kg is required";
//   } else if (inputs.weight < 0 || inputs.weight > 1000) {
//     errors.height = "Weight must be greater than 0 and less than 1000";
//   }

//   if (inputs.types.length === 0) {
//     errors.types = "You must choose at least one type of pokemon";
//   } else if (inputs.types.length > 2) {
//     errors.types = "You can't select more than 2 types of pokemon";
//   }

//   return errors;
// }

export default TypesCheckBox;

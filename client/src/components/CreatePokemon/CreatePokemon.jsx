const CreatePokemon = (props) => {
  return (
    <>
      <form>
        <label htmlFor="id">Id:</label>
        <input type="number" name="id" id="id" />
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="hp">HP:</label>
        <input type="number" name="hp" id="hp" />
        <label htmlFor="attack">Attack:</label>
        <input type="number" name="attack" id="attack" />
        <label htmlFor="defense">Defense</label>
        <input type="number" name="defense" id="defense" />
        <label htmlFor="speed">Speed</label>
        <input type="number" name="speed" id="speed" />
        <label htmlFor="height">Height</label>
        <input type="number" name="height" id="height" />
        <label htmlFor="weight">Weight</label>
        <input type="number" name="weight" id="weight" />
        <fieldset>
          <legend>Tipo(s)</legend>
          <input type="checkbox" name="normal" id="normal" value="1" />
          Normal<label htmlFor="normal"></label>
        </fieldset>
      </form>
    </>
  );
};

export default CreatePokemon;

const Pokemons = (props) => {
  const { id, name, image, types } = props.data;
  return (
    <>
      <div>
        <img src={image} alt={name} />
        <h1>{name}</h1>
        <p>N.°{id}</p>
        <ul>
          {types.map((type) => (
            <li key={type.id}>{type.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Pokemons;

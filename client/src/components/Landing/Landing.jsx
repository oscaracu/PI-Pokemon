import { Link } from "react-router-dom";
// import { getPokemon } from "../../redux/actions";

const Landing = (props) => {
  // const { count, dispatch, useEffect, useSelector } = props;

  // useEffect(()=> {
  //   const randIdx = Math.floor(Math.random() * count);

  // })

  // useEffect(() => {
  //   dispatch(getPokemon(randIdx === 0 ? 1 : randIdx));
  // }, [dispatch, randIdx]);

  // const { pokemon } = useSelector((state) => state);

  // console.log(pokemon);

  return (
    <>
      <div>
        <img src="" alt="" />
      </div>
      <Link to={"/pokemon"}>Entrar</Link>
    </>
  );
};

export default Landing;

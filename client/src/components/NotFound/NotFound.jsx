import styled from "styled-components";

const baseUrl = "https://pi-pokemon-production-cccc.up.railway.app";

export const NotFoundStyle = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-family: "Fredoka One", cursive;
  font-size: 2em;
  color: #c0392b;
  display: flex;
  justify-content: center;
  align-items: center;

  .error-container {
    width: 100%;
    padding: 40px;
    background-color: #ecf0f1;

    h1 {
      margin: 0;
    }

    .not-found {
      height: 400px;
    }
  }
`;

const NotFound = (props) => {
  const { message } = props;

  return (
    <NotFoundStyle>
      <div className="error-container">
        <img
          className="not-found"
          src={baseUrl + "/images/front/not_found.png"}
          alt="Not found"
        />
        <h1>{message}</h1>
      </div>
    </NotFoundStyle>
  );
};

export default NotFound;

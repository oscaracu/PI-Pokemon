import styled from "styled-components";

export const NotFoundStyle = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
  font-family: "Fredoka One", cursive;
  font-size: 2em;
  color: #c0392b;
  display: flex;
  justify-content: center;
  align-items: center;

  .error-container {
    width: 75%;
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
          src="http://localhost:3001/images/front/not_found.png"
          alt="Not found"
        />
        <h1>{message}</h1>
      </div>
    </NotFoundStyle>
  );
};

export default NotFound;

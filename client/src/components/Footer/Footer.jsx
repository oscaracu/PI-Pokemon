import styled from "styled-components";

const baseUrl = "https://pi-pokemon-production-cccc.up.railway.app";

const StyledFooter = styled.footer`
  font-family: "Secular One", sans-serif;
  background-image: url(${baseUrl}/images/front/red_bg.jpg);
  padding: 5px;
  color: #ecf0f1;
  text-align: center;
  text-shadow: 2px 2px 5px black;

  p {
    margin: 5px;
  }

  span {
    color: #f1c40f;
    font-size: 1.2em;
    padding: 5px;
  }
`;

const Footer = (props) => {
  return (
    <StyledFooter>
      <div>
        <p>
          Made with <span>♥</span> by Oscar Cu | soyHenry WebFT30a_grupo09
        </p>
      </div>
    </StyledFooter>
  );
};

export default Footer;

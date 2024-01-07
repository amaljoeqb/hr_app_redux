import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: var(--neutral-light);
  z-index: 2;
  border-bottom: 1px solid var(--light-grey);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1500px;
    margin: 0 auto;
  }

  .logo {
    display: flex;
    align-items: center;
    color: var(--primary-color);
    padding: 16px 32px;
    column-gap: 16px;
  }

  .logo img {
    width: 40px;
    color: var(--primary-color);
  }

  .logo h1 {
    font-weight: 500;
    margin: 0;
  }

  .logout-button {
    margin-right: 30px;
  }

  @media screen and (max-width: 600px) {
    h1 {
      margin: 12px 0;
      font-size: 20px;
    }

    .logo img {
      width: 25px;
    }

    .logout-button .text {
      display: none;
    }
  }
`;

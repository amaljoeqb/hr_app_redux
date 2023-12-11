import styled from "styled-components";

export const StyledEmployeeDetail = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;


  .form-header {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-header h2 {
    margin: 0;
    display: flex;
  }

  .heading-text {
    margin: 0 8px;
  }

  .submit {
    align-self: flex-end;
  }

  .popup .add-heading,
  .popup .view-edit-heading {
    display: none;
  }

  .view-edit-heading.flip-container,
  .view-edit-heading.flip-container .back,
  .view-edit-heading.flip-container .front {
    margin: 0;
    padding: 0;
    width: auto;
    height: auto;
  }

  .add-popup .add-heading {
    display: block;
  }

  .edit-popup .view-edit-heading,
  .view-popup .view-edit-heading {
    display: block;
  }
`;

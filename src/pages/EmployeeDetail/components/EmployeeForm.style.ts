import styled from "styled-components";

export const StyledEmployeeForm = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 16px;
    max-width: 600px;
  }

  form .field {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    position: relative;
    width: 100%;
    margin-bottom: 24px;
  }

  form .field .error-msg {
    position: absolute;
    top: 100%;
    margin: 4px;
    font-size: 12px;
    color: var(--error-color);
    transition: all 0.3s ease-in-out;
    opacity: 0;
    transform: translateY(10px);
  }

  form .error-msg.show {
    opacity: 1;
    transform: translateY(0);
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    gap: 16px;
    width: 100%;
  }

  form input,
  form textarea,
  .skills-input-container {
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid var(--light-grey);
    font-size: 16px;
    box-shadow: var(--light-shadow);
  }

  input.skill-input {
    border: none;
    padding: 10px 0;
    font-size: 16px;
    color: black;
    display: inline-block;
    pointer-events: none;
    box-shadow: none;
  }

  .field.error input,
  .field.error textarea {
    border: 1px solid var(--error-color);
  }

  .field.error input:focus,
  .field.error textarea:focus {
    border: 1px solid var(--error-color);
  }

  form input:focus,
  form textarea:focus,
  .skills-input-container:has(input:focus) {
    outline: none;
    border: 1px solid var(--dark-grey);
  }

  .dropdown {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    margin-top: 6px;
    background-color: white;
    box-shadow: 0px 8px 16px 0px #00000040;
    z-index: 1;
    max-height: 240px;
    overflow-y: auto;
    font-size: 14px;
    border-radius: 8px;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .input-container:has(input:focus) + .dropdown-content {
    display: block;
  }

  .dropdown-content:hover {
    display: block;
  }

  .dropdown-content a:hover {
    background-color: var(--hover-color);
  }

  .input-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }

  .input-container input {
    width: 100%;
  }

  .suffix-icon {
    opacity: 0;
    position: absolute;
    margin-right: 8px;
    font-weight: 400;
    color: var(--dark-grey);
  }

  .input-container:hover .suffix-icon {
    opacity: 1;
  }

  &.view input:not(.skill-input),
  &.view textarea,
  &.view .skills-input-container {
    border-color: transparent;
    background-color: white;
    transform: translateX(-13px);
    box-shadow: var(--no-shadow);
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    transition: all 0.3s ease-in-out;
  }

  &.view input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    transform: translateX(-10px);
  }

  &.view .error-msg.show {
    opacity: 0;
    transform: translateY(10px);
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    transition: background-color 5000s ease-in-out 0s;
  }

  &.view input:disabled {
    color: var(--text-color);
  }

  &.view input:disabled {
    background-color: transparent;
  }

  &.view .field {
    pointer-events: none;
    margin-bottom: 12px;
  }

  &.view .submit {
    opacity: 0;
    pointer-events: none;
  }

  input,
  textarea,
  .submit,
  .skills-input-container,
  .field,
  .error-msg {
    transition: all 0.3s ease-in-out;
  }

  .skills-input-container {
    cursor: text;
  }

  .skills-input-container .chip {
    margin: 3px 6px 3px 0;
  }

  .field.error .skills-input-container {
    border: 1px solid var(--error-color);
  }

  .field.error .skills-input-container:has(input:focus) {
    border: 1px solid var(--error-color);
  }

  .field.error input.skill-input {
    border: none;
  }

  .skill-input:focus {
    outline: none;
    border: none;
  }

  .skills-input-container:has(:focus) {
    border: 1px solid var(--primary-color);
  }

  .skills-input-container:has(input:focus) .dropdown-content {
    display: block;
  }

  span.close-chip {
    font-size: 14px;
    margin-left: 4px;
    padding: 2px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out,
      background-color 0.1s ease-in-out;
    border-radius: 50%;
  }

  span.close-chip:hover {
    background-color: var(--grey-bg-color);
  }

  .chip p {
    margin: 0;
    font-size: 12px;
    transition: transform 0.3s ease-in-out;
  }

  &.view span.close-chip {
    opacity: 0;
    transform: scale(0);
  }

  &.view p {
    transform: translateX(10px);
  }

  &.view .field.error .error-msg {
    opacity: 0;
  }

  &.view .skill-input {
    opacity: 0;
    transform: translateX(50px);
  }

  @media (max-width: 600px) {
    .row {
      flex-direction: column;
    }
  }
`;

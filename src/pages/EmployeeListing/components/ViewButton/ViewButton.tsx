import { StyledViewButton } from "./ViewButton.style";

export type IView = "grid" | "table";

export interface IViewButton {
  view: IView;
  onChangeView: (view: IView) => void;
}

export function ViewButton({ view, onChangeView }: IViewButton) {
  const onClickView = (view: IView) => {
    onChangeView(view);
  };

  return (
    <StyledViewButton>
      <span
        onClick={() => onClickView("table")}
        className={`material-symbols-outlined half ${
          view === "table" ? "selected" : ""
        }`}
      >
        view_list
      </span>
      <span className="vertical-line"></span>
      <span
        onClick={() => onClickView("grid")}
        className={`material-symbols-outlined half ${
          view === "grid" ? "selected" : ""
        }`}
      >
        view_module
      </span>
    </StyledViewButton>
  );
}

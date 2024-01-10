import { StyledViewButton } from "./ViewButton.style";

export type IView = "grid" | "table";

export interface IViewButton {
  view: IView;
  onChangeView: (view: IView) => void;
}

export function ViewButton({ view, onChangeView }: IViewButton) {
  const onClickView = (clickedView: IView) => {
    if (clickedView !== view) {
      onChangeView(clickedView);
    }
  };

  const getOverlayClass = () => {
    let className = "selected-overlay";
    if (view === "grid") {
      className += " right";
    }
    return className;
  };

  return (
    <StyledViewButton>
      <span
        onClick={() => onClickView("table")}
        className="material-symbols-outlined half"
      >
        view_list
      </span>
      <span
        onClick={() => onClickView("grid")}
        className="material-symbols-outlined half"
      >
        view_module
      </span>
      <div className={getOverlayClass()}></div>
    </StyledViewButton>
  );
}

import { FC } from "react";

interface propTypes {
  score: number;
}

const ProgressBarView: FC<propTypes> = ({ score }) => {
  const maximiumWidth = 120;

  return (
    <>
      <div
        style={{
          height: "5px",
          width: `${maximiumWidth}px`,
          border: "1px solid black",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${score < maximiumWidth ? score : maximiumWidth - 20}%`,
            backgroundColor: "blue",
          }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBarView;

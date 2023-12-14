import "./index.css";

const LoadingComponent = () => {
  return (
    <div className="wrapper-loading">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingComponent;

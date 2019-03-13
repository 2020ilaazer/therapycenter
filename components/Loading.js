export default () => {
  return (
    <>
      <div className="loader-container">
        <div className="inner one" />
        <div className="inner two" />
        <div className="inner three" />
      </div>

      <style jsx>{`
        .loader-container {
          position: absolute;
          top: calc(50% - 32px);
          left: calc(50% - 32px);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          perspective: 800px;
        }

        .inner {
          position: absolute;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        .inner.one {
          left: 0%;
          top: 0%;
          animation: rotate-one 1s linear infinite;
          border-bottom: 4px solid #00d1b2;
        }

        .inner.two {
          right: 0%;
          top: 0%;
          animation: rotate-two 1s linear infinite;
          border-right: 4px solid #00d1b2;
        }

        .inner.three {
          right: 0%;
          bottom: 0%;
          animation: rotate-three 1s linear infinite;
          border-top: 4px solid #00d1b2;
        }

        @keyframes rotate-one {
          0% {
            transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
          }
        }

        @keyframes rotate-two {
          0% {
            transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
          }
        }

        @keyframes rotate-three {
          0% {
            transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
          }
        }
      `}</style>
    </>
  );
};

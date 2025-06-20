import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="wrapper">
          <div className="catContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 733 673"
              className="catbody"
            >
              <path
                fill="#212121"
                d="M111.002 139.5C270.502 -24.5001 471.503 2.4997 621.002 139.5C770.501 276.5 768.504 627.5 621.002 649.5C473.5 671.5 246 687.5 111.002 649.5C-23.9964 611.5 -48.4982 303.5 111.002 139.5Z"
              />
              <path fill="#212121" d="M184 9L270.603 159H97.3975L184 9Z" />
              <path fill="#212121" d="M541 0L627.603 150H454.397L541 0Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 158 564"
              className="tail"
            >
              <path
                fill="#191919"
                d="M5.97602 76.066C-11.1099 41.6747 12.9018 0 51.3036 0V0C71.5336 0 89.8636 12.2558 97.2565 31.0866C173.697 225.792 180.478 345.852 97.0691 536.666C89.7636 553.378 73.0672 564 54.8273 564V564C16.9427 564 -5.4224 521.149 13.0712 488.085C90.2225 350.15 87.9612 241.089 5.97602 76.066Z"
              />
            </svg>
            <div className="text">
              <span className="bigzzz">Z</span>
              <span className="zzz">Z</span>
            </div>
          </div>
          <div className="wallContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 500 126"
              className="wall"
            >
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2={3}
                x2={450}
                y1={3}
                x1={50}
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2={85}
                x2={400}
                y1={85}
                x1={100}
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2={122}
                x2={375}
                y1={122}
                x1={125}
              />
              <line strokeWidth={6} stroke="#7C7C7C" y2={43} x2={500} y1={43} />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2="1.99391"
                x2="115.5"
                y1="43.0061"
                x1="115.5"
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2="2.00002"
                x2={189}
                y1="43.0122"
                x1={189}
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2="2.00612"
                x2="262.5"
                y1="43.0183"
                x1="262.5"
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2="2.01222"
                x2={336}
                y1="43.0244"
                x1={336}
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2="2.01833"
                x2="409.5"
                y1="43.0305"
                x1="409.5"
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2={43}
                x2={153}
                y1="84.0122"
                x1={153}
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2={43}
                x2={228}
                y1="84.0122"
                x1={228}
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2={43}
                x2={303}
                y1="84.0122"
                x1={303}
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2={43}
                x2={378}
                y1="84.0122"
                x1={378}
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2={84}
                x2={192}
                y1="125.012"
                x1={192}
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2={84}
                x2={267}
                y1="125.012"
                x1={267}
              />
              <line
                strokeWidth={6}
                stroke="#7C7C7C"
                y2={84}
                x2={342}
                y1="125.012"
                x1={342}
              />
            </svg>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrapper {
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .catContainer {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .catbody {
    width: 80px;
  }
  .tail {
    position: absolute;
    width: 17px;
    top: 50%;
    animation: tail 0.5s ease-in infinite alternate-reverse;
    transform-origin: top;
  }
  @keyframes tail {
    0% {
      transform: rotateZ(60deg);
    }
    50% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(-20deg);
    }
  }
  .wall {
    width: 300px;
  }
  .text {
    display: flex;
    flex-direction: column;
    width: 50px;
    position: absolute;
    margin: 0px 0px 100px 120px;
  }
  .zzz {
    color: black;
    font-weight: 700;
    font-size: 15px;
    animation: zzz 2s linear infinite;
  }
  .bigzzz {
    color: black;
    font-weight: 700;
    font-size: 25px;
    margin-left: 10px;
    animation: zzz 1.3s linear infinite;
  }
  @keyframes zzz {
    0% {
      color: transparent;
    }
    50% {
      color: black;
    }
    100% {
      color: transparent;
    }
  }
`;

export default Loader;

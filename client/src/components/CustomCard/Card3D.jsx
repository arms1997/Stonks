import { useSpring, animated } from "react-spring";

import "./Card3D.scss";

//react spring calculation taken from docs
const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function Card3D({ photoClassName }) {
  //pass props for defining spring and set to update
  //mass is spring mass, tension is spring energetic load and friction is spring resistance
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    //used 'gentle config'
    config: { mass: 1, tension: 120, friction: 14 },
  }));

  return (
    <animated.div
      className={photoClassName}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
    ></animated.div>
  );
}

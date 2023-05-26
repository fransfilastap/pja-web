"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

export default function ParallaxText({
  children,
  baseVelocity = 100,
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className="flex w-full m-0 overflow-hidden leading-4 tracking-tight bg-black whitespace-nowrap flex-nowrap">
      <motion.div
        className="text-4xl lg:text-9xl text-white font-[500] leading-tight tracking-tight uppercase"
        style={{ x }}
      >
        <span>
          <span className="text-amber-500">✺</span>
          {children}
        </span>
        <span>
          <span className="text-amber-500">✺</span>
          {children}
        </span>
        <span>
          <span className="text-amber-500">✺</span>
          {children}
        </span>
        <span>
          <span className="text-amber-500">✺</span>
          {children}
        </span>
        <span>
          <span className="text-amber-500">✺</span>
          {children}
        </span>
        <span>
          <span className="text-amber-500">✺</span>
          {children}
        </span>
      </motion.div>
    </div>
  );
}

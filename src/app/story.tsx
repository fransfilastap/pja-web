"use client";

import Stories from "react-insta-stories";
import { motion } from "framer-motion";

const stories: any[] = [
  {
    url: "https://res.cloudinary.com/dyduzvx5b/video/upload/v1685054136/Download_2_rjso9z.mp4",
    type: "video",
  },
  {
    url: "https://res.cloudinary.com/dyduzvx5b/video/upload/v1685032805/Download_1_hmt6ry.mp4",
    type: "video",
  },
  {
    url: "https://res.cloudinary.com/dyduzvx5b/video/upload/v1685032805/Download_1_hmt6ry.mp4",
    type: "video",
  },
];
export default function PJAStory() {
  return (
    <motion.div
      className="rounded-lg shadow-2xl shadow-black/30 max-w-max"
      initial={{ y: 400, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Stories
        defaultInterval={1500}
        stories={stories}
        loop={true}
        width={320}
        height={620}
      />
    </motion.div>
  );
}

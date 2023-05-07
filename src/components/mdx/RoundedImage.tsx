import Image from "next/image";
import { DetailedHTMLProps, FunctionComponent, ImgHTMLAttributes } from "react";

const RoundedImage: FunctionComponent<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = (props) => {
  return (
    <Image
      className={"rounded-lg border border-gray-800"}
      placeholder="blur"
      src={`${props.src}`}
      alt={props.alt ?? ""}
    />
  );
};

export default RoundedImage;

import { ImgHTMLAttributes } from "react";

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      src="/assets/resteelLogo.png"
      alt="Resteel Logo"
      className={`h-auto w-auto ${props.className || ""}`}
    />
  );
}

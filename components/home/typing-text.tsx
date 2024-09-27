import { TypeAnimation } from "react-type-animation";

export default function TypingText() {
  return (
    <div className="text-[1.5em]">
      <TypeAnimation
        preRenderFirstString={true}
        sequence={[500, "Buy textbooks", 1000, "Sell textbooks", 1000]}
        speed={50}
        style={{ fontSize: "1em", display: "inline-block" }} // Ensuring the text stays inline
        repeat={Infinity}
      />
      <br className="md:hidden flex" />
      <span className="ml-2">with your fellow students.</span>{" "}
    </div>
  );
}

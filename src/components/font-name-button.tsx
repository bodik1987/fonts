import { Font } from "../App";

type Props = {
  font: Font;
  selectedFont: Font;
  setSelectedFont: React.Dispatch<React.SetStateAction<Font>>;
  onClose?: () => void;
};

export default function FontNameButton({
  font,
  selectedFont,
  setSelectedFont,
  onClose,
}: Props) {
  return (
    <button
      className={`${font.font} ${
        selectedFont === font ? "bg-[#FCE35B]" : "bg-white"
      } px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-right transition-all`}
      onClick={() => {
        setSelectedFont(font);
        onClose && onClose();
      }}
    >
      <span className="text-xl md:text-2xl">{font.name}</span>
    </button>
  );
}

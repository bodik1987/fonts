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
        selectedFont === font ? "border-[#FC8C67]" : "border-transparent"
      } border-4 bg-white px-2 md:px-3 py-1 md:py-2 whitespace-nowrap text-right`}
      onClick={() => {
        setSelectedFont(font);
        onClose && onClose();
      }}
    >
      <span className="text-xl">{font.name}</span>
    </button>
  );
}

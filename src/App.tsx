import { useState } from "react";
import FontNameButton from "./components/font-name-button";
import { fonts } from "./data";
import FontWeightButton from "./components/font-weight-button";
import useLocalStorage from "./hooks/useLocalStorage";
import Slider from "./components/slider";

export type Font = {
  id: number;
  name: string;
  font: string;
  weights: string[];
};

export default function App() {
  const [selectedFont, setSelectedFont] = useState<Font>(fonts[0]);
  const [secondFont, setSecondFont] = useState<Font>(fonts[0]);
  const [selectedWeight, setSelectedWeight] = useState<string>(
    fonts[0].weights[0]
  );

  const [localText, setLocalText] = useLocalStorage<string>("localText", "");
  const [input, setInput] = useState<string>(localText);

  const [fontSize, setFontSize] = useState(24);

  const handleSliderChange = (value: number) => {
    setFontSize(value);
  };

  const [fontsList, setFontsList] = useState(false);

  return (
    <main className="max-w-[1400px] mx-auto p-4 md:p-6">
      <p
        className={`${selectedFont.font} ${selectedWeight} text-2xl md:text-3xl bg-white text-neutral-800 p-3 md:p-4`}
      >
        <span className="text-[#9B3C3C]">FONTS for UA | PL | EN </span>
        1234567890 іZażółć Уукїнас ьимерхоті єgęśląjaźń $ ₴ € Ї=-+.,!@#$%^&*()_
      </p>

      <p className="mt-6 label">Fonts</p>
      <div className="mt-2 flex flex-wrap gap-1.5 bg-[#1A1A1A] p-2">
        {fonts.map((font) => (
          <FontNameButton
            key={font.id}
            font={font}
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
          />
        ))}
      </div>

      <div className="mt-4 flex items-end gap-6">
        <div className="w-full max-w-md">
          <p className="mb-3 label">Font size</p>
          <Slider
            min={14}
            max={72}
            value={fontSize}
            onChange={handleSliderChange}
          />
        </div>
        <div>
          <p className="label">Font weight</p>
          <div className="mt-2 flex space-x-2 bg-[#e0e0e0] p-[2px] rounded-lg">
            {selectedFont.weights.map((weight) => (
              <FontWeightButton
                key={weight}
                weight={weight}
                selectedWeight={selectedWeight}
                setSelectedWeight={setSelectedWeight}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="label">Second font</p>
          <div className="mt-2 w-full flex flex-col gap-2 relative whitespace-nowrap">
            {fontsList && (
              <>
                <div
                  onClick={() => setFontsList(false)}
                  className="fixed bg-black/45 backdrop-grayscale inset-0 z-10"
                />
                <div className="absolute bottom-full -translate-y-2 right-0 flex flex-col bg-white max-h-[280px] overflow-y-auto z-20  rounded-md">
                  {fonts.map((font) => (
                    <FontNameButton
                      key={font.id}
                      font={font}
                      selectedFont={secondFont}
                      setSelectedFont={setSecondFont}
                      onClose={() => setFontsList(false)}
                    />
                  ))}
                </div>
              </>
            )}
            <button
              onClick={() => setFontsList(!fontsList)}
              className="w-fit h-10 px-3 bg-[#FCE35B] font-medium rounded-md"
            >
              {secondFont.name}
            </button>
          </div>
        </div>
      </div>

      <input
        style={{ fontSize: `${fontSize}px` }}
        type="text"
        value={input}
        placeholder="Enter text"
        className={`${selectedFont.font} ${selectedWeight} mt-8 p-4 outline-none focus:border-4 focus:border-[#9B3C3C] leading-none w-full border-4 border-[#FC8C67] rounded-t-md`}
        onChange={(e) => setInput(e.target.value)}
        onBlur={() => setLocalText(input)}
      />

      <div
        style={{ fontSize: `${fontSize}px` }}
        className={`${secondFont.font} ${selectedWeight} w-full bg-white/50 text-black/80 p-4 border-b-4 border-x-4 border-[#FCE35B] rounded-b-md overflow-hidden`}
      >
        {input}
      </div>

      <p className="mt-8 label">Downloads</p>
      <div className="mt-1 flex gap-4">
        <a
          className="block w-fit bg-[#0A8064] text-white px-4 py-3 font-medium text-sm uppercase rounded-md"
          href="/fonts.zip"
          download="fonts.zip" // Sets the name of the downloaded file
        >
          All fonts
        </a>
        <a
          className="block w-fit bg-[#0A8064] text-white px-4 py-3 font-medium text-sm uppercase rounded-md"
          href="/HighLogicFontCreatorPro9.zip"
          download="HighLogicFontCreatorPro9.zip" // Sets the name of the downloaded file
        >
          FontCreator Pro 9
        </a>
      </div>
    </main>
  );
}

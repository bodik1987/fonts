import { useState } from "react";
import FontNameButton from "./components/font-name-button";
import { fonts } from "./data";
import FontWeightButton from "./components/font-weight-button";
import useLocalStorage from "./hooks/useLocalStorage";

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

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value));
  };

  const [fontsList, setFontsList] = useState(false);

  return (
    <main className="max-w-[1400px] mx-auto p-4 md:p-6">
      <p
        className={`${selectedFont.font} ${selectedWeight} text-2xl md:text-4xl bg-white/50 text-neutral-800 p-3 md:p-4`}
      >
        <span className="text-[#9B3C3C]">FONTS for UA | PL | EN </span>
        1234567890 іZażółć Уукїнас ьимерхоті єgęśląjaźń $ ₴ € Ї=-+.,!@#$%^&*()_
      </p>

      <p className="mt-6 text-xs font-medium text-neutral-600">Fonts</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {fonts.map((font) => (
          <FontNameButton
            key={font.id}
            font={font}
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
          />
        ))}
      </div>

      <div className="mt-4 flex items-end gap-4">
        <div className="w-full max-w-md">
          <p className="text-xs font-medium text-neutral-600">Font size</p>
          <input
            className="w-full h-3 bg-white appearance-none cursor-pointer range-lg"
            type="range"
            min={14}
            max={72}
            step={1}
            value={fontSize}
            onChange={handleSliderChange}
          />
        </div>
        <div>
          <p className="text-xs text-right font-medium text-neutral-600">
            Font weight
          </p>
          <div className="mt-1 flex space-x-2">
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
          <p className="mt-4 text-right text-xs font-medium text-neutral-600 whitespace-nowrap">
            Second font
          </p>
          <div className="mt-1 w-full flex flex-col gap-2 relative whitespace-nowrap">
            {fontsList && (
              <>
                <div
                  onClick={() => setFontsList(false)}
                  className="fixed bg-black/25 inset-0 z-10 "
                />
                <div className="absolute bottom-full -translate-y-2 right-0 flex flex-col bg-white max-h-[280px] overflow-y-auto z-20">
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
              className="w-fit h-10 px-3 bg-white ring-2 ring-[#FC8C67]"
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
        className={`${selectedFont.font} ${selectedWeight} mt-8 p-4 outline-none focus:border-4 focus:border-[#9B3C3C] leading-none w-full border-4 border-yellow-500`}
        onChange={(e) => setInput(e.target.value)}
        onBlur={() => setLocalText(input)}
      />

      <div
        style={{ fontSize: `${fontSize}px` }}
        className={`${secondFont.font} ${selectedWeight} w-full bg-white/50 p-4`}
      >
        {input}
      </div>

      <p className="mt-8 text-xs font-medium text-neutral-600">Downloads</p>
      <div className="mt-1 flex gap-4">
        <a
          className="block w-fit bg-[#0A8064] text-white px-4 py-3"
          href="/fonts.zip" // Path to the file in the public folder
          download="fonts.zip" // Sets the name of the downloaded file
        >
          All fonts
        </a>
        <a
          className="block w-fit bg-[#2473AD] text-white px-4 py-3"
          href="/HighLogicFontCreatorPro9.zip" // Path to the file in the public folder
          download="HighLogicFontCreatorPro9.zip" // Sets the name of the downloaded file
        >
          FontCreator Pro 9
        </a>
      </div>
    </main>
  );
}

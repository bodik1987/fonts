type Props = {
  weight: string;
  selectedWeight: string;
  setSelectedWeight: React.Dispatch<React.SetStateAction<string>>;
};

export default function FontWeightButton({
  weight,
  selectedWeight,
  setSelectedWeight,
}: Props) {
  const getWeight = () => {
    switch (weight) {
      case "font-normal":
        return "N";
      case "font-medium":
        return "M";
      case "font-semibold":
        return "S";
      case "font-bold":
        return "B";
    }
  };

  return (
    <button
      onClick={() => setSelectedWeight(weight)}
      className={`${
        weight === selectedWeight
          ? "bg-white text-black shadow-lg"
          : "text-black/50"
      } ${weight} w-10 h-8 rounded-md`}
      key={weight}
    >
      {getWeight()}
    </button>
  );
}

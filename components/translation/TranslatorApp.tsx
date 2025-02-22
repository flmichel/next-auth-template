"use client";

import { Constituent, Part, Word } from "@/lib/sentenceData";
import { useState, ChangeEvent } from "react";
import { Button } from "../ui/button";

export default function TranslatorApp() {
  const [userMessage, setUserMessage] = useState<string>("");
  const [aiError, setAiError] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<Sentence | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (): Promise<void> => {
    if (!userMessage.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/translator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      if (response.ok) {
        setAiResponse(data);
      } else {
        setAiError("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setAiError("An error occurred while fetching the AI response.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setUserMessage(e.target.value);
  };

  return (
    <div className="container flex flex-col p-4 h-screen justify-center">
      <div className="space-x-2">
        <textarea
          id="user-input"
          value={userMessage}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-lg bg-gray-100"
          placeholder="Paste or write some Japanese text..."
        />
      </div>

      {/* Center the button vertically */}
      <div className="flex justify-center mt-4">
        <Button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={sendMessage}
        >
          {loading ? "Translating..." : "Translate"}
        </Button>
      </div>
      <br />
      {aiError && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        >
          <h3>AI Error:</h3>
          <p>{aiError}</p>
        </div>
      )}
      {aiResponse && <Sentence sentence={aiResponse} />}
    </div>
  );
}

type WordProps = {
  word: Word;
  selectWord: (word: Word) => void;
  unselectWord: () => void;
};

const getColorForType = (type: string): string => {
  switch (type) {
    case "noun":
      return "blue";
    case "verb":
      return "green";
    case "adjective":
      return "orange";
    case "adverb":
      return "purple";
    case "particle":
      return "brown";
    case "conjunction":
      return "pink";
    case "symbolType":
      return "gray";
    case "filler":
      return "yellow";
    case "other":
      return "black";
    default:
      return "black";
  }
};

const WordComponent: React.FC<WordProps> = ({
  word,
  selectWord,
  unselectWord,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Handle hover state
  const handleMouseEnter = () => {
    selectWord(word);
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicked(false);
    unselectWord();
  };
  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <span
      className={`relative cursor-pointer mr-1 ml-1 whitespace-nowrap ${
        isHovered ? "bg-black/20" : "bg-transparent"
      }`}
      style={{
        color: getColorForType(word.type),
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {word.word}

      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: "-200%",
            left: "0", // Center it horizontally
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          {word.furigana}
        </div>
      )}

      {/* Translation display */}
      {isClicked && (
        <div
          style={{
            position: "absolute",
            top: "100%", // Place below the word
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          {word.translation}
        </div>
      )}
    </span>
  );
};

function isConstituent(obj: any): obj is Constituent {
  return obj && obj.constituentType !== undefined;
}

type ConstituentProps = {
  constituent: Constituent;
  selectPart: (part: Part) => void;
  unselectPart: () => void;
};

const ConstituentComponent: React.FC<ConstituentProps> = ({
  constituent,
  selectPart,
  unselectPart,
}) => {
  const handleMouseEnter = () => {
    selectPart(constituent);
    console.log("test");
  };
  const handleMouseLeave = () => unselectPart();
  const unselectChild = () => selectPart(constituent);

  return (
    <span
      className="flex items-center border border-black p-1 m-1 rounded-[5px] hover:bg-gray-200 transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {constituent.parts.map((part, index) => (
        <span key={index}>
          {isConstituent(part) ? (
            <ConstituentComponent
              constituent={part}
              selectPart={selectPart}
              unselectPart={unselectChild}
            />
          ) : (
            <WordComponent
              word={part}
              selectWord={selectPart}
              unselectWord={unselectChild}
            />
          )}
        </span>
      ))}
    </span>
  );
};

const Sentence: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  const unselectPart = () => setSelectedPart(null);

  return (
    <>
      <div className="flex flex-nowrap items-center">
        {sentence.parts.map((part, index) => (
          <span key={index}>
            {isConstituent(part) ? (
              <ConstituentComponent
                constituent={part}
                selectPart={setSelectedPart}
                unselectPart={unselectPart}
              />
            ) : (
              <WordComponent
                word={part}
                selectWord={setSelectedPart}
                unselectWord={unselectPart}
              />
            )}
          </span>
        ))}
      </div>
      <div>
        <p>{selectedPart ? selectedPart.translation : sentence.translation}</p>
      </div>
    </>
  );
};

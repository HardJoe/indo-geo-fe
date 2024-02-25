import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import provinces from "@/lib/provinces.json";

const getNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * provinces.length);
    const randomProvince = provinces[randomIndex];
    const imagePath = `/images/provinces/${randomProvince.nameEN.replaceAll(
        " ",
        "_",
    )}_in_Indonesia.svg`;
    return { ...randomProvince, imagePath };
};

const ProvinceQuiz = () => {
    const [question, setQuestion] = useState(getNewQuestion());
    const [answer, setAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);

    let solutions = [question.nameID, question.acronym];
    solutions = solutions.filter((s) => s !== "");
    const lowerSolutions = solutions.map((s) => s.toLowerCase());

    const handleChange = (e) => {
        setAnswer(e.target.value);

        if (lowerSolutions.includes(e.target.value.toLowerCase())) {
            setIsCorrect(true);
            setTimeout(() => {
                setIsCorrect(false);
            }, 1500);
            setAnswer("");
            setQuestion(getNewQuestion());
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <img src={question.imagePath} alt={question.nameID} />
            <div className="h-6 text-center align-middle">
                {isCorrect && <span className="text-green-500">Benar!</span>}
            </div>
            <Input
                type="text"
                className="text-center"
                value={answer}
                onChange={handleChange}
            />
        </div>
    );
};

export default ProvinceQuiz;

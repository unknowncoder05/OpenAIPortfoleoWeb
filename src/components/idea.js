import React, { useState } from "react";
import { critic } from "../api/api";

const Idea = () => {
    const [inputValue, setinputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(undefined);


    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault();
        const response = await critic(inputValue);
        setResults(response)
        setIsLoading(false)
    };

    const handleChange = (event) => {
        setinputValue(event.target.value);
    };

    let resultsSection = '';
    if (isLoading) {
        resultsSection = <div className="loading">
            <p>Loading...</p>
        </div>

    } else {
        if (results) {
            resultsSection = <div className="results">
                <p className="subtitle">pros:</p>
                <p className="display-linebreak">{results.pros}</p>
                <p className="subtitle">cons:</p>
                <p className="display-linebreak">{results.cons}</p>
                <p className="subtitle">state of the art:</p>
                <p className="display-linebreak">{results.state_of_the_art}</p>
                <p className="subtitle">suggested pitch: </p>
                <p className="display-linebreak">{results.pitch}</p>

                <p className="subtitle">viability: </p>
                <p className="display-linebreak">{results.viability}</p>
                <p className="subtitle">innovation: </p>
                <p className="display-linebreak">{results.innovation}</p>
                <p className="subtitle">resources: </p>
                <p className="display-linebreak">{results.resources}</p>
            </div>
        } else {
            resultsSection = <div className="loading">
                <p>...</p>
            </div>
        }
    }

    return (
        <div className="">
            <h1>input your Idea!</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" className="" value={inputValue} onChange={handleChange} autoFocus={true} />
                <button>send</button>
            </form>
            {resultsSection}
        </div>
    );
};

export default Idea;
import React, { useState } from 'react';
import axios from 'axios';

const DataForm = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedSections, setSelectedSections] = useState([]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jsonData = JSON.parse(input);
            const res = await axios.post('https://bajaj-backend-chi.vercel.app/bfhl', { data: jsonData });
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON or failed to fetch data');
            console.error(err);
        }
    };

    const handleSectionChange = (e) => {
        const { value, checked } = e.target;
        setSelectedSections((prev) => 
            checked ? [...prev, value] : prev.filter((section) => section !== value)
        );
    };

    return (
        <div>
            <h1>Submit Your Data</h1>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={input} 
                    onChange={handleInputChange} 
                    placeholder='Enter JSON'
                    rows="5" 
                    cols="50"
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {response && (
                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            value="numbers" 
                            onChange={handleSectionChange} 
                        />
                        Numbers
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            value="alphabets" 
                            onChange={handleSectionChange} 
                        />
                        Alphabets
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            value="highest_alphabet" 
                            onChange={handleSectionChange} 
                        />
                        Highest Alphabet
                    </label>
                    {selectedSections.includes('numbers') && (
                        <div>
                            <h2>Numbers</h2>
                            <ul>
                                {response.numbers.map((num, index) => (
                                    <li key={index}>{num}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {selectedSections.includes('alphabets') && (
                        <div>
                            <h2>Alphabets</h2>
                            <ul>
                                {response.alphabets.map((char, index) => (
                                    <li key={index}>{char}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {selectedSections.includes('highest_alphabet') && (
                        <div>
                            <h2>Highest Alphabet</h2>
                            <ul>
                                {response.highest_alphabet.map((char, index) => (
                                    <li key={index}>{char}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataForm;

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

            if (!jsonData.data || !Array.isArray(jsonData.data)) {
                throw new Error('Invalid data format. Expected an array of strings.');
            }

            const res = await axios.post('https://bajajfrontend-seven.vercel.app/bfhl', jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setResponse(res.data);
            setError('');
        } catch (err) {
            setError(`Error: ${err.message}`);
            console.error('Error during request:', err);
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                            value="highest_lowercase_alphabet" 
                            onChange={handleSectionChange} 
                        />
                        Highest Lowercase Alphabet
                    </label>
                    <div>
                        <h2>Filtered Response</h2>
                        {selectedSections.includes('numbers') && response.numbers && (
                            <div>
                                <h3>Numbers</h3>
                                <ul>
                                    {response.numbers.map((num, index) => (
                                        <li key={index}>{num}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {selectedSections.includes('alphabets') && response.alphabets && (
                            <div>
                                <h3>Alphabets</h3>
                                <ul>
                                    {response.alphabets.map((char, index) => (
                                        <li key={index}>{char}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {selectedSections.includes('highest_lowercase_alphabet') && response.highest_lowercase_alphabet && (
                            <div>
                                <h3>Highest Lowercase Alphabet</h3>
                                <ul>
                                    <li>{response.highest_lowercase_alphabet}</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataForm;

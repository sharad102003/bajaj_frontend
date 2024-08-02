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
        <div style={{ padding: '20px' }}>
            <h1>Submit Your Data</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>API Input</label>
                    <textarea 
                        value={input} 
                        onChange={handleInputChange} 
                        placeholder='Enter JSON'
                        rows="3" 
                        cols="50"
                        style={{ display: 'block', margin: '10px 0' }}
                    />
                    <button type="submit" style={{ display: 'block' }}>Submit</button>
                </div>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <div>
                        <label>Multi Filter</label>
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
                                value="highest_alphabet" 
                                onChange={handleSectionChange} 
                            />
                            Highest Alphabet
                        </label>
                    </div>
                    <div>
                        {selectedSections.includes('numbers') && (
                            <div>
                                <h2>Filtered Response</h2>
                                <p>Numbers: {response.numbers.join(',')}</p>
                            </div>
                        )}
                        {selectedSections.includes('highest_alphabet') && (
                            <div>
                                <h2>Highest Alphabet</h2>
                                <p>Highest Alphabet: {response.highest_alphabet}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataForm;

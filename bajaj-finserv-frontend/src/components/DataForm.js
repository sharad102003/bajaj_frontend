import React, { useState } from 'react';
import axios from 'axios';

const DataForm = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(''); // Use a single filter

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

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value); // Update filter based on dropdown selection
    };

    return (
        <div style={{ margin: '20px' }}>
            <h1>API Input</h1>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={input} 
                    onChange={handleInputChange} 
                    placeholder='Enter JSON'
                    rows="5" 
                    cols="50"
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <button type="submit" style={{ marginBottom: '10px' }}>Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {response && (
                <div>
                    <label>Multi Filter</label>
                    <select onChange={handleFilterChange} value={selectedFilter}>
                        <option value="">--Select--</option>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>

                    <div>
                        <h2>Filtered Response</h2>
                        {selectedFilter === 'numbers' && response.numbers && (
                            <div>
                                <strong>Numbers:</strong> {response.numbers.join(', ')}
                            </div>
                        )}
                        {selectedFilter === 'alphabets' && response.alphabets && (
                            <div>
                                <strong>Alphabets:</strong> {response.alphabets.join(', ')}
                            </div>
                        )}
                        {selectedFilter === 'highest_alphabet' && response.highest_alphabet && (
                            <div>
                                <strong>Highest Alphabet:</strong> {response.highest_alphabet}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataForm;

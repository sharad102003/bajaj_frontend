import React, { useState } from 'react';
import axios from 'axios';

const DataForm = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');

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
        setSelectedFilter(e.target.value);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Submit Your Data</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Enter JSON'
                    rows="5"
                    cols="50"
                    style={{ marginBottom: '20px' }}
                />
                <br />
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Submit
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div style={{ marginTop: '30px' }}>
                    <div>
                        <h2>Multi Filter</h2>
                        <select value={selectedFilter} onChange={handleFilterChange}>
                            <option value="">Select Filter</option>
                            <option value="numbers">Numbers</option>
                            <option value="alphabets">Alphabets</option>
                        </select>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <h2>Filtered Response</h2>
                        {selectedFilter === 'numbers' && response.numbers && (
                            <div>
                                <h3>Numbers</h3>
                                <p>{response.numbers.join(',')}</p>
                            </div>
                        )}
                        {selectedFilter === 'alphabets' && response.alphabets && (
                            <div>
                                <h3>Alphabets</h3>
                                <p>{response.alphabets.join(',')}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataForm;

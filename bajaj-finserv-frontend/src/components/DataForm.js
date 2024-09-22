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
            // Replace curly quotes with straight quotes in the input JSON
            const correctedInput = input.replace(/[“”]/g, '"');

            // Parse the corrected input to JSON
            const jsonData = JSON.parse(correctedInput);

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
        <div style={{ width: '500px', margin: '0 auto', paddingTop: '20px' }}>
            <h1 style={{ textAlign: 'left' }}>API Input</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder='{"data":["M","1","334","4","B"]}'
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        marginBottom: '20px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '18px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Submit
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div style={{ marginTop: '30px' }}>
                    <h2 style={{ textAlign: 'left', marginBottom: '10px' }}>Multi Filter</h2>
                    <select
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            marginBottom: '20px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value="">Select Filter</option>
                        <option value="numbers">Numbers</option>
                        <option value="alphabets">Alphabets</option>
                    </select>
                    <div style={{ marginTop: '10px' }}>
                        <h2 style={{ textAlign: 'left' }}>Filtered Response</h2>
                        {selectedFilter === 'numbers' && response.numbers && (
                            <div>
                                <h3 style={{ textAlign: 'left' }}>Numbers:</h3>
                                <p style={{ textAlign: 'left' }}>{response.numbers.join(',')}</p>
                            </div>
                        )}
                        {selectedFilter === 'alphabets' && response.alphabets && (
                            <div>
                                <h3 style={{ textAlign: 'left' }}>Alphabets:</h3>
                                <p style={{ textAlign: 'left' }}>{response.alphabets.join(',')}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataForm;

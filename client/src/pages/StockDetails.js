import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockWidget from '../components/StockWidget';
import { useParams } from 'react-router-dom';

const StockDetail = () => {
    const { ticker } = useParams();
    const [stockData, setStockData] = useState({});

    useEffect(() => {
        // Fetch news articles for the stock
        axios.get(`http://localhost:5001/api/news/${ticker}`)
        .then(() => {
            // Trigger sentiment aggregation
            axios.post(`http://localhost:5001/api/aggregated/aggregate/${ticker}`)
            .then(() => {
                // Fetch aggregated sentiment data
                axios.get(`http://localhost:5001/api/aggregated/${ticker}`)
                .then(response => {
                    setStockData({
                        name: ticker, // Ideally, this should be fetched or translated from a name map or API
                        ticker,
                        sentiment: response.data.averageCompound
                    });
                })
                .catch(error => console.error('Error fetching aggregated data:', error));
            })
            .catch(error => console.error('Error triggering aggregation:', error));
        })
        .catch(error => console.error('Error fetching news:', error));
    }, [ticker]);

    return (
        <div>
            <h1>Stock Detail for {ticker}</h1>
            <StockWidget {...stockData} />
        </div>
    );
};

export default StockDetail;

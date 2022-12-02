import React from 'react';
import {useState, useEffect} from 'react';

const Loader = (props) => {
    const [showLoading, setShowLoading] = useState(true);
    console.log(props);

    useEffect(() => {
        setTimeout(() => {
            setShowLoading(props.loading);
        },1000)

    }, [props.loading]);
    return (
        <>
        {showLoading ? (
            <div className="loading">⌛Loading...</div>
        ) : (
        <>
            {props.children}
        </>
        )}
        </>
    )
}

export default Loader;

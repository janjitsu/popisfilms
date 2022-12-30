import React from 'react';
import {useState, useEffect, memo} from 'react';

const Loader = (props) => {
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowLoading(false);
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

export default memo(Loader);

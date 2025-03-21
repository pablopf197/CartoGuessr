import React from 'react';
import PropTypes from 'prop-types';

function Score({ correct, maxFlags, className }) {
    return (
        <div className={`${className}`}>
            <h2>SCORE</h2>
            <h3>{correct}/{maxFlags}</h3>
        </div>
    );
}

Score.propTypes = {
    correct: PropTypes.number.isRequired,
    maxFlags: PropTypes.number.isRequired,
};

export default Score;
import React from "react";

const JobListItem = ({ id, title, url }) => {
    return (
        <div key={id}>
            <p>{title}</p>
            <p>{url}</p>
        </div>
    );
};

export default JobListItem;

// USE USEREDUCER FOR LOADING STATE
// when to use context vs redux vs usereducer
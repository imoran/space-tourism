import React, { useState, useEffect } from "react";
import JobListItem from "./JobListItem";

const JobList = () => {
    const [jobIds, setJobIds] = useState([]);
    const [jobsFromId, setJobsFromId] = useState([]);
    const JOB_ID_FETCH_URL = "https://hacker-news.firebaseio.com/v0/jobstories.json";
    const JOB_DETAIL_FETCH_BASE_URL = "https://hacker-news.firebaseio.com/v0/item/";

    useEffect(() => {
        const getJobIds = async() => {
            try {
                const response = await fetch(JOB_ID_FETCH_URL);

                if (response.ok) {
                    const jobIdData = await response.json();
                    setJobIds(jobIdData);
                }
            } catch(err) {
                console.log(err)
            }
        }

        getJobIds();
    }, [jobIds]);

    useEffect(() => {
        const getJobsFromIds = async() => {
            try {
                const jobPromises = jobIds.map(async(jobId) => {
                    const response = await fetch(JOB_DETAIL_FETCH_BASE_URL + `${jobId}.json`);

                    if (response.ok) {
                        const jobData = await response.json();
                        return jobData;
                    }
                });

                const jobs = await Promise.all(jobPromises);
                setJobsFromId(jobs);
            } catch(err) {
                console.log(err);
            }
        };

        getJobsFromIds();

    }, [jobsFromId]);

    const renderContent = () => {
        if (!jobIds || !jobsFromId) {
            return <p>Error</p>;
        } else if (jobIds.length > 0 && jobsFromId.length > 0) {
            const jobs = jobsFromId.map((job) => {
                return (
                    <JobListItem 
                        id={job.id} 
                        title={job.title} 
                        url={job.url}
                    />         
                );
            })
            return jobs;
        }
        return <p>Loading. . .</p>;
    }

    return (
        <>
            <h1>HN Jobs</h1>
            {renderContent()}
        </>
    );
};

export default JobList;
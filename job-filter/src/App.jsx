/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [filteredJobs, setFilteredJobs] = useState([]);

  // function handleAddSelectedTag(tag) {
  //   setSelectedTag((arr) => [...arr, tag]);
  // }
  // console.log(selectedTag);

  // function handleRenderFilteredJobs() {
  //   setJobs((jobs) => [...jobs]);
  // }

  // const uniqueTags = new Set(selectedTag);

  useEffect(() => {
    const controller = new AbortController();

    const getJobs = async function () {
      const res = await fetch("./data.json");
      const data = await res.json();

      setJobs(data);
      console.log(jobs);
      setFilteredJobs(data);
    };
    getJobs();

    return function () {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (selectedTags.size === 0) {
      setFilteredJobs(jobs);
    } else {
      // const newFilteredJobs = jobs.filter((job) =>
      //   [...selectedTags].every((tag) => {
      //     job.languages.includes(tag) || tag === job.level || tag === job.role;
      //   })
      // );
      // const newFilteredJobs = jobs.filter((job) => job.role === "Fullstack");
      const newFilteredJobs = jobs.filter((job) => {
        const isMatch = Array.from(selectedTags).every((tag) => {
          const languageMatch = job.languages
            .map((lang) => lang.toLowerCase())
            .includes(tag.toLowerCase());
          const levelMatch = job.level.toLowerCase() === tag.toLowerCase();
          const roleMatch = job.role.toLowerCase() === tag.toLowerCase();

          return languageMatch || levelMatch || roleMatch;
        });
        return isMatch;
      });
      console.log("Filtered Jobs:", newFilteredJobs);
      setFilteredJobs(newFilteredJobs);
    }
  }, [selectedTags, jobs]);

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => {
      const newTags = new Set(prevTags);
      if (newTags.has(tag)) {
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }
      console.log("Selected Tags:", Array.from(newTags));
      return newTags;
    });
  };

  const handleClearTags = () => {
    setSelectedTags(new Set());
  };

  return (
    <div className="wrapper">
      {selectedTags.size > 0 ? (
        <TagList
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
          onClearClick={handleClearTags}
        />
      ) : (
        ""
      )}
      <JobList
        jobs={jobs}
        filteredJobs={filteredJobs}
        onTagClick={handleTagClick}
      />
    </div>
  );
}

function TagList({ selectedTags, onTagClick, onClearClick }) {
  return (
    <div className="selected-tags">
      {[...selectedTags]?.map((tag) => (
        <button key={tag} className="tag-btn" onClick={() => onTagClick(tag)}>
          <span className="btn-text"> {tag}</span>
          <span className="icon-remove">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
              <path
                // fill="#FFF"
                fill-rule="evenodd"
                d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
              />
            </svg>
          </span>
        </button>
      ))}
      <button className="clear-btn" onClick={onClearClick}>
        Clear
      </button>
    </div>
  );
}

function JobList({ filteredJobs, onTagClick }) {
  return (
    <ul className="job-list">
      {filteredJobs?.map((job) => (
        <Job job={job} key={job.id} onTagClick={onTagClick} />
      ))}
    </ul>
  );
}

function Job({ job, onTagClick }) {
  return (
    <li className={`job ${job.new || job.featured ? "tagged-job" : ""}`}>
      <img src={job.logo} />
      <div className="job-info">
        <div className="company">
          <p className="company-name"> {job.company}</p>
          {job.new === true ? <p className="new-tag">NEW</p> : ""}
          {job.featured === true ? (
            <p className="featured-tag">FEATURED</p>
          ) : (
            ""
          )}
        </div>
        <h3 className="job-position">{job.position}</h3>
        <div className="job-details">
          <p>{job.postedAt}</p>
          <p>{job.contract}</p>
          <p>{job.location}</p>
        </div>
      </div>
      <div className="tag-list">
        <button className="tag-btn" onClick={() => onTagClick(job.level)}>
          {job.level}
        </button>
        <button className="tag-btn" onClick={() => onTagClick(job.role)}>
          {job.role}
        </button>
        {job.languages.map((language) => (
          <button
            key={language}
            className="tag-btn"
            onClick={() => onTagClick(language)}
          >
            {language}
          </button>
        ))}
      </div>
    </li>
  );
}

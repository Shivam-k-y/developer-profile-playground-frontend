
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchProjectsBySkill = async (skill) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/profile/projects?skill=${skill}`);
      setProjects(response.data);
      setActiveTab('projects');
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSkillSearch = (e) => {
    e.preventDefault();
    if (searchSkill.trim()) {
      fetchProjectsBySkill(searchSkill);
    }
  };

  const handleGlobalSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/profile/search?q=${searchQuery}`);
        setSearchResults(response.data);
        setActiveTab('search');
      } catch (error) {
        console.error('Error searching:', error);
      }
    }
  };

  if (!profile) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Developer Profile Playground</h1>
        <div className="search-section">
          <form onSubmit={handleSkillSearch} className="search-form">
            <input
              type="text"
              placeholder="Search projects by skill (e.g., React)"
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
            />
            <button type="submit">Search Projects</button>
          </form>
          <form onSubmit={handleGlobalSearch} className="search-form">
            <input
              type="text"
              placeholder="Search across all content"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Global Search</button>
          </form>
        </div>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'profile' ? 'active' : ''} 
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={activeTab === 'projects' ? 'active' : ''} 
          onClick={() => setActiveTab('projects')}
        >
          Projects ({profile.projects.length})
        </button>
        <button 
          className={activeTab === 'skills' ? 'active' : ''} 
          onClick={() => setActiveTab('skills')}
        >
          Skills ({profile.skills.length})
        </button>
        <button 
          className={activeTab === 'search' ? 'active' : ''} 
          onClick={() => setActiveTab('search')}
          disabled={!searchResults}
        >
          Search Results
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>{profile.name}</h2>
            <p>Email: {profile.email}</p>
            
            <h3>Education</h3>
            <div className="education-list">
              {profile.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h4>{edu.institution}</h4>
                  <p>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                  <p>{edu.startDate && new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}</p>
                  {edu.description && <p>{edu.description}</p>}
                </div>
              ))}
            </div>

            <h3>Work Experience</h3>
            <div className="work-list">
              {profile.work.map((job, index) => (
                <div key={index} className="work-item">
                  <h4>{job.company}</h4>
                  <p>{job.position}</p>
                  <p>{job.startDate && new Date(job.startDate).getFullYear()} - {job.endDate ? new Date(job.endDate).getFullYear() : 'Present'}</p>
                  {job.description && <p>{job.description}</p>}
                </div>
              ))}
            </div>

            <h3>Links</h3>
            <div className="links">
              {profile.links.github && <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
              {profile.links.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
              {profile.links.portfolio && <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a>}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="projects-section">
            <h2>Projects</h2>
            {projects.length === 0 ? (
              <p>No projects found. Try a different skill.</p>
            ) : (
              <div className="projects-list">
                {projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="skills">
                      {project.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="skill-tag"
                          onClick={() => {
                            setSearchSkill(skill);
                            fetchProjectsBySkill(skill);
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                      {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="skills-section">
            <h2>Skills</h2>
            <div className="skills-list">
              {profile.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="skill-tag"
                  onClick={() => {
                    setSearchSkill(skill);
                    fetchProjectsBySkill(skill);
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'search' && searchResults && (
          <div className="search-results">
            <h2>Search Results for "{searchQuery}"</h2>
            
            {searchResults.skills.length > 0 && (
              <div className="result-section">
                <h3>Skills ({searchResults.skills.length})</h3>
                <div className="skills-list">
                  {searchResults.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="skill-tag"
                      onClick={() => {
                        setSearchSkill(skill);
                        fetchProjectsBySkill(skill);
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {searchResults.projects.length > 0 && (
              <div className="result-section">
                <h3>Projects ({searchResults.projects.length})</h3>
                <div className="projects-list">
                  {searchResults.projects.map((project, index) => (
                    <div key={index} className="project-item">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <div className="skills">
                        {project.skills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="skill-tag"
                            onClick={() => {
                              setSearchSkill(skill);
                              fetchProjectsBySkill(skill);
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {searchResults.education.length > 0 && (
              <div className="result-section">
                <h3>Education ({searchResults.education.length})</h3>
                <div className="education-list">
                  {searchResults.education.map((edu, index) => (
                    <div key={index} className="education-item">
                      <h4>{edu.institution}</h4>
                      <p>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {searchResults.work.length > 0 && (
              <div className="result-section">
                <h3>Work Experience ({searchResults.work.length})</h3>
                <div className="work-list">
                  {searchResults.work.map((job, index) => (
                    <div key={index} className="work-item">
                      <h4>{job.company}</h4>
                      <p>{job.position}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {Object.values(searchResults).every(arr => arr.length === 0) && (
              <p>No results found for "{searchQuery}"</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
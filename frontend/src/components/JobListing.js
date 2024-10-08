import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { getJobs } from '../services/jobService';
import { CircularProgress, TextField, Container, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10); // Number of jobs to show per page
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  // Fetch jobs on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getJobs();
        setJobs(data);
        setFilteredJobs(data);
        setTotalPages(Math.ceil(data.length / jobsPerPage)); // Calculate total pages
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(value) ||
      job.company_name.toLowerCase().includes(value) ||
      job.company_location.toLowerCase().includes(value)
    );
    setFilteredJobs(filtered);
    setTotalPages(Math.ceil(filtered.length / jobsPerPage)); // Update total pages for filtered jobs
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle job card click
  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  // Handle previous page
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1)); // Prevent going to page less than 1
  };

  // Handle next page
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages)); // Prevent going to a page greater than totalPages
  };

  // Calculate current jobs to display
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  if (loading) {
    return <CircularProgress className="my-10 mx-auto" />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <Container maxWidth="lg">
      <h2 className="text-3xl font-bold my-8 text-center">Job Listings</h2>

      {/* Search input */}
      <TextField
        label="Search jobs..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-8"
      />

      {/* Grid layout for job cards */}
      <Grid container spacing={4}>
        {currentJobs.length > 0 ? (
          currentJobs.map(job => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard 
                job={{
                  ...job,
                  company: job.company_name,
                  location: job.company_location,
                }}
                onClick={() => handleJobClick(job.id)}
              />
            </Grid>
          ))
        ) : (
          <p className="text-center text-gray-500">No jobs found matching your search criteria.</p>
        )}
      </Grid>

      {/* Pagination Controls */}
      <div className="pagination-controls text-center my-8">
        <Button variant="outlined" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="mx-4">Page {currentPage} of {totalPages}</span>
        <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default JobListing;

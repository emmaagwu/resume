import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const JobCard = ({ job }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
          boxShadow: 3,
          transform: 'scale(1.02)',
          transition: 'transform 0.2s',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {job.title || 'Job Title Not Available'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {job.company || 'Company Name Not Available'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {job.location || 'Location Not Available'}
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary">
          Posted on: {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'Date Not Available'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary" 
          sx={{ textTransform: 'none' }} 
          onClick={() => window.alert(`Details for ${job.title}`)} // Replace with actual navigation
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
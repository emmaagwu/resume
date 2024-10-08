export const getJobs = async (page = 1, perPage = 20, filters = {}) => {
  const { title, company_name, company_location } = filters;
  
  // Construct the query parameters dynamically
  let queryParams = `?page=${page}&per_page=${perPage}`;

  if (title) queryParams += `&title=${encodeURIComponent(title)}`;
  if (company_name) queryParams += `&company_name=${encodeURIComponent(company_name)}`;
  if (company_location) queryParams += `&company_location=${encodeURIComponent(company_location)}`;

  try {
    const response = await fetch(`http://localhost:5000/jobs/${queryParams}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

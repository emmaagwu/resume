// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import { Box, InputBase } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { alpha, styled } from '@mui/material/styles';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// export default function Navbar() {
//   return (
//     <AppBar position="static" color="primary" className="shadow-lg">
//       <Toolbar>
//         {/* Logo or Brand Name */}
//         <Typography
//           variant="h6"
//           noWrap
//           component="div"
//           sx={{ display: { xs: 'none', sm: 'block' } }}
//           className="cursor-pointer"
//         >
//           Job Portal
//         </Typography>

//         {/* Centered Navigation Links */}
//         <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
//           <Typography variant="button" className="mx-4 cursor-pointer">
//             Jobs
//           </Typography>
//           <Typography variant="button" className="mx-4 cursor-pointer">
//             About
//           </Typography>
//           <Typography variant="button" className="mx-4 cursor-pointer">
//             Contact
//           </Typography>
//         </Box>

//         {/* Search Bar */}
//         <Search className="flex justify-center">
//           <SearchIconWrapper>
//             <SearchIcon />
//           </SearchIconWrapper>
//           <StyledInputBase
//             placeholder="Search jobs…"
//             inputProps={{ 'aria-label': 'search' }}
//           />
//         </Search>
//       </Toolbar>
//     </AppBar>
//   );
// }



import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar 
      position="sticky" 
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Transparent gray overlay like hero section
        height: '80px', // Increased height
        justifyContent: 'center', // Vertically center items
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Branding */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            Job Portal
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Button color="inherit" sx={{ textTransform: 'none' }}>Jobs</Button>
            <Button color="inherit" sx={{ textTransform: 'none' }}>About</Button>
            <Button color="inherit" sx={{ textTransform: 'none' }}>Contact</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;


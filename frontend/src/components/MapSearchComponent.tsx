import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useEffect, useState } from 'react';
import MapComponent from './MapComponent';

const MapSearchElement = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  position: 'relative',
  width: '100%',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  overflow: 'visible',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'absolute',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  zIndex: 1,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: ' 60%',
  marginTop: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  height: '40px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  width: '60px',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //color: 'inherit',
  padding: theme.spacing(0.5, 0),
  '& .MuiInputBase-input': {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  zIndex: 1,
  flex: 1,
}));

export default function MapSearchComponent() {
    const [searchValue, setSearchValue] = useState('');
    const [searchedLocation, setSearchedLocation] = useState<{ lat: number, lng: number }>(); // Update the type of searchedLocation

    useEffect(() => {
      if(!searchedLocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        setSearchedLocation({ lat: p.coords.latitude, lng: p.coords.longitude })
      });
    }
    }, [searchedLocation]);

    const handleSearch = async () => {
      try {
        const response = await fetch(`http://localhost:2000/position?address=${encodeURIComponent(searchValue)}`);
        const data = await response.json();
        // Assuming the response contains latitude and longitude properties
        if(data.length) {
          const location = data[0].geometry.location;
          if(location) {
            setSearchedLocation({ lat: location.lat, lng: location.lng });
          }
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    return <MapSearchElement>
        <Search>
            <SearchIconWrapper>
              <SearchIcon color="disabled"/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Creca una località..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {if(e.key === 'Enter'){ console.log(searchValue); handleSearch();}}}
            />
        </Search>
        <MapComponent searchedLocation={ searchedLocation } />
    </MapSearchElement>
    

}

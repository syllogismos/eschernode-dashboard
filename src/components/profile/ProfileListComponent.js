import React, { useState, useEffect } from 'react';

import ProfileListHeaderComponent from './ProfileListHeaderComponent';
import ListProfileListing from './ListProfileListing';
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const pageSizes = [4, 8, 12, 20];

const ProfileListComponent = ({ profiles }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);

  // const [totalProfilesCount, setTotalProfilesCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setCurrentPage(1);
    setTotalPage(Math.ceil(profiles.length / selectedPageSize));
  }, [selectedPageSize, profiles]);

  const totalProfilesCount = profiles.length;
  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return (
    <>
      <div className="disable-text-selection">
        <ProfileListHeaderComponent
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalProfilesCount}
          startIndex={startIndex}
          endIndex={endIndex}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          pageSizes={pageSizes}
        />
        <ListProfileListing
          items={profiles.slice(startIndex, endIndex)}
          displayMode={displayMode}
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default ProfileListComponent;

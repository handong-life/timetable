import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Box, Typography } from '@material-ui/core';
import SearchBar from './SearchBar';
import LectureCard from './LectureCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    marginRight: '30px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0',
      marginTop: '20px',
    },
  },

  searchTab: {
    backgroundColor: 'white',
    padding: '20px 20px 0 20px',
    border: '1px solid #eaedf1',
    borderRadius: '20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: '7px 7px 0 7px',
    },
  },

  searchBarWrapper: {
    width: '100%',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '5px',
    },
  },

  lectureList: {
    height: '100%',
    width: '100%',
    padding: '5px',
    overflowY: 'scroll',
  },

  notFound: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
  },
}));

export default function SearchSection({
  lectures,
  selectedSearchTabIndex,
  handleSelectedSearchTabIndex,
  handleSearchSubmit,
  handleClearClick,
  handleAddClick,
  handleDeleteClick,
  handleBookmarkClick,
  handleUnbookmarkClick,
}) {
  const classes = useStyles();

  const notFoundMessages = [
    [
      '검색 결과가 없습니다:(',
      ' ',
      '[검색 잘하는 법]',
      ',를 이용해서 여러개의 정보를 한꺼번에 검색할 수도 있습니다.',
      '예) 화7,목7',
      '예) 데이터,김호준',
    ],
    ['즐겨찾기에 추가한 과목이 없습니다.'],
    ['현재 시간표에 추가된 과목이 없습니다.'],
  ];

  const a11yProps = (index) => {
    return {
      id: `search-tab-${index}`,
      'aria-controls': `search-tabpanel-${index}`,
    };
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.searchBarWrapper}>
        <SearchBar {...{ handleSearchSubmit, handleClearClick }} />
      </Box>
      <Tabs
        className={classes.searchTabs}
        value={selectedSearchTabIndex}
        onChange={handleSelectedSearchTabIndex}
        aria-label="Search Tabs"
      >
        <Tab label={<Typography variant="body2">강의 검색</Typography>} {...a11yProps(0)} />
        <Tab label={<Typography variant="body2">즐겨 찾기</Typography>} {...a11yProps(1)} />
        <Tab label={<Typography variant="body2">현재 시간표</Typography>} {...a11yProps(2)} />
      </Tabs>
      <Box className={classes.searchTab}>
        {lectures[selectedSearchTabIndex].length !== 0 ? (
          <Box className={classes.lectureList}>
            {lectures[selectedSearchTabIndex].map((lecture) => (
              <LectureCard
                key={lecture.id}
                lecture={lecture}
                onAddClick={() => handleAddClick(lecture)}
                onDeleteClick={() => handleDeleteClick(lecture)}
                onBookmarkClick={() => handleBookmarkClick(lecture)}
                onUnbookmarkClick={() => handleUnbookmarkClick(lecture)}
              />
            ))}
          </Box>
        ) : (
          <Box className={classes.notFound}>
            {notFoundMessages[selectedSearchTabIndex].map((message, index) => (
              <Typography variant={'body1'} key={index}>
                {message}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
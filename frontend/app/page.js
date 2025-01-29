/*'use client'

import {useState,useEffect} from "react";
import React from "react";
import MyCard from './card';
import DialogForm from "./form";
import Nav from "./navbar";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import { Grid } from "@material-ui/core";
import Viewcard from "./viewcard";
import axios from "axios";



export default function Home() {
  
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleViewCourse = (course) => setSelectedCourse(course);
  const handleCloseViewDialog = () => setSelectedCourse(null);

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
    setSelectedCourse(null);
  };

  const handleUpdateCourse = (id, updatedCourse) => {
    setCourses(courses.map((course) => (course.id === id ? updatedCourse : course)));
    setSelectedCourse(null);
  };

  const handleAddCourseSuccess = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  useEffect(() => {
    const fetchCourses =  () => {
      try {
        const response = axios.get('http://localhost:5000/courses');
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to fetch courses. Please try again.");
      }
    };

    fetchCourses();
  }, []);
 
    return (
    <>
       <Nav />
       <div >
       <Box sx={{ p: 3 }}>
       {courses && courses.length > 0 ? ( 
        courses.map((course) => ( 
        <Grid item xs={12} sm={6} md={4} key={course.id}> 
        <MyCard course={course} onClick={() => handleViewCourse(course)} /> </Grid> )) ) : ( <p>No courses available</p> )}
      </Box>
      </div>
        
    <React.Fragment>
      <Button style={{marginLeft: 1300,marginTop: -30}} variant="outlined" onClick={handleClickOpen}>
        Add Course
      </Button>


      <DialogForm open={open} handleClose={handleClose} onSuccess={handleAddCourseSuccess} />
        {selectedCourse &&(
          <Viewcard 
          open={Boolean(selectedCourse)}
          course={selectedCourse}
          onClose={handleCloseViewDialog}
          onUpdate={handleUpdateCourse}
          onDelete={handleDeleteCourse}
          />
        )}
    
        
    </React.Fragment>
      

    </>
    
  );
}*/
'use client';

import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import MyCard from './card';
import DialogForm from "./form";
import Nav from "./navbar";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import { Grid } from "@material-ui/core";
import Viewcard from "./viewcard";
import axios from "axios";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleViewCourse = (course) => setSelectedCourse(course);
  const handleCloseViewDialog = () => setSelectedCourse(null);

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
    setSelectedCourse(null);
  };

  const handleUpdateCourse = (id, updatedCourse) => {
    setCourses(courses.map((course) => (course.id === id ? updatedCourse : course)));
    setSelectedCourse(null);
  };

  const handleAddCourseSuccess = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses');
        setCourses(response.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to fetch courses. Please try again.");
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Nav />
      <Box sx={{ p: 3 }}>
      <Grid container spacing={3}  >
       {courses.map((course) => (
      <Grid item xs={12} sm={6} md={4} key={course.id}>
       <MyCard course={course} onClick={() => handleViewCourse(course)} />
    </Grid>
  ))}
  </Grid>
        
      
      <Button
        sx={{ position: 'absolute', right: 20 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add Course
      </Button>
      
      <DialogForm open={open}  onClose={handleClose} onSuccess={handleAddCourseSuccess} />
      {selectedCourse && (
        <Viewcard
          open={Boolean(selectedCourse)}
          course={selectedCourse}
          onClose={handleCloseViewDialog}
          onUpdate={handleUpdateCourse}
          onDelete={handleDeleteCourse}
        />
      )}
      </Box>
    </>
  );
}


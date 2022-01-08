import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import Meta from "../../../components/Meta";
import axios from "axios";
import { toast } from "react-toastify";
import { addLesson, getCourseDetails } from "../../../actions/courseAction";
import Lesson from "../../../components/Lesson";
import Announcement from "../../../components/Announcement";

const CourseDetails = ({ match }) => {
  const { slug } = match.params;
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [key, setKey] = useState("lesson");

  const intialValues = {
    title: "",
    description: "",
    video: "",
  };
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [values, setValues] = useState(intialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.video) {
      toast.error("Please Upload Video");
      return;
    }
    dispatch(addLesson(slug, values));

    toast.success("Lesson Uploaded Successfully");
  };
  const handleVideoUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const videoData = new FormData();
      videoData.append("video", file);

      const { data } = await axios.post(
        `http://localhost:5000/api/instructor/course/upload-video`,
        videoData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            //let percent = Math.floor((loaded * 100) / total);
            setProgress(Math.floor((loaded * 100) / total));
          },
        }
      );
      console.log(data);
      setProgress(0);
      setValues({ ...values, video: data });
    } catch (error) {
      console.log(error);
      toast.error("Video Uploading Failed");
    }
  };

  const { course } = useSelector((state) => state.courseGetDetails);

  useEffect(() => {
    if (!course || !course.title || course.slug !== slug)
      dispatch(getCourseDetails(slug, "instructor"));
  }, [slug, dispatch, course]);

  return (
    <>
      <Meta title={`ClassRoom : ${slug}`} />
      {course && (
        <>
          <h4 className="text-center">{course.title}</h4>
          <div className="underline"></div>

          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="lesson" title="Lesson">
              <Lesson
                course={course}
                setShowLessonModal={setShowLessonModal}
                handleVideoUpload={handleVideoUpload}
                showLessonModal={showLessonModal}
                handleSubmit={handleSubmit}
                progress={progress}
                values={values}
                handleChange={handleChange}
              />
            </Tab>
            <Tab eventKey="announcement" title="Announcement">
              <Announcement />
            </Tab>
          </Tabs>
        </>
      )}
    </>
  );
};

export default CourseDetails;
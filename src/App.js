import React from "react";
import { Routes, Route } from "react-router-dom";
import AddAdmin from "./AddAdmin";
import AddFreeCourse from "./AddFreeCourse";
import AddPaidCourse from "./AddPaidCourse";
import AddPromoCode from "./AddPromoCode";
import AdminUser from "./AdminUser";
import FreeCourse from "./FreeCourse";
import Home from './Home';
import Login from "./Login";
import Manage from './Manage';
import PaidCourse from "./PaidCourse";
import PaidCourseDetail from "./PaidCourseDetail";
import PaidRegiForm from "./PaidRegiForm";
import PaidUser from "./PaidUser";
import PrivateRoute from "./PrivateRoute";
import PromoCode from "./PromoCode";
import Sign_Up from "./Sign_Up";
import Testimonial from "./Testimonial";
import AddTestimonial from "./AddTestimonial";
import Error404 from "./Error404";
import AdminEdit from "./AdminEdit";
import EditFreeCourse from "./EditFreeCourse";
import EditPaidCourse from "./EditPaidCourse";
import EditPromoCode from "./EditPromoCode";
import EditTestimonial from "./EditTestimonial";
import OptionalData from "./OptionalData";
import EditOptionalData from "./EditOptionalData";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="manage" element={<Manage />} />
          <Route exact path="manage/admin/edit/:id" element={<AdminEdit />} />
          <Route exact path="manage/admin" element={<AdminUser />} />
          <Route exact path="manage/admin/add" element={<AddAdmin />} />
          <Route exact path="manage/free_course" element={<FreeCourse />} />
          <Route exact path="manage/free_course/edit/:id" element={<EditFreeCourse />} />
          <Route exact path="manage/paid_course" element={<PaidCourse />} />
          <Route exact path="manage/paid_course/edit/:id" element={<EditPaidCourse />} />
          <Route exact path="manage/paid_user" element={<PaidUser />} />
          <Route exact path="manage/free_course/add" element={<AddFreeCourse />} />
          <Route exact path="manage/paid_course/add" element={<AddPaidCourse />} />
          <Route exact path="manage/promoCode" element={<PromoCode />} />
          <Route exact path="manage/optionalData" element={<OptionalData />} />
          <Route exact path="manage/optionalData/edit/:id" element={<EditOptionalData />} />
          <Route exact path="manage/promoCode/edit/:id" element={<EditPromoCode />} />
          <Route exact path="manage/testimonial" element={<Testimonial />} />
          <Route exact path="manage/testimonial/edit/:id" element={<EditTestimonial />} />
          <Route exact path="manage/testimonial/add" element={<AddTestimonial />} />
          <Route exact path="manage/promoCode/add" element={<AddPromoCode />} />
        </Route>
        <Route exact path="/paid_course/:id" element={<PaidCourseDetail />} />
        <Route exact path="/paid_course/:id/enroll" element={<PaidRegiForm />} />
        <Route exact path="/signUp" element={<Sign_Up />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;

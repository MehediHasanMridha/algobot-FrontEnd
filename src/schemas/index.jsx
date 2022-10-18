import * as Yup from "yup";
// .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,'Enter correct url!')
export const signUpSchema = Yup.object({
    Full_name: Yup.string().min(4).max(25).required("Please enter your name"),
    Email: Yup.string().email().required("Please enter your email"),
    Password: Yup.string().required("Please enter your password").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
    ),
    Confirm_Password: Yup.string()
        .required()
        .oneOf([Yup.ref("Password"), null], "Password must match"),
});
export const loginSchema = Yup.object({
    Email: Yup.string().email().required("Please enter your email"),
    Password: Yup.string().min(8).required("Please enter your password"),
});
export const pregiSchema = Yup.object({
    name: Yup.string().min(4).max(25).required("Please enter your Name"),
    Email: Yup.string().email().required("Please enter your Email"),
    phone: Yup.number().required("Please enter your Phone Number"),
    transId: Yup.string().required("Please enter your TransId"),
});
export const addAdminSchema = Yup.object({
    full_name: Yup.string().min(4).max(25).required("Please enter your Name"),
    email: Yup.string().email().required("Please enter your Email"),
    password: Yup.string().required("Please enter your password").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
    )
});
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
export const addFreeCourseSchema = Yup.object({
    title: Yup.string().min(4).max(50).required("Please enter Title"),
    url: Yup.string().required('Please enter Link'),
    img: Yup.mixed()
        .nullable()
        .required('Please Enter Image')
        .test('size',
            'The file is too large', (value) => !value || (value && value.size <= 10485760))
        .test('format',
            'Only the following formats are accepted: .jpeg, .jpg, .png & .gif', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
});
export const addPaidCourseSchema = Yup.object({
    title: Yup.string().min(4).max(25).required("Please enter Title"),
    price: Yup.number().required('Please Enter Price'),
    // des: Yup.string().required('Please Enter Description'),
    img: Yup.mixed()
        .nullable()
        .required('Please Enter Image')
        .test('size',
            'The file is too large', (value) => !value || (value && value.size <= 10485760))
        .test('format',
            'Only the following formats are accepted: .jpeg, .jpg, .png & .gif', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
});
export const AddPromo = Yup.object({
    promoCode: Yup.string().min(3).max(25).required("Please enter PromoCode"),
    tk: Yup.number().required('Please Enter Tk'),
});

export const Testimonial = Yup.object({
    author: Yup.string().min(4).max(25).required("Please enter Author"),
    profession: Yup.string().required('Please Enter Profession'),
    // des: Yup.string().required('Please Enter Description'),
    img: Yup.mixed()
        .nullable()
        .required('Please Enter Image')
        .test('size',
            'The file is too large', (value) => !value || (value && value.size <= 10485760))
        .test('format',
            'Only the following formats are accepted: .jpeg, .jpg, .png & .gif', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
});
import React from 'react'
import styled from 'styled-components';
import { ContentContainer, ContentWrapper } from "../../assets/css/GlobalStyled";
import TextField from '../../components/TextField';
import { Formik, Form } from 'formik';
import { validateProfile } from '../../utils/validateForm';
import axios from 'axios';
import { HandPointing, FileArrowUp } from "phosphor-react";
import ImageUpload from '../../components/ImageUpload';
import BtnControls from '../../components/BtnControls';
import { toast } from 'react-toastify';
import { pageAnimation } from '../../utils/Animations';



const Profile = ({ user, setUser, }) => {

  return (
    <ContentWrapper>
      <ContentContainer
        variants={pageAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ProfileBox>
          <Formik
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              dob: user.dob,
              gender: user.gender,
              phone: user.phone,
              address: user.address,
              soo: user.soo,

            }}
            validationSchema={validateProfile}
            onSubmit={async (values) => {

              const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              };

              const id = toast.loading("Updating...")
              try {
               
                await axios.post("https://my-e-school-api.herokuapp.com/private/profile", { ...values, user }, config);
                const { data } = await axios.get("https://my-e-school-api.herokuapp.com/private/user", config);
                setUser(data)
                toast.update(id, { render:'Profile Updated', type:"success", isLoading: false, autoClose: 1000} );
                
              } catch (error) {
                console.log(error)
                toast.update(id, {render: error, type: "error", isLoading: false, autoClose: 2000});

              }
            }}
          >
            {formik => (
              <div>
                <h1 className="profile-header">My Profile</h1>
                <UpdateProfile>
                  <div>

                    <Form>
                      <div className='flex items-center justify-between'>
                        <ImageUpload user={user} setUser={setUser} />
                        <div className='max-w-sm'>
                          <BtnControls icon={<FileArrowUp size={20} color="#61f5eb" weight="bold" />} type={'submit'} text={'Update'} />
                        </div>
                      </div>
                      <FieldsWrapper>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'First Name'} name={'firstName'} type={'text'} />
                        </div>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'Last Name'} name={'lastName'} type={'text'} />
                        </div>
                        <div>
                          <TextField label={'Email'} editIcon={<HandPointing className='invisible' size={20} color="#08546d" />} name={'email'} type={'email'} disabled />
                        </div>
                        <div>
                          <TextField label={'Gender'} editIcon={<HandPointing className='invisible' size={20} color="#08546d" />} name={'gender'} type={'text'} disabled />
                        </div>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'Phone Number'} name={'phone'} type={'text'} />
                        </div>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'Date OF Birth'} name={'dob'} type={'date'} />
                        </div>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'State OF Origin'} name={'soo'} type={'text'} />
                        </div>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'Address'} name={'address'} type={'text'} />
                        </div>
                      </FieldsWrapper>
                    </Form>
                  </div>
                </UpdateProfile>
              </div>
            )}
          </Formik>
        </ProfileBox>
      </ContentContainer>
    </ContentWrapper>
  )
}

const ProfileBox = styled.div`
  /* padding:12px; */
  /* height: 400px; */
`

const UpdateProfile = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   margin: 0 auto;

   & > div { width: 60%; 
    @media screen and (max-width: 1024px){
      width: 100%;
    }
   }
`
const FieldsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
    background-color: #fff;
    padding:26px 20px;
    border-radius: 6px;
    & > div:nth-child(7)  { grid-column: span 1 / span 2; }

    @media screen and (max-width: 480px){
      display:block ;
      padding:12px;
      margin-bottom: 10px ;
    }

`

export default Profile;
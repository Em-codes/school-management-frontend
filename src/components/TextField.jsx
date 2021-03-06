import React from 'react';
import { ErrorMessage, useField } from 'formik';
import styled from 'styled-components';
import { useState } from 'react';


const TextField = ({ label, profile, editIcon, scoreInput, ...props }) => {
  const [field, meta] = useField(props);
  const [showEdit, setShowEdit] = useState(false)


  return (
    <div className="mb-3">
      <Label htmlFor={field.name}>{label}</Label>
      <div className='flex items-center gap-1 -mb-1'>
        <Input
          profile={showEdit === true ? profile : undefined}
          className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
          {...field} {...props}
          scoreInput
          autoComplete="on"
          autoCapitalize="words"
        />
        <p className='cursor-pointer' onClick={() => setShowEdit(!showEdit)}>{editIcon}</p>
      </div>
      <ErrorMessage component="p" name={field.name} className="error mt-1" />
    </div>
  )

};

const Label = styled.label`
   font-size: 14px;
   display:block;
   color: #96A0AE;
   font-weight: 400;
   margin-bottom: 4px;

   @media screen and (max-width: 480px) {
     margin-bottom:0 ;
   }
`
const Input = styled.input`
  background:${({ profile }) => (!profile ? '' : '#E2E6ED')};
  border: ${({ profile }) => (!profile ? '1px solid #d8e0d8d0' : '1px solid #d8dbe0;')};
  color: #646F81;
  padding: 6px 7px;
  -webkit-appearance: none;
  border-radius: 5px;
  width: 100%;
  min-width:60px ;
  outline: none;
  margin-bottom: ${({ scoreInput }) => (!scoreInput ? '6px' : '0;')};

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`

export default TextField;
"use client"

import React, { useState, useEffect, useRef } from 'react'
import SideNav from '../components/side-nav/SideNav'
import TopNav from '../components/top-nav/TopNav'
import { get, put } from '../utils/axiosHelpers'
import Cookies from 'js-cookie';
import Alert from '../components/alert/Alert'
import { AxiosError } from 'axios'

interface UserData {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  address?: string,
  sex?: string
  profile_pic?: {
    media: string;
    id?: string;
    // other properties of profile_pic if needed
  };
  // Add other user properties as needed
}

export default function Page() {
  const [toggleNav, setToggleNav] = useState<boolean>(false)
  const [user, setUser] = useState<UserData | null>(null)

    const imgRef = useRef<HTMLImageElement | null>(null)

    // const [loading, setLoading] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    
    // File upload context

    const [fileUploadLoader, setFileUploadLoader] = useState<boolean>(false)
    const token = Cookies.get('token')

  const handleToggleNav = (value: boolean) => {
    setToggleNav(value)
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  async function getUserProfile() {
    try {
      const storedUser = localStorage.getItem('user')
      
      if (!storedUser) {
        console.error('No user found in localStorage')
        return
      }
      
      // Parse the stored user JSON string to an object
      const currentUser: UserData = JSON.parse(storedUser)
      
      if (!currentUser.id) {
        console.error('User ID not found')
        return
      }
      
      const response = await get(`/profile/user/${currentUser.id}`)
      console.log(response);
      
      if (!response.success) {
        throw new Error('Failed to fetch user profile')
      }
      setUser(response?.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }


  async function handleFileUpload(file: File){
    console.log("Upload Profile Image ..... ");
    
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
    if(file.size > maxSizeInBytes){
        setMsg("File size should not exceed 5MB");
        setAlertType('error');
        return;
    }
    
    setFileUploadLoader(true);
    const formData = new FormData();
    formData.append('media', file);
    formData.append('media_type', 'photo');

    console.log(`Bearer ${token}`);
    
    
    try {
      const res = await fetch(`https://zillow9jabe.onrender.com/media/upload`, {
        method: "POST",
        body: formData,
        headers : {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      const data = await res.json();
      console.log(res, data);
      setFileUploadLoader(false);
      
      if(res.ok === true) {
        // setImagePreviewModal(false);
        // setPreviewUrl(null);
        // setImgSrc('');
        
        const response = await put('/dashboard/update-profile', {
          profile_pic: data.data.id,
        });
        if(response.success){
          getUserProfile();
          setMsg("File uploaded successfully");
          setAlertType('success');
        }
      } else {
        setMsg("File upload wasn't successful");
        setAlertType('error');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
          setMsg(error.response?.data?.message || 'Error uploading file');
      } else {
          setMsg('An unexpected error occurred.');
      }
      setFileUploadLoader(false);
      setAlertType('error');
    }
  }

  function base64ToFile(base64String: string, fileName: string) {
    // Split the base64 string to get the content type and base64 data
    const [metadata, base64Data] = base64String.split(",");
    const contentType = metadata.match(/:(.*?);/)?.[1] || '';
  
    // Decode the base64 string to binary data
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
  
    // Create a File object
    const newFile = new File([byteArray], fileName, { type: contentType });
    console.log(newFile);
    
    handleFileUpload(newFile);
  }

  function handleImagePreviewAndCroping(file: File){
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        const imgUrl = reader.result?.toString() || ""
        // setImgSrc(imgUrl)
        console.log(imgUrl);
    })
    reader.readAsDataURL(file)
  }


  return (
    <div>
      {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
      <SideNav toggle={{
        toggleNav: toggleNav, 
        setToggleNav: handleToggleNav
      }}/>
      <div className={`w-full lg:w-[78%] ml-auto pb-5 ${toggleNav ? 'lg:ml-[22%]' : 'lg:ml-auto'}`}>
        <TopNav 
          toggle={{
            toggleNav: toggleNav,
            setToggleNav: handleToggleNav
          }}
          pageTitle={'My Profile'}
        />
        <div className='mt-8 px-5'>
          {/* <h2 className="text-xl font-medium mb-6">{'My Profile'}</h2> */}
          <div className='flex gap-5 flex-col md:w-[50%] mr-auto md:ml-[2rem] pt-6'>
            <div>
              <p className='font-[500] border-b border-[#2D8B57]'>Full Name</p>
              <div className='flex gap-3 pt-1'>
                <p className='text-[16px]'>{user?.full_name || 'Null'}</p>
              </div>
              <div className='mt-3'>
                <p className='border-b border-[#2D8B57] font-[500]'>Email</p>
                <p className='pt-1'>{user?.email || 'Null'}</p>
              </div>
              <div className='mt-3'>
                <p className='border-b border-[#2D8B57] font-[500]'>Sex</p>
                <p className='pt-1'>{user?.sex || 'Null'}</p>
              </div>
              <div className='mt-3'>
                <p className='border-b border-[#2D8B57] font-[500]'>Addreess</p>
                <p className='pt-1'>{user?.address || 'Null'}</p>
              </div>
              <div className='mt-3'>
                <p className='font-[500] border-b border-[#2D8B57]'>Contact Phone</p>
                <p className='pt-1'>{user?.phone || 'Null'}</p>
              </div>
              <div className='mt-3'>
                <p className='font-[500] border-b border-[#2D8B57]'>Bio</p>
                <p className='pt-1'>
                  {user?.bio || 'Null'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
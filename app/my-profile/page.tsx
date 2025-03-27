"use client"

import React, { useState, useEffect, useRef } from 'react'
import SideNav from '../components/side-nav/SideNav'
import TopNav from '../components/top-nav/TopNav'
import { get, put } from '../utils/axiosHelpers'
import Cookies from 'js-cookie';
import Alert from '../components/alert/Alert'
import { AxiosError } from 'axios'
import { BiCamera } from 'react-icons/bi'
import ReactCrop, { centerCrop, makeAspectCrop, Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { IoCloseOutline } from 'react-icons/io5'
import { CiImageOn } from 'react-icons/ci'

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
    const [imagePreviewModal, setImagePreviewModal] = useState<boolean>(false)

    const [imgSrc, setImgSrc] = useState<string>('')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null)

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

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    const cropingWidthPercent = (150 / width) * 100
    const crop = makeAspectCrop(
        {
            unit: '%', // Can be 'px' or '%'
            x: 25,
            y: 25,
            width: cropingWidthPercent,
            height: 50
        }, 
        1,
        width,
        height
    )
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }

  const getCroppedImage = (): string | null => {
    if (!completedCrop || !imgRef.current) return null;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
    );

    return canvas.toDataURL('image/jpeg');
  };

  const handlePreview = () => {
    const croppedImage = getCroppedImage();
    if (croppedImage) {
        setPreviewUrl(croppedImage);
    }
  };


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
        setImgSrc(imgUrl)
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
            <div className='relative w-[100px] h-[100px] rounded-full bg-gray-100'>
              <img src={user?.profile_pic?.media || './images/user1.png'} alt="User profile" className='w-[100px] h-[100px] rounded-full'/>
              <div className='absolute bottom-0 right-0 text-[20px] bg-gray-300 p-1 rounded-full'>
                <BiCamera onClick={() => setImagePreviewModal(true)}/>
              </div>
            </div>
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
          {
            imagePreviewModal &&
            <div style={{position:'fixed', width:'100%', left:'0', top:'0', zIndex:'99', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:"rgba(18, 18, 18, 0.8)" }}>
                <div className="bg-white md:w-[50%] w-[90%] text-center flex items-center justify-center flex-col py-10 relative" style={{ borderRadius:'10px' }}>
                    <p className='absolute right-[-10px] bg-gray-300 top-[-18px] cursor-pointer text-[22px] z-[999999] p-[5px] border rounded-full' onClick={() => setImagePreviewModal(false)}>
                        <IoCloseOutline />
                    </p>
                    {
                        imgSrc ?
                        <div>
                            {
                                previewUrl ?
                                <div>
                                    <img src={previewUrl} alt="" className='h-[300px] object-contain mx-auto' />
                                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full mt-5 justify-center'>
                                        <button onClick={() => setPreviewUrl(null)} className='text-[#2D8B57] border border-[#2D8B57] rounded-[4px] px-[28px] py-[10px] text-center mx-auto'>Cancel</button>
                                        <button onClick={() => base64ToFile(previewUrl, "Image")} className='text-white bg-[#2D8B57] rounded-[4px] px-[28px] py-[10px] text-center mx-auto'>Upload Image</button>
                                    </div>
                                </div>
                                :
                                <>
                                    <ReactCrop
                                        crop={crop}
                                        aspect={1}
                                        minWidth={150}
                                        onChange={
                                            (pixelCrop, percentCrop) => setCrop(percentCrop)
                                        }
                                        onComplete={(c) => setCompletedCrop(c)}
                                        // circularCrop
                                        keepSelection
                                    >
                                        <img ref={imgRef} src={imgSrc} onLoad={onImageLoad} className='h-[300px] object-contain mx-auto' alt="" />
                                    </ReactCrop>
                                    <div className='flex flex-col sm:flex-row items-center gap-5 w-full mt-5 justify-center'>
                                        <button onClick={() => setImgSrc('')} className='text-[#2D8B57] border border-[#2D8B57] rounded-[4px] px-[28px] py-[10px] text-center mx-auto'>Delete Image</button>
                                        <button onClick={handlePreview} className='text-white bg-[#2D8B57] rounded-[4px] px-[28px] py-[10px] text-center mx-auto'>Preview Image</button>
                                    </div>
                                </>
                            }
                        </div>
                        :
                        <>
                            <img src="./images/file-upload.svg" alt="" />
                            <div className='border-dashed border-[#98A2B3] border-2 rounded-[4px] p-[4rem] flex flex-col items-center justify-center mt-5'>
                              <CiImageOn className='text-[#98A2B3] text-[50px]' />
                              <p className='text-text-color font-[600] mt-5'>Click to upload <span className='font-[400] text-[#475367] hidden'>or drag and drop</span> </p>
                              <p className='text-[#98A2B3]'>PNG, JPG (max. 5mb)</p>
                            </div>
                            <input
                              type="file"
                              className="z-[1] cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]"
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.files && e.target.files.length > 0) {
                                  handleImagePreviewAndCroping(e.target.files[0]);
                                }
                              }}
                            />

                        </>
                    }
                    {
                      fileUploadLoader &&
                      <div style={{position:'fixed', width:'100%', left:'0', top:'0', zIndex:'9999', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:"rgba(18, 18, 18, 0.8)" }}>
                          <div className="bg-white" style={{ borderRadius:'10px' }}>
                              {/* <i className=' ri-close-fill block text-[1.2rem] text-end mt-[1rem] mr-[1rem] cursor-pointer'></i> */}
                              <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col" style={{ padding:'2rem', textAlign:'center' }} >
                                  <img src='./images/loader.gif' style={{ height:'40px', width:'40px', margin:'12px auto 30px' }} />
                                  <p className='text-gray-500 text-[15px] mb-2 text-center'>File Upload in progress, please do not refresh the page</p>
                              </div>
                          </div>
                      </div>
                  }
                </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}